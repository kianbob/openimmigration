// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#10b981', '#f59e0b', '#dc2626', '#8b5cf6', '#ec4899']

export function RepByCourtChart({ data, courtMap }: { data: { code: string; representations: number }[]; courtMap: Record<string, string> }) {
  const top = data.slice(0, 12).map(d => ({
    name: courtMap[d.code] || d.code,
    count: d.representations,
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Representations by Court</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top} layout="vertical" margin={{ left: 10 }}>
            <XAxis type="number" tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
            <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
            <Bar dataKey="count" fill="#1e40af" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function RepLevelChart({ data }: { data: { level: string; count: number }[] }) {
  const valid = data.filter(d => d.level === 'COURT' || d.level === 'BOARD')
  const mapped = valid.map(d => ({
    name: d.level === 'COURT' ? 'Immigration Court' : 'Board of Immigration Appeals',
    value: d.count,
  }))
  const total = mapped.reduce((s, d) => s + d.value, 0)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Representation by Court Level</h3>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={mapped} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={50} outerRadius={100} paddingAngle={2}>
              <Cell fill="#1e40af" />
              <Cell fill="#f59e0b" />
            </Pie>
            <Tooltip formatter={(v) => `${Number(v).toLocaleString()} (${((Number(v) / total) * 100).toFixed(1)}%)`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
