import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Search Immigration Court Data',
  description: 'Search and filter U.S. immigration court data by court, nationality, year, case type, judge, and more.',
}

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Search Immigration Court Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        Search and filter immigration court data by court location, nationality, year, case type, and more.
        Full search functionality coming soon once data processing is complete.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h2 className="font-heading text-xl font-bold mb-2">Search Coming Soon</h2>
        <p className="text-gray-600">
          We&apos;re processing millions of EOIR case records. Full search with filters for court, nationality,
          judge, case type, year, and outcome will be available shortly.
        </p>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-bold mb-2">What you&apos;ll be able to search:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Cases by immigration court location</li>
          <li>Cases by country of origin / nationality</li>
          <li>Cases by immigration judge</li>
          <li>Cases by case type (removal, deportation, asylum)</li>
          <li>Cases by year filed or decided</li>
          <li>Cases by outcome (granted, denied, deported)</li>
          <li>Cases by state of residence</li>
        </ul>
      </div>
    </div>
  )
}
