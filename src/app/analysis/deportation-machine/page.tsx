import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Deportation Machine — How the System Processes 1.3 Million Cases a Year',
  description: '628,798 removal orders, 814,501 voluntary departures, 2.1M in absentia orders, 194,743 administrative closures. Inside the immigration court pipeline.',
}

export default function DeportationMachinePage() {
  const stats = loadData('stats.json')
  const outcomes = loadData('outcomes.json')
  const trends = loadData('yearly-trends.json')
  const caseTypes = loadData('case-types.json')

  const cleanOutcomes = outcomes.filter((o: { name: string; count: number }) =>
    o.count > 1000 && o.name.trim() && o.name !== 'ZERO BOND' && o.name.length > 2 && !o.name.includes('00:00:00')
  )

  const recentTrends = trends.filter((t: { year: number }) => t.year >= 2015 && t.year <= 2025)
  const totalRemoval = stats.removalOrders + stats.voluntaryDeparture + stats.inAbsentia

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'The Deportation Machine' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Enforcement</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Deportation Machine</h1>
      <p className="text-lg text-gray-600 mb-8">
        In 2025, U.S. immigration courts completed 1,298,639 cases — an all-time record. Here&apos;s how
        the system processes cases at industrial scale, and what happens to the people inside it.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 not-prose">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(stats.removalOrders / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-600 mt-1">Removal Orders</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{(stats.voluntaryDeparture / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-600 mt-1">Voluntary Departures</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">2.16M</div>
          <div className="text-xs text-gray-600 mt-1">In Absentia Orders</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{(stats.asylumGranted / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-600 mt-1">Relief Granted</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Five Ways Out of Immigration Court</h2>
        <p>
          There&apos;s a common misconception that immigration court has two outcomes: you stay or you get
          deported. The reality is more nuanced — and more revealing:
        </p>

        <div className="not-prose space-y-3 my-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-green-900">1. Relief Granted</div>
                <div className="text-sm text-green-700">Asylum, cancellation of removal, VAWA, CAT protection</div>
              </div>
              <div className="text-xl font-bold text-green-700">{stats.asylumGranted.toLocaleString()}</div>
            </div>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-red-900">2. Removal Order (Deport)</div>
                <div className="text-sm text-red-700">Formal deportation — 10-year reentry bar, criminal penalties for return</div>
              </div>
              <div className="text-xl font-bold text-red-700">{stats.removalOrders.toLocaleString()}</div>
            </div>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-amber-900">3. Voluntary Departure</div>
                <div className="text-sm text-amber-700">Leave on your own terms — no formal bar, but you must go</div>
              </div>
              <div className="text-xl font-bold text-amber-700">{stats.voluntaryDeparture.toLocaleString()}</div>
            </div>
          </div>
          <div className="bg-gray-100 border-l-4 border-gray-500 p-4 rounded-r-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-gray-900">4. In Absentia Removal</div>
                <div className="text-sm text-gray-700">Ordered removed without being present — the silent majority</div>
              </div>
              <div className="text-xl font-bold text-gray-700">{stats.inAbsentia.toLocaleString()}</div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-blue-900">5. Administrative Closure / Dismissal</div>
                <div className="text-sm text-blue-700">Shelved, dismissed, or terminated — in legal limbo</div>
              </div>
              <div className="text-xl font-bold text-blue-700">{(stats.adminClosure + 647910).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Full Outcome Breakdown</h2>
        <p>Here&apos;s every significant case outcome in the system:</p>

        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Outcome</th>
                <th className="px-4 py-3 text-right font-semibold">Count</th>
                <th className="px-4 py-3 text-right font-semibold">% of Completed</th>
              </tr>
            </thead>
            <tbody>
              {cleanOutcomes.map((o: { name: string; count: number }) => (
                <tr key={o.name} className="border-t border-gray-100">
                  <td className="px-4 py-2">{o.name}</td>
                  <td className="px-4 py-2 text-right font-medium">{o.count.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-gray-500">{((o.count / stats.completedProceedings) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Case Types: Not Just Asylum</h2>
        <p>
          Public discourse focuses on asylum, but the immigration court system handles many case types:
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Case Type</th>
                <th className="px-4 py-3 text-right font-semibold">Count</th>
                <th className="px-4 py-3 text-right font-semibold">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {caseTypes.filter((c: { count: number }) => c.count > 100).map((c: { code: string; name: string; count: number }) => (
                <tr key={c.code} className="border-t border-gray-100">
                  <td className="px-4 py-2">{c.name} <span className="text-gray-400 text-xs">({c.code})</span></td>
                  <td className="px-4 py-2 text-right font-medium">{c.count.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-gray-500">{((c.count / stats.totalCases) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>85.6% are &quot;Removal&quot; cases</strong> — the modern catch-all for immigration court proceedings.
          &quot;Deportation&quot; cases (pre-1996 law) account for 9.3%, reflecting older proceedings. Credible Fear
          Reviews (1.7%), the screening process for asylum seekers apprehended at the border, have surged in recent years.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The 2024-2025 Acceleration</h2>
        <p>
          Something dramatic happened in 2024: case completions nearly doubled from the previous peak. The system
          went from completing 965,176 cases in 2023 to 1,290,672 in 2024 — a <strong>34% increase in a single year</strong>.
          In 2025, it stayed at 1,298,639.
        </p>

        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left font-semibold">Year</th>
                <th className="px-3 py-3 text-right font-semibold">Filed</th>
                <th className="px-3 py-3 text-right font-semibold">Completed</th>
                <th className="px-3 py-3 text-right font-semibold">Net</th>
                <th className="px-3 py-3 text-right font-semibold">Grants</th>
                <th className="px-3 py-3 text-right font-semibold">Grant %</th>
              </tr>
            </thead>
            <tbody>
              {recentTrends.map((t: { year: number; filed: number; completed: number; grants: number }) => {
                const net = t.filed - t.completed
                return (
                  <tr key={t.year} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-medium">{t.year}</td>
                    <td className="px-3 py-2 text-right">{t.filed.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">{t.completed.toLocaleString()}</td>
                    <td className={`px-3 py-2 text-right font-medium ${net > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {net > 0 ? '+' : ''}{net.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right">{t.grants.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">{((t.grants / t.completed) * 100).toFixed(1)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p>
          Notice the grant rate: it dropped from 5.4% in 2023 to 3.8% in 2024 to 2.9% in 2025 — even as completions
          surged. This strongly suggests the system isn&apos;t completing more cases by hearing more of them fairly;
          it&apos;s completing them by issuing more in absentia orders, voluntary departures, and expedited removals.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Voluntary Departure: The &quot;Soft&quot; Option</h2>
        <p>
          {stats.voluntaryDeparture.toLocaleString()} cases ended in voluntary departure — a deal where the
          respondent agrees to leave by a specific date. It sounds like a lighter outcome, and in some ways it
          is: no formal removal order, no reentry bar, no criminal consequences.
        </p>
        <p>
          But it&apos;s often less voluntary than the name suggests. Many respondents accept VD because:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>They&apos;re detained and want to get out of jail faster</li>
          <li>They can&apos;t afford a lawyer to fight their case</li>
          <li>The judge or ICE attorney pressures them to accept</li>
          <li>They don&apos;t understand their rights or options</li>
        </ul>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-900 mb-2">The Real Number</h3>
              <p className="text-sm text-red-800">
                Add it up: {stats.removalOrders.toLocaleString()} removal orders + {stats.voluntaryDeparture.toLocaleString()} voluntary
                departures + {stats.inAbsentia.toLocaleString()} in absentia orders = <strong>{totalRemoval.toLocaleString()} people</strong> ordered
                out of the country through the immigration court system alone. That&apos;s not counting ICE enforcement actions,
                expedited removal at the border, or stipulated orders — just the court system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/deportation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Deportation Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore removal orders and outcomes in detail.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚪 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.1 million ordered removed without showing up.</p>
        </Link>
        <Link href="/analysis/backlog-crisis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📈 Backlog Crisis</h3>
          <p className="text-sm text-gray-600 mt-1">How 1.9 million cases piled up.</p>
        </Link>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/deportation-machine" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Deportation Machine — How the System Processes 1.3 Million Cases a Year',
        url: 'https://www.openimmigration.us/analysis/deportation-machine',
        publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
      }) }} />
    </div>
  )
}
