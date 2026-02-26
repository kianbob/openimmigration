import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'From Border to Courtroom — How 12 Million Encounters Become 1.9 Million Cases',
  description: 'The pipeline from CBP encounter to immigration court to outcome. 12M encounters, 1.9M pending cases, and the leaky funnel that connects them.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/border-to-courtroom' },
}

export default function BorderToCourtPage() {
  const border = loadData('border-encounters.json')
  const stats = loadData('stats.json')
  const overview = loadData('immigration-overview.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'From Border to Courtroom' },
      ]} />

      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">System Overview</span>
      <h1 className="font-heading text-4xl font-bold mb-6">From Border to Courtroom</h1>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-xl text-gray-600 mb-8">
          What happens after someone crosses the border? CBP recorded <strong>{(border.totalEncounters / 1e6).toFixed(1)} million
          encounters</strong> between FY2020 and FY2026. The immigration court has <strong>{(stats.pendingCases / 1e6).toFixed(1)} million
          pending cases</strong>. Understanding the pipeline between these numbers reveals how the system actually works.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">The Encounter</h2>
        <p>
          Every immigration case begins with an encounter — usually at the border, but sometimes through an
          interior ICE arrest. At the border, CBP processes the person and makes an initial determination:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Title 8 Apprehension</strong> — Border Patrol intercepts someone between ports of entry.
          This is the classic &quot;illegal border crossing.&quot;</li>
          <li><strong>Title 8 Inadmissible</strong> — A person presents at a port of entry without valid
          documents or with a disqualifying factor.</li>
          <li><strong>Title 42 Expulsion</strong> (2020-2023) — Under the COVID-era public health order, migrants
          were rapidly expelled without standard processing. This accounted for millions of encounters but few
          court cases.</li>
        </ul>
        <p>
          Importantly, one person can generate multiple encounters. Someone expelled under Title 42 might try
          again the next week. This is why &quot;encounters&quot; significantly exceed the number of unique individuals.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Notice to Appear</h2>
        <p>
          For those not immediately expelled, CBP or ICE issues a Notice to Appear (NTA) — the charging
          document that initiates removal proceedings. This is where the court case begins.
        </p>
        <p>
          Not every encounter generates an NTA. Title 42 expulsions didn&apos;t. Voluntary returns don&apos;t.
          Some encounters are resolved administratively. The &quot;leaky funnel&quot; from encounter to court case
          means only a fraction of border encounters become pending cases.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Wait</h2>
        <p>
          After receiving an NTA, the person is scheduled for a hearing. This is where the system breaks down.
          With {(stats.pendingCases / 1e6).toFixed(1)}M pending cases and {stats.totalJudges.toLocaleString()} judges,
          the wait for a first hearing can be <Link href="/wait-times" className="text-primary hover:underline">over
          a year</Link> at many courts.
        </p>
        <p>
          During the wait, people are either:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Detained</strong> — In ICE custody at ~$200/day. Their cases move faster but outcomes are worse.</li>
          <li><strong>Released</strong> — Living in the community with conditions (GPS monitoring, check-ins).
          Most border encounters result in release pending hearing, especially for families and asylum seekers.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Hearing(s)</h2>
        <p>
          Immigration cases typically involve multiple hearings:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Master calendar hearing</strong> — A brief initial appearance. The judge explains the charges,
          asks if the person has a lawyer, and schedules the next date. Often takes 5-10 minutes.</li>
          <li><strong>Individual hearing</strong> — The full trial. Testimony, evidence, cross-examination by
          the government attorney. Takes 2-4 hours. This is where the actual decision happens.</li>
        </ol>
        <p>
          Cases frequently get continuances between these stages — for finding a lawyer, gathering evidence,
          waiting for asylum office interviews, or simply because the docket is full. Each continuance adds
          months.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Outcome</h2>
        <p>
          After all hearings, the judge issues a decision. Our data shows the main outcomes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Removal order ({stats.removalOrders.toLocaleString()} total)</strong> — Ordered deported.
          But an order doesn&apos;t mean actual removal — ICE must locate, arrest, and physically deport the person.</li>
          <li><strong>Relief granted ({stats.asylumGranted.toLocaleString()} asylum grants)</strong> — Allowed to stay.
          Includes asylum, withholding of removal, CAT protection, cancellation of removal.</li>
          <li><strong>Voluntary departure ({stats.voluntaryDeparture.toLocaleString()})</strong> — Agrees to leave
          voluntarily, avoiding a formal removal order and its legal consequences.</li>
          <li><strong>Administrative closure</strong> — Case shelved without a decision. Can be reopened later.</li>
          <li><strong>In absentia order ({stats.inAbsentia.toLocaleString()})</strong> — Person didn&apos;t show up.
          Ordered removed without being present.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Enforcement Gap</h2>
        <p>
          Here&apos;s where the system truly leaks: a removal order doesn&apos;t mean deportation. ICE must find
          the person, which is difficult when they&apos;ve been living in the community for years. ICE must also
          obtain travel documents from the person&apos;s home country, which some countries refuse to issue.
        </p>
        <p>
          Our data shows{' '}
          <Link href="/enforcement" className="text-primary hover:underline">{stats.removalOrders.toLocaleString()} court
          removal orders</Link> but far fewer actual ICE removals. The gap between orders and execution is one
          of the most politically contentious aspects of the system.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Full Pipeline</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-6 not-prose">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-white px-3 py-1 rounded-full font-bold">{(border.totalEncounters / 1e6).toFixed(1)}M</span>
              <span>Border encounters (FY2020-2026)</span>
            </div>
            <div className="text-gray-400 pl-6">↓ Title 42 expulsions, voluntary returns filtered out</div>
            <div className="flex items-center gap-3">
              <span className="bg-primary text-white px-3 py-1 rounded-full font-bold">{(stats.totalCases / 1e6).toFixed(1)}M</span>
              <span>Total immigration court cases (all time)</span>
            </div>
            <div className="text-gray-400 pl-6">↓ Cases completed over time</div>
            <div className="flex items-center gap-3">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full font-bold">{(stats.pendingCases / 1e6).toFixed(1)}M</span>
              <span>Currently pending cases</span>
            </div>
            <div className="text-gray-400 pl-6">↓ Hearings, decisions, continuances</div>
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold">{(stats.removalOrders / 1e3).toFixed(0)}K</span>
              <span>Removal orders issued</span>
            </div>
            <div className="text-gray-400 pl-6">↓ Many orders never executed</div>
            <div className="flex items-center gap-3">
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full font-bold">~250K/yr</span>
              <span>Actual ICE removals (varies by year)</span>
            </div>
          </div>
        </div>
        <p>
          From {(border.totalEncounters / 1e6).toFixed(1)} million encounters to ~250,000 annual removals: the
          funnel narrows at every stage. Understanding this pipeline is essential to understanding why
          immigration enforcement is so much harder than it appears in political rhetoric.
        </p>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/border-to-courtroom" title="From Border to Courtroom" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/border" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🌎 Border Data</h3>
          <p className="text-xs text-gray-600 mt-1">12M+ encounters with full breakdowns.</p>
        </Link>
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📈 Court Backlog</h3>
          <p className="text-xs text-gray-600 mt-1">The 1.9M cases waiting for resolution.</p>
        </Link>
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🚨 ICE Enforcement</h3>
          <p className="text-xs text-gray-600 mt-1">Actual deportations vs court orders.</p>
        </Link>
      </div>

      <RelatedAnalysis current="border-to-courtroom" />

      <ArticleSchema title="From Border to Courtroom — 12M Encounters to 1.9M Cases" description="The pipeline from border encounter to court to deportation. How the funnel narrows at every stage." url="https://www.openimmigration.us/analysis/border-to-courtroom" datePublished="2026-02-26" />
    </div>
  )
}
