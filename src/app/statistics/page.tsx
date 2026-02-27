import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'U.S. Immigration Statistics 2026 — Key Numbers & Facts',
  description: 'Comprehensive U.S. immigration statistics: 1.9M pending court cases, 12M+ border encounters, 1,409 judges, 88 courts. Updated February 2026 from official DOJ, DHS, and CBP data.',
  alternates: { canonical: 'https://www.openimmigration.us/statistics' },
  openGraph: {
    title: 'U.S. Immigration Statistics 2026 — Key Numbers & Facts',
    description: 'Comprehensive U.S. immigration statistics: 1.9M pending court cases, 12M+ border encounters, 1,409 judges, 88 courts. Updated February 2026 from official DOJ, DHS, and CBP data.',
  },
}

export default function StatisticsPage() {
  const stats = loadData('stats.json')
  const border = loadData('border-encounters.json')
  const overview = loadData('immigration-overview.json')
  const bonds = loadData('bonds.json')
  const appeals = loadData('appeals.json')
  const drugs = loadData('drug-seizures.json')
  const wait = loadData('wait-times.json')

  const fentanyl = (drugs.drugTotals || []).find((d: { drug: string }) => d.drug.toLowerCase().includes('fentanyl'))

  const sections = [
    {
      title: '⚖️ Immigration Courts',
      link: '/dashboard',
      stats: [
        { label: 'Total cases (1990–2026)', value: (stats.totalCases / 1e6).toFixed(1) + 'M', link: '/dashboard' },
        { label: 'Currently pending', value: (stats.pendingCases / 1e6).toFixed(1) + 'M', link: '/backlog' },
        { label: 'Completed cases', value: stats.completedCases.toLocaleString(), link: '/dashboard' },
        { label: 'Immigration judges', value: stats.totalJudges.toLocaleString(), link: '/judges' },
        { label: 'Immigration courts', value: stats.totalCourts.toString(), link: '/courts' },
        { label: 'Nationalities represented', value: stats.totalNationalities.toString(), link: '/nationalities' },
        { label: 'Average case duration', value: wait.avgDaysOverall + ' days (' + wait.avgYearsOverall + ' years)', link: '/wait-times' },
        { label: 'Representation rate', value: stats.representationRate + '%', link: '/representation' },
      ]
    },
    {
      title: '🛡️ Asylum & Relief',
      link: '/asylum',
      stats: [
        { label: 'Asylum grants (all time)', value: stats.asylumGranted.toLocaleString(), link: '/asylum' },
        { label: 'Asylum denials (all time)', value: stats.asylumDenied.toLocaleString(), link: '/asylum' },
        { label: 'Overall asylum grant rate', value: stats.asylumGranted && stats.asylumDenied ? ((stats.asylumGranted / (stats.asylumGranted + stats.asylumDenied)) * 100).toFixed(1) + '%' : 'N/A', link: '/asylum' },
      ]
    },
    {
      title: '🚨 Enforcement & Removal',
      link: '/enforcement',
      stats: [
        { label: 'Removal orders', value: stats.removalOrders.toLocaleString(), link: '/deportation' },
        { label: 'Voluntary departures', value: stats.voluntaryDeparture.toLocaleString(), link: '/deportation' },
        { label: 'In absentia orders', value: stats.inAbsentia.toLocaleString(), link: '/analysis/in-absentia' },
        { label: 'Administrative closures', value: stats.adminClosure.toLocaleString() },
      ]
    },
    {
      title: '🌎 Border Encounters',
      link: '/border',
      stats: [
        { label: 'Total CBP encounters (FY2020–2026)', value: border.grandTotal.toLocaleString(), link: '/border' },
        { label: 'Peak year', value: 'FY' + border.yearly.reduce((m: any, y: any) => y.total > m.total ? y : m, border.yearly[0]).fy, link: '/border' },
        { label: 'Peak year encounters', value: border.yearly.reduce((m: any, y: any) => y.total > m.total ? y : m, border.yearly[0]).total.toLocaleString(), link: '/border' },
      ]
    },
    {
      title: '💊 Drug Seizures',
      link: '/drug-seizures',
      stats: [
        { label: 'Total drugs seized', value: drugs.totalLbs.toLocaleString() + ' lbs', link: '/drug-seizures' },
        { label: 'Fentanyl seized', value: fentanyl ? fentanyl.lbs.toLocaleString() + ' lbs' : 'N/A', link: '/drug-seizures' },
        { label: 'Total seizure events', value: drugs.totalEvents.toLocaleString(), link: '/drug-seizures' },
      ]
    },
    {
      title: '📑 Appeals & Bonds',
      link: '/appeals',
      stats: [
        { label: 'Total BIA appeals', value: appeals.totalAppeals.toLocaleString(), link: '/appeals' },
        { label: 'Total bond hearings', value: bonds.totalBondHearings.toLocaleString(), link: '/bond' },
        { label: 'Average bond amount', value: '$' + bonds.avgBondAmount.toLocaleString(), link: '/bond' },
        { label: 'Median bond amount', value: '$' + bonds.medianBondAmount.toLocaleString(), link: '/bond' },
        { label: 'Bond grant rate', value: bonds.grantRate + '%', link: '/bond' },
      ]
    },
    {
      title: '🗽 Legal Immigration',
      link: '/legal-immigration',
      stats: [
        { label: 'Annual green cards issued', value: '~1M/year', link: '/green-card' },
        { label: 'DACA active recipients', value: '515,570', link: '/daca' },
        { label: 'USCIS application backlog', value: '5.4M', link: '/uscis' },
        { label: 'Visa overstay rate (FY2024)', value: '1.09%', link: '/overstays' },
        { label: 'TPS pending applications', value: '1M+', link: '/tps' },
      ]
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Statistics' }]} />
      <h1 className="font-heading text-4xl font-bold mb-2">U.S. Immigration Statistics at a Glance</h1>
      <p className="text-sm text-gray-500 mb-2">Updated February 2026 · Sources: DOJ EOIR, DHS, CBP, USCIS</p>
      <p className="text-lg text-gray-600 mb-10">
        Key numbers from across the U.S. immigration system — court backlogs, border encounters, asylum outcomes,
        deportations, legal immigration, and more. All data from official government sources.
      </p>

      {sections.map(section => (
        <div key={section.title} className="mb-10">
          <h2 className="font-heading text-2xl font-bold mb-4">
            <Link href={section.link} className="hover:text-primary transition-colors">{section.title}</Link>
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {section.stats.map((stat, i) => (
              <div key={stat.label} className={`flex justify-between items-center px-5 py-3 ${i > 0 ? 'border-t border-gray-100' : ''} hover:bg-gray-50 transition-colors`}>
                <span className="text-gray-700">{stat.label}</span>
                {stat.link ? (
                  <Link href={stat.link} className="font-bold text-primary hover:underline">{stat.value}</Link>
                ) : (
                  <span className="font-bold text-gray-900">{stat.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center mb-10">
        <h2 className="font-heading text-2xl font-bold mb-3">Want to Go Deeper?</h2>
        <p className="text-gray-600 mb-5">Explore our interactive tools, analysis articles, and downloadable datasets.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/dashboard" className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors">Dashboard</Link>
          <Link href="/compare" className="bg-white border border-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">Compare Tool</Link>
          <Link href="/analysis" className="bg-white border border-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">14 Analysis Articles</Link>
          <Link href="/downloads" className="bg-white border border-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">Download Data</Link>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Source: Department of Justice EOIR, Department of Homeland Security, U.S. Customs and Border Protection, USCIS.
        Data current through February 2026. <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>

      {/* FAQ Schema for key questions */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many immigration court cases are pending in 2026?', acceptedAnswer: { '@type': 'Answer', text: `As of February 2026, there are approximately ${stats.pendingCases.toLocaleString()} pending cases in U.S. immigration courts, according to DOJ EOIR data.` }},
          { '@type': 'Question', name: 'How many immigration judges are there?', acceptedAnswer: { '@type': 'Answer', text: `There are ${stats.totalJudges.toLocaleString()} immigration judges across ${stats.totalCourts} courts in the United States, as of February 2026.` }},
          { '@type': 'Question', name: 'What is the asylum grant rate?', acceptedAnswer: { '@type': 'Answer', text: `The overall asylum grant rate is approximately ${((stats.asylumGranted / (stats.asylumGranted + stats.asylumDenied)) * 100).toFixed(1)}%, based on ${stats.asylumGranted.toLocaleString()} grants and ${stats.asylumDenied.toLocaleString()} denials in EOIR data.` }},
          { '@type': 'Question', name: 'How many people were encountered at the border?', acceptedAnswer: { '@type': 'Answer', text: `CBP encountered ${border.grandTotal.toLocaleString()} people at U.S. borders between FY2020 and FY2026, with the majority at the southwest border.` }},
          { '@type': 'Question', name: 'How long does an immigration court case take?', acceptedAnswer: { '@type': 'Answer', text: `The average immigration court case takes ${wait.avgDaysOverall} days (${wait.avgYearsOverall} years). Some courts average over 2.5 years per case.` }},
        ]
      }) }} />
    </div>
  )
}
