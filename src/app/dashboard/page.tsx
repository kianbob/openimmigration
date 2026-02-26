import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'
import { YearlyTrendsChart, OutcomePieChart, TopNationalitiesChart, TopCourtsChart } from './DashboardCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Dashboard — Immigration Court Overview',
  description: 'At-a-glance dashboard of U.S. immigration court statistics — pending cases, deportation rates, asylum outcomes, and trends.',
}

export default function DashboardPage() {
  const stats = loadData('stats.json')
  const trends = loadData('yearly-trends.json')
  const nationalities = loadData('nationalities.json').slice(0, 20)
  const courts = loadData('courts.json').slice(0, 20)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]} />
      <h1 className="font-heading text-4xl font-bold mb-2">Immigration Court Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Source: {stats.dataSource} · Last updated {stats.lastUpdated}</p>

      {/* Big numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-primary">{(stats.totalCases / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Total Cases</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-primary">{(stats.pendingCases / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Pending Cases</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-success">{stats.asylumGranted.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Asylum Grants (All Time)</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-danger">{stats.removalOrders.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Removal Orders</div>
        </div>
      </div>

      {/* More stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.completedCases.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Completed Cases</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.inAbsentia.toLocaleString()}</div>
          <div className="text-sm text-gray-600">In Absentia Orders</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.voluntaryDeparture.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Voluntary Departures</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5">
          <div className="text-2xl font-bold text-warning">{stats.representationRate}%</div>
          <div className="text-sm text-gray-600">Representation Rate</div>
        </div>
      </div>

      {/* Yearly Trends Chart */}
      <h2 className="font-heading text-2xl font-bold mb-4">Cases Filed vs Completed (2000–2025)</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-10">
        <YearlyTrendsChart data={trends} />
      </div>

      {/* Outcome Breakdown */}
      <h2 className="font-heading text-2xl font-bold mb-4">Case Outcome Breakdown</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-10">
        <OutcomePieChart stats={stats} />
      </div>

      {/* Top Nationalities */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top 20 Nationalities by Case Volume</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-10">
        <TopNationalitiesChart data={nationalities} />
      </div>

      {/* Top Courts */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top 20 Courts by Case Volume</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-10">
        <TopCourtsChart data={courts} />
      </div>

      {/* System overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{stats.totalJudges.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Immigration Judges</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{stats.totalCourts}</div>
          <div className="text-sm text-gray-600">Immigration Courts</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{stats.totalNationalities}</div>
          <div className="text-sm text-gray-600">Nationalities</div>
        </div>
      </div>
    </div>
  )
}
