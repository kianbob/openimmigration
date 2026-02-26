// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'

export function RemovalsByYearChart({ data }: { data: { fy: number; removals: number; returns: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">ICE Removals & Returns by Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Legend />
          <Bar dataKey="removals" name="Removals" fill="#dc2626" radius={[4, 4, 0, 0]} />
          <Bar dataKey="returns" name="Returns" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RemovalsTrendChart({ data }: { data: { fy: number; removals: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Deportations (Removals) Over Time</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Line type="monotone" dataKey="removals" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
