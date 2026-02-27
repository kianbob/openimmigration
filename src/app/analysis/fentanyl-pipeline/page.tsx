import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Fentanyl Pipeline — Drugs, Borders, and Immigration Policy',
  description: '65,000 lbs of fentanyl seized at the border. But most comes through legal ports of entry, not between them. How drug policy and immigration policy collide — and diverge.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/fentanyl-pipeline' },
}

export default function FentanylPipelinePage() {
  const drugs = loadData('drug-seizures.json')
  const border = loadData('border-encounters.json')

  const fentanyl = drugs.drugTotals.find((d: { drug: string }) => d.drug === 'Fentanyl')
  const fentanylKg = fentanyl.lbs * 0.453592
  const lethalDoses = fentanylKg * 500000
  const swb = drugs.fentanylByRegion?.find((r: { region: string }) => r.region === 'Southwest Border')
  const swbPct = swb ? ((swb.lbs / fentanyl.lbs) * 100).toFixed(0) : '97'

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Fentanyl Pipeline' },
      ]} />

      <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Border Security</span>
      <h1 className="font-heading text-4xl font-bold mb-6">The Fentanyl Pipeline</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p className="text-xl text-gray-600 mb-8">
          Between FY2023 and FY2026, CBP seized <strong>{fentanyl.lbs.toLocaleString()} pounds of fentanyl</strong> at
          U.S. borders — enough for roughly <strong>{(lethalDoses / 1e9).toFixed(1)} billion lethal doses</strong>.
          But the common narrative about drug smuggling and immigration doesn&apos;t match the data.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">The Inconvenient Truth: Ports of Entry</h2>
        <p>
          The political debate around border security often conflates two separate issues: unauthorized migration and
          drug smuggling. The data shows they follow fundamentally different paths.
        </p>
        <p>
          <strong>{swbPct}% of fentanyl seizures occur at the southwest border</strong>, but the critical detail is
          <em> where </em> on the southwest border. The majority of hard drug seizures — fentanyl, methamphetamine,
          and cocaine — happen at <strong>official ports of entry</strong>, hidden in vehicles, commercial trucks,
          and cargo shipments passing through CBP inspection at legal crossings.
        </p>
        <p>
          Meanwhile, the majority of unauthorized border crossings happen <em>between</em> ports of entry —
          the areas covered by Border Patrol and where physical barriers like walls are built.
        </p>
        <p>
          This creates a fundamental policy disconnect: <strong>border walls primarily affect migration, not drug
          smuggling</strong>. The drugs come through the front door.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Numbers Tell the Story</h2>
        <p>
          Our data reveals two parallel but distinct trends:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Border encounters peaked at {(border.grandTotal / 1e6).toFixed(1)}M</strong> (FY2020-2026),
            with a record 3.1M in FY2023 alone. These are overwhelmingly people — families, asylum seekers,
            economic migrants — crossing between ports of entry.
          </li>
          <li>
            <strong>Fentanyl seizures peaked at 27,023 lbs in FY2023</strong>, then declined to 21,889 lbs in FY2024
            and 12,027 lbs in FY2025. These are primarily at ports of entry, carried by U.S. citizens and legal
            residents driving vehicles through checkpoints.
          </li>
        </ul>
        <p>
          The people crossing the border illegally are generally not the people carrying fentanyl. Asylum seekers
          wading across the Rio Grande don&apos;t typically carry $2 million worth of fentanyl. That&apos;s a professional
          smuggling operation using vehicles at legal crossings.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Who Actually Smuggles Fentanyl?</h2>
        <p>
          DEA and CBP data consistently show that the majority of fentanyl smugglers caught at ports of entry
          are <strong>U.S. citizens or legal permanent residents</strong>. The cartels recruit American drivers
          because they face less scrutiny at the border.
        </p>
        <p>
          The smuggling operations are sophisticated: hidden compartments in vehicles, mixed into commercial
          cargo, concealed in everyday products. A single car can carry millions of lethal doses. This is why
          the top seizure locations are major ports of entry like <strong>Tucson Field Office
          ({drugs.fentanylTopLocations[0]?.lbs.toLocaleString()} lbs)</strong> and <strong>San Diego Field
          Office ({drugs.fentanylTopLocations[1]?.lbs.toLocaleString()} lbs)</strong>.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Supply Chain</h2>
        <p>
          Illicit fentanyl follows a clear path:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Precursor chemicals from China</strong> — shipped to Mexico, often through third countries</li>
          <li><strong>Manufacturing in Mexican labs</strong> — primarily Sinaloa Cartel and CJNG operations</li>
          <li><strong>Smuggling through ports of entry</strong> — in vehicles and commercial shipments</li>
          <li><strong>U.S. distribution networks</strong> — often using the postal system for last-mile delivery</li>
        </ol>
        <p>
          The economics are staggering: one kilogram of fentanyl costs $3,000-$5,000 to produce in Mexico and
          sells for $1-2 million on U.S. streets. This 200-400x markup makes fentanyl the most profitable drug
          in history and virtually impossible to stop through enforcement alone.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Declining Seizures: Good News or Bad?</h2>
        <p>
          Fentanyl seizures dropped from 27,023 lbs in FY2023 to 12,027 lbs in FY2025 — a 55% decline.
          This could mean:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Less fentanyl crossing</strong> — due to Mexican government precursor crackdowns and cartel disruption</li>
          <li><strong>Better concealment</strong> — smugglers adapting to avoid detection</li>
          <li><strong>Shifted routes</strong> — moving to mail, air cargo, or through Canada</li>
          <li><strong>Market saturation</strong> — enough fentanyl already in the U.S. to meet demand</li>
        </ul>
        <p>
          The honest answer: we don&apos;t fully know. Seizure data shows what was <em>caught</em>, not what
          <em>crossed</em>. But the decline, combined with a 20% drop in U.S. overdose deaths from the 2023 peak,
          suggests at least some real reduction in supply.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Policy Implications</h2>
        <p>
          The data suggests that conflating immigration enforcement with drug interdiction leads to ineffective
          policy. Addressing fentanyl requires:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Better scanning technology at ports of entry</strong> — where the drugs actually cross. Current scanning rates are under 5% of vehicles.</li>
          <li><strong>International cooperation on precursors</strong> — cutting off Chinese chemical suppliers</li>
          <li><strong>Demand reduction</strong> — treatment and harm reduction programs domestically</li>
          <li><strong>Separating the two issues</strong> — immigration policy and drug policy require different tools</li>
        </ul>
        <p>
          Deploying border agents to patrol desert crossings may reduce unauthorized migration, but it does
          little to stop fentanyl flowing through the port of entry two miles away.
        </p>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/fentanyl-pipeline" title="The Fentanyl Pipeline" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/drug-seizures" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">💊 Drug Seizure Data</h3>
          <p className="text-xs text-gray-600 mt-1">Full seizure statistics by drug, year, and location.</p>
        </Link>
        <Link href="/border" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🌎 Border Encounters</h3>
          <p className="text-xs text-gray-600 mt-1">12M+ encounters — the people crossing the border.</p>
        </Link>
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🚨 ICE Enforcement</h3>
          <p className="text-xs text-gray-600 mt-1">Deportations and interior enforcement data.</p>
        </Link>
      </div>

      <RelatedAnalysis current="fentanyl-pipeline" />

      <ArticleSchema title="The Fentanyl Pipeline — Drugs, Borders, and Immigration Policy" description="65,000 lbs of fentanyl seized at the border. How drug policy and immigration policy collide." url="https://www.openimmigration.us/analysis/fentanyl-pipeline" datePublished="2026-02-26" />
    </div>
  )
}
