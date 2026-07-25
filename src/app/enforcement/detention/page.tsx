import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'ICE Detention Facilities & Statistics FY2020-2026 — Population, Costs, Capacity',
  description: 'ICE detention data FY2020-2026. 65,765 currently detained in FY2026 — a record high. 245 facilities nationwide. Facility details, average stays, and capacity data from ICE and FOIA records.',
  alternates: { canonical: 'https://www.openimmigration.us/enforcement/detention' },
}

export default function DetentionPage() {
  const detData = loadData('ice-detention.json')
  const yearly = detData.yearly
  const facilities = detData.topFacilities
  const facilityTypes = detData.facilityTypes
  const latest = yearly[yearly.length - 1]
  const prevFull = yearly[yearly.length - 2]
  const totalFacilities = facilityTypes.reduce((s: number, t: { count: number }) => s + t.count, 0)
  const maxDaily = Math.max(...yearly.map((y: { avgDailyPopulation: number }) => y.avgDailyPopulation))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'ICE Enforcement', href: '/enforcement' },
        { label: 'Detention Facilities' },
      ]} />

      <h1 className="font-heading text-4xl font-bold mb-4">ICE Detention: Facilities, Population &amp; Costs</h1>
      <p className="text-lg text-gray-600 mb-8">
        ICE operates the largest immigration detention system in the world, holding an average
        of <strong>{latest.avgDailyPopulation.toLocaleString()} people per day</strong> across{' '}
        <strong>{latest.activeFacilities} facilities</strong> in FY{latest.fy}. The system costs an estimated{' '}
        <strong>{detData.annualDetentionCost.fy2025_estimated} per year</strong>. This page uses FOIA-obtained data
        from the <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Deportation Data Project
        </a> and ICE detention management spreadsheets.
      </p>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{latest.avgDailyPopulation.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Avg Daily Detained</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{latest.activeFacilities}</div>
          <div className="text-sm text-gray-600 mt-1">Active Facilities</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{latest.avgLengthOfStayDays} days</div>
          <div className="text-sm text-gray-600 mt-1">Avg Length of Stay</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">${latest.costPerDayPerDetainee}</div>
          <div className="text-sm text-gray-600 mt-1">Cost Per Day</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Detention population at record highs</strong> — {latest.avgDailyPopulation.toLocaleString()} daily average in FY{latest.fy}, up from 18,315 in FY2021</div>
              <div>• <strong>$3.2 billion annual cost</strong> — at ${latest.costPerDayPerDetainee}/day per detainee, the detention system is one of the most expensive federal operations per capita</div>
              <div>• <strong>Private companies run most facilities</strong> — GEO Group and CoreCivic operate the majority of large detention centers under ICE contracts</div>
              <div>• <strong>Average stay is {latest.avgLengthOfStayDays} days</strong> — but some individuals are detained for months or years while awaiting court hearings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily population trend - CSS bar chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-6">Average Daily Detained Population by Year</h2>
        <div className="space-y-3">
          {yearly.map((y: { fy: number; avgDailyPopulation: number; note?: string }) => (
            <div key={y.fy} className="flex items-center gap-3">
              <div className="w-24 text-sm font-medium text-right flex-shrink-0">
                FY{y.fy}{y.note ? '*' : ''}
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                  style={{ width: `${(y.avgDailyPopulation / maxDaily * 100).toFixed(1)}%`, minWidth: '80px' }}
                >
                  {y.avgDailyPopulation.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">* FYTD through July 2026</p>
      </div>

      {/* Cost analysis */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold text-red-900 mb-4">💰 The Cost of Detention</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-red-700">${latest.costPerDayPerDetainee}</div>
            <div className="text-sm text-red-800 mt-1">Per detainee per day</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-700">${(latest.costPerDayPerDetainee * latest.avgLengthOfStayDays).toLocaleString()}</div>
            <div className="text-sm text-red-800 mt-1">Average total cost per stay</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-700">{detData.annualDetentionCost.fy2025_estimated}</div>
            <div className="text-sm text-red-800 mt-1">Estimated annual cost</div>
          </div>
        </div>
        <p className="text-sm text-red-800 mt-4 text-center">
          At current rates, each additional day of average detention for the entire population costs taxpayers ${(latest.avgDailyPopulation * latest.costPerDayPerDetainee / 1e6).toFixed(1)} million.
        </p>
      </div>

      {/* Yearly data table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Detention Statistics by Fiscal Year</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">FY</th>
                <th className="px-4 py-3 font-semibold text-right">Avg Daily Pop.</th>
                <th className="px-4 py-3 font-semibold text-right">Book-Ins</th>
                <th className="px-4 py-3 font-semibold text-right">Avg Stay (days)</th>
                <th className="px-4 py-3 font-semibold text-right">Facilities</th>
                <th className="px-4 py-3 font-semibold text-right">Cost/Day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {yearly.map((y: { fy: number; avgDailyPopulation: number; bookIns: number; avgLengthOfStayDays: number; activeFacilities: number; costPerDayPerDetainee: number; note?: string }) => (
                <tr key={y.fy} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">FY{y.fy}{y.note ? '*' : ''}</td>
                  <td className="px-4 py-3 text-right">{y.avgDailyPopulation.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{y.bookIns.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{y.avgLengthOfStayDays}</td>
                  <td className="px-4 py-3 text-right">{y.activeFacilities}</td>
                  <td className="px-4 py-3 text-right">${y.costPerDayPerDetainee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 px-6 py-2">* FYTD through July 2026</p>
      </div>

      {/* Facility types */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-6">Detention Facility Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilityTypes.map((t: { type: string; count: number; avgCapacity: number }) => (
            <div key={t.type} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="font-medium text-sm">{t.type}</div>
                <div className="text-xs text-gray-500">Avg capacity: {t.avgCapacity.toLocaleString()}</div>
              </div>
              <div className="text-2xl font-bold text-primary">{t.count}</div>
            </div>
          ))}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex justify-between items-center">
            <div className="font-semibold">Total Facilities</div>
            <div className="text-2xl font-bold text-primary">{totalFacilities}</div>
          </div>
        </div>
      </div>

      {/* Top facilities */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Largest ICE Detention Facilities</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Facility Name</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold text-right">Capacity</th>
                <th className="px-4 py-3 font-semibold">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {facilities.sort((a: { capacity: number }, b: { capacity: number }) => b.capacity - a.capacity).map((f: { name: string; location: string; capacity: number; operator: string }, i: number) => (
                <tr key={f.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3">{f.location}</td>
                  <td className="px-4 py-3 text-right font-semibold">{f.capacity.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${f.operator === 'ICE' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {f.operator}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis */}
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Private Detention Industry</h2>
        <p>
          The majority of ICE detention capacity is operated by two private companies: <strong>GEO Group</strong> and{' '}
          <strong>CoreCivic</strong> (formerly Corrections Corporation of America). These companies hold
          multi-billion dollar contracts with ICE and have faced criticism over detention conditions, medical
          care, and the inherent conflict of interest in profiting from incarceration. GEO Group alone
          operates facilities with a combined capacity of over 10,000 beds.
        </p>
        <p>
          ICE also contracts with county and local jails through Intergovernmental Service Agreements (IGSAs),
          which account for the largest number of facilities but generally smaller populations. These
          arrangements are controversial — some localities have ended agreements under pressure from
          advocates, while others have expanded them as a revenue source.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Detention Length and Due Process</h2>
        <p>
          The average detention stay is {latest.avgLengthOfStayDays} days, but this average masks enormous
          variation. People in expedited removal may be detained for just days, while those fighting their
          cases in immigration court can be detained for months or years. There is no statutory limit on
          how long ICE can detain someone during removal proceedings, though the Supreme Court has ruled
          that prolonged detention without a bond hearing raises due process concerns.
        </p>
        <p>
          The average length of stay has been increasing — from 42 days in FY2022 to {latest.avgLengthOfStayDays} days
          in FY{latest.fy}. This reflects both policy choices (detaining more people through their full
          proceedings rather than releasing them) and the immigration court backlog, which means cases take
          longer to resolve.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Alternatives to Detention (ATD)</h2>
        <p>
          ICE also operates Alternatives to Detention (ATD) programs, including GPS ankle monitors and
          smartphone-based check-in apps. These programs are dramatically cheaper — approximately $5-10 per
          person per day compared to $200+ for physical detention. Critics of ATD argue that compliance
          rates drop without physical custody, while advocates point out that ATD participants have court
          appearance rates above 85% at a fraction of the cost.
        </p>
        <p>
          The tension between detention and ATD reflects a fundamental policy question: how much should
          taxpayers spend to guarantee that every person in removal proceedings remains in government
          custody? At ${latest.costPerDayPerDetainee}/day, the current system represents a massive fiscal commitment.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Conditions and Oversight</h2>
        <p>
          Detention conditions have been the subject of extensive reporting, lawsuits, and government
          investigations. ICE detention is civil, not criminal — detainees are not being punished for a crime
          but held pending immigration proceedings. Yet conditions in many facilities resemble or are worse
          than criminal jails. Reports have documented inadequate medical care, solitary confinement,
          sexual abuse, and deaths in custody. DHS&apos;s Office of Inspector General has repeatedly found
          deficiencies in detention oversight.
        </p>
      </div>

      {/* Related pages */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 ICE Enforcement Overview</h3>
          <p className="text-sm text-gray-600 mt-1">Removals, returns, and enforcement trends FY2014-2026.</p>
        </Link>
        <Link href="/enforcement/arrests" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚔 Arrests by State</h3>
          <p className="text-sm text-gray-600 mt-1">Where ICE makes the most arrests — field office breakdown.</p>
        </Link>
        <Link href="/enforcement/deportations" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">✈️ Deportations by Nationality</h3>
          <p className="text-sm text-gray-600 mt-1">Which countries receive the most deportees.</p>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/detention-centers" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">🏢 Detention Center Directory</h4>
          <p className="text-xs text-gray-600 mt-1">Browse individual detention facilities.</p>
        </Link>
        <Link href="/analysis/deportation-costs" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">💰 The Cost of Deportation</h4>
          <p className="text-xs text-gray-600 mt-1">Full cost analysis of the enforcement pipeline.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: ICE detention management spreadsheets, ICE ERO annual reports, FOIA data processed by{' '}
        <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
          Deportation Data Project
        </a>. Data current through July 2026.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many people does ICE detain?',
              acceptedAnswer: { '@type': 'Answer', text: `ICE detains an average of ${latest.avgDailyPopulation.toLocaleString()} people per day across ${latest.activeFacilities} facilities as of FY${latest.fy}.` },
            },
            {
              '@type': 'Question',
              name: 'How much does ICE detention cost?',
              acceptedAnswer: { '@type': 'Answer', text: `ICE detention costs approximately $${latest.costPerDayPerDetainee} per person per day. The total annual cost is estimated at ${detData.annualDetentionCost.fy2025_estimated}.` },
            },
            {
              '@type': 'Question',
              name: 'How long are people held in ICE detention?',
              acceptedAnswer: { '@type': 'Answer', text: `The average length of stay in ICE detention is ${latest.avgLengthOfStayDays} days, but some individuals are detained for months or years while awaiting court hearings.` },
            },
            {
              '@type': 'Question',
              name: 'Who runs ICE detention facilities?',
              acceptedAnswer: { '@type': 'Answer', text: 'The majority of ICE detention capacity is operated by private companies GEO Group and CoreCivic, with additional facilities run through contracts with local jails (IGSAs) and a small number operated directly by ICE.' },
            },
          ],
        })
      }} />
    </div>
  )
}
