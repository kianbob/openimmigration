import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import { YearlyChart, OutcomePie } from './NationalityCharts'
import fs from 'fs'
import path from 'path'

function loadDetail(slug: string) {
  const fp = path.join(process.cwd(), 'public', 'data', 'nationalities', `${slug}.json`)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, 'utf8'))
}

function loadIndex() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'nationality-index.json'), 'utf8'))
}

function loadCourtSlugMap(): Record<string, string> {
  const index = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'court-index.json'), 'utf8')
  ) as { code: string; slug: string }[]
  const map: Record<string, string> = {}
  index.forEach(c => { map[c.code] = c.slug })
  return map
}

export function generateStaticParams() {
  const index = loadIndex()
  return index.sort((a: { cases: number }, b: { cases: number }) => b.cases - a.cases).slice(0, 20).map((c: { slug: string }) => ({ slug: c.slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const nat = loadDetail(slug)
  if (!nat) return { title: 'Nationality Not Found' }
  return {
    title: `${titleCase(nat.name)} — ${nat.cases.toLocaleString()} Immigration Cases`,
    description: `${nat.cases.toLocaleString()} immigration court cases involving ${titleCase(nat.name)} nationals. Grant rate: ${nat.grantRate ?? 'N/A'}%. Top courts, outcomes, and trends.`,
  }
}

export default async function NationalityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const nat = loadDetail(slug)
  if (!nat) notFound()

  const courtSlugs = loadCourtSlugMap()
  const grColor = nat.grantRate != null ? (nat.grantRate >= 15 ? 'text-green-600' : nat.grantRate >= 8 ? 'text-yellow-600' : 'text-red-600') : 'text-gray-500'
  const otherOutcomes = Math.max(0, (nat.completed || 0) - (nat.grants || 0) - (nat.denials || 0) - (nat.removals || 0))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Nationalities', href: '/nationalities' },
        { label: titleCase(nat.name) },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{titleCase(nat.name)}</h1>
      <p className="text-gray-600 mb-8">Immigration court cases involving nationals of {titleCase(nat.name)}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-primary">{nat.cases.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Total Cases</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-primary">{(nat.completed || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-green-600">{(nat.grants || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Grants</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-red-600">{(nat.denials || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Denials</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
          <div className={`text-xl font-bold ${grColor}`}>{nat.grantRate != null ? `${nat.grantRate}%` : '—'}</div>
          <div className="text-xs text-gray-600">Grant Rate</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-red-600">{(nat.removals || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Removals</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {nat.yearlyTrend?.length > 0 && <YearlyChart data={nat.yearlyTrend} />}
        {nat.completed > 0 && <OutcomePie grants={nat.grants || 0} denials={nat.denials || 0} removals={nat.removals || 0} other={otherOutcomes} />}
      </div>

      {/* Top Courts */}
      {nat.topCourts?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
          <h2 className="font-heading text-xl font-bold mb-4">Top Courts for {titleCase(nat.name)} Cases</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">#</th>
                <th className="px-3 py-2 text-left font-semibold">Court</th>
                <th className="px-3 py-2 text-right font-semibold">Cases</th>
                <th className="px-3 py-2 text-right font-semibold">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {nat.topCourts.slice(0, 15).map((c: { code: string; name: string; count: number }, i: number) => (
                <tr key={c.code} className="border-t border-gray-100">
                  <td className="px-3 py-1.5 text-gray-400">{i + 1}</td>
                  <td className="px-3 py-1.5 font-medium">
                    {courtSlugs[c.code] ? (
                      <Link href={`/courts/${courtSlugs[c.code]}`} className="text-primary hover:underline">{titleCase(c.name)}</Link>
                    ) : titleCase(c.name)}
                  </td>
                  <td className="px-3 py-1.5 text-right">{c.count.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-right text-gray-500">{((c.count / nat.cases) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Insight */}
      {nat.grantRate != null && nat.completed > 500 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Insight</h3>
              <p className="text-sm text-amber-800">
                {nat.grantRate >= 20
                  ? `${titleCase(nat.name)} nationals have a relatively high grant rate of ${nat.grantRate}%. Of ${nat.completed.toLocaleString()} completed proceedings, ${(nat.grants || 0).toLocaleString()} resulted in relief.`
                  : nat.grantRate >= 8
                  ? `${titleCase(nat.name)} nationals have a moderate grant rate of ${nat.grantRate}%. The majority of cases are heard in ${nat.topCourts?.[0] ? nat.topCourts[0].name : 'major metro courts'}.`
                  : `${titleCase(nat.name)} nationals face a grant rate of just ${nat.grantRate}%. Out of ${nat.completed.toLocaleString()} completed proceedings, ${(nat.removals || 0).toLocaleString()} ended in removal orders.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <Link href="/nationalities" className="text-primary font-medium hover:underline">← Back to all nationalities</Link>
      </div>
    </div>
  )
}
