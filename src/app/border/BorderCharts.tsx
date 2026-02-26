// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1']

export function EncountersByYearChart({ data }: { data: { fy: number; total: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Border Encounters by Fiscal Year</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Bar dataKey="total" fill="#1e40af" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopCitizenshipsPie({ data }: { data: { name: string; count: number }[] }) {
  const top = data.slice(0, 8).filter(d => d.name !== 'OTHER')
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Encounters by Citizenship (FY2020-2026)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={top} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={120}
            label={({ name, percent }) => `${name.slice(0,12)} ${(percent * 100).toFixed(0)}%`}>
            {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ComponentByYearChart({ data }: { data: { fy: number; USBP?: number; OFO?: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">USBP vs. OFO Encounters</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Legend />
          <Bar dataKey="USBP" name="Border Patrol" fill="#1e40af" stackId="a" />
          <Bar dataKey="OFO" name="Ports of Entry" fill="#60a5fa" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DemographicsChart({ data }: { data: { fy: number; 'Single Adults'?: number; FMUA?: number; UAC?: number; 'Accompanied Minors'?: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Encounters by Demographic</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Legend />
          <Area type="monotone" dataKey="Single Adults" fill="#1e40af" stroke="#1e40af" fillOpacity={0.6} stackId="1" />
          <Area type="monotone" dataKey="FMUA" name="Family Units" fill="#f59e0b" stroke="#f59e0b" fillOpacity={0.6} stackId="1" />
          <Area type="monotone" dataKey="UAC" name="Unaccompanied Children" fill="#dc2626" stroke="#dc2626" fillOpacity={0.6} stackId="1" />
          <Area type="monotone" dataKey="Accompanied Minors" fill="#10b981" stroke="#10b981" fillOpacity={0.6} stackId="1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SWBorderChart({ data }: { data: { fy: number; count: number }[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Southwest Border Encounters</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="fy" tickFormatter={v => `FY${v}`} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={l => `FY${l}`} />
          <Line type="monotone" dataKey="count" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
