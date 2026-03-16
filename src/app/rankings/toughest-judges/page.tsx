import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadIndex() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'judge-index.json'), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Toughest & Most Lenient Immigration Judges — Ranked by Denial Rate',
  description: 'Immigration judges ranked by denial rate. Top 50 toughest and top 50 most lenient judges in the U.S. immigration court system.',
  alternates: { canonical: 'https://www.openimmigration.us/rankings/toughest-judges' },
}

export default function ToughestJudgesPage() {
  const judges = loadIndex()
    .filter((j: any) => j.grantRate != null && j.totalDecisions >= 500)
    .map((j: any) => ({ ...j, denialRate: +(100 - j.grantRate).toFixed(1) }))

  const toughest = [...judges].sort((a: any, b: any) => b.denialRate - a.denialRate).slice(0, 50)
  const lenient = [...judges].sort((a: any, b: any) => a.denialRate - b.denialRate).slice(0, 50)

  const avgGrant = judges.reduce((s: number, j: any) => s + j.grantRate, 0) / judges.length

  function JudgeTable({ list, label }: { list: any[]; label: string }) {
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
                <th className="px-4 py-2 text-left font-semibold">Judge</th>
                <th className="px-4 py-2 text-right font-semibold">Denial Rate</th>
                <th className="px-4 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-4 py-2 text-right font-semibold">Decisions</th>
                <th className="px-4 py-2 text-right font-semibold">Removals</th>
              </tr>
            </thead>
            <tbody>
              {list.map((j: any, i: number) => (
                <tr key={j.slug} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium">
                    <Link href={`/judges/${j.slug}`} className="text-primary hover:underline">
                      {titleCase(j.name)}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className={j.denialRate >= 98 ? 'text-red-600 font-bold' : j.denialRate >= 95 ? 'text-red-500' : 'text-gray-800'}>
                      {j.denialRate}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className={j.grantRate >= 30 ? 'text-green-600 font-bold' : j.grantRate >= 15 ? 'text-green-500' : 'text-gray-800'}>
                      {j.grantRate}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">{j.totalDecisions.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{j.removals.toLocaleString()}</td>
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
        { label: 'Toughest Judges' },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Toughest & Most Lenient Immigration Judges</h1>
      <p className="text-gray-600 mb-4">Judges ranked by denial rate (min. 500 decisions). National average grant rate: <strong className="text-primary">{avgGrant.toFixed(1)}%</strong>.</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <p className="text-sm text-amber-800">
          <strong>💡 &quot;Judge Roulette&quot;:</strong> Asylum outcomes vary dramatically by judge.
          Some grant over 50% of cases while others deny over 99%. Same law, wildly different results.
          The judge assigned to your case can be the single biggest factor in whether you receive protection.
        </p>
      </div>

      <div className="space-y-10">
        <JudgeTable list={toughest} label="🔴 Top 50 Toughest Judges (Highest Denial Rate)" />
        <JudgeTable list={lenient} label="🟢 Top 50 Most Lenient Judges (Lowest Denial Rate)" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <Link href="/rankings/toughest-courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🏛️ Toughest Courts</h3>
          <p className="text-xs text-gray-600 mt-1">Courts ranked by denial rate.</p>
        </Link>
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">⚖️ Judge Variation Analysis</h3>
          <p className="text-xs text-gray-600 mt-1">Deep dive into judge outcome disparities.</p>
        </Link>
        <Link href="/compare" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📊 Compare Tool</h3>
          <p className="text-xs text-gray-600 mt-1">Compare judges side by side.</p>
        </Link>
      </div>
    </div>
  )
}
