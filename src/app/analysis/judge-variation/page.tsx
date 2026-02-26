import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { titleCase } from '@/lib/utils'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Judge Variation in Immigration Courts: 0% to 44.9% Grant Rates | Open Immigration',
  description: 'Analysis of 1,269 immigration judges reveals dramatic variation — grant rates range from 0% to 44.9%. Only 17 judges grant asylum more than 30% of the time, while 378 grant it less than 3%.',
}

interface Judge {
  name: string
  totalDecisions: number
  grants: number
  denials: number
  removals: number
  absentia: number
  grantRate: number
  removalRate: number
  slug: string
}

export default function JudgeVariationPage() {
  const stats = loadData('stats.json')
  const allJudges: Judge[] = loadData('judge-index.json')

  const realJudges = allJudges.filter(
    (j) => j.totalDecisions >= 500 && j.name.includes(',') && j.name.length > 4
      && !j.name.toLowerCase().includes('clerical') && !j.name.toLowerCase().includes('transfer')
      && !j.name.toLowerCase().includes('visiting') && !j.name.toLowerCase().includes('iad ')
  )
  const sorted = [...realJudges].sort((a, b) => b.grantRate - a.grantRate)
  const top5 = sorted.slice(0, 5)
  const bottom5 = sorted.filter((j) => j.grantRate <= 0.1).slice(0, 5)
  const highGrantCount = realJudges.filter((j) => j.grantRate > 30).length
  const lowGrantCount = realJudges.filter((j) => j.grantRate < 3).length
  const avgDecisions = Math.round(realJudges.reduce((s, j) => s + j.totalDecisions, 0) / realJudges.length)

  function JudgeTable({ judges, label }: { judges: Judge[]; label: string }) {
    return (
      <div className="my-6">
        <h3 className="font-semibold text-lg mb-2">{label}</h3>
        <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Judge</th>
              <th className="px-4 py-2 text-right font-semibold">Grant Rate</th>
              <th className="px-4 py-2 text-right font-semibold">Decisions</th>
            </tr>
          </thead>
          <tbody>
            {judges.map((j) => (
              <tr key={j.slug} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Link href={`/judges/${j.slug}`} className="text-primary hover:underline font-medium">
                    {titleCase(j.name)}
                  </Link>
                </td>
                <td className="px-4 py-2 text-right font-bold">{j.grantRate}%</td>
                <td className="px-4 py-2 text-right">{j.totalDecisions.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Judge Variation' },
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Judge Variation in Immigration Courts: 0% to 44.9% Grant Rates',
          description: metadata.description,
          publisher: { '@type': 'Organization', name: 'Open Immigration' },
        })}}
      />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">System Analysis</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Judge Lottery</h1>
      <p className="text-lg text-gray-600 mb-8">
        In immigration court, the judge assigned to your case may matter more than the facts of your case.
        Grant rates among judges with 500+ decisions range from <strong>0% to 44.9%</strong> — a gap so wide
        it resembles a lottery, not a legal system.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Extremes</h2>
        <p>
          Judge <Link href="/judges/morace-philip-l" className="text-primary hover:underline">Philip L. Morace</Link> has
          the highest grant rate among judges with 500+ decisions: <strong>44.9%</strong> across 15,819 decisions.
          At the other end, judges like <Link href="/judges/garten-danielle-h" className="text-primary hover:underline">Danielle H. Garten</Link> (4,024 decisions)
          and <Link href="/judges/garcia-emmanuel" className="text-primary hover:underline">Emmanuel Garcia</Link> (3,780 decisions)
          grant asylum at rates of <strong>0% and 0.1%</strong> respectively.
        </p>
        <p>
          The same asylum claim — same country, same persecution, same evidence — can receive dramatically different
          outcomes depending solely on which judge is assigned.
        </p>

        <JudgeTable judges={top5} label="Highest Grant Rate Judges (500+ decisions)" />
        <JudgeTable judges={bottom5} label="Lowest Grant Rate Judges (500+ decisions)" />

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Distribution Is Skewed</h2>
        <p>
          Of the {realJudges.length.toLocaleString()} judges with 500+ decisions in our dataset, only <strong>{highGrantCount} judges</strong> have
          a grant rate above 30%. Meanwhile, <strong>{lowGrantCount} judges</strong> — nearly a third — grant asylum in fewer than 3% of their cases.
        </p>
        <p>
          The average judge has rendered <strong>{avgDecisions.toLocaleString()} decisions</strong>. These aren&apos;t small sample sizes —
          these are career-spanning patterns that reveal deep, systematic differences in how judges interpret the law,
          assess credibility, and weigh evidence.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why It Matters</h2>
        <p>
          Immigration judges are not Article III judges with lifetime appointments and Senate confirmation. They are
          DOJ employees — attorneys hired by the Attorney General who can be reassigned, pressured, or removed.
          The system offers no jury, no public defender, and — as our <Link href="/analysis/representation-gap" className="text-primary hover:underline">representation data shows</Link> —
          73.3% of respondents appear without a lawyer.
        </p>
        <p>
          In this context, judge assignment isn&apos;t just a procedural detail. It&apos;s the single most consequential
          variable in many immigration cases, more predictive of outcome than the respondent&apos;s nationality,
          the nature of their claim, or even whether they have legal representation.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-lg my-8">
          <p className="font-semibold text-amber-800 mb-2">💡 Key Insight</p>
          <p className="text-amber-900 text-sm">
            With only <strong>17 out of {realJudges.length.toLocaleString()} judges</strong> granting asylum more than 30% of the time
            and <strong>{lowGrantCount} judges</strong> granting it less than 3%, the immigration court system produces
            wildly inconsistent outcomes for similarly situated respondents. This isn&apos;t judicial discretion —
            it&apos;s structural inconsistency at scale.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Key Findings</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Grant rates span <strong>0% to 44.9%</strong> among experienced judges</li>
          <li>Only <strong>17 judges</strong> grant asylum more than 30% of the time</li>
          <li><strong>{lowGrantCount} judges</strong> (33% of all judges) have grant rates below 3%</li>
          <li>The average judge has decided <strong>{avgDecisions.toLocaleString()} cases</strong> — these patterns are statistically robust</li>
          <li>Judge variation exists even within the same court, handling the same docket of cases</li>
        </ul>

        <p>
          Explore individual judge records, grant rates, and decision histories on our{' '}
          <Link href="/judges" className="text-primary hover:underline">judges directory</Link>.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🗺️ The Geographic Lottery</h3>
          <p className="text-sm text-gray-600 mt-1">New York grants asylum at 21%. Houston at 0.8%. Same law, different outcomes.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👤 The Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">73.3% of respondents face immigration court without a lawyer.</p>
        </Link>
      </div>
    </div>
  )
}
