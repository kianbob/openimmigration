// @ts-nocheck
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#9ca3af']
const LABELS: Record<string, string> = { N: 'Never Detained', D: 'Detained', R: 'Released', U: 'Unknown' }

export default function CustodyChart({ data }: { data: { code: string; name: string; count: number }[] }) {
  const clean = data.filter(d => d.count > 0).map(d => ({ name: LABELS[d.code] || d.name, count: d.count }))
  const total = clean.reduce((s, d) => s + d.count, 0)

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={clean} dataKey="count" nameKey="name" cx="50%" cy="45%" innerRadius={50} outerRadius={100} paddingAngle={2}>
            {clean.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value) => `${Number(value).toLocaleString()} (${((Number(value) / total) * 100).toFixed(1)}%)`} />
          <Legend formatter={(value) => {
            const item = clean.find(d => d.name === value)
            return item ? `${value}: ${((item.count / total) * 100).toFixed(1)}%` : value
          }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
