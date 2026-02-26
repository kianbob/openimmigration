import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Geographic Lottery — Grant Rates: New York 21% vs Houston 0.8%',
  description: 'Immigration court outcomes vary wildly by location. New York grants at 21%, Houston at 0.8%. Same law, same evidence standard — a 26x difference. Explore all 88 courts.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/geographic-lottery' },
}

interface Court { code: string; name: string; slug: string; city: string; state: string; cases: number; completed: number; grants: number; grantRate: number | null; removals: number }

export default function GeographicLotteryPage() {
  const courts: Court[] = loadData('court-index.json')
  const stats = loadData('stats.json')
  const states = loadData('states.json')

  const qualified = courts.filter(c => c.grantRate != null && (c.completed || 0) > 1000)
  const highest = [...qualified].sort((a, b) => (b.grantRate || 0) - (a.grantRate || 0)).slice(0, 10)
  const lowest = [...qualified].sort((a, b) => (a.grantRate || 0) - (b.grantRate || 0)).slice(0, 10)
  const byCases = [...courts].sort((a, b) => b.cases - a.cases).slice(0, 10)

  // State groupings
  const texasCourts = courts.filter(c => c.state === 'TX')
  const nyCourts = courts.filter(c => c.state === 'NY')
  const texasCases = texasCourts.reduce((s, c) => s + c.cases, 0)
  const nyCases = nyCourts.reduce((s, c) => s + c.cases, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Geographic Lottery' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Courts</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Geographic Lottery</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.totalCourts} immigration courts across the country apply the same law — but produce wildly
        different outcomes. The highest grant rate court approves relief at {highest[0]?.grantRate}%. The lowest
        at {lowest[0]?.grantRate}%. Where your case is heard may matter more than anything else.
      </p>

      {/* Key comparison */}
      <div className="grid grid-cols-2 gap-4 mb-10 not-prose">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-green-700">{highest[0]?.grantRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Highest Grant Rate</div>
          <div className="text-xs text-gray-400">{titleCase(highest[0]?.city)}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-red-700">{lowest[0]?.grantRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Lowest Grant Rate</div>
          <div className="text-xs text-gray-400">{titleCase(lowest[0]?.city)}, {lowest[0]?.state}</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Extremes</h2>
        <p>
          An asylum seeker whose case lands in <Link href={`/courts/${highest[0]?.slug}`} className="text-primary hover:underline">{titleCase(highest[0]?.city)}</Link> has
          a {highest[0]?.grantRate}% chance of winning relief. The same person, same facts, same law — but in{' '}
          <Link href={`/courts/${lowest[0]?.slug}`} className="text-primary hover:underline">{titleCase(lowest[0]?.city)}, {lowest[0]?.state}</Link> — faces
          a {lowest[0]?.grantRate}% chance. That&apos;s a <strong>{((highest[0]?.grantRate || 1) / Math.max(0.1, lowest[0]?.grantRate || 0.1)).toFixed(0)}x difference</strong> based
          entirely on geography.
        </p>
        <p>
          To be clear: this isn&apos;t comparing different legal systems. All {stats.totalCourts} courts operate under
          the same Immigration and Nationality Act, the same BIA precedent decisions, and the same Circuit Court
          oversight (though circuits vary). The law is identical. The outcomes are not.
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Highest Grant Rate Courts</h3>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Court</th>
                <th className="px-3 py-2 text-right font-semibold">Total Cases</th>
                <th className="px-3 py-2 text-right font-semibold">Completed</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Grants</th>
              </tr>
            </thead>
            <tbody>
              {highest.map(c => (
                <tr key={c.code} className="border-t border-gray-100">
                  <td className="px-3 py-2"><Link href={`/courts/${c.slug}`} className="text-primary hover:underline font-medium">{titleCase(c.city)}, {c.state}</Link></td>
                  <td className="px-3 py-2 text-right">{c.cases.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{(c.completed || 0).toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-green-600 font-bold">{c.grantRate}%</td>
                  <td className="px-3 py-2 text-right">{(c.grants || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Lowest Grant Rate Courts</h3>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Court</th>
                <th className="px-3 py-2 text-right font-semibold">Total Cases</th>
                <th className="px-3 py-2 text-right font-semibold">Completed</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Removals</th>
              </tr>
            </thead>
            <tbody>
              {lowest.map(c => (
                <tr key={c.code} className="border-t border-gray-100">
                  <td className="px-3 py-2"><Link href={`/courts/${c.slug}`} className="text-primary hover:underline font-medium">{titleCase(c.city)}, {c.state}</Link></td>
                  <td className="px-3 py-2 text-right">{c.cases.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{(c.completed || 0).toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-red-600 font-bold">{c.grantRate}%</td>
                  <td className="px-3 py-2 text-right">{(c.removals || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Busiest Courts</h2>
        <p>Volume doesn&apos;t correlate with generosity. The courts processing the most cases:</p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Court</th>
                <th className="px-3 py-2 text-right font-semibold">Total Cases</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
              </tr>
            </thead>
            <tbody>
              {byCases.map(c => (
                <tr key={c.code} className="border-t border-gray-100">
                  <td className="px-3 py-2"><Link href={`/courts/${c.slug}`} className="text-primary hover:underline font-medium">{titleCase(c.city)}, {c.state}</Link></td>
                  <td className="px-3 py-2 text-right font-medium">{c.cases.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">
                    {c.grantRate != null ? (
                      <span className={`font-bold ${(c.grantRate || 0) >= 10 ? 'text-green-600' : (c.grantRate || 0) >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>{c.grantRate}%</span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Texas vs. New York Divide</h2>
        <p>
          The starkest geographic divide runs between Texas and New York. Texas courts handle {texasCases.toLocaleString()} cases
          across {texasCourts.length} courts — predominantly border enforcement cases with very low grant rates.
          New York courts handle {nyCases.toLocaleString()} cases across {nyCourts.length} courts with significantly
          higher grant rates.
        </p>
        <p>This isn&apos;t just about judges. It&apos;s about entire legal ecosystems:</p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="font-bold text-red-900 text-lg mb-2">🏛️ Texas Courts</h3>
            <ul className="text-sm text-red-800 space-y-2">
              <li>→ {texasCases.toLocaleString()} cases across {texasCourts.length} courts</li>
              <li>→ Heavy border enforcement docket</li>
              <li>→ Many detained respondents</li>
              <li>→ Fewer pro bono attorneys</li>
              <li>→ 5th Circuit (restrictive asylum precedent)</li>
              <li>→ High in absentia and VD rates</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="font-bold text-green-900 text-lg mb-2">🏛️ New York Courts</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>→ {nyCases.toLocaleString()} cases across {nyCourts.length} courts</li>
              <li>→ More affirmative asylum cases</li>
              <li>→ Mostly non-detained docket</li>
              <li>→ Dense pro bono legal network</li>
              <li>→ 2nd Circuit (broader asylum protections)</li>
              <li>→ Higher representation rates</li>
            </ul>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why This Happens</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Federal Circuit Courts matter:</strong> Immigration judges are bound by their Circuit&apos;s
            precedent. The 9th Circuit (West Coast) and 2nd Circuit (New York) have broader asylum protections.
            The 5th Circuit (Texas, Louisiana) is far more restrictive. Same law, different interpretation.
          </li>
          <li>
            <strong>Judge pools differ:</strong> Each court&apos;s judges were hired during different administrations
            with different enforcement priorities. A court staffed during an enforcement-focused era will produce
            different outcomes than one staffed during a humanitarian-focused era.
          </li>
          <li>
            <strong>Case composition varies:</strong> Border courts see more expedited removal and in absentia cases.
            Interior courts see more affirmative asylum applications with established claims and evidence.
          </li>
          <li>
            <strong>Attorney availability:</strong> The <Link href="/analysis/representation-gap" className="text-primary hover:underline">representation gap</Link> maps
            directly onto geography. NYC has hundreds of immigration attorneys per court. Rural Texas courts have almost none.
          </li>
          <li>
            <strong>Local legal culture:</strong> Judges in the same courthouse develop shared norms over time.
            If the senior judge sets a restrictive tone, newer judges often follow. This creates self-reinforcing
            patterns within courts.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Can You Choose Your Court?</h2>
        <p>
          Generally, no. Your court is determined by where you live (for non-detained cases) or where you&apos;re
          detained (for detained cases). Change of venue requests are possible but rarely granted.
        </p>
        <p>
          This means that where ICE chooses to detain someone — and where someone happens to live — has an
          enormous impact on their case outcome. A Venezuelan asylum seeker in Houston faces a fundamentally
          different system than the same person in New York, despite identical legal rights.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Compound Effect</h3>
              <p className="text-sm text-amber-800">
                Geography doesn&apos;t just determine your court — it determines your judge
                (<Link href="/analysis/judge-variation" className="text-amber-900 underline">variation article</Link>),
                your access to an attorney
                (<Link href="/analysis/representation-gap" className="text-amber-900 underline">representation gap</Link>),
                and the federal circuit precedent that governs your case. These factors compound: a respondent in
                a low-grant court, with a low-grant judge, no attorney, in a restrictive circuit faces systematically
                different odds than someone in a high-grant court with a lawyer in a more expansive circuit.
                Same country. Same law. Radically different justice.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ All {stats.totalCourts} Courts</h3>
          <p className="text-sm text-gray-600 mt-1">Compare every immigration court in the country.</p>
        </Link>
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Roulette</h3>
          <p className="text-sm text-gray-600 mt-1">Within each court, judge variation adds another layer.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Attorney access maps directly to geography.</p>
        </Link>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/geographic-lottery" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Geographic Lottery — Immigration Court Grant Rates by Location',
        url: 'https://www.openimmigration.us/analysis/geographic-lottery',
        publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
      }) }} />
          <ArticleSchema title="The Geographic Lottery — Grant Rates: New York 21% vs Houston 0.8%" description="Immigration court outcomes vary wildly by location. New York grants at 21%, Houston at 0.8%. Same law, same evidence standard — a 26x difference. Explore all 88 courts." url="" datePublished="2026-02-26" />
</div>
  )
}
