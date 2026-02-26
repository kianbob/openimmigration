import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { EncountersByYearChart, TopCitizenshipsPie, ComponentByYearChart, DemographicsChart, SWBorderChart } from './BorderCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'U.S. Border Encounters — 12 Million Since 2020 | OpenImmigration',
  description: 'CBP border encounter data FY2020-2026. 12 million encounters, peak 3.1M in FY2023. Monthly trends, top nationalities, southwest border stats, demographics.',
  alternates: { canonical: 'https://www.openimmigration.us/border' },
}

export default function BorderPage() {
  const data = loadData('border-encounters.json')
  const peakYear = data.yearly.reduce((max: { fy: number; total: number }, y: { fy: number; total: number }) => y.total > max.total ? y : max, data.yearly[0])
  const fy2026 = data.yearly.find((y: { fy: number }) => y.fy === 2026)
  const fy2024 = data.yearly.find((y: { fy: number }) => y.fy === 2024)
  const swbPeak = data.swbByYear.reduce((max: { fy: number; count: number }, y: { fy: number; count: number }) => y.count > max.count ? y : max, data.swbByYear[0])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Border Encounters' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Border Encounters</h1>
      <p className="text-lg text-gray-600 mb-8">
        U.S. Customs and Border Protection (CBP) recorded <strong>{(data.grandTotal / 1e6).toFixed(1)} million encounters</strong> between
        FY2020 and FY2026. Encounters peaked at <strong>{(peakYear.total / 1e6).toFixed(1)} million in FY{peakYear.fy}</strong> — the
        highest in recorded history — before declining sharply under tighter enforcement policies.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(data.grandTotal / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Total Encounters</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(peakYear.total / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Peak (FY{peakYear.fy})</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{fy2026 ? (fy2026.total / 1e3).toFixed(0) + 'K' : 'N/A'}</div>
          <div className="text-sm text-gray-600 mt-1">FY2026 FYTD</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{data.topCitizenships[0]?.name}</div>
          <div className="text-sm text-gray-600 mt-1">#1 Citizenship</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Encounters peaked at {(peakYear.total / 1e6).toFixed(1)}M in FY{peakYear.fy}</strong> — a 5x increase from FY2020&apos;s pandemic low</div>
              <div>• <strong>Mexico accounts for {((data.topCitizenships[0]?.count / data.grandTotal) * 100).toFixed(0)}% of all encounters</strong> — but Venezuela, Cuba, and Nicaragua surged dramatically</div>
              <div>• <strong>FY2026 is on pace for the lowest in years</strong> — {fy2026 ? fy2026.total.toLocaleString() : 'N/A'} through January</div>
              <div>• <strong>Southwest border accounts for ~85% of all encounters</strong> — the northern border and coastal routes make up the rest</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <EncountersByYearChart data={data.yearly} />
        <TopCitizenshipsPie data={data.topCitizenships} />
        <ComponentByYearChart data={data.componentByYear} />
        <DemographicsChart data={data.demographicsByYear} />
      </div>

      <div className="mb-10">
        <SWBorderChart data={data.swbByYear} />
      </div>

      {/* Top citizenships table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Top Nationalities Encountered (FY2020-2026)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Country</th>
                <th className="px-6 py-3 font-semibold text-right">Total Encounters</th>
                <th className="px-6 py-3 font-semibold text-right">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.topCitizenships.filter((c: { name: string }) => c.name !== 'OTHER').slice(0, 20).map((c: { name: string; count: number }, i: number) => (
                <tr key={c.name} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-6 py-3 font-medium">{c.name}</td>
                  <td className="px-6 py-3 text-right">{c.count.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">{((c.count / data.grandTotal) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Yearly breakdown table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Encounters by Fiscal Year</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">Fiscal Year</th>
              <th className="px-6 py-3 font-semibold text-right">Total Encounters</th>
              <th className="px-6 py-3 font-semibold text-right">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.yearly.map((y: { fy: number; total: number }, i: number) => {
              const prev = i > 0 ? data.yearly[i - 1].total : null
              const change = prev ? ((y.total - prev) / prev * 100).toFixed(1) : null
              return (
                <tr key={y.fy} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">FY{y.fy}{y.fy === 2026 ? ' (FYTD)' : ''}</td>
                  <td className="px-6 py-3 text-right">{y.total.toLocaleString()}</td>
                  <td className={`px-6 py-3 text-right ${change && parseFloat(change) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {change ? `${parseFloat(change) > 0 ? '+' : ''}${change}%` : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Are &quot;Encounters&quot;?</h2>
        <p>
          CBP uses &quot;encounters&quot; as a catch-all term for contacts between border agents and migrants.
          This includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Title 8 Apprehensions</strong> — Border Patrol arrests between ports of entry</li>
          <li><strong>Title 8 Inadmissibles</strong> — People deemed inadmissible at official ports of entry</li>
          <li><strong>Title 42 Expulsions</strong> — Rapid expulsions under COVID-era public health authority (ended May 2023)</li>
        </ul>
        <p>
          Important: one person can generate multiple encounters. Someone expelled under Title 42 and trying
          again the next week counts as two encounters. This is why encounter numbers can exceed unique individuals.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The FY2023 Peak</h2>
        <p>
          FY2023 saw {(peakYear.total / 1e6).toFixed(1)} million encounters — the highest ever recorded. Multiple
          factors converged: the end of Title 42 (May 2023), economic instability in Venezuela and Central America,
          cartel-facilitated migration routes, and a perception that enforcement would tighten. The southwest
          border alone accounted for {swbPeak ? (swbPeak.count / 1e6).toFixed(1) : '?'}M encounters.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Border Patrol vs. Ports of Entry</h2>
        <p>
          Encounters happen through two main channels: U.S. Border Patrol (USBP) between official ports of entry,
          and Office of Field Operations (OFO) at the ports themselves. USBP encounters are what most people think
          of as &quot;illegal border crossings,&quot; while OFO encounters include people presenting themselves at
          official crossings — some with valid claims, some without.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">From Encounter to Court</h2>
        <p>
          Not every border encounter leads to immigration court. Some are immediately expelled (Title 42, now ended).
          Others receive expedited removal. Those who express a fear of persecution get a credible fear interview
          and, if passed, enter the immigration court system — joining the <Link href="/backlog" className="text-primary hover:underline">1.9 million pending cases</Link> tracked
          on this site.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚨 ICE Enforcement</h3>
          <p className="text-sm text-gray-600 mt-1">Deportations, arrests, and interior enforcement data.</p>
        </Link>
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📋 Court Backlog</h3>
          <p className="text-sm text-gray-600 mt-1">1.9M pending cases — many from border encounters.</p>
        </Link>
        <Link href="/legal-immigration" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🗽 Legal Immigration</h3>
          <p className="text-sm text-gray-600 mt-1">Green cards, visas, refugees, and naturalizations.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: U.S. Customs and Border Protection Public Data Portal. Data through January 2026.
        Fiscal years run October 1 to September 30.
      </p>
    </div>
  )
}
