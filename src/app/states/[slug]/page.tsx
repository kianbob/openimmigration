import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

const US_CODES = new Set(['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC','PR','GU','VI','AS','MP'])

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

function slugToState(slug: string, states: any[]): any | null {
  for (const s of states) {
    const sSlug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    if (sSlug === slug) return s
  }
  return null
}

export function generateStaticParams() {
  const states = loadData('states.json').filter((s: any) => US_CODES.has(s.code))
  return states.map((s: any) => ({
    slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const states = loadData('states.json')
  const state = slugToState(slug, states)
  if (!state) return { title: 'State Not Found' }
  return {
    title: `${titleCase(state.name)} Immigration Courts — ${state.cases.toLocaleString()} Cases`,
    description: `Immigration court data for ${titleCase(state.name)}: ${state.cases.toLocaleString()} total cases, court locations, outcomes, and top nationalities.`,
    alternates: { canonical: `https://www.openimmigration.us/states/${slug}` },
  }
}

export default async function StateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const states = loadData('states.json')
  const state = slugToState(slug, states)
  if (!state) notFound()

  const courtIndex = loadData('court-index.json')
  const stateCourts = courtIndex
    .filter((c: any) => c.state === state.code)
    .sort((a: any, b: any) => b.cases - a.cases)

  const totalGrants = stateCourts.reduce((s: number, c: any) => s + (c.grants || 0), 0)
  const totalDenials = stateCourts.reduce((s: number, c: any) => s + (c.denials || 0), 0)
  const totalRemovals = stateCourts.reduce((s: number, c: any) => s + (c.removals || 0), 0)
  const totalCompleted = stateCourts.reduce((s: number, c: any) => s + (c.completed || 0), 0)
  const avgGrantRate = totalCompleted > 0 ? +((totalGrants / totalCompleted) * 100).toFixed(1) : null

  // Aggregate top nationalities from court detail files
  const natCounts: Record<string, { name: string; count: number }> = {}
  for (const court of stateCourts.slice(0, 20)) {
    try {
      const fp = path.join(process.cwd(), 'public', 'data', 'courts', `${court.slug}.json`)
      if (fs.existsSync(fp)) {
        const detail = JSON.parse(fs.readFileSync(fp, 'utf8'))
        for (const n of (detail.topNationalities || [])) {
          if (!natCounts[n.name]) natCounts[n.name] = { name: n.name, count: 0 }
          natCounts[n.name].count += n.count
        }
      }
    } catch { /* skip */ }
  }
  const topNats = Object.values(natCounts).sort((a, b) => b.count - a.count).slice(0, 15)

  const grColor = avgGrantRate != null ? (avgGrantRate >= 15 ? 'text-green-600' : avgGrantRate >= 8 ? 'text-yellow-600' : 'text-red-600') : 'text-gray-500'

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'States', href: '/states' },
        { label: titleCase(state.name) },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{titleCase(state.name)} Immigration Courts</h1>
      <p className="text-gray-600 mb-8">{state.cases.toLocaleString()} total cases across {stateCourts.length} court{stateCourts.length !== 1 ? 's' : ''}.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{state.cases.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Total Cases</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{stateCourts.length}</div>
          <div className="text-xs text-gray-600">Courts</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className={`text-2xl font-bold ${grColor}`}>{avgGrantRate != null ? `${avgGrantRate}%` : '—'}</div>
          <div className="text-xs text-gray-600">Avg Grant Rate</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-600">{totalRemovals.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Removal Orders</div>
        </div>
      </div>

      {/* Courts in State */}
      {stateCourts.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="font-heading text-xl font-bold">Courts in {titleCase(state.name)}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Court</th>
                  <th className="px-4 py-2 text-right font-semibold">Cases</th>
                  <th className="px-4 py-2 text-right font-semibold">Completed</th>
                  <th className="px-4 py-2 text-right font-semibold">Grant Rate</th>
                  <th className="px-4 py-2 text-right font-semibold">Removals</th>
                </tr>
              </thead>
              <tbody>
                {stateCourts.map((c: any) => (
                  <tr key={c.slug} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/courts/${c.slug}`} className="text-primary hover:underline">
                        {titleCase(c.city || c.name)}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right">{c.cases.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">{(c.completed || 0).toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">
                      {c.grantRate != null ? (
                        <span className={c.grantRate >= 15 ? 'text-green-600' : c.grantRate >= 8 ? 'text-yellow-600' : 'text-red-600'}>
                          {c.grantRate}%
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-2 text-right">{(c.removals || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Nationalities */}
      {topNats.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="font-heading text-xl font-bold">Top Nationalities in {titleCase(state.name)}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Nationality</th>
                  <th className="px-4 py-2 text-right font-semibold">Cases</th>
                </tr>
              </thead>
              <tbody>
                {topNats.map((n, i) => (
                  <tr key={n.name} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-2">
                      <Link href={`/nationalities/${n.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
                        className="text-primary hover:underline">{n.name}</Link>
                    </td>
                    <td className="px-4 py-2 text-right">{n.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Outcome breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-4">Outcome Breakdown</h2>
        <div className="space-y-3">
          {[
            { label: 'Grants', value: totalGrants, color: 'bg-green-500' },
            { label: 'Denials', value: totalDenials, color: 'bg-red-500' },
            { label: 'Removal Orders', value: totalRemovals, color: 'bg-red-700' },
          ].map(item => {
            const pct = totalCompleted > 0 ? (item.value / totalCompleted) * 100 : 0
            return (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{item.label}</span>
                  <span>{item.value.toLocaleString()} ({pct.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${item.color}`} style={{ width: `${Math.min(100, Math.max(1, pct))}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/rankings/most-backlogged" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📊 Most Backlogged</h3>
          <p className="text-xs text-gray-600 mt-1">States with the largest caseloads.</p>
        </Link>
        <Link href="/rankings/toughest-courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🔴 Toughest Courts</h3>
          <p className="text-xs text-gray-600 mt-1">Courts ranked by denial rate.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📍 Geographic Lottery</h3>
          <p className="text-xs text-gray-600 mt-1">How location affects outcomes.</p>
        </Link>
      </div>

      <div className="text-center mt-8">
        <Link href="/states" className="text-primary font-medium hover:underline">← Back to all states</Link>
      </div>
    </div>
  )
}
