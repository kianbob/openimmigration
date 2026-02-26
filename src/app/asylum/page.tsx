import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { AsylumOutcomePie, YearlyAsylumChart } from './AsylumCharts'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

const OUTCOME_LABELS: Record<string, string> = {
  'Relief Granted': 'Relief Granted (Asylum/Other)',
  'Deport': 'Deportation Order',
  'Voluntary Departure': 'Voluntary Departure',
  'Dismissed by IJ': 'Dismissed by Judge',
  'Administrative Closing - Other': 'Administrative Closure',
  'Exclude': 'Exclusion Order',
  'Transfer': 'Transfer to Another Court',
  'Other Administrative Completion': 'Other Administrative Completion',
  'Deny': 'Application Denied',
  'Grant': 'Application Granted',
  'Withdraw': 'Case Withdrawn',
  'Remove-INA Withholding Granted': 'Withholding of Removal (INA)',
  'Remove-CAT Withholding Granted': 'CAT Protection Granted',
  'Remove-CAT Deferral Granted': 'CAT Deferral Granted',
  'Rescind': 'Prior Order Rescinded',
  'Jurisdiction Transferred to the BIA': 'Appealed to BIA',
  'Vacate - DHS Decision and Credible Fear': 'Credible Fear Vacated',
}

const HIDE_OUTCOMES = ['ZERO BOND', '', 'Lifted Detained Status', 'Haitian', 'Withdrawn', 'Grant-CAT Withholding', 'Vacate - DHS Decision and Alien\'s Claimed Status Valid', 'DHS Decision and Reasonable Fear']

export const metadata: Metadata = {
  title: 'Asylum Cases — Grant Rates, Denials & Trends',
  description: 'Explore U.S. asylum case data — grant rates, denial rates, and how outcomes vary by court, judge, and nationality.',
}

export default function AsylumPage() {
  const stats = loadData('stats.json')
  const outcomes = loadData('outcomes.json')
  const trends = loadData('yearly-trends.json')

  const grantRate = ((stats.asylumGranted / (stats.asylumGranted + stats.asylumDenied)) * 100).toFixed(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Asylum Cases' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Asylum Cases</h1>
      <p className="text-lg text-gray-600 mb-8">
        Of {stats.totalCases.toLocaleString()} total immigration cases, asylum decisions account for
        <strong> {(stats.asylumGranted + stats.asylumDenied).toLocaleString()}</strong> outcomes —
        with a <strong>{grantRate}%</strong> grant rate overall.
        This means roughly {Math.round(Number(grantRate) / 100 * (stats.asylumGranted + stats.asylumDenied)).toLocaleString()} out
        of every {(stats.asylumGranted + stats.asylumDenied).toLocaleString()} asylum seekers with a final decision were granted protection.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-success">{stats.asylumGranted.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Asylum Granted (All Time)</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-danger">{stats.asylumDenied.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Asylum Denied (All Time)</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{grantRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Overall Grant Rate</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-warning">{stats.pendingCases.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Pending Cases</div>
        </div>
      </div>

      {/* Pie Chart */}
      <h2 className="font-heading text-2xl font-bold mb-4">Asylum Grants vs Denials</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-12">
        <AsylumOutcomePie granted={stats.asylumGranted} denied={stats.asylumDenied} />
      </div>

      {/* Yearly Chart */}
      <h2 className="font-heading text-2xl font-bold mb-4">Asylum Grants & Denials by Year</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-12">
        <YearlyAsylumChart data={trends} />
      </div>

      {/* How Asylum Works */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">How Asylum Works in Immigration Court</h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Asylum is a form of protection that allows individuals who meet the definition of a &quot;refugee&quot; to
            remain in the United States. To qualify, an applicant must demonstrate that they have suffered persecution
            or have a well-founded fear of persecution based on race, religion, nationality, membership in a particular
            social group, or political opinion.
          </p>
          <p>
            Most asylum cases in immigration court are &quot;defensive&quot; asylum claims — filed by individuals who are
            already in removal proceedings. The immigration judge hears the case and decides whether to grant asylum,
            another form of relief, or order deportation.
          </p>
        </div>
      </section>

      {/* Other Outcomes */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">All Case Outcomes</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Outcome</th>
                <th className="px-4 py-3 text-right font-semibold">Count</th>
              </tr>
            </thead>
            <tbody>
              {outcomes
                .filter((o: { name: string; count: number }) => o.name && o.count > 500 && !HIDE_OUTCOMES.includes(o.name))
                .map((o: { name: string; count: number }) => (
                <tr key={o.name} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{OUTCOME_LABELS[o.name] || o.name}</td>
                  <td className="px-4 py-2 text-right">{o.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Issues */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold mb-4">Key Issues in Asylum Adjudication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/analysis/judge-variation" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">Judge Variation</h3>
            <p className="text-sm text-gray-600">Asylum grant rates vary dramatically by judge — some grant 90%+, others deny 90%+.</p>
          </Link>
          <Link href="/analysis/representation-gap" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">Representation Gap</h3>
            <p className="text-sm text-gray-600">Only {stats.representationRate}% of immigrants had lawyers. Representation dramatically changes outcomes.</p>
          </Link>
          <Link href="/analysis/geographic-lottery" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">Geographic Lottery</h3>
            <p className="text-sm text-gray-600">Where your case is heard matters enormously — grant rates vary wildly between courts.</p>
          </Link>
          <Link href="/backlog" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <h3 className="font-heading text-lg font-bold mb-2">The Backlog</h3>
            <p className="text-sm text-gray-600">{stats.pendingCases.toLocaleString()} cases pending — many applicants waiting years for hearings.</p>
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the asylum grant rate in U.S. immigration courts?',
              acceptedAnswer: { '@type': 'Answer', text: `The overall asylum grant rate is ${grantRate}%, with ${stats.asylumGranted.toLocaleString()} grants and ${stats.asylumDenied.toLocaleString()} denials across all recorded cases.` },
            },
            {
              '@type': 'Question',
              name: 'How many asylum cases are pending?',
              acceptedAnswer: { '@type': 'Answer', text: `As of ${stats.lastUpdated}, there are ${stats.pendingCases.toLocaleString()} total pending immigration court cases.` },
            },
          ],
        })
      }} />
    </div>
  )
}
