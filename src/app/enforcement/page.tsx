import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { RemovalsByYearChart, RemovalsTrendChart } from './EnforcementCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'ICE Deportation & Enforcement Statistics FY2014-2026 — Removals, Arrests, Detention | OpenImmigration',
  description: 'ICE Enforcement and Removal Operations data FY2014-2026. 319K removals in FY2025, 56K FYTD in FY2026. Deportation trends, arrest statistics, and the enforcement gap.',
  alternates: { canonical: 'https://www.openimmigration.us/enforcement' },
}

export default function EnforcementPage() {
  const overview = loadData('immigration-overview.json')
  const enforcement = overview.enforcement.yearly
  const stats = loadData('stats.json')

  const totalRemovals = enforcement.reduce((s: number, y: { removals: number }) => s + y.removals, 0)
  const peakYear = enforcement.reduce((max: { fy: number; removals: number }, y: { fy: number; removals: number }) => y.removals > max.removals ? y : max, enforcement[0])
  const lowYear = enforcement.reduce((min: { fy: number; removals: number }, y: { fy: number; removals: number }) => y.removals < min.removals ? y : min, enforcement[0])
  const latest = enforcement[enforcement.length - 1]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'ICE Enforcement' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">ICE Deportation &amp; Enforcement Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        Immigration and Customs Enforcement (ICE) is responsible for interior enforcement, detention, and
        carrying out actual deportations. Since FY2014, ICE has removed <strong>{(totalRemovals / 1e6).toFixed(2)} million people</strong> from
        the United States — but the gap between court removal orders ({stats.removalOrders.toLocaleString()}) and
        actual ICE removals reveals a system where many orders are never executed.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(totalRemovals / 1e6).toFixed(2)}M</div>
          <div className="text-sm text-gray-600 mt-1">Total Removals</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{peakYear.removals.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Peak (FY{peakYear.fy})</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{lowYear.removals.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Low (FY{lowYear.fy})</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{latest.removals.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">FY{latest.fy}</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Removals collapsed to {lowYear.removals.toLocaleString()} in FY{lowYear.fy}</strong> — COVID plus policy changes slashed enforcement by 80%</div>
              <div>• <strong>FY{latest.fy} removals surged to {latest.removals.toLocaleString()}</strong> — the highest level since FY2014</div>
              <div>• <strong>Court orders ≠ actual deportations</strong> — {stats.removalOrders.toLocaleString()} removal orders issued, but ICE must locate and physically remove each person</div>
              <div>• <strong>&quot;Returns&quot; differ from &quot;removals&quot;</strong> — returns are voluntary departures; removals carry a formal bar on reentry</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <RemovalsByYearChart data={enforcement} />
        <RemovalsTrendChart data={enforcement} />
      </div>

      {/* Yearly table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">ICE Enforcement by Fiscal Year</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">Fiscal Year</th>
              <th className="px-6 py-3 font-semibold text-right">Removals</th>
              <th className="px-6 py-3 font-semibold text-right">Returns</th>
              <th className="px-6 py-3 font-semibold text-right">ICE Arrests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enforcement.map((y: { fy: number; removals: number; returns: number; iceArrestTotal: number }) => (
              <tr key={y.fy} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">FY{y.fy}{y.fy === 2026 ? ' (FYTD)' : ''}</td>
                <td className="px-6 py-3 text-right">{y.removals.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{y.returns.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{y.iceArrestTotal.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Removals vs. Returns</h2>
        <p>
          <strong>Removals</strong> (deportations) are the formal removal of a person from the U.S. under an
          order from an immigration judge or through expedited removal. A removal carries legal consequences —
          typically a 5, 10, or 20-year bar on reentry, or a permanent bar for certain criminal convictions.
        </p>
        <p>
          <strong>Returns</strong> are voluntary departures — the person leaves on their own, sometimes under
          an agreement with ICE. Returns don&apos;t carry the same reentry bar, making them less consequential
          but also less of a deterrent.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Enforcement Gap</h2>
        <p>
          Our immigration court data shows {stats.removalOrders.toLocaleString()} removal orders issued by
          judges, plus {stats.inAbsentia.toLocaleString()} in absentia deportation orders. But ICE can only
          deport people it can find. Interior enforcement depends on detainers (holds placed on people in
          state/local jails), workplace raids, targeted operations, and cooperation from local law enforcement.
        </p>
        <p>
          Sanctuary city policies, limited ICE resources, and the sheer scale of the unauthorized population
          (estimated 11-14 million) mean that many removal orders are never carried out.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The FY2021 Collapse</h2>
        <p>
          ICE removals fell to just {lowYear.removals.toLocaleString()} in FY{lowYear.fy} — an 80% drop from
          pre-pandemic levels. This was driven by COVID restrictions on detention, a policy shift toward
          prosecutorial discretion (focusing on &quot;priority&quot; cases), and a temporary halt on most
          deportations in early 2021.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">ICE Detention</h2>
        <p>
          ICE operates or contracts with over 200 detention facilities nationwide. The average daily detained
          population fluctuates between 20,000 and 40,000 depending on policy and border conditions. Detention
          costs approximately $150-$300 per person per day, making the detention system a multi-billion dollar
          operation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/border" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌎 Border Encounters</h3>
          <p className="text-sm text-gray-600 mt-1">{(12).toFixed(0)}M+ CBP encounters since FY2020.</p>
        </Link>
        <Link href="/deportation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📋 Court Deportation Orders</h3>
          <p className="text-sm text-gray-600 mt-1">{stats.removalOrders.toLocaleString()} removal orders from immigration judges.</p>
        </Link>
        <Link href="/overstays" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">✈️ Visa Overstays</h3>
          <p className="text-sm text-gray-600 mt-1">478K+ overstays per year — the other side of illegal immigration.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: ICE Enforcement and Removal Operations (ERO) statistics, DHS OHSS Immigration Enforcement Monthly Tables.
      </p>
    </div>
  )
}
