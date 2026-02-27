import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { titleCase } from '@/lib/utils'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export default function HomePage() {
  const stats = loadData('stats.json')
  const nationalities = loadData('nationalities.json').slice(0, 10)
  const trends = loadData('yearly-trends.json')

  const recentYears = trends.filter((t: { year: number }) => t.year >= 2015)
  const latestYear = recentYears[recentYears.length - 1]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            {(stats.totalCases / 1e6).toFixed(1)} Million Cases.<br className="hidden md:block" /> {stats.totalJudges.toLocaleString()} Judges. One System.
          </h1>
          <p className="text-lg text-blue-200 mb-0 max-w-2xl mx-auto">
            The most comprehensive open database of U.S. immigration court records — outcomes, backlogs, asylum decisions, and judge statistics from official DOJ data.
          </p>
          <p className="text-sm text-blue-200 mb-2">
            Data from DOJ EOIR · Open data, no paywalls
          </p>
          <p className="inline-block bg-white/15 backdrop-blur text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            📅 Data updated February 2026
          </p>

          {/* Quick stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              📊 {stats.pendingCases.toLocaleString()} Pending Cases
            </span>
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              🛡️ {stats.asylumGranted.toLocaleString()} Asylum Grants
            </span>
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              ⚖️ {stats.removalOrders.toLocaleString()} Removal Orders
            </span>
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              👔 Only {stats.representationRate}% Had Lawyers
            </span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/dashboard" className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Explore Dashboard
            </Link>
            <Link href="/backlog" className="bg-white/10 border border-white/30 px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
              Court Backlog
            </Link>
            <Link href="/asylum" className="bg-white/10 border border-white/30 px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
              Asylum Cases
            </Link>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-heading text-3xl font-bold text-center mb-8">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary">{(stats.totalCases / 1e6).toFixed(1)}M</div>
            <div className="text-sm text-gray-600">Total Cases</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary">{(stats.pendingCases / 1e6).toFixed(1)}M</div>
            <div className="text-sm text-gray-600">Pending Cases</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary">{stats.totalJudges.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Immigration Judges</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary">{stats.totalCourts}</div>
            <div className="text-sm text-gray-600">Immigration Courts</div>
          </div>
        </div>
      </section>

      {/* Top Nationalities */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-center mb-6">Top Countries of Origin</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">#</th>
                  <th className="px-4 py-3 text-left font-semibold">Nationality</th>
                  <th className="px-4 py-3 text-right font-semibold">Total Cases</th>
                </tr>
              </thead>
              <tbody>
                {nationalities.map((n: { code: string; name: string; cases: number }, i: number) => {
                  const slug = n.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  return (
                    <tr key={n.code} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-2 font-medium">
                        <Link href={`/nationalities/${slug}`} className="text-primary hover:underline">{titleCase(n.name)}</Link>
                      </td>
                      <td className="px-4 py-2 text-right">{n.cases.toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-3">
            <Link href="/nationalities" className="text-primary text-sm font-medium hover:underline">
              View all {stats.totalNationalities} nationalities →
            </Link>
          </p>
        </div>
      </section>

      {/* Explore Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Explore the Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Immigration Courts', desc: `Case volumes, backlogs, and outcomes for all ${stats.totalCourts} immigration courts across the U.S.`, href: '/courts', icon: '🏛️' },
            { title: 'By Nationality', desc: `How cases differ by country of origin — ${stats.totalNationalities} nationalities with outcomes and case data.`, href: '/nationalities', icon: '🌍' },
            { title: 'Judge Statistics', desc: `Asylum grant rates, case volumes, and decision patterns for ${stats.totalJudges.toLocaleString()} immigration judges.`, href: '/judges', icon: '⚖️' },
            { title: 'By State', desc: 'Where immigration cases concentrate — state-level breakdowns of caseloads and outcomes.', href: '/states', icon: '📍' },
            { title: 'Court Backlog', desc: `The ${(stats.pendingCases / 1e6).toFixed(1)} million case backlog — how it grew, where it's worst, and what's being done.`, href: '/backlog', icon: '📈' },
            { title: 'Asylum Cases', desc: `${stats.asylumGranted.toLocaleString()} asylum grants vs ${stats.asylumDenied.toLocaleString()} denials. How outcomes vary by court, judge, and nationality.`, href: '/asylum', icon: '🛡️' },
            { title: 'Charges & Offenses', desc: 'What immigration charges are most common and how they correlate with case outcomes.', href: '/charges', icon: '📋' },
            { title: 'Representation', desc: `Only ${stats.representationRate}% had lawyers. How having a lawyer changes immigration court outcomes.`, href: '/representation', icon: '👔' },
            { title: 'Deportation Data', desc: `${stats.removalOrders.toLocaleString()} removal orders, ${stats.voluntaryDeparture.toLocaleString()} voluntary departures. How deportation works.`, href: '/deportation', icon: '⚙️' },
            { title: 'Demographics', desc: '59% male, 40% female. 92% non-English speakers. Gender, language, and custody breakdowns.', href: '/demographics', icon: '📊' },
            { title: 'Border Encounters', desc: '12M+ CBP encounters since FY2020. Monthly trends, top nationalities, southwest border data.', href: '/border', icon: '🌎' },
            { title: 'ICE Enforcement', desc: 'Deportation statistics, ICE arrests, detention data, and the gap between court orders and actual removals.', href: '/enforcement', icon: '🚨' },
            { title: 'Legal Immigration', desc: '~1M green cards/year, refugees, naturalizations, and temporary visa admissions.', href: '/legal-immigration', icon: '🗽' },
            { title: 'Visa Overstays', desc: '478K+ per year (FY2024). The often-overlooked other half of unauthorized immigration.', href: '/overstays', icon: '✈️' },
            { title: 'Drug Seizures', desc: '65,000 lbs of fentanyl seized. 1.9M total lbs of drugs intercepted at U.S. borders.', href: '/drug-seizures', icon: '💊' },
            { title: 'Wait Times', desc: 'Average case takes 1.1 years. Some courts average 2.7 years. How long does immigration court take?', href: '/wait-times', icon: '⏱️' },
            { title: 'TPS Status', desc: '1M+ pending TPS applications. Venezuela (403K), Haiti (331K), Ukraine (143K).', href: '/tps', icon: '🛡️' },
            { title: 'Appeals to the BIA', desc: '1.46M appeals to the Board of Immigration Appeals. 31% dismissed, only 7.2% sustained.', href: '/appeals', icon: '📑' },
            { title: 'Bond Hearings', desc: '1.59M bond hearings. Average bond $11,412. Only 4.3% of requests granted.', href: '/bond', icon: '🔓' },
            { title: 'Compare Tool', desc: 'Compare up to 5 courts or judges side by side. Grant rates, caseloads, and outcomes at a glance.', href: '/compare', icon: '📊' },
            { title: 'Statistics', desc: 'All the key numbers in one place. Immigration courts, border, enforcement, legal pathways.', href: '/statistics', icon: '📈' },
            { title: 'Glossary', desc: `${34} key terms defined — from asylum to voluntary departure. Understand the system.`, href: '/glossary', icon: '📖' },
            { title: 'Search Cases', desc: 'Search and filter immigration court data by court, nationality, year, case type, and more.', href: '/search', icon: '🔍' },
          ].map(card => (
            <Link key={card.href} href={card.href}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all group">
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-heading text-lg font-bold group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What Is This Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-6">Why This Data Matters</h2>
          <div className="max-w-3xl mx-auto space-y-5 text-lg text-gray-600 text-center">
            <p>
              <strong className="text-gray-900">OpenImmigration</strong> is a free, open-data platform that makes U.S. immigration
              court records accessible and understandable. We process raw data from the Department of Justice&apos;s
              Executive Office for Immigration Review (EOIR) — the agency that runs all immigration courts in the United States.
            </p>
            <p>
              The immigration court system currently faces a backlog of over <strong className="text-gray-900">{(stats.pendingCases / 1e6).toFixed(1)} million cases</strong>.
              Asylum grant rates vary wildly between judges — from under 10% to over 90%.
              Whether someone wins their case can depend more on which judge and court they&apos;re assigned to than
              the merits of their case.
            </p>
            <p>
              We believe this data should be accessible to everyone — journalists, researchers, policymakers,
              immigration attorneys, and the public. <strong className="text-gray-900">No paywalls. No registration. Just data.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Key Findings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'The Backlog Crisis', desc: `How the immigration court backlog grew to ${(stats.pendingCases / 1e6).toFixed(1)} million cases — and why it keeps growing.`, href: '/analysis/backlog-crisis' },
            { title: 'Judge Roulette', desc: 'Asylum outcomes vary dramatically by judge. Some grant 90%+ of cases. Others deny 90%+. Same law, wildly different results.', href: '/analysis/judge-variation' },
            { title: 'Representation Gap', desc: `Immigrants with attorneys win their cases at 5x the rate of those without. But only about ${stats.representationRate}% have representation.`, href: '/analysis/representation-gap' },
            { title: 'Geographic Lottery', desc: 'Your odds of winning asylum depend heavily on where your case is heard. New York vs. Atlanta can mean the difference between freedom and deportation.', href: '/analysis/geographic-lottery' },
            { title: 'The Deportation Machine', desc: `${stats.removalOrders.toLocaleString()} removal orders, ${(814501).toLocaleString()} voluntary departures. How cases flow through the system.`, href: '/analysis/deportation-machine' },
            { title: 'Asylum by Nationality', desc: 'From Mexico to Venezuela to Eritrea — how country of origin shapes outcomes in immigration court.', href: '/analysis/asylum-by-nationality' },
            { title: 'In Absentia Orders', desc: `${stats.inAbsentia.toLocaleString()} people ordered deported without being present. 1 in 8 cases ends this way.`, href: '/analysis/in-absentia' },
            { title: 'Detained vs. Released', desc: 'How custody status determines outcomes — detained immigrants face longer odds and fewer options.', href: '/analysis/detained-vs-released' },
            { title: 'The Fentanyl Pipeline', desc: '65,000 lbs of fentanyl seized — but most comes through legal ports of entry, not between them.', href: '/analysis/fentanyl-pipeline' },
            { title: 'The Speed of Justice', desc: 'We analyzed 12.4 million proceedings. Average case takes 397 days. Some courts average 2.7 years.', href: '/analysis/speed-of-justice' },
            { title: 'From Border to Courtroom', desc: `12M encounters → ${(stats.pendingCases / 1e6).toFixed(1)}M pending cases → outcomes. The full immigration pipeline.`, href: '/analysis/border-to-courtroom' },
            { title: 'Children Facing Judges Alone', desc: 'Tens of thousands of unaccompanied minors in immigration court — most without lawyers.', href: '/analysis/children-in-court' },
          ].map(article => (
            <Link key={article.href} href={article.href}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <h3 className="font-heading text-xl font-bold">{article.title}</h3>
              <p className="text-gray-600 mt-2">{article.desc}</p>
              <span className="text-primary text-sm font-medium mt-3 inline-block">Read analysis →</span>
            </Link>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link href="/analysis" className="text-primary font-medium hover:underline">View all 14 analyses →</Link>
        </p>
      </section>

      {/* Organization JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'OpenImmigration',
          url: 'https://www.openimmigration.us',
          description: 'Free, open-data platform making U.S. immigration court records accessible.',
          parentOrganization: {
            '@type': 'Organization',
            name: 'TheDataProject.ai',
            url: 'https://thedataproject.ai',
          },
        })
      }} />

      {/* WebSite JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'OpenImmigration',
          url: 'https://www.openimmigration.us',
          description: 'Explore millions of U.S. immigration court records from the Department of Justice.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.openimmigration.us/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          publisher: {
            '@type': 'Organization',
            name: 'TheDataProject.ai',
            url: 'https://thedataproject.ai',
          },
        })
      }} />
    </>
  )
}
