import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Fastest & Slowest Immigration Courts — Ranked by Processing Time',
  description: 'Immigration courts ranked by average case processing time. See which courts move fastest and which have the longest waits.',
  alternates: { canonical: 'https://www.openimmigration.us/rankings/fastest-courts' },
}

export default function FastestCourtsPage() {
  const waitTimes = loadData('wait-times.json')
  const courtIndex = loadData('court-index.json')

  // Build lookup
  const courtMap: Record<string, any> = {}
  for (const c of courtIndex) courtMap[c.code] = c

  // wait-times may have byCourt or similar structure
  const byCourt = waitTimes.byCourt || []

  // If byCourt exists, use it; otherwise derive from court detail files
  let courtWaits: any[] = []
  if (byCourt.length > 0) {
    courtWaits = byCourt
      .filter((c: any) => c.avgDays && c.cases > 100)
      .map((c: any) => {
        const court = courtMap[c.code] || {}
        return { ...c, slug: court.slug, city: court.city, state: court.state, name: court.name }
      })
  } else {
    // Fall back: read individual court files that have avgDays
    const courtsDir = path.join(process.cwd(), 'public', 'data', 'courts')
    const files = fs.readdirSync(courtsDir)
    for (const f of files) {
      try {
        const d = JSON.parse(fs.readFileSync(path.join(courtsDir, f), 'utf8'))
        if (d.avgDays && d.completed > 100) {
          courtWaits.push({
            code: d.code, slug: d.slug, city: d.name, state: d.state,
            avgDays: d.avgDays, cases: d.completed,
          })
        }
      } catch { /* skip */ }
    }
  }

  const fastest = [...courtWaits].sort((a, b) => a.avgDays - b.avgDays).slice(0, 20)
  const slowest = [...courtWaits].sort((a, b) => b.avgDays - a.avgDays).slice(0, 20)

  const overallAvg = waitTimes.avgDaysOverall || 397

  function CourtTable({ list, label }: { list: any[]; label: string }) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-heading text-xl font-bold">{label}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">#</th>
                <th className="px-4 py-2 text-left font-semibold">Court</th>
                <th className="px-4 py-2 text-left font-semibold">State</th>
                <th className="px-4 py-2 text-right font-semibold">Avg Days</th>
                <th className="px-4 py-2 text-right font-semibold">Avg Years</th>
                <th className="px-4 py-2 text-right font-semibold">Cases</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c: any, i: number) => (
                <tr key={c.slug || c.code} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium">
                    {c.slug ? (
                      <Link href={`/courts/${c.slug}`} className="text-primary hover:underline">
                        {titleCase(c.city || c.name || c.code)}
                      </Link>
                    ) : titleCase(c.city || c.name || c.code)}
                  </td>
                  <td className="px-4 py-2">{c.state || '—'}</td>
                  <td className="px-4 py-2 text-right font-medium">{Math.round(c.avgDays).toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{(c.avgDays / 365).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{(c.cases || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Rankings' },
        { label: 'Fastest Courts' },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Fastest & Slowest Immigration Courts</h1>
      <p className="text-gray-600 mb-4">Courts ranked by average case processing time. National average: <strong className="text-primary">{overallAvg} days ({(overallAvg / 365).toFixed(1)} years)</strong>.</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <p className="text-sm text-amber-800">
          <strong>💡 Speed ≠ Justice:</strong> Faster courts aren&apos;t necessarily better. Some process cases
          quickly because they deny most claims rapidly. Others take longer because they give cases more careful
          consideration. Context matters.
        </p>
      </div>

      {courtWaits.length > 0 ? (
        <div className="space-y-10">
          <CourtTable list={fastest} label="⚡ Top 20 Fastest Courts (Shortest Avg Processing Time)" />
          <CourtTable list={slowest} label="🐢 Top 20 Slowest Courts (Longest Avg Processing Time)" />
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-600">Court-level processing time data is being compiled. Check back soon.</p>
          <p className="text-sm text-gray-500 mt-2">Overall system average: {overallAvg} days across {(waitTimes.totalCasesWithDuration || 0).toLocaleString()} cases.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <Link href="/rankings/toughest-courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🏛️ Toughest Courts</h3>
          <p className="text-xs text-gray-600 mt-1">Courts ranked by denial rate.</p>
        </Link>
        <Link href="/rankings/most-backlogged" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📊 Most Backlogged</h3>
          <p className="text-xs text-gray-600 mt-1">Courts with the largest pending caseloads.</p>
        </Link>
        <Link href="/analysis/speed-of-justice" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">⏱️ Speed of Justice</h3>
          <p className="text-xs text-gray-600 mt-1">Analysis of case processing times.</p>
        </Link>
      </div>
    </div>
  )
}
