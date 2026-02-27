import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadDetail(slug: string) {
  const fp = path.join(process.cwd(), 'public', 'data', 'judges', `${slug}.json`)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, 'utf8'))
}

function loadIndex() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'judge-index.json'), 'utf8'))
}

function loadCourtLookup(): Record<string, { city: string; state: string; slug: string }> {
  const courts = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'court-index.json'), 'utf8'))
  const map: Record<string, { city: string; state: string; slug: string }> = {}
  for (const c of courts) {
    map[c.code] = { city: c.city || c.name, state: c.state || '', slug: c.slug || '' }
  }
  return map
}

export function generateStaticParams() {
  const index = loadIndex()
  return index.sort((a: { totalDecisions: number }, b: { totalDecisions: number }) => b.totalDecisions - a.totalDecisions).slice(0, 50).map((j: { slug: string }) => ({ slug: j.slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const judge = loadDetail(slug)
  if (!judge) return { title: 'Judge Not Found' }
  return {
    title: `Judge ${titleCase(judge.name)} — ${judge.totalDecisions.toLocaleString()} Decisions, ${judge.grantRate}% Grant Rate`,
    description: `Immigration Judge ${titleCase(judge.name)} has made ${judge.totalDecisions.toLocaleString()} decisions with a ${judge.grantRate}% grant rate and ${judge.removalRate}% removal rate.`,
    alternates: { canonical: `https://www.openimmigration.us/judges/${slug}` },
  }
}

export default async function JudgeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const judge = loadDetail(slug)
  if (!judge) notFound()

  const courtLookup = loadCourtLookup()
  const grColor = judge.grantRate >= 15 ? 'text-green-600' : judge.grantRate >= 8 ? 'text-yellow-600' : 'text-red-600'
  const grBg = judge.grantRate >= 15 ? 'bg-green-500' : judge.grantRate >= 8 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Judges', href: '/judges' },
        { label: `Judge ${titleCase(judge.name)}` },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Judge {titleCase(judge.name)}</h1>
      <p className="text-gray-600 mb-8">Immigration Judge · {judge.totalDecisions.toLocaleString()} total decisions</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{judge.totalDecisions.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Total Decisions</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-600">{judge.grants.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Grants</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-600">{judge.denials.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Denials</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-600">{judge.removals.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Removal Orders</div>
        </div>
      </div>

      {/* Grant Rate Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-heading text-xl font-bold mb-4">Grant Rate</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div className={`h-6 rounded-full ${grBg} transition-all flex items-center justify-end pr-2`} style={{ width: `${Math.min(100, Math.max(2, judge.grantRate))}%` }}>
                {judge.grantRate >= 5 && <span className="text-white text-xs font-bold">{judge.grantRate}%</span>}
              </div>
            </div>
          </div>
          <span className={`text-2xl font-bold ${grColor}`}>{judge.grantRate}%</span>
        </div>
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>0% (denies all)</span>
          <span>50% (even split)</span>
          <span>100% (grants all)</span>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm text-gray-500 mb-1">Removal Rate</div>
          <div className="text-2xl font-bold text-red-600">{judge.removalRate}%</div>
          <div className="text-xs text-gray-400">of decisions result in removal</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm text-gray-500 mb-1">In Absentia Orders</div>
          <div className="text-2xl font-bold text-gray-800">{judge.absentia.toLocaleString()}</div>
          <div className="text-xs text-gray-400">cases decided without respondent present</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm text-gray-500 mb-1">In Absentia Rate</div>
          <div className="text-2xl font-bold text-gray-800">
            {judge.totalDecisions > 0 ? ((judge.absentia / judge.totalDecisions) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-xs text-gray-400">of all decisions</div>
        </div>
      </div>

      {/* Courts */}
      {judge.courts?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-heading text-xl font-bold mb-4">Courts</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Court</th>
                <th className="px-3 py-2 text-right font-semibold">Hearings</th>
              </tr>
            </thead>
            <tbody>
              {judge.courts.map((c: { code: string; name: string; hearings: number }) => {
                const court = courtLookup[c.code]
                const displayName = court ? `${titleCase(court.city)}, ${court.state}` : titleCase(c.name)
                const courtSlug = court?.slug
                return (
                  <tr key={c.code + c.hearings} className="border-t border-gray-100">
                    <td className="px-3 py-1.5 font-medium">
                      {courtSlug ? <Link href={`/courts/${courtSlug}`} className="text-primary hover:underline">{displayName}</Link> : displayName}
                    </td>
                    <td className="px-3 py-1.5 text-right">{c.hearings.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Insight */}
      {(judge.grantRate > 30 || judge.grantRate < 5) && judge.totalDecisions > 1000 && (
        <div className={`${judge.grantRate > 30 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl p-6 mb-8`}>
          <div className="flex gap-3">
            <span className="text-2xl">{judge.grantRate > 30 ? '🟢' : '🔴'}</span>
            <div>
              <h3 className={`font-bold ${judge.grantRate > 30 ? 'text-green-900' : 'text-red-900'} mb-2`}>Notable Pattern</h3>
              <p className={`text-sm ${judge.grantRate > 30 ? 'text-green-800' : 'text-red-800'}`}>
                {judge.grantRate > 30
                  ? `Judge ${titleCase(judge.name)} has a grant rate of ${judge.grantRate}%, significantly above the national average. Over ${judge.totalDecisions.toLocaleString()} decisions, ${judge.grants.toLocaleString()} resulted in relief granted.`
                  : `Judge ${titleCase(judge.name)} has a grant rate of just ${judge.grantRate}% across ${judge.totalDecisions.toLocaleString()} decisions. ${judge.removals.toLocaleString()} cases ended in removal orders (${judge.removalRate}% removal rate).`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <ShareButtons url={`https://www.openimmigration.us/judges/${slug}`} title={`Judge ${titleCase(judge.name)} — Immigration Court Decisions`} />

      <div className="text-center mt-8">
        <Link href="/judges" className="text-primary font-medium hover:underline">← Back to all judges</Link>
      </div>
    </div>
  )
}
