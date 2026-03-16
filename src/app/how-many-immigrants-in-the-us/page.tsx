import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Many Immigrants Are in the U.S.? — 46.2 Million Foreign-Born (2024)',
  description: 'There are 46.2 million foreign-born residents in the United States as of 2024. Breakdown by legal status, country of origin, state of residence, and historical trends.',
  alternates: { canonical: 'https://www.openimmigration.us/how-many-immigrants-in-the-us' },
}

/* ── data ────────────────────────────────────────────────────────────── */

const statusBreakdown = [
  { status: 'Naturalized Citizens', count: 23400000, pct: 50.6, color: 'bg-blue-500', description: 'Foreign-born individuals who have become U.S. citizens through naturalization.' },
  { status: 'Lawful Permanent Residents (Green Card)', count: 12400000, pct: 26.8, color: 'bg-green-500', description: 'Non-citizens authorized to live and work permanently in the U.S.' },
  { status: 'Unauthorized Immigrants', count: 10500000, pct: 22.7, color: 'bg-red-500', description: 'Foreign-born residents without legal authorization, including visa overstays and border crossers.' },
  { status: 'Temporary Visa Holders', count: 2300000, pct: 5.0, color: 'bg-purple-500', description: 'Students, temporary workers (H-1B, L-1), and other non-immigrant visa holders.' },
  { status: 'Refugees & Asylees', count: 2600000, pct: 5.6, color: 'bg-yellow-500', description: 'Individuals admitted as refugees or granted asylum, not yet naturalized.' },
]

const topCountries = [
  { country: 'Mexico', flag: '🇲🇽', count: 10700000, pct: 23.2 },
  { country: 'India', flag: '🇮🇳', count: 2800000, pct: 6.1 },
  { country: 'China', flag: '🇨🇳', count: 2500000, pct: 5.4 },
  { country: 'Philippines', flag: '🇵🇭', count: 2100000, pct: 4.5 },
  { country: 'El Salvador', flag: '🇸🇻', count: 1400000, pct: 3.0 },
  { country: 'Vietnam', flag: '🇻🇳', count: 1380000, pct: 3.0 },
  { country: 'Cuba', flag: '🇨🇺', count: 1360000, pct: 2.9 },
  { country: 'Dominican Republic', flag: '🇩🇴', count: 1200000, pct: 2.6 },
  { country: 'Guatemala', flag: '🇬🇹', count: 1100000, pct: 2.4 },
  { country: 'South Korea', flag: '🇰🇷', count: 1050000, pct: 2.3 },
]

const topStates = [
  { state: 'California', count: 10500000, pct: 26.8 },
  { state: 'Texas', count: 5000000, pct: 17.1 },
  { state: 'Florida', count: 4600000, pct: 20.8 },
  { state: 'New York', count: 4500000, pct: 22.6 },
  { state: 'New Jersey', count: 2100000, pct: 22.8 },
  { state: 'Illinois', count: 1800000, pct: 14.2 },
  { state: 'Massachusetts', count: 1200000, pct: 17.2 },
  { state: 'Georgia', count: 1100000, pct: 10.2 },
  { state: 'Virginia', count: 1050000, pct: 12.2 },
  { state: 'Washington', count: 1000000, pct: 13.0 },
]

const historicalTrend = [
  { year: 1970, count: 9600000, pct: 4.7 },
  { year: 1980, count: 14100000, pct: 6.2 },
  { year: 1990, count: 19800000, pct: 7.9 },
  { year: 2000, count: 31100000, pct: 11.1 },
  { year: 2010, count: 40000000, pct: 12.9 },
  { year: 2020, count: 44800000, pct: 13.5 },
  { year: 2024, count: 46200000, pct: 13.9 },
]

const totalForeignBorn = 46200000
const totalPop = 333000000

/* ── page ─────────────────────────────────────────────────────────────── */

export default function HowManyImmigrantsPage() {
  const maxCount = topCountries[0].count

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many immigrants are in the United States?',
        acceptedAnswer: { '@type': 'Answer', text: 'As of 2024, there are approximately 46.2 million foreign-born residents in the United States, making up about 13.9% of the total population.' },
      },
      {
        '@type': 'Question',
        name: 'How many illegal immigrants are in the US?',
        acceptedAnswer: { '@type': 'Answer', text: 'Estimates suggest approximately 10.5 million unauthorized immigrants live in the United States, accounting for about 22.7% of the foreign-born population and 3.2% of the total U.S. population.' },
      },
      {
        '@type': 'Question',
        name: 'What country do most US immigrants come from?',
        acceptedAnswer: { '@type': 'Answer', text: 'Mexico is the largest source country, with approximately 10.7 million Mexican-born residents in the U.S. (23.2% of all foreign-born). India is second with 2.8 million.' },
      },
    ],
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How Many Immigrants in the U.S.?' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">How Many Immigrants Are in the United States?</h1>
      <p className="text-lg text-gray-600 mb-8">
        As of 2024, there are approximately <strong>46.2 million</strong> foreign-born residents in the United States,
        making up <strong>13.9%</strong> of the total population of {(totalPop / 1e6).toFixed(0)} million.
        This includes naturalized citizens, green card holders, temporary visa holders, refugees, and
        unauthorized immigrants.
      </p>

      {/* ── Key Numbers ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">46.2M</div>
          <div className="text-xs text-gray-600">Foreign-Born Residents</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-success">13.9%</div>
          <div className="text-xs text-gray-600">Of Total Population</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-warning">23.4M</div>
          <div className="text-xs text-gray-600">Naturalized Citizens</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">~10.5M</div>
          <div className="text-xs text-gray-600">Unauthorized</div>
        </div>
      </div>

      {/* ── Status Breakdown ────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Breakdown by Legal Status</h2>
      <p className="text-gray-600 mb-4">
        Over half of all foreign-born residents are naturalized U.S. citizens. The unauthorized population
        represents less than a quarter of all immigrants.
      </p>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
        {/* Visual bar */}
        <div className="flex rounded-full overflow-hidden h-8 mb-6">
          {statusBreakdown.map((s, i) => (
            <div key={i} className={`${s.color} relative group`} style={{ width: `${s.pct}%` }} title={`${s.status}: ${s.pct}%`} />
          ))}
        </div>
        <div className="space-y-3">
          {statusBreakdown.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-4 h-4 rounded-full ${s.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{s.status}</span>
                  <span className="font-mono text-sm">{(s.count / 1e6).toFixed(1)}M ({s.pct}%)</span>
                </div>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top Source Countries ─────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top 10 Source Countries</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
        <div className="space-y-3">
          {topCountries.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 text-sm text-gray-500 text-right">{i + 1}</span>
              <span className="text-lg">{c.flag}</span>
              <Link href={`/countries/${c.country.toLowerCase().replace(/\s+/g, '-')}`} className="w-40 text-sm font-medium hover:text-primary transition-colors">
                {c.country}
              </Link>
              <div className="flex-1 bg-gray-100 rounded-full h-4">
                <div className="bg-primary rounded-full h-4" style={{ width: `${Math.round((c.count / maxCount) * 100)}%` }} />
              </div>
              <span className="w-20 text-right text-sm font-mono">{(c.count / 1e6).toFixed(1)}M</span>
              <span className="w-12 text-right text-xs text-gray-500">{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top States ──────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top 10 States by Immigrant Population</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">State</th>
              <th className="px-4 py-3 text-right font-semibold">Foreign-Born</th>
              <th className="px-4 py-3 text-right font-semibold">% of State Pop.</th>
            </tr>
          </thead>
          <tbody>
            {topStates.map((s, i) => (
              <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{s.state}</td>
                <td className="px-4 py-3 text-right font-mono">{(s.count / 1e6).toFixed(1)}M</td>
                <td className="px-4 py-3 text-right">{s.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Historical Trend ────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Historical Trend: Foreign-Born Population</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
        <div className="space-y-3">
          {historicalTrend.map((h) => (
            <div key={h.year} className="flex items-center gap-3">
              <span className="w-12 text-sm font-bold text-gray-700">{h.year}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-5">
                <div className="bg-primary/70 rounded-full h-5" style={{ width: `${Math.round((h.count / totalForeignBorn) * 100)}%` }} />
              </div>
              <span className="w-16 text-right text-sm font-mono">{(h.count / 1e6).toFixed(1)}M</span>
              <span className="w-12 text-right text-xs text-gray-500">{h.pct}%</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          The foreign-born share of the U.S. population peaked at 14.8% in 1890 and hit a low of 4.7% in 1970
          after decades of restrictive quotas. Today&apos;s 13.9% is near the historical high but not unprecedented.
        </p>
      </div>

      {/* ── Editorial ───────────────────────────────────────────────── */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
        <h2 className="font-heading text-xl font-bold mb-2">📊 Putting the Numbers in Context</h2>
        <p className="text-gray-700 mb-3">
          The claim that immigration is at &ldquo;unprecedented levels&rdquo; is only half true. In absolute numbers, yes — 46.2 million
          is the highest ever. But as a share of population (13.9%), we&apos;re still below the 1890 peak of 14.8%.
          America has always been a nation of immigrants, and today is no exception.
        </p>
        <p className="text-gray-700 mb-3">
          More importantly, over <strong>77% of immigrants are here legally</strong>. The unauthorized population (10.5M)
          has been roughly stable since 2008 — the net growth in immigration has been almost entirely through legal channels.
        </p>
        <p className="text-gray-700">
          The libertarian perspective: 46.2 million people chose to come here because the U.S. offers better
          economic opportunities, more freedom, and a better life. That&apos;s not a crisis — that&apos;s the best advertisement
          a country could have.
        </p>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-12">
        {[
          { q: 'How many illegal immigrants are in the US?', a: 'Estimates range from 10–11 million unauthorized immigrants, approximately 3.2% of the total U.S. population. This number has been relatively stable since 2008, as new unauthorized arrivals have been roughly offset by departures, deportations, and legalizations.' },
          { q: 'Are immigrants taking American jobs?', a: 'Economic research consistently shows that immigration grows the overall economy and does not reduce employment for native-born workers in aggregate. Immigrants and native-born workers tend to complement rather than compete with each other. Low-skilled immigrants often fill jobs that native-born workers don\'t want, while high-skilled immigrants create jobs and innovation.' },
          { q: 'Do immigrants pay taxes?', a: 'Yes. Immigrants — including unauthorized immigrants — pay an estimated $492 billion in federal, state, and local taxes annually. Unauthorized immigrants alone pay approximately $11.7 billion in state and local taxes per year, despite being ineligible for most public benefits.' },
          { q: 'What percentage of immigrants are illegal?', a: 'Approximately 22.7% of all foreign-born residents (10.5 million out of 46.2 million) are unauthorized. Over 77% are here through legal channels.' },
          { q: 'How has the immigrant population changed over time?', a: 'The foreign-born population has grown from 9.6 million in 1970 to 46.2 million in 2024. However, as a share of total population, today\'s 13.9% is similar to levels in the late 1800s and early 1900s (peak: 14.8% in 1890).' },
        ].map((faq, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold mb-2">{faq.q}</h3>
            <p className="text-sm text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* ── Sources ──────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h2 className="font-heading text-lg font-bold mb-2">Data Sources</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• U.S. Census Bureau, American Community Survey (2023)</li>
          <li>• Migration Policy Institute tabulations</li>
          <li>• DHS Office of Immigration Statistics</li>
          <li>• Pew Research Center unauthorized immigrant estimates</li>
          <li>• Institute on Taxation and Economic Policy</li>
        </ul>
      </div>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/demographics" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Demographics</h3>
          <p className="text-sm text-gray-600">Detailed demographic breakdown of immigration court respondents.</p>
        </Link>
        <Link href="/nationalities" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Nationalities</h3>
          <p className="text-sm text-gray-600">Court cases by country of origin.</p>
        </Link>
        <Link href="/immigration-by-president" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Immigration by President</h3>
          <p className="text-sm text-gray-600">How immigration numbers differ across administrations.</p>
        </Link>
      </div>
    </div>
  )
}
