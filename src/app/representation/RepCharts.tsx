// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#10b981', '#f59e0b', '#dc2626', '#8b5cf6', '#ec4899']

function titleCase(s: string) {
  return s.replace(/\b\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

export function RepByCourtChart({ data, courtMap }: { data: { code: string; representations: number }[]; courtMap: Record<string, string> }) {
  const top = data.slice(0, 12).map(d => ({
    name: courtMap[d.code] || d.code,
    count: d.representations,
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Representations by Court</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={top} layout="vertical">
          <XAxis type="number" tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="count" fill="#1e40af" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RepLevelChart({ data }: { data: { level: string; count: number }[] }) {
  const valid = data.filter(d => d.level === 'COURT' || d.level === 'BOARD')
  const mapped = valid.map(d => ({
    name: d.level === 'COURT' ? 'Immigration Court' : 'Board of Immigration Appeals',
    value: d.count,
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Representation by Court Level</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={mapped} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            <Cell fill="#1e40af" />
            <Cell fill="#f59e0b" />
          </Pie>
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
