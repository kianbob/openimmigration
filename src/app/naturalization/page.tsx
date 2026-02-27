import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'U.S. Naturalization Data — 998,700 Pending Citizenship Applications',
  description: 'Nearly 1 million N-400 naturalization applications pending. Explore citizenship data — processing times, backlogs, requirements, and trends.',
  alternates: { canonical: 'https://www.openimmigration.us/naturalization' },
}

export default function NaturalizationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Naturalization' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Naturalization Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        Nearly <strong>1 million</strong> N-400 applications for U.S. citizenship are pending as of June 2025.
        Naturalization is the final step in the journey from immigrant to citizen — and the backlog means
        hundreds of thousands are waiting months or years for that step.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">998,700</div>
          <div className="text-sm text-gray-600 mt-1">Pending N-400 Applications</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-amber-700">6-12 mo</div>
          <div className="text-sm text-gray-600 mt-1">Typical Processing Time</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-700">171</div>
          <div className="text-sm text-gray-600 mt-1">USCIS Field Offices</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Path to Citizenship</h2>
        <p>
          Naturalization requires permanent residency (green card) for at least 5 years (3 if married to
          a U.S. citizen), continuous physical presence, good moral character, and passing English and civics tests.
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900">The Application Process</h3>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
          {[
            { step: '1', title: 'File N-400', desc: 'Submit application with $725 fee (or fee waiver)' },
            { step: '2', title: 'Biometrics', desc: 'Fingerprints and background check at USCIS office' },
            { step: '3', title: 'Interview', desc: 'In-person civics & English tests + case review' },
            { step: '4', title: 'Oath', desc: 'Take the Oath of Allegiance at a ceremony' },
          ].map(s => (
            <div key={s.step} className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary mb-1">{s.step}</div>
              <div className="font-bold text-sm">{s.title}</div>
              <div className="text-xs text-gray-600 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Backlog Problem</h2>
        <p>
          With 998,700 pending applications, naturalization has the largest single-form backlog in the
          USCIS system. This means eligible permanent residents — many of whom have lived in the U.S.
          for decades — are waiting 6-18 months to become citizens. In some offices, waits exceed 2 years.
        </p>
        <p>
          The consequences are real: pending applicants can&apos;t vote, can&apos;t run for office, face
          restrictions on government employment, and can still be placed in removal proceedings if they
          commit certain offenses.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why It Matters for Courts</h2>
        <p>
          Naturalization and immigration courts are connected: citizens can&apos;t be deported. Every person
          who naturalizes is permanently removed from the deportation pipeline. The naturalization backlog
          means hundreds of thousands of people who <em>could</em> be citizens remain in a more precarious
          legal status — green card holders who can still lose their status for certain criminal convictions.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Civics Test</h3>
              <p className="text-sm text-amber-800">
                Applicants must answer 6 out of 10 civics questions correctly (from a pool of 100).
                Questions cover American history, government structure, and civic principles.
                The pass rate exceeds 90% — the English language requirement is a bigger barrier
                for many applicants.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Why This Data Matters</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Nearly 1 million people are waiting to become U.S. citizens. These are permanent residents who have met the residency requirements, passed background checks, and filed their applications — they&apos;re simply waiting for USCIS to process them. During that wait, they cannot vote, face restrictions on government employment, and remain vulnerable to deportation if they commit certain offenses.
          </p>
          <p>
            The naturalization backlog has real democratic consequences. In election years, processing delays can prevent hundreds of thousands of eligible people from voting. Studies show that naturalized citizens are among the most engaged voters, so delays in processing directly affect civic participation and political representation in immigrant communities.
          </p>
          <p>
            For the immigration court system, naturalization is the ultimate exit: citizens cannot be deported. Every person who naturalizes is permanently removed from the deportation pipeline. The backlog means hundreds of thousands remain in a more precarious legal status longer than necessary — green card holders who could be citizens but are stuck waiting.
          </p>
        </div>
      </section>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/green-card" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">💳 Green Card Data</h3>
          <p className="text-sm text-gray-600 mt-1">710,100 pending I-485 applications for permanent residence.</p>
        </Link>
        <Link href="/uscis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📋 USCIS Overview</h3>
          <p className="text-sm text-gray-600 mt-1">5.4 million total applications in the USCIS backlog.</p>
        </Link>
        <Link href="/daca" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🎓 DACA Recipients</h3>
          <p className="text-sm text-gray-600 mt-1">515,570 Dreamers — protected but can&apos;t naturalize.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Source: USCIS Quarterly Backlog Report. Data current through February 2026.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
