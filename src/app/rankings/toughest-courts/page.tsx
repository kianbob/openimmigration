import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadIndex() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'court-index.json'), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Toughest & Most Lenient Immigration Courts — Ranked by Denial Rate',
  description: 'Immigration courts ranked by denial rate. See the top 20 toughest and top 20 most lenient courts in the U.S. immigration system.',
  alternates: { canonical: 'https://www.openimmigration.us/rankings/toughest-courts' },
}

export default function ToughestCourtsPage() {
  const courts = loadIndex()
    .filter((c: any) => c.grantRate != null && c.completed > 1000)
    .map((c: any) => ({ ...c, denialRate: +(100 - c.grantRate).toFixed(1) }))

  const toughest = [...courts].sort((a: any, b: any) => b.denialRate - a.denialRate).slice(0, 20)
  const lenient = [...courts].sort((a: any, b: any) => a.denialRate - b.denialRate).slice(0, 20)

  const avgGrant = courts.reduce((s: number, c: any) => s + c.grantRate, 0) / courts.length

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
                <th className="px-4 py-2 text-right font-semibold">Denial Rate</th>
                <th className="px-4 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-4 py-2 text-right font-semibold">Total Cases</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c: any, i: number) => (
                <tr key={c.slug} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium">
                    <Link href={`/courts/${c.slug}`} className="text-primary hover:underline">
                      {titleCase(c.city || c.name)}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{c.state}</td>
                  <td className="px-4 py-2 text-right">
                    <span className={c.denialRate >= 90 ? 'text-red-600 font-bold' : c.denialRate >= 85 ? 'text-red-500' : 'text-gray-800'}>
                      {c.denialRate}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className={c.grantRate >= 20 ? 'text-green-600 font-bold' : c.grantRate >= 15 ? 'text-green-500' : 'text-gray-800'}>
                      {c.grantRate}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">{c.cases.toLocaleString()}</td>
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
        { label: 'Toughest Courts' },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Toughest & Most Lenient Immigration Courts</h1>
      <p className="text-gray-600 mb-4">Courts ranked by denial rate. National average grant rate: <strong className="text-primary">{avgGrant.toFixed(1)}%</strong>.</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <p className="text-sm text-amber-800">
          <strong>💡 Why this matters:</strong> Where your case is heard can dramatically affect your outcome.
          The toughest courts deny relief at rates far above average — a geographic lottery that determines
          the fate of millions.
        </p>
      </div>

      <div className="space-y-10">
        <CourtTable list={toughest} label="🔴 Top 20 Toughest Courts (Highest Denial Rate)" />
        <CourtTable list={lenient} label="🟢 Top 20 Most Lenient Courts (Lowest Denial Rate)" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <Link href="/rankings/toughest-judges" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">⚖️ Toughest Judges</h3>
          <p className="text-xs text-gray-600 mt-1">Judges ranked by denial rate.</p>
        </Link>
        <Link href="/rankings/fastest-courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">⏱️ Fastest Courts</h3>
          <p className="text-xs text-gray-600 mt-1">Courts ranked by processing time.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📍 Geographic Lottery</h3>
          <p className="text-xs text-gray-600 mt-1">How court location determines outcomes.</p>
        </Link>
      </div>
    </div>
  )
}
