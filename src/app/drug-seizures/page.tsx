import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { FentanylTrendChart, AllDrugsYearlyChart, DrugTotalsPie, FentanylLocationsChart } from './DrugCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Drug Seizures at the U.S. Border — 65,000 lbs of Fentanyl Seized',
  description: 'CBP drug seizure data FY2023-2026. 65,000 lbs of fentanyl, 542K lbs of meth, 243K lbs of cocaine seized at U.S. borders. Trends, locations, and the fentanyl crisis.',
  alternates: { canonical: 'https://www.openimmigration.us/drug-seizures' },
}

export default function DrugSeizuresPage() {
  const data = loadData('drug-seizures.json')
  const fentanyl = data.drugTotals.find((d: { drug: string }) => d.drug === 'Fentanyl')
  const meth = data.drugTotals.find((d: { drug: string }) => d.drug === 'Methamphetamine')
  const cocaine = data.drugTotals.find((d: { drug: string }) => d.drug === 'Cocaine')
  const heroin = data.drugTotals.find((d: { drug: string }) => d.drug === 'Heroin')
  const fentanylPeak = data.fentanylByYear.reduce((max: { fy: number; lbs: number }, y: { fy: number; lbs: number }) =>
    y.lbs > max.lbs ? y : max, data.fentanylByYear[0])
  const swbFentanyl = data.fentanylByRegion.find((r: { region: string }) => r.region === 'Southwest Border')
  const swbPct = swbFentanyl ? ((swbFentanyl.lbs / fentanyl.lbs) * 100).toFixed(1) : '97'

  // Calculate lethal doses (1 kg fentanyl = ~500,000 lethal doses at 2mg)
  const fentanylKg = fentanyl.lbs * 0.453592
  const lethalDoses = fentanylKg * 500000

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Drug Seizures' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Drug Seizures at the U.S. Border</h1>
      <p className="text-lg text-gray-600 mb-8">
        U.S. Customs and Border Protection seized <strong>{(data.totalLbs / 1e6).toFixed(1)} million pounds</strong> of
        drugs in <strong>{data.totalEvents.toLocaleString()} seizure events</strong> between FY2023 and FY2026. The deadliest:
        {' '}<strong>{fentanyl.lbs.toLocaleString()} pounds of fentanyl</strong> — enough for an
        estimated <strong>{(lethalDoses / 1e9).toFixed(1)} billion lethal doses</strong>.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(fentanyl.lbs / 1000).toFixed(1)}K lbs</div>
          <div className="text-sm text-gray-600 mt-1">Fentanyl Seized</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{(meth.lbs / 1000).toFixed(0)}K lbs</div>
          <div className="text-sm text-gray-600 mt-1">Methamphetamine</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{(cocaine.lbs / 1000).toFixed(0)}K lbs</div>
          <div className="text-sm text-gray-600 mt-1">Cocaine</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">{swbPct}%</div>
          <div className="text-sm text-gray-600 mt-1">Via Southwest Border</div>
        </div>
      </div>

      {/* Fentanyl warning */}
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <h3 className="font-bold text-red-900 text-lg mb-2">The Fentanyl Crisis</h3>
            <p className="text-red-800 mb-3">
              Fentanyl is 50-100x more potent than morphine. Just 2 milligrams — the weight of a few grains of salt — can be lethal.
              The {fentanyl.lbs.toLocaleString()} lbs seized by CBP represents roughly <strong>{(lethalDoses / 1e9).toFixed(1)} billion potential
              lethal doses</strong>. In FY2023 alone, {fentanylPeak.lbs.toLocaleString()} lbs were intercepted.
            </p>
            <p className="text-sm text-red-700">
              Fentanyl was involved in approximately 75,000 U.S. overdose deaths in 2023, making it the leading cause of death
              for Americans ages 18-45. Most illicit fentanyl enters through the southwest border, primarily at official
              ports of entry hidden in vehicles and commercial shipments.
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>• <strong>{swbPct}% of fentanyl comes through the southwest border</strong> — primarily at official ports of entry, not between them</div>
              <div>• <strong>Fentanyl seizures peaked in FY{fentanylPeak.fy}</strong> at {fentanylPeak.lbs.toLocaleString()} lbs — volumes are declining as enforcement tightens</div>
              <div>• <strong>Methamphetamine is the largest by weight</strong> at {(meth.lbs / 1000).toFixed(0)}K lbs — but fentanyl is far deadlier per pound</div>
              <div>• <strong>Heroin seizures collapsed to {(heroin.lbs / 1000).toFixed(1)}K lbs</strong> — fentanyl has largely replaced heroin in the drug supply</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <FentanylTrendChart data={data.fentanylByYear} />
        <DrugTotalsPie data={data.drugTotals} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <AllDrugsYearlyChart data={data.yearlyByDrug} />
        <FentanylLocationsChart data={data.fentanylTopLocations} />
      </div>

      {/* Drug totals table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Drug Seizures by Type (FY2023-2026)</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">Drug</th>
              <th className="px-6 py-3 font-semibold text-right">Seizure Events</th>
              <th className="px-6 py-3 font-semibold text-right">Pounds Seized</th>
              <th className="px-6 py-3 font-semibold text-right">% of Total Weight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.drugTotals.map((d: { drug: string; events: number; lbs: number }) => (
              <tr key={d.drug} className={`hover:bg-gray-50 ${d.drug === 'Fentanyl' ? 'bg-red-50/50' : ''}`}>
                <td className="px-6 py-3 font-medium">
                  {d.drug === 'Other Drugs**' ? 'Other Drugs' : d.drug}
                  {d.drug === 'Fentanyl' && <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Deadliest</span>}
                </td>
                <td className="px-6 py-3 text-right">{d.events.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{d.lbs.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{((d.lbs / data.totalLbs) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fentanyl by year table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
          <h2 className="font-heading text-xl font-bold text-red-900">Fentanyl Seizures by Year</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">Fiscal Year</th>
              <th className="px-6 py-3 font-semibold text-right">Seizure Events</th>
              <th className="px-6 py-3 font-semibold text-right">Pounds Seized</th>
              <th className="px-6 py-3 font-semibold text-right">Est. Lethal Doses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.fentanylByYear.map((y: { fy: number; events: number; lbs: number }) => {
              const doses = y.lbs * 0.453592 * 500000
              return (
                <tr key={y.fy} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">FY{y.fy}{y.fy === 2026 ? ' (FYTD)' : ''}</td>
                  <td className="px-6 py-3 text-right">{y.events.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">{y.lbs.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right text-red-600">{(doses / 1e9).toFixed(2)}B</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Top locations table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold">Top Fentanyl Seizure Locations</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Area of Responsibility</th>
              <th className="px-6 py-3 font-semibold text-right">Pounds</th>
              <th className="px-6 py-3 font-semibold text-right">Events</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.fentanylTopLocations.slice(0, 10).map((loc: { aor: string; lbs: number; events: number }, i: number) => (
              <tr key={loc.aor} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-500">{i + 1}</td>
                <td className="px-6 py-3 font-medium">{loc.aor}</td>
                <td className="px-6 py-3 text-right">{loc.lbs.toLocaleString()}</td>
                <td className="px-6 py-3 text-right">{loc.events.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">How Drugs Cross the Border</h2>
        <p>
          Contrary to popular perception, the majority of hard drugs — especially fentanyl and cocaine — enter
          the United States through <strong>official ports of entry</strong>, not between them. Drug traffickers
          hide narcotics in passenger vehicles, commercial trucks, and cargo shipments passing through CBP
          inspection at legal border crossings.
        </p>
        <p>
          U.S. Border Patrol (operating between ports) seizes more marijuana, while the Office of Field
          Operations (at ports of entry) intercepts the majority of fentanyl, meth, and cocaine. This distinction
          matters for policy: border walls primarily affect between-port crossings, while drug interdiction
          depends on scanning technology, intelligence, and inspection capacity at the ports themselves.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Fentanyl Supply Chain</h2>
        <p>
          Most illicit fentanyl is manufactured in Mexico using precursor chemicals sourced primarily from China.
          Mexican cartels — primarily the Sinaloa Cartel and Jalisco New Generation Cartel (CJNG) — operate
          large-scale production labs and smuggle finished product across the southwest border.
        </p>
        <p>
          Fentanyl is extremely profitable to smuggle because of its potency-to-weight ratio. One kilogram of
          fentanyl can generate $1-2 million in street revenue, compared to $25,000-$50,000 for a kilogram of
          heroin. This economics has driven the near-complete replacement of heroin with fentanyl in the U.S.
          drug supply — visible in our data as heroin seizures plummeted while fentanyl surged.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Seizures vs. Flow</h2>
        <p>
          CBP estimates it intercepts only a fraction of total drug flow. Seizure data tells us what was
          <em>caught</em>, not what <em>crossed</em>. Increases in seizures can indicate either more drugs
          flowing or better detection capabilities — often both simultaneously.
        </p>
      </div>

      {/* Why This Data Matters */}
      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Why This Data Matters</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Drug seizure data challenges some of the most deeply held assumptions in the border policy debate. The single most important finding: the majority of fentanyl and other hard drugs enter the United States through legal ports of entry — hidden in vehicles, commercial trucks, and cargo — not through the remote desert corridors between them. This distinction has enormous policy implications. Border walls and increased Border Patrol staffing primarily address between-port crossings, while the drug interdiction challenge is fundamentally about scanning technology, intelligence, and inspection capacity at official crossings.
          </p>
          <p>
            The fentanyl crisis is staggering in scale. Over 65,000 pounds seized represents billions of potential lethal doses, and law enforcement estimates that seized drugs are only a fraction of total flow. Fentanyl has replaced heroin almost entirely — visible in the data as heroin seizures collapsed while fentanyl surged — because it&apos;s cheaper to produce, more potent per gram, and dramatically more profitable to smuggle. With approximately 75,000 American overdose deaths involving fentanyl in 2023 alone, this is a public health catastrophe that intersects with but is distinct from immigration policy.
          </p>
          <p>
            Understanding seizure data requires nuance. Rising seizure numbers can mean more drugs are flowing, or that detection is improving, or both. The data also shows that drug trafficking is primarily a cartel operation — the Sinaloa Cartel and CJNG run industrialized supply chains from precursor chemical sourcing to cross-border logistics. Conflating drug smuggling with asylum-seeking migration obscures both problems. The people carrying fentanyl across the border are not the same people presenting themselves to Border Patrol to request asylum. Effective policy requires treating these as the distinct challenges they are.
          </p>
        </div>
      </section>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/border" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🌎 Border Encounters</h3>
          <p className="text-sm text-gray-600 mt-1">12M+ encounters — people crossing alongside drug shipments.</p>
        </Link>
        <Link href="/enforcement" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚨 ICE Enforcement</h3>
          <p className="text-sm text-gray-600 mt-1">Interior enforcement targeting drug trafficking networks.</p>
        </Link>
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ Immigration Courts</h3>
          <p className="text-sm text-gray-600 mt-1">Drug charges in immigration proceedings.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-10">
        Source: U.S. Customs and Border Protection Drug Seizure Statistics. Data current through February 2026.
        Lethal dose estimates based on DEA figure of 2mg as potentially lethal.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
