import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Green Card Data — I-485 Adjustment of Status Statistics',
  description: 'Green card application data from USCIS — 710,100 pending I-485 applications. Explore processing times, approval rates, and backlogs by state.',
}

export default function GreenCardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Green Card Data' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Green Card Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        As of June 2025, there are <strong>710,100</strong> pending I-485 (Adjustment of Status) applications —
        the form used to apply for a green card from within the United States.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">710,100</div>
          <div className="text-sm text-gray-600 mt-1">Pending I-485 Applications</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">524,900</div>
          <div className="text-sm text-gray-600 mt-1">Pending Family Petitions (I-130)</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">103,500</div>
          <div className="text-sm text-gray-600 mt-1">Pending Employment Petitions (I-140)</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Green Card Pipeline</h2>
        <p>
          Getting a green card (permanent residence) typically involves multiple steps, each with its own
          backlog and processing time:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>I-130 (Family) or I-140 (Employment):</strong> The initial petition that establishes
          eligibility. Family petitions have 524,900 pending; employment petitions have 103,500.</li>
          <li><strong>Visa availability:</strong> For most categories, there&apos;s a wait for a visa number
          to become available (the &quot;priority date&quot; system). Some categories have multi-year waits.</li>
          <li><strong>I-485 (Adjustment of Status):</strong> The actual green card application, filed once
          a visa is available. 710,100 are currently pending.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Processing Delays</h2>
        <p>
          Green card processing times vary enormously by category, country of birth, and processing center.
          Employment-based applicants from India and China face some of the longest waits — decades in some
          categories — due to per-country limits on green card issuance.
        </p>
        <p>
          Detailed I-485 processing data by state is available in our USCIS dataset.
        </p>
      </div>
    </div>
  )
}
