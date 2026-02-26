'use client'

import { useState } from 'react'

interface Court {
  code: string
  name: string
  state: string
  city: string
  active: boolean
  cases: number
  completed: number
  grants: number
  denials: number
  removals: number
  grantRate: number
}

type SortKey = 'city' | 'state' | 'cases' | 'completed' | 'grantRate' | 'removals'

export default function CourtsTable({ courts }: { courts: Court[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('cases')
  const [sortAsc, setSortAsc] = useState(false)

  const sorted = [...courts].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === 'string') return sortAsc ? (av as string).localeCompare(bv as string) : (bv as string).localeCompare(av as string)
    return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number)
  })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(false) }
  }

  const hdr = (label: string, key: SortKey, right = false) => (
    <th className={`px-4 py-3 font-semibold cursor-pointer hover:text-primary ${right ? 'text-right' : 'text-left'}`} onClick={() => toggleSort(key)}>
      {label} {sortKey === key ? (sortAsc ? '↑' : '↓') : ''}
    </th>
  )

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold w-8">#</th>
            {hdr('Court', 'city')}
            {hdr('State', 'state')}
            {hdr('Total Cases', 'cases', true)}
            {hdr('Completed', 'completed', true)}
            {hdr('Grant Rate', 'grantRate', true)}
            {hdr('Removals', 'removals', true)}
          </tr>
        </thead>
        <tbody>
          {sorted.map((court, i) => (
            <tr key={court.code} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-400">{i + 1}</td>
              <td className="px-4 py-2 font-medium">{court.city}</td>
              <td className="px-4 py-2 text-gray-600">{court.state}</td>
              <td className="px-4 py-2 text-right">{court.cases.toLocaleString()}</td>
              <td className="px-4 py-2 text-right">{court.completed.toLocaleString()}</td>
              <td className="px-4 py-2 text-right">
                <span className={court.grantRate >= 15 ? 'text-success' : court.grantRate >= 8 ? 'text-warning' : 'text-danger'}>
                  {court.grantRate}%
                </span>
              </td>
              <td className="px-4 py-2 text-right">{court.removals.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
