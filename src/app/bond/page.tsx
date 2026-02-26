import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { BondYearlyChart, BondAmountTrend, BondDecisionsPie } from './BondCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Bond Hearings — 1.59M Hearings, Average Bond $11,412',
  description: 'Explore 1.59 million immigration bond hearings. Average bond $11,412, median $7,500. Only 4.3% of bond requests granted. Bond amounts, trends, and outcomes.',
  alternates: { canonical: 'https://www.openimmigration.us/bond' },
}

export default function BondPage() {
  const bonds = loadData('bonds.json')
  const stats = loadData('stats.json')
  const custody = loadData('custody.json')
  const detained = custody.find((c: { code: string }) => c.code === 'D')
  const released = custody.find((c: { code: string }) => c.code === 'R')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Bond Hearings' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Bond Hearings</h1>
      <p className="text-lg text-gray-600 mb-8">
        When immigrants are detained, a bond hearing determines whether they can be released while their
        case proceeds. Our data covers <strong>{(bonds.totalBondHearings / 1e6).toFixed(2)} million bond hearings</strong> —
        with an average bond of <strong>${bonds.avgBondAmount.toLocaleString()}</strong> and a grant rate of
        just <strong>{bonds.grantRate}%</strong>.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(bonds.totalBondHearings / 1e6).toFixed(2)}M</div>
          <div className="text-sm text-gray-600 mt-1">Total Bond Hearings</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{bonds.granted.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Bond Granted ({bonds.grantRate}%)</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{bonds.denied.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Bond Denied</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">${bonds.avgBondAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Average Bond Amount</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Only {bonds.grantRate}% of bond requests are granted</strong> — the vast majority of detained immigrants remain locked up</div>
              <div>• <strong>Average bond: ${bonds.avgBondAmount.toLocaleString()}</strong> — median ${bonds.medianBondAmount.toLocaleString()} — unaffordable for most detainees</div>
              <div>• <strong>{bonds.totalWithBondAmount.toLocaleString()} hearings set a dollar amount</strong> — from the minimum $1,500 to $25,000+</div>
              <div>• <strong>35.5% of hearings are &quot;continued&quot;</strong> — kicked down the road, extending detention time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <BondYearlyChart data={bonds.yearlyBonds} />
        <BondAmountTrend data={bonds.yearlyBonds} />
      </div>
      <div className="mb-10">
        <BondDecisionsPie data={bonds.decisions} />
      </div>

      {/* Decision breakdown table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Bond Hearing Outcomes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-semibold">Outcome</th>
                <th className="px-6 py-3 font-semibold text-right">Count</th>
                <th className="px-6 py-3 font-semibold text-right">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bonds.decisions.filter((d: { name: string }) => d.name && d.name !== '\0').slice(0, 12).map((d: { name: string; count: number }) => {
                const labels: Record<string, string> = {
                  C: 'Continued', A: 'Administrative Close', N: 'No Bond',
                  S: 'Set Bond Amount', J: 'Jurisdictional', G: 'Bond Granted',
                  W: 'Withdrawn', R: 'Redetermination', D: 'Bond Denied',
                  E: 'Expired / Ended', I: 'Insufficient', O: 'Other', F: 'Final', L: 'Lifted',
                }
                return (
                  <tr key={d.name} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium">{labels[d.name] || d.name}</td>
                    <td className="px-6 py-3 text-right">{d.count.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right">{((d.count / bonds.totalBondHearings) * 100).toFixed(1)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">How Bond Hearings Work</h2>
        <p>
          Immigration bond hearings are separate from the main removal proceeding. They answer one question:
          should this person be released from detention while their case is pending?
        </p>
        <p>
          The judge considers two factors: whether the person is a flight risk and whether they pose a
          danger to the community. The minimum bond is $1,500, but the average is ${bonds.avgBondAmount.toLocaleString()} and
          the median is ${bonds.medianBondAmount.toLocaleString()}. Judges frequently set bonds at $5,000, $10,000, $15,000, or higher.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Bond Matters So Much</h2>
        <p>
          Bond isn&apos;t just about getting out of jail. It fundamentally changes case outcomes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Attorney access:</strong> Released immigrants can meet with lawyers and build their cases. Detained immigrants get minutes of phone access per day.</li>
          <li><strong>Evidence gathering:</strong> You can&apos;t get affidavits, country condition reports, or medical records from inside detention.</li>
          <li><strong>Family support:</strong> Released immigrants maintain connections, continue working, and avoid the psychological toll of indefinite detention.</li>
          <li><strong>Coercion reduction:</strong> Detained immigrants face constant pressure to accept voluntary departure rather than fight.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The ${bonds.medianBondAmount.toLocaleString()} Barrier</h2>
        <p>
          For an immigrant earning minimum wage (or nothing, while detained), a ${bonds.medianBondAmount.toLocaleString()} bond
          might as well be $7 million. Many families scrape together money from extended networks. Some use bond fund
          organizations. Many simply can&apos;t pay — and remain detained for months or years while their case proceeds.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Mandatory Detention</h2>
        <p>
          Not everyone gets a bond hearing. Certain categories trigger <strong>mandatory detention</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Certain criminal convictions (aggravated felonies, drug offenses, multiple convictions)</li>
          <li>Terrorism-related charges</li>
          <li>Arriving aliens at ports of entry (unless they pass a credible fear interview)</li>
          <li>People with prior removal orders who reentered illegally</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Custody Pipeline</h2>
        <p>
          Of all cases in our data, {detained?.count.toLocaleString()} involved detained individuals and
          {' '}{released?.count.toLocaleString()} were released from detention. Released individuals join
          the non-detained docket and typically have better outcomes — not because their cases are stronger,
          but because they have more resources to fight them.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/analysis/detained-vs-released" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🔒 Detained vs. Released</h3>
          <p className="text-sm text-gray-600 mt-1">How custody status shapes outcomes.</p>
        </Link>
        <Link href="/representation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation</h3>
          <p className="text-sm text-gray-600 mt-1">Detained immigrants have the lowest attorney access.</p>
        </Link>
        <Link href="/analysis/bond-system" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">💰 The Price of Freedom</h3>
          <p className="text-sm text-gray-600 mt-1">In-depth analysis of the immigration bond system.</p>
        </Link>
      </div>
    </div>
  )
}
