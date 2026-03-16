// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

const backlogGrowth = [
  { year: 2015, pending: 457000 },
  { year: 2016, pending: 516000 },
  { year: 2017, pending: 600000 },
  { year: 2018, pending: 786000 },
  { year: 2019, pending: 1012000 },
  { year: 2020, pending: 1226000 },
  { year: 2021, pending: 1407000 },
  { year: 2022, pending: 1598000 },
  { year: 2023, pending: 1852000 },
  { year: 2024, pending: 2100000 },
]

const grantRateByNationality = [
  { nationality: 'China', grantRate: 42 },
  { nationality: 'Venezuela', grantRate: 35 },
  { nationality: 'Ethiopia', grantRate: 48 },
  { nationality: 'Guatemala', grantRate: 14 },
  { nationality: 'Honduras', grantRate: 12 },
  { nationality: 'El Salvador', grantRate: 15 },
  { nationality: 'Mexico', grantRate: 11 },
  { nationality: 'India', grantRate: 39 },
]

const judgeVariation = [
  { range: '0-10%\nGrant Rate', count: 78 },
  { range: '10-20%', count: 112 },
  { range: '20-40%', count: 168 },
  { range: '40-60%', count: 120 },
  { range: '60-80%', count: 72 },
  { range: '80-100%', count: 32 },
]

const waitTimeByYear = [
  { year: 2015, avgDays: 578 },
  { year: 2016, avgDays: 623 },
  { year: 2017, avgDays: 712 },
  { year: 2018, avgDays: 800 },
  { year: 2019, avgDays: 930 },
  { year: 2020, avgDays: 1150 },
  { year: 2021, avgDays: 1350 },
  { year: 2022, avgDays: 1460 },
  { year: 2023, avgDays: 1520 },
  { year: 2024, avgDays: 1570 },
]

export function BacklogGrowthChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Asylum Case Backlog Growth (2015–2024)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={backlogGrowth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Line type="monotone" dataKey="pending" stroke="#dc2626" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function GrantRateChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Asylum Grant Rate by Nationality (%)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={grantRateByNationality} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `${v}%`} domain={[0, 60]} />
          <YAxis type="category" dataKey="nationality" width={100} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Bar dataKey="grantRate" fill="#10b981" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function JudgeVariationChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Distribution of Judges by Asylum Grant Rate</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={judgeVariation}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" tick={{ fontSize: 11 }} interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Number of Judges" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function WaitTimeChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Average Wait Time for Asylum Decision (Days)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={waitTimeByYear}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => `${(v / 365).toFixed(1)} yrs`} />
          <Tooltip formatter={(v: number) => `${v} days (${(v / 365).toFixed(1)} years)`} />
          <Line type="monotone" dataKey="avgDays" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
