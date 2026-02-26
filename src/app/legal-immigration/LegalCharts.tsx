// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts'

export function GreenCardsByYearChart({ data }: { data: { fy: number; greenCards: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Green Cards Issued by Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Bar dataKey="greenCards" name="Green Cards" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function LegalImmigrationTrends({ data }: { data: { fy: number; greenCards: number; refugees: number; naturalizations: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Legal Immigration Trends</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Legend />
          <Line type="monotone" dataKey="greenCards" name="Green Cards" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="naturalizations" name="Naturalizations" stroke="#1e40af" strokeWidth={2} />
          <Line type="monotone" dataKey="refugees" name="Refugees" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RefugeeChart({ data }: { data: { fy: number; refugees: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Refugee Admissions by Year</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Bar dataKey="refugees" name="Refugees" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
