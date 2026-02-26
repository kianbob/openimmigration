// @ts-nocheck
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#6b7280', '#9ca3af', '#d1d5db']

export default function CaseTypesChart({ data }: { data: { name: string; count: number }[] }) {
  const top = data.filter(d => d.count > 1000)
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={top} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={120}
            label={({ name, percent }) => percent > 0.02 ? `${name} ${(percent * 100).toFixed(1)}%` : ''}>
            {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value) => Number(value).toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
