import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import NationalitiesTable from './NationalitiesTable'
import { titleCase } from '@/lib/utils'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Cases by Nationality — All 260 Countries',
  description: 'Explore U.S. immigration court cases by country of origin — Mexico 2.3M, Guatemala 997K, Honduras 953K. All 260 nationalities with case data.',
}

export default function NationalitiesPage() {
  const nationalities = loadData('nationality-index.json')
  const stats = loadData('stats.json')
  const top5 = nationalities.slice(0, 5)
  const topCases = top5.reduce((s: number, n: { cases: number }) => s + n.cases, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'By Nationality' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Cases by Nationality</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.totalNationalities} nationalities across {stats.totalCases.toLocaleString()} cases.
        The top 5 countries account for {(topCases / 1e6).toFixed(1)}M cases ({((topCases / stats.totalCases) * 100).toFixed(0)}% of all cases).
        Click any nationality for detailed court, outcome, and trend data.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {top5.map((n: { code: string; name: string; cases: number }, i: number) => (
          <div key={n.code} className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">#{i + 1}</div>
            <div className="font-bold text-sm">{titleCase(n.name)}</div>
            <div className="text-xl font-bold text-primary">{n.cases >= 1e6 ? `${(n.cases / 1e6).toFixed(1)}M` : `${(n.cases / 1e3).toFixed(0)}K`}</div>
          </div>
        ))}
      </div>

      <NationalitiesTable nationalities={nationalities} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/asylum-by-nationality" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌍 Asylum by Nationality Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">How your country of origin shapes your fate in immigration court.</p>
        </Link>
        <Link href="/demographics" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Demographics</h3>
          <p className="text-sm text-gray-600 mt-1">Gender, language, and custody breakdowns across all cases.</p>
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">Data source: {stats.dataSource}</p>
    </div>
  )
}
