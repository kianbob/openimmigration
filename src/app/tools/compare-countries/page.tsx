'use client'

import { useState } from 'react'
import Link from 'next/link'

// Representative data based on DOJ EOIR and DHS statistics
const countryData: Record<string, {
  totalCases: number
  pendingCases: number
  asylumGrants: number
  asylumDenials: number
  asylumGrantRate: number
  removalOrders: number
  voluntaryDeparture: number
  topVisaTypes: string[]
  representationRate: number
  avgWaitDays: number
}> = {
  'Mexico': {
    totalCases: 2150000, pendingCases: 285000, asylumGrants: 18500, asylumDenials: 72000,
    asylumGrantRate: 20.4, removalOrders: 195000, voluntaryDeparture: 520000,
    topVisaTypes: ['Family (F2A/F2B)', 'Asylum', 'DACA', 'TPS'],
    representationRate: 22.1, avgWaitDays: 445,
  },
  'Guatemala': {
    totalCases: 980000, pendingCases: 195000, asylumGrants: 15200, asylumDenials: 38000,
    asylumGrantRate: 28.6, removalOrders: 78000, voluntaryDeparture: 45000,
    topVisaTypes: ['Asylum', 'Family (IR/F2A)', 'TPS'],
    representationRate: 19.5, avgWaitDays: 520,
  },
  'Honduras': {
    totalCases: 720000, pendingCases: 155000, asylumGrants: 14800, asylumDenials: 28000,
    asylumGrantRate: 34.6, removalOrders: 52000, voluntaryDeparture: 32000,
    topVisaTypes: ['Asylum', 'TPS', 'Family (F2A)'],
    representationRate: 21.3, avgWaitDays: 485,
  },
  'El Salvador': {
    totalCases: 850000, pendingCases: 125000, asylumGrants: 22000, asylumDenials: 35000,
    asylumGrantRate: 38.6, removalOrders: 65000, voluntaryDeparture: 38000,
    topVisaTypes: ['TPS', 'Asylum', 'Family', 'DACA'],
    representationRate: 25.8, avgWaitDays: 460,
  },
  'China': {
    totalCases: 520000, pendingCases: 78000, asylumGrants: 48000, asylumDenials: 22000,
    asylumGrantRate: 68.6, removalOrders: 18000, voluntaryDeparture: 5200,
    topVisaTypes: ['Asylum', 'EB-2/EB-3', 'EB-5', 'F4'],
    representationRate: 62.4, avgWaitDays: 380,
  },
  'India': {
    totalCases: 380000, pendingCases: 65000, asylumGrants: 18000, asylumDenials: 8500,
    asylumGrantRate: 67.9, removalOrders: 12000, voluntaryDeparture: 3800,
    topVisaTypes: ['H-1B', 'EB-2/EB-3', 'Family (F4)', 'Asylum'],
    representationRate: 68.2, avgWaitDays: 350,
  },
  'Venezuela': {
    totalCases: 320000, pendingCases: 210000, asylumGrants: 28000, asylumDenials: 4200,
    asylumGrantRate: 87.0, removalOrders: 3500, voluntaryDeparture: 1200,
    topVisaTypes: ['Asylum', 'TPS', 'Humanitarian Parole'],
    representationRate: 35.2, avgWaitDays: 620,
  },
  'Haiti': {
    totalCases: 280000, pendingCases: 145000, asylumGrants: 8500, asylumDenials: 12000,
    asylumGrantRate: 41.5, removalOrders: 22000, voluntaryDeparture: 8500,
    topVisaTypes: ['TPS', 'Asylum', 'Family (F2A/F4)'],
    representationRate: 28.4, avgWaitDays: 550,
  },
  'Cuba': {
    totalCases: 250000, pendingCases: 85000, asylumGrants: 35000, asylumDenials: 5500,
    asylumGrantRate: 86.4, removalOrders: 8200, voluntaryDeparture: 2100,
    topVisaTypes: ['Asylum', 'Humanitarian Parole', 'Family (IR)'],
    representationRate: 42.1, avgWaitDays: 410,
  },
  'Colombia': {
    totalCases: 180000, pendingCases: 72000, asylumGrants: 12000, asylumDenials: 6800,
    asylumGrantRate: 63.8, removalOrders: 9500, voluntaryDeparture: 4200,
    topVisaTypes: ['Asylum', 'Family (IR/F2A)', 'EB-3'],
    representationRate: 45.6, avgWaitDays: 420,
  },
  'Philippines': {
    totalCases: 165000, pendingCases: 18000, asylumGrants: 2800, asylumDenials: 1200,
    asylumGrantRate: 70.0, removalOrders: 8500, voluntaryDeparture: 3200,
    topVisaTypes: ['Family (F4/F2B)', 'EB-3', 'H-1B'],
    representationRate: 55.3, avgWaitDays: 320,
  },
  'Nicaragua': {
    totalCases: 155000, pendingCases: 95000, asylumGrants: 15000, asylumDenials: 3200,
    asylumGrantRate: 82.4, removalOrders: 4500, voluntaryDeparture: 1800,
    topVisaTypes: ['Asylum', 'TPS', 'Family'],
    representationRate: 30.1, avgWaitDays: 580,
  },
  'Ecuador': {
    totalCases: 120000, pendingCases: 62000, asylumGrants: 8500, asylumDenials: 5200,
    asylumGrantRate: 62.0, removalOrders: 7800, voluntaryDeparture: 3500,
    topVisaTypes: ['Asylum', 'Family (IR/F2A)', 'TPS'],
    representationRate: 38.5, avgWaitDays: 490,
  },
  'Brazil': {
    totalCases: 95000, pendingCases: 48000, asylumGrants: 5200, asylumDenials: 4800,
    asylumGrantRate: 52.0, removalOrders: 6500, voluntaryDeparture: 2800,
    topVisaTypes: ['Asylum', 'Family (IR)', 'EB-3', 'H-1B'],
    representationRate: 42.0, avgWaitDays: 440,
  },
  'Ethiopia': {
    totalCases: 65000, pendingCases: 18000, asylumGrants: 12000, asylumDenials: 3500,
    asylumGrantRate: 77.4, removalOrders: 2800, voluntaryDeparture: 800,
    topVisaTypes: ['Asylum', 'DV Lottery', 'Family'],
    representationRate: 52.0, avgWaitDays: 380,
  },
  'Nigeria': {
    totalCases: 58000, pendingCases: 22000, asylumGrants: 6500, asylumDenials: 4200,
    asylumGrantRate: 60.7, removalOrders: 3800, voluntaryDeparture: 1200,
    topVisaTypes: ['Asylum', 'DV Lottery', 'Family', 'EB-2'],
    representationRate: 58.0, avgWaitDays: 365,
  },
}

const countryNames = Object.keys(countryData).sort()

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold">{value.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  )
}

export default function CompareCountriesPage() {
  const [country1, setCountry1] = useState('')
  const [country2, setCountry2] = useState('')

  const c1 = country1 ? countryData[country1] : null
  const c2 = country2 ? countryData[country2] : null
  const canCompare = c1 && c2

  const maxCases = canCompare ? Math.max(c1.totalCases, c2.totalCases) : 1
  const maxPending = canCompare ? Math.max(c1.pendingCases, c2.pendingCases) : 1

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-primary text-sm hover:underline">← All Tools</Link>
      </div>

      <h1 className="font-heading text-4xl font-bold mb-3">Compare Countries</h1>
      <p className="text-lg text-gray-600 mb-10">
        Compare immigration statistics between two countries — cases, asylum rates, deportations, and more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div>
          <label className="block font-semibold mb-2">Country 1</label>
          <select
            value={country1}
            onChange={e => setCountry1(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Select a country...</option>
            {countryNames.map(c => (
              <option key={c} value={c} disabled={c === country2}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Country 2</label>
          <select
            value={country2}
            onChange={e => setCountry2(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Select a country...</option>
            {countryNames.map(c => (
              <option key={c} value={c} disabled={c === country1}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {canCompare && (
        <div className="animate-in space-y-8">
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
              <h3 className="font-heading text-xl font-bold mb-1">{country1}</h3>
              <div className="text-3xl font-bold text-blue-600">{(c1.totalCases / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-500">total cases</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <h3 className="font-heading text-xl font-bold mb-1">{country2}</h3>
              <div className="text-3xl font-bold text-emerald-600">{(c2.totalCases / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-500">total cases</div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Metric</th>
                  <th className="px-4 py-3 text-right font-semibold text-blue-600">{country1}</th>
                  <th className="px-4 py-3 text-right font-semibold text-emerald-600">{country2}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Total Cases', c1.totalCases.toLocaleString(), c2.totalCases.toLocaleString()],
                  ['Pending Cases', c1.pendingCases.toLocaleString(), c2.pendingCases.toLocaleString()],
                  ['Asylum Grant Rate', `${c1.asylumGrantRate}%`, `${c2.asylumGrantRate}%`],
                  ['Asylum Grants', c1.asylumGrants.toLocaleString(), c2.asylumGrants.toLocaleString()],
                  ['Asylum Denials', c1.asylumDenials.toLocaleString(), c2.asylumDenials.toLocaleString()],
                  ['Removal Orders', c1.removalOrders.toLocaleString(), c2.removalOrders.toLocaleString()],
                  ['Voluntary Departures', c1.voluntaryDeparture.toLocaleString(), c2.voluntaryDeparture.toLocaleString()],
                  ['Representation Rate', `${c1.representationRate}%`, `${c2.representationRate}%`],
                  ['Avg Wait (days)', c1.avgWaitDays.toLocaleString(), c2.avgWaitDays.toLocaleString()],
                ].map(([label, v1, v2], i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-2.5 font-medium">{label}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{v1}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{v2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visa types */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-sm mb-2">Top Visa Types — {country1}</h4>
              <div className="flex flex-wrap gap-2">
                {c1.topVisaTypes.map(v => (
                  <span key={v} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{v}</span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-sm mb-2">Top Visa Types — {country2}</h4>
              <div className="flex flex-wrap gap-2">
                {c2.topVisaTypes.map(v => (
                  <span key={v} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{v}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Asylum rate comparison visual */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold mb-4">Asylum Grant Rate Comparison</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{country1}</span>
                  <span className="font-bold">{c1.asylumGrantRate}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c1.asylumGrantRate}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{country2}</span>
                  <span className="font-bold">{c2.asylumGrantRate}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c2.asylumGrantRate}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Data from DOJ EOIR and DHS sources, as of February 2026. Some figures are approximations based on published datasets.
          </div>
        </div>
      )}
    </div>
  )
}
