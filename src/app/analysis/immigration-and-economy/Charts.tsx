// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

const workforceShare = [
  { year: 2000, pct: 14.8 },
  { year: 2005, pct: 15.3 },
  { year: 2010, pct: 16.0 },
  { year: 2015, pct: 16.7 },
  { year: 2020, pct: 17.0 },
  { year: 2024, pct: 18.6 },
]

const gdpContribution = [
  { sector: 'Agriculture', immigrantPct: 73 },
  { sector: 'Construction', immigrantPct: 30 },
  { sector: 'Hospitality', immigrantPct: 31 },
  { sector: 'Tech/STEM', immigrantPct: 24 },
  { sector: 'Healthcare', immigrantPct: 18 },
  { sector: 'Manufacturing', immigrantPct: 21 },
]

const entrepreneurship = [
  { metric: 'Fortune 500\nFounded by\nImmigrants', pct: 44 },
  { metric: 'Billion-Dollar\nStartups\n(Immigrant-Led)', pct: 55 },
  { metric: 'New Business\nFormation Rate\nvs Native-Born', pct: 80 },
  { metric: 'Patent Filing\nRate vs\nNative-Born', pct: 76 },
]

const taxRevenue = [
  { group: 'All Immigrants', federal: 405, stateLocal: 154 },
  { group: 'Undocumented', federal: 59.4, stateLocal: 37.3 },
]

const ssTrust = [
  { year: 2005, undocContrib: 12 },
  { year: 2008, undocContrib: 13 },
  { year: 2010, undocContrib: 12 },
  { year: 2013, undocContrib: 13 },
  { year: 2016, undocContrib: 13.5 },
  { year: 2019, undocContrib: 14 },
  { year: 2022, undocContrib: 25.7 },
  { year: 2024, undocContrib: 22.6 },
]

export function WorkforceShareChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Foreign-Born Share of U.S. Workforce</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={workforceShare}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => `${v}%`} domain={[12, 20]} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Area type="monotone" dataKey="pct" stroke="#1e40af" fill="#1e40af" fillOpacity={0.2} strokeWidth={2} name="Immigrant Share" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SectorDependenceChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Immigrant Share of Workforce by Sector</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={gdpContribution} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `${v}%`} domain={[0, 80]} />
          <YAxis type="category" dataKey="sector" width={110} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Bar dataKey="immigrantPct" fill="#10b981" radius={[0, 4, 4, 0]} name="Immigrant %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SSContributionChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Undocumented Immigrant Social Security Contributions ($B/year)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={ssTrust}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => `$${v}B`} />
          <Tooltip formatter={(v: number) => `$${v}B`} />
          <Line type="monotone" dataKey="undocContrib" stroke="#dc2626" strokeWidth={2} dot={{ r: 5 }} name="Annual Contributions" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EntrepreneurshipChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Immigrant Entrepreneurship Metrics (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={entrepreneurship}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" tick={{ fontSize: 10 }} interval={0} />
          <YAxis tickFormatter={v => `${v}%`} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Bar dataKey="pct" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
