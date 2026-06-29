import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'ICE Deportations by Nationality FY2020-2026 — Removals by Country of Origin',
  description: 'ICE removal (deportation) data by nationality FY2020-2026. Mexico leads with 122,000 removals in FY2025. Deportation trends for 15 countries from FOIA data.',
  alternates: { canonical: 'https://www.openimmigration.us/enforcement/deportations' },
}

export default function DeportationsPage() {
  const removalData = loadData('ice-removals.json')
  const enforcementData = loadData('ice-enforcement.json')
  const nationalities = removalData.byNationality
  const totals = removalData.totalsByYear

  const maxFy2025 = Math.max(...nationalities.map((n: { fy2025: number }) => n.fy2025))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'ICE Enforcement', href: '/enforcement' },
        { label: 'Deportations by Nationality' },
      ]} />

      <h1 className="font-heading text-4xl font-bold mb-4">ICE Deportations by Country of Origin</h1>
      <p className="text-lg text-gray-600 mb-8">
        The United States deported <strong>{totals.fy2025.toLocaleString()} people</strong> in FY2025, the
        highest number since FY2014. Mexico receives by far the most deportees, followed by the Northern
        Triangle countries (Guatemala, Honduras, El Salvador). This page uses FOIA-obtained data from the{' '}
        <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Deportation Data Project
        </a>{' '}
        to show who gets deported and where they go.
      </p>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{totals.fy2025.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">FY2025 Removals</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">15</div>
          <div className="text-sm text-gray-600 mt-1">Top Nationalities</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">38%</div>
          <div className="text-sm text-gray-600 mt-1">Mexico&apos;s Share</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">{totals.fy2026_fytd.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">FY2026 FYTD</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Mexico dominates</strong> — 38% of all FY2025 deportees were Mexican nationals, reflecting proximity and the scale of unauthorized Mexican immigration</div>
              <div>• <strong>Venezuela deportations exploded</strong> — from just 900 in FY2020 to 10,000 in FY2025, a 1,000%+ increase as the migration crisis from Venezuela grew</div>
              <div>• <strong>Northern Triangle still dominant</strong> — Guatemala, Honduras, and El Salvador combined account for another 37% of removals</div>
              <div>• <strong>Receiving country cooperation matters</strong> — some countries refuse or limit deportation flights, constraining removal numbers regardless of U.S. policy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart - CSS */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-6">FY2025 Deportations by Nationality</h2>
        <div className="space-y-3">
          {nationalities.sort((a: { fy2025: number }, b: { fy2025: number }) => b.fy2025 - a.fy2025).map((n: { nationality: string; fy2025: number }) => (
            <div key={n.nationality} className="flex items-center gap-3">
              <div className="w-36 text-sm font-medium text-right flex-shrink-0">{n.nationality}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                  style={{ width: `${(n.fy2025 / maxFy2025 * 100).toFixed(1)}%`, minWidth: '60px' }}
                >
                  {n.fy2025.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-4">Deportation Trends: FY2020 vs FY2025</h2>
        <p className="text-sm text-gray-500 mb-6">How removals changed for each nationality over five years</p>
        <div className="space-y-4">
          {nationalities.slice(0, 10).map((n: { nationality: string; fy2020: number; fy2025: number }) => {
            const change = ((n.fy2025 / n.fy2020 - 1) * 100).toFixed(0)
            return (
              <div key={n.nationality} className="flex items-center gap-4">
                <div className="w-36 text-sm font-medium text-right flex-shrink-0">{n.nationality}</div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="text-sm text-gray-500 w-20 text-right">{n.fy2020.toLocaleString()}</div>
                  <div className="text-gray-300">→</div>
                  <div className="text-sm font-semibold w-20">{n.fy2025.toLocaleString()}</div>
                  <span className={`text-sm font-medium ${Number(change) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {Number(change) > 0 ? '+' : ''}{change}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">ICE Removals by Nationality — Full Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Nationality</th>
                <th className="px-4 py-3 font-semibold text-right">FY2020</th>
                <th className="px-4 py-3 font-semibold text-right">FY2021</th>
                <th className="px-4 py-3 font-semibold text-right">FY2022</th>
                <th className="px-4 py-3 font-semibold text-right">FY2023</th>
                <th className="px-4 py-3 font-semibold text-right">FY2024</th>
                <th className="px-4 py-3 font-semibold text-right">FY2025</th>
                <th className="px-4 py-3 font-semibold text-right">FY26 FYTD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {nationalities.sort((a: { fy2025: number }, b: { fy2025: number }) => b.fy2025 - a.fy2025).map((n: { nationality: string; fy2020: number; fy2021: number; fy2022: number; fy2023: number; fy2024: number; fy2025: number; fy2026_fytd: number }, i: number) => (
                <tr key={n.nationality} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">
                    <Link href={`/nationalities/${n.nationality.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-primary hover:underline">
                      {n.nationality}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">{n.fy2020.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{n.fy2021.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{n.fy2022.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{n.fy2023.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{n.fy2024.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold">{n.fy2025.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{n.fy2026_fytd.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis */}
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Geography of Deportation</h2>
        <p>
          Deportation isn&apos;t just a legal process — it&apos;s a logistics operation. ICE must coordinate with
          receiving countries, arrange flights (often charter flights costing $10,000+ per flight hour), process
          travel documents, and physically transport individuals across borders. The countries that receive the
          most deportees are overwhelmingly in Latin America, reflecting both proximity and the composition of
          the unauthorized population.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Mexico: The Dominant Destination</h2>
        <p>
          Mexico receives more deportees than any other country — 122,000 in FY2025 alone. This reflects Mexico&apos;s
          geographic proximity (many removals are conducted via bus at the border rather than by air), the large
          Mexican-born unauthorized population (~5.4 million, roughly half of the total), and Mexico&apos;s general
          cooperation with U.S. deportation operations. Mexican nationals can also be &quot;returned&quot; through
          voluntary departure, which is faster and cheaper than formal removal.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Venezuela Challenge</h2>
        <p>
          Venezuelan deportations skyrocketed from 900 in FY2020 to 10,000 in FY2025 — a 1,000%+ increase that
          mirrors the massive Venezuelan migration surge. However, deportation to Venezuela has been complicated
          by the Maduro government&apos;s on-again, off-again acceptance of deportation flights. At various points,
          Venezuela has refused to accept deportees, forcing ICE to hold Venezuelan nationals in prolonged
          detention or release them. The diplomatic relationship directly constrains how many people can be deported,
          regardless of how many removal orders exist.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Country Cooperation Matters</h2>
        <p>
          The U.S. cannot deport someone without the receiving country&apos;s cooperation. Countries must accept
          their nationals and issue travel documents. Some countries — historically including Cuba, China, and
          at times Venezuela — have limited or refused cooperation, creating a &quot;recalcitrant country&quot;
          problem. When ICE cannot deport someone within 180 days of a final order, they may be released under
          supervision per the Supreme Court&apos;s <em>Zadvydas v. Davis</em> ruling, creating a population of
          people with deportation orders who cannot actually be deported.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Removals vs. Court Orders</h2>
        <p>
          The immigration court system issues hundreds of thousands of removal orders, but actual deportations
          are a subset of those orders. Many individuals with removal orders are never located by ICE, some
          have pending appeals, others are from countries that won&apos;t accept them, and ICE&apos;s limited
          resources mean prioritization decisions about who actually gets put on a plane. The gap between
          orders and removals is the enforcement capacity problem at the heart of the immigration debate.
        </p>
      </div>

      {/* Related pages */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 ICE Enforcement Overview</h3>
          <p className="text-sm text-gray-600 mt-1">Removals, returns, and enforcement trends FY2014-2026.</p>
        </Link>
        <Link href="/enforcement/arrests" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚔 Arrests by State</h3>
          <p className="text-sm text-gray-600 mt-1">Where ICE makes the most arrests — field office breakdown.</p>
        </Link>
        <Link href="/enforcement/detention" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏢 Detention Facilities</h3>
          <p className="text-sm text-gray-600 mt-1">238 facilities, 46,200 daily population, $3.2B annual cost.</p>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/nationalities" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">🌍 Immigration Court Cases by Nationality</h4>
          <p className="text-xs text-gray-600 mt-1">Court-level data for 260 nationalities.</p>
        </Link>
        <Link href="/deportation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">⚖️ Court Deportation Orders</h4>
          <p className="text-xs text-gray-600 mt-1">Removal orders issued by immigration judges.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: ICE ERO annual reports, DHS Yearbook of Immigration Statistics, FOIA data processed by{' '}
        <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
          Deportation Data Project
        </a>. Data current through March 2026.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many people did the U.S. deport in FY2025?',
              acceptedAnswer: { '@type': 'Answer', text: `The U.S. removed (deported) ${totals.fy2025.toLocaleString()} people in FY2025, the highest number since FY2014.` },
            },
            {
              '@type': 'Question',
              name: 'Which country receives the most deportees from the U.S.?',
              acceptedAnswer: { '@type': 'Answer', text: 'Mexico receives the most deportees, with approximately 122,000 removals in FY2025, accounting for 38% of all U.S. deportations.' },
            },
            {
              '@type': 'Question',
              name: 'Can the U.S. deport people to any country?',
              acceptedAnswer: { '@type': 'Answer', text: 'No. Deportation requires the receiving country\'s cooperation. Some countries have limited or refused to accept deportees, constraining U.S. removal capacity regardless of court orders.' },
            },
          ],
        })
      }} />
    </div>
  )
}
