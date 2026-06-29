import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'ICE Arrests by State & Field Office FY2023-2026 — Where Enforcement Is Highest',
  description: 'ICE ERO administrative arrest data by state and field office FY2023-2026. Dallas leads with 52,000 arrests in FY2025. Texas field offices account for 30%+ of all ICE arrests nationwide.',
  alternates: { canonical: 'https://www.openimmigration.us/enforcement/arrests' },
}

export default function ArrestsPage() {
  const arrestData = loadData('ice-arrests-by-state.json')
  const enforcementData = loadData('ice-enforcement.json')
  const offices = arrestData.fieldOffices

  const totalFy2025 = offices.reduce((s: number, o: { fy2025: number }) => s + o.fy2025, 0)
  const totalFy2024 = offices.reduce((s: number, o: { fy2024: number }) => s + o.fy2024, 0)
  const totalFy2023 = offices.reduce((s: number, o: { fy2023: number }) => s + o.fy2023, 0)
  const maxFy2025 = Math.max(...offices.map((o: { fy2025: number }) => o.fy2025))

  // Group by state
  const stateMap: Record<string, number> = {}
  offices.forEach((o: { state: string; fy2025: number }) => {
    stateMap[o.state] = (stateMap[o.state] || 0) + o.fy2025
  })
  const statesSorted = Object.entries(stateMap).sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'ICE Enforcement', href: '/enforcement' },
        { label: 'Arrests by State' },
      ]} />

      <h1 className="font-heading text-4xl font-bold mb-4">ICE Arrests by State &amp; Field Office</h1>
      <p className="text-lg text-gray-600 mb-8">
        ICE Enforcement and Removal Operations (ERO) made an estimated <strong>{totalFy2025.toLocaleString()} administrative arrests</strong> in
        FY2025 — a {((totalFy2025 / totalFy2024 - 1) * 100).toFixed(0)}% increase from FY2024. Arrests are concentrated in
        states with large unauthorized populations, particularly Texas, California, and Florida. This page breaks
        down arrest activity by ICE field office and state using FOIA-obtained data from the{' '}
        <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Deportation Data Project
        </a>.
      </p>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{totalFy2025.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">FY2025 Arrests</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{totalFy2024.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">FY2024 Arrests</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{offices.length}</div>
          <div className="text-sm text-gray-600 mt-1">Field Offices</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">+{((totalFy2025 / totalFy2024 - 1) * 100).toFixed(0)}%</div>
          <div className="text-sm text-gray-600 mt-1">YoY Change</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>Texas dominates</strong> — Dallas, Houston, San Antonio, and El Paso combined account for over 30% of all ICE arrests</div>
              <div>• <strong>Arrests have surged since FY2023</strong> — reflecting increased enforcement priorities and expanded ICE operations</div>
              <div>• <strong>Sanctuary cities still see arrests</strong> — NYC and Chicago field offices rank in the top 7 despite non-cooperation policies</div>
              <div>• <strong>FY2026 pace exceeds FY2025</strong> — FYTD numbers through March suggest another record year</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart - CSS */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-6">FY2025 ICE Arrests by Field Office</h2>
        <div className="space-y-3">
          {offices.sort((a: { fy2025: number }, b: { fy2025: number }) => b.fy2025 - a.fy2025).map((o: { office: string; state: string; fy2025: number; fy2024: number }) => (
            <div key={o.office} className="flex items-center gap-3">
              <div className="w-40 text-sm font-medium text-right flex-shrink-0 truncate">
                {o.office}, {o.state}
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium transition-all"
                  style={{ width: `${(o.fy2025 / maxFy2025 * 100).toFixed(1)}%`, minWidth: '60px' }}
                >
                  {o.fy2025.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State aggregation */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="font-heading text-xl font-bold mb-6">FY2025 Arrests by State</h2>
        <div className="space-y-3">
          {statesSorted.slice(0, 15).map(([state, count]) => (
            <div key={state} className="flex items-center gap-3">
              <div className="w-20 text-sm font-medium text-right flex-shrink-0">{state}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                  style={{ width: `${(count / statesSorted[0][1] * 100).toFixed(1)}%`, minWidth: '60px' }}
                >
                  {count.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">All Field Offices — ICE Administrative Arrests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Field Office</th>
                <th className="px-6 py-3 font-semibold">State</th>
                <th className="px-6 py-3 font-semibold text-right">FY2023</th>
                <th className="px-6 py-3 font-semibold text-right">FY2024</th>
                <th className="px-6 py-3 font-semibold text-right">FY2025</th>
                <th className="px-6 py-3 font-semibold text-right">FY2026 FYTD</th>
                <th className="px-6 py-3 font-semibold text-right">YoY Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {offices.sort((a: { fy2025: number }, b: { fy2025: number }) => b.fy2025 - a.fy2025).map((o: { office: string; state: string; fy2023: number; fy2024: number; fy2025: number; fy2026_fytd: number }, i: number) => (
                <tr key={o.office} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-6 py-3 font-medium">{o.office}</td>
                  <td className="px-6 py-3">{o.state}</td>
                  <td className="px-6 py-3 text-right">{o.fy2023.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">{o.fy2024.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right font-semibold">{o.fy2025.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">{o.fy2026_fytd.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">
                    <span className="text-red-600 font-medium">+{((o.fy2025 / o.fy2024 - 1) * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3" colSpan={2}>Total</td>
                <td className="px-6 py-3 text-right">{totalFy2023.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{totalFy2024.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{totalFy2025.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{offices.reduce((s: number, o: { fy2026_fytd: number }) => s + o.fy2026_fytd, 0).toLocaleString()}</td>
                <td className="px-6 py-3 text-right">
                  <span className="text-red-600">+{((totalFy2025 / totalFy2024 - 1) * 100).toFixed(0)}%</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Analysis */}
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Understanding ICE Arrests</h2>
        <p>
          ICE administrative arrests are the first step in the deportation pipeline. An arrest occurs when an
          ICE ERO officer takes a noncitizen into custody, typically through targeted operations, detainer
          pickups from local jails, or worksite enforcement actions. Unlike criminal arrests by local police,
          ICE administrative arrests are civil immigration enforcement actions — the person is taken into
          immigration custody pending removal proceedings.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Texas Concentration</h2>
        <p>
          Texas dominates ICE arrest statistics for several reasons. The state shares the longest border
          with Mexico, contains multiple ICE field offices (Dallas, Houston, San Antonio, El Paso), and
          has policies favorable to ICE-local cooperation including honoring ICE detainers. Combined, Texas
          field offices accounted for over 158,000 arrests in FY2025 — roughly 35% of the national total.
        </p>
        <p>
          By contrast, states with sanctuary policies like California and New York see lower arrest numbers
          relative to their unauthorized population. San Francisco&apos;s non-cooperation policies mean ICE
          must conduct more street arrests rather than picking up individuals from local jails, making
          enforcement more resource-intensive and less efficient.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Sanctuary Cities vs. ICE Operations</h2>
        <p>
          Despite non-cooperation policies, major sanctuary cities like New York, Chicago, and San Francisco
          still see significant ICE arrest activity. The difference is <em>how</em> arrests happen. In
          cooperative jurisdictions, ICE relies heavily on detainers — requests to local jails to hold
          individuals until ICE can pick them up. In sanctuary cities, ICE must use targeted enforcement
          operations: surveillance, home visits, and community arrests that often result in &quot;collateral&quot;
          arrests of bystanders who happen to be present.
        </p>
        <p>
          This creates a paradox: sanctuary policies intended to protect communities can make enforcement less
          targeted and more disruptive. ICE argues that non-cooperation forces agents into neighborhoods rather
          than secure jail settings, while sanctuary advocates maintain that cooperation chills crime reporting
          and erodes community trust.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The FY2025 Surge</h2>
        <p>
          The {((totalFy2025 / totalFy2024 - 1) * 100).toFixed(0)}% increase in arrests from FY2024 to FY2025 reflects the current administration&apos;s
          emphasis on interior enforcement. Contributing factors include expanded 287(g) agreements with local
          law enforcement, increased ICE staffing, resumed worksite enforcement operations, and executive orders
          prioritizing the arrest and removal of all removable noncitizens rather than just priority categories.
        </p>
        <p>
          The FOIA data from the <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Deportation Data Project</a> provides
          unprecedented transparency into these operations, showing not just totals but individual-level arrest
          records that reveal patterns in targeting, timing, and geographic concentration.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">How to Read This Data</h2>
        <p>
          Field office numbers don&apos;t perfectly map to states — each field office has an Area of Responsibility
          (AOR) that may span multiple states. For example, the Chicago field office covers Illinois, Indiana,
          Wisconsin, Missouri, Kentucky, and Kansas. The state-level aggregation above uses the field office&apos;s
          headquarters state, so actual state-level numbers may differ. For more granular geographic data, see
          the <a href="https://deportationdata.org/data/processed/ice.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">full
          FOIA datasets</a> from deportationdata.org.
        </p>
      </div>

      {/* Related pages */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 ICE Enforcement Overview</h3>
          <p className="text-sm text-gray-600 mt-1">Removals, returns, and enforcement trends FY2014-2026.</p>
        </Link>
        <Link href="/enforcement/deportations" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">✈️ Deportations by Nationality</h3>
          <p className="text-sm text-gray-600 mt-1">Which countries receive the most deportees from the U.S.</p>
        </Link>
        <Link href="/enforcement/detention" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏢 ICE Detention Facilities</h3>
          <p className="text-sm text-gray-600 mt-1">238 facilities, 46,200 daily population, $3.2B annual cost.</p>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/states" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">📍 Immigration Court Cases by State</h4>
          <p className="text-xs text-gray-600 mt-1">Court-level data for all 50 states.</p>
        </Link>
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h4 className="font-bold text-sm">🏛️ Browse All Immigration Courts</h4>
          <p className="text-xs text-gray-600 mt-1">Case volumes and outcomes for all 88 courts.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: ICE ERO annual reports, FOIA data processed by{' '}
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
              name: 'How many ICE arrests were there in FY2025?',
              acceptedAnswer: { '@type': 'Answer', text: `ICE ERO made approximately ${totalFy2025.toLocaleString()} administrative arrests in FY2025, a ${((totalFy2025 / totalFy2024 - 1) * 100).toFixed(0)}% increase from FY2024.` },
            },
            {
              '@type': 'Question',
              name: 'Which state has the most ICE arrests?',
              acceptedAnswer: { '@type': 'Answer', text: `Texas leads with over 158,000 ICE arrests across four field offices (Dallas, Houston, San Antonio, El Paso) in FY2025, accounting for roughly 35% of all arrests nationwide.` },
            },
            {
              '@type': 'Question',
              name: 'Does ICE arrest people in sanctuary cities?',
              acceptedAnswer: { '@type': 'Answer', text: 'Yes. ICE conducts arrests in sanctuary cities like New York and Chicago, though non-cooperation policies mean ICE must use targeted operations rather than jail pickups, making enforcement more resource-intensive.' },
            },
          ],
        })
      }} />
    </div>
  )
}
