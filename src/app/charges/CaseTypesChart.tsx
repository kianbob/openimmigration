// @ts-nocheck
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#0891b2', '#6b7280', '#d97706', '#059669']

export default function CaseTypesChart({ data }: { data: { name: string; count: number }[] }) {
  const top = data.filter(d => d.count > 1000).slice(0, 8)
  const total = top.reduce((s, d) => s + d.count, 0)
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={top} dataKey="count" nameKey="name" cx="50%" cy="45%" innerRadius={60} outerRadius={110} paddingAngle={2}>
            {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value) => `${Number(value).toLocaleString()} (${((Number(value) / total) * 100).toFixed(1)}%)`} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
