import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

/* ── types ───────────────────────────────────────────────────────────── */

interface CountryProfile {
  slug: string
  name: string
  code: string
  flag: string
  region: string
  totalImmigrants: number
  foreignBornPct: number
  courtCases: number
  removalOrders: number
  asylumApps: number
  asylumGrantRate: number
  deportations: number
  visaIssuances2023: number
  topVisaTypes: string[]
  greenCardWaitYears: number
  diversityLotteryEligible: boolean
  overview: string
  keyFacts: string[]
}

interface ProfilesData {
  lastUpdated: string
  source: string
  countries: CountryProfile[]
}

/* ── data loading ────────────────────────────────────────────────────── */

function loadProfiles(): ProfilesData {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'country-profiles.json'), 'utf8')
  return JSON.parse(raw)
}

/* ── static params ───────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const data = loadProfiles()
  return data.countries.map((c) => ({ slug: c.slug }))
}

/* ── metadata ────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = loadProfiles()
  const country = data.countries.find((c) => c.slug === slug)
  if (!country) return { title: 'Country Not Found' }

  return {
    title: `${country.name} Immigration to the U.S. — Data & Statistics`,
    description: `Immigration data for ${country.name}: ${country.totalImmigrants.toLocaleString()} immigrants, ${country.courtCases.toLocaleString()} court cases, ${country.asylumGrantRate}% asylum grant rate, ${country.greenCardWaitYears}-year green card wait.`,
    alternates: { canonical: `https://www.openimmigration.us/countries/${slug}` },
  }
}

/* ── helper ──────────────────────────────────────────────────────────── */

function StatCard({ label, value, sub, color = 'primary' }: { label: string; value: string; sub?: string; color?: string }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/5 border-primary/20 text-primary',
    danger: 'bg-danger/5 border-danger/20 text-danger',
    success: 'bg-success/5 border-success/20 text-success',
    warning: 'bg-warning/5 border-warning/20 text-warning',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
  }
  const cls = colorMap[color] || colorMap.primary
  return (
    <div className={`${cls.split(' ').slice(0, 2).join(' ')} border rounded-xl p-4 text-center`}>
      <div className={`text-xl font-bold ${cls.split(' ')[2]}`}>{value}</div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}

/* ── page ─────────────────────────────────────────────────────────────── */

export default async function CountryProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = loadProfiles()
  const country = data.countries.find((c) => c.slug === slug)

  if (!country) notFound()

  const allCountries = data.countries
  const rank = allCountries.sort((a, b) => b.courtCases - a.courtCases).findIndex((c) => c.slug === slug) + 1

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${country.name} Immigration to the U.S.`,
    description: country.overview,
    url: `https://www.openimmigration.us/countries/${slug}`,
    publisher: { '@type': 'Organization', name: 'OpenImmigration' },
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Countries', href: '/deportation-by-country' },
        { label: country.name },
      ]} />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-6xl">{country.flag}</span>
        <div>
          <h1 className="font-heading text-4xl font-bold">{country.name}</h1>
          <p className="text-gray-500">{country.region} · Rank #{rank} by court cases · Code: {country.code}</p>
        </div>
      </div>

      <p className="text-lg text-gray-600 mb-8">{country.overview}</p>

      {/* ── Key Stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        <StatCard label="Total Immigrants" value={country.totalImmigrants >= 1000000 ? `${(country.totalImmigrants / 1000000).toFixed(1)}M` : `${(country.totalImmigrants / 1000).toFixed(0)}K`} sub={`${country.foreignBornPct}% of foreign-born`} color="primary" />
        <StatCard label="Court Cases" value={country.courtCases.toLocaleString()} sub={`Rank #${rank}`} color="warning" />
        <StatCard label="Removal Orders" value={country.removalOrders.toLocaleString()} color="danger" />
        <StatCard label="Asylum Grant Rate" value={`${country.asylumGrantRate}%`} sub={`${country.asylumApps.toLocaleString()} applied`} color="success" />
        <StatCard label="Green Card Wait" value={`${country.greenCardWaitYears} yrs`} sub={country.diversityLotteryEligible ? 'DV lottery eligible' : 'Not DV eligible'} color="purple" />
      </div>

      {/* ── Key Facts ───────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Key Facts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        {country.keyFacts.map((fact, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
            <span className="text-primary font-bold">•</span>
            <span className="text-sm text-gray-700">{fact}</span>
          </div>
        ))}
      </div>

      {/* ── Detailed Statistics ──────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Detailed Immigration Statistics</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-700">Total Immigrants in U.S.</td>
              <td className="px-4 py-3 text-right font-mono">{country.totalImmigrants.toLocaleString()}</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Share of Foreign-Born Population</td>
              <td className="px-4 py-3 text-right">{country.foreignBornPct}%</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-700">Immigration Court Cases</td>
              <td className="px-4 py-3 text-right font-mono">{country.courtCases.toLocaleString()}</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Removal Orders Issued</td>
              <td className="px-4 py-3 text-right font-mono">{country.removalOrders.toLocaleString()}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-700">Asylum Applications</td>
              <td className="px-4 py-3 text-right font-mono">{country.asylumApps.toLocaleString()}</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Asylum Grant Rate</td>
              <td className="px-4 py-3 text-right">{country.asylumGrantRate}%</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-700">Deportations</td>
              <td className="px-4 py-3 text-right font-mono">{country.deportations.toLocaleString()}</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Visa Issuances (2023)</td>
              <td className="px-4 py-3 text-right font-mono">{country.visaIssuances2023.toLocaleString()}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-700">Green Card Wait Time</td>
              <td className="px-4 py-3 text-right">{country.greenCardWaitYears} years</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Diversity Visa Lottery Eligible</td>
              <td className="px-4 py-3 text-right">{country.diversityLotteryEligible ? '✅ Yes' : '❌ No'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Top Visa Types ──────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Top Visa Types</h2>
      <div className="flex flex-wrap gap-2 mb-12">
        {country.topVisaTypes.map((visa, i) => (
          <span key={i} className="bg-primary/5 border border-primary/20 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
            {visa}
          </span>
        ))}
      </div>

      {/* ── Immigration Pipeline Visualization ──────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Immigration Pipeline</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
        <p className="text-sm text-gray-600 mb-4">
          How {country.name} nationals move through the U.S. immigration system:
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3 flex-1 w-full">
            <div className="text-lg font-bold text-blue-700">{country.visaIssuances2023.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Visas Issued (2023)</div>
          </div>
          <div className="text-gray-400 text-xl hidden sm:block">→</div>
          <div className="bg-yellow-50 rounded-lg p-3 flex-1 w-full">
            <div className="text-lg font-bold text-yellow-700">{country.courtCases.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Court Cases (Total)</div>
          </div>
          <div className="text-gray-400 text-xl hidden sm:block">→</div>
          <div className="bg-green-50 rounded-lg p-3 flex-1 w-full">
            <div className="text-lg font-bold text-green-700">{Math.round(country.asylumApps * country.asylumGrantRate / 100).toLocaleString()}</div>
            <div className="text-xs text-gray-600">Asylum Granted</div>
          </div>
          <div className="text-gray-400 text-xl hidden sm:block">→</div>
          <div className="bg-red-50 rounded-lg p-3 flex-1 w-full">
            <div className="text-lg font-bold text-red-700">{country.deportations.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Deportations</div>
          </div>
        </div>
      </div>

      {/* ── Data Sources ────────────────────────────────────────────── */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h2 className="font-heading text-lg font-bold mb-2">Data Sources</h2>
        <p className="text-sm text-gray-600">
          {data.source}. Last updated: {data.lastUpdated}. Court case data from DOJ EOIR.
          Visa issuance data from Department of State. Immigrant population estimates from
          Census Bureau American Community Survey and Migration Policy Institute.
        </p>
      </div>

      {/* ── Other Countries ─────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Other Country Profiles</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {allCountries.filter((c) => c.slug !== slug).map((c) => (
          <Link
            key={c.slug}
            href={`/countries/${c.slug}`}
            className="bg-white border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors text-center"
          >
            <span className="text-2xl">{c.flag}</span>
            <div className="text-sm font-medium mt-1">{c.name}</div>
            <div className="text-xs text-gray-500">{c.totalImmigrants >= 1000000 ? `${(c.totalImmigrants / 1000000).toFixed(1)}M` : `${(c.totalImmigrants / 1000).toFixed(0)}K`} immigrants</div>
          </Link>
        ))}
      </div>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/nationalities" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Cases by Nationality</h3>
          <p className="text-sm text-gray-600">Immigration court cases by country of origin.</p>
        </Link>
        <Link href="/deportation-by-country" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Deportation by Country</h3>
          <p className="text-sm text-gray-600">Removal orders and deportation data by country.</p>
        </Link>
        <Link href="/visa-types" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Visa Types Guide</h3>
          <p className="text-sm text-gray-600">All visa categories, requirements, and processing times.</p>
        </Link>
      </div>
    </div>
  )
}
