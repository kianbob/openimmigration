// @ts-nocheck
'use client'

import { useState, useMemo } from 'react'
import { titleCase } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Court {
  code: string; slug: string; city: string; state: string;
  cases: number; completed: number; grants: number; denials: number; removals: number; grantRate: number;
}
interface Judge {
  code: string; slug: string; name: string;
  totalDecisions: number; grants: number; denials: number; removals: number; absentia: number; grantRate: number; removalRate: number;
}

type Mode = 'courts' | 'judges'

export default function CompareClient({ courts, judges }: { courts: Court[]; judges: Judge[] }) {
  const [mode, setMode] = useState<Mode>('courts')
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const items = mode === 'courts' ? courts : judges
  const q = query.toLowerCase().trim()
  const filtered = q
    ? items.filter((item: any) => {
        if (mode === 'courts') return (item.city + ' ' + item.state).toLowerCase().includes(q)
        return item.name.toLowerCase().includes(q)
      }).slice(0, 8)
    : []

  const selectedItems = useMemo(() =>
    selected.map(code => items.find((i: any) => i.code === code)).filter(Boolean),
    [selected, items, mode]
  )

  function toggleItem(code: string) {
    if (selected.includes(code)) {
      setSelected(selected.filter(c => c !== code))
    } else if (selected.length < 5) {
      setSelected([...selected, code])
    }
  }

  function getName(item: any): string {
    if (mode === 'courts') return `${titleCase(item.city)}, ${item.state}`
    return titleCase(item.name)
  }

  const chartData = selectedItems.map((item: any) => ({
    name: getName(item).length > 20 ? getName(item).slice(0, 18) + '…' : getName(item),
    'Grant Rate': item.grantRate,
    ...(mode === 'courts'
      ? { 'Cases': item.cases }
      : { 'Removal Rate': item.removalRate }
    ),
  }))

  const COLORS = ['#1e40af', '#059669', '#d97706', '#dc2626', '#7c3aed']

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode('courts'); setSelected([]); setQuery('') }}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${mode === 'courts' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          🏛️ Compare Courts
        </button>
        <button
          onClick={() => { setMode('judges'); setSelected([]); setQuery('') }}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${mode === 'judges' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          ⚖️ Compare Judges
        </button>
      </div>

      {/* Search & Select */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder={mode === 'courts' ? 'Search courts by city or state...' : 'Search judges by name...'}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto">
            {filtered.map((item: any) => {
              const isSelected = selected.includes(item.code)
              return (
                <button
                  key={item.code}
                  onClick={() => { toggleItem(item.code); setQuery('') }}
                  disabled={!isSelected && selected.length >= 5}
                  className={`w-full px-4 py-3 text-left flex justify-between items-center border-b border-gray-100 last:border-0 transition-colors ${
                    isSelected ? 'bg-primary/5 text-primary' : 'hover:bg-gray-50'
                  } ${!isSelected && selected.length >= 5 ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <span className="font-medium">{getName(item)}</span>
                  <span className="text-sm text-gray-500">
                    {mode === 'courts' ? `${item.cases.toLocaleString()} cases` : `${item.totalDecisions.toLocaleString()} decisions`}
                    {isSelected && ' ✓'}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Selected pills */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedItems.map((item: any, i: number) => (
            <span key={item.code} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-white" style={{ backgroundColor: COLORS[i] }}>
              {getName(item)}
              <button onClick={() => toggleItem(item.code)} className="ml-1 hover:opacity-70">×</button>
            </span>
          ))}
          <span className="text-sm text-gray-400 self-center">{5 - selected.length} more available</span>
        </div>
      )}

      {/* Empty state */}
      {selected.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">📊</div>
          <p className="text-lg font-medium">Select up to 5 {mode} to compare</p>
          <p className="text-sm mt-1">Search above to find {mode === 'courts' ? 'courts by city' : 'judges by name'}</p>
        </div>
      )}

      {/* Comparison Table */}
      {selectedItems.length >= 2 && (
        <>
          <h2 className="font-heading text-2xl font-bold mb-4">Side-by-Side Comparison</h2>

          {/* Grant Rate Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8">
            <h3 className="font-bold text-gray-700 mb-3">Grant Rate Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'auto']} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Bar dataKey="Grant Rate" fill="#1e40af" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Metric</th>
                  {selectedItems.map((item: any, i: number) => (
                    <th key={item.code} className="px-4 py-3 text-right font-semibold" style={{ color: COLORS[i] }}>
                      {getName(item)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mode === 'courts' ? (
                  <>
                    <tr className="border-t"><td className="px-4 py-2 font-medium">Total Cases</td>{selectedItems.map((c: any) => <td key={c.code} className="px-4 py-2 text-right">{c.cases.toLocaleString()}</td>)}</tr>
                    <tr className="border-t bg-gray-50"><td className="px-4 py-2 font-medium">Completed</td>{selectedItems.map((c: any) => <td key={c.code} className="px-4 py-2 text-right">{(c.completed || 0).toLocaleString()}</td>)}</tr>
                    <tr className="border-t"><td className="px-4 py-2 font-medium">Grant Rate</td>{selectedItems.map((c: any) => <td key={c.code} className="px-4 py-2 text-right font-bold text-green-600">{c.grantRate}%</td>)}</tr>
                    <tr className="border-t bg-gray-50"><td className="px-4 py-2 font-medium">Grants</td>{selectedItems.map((c: any) => <td key={c.code} className="px-4 py-2 text-right text-green-600">{(c.grants || 0).toLocaleString()}</td>)}</tr>
                    <tr className="border-t"><td className="px-4 py-2 font-medium">Denials</td>{selectedItems.map((c: any) => <td key={c.code} className="px-4 py-2 text-right">{(c.denials || 0).toLocaleString()}</td>)}</tr>
                    <tr className="border-t bg-gray-50"><td className="px-4 py-2 font-medium">Removal Orders</td>{selectedItems.map((c: any) => <td key={c.code} className="px-4 py-2 text-right text-red-600">{(c.removals || 0).toLocaleString()}</td>)}</tr>
                  </>
                ) : (
                  <>
                    <tr className="border-t"><td className="px-4 py-2 font-medium">Total Decisions</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right">{j.totalDecisions.toLocaleString()}</td>)}</tr>
                    <tr className="border-t bg-gray-50"><td className="px-4 py-2 font-medium">Grant Rate</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right font-bold text-green-600">{j.grantRate}%</td>)}</tr>
                    <tr className="border-t"><td className="px-4 py-2 font-medium">Removal Rate</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right text-red-600">{j.removalRate}%</td>)}</tr>
                    <tr className="border-t bg-gray-50"><td className="px-4 py-2 font-medium">Grants</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right text-green-600">{j.grants.toLocaleString()}</td>)}</tr>
                    <tr className="border-t"><td className="px-4 py-2 font-medium">Denials</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right">{j.denials.toLocaleString()}</td>)}</tr>
                    <tr className="border-t bg-gray-50"><td className="px-4 py-2 font-medium">Removal Orders</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right text-red-600">{j.removals.toLocaleString()}</td>)}</tr>
                    <tr className="border-t"><td className="px-4 py-2 font-medium">In Absentia</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right">{j.absentia.toLocaleString()}</td>)}</tr>
                    <tr className="border-t bg-gray-50"><td className="px-4 py-2 font-medium">In Absentia Rate</td>{selectedItems.map((j: any) => <td key={j.code} className="px-4 py-2 text-right">{j.totalDecisions > 0 ? ((j.absentia / j.totalDecisions) * 100).toFixed(1) : 0}%</td>)}</tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Insight */}
          {mode === 'courts' && selectedItems.length >= 2 && (() => {
            const sorted = [...selectedItems].sort((a: any, b: any) => b.grantRate - a.grantRate)
            const highest = sorted[0]
            const lowest = sorted[sorted.length - 1]
            const diff = highest.grantRate - lowest.grantRate
            if (diff < 2) return null
            return (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                <div className="flex gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Comparison Insight</h3>
                    <p className="text-sm text-amber-800">
                      {getName(highest)} has a grant rate of <strong>{highest.grantRate}%</strong> compared to {getName(lowest)}&apos;s <strong>{lowest.grantRate}%</strong> — a <strong>{diff.toFixed(1)} percentage point gap</strong>.
                      {diff > 10 && ` This is a significant difference that illustrates how court assignment can dramatically affect outcomes.`}
                    </p>
                  </div>
                </div>
              </div>
            )
          })()}
          {mode === 'judges' && selectedItems.length >= 2 && (() => {
            const sorted = [...selectedItems].sort((a: any, b: any) => b.grantRate - a.grantRate)
            const highest = sorted[0]
            const lowest = sorted[sorted.length - 1]
            const diff = highest.grantRate - lowest.grantRate
            if (diff < 2) return null
            return (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                <div className="flex gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Comparison Insight</h3>
                    <p className="text-sm text-amber-800">
                      Judge {getName(highest)} grants relief at <strong>{highest.grantRate}%</strong> while Judge {getName(lowest)} grants at just <strong>{lowest.grantRate}%</strong> — a <strong>{diff.toFixed(1)} percentage point gap</strong>.
                      {diff > 20 && ` Under the same immigration law, these two judges reach dramatically different outcomes.`}
                    </p>
                  </div>
                </div>
              </div>
            )
          })()}
        </>
      )}
    </div>
  )
}
