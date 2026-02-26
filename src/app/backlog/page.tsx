import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Immigration Court Backlog — 3.3 Million Pending Cases',
  description: 'Track the U.S. immigration court backlog — over 3.3 million pending cases as of December 2025. See which courts are most backlogged, wait times, and trends.',
}

const BACKLOG_DATA = {
  total: 3377998,
  asylumPending: 2339623,
  topCounties: [
    { name: 'Miami-Dade County, FL', count: 147232 },
    { name: 'Cook County, IL', count: 112299 },
    { name: 'Queens County, NY', count: 105635 },
    { name: 'Los Angeles County, CA', count: 103128 },
    { name: 'Kings County, NY', count: 82990 },
  ],
  historicalBacklog: [
    { year: 2010, cases: 262000 },
    { year: 2011, cases: 297000 },
    { year: 2012, cases: 327000 },
    { year: 2013, cases: 360000 },
    { year: 2014, cases: 416000 },
    { year: 2015, cases: 457000 },
    { year: 2016, cases: 521000 },
    { year: 2017, cases: 629000 },
    { year: 2018, cases: 809000 },
    { year: 2019, cases: 1090000 },
    { year: 2020, cases: 1290000 },
    { year: 2021, cases: 1500000 },
    { year: 2022, cases: 1900000 },
    { year: 2023, cases: 2500000 },
    { year: 2024, cases: 3600000 },
    { year: 2025, cases: 3378000 },
  ],
}

export default function BacklogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Court Backlog' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Court Backlog</h1>
      <p className="text-lg text-gray-600 mb-8">
        As of December 2025, <strong>{BACKLOG_DATA.total.toLocaleString()}</strong> cases are pending before U.S. immigration courts.
        Of these, <strong>{BACKLOG_DATA.asylumPending.toLocaleString()}</strong> immigrants are awaiting asylum hearings.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">{(BACKLOG_DATA.total / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Total Pending Cases</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">{(BACKLOG_DATA.asylumPending / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Awaiting Asylum Hearings</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-warning">1,192%</div>
          <div className="text-sm text-gray-600 mt-1">Growth Since 2010</div>
        </div>
      </div>

      {/* Historical Growth */}
      <h2 className="font-heading text-2xl font-bold mb-4">Backlog Growth Over Time</h2>
      <p className="text-gray-600 mb-4">
        The immigration court backlog has grown from 262,000 cases in 2010 to over 3.3 million in 2025 — a 
        nearly 13x increase. The sharpest growth occurred from 2021 to 2024, driven by record border crossings
        and new case filings that far outpaced the court system&apos;s capacity.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Year</th>
              <th className="px-4 py-3 text-right font-semibold">Pending Cases</th>
              <th className="px-4 py-3 text-right font-semibold">Year-over-Year Change</th>
            </tr>
          </thead>
          <tbody>
            {BACKLOG_DATA.historicalBacklog.map((row, i) => {
              const prev = i > 0 ? BACKLOG_DATA.historicalBacklog[i - 1].cases : null
              const change = prev ? ((row.cases - prev) / prev * 100).toFixed(1) : null
              return (
                <tr key={row.year} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{row.year}</td>
                  <td className="px-4 py-2 text-right">{row.cases.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    {change ? (
                      <span className={Number(change) > 0 ? 'text-danger' : 'text-success'}>
                        {Number(change) > 0 ? '+' : ''}{change}%
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Top Counties */}
      <h2 className="font-heading text-2xl font-bold mb-4">Most Backlogged Counties</h2>
      <p className="text-gray-600 mb-4">
        Immigration cases cluster heavily in a few metropolitan areas. Miami-Dade County leads with
        over 147,000 pending cases as of December 2025.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {BACKLOG_DATA.topCounties.map((county, i) => (
          <div key={county.name} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-sm text-gray-500 mb-1">#{i + 1}</div>
            <div className="font-bold text-lg">{county.name}</div>
            <div className="text-primary text-2xl font-bold mt-1">{county.count.toLocaleString()}</div>
            <div className="text-xs text-gray-500">pending cases</div>
          </div>
        ))}
      </div>

      {/* Context */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>→ The backlog peaked at ~4.18 million before EOIR&apos;s closure push in 2025</li>
              <li>→ In FY2026 (through Dec 2025), courts closed 193,858 cases — but received 130,642 new ones</li>
              <li>→ 2.3 million pending cases involve asylum applications — 69% of the total backlog</li>
              <li>→ Average wait time exceeds 4 years in many courts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many immigration court cases are pending?',
              acceptedAnswer: { '@type': 'Answer', text: 'As of December 2025, there are 3,377,998 pending cases before U.S. immigration courts, of which 2,339,623 involve asylum applications.' },
            },
            {
              '@type': 'Question',
              name: 'Why is the immigration court backlog so large?',
              acceptedAnswer: { '@type': 'Answer', text: 'The backlog has grown due to record levels of new cases filed (driven by border migration), insufficient numbers of immigration judges, and systemic inefficiencies. New case filings consistently outpace completions.' },
            },
            {
              '@type': 'Question',
              name: 'How long does an immigration court case take?',
              acceptedAnswer: { '@type': 'Answer', text: 'Average wait times exceed 4 years in many immigration courts, though this varies significantly by court location and case type.' },
            },
          ],
        })
      }} />
    </div>
  )
}
