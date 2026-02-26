import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

const datasets = [
  { name: 'Site Statistics', file: 'stats.json', desc: 'Overall case counts, pending cases, asylum outcomes, judge/court totals.', size: '1 KB' },
  { name: 'Yearly Trends', file: 'yearly-trends.json', desc: 'Cases filed, completed, grants, denials, removals by year (1990-2026).', size: '5 KB' },
  { name: 'Courts Index', file: 'court-index.json', desc: 'All 88 immigration courts with caseloads, grant rates, addresses, and slugs.', size: '15 KB' },
  { name: 'Nationalities Index', file: 'nationality-index.json', desc: 'All 260 nationalities with case counts and slugs.', size: '12 KB' },
  { name: 'Judges Index', file: 'judge-index.json', desc: 'All 1,269 judges with case counts, grant rates, and court assignments.', size: '80 KB' },
  { name: 'Outcomes', file: 'outcomes.json', desc: 'All decision types and their counts across all proceedings.', size: '3 KB' },
  { name: 'Case Types', file: 'case-types.json', desc: 'Immigration case types (removal, deportation, asylum only, etc.) with counts.', size: '1 KB' },
  { name: 'Gender', file: 'gender.json', desc: 'Gender breakdown of immigration court cases.', size: '1 KB' },
  { name: 'Languages', file: 'languages.json', desc: 'Languages spoken by respondents in immigration court.', size: '4 KB' },
  { name: 'Custody Status', file: 'custody.json', desc: 'Detained, released, never detained case counts.', size: '1 KB' },
  { name: 'States', file: 'states.json', desc: 'Cases by U.S. state with court and outcome breakdowns.', size: '5 KB' },
  { name: 'Appeals', file: 'appeals.json', desc: '1.46M BIA appeals — decisions, filers, yearly trends, nationalities, custody.', size: '11 KB' },
  { name: 'Bond Hearings', file: 'bonds.json', desc: '1.59M bond hearings — outcomes, amounts, yearly trends.', size: '8 KB' },
  { name: 'Representation', file: 'representation.json', desc: '18.7M attorney records — by court, level, type.', size: '240 KB' },
  { name: 'Wait Times', file: 'wait-times.json', desc: 'Case duration analysis — by year, court, distribution buckets.', size: '5 KB' },
  { name: 'Border Encounters', file: 'border-encounters.json', desc: 'CBP encounters FY2020-2026 — yearly, by citizenship, component, demographics.', size: '4 KB' },
  { name: 'Drug Seizures', file: 'drug-seizures.json', desc: 'CBP drug seizure data FY2023-2026 — by type, year, region, location.', size: '3 KB' },
  { name: 'Immigration Overview', file: 'immigration-overview.json', desc: 'Legal immigration, ICE enforcement, visa overstays, undocumented population estimates.', size: '5 KB' },
]

export const metadata: Metadata = {
  title: 'Download Immigration Data — Free JSON Datasets',
  description: 'Download free immigration data in JSON format. Court statistics, border encounters, drug seizures, asylum outcomes, judge data, and more. No registration required.',
  alternates: { canonical: 'https://www.openimmigration.us/downloads' },
}

export default function DownloadsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Downloads' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Download the Data</h1>
      <p className="text-lg text-gray-600 mb-8">
        All data on OpenImmigration is free to download. We process raw government data into clean, structured
        JSON files that are easy to use in your own analysis, research, or applications. No registration,
        no API key, no paywall.
      </p>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-2">How to Use</h2>
        <p className="text-gray-700 mb-3">
          All files are JSON format. Download directly or fetch programmatically:
        </p>
        <code className="bg-gray-800 text-green-400 px-4 py-2 rounded-lg block text-sm overflow-x-auto">
          curl https://www.openimmigration.us/data/stats.json
        </code>
        <p className="text-sm text-gray-500 mt-3">
          Data is updated when new EOIR case data is released (typically monthly). CBP data updates monthly.
          Please credit OpenImmigration and our source agencies when using this data.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">{datasets.length} Available Datasets</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {datasets.map(d => (
            <div key={d.file} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900">{d.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{d.desc}</p>
                <span className="text-xs text-gray-400 mt-1 block">{d.file} · ~{d.size}</span>
              </div>
              <a
                href={`/data/${d.file}`}
                download
                className="shrink-0 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Data Sources</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>EOIR Case Data</strong> — Department of Justice, Executive Office for Immigration Review. Bulk FOIA data updated monthly. 9.7M cases, 16.2M proceedings.</li>
          <li><strong>CBP Encounters</strong> — U.S. Customs and Border Protection Public Data Portal. Monthly CSV releases.</li>
          <li><strong>CBP Drug Seizures</strong> — CBP Drug Seizure Statistics dashboard data.</li>
          <li><strong>USCIS Quarterly Reports</strong> — U.S. Citizenship and Immigration Services. Form-level processing data.</li>
          <li><strong>DHS Reports</strong> — Yearbook of Immigration Statistics, Entry/Exit Overstay Reports, Enforcement Monthly Tables.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">License</h2>
        <p>
          All data is derived from U.S. government public records and is in the public domain. Our processed
          JSON files are free to use for any purpose — journalism, research, advocacy, commercial applications,
          or personal projects. Attribution to OpenImmigration is appreciated but not required.
        </p>
      </div>
    </div>
  )
}
