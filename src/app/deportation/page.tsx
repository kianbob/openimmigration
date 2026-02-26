import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'U.S. Deportation Statistics & Data',
  description: 'Current U.S. deportation statistics — 149,706 deportation orders in FY2026, 78.5% deportation rate. Explore deportation data by nationality, court, and year.',
}

export default function DeportationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Deportation Statistics' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Deportation Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        In FY2026 through December 2025, immigration judges ordered deportation in <strong>78.5%</strong> of
        completed cases — totaling <strong>149,706</strong> deportation orders. Here&apos;s what the data shows.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">149,706</div>
          <div className="text-sm text-gray-600 mt-1">Deportation Orders (FY2026 Q1)</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">78.5%</div>
          <div className="text-sm text-gray-600 mt-1">Deportation Rate</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-warning">38,215</div>
          <div className="text-sm text-gray-600 mt-1">Removal Orders (Dec 2025)</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">1.64%</div>
          <div className="text-sm text-gray-600 mt-1">Based on Criminal Activity</div>
        </div>
      </div>

      {/* Top nationalities */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top Nationalities Ordered Deported (FY2026)</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
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
            ].map((n, i) => (
              <tr key={n.name} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{n.name}</td>
                <td className="px-4 py-3 text-right font-bold">{n.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* December breakdown */}
      <h2 className="font-heading text-2xl font-bold mb-4">December 2025 Outcomes Breakdown</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Removal Orders', value: 38215, pct: '66.4%' },
          { label: 'Voluntary Departure', value: 7359, pct: '12.8%' },
          { label: 'Other Can Stay', value: 10502, pct: '18.3%' },
          { label: 'Granted Relief', value: 1455, pct: '2.5%' },
        ].map(item => (
          <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-xl font-bold">{item.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
            <div className="text-xs text-gray-400 mt-1">{item.pct}</div>
          </div>
        ))}
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 mb-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Understanding Deportation Data</h2>
        <p>
          &quot;Deportation&quot; in immigration court context includes two types of orders: <strong>removal orders</strong> (involuntary
          deportation) and <strong>voluntary departure</strong> (the immigrant agrees to leave, avoiding a formal removal
          on their record). Both result in the person leaving the country.
        </p>
        <p>
          Notably, only <strong>1.64%</strong> of new FY2026 cases sought deportation based on alleged criminal activity.
          The overwhelming majority of deportation proceedings are for immigration violations alone — entering without
          authorization or overstaying a visa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/deportation-machine" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 The Deportation Machine in 2025</h3>
          <p className="text-sm text-gray-600 mt-1">In-depth analysis of current deportation trends.</p>
        </Link>
        <Link href="/nationalities" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌍 By Nationality</h3>
          <p className="text-sm text-gray-600 mt-1">Explore deportation data by country of origin.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many people are deported from the U.S. each year?',
              acceptedAnswer: { '@type': 'Answer', text: 'In FY2026 through December 2025, immigration judges issued 149,706 deportation orders (removal orders plus voluntary departure). This represents 78.5% of all completed cases. Annual deportation orders have been increasing as courts close more cases.' },
            },
            {
              '@type': 'Question',
              name: 'What percentage of immigration cases result in deportation?',
              acceptedAnswer: { '@type': 'Answer', text: 'In December 2025, 79.2% of completed immigration court cases resulted in deportation (66.4% removal orders + 12.8% voluntary departure). Only 2.5% resulted in granted relief.' },
            },
          ],
        })
      }} />
    </div>
  )
}
