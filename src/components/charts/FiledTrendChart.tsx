// @ts-nocheck
'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface FiledData { year: number; filed: number }

export default function FiledTrendChart({ data }: { data: FiledData[] }) {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number | string) => Number(value).toLocaleString()} labelFormatter={(label) => `Year ${label}`} />
          <Area type="monotone" dataKey="filed" name="Cases Filed" stroke="#1e40af" fill="#1e40af" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
