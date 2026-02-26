import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'
import { BacklogGrowthChart } from './BacklogChart'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Court Backlog — Pending Cases',
  description: 'Track the U.S. immigration court backlog — pending cases, trends over time, and which courts are most affected.',
}

export default function BacklogPage() {
  const stats = loadData('stats.json')
  const trends = loadData('yearly-trends.json')
  const courts = loadData('courts.json')

  // Top courts by case volume
  const topCourts = courts.slice(0, 10)
  const recentTrends = trends.filter((t: { year: number }) => t.year >= 2010 && t.year <= 2025)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Court Backlog' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Court Backlog</h1>
      <p className="text-lg text-gray-600 mb-8">
        As of {stats.lastUpdated}, <strong>{stats.pendingCases.toLocaleString()}</strong> cases are pending before U.S. immigration courts.
        A total of <strong>{stats.totalCases.toLocaleString()}</strong> cases have been filed, with <strong>{stats.completedCases.toLocaleString()}</strong> completed.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">{(stats.pendingCases / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Total Pending Cases</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">{(stats.completedCases / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Cases Completed</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-warning">{stats.inAbsentia.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">In Absentia Orders</div>
        </div>
      </div>

      {/* Chart */}
      <h2 className="font-heading text-2xl font-bold mb-4">Cases Filed vs Completed Over Time</h2>
      <p className="text-gray-600 mb-4">
        When filed cases exceed completed cases, the backlog grows. This chart shows the annual gap.
      </p>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-12">
        <BacklogGrowthChart data={trends} />
      </div>

      {/* Historical Growth Table */}
      <h2 className="font-heading text-2xl font-bold mb-4">Year-by-Year Filing Trends (2010–2025)</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Year</th>
              <th className="px-4 py-3 text-right font-semibold">Filed</th>
              <th className="px-4 py-3 text-right font-semibold">Completed</th>
              <th className="px-4 py-3 text-right font-semibold">Net Change</th>
            </tr>
          </thead>
          <tbody>
            {recentTrends.map((row: { year: number; filed: number; completed: number }) => {
              const net = row.filed - row.completed
              return (
                <tr key={row.year} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{row.year}</td>
                  <td className="px-4 py-2 text-right">{row.filed.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{row.completed.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    <span className={net > 0 ? 'text-danger' : 'text-success'}>
                      {net > 0 ? '+' : ''}{net.toLocaleString()}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Top Courts */}
      <h2 className="font-heading text-2xl font-bold mb-4">Busiest Immigration Courts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {topCourts.map((court: { code: string; city: string; state: string; cases: number; completed: number; grantRate: number }, i: number) => (
          <div key={court.code} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-sm text-gray-500 mb-1">#{i + 1}</div>
            <div className="font-bold text-lg">{court.city}, {court.state}</div>
            <div className="text-primary text-2xl font-bold mt-1">{court.cases.toLocaleString()}</div>
            <div className="text-xs text-gray-500">total cases · {court.grantRate}% grant rate</div>
          </div>
        ))}
      </div>

      {/* Context */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>→ {stats.totalCases.toLocaleString()} total cases have been filed since records began</li>
              <li>→ {stats.inAbsentia.toLocaleString()} people received in absentia removal orders (didn&apos;t appear)</li>
              <li>→ {stats.totalJudges.toLocaleString()} judges across {stats.totalCourts} courts handle the entire caseload</li>
              <li>→ Only {stats.representationRate}% of those ordered deported had legal representation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many immigration court cases are pending?',
              acceptedAnswer: { '@type': 'Answer', text: `As of ${stats.lastUpdated}, there are ${stats.pendingCases.toLocaleString()} pending cases before U.S. immigration courts.` },
            },
            {
              '@type': 'Question',
              name: 'Why is the immigration court backlog so large?',
              acceptedAnswer: { '@type': 'Answer', text: 'The backlog has grown due to record levels of new cases filed, insufficient numbers of immigration judges, and systemic inefficiencies. New case filings consistently outpace completions.' },
            },
          ],
        })
      }} />
    </div>
  )
}
