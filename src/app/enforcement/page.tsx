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
  title: 'ICE Deportation & Enforcement Statistics FY2014-2026 — Removals, Arrests, Detention',
  description: 'ICE Enforcement and Removal Operations data FY2014-2026. 319K removals in FY2025, 56K FYTD in FY2026. Deportation trends, arrest statistics, and the enforcement gap.',
  alternates: { canonical: 'https://www.openimmigration.us/enforcement' },
}

export default function EnforcementPage() {
  const overview = loadData('immigration-overview.json')
  const enforcement = overview.enforcement.yearly
  const stats = loadData('stats.json')

  const totalRemovals = enforcement.reduce((s: number, y: { removals: number }) => s + y.removals, 0)
  const fullYears = enforcement.filter((y: { fy: number }) => y.fy < 2026) // exclude FYTD
  const peakYear = fullYears.reduce((max: { fy: number; removals: number }, y: { fy: number; removals: number }) => y.removals > max.removals ? y : max, fullYears[0])
  const lowYear = fullYears.reduce((min: { fy: number; removals: number }, y: { fy: number; removals: number }) => y.removals < min.removals ? y : min, fullYears[0])
  const latest = enforcement[enforcement.length - 2] // latest full year (FY2025)
  const fytd = enforcement[enforcement.length - 1] // FY2026 FYTD

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
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{lowYear.removals.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Low (FY{lowYear.fy})</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">{fytd.removals.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">FY{fytd.fy} FYTD</div>
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
              <div>• <strong>FY{latest.fy} removals surged to {latest.removals.toLocaleString()}</strong> — a {((latest.removals / lowYear.removals - 1) * 100).toFixed(0)}% increase from the FY{lowYear.fy} low</div>
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

      {/* Why This Data Matters */}
      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Why This Data Matters</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            ICE removals are the final step in the immigration enforcement pipeline — the point where a court order becomes a plane ticket out of the country. But the data reveals a stark reality: actual deportations are a fraction of the removal orders issued by immigration courts. This gap between court orders and carried-out removals is the enforcement capacity problem at the heart of the immigration debate. You can order as many deportations as you want; executing them requires agents, detention beds, flights, and cooperation from receiving countries.
          </p>
          <p>
            The dramatic swings in removal numbers — from over 300,000 in peak years to under 60,000 during the FY2021 low — reflect how deeply enforcement is shaped by presidential priorities, not just law. COVID restrictions, prosecutorial discretion policies, sanctuary city dynamics, and budget allocations all determine how many people ICE can actually remove. The FY2025 surge shows what happens when enforcement is prioritized, but even at record levels, removals cover only a small fraction of the estimated 11-14 million unauthorized immigrants living in the United States.
          </p>
          <p>
            For the public, understanding enforcement data is essential to evaluating political promises about immigration. Claims of &quot;mass deportation&quot; must be weighed against the operational reality: ICE has approximately 6,000 enforcement agents covering the entire country, detention facilities hold around 30,000-40,000 people at any time, and each removal costs thousands of dollars. The numbers on this page show what the enforcement machine can actually do — and the enormous gap between rhetoric and reality.
          </p>
        </div>
      </section>

      {/* Enforcement Sub-Pages */}
      <div className="mt-12 mb-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Explore ICE Enforcement Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/enforcement/arrests" className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 hover:shadow-lg hover:border-primary/40 transition-all group">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">🚔 Arrests by State</h3>
            <p className="text-sm text-gray-600 mt-2">450,000 ICE arrests in FY2025 — where enforcement is highest, field office breakdowns, and the sanctuary city debate.</p>
          </Link>
          <Link href="/enforcement/deportations" className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 hover:shadow-lg hover:border-primary/40 transition-all group">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">✈️ Deportations by Nationality</h3>
            <p className="text-sm text-gray-600 mt-2">319,980 removals in FY2025. Mexico leads at 38%, but Venezuelan deportations surged 1,000% since FY2020.</p>
          </Link>
          <Link href="/enforcement/detention" className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 hover:shadow-lg hover:border-primary/40 transition-all group">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">🏢 Detention Facilities</h3>
            <p className="text-sm text-gray-600 mt-2">238 facilities, 46,200 daily population. $215/day per detainee — the $3.2B detention system.</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Related Analysis */}
      <div className="mt-10 mb-6">
        <h3 className="font-heading text-lg font-bold mb-3">📖 Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/deportation-machine" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h4 className="font-bold text-sm">⚙️ The Deportation Machine</h4>
            <p className="text-xs text-gray-600 mt-1">How the enforcement pipeline works — from arrest to removal.</p>
          </Link>
          <Link href="/analysis/border-to-courtroom" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h4 className="font-bold text-sm">🏛️ Border to Courtroom</h4>
            <p className="text-xs text-gray-600 mt-1">The journey from border encounter to immigration court hearing.</p>
          </Link>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: ICE Enforcement and Removal Operations (ERO) statistics, DHS OHSS Immigration Enforcement Monthly Tables, FOIA data processed by <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Deportation Data Project</a>. Data current through March 2026.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
