import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Case Types & Charges',
  description: 'What types of cases are filed in U.S. immigration courts — removal, deportation, asylum, credible fear, and more.',
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
        {totalCases.toLocaleString()} total proceedings across {caseTypes.length} case types.
        Removal cases dominate at {caseTypes[0].count.toLocaleString()} ({((caseTypes[0].count / totalCases) * 100).toFixed(1)}%).
      </p>

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
                <td className="px-4 py-2 text-right text-gray-500">{((c.count / totalCases) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Understanding Case Types</h2>
        <p>
          Immigration cases are initiated through a &quot;Notice to Appear&quot; (NTA) that specifies the charges.
          The vast majority are <strong>Removal</strong> proceedings ({caseTypes[0].count.toLocaleString()} cases),
          which is the modern process for deporting individuals from the United States.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Removal</strong> — The standard proceeding type since 1996</li>
          <li><strong>Deportation</strong> — The older proceeding type (pre-1996)</li>
          <li><strong>Exclusion</strong> — For individuals stopped at ports of entry (pre-1996)</li>
          <li><strong>Credible Fear Review</strong> — Screening for asylum seekers</li>
          <li><strong>Withholding Only</strong> — For those ineligible for asylum but fearing persecution</li>
          <li><strong>Asylum Only</strong> — Affirmative asylum cases referred from USCIS</li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8 text-center">
        Data source: {stats.dataSource}
      </p>
    </div>
  )
}
