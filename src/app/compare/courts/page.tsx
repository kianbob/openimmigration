'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

interface CourtData {
  code: string; slug: string; name: string; city: string; state: string
  cases: number; completed: number; grants: number; denials: number; removals: number
  grantRate: number | null; topNationalities?: { name: string; count: number }[]
}

function titleCase(str: string) {
  if (!str) return str
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

export default function CompareСourtsPage() {
  const [courts, setCourts] = useState<CourtData[]>([])
  const [court1Slug, setCourt1Slug] = useState('')
  const [court2Slug, setCourt2Slug] = useState('')
  const [court1, setCourt1] = useState<any>(null)
  const [court2, setCourt2] = useState<any>(null)

  useEffect(() => {
    fetch('/data/court-index.json').then(r => r.json()).then(setCourts)
  }, [])

  useEffect(() => {
    if (court1Slug) fetch(`/data/courts/${court1Slug}.json`).then(r => r.ok ? r.json() : null).then(setCourt1)
    else setCourt1(null)
  }, [court1Slug])

  useEffect(() => {
    if (court2Slug) fetch(`/data/courts/${court2Slug}.json`).then(r => r.ok ? r.json() : null).then(setCourt2)
    else setCourt2(null)
  }, [court2Slug])

  const sorted = [...courts].sort((a, b) => b.cases - a.cases)

  function StatRow({ label, v1, v2, format = 'number', better = 'none' }: {
    label: string; v1: any; v2: any; format?: string; better?: string
  }) {
    const fmt = (v: any) => {
      if (v == null) return '—'
      if (format === 'pct') return `${v}%`
      if (format === 'number') return typeof v === 'number' ? v.toLocaleString() : v
      return v
    }
    return (
      <tr className="border-t border-gray-100">
        <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
        <td className="px-4 py-3 text-right font-medium">{fmt(v1)}</td>
        <td className="px-4 py-3 text-right font-medium">{fmt(v2)}</td>
      </tr>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'Compare Courts' },
      ]} />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Compare Immigration Courts</h1>
      <p className="text-gray-600 mb-8">Select two courts to compare side by side.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Court 1</label>
          <select value={court1Slug} onChange={e => setCourt1Slug(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Select a court...</option>
            {sorted.map(c => (
              <option key={c.slug} value={c.slug}>{titleCase(c.city || c.name)}, {c.state} ({c.cases.toLocaleString()} cases)</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Court 2</label>
          <select value={court2Slug} onChange={e => setCourt2Slug(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Select a court...</option>
            {sorted.map(c => (
              <option key={c.slug} value={c.slug}>{titleCase(c.city || c.name)}, {c.state} ({c.cases.toLocaleString()} cases)</option>
            ))}
          </select>
        </div>
      </div>

      {court1 && court2 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Metric</th>
                <th className="px-4 py-3 text-right font-semibold">{titleCase(court1.name)}, {court1.state}</th>
                <th className="px-4 py-3 text-right font-semibold">{titleCase(court2.name)}, {court2.state}</th>
              </tr>
            </thead>
            <tbody>
              <StatRow label="Total Cases" v1={court1.cases} v2={court2.cases} />
              <StatRow label="Completed" v1={court1.completed} v2={court2.completed} />
              <StatRow label="Grant Rate" v1={court1.grantRate} v2={court2.grantRate} format="pct" />
              <StatRow label="Grants" v1={court1.grants} v2={court2.grants} />
              <StatRow label="Denials" v1={court1.denials} v2={court2.denials} />
              <StatRow label="Removal Orders" v1={court1.removals} v2={court2.removals} />
            </tbody>
          </table>
        </div>
      )}

      {court1 && court2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[court1, court2].map((c, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-heading text-lg font-bold mb-3">
                <Link href={`/courts/${c.slug}`} className="text-primary hover:underline">
                  {titleCase(c.name)}, {c.state}
                </Link>
                {' '}— Top Nationalities
              </h3>
              {c.topNationalities?.slice(0, 10).map((n: any, i: number) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span>{n.name}</span>
                  <span className="text-gray-600">{n.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {(!court1 || !court2) && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center mb-8">
          <p className="text-gray-500">Select two courts above to see a side-by-side comparison.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/rankings/toughest-courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🔴 Toughest Courts</h3>
          <p className="text-xs text-gray-600 mt-1">Courts ranked by denial rate.</p>
        </Link>
        <Link href="/rankings/most-backlogged" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📊 Most Backlogged</h3>
          <p className="text-xs text-gray-600 mt-1">Largest pending caseloads.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📍 Geographic Lottery</h3>
          <p className="text-xs text-gray-600 mt-1">How location affects outcomes.</p>
        </Link>
      </div>
    </div>
  )
}
