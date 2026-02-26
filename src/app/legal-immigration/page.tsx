import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { GreenCardsByYearChart, LegalImmigrationTrends, RefugeeChart } from './LegalCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Legal Immigration to the U.S. — Green Cards, Refugees, Naturalizations | OpenImmigration',
  description: 'U.S. legal immigration statistics: ~1M green cards per year, refugee admissions, naturalization trends, and visa statistics FY2014-2024.',
  alternates: { canonical: 'https://www.openimmigration.us/legal-immigration' },
}

export default function LegalImmigrationPage() {
  const overview = loadData('immigration-overview.json')
  const legal = overview.legalImmigration.yearly

  const totalGC = legal.reduce((s: number, y: { greenCards: number }) => s + y.greenCards, 0)
  const totalNat = legal.reduce((s: number, y: { naturalizations: number }) => s + y.naturalizations, 0)
  const totalRef = legal.reduce((s: number, y: { refugees: number }) => s + y.refugees, 0)
  const latest = legal[legal.length - 1]
  const avgGC = Math.round(totalGC / legal.length)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Legal Immigration' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Legal Immigration to the United States</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. admits roughly <strong>1 million lawful permanent residents</strong> (green card holders) per year,
        along with hundreds of thousands of refugees, asylees, and new citizens. Over the past decade,
        {' '}<strong>{(totalGC / 1e6).toFixed(1)} million green cards</strong> were issued and <strong>{(totalNat / 1e6).toFixed(1)} million people</strong> became
        U.S. citizens through naturalization.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">~1M/yr</div>
          <div className="text-sm text-gray-600 mt-1">Green Cards</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(totalNat / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Naturalizations</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{(totalRef / 1e3).toFixed(0)}K</div>
          <div className="text-sm text-gray-600 mt-1">Refugees (Total)</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">180M+</div>
          <div className="text-sm text-gray-600 mt-1">Temp Admissions/yr</div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Green card issuance is remarkably stable</strong> — averaging ~{(avgGC / 1e3).toFixed(0)}K/year despite political changes</div>
              <div>• <strong>COVID crushed legal immigration</strong> — FY2020 green cards dropped to 707K, refugees to just 11,814</div>
              <div>• <strong>Refugee admissions are highly political</strong> — from 85K under Obama to 12K under Trump to 100K under Biden</div>
              <div>• <strong>Naturalizations hit near-record highs</strong> — 969K in FY2022 as pandemic backlogs cleared</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <GreenCardsByYearChart data={legal} />
        <LegalImmigrationTrends data={legal} />
      </div>
      <div className="mb-10">
        <RefugeeChart data={legal} />
      </div>

      {/* Yearly table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Legal Immigration by Fiscal Year</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">FY</th>
                <th className="px-4 py-3 font-semibold text-right">Green Cards</th>
                <th className="px-4 py-3 font-semibold text-right">Refugees</th>
                <th className="px-4 py-3 font-semibold text-right">Naturalizations</th>
                <th className="px-4 py-3 font-semibold text-right">Temp Admissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {legal.map((y: { fy: number; greenCards: number; refugees: number; naturalizations: number; nonimmigrantAdmissions: number }) => (
                <tr key={y.fy} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">FY{y.fy}</td>
                  <td className="px-4 py-3 text-right">{y.greenCards.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{y.refugees.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{y.naturalizations.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{(y.nonimmigrantAdmissions / 1e6).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">How Legal Immigration Works</h2>
        <p>
          Legal immigration to the U.S. happens through several pathways:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Family-sponsored:</strong> U.S. citizens and green card holders sponsor relatives — the largest category (~65% of green cards)</li>
          <li><strong>Employment-based:</strong> Employers sponsor workers in specialty occupations, including H-1B to green card pathways (~15%)</li>
          <li><strong>Diversity Visa Lottery:</strong> 55,000 green cards per year allocated by random lottery to underrepresented countries</li>
          <li><strong>Refugees &amp; Asylees:</strong> People fleeing persecution, admitted through overseas processing (refugees) or at U.S. borders (asylum)</li>
          <li><strong>Special categories:</strong> TPS, VAWA, U-visas for crime victims, SIJ for abused/neglected children</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Naturalization Pipeline</h2>
        <p>
          Green card holders can apply for U.S. citizenship after 5 years (or 3 years if married to a citizen).
          The naturalization process includes an application (N-400), biometrics, an English/civics test, and
          an oath ceremony. {(totalNat / 1e6).toFixed(1)} million people completed this process in our data period —
          roughly {(totalNat / legal.length / 1e3).toFixed(0)}K per year on average.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Temporary Visitors</h2>
        <p>
          Beyond permanent immigration, the U.S. admits roughly 180 million nonimmigrant (temporary) entries per year.
          This includes tourists (B-1/B-2), students (F-1), temporary workers (H-1B, L-1, O-1), and others.
          The vast majority depart on time — but about 1-2% overstay, making <Link href="/overstays" className="text-primary hover:underline">visa overstays</Link> a
          significant component of unauthorized immigration.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/green-card" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">💚 Green Card Data</h3>
          <p className="text-sm text-gray-600 mt-1">USCIS processing backlogs and I-485 data.</p>
        </Link>
        <Link href="/naturalization" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🇺🇸 Naturalization</h3>
          <p className="text-sm text-gray-600 mt-1">N-400 processing pipeline and citizenship trends.</p>
        </Link>
        <Link href="/asylum" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ Asylum</h3>
          <p className="text-sm text-gray-600 mt-1">{(918787).toLocaleString()} asylum grants in immigration court.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Sources: DHS Yearbook of Immigration Statistics, USCIS, U.S. State Department Visa Office.
      </p>
    </div>
  )
}
