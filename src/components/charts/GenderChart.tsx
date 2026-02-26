// @ts-nocheck
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface GenderData { name: string; count: number }

const COLORS = ['#1e40af', '#db2777', '#9ca3af']

export default function GenderChart({ data }: { data: GenderData[] }) {
  const filtered = data.filter(d => d.name !== 'Unknown' && d.name !== 'N' && d.count > 0)

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={filtered} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100}
            label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(1)}%`}>
            {filtered.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value: number | string) => Number(value).toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
