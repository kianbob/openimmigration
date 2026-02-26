import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How U.S. Immigration Court Works — A Complete Guide',
  description: 'A complete guide to the U.S. immigration court system — how cases are filed, who the judges are, what happens at hearings, and possible outcomes.',
}

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How Immigration Court Works' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">How U.S. Immigration Court Works</h1>
      <p className="text-lg text-gray-600 mb-8">
        A complete guide to the U.S. immigration court system — from how cases start to how they end.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          U.S. immigration courts are part of the <strong>Executive Office for Immigration Review (EOIR)</strong>,
          a division of the Department of Justice. They are not part of the federal judicial system — they are
          administrative courts, which means different rules apply.
        </p>
        <p>
          There are currently <strong>88 immigration courts</strong> across the United States, staffed by
          over <strong>1,400 immigration judges</strong>. These courts handle all removal proceedings —
          cases where the government seeks to deport someone from the country.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Step 1: Notice to Appear (NTA)</h2>
        <p>
          Immigration court cases begin when the Department of Homeland Security (DHS) issues a
          <strong> Notice to Appear (NTA)</strong> to an immigrant. The NTA specifies the charges — the
          immigration violations alleged. Common triggers include:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Apprehension at the border</li>
          <li>Visa overstay detected</li>
          <li>Criminal conviction making someone deportable</li>
          <li>Asylum application after arriving in the U.S.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Step 2: Master Calendar Hearing</h2>
        <p>
          The first hearing is usually a short &quot;master calendar&quot; hearing where the judge:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Confirms the immigrant&apos;s identity and address</li>
          <li>Reads the charges</li>
          <li>Asks if the immigrant has a lawyer</li>
          <li>Sets a date for the next hearing</li>
        </ul>
        <p>
          These hearings are often very short (5-10 minutes) and may be done by video from detention facilities.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Step 3: Individual (Merits) Hearing</h2>
        <p>
          The merits hearing is where the actual case is decided. The immigrant (or their attorney) presents
          evidence and testimony. The DHS trial attorney argues for deportation. The judge makes a decision.
        </p>
        <p>
          For asylum cases, this is where the applicant tells their story of persecution, presents supporting
          evidence, and is cross-examined by the government attorney. The judge then makes a credibility
          determination and applies the legal standards.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Step 4: Decision</h2>
        <p>Possible outcomes include:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Removal order:</strong> The immigrant is ordered deported</li>
          <li><strong>Voluntary departure:</strong> The immigrant agrees to leave voluntarily</li>
          <li><strong>Asylum granted:</strong> The immigrant is allowed to stay as an asylee</li>
          <li><strong>Other relief:</strong> Cancellation of removal, withholding of removal, or other forms of protection</li>
          <li><strong>Termination:</strong> The case is closed without a removal order</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Step 5: Appeal</h2>
        <p>
          Either side can appeal to the <strong>Board of Immigration Appeals (BIA)</strong>. If the BIA
          upholds the decision, the immigrant can petition for review in a federal circuit court.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Key Differences from Criminal Court</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <ul className="text-sm text-amber-800 space-y-2">
            <li>→ <strong>No right to a lawyer:</strong> The government doesn&apos;t provide one</li>
            <li>→ <strong>No jury:</strong> A single judge decides everything</li>
            <li>→ <strong>Lower standard of proof:</strong> &quot;Clear and convincing evidence&quot; vs. &quot;beyond reasonable doubt&quot;</li>
            <li>→ <strong>Not Article III courts:</strong> Judges are DOJ employees, not independent</li>
            <li>→ <strong>Civil proceedings:</strong> Despite life-altering consequences</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ Explore Courts</h3>
          <p className="text-sm text-gray-600 mt-1">All 88 immigration courts.</p>
        </Link>
        <Link href="/judges" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Statistics</h3>
          <p className="text-sm text-gray-600 mt-1">How judges decide cases.</p>
        </Link>
        <Link href="/faq" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">❓ FAQ</h3>
          <p className="text-sm text-gray-600 mt-1">Common questions answered.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How does immigration court work?',
              acceptedAnswer: { '@type': 'Answer', text: 'Immigration court cases begin with a Notice to Appear (NTA) from DHS. The case goes through a master calendar hearing, then a merits hearing where the judge decides the outcome. Possible outcomes include removal order, voluntary departure, asylum grant, or other relief. Either side can appeal to the Board of Immigration Appeals.' },
            },
            {
              '@type': 'Question',
              name: 'Is immigration court the same as criminal court?',
              acceptedAnswer: { '@type': 'Answer', text: 'No. Immigration courts are administrative courts within the DOJ, not part of the federal judicial system. Key differences: no right to a government-provided lawyer, no jury, lower burden of proof, and judges are DOJ employees rather than independent Article III judges.' },
            },
          ],
        })
      }} />
    </div>
  )
}
