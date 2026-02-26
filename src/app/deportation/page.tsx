import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

import { titleCase } from '@/lib/utils'
import DeportationCharts from './DeportationCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'U.S. Deportation Statistics & Data',
  description: 'U.S. deportation statistics — removal orders, voluntary departure, and deportation trends from DOJ EOIR data.',
}

export default function DeportationPage() {
  const stats = loadData('stats.json')
  const outcomes = loadData('outcomes.json')
  const trends = loadData('yearly-trends.json')
  const nationalities = loadData('nationalities.json').slice(0, 10)

  const recentTrends = trends.filter((t: { year: number }) => t.year >= 2010 && t.year <= 2025)
  const cleanOutcomes = outcomes.filter((o: { name: string; count: number }) =>
    o.count > 5000 && o.name.trim() && o.name !== 'ZERO BOND' && o.name.length > 2 && !o.name.includes('00:00:00')
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Deportation Statistics' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Deportation Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        Across all recorded cases, immigration courts have issued <strong>{stats.removalOrders.toLocaleString()}</strong> removal
        orders and <strong>{stats.voluntaryDeparture.toLocaleString()}</strong> voluntary departure orders.
        A total of <strong>{stats.inAbsentia.toLocaleString()}</strong> orders were issued in absentia (without the respondent present).
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">{stats.removalOrders.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Removal Orders</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-warning">{stats.voluntaryDeparture.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Voluntary Departure</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{stats.inAbsentia.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">In Absentia Orders</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-success">{stats.asylumGranted.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Asylum Granted</div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
        <DeportationCharts outcomes={cleanOutcomes} trends={recentTrends} />
      </div>

      {/* Top nationalities */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top Nationalities by Case Volume</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Nationality</th>
              <th className="px-4 py-3 text-right font-semibold">Total Cases</th>
            </tr>
          </thead>
          <tbody>
            {nationalities.map((n: { code: string; name: string; cases: number }, i: number) => (
              <tr key={n.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{titleCase(n.name)}</td>
                <td className="px-4 py-3 text-right font-bold">{n.cases.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* All Outcomes */}
      <h2 className="font-heading text-2xl font-bold mb-4">All Case Outcomes</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Outcome</th>
              <th className="px-4 py-3 text-right font-semibold">Count</th>
            </tr>
          </thead>
          <tbody>
            {outcomes.filter((o: { name: string; count: number }) => o.name && o.count > 100).map((o: { name: string; count: number }) => (
              <tr key={o.name} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{o.name}</td>
                <td className="px-4 py-2 text-right">{o.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 mb-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Understanding Deportation Data</h2>
        <p>
          &quot;Deportation&quot; in immigration court context includes two types of orders: <strong>removal orders</strong> ({stats.removalOrders.toLocaleString()} total)
          and <strong>voluntary departure</strong> ({stats.voluntaryDeparture.toLocaleString()} total). Both result in the person leaving the country.
        </p>
        <p>
          Notably, {stats.inAbsentia.toLocaleString()} orders were issued in absentia — meaning the respondent did not appear for their hearing.
          This represents a significant portion of all deportation orders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/deportation-machine" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 The Deportation Machine in 2025</h3>
          <p className="text-sm text-gray-600 mt-1">Record case closures, mass deportation orders, and what the numbers show.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚫 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">How deportation orders are issued without the immigrant present.</p>
        </Link>
        <Link href="/nationalities" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌍 By Nationality</h3>
          <p className="text-sm text-gray-600 mt-1">Explore case data by country of origin.</p>
        </Link>
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ By Court</h3>
          <p className="text-sm text-gray-600 mt-1">Explore outcomes by immigration court.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many removal orders have U.S. immigration courts issued?',
              acceptedAnswer: { '@type': 'Answer', text: `U.S. immigration courts have issued ${stats.removalOrders.toLocaleString()} removal orders and ${stats.voluntaryDeparture.toLocaleString()} voluntary departure orders across all recorded cases. ${stats.inAbsentia.toLocaleString()} were issued in absentia.` },
            },
          ],
        })
      }} />
    </div>
  )
}
