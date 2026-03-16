'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

type Judge = {
  code: string
  name: string
  totalDecisions: number
  grants: number
  denials: number
  removals: number
  absentia: number
  grantRate: number
  removalRate: number
}

export default function JudgeLookupPage() {
  const [judges, setJudges] = useState<Judge[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<'totalDecisions' | 'grantRate' | 'removalRate' | 'name'>('totalDecisions')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetch('/data/judges.json')
      .then(r => r.json())
      .then((data: Judge[]) => {
        // Filter out clerical/admin codes
        setJudges(data.filter(j => j.totalDecisions > 100 && !j.name.toLowerCase().includes('clerical')))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    let result = q ? judges.filter(j => j.name.toLowerCase().includes(q) || j.code.toLowerCase().includes(q)) : judges

    result.sort((a, b) => {
      const av = sortBy === 'name' ? a.name : a[sortBy]
      const bv = sortBy === 'name' ? b.name : b[sortBy]
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number)
    })

    return result
  }, [judges, query, sortBy, sortDir])

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir(col === 'name' ? 'asc' : 'desc') }
  }

  const arrow = (col: typeof sortBy) => sortBy === col ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-primary text-sm hover:underline">← All Tools</Link>
      </div>

      <h1 className="font-heading text-4xl font-bold mb-3">Judge Lookup</h1>
      <p className="text-lg text-gray-600 mb-8">
        Search {judges.length.toLocaleString()} immigration judges by name. See their grant rate, denial rate, and total decisions from DOJ data.
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by judge name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading judge data...</div>
      ) : (
        <>
          <div className="text-sm text-gray-500 mb-3">
            Showing {filtered.length.toLocaleString()} judge{filtered.length !== 1 ? 's' : ''}
            {query && ` matching "${query}"`}
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-primary" onClick={() => toggleSort('name')}>
                    Judge{arrow('name')}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold cursor-pointer hover:text-primary" onClick={() => toggleSort('totalDecisions')}>
                    Decisions{arrow('totalDecisions')}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold cursor-pointer hover:text-primary" onClick={() => toggleSort('grantRate')}>
                    Grant Rate{arrow('grantRate')}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold cursor-pointer hover:text-primary" onClick={() => toggleSort('removalRate')}>
                    Removal Rate{arrow('removalRate')}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">Grants</th>
                  <th className="px-4 py-3 text-right font-semibold">Denials</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 100).map(j => {
                  const slug = j.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  return (
                    <tr key={j.code} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2.5">
                        <Link href={`/judges/${slug}`} className="text-primary hover:underline font-medium">
                          {j.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono">{j.totalDecisions.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          j.grantRate >= 40 ? 'bg-green-100 text-green-700' :
                          j.grantRate >= 15 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {j.grantRate}%
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono">{j.removalRate}%</td>
                      <td className="px-4 py-2.5 text-right font-mono">{j.grants.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right font-mono">{j.denials.toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filtered.length > 100 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Showing first 100 results. Narrow your search to see more.
            </p>
          )}

          <div className="mt-8 text-xs text-gray-400">
            Data from DOJ EOIR FOIA records, February 2026. Grant rates reflect asylum/relief grants as a percentage of total decisions.
            Judge outcomes are affected by case mix, court location, and represented population — rates alone don&apos;t indicate quality.
          </div>
        </>
      )}
    </div>
  )
}
