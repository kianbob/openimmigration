import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Immigration Court Backlog Crisis: 1.9 Million Cases Pending | Open Immigration',
  description: 'Analysis of the U.S. immigration court backlog — 9.6 million cases filed, 1.9 million still pending, and a system that completed 1.29 million proceedings in 2025 yet still can\'t keep up.',
}

export default function BacklogCrisisPage() {
  const stats = loadData('stats.json')
  const trends = loadData('yearly-trends.json') as Array<{
    year: number; filed: number; completed: number; grants: number; denials: number; removals: number; cumulativePending: number
  }>
  const recent = trends.filter((t) => t.year >= 2015 && t.year <= 2025)

  const pendingFormatted = (stats.pendingCases as number).toLocaleString()
  const totalFormatted = (stats.totalCases as number).toLocaleString()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Backlog Crisis' },
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'The Immigration Court Backlog Crisis: 1.9 Million Cases Pending',
          description: metadata.description,
          publisher: { '@type': 'Organization', name: 'Open Immigration' },
        })}}
      />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">System Analysis</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Backlog Crisis</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. immigration court system has processed <strong>{totalFormatted}</strong> cases since 1990. Today, <strong>{pendingFormatted}</strong> remain pending — and
        even completing a record <strong>1.29 million proceedings in a single year</strong> hasn&apos;t been enough to stop the bleeding.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">A Decade of Explosive Growth</h2>
        <p>
          In 2015, immigration courts filed <strong>97,549 new cases</strong> and completed 288,276 proceedings. By 2024, filings
          had surged to <strong>508,217</strong> — a 5.2x increase in nine years. Completions also rose dramatically to 1.29 million,
          but the gap between inflow and capacity drove the backlog to crisis levels.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Year</th>
                <th className="px-4 py-2 text-right font-semibold">Filed</th>
                <th className="px-4 py-2 text-right font-semibold">Completed</th>
                <th className="px-4 py-2 text-right font-semibold">Grants</th>
                <th className="px-4 py-2 text-right font-semibold">Net Change</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.year} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{t.year}</td>
                  <td className="px-4 py-2 text-right">{t.filed.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{t.completed.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{t.grants.toLocaleString()}</td>
                  <td className={`px-4 py-2 text-right font-medium ${t.filed - t.completed > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {t.filed - t.completed > 0 ? '+' : ''}{(t.filed - t.completed).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The 2022–2025 Explosion</h2>
        <p>
          The post-COVID period saw an unprecedented surge. In 2022, filings nearly doubled to <strong>286,589</strong> while completions
          hit 674,953. By 2023, filings reached <strong>424,994</strong>. The peak came in 2024 with <strong>508,217 new cases filed</strong> —
          more than five times the 2015 level.
        </p>
        <p>
          The system responded with an aggressive closure push. In both 2024 and 2025, courts completed roughly <strong>1.29 million proceedings</strong> each year —
          an extraordinary pace that relied heavily on in absentia orders, administrative closures, and expedited processing. Yet even this
          wasn&apos;t enough: 421,619 new cases were filed in 2025 alone.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">How Long to Clear the Backlog?</h2>
        <p>
          At the 2025 completion rate of 1.29 million proceedings per year, with 421,619 new cases filed, the net reduction
          is roughly <strong>877,000 cases per year</strong>. With {pendingFormatted} cases pending, it would take approximately <strong>{Math.ceil(stats.pendingCases / 877000)} years</strong> to
          clear the backlog — assuming filing rates don&apos;t increase. They historically always do.
        </p>
        <p>
          And speed comes at a cost. The system&apos;s {(stats.inAbsentia as number).toLocaleString()} in absentia orders — <strong>13.3% of all proceedings</strong> — suggest
          that many cases are being &quot;completed&quot; by ordering deportation when respondents fail to appear, not through substantive adjudication.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-lg my-8">
          <p className="font-semibold text-amber-800 mb-2">💡 Key Insight</p>
          <p className="text-amber-900 text-sm">
            The immigration court system processed <strong>16.2 million proceedings</strong> across 9.6 million cases — yet 1.9 million
            cases remain pending. The backlog isn&apos;t a failure of effort; it&apos;s a structural mismatch between
            the volume of cases entering the system and the system&apos;s capacity to fairly adjudicate them.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Scale of the System</h2>
        <p>
          To process these cases, the system relies on just <strong>{(stats.totalJudges as number).toLocaleString()} judges</strong> across <strong>{stats.totalCourts} courts</strong>,
          handling respondents from <strong>{stats.totalNationalities} nationalities</strong>. Of the 7.76 million completed cases,
          the courts granted asylum in <strong>{(stats.asylumGranted as number).toLocaleString()} cases</strong> and denied it
          in {(stats.asylumDenied as number).toLocaleString()}. Another {(stats.removalOrders as number).toLocaleString()} resulted in removal or deportation orders.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What the Data Shows</h2>
        <p>
          The numbers tell a stark story. Despite completing more cases than ever — a 4.5x increase from 2015 to 2025 — the system
          cannot outpace the inflow. The 2025 closure push reduced the pending caseload significantly, but it relied on mechanisms
          like in absentia orders and administrative closures that raise serious due process questions. The backlog isn&apos;t just
          a number — it represents {pendingFormatted} people in legal limbo, waiting years for their day in court.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Variation</h3>
          <p className="text-sm text-gray-600 mt-1">Grant rates range from 0% to 44.9% — your judge may matter more than your case.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👻 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.16 million people ordered deported without being present in court.</p>
        </Link>
      </div>
    </div>
  )
}
