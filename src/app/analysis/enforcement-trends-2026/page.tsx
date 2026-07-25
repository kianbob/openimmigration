import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'ICE Enforcement Trends FY2026 — Record Deportations, Arrests & Detention',
  description: '356,389 ICE removals in FY2026 so far, 65,765 in detention, 1,438 arrests per day. Tracking the enforcement surge and whether it will break Obama-era records.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/enforcement-trends-2026' },
}

export default function EnforcementTrends2026Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="ICE Enforcement Trends FY2026 — Record Deportations, Arrests & Detention"
        description="Tracking the FY2026 enforcement surge: 356,389 removals, 65,765 detained, record arrest pace."
        url="https://www.openimmigration.us/analysis/enforcement-trends-2026"
        datePublished="2026-07-25"
        dateModified="2026-07-25"
      />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Enforcement Trends FY2026' },
      ]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Enforcement</div>
      <h1 className="font-heading text-4xl font-bold mb-4">ICE Enforcement Trends FY2026: By the Numbers</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated July 25, 2026 · Sources: ICE ERO, ABC News, TRAC Reports</p>

      <p className="text-lg text-gray-600 mb-8">
        FY2026 is shaping up to be a historic year for immigration enforcement. With two and a half months
        remaining in the fiscal year, ICE has already logged 356,389 removals — putting the agency on pace to
        surpass the Obama-era record of 438,421 deportations set in FY2013.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 not-prose">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">356,389</div>
          <div className="text-xs text-gray-600 mt-1">Removals (FYTD)</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">65,765</div>
          <div className="text-xs text-gray-600 mt-1">Currently Detained</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">1,438</div>
          <div className="text-xs text-gray-600 mt-1">Arrests/Day (June)</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">60%</div>
          <div className="text-xs text-gray-600 mt-1">Detained w/ Criminal Record</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Record Pace</h2>
        <p>
          ICE has removed 356,389 people through approximately the first 9.5 months of FY2026 (which began
          October 1, 2025). That&apos;s an average of roughly 1,260 removals per day. At this pace, FY2026
          would end with approximately 460,000 removals — exceeding the Obama administration&apos;s FY2013
          record of 438,421.
        </p>
        <p>
          The arrest pace has accelerated further. In June 2026, ICE and CBP combined for over 43,000 arrests —
          an average of 1,438 per day. Border czar Tom Homan has stated the administration is targeting 2,000
          arrests per day, which would represent the highest sustained rate in ICE&apos;s 23-year history.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Detention at Capacity</h2>
        <p>
          ICE currently holds 65,765 individuals in detention facilities — a record high. This is nearly
          double the average daily detained population of 33,724 in FY2020 and more than triple the FY2021
          low of 18,315. According to ICE, 60% of those detained have a criminal record.
        </p>
        <p>
          The surge in detention has strained facility capacity. ICE operates or contracts with approximately
          245 facilities nationwide, with the largest — ERO El Paso Camp East Montana — averaging over 2,000
          detainees per day. Alternatives to detention (ATD) programs are monitoring an additional 183,181
          individuals, according to TRAC Reports.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Historical Context</h2>
        <p>
          The current enforcement surge represents a dramatic reversal from the FY2021 low, when ICE removed
          just 59,011 people — an 80% decline from pre-pandemic levels driven by COVID restrictions and
          policy changes. Since then, removals have climbed steadily:
        </p>
        <div className="not-prose my-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Fiscal Year</th>
                  <th className="px-4 py-3 font-semibold text-right">ICE Removals</th>
                  <th className="px-4 py-3 font-semibold text-right">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="px-4 py-2">FY2021</td><td className="px-4 py-2 text-right">59,011</td><td className="px-4 py-2 text-right text-red-600">Low point</td></tr>
                <tr><td className="px-4 py-2">FY2022</td><td className="px-4 py-2 text-right">72,177</td><td className="px-4 py-2 text-right text-green-600">+22%</td></tr>
                <tr><td className="px-4 py-2">FY2023</td><td className="px-4 py-2 text-right">142,580</td><td className="px-4 py-2 text-right text-green-600">+98%</td></tr>
                <tr><td className="px-4 py-2">FY2024</td><td className="px-4 py-2 text-right">271,484</td><td className="px-4 py-2 text-right text-green-600">+90%</td></tr>
                <tr><td className="px-4 py-2">FY2025</td><td className="px-4 py-2 text-right">319,980</td><td className="px-4 py-2 text-right text-green-600">+18%</td></tr>
                <tr className="bg-amber-50 font-semibold"><td className="px-4 py-2">FY2026 (FYTD)</td><td className="px-4 py-2 text-right">356,389</td><td className="px-4 py-2 text-right text-green-600">On pace for 460K+</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Obama Record</h2>
        <p>
          The all-time record for ICE removals in a single fiscal year is 438,421, set in FY2013 under the
          Obama administration. While FY2026 is on pace to exceed that number in absolute terms, critics
          note the comparison isn&apos;t straightforward. The estimated unauthorized immigrant population has
          grown significantly since 2013, meaning removals as a proportion of the total unauthorized population
          may still be lower than the Obama-era peak.
        </p>
        <p>
          Mike Howell of the Oversight Project has argued that &quot;the numbers are only larger than Obama in
          absolute terms but smaller when you take into account the proportion of total illegal population,&quot;
          and that worksite enforcement must become &quot;the backbone of operations&quot; for removals to reach
          true mass deportation levels.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What to Watch</h2>
        <p>
          With the fiscal year ending September 30, 2026, several factors will determine whether FY2026 sets
          a new record:
        </p>
        <ul>
          <li><strong>Arrest acceleration:</strong> If the July pace of ~1,600 arrests/day holds, the pipeline of deportable individuals will continue to grow</li>
          <li><strong>Detention capacity:</strong> At 65,765 detained, facilities are under strain — can the system absorb more?</li>
          <li><strong>Receiving country cooperation:</strong> Deportations require destination countries to accept returnees</li>
          <li><strong>Legal challenges:</strong> Ongoing court cases could constrain certain enforcement operations</li>
        </ul>
      </div>

      {/* Related pages */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📊 ICE Enforcement Overview</h3>
          <p className="text-xs text-gray-600 mt-1">Full FY2014-2026 enforcement data — removals, returns, and arrests by year.</p>
        </Link>
        <Link href="/enforcement/arrests" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🚔 Arrests by State</h3>
          <p className="text-xs text-gray-600 mt-1">Where ICE is making the most arrests — field office and state breakdowns.</p>
        </Link>
        <Link href="/enforcement/detention" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🏢 Detention Facilities</h3>
          <p className="text-xs text-gray-600 mt-1">65,765 currently detained across 245 facilities — record numbers.</p>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/deportation-machine" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">⚙️ The Deportation Machine</h4>
          <p className="text-xs text-gray-600 mt-1">How the enforcement pipeline works from arrest to removal.</p>
        </Link>
        <Link href="/analysis/cost-of-immigration-enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">💰 Cost of Enforcement</h4>
          <p className="text-xs text-gray-600 mt-1">What mass deportation actually costs per person and in aggregate.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Sources: ICE Enforcement and Removal Operations data (July 2026), ABC News, TRAC Immigration Reports,
        Deportation Data Project.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
