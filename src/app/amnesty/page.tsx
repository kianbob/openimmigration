import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Immigration Amnesty Cases — EOIR Amnesty Statistics',
  description: 'Explore immigration amnesty case data — how many cases are being resolved through amnesty programs, by state and presidential term.',
}

export default function AmnestyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Amnesty Cases' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Amnesty Cases</h1>
      <p className="text-lg text-gray-600 mb-8">
        EOIR tracks amnesty-related immigration court cases separately. These cases involve immigrants
        who may qualify for legal status under various amnesty or legalization programs.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Are Amnesty Cases?</h2>
        <p>
          In the immigration court context, &quot;amnesty cases&quot; refer to cases where the government is seeking
          to terminate or revoke an immigrant&apos;s previously granted status. EOIR began tracking these separately
          in 2021, reflecting increased enforcement focus.
        </p>
        <p>
          EOIR publishes amnesty case data broken down by year (2021-2025), by state/location, and by
          presidential term. This data is available in their published statistics.
        </p>
        <p>
          Detailed amnesty case data from the EOIR case database will be available once our data processing
          is complete.
        </p>
      </div>
    </div>
  )
}
