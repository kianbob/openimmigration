import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Green Card Data — 710,100 Pending Applications for Permanent Residence',
  description: 'Green card (I-485) data — 710,100 pending adjustment of status applications. Plus 524,900 family petitions (I-130) and 103,500 employment petitions (I-140).',
  alternates: { canonical: 'https://www.openimmigration.us/green-card' },
}

const PIPELINE = [
  { form: 'I-130', name: 'Family Petition', pending: 524900, desc: 'Petition for Alien Relative — the first step for family-based immigration' },
  { form: 'I-140', name: 'Employment Petition', pending: 103500, desc: 'Immigrant Petition for Alien Workers — employer-sponsored green cards' },
  { form: 'I-485', name: 'Adjustment of Status', pending: 710100, desc: 'The actual green card application — filed once a visa number is available' },
  { form: 'I-751', name: 'Remove Conditions', pending: 168500, desc: 'Remove conditions on 2-year conditional green cards (marriage-based)' },
  { form: 'I-601A', name: 'Provisional Waiver', pending: 67500, desc: 'Waiver for unlawful presence — allows consular processing without a 10-year bar' },
  { form: 'I-129F', name: 'Fiancé(e) Visa', pending: 14700, desc: 'K-1 visa petition to bring a fiancé(e) to the U.S. for marriage' },
]

export default function GreenCardPage() {
  const totalPipeline = PIPELINE.reduce((s, p) => s + p.pending, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Green Card Data' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Green Card Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        As of June 2025, <strong>710,100</strong> I-485 adjustment of status applications are pending — each one
        a person waiting for permanent residence. The total green card pipeline (including petitions and waivers)
        exceeds {(totalPipeline / 1e6).toFixed(1)} million applications.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">710,100</div>
          <div className="text-sm text-gray-600 mt-1">Pending I-485 (Green Card)</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-amber-700">524,900</div>
          <div className="text-sm text-gray-600 mt-1">Pending Family Petitions</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-700">103,500</div>
          <div className="text-sm text-gray-600 mt-1">Pending Employment Petitions</div>
        </div>
      </div>

      {/* Pipeline table */}
      <h2 className="font-heading text-2xl font-bold mb-4">The Green Card Pipeline</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Form</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-right font-semibold">Pending</th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {PIPELINE.map(p => (
              <tr key={p.form} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono font-bold text-primary">{p.form}</td>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-right font-bold">{p.pending.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{p.desc}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
              <td className="px-4 py-3" colSpan={2}>Total Pipeline</td>
              <td className="px-4 py-3 text-right">{totalPipeline.toLocaleString()}</td>
              <td className="px-4 py-3 hidden md:table-cell"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">How It Works</h2>
        <p>
          Getting a green card typically requires multiple steps, each with its own form, processing time, and backlog:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Petition (I-130 or I-140):</strong> A U.S. citizen, permanent resident, or employer files a petition establishing the relationship or job offer.</li>
          <li><strong>Wait for visa number:</strong> Certain categories have annual caps. Some waits exceed 20 years (e.g., siblings of U.S. citizens from the Philippines).</li>
          <li><strong>Adjustment of status (I-485):</strong> Once a visa number is available, the immigrant files for permanent residence — either at a USCIS office in the U.S. or at a consulate abroad.</li>
          <li><strong>Green card issued:</strong> If approved, the immigrant receives conditional (2-year) or unconditional (10-year) permanent residence.</li>
        </ol>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Court Connection</h2>
        <p>
          Green card applicants generally aren&apos;t in immigration court — they&apos;re in the USCIS administrative
          process. But the systems overlap: someone in removal proceedings can apply for adjustment of status
          as a form of relief, and a green card holder who commits certain crimes can be placed into removal proceedings.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Visa Bulletin</h3>
              <p className="text-sm text-amber-800">
                The State Department publishes a monthly &quot;Visa Bulletin&quot; showing which priority dates are
                current for each category and country. For some family categories from high-demand countries
                (Mexico, Philippines, India), the wait can exceed 20 years. Employment-based EB-2 and EB-3
                for Indian nationals currently face 10+ year waits.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Why This Data Matters</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            The green card pipeline represents over 1.5 million people waiting for permanent residence in the United States. Each pending application is a person in legal limbo — authorized to be here but without the stability that comes with permanent status. Processing delays mean years of uncertainty, restricted job mobility, and vulnerability to policy changes.
          </p>
          <p>
            The 710,100 pending I-485 applications are particularly significant because these are people who have already been approved in principle — their visa petition was granted, their number became current — and they&apos;re simply waiting for USCIS to process the final paperwork. For employment-based applicants from India, the combination of per-country caps and processing backlogs can mean 10-20+ years of waiting even after employer sponsorship.
          </p>
          <p>
            Green card backlogs also affect the immigration court system. People stuck in processing limbo may fall out of status, triggering removal proceedings. And green card holders who face deportation for criminal convictions often have stronger defenses than non-residents — making the path to permanent residence a critical factor in court outcomes.
          </p>
        </div>
      </section>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/naturalization" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🇺🇸 Naturalization</h3>
          <p className="text-sm text-gray-600 mt-1">998,700 pending citizenship applications — the next step after green card.</p>
        </Link>
        <Link href="/uscis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📋 USCIS Overview</h3>
          <p className="text-sm text-gray-600 mt-1">5.4 million total applications across all USCIS forms.</p>
        </Link>
        <Link href="/backlog" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📈 Court Backlog</h3>
          <p className="text-sm text-gray-600 mt-1">1.9 million cases pending in immigration courts.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Source: USCIS Quarterly Backlog Report, Department of State Visa Bulletin. Data current through February 2026.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
