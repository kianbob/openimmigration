import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Dashboard — Immigration Court Overview',
  description: 'At-a-glance dashboard of U.S. immigration court statistics — pending cases, deportation rates, asylum outcomes, and trends.',
}

const stats = {
  pending: 3377998,
  asylumPending: 2339623,
  closedFY2026: 193858,
  newFY2026: 130642,
  deportationRate: 78.5,
  representationRate: 26.7,
  asylumGrantsDec: 701,
  removalOrdersDec: 38215,
  volDepDec: 7359,
  reliefDec: 1455,
  otherStayDec: 10502,
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]} />
      <h1 className="font-heading text-4xl font-bold mb-2">Immigration Court Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Data through December 2025 · Source: DOJ EOIR / TRAC</p>

      {/* Big numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-primary">{(stats.pending / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Pending Cases</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-primary">{(stats.asylumPending / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Asylum Backlog</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-danger">{stats.deportationRate}%</div>
          <div className="text-sm text-gray-600">Deportation Rate</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5">
          <div className="text-3xl font-bold text-warning">{stats.representationRate}%</div>
          <div className="text-sm text-gray-600">Had Lawyers (when deported)</div>
        </div>
      </div>

      {/* FY2026 Progress */}
      <h2 className="font-heading text-2xl font-bold mb-4">FY2026 Progress (Oct–Dec 2025)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.newFY2026.toLocaleString()}</div>
          <div className="text-sm text-gray-600">New Cases Filed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.closedFY2026.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Cases Closed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-success">+{(stats.closedFY2026 - stats.newFY2026).toLocaleString()}</div>
          <div className="text-sm text-gray-600">Net Backlog Reduction</div>
        </div>
      </div>

      {/* December 2025 Outcomes */}
      <h2 className="font-heading text-2xl font-bold mb-4">December 2025 Outcomes</h2>
      <p className="text-gray-600 mb-4">
        Breakdown of {(stats.removalOrdersDec + stats.volDepDec + stats.reliefDec + stats.otherStayDec).toLocaleString()} completed cases:
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">{stats.removalOrdersDec.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Removal Orders</div>
          <div className="text-xs text-gray-400 mt-1">66.4%</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-warning">{stats.volDepDec.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Voluntary Departure</div>
          <div className="text-xs text-gray-400 mt-1">12.8%</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{stats.otherStayDec.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Other Can Stay</div>
          <div className="text-xs text-gray-400 mt-1">18.3%</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-success">{stats.reliefDec.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Granted Relief</div>
          <div className="text-xs text-gray-400 mt-1">2.5%</div>
        </div>
      </div>

      {/* Top nationalities */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top Nationalities Ordered Deported (FY2026)</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Nationality</th>
              <th className="px-4 py-3 text-right font-semibold">Deportation Orders</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Mexico', count: 33830 },
              { name: 'Guatemala', count: 19169 },
              { name: 'Honduras', count: 18746 },
              { name: 'Venezuela', count: 14679 },
              { name: 'Colombia', count: 9328 },
            ].map(n => (
              <tr key={n.name} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{n.name}</td>
                <td className="px-4 py-3 text-right">{n.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top counties */}
      <h2 className="font-heading text-2xl font-bold mb-4">Most Backlogged Counties</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">County</th>
              <th className="px-4 py-3 text-right font-semibold">Pending Cases</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Miami-Dade County, FL', count: 147232 },
              { name: 'Cook County, IL', count: 112299 },
              { name: 'Queens County, NY', count: 105635 },
              { name: 'Los Angeles County, CA', count: 103128 },
              { name: 'Kings County, NY', count: 82990 },
            ].map(c => (
              <tr key={c.name} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-right">{c.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
