import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'
import DemographicsCharts from './DemographicsCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Demographics — Gender, Languages & Custody in Immigration Court',
  description: 'Demographics of U.S. immigration court cases: 59.2% male, 40.8% female. 50+ languages. 6.4M never detained, 2.1M detained. EOIR data analysis.',
}

export default function DemographicsPage() {
  const gender = loadData('gender.json')
  const languages = loadData('languages.json')
  const custody = loadData('custody.json')
  const stats = loadData('stats.json')

  const male = gender.find((g: { code: string }) => g.code === 'M')
  const female = gender.find((g: { code: string }) => g.code === 'F')
  const genderTotal = male.count + female.count

  // Clean and merge duplicate language codes
  const langMap = new Map<string, number>()
  for (const l of languages) {
    const name = l.name.trim()
    if (!name || name === 'UNKNOWN LANGUAGE') continue
    langMap.set(name, (langMap.get(name) || 0) + l.count)
  }
  // Merge SP and SPANISH
  if (langMap.has('SP')) {
    langMap.set('SPANISH', (langMap.get('SPANISH') || 0) + (langMap.get('SP') || 0))
    langMap.delete('SP')
  }
  if (langMap.has('AR')) {
    langMap.set('ARABIC', (langMap.get('ARABIC') || 0) + (langMap.get('AR') || 0))
    langMap.delete('AR')
  }
  if (langMap.has('FR')) {
    langMap.set('FRENCH', (langMap.get('FRENCH') || 0) + (langMap.get('FR') || 0))
    langMap.delete('FR')
  }
  if (langMap.has('UR')) {
    langMap.set('URDU', (langMap.get('URDU') || 0) + (langMap.get('UR') || 0))
    langMap.delete('UR')
  }
  const cleanLanguages = Array.from(langMap.entries())
    .map(([name, count]) => ({ name: titleCase(name), count }))
    .sort((a, b) => b.count - a.count)

  const totalLang = cleanLanguages.reduce((s, l) => s + l.count, 0)
  const englishCount = cleanLanguages.find(l => l.name === 'English')?.count || 0
  const nonEnglishPct = (((totalLang - englishCount) / totalLang) * 100).toFixed(1)

  const detained = custody.find((c: { code: string }) => c.code === 'D')
  const neverDetained = custody.find((c: { code: string }) => c.code === 'N')
  const released = custody.find((c: { code: string }) => c.code === 'R')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Demographics' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Demographics of Immigration Court</h1>
      <p className="text-lg text-gray-600 mb-8">
        Who appears in U.S. immigration courts? Gender, language, and custody data
        from {stats.totalCases.toLocaleString()} cases paint a detailed picture.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-blue-700">{((male.count / genderTotal) * 100).toFixed(1)}%</div>
          <div className="text-sm text-gray-600 mt-1">Male</div>
          <div className="text-xs text-gray-400">{male.count.toLocaleString()}</div>
        </div>
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-pink-700">{((female.count / genderTotal) * 100).toFixed(1)}%</div>
          <div className="text-sm text-gray-600 mt-1">Female</div>
          <div className="text-xs text-gray-400">{female.count.toLocaleString()}</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{nonEnglishPct}%</div>
          <div className="text-sm text-gray-600 mt-1">Non-English Speakers</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">50+</div>
          <div className="text-sm text-gray-600 mt-1">Languages in Court</div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <DemographicsCharts
          gender={[
            { name: 'Male', count: male.count },
            { name: 'Female', count: female.count },
          ]}
          languages={cleanLanguages.slice(0, 15)}
          custody={custody}
        />
      </div>

      {/* Language Table */}
      <h2 className="font-heading text-2xl font-bold mb-4">All Languages ({cleanLanguages.length})</h2>
      <p className="text-gray-600 mb-4">
        Spanish dominates ({cleanLanguages[0]?.count.toLocaleString()} cases), but the system handles proceedings
        in over 50 languages — from Mandarin to Mam, Punjabi to Pulaar.
      </p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-8">#</th>
              <th className="px-4 py-3 text-left font-semibold">Language</th>
              <th className="px-4 py-3 text-right font-semibold">Cases</th>
              <th className="px-4 py-3 text-right font-semibold">Share</th>
            </tr>
          </thead>
          <tbody>
            {cleanLanguages.slice(0, 30).map((l, i) => (
              <tr key={l.name} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{l.name}</td>
                <td className="px-4 py-2 text-right">{l.count.toLocaleString()}</td>
                <td className="px-4 py-2 text-right text-gray-500">{((l.count / totalLang) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custody breakdown */}
      <h2 className="font-heading text-2xl font-bold mb-4">Custody Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-700">{(neverDetained.count / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Never Detained</div>
          <p className="text-xs text-gray-500 mt-2">Live in the community while case proceeds. Wait years for hearings.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-red-700">{(detained.count / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Detained</div>
          <p className="text-xs text-gray-500 mt-2">Held in ICE facilities. Cases fast-tracked. Worse access to lawyers.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-amber-700">{(released.count / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Released</div>
          <p className="text-xs text-gray-500 mt-2">Initially detained, then released on bond, parole, or court order.</p>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Findings</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>→ Men outnumber women ~60/40 in immigration court, reflecting border apprehension patterns</li>
              <li>→ {nonEnglishPct}% don&apos;t speak English — they need interpreters for every proceeding</li>
              <li>→ Indigenous Mayan languages (Mam, K&apos;iche&apos;, Konjobal) account for 45,000+ cases with severe interpreter shortages</li>
              <li>→ {((neverDetained.count / (neverDetained.count + detained.count + released.count)) * 100).toFixed(0)}% of respondents are never detained — they make up the bulk of the backlog</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">How language barriers compound the attorney crisis.</p>
        </Link>
        <Link href="/analysis/detained-vs-released" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🔒 Detained vs. Released</h3>
          <p className="text-sm text-gray-600 mt-1">Deep dive into how custody status shapes outcomes.</p>
        </Link>
        <Link href="/nationalities" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌍 By Nationality</h3>
          <p className="text-sm text-gray-600 mt-1">Case data for all {stats.totalNationalities} nationalities.</p>
        </Link>
      </div>
    </div>
  )
}
