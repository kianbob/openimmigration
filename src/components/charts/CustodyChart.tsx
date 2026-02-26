// @ts-nocheck
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#9ca3af']
const LABELS: Record<string, string> = { N: 'Never Detained', D: 'Detained', R: 'Released', U: 'Unknown' }

export default function CustodyChart({ data }: { data: { code: string; name: string; count: number }[] }) {
  const clean = data.filter(d => d.count > 0).map(d => ({ name: LABELS[d.code] || d.name, count: d.count }))

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={clean} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100}
            label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(1)}%`}>
            {clean.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value: number | string) => Number(value).toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
