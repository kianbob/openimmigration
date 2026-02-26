import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'U.S. Naturalization Data — Citizenship Application Statistics',
  description: 'U.S. naturalization data — 998,700 pending N-400 applications. Explore citizenship application trends, processing times, and approval rates.',
}

export default function NaturalizationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Naturalization' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Naturalization Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        Nearly <strong>1 million</strong> N-400 applications for U.S. citizenship are pending as of June 2025.
        Naturalization is the final step in the immigration journey from visa holder to permanent resident to citizen.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">998,700</div>
          <div className="text-sm text-gray-600 mt-1">Pending N-400 Applications</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">171</div>
          <div className="text-sm text-gray-600 mt-1">USCIS Field Offices Processing</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Path to Citizenship</h2>
        <p>
          To naturalize, a permanent resident (green card holder) must generally have held their green card
          for at least 5 years (3 years if married to a U.S. citizen), demonstrate continuous residence,
          pass English and civics tests, and show good moral character.
        </p>
        <p>
          The N-400 application process includes biometrics, an interview, the civics and English tests,
          and finally the oath ceremony. Processing times currently range from 6-12 months in most offices,
          though backlogs are significantly longer in some locations.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Naturalization Backlog</h2>
        <p>
          With nearly 1 million pending applications, the naturalization backlog is the largest single
          category in the USCIS backlog. This means hundreds of thousands of eligible permanent residents
          are waiting months or years to become citizens — affecting their ability to vote, travel freely,
          and petition for family members.
        </p>
      </div>
    </div>
  )
}
