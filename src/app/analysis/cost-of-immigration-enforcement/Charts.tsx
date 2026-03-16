// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

const budgetData = [
  { agency: 'CBP', budget: 18.5 },
  { agency: 'ICE', budget: 8.3 },
  { agency: 'USCIS', budget: 4.8 },
  { agency: 'EOIR', budget: 0.9 },
]

const budgetOverTime = [
  { year: 2003, cbp: 5.9, ice: 3.3, total: 9.2 },
  { year: 2005, cbp: 7.1, ice: 3.9, total: 11.0 },
  { year: 2008, cbp: 10.1, ice: 5.0, total: 15.1 },
  { year: 2010, cbp: 11.4, ice: 5.7, total: 17.1 },
  { year: 2012, cbp: 11.9, ice: 5.9, total: 17.8 },
  { year: 2015, cbp: 13.2, ice: 6.1, total: 19.3 },
  { year: 2018, cbp: 15.1, ice: 7.1, total: 22.2 },
  { year: 2020, cbp: 16.3, ice: 8.3, total: 24.6 },
  { year: 2022, cbp: 17.5, ice: 8.3, total: 25.8 },
  { year: 2024, cbp: 18.5, ice: 8.3, total: 26.8 },
]

const detentionCosts = [
  { type: 'ICE Detention', dailyCost: 144 },
  { type: 'Family Facility', dailyCost: 319 },
  { type: 'ATD Program', dailyCost: 4.36 },
  { type: 'Ankle Monitor', dailyCost: 4.12 },
  { type: 'SmartLINK App', dailyCost: 0.70 },
]

const enforcementVsProcessing = [
  { category: 'Border & Interior\nEnforcement', amount: 26.8 },
  { category: 'Legal Immigration\nProcessing', amount: 4.8 },
  { category: 'Immigration\nCourts', amount: 0.9 },
  { category: 'Refugee\nResettlement', amount: 2.1 },
]

export function AgencyBudgetChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Immigration Agency Budgets (FY2024, in Billions)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={budgetData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `$${v}B`} />
          <YAxis type="category" dataKey="agency" width={60} />
          <Tooltip formatter={(v: number) => `$${v}B`} />
          <Bar dataKey="budget" fill="#1e40af" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BudgetGrowthChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Enforcement Budget Growth (2003–2024)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={budgetOverTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => `$${v}B`} />
          <Tooltip formatter={(v: number) => `$${v}B`} />
          <Legend />
          <Line type="monotone" dataKey="cbp" stroke="#1e40af" name="CBP" strokeWidth={2} />
          <Line type="monotone" dataKey="ice" stroke="#dc2626" name="ICE" strokeWidth={2} />
          <Line type="monotone" dataKey="total" stroke="#10b981" name="Combined" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DetentionCostChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Daily Cost Per Person by Program</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={detentionCosts} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `$${v}`} />
          <YAxis type="category" dataKey="type" width={120} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => `$${v.toFixed(2)}/day`} />
          <Bar dataKey="dailyCost" fill="#dc2626" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EnforcementVsProcessingChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Enforcement vs. Legal Immigration Spending (Billions)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={enforcementVsProcessing} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={120}
            label={({ category, percent }) => `${category.split('\n')[0]} ${(percent * 100).toFixed(0)}%`}>
            {enforcementVsProcessing.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => `$${v}B`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
