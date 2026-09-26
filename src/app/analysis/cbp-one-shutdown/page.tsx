import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'CBP One App Shutdown: What Happened to Legal Border Appointments?',
  description: 'The CBP One app processed 930,000+ appointments before its January 2025 shutdown. What the data shows about its impact on border encounters, asylum claims, and enforcement.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/cbp-one-shutdown' },
}

export default function CBPOneShutdownPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="CBP One App Shutdown: What Happened to Legal Border Appointments?"
        description="The CBP One app processed 930,000+ appointments before its January 2025 shutdown. Analyzing the data on its impact."
        url="https://www.openimmigration.us/analysis/cbp-one-shutdown"
        datePublished="2026-09-26"
        dateModified="2026-09-26"
      />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'CBP One Shutdown' },
      ]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Border Policy</div>
      <h1 className="font-heading text-4xl font-bold mb-4">CBP One App Shutdown: What the Data Shows</h1>
      <p className="text-sm text-gray-500 mb-6">Published September 26, 2026 · Sources: CBP, DHS, TRAC Immigration</p>

      <p className="text-lg text-gray-600 mb-8">
        On January 20, 2025, the CBP One mobile app was shut down on Inauguration Day — ending the Biden-era program that
        allowed migrants to schedule appointments at ports of entry. Over its 18-month lifespan, the app processed more than
        930,000 appointments. Nearly two years later, the data tells a clear story about what happened next.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 not-prose">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">930,000+</div>
          <div className="text-xs text-gray-600 mt-1">Total CBP One Appointments</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">-87%</div>
          <div className="text-xs text-gray-600 mt-1">Border Encounters (FY25→26)</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">1,450/day</div>
          <div className="text-xs text-gray-600 mt-1">Peak Daily Appointments</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">185,321</div>
          <div className="text-xs text-gray-600 mt-1">FY2026 Encounters (FYTD)</div>
        </div>
      </div>

      {/* What was CBP One? */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What Was CBP One?</h2>
      <p className="text-gray-700 mb-4">
        Launched in January 2023, CBP One was a mobile app that allowed migrants — primarily those waiting in northern Mexico — to
        schedule appointments at eight southwest border ports of entry. The program was designed to reduce dangerous illegal crossings
        by creating a legal pathway for asylum seekers and other migrants to present themselves at official checkpoints.
      </p>
      <p className="text-gray-700 mb-4">
        At its peak, the app processed approximately 1,450 appointments per day. The top nationalities using the app were
        Venezuelan, Haitian, Cuban, Colombian, and Mexican nationals. Appointments were released daily at random, creating a
        lottery-like system that drew both praise for reducing chaos and criticism for being too slow and arbitrary.
      </p>

      {/* The shutdown */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">The Shutdown and Its Aftermath</h2>
      <p className="text-gray-700 mb-4">
        The app was terminated on January 20, 2025, as one of the first executive actions of the incoming Trump administration.
        Approximately 270,000 migrants had active pending appointments that were immediately canceled. The administration
        argued that CBP One had become a &ldquo;catch and release&rdquo; mechanism that incentivized illegal immigration.
      </p>
      <p className="text-gray-700 mb-6">
        The data since the shutdown is striking. Port-of-entry (OFO) encounters — the category CBP One appointments fell under —
        dropped from 1.3 million in FY2024 to approximately 130,000 in FY2026 FYTD. Meanwhile, USBP apprehensions between ports
        of entry also fell sharply, though that decline began before the app shutdown, driven by Mexico&apos;s own enforcement
        actions and the broader deterrence strategy.
      </p>

      {/* Before and after table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Metric</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">FY2024 (with CBP One)</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">FY2026 FYTD (without)</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="px-4 py-2">Total Border Encounters</td><td className="px-4 py-2 text-right">2,822,441</td><td className="px-4 py-2 text-right">185,321</td><td className="px-4 py-2 text-right text-green-600">↓ 93%</td></tr>
            <tr><td className="px-4 py-2">OFO (Port of Entry)</td><td className="px-4 py-2 text-right">1,303,098</td><td className="px-4 py-2 text-right">129,933</td><td className="px-4 py-2 text-right text-green-600">↓ 90%</td></tr>
            <tr><td className="px-4 py-2">USBP (Between Ports)</td><td className="px-4 py-2 text-right">1,519,343</td><td className="px-4 py-2 text-right">55,297</td><td className="px-4 py-2 text-right text-green-600">↓ 96%</td></tr>
            <tr><td className="px-4 py-2">ICE Removals</td><td className="px-4 py-2 text-right">271,484</td><td className="px-4 py-2 text-right">471,000+</td><td className="px-4 py-2 text-right text-red-600">↑ 73%</td></tr>
            <tr><td className="px-4 py-2">Avg Daily Detained</td><td className="px-4 py-2 text-right">38,200</td><td className="px-4 py-2 text-right">67,500</td><td className="px-4 py-2 text-right text-red-600">↑ 77%</td></tr>
          </tbody>
        </table>
      </div>

      {/* Analysis */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What the Numbers Mean</h2>
      <p className="text-gray-700 mb-4">
        The encounter data shows an undeniable drop. But interpreting <em>why</em> requires nuance. The decline began
        before the app shutdown — Mexico ramped up its own enforcement starting in late 2024, and the Biden-era asylum
        transit ban (June 2024) had already reduced numbers significantly. The app shutdown accelerated a trend already
        in motion.
      </p>
      <p className="text-gray-700 mb-4">
        Critics of the shutdown argue that eliminating CBP One didn&apos;t stop migration — it just pushed people back
        into dangerous irregular crossings or into indefinite limbo in Mexico. UNHCR reported a significant increase in
        migrant shelters at capacity in Tijuana, Ciudad Juárez, and Reynosa through 2025 and into 2026.
      </p>
      <p className="text-gray-700 mb-4">
        Supporters counter that the numbers speak for themselves: encounters are down over 90% from FY2024 peaks, and
        the elimination of a &ldquo;pull factor&rdquo; app has helped restore deterrence. The simultaneous surge in
        ICE enforcement — 471,000+ removals in FY2026 — creates a two-pronged approach: fewer entries, more departures.
      </p>

      {/* What happened to CBP One users */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">What Happened to CBP One Users?</h2>
      <p className="text-gray-700 mb-4">
        Of the 930,000+ people who entered through CBP One appointments, the majority were paroled into the U.S. with
        work authorization and instructions to apply for asylum. Their cases have entered the immigration court system,
        adding to the already massive 3.7-million-case backlog.
      </p>
      <p className="text-gray-700 mb-4">
        As of mid-2026, fewer than 15% of CBP One parolees have had their asylum cases fully adjudicated. Many face
        hearing dates in 2028 or 2029. The administration has moved to revoke the parole status of some CBP One entrants,
        arguing the program exceeded legal authority — a move currently being challenged in federal courts.
      </p>

      {/* Bottom line */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-10">
        <h3 className="font-heading text-lg font-bold mb-2">The Bottom Line</h3>
        <p className="text-gray-700 text-sm">
          CBP One was the largest structured entry program in modern border history. Its shutdown removed a major legal
          pathway while enforcement scaled to record levels. Border encounters are at their lowest in years, but the
          930,000 people already admitted through the program remain in legal limbo, and the question of whether
          eliminating legal pathways reduces overall migration — or just changes how it happens — remains unanswered
          by the data alone.
        </p>
      </div>

      {/* Related */}
      <h2 className="font-heading text-2xl font-bold mt-10 mb-4">Related Analysis</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/analysis/enforcement-trends-2026" className="block p-4 border border-gray-200 rounded-xl hover:border-primary transition-colors">
          <div className="text-xs text-primary font-medium mb-1">Enforcement</div>
          <div className="font-semibold">ICE Enforcement Trends FY2026</div>
          <div className="text-sm text-gray-500 mt-1">Record deportations, arrests &amp; detention numbers</div>
        </Link>
        <Link href="/border" className="block p-4 border border-gray-200 rounded-xl hover:border-primary transition-colors">
          <div className="text-xs text-primary font-medium mb-1">Data</div>
          <div className="font-semibold">Border Encounter Dashboard</div>
          <div className="text-sm text-gray-500 mt-1">Monthly encounter data with charts and breakdowns</div>
        </Link>
        <Link href="/analysis/deportation-machine" className="block p-4 border border-gray-200 rounded-xl hover:border-primary transition-colors">
          <div className="text-xs text-primary font-medium mb-1">Analysis</div>
          <div className="font-semibold">The Deportation Machine</div>
          <div className="text-sm text-gray-500 mt-1">How the removal pipeline works end-to-end</div>
        </Link>
        <Link href="/analysis/visa-backlog-crisis" className="block p-4 border border-gray-200 rounded-xl hover:border-primary transition-colors">
          <div className="text-xs text-primary font-medium mb-1">Analysis</div>
          <div className="font-semibold">The Visa Backlog Crisis</div>
          <div className="text-sm text-gray-500 mt-1">Millions waiting years for legal immigration</div>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-12">
        Data sourced from U.S. Customs and Border Protection, ICE ERO annual reports, DHS Office of Homeland Security Statistics,
        and TRAC Immigration. CBP One appointment totals from CBP press releases. Last updated September 2026.
      </p>
    </div>
  )
}
