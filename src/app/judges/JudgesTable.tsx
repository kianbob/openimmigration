'use client'

import { useState } from 'react'

interface Judge {
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

type SortKey = 'name' | 'totalDecisions' | 'grantRate' | 'removalRate' | 'absentia'

export default function JudgesTable({ judges }: { judges: Judge[] }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('totalDecisions')
  const [sortAsc, setSortAsc] = useState(false)

  const filtered = judges.filter(j => j.name.toLowerCase().includes(search.toLowerCase()))
  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'name') return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    return sortAsc ? (a[sortKey] as number) - (b[sortKey] as number) : (b[sortKey] as number) - (a[sortKey] as number)
  })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(key === 'name') }
  }

  const hdr = (label: string, key: SortKey, right = false) => (
    <th className={`px-3 py-3 font-semibold cursor-pointer hover:text-primary whitespace-nowrap ${right ? 'text-right' : 'text-left'}`} onClick={() => toggleSort(key)}>
      {label} {sortKey === key ? (sortAsc ? '↑' : '↓') : ''}
    </th>
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Search judges by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left font-semibold w-8">#</th>
              {hdr('Judge', 'name')}
              {hdr('Decisions', 'totalDecisions', true)}
              <th className="px-3 py-3 text-right font-semibold">Grants</th>
              <th className="px-3 py-3 text-right font-semibold">Denials</th>
              {hdr('Grant Rate', 'grantRate', true)}
              {hdr('Removal Rate', 'removalRate', true)}
              {hdr('In Absentia', 'absentia', true)}
            </tr>
          </thead>
          <tbody>
            {sorted.map((j, i) => (
              <tr key={j.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2 font-medium whitespace-nowrap">{j.name}</td>
                <td className="px-3 py-2 text-right">{j.totalDecisions.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">{j.grants.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">{j.denials.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">
                  <span className={j.grantRate >= 30 ? 'text-success font-bold' : j.grantRate >= 15 ? 'text-warning' : 'text-danger'}>
                    {j.grantRate}%
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <span className={j.removalRate >= 50 ? 'text-danger' : j.removalRate >= 20 ? 'text-warning' : 'text-success'}>
                    {j.removalRate}%
                  </span>
                </td>
                <td className="px-3 py-2 text-right">{j.absentia.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-2">Showing {sorted.length} of {judges.length} judges (with 50+ decisions)</p>
    </div>
  )
}
