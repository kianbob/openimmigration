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
  title: 'The Speed of Justice — Why Immigration Cases Take Years',
  description: 'We analyzed 12.4 million completed proceedings. Average wait: 397 days. Some courts average 2.7 years. Why the system is so slow — and who suffers most.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/speed-of-justice' },
}

export default function SpeedOfJusticePage() {
  const wait = loadData('wait-times.json')
  const stats = loadData('stats.json')

  const peak = wait.byYear.reduce((m: { avgDays: number; year: number }, y: { avgDays: number; year: number }) =>
    y.avgDays > m.avgDays ? y : m, wait.byYear[0])
  const fivePlus = wait.distribution.find((d: { label: string }) => d.label === '5+ years')
  const under6 = wait.distribution.find((d: { label: string }) => d.label === 'Under 6 months')
  const slowest = wait.topCourtsByWait[0]
  const fastest = wait.fastestCourts[0]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Speed of Justice' },
      ]} />

      <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">System Analysis</span>
      <h1 className="font-heading text-4xl font-bold mb-6">The Speed of Justice</h1>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-xl text-gray-600 mb-8">
          We analyzed <strong>{(wait.totalCasesWithDuration / 1e6).toFixed(1)} million completed immigration proceedings</strong> to
          answer a simple question: how long does it take? The answer — an average of <strong>{wait.avgDaysOverall} days
          ({wait.avgYearsOverall} years)</strong> — masks enormous variation that determines people&apos;s lives.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">The Two-Speed System</h2>
        <p>
          Immigration court operates at two radically different speeds. <strong>{under6?.pct}% of proceedings
          ({under6?.count.toLocaleString()} cases) resolve in under 6 months</strong> — these are overwhelmingly
          detained cases on expedited dockets and in absentia removal orders where the person never appeared.
        </p>
        <p>
          At the other extreme, <strong>{fivePlus?.count.toLocaleString()} proceedings ({fivePlus?.pct}%)
          took more than 5 years</strong>. These are people living in legal limbo for half a decade or more —
          unable to fully plan their lives, working under temporary permits, raising American children while
          facing potential deportation.
        </p>
        <p>
          The gap between the fastest and slowest courts is staggering: the fastest court averages just
          <strong> {fastest?.avgDays} days</strong>, while the slowest averages <strong> {(slowest?.avgDays / 365).toFixed(1)} years</strong>.
          Same law, same country — wildly different timelines.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Why Cases Got Slower</h2>
        <p>
          Cases completed in {peak.year} averaged <strong>{(peak.avgDays / 365).toFixed(1)} years</strong> — the
          peak in our data. This wasn&apos;t random. Multiple factors converged:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>The backlog spiral</strong> — With {(stats.pendingCases / 1e6).toFixed(1)}M cases pending and
          only {stats.totalJudges.toLocaleString()} judges, each judge carries ~{Math.round(stats.pendingCases / stats.totalJudges).toLocaleString()} cases.
          Even getting a first hearing scheduled takes months.</li>
          <li><strong>Continuances</strong> — Cases are frequently postponed for months at a time. Judges grant continuances for
          missing evidence, attorney scheduling, pending USCIS applications, or simply because the docket is full.</li>
          <li><strong>The representation gap</strong> — Only {stats.representationRate}% of respondents have attorneys.
          Unrepresented people often need more hearings because they don&apos;t know the procedures, miss deadlines,
          or file incorrect paperwork.</li>
          <li><strong>Policy whiplash</strong> — Changing prosecutorial priorities between administrations cause mass
          rescheduling, reopening of closed cases, and docket shuffling.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Detained = Fast, Non-Detained = Slow</h2>
        <p>
          The single biggest predictor of case speed is custody status. Detained cases move in weeks to months
          because the government is paying $150-$300 per day to house the person. There&apos;s financial pressure to resolve
          quickly.
        </p>
        <p>
          Non-detained cases can languish for years. There&apos;s no cost pressure — the respondent is living in the
          community, working (often with authorization), paying taxes, and raising families. The system has no
          urgency.
        </p>
        <p>
          This creates a perverse dynamic: <strong>detained immigrants get faster &quot;justice&quot; but worse outcomes</strong>.
          They have less time to find lawyers, gather evidence, and build their cases. Non-detained immigrants
          wait years but have better chances of winning — if they can endure the uncertainty.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Human Cost of Waiting</h2>
        <p>
          A 4-year immigration case isn&apos;t just a bureaucratic delay. It&apos;s:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A parent who can&apos;t travel to see a dying relative abroad because leaving means losing the case</li>
          <li>A worker who can&apos;t get promoted because their work authorization is temporary and uncertain</li>
          <li>A child who was 6 when the case started and 10 when it resolves — an American in every way except on paper</li>
          <li>A domestic violence survivor who fled danger and now waits years to know if she can stay</li>
        </ul>
        <p>
          For the government, the cost is also enormous. Each pending case requires file storage, hearing scheduling,
          interpreter services, and judge time. The {(stats.pendingCases / 1e6).toFixed(1)}M case backlog represents
          billions of dollars in future processing costs.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Can the System Speed Up?</h2>
        <p>
          Recent data suggests a tentative yes. Cases completed in 2024-2025 averaged 569-623 days — faster than
          the {peak.year} peak of {peak.avgDays} days. This reflects:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hiring more judges (now {stats.totalJudges.toLocaleString()}, up from ~400 a decade ago)</li>
          <li>Dedicated dockets for recent border crossers</li>
          <li>More in absentia orders (quick resolution, but not necessarily just)</li>
          <li>Administrative closure and prosecutorial discretion clearing older cases</li>
        </ul>
        <p>
          But as long as new filings keep pace with completions, the backlog — and the wait — will persist.
          The fundamental math hasn&apos;t changed: too many cases, too few judges.
        </p>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/speed-of-justice" title="The Speed of Justice" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/wait-times" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">⏱️ Wait Time Data</h3>
          <p className="text-xs text-gray-600 mt-1">Full court-by-court wait time analysis.</p>
        </Link>
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📈 Court Backlog</h3>
          <p className="text-xs text-gray-600 mt-1">The 1.9M pending cases driving wait times.</p>
        </Link>
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🏛️ All Courts</h3>
          <p className="text-xs text-gray-600 mt-1">Compare courts by caseload and speed.</p>
        </Link>
      </div>

      <RelatedAnalysis current="speed-of-justice" />

      <ArticleSchema title="The Speed of Justice — Why Immigration Cases Take Years" description="12.4 million proceedings analyzed. Average wait: 397 days. Court-by-court variation." url="https://www.openimmigration.us/analysis/speed-of-justice" datePublished="2026-02-26" />
    </div>
  )
}
