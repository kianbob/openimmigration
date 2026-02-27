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
            <Link href="/backlog" className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white/20 transition-colors">
              📊 {stats.pendingCases.toLocaleString()} Pending Cases
            </Link>
            <Link href="/asylum" className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white/20 transition-colors">
              🛡️ {stats.asylumGranted.toLocaleString()} Asylum Grants
            </Link>
            <Link href="/deportation" className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white/20 transition-colors">
              ⚖️ {stats.removalOrders.toLocaleString()} Removal Orders
            </Link>
            <Link href="/representation" className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white/20 transition-colors">
              👔 Only {stats.representationRate}% Had Lawyers
            </Link>
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

      {/* Explore Grid — Grouped */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-2">Explore the Data</h2>
        <p className="text-center text-gray-500 mb-12">Click any topic to dive into the data</p>

        {/* Courts & Judges */}
        <h3 className="font-heading text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
          Courts & Judges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'Immigration Courts', desc: `Case volumes, backlogs, and outcomes for all ${stats.totalCourts} courts.`, href: '/courts' },
            { title: 'Judge Statistics', desc: `Grant rates and decision patterns for ${stats.totalJudges.toLocaleString()} judges.`, href: '/judges' },
            { title: 'By Nationality', desc: `${stats.totalNationalities} nationalities with outcomes and case data.`, href: '/nationalities' },
            { title: 'By State', desc: 'State-level breakdowns of caseloads and outcomes.', href: '/states' },
            { title: 'Court Backlog', desc: `${(stats.pendingCases / 1e6).toFixed(1)}M pending cases — how it grew, where it's worst.`, href: '/backlog' },
            { title: 'Asylum Cases', desc: `${stats.asylumGranted.toLocaleString()} grants vs ${stats.asylumDenied.toLocaleString()} denials.`, href: '/asylum' },
            { title: 'Wait Times', desc: 'Average case: 1.1 years. Some courts: 2.7 years.', href: '/wait-times' },
            { title: 'Representation', desc: `Only ${stats.representationRate}% had lawyers. 5x better outcomes with one.`, href: '/representation' },
            { title: 'Deportation', desc: `${stats.removalOrders.toLocaleString()} removal orders. How deportation works.`, href: '/deportation' },
            { title: 'Charges', desc: 'Most common charges and how they affect outcomes.', href: '/charges' },
            { title: 'Demographics', desc: 'Gender, language, and custody breakdowns.', href: '/demographics' },
            { title: 'Appeals', desc: '1.46M BIA appeals. 31% dismissed, 7.2% sustained.', href: '/appeals' },
            { title: 'Bond Hearings', desc: 'Average bond $11,412. Only 4.3% granted.', href: '/bond' },
            { title: 'Children', desc: 'Unaccompanied minors in court — most without lawyers.', href: '/children' },
          ].map(c => (
            <Link key={c.href} href={c.href} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group">
              <h4 className="font-bold group-hover:text-primary transition-colors">{c.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>

        {/* Border & Enforcement */}
        <h3 className="font-heading text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Border & Enforcement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'Border Encounters', desc: '12M+ CBP encounters since FY2020. Trends by nationality and region.', href: '/border' },
            { title: 'ICE Enforcement', desc: 'Deportation stats, arrests, and the gap between orders and removals.', href: '/enforcement' },
            { title: 'Drug Seizures', desc: '65K lbs of fentanyl. 1.9M total lbs seized at U.S. borders.', href: '/drug-seizures' },
          ].map(c => (
            <Link key={c.href} href={c.href} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group">
              <h4 className="font-bold group-hover:text-primary transition-colors">{c.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>

        {/* Legal Pathways */}
        <h3 className="font-heading text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Legal Pathways
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'Legal Immigration', desc: '~1M green cards/year, refugees, naturalizations.', href: '/legal-immigration' },
            { title: 'Visa Overstays', desc: '478K+ per year. The overlooked half of unauthorized immigration.', href: '/overstays' },
            { title: 'TPS Status', desc: '1M+ pending applications. Venezuela, Haiti, Ukraine.', href: '/tps' },
            { title: 'DACA', desc: '515K active recipients. Program status and demographics.', href: '/daca' },
            { title: 'Green Cards', desc: 'Green card issuance by category and country.', href: '/green-card' },
            { title: 'Naturalization', desc: 'Path to citizenship — trends and processing data.', href: '/naturalization' },
          ].map(c => (
            <Link key={c.href} href={c.href} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group">
              <h4 className="font-bold group-hover:text-primary transition-colors">{c.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>

        {/* Tools & Reference */}
        <h3 className="font-heading text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Tools & Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'Compare Courts & Judges', desc: 'Side-by-side comparison of up to 5 courts or judges.', href: '/compare' },
            { title: 'Statistics at a Glance', desc: 'All key numbers in one place across all datasets.', href: '/statistics' },
            { title: 'Search', desc: 'Find any court, judge, or nationality instantly.', href: '/search' },
            { title: 'Glossary', desc: '34 immigration court terms defined and explained.', href: '/glossary' },
            { title: 'Timeline', desc: '235 years of U.S. immigration policy history.', href: '/timeline' },
            { title: 'Download Data', desc: '18 free JSON datasets for researchers and journalists.', href: '/downloads' },
          ].map(c => (
            <Link key={c.href} href={c.href} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all group">
              <h4 className="font-bold group-hover:text-primary transition-colors">{c.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
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
