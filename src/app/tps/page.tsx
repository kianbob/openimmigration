import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { TPSByCountryChart, TPSOutcomesPie } from './TPSChart'

// Hardcoded from USCIS TPS I-821 data FY2025 Q3
const tpsCountries = [
  { country: 'Venezuela', received: 381883, approved: 125129, denied: 10682, pending: 403320 },
  { country: 'Haiti', received: 109840, approved: 124517, denied: 4502, pending: 331355 },
  { country: 'Ukraine', received: 140346, approved: 44657, denied: 875, pending: 143364 },
  { country: 'El Salvador', received: 120804, approved: 9510, denied: 1442, pending: 117192 },
  { country: 'Afghanistan', received: 575, approved: 0, denied: 0, pending: 9206 },
  { country: 'Honduras', received: 3969, approved: 11177, denied: 1983, pending: 2999 },
  { country: 'Somalia', received: 1001, approved: 450, denied: 19, pending: 1588 },
  { country: 'Syria', received: 419, approved: 762, denied: 67, pending: 1006 },
  { country: 'Lebanon', received: 1322, approved: 339, denied: 0, pending: 970 },
  { country: 'Sudan', received: 1219, approved: 514, denied: 180, pending: 856 },
  { country: 'Nicaragua', received: 749, approved: 54, denied: 0, pending: 657 },
  { country: 'Cameroon', received: 697, approved: 2643, denied: 259, pending: 698 },
  { country: 'Yemen', received: 459, approved: 1240, denied: 50, pending: 411 },
  { country: 'Ethiopia', received: 1215, approved: 1172, denied: 192, pending: 316 },
  { country: 'Burma', received: 618, approved: 919, denied: 185, pending: 188 },
  { country: 'Nepal', received: 211, approved: 3571, denied: 200, pending: 130 },
  { country: 'South Sudan', received: 66, approved: 44, denied: 0, pending: 68 },
]

const totalReceived = 765393
const totalApproved = 326760
const totalDenied = 21058
const totalPending = 1014324

export const metadata: Metadata = {
  title: 'Temporary Protected Status (TPS) — 1 Million+ Pending Applications | OpenImmigration',
  description: 'TPS data: 1,014,324 pending applications from 17 countries. Venezuela (403K), Haiti (331K), Ukraine (143K). Application trends, approval rates, and policy context.',
  alternates: { canonical: 'https://www.openimmigration.us/tps' },
}

export default function TPSPage() {
  const topByPending = [...tpsCountries].sort((a, b) => b.pending - a.pending)
  const approvalRate = ((totalApproved / (totalApproved + totalDenied)) * 100).toFixed(1)

  const outcomes = [
    { name: 'Pending', value: totalPending },
    { name: 'Approved', value: totalApproved },
    { name: 'Denied', value: totalDenied },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Temporary Protected Status' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Temporary Protected Status (TPS)</h1>
      <p className="text-lg text-gray-600 mb-8">
        Temporary Protected Status allows nationals from designated countries experiencing armed conflict, natural
        disasters, or other extraordinary conditions to live and work in the U.S. temporarily. As of June 2025,
        there are <strong>{totalPending.toLocaleString()} pending TPS applications</strong> from 17 countries —
        with Venezuela, Haiti, and Ukraine making up the vast majority.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(totalPending / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Pending</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{(totalApproved / 1e3).toFixed(0)}K</div>
          <div className="text-sm text-gray-600 mt-1">Approved (FY2025)</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{approvalRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Approval Rate</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">17</div>
          <div className="text-sm text-gray-600 mt-1">Designated Countries</div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Venezuela dominates with 403K pending</strong> — reflecting the mass exodus from economic collapse and political crisis</div>
              <div>• <strong>Haiti has 331K pending</strong> — designated after the 2010 earthquake and repeatedly redesignated through political instability</div>
              <div>• <strong>Ukraine surged to 143K</strong> — designated after Russia&apos;s 2022 invasion, one of the fastest-growing TPS populations</div>
              <div>• <strong>{approvalRate}% approval rate</strong> — most denials are procedural (late filing, ineligibility), not merit-based</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <TPSByCountryChart data={topByPending.slice(0, 10)} />
        <TPSOutcomesPie data={outcomes} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">TPS Applications by Country (FY2025 through Q3)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold text-right">Received</th>
                <th className="px-4 py-3 font-semibold text-right">Approved</th>
                <th className="px-4 py-3 font-semibold text-right">Denied</th>
                <th className="px-4 py-3 font-semibold text-right">Pending</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topByPending.map(c => (
                <tr key={c.country} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{c.country}</td>
                  <td className="px-4 py-3 text-right">{c.received.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-green-700">{c.approved.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-red-600">{c.denied.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium">{c.pending.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">{totalReceived.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-green-700">{totalApproved.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-red-600">{totalDenied.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{totalPending.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Is TPS?</h2>
        <p>
          TPS is a temporary immigration status granted to nationals of countries experiencing ongoing armed
          conflict, environmental disasters, or other extraordinary conditions that prevent safe return. It
          provides work authorization and protection from deportation — but does <strong>not</strong> lead to
          a green card or permanent residency.
        </p>
        <p>
          The Secretary of Homeland Security designates countries for TPS. Designations last 6-18 months and
          can be extended. Some countries (like El Salvador and Honduras) have been designated for over 20 years,
          leading critics to argue that &quot;temporary&quot; has become permanent in practice.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">TPS vs. Asylum</h2>
        <p>
          TPS and asylum are often confused but are fundamentally different:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>TPS</strong> is country-wide — everyone from the designated country qualifies. No individual persecution required.</li>
          <li><strong>Asylum</strong> requires individual proof of persecution or well-founded fear based on race, religion, nationality, political opinion, or social group.</li>
          <li><strong>TPS</strong> is explicitly temporary. <strong>Asylum</strong> leads to permanent residency after one year.</li>
          <li><strong>TPS holders</strong> entered the U.S. before the designation date. <strong>Asylum seekers</strong> can apply at any time.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Political Controversy</h2>
        <p>
          TPS has become a major political flashpoint. The Trump administration attempted to terminate TPS for
          several countries (El Salvador, Haiti, Honduras, Nicaragua, Nepal, Sudan) arguing conditions had improved.
          Courts blocked many of these terminations. The Biden administration redesignated and extended TPS for
          most countries and added new ones (Ukraine, Venezuela, Afghanistan, Cameroon).
        </p>
        <p>
          The current Trump administration has again moved to end TPS for several countries, creating uncertainty
          for over a million people who have built lives, businesses, and families in the U.S. over years or decades.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/asylum" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🛡️ Asylum</h3>
          <p className="text-sm text-gray-600 mt-1">Individual protection claims — different from country-wide TPS.</p>
        </Link>
        <Link href="/daca" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🎓 DACA</h3>
          <p className="text-sm text-gray-600 mt-1">515K Dreamers — another &quot;temporary&quot; program that became long-term.</p>
        </Link>
        <Link href="/legal-immigration" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🗽 Legal Immigration</h3>
          <p className="text-sm text-gray-600 mt-1">TPS doesn&apos;t lead to green cards — see the pathways that do.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: USCIS Form I-821 data, FY2025 Q3 (through June 30, 2025). &quot;D&quot; and &quot;H&quot; values from USCIS suppressed for disclosure standards.
      </p>
    </div>
  )
}
