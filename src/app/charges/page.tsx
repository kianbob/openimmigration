import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import CaseTypesChart from './CaseTypesChart'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Case Types & Charges — Removal, Deportation, Asylum & More',
  description: 'What types of cases are filed in U.S. immigration courts — 8.3M removal, 902K deportation, 164K credible fear. Explore all case types.',
  alternates: { canonical: 'https://www.openimmigration.us/charges' },
}

export default function ChargesPage() {
  const caseTypes = loadData('case-types.json')
  const stats = loadData('stats.json')
  const totalCases = caseTypes.reduce((s: number, c: { count: number }) => s + c.count, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Case Types' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Case Types</h1>
      <p className="text-lg text-gray-600 mb-8">
        {totalCases.toLocaleString()} total cases across {caseTypes.filter((c: { count: number }) => c.count > 0).length} case types.
        Removal cases dominate at {caseTypes[0].count.toLocaleString()} ({((caseTypes[0].count / totalCases) * 100).toFixed(1)}%).
      </p>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-4">Case Type Distribution</h2>
        <CaseTypesChart data={caseTypes.filter((c: { count: number }) => c.count > 0).map((c: { name: string; count: number }) => ({ name: c.name, count: c.count }))} />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Case Type</th>
              <th className="px-4 py-3 text-left font-semibold">Code</th>
              <th className="px-4 py-3 text-right font-semibold">Count</th>
              <th className="px-4 py-3 text-right font-semibold">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {caseTypes.filter((c: { count: number }) => c.count > 0).map((c: { code: string; name: string; count: number }, i: number) => (
              <tr key={c.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{c.name}</td>
                <td className="px-4 py-2 text-gray-500">{c.code}</td>
                <td className="px-4 py-2 text-right">{c.count.toLocaleString()}</td>
                <td className="px-4 py-2 text-right text-gray-500">{((c.count / totalCases) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Understanding Case Types</h2>
        <p>
          When the government wants to remove someone from the U.S., they file a &quot;Notice to Appear&quot; (NTA)
          that initiates proceedings. The type of proceeding depends on when and how the person was encountered:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Removal ({caseTypes[0].count.toLocaleString()}):</strong> The standard proceeding since 1996. Covers anyone the government seeks to deport — from border crossers to visa overstays to longtime residents with criminal convictions.</li>
          <li><strong>Deportation ({caseTypes[1]?.count.toLocaleString()}):</strong> The older proceeding type (pre-1996 IIRIRA). Still appears in data for cases initiated before the law changed.</li>
          <li><strong>Exclusion ({caseTypes[2]?.count.toLocaleString()}):</strong> For people stopped at ports of entry before 1996. Replaced by &quot;inadmissibility&quot; under current law.</li>
          <li><strong>Credible Fear Review ({caseTypes[3]?.count.toLocaleString()}):</strong> Screening for asylum seekers apprehended at the border. A judge reviews whether there&apos;s a &quot;significant possibility&quot; the person could establish asylum eligibility.</li>
          <li><strong>Withholding Only ({caseTypes.find((c: { code: string }) => c.code === 'WHO')?.count.toLocaleString()}):</strong> For people ineligible for asylum (e.g., filed too late) but who may still face persecution. Higher burden of proof than asylum.</li>
          <li><strong>Asylum Only ({caseTypes.find((c: { code: string }) => c.code === 'AOC')?.count.toLocaleString()}):</strong> Affirmative asylum applications referred from USCIS after an initial denial. These go through the full court process.</li>
        </ul>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The 1996 Shift</h3>
              <p className="text-sm text-amber-800">
                The Illegal Immigration Reform and Immigrant Responsibility Act (IIRIRA) of 1996 fundamentally
                restructured immigration enforcement. &quot;Deportation&quot; and &quot;exclusion&quot; were merged into
                a single &quot;removal&quot; process. This is why 85.6% of cases are classified as &quot;Removal&quot; — it&apos;s
                the only category used for cases filed after 1996.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/deportation-machine" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚙️ The Deportation Machine</h3>
          <p className="text-sm text-gray-600 mt-1">How cases flow through the system and what outcomes look like.</p>
        </Link>
        <Link href="/deportation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Deportation Data</h3>
          <p className="text-sm text-gray-600 mt-1">Removal orders, voluntary departures, and case outcomes.</p>
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-8 text-center">Data source: {stats.dataSource}</p>
    </div>
  )
}
