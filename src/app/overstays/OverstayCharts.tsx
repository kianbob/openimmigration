// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4']

export function OverstaysByYearChart({ data }: { data: { fy: number; totalOverstays: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Visa Overstays by Fiscal Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Bar dataKey="totalOverstays" name="Overstays" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function OverstayRateChart({ data }: { data: { fy: number; overstayRate: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Overstay Rate (%)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => v + '%'} domain={[0, 'auto']} />
          <Tooltip formatter={(v: number) => v.toFixed(2) + '%'} labelFormatter={l => `FY${l}`} />
          <Line type="monotone" dataKey="overstayRate" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopOverstayCountriesChart({ data }: { data: { country: string; overstays: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Top Overstay Countries (FY2023)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <YAxis type="category" dataKey="country" width={100} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="overstays" fill="#1e40af" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
