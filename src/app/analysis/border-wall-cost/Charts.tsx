// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899']

const costPerMile = [
  { type: 'Pedestrian Fence\n(Bush Era)', cost: 3.9 },
  { type: 'Vehicle Barrier\n(Bush Era)', cost: 1.7 },
  { type: 'Bollard Wall\n(Trump)', cost: 20.4 },
  { type: 'Steel Bollard\n(Remote Areas)', cost: 27 },
  { type: 'Rio Grande\nSector', cost: 33 },
  { type: 'San Diego\nSector', cost: 46 },
]

const wallSpending = [
  { year: 2007, cumulative: 2.4 },
  { year: 2009, cumulative: 3.6 },
  { year: 2011, cumulative: 4.1 },
  { year: 2013, cumulative: 4.8 },
  { year: 2015, cumulative: 5.2 },
  { year: 2017, cumulative: 5.8 },
  { year: 2019, cumulative: 11.2 },
  { year: 2021, cumulative: 15.8 },
  { year: 2023, cumulative: 16.4 },
  { year: 2025, cumulative: 17.1 },
]

const encountersByType = [
  { location: 'Between Ports\n(Where Wall Is)', encounters: 1920000 },
  { location: 'At Ports of Entry\n(No Wall Needed)', encounters: 530000 },
]

const alternativeCosts = [
  { approach: 'Border Wall (per mile)', annual: 27000000 },
  { approach: 'Surveillance Tech (per mile)', annual: 2000000 },
  { approach: 'Additional Agent (per year)', annual: 120000 },
  { approach: 'Immigration Judge (per year)', annual: 200000 },
  { approach: 'Asylum Officer (per year)', annual: 110000 },
]

export function CostPerMileChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Cost Per Mile of Border Barrier ($M)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={costPerMile} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `$${v}M`} />
          <YAxis type="category" dataKey="type" width={140} tick={{ fontSize: 10 }} />
          <Tooltip formatter={(v: number) => `$${v}M per mile`} />
          <Bar dataKey="cost" fill="#dc2626" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CumulativeSpendingChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Cumulative Border Wall/Barrier Spending ($B)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={wallSpending}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => `$${v}B`} />
          <Tooltip formatter={(v: number) => `$${v}B`} />
          <Line type="monotone" dataKey="cumulative" stroke="#1e40af" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AlternativeCostsChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Cost Comparison: Wall vs. Alternatives</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={alternativeCosts} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => v >= 1e6 ? `$${(v / 1e6).toFixed(0)}M` : `$${(v / 1e3).toFixed(0)}K`} />
          <YAxis type="category" dataKey="approach" width={180} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
          <Bar dataKey="annual" fill="#10b981" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
