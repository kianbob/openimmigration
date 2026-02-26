import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Representation Gap — Only 26.7% of Immigrants Have Lawyers',
  description: 'Only 26.7% of immigrants in removal proceedings have legal representation. Those with attorneys are 5x more likely to win their cases.',
}

export default function RepresentationGapPage() {
  const stats = loadData('stats.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Representation Gap' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Access to Justice</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Representation Gap</h1>
      <p className="text-lg text-gray-600 mb-8">
        Only {stats.representationRate}% of immigrants in removal proceedings have legal representation.
        This single factor may be the most powerful predictor of case outcomes.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">No Right to an Attorney</h2>
        <p>
          Unlike criminal proceedings, there is <strong>no right to a government-appointed attorney</strong> in
          immigration court. If you can&apos;t afford a lawyer — and most immigrants can&apos;t — you represent yourself
          against a trained government prosecutor (ICE trial attorney) in a system with notoriously complex procedures.
        </p>
        <p>
          The result: out of {stats.totalCases.toLocaleString()} total cases in our data, roughly 73% of respondents
          had no legal representation at all. They navigated asylum applications, evidentiary submissions, legal arguments,
          and appeals entirely on their own — often in a language they don&apos;t speak fluently.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Outcome Gap</h2>
        <p>
          Research consistently shows that represented immigrants are <strong>5x more likely</strong> to win their cases
          than unrepresented ones. For asylum cases specifically, the gap is even starker — represented asylum seekers
          win at roughly 10x the rate of unrepresented ones.
        </p>
        <p>
          This isn&apos;t just because lawyers take stronger cases. Studies controlling for case strength still find
          enormous disparities. Attorneys know how to frame claims, gather evidence, prepare witnesses, file motions,
          and navigate a system designed for lawyers.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Geographic Disparities</h2>
        <p>
          Access to attorneys varies dramatically by location. Major cities have pro bono legal organizations,
          law school clinics, and immigration attorney networks. Rural areas and border courts — where many
          detained immigrants are held — have severe attorney shortages.
        </p>
        <p>
          An immigrant detained at a facility in rural Texas or Louisiana may have virtually no access to legal
          help. This compounds the <Link href="/analysis/geographic-lottery" className="text-primary hover:underline">geographic lottery</Link> —
          courts with low attorney access also tend to have low grant rates.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The In Absentia Connection</h2>
        <p>
          {stats.inAbsentia.toLocaleString()} proceedings — 13.3% of all proceedings — ended with an in absentia order,
          where the respondent didn&apos;t appear. Unrepresented immigrants are far more likely to miss hearings because
          they don&apos;t understand the system, don&apos;t receive proper notice, or don&apos;t know their court date changed.
          An attorney prevents most of these missed hearings.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Bottom Line</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ Only {stats.representationRate}% have legal representation</li>
                <li>→ Represented immigrants are ~5x more likely to win</li>
                <li>→ There is no constitutional right to an attorney in immigration court</li>
                <li>→ Attorney access varies dramatically by geography and detention status</li>
                <li>→ {stats.inAbsentia.toLocaleString()} in absentia orders — many preventable with representation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/representation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore representation rates across courts and case types.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚪 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.1 million cases decided without the respondent present.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'The Representation Gap — Only 26.7% of Immigrants Have Lawyers', url: 'https://www.openimmigration.us/analysis/representation-gap', publisher: { '@type': 'Organization', name: 'OpenImmigration' } }) }} />
    </div>
  )
}
