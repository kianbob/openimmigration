import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { WaitByYearChart, DistributionChart, CourtWaitChart } from './WaitTimeCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

function titleCase(s: string) {
  return s.replace(/\b\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

export const metadata: Metadata = {
  title: 'Immigration Court Wait Times — Average 1.1 Years, Up to 2.7 Years',
  description: 'How long does immigration court take? Average case duration is 397 days. Cases completed in 2022 averaged 816 days (2.2 years). Wait times by court, year, and duration distribution.',
  alternates: { canonical: 'https://www.openimmigration.us/wait-times' },
}

export default function WaitTimesPage() {
  const data = loadData('wait-times.json')
  const courtIndex = loadData('court-index.json')
  const stats = loadData('stats.json')

  const courtMap: Record<string, { city: string; state: string; slug?: string }> = {}
  courtIndex.forEach((c: { code: string; city: string; state: string; slug?: string }) => {
    courtMap[c.code] = { city: c.city, state: c.state, slug: c.slug }
  })

  const slowest = data.topCourtsByWait.slice(0, 12).map((c: { code: string; avgDays: number; cases: number }) => ({
    ...c,
    name: courtMap[c.code] ? titleCase(courtMap[c.code].city) + ', ' + courtMap[c.code].state : c.code,
    slug: courtMap[c.code]?.slug,
  }))
  const fastest = data.fastestCourts.slice(0, 12).map((c: { code: string; avgDays: number; cases: number }) => ({
    ...c,
    name: courtMap[c.code] ? titleCase(courtMap[c.code].city) + ', ' + courtMap[c.code].state : c.code,
    slug: courtMap[c.code]?.slug,
  }))

  const peakYear = data.byYear.reduce((max: { year: number; avgDays: number }, y: { year: number; avgDays: number }) =>
    y.avgDays > max.avgDays ? y : max, data.byYear[0])
  const fivePlusYears = data.distribution.find((d: { label: string }) => d.label === '5+ years')
  const under6mo = data.distribution.find((d: { label: string }) => d.label === 'Under 6 months')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wait Times' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Court Wait Times</h1>
      <p className="text-lg text-gray-600 mb-8">
        How long does an immigration court case take? We analyzed <strong>{(data.totalCasesWithDuration / 1e6).toFixed(1)} million
        completed proceedings</strong> to calculate actual wait times. The overall average is <strong>{data.avgDaysOverall} days
        ({data.avgYearsOverall} years)</strong> — but cases completed in {peakYear.year} averaged <strong>{(peakYear.avgDays / 365).toFixed(1)} years</strong>,
        and some courts average nearly 3 years.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{data.avgYearsOverall} yr</div>
          <div className="text-sm text-gray-600 mt-1">Overall Average</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(peakYear.avgDays / 365).toFixed(1)} yr</div>
          <div className="text-sm text-gray-600 mt-1">Peak ({peakYear.year})</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{fivePlusYears?.pct}%</div>
          <div className="text-sm text-gray-600 mt-1">Wait 5+ Years</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{under6mo?.pct}%</div>
          <div className="text-sm text-gray-600 mt-1">Under 6 Months</div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Cases peaked at {(peakYear.avgDays / 365).toFixed(1)} years average in {peakYear.year}</strong> — the backlog drives longer waits</div>
              <div>• <strong>{fivePlusYears?.count.toLocaleString()} cases ({fivePlusYears?.pct}%) took over 5 years</strong> — people waiting half a decade for resolution</div>
              <div>• <strong>The slowest court averages {(slowest[0]?.avgDays / 365).toFixed(1)} years</strong> ({slowest[0]?.name}) vs {(fastest[0]?.avgDays / 30).toFixed(0)} days at the fastest</div>
              <div>• <strong>Detained cases are much faster</strong> — expedited dockets and pressure to resolve quickly</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <WaitByYearChart data={data.byYear} />
        <DistributionChart data={data.distribution} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <CourtWaitChart data={slowest} title="Slowest Immigration Courts" />
        <CourtWaitChart data={fastest} title="Fastest Immigration Courts" />
      </div>

      {/* Duration distribution table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Case Duration Distribution</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">Duration</th>
              <th className="px-6 py-3 font-semibold text-right">Cases</th>
              <th className="px-6 py-3 font-semibold text-right">% of Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.distribution.map((d: { label: string; count: number; pct: string }) => (
              <tr key={d.label} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{d.label}</td>
                <td className="px-6 py-3 text-right">{d.count.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{d.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slowest courts table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
          <h2 className="font-heading text-xl font-bold text-red-900">Slowest Immigration Courts</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Court</th>
              <th className="px-6 py-3 font-semibold text-right">Avg Duration</th>
              <th className="px-6 py-3 font-semibold text-right">Cases</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slowest.map((c: { code: string; name: string; slug?: string; avgDays: number; cases: number }, i: number) => (
              <tr key={c.code} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-500">{i + 1}</td>
                <td className="px-6 py-3 font-medium">
                  {c.slug ? <Link href={`/courts/${c.slug}`} className="text-primary hover:underline">{c.name}</Link> : c.name}
                </td>
                <td className="px-6 py-3 text-right text-red-600">{(c.avgDays / 365).toFixed(1)} years</td>
                <td className="px-6 py-3 text-right">{c.cases.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Why Wait Times Matter</h2>
        <p>
          Longer wait times don&apos;t just mean inconvenience. For asylum seekers, years of waiting mean years
          of uncertainty — unable to fully plan a life, always facing the possibility of deportation. For the
          government, longer cases mean higher costs (detention, interpreter services, judge time) and a growing
          backlog that compounds itself.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Some Courts Are Faster</h2>
        <p>
          The fastest courts tend to be <strong>detained dockets</strong> — dedicated courts inside immigration
          detention facilities where cases are expedited because the government is paying to house the respondent.
          Non-detained courts, especially in major metros with heavy caseloads, have the longest wait times.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Backlog Effect</h2>
        <p>
          With <Link href="/backlog" className="text-primary hover:underline">{(stats.pendingCases / 1e6).toFixed(1)} million pending cases</Link> and
          only {stats.totalJudges.toLocaleString()} judges, each judge carries roughly {Math.round(stats.pendingCases / stats.totalJudges).toLocaleString()} pending
          cases. Even scheduling a first hearing can take over a year at some courts.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📈 Court Backlog</h3>
          <p className="text-sm text-gray-600 mt-1">{(stats.pendingCases / 1e6).toFixed(1)}M pending cases driving wait times up.</p>
        </Link>
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ All Courts</h3>
          <p className="text-sm text-gray-600 mt-1">Compare {stats.totalCourts} courts by outcomes, caseloads, and speed.</p>
        </Link>
        <Link href="/analysis/backlog-crisis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Backlog Crisis</h3>
          <p className="text-sm text-gray-600 mt-1">Deep dive into how the backlog grew and why it keeps growing.</p>
        </Link>
      </div>
    </div>
  )
}
