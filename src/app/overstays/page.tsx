import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { OverstaysByYearChart, OverstayRateChart, TopOverstayCountriesChart } from './OverstayCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Visa Overstays — 478K+ Per Year, The Other Side of Illegal Immigration',
  description: 'DHS visa overstay data: 478K-850K visitors per year remain beyond their authorized stay. FY2024 overstay rate 0.92%. Top countries, trends, and how overstays compare to border crossings.',
  alternates: { canonical: 'https://www.openimmigration.us/overstays' },
}

export default function OverstaysPage() {
  const overview = loadData('immigration-overview.json')
  const overstays = overview.visaOverstays.yearly
  const topCountries = overview.visaOverstays.topOverstayCountries2023
  const undocumented = overview.estimatedUndocumented.estimates

  const totalOverstays = overstays.reduce((s: number, y: { totalOverstays: number }) => s + y.totalOverstays, 0)
  const avgRate = (overstays.reduce((s: number, y: { overstayRate: number }) => s + y.overstayRate, 0) / overstays.length).toFixed(2)
  const latest = overstays[overstays.length - 1]
  const latestUndoc = undocumented[undocumented.length - 1]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Visa Overstays' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Visa Overstays</h1>
      <p className="text-lg text-gray-600 mb-8">
        Not all unauthorized immigration involves crossing a border. Each year, <strong>hundreds of thousands of visitors</strong> who
        entered the U.S. legally on visas remain beyond their authorized stay. This makes visa overstays a major — but
        often overlooked — component of the unauthorized immigrant population, estimated at <strong>{(latestUndoc.low / 1e6).toFixed(1)}-{(latestUndoc.high / 1e6).toFixed(1)} million</strong>.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(totalOverstays / 1e6).toFixed(1)}M+</div>
          <div className="text-sm text-gray-600 mt-1">Total Overstays</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{avgRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Avg Overstay Rate</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{topCountries[0]?.country}</div>
          <div className="text-sm text-gray-600 mt-1">#1 Overstay Country</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">{(latestUndoc.low / 1e6).toFixed(0)}-{(latestUndoc.high / 1e6).toFixed(0)}M</div>
          <div className="text-sm text-gray-600 mt-1">Est. Unauthorized Pop.</div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Overstays account for ~40% of the unauthorized population</strong> — not border crossings, but expired visas</div>
              <div>• <strong>India is now the #1 overstay country</strong> — surpassing Mexico, driven by tech worker and student visa overstays</div>
              <div>• <strong>The overstay rate is remarkably low ({avgRate}%)</strong> — the vast majority of 50M+ annual visitors do leave on time</div>
              <div>• <strong>FY2020 rate spiked to 3%</strong> — COVID travel restrictions trapped people who couldn&apos;t depart</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <OverstaysByYearChart data={overstays} />
        <OverstayRateChart data={overstays} />
      </div>
      <div className="mb-10">
        <TopOverstayCountriesChart data={topCountries} />
      </div>

      {/* Yearly table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Visa Overstays by Fiscal Year</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">FY</th>
              <th className="px-6 py-3 font-semibold text-right">Expected Departures</th>
              <th className="px-6 py-3 font-semibold text-right">Total Overstays</th>
              <th className="px-6 py-3 font-semibold text-right">Overstay Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {overstays.map((y: { fy: number; expectedDepartures: number; totalOverstays: number; overstayRate: number }) => (
              <tr key={y.fy} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">FY{y.fy}</td>
                <td className="px-6 py-3 text-right">{y.expectedDepartures.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{y.totalOverstays.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{y.overstayRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estimated unauthorized population */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Estimated Unauthorized Immigrant Population</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">Year</th>
              <th className="px-6 py-3 font-semibold text-right">Low Estimate</th>
              <th className="px-6 py-3 font-semibold text-right">High Estimate</th>
              <th className="px-6 py-3 font-semibold text-right">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {undocumented.map((e: { year: number; low: number; high: number; source: string }) => (
              <tr key={e.year} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{e.year}</td>
                <td className="px-6 py-3 text-right">{(e.low / 1e6).toFixed(1)}M</td>
                <td className="px-6 py-3 text-right">{(e.high / 1e6).toFixed(1)}M</td>
                <td className="px-6 py-3 text-right text-gray-500">{e.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Is a Visa Overstay?</h2>
        <p>
          A visa overstay occurs when a foreign national enters the U.S. on a valid visa (tourist, student,
          work, etc.) and remains beyond their authorized period of admission. Unlike unauthorized border
          crossers, overstayers entered through a legal port of entry — with a passport, visa, and CBP inspection.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Border Crossings vs. Overstays</h2>
        <p>
          The public debate about illegal immigration focuses heavily on the southern border. But research
          consistently shows that <strong>visa overstays have exceeded unauthorized border crossings</strong> as
          a source of new unauthorized immigrants in most recent years. The DHS exit tracking system now catches
          most air and sea departures, but land departures remain largely untracked.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Consequences of Overstaying</h2>
        <p>
          Overstaying a visa triggers automatic visa voidance. Overstayers who accumulate 180 days to 1 year of
          unlawful presence face a 3-year bar on reentry. Over 1 year triggers a 10-year bar. These penalties
          apply even if the person eventually leaves voluntarily.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/border" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌎 Border Encounters</h3>
          <p className="text-sm text-gray-600 mt-1">12M+ encounters — the other path to unauthorized status.</p>
        </Link>
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚨 ICE Enforcement</h3>
          <p className="text-sm text-gray-600 mt-1">How ICE tracks down and deports overstayers and others.</p>
        </Link>
        <Link href="/legal-immigration" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🗽 Legal Immigration</h3>
          <p className="text-sm text-gray-600 mt-1">The legal pathways that overstayers originally used.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Sources: DHS Entry/Exit Overstay Reports to Congress, Pew Research Center, Center for Migration Studies.
      </p>
    </div>
  )
}
