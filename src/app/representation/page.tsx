import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { RepByCourtChart, RepLevelChart } from './RepCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

function titleCase(s: string) {
  return s.replace(/\b\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

export const metadata: Metadata = {
  title: 'Legal Representation in Immigration Court — 18.7M Attorney Records',
  description: '18.7 million attorney representation records across 5.09 million immigration cases. How legal representation impacts outcomes, who gets lawyers, and the court-level breakdown.',
  alternates: { canonical: 'https://www.openimmigration.us/representation' },
}

export default function RepresentationPage() {
  const stats = loadData('stats.json')
  const rep = loadData('representation.json')
  const courtIndex = loadData('court-index.json')
  const languages = loadData('languages.json')

  const courtMap: Record<string, string> = {}
  courtIndex.forEach((c: { code: string; city: string; state: string }) => {
    courtMap[c.code] = titleCase(c.city) + ', ' + c.state
  })

  const totalLang = languages.reduce((s: number, l: { count: number }) => s + l.count, 0)
  const englishCount = languages.find((l: { code: string }) => l.code === 'ENG')?.count || 0
  const nonEnglishPct = (((totalLang - englishCount) / totalLang) * 100).toFixed(1)
  const unrepresented = Math.round(stats.totalCases * (1 - stats.representationRate / 100))
  const courtLevel = rep.attyLevels.find((l: { level: string }) => l.level === 'COURT')?.count || 0
  const boardLevel = rep.attyLevels.find((l: { level: string }) => l.level === 'BOARD')?.count || 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Representation' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Legal Representation in Immigration Court</h1>
      <p className="text-lg text-gray-600 mb-8">
        Our data contains <strong>{(rep.totalRepRecords / 1e6).toFixed(1)} million representation records</strong> across
        {' '}<strong>{(rep.uniqueCasesWithRep / 1e6).toFixed(2)} million unique cases</strong>. Yet
        only <strong>{stats.representationRate}%</strong> of immigrants had a lawyer when removal orders were issued —
        meaning roughly <strong>{(unrepresented / 1e6).toFixed(1)} million people</strong> faced a trained
        government prosecutor alone.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(rep.totalRepRecords / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Rep Records</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{(rep.uniqueCasesWithRep / 1e6).toFixed(2)}M</div>
          <div className="text-sm text-gray-600 mt-1">Cases With Attorneys</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(100 - stats.representationRate).toFixed(1)}%</div>
          <div className="text-sm text-gray-600 mt-1">Without Lawyers</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">5×</div>
          <div className="text-sm text-gray-600 mt-1">Higher Win Rate</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>{(rep.uniqueCasesWithRep / 1e6).toFixed(2)}M cases had attorney representation</strong> — out of {(stats.totalCases / 1e6).toFixed(1)}M total</div>
              <div>• <strong>{(courtLevel / 1e6).toFixed(1)}M representations at court level</strong> vs {(boardLevel / 1e3).toFixed(0)}K at the BIA appeals level</div>
              <div>• <strong>{nonEnglishPct}% of respondents are non-English speakers</strong> — navigating complex legal proceedings without a translator or lawyer</div>
              <div>• <strong>Top court for representation: {courtMap[rep.topCourts[0]?.code] || rep.topCourts[0]?.code}</strong> — {rep.topCourts[0]?.representations.toLocaleString()} records</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <RepByCourtChart data={rep.topCourts} courtMap={courtMap} />
        <RepLevelChart data={rep.attyLevels} />
      </div>

      {/* Top courts table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Representation by Court</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Court</th>
                <th className="px-6 py-3 font-semibold text-right">Attorney Records</th>
                <th className="px-6 py-3 font-semibold text-right">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rep.topCourts.slice(0, 15).map((c: { code: string; representations: number }, i: number) => {
                const court = courtIndex.find((ci: { code: string }) => ci.code === c.code)
                return (
                  <tr key={c.code} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-6 py-3 font-medium">
                      {court?.slug ? (
                        <Link href={`/courts/${court.slug}`} className="text-primary hover:underline">
                          {courtMap[c.code] || c.code}
                        </Link>
                      ) : courtMap[c.code] || c.code}
                    </td>
                    <td className="px-6 py-3 text-right">{c.representations.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right">{((c.representations / rep.totalRepRecords) * 100).toFixed(1)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Core Problem</h2>
        <p>
          In criminal court, the Sixth Amendment guarantees an attorney. In immigration court — technically
          &quot;civil&quot; proceedings — there is no such right. The government prosecutes removal through
          trained ICE trial attorneys, while respondents are left to defend themselves.
        </p>
        <p>
          Research consistently shows that represented immigrants are <strong>5x more likely to win their cases</strong>.
          For asylum specifically, the gap is even wider — closer to 10x. This isn&apos;t just because lawyers
          cherry-pick strong cases. Controlling for case strength, the effect remains enormous.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Court vs. Board Level</h2>
        <p>
          The vast majority of representation occurs at the immigration court level ({(courtLevel / 1e6).toFixed(1)}M records).
          At the BIA appeals level, only {(boardLevel / 1e3).toFixed(0)}K representation records exist. This
          means immigrants who lose their initial hearing often face the appeals process without legal help —
          at the exact moment they need it most.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Who Gets a Lawyer?</h2>
        <p>
          Representation isn&apos;t evenly distributed. It correlates with geography (major metros have more
          pro bono networks), custody status (non-detained have more time to find attorneys), community networks
          (established ethnic communities share referrals), and ability to pay ($5,000-$15,000+ per case).
        </p>
        <p>
          Detained immigrants have the lowest representation rates — they&apos;re often held in remote facilities
          with limited phone access and no immigration lawyers nearby. This compounds the
          <Link href="/analysis/detained-vs-released" className="text-primary hover:underline"> detention disadvantage</Link>.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Cascade</h3>
              <p className="text-sm text-amber-800">
                No lawyer → can&apos;t navigate the system → miss hearings → in absentia removal order →
                permanent bar → can&apos;t reopen without a lawyer. The {stats.representationRate}% representation
                rate drives the {stats.inAbsentia.toLocaleString()} in absentia orders, which drive the backlog,
                which overwhelms the {stats.totalJudges.toLocaleString()} judges. It&apos;s all connected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Link href="/analysis/representation-gap"
          className="inline-block bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-medium">
          Read Full Representation Gap Analysis →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚪 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.1M deported without being present — many without lawyers.</p>
        </Link>
        <Link href="/bond" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Bond Hearings</h3>
          <p className="text-sm text-gray-600 mt-1">{(rep.totalRepRecords / 1e6).toFixed(0)}M+ records show who gets legal help in bond court.</p>
        </Link>
        <Link href="/appeals" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📋 Appeals</h3>
          <p className="text-sm text-gray-600 mt-1">Only {(boardLevel / 1e3).toFixed(0)}K representations at the BIA level.</p>
        </Link>
      </div>
    </div>
  )
}
