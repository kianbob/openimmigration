'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#059669', '#dc2626', '#d97706', '#6b7280']

export function YearlyChart({ data }: { data: { year: number; cases: number }[] }) {
  const recent = data.filter(d => d.year >= 2000)
  if (recent.length < 2) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="font-heading text-xl font-bold mb-4">Cases Filed by Year</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={recent}>
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v) => Number(v) >= 1000 ? `${(Number(v) / 1000).toFixed(0)}K` : String(v)} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
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
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="font-heading text-xl font-bold mb-4">Case Outcomes</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={(props: any) => `${props.name} ${((props.percent ?? 0) * 100).toFixed(0)}%`}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
