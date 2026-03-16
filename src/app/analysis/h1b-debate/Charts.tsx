// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

const petitionsByYear = [
  { year: 2018, petitions: 190098, cap: 85000 },
  { year: 2019, petitions: 201011, cap: 85000 },
  { year: 2020, petitions: 275000, cap: 85000 },
  { year: 2021, petitions: 308613, cap: 85000 },
  { year: 2022, petitions: 483927, cap: 85000 },
  { year: 2023, petitions: 758994, cap: 85000 },
  { year: 2024, petitions: 470342, cap: 85000 },
]

const topEmployers = [
  { company: 'Amazon', approvals: 8512 },
  { company: 'Infosys', approvals: 7432 },
  { company: 'TCS', approvals: 6108 },
  { company: 'Google', approvals: 5987 },
  { company: 'Meta', approvals: 4856 },
  { company: 'Microsoft', approvals: 4721 },
  { company: 'Cognizant', approvals: 4523 },
  { company: 'Apple', approvals: 3845 },
]

const wageDistribution = [
  { level: 'Level 1\n(Entry)', pct: 8, median: 63000 },
  { level: 'Level 2\n(Qualified)', pct: 32, median: 85000 },
  { level: 'Level 3\n(Experienced)', pct: 38, median: 110000 },
  { level: 'Level 4\n(Expert)', pct: 22, median: 142000 },
]

const countryOfBirth = [
  { country: 'India', pct: 72 },
  { country: 'China', pct: 12 },
  { country: 'Canada', pct: 2 },
  { country: 'South Korea', pct: 1.5 },
  { country: 'Philippines', pct: 1.2 },
  { country: 'Other', pct: 11.3 },
]

export function PetitionsVsCapChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">H-1B Petitions vs. Annual Cap</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={petitionsByYear}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => (v / 1e3).toFixed(0) + 'K'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Legend />
          <Bar dataKey="petitions" fill="#1e40af" name="Petitions Filed" radius={[4, 4, 0, 0]} />
          <Bar dataKey="cap" fill="#dc2626" name="Annual Cap" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopEmployersChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Top H-1B Employers by Approvals</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topEmployers} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => (v / 1e3).toFixed(1) + 'K'} />
          <YAxis type="category" dataKey="company" width={100} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="approvals" fill="#10b981" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function WageChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">H-1B Wage Levels: Distribution and Median Salary</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={wageDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" tick={{ fontSize: 11 }} interval={0} />
          <YAxis yAxisId="left" tickFormatter={v => `${v}%`} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={v => `$${(v / 1e3).toFixed(0)}K`} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="pct" fill="#1e40af" name="% of Petitions" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="median" fill="#f59e0b" name="Median Salary" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CountryChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">H-1B Beneficiaries by Country of Birth</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={countryOfBirth} dataKey="pct" nameKey="country" cx="50%" cy="50%" outerRadius={120}
            label={({ country, pct }) => `${country} ${pct}%`}>
            {countryOfBirth.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
