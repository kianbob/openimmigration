import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Backlog Crisis — How 3.3 Million Cases Piled Up',
  description: 'The U.S. immigration court backlog grew from 200,000 to 3.3 million cases in 15 years. Here\'s how it happened and why it keeps getting worse.',
}

export default function BacklogCrisisPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Backlog Crisis' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">System Analysis</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Backlog Crisis</h1>
      <p className="text-lg text-gray-600 mb-8">
        How the U.S. immigration court system accumulated 3.3 million pending cases — and why throwing more judges at the problem hasn&apos;t worked.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Numbers</h2>
        <p>
          In 2010, the immigration court backlog stood at about <strong>262,000 cases</strong>. By the end of
          FY2024, it had reached <strong>3.6 million</strong> — a nearly <strong>14x increase</strong>. Even after
          an aggressive closure push in 2025 that reduced the backlog to 3.38 million, the system remains
          overwhelmed.
        </p>
        <p>
          To put this in perspective: at December 2025&apos;s closure rate of ~57,000 cases per month, it would take
          <strong> approximately 5 years</strong> to clear the existing backlog — assuming zero new cases were filed.
          But new cases keep coming: 130,642 were filed in just the first three months of FY2026.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">How We Got Here</h2>
        <p>
          The backlog is the result of a fundamental mismatch: <strong>the number of cases entering the system
          consistently exceeds the system&apos;s capacity to resolve them</strong>.
        </p>
        <p>Several factors drove the explosive growth:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Record border crossings (2021-2024):</strong> Unprecedented levels of migration at the southern
            border generated millions of new removal proceedings. Each apprehension that results in a Notice to Appear
            adds a case to the immigration court docket.
          </li>
          <li>
            <strong>Insufficient judge capacity:</strong> Despite hiring pushes, the number of immigration judges (~600)
            hasn&apos;t kept pace with caseload growth. Each judge carries an average caseload of over 5,000 cases.
          </li>
          <li>
            <strong>Asylum processing delays:</strong> Asylum cases are among the most complex and time-consuming.
            With 2.3 million pending asylum cases, these dominate the backlog.
          </li>
          <li>
            <strong>Continuances and adjournments:</strong> Cases are frequently rescheduled — sometimes multiple times
            over years — due to attorney requests, missing documents, or judicial scheduling.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Human Cost</h2>
        <p>
          Behind every number is a person waiting. Immigrants in the backlog face years of legal limbo —
          unable to get resolution on their cases, often unable to work legally, separated from family members,
          and living with the constant uncertainty of potential deportation.
        </p>
        <p>
          For asylum seekers, the wait is particularly cruel. Someone fleeing persecution who filed an asylum
          claim in 2021 may not get a hearing until 2026 or beyond. During that wait, they may face restrictions
          on employment, travel, and basic stability.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The 2025 Closure Push</h2>
        <p>
          In 2025, EOIR implemented aggressive case closure strategies that reduced the backlog from its peak
          of 4.18 million to under 3.75 million. This included:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Increased in absentia removal orders (deporting people who don&apos;t appear)</li>
          <li>Expedited proceedings for certain case types</li>
          <li>Administrative closures and case terminations</li>
        </ul>
        <p>
          Critics argue that speed has come at the cost of due process — that rushing through cases means
          legitimate asylum claims are being denied without adequate review.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What the Data Shows</h2>
        <p>
          The numbers tell a clear story: the immigration court system is structurally incapable of handling
          its current caseload. More judges help at the margins, but the fundamental mismatch between inflow
          and capacity remains.
        </p>
      </div>

      {/* Related */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Court Backlog Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore the backlog numbers by court, county, and year.</p>
        </Link>
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Variation</h3>
          <p className="text-sm text-gray-600 mt-1">How judges decide cases differently — and what it means.</p>
        </Link>
      </div>
    </div>
  )
}
