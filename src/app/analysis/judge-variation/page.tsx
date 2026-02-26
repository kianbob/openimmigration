import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Judge Roulette — Grant Rates Range from 0% to 44.9%',
  description: 'Immigration judge grant rates vary from 0% to 44.9%. With 1,269 judges making 12.8 million decisions, your assigned judge may matter more than your case.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/judge-variation' },
}

interface Judge {
  code: string; name: string; slug: string; totalDecisions: number;
  grants: number; denials: number; removals: number; absentia: number;
  grantRate: number; removalRate: number;
}

export default function JudgeVariationPage() {
  const judges: Judge[] = loadData('judge-index.json')
  const stats = loadData('stats.json')

  const qualified = judges.filter(j => j.totalDecisions >= 500)
  const highGrant = qualified.filter(j => j.grantRate > 30).sort((a, b) => b.grantRate - a.grantRate)
  const lowGrant = qualified.filter(j => j.grantRate < 3 && j.grantRate >= 0).sort((a, b) => a.grantRate - b.grantRate)
  const topGranters = qualified.sort((a, b) => b.grantRate - a.grantRate).slice(0, 10)
  const bottomGranters = qualified.sort((a, b) => a.grantRate - b.grantRate).slice(0, 10)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Judge Variation' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Judges</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Judge Roulette</h1>
      <p className="text-lg text-gray-600 mb-8">
        Among {stats.totalJudges.toLocaleString()} immigration judges in our data, grant rates range from
        0% to 44.9%. Your assigned judge may be the single strongest predictor of whether you stay or get deported.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Gap Is Enormous</h2>
        <p>
          Immigration law doesn&apos;t change from one courtroom to the next. The legal standard for asylum is
          the same whether you&apos;re in New York or Houston. Yet outcomes vary wildly by judge.
        </p>
        <p>
          Among judges with at least 500 decisions: <strong>{highGrant.length} judges</strong> have grant rates
          above 30%, while <strong>{lowGrant.length} judges</strong> have grant rates below 3%. The highest
          grant rate belongs to <Link href={`/judges/${topGranters[0]?.slug}`} className="text-primary hover:underline">
          Judge {titleCase(topGranters[0]?.name)}</Link> at {topGranters[0]?.grantRate}% across {topGranters[0]?.totalDecisions.toLocaleString()} decisions.
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Highest Grant Rate Judges (500+ decisions)</h3>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Judge</th>
                <th className="px-3 py-2 text-right font-semibold">Decisions</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Grants</th>
              </tr>
            </thead>
            <tbody>
              {topGranters.map(j => (
                <tr key={j.code} className="border-t border-gray-100">
                  <td className="px-3 py-2">
                    <Link href={`/judges/${j.slug}`} className="text-primary hover:underline font-medium">{titleCase(j.name)}</Link>
                  </td>
                  <td className="px-3 py-2 text-right">{j.totalDecisions.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-green-600 font-bold">{j.grantRate}%</td>
                  <td className="px-3 py-2 text-right">{j.grants.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Lowest Grant Rate Judges (500+ decisions)</h3>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Judge</th>
                <th className="px-3 py-2 text-right font-semibold">Decisions</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Removals</th>
              </tr>
            </thead>
            <tbody>
              {bottomGranters.map(j => (
                <tr key={j.code} className="border-t border-gray-100">
                  <td className="px-3 py-2">
                    <Link href={`/judges/${j.slug}`} className="text-primary hover:underline font-medium">{titleCase(j.name)}</Link>
                  </td>
                  <td className="px-3 py-2 text-right">{j.totalDecisions.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-red-600 font-bold">{j.grantRate}%</td>
                  <td className="px-3 py-2 text-right">{j.removals.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why It Happens</h2>
        <p>Several structural factors drive this variation:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>No jury, no panel:</strong> Unlike federal courts, immigration courts use a single judge with
            broad discretion. There&apos;s no jury to moderate individual tendencies and no panel of judges to provide
            checks on outlier decisions.
          </li>
          <li>
            <strong>Subjective credibility determinations:</strong> Asylum cases hinge on whether the judge believes
            the applicant. This is inherently subjective — one judge may find testimony credible while another
            would not, given identical facts.
          </li>
          <li>
            <strong>Political appointment cycles:</strong> Immigration judges are DOJ employees hired by the Attorney
            General. Different administrations prioritize different judicial philosophies, creating cohorts of judges
            with systematically different approaches.
          </li>
          <li>
            <strong>Caseload pressure:</strong> With an average of {Math.round(stats.completedProceedings / stats.totalJudges).toLocaleString()} proceedings
            per judge in our dataset, the pressure to move cases quickly can affect how thoroughly each case is reviewed.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What This Means in Practice</h2>
        <p>
          An asylum seeker assigned to a judge with a 44.9% grant rate has a fundamentally different future than
          one assigned to a judge with a 0% grant rate. Same law. Same evidence standard. Dramatically different
          odds of survival.
        </p>
        <p>
          This &quot;refugee roulette&quot; — as legal scholars call it — raises serious due process concerns. In what
          other area of law does a random judicial assignment produce a 40+ percentage point swing in outcomes?
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Distribution</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ <strong>{highGrant.length} judges</strong> grant relief in 30%+ of cases</li>
                <li>→ <strong>{lowGrant.length} judges</strong> grant relief in fewer than 3% of cases</li>
                <li>→ The average judge has made {Math.round(stats.completedProceedings / stats.totalJudges).toLocaleString()} decisions</li>
                <li>→ Grant rate variation persists even within the same courthouse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/judges" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👨‍⚖️ All {stats.totalJudges.toLocaleString()} Judges</h3>
          <p className="text-sm text-gray-600 mt-1">Explore grant rates and decision patterns for every judge.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📍 Geographic Lottery</h3>
          <p className="text-sm text-gray-600 mt-1">How court location compounds the judge variation problem.</p>
        </Link>
      </div>

      <RelatedAnalysis current="judge-variation" />
      <ShareButtons url="https://www.openimmigration.us/analysis/judge-variation" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          headline: 'Judge Roulette — Immigration Grant Rates Range from 0% to 44.9%',
          url: 'https://www.openimmigration.us/analysis/judge-variation',
          publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
        })
      }} />
          <ArticleSchema title="Judge Roulette — Grant Rates Range from 0% to 44.9%" description="Immigration judge grant rates vary from 0% to 44.9%. With 1,269 judges making 12.8 million decisions, your assigned judge may matter more than your case." url="" datePublished="2026-02-26" />
</div>
  )
}
