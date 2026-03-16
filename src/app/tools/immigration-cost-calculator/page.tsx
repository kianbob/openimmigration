'use client'

import { useState } from 'react'
import Link from 'next/link'

type CostItem = {
  label: string
  low: number
  high: number
  note?: string
  required: boolean
}

type Pathway = {
  id: string
  name: string
  description: string
  costs: CostItem[]
}

const pathways: Pathway[] = [
  {
    id: 'family-gc',
    name: 'Family-Based Green Card',
    description: 'Sponsored by a U.S. citizen or permanent resident family member',
    costs: [
      { label: 'I-130 Petition Filing Fee', low: 535, high: 535, required: true },
      { label: 'I-485 Adjustment of Status', low: 1225, high: 1225, required: true, note: 'If adjusting status in the U.S.' },
      { label: 'Biometrics Fee', low: 85, high: 85, required: true },
      { label: 'Medical Exam (I-693)', low: 200, high: 500, required: true },
      { label: 'Vaccinations', low: 0, high: 1000, required: true, note: 'Depends on what you already have' },
      { label: 'Passport Photos', low: 15, high: 30, required: true },
      { label: 'Document Translation', low: 0, high: 500, required: false, note: 'If documents not in English' },
      { label: 'Immigration Attorney', low: 3000, high: 8000, required: false, note: 'Recommended but not required' },
      { label: 'Consular Processing (DS-260)', low: 325, high: 325, required: false, note: 'If processing through embassy abroad' },
      { label: 'Travel to Embassy/Interview', low: 0, high: 2000, required: false },
      { label: 'Affidavit of Support Prep', low: 0, high: 500, required: false },
    ],
  },
  {
    id: 'employment-gc',
    name: 'Employment-Based Green Card',
    description: 'Sponsored by a U.S. employer (EB-1, EB-2, EB-3)',
    costs: [
      { label: 'PERM Labor Certification', low: 0, high: 0, required: true, note: 'No gov fee — but employer pays legal costs' },
      { label: 'I-140 Petition Filing Fee', low: 700, high: 700, required: true },
      { label: 'I-485 Adjustment of Status', low: 1225, high: 1225, required: true },
      { label: 'Premium Processing (optional)', low: 0, high: 2805, required: false, note: 'For faster I-140 adjudication' },
      { label: 'Biometrics Fee', low: 85, high: 85, required: true },
      { label: 'Medical Exam (I-693)', low: 200, high: 500, required: true },
      { label: 'Vaccinations', low: 0, high: 1000, required: true },
      { label: 'Immigration Attorney', low: 5000, high: 15000, required: false, note: 'Often employer-paid' },
      { label: 'PERM Process Legal Fees', low: 3000, high: 8000, required: true, note: 'Employer responsibility' },
      { label: 'Recruitment/Advertising (PERM)', low: 2000, high: 5000, required: true, note: 'Employer responsibility' },
      { label: 'Employment Authorization (I-765)', low: 410, high: 410, required: false, note: 'While I-485 pending' },
      { label: 'Advance Parole (I-131)', low: 575, high: 575, required: false, note: 'For travel while pending' },
    ],
  },
  {
    id: 'naturalization',
    name: 'Naturalization (Citizenship)',
    description: 'Becoming a U.S. citizen after holding a green card',
    costs: [
      { label: 'N-400 Application Fee', low: 710, high: 710, required: true },
      { label: 'Biometrics Fee', low: 85, high: 85, required: true },
      { label: 'Passport Photos', low: 15, high: 30, required: true },
      { label: 'English/Civics Test Prep', low: 0, high: 500, required: false, note: 'Free resources available online' },
      { label: 'Immigration Attorney', low: 1500, high: 4000, required: false },
      { label: 'Certified Copies of Documents', low: 0, high: 200, required: false },
      { label: 'U.S. Passport (after approval)', low: 190, high: 230, required: false, note: 'Standard vs expedited' },
    ],
  },
  {
    id: 'asylum',
    name: 'Asylum Application',
    description: 'Seeking protection from persecution in your home country',
    costs: [
      { label: 'I-589 Filing Fee', low: 0, high: 0, required: true, note: 'Free to file' },
      { label: 'Medical Exam (for green card stage)', low: 200, high: 500, required: false },
      { label: 'Document Translation', low: 100, high: 2000, required: true, note: 'Country conditions, personal documents' },
      { label: 'Immigration Attorney', low: 5000, high: 15000, required: false, note: 'Pro bono options available but scarce' },
      { label: 'Country Conditions Expert', low: 0, high: 5000, required: false, note: 'Expert witness for hearings' },
      { label: 'Psychological Evaluation', low: 500, high: 3000, required: false, note: 'Often critical for asylum cases' },
      { label: 'Travel to Asylum Office/Court', low: 0, high: 1000, required: true },
      { label: 'Employment Authorization (I-765)', low: 0, high: 0, required: false, note: 'Free for asylum applicants' },
    ],
  },
  {
    id: 'daca',
    name: 'DACA Renewal',
    description: 'Deferred Action for Childhood Arrivals — renewal application',
    costs: [
      { label: 'I-821D + I-765 Filing Fee', low: 495, high: 495, required: true },
      { label: 'Passport Photos', low: 15, high: 30, required: true },
      { label: 'Immigration Attorney', low: 500, high: 2000, required: false },
      { label: 'Document Copies/Prep', low: 0, high: 100, required: false },
    ],
  },
]

export default function CostCalculatorPage() {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null)
  const [includeOptional, setIncludeOptional] = useState(true)

  const pathway = pathways.find(p => p.id === selectedPathway)

  const filteredCosts = pathway?.costs.filter(c => c.required || includeOptional) ?? []
  const totalLow = filteredCosts.reduce((sum, c) => sum + c.low, 0)
  const totalHigh = filteredCosts.reduce((sum, c) => sum + c.high, 0)
  const requiredLow = pathway?.costs.filter(c => c.required).reduce((sum, c) => sum + c.low, 0) ?? 0
  const requiredHigh = pathway?.costs.filter(c => c.required).reduce((sum, c) => sum + c.high, 0) ?? 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-primary text-sm hover:underline">← All Tools</Link>
      </div>

      <h1 className="font-heading text-4xl font-bold mb-3">Immigration Cost Calculator</h1>
      <p className="text-lg text-gray-600 mb-10">
        Get a realistic cost breakdown for any immigration pathway — filing fees, legal costs, medical exams, and more.
      </p>

      <div className="mb-8">
        <h2 className="font-semibold mb-3">Select your immigration pathway</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pathways.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPathway(p.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                selectedPathway === p.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/40'
              }`}
            >
              <div className="font-bold text-sm">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">{p.description}</div>
            </button>
          ))}
        </div>
      </div>

      {pathway && (
        <div className="animate-in">
          {/* Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
            <h2 className="font-heading text-xl font-bold mb-4">{pathway.name} — Cost Estimate</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Required Costs</div>
                <div className="text-2xl font-bold text-primary">
                  ${requiredLow.toLocaleString()} – ${requiredHigh.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total (with optional)</div>
                <div className="text-2xl font-bold">
                  ${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Toggle */}
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={includeOptional}
              onChange={e => setIncludeOptional(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Include optional costs (attorney, travel, etc.)</span>
          </label>

          {/* Line items */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Item</th>
                  <th className="px-4 py-3 text-right font-semibold">Low</th>
                  <th className="px-4 py-3 text-right font-semibold">High</th>
                </tr>
              </thead>
              <tbody>
                {filteredCosts.map((cost, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {cost.label}
                        {!cost.required && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">optional</span>
                        )}
                      </div>
                      {cost.note && <div className="text-xs text-gray-400 mt-0.5">{cost.note}</div>}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">${cost.low.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono">${cost.high.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3 text-right font-mono">${totalLow.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono">${totalHigh.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            <strong>Note:</strong> These are estimates based on published USCIS fee schedules (2024–2025) and
            typical attorney rates. Actual costs vary by location, attorney, and individual circumstances.
            USCIS fees are subject to change — check{' '}
            <a href="https://www.uscis.gov/forms/filing-fees" target="_blank" rel="noopener" className="underline">
              uscis.gov
            </a>{' '}
            for current fees.
          </div>
        </div>
      )}
    </div>
  )
}
