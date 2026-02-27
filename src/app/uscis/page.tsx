import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'USCIS Immigration Data — Applications, Backlogs & Processing',
  description: 'Explore USCIS immigration data — 5.4 million application backlog, green card processing, work permits, naturalization, and visa petitions.',
  alternates: { canonical: 'https://www.openimmigration.us/uscis' },
}

const BACKLOG_DATA = [
  { form: 'I-130', desc: 'Petition for Alien Relative (Immediate)', backlog: 524900 },
  { form: 'I-751', desc: 'Remove Conditions on Residence', backlog: 168500 },
  { form: 'I-485', desc: 'Adjustment of Status (Green Card)', backlog: 710100 },
  { form: 'I-140', desc: 'Employment-Based Immigrant Petition', backlog: 103500 },
  { form: 'I-765', desc: 'Employment Authorization (Work Permit)', backlog: 718400 },
  { form: 'N-400', desc: 'Application for Naturalization', backlog: 998700 },
  { form: 'I-129F', desc: 'Fiancé(e) Visa Petition', backlog: 14700 },
  { form: 'I-601A', desc: 'Provisional Unlawful Presence Waiver', backlog: 67500 },
  { form: 'I-129', desc: 'Nonimmigrant Worker Petition', backlog: 19400 },
  { form: 'I-539', desc: 'Extension/Change of Status', backlog: 486100 },
]

export default function USCISPage() {
  const totalBacklog = 5408000

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'USCIS Data' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">USCIS Immigration Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        Beyond the immigration courts, USCIS processes millions of immigration applications each year.
        As of June 2025, USCIS has a backlog of <strong>{totalBacklog.toLocaleString()}</strong> applications.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">5.4M</div>
          <div className="text-sm text-gray-600 mt-1">USCIS Application Backlog</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">515,570</div>
          <div className="text-sm text-gray-600 mt-1">Active DACA Recipients</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-warning">998,700</div>
          <div className="text-sm text-gray-600 mt-1">Pending Naturalization Apps</div>
        </div>
      </div>

      {/* Backlog Table */}
      <h2 className="font-heading text-2xl font-bold mb-4">Application Backlog by Form Type</h2>
      <p className="text-gray-600 mb-4">As of June 30, 2025. Source: USCIS Net Backlog Report.</p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Form</th>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-right font-semibold">Net Backlog</th>
            </tr>
          </thead>
          <tbody>
            {BACKLOG_DATA.sort((a, b) => b.backlog - a.backlog).map(row => (
              <tr key={row.form + row.desc} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-primary">{row.form}</td>
                <td className="px-4 py-2 text-gray-600">{row.desc}</td>
                <td className="px-4 py-2 text-right font-bold">{row.backlog.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
              <td className="px-4 py-3" colSpan={2}>TOTAL</td>
              <td className="px-4 py-3 text-right">{totalBacklog.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Why This Data Matters</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            USCIS processes the legal immigration system — green cards, work permits, citizenship, and family petitions. The 5.4 million application backlog means millions of people who are following the legal process are stuck waiting months or years for decisions. This isn&apos;t about illegal immigration; these are people doing exactly what the system asks, and the system can&apos;t keep up.
          </p>
          <p>
            The backlog has cascading effects. Delayed work permits mean people can&apos;t legally work while waiting. Delayed green cards mean people remain in precarious visa status. Delayed naturalization means eligible permanent residents can&apos;t vote or access the full protections of citizenship. Each delay creates vulnerability — and some of those vulnerabilities lead to immigration court.
          </p>
          <p>
            Understanding the USCIS backlog is essential context for the immigration court crisis. The two systems are deeply interconnected: USCIS processing delays can push people out of status and into removal proceedings, while immigration court backlogs can delay USCIS applications that require court clearance. Fixing one without addressing the other is incomplete.
          </p>
        </div>
      </section>

      {/* Related */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/daca" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🛡️ DACA Recipients</h3>
          <p className="text-sm text-gray-600 mt-1">515,570 active recipients by state and country.</p>
        </Link>
        <Link href="/green-card" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🪪 Green Card Data</h3>
          <p className="text-sm text-gray-600 mt-1">I-485 adjustment of status processing data.</p>
        </Link>
        <Link href="/naturalization" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🇺🇸 Naturalization</h3>
          <p className="text-sm text-gray-600 mt-1">N-400 citizenship application data.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Source: USCIS Quarterly Backlog Report, USCIS Immigration and Citizenship Data. Data current through February 2026.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the USCIS backlog?',
              acceptedAnswer: { '@type': 'Answer', text: 'As of June 2025, USCIS has a net backlog of 5,408,000 pending immigration applications. The largest categories are naturalization (998,700), work permits (718,400), green cards (710,100), and family petitions (524,900).' },
            },
            {
              '@type': 'Question',
              name: 'How many DACA recipients are there?',
              acceptedAnswer: { '@type': 'Answer', text: 'As of June 2025, there are 515,570 active DACA recipients. About 81% (419,070) are from Mexico. The program protects certain immigrants who arrived as children from deportation and provides work authorization.' },
            },
          ],
        })
      }} />
    </div>
  )
}
