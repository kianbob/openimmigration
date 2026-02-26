'use client'

import { useState } from 'react'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'

interface Nationality {
  code: string
  name: string
  cases: number
  slug?: string
}

export default function NationalitiesTable({ nationalities }: { nationalities: Nationality[] }) {
  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(false)
  const [sortKey, setSortKey] = useState<'name' | 'cases'>('cases')

  const filtered = nationalities.filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'name') return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    return sortAsc ? a.cases - b.cases : b.cases - a.cases
  })

  const toggleSort = (key: 'name' | 'cases') => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(key === 'name') }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search nationalities..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-8">#</th>
              <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-primary" onClick={() => toggleSort('name')}>
                Nationality {sortKey === 'name' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th className="px-4 py-3 text-left font-semibold">Code</th>
              <th className="px-4 py-3 text-right font-semibold cursor-pointer hover:text-primary" onClick={() => toggleSort('cases')}>
                Total Cases {sortKey === 'cases' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((n, i) => (
              <tr key={n.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                <td className="px-4 py-2 font-medium">
                  {n.slug ? (
                    <Link href={`/nationalities/${n.slug}`} className="text-primary hover:underline">{titleCase(n.name)}</Link>
                  ) : titleCase(n.name)}
                </td>
                <td className="px-4 py-2 text-gray-500">{n.code}</td>
                <td className="px-4 py-2 text-right">{n.cases.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-2">Showing {sorted.length} of {nationalities.length} nationalities</p>
    </div>
  )
}
