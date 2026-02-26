import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import StatesChart from './StatesChart'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Cases by State',
  description: 'Explore U.S. immigration court cases by state — case counts across all states and territories.',
}

export default function StatesPage() {
  const states = loadData('states.json')
  const stats = loadData('stats.json')
  const totalStateCases = states.reduce((s: number, st: { cases: number }) => s + st.cases, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'By State' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Cases by State</h1>
      <p className="text-lg text-gray-600 mb-8">
        {states.length} states and territories with immigration court cases. {titleCase(states[0].name)} leads
        with {states[0].cases.toLocaleString()} cases, followed by {titleCase(states[1].name)} ({states[1].cases.toLocaleString()}).
      </p>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-4">Top 20 States by Case Volume</h2>
        <StatesChart data={states} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-8">#</th>
              <th className="px-4 py-3 text-left font-semibold">State</th>
              <th className="px-4 py-3 text-left font-semibold">Code</th>
              <th className="px-4 py-3 text-right font-semibold">Total Cases</th>
              <th className="px-4 py-3 font-semibold">Share</th>
            </tr>
          </thead>
          <tbody>
            {states.map((st: { code: string; name: string; cases: number }, i: number) => (
              <tr key={st.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{titleCase(st.name)}</td>
                <td className="px-4 py-2 text-gray-500">{st.code}</td>
                <td className="px-4 py-2 text-right">{st.cases.toLocaleString()}</td>
                <td className="px-4 py-2 w-40">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${Math.min((st.cases / states[0].cases) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {((st.cases / totalStateCases) * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Data source: {stats.dataSource}
      </p>
    </div>
  )
}
