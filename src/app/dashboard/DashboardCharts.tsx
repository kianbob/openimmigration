'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#16a34a', '#7c3aed', '#ec4899', '#06b6d4', '#84cc16']

interface TrendRow {
  year: number
  filed: number
  completed: number
  grants: number
  denials: number
  removals: number
  cumulativePending: number
}

interface NatRow {
  code: string
  name: string
  cases: number
}

interface CourtRow {
  code: string
  name: string
  city: string
  state: string
  cases: number
  completed: number
  grants: number
  denials: number
  grantRate: number
}

export function YearlyTrendsChart({ data }: { data: TrendRow[] }) {
  const filtered = data.filter(d => d.year >= 2000 && d.year <= 2025)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={filtered}>
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
        <Legend />
        <Line type="monotone" dataKey="filed" stroke="#1e40af" name="Filed" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="completed" stroke="#16a34a" name="Completed" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function OutcomePieChart({ stats }: { stats: { asylumGranted: number; asylumDenied: number; removalOrders: number; voluntaryDeparture: number; adminClosure: number } }) {
  const data = [
    { name: 'Asylum Granted', value: stats.asylumGranted },
    { name: 'Asylum Denied', value: stats.asylumDenied },
    { name: 'Removal Orders', value: stats.removalOrders },
    { name: 'Voluntary Departure', value: stats.voluntaryDeparture },
    { name: 'Admin Closure', value: stats.adminClosure },
  ]
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={120} dataKey="value" label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(1)}%`} labelLine={false}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function TopNationalitiesChart({ data }: { data: NatRow[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ left: 100 }}>
        <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
        <Bar dataKey="cases" fill="#1e40af" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function TopCourtsChart({ data }: { data: CourtRow[] }) {
  const chartData = data.map(c => ({ name: `${c.city}, ${c.state}`, cases: c.cases }))
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
        <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
        <Bar dataKey="cases" fill="#7c3aed" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
