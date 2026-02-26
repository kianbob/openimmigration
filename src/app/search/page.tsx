import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'
import SearchInterface from './SearchInterface'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Search Immigration Court Data',
  description: 'Search and filter U.S. immigration court data by court, nationality, judge, and more.',
}

export default function SearchPage() {
  const courts = loadData('courts.json')
  const nationalities = loadData('nationalities.json')
  const judges = loadData('judges.json')
  const stats = loadData('stats.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Search Immigration Court Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        Search across {stats.totalCourts} courts, {stats.totalNationalities} nationalities, and {judges.length.toLocaleString()} judges.
      </p>

      <SearchInterface courts={courts} nationalities={nationalities} judges={judges} />
    </div>
  )
}
