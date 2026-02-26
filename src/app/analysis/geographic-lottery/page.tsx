import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Geographic Lottery — Grant Rates: New York 21% vs Houston 0.8%',
  description: 'Immigration court outcomes vary dramatically by location. New York grants asylum at 21% while Houston grants at 0.8%. Where your case is heard can determine your fate.',
}

interface Court { code: string; name: string; slug: string; city: string; state: string; cases: number; completed: number; grants: number; grantRate: number | null; removals: number }

export default function GeographicLotteryPage() {
  const courts: Court[] = loadData('court-index.json')
  const stats = loadData('stats.json')
  const qualified = courts.filter(c => c.grantRate != null && (c.completed || 0) > 1000)
  const highest = [...qualified].sort((a, b) => (b.grantRate || 0) - (a.grantRate || 0)).slice(0, 10)
  const lowest = [...qualified].sort((a, b) => (a.grantRate || 0) - (b.grantRate || 0)).slice(0, 10)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Geographic Lottery' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Courts</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Geographic Lottery</h1>
      <p className="text-lg text-gray-600 mb-8">
        Across {stats.totalCourts} immigration courts, grant rates range from {lowest[0]?.grantRate}% to {highest[0]?.grantRate}%.
        Where your case is heard can matter more than the merits of your claim.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Extremes</h2>
        <p>
          An asylum seeker in <Link href={`/courts/${highest[0]?.slug}`} className="text-primary hover:underline">{titleCase(highest[0]?.city)}</Link> faces
          a system where {highest[0]?.grantRate}% of completed cases result in relief. The same person in{' '}
          <Link href={`/courts/${lowest[0]?.slug}`} className="text-primary hover:underline">{titleCase(lowest[0]?.city)}, {lowest[0]?.state}</Link> faces
          a {lowest[0]?.grantRate}% grant rate. Same law. Same standard of proof. A {((highest[0]?.grantRate || 0) / Math.max(0.1, lowest[0]?.grantRate || 0.1)).toFixed(0)}x difference in outcomes.
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Highest Grant Rate Courts (1,000+ completed)</h3>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Court</th>
                <th className="px-3 py-2 text-right font-semibold">Cases</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Grants</th>
              </tr>
            </thead>
            <tbody>
              {highest.map(c => (
                <tr key={c.code} className="border-t border-gray-100">
                  <td className="px-3 py-2"><Link href={`/courts/${c.slug}`} className="text-primary hover:underline font-medium">{titleCase(c.city)}, {c.state}</Link></td>
                  <td className="px-3 py-2 text-right">{c.cases.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-green-600 font-bold">{c.grantRate}%</td>
                  <td className="px-3 py-2 text-right">{(c.grants || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Lowest Grant Rate Courts (1,000+ completed)</h3>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Court</th>
                <th className="px-3 py-2 text-right font-semibold">Cases</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Removals</th>
              </tr>
            </thead>
            <tbody>
              {lowest.map(c => (
                <tr key={c.code} className="border-t border-gray-100">
                  <td className="px-3 py-2"><Link href={`/courts/${c.slug}`} className="text-primary hover:underline font-medium">{titleCase(c.city)}, {c.state}</Link></td>
                  <td className="px-3 py-2 text-right">{c.cases.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-red-600 font-bold">{c.grantRate}%</td>
                  <td className="px-3 py-2 text-right">{(c.removals || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Location Matters</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Judge pools differ:</strong> Courts with more grant-friendly judges naturally produce higher grant rates.</li>
          <li><strong>Case composition varies:</strong> Border courts handle more expedited removal cases; interior courts handle more affirmative asylum.</li>
          <li><strong>Access to attorneys:</strong> Major metros have more pro bono legal organizations; rural/border courts have severe attorney shortages.</li>
          <li><strong>Local legal culture:</strong> Judges in the same courthouse influence each other&apos;s norms over time.</li>
        </ul>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Texas vs. New York Divide</h3>
              <p className="text-sm text-amber-800">
                Texas courts consistently rank among the lowest grant rates (Houston: {lowest.find(c => c.state === 'TX')?.grantRate}%),
                while New York courts rank among the highest ({highest[0]?.grantRate}%). This isn&apos;t just about judges — it reflects
                fundamentally different legal ecosystems, attorney access, and case processing cultures.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ All {stats.totalCourts} Courts</h3>
          <p className="text-sm text-gray-600 mt-1">Compare grant rates across every immigration court.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">How attorney access drives outcome disparities.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'The Geographic Lottery — Immigration Court Grant Rates by Location', url: 'https://www.openimmigration.us/analysis/geographic-lottery', publisher: { '@type': 'Organization', name: 'OpenImmigration' } }) }} />
    </div>
  )
}
