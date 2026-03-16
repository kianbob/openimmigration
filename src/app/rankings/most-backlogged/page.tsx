import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

const US_CODES = new Set(['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC','PR','GU','VI','AS','MP'])

export const metadata: Metadata = {
  title: 'Most Backlogged Immigration Courts & States',
  description: 'Immigration courts and states with the largest pending caseloads. See where the backlog is worst.',
  alternates: { canonical: 'https://www.openimmigration.us/rankings/most-backlogged' },
}

export default function MostBackloggedPage() {
  const courtIndex = loadData('court-index.json')
  const states = loadData('states.json').filter((s: any) => US_CODES.has(s.code))
  const stats = loadData('stats.json')

  // Courts sorted by total cases (proxy for backlog — pending isn't always separate)
  const courtsByVolume = [...courtIndex]
    .filter((c: any) => c.cases > 0)
    .sort((a: any, b: any) => b.cases - a.cases)
    .slice(0, 30)

  const statesByVolume = [...states]
    .sort((a: any, b: any) => b.cases - a.cases)
    .slice(0, 20)

  const totalPending = stats.pendingCases

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Rankings' },
        { label: 'Most Backlogged' },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Most Backlogged Courts & States</h1>
      <p className="text-gray-600 mb-4">The immigration court system has <strong className="text-primary">{(totalPending / 1e6).toFixed(1)}M pending cases</strong>. Here&apos;s where the backlog is concentrated.</p>

      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
        <p className="text-sm text-red-800">
          <strong>📊 The Backlog Crisis:</strong> With {totalPending.toLocaleString()} pending cases and only {stats.totalJudges.toLocaleString()} judges,
          each judge carries an average caseload of {Math.round(totalPending / stats.totalJudges).toLocaleString()} cases.
          At current rates, it would take years to clear the backlog even if no new cases were filed.
        </p>
      </div>

      {/* By State */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-heading text-xl font-bold">📍 Top 20 States by Caseload</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">#</th>
                <th className="px-4 py-2 text-left font-semibold">State</th>
                <th className="px-4 py-2 text-right font-semibold">Total Cases</th>
                <th className="px-4 py-2 text-right font-semibold">% of National</th>
              </tr>
            </thead>
            <tbody>
              {statesByVolume.map((s: any, i: number) => {
                const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                return (
                  <tr key={s.code} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/states/${slug}`} className="text-primary hover:underline">{titleCase(s.name)}</Link>
                    </td>
                    <td className="px-4 py-2 text-right font-medium">{s.cases.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">{((s.cases / stats.totalCases) * 100).toFixed(1)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* By Court */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-heading text-xl font-bold">🏛️ Top 30 Courts by Caseload</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">#</th>
                <th className="px-4 py-2 text-left font-semibold">Court</th>
                <th className="px-4 py-2 text-left font-semibold">State</th>
                <th className="px-4 py-2 text-right font-semibold">Total Cases</th>
                <th className="px-4 py-2 text-right font-semibold">Completed</th>
                <th className="px-4 py-2 text-right font-semibold">Grant Rate</th>
              </tr>
            </thead>
            <tbody>
              {courtsByVolume.map((c: any, i: number) => (
                <tr key={c.slug} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium">
                    <Link href={`/courts/${c.slug}`} className="text-primary hover:underline">
                      {titleCase(c.city || c.name)}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{c.state}</td>
                  <td className="px-4 py-2 text-right font-medium">{c.cases.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{(c.completed || 0).toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    {c.grantRate != null ? (
                      <span className={c.grantRate >= 15 ? 'text-green-600' : c.grantRate >= 8 ? 'text-yellow-600' : 'text-red-600'}>
                        {c.grantRate}%
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <Link href="/rankings/toughest-courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🔴 Toughest Courts</h3>
          <p className="text-xs text-gray-600 mt-1">Courts ranked by denial rate.</p>
        </Link>
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📊 Backlog Overview</h3>
          <p className="text-xs text-gray-600 mt-1">Full backlog data and trends.</p>
        </Link>
        <Link href="/analysis/backlog-crisis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📈 Backlog Crisis</h3>
          <p className="text-xs text-gray-600 mt-1">How the backlog grew to record levels.</p>
        </Link>
      </div>
    </div>
  )
}
