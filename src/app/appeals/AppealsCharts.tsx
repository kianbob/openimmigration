// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899']

const DECISION_LABELS: Record<string, string> = {
  DIS: 'Dismissed',
  REM: 'Remanded',
  DEN: 'Denied',
  SAF: 'Sustained (Affirmed)',
  D30: 'Dismissed (30-Day)',
  WDL: 'Withdrawn',
  DVD: 'Divided',
  SAV: 'Sustained (Vacated)',
  NJU: 'No Jurisdiction',
  TER: 'Terminated',
  GRN: 'Granted',
  OTH: 'Other',
}

const FILER_LABELS: Record<string, string> = {
  A: 'Respondent (Alien)',
  I: 'ICE / DHS',
  O: 'Other',
  B: 'Board',
  P: 'Pro Se',
}

const CUSTODY_LABELS: Record<string, string> = {
  D: 'Detained',
  N: 'Never Detained',
  R: 'Released',
}

export function AppealsYearlyChart({ data }: { data: { year: number; total: number }[] }) {
  const filtered = data.filter(d => d.year >= 2000)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Appeals Filed by Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={filtered}>
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="total" fill="#1e40af" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AppealsDecisionsPie({ data }: { data: { name: string; count: number }[] }) {
  const top = data.slice(0, 8).map(d => ({
    name: DECISION_LABELS[d.name] || d.name,
    value: d.count,
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Appeal Outcomes</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={top} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AppealsFilerChart({ data }: { data: { by: string; count: number }[] }) {
  const mapped = data.slice(0, 5).map(d => ({
    name: FILER_LABELS[d.by] || d.by,
    count: d.count,
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Who Files Appeals</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mapped} layout="vertical">
          <XAxis type="number" tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AppealsCustodyChart({ data }: { data: { status: string; total: number }[] }) {
  const mapped = data.map(d => ({
    name: CUSTODY_LABELS[d.status] || d.status,
    value: d.total,
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Appeals by Custody Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={mapped} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            <Cell fill="#dc2626" />
            <Cell fill="#6b7280" />
            <Cell fill="#10b981" />
          </Pie>
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
