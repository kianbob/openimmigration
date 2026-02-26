import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Asylum Cases — Grant Rates, Denials & Trends',
  description: 'Explore U.S. asylum case data — grant rates, denial rates, and how outcomes vary by court, judge, and nationality. 2.3 million pending asylum cases as of 2025.',
}

const ASYLUM_STATS = {
  pendingAsylum: 2339623,
  grantedDec2025: 701,
  totalCompletedDec: 57531,
  grantRateOfRelief: 48.2,
  reliefGrantedDec: 1455,
  topNationalities: [
    { name: 'Mexico', deported: 33830 },
    { name: 'Guatemala', deported: 19169 },
    { name: 'Honduras', deported: 18746 },
    { name: 'Venezuela', deported: 14679 },
    { name: 'Colombia', deported: 9328 },
  ],
}

export default function AsylumPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Asylum Cases' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Asylum Cases</h1>
      <p className="text-lg text-gray-600 mb-8">
        Over <strong>{ASYLUM_STATS.pendingAsylum.toLocaleString()}</strong> immigrants are currently awaiting asylum
        hearings in U.S. immigration courts — about 69% of the entire court backlog.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">2.3M</div>
          <div className="text-sm text-gray-600 mt-1">Pending Asylum Cases</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">78.5%</div>
          <div className="text-sm text-gray-600 mt-1">Deportation Rate (FY2026)</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-success">701</div>
          <div className="text-sm text-gray-600 mt-1">Asylum Grants (Dec 2025)</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-warning">26.7%</div>
          <div className="text-sm text-gray-600 mt-1">Had Legal Representation</div>
        </div>
      </div>

      {/* How Asylum Works */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">How Asylum Works in Immigration Court</h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Asylum is a form of protection that allows individuals who meet the definition of a &quot;refugee&quot; to
            remain in the United States. To qualify, an applicant must demonstrate that they have suffered persecution
            or have a well-founded fear of persecution based on race, religion, nationality, membership in a particular
            social group, or political opinion.
          </p>
          <p>
            Most asylum cases in immigration court are &quot;defensive&quot; asylum claims — filed by individuals who are
            already in removal proceedings. The immigration judge hears the case and decides whether to grant asylum,
            another form of relief, or order deportation.
          </p>
        </div>
      </section>

      {/* December 2025 Outcomes */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">December 2025 Case Outcomes</h2>
        <p className="text-gray-600 mb-4">
          Out of {ASYLUM_STATS.totalCompletedDec.toLocaleString()} cases completed in December 2025:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Removal Orders', value: '38,215', pct: '66.4%', color: 'danger' },
            { label: 'Voluntary Departure', value: '7,359', pct: '12.8%', color: 'warning' },
            { label: 'Other Can Stay', value: '10,502', pct: '18.3%', color: 'primary' },
            { label: 'Granted Relief', value: '1,455', pct: '2.5%', color: 'success' },
          ].map(item => (
            <div key={item.label} className={`bg-${item.color}/5 border border-${item.color}/20 rounded-xl p-5`}>
              <div className={`text-2xl font-bold text-${item.color}`}>{item.value}</div>
              <div className="text-sm text-gray-600 mt-1">{item.label} ({item.pct})</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Nationalities Deported */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Top Nationalities Ordered Deported (FY2026)</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Nationality</th>
                <th className="px-4 py-3 text-right font-semibold">Deportation Orders</th>
              </tr>
            </thead>
            <tbody>
              {ASYLUM_STATS.topNationalities.map(nat => (
                <tr key={nat.name} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{nat.name}</td>
                  <td className="px-4 py-3 text-right">{nat.deported.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Issues */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Key Issues in Asylum Adjudication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/analysis/judge-variation" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">Judge Variation</h3>
            <p className="text-sm text-gray-600">Asylum grant rates vary dramatically by judge — some grant 90%+, others deny 90%+.</p>
          </Link>
          <Link href="/analysis/representation-gap" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">Representation Gap</h3>
            <p className="text-sm text-gray-600">Only 26.7% of immigrants had lawyers when deportation was ordered. Representation dramatically changes outcomes.</p>
          </Link>
          <Link href="/analysis/geographic-lottery" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">Geographic Lottery</h3>
            <p className="text-sm text-gray-600">Where your case is heard matters enormously — grant rates vary wildly between courts.</p>
          </Link>
          <Link href="/backlog" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">The Backlog</h3>
            <p className="text-sm text-gray-600">2.3 million asylum applicants are waiting for hearings — some for 4+ years.</p>
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many asylum cases are pending in U.S. immigration courts?',
              acceptedAnswer: { '@type': 'Answer', text: 'As of December 2025, 2,339,623 immigrants are awaiting asylum hearings in U.S. immigration courts, representing about 69% of the total court backlog.' },
            },
            {
              '@type': 'Question',
              name: 'What percentage of asylum cases are granted?',
              acceptedAnswer: { '@type': 'Answer', text: 'In December 2025, out of 1,455 cases where relief was granted, asylum was granted in 701 cases (48.2% of relief grants). However, overall only about 2.5% of completed cases resulted in relief.' },
            },
            {
              '@type': 'Question',
              name: 'What is the deportation rate in immigration court?',
              acceptedAnswer: { '@type': 'Answer', text: 'In FY2026 through December 2025, immigration judges ordered deportation (removal orders plus voluntary departure) in 78.5% of completed cases.' },
            },
          ],
        })
      }} />
    </div>
  )
}
