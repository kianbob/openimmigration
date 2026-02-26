import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

function loadNatDetail(slug: string) {
  const fp = path.join(process.cwd(), 'public', 'data', 'nationalities', `${slug}.json`)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, 'utf8'))
}

export const metadata: Metadata = {
  title: 'Asylum Outcomes by Nationality — 260 Countries Compared',
  description: 'How asylum grant rates differ by country of origin. Mexico leads with 2.3 million cases. Compare outcomes across 260 nationalities.',
}

interface NatEntry { code: string; name: string; slug: string; cases: number }

export default function AsylumByNationalityPage() {
  const nats: NatEntry[] = loadData('nationality-index.json')
  const stats = loadData('stats.json')

  // Load detail files for top 15 to get grant rates
  const top15 = nats.slice(0, 15).map(n => {
    const detail = loadNatDetail(n.slug)
    return { ...n, grantRate: detail?.grantRate, grants: detail?.grants || 0, completed: detail?.completed || 0, removals: detail?.removals || 0 }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Asylum by Nationality' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Nationalities</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Asylum Outcomes by Nationality</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.totalNationalities} nationalities appear in U.S. immigration court data. The top 10 countries
        account for the vast majority of cases, with Mexico alone at {nats[0]?.cases.toLocaleString()}.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Top 15 Nationalities with Outcomes</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">#</th>
                <th className="px-3 py-2 text-left font-semibold">Nationality</th>
                <th className="px-3 py-2 text-right font-semibold">Total Cases</th>
                <th className="px-3 py-2 text-right font-semibold">Completed</th>
                <th className="px-3 py-2 text-right font-semibold">Grants</th>
                <th className="px-3 py-2 text-right font-semibold">Grant Rate</th>
              </tr>
            </thead>
            <tbody>
              {top15.map((n, i) => (
                <tr key={n.code} className="border-t border-gray-100">
                  <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-3 py-2"><Link href={`/nationalities/${n.slug}`} className="text-primary hover:underline font-medium">{titleCase(n.name)}</Link></td>
                  <td className="px-3 py-2 text-right">{n.cases.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{n.completed.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{n.grants.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">
                    {n.grantRate != null ? (
                      <span className={n.grantRate >= 15 ? 'text-green-600 font-bold' : n.grantRate >= 8 ? 'text-yellow-600' : 'text-red-600'}>
                        {n.grantRate}%
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Central American Dominance</h2>
        <p>
          Four countries — Mexico, Guatemala, Honduras, and El Salvador — account for over 5 million of the
          {' '}{stats.totalCases.toLocaleString()} total cases. These are overwhelmingly removal proceedings
          (not affirmative asylum), reflecting decades of migration from the Northern Triangle and Mexico.
        </p>
        <p>
          The recent surge from Venezuela (620,933 cases), Cuba (455,427), Colombia (388,565), and Nicaragua
          (304,795) reflects the shifting geography of migration since 2021.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Grant Rate Variation</h2>
        <p>
          Grant rates vary enormously by nationality. This reflects multiple factors: the nature of claims
          (political persecution vs. gang violence vs. economic migration), country conditions documentation
          available, representation rates, and which courts handle each nationality&apos;s cases.
        </p>
        <p>
          Nationalities from countries with well-documented persecution (China, certain African nations) tend
          to have higher grant rates. Nationalities from Central American countries, where claims often involve
          gang violence that courts have historically been reluctant to classify as persecution, tend to have
          lower grant rates.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Pattern</h3>
              <p className="text-sm text-amber-800">
                High case volume doesn&apos;t correlate with high grant rates. Mexico has 2.3 million cases but
                a relatively low grant rate, while countries with fewer cases but stronger persecution claims
                may see much higher grant rates. Explore individual nationality pages for detailed breakdowns.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/nationalities" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌍 All {stats.totalNationalities} Nationalities</h3>
          <p className="text-sm text-gray-600 mt-1">Browse and search all nationalities with case data.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📍 Geographic Lottery</h3>
          <p className="text-sm text-gray-600 mt-1">How court location compounds nationality-based disparities.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'Asylum Outcomes by Nationality — 260 Countries Compared', url: 'https://www.openimmigration.us/analysis/asylum-by-nationality', publisher: { '@type': 'Organization', name: 'OpenImmigration' } }) }} />
    </div>
  )
}
