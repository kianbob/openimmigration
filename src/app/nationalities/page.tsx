import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Immigration Cases by Nationality',
  description: 'Explore U.S. immigration court cases by country of origin — case volumes, outcomes, asylum grant rates, and deportation orders by nationality.',
}

const TOP_NATIONALITIES = [
  { name: 'Mexico', code: 'MX', deported: 33830, note: 'Top deported nationality FY2026' },
  { name: 'Guatemala', code: 'GT', deported: 19169 },
  { name: 'Honduras', code: 'HN', deported: 18746 },
  { name: 'Venezuela', code: 'VE', deported: 14679 },
  { name: 'Colombia', code: 'CO', deported: 9328 },
  { name: 'El Salvador', code: 'SV', deported: 0 },
  { name: 'Cuba', code: 'CU', deported: 0 },
  { name: 'Haiti', code: 'HT', deported: 0 },
  { name: 'Ecuador', code: 'EC', deported: 0 },
  { name: 'Nicaragua', code: 'NI', deported: 0 },
  { name: 'China', code: 'CN', deported: 0 },
  { name: 'India', code: 'IN', deported: 0 },
  { name: 'Brazil', code: 'BR', deported: 0 },
  { name: 'Dominican Republic', code: 'DO', deported: 0 },
  { name: 'Jamaica', code: 'JM', deported: 0 },
]

export default function NationalitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'By Nationality' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Cases by Nationality</h1>
      <p className="text-lg text-gray-600 mb-8">
        Where immigrants in U.S. immigration courts come from — and how outcomes differ by country of origin.
        In FY2026, Mexico leads deportation orders followed by Guatemala, Honduras, Venezuela, and Colombia.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Nationality</th>
              <th className="px-4 py-3 text-left font-semibold">Code</th>
              <th className="px-4 py-3 text-right font-semibold">FY2026 Deportation Orders</th>
            </tr>
          </thead>
          <tbody>
            {TOP_NATIONALITIES.map(nat => (
              <tr key={nat.code} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{nat.name}</td>
                <td className="px-4 py-3 text-gray-500">{nat.code}</td>
                <td className="px-4 py-3 text-right">
                  {nat.deported > 0 ? nat.deported.toLocaleString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Full nationality data with case outcomes, asylum grant rates, and historical trends will be available once EOIR case data processing is complete.
      </p>
    </div>
  )
}
