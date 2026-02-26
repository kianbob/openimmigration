import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
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
  title: 'Asylum by Nationality — How Your Country of Origin Shapes Your Fate',
  description: 'Immigration court outcomes vary dramatically by nationality. Mexico: 2.3M cases. Venezuela: 620K cases. Compare asylum grant rates across 260 countries.',
}

interface NatEntry { code: string; name: string; slug: string; cases: number }

export default function AsylumByNationalityPage() {
  const nats: NatEntry[] = loadData('nationality-index.json')
  const stats = loadData('stats.json')
  const languages = loadData('languages.json')

  const top20 = nats.slice(0, 20).map(n => {
    const detail = loadNatDetail(n.slug)
    return { ...n, grantRate: detail?.grantRate, grants: detail?.grants || 0, completed: detail?.completed || 0, removals: detail?.removals || 0 }
  })

  // Group by region
  const centralAm = ['Mexico', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua'].map(name =>
    top20.find(n => titleCase(n.name) === name)).filter(Boolean)
  const southAm = ['Venezuela', 'Colombia', 'Ecuador', 'Brazil', 'Peru'].map(name =>
    top20.find(n => titleCase(n.name) === name)).filter(Boolean)
  const caribbean = ['Cuba', 'Haiti', 'Dominican Republic', 'Jamaica'].map(name =>
    top20.find(n => titleCase(n.name) === name)).filter(Boolean)

  const centralAmCases = centralAm.reduce((s, n) => s + (n?.cases || 0), 0)
  const southAmCases = southAm.reduce((s, n) => s + (n?.cases || 0), 0)
  const caribbeanCases = caribbean.reduce((s, n) => s + (n?.cases || 0), 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Asylum by Nationality' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Nationalities</div>
      <h1 className="font-heading text-4xl font-bold mb-4">How Your Country of Origin Shapes Your Fate</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.totalNationalities} nationalities appear across {stats.totalCases.toLocaleString()} immigration court cases.
        But 10 countries account for the vast majority — and your nationality correlates strongly with your odds.
      </p>

      {/* Regional breakdown cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 not-prose">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(centralAmCases / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Mexico + Central America</div>
          <div className="text-xs text-gray-400">{((centralAmCases / stats.totalCases) * 100).toFixed(0)}% of all cases</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{(southAmCases / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">South America</div>
          <div className="text-xs text-gray-400">{((southAmCases / stats.totalCases) * 100).toFixed(0)}% of all cases</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-blue-700">{(caribbeanCases / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Caribbean</div>
          <div className="text-xs text-gray-400">{((caribbeanCases / stats.totalCases) * 100).toFixed(0)}% of all cases</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Top 20 Nationalities</h2>
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
              {top20.map((n, i) => (
                <tr key={n.code} className={`border-t border-gray-100 ${i < 5 ? 'bg-gray-50/50' : ''}`}>
                  <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-3 py-2"><Link href={`/nationalities/${n.slug}`} className="text-primary hover:underline font-medium">{titleCase(n.name)}</Link></td>
                  <td className="px-3 py-2 text-right">{n.cases.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{n.completed.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{n.grants.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">
                    {n.grantRate != null ? (
                      <span className={`font-bold ${n.grantRate >= 15 ? 'text-green-600' : n.grantRate >= 8 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {n.grantRate}%
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Mexico Dominance</h2>
        <p>
          Mexico alone accounts for {nats[0]?.cases.toLocaleString()} cases — <strong>{((nats[0]?.cases / stats.totalCases) * 100).toFixed(1)}%
          of all immigration court cases</strong>. This reflects decades of proximity-based migration, border enforcement
          patterns, and the sheer volume of apprehensions along the U.S.-Mexico border.
        </p>
        <p>
          But Mexico&apos;s grant rate tells a different story. Many Mexican respondents are in removal proceedings
          not for asylum but for unlawful entry or overstay — case types with very low relief rates. The grant rate
          for Mexican nationals is significantly lower than for countries where asylum claims dominate.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The New Wave: 2021-2025</h2>
        <p>
          The composition of immigration court cases shifted dramatically starting in 2021. Traditional sources
          (Mexico, Guatemala, Honduras, El Salvador) were joined — and in some courts surpassed — by new flows:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Venezuela ({nats.find(n => titleCase(n.name) === 'Venezuela')?.cases.toLocaleString()} cases):</strong> Economic collapse under Maduro drove massive emigration. Venezuelan cases surged from near-zero pre-2019 to one of the largest nationalities in court.</li>
          <li><strong>Cuba ({nats.find(n => titleCase(n.name) === 'Cuba')?.cases.toLocaleString()} cases):</strong> The end of &quot;wet foot, dry foot&quot; and economic deterioration created a new wave of Cuban migrants facing removal proceedings for the first time.</li>
          <li><strong>Colombia ({nats.find(n => titleCase(n.name) === 'Colombia')?.cases.toLocaleString()} cases):</strong> Violence related to FARC dissident groups and economic instability pushed new migration.</li>
          <li><strong>Nicaragua ({nats.find(n => titleCase(n.name) === 'Nicaragua')?.cases.toLocaleString()} cases):</strong> Political crackdown under Ortega drove dissidents and ordinary citizens to flee.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Grant Rates Differ</h2>
        <p>
          The variation in grant rates by nationality isn&apos;t arbitrary. Several factors drive it:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">📋 Type of Claim</div>
            <p className="text-sm text-gray-600">
              Chinese nationals often file political persecution claims with specific, documentable evidence.
              Central American nationals more often cite gang violence — which courts have historically been
              reluctant to classify as &quot;persecution&quot; under asylum law, though recent precedents are evolving.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">📊 Country Conditions</div>
            <p className="text-sm text-gray-600">
              Courts rely on State Department reports and expert testimony about conditions in each country.
              Well-documented authoritarian regimes (China, Russia, certain African nations) produce stronger
              documentary evidence than countries where violence is diffuse and non-governmental.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">👔 Representation Rates</div>
            <p className="text-sm text-gray-600">
              Some nationalities have stronger community networks and better access to lawyers. Chinese communities
              in NYC, for example, have extensive legal aid infrastructure. Newly-arriving Venezuelans often don&apos;t.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">📍 Court Assignment</div>
            <p className="text-sm text-gray-600">
              Nationalities cluster geographically. Haitians disproportionately appear in Miami and Florida courts.
              Central Americans in Texas border courts. Where you end up — and therefore which judges hear your
              case — correlates strongly with your nationality.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Language Connection</h2>
        <p>
          Nationality correlates with language, and language affects outcomes. Spanish speakers
          ({(5765640 + 1387313).toLocaleString()} cases) benefit from a large interpreter pool — courts can
          almost always find a Spanish interpreter. But speakers of indigenous Central American languages
          face severe barriers:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Mam:</strong> {languages.find((l: { code: string }) => l.code === 'MAM')?.count.toLocaleString()} cases — a Mayan language from Guatemala. Finding qualified interpreters is extremely difficult.</li>
          <li><strong>K&apos;iche&apos; (Quiche):</strong> {languages.find((l: { code: string }) => l.code === 'QUI')?.count.toLocaleString()} cases — another Mayan language. Court proceedings may use a chain interpretation: K&apos;iche&apos; → Spanish → English.</li>
          <li><strong>Konjobal:</strong> {languages.find((l: { code: string }) => l.code === 'KON')?.count.toLocaleString()} cases — often confused with other Mayan languages, leading to wrong interpreters.</li>
        </ul>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Fundamental Question</h3>
              <p className="text-sm text-amber-800">
                If the legal standard for asylum is the same for everyone — a well-founded fear of persecution based
                on race, religion, nationality, political opinion, or membership in a particular social group — why
                do outcomes vary so dramatically by nationality? The data suggests that nationality acts as a proxy
                for a bundle of structural factors: case type, evidence quality, attorney access, court assignment,
                and language barriers. Your passport doesn&apos;t determine your legal rights — but it profoundly
                shapes your practical odds.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/nationalities" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌍 All {stats.totalNationalities} Nationalities</h3>
          <p className="text-sm text-gray-600 mt-1">Browse and search case data for every country.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📍 Geographic Lottery</h3>
          <p className="text-sm text-gray-600 mt-1">How court location compounds nationality disparities.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Community networks determine attorney access.</p>
        </Link>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/asylum-by-nationality" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Asylum by Nationality — How Country of Origin Shapes Immigration Outcomes',
        url: 'https://www.openimmigration.us/analysis/asylum-by-nationality',
        publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
      }) }} />
    </div>
  )
}
