import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Detained vs. Released — How Custody Status Affects Immigration Outcomes',
  description: '6.4 million never detained, 2.1 million detained, 1.1 million released. How custody status correlates with immigration court outcomes.',
}

export default function DetainedVsReleasedPage() {
  const custody = loadData('custody.json')
  const stats = loadData('stats.json')
  const total = custody.reduce((s: number, c: { count: number }) => s + c.count, 0)
  const detained = custody.find((c: { code: string }) => c.code === 'D')
  const released = custody.find((c: { code: string }) => c.code === 'R')
  const never = custody.find((c: { code: string }) => c.code === 'N')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Detained vs. Released' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Custody</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Detained vs. Released</h1>
      <p className="text-lg text-gray-600 mb-8">
        Of {total.toLocaleString()} cases with custody data, {never?.count.toLocaleString()} were never detained,
        {' '}{detained?.count.toLocaleString()} were detained, and {released?.count.toLocaleString()} were released from custody.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        {/* Custody breakdown */}
        <div className="not-prose grid grid-cols-3 gap-4 my-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-blue-700">{(never?.count / 1e6).toFixed(1)}M</div>
            <div className="text-xs text-gray-600">Never Detained</div>
            <div className="text-xs text-gray-400">{((never?.count / total) * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-red-700">{(detained?.count / 1e6).toFixed(1)}M</div>
            <div className="text-xs text-gray-600">Detained</div>
            <div className="text-xs text-gray-400">{((detained?.count / total) * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-yellow-700">{(released?.count / 1e6).toFixed(1)}M</div>
            <div className="text-xs text-gray-600">Released</div>
            <div className="text-xs text-gray-400">{((released?.count / total) * 100).toFixed(1)}%</div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Detention and Outcomes</h2>
        <p>
          Detention status has a profound effect on case outcomes, though the relationship is complex and often
          counterintuitive. Research shows:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Detained immigrants are more likely to be deported:</strong> Detention limits access to attorneys, evidence gathering, and witness preparation. Detained individuals have less time and fewer resources to build their cases.</li>
          <li><strong>Detained proceedings move faster:</strong> Courts prioritize detained cases (since the government bears the cost of detention), which means less time to prepare — often weeks instead of months or years.</li>
          <li><strong>Access to attorneys plummets in detention:</strong> Many detention facilities are in remote locations with no immigration attorneys nearby. Legal aid organizations can&apos;t reach everyone.</li>
          <li><strong>Detained individuals are more likely to accept voluntary departure:</strong> Facing indefinite detention, many choose to leave rather than fight cases they might win with adequate preparation.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Never-Detained Majority</h2>
        <p>
          The largest group — {never?.count.toLocaleString()} cases ({((never?.count / total) * 100).toFixed(1)}%) —
          were never in government custody. These are primarily people who entered the country and were issued Notices
          to Appear (NTAs) without being detained — the &quot;non-detained docket&quot; that makes up the bulk of the backlog.
        </p>
        <p>
          Non-detained cases take much longer to resolve (often 3-5 years) but respondents have more time to find
          attorneys, gather evidence, and prepare their cases. This additional time, combined with better attorney
          access, generally leads to better outcomes — but also contributes to the massive backlog.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Released Category</h2>
        <p>
          {released?.count.toLocaleString()} cases involved people who were initially detained but later released —
          through bond hearings, parole, or orders of supervision. These individuals face a unique limbo: they were
          deemed enough of a risk to detain initially, but not enough to keep locked up. Their cases then join the
          non-detained docket.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Detention Paradox</h3>
              <p className="text-sm text-amber-800">
                Detained immigrants get faster hearings but worse outcomes. Non-detained immigrants wait years but
                have better access to attorneys and more time to build cases. The system essentially forces a choice
                between speed (with a higher chance of deportation) and delay (with better odds but years of uncertainty).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/bond" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">💰 Bond Hearings</h3>
          <p className="text-sm text-gray-600 mt-1">How bond decisions determine who stays detained.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Detention makes the attorney access problem worse.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'Detained vs. Released — How Custody Status Affects Immigration Outcomes', url: 'https://www.openimmigration.us/analysis/detained-vs-released', publisher: { '@type': 'Organization', name: 'OpenImmigration' } }) }} />
    </div>
  )
}
