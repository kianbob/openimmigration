import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Deportation Machine — 628,798 Removal Orders and Counting',
  description: '628,798 removal orders, 814,501 voluntary departures, 2.1 million in absentia orders. How the U.S. immigration court deportation system works.',
}

export default function DeportationMachinePage() {
  const stats = loadData('stats.json')
  const outcomes = loadData('outcomes.json')
  const topOutcomes = outcomes.filter((o: { name: string; count: number }) => o.count > 5000 && o.name.trim())

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'The Deportation Machine' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Enforcement</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Deportation Machine</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.removalOrders.toLocaleString()} removal orders. {stats.voluntaryDeparture.toLocaleString()} voluntary departures.
        {' '}{stats.inAbsentia.toLocaleString()} in absentia orders. How the system processes deportations at scale.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Pathways Out</h2>
        <p>
          When someone loses their immigration case, the outcome isn&apos;t always a dramatic deportation. The system
          has multiple channels for removal, each with different implications:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Removal orders ({stats.removalOrders.toLocaleString()}):</strong> A formal order of removal (formerly deportation). Carries a 10-year bar on reentry and potential criminal consequences for unlawful return.</li>
          <li><strong>Voluntary departure ({stats.voluntaryDeparture.toLocaleString()}):</strong> The respondent agrees to leave on their own, avoiding a formal removal order. No reentry bar, but they must leave by a deadline or face automatic removal.</li>
          <li><strong>In absentia orders ({stats.inAbsentia.toLocaleString()}):</strong> When a respondent doesn&apos;t appear for their hearing, the judge can order removal in their absence. These are often issued without any consideration of the merits.</li>
          <li><strong>Administrative closure ({stats.adminClosure.toLocaleString()}):</strong> Cases removed from the active docket without a final decision — effectively in limbo. Can be reopened later.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Case Outcomes Breakdown</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Outcome</th>
                <th className="px-4 py-2 text-right font-semibold">Count</th>
              </tr>
            </thead>
            <tbody>
              {topOutcomes.slice(0, 12).map((o: { name: string; count: number }) => (
                <tr key={o.name} className="border-t border-gray-100">
                  <td className="px-4 py-2">{o.name}</td>
                  <td className="px-4 py-2 text-right">{o.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The In Absentia Problem</h2>
        <p>
          Over 2.1 million proceedings — <strong>13.3% of all proceedings</strong> — ended with an in absentia order.
          That&apos;s 2.1 million cases where a person was ordered removed without anyone considering whether they
          had a valid claim.
        </p>
        <p>
          Why do people miss court? The reasons are more mundane than you&apos;d think: incorrect addresses on file,
          hearing notices sent to old addresses, confusion about rescheduled dates, inability to get to court
          (especially when detained in facilities hundreds of miles away), and — critically — lack of an attorney
          to keep track of deadlines.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Scale</h2>
        <p>
          The immigration court system has issued over {(stats.removalOrders + stats.voluntaryDeparture).toLocaleString()} formal
          removal and voluntary departure orders. Combined with {stats.asylumGranted.toLocaleString()} relief grants and
          {' '}{stats.adminClosure.toLocaleString()} administrative closures, this accounts for the bulk of the system&apos;s
          {' '}{stats.completedProceedings.toLocaleString()} completed proceedings.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Numbers</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ {stats.removalOrders.toLocaleString()} formal removal orders</li>
                <li>→ {stats.voluntaryDeparture.toLocaleString()} voluntary departures</li>
                <li>→ {stats.inAbsentia.toLocaleString()} in absentia orders (13.3% of proceedings)</li>
                <li>→ {stats.asylumGranted.toLocaleString()} relief grants ({((stats.asylumGranted/(stats.asylumGranted+stats.asylumDenied))*100).toFixed(1)}% grant rate)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/deportation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Deportation Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore removal orders and outcomes in detail.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚪 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.1 million people deported without being present.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'The Deportation Machine — 628,798 Removal Orders', url: 'https://www.openimmigration.us/analysis/deportation-machine', publisher: { '@type': 'Organization', name: 'OpenImmigration' } }) }} />
    </div>
  )
}
