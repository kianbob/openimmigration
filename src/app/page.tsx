import Link from 'next/link'

// Key statistics from EOIR/TRAC (as of December 2025)
const STATS = {
  pendingCases: 3377998,
  asylumBacklog: 2339623,
  deportedFY2026: 149706,
  deportationRate: 78.5,
  representationRate: 26.7,
  newCasesFY2026: 130642,
  closedFY2026: 193858,
  dataThrough: 'December 2025',
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            U.S. Immigration Court Data
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-2 max-w-3xl mx-auto">
            Explore millions of immigration court records from the Department of Justice.
            Cases, outcomes, judges, backlogs — all in one place.
          </p>
          <p className="text-sm text-blue-200 mb-8">
            Data from DOJ EOIR · Updated through {STATS.dataThrough} · Open data, no paywalls
          </p>

          {/* Quick stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              📊 {STATS.pendingCases.toLocaleString()} Pending Cases
            </span>
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              🛡️ {STATS.asylumBacklog.toLocaleString()} Awaiting Asylum Hearings
            </span>
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              ⚖️ {STATS.deportationRate}% Ordered Deported
            </span>
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              👔 Only {STATS.representationRate}% Had Lawyers
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

      {/* Explore Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Explore the Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Immigration Courts', desc: 'Case volumes, backlogs, and outcomes for all 68 immigration courts across the U.S.', href: '/courts', icon: '🏛️' },
            { title: 'By Nationality', desc: 'How cases differ by country of origin — outcomes, representation rates, and wait times.', href: '/nationalities', icon: '🌍' },
            { title: 'Judge Statistics', desc: 'Asylum grant rates, case volumes, and decision patterns for every immigration judge.', href: '/judges', icon: '⚖️' },
            { title: 'By State', desc: 'Where immigration cases concentrate — state-level breakdowns of caseloads and outcomes.', href: '/states', icon: '📍' },
            { title: 'Court Backlog', desc: 'The 3.6 million case backlog — how it grew, where it\'s worst, and what\'s being done.', href: '/backlog', icon: '📈' },
            { title: 'Asylum Cases', desc: 'Asylum grant rates, denial rates, and how outcomes vary by court, judge, and nationality.', href: '/asylum', icon: '🛡️' },
            { title: 'Charges & Offenses', desc: 'What immigration charges are most common and how they correlate with case outcomes.', href: '/charges', icon: '📋' },
            { title: 'Representation', desc: 'How having a lawyer changes outcomes — represented vs. unrepresented case analysis.', href: '/representation', icon: '👔' },
            { title: 'Search Cases', desc: 'Search and filter immigration court data by court, nationality, year, case type, and more.', href: '/search', icon: '🔍' },
          ].map(card => (
            <Link key={card.href} href={card.href}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
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
          <h2 className="font-heading text-3xl font-bold text-center mb-6">What Is This?</h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              <strong>OpenImmigration</strong> is a free, open-data platform that makes U.S. immigration court records
              accessible and understandable. We process raw data from the Department of Justice&apos;s Executive Office
              for Immigration Review (EOIR) — the agency that runs all immigration courts in the United States.
            </p>
            <p>
              The immigration court system currently faces a backlog of over <strong>3.6 million cases</strong>.
              Wait times can exceed 4 years. Asylum grant rates vary wildly between judges — from under 10% to over 90%.
              Whether someone wins their case can depend more on which judge and court they&apos;re assigned to than
              the merits of their case.
            </p>
            <p>
              We believe this data should be accessible to everyone — journalists, researchers, policymakers,
              immigration attorneys, and the public. No paywalls. No registration. Just data.
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Key Findings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'The Backlog Crisis', desc: 'How the immigration court backlog grew from 200,000 to 3.6 million cases in just 15 years — and why it keeps growing.', href: '/analysis/backlog-crisis' },
            { title: 'Judge Roulette', desc: 'Asylum outcomes vary dramatically by judge. Some grant 90%+ of cases. Others deny 90%+. Same law, wildly different results.', href: '/analysis/judge-variation' },
            { title: 'Representation Gap', desc: 'Immigrants with attorneys win their cases at 5x the rate of those without. But only about 37% have representation.', href: '/analysis/representation-gap' },
            { title: 'Geographic Lottery', desc: 'Your odds of winning asylum depend heavily on where your case is heard. New York vs. Atlanta can mean the difference between freedom and deportation.', href: '/analysis/geographic-lottery' },
          ].map(article => (
            <Link key={article.href} href={article.href}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <h3 className="font-heading text-xl font-bold">{article.title}</h3>
              <p className="text-gray-600 mt-2">{article.desc}</p>
              <span className="text-primary text-sm font-medium mt-3 inline-block">Read analysis →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
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
