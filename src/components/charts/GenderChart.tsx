// @ts-nocheck
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface GenderData { name: string; count: number }

const COLORS = ['#1e40af', '#db2777', '#9ca3af']

export default function GenderChart({ data }: { data: GenderData[] }) {
  const filtered = data.filter(d => d.name !== 'Unknown' && d.name !== 'N' && d.count > 0)
  const total = filtered.reduce((s, d) => s + d.count, 0)

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={filtered} dataKey="count" nameKey="name" cx="50%" cy="45%" innerRadius={50} outerRadius={100} paddingAngle={2}>
            {filtered.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value) => `${Number(value).toLocaleString()} (${((Number(value) / total) * 100).toFixed(1)}%)`} />
          <Legend formatter={(value) => {
            const item = filtered.find(d => d.name === value)
            return item ? `${value}: ${((item.count / total) * 100).toFixed(1)}%` : value
          }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
