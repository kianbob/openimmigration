'use client'

import { useState } from 'react'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'

interface Court { code: string; city: string; state: string; cases: number }
interface Nationality { code: string; name: string; cases: number }
interface Judge { code: string; name: string; totalDecisions: number; grantRate: number }

export default function SearchInterface({ courts, nationalities, judges }: { courts: Court[]; nationalities: Nationality[]; judges: Judge[] }) {
  const [query, setQuery] = useState('')

  const q = query.toLowerCase().trim()
  const matchedCourts = q ? courts.filter(c => c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)).slice(0, 10) : []
  const matchedNats = q ? nationalities.filter(n => n.name.toLowerCase().includes(q)).slice(0, 10) : []
  const matchedJudges = q ? judges.filter(j => j.name.toLowerCase().includes(q)).slice(0, 10) : []

  return (
    <div>
      <input
        type="text"
        placeholder="Search courts, nationalities, judges..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
      />

      {q && matchedCourts.length === 0 && matchedNats.length === 0 && matchedJudges.length === 0 && (
        <p className="text-gray-500">No results found for &ldquo;{query}&rdquo;</p>
      )}

      {matchedCourts.length > 0 && (
        <div className="mb-8">
          <h3 className="font-heading text-lg font-bold mb-3">🏛️ Courts</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {matchedCourts.map(c => (
              <div key={c.code} className="px-4 py-3 border-b border-gray-100 flex justify-between">
                <span className="font-medium">{titleCase(c.city)}, {c.state}</span>
                <span className="text-gray-500">{c.cases.toLocaleString()} cases</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {matchedNats.length > 0 && (
        <div className="mb-8">
          <h3 className="font-heading text-lg font-bold mb-3">🌍 Nationalities</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {matchedNats.map(n => (
              <div key={n.code} className="px-4 py-3 border-b border-gray-100 flex justify-between">
                <span className="font-medium">{titleCase(n.name)}</span>
                <span className="text-gray-500">{n.cases.toLocaleString()} cases</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {matchedJudges.length > 0 && (
        <div className="mb-8">
          <h3 className="font-heading text-lg font-bold mb-3">⚖️ Judges</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {matchedJudges.map(j => (
              <div key={j.code} className="px-4 py-3 border-b border-gray-100 flex justify-between">
                <span className="font-medium">{j.name}</span>
                <span className="text-gray-500">{j.totalDecisions.toLocaleString()} decisions · {j.grantRate}% grant rate</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!q && (
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-4">🔍</div>
          <p>Type to search across courts, nationalities, and judges</p>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-bold mb-2">Quick links:</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/courts" className="text-primary hover:underline">All Courts</Link>
          <span>·</span>
          <Link href="/nationalities" className="text-primary hover:underline">All Nationalities</Link>
          <span>·</span>
          <Link href="/judges" className="text-primary hover:underline">All Judges</Link>
          <span>·</span>
          <Link href="/states" className="text-primary hover:underline">By State</Link>
        </div>
      </div>
    </div>
  )
}
