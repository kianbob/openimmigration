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
  title: 'In Absentia — 2.1 Million Deported Without Being Present',
  description: '2,162,444 immigration proceedings ended in absentia — 13.3% of all cases. Ordered deported without anyone hearing their side. Explore the data.',
}

export default function InAbsentiaPage() {
  const stats = loadData('stats.json')
  const trends = loadData('yearly-trends.json')
  const rate = ((stats.inAbsentia / stats.totalProceedings) * 100).toFixed(1)

  // Calculate some derived stats
  const grantRate = ((stats.asylumGranted / (stats.asylumGranted + stats.asylumDenied)) * 100).toFixed(1)
  const recentTrends = trends.filter((t: { year: number }) => t.year >= 2019 && t.year <= 2025)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'In Absentia Orders' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Due Process</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Ordered Deported Without Showing Up</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.inAbsentia.toLocaleString()} immigration proceedings — {rate}% of all {stats.totalProceedings.toLocaleString()} proceedings —
        ended with an &quot;in absentia&quot; order. That&apos;s 2.1 million people ordered deported without anyone
        hearing their side of the story.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 not-prose">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">2.16M</div>
          <div className="text-xs text-gray-600 mt-1">In Absentia Orders</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">{rate}%</div>
          <div className="text-xs text-gray-600 mt-1">Of All Proceedings</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">1 in 8</div>
          <div className="text-xs text-gray-600 mt-1">Cases Decided Empty</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">{stats.representationRate}%</div>
          <div className="text-xs text-gray-600 mt-1">Had a Lawyer</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Actually Happens</h2>
        <p>
          Here&apos;s how it works: a hearing is scheduled. The respondent doesn&apos;t show up. The immigration
          judge waits, confirms that notice was sent, and then proceeds without them. The ICE attorney presents
          the government&apos;s case — requesting removal. Nobody argues the other side. The judge issues a
          removal order.
        </p>
        <p>
          No evidence is examined. No witnesses are heard. No asylum claim is evaluated. The person is
          ordered deported based entirely on the government&apos;s one-sided presentation. If they had a
          strong case — and many did — it doesn&apos;t matter. They weren&apos;t there to make it.
        </p>
        <p>
          For context: among cases that <em>are</em> actually heard, the grant rate is {grantRate}%. Some unknown
          percentage of those 2.1 million in absentia cases would have won if they&apos;d shown up.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why 2.1 Million People Didn&apos;t Show Up</h2>
        <p>
          The popular narrative is simple: they&apos;re evading the system. The reality is more complicated
          and far more mundane:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">📬 Notice Failures</div>
            <p className="text-sm text-gray-600">
              The government mails hearing notices to the address on file. Immigrants move constantly — fleeing
              domestic violence, following seasonal work, crashing with relatives. A notice sent to an old apartment
              in Omaha won&apos;t reach someone now in Dallas. The government says it sent notice. The respondent
              says they never got it. There&apos;s often no way to verify.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">📅 Rescheduling Chaos</div>
            <p className="text-sm text-gray-600">
              Courts routinely reschedule hearings months or years out. A hearing set for March 2023 might get
              moved to November 2027. The respondent needs to actively track these changes — something nearly
              impossible without an attorney. Many people show up on their original date to find they were
              supposed to come last month.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">👔 No Lawyer</div>
            <p className="text-sm text-gray-600">
              Only {stats.representationRate}% of respondents have attorneys. Lawyers track court dates, file
              address changes, request continuances, and ensure clients appear. Without one, you&apos;re navigating
              a complex legal system alone — in a language you may not speak. Studies show represented respondents
              are dramatically less likely to miss hearings.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-lg font-bold mb-2">🚗 Can&apos;t Get There</div>
            <p className="text-sm text-gray-600">
              Immigration courts are only in {stats.totalCourts} cities. If you live in rural Mississippi and your
              court is in Memphis, that&apos;s a day trip — if you have a car and can take off work. Many
              immigrants can&apos;t drive legally, can&apos;t miss work without getting fired, or can&apos;t
              afford childcare for the day.
            </p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The 2024-2025 Explosion</h2>
        <p>
          The in absentia problem got dramatically worse in the last two years. As courts pushed to clear the
          backlog, case completions surged — from 965,176 in 2023 to 1,290,672 in 2024 and 1,298,639 in 2025.
          A significant portion of this &quot;clearance&quot; came from in absentia orders.
        </p>
        <p>
          The math is telling: in 2024, courts completed 1.29 million cases but only granted relief to 48,485.
          In 2025, they completed 1.3 million but only granted relief to 37,341. That&apos;s a grant rate of
          3.8% and 2.9% respectively — far below historical norms. Many of those non-grant completions were
          in absentia removals.
        </p>

        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Year</th>
                <th className="px-4 py-3 text-right font-semibold">Filed</th>
                <th className="px-4 py-3 text-right font-semibold">Completed</th>
                <th className="px-4 py-3 text-right font-semibold">Grants</th>
                <th className="px-4 py-3 text-right font-semibold">Grant %</th>
              </tr>
            </thead>
            <tbody>
              {recentTrends.map((t: { year: number; filed: number; completed: number; grants: number }) => (
                <tr key={t.year} className="border-t border-gray-100">
                  <td className="px-4 py-2 font-medium">{t.year}</td>
                  <td className="px-4 py-2 text-right">{t.filed.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{t.completed.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{t.grants.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{((t.grants / t.completed) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Can You Reopen an In Absentia Order?</h2>
        <p>
          Yes — but it&apos;s hard. You must file a motion to reopen within 180 days (or at any time if you
          can show you never received proper notice). You must prove either:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Lack of notice:</strong> You didn&apos;t receive the hearing notice, or it was sent to the wrong address. The burden of proof is on you.</li>
          <li><strong>Exceptional circumstances:</strong> Battery, serious illness, or your attorney was ineffective. The bar is high — &quot;I didn&apos;t know about the hearing&quot; usually isn&apos;t enough.</li>
        </ul>
        <p>
          The cruel irony: reopening requires navigating the legal system — the same system the person
          couldn&apos;t navigate well enough to attend their hearing in the first place. Without an attorney,
          reopening is nearly impossible.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Bigger Picture</h2>
        <p>
          In absentia orders serve a practical purpose: the system can&apos;t wait indefinitely for people who
          don&apos;t appear. But the scale — 2.1 million cases, 13.3% of all proceedings — raises fundamental
          questions about whether this is due process or just processing.
        </p>
        <p>
          Consider: we have an immigration court system where only {stats.representationRate}% have lawyers,
          notices are sent by mail to transient populations, courts exist in only {stats.totalCourts} cities,
          and hearings get rescheduled years into the future. Then we act surprised when 1 in 8 people
          don&apos;t show up.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-900 mb-2">The Compounding Problem</h3>
              <p className="text-sm text-red-800">
                In absentia orders don&apos;t just remove people — they create a cascade. The person now has a
                removal order on their record. If they&apos;re still in the country, they live in the shadows.
                If they file a motion to reopen, that&apos;s another case on the backlog. If they don&apos;t,
                they&apos;re permanently barred from most forms of immigration relief. One missed hearing can
                foreclose an entire life in America.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Only {stats.representationRate}% have lawyers — the root cause.</p>
        </Link>
        <Link href="/analysis/backlog-crisis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Backlog Crisis</h3>
          <p className="text-sm text-gray-600 mt-1">The 1.9 million pending cases driving the system.</p>
        </Link>
        <Link href="/analysis/deportation-machine" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚙️ Deportation Machine</h3>
          <p className="text-sm text-gray-600 mt-1">All the ways the system processes removal.</p>
        </Link>
      </div>

      <RelatedAnalysis current="in-absentia" />
      <ShareButtons url="https://www.openimmigration.us/analysis/in-absentia" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'In Absentia — 2.1 Million Deported Without Being Present',
        url: 'https://www.openimmigration.us/analysis/in-absentia',
        publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
      }) }} />
    </div>
  )
}
