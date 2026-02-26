// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'

interface TrendData { year: number; filed: number; completed: number; grants: number }

export default function YearlyTrendsChart({ data }: { data: TrendData[] }) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v: number) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number | string) => Number(value).toLocaleString()} />
          <Legend />
          <Bar dataKey="filed" name="Cases Filed" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          <Bar dataKey="completed" name="Completed" fill="#1e40af" radius={[2, 2, 0, 0]} />
          <Bar dataKey="grants" name="Grants" fill="#16a34a" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
