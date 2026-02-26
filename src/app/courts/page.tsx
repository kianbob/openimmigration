import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Immigration Courts — All 68 U.S. Immigration Courts',
  description: 'Explore case volumes, backlogs, outcomes, and judge statistics for all 68 U.S. immigration courts. Data from DOJ EOIR.',
}

// Will be populated from processed EOIR data
const COURTS = [
  { name: 'Miami, FL', slug: 'miami', pending: 317000, state: 'FL' },
  { name: 'New York City, NY', slug: 'new-york-city', pending: 240000, state: 'NY' },
  { name: 'Orlando, FL', slug: 'orlando', pending: 227000, state: 'FL' },
  { name: 'Dallas, TX', slug: 'dallas', pending: 220000, state: 'TX' },
  { name: 'Los Angeles, CA', slug: 'los-angeles', pending: 0, state: 'CA' },
  { name: 'Houston, TX', slug: 'houston', pending: 0, state: 'TX' },
  { name: 'Chicago, IL', slug: 'chicago', pending: 0, state: 'IL' },
  { name: 'San Francisco, CA', slug: 'san-francisco', pending: 0, state: 'CA' },
  { name: 'Atlanta, GA', slug: 'atlanta', pending: 0, state: 'GA' },
  { name: 'Boston, MA', slug: 'boston', pending: 0, state: 'MA' },
  { name: 'Denver, CO', slug: 'denver', pending: 0, state: 'CO' },
  { name: 'Seattle, WA', slug: 'seattle', pending: 0, state: 'WA' },
  { name: 'Newark, NJ', slug: 'newark', pending: 0, state: 'NJ' },
  { name: 'San Antonio, TX', slug: 'san-antonio', pending: 0, state: 'TX' },
  { name: 'El Paso, TX', slug: 'el-paso', pending: 0, state: 'TX' },
  { name: 'Baltimore, MD', slug: 'baltimore', pending: 0, state: 'MD' },
  { name: 'Detroit, MI', slug: 'detroit', pending: 0, state: 'MI' },
  { name: 'Phoenix, AZ', slug: 'phoenix', pending: 0, state: 'AZ' },
]

export default function CourtsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Immigration Courts' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Immigration Courts</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. has 68 immigration courts operated by the Executive Office for Immigration Review (EOIR)
        within the Department of Justice. Explore case volumes, outcomes, and backlogs for each court.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Court</th>
              <th className="px-4 py-3 text-left font-semibold">State</th>
              <th className="px-4 py-3 text-right font-semibold">Pending Cases</th>
            </tr>
          </thead>
          <tbody>
            {COURTS.map(court => (
              <tr key={court.slug} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/courts/${court.slug}`} className="text-primary hover:underline font-medium">
                    {court.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{court.state}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {court.pending > 0 ? court.pending.toLocaleString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Full court data with outcomes, judge counts, and historical trends will be available once EOIR case data processing is complete.
      </p>
    </div>
  )
}
