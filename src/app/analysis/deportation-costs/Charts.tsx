// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899']

const costBreakdown = [
  { component: 'Apprehension', cost: 1950 },
  { component: 'Detention\n(avg 30 days)', cost: 4320 },
  { component: 'Legal Processing', cost: 1800 },
  { component: 'Transportation', cost: 1350 },
  { component: 'Removal Flight', cost: 1480 },
]

const deportationsOverTime = [
  { year: 2012, removals: 419384, cost: 4.1 },
  { year: 2013, removals: 438421, cost: 4.4 },
  { year: 2014, removals: 414481, cost: 4.2 },
  { year: 2015, removals: 333341, cost: 3.5 },
  { year: 2016, removals: 340056, cost: 3.6 },
  { year: 2017, removals: 295364, cost: 3.2 },
  { year: 2018, removals: 256085, cost: 2.9 },
  { year: 2019, removals: 267258, cost: 3.1 },
  { year: 2020, removals: 185884, cost: 2.2 },
  { year: 2021, removals: 59011, cost: 0.8 },
  { year: 2022, removals: 72177, cost: 1.0 },
  { year: 2023, removals: 142580, cost: 1.8 },
  { year: 2024, removals: 271484, cost: 3.2 },
]

const massDeportScenario = [
  { scenario: 'Current Operations\n(~270K/year)', totalCost: 3.2 },
  { scenario: 'Double Operations\n(~540K/year)', totalCost: 7.8 },
  { scenario: 'Mass Deportation\n(1M/year)', totalCost: 26.9 },
  { scenario: 'Full Deportation\n(11M over 10yrs)', totalCost: 96.7 },
]

export function CostBreakdownChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Average Cost Per Deportation by Component</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={costBreakdown} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `$${(v / 1e3).toFixed(1)}K`} />
          <YAxis type="category" dataKey="component" width={120} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
          <Bar dataKey="cost" fill="#dc2626" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DeportationsTimelineChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Annual Removals and Estimated Cost ($B)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={deportationsOverTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" tickFormatter={v => (v / 1e3).toFixed(0) + 'K'} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={v => `$${v}B`} />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="removals" stroke="#1e40af" strokeWidth={2} name="Removals" />
          <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#dc2626" strokeWidth={2} name="Est. Cost ($B)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MassDeportCostChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Estimated Annual Cost by Deportation Scale ($B)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={massDeportScenario}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="scenario" tick={{ fontSize: 10 }} interval={0} />
          <YAxis tickFormatter={v => `$${v}B`} />
          <Tooltip formatter={(v: number) => `$${v}B`} />
          <Bar dataKey="totalCost" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
