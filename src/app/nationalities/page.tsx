import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'
import NationalitiesTable from './NationalitiesTable'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Cases by Nationality — All 260 Countries',
  description: 'Explore U.S. immigration court cases by country of origin — case volumes for all 260 nationalities.',
}

export default function NationalitiesPage() {
  const nationalities = loadData('nationalities.json')
  const stats = loadData('stats.json')
  const top5 = nationalities.slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'By Nationality' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Cases by Nationality</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.totalNationalities} nationalities represented across {stats.totalCases.toLocaleString()} immigration court cases.
        {' '}{top5[0].name} leads with {top5[0].cases.toLocaleString()} cases, followed by {top5[1].name} ({top5[1].cases.toLocaleString()}) and {top5[2].name} ({top5[2].cases.toLocaleString()}).
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {top5.map((n: { code: string; name: string; cases: number }, i: number) => (
          <div key={n.code} className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">#{i + 1}</div>
            <div className="font-bold text-sm">{n.name}</div>
            <div className="text-xl font-bold text-primary">{(n.cases / 1e6).toFixed(n.cases >= 1e6 ? 1 : 0)}{n.cases >= 1e6 ? 'M' : (n.cases / 1e3).toFixed(0) + 'K'}</div>
          </div>
        ))}
      </div>

      <NationalitiesTable nationalities={nationalities} />

      <p className="text-sm text-gray-500 mt-6 text-center">
        Data source: {stats.dataSource}
      </p>
    </div>
  )
}
