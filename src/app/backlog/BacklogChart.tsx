'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface TrendRow {
  year: number
  filed: number
  completed: number
  cumulativePending: number
}

export function BacklogGrowthChart({ data }: { data: TrendRow[] }) {
  const filtered = data.filter(d => d.year >= 2000 && d.year <= 2025)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={filtered}>
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
        <Bar dataKey="filed" fill="#1e40af" name="Filed" />
        <Bar dataKey="completed" fill="#16a34a" name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  )
}
