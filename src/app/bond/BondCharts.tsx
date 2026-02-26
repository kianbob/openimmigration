// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6']

const DECISION_LABELS: Record<string, string> = {
  C: 'Continued',
  A: 'Administrative Close',
  N: 'No Bond',
  S: 'Set Bond Amount',
  J: 'Jurisdictional',
  G: 'Bond Granted',
  W: 'Withdrawn',
  R: 'Redetermination',
  D: 'Bond Denied',
  E: 'Expired / Ended',
  I: 'Insufficient',
  O: 'Other',
}

export function BondYearlyChart({ data }: { data: { year: number; total: number; avgBond: number }[] }) {
  const filtered = data.filter(d => d.year >= 2000)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Bond Hearings by Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={filtered}>
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="total" fill="#1e40af" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BondAmountTrend({ data }: { data: { year: number; avgBond: number }[] }) {
  const filtered = data.filter(d => d.year >= 2000 && d.avgBond > 0)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Average Bond Amount Over Time</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={filtered}>
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => '$' + v.toLocaleString()} />
          <Line type="monotone" dataKey="avgBond" stroke="#1e40af" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BondDecisionsPie({ data }: { data: { name: string; count: number }[] }) {
  const top = data.filter(d => d.name && d.name !== '\0').slice(0, 8).map(d => ({
    name: DECISION_LABELS[d.name] || d.name,
    value: d.count,
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Bond Hearing Outcomes</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={top} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
