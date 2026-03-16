// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const crimeData = [
  { group: 'Native-Born\nCitizens', rate: 1.5 },
  { group: 'Legal\nImmigrants', rate: 0.5 },
  { group: 'Undocumented\nImmigrants', rate: 0.8 },
]

const welfareData = [
  { program: 'SNAP (Food Stamps)', citizen: 12, noncitizen: 6 },
  { program: 'Medicaid', citizen: 23, noncitizen: 16 },
  { program: 'SSI', citizen: 2.5, noncitizen: 1.2 },
  { program: 'TANF (Cash Aid)', citizen: 0.8, noncitizen: 0.3 },
  { program: 'Housing Assist.', citizen: 4.5, noncitizen: 2.1 },
]

const laborForce = [
  { metric: 'Labor Force\nParticipation', immigrant: 66, nativeBorn: 62 },
  { metric: 'Unemployment\nRate', immigrant: 3.8, nativeBorn: 3.5 },
  { metric: 'Multiple Job\nHolding', immigrant: 5.8, nativeBorn: 4.9 },
]

const encountersVsPopulation = [
  { year: 2000, encounters: 1680000, undocPop: 8.6 },
  { year: 2005, encounters: 1190000, undocPop: 11.1 },
  { year: 2010, encounters: 463000, undocPop: 11.4 },
  { year: 2015, encounters: 337000, undocPop: 10.7 },
  { year: 2019, encounters: 851000, undocPop: 10.5 },
  { year: 2022, encounters: 2214000, undocPop: 11.0 },
  { year: 2024, encounters: 1530000, undocPop: 11.2 },
]

export function CrimeRateChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Incarceration Rate by Immigration Status (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={crimeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="group" tick={{ fontSize: 11 }} interval={0} />
          <YAxis tickFormatter={v => `${v}%`} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Bar dataKey="rate" fill="#1e40af" radius={[4, 4, 0, 0]} name="Incarceration Rate" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function WelfareUsageChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Benefit Usage Rate: Citizens vs. Noncitizens (%)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={welfareData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="program" tick={{ fontSize: 10 }} interval={0} />
          <YAxis tickFormatter={v => `${v}%`} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Legend />
          <Bar dataKey="citizen" fill="#1e40af" name="Citizens" radius={[4, 4, 0, 0]} />
          <Bar dataKey="noncitizen" fill="#dc2626" name="Noncitizens" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function LaborForceChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-heading text-xl font-bold mb-4">Labor Market Participation (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={laborForce}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" tick={{ fontSize: 10 }} interval={0} />
          <YAxis tickFormatter={v => `${v}%`} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Legend />
          <Bar dataKey="immigrant" fill="#10b981" name="Immigrants" radius={[4, 4, 0, 0]} />
          <Bar dataKey="nativeBorn" fill="#f59e0b" name="Native-Born" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
