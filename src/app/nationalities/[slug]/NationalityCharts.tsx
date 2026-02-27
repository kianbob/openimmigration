// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#059669', '#dc2626', '#d97706', '#6b7280']

export function YearlyChart({ data }: { data: { year: number; cases: number }[] }) {
  const recent = data.filter(d => d.year >= 2000)
  if (recent.length < 2) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="font-heading text-xl font-bold mb-4">Cases Filed by Year</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={recent} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="year" tick={{ fontSize: 11 }} interval={Math.max(0, Math.floor(recent.length / 10))} />
            <YAxis tickFormatter={(v) => Number(v) >= 1000 ? `${(Number(v) / 1000).toFixed(0)}K` : String(v)} tick={{ fontSize: 11 }} width={50} />
            <Tooltip formatter={(v) => Number(v).toLocaleString()} labelFormatter={(l) => `Year ${l}`} />
            <Bar dataKey="cases" fill="#1e40af" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function OutcomePie({ grants, denials, removals, other }: { grants: number; denials: number; removals: number; other: number }) {
  const data = [
    { name: 'Granted', value: grants },
    { name: 'Denied', value: denials },
    { name: 'Removed', value: removals },
    { name: 'Other', value: other },
  ].filter(d => d.value > 0)
  if (data.length === 0) return null
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="font-heading text-xl font-bold mb-4">Case Outcomes</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" paddingAngle={2}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => `${Number(v).toLocaleString()} (${((Number(v) / total) * 100).toFixed(1)}%)`} />
            <Legend formatter={(value) => {
              const item = data.find(d => d.name === value)
              return item ? `${value}: ${((item.value / total) * 100).toFixed(1)}%` : value
            }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
