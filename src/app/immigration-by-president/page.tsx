import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Immigration by President — Obama, Trump, Biden Enforcement Comparison',
  description: 'Compare U.S. immigration enforcement statistics across presidential administrations: deportations, border encounters, asylum grants, visa issuances, and court backlogs.',
  alternates: { canonical: 'https://www.openimmigration.us/immigration-by-president' },
}

/* ── types & data ────────────────────────────────────────────────────── */

interface PresidentData {
  name: string
  term: string
  years: string
  party: 'Democrat' | 'Republican'
  color: string
  portrait: string
  deportations: number
  deportationsAnnual: number
  borderEncounters: number
  borderEncountersAnnual: number
  asylumApplications: number
  asylumGranted: number
  asylumGrantRate: number
  visasIssued: number
  greenCardsIssued: number
  courtBacklogStart: number
  courtBacklogEnd: number
  detentionBedAvg: number
  iceArrests: number
  executiveActions: string[]
  summary: string
}

const presidents: PresidentData[] = [
  {
    name: 'Barack Obama',
    term: '2009–2017',
    years: '8 years',
    party: 'Democrat',
    color: 'blue',
    portrait: '🔵',
    deportations: 2749546,
    deportationsAnnual: 343693,
    borderEncounters: 3378048,
    borderEncountersAnnual: 422256,
    asylumApplications: 468200,
    asylumGranted: 98400,
    asylumGrantRate: 21.0,
    visasIssued: 78400000,
    greenCardsIssued: 8200000,
    courtBacklogStart: 186000,
    courtBacklogEnd: 521000,
    detentionBedAvg: 33400,
    iceArrests: 3084000,
    executiveActions: [
      'DACA (2012) — Deferred action for childhood arrivals',
      'DAPA (2014) — Deferred action for parents (blocked by courts)',
      'Secure Communities program expansion',
      'Priority Enforcement Program (PEP) replaced S-Comm',
      'Record deportation numbers earned "Deporter-in-Chief" label',
      'Family detention expansion after 2014 border surge',
    ],
    summary: 'Obama deported more people than any president in history, earning the nickname "Deporter-in-Chief" from immigrant advocates. His administration prioritized the removal of convicted criminals while also expanding DACA protections for Dreamers. The contradiction between executive relief programs and record deportations defined his immigration legacy.',
  },
  {
    name: 'Donald Trump (1st Term)',
    term: '2017–2021',
    years: '4 years',
    party: 'Republican',
    color: 'red',
    portrait: '🔴',
    deportations: 756036,
    deportationsAnnual: 189009,
    borderEncounters: 2640000,
    borderEncountersAnnual: 660000,
    asylumApplications: 682000,
    asylumGranted: 62800,
    asylumGrantRate: 9.2,
    visasIssued: 28600000,
    greenCardsIssued: 3800000,
    courtBacklogStart: 521000,
    courtBacklogEnd: 1300000,
    detentionBedAvg: 44600,
    iceArrests: 1480000,
    executiveActions: [
      'Travel ban ("Muslim ban") — Executive Order 13769',
      'Zero Tolerance family separation policy (2018)',
      'Remain in Mexico (MPP) program',
      'Title 42 public health border expulsion (March 2020)',
      'Reduced refugee admissions cap to 18,000 (historic low)',
      'Public charge rule expansion',
      'Asylum Cooperative Agreements (Guatemala, Honduras, El Salvador)',
      'Border wall construction acceleration',
    ],
    summary: 'Despite the harsh rhetoric, Trump\'s first term actually saw fewer total deportations than Obama — largely because COVID-19 disrupted enforcement and Title 42 expulsions didn\'t count as formal removals. However, his administration dramatically reduced legal immigration through visa restrictions, refugee cap cuts, and the travel ban. The court backlog more than doubled.',
  },
  {
    name: 'Joe Biden',
    term: '2021–2025',
    years: '4 years',
    party: 'Democrat',
    color: 'blue',
    portrait: '🔵',
    deportations: 1420000,
    deportationsAnnual: 355000,
    borderEncounters: 10245000,
    borderEncountersAnnual: 2561250,
    asylumApplications: 1840000,
    asylumGranted: 248000,
    asylumGrantRate: 13.5,
    visasIssued: 42800000,
    greenCardsIssued: 4200000,
    courtBacklogStart: 1300000,
    courtBacklogEnd: 3700000,
    detentionBedAvg: 28400,
    iceArrests: 1240000,
    executiveActions: [
      'Ended Remain in Mexico (MPP) program',
      'Ended Title 42 (May 2023)',
      'CBP One app for asylum scheduling',
      'Parole programs (CHNV — Cuba, Haiti, Nicaragua, Venezuela)',
      'Raised refugee cap to 125,000',
      'Asylum transit ban (June 2023)',
      'Executive order limiting asylum at border (June 2024)',
      'DACA rule codification (challenged in courts)',
      'TPS expansions for multiple countries',
    ],
    summary: 'Biden oversaw the largest border encounter numbers in U.S. history, driven by global migration pressures and the end of Title 42. His administration attempted to balance humanitarian parole programs with enforcement, ultimately issuing its own asylum restrictions in 2024. The court backlog nearly tripled to 3.7 million cases. Despite fewer interior arrests, total deportation numbers were high due to border removals.',
  },
  {
    name: 'Donald Trump (2nd Term)',
    term: '2025–present',
    years: '~1 year (ongoing)',
    party: 'Republican',
    color: 'red',
    portrait: '🔴',
    deportations: 285000,
    deportationsAnnual: 285000,
    borderEncounters: 662270,
    borderEncountersAnnual: 662270,
    asylumApplications: 148000,
    asylumGranted: 12400,
    asylumGrantRate: 8.4,
    visasIssued: 4200000,
    greenCardsIssued: 480000,
    courtBacklogStart: 3700000,
    courtBacklogEnd: 3500000,
    detentionBedAvg: 42000,
    iceArrests: 520000,
    executiveActions: [
      'Reinstatement of Remain in Mexico',
      'Mass deportation operations expansion',
      'Ended CHNV parole programs',
      'Suspended refugee admissions',
      'Birthright citizenship executive order (challenged)',
      'Alien Enemies Act invocation for Venezuelan gang members',
      'ICE operations in sensitive locations (schools, churches)',
      'CBP One app terminated',
      'DACA termination efforts',
      'Expanded expedited removal nationwide',
    ],
    summary: 'Trump\'s second term launched the most aggressive enforcement posture in modern history. Border encounters dropped sharply (partly due to Biden\'s late-term restrictions and deterrence effect). Interior enforcement expanded with ICE operations in previously protected locations. Legal immigration faced sweeping cuts across visa categories, refugee admissions, and parole programs.',
  },
]

/* ── helper ──────────────────────────────────────────────────────────── */

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}

function ComparisonBar({ values, max, labels, colors }: { values: number[]; max: number; labels: string[]; colors: string[] }) {
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-32 text-xs text-gray-600 text-right truncate">{labels[i]}</div>
          <div className="flex-1 bg-gray-100 rounded-full h-4 relative">
            <div
              className={`h-4 rounded-full ${colors[i]}`}
              style={{ width: `${Math.round((v / max) * 100)}%` }}
            />
          </div>
          <div className="w-20 text-xs font-mono text-right">{v.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}

/* ── page ─────────────────────────────────────────────────────────────── */

export default function ImmigrationByPresidentPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Immigration by President — Enforcement Comparison',
    description: 'Compare immigration enforcement across Obama, Trump, and Biden administrations.',
    url: 'https://www.openimmigration.us/immigration-by-president',
    publisher: { '@type': 'Organization', name: 'OpenImmigration' },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Immigration by President' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Immigration by President</h1>
      <p className="text-lg text-gray-600 mb-2">
        How do U.S. immigration enforcement and policy compare across recent presidential administrations?
        The numbers often defy the political narratives from both sides.
      </p>
      <p className="text-gray-600 mb-8">
        This page compares key immigration metrics across the Obama, Trump (1st term), Biden, and Trump (2nd term)
        administrations. All figures are based on official data from DHS, DOJ EOIR, CBP, and USCIS.
      </p>

      {/* ── Editorial Box ───────────────────────────────────────────── */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
        <h2 className="font-heading text-xl font-bold mb-2">📊 The Paradox of Presidential Immigration</h2>
        <p className="text-gray-700 mb-3">
          The most surprising finding? The president who deported the most people per year was Obama — a Democrat.
          The president who oversaw the largest drop in legal immigration was Trump — who simultaneously
          presided over fewer formal deportations than Obama.
        </p>
        <p className="text-gray-700 mb-3">
          Biden saw record border encounters but also expanded legal pathways through parole programs.
          Trump&apos;s second term is pursuing the most aggressive enforcement posture of any administration,
          but the actual numbers remain to be seen.
        </p>
        <p className="text-gray-700">
          The libertarian takeaway: every administration has expanded government power over immigration.
          The question isn&apos;t which party is &ldquo;better&rdquo; on immigration — it&apos;s whether the
          entire enforcement apparatus has grown beyond what a free society should tolerate.
        </p>
      </div>

      {/* ── Side-by-Side Comparison ─────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-6">Side-by-Side Comparison</h2>

      {/* Deportations */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-4">📉 Deportations (Formal Removals)</h3>
        <ComparisonBar
          values={presidents.map(p => p.deportationsAnnual)}
          max={Math.max(...presidents.map(p => p.deportationsAnnual))}
          labels={presidents.map(p => p.name.replace(' (1st Term)', ' I').replace(' (2nd Term)', ' II'))}
          colors={presidents.map(p => p.party === 'Democrat' ? 'bg-blue-500' : 'bg-red-500')}
        />
        <p className="text-xs text-gray-500 mt-3">Annual average formal removals. Trump II annualized from partial year.</p>
      </div>

      {/* Border Encounters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-4">🚧 Border Encounters (Annual Average)</h3>
        <ComparisonBar
          values={presidents.map(p => p.borderEncountersAnnual)}
          max={Math.max(...presidents.map(p => p.borderEncountersAnnual))}
          labels={presidents.map(p => p.name.replace(' (1st Term)', ' I').replace(' (2nd Term)', ' II'))}
          colors={presidents.map(p => p.party === 'Democrat' ? 'bg-blue-500' : 'bg-red-500')}
        />
        <p className="text-xs text-gray-500 mt-3">Includes CBP Title 8 apprehensions and Title 42 expulsions.</p>
      </div>

      {/* Asylum Grant Rate */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-4">🏛️ Asylum Grant Rate</h3>
        <ComparisonBar
          values={presidents.map(p => p.asylumGrantRate * 10)}
          max={Math.max(...presidents.map(p => p.asylumGrantRate * 10))}
          labels={presidents.map(p => `${p.name.replace(' (1st Term)', ' I').replace(' (2nd Term)', ' II')} (${p.asylumGrantRate}%)`)}
          colors={presidents.map(p => p.party === 'Democrat' ? 'bg-blue-500' : 'bg-red-500')}
        />
      </div>

      {/* Court Backlog */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="font-heading text-lg font-bold mb-4">⚖️ Court Backlog Growth</h3>
        <ComparisonBar
          values={presidents.map(p => p.courtBacklogEnd - p.courtBacklogStart)}
          max={Math.max(...presidents.map(p => p.courtBacklogEnd - p.courtBacklogStart))}
          labels={presidents.map(p => `${p.name.replace(' (1st Term)', ' I').replace(' (2nd Term)', ' II')} (+${((p.courtBacklogEnd - p.courtBacklogStart) / 1000).toFixed(0)}K)`)}
          colors={presidents.map(p => p.party === 'Democrat' ? 'bg-blue-500' : 'bg-red-500')}
        />
        <p className="text-xs text-gray-500 mt-3">Net change in pending immigration court cases during term.</p>
      </div>

      {/* ── Detailed President Cards ────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-6 mt-12">Detailed Administration Profiles</h2>

      {presidents.map((p) => (
        <div key={p.name} className={`bg-white border-2 ${p.party === 'Democrat' ? 'border-blue-200' : 'border-red-200'} rounded-xl p-6 mb-6`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{p.portrait}</span>
            <div>
              <h3 className="font-heading text-2xl font-bold">{p.name}</h3>
              <p className="text-gray-500">{p.term} · {p.years} · {p.party}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{p.summary}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <StatCard label="Total Deportations" value={p.deportations.toLocaleString()} sub={`${p.deportationsAnnual.toLocaleString()}/yr`} />
            <StatCard label="Border Encounters" value={p.borderEncounters.toLocaleString()} sub={`${p.borderEncountersAnnual.toLocaleString()}/yr`} />
            <StatCard label="Asylum Grant Rate" value={`${p.asylumGrantRate}%`} sub={`${p.asylumGranted.toLocaleString()} granted`} />
            <StatCard label="Visas Issued" value={`${(p.visasIssued / 1000000).toFixed(1)}M`} sub="total term" />
            <StatCard label="Green Cards" value={`${(p.greenCardsIssued / 1000000).toFixed(1)}M`} sub="total term" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <StatCard label="Court Backlog Start" value={`${(p.courtBacklogStart / 1000).toFixed(0)}K`} />
            <StatCard label="Court Backlog End" value={`${(p.courtBacklogEnd / 1000).toFixed(0)}K`} />
            <StatCard label="Avg Detention Beds" value={p.detentionBedAvg.toLocaleString()} />
            <StatCard label="ICE Arrests" value={`${(p.iceArrests / 1000).toFixed(0)}K`} />
          </div>

          <h4 className="font-bold text-sm text-gray-700 mb-2">Key Executive Actions</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {p.executiveActions.map((action, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* ── Key Takeaways ───────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Key Takeaways</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold mb-2">🏆 Most Deportations Per Year</h3>
          <p className="text-sm text-gray-700">
            <strong>Barack Obama</strong> — 343,693 annual average. Despite being a Democrat, Obama&apos;s enforcement
            machinery was the most prolific in removing people from the country.
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h3 className="font-bold mb-2">🚧 Most Border Encounters</h3>
          <p className="text-sm text-gray-700">
            <strong>Joe Biden</strong> — 2.56 million annual average. The post-COVID migration surge and end of
            Title 42 drove unprecedented border encounter numbers.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold mb-2">📉 Biggest Legal Immigration Cut</h3>
          <p className="text-sm text-gray-700">
            <strong>Trump (1st Term)</strong> — Visa issuances dropped dramatically due to the travel ban,
            COVID-19, and deliberate policy restrictions. Refugee admissions hit historic lows.
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <h3 className="font-bold mb-2">📈 Biggest Backlog Growth</h3>
          <p className="text-sm text-gray-700">
            <strong>Joe Biden</strong> — The court backlog nearly tripled from 1.3M to 3.7M, adding 2.4 million
            pending cases. Every administration grew the backlog, but Biden&apos;s era saw the largest increase.
          </p>
        </div>
      </div>

      {/* ── Common Myths ────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Myths vs. Reality</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Myth</th>
              <th className="px-4 py-3 text-left font-semibold">Reality</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-100">
              <td className="px-4 py-3 text-gray-700">&ldquo;Trump deported more people than Obama&rdquo;</td>
              <td className="px-4 py-3 text-gray-600">Obama deported ~344K/year vs. Trump I at ~189K/year. Title 42 expulsions weren&apos;t formal removals.</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="px-4 py-3 text-gray-700">&ldquo;Biden had open borders&rdquo;</td>
              <td className="px-4 py-3 text-gray-600">Biden deported ~355K/year — more than Trump I. He also issued asylum restrictions in 2024.</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="px-4 py-3 text-gray-700">&ldquo;Democrats are soft on immigration&rdquo;</td>
              <td className="px-4 py-3 text-gray-600">Obama holds the deportation record. Biden expanded the detention system. Both parties enforce heavily.</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="px-4 py-3 text-gray-700">&ldquo;Republicans reduce immigration&rdquo;</td>
              <td className="px-4 py-3 text-gray-600">Trump I saw the backlog double. Restricting legal pathways often increases unauthorized crossings.</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="px-4 py-3 text-gray-700">&ldquo;The border crisis started under Biden&rdquo;</td>
              <td className="px-4 py-3 text-gray-600">Border encounters were already rising in Trump&apos;s last year. Global migration pressures transcend any single president.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Data Sources ────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Data Sources & Methodology</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <ul className="text-sm text-gray-600 space-y-2">
          <li><strong>Deportations:</strong> DHS Yearbook of Immigration Statistics, ICE ERO Annual Reports</li>
          <li><strong>Border Encounters:</strong> CBP Nationwide Encounters dataset (includes Title 8 + Title 42)</li>
          <li><strong>Asylum Data:</strong> DOJ EOIR case completion data, USCIS affirmative asylum statistics</li>
          <li><strong>Visa Issuances:</strong> Department of State Bureau of Consular Affairs annual reports</li>
          <li><strong>Court Backlog:</strong> TRAC Immigration / DOJ EOIR pending case data</li>
          <li><strong>Note:</strong> Trump 2nd term figures are annualized from partial data (through early 2026) and will be updated.</li>
        </ul>
      </div>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/deportation" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Deportation Statistics</h3>
          <p className="text-sm text-gray-600">Detailed removal order data and trends.</p>
        </Link>
        <Link href="/border" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Border Encounters</h3>
          <p className="text-sm text-gray-600">CBP apprehension data by year and sector.</p>
        </Link>
        <Link href="/backlog" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Court Backlog</h3>
          <p className="text-sm text-gray-600">Immigration court pending cases over time.</p>
        </Link>
        <Link href="/immigration-history" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Immigration History Timeline</h3>
          <p className="text-sm text-gray-600">Every major immigration law from 1790 to present.</p>
        </Link>
        <Link href="/deportation-by-country" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Deportation by Country</h3>
          <p className="text-sm text-gray-600">Which countries receive the most deportees.</p>
        </Link>
        <Link href="/how-many-immigrants-in-the-us" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">How Many Immigrants?</h3>
          <p className="text-sm text-gray-600">46.2M foreign-born residents breakdown.</p>
        </Link>
      </div>
    </div>
  )
}
