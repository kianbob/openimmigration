'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface YearData {
  year: number
  cases: number
}

export default function CourtCharts({ data }: { data: YearData[] }) {
  const recent = data.filter(d => d.year >= 2000)
  if (recent.length < 2) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="font-heading text-xl font-bold mb-4">Yearly Case Trend</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={recent}>
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => Number(v) >= 1000 ? `${(Number(v) / 1000).toFixed(0)}K` : String(v)} />
            <Tooltip formatter={(value) => [Number(value).toLocaleString(), 'Cases']} />
            <Bar dataKey="cases" fill="#1e40af" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
