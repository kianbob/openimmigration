'use client'

import { useState } from 'react'
import Link from 'next/link'

const visaCategories = [
  { id: 'ir', label: 'Immediate Relative (IR-1/CR-1)', family: true },
  { id: 'f1', label: 'F1 — Unmarried Sons/Daughters of U.S. Citizens', family: true },
  { id: 'f2a', label: 'F2A — Spouses/Children of Green Card Holders', family: true },
  { id: 'f2b', label: 'F2B — Unmarried Sons/Daughters of Green Card Holders', family: true },
  { id: 'f3', label: 'F3 — Married Sons/Daughters of U.S. Citizens', family: true },
  { id: 'f4', label: 'F4 — Siblings of U.S. Citizens', family: true },
  { id: 'eb1', label: 'EB-1 — Priority Workers', family: false },
  { id: 'eb2', label: 'EB-2 — Advanced Degree Professionals', family: false },
  { id: 'eb3', label: 'EB-3 — Skilled Workers', family: false },
  { id: 'eb5', label: 'EB-5 — Immigrant Investors', family: false },
]

const countries = [
  'All Other Countries',
  'China (mainland)',
  'India',
  'Mexico',
  'Philippines',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'Vietnam',
  'Dominican Republic',
  'Haiti',
  'Bangladesh',
  'Pakistan',
  'Brazil',
  'Colombia',
  'South Korea',
  'Nigeria',
  'Ethiopia',
]

// Estimated wait times in months based on visa bulletin trends (March 2025 approximations)
const waitTimeData: Record<string, Record<string, number>> = {
  ir:   { default: 14, 'China (mainland)': 14, India: 14, Mexico: 14, Philippines: 14 },
  f1:   { default: 84, 'China (mainland)': 84, India: 84, Mexico: 252, Philippines: 264 },
  f2a:  { default: 36, 'China (mainland)': 36, India: 36, Mexico: 36, Philippines: 36 },
  f2b:  { default: 108, 'China (mainland)': 108, India: 108, Mexico: 264, Philippines: 132 },
  f3:   { default: 168, 'China (mainland)': 168, India: 168, Mexico: 288, Philippines: 276 },
  f4:   { default: 180, 'China (mainland)': 180, India: 180, Mexico: 288, Philippines: 276 },
  eb1:  { default: 6, 'China (mainland)': 12, India: 24, Mexico: 6, Philippines: 6 },
  eb2:  { default: 12, 'China (mainland)': 48, India: 144, Mexico: 12, Philippines: 12 },
  eb3:  { default: 18, 'China (mainland)': 48, India: 120, Mexico: 18, Philippines: 18 },
  eb5:  { default: 24, 'China (mainland)': 180, India: 60, Mexico: 24, Philippines: 24 },
}

function getWaitTime(category: string, country: string): number {
  const catData = waitTimeData[category]
  if (!catData) return 0
  return catData[country] ?? catData.default ?? 0
}

function formatWait(months: number): string {
  if (months < 12) return `~${months} months`
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (rem === 0) return `~${years} year${years > 1 ? 's' : ''}`
  return `~${years} year${years > 1 ? 's' : ''}, ${rem} month${rem > 1 ? 's' : ''}`
}

function getSeverity(months: number): { color: string; label: string } {
  if (months <= 18) return { color: 'text-green-600 bg-green-50 border-green-200', label: 'Relatively fast' }
  if (months <= 48) return { color: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Moderate wait' }
  if (months <= 120) return { color: 'text-orange-600 bg-orange-50 border-orange-200', label: 'Long wait' }
  return { color: 'text-red-600 bg-red-50 border-red-200', label: 'Extreme backlog' }
}

export default function WaitTimeCalculatorPage() {
  const [category, setCategory] = useState('')
  const [country, setCountry] = useState('')

  const canCalculate = category && country
  const waitMonths = canCalculate ? getWaitTime(category, country) : 0
  const severity = getSeverity(waitMonths)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-primary text-sm hover:underline">← All Tools</Link>
      </div>

      <h1 className="font-heading text-4xl font-bold mb-3">Wait Time Calculator</h1>
      <p className="text-lg text-gray-600 mb-10">
        Estimate how long you&apos;ll wait for your visa or green card based on current visa bulletin data and processing trends.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Visa Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Select a visa category...</option>
            <optgroup label="Family-Sponsored">
              {visaCategories.filter(v => v.family).map(v => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </optgroup>
            <optgroup label="Employment-Based">
              {visaCategories.filter(v => !v.family).map(v => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Country of Birth</label>
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Select your country of birth...</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {canCalculate && (
        <div className="mt-10 animate-in">
          <div className={`${severity.color} border rounded-2xl p-8 text-center`}>
            <div className="text-sm font-semibold uppercase tracking-wide mb-2">{severity.label}</div>
            <div className="text-4xl font-bold mb-2">{formatWait(waitMonths)}</div>
            <div className="text-sm opacity-75">
              Estimated total wait from filing to decision
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-sm text-gray-500">Category</div>
              <div className="font-bold text-sm">{visaCategories.find(v => v.id === category)?.label}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-sm text-gray-500">Country of Birth</div>
              <div className="font-bold text-sm">{country}</div>
            </div>
          </div>

          {waitMonths > 120 && (
            <div className="mt-6 p-5 bg-red-50 border border-red-200 rounded-xl">
              <h3 className="font-bold text-red-800 text-sm mb-1">Extreme Backlog Warning</h3>
              <p className="text-sm text-red-700">
                Wait times over 10 years are common for this category-country combination. The backlog in these
                categories has been growing for decades due to per-country caps that limit immigration from
                high-demand countries regardless of total demand.
              </p>
            </div>
          )}

          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <h3 className="font-bold text-sm mb-2">How this estimate works</h3>
            <p className="text-sm text-gray-600">
              This estimate is based on the Department of State&apos;s monthly Visa Bulletin, current USCIS processing
              times, and historical movement patterns. Actual wait times can vary — visa bulletin dates can move
              forward or backward depending on demand. For immediate relatives (IR), there is no cap, but USCIS
              processing still takes 12–24 months.
            </p>
          </div>

          <div className="mt-4 text-xs text-gray-400 text-center">
            Based on Visa Bulletin trends as of March 2025. Not legal advice.
          </div>
        </div>
      )}
    </div>
  )
}
