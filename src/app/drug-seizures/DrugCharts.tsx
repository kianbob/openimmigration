// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const COLORS = ['#dc2626', '#f59e0b', '#1e40af', '#6b7280', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4']

const DRUG_COLORS: Record<string, string> = {
  Fentanyl: '#dc2626',
  Methamphetamine: '#f59e0b',
  Cocaine: '#1e40af',
  Heroin: '#6b7280',
  Marijuana: '#10b981',
}

export function FentanylTrendChart({ data }: { data: { fy: number; lbs: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Fentanyl Seized by Year (lbs)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString() + ' lbs'} labelFormatter={l => `FY${l}`} />
          <Bar dataKey="lbs" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AllDrugsYearlyChart({ data }: { data: Record<string, number>[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Drug Seizures by Type (lbs)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString() + ' lbs'} labelFormatter={l => `FY${l}`} />
          <Legend />
          <Area type="monotone" dataKey="Marijuana" fill="#10b981" stroke="#10b981" fillOpacity={0.5} stackId="1" />
          <Area type="monotone" dataKey="Methamphetamine" fill="#f59e0b" stroke="#f59e0b" fillOpacity={0.5} stackId="1" />
          <Area type="monotone" dataKey="Cocaine" fill="#1e40af" stroke="#1e40af" fillOpacity={0.5} stackId="1" />
          <Area type="monotone" dataKey="Fentanyl" fill="#dc2626" stroke="#dc2626" fillOpacity={0.5} stackId="1" />
          <Area type="monotone" dataKey="Heroin" fill="#6b7280" stroke="#6b7280" fillOpacity={0.5} stackId="1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DrugTotalsPie({ data }: { data: { drug: string; lbs: number }[] }) {
  const top = data.filter(d => d.drug !== 'Other Drugs**' && d.drug !== 'Khat (Catha Edulis)').slice(0, 6)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Total Seizures by Drug Type</h3>
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie data={top} dataKey="lbs" nameKey="drug" cx="50%" cy="42%" innerRadius={50} outerRadius={100} paddingAngle={2}>
            {top.map((d, i) => <Cell key={i} fill={DRUG_COLORS[d.drug] || COLORS[i]} />)}
          </Pie>
          <Tooltip formatter={(v) => Number(v).toLocaleString() + ' lbs'} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FentanylLocationsChart({ data }: { data: { aor: string; lbs: number }[] }) {
  const top = data.slice(0, 10)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Top Fentanyl Seizure Locations</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={top} layout="vertical">
          <XAxis type="number" tickFormatter={v => (v / 1000).toFixed(0) + 'K lbs'} />
          <YAxis type="category" dataKey="aor" width={160} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => v.toLocaleString() + ' lbs'} />
          <Bar dataKey="lbs" fill="#dc2626" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
