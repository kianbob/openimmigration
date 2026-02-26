'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#16a34a', '#dc2626', '#f59e0b', '#1e40af', '#7c3aed']

export function AsylumOutcomePie({ granted, denied }: { granted: number; denied: number }) {
  const data = [
    { name: 'Granted', value: granted },
    { name: 'Denied', value: denied },
  ]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(1)}%`}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function YearlyAsylumChart({ data }: { data: { year: number; grants: number; denials: number }[] }) {
  const filtered = data.filter(d => d.year >= 2000 && d.year <= 2025)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={filtered}>
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
        <Tooltip formatter={(value: any) => Number(value).toLocaleString()} />
        <Legend />
        <Bar dataKey="grants" fill="#16a34a" name="Grants" />
        <Bar dataKey="denials" fill="#dc2626" name="Denials" />
      </BarChart>
    </ResponsiveContainer>
  )
}
