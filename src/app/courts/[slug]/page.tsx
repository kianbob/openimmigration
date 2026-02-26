import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import CourtCharts from './CourtCharts'
import fs from 'fs'
import path from 'path'

function loadDetail(slug: string) {
  const fp = path.join(process.cwd(), 'public', 'data', 'courts', `${slug}.json`)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, 'utf8'))
}

function loadIndex() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'court-index.json'), 'utf8'))
}

export function generateStaticParams() {
  const index = loadIndex()
  return index.sort((a: { cases: number }, b: { cases: number }) => b.cases - a.cases).slice(0, 20).map((c: { slug: string }) => ({ slug: c.slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const court = loadDetail(slug)
  if (!court) return { title: 'Court Not Found' }
  return {
    title: `${titleCase(court.name)} Immigration Court, ${court.state} — ${court.cases.toLocaleString()} Cases`,
    description: `Explore ${court.cases.toLocaleString()} immigration cases at ${titleCase(court.name)} Immigration Court in ${court.state}. Grant rate: ${court.grantRate ?? 'N/A'}%. Top nationalities, judges, and yearly trends.`,
  }
}

export default async function CourtDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const court = loadDetail(slug)
  if (!court) notFound()

  const grantRate = court.grantRate
  const grColor = grantRate != null ? (grantRate >= 15 ? 'text-green-600' : grantRate >= 8 ? 'text-yellow-600' : 'text-red-600') : 'text-gray-500'

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Courts', href: '/courts' },
        { label: `${titleCase(court.name)}, ${court.state}` },
      ]} />

      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">{titleCase(court.name)} Immigration Court</h1>
        {court.active ? (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Active</span>
        ) : (
          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">Inactive</span>
        )}
      </div>
      {court.address && (
        <p className="text-gray-500 text-sm mb-6">{titleCase(court.address)}, {titleCase(court.name)}, {court.state}</p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{court.cases.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Total Cases</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(court.completed || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className={`text-2xl font-bold ${grColor}`}>{grantRate != null ? `${grantRate}%` : '—'}</div>
          <div className="text-xs text-gray-600">Grant Rate</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-600">{(court.removals || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Removal Orders</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Yearly Trend */}
        {court.yearlyTrend?.length > 0 && <CourtCharts data={court.yearlyTrend} />}

        {/* Top Nationalities */}
        {court.topNationalities?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-heading text-xl font-bold mb-4">Top Nationalities</h2>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">#</th>
                  <th className="px-3 py-2 text-left font-semibold">Nationality</th>
                  <th className="px-3 py-2 text-right font-semibold">Cases</th>
                </tr>
              </thead>
              <tbody>
                {court.topNationalities.slice(0, 15).map((n: { code: string; name: string; count: number }, i: number) => (
                  <tr key={n.code} className="border-t border-gray-100">
                    <td className="px-3 py-1.5 text-gray-400">{i + 1}</td>
                    <td className="px-3 py-1.5">
                      <Link href={`/nationalities/${n.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} className="text-primary hover:underline">
                        {n.name}
                      </Link>
                    </td>
                    <td className="px-3 py-1.5 text-right">{n.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Judges */}
      {court.topJudges?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
          <h2 className="font-heading text-xl font-bold mb-4">Judges at This Court</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">#</th>
                  <th className="px-3 py-2 text-left font-semibold">Judge</th>
                  <th className="px-3 py-2 text-right font-semibold">Decisions</th>
                  <th className="px-3 py-2 text-right font-semibold">Grants</th>
                  <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
                  <th className="px-3 py-2 text-right font-semibold">Removals</th>
                </tr>
              </thead>
              <tbody>
                {court.topJudges.slice(0, 20).map((j: { code: string; name: string; decisions: number; grants: number; denials: number; removals: number; grantRate: number | null }, i: number) => (
                  <tr key={j.code} className="border-t border-gray-100">
                    <td className="px-3 py-1.5 text-gray-400">{i + 1}</td>
                    <td className="px-3 py-1.5 font-medium">
                      <Link href={`/judges/${j.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} className="text-primary hover:underline">
                        {j.name}
                      </Link>
                    </td>
                    <td className="px-3 py-1.5 text-right">{j.decisions.toLocaleString()}</td>
                    <td className="px-3 py-1.5 text-right">{j.grants.toLocaleString()}</td>
                    <td className="px-3 py-1.5 text-right">
                      {j.grantRate != null ? (
                        <span className={j.grantRate >= 15 ? 'text-green-600' : j.grantRate >= 8 ? 'text-yellow-600' : 'text-red-600'}>
                          {j.grantRate}%
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-3 py-1.5 text-right">{j.removals.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Key Insight */}
      {grantRate != null && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Insight</h3>
              <p className="text-sm text-amber-800">
                {grantRate >= 15
                  ? `${titleCase(court.name)} has one of the higher grant rates in the system at ${grantRate}%. Courts in ${court.state} tend to have ${grantRate >= 20 ? 'notably generous' : 'above-average'} outcomes for asylum seekers.`
                  : grantRate >= 8
                  ? `${titleCase(court.name)} has a moderate grant rate of ${grantRate}%. Out of ${(court.completed || 0).toLocaleString()} completed proceedings, ${(court.grants || 0).toLocaleString()} resulted in relief granted.`
                  : `${titleCase(court.name)} has one of the lower grant rates in the system at ${grantRate}%. This court issued ${(court.removals || 0).toLocaleString()} removal orders out of ${(court.completed || 0).toLocaleString()} completed proceedings.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <Link href="/courts" className="text-primary font-medium hover:underline">← Back to all courts</Link>
      </div>
    </div>
  )
}
