import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import SearchInterface from './SearchInterface'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Search Immigration Court Data — Courts, Judges & Nationalities',
  description: 'Search U.S. immigration court data — find any of 88 courts, 1,269 judges, or 260 nationalities. Free access to DOJ EOIR case data.',
  alternates: { canonical: 'https://www.openimmigration.us/search' },
}

export default function SearchPage() {
  const courts = loadData('courts.json')
  const nationalities = loadData('nationalities.json')
  const judges = loadData('judges.json')
  const stats = loadData('stats.json')
  const courtIndex = loadData('court-index.json')

  // Build court code → slug lookup
  const courtSlugs: Record<string, string> = {}
  courtIndex.forEach((c: { code: string; slug: string }) => { courtSlugs[c.code] = c.slug })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Search Immigration Court Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        Search across {stats.totalCourts} courts, {stats.totalNationalities} nationalities, and {judges.length.toLocaleString()} judges.
        Start typing to find courts by city, judges by name, or nationalities by country.
      </p>

      <SearchInterface courts={courts} nationalities={nationalities} judges={judges} courtSlugs={courtSlugs} />

      {/* SEO content below */}
      <div className="mt-16 prose prose-lg max-w-none text-gray-600">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What You Can Find</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg">🏛️ {stats.totalCourts} Courts</h3>
            <p className="text-sm text-gray-600 mt-1">Case volumes, grant rates, top nationalities, and assigned judges for every immigration court.</p>
          </Link>
          <Link href="/judges" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg">⚖️ {judges.length.toLocaleString()} Judges</h3>
            <p className="text-sm text-gray-600 mt-1">Grant rates, removal rates, total decisions, and court assignments for every immigration judge.</p>
          </Link>
          <Link href="/nationalities" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg">🌍 {stats.totalNationalities} Nationalities</h3>
            <p className="text-sm text-gray-600 mt-1">Case counts, outcomes, top courts, and yearly trends for every country of origin.</p>
          </Link>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">About This Data</h2>
        <p>
          All data comes from the Department of Justice Executive Office for Immigration Review (EOIR) —
          the agency that runs U.S. immigration courts. Our dataset covers {stats.totalCases.toLocaleString()} cases
          from 1990 to 2026, including {stats.totalProceedings.toLocaleString()} proceedings,
          {' '}{stats.asylumGranted.toLocaleString()} asylum grants, and {stats.removalOrders.toLocaleString()} removal orders.
        </p>
        <p>
          This data is released monthly through FOIA and is free to access. OpenImmigration processes
          the raw data files and presents them in an accessible format — no login, no paywall, no ads.
        </p>
      </div>
    </div>
  )
}
