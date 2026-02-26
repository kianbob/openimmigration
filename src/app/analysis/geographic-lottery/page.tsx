import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Geographic Lottery — Where You\'re Heard Determines Your Fate',
  description: 'Immigration court outcomes vary dramatically by location. Asylum grant rates can differ by 70+ percentage points between courts in different cities.',
}

export default function GeographicLotteryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Geographic Lottery' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Courts</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Geographic Lottery</h1>
      <p className="text-lg text-gray-600 mb-8">
        Where your immigration case is heard can matter more than the facts of your case.
        Asylum grant rates vary by <strong>70+ percentage points</strong> between courts in different cities.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Disparity</h2>
        <p>
          Immigration courts in <strong>New York City</strong> have historically granted asylum at rates above 50%.
          Courts in <strong>Atlanta</strong> have granted asylum at rates below 10%. An identical asylum claim —
          same country, same persecution, same evidence — can lead to protection in one city and deportation in another.
        </p>
        <p>
          This isn&apos;t a small statistical variation. It&apos;s a systemic pattern that has persisted for decades,
          across different administrations and policy regimes. Geography is destiny in immigration court.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Courts Differ</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Judge composition:</strong> Each court&apos;s judges were hired at different times under different
          administrations, creating different judicial philosophies within each courthouse.</li>
          <li><strong>Local legal culture:</strong> Courts develop internal norms about how cases are handled,
          how much time is given for hearings, and what evidence is considered sufficient.</li>
          <li><strong>Representation availability:</strong> Courts near major cities have more legal aid organizations,
          meaning higher representation rates and better-prepared cases.</li>
          <li><strong>DHS prosecution patterns:</strong> ICE trial attorneys in different districts may pursue cases
          differently, affecting outcomes.</li>
          <li><strong>Case mix:</strong> Some courts see more cases from certain nationalities or case types,
          which naturally affects aggregate statistics.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Biggest Courts</h2>
        <p>
          As of December 2025, the courts with the most pending cases are concentrated in a few metro areas:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Miami, FL</strong> — 317,000 pending cases</li>
          <li><strong>New York City, NY</strong> — 240,000 pending cases</li>
          <li><strong>Orlando, FL</strong> — 227,000 pending cases</li>
          <li><strong>Dallas, TX</strong> — 220,000 pending cases</li>
        </ul>
        <p>
          Florida courts alone account for a massive share of the national backlog, reflecting the
          concentration of recent migration from Cuba, Venezuela, Haiti, and Central America.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What This Means</h2>
        <p>
          The geographic lottery raises fundamental questions about equal justice. Federal immigration law
          is supposed to be applied uniformly across the country. In practice, the system produces wildly
          different outcomes depending on an accident of geography.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ Miami has the most pending cases (317K), followed by NYC (240K) and Orlando (227K)</li>
                <li>→ Asylum grant rates can vary by 70+ percentage points between courts</li>
                <li>→ Courts near legal aid organizations have higher representation rates and different outcomes</li>
                <li>→ The pattern has persisted for decades regardless of which party holds the White House</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/courts" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🏛️ Court Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore outcomes and backlogs for all 68 immigration courts.</p>
        </Link>
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Variation</h3>
          <p className="text-sm text-gray-600 mt-1">How individual judges differ within the same court.</p>
        </Link>
      </div>
    </div>
  )
}
