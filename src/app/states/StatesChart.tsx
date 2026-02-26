// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface StateData { name: string; code: string; cases: number }

export default function StatesChart({ data }: { data: StateData[] }) {
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.slice(0, 20)} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tickFormatter={(v: number) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="code" tick={{ fontSize: 11 }} width={30} />
          <Tooltip formatter={(value: number | string) => Number(value).toLocaleString()} />
          <Bar dataKey="cases" name="Total Cases" fill="#1e40af" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
