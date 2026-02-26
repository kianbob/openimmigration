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
  title: 'The Backlog Crisis — How 1.9 Million Cases Piled Up',
  description: 'The U.S. immigration court backlog reached 1.9 million pending cases. With 9.6 million total cases processed, the system is overwhelmed. Data from DOJ EOIR.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/backlog-crisis' },
}

export default function BacklogCrisisPage() {
  const stats = loadData('stats.json')
  const trends = loadData('yearly-trends.json')
  const recentTrends = trends.filter((t: { year: number }) => t.year >= 2015)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Backlog Crisis' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">System Analysis</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Backlog Crisis</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. immigration court system has processed {stats.totalCases.toLocaleString()} cases since 1990.
        {' '}{stats.pendingCases.toLocaleString()} remain pending — and the system can&apos;t keep up.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Numbers Are Staggering</h2>
        <p>
          The U.S. immigration court system — run by the Department of Justice&apos;s Executive Office for Immigration
          Review (EOIR) — currently has <strong>{stats.pendingCases.toLocaleString()} pending cases</strong>.
          That&apos;s {stats.pendingCases.toLocaleString()} people waiting for a hearing that will determine whether
          they stay in the United States or get deported.
        </p>
        <p>
          To put that in perspective: at the 2025 completion rate of approximately 1.3 million cases per year,
          it would take <strong>roughly 18 months</strong> to clear the existing backlog — if zero new cases were filed.
          But in 2024 alone, 508,217 new cases entered the system. In 2023, it was 424,994.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Surge: 2022–2025</h2>
        <p>
          The immigration court system hit an inflection point around 2022. That year, 286,589 new cases were filed —
          nearly double the 142,311 filed in 2021 (a COVID-suppressed year). By 2024, annual filings had nearly
          doubled again to 508,217.
        </p>
        <p>
          But here&apos;s what most people miss: <strong>the system actually completed more cases than it received
          in both 2024 and 2025</strong>. In 2024, courts completed 1,290,672 cases against 508,217 new filings.
          In 2025, they completed 1,298,639 against 421,619 new filings.
        </p>
        <p>
          So why isn&apos;t the backlog shrinking faster? Because the backlog isn&apos;t just about new filings —
          it&apos;s the accumulated weight of decades of underfunding and insufficient capacity. The system is finally
          processing cases faster than they arrive, but it&apos;s still digging out from years of deficit.
        </p>

        {/* Data Table */}
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Year</th>
                <th className="px-4 py-3 text-right font-semibold">Cases Filed</th>
                <th className="px-4 py-3 text-right font-semibold">Completed</th>
                <th className="px-4 py-3 text-right font-semibold">Net Change</th>
                <th className="px-4 py-3 text-right font-semibold">Grants</th>
              </tr>
            </thead>
            <tbody>
              {recentTrends.map((t: { year: number; filed: number; completed: number; grants: number }) => {
                const net = t.filed - t.completed
                return (
                  <tr key={t.year} className="border-t border-gray-100">
                    <td className="px-4 py-2 font-medium">{t.year}</td>
                    <td className="px-4 py-2 text-right">{t.filed.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">{t.completed.toLocaleString()}</td>
                    <td className={`px-4 py-2 text-right font-medium ${net > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {net > 0 ? '+' : ''}{net.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right">{t.grants.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">How We Got Here</h2>
        <p>
          The backlog is the result of a structural mismatch that has persisted for decades:
          <strong> the number of cases entering the system consistently exceeded the system&apos;s capacity to resolve them</strong>
          — until very recently.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Record border encounters (2021-2024):</strong> Unprecedented migration levels generated millions of
            new Notices to Appear (NTAs), each creating a new immigration court case. The 2024 filing spike of 508,217
            was a direct result.
          </li>
          <li>
            <strong>Only {stats.totalCourts} courts and ~600 active judges:</strong> Despite hiring pushes, the number
            of immigration judges hasn&apos;t kept pace. Each judge carries an average caseload of over 10,000 decisions
            across their career in our data.
          </li>
          <li>
            <strong>Asylum complexity:</strong> Asylum cases are the most resource-intensive. With {stats.asylumGranted.toLocaleString()} grants
            and {stats.asylumDenied.toLocaleString()} denials in our data, these cases require individual credibility assessments,
            country condition evidence, and often multiple hearings.
          </li>
          <li>
            <strong>In absentia orders:</strong> {stats.inAbsentia.toLocaleString()} proceedings — 13.3% of all proceedings —
            ended with an in absentia order, where the respondent didn&apos;t appear. Many of these cases get reopened later,
            adding to the backlog.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The 2024-2025 Closure Push</h2>
        <p>
          Starting in 2024, EOIR dramatically increased case completions — from 965,176 in 2023 to 1,290,672 in 2024
          and 1,298,639 in 2025. This represents a <strong>34% increase</strong> in throughput in just one year.
        </p>
        <p>How did they do it?</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>More in absentia removal orders for respondents who don&apos;t appear</li>
          <li>Expedited proceedings for certain case types</li>
          <li>Administrative closures and case terminations ({stats.adminClosure.toLocaleString()} total)</li>
          <li>Voluntary departure agreements ({stats.voluntaryDeparture.toLocaleString()} total)</li>
        </ul>
        <p>
          Critics argue this speed comes at the cost of due process — that rushing through cases means legitimate
          claims are being denied without adequate review. The grant rate dropped from 51,981 in 2023 to 48,485 in
          2024 even as completions surged 34%.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Human Cost</h2>
        <p>
          Behind every one of those {stats.pendingCases.toLocaleString()} pending cases is a person in legal limbo.
          They can&apos;t get permanent status. Many can&apos;t work legally. They live with the constant uncertainty
          of potential deportation. For asylum seekers fleeing persecution, the years-long wait is particularly cruel.
        </p>
        <p>
          And only {stats.representationRate}% have legal representation. Those without attorneys are significantly
          more likely to receive removal orders — not necessarily because their cases are weaker, but because
          navigating immigration law without a lawyer is nearly impossible.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Takeaway</h3>
              <p className="text-sm text-amber-800">
                The system is finally completing more cases than it receives — but it&apos;s working through a mountain
                of accumulated backlog. At current rates, the {stats.pendingCases.toLocaleString()} pending cases could
                take years to resolve, especially as new filings continue.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Court Backlog Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore the backlog numbers by court and year.</p>
        </Link>
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Roulette</h3>
          <p className="text-sm text-gray-600 mt-1">How your assigned judge determines your fate.</p>
        </Link>
      </div>

      <RelatedAnalysis current="backlog-crisis" />
      <ShareButtons url="https://www.openimmigration.us/analysis/backlog-crisis" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          headline: 'The Backlog Crisis — How 1.9 Million Immigration Cases Piled Up',
          url: 'https://www.openimmigration.us/analysis/backlog-crisis',
          publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
        })
      }} />
          <ArticleSchema title="The Backlog Crisis — How 1.9 Million Cases Piled Up" description="The U.S. immigration court backlog reached 1.9 million pending cases. With 9.6 million total cases processed, the system is overwhelmed. Data from DOJ EOIR." url="" datePublished="2026-02-26" />
</div>
  )
}
