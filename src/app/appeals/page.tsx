import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { AppealsYearlyChart, AppealsDecisionsPie, AppealsFilerChart, AppealsCustodyChart } from './AppealsCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

function titleCase(s: string) {
  return s.replace(/\b\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

export const metadata: Metadata = {
  title: 'Immigration Appeals — 1.46 Million Cases Before the BIA',
  description: '1.46 million immigration appeals to the Board of Immigration Appeals (BIA). 31% dismissed, 14% remanded, 9.4% denied. Explore appeal outcomes, trends, and who files.',
  alternates: { canonical: 'https://www.openimmigration.us/appeals' },
}

export default function AppealsPage() {
  const appeals = loadData('appeals.json')
  const natIndex = loadData('nationality-index.json')
  const natMap: Record<string, string> = {}
  natIndex.forEach((n: { code: string; name: string; slug?: string }) => {
    natMap[n.code] = n.name
  })
  const natSlugMap: Record<string, string> = {}
  natIndex.forEach((n: { code: string; slug?: string }) => {
    if (n.slug) natSlugMap[n.code] = n.slug
  })

  const dismissedPct = ((appeals.decisions.find((d: { name: string }) => d.name === 'DIS')?.count / appeals.totalAppeals) * 100).toFixed(1)
  const remandedPct = ((appeals.decisions.find((d: { name: string }) => d.name === 'REM')?.count / appeals.totalAppeals) * 100).toFixed(1)
  const deniedPct = ((appeals.decisions.find((d: { name: string }) => d.name === 'DEN')?.count / appeals.totalAppeals) * 100).toFixed(1)
  const sustainedCount = (appeals.decisions.find((d: { name: string }) => d.name === 'SAF')?.count || 0) + (appeals.decisions.find((d: { name: string }) => d.name === 'SAV')?.count || 0)
  const sustainedPct = ((sustainedCount / appeals.totalAppeals) * 100).toFixed(1)

  const respondentAppeals = appeals.filedBy.find((f: { by: string }) => f.by === 'A')?.count || 0
  const respondentPct = ((respondentAppeals / appeals.totalAppeals) * 100).toFixed(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Appeals' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Appeals to the BIA</h1>
      <p className="text-lg text-gray-600 mb-8">
        When an immigration judge issues a decision, either side can appeal to the Board of Immigration Appeals (BIA).
        Our data covers <strong>{(appeals.totalAppeals / 1e6).toFixed(2)} million appeals</strong> — and the numbers
        reveal a system where most appeals are dismissed before they&apos;re ever heard on the merits.
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(appeals.totalAppeals / 1e6).toFixed(2)}M</div>
          <div className="text-sm text-gray-600 mt-1">Total Appeals</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{dismissedPct}%</div>
          <div className="text-sm text-gray-600 mt-1">Dismissed</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{remandedPct}%</div>
          <div className="text-sm text-gray-600 mt-1">Remanded</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{sustainedPct}%</div>
          <div className="text-sm text-gray-600 mt-1">Sustained</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>{dismissedPct}% of appeals are dismissed</strong> — many on procedural grounds before reaching the merits</div>
              <div>• <strong>{respondentPct}% filed by respondents</strong> — immigrants appeal far more than the government</div>
              <div>• <strong>Only {sustainedPct}% are sustained</strong> — the BIA overturns the original decision in fewer than 1 in 10 cases</div>
              <div>• <strong>{remandedPct}% are remanded</strong> — sent back to the immigration judge for further proceedings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <AppealsYearlyChart data={appeals.yearlyAppeals} />
        <AppealsDecisionsPie data={appeals.decisions} />
        <AppealsFilerChart data={appeals.filedBy} />
        <AppealsCustodyChart data={appeals.byCustody} />
      </div>

      {/* Top nationalities table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Top Nationalities Filing Appeals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Nationality</th>
                <th className="px-6 py-3 font-semibold text-right">Total Appeals</th>
                <th className="px-6 py-3 font-semibold text-right">% of All Appeals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appeals.topNationalities.slice(0, 15).map((n: { code: string; total: number }, i: number) => (
                <tr key={n.code} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-6 py-3 font-medium">
                    {natSlugMap[n.code] ? (
                      <Link href={`/nationalities/${natSlugMap[n.code]}`} className="text-primary hover:underline">
                        {titleCase(natMap[n.code] || n.code)}
                      </Link>
                    ) : titleCase(natMap[n.code] || n.code)}
                  </td>
                  <td className="px-6 py-3 text-right">{n.total.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">{((n.total / appeals.totalAppeals) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prose sections */}
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Is the BIA?</h2>
        <p>
          The Board of Immigration Appeals is the highest administrative body for interpreting immigration law.
          It sits in Falls Church, Virginia and reviews appeals from immigration judge decisions nationwide.
          Unlike federal appeals courts, BIA members typically decide cases based on written briefs alone — no
          oral argument, no live testimony.
        </p>
        <p>
          The BIA can affirm, reverse, or remand (send back) a case. In practice, it affirms or dismisses
          the vast majority. Of our {(appeals.totalAppeals / 1e6).toFixed(2)} million appeals, only {sustainedPct}%
          resulted in the original decision being overturned.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Dismissal Problem</h2>
        <p>
          {dismissedPct}% of appeals are dismissed — often for procedural reasons like late filing, failure to
          specify grounds, or jurisdictional issues. For unrepresented appellants who don&apos;t understand the
          BIA&apos;s strict requirements, the appeal never reaches the substance of their case.
        </p>
        <p>
          A 2002 policy known as &quot;streamlining&quot; allowed single BIA members to issue summary dismissals
          (called &quot;affirmances without opinion&quot;). This dramatically increased throughput but also drew
          criticism that it rubber-stamped immigration judge decisions without meaningful review.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Immigrants Appeal More</h2>
        <p>
          {respondentPct}% of appeals are filed by the respondent (the immigrant), not the government. This
          makes sense: the stakes are dramatically different. For ICE, losing an appeal means one person stays.
          For the immigrant, losing means deportation — potentially to danger, family separation, or death.
        </p>
        <p>
          The government does appeal when it loses at the trial level, particularly in asylum cases where it
          believes the judge applied the wrong legal standard. But these make up a small fraction of the total.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">After the BIA</h2>
        <p>
          If the BIA denies an appeal, the respondent can petition for review in the federal circuit court of
          appeals. This is a true judicial review — but with a very high bar. The circuit court only reviews
          questions of law, not factual findings. And a &quot;petition for review&quot; must be filed within 30
          days of the BIA&apos;s final order.
        </p>
      </div>

      
      {/* Why This Data Matters */}
      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Why This Data Matters</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            The Board of Immigration Appeals is the last internal check on immigration judge decisions — and for most
            people, it&apos;s functionally the last check period. While federal circuit courts can review BIA decisions,
            the standard of review is so deferential that most petitions fail. The BIA is where immigration justice is
            finalized for 1.46 million people.
          </p>
          <p>
            The numbers tell a troubling story: 31% of appeals are dismissed on procedural grounds — meaning the merits
            are never considered. Only 7.2% result in the original decision being overturned. For respondents who lost
            before an immigration judge, the appeal process offers more false hope than real relief.
          </p>
          <p>
            This matters because immigration judges operate with enormous discretion and minimal oversight. When the
            appellate body reverses only 7% of decisions, it raises questions about whether the system has adequate
            quality control — or whether the BIA functions more as a rubber stamp than a meaningful check on judicial power.
          </p>
        </div>
      </section>

      {/* Cross-links */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Roulette</h3>
          <p className="text-sm text-gray-600 mt-1">Massive variation in judge decisions drives many appeals.</p>
        </Link>
        <Link href="/representation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation</h3>
          <p className="text-sm text-gray-600 mt-1">Unrepresented appellants face procedural dismissal.</p>
        </Link>
        <Link href="/asylum" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ Asylum</h3>
          <p className="text-sm text-gray-600 mt-1">Asylum denials are the #1 driver of immigration appeals.</p>
        </Link>
      </div>

      {/* FAQ Section */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2">What is the Board of Immigration Appeals (BIA)?</h3>
            <p className="text-gray-700">The BIA is the highest administrative body for interpreting and applying immigration law. Located in Falls Church, Virginia, it reviews appeals from immigration judge decisions nationwide. Unlike federal courts, the BIA typically decides cases based on written briefs alone — no oral argument or live testimony. It can affirm, reverse, or remand cases back to the immigration judge.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2">How often does the BIA overturn immigration judge decisions?</h3>
            <p className="text-gray-700">Rarely. Only about 7.2% of appeals result in the original decision being sustained (overturned in favor of the appellant). About 31% are dismissed on procedural grounds without reaching the merits, and 14% are remanded back to the immigration judge for further proceedings. The low reversal rate has led critics to argue the BIA functions more as a rubber stamp than a meaningful check.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2">What happens after a BIA appeal is denied?</h3>
            <p className="text-gray-700">If the BIA denies an appeal, the respondent can file a petition for review with the federal circuit court of appeals within 30 days. This is a true judicial review, but the court only reviews questions of law — not factual findings — and applies a highly deferential standard. Most petitions for review are denied. If the circuit court also denies review, the removal order becomes final.</p>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the Board of Immigration Appeals (BIA)?', acceptedAnswer: { '@type': 'Answer', text: 'The BIA is the highest administrative body for interpreting and applying immigration law. Located in Falls Church, Virginia, it reviews appeals from immigration judge decisions nationwide. It can affirm, reverse, or remand cases back to the immigration judge.' } },
          { '@type': 'Question', name: 'How often does the BIA overturn immigration judge decisions?', acceptedAnswer: { '@type': 'Answer', text: 'Rarely. Only about 7.2% of appeals result in the original decision being overturned. About 31% are dismissed on procedural grounds, and 14% are remanded for further proceedings.' } },
          { '@type': 'Question', name: 'What happens after a BIA appeal is denied?', acceptedAnswer: { '@type': 'Answer', text: 'The respondent can file a petition for review with the federal circuit court of appeals within 30 days. The court only reviews questions of law and applies a highly deferential standard. Most petitions are denied.' } },
        ]
      }) }} />

      <p className="text-xs text-gray-400 mt-8">
        Source: Department of Justice, Executive Office for Immigration Review (EOIR). Data current through February 2026. <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
