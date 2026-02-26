// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#10b981', '#84cc16', '#f59e0b', '#f97316', '#dc2626', '#7c2d12']

export function WaitByYearChart({ data }: { data: { year: number; avgDays: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Average Case Duration by Completion Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 365).toFixed(1) + ' yr'} />
          <Tooltip formatter={(v: number) => [(v / 365).toFixed(1) + ' years (' + v + ' days)']} labelFormatter={l => `Completed in ${l}`} />
          <Line type="monotone" dataKey="avgDays" stroke="#1e40af" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DistributionChart({ data }: { data: { label: string; count: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Case Duration Distribution</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 10 }} />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CourtWaitChart({ data, title }: { data: { name: string; avgDays: number }[]; title: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" tickFormatter={v => (v / 365).toFixed(1) + ' yr'} />
          <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => (v / 365).toFixed(1) + ' years (' + v + ' days)'} />
          <Bar dataKey="avgDays" fill="#1e40af" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
