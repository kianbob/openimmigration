// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#1e40af', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

const pendingByType = [
  { type: 'I-485 (Green Card)', pending: 1100000 },
  { type: 'I-765 (Work Permit)', pending: 870000 },
  { type: 'N-400 (Citizenship)', pending: 960000 },
  { type: 'I-130 (Family Petition)', pending: 2300000 },
  { type: 'I-140 (Employment)', pending: 520000 },
  { type: 'I-589 (Asylum)', pending: 1050000 },
  { type: 'Other', pending: 1900000 },
]

const familyWaitTimes = [
  { country: 'Mexico (F2B)', years: 24 },
  { country: 'Philippines (F4)', years: 23 },
  { country: 'India (F4)', years: 16 },
  { country: 'China (F4)', years: 15 },
  { country: 'Mexico (F1)', years: 22 },
  { country: 'Philippines (F2B)', years: 12 },
  { country: 'All Others (F2B)', years: 7 },
  { country: 'All Others (F1)', years: 8 },
]

const pendingOverTime = [
  { year: 2015, pending: 5200000 },
  { year: 2016, pending: 5500000 },
  { year: 2017, pending: 5800000 },
  { year: 2018, pending: 5700000 },
  { year: 2019, pending: 5700000 },
  { year: 2020, pending: 7100000 },
  { year: 2021, pending: 8100000 },
  { year: 2022, pending: 8500000 },
  { year: 2023, pending: 8500000 },
  { year: 2024, pending: 8700000 },
]

const processingTimes = [
  { form: 'I-130 (Family)', months: 22 },
  { form: 'I-485 (Green Card)', months: 14 },
  { form: 'N-400 (Citizenship)', months: 10 },
  { form: 'I-765 (EAD)', months: 8 },
  { form: 'I-140 (Employment)', months: 11 },
  { form: 'I-589 (Asylum)', months: 48 },
]

export function PendingByTypeChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Pending Cases by Form Type</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={pendingByType} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <YAxis type="category" dataKey="type" width={150} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Bar dataKey="pending" fill="#1e40af" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FamilyWaitChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Family Visa Wait Times (Years)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={familyWaitTimes} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `${v} yrs`} />
          <YAxis type="category" dataKey="country" width={160} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => `${v} years`} />
          <Bar dataKey="years" fill="#dc2626" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PendingOverTimeChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Total USCIS Pending Cases (2015–2024)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={pendingOverTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => (v / 1e6).toFixed(1) + 'M'} />
          <Tooltip formatter={(v: number) => v.toLocaleString()} />
          <Line type="monotone" dataKey="pending" stroke="#1e40af" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ProcessingTimesChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Average Processing Times (Months)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={processingTimes} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={v => `${v} mo`} />
          <YAxis type="category" dataKey="form" width={150} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => `${v} months`} />
          <Bar dataKey="months" fill="#f59e0b" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
