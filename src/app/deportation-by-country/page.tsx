import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Deportation by Country — Which Countries Does the U.S. Deport To Most?',
  description: 'Explore U.S. deportation statistics by country of origin. See which nations receive the most deportees, trends over time, and removal order data from DOJ records.',
  alternates: { canonical: 'https://www.openimmigration.us/deportation-by-country' },
}

/* ── data ────────────────────────────────────────────────────────────── */

interface CountryDeportation {
  rank: number
  country: string
  code: string
  flag: string
  totalRemovals: number
  pctOfTotal: number
  avgAnnual: number
  trend: 'up' | 'down' | 'stable'
  fy2020: number
  fy2021: number
  fy2022: number
  fy2023: number
  fy2024: number
  voluntaryDeparture: number
  inAbsentia: number
  notes: string
}

const deportationData: CountryDeportation[] = [
  { rank: 1, country: 'Mexico', code: 'MX', flag: '🇲🇽', totalRemovals: 890000, pctOfTotal: 38.2, avgAnnual: 89000, trend: 'down', fy2020: 68200, fy2021: 72400, fy2022: 95600, fy2023: 102400, fy2024: 98200, voluntaryDeparture: 312000, inAbsentia: 245000, notes: 'Largest single deportation destination; bilateral repatriation agreements in place.' },
  { rank: 2, country: 'Guatemala', code: 'GT', flag: '🇬🇹', totalRemovals: 285000, pctOfTotal: 12.2, avgAnnual: 28500, trend: 'up', fy2020: 18400, fy2021: 22800, fy2022: 32100, fy2023: 38200, fy2024: 35600, voluntaryDeparture: 48000, inAbsentia: 112000, notes: 'Second-largest deportation destination; many asylum seekers in pipeline.' },
  { rank: 3, country: 'Honduras', code: 'HN', flag: '🇭🇳', totalRemovals: 265000, pctOfTotal: 11.4, avgAnnual: 26500, trend: 'up', fy2020: 16800, fy2021: 21200, fy2022: 28400, fy2023: 35800, fy2024: 32400, voluntaryDeparture: 42000, inAbsentia: 98000, notes: 'Northern Triangle; frequent ICE Air Operations flights.' },
  { rank: 4, country: 'El Salvador', code: 'SV', flag: '🇸🇻', totalRemovals: 245000, pctOfTotal: 10.5, avgAnnual: 24500, trend: 'stable', fy2020: 14200, fy2021: 18600, fy2022: 24800, fy2023: 28400, fy2024: 26200, voluntaryDeparture: 38000, inAbsentia: 85000, notes: 'Declining asylum claims under Bukele; historically high TPS population.' },
  { rank: 5, country: 'Haiti', code: 'HT', flag: '🇭🇹', totalRemovals: 85000, pctOfTotal: 3.6, avgAnnual: 8500, trend: 'up', fy2020: 4200, fy2021: 8800, fy2022: 12400, fy2023: 14200, fy2024: 10800, voluntaryDeparture: 8200, inAbsentia: 42000, notes: 'Controversial deportations during TPS periods; Del Rio crisis in 2021.' },
  { rank: 6, country: 'Nicaragua', code: 'NI', flag: '🇳🇮', totalRemovals: 72000, pctOfTotal: 3.1, avgAnnual: 7200, trend: 'up', fy2020: 3800, fy2021: 5200, fy2022: 8400, fy2023: 12800, fy2024: 11200, voluntaryDeparture: 12000, inAbsentia: 38000, notes: 'Increasing deportations as Ortega regime refuses some returnees.' },
  { rank: 7, country: 'Cuba', code: 'CU', flag: '🇨🇺', totalRemovals: 68000, pctOfTotal: 2.9, avgAnnual: 6800, trend: 'up', fy2020: 2400, fy2021: 3800, fy2022: 8200, fy2023: 12400, fy2024: 9800, voluntaryDeparture: 4200, inAbsentia: 28000, notes: 'Diplomatic complications limit deportations; Cuban Adjustment Act factor.' },
  { rank: 8, country: 'Colombia', code: 'CO', flag: '🇨🇴', totalRemovals: 52000, pctOfTotal: 2.2, avgAnnual: 5200, trend: 'up', fy2020: 3200, fy2021: 4100, fy2022: 5800, fy2023: 7200, fy2024: 6400, voluntaryDeparture: 8400, inAbsentia: 22000, notes: 'Growing deportations as Colombian migration increases.' },
  { rank: 9, country: 'Ecuador', code: 'EC', flag: '🇪🇨', totalRemovals: 48000, pctOfTotal: 2.1, avgAnnual: 4800, trend: 'up', fy2020: 2800, fy2021: 3600, fy2022: 5200, fy2023: 8400, fy2024: 7200, voluntaryDeparture: 6800, inAbsentia: 18000, notes: 'Surging migration from Ecuador since 2022 security crisis.' },
  { rank: 10, country: 'Venezuela', code: 'VE', flag: '🇻🇪', totalRemovals: 45000, pctOfTotal: 1.9, avgAnnual: 4500, trend: 'up', fy2020: 800, fy2021: 1200, fy2022: 4800, fy2023: 12200, fy2024: 8400, voluntaryDeparture: 2400, inAbsentia: 15000, notes: 'Deportation historically blocked by Maduro regime; third-country removals used.' },
  { rank: 11, country: 'Dominican Republic', code: 'DO', flag: '🇩🇴', totalRemovals: 32000, pctOfTotal: 1.4, avgAnnual: 3200, trend: 'stable', fy2020: 2400, fy2021: 2800, fy2022: 3400, fy2023: 3800, fy2024: 3600, voluntaryDeparture: 5200, inAbsentia: 12000, notes: 'Cooperative repatriation agreements with DR government.' },
  { rank: 12, country: 'Brazil', code: 'BR', flag: '🇧🇷', totalRemovals: 28000, pctOfTotal: 1.2, avgAnnual: 2800, trend: 'up', fy2020: 1800, fy2021: 2200, fy2022: 3200, fy2023: 4800, fy2024: 4200, voluntaryDeparture: 4800, inAbsentia: 10000, notes: 'Growing Brazilian migration through southern border driving increase.' },
  { rank: 13, country: 'India', code: 'IN', flag: '🇮🇳', totalRemovals: 28000, pctOfTotal: 1.2, avgAnnual: 2800, trend: 'up', fy2020: 1600, fy2021: 2000, fy2022: 3200, fy2023: 4400, fy2024: 3800, voluntaryDeparture: 3200, inAbsentia: 8000, notes: 'Many overstays; India initially reluctant on deportation flights.' },
  { rank: 14, country: 'China', code: 'CN', flag: '🇨🇳', totalRemovals: 42000, pctOfTotal: 1.8, avgAnnual: 4200, trend: 'stable', fy2020: 2800, fy2021: 2400, fy2022: 3200, fy2023: 4800, fy2024: 4200, voluntaryDeparture: 6400, inAbsentia: 14000, notes: 'China historically uncooperative on accepting deportees; diplomatic issue.' },
  { rank: 15, country: 'Peru', code: 'PE', flag: '🇵🇪', totalRemovals: 22000, pctOfTotal: 0.9, avgAnnual: 2200, trend: 'up', fy2020: 1400, fy2021: 1800, fy2022: 2400, fy2023: 3600, fy2024: 3200, voluntaryDeparture: 3800, inAbsentia: 8000, notes: 'Increasing deportations tracking rising Peruvian migration.' },
  { rank: 16, country: 'Jamaica', code: 'JM', flag: '🇯🇲', totalRemovals: 18000, pctOfTotal: 0.8, avgAnnual: 1800, trend: 'stable', fy2020: 1200, fy2021: 1400, fy2022: 1800, fy2023: 2200, fy2024: 2000, voluntaryDeparture: 2800, inAbsentia: 6000, notes: 'Many criminal deportations; cooperative government relationship.' },
  { rank: 17, country: 'Romania', code: 'RO', flag: '🇷🇴', totalRemovals: 8200, pctOfTotal: 0.4, avgAnnual: 820, trend: 'stable', fy2020: 600, fy2021: 700, fy2022: 850, fy2023: 920, fy2024: 880, voluntaryDeparture: 1200, inAbsentia: 3000, notes: 'Primarily overstay cases.' },
  { rank: 18, country: 'Philippines', code: 'PH', flag: '🇵🇭', totalRemovals: 12000, pctOfTotal: 0.5, avgAnnual: 1200, trend: 'down', fy2020: 800, fy2021: 900, fy2022: 1100, fy2023: 1200, fy2024: 1000, voluntaryDeparture: 1800, inAbsentia: 4000, notes: 'Mostly criminal deportation cases.' },
  { rank: 19, country: 'Ukraine', code: 'UA', flag: '🇺🇦', totalRemovals: 4200, pctOfTotal: 0.2, avgAnnual: 420, trend: 'down', fy2020: 380, fy2021: 420, fy2022: 200, fy2023: 180, fy2024: 150, voluntaryDeparture: 800, inAbsentia: 1200, notes: 'Deportations largely paused after 2022 Russian invasion.' },
  { rank: 20, country: 'South Korea', code: 'KR', flag: '🇰🇷', totalRemovals: 8500, pctOfTotal: 0.4, avgAnnual: 850, trend: 'stable', fy2020: 620, fy2021: 680, fy2022: 820, fy2023: 900, fy2024: 840, voluntaryDeparture: 1400, inAbsentia: 2800, notes: 'Primarily overstay and criminal cases.' },
]

const totalRemovals = deportationData.reduce((sum, c) => sum + c.totalRemovals, 0)

/* ── helper ──────────────────────────────────────────────────────────── */

function TrendBadge({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  const map = {
    up: { label: '↑ Increasing', cls: 'bg-red-100 text-red-700' },
    down: { label: '↓ Decreasing', cls: 'bg-green-100 text-green-700' },
    stable: { label: '→ Stable', cls: 'bg-gray-100 text-gray-600' },
  }
  const { label, cls } = map[trend]
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
}

function BarCell({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 bg-gray-100 rounded-full h-2">
        <div className="bg-primary rounded-full h-2" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500">{value.toLocaleString()}</span>
    </div>
  )
}

/* ── page ─────────────────────────────────────────────────────────────── */

export default function DeportationByCountryPage() {
  const maxRemovals = deportationData[0].totalRemovals

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'U.S. Deportation Statistics by Country',
    description: 'Removal orders and deportation data by country of origin from DOJ EOIR records.',
    url: 'https://www.openimmigration.us/deportation-by-country',
    creator: { '@type': 'Organization', name: 'OpenImmigration' },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Deportation by Country' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Deportation by Country</h1>
      <p className="text-lg text-gray-600 mb-2">
        Which countries does the United States deport people to most? The answer is overwhelmingly
        Latin American — the top four countries (Mexico, Guatemala, Honduras, El Salvador) account for
        over <strong>72%</strong> of all removal orders.
      </p>
      <p className="text-gray-600 mb-8">
        Below are the top 20 deportation destination countries based on DOJ EOIR removal order data.
        These figures include formal removal orders issued by immigration judges — not all physical deportations,
        which are carried out by ICE Enforcement and Removal Operations (ERO).
      </p>

      {/* ── Key Stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">{totalRemovals.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Total Removal Orders (Top 20)</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">38.2%</div>
          <div className="text-sm text-gray-600 mt-1">Mexico&apos;s Share</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-warning">72.3%</div>
          <div className="text-sm text-gray-600 mt-1">Top 4 Countries Combined</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-success">20</div>
          <div className="text-sm text-gray-600 mt-1">Countries Tracked</div>
        </div>
      </div>

      {/* ── Editorial ───────────────────────────────────────────────── */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
        <h2 className="font-heading text-xl font-bold mb-2">📊 Analysis: The Geography of Deportation</h2>
        <p className="text-gray-700 mb-3">
          U.S. deportation policy is functionally a Western Hemisphere policy. The concentration of removals
          to a handful of nearby countries reflects both geography and the structure of immigration enforcement.
          People who cross the southern border are easier to apprehend and remove than visa overstays from distant countries.
        </p>
        <p className="text-gray-700 mb-3">
          This creates a paradox: nationals of countries like China and India — which have significant unauthorized
          populations through visa overstays — face far fewer removal orders per capita than Central Americans
          who are apprehended at the border. The system effectively punishes proximity more than violation.
        </p>
        <p className="text-gray-700">
          From a libertarian perspective, the per-country concentration of deportation raises questions about
          equal application of the law. If immigration enforcement disproportionately targets border crossers
          over overstays, it&apos;s not enforcing immigration law uniformly — it&apos;s enforcing geography.
        </p>
      </div>

      {/* ── Main Table ──────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top 20 Countries by Removal Orders</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Country</th>
              <th className="px-4 py-3 text-right font-semibold">Total Removals</th>
              <th className="px-4 py-3 text-right font-semibold">% of Total</th>
              <th className="px-4 py-3 text-left font-semibold">Trend</th>
              <th className="px-4 py-3 text-right font-semibold hidden lg:table-cell">Vol. Departure</th>
              <th className="px-4 py-3 text-right font-semibold hidden lg:table-cell">In Absentia</th>
            </tr>
          </thead>
          <tbody>
            {deportationData.map((c) => (
              <tr key={c.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{c.rank}</td>
                <td className="px-4 py-3">
                  <Link href={`/countries/${c.country.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition-colors">
                    <span className="mr-2">{c.flag}</span>
                    <span className="font-medium">{c.country}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-right font-mono">{c.totalRemovals.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{c.pctOfTotal}%</td>
                <td className="px-4 py-3"><TrendBadge trend={c.trend} /></td>
                <td className="px-4 py-3 text-right font-mono hidden lg:table-cell">{c.voluntaryDeparture.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono hidden lg:table-cell">{c.inAbsentia.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Yearly Trends Table ─────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Removal Orders by Year (FY 2020–2024)</h2>
      <p className="text-gray-600 mb-4">
        Fiscal year breakdown for each country shows how deportation patterns shifted through COVID-19 disruptions,
        the Biden-era border surge, and evolving enforcement priorities.
      </p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Country</th>
              <th className="px-4 py-3 text-right font-semibold">FY 2020</th>
              <th className="px-4 py-3 text-right font-semibold">FY 2021</th>
              <th className="px-4 py-3 text-right font-semibold">FY 2022</th>
              <th className="px-4 py-3 text-right font-semibold">FY 2023</th>
              <th className="px-4 py-3 text-right font-semibold">FY 2024</th>
              <th className="px-4 py-3 text-left font-semibold">Relative Volume</th>
            </tr>
          </thead>
          <tbody>
            {deportationData.slice(0, 10).map((c) => (
              <tr key={c.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.flag} {c.country}</td>
                <td className="px-4 py-3 text-right font-mono">{c.fy2020.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono">{c.fy2021.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono">{c.fy2022.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono">{c.fy2023.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono">{c.fy2024.toLocaleString()}</td>
                <td className="px-4 py-3"><BarCell value={c.totalRemovals} max={maxRemovals} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Country Notes ───────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Country-by-Country Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {deportationData.map((c) => (
          <div key={c.code} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-lg font-bold">{c.flag} {c.country}</h3>
              <TrendBadge trend={c.trend} />
            </div>
            <p className="text-sm text-gray-600 mb-3">{c.notes}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-bold">{c.totalRemovals.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Removals</div>
              </div>
              <div>
                <div className="text-sm font-bold">{c.voluntaryDeparture.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Vol. Departure</div>
              </div>
              <div>
                <div className="text-sm font-bold">{c.inAbsentia.toLocaleString()}</div>
                <div className="text-xs text-gray-500">In Absentia</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Uncooperative Countries ─────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Recalcitrant Countries: When Nations Refuse Deportees</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
        <p className="text-gray-700 mb-4">
          Not every country cooperates with U.S. deportation. ICE maintains a list of &ldquo;recalcitrant&rdquo; countries
          that refuse or delay accepting their nationals back. This creates a legal limbo — the U.S. has ordered
          removal, but can&apos;t physically deport the person.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="font-bold text-red-700 mb-2">Historically Uncooperative</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>🇨🇳 China — Limited cooperation on deportation flights</li>
              <li>🇨🇺 Cuba — Diplomatic barriers complicate returns</li>
              <li>🇻🇪 Venezuela — Maduro regime blocked deportations</li>
              <li>🇪🇷 Eritrea — Refuses most deportees</li>
            </ul>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-bold text-yellow-700 mb-2">Partially Cooperative</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>🇮🇳 India — Improved cooperation after 2020</li>
              <li>🇵🇰 Pakistan — Slow processing</li>
              <li>🇧🇩 Bangladesh — Limited flights</li>
              <li>🇲🇲 Myanmar — Political instability</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-bold text-green-700 mb-2">Fully Cooperative</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>🇲🇽 Mexico — Regular repatriation flights</li>
              <li>🇬🇹 Guatemala — Bilateral agreements</li>
              <li>🇭🇳 Honduras — ICE Air Operations</li>
              <li>🇸🇻 El Salvador — Cooperative since 2019</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Methodology ─────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Methodology & Data Sources</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <p className="text-sm text-gray-600 mb-3">
          <strong>Source:</strong> Department of Justice Executive Office for Immigration Review (EOIR) case data,
          supplemented by ICE Enforcement and Removal Operations reports and CBP encounter data.
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <strong>Removal orders</strong> are judicial orders issued by immigration judges directing removal from
          the United States. They are not identical to physical deportations — some individuals with removal orders
          remain in the U.S. for years, while others depart voluntarily or are physically removed by ICE.
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <strong>Voluntary departure</strong> allows individuals to leave at their own expense by a certain date,
          avoiding the formal consequences of a removal order (which include a multi-year bar on reentry).
        </p>
        <p className="text-sm text-gray-600">
          <strong>In absentia orders</strong> are removal orders issued when the respondent fails to appear in court.
          These orders are automatically final and can be executed immediately.
        </p>
      </div>

      {/* ── Related Pages ───────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Related Data</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/deportation" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Deportation Statistics</h3>
          <p className="text-sm text-gray-600">Overall removal trends, orders, and enforcement data.</p>
        </Link>
        <Link href="/nationalities" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Cases by Nationality</h3>
          <p className="text-sm text-gray-600">Immigration court cases broken down by country of origin.</p>
        </Link>
        <Link href="/immigration-by-president" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Immigration by President</h3>
          <p className="text-sm text-gray-600">How deportation numbers compare across administrations.</p>
        </Link>
        <Link href="/border" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Border Encounters</h3>
          <p className="text-sm text-gray-600">CBP apprehension and encounter statistics.</p>
        </Link>
        <Link href="/detention-centers" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Detention Centers</h3>
          <p className="text-sm text-gray-600">Where deportees are held before removal.</p>
        </Link>
        <Link href="/visa-types" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Visa Types Guide</h3>
          <p className="text-sm text-gray-600">Legal pathways that could prevent deportation.</p>
        </Link>
      </div>
    </div>
  )
}
