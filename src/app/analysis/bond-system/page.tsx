import ArticleSchema from '@/components/ArticleSchema'
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
  title: 'The Price of Freedom — Immigration Bond and Detention',
  description: 'Average immigration bond: $11,412. Grant rate: 4.3%. 1.59 million bond hearings reveal a system where wealth determines who waits in jail and who waits at home.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/bond-system' },
}

export default function BondSystemPage() {
  const bonds = loadData('bonds.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Price of Freedom' },
      ]} />

      <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Detention</span>
      <h1 className="font-heading text-4xl font-bold mb-6">The Price of Freedom</h1>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-xl text-gray-600 mb-8">
          When ICE arrests an immigrant, a judge decides whether they stay locked up or go free on bond.
          Our data covers <strong>{(bonds.totalHearings / 1e6).toFixed(2)} million bond hearings</strong>.
          The average bond: <strong>${bonds.avgBondAmount?.toLocaleString()}</strong>.
          The grant rate: just <strong>{bonds.grantRate}%</strong>.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Immigration Bond, Explained</h2>
        <p>
          Immigration bond works like criminal bail — it&apos;s a financial guarantee that the person will appear
          for their court hearings. But there are critical differences:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No right to bond</strong> — Some categories of immigrants are subject to &quot;mandatory detention&quot;
          with no bond hearing at all (people with certain criminal convictions, arriving asylum seekers under
          some policies)</li>
          <li><strong>Bonds start at $1,500</strong> — But judges routinely set them at $5,000-$25,000 or higher</li>
          <li><strong>The median bond is ${bonds.medianBondAmount?.toLocaleString()}</strong> — More common than the
          average because a few very high bonds skew the mean up</li>
          <li><strong>No public defender</strong> — People argue for their own bond in a language most don&apos;t speak</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The 4.3% Grant Rate</h2>
        <p>
          Of {(bonds.totalHearings / 1e6).toFixed(2)} million bond hearings, only {bonds.grantRate}% result in
          bond being granted. The rest? Continued, denied, or administratively closed. This means the
          overwhelming majority of people who request bond remain detained.
        </p>
        <p>
          The grant rate varies dramatically by court. Judges in some courts grant bond at 10-15x the rate of
          others — for the same types of cases. This mirrors the &quot;judge roulette&quot; pattern we see in
          asylum cases: your outcome depends heavily on your judge, not your case.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Who Can Afford Freedom?</h2>
        <p>
          A ${bonds.avgBondAmount?.toLocaleString()} bond might not sound outrageous by American standards. But for
          someone recently arrested by ICE — often separated from family, with frozen bank accounts, earning
          below minimum wage or not working — it&apos;s insurmountable.
        </p>
        <p>
          The bond system creates a two-tier justice system:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Those who can pay</strong> go home, hire lawyers, gather evidence, and attend hearings.
          They win their cases at dramatically higher rates.</li>
          <li><strong>Those who can&apos;t pay</strong> stay in detention — isolated from lawyers and evidence,
          pressured to accept deportation to end the misery, and facing their hearings from inside a jail.</li>
        </ul>
        <p>
          Studies consistently show that detained immigrants are 2-4x more likely to be deported than
          non-detained immigrants with similar cases. Bond isn&apos;t just about comfort — it&apos;s a predictor of case outcome.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Bond Fund Movement</h2>
        <p>
          Community organizations now run bond funds — pooling donations to pay bond for immigrants who can&apos;t
          afford it. Since bond is returned when the person appears for court (minus a small fee), these funds
          are partially self-sustaining.
        </p>
        <p>
          The results are striking: people released on bond by these funds show up for court at rates above
          90% — debunking the &quot;flight risk&quot; justification for high bonds and detention. Most people show up
          because they want to win their case, not flee from it.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Cost of Detention</h2>
        <p>
          ICE detention costs the government approximately <strong>$150-$300 per person per day</strong>.
          For someone detained for a year awaiting their hearing, that&apos;s $55,000-$110,000 in taxpayer money —
          far more than the bond that would have released them.
        </p>
        <p>
          The U.S. detained an average of 25,000-40,000 people per day during this period, at an annual cost
          of $3-4 billion. Whether this represents necessary public safety spending or wasteful incarceration
          depends on your perspective — but the numbers are real.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Mandatory Detention</h2>
        <p>
          Many detained immigrants never get a bond hearing at all. Under INA § 236(c), people with certain
          criminal convictions are subject to mandatory detention — no judge can release them, regardless of
          circumstances. This includes minor drug offenses, old convictions that have already been served, and
          even some misdemeanors.
        </p>
        <p>
          The Supreme Court has upheld mandatory detention but required that detained immigrants receive
          periodic bond hearings after 6 months. In practice, these hearings shift the burden to the immigrant
          to prove they&apos;re not a danger or flight risk — while locked up and often without a lawyer.
        </p>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/bond-system" title="The Price of Freedom" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/bond" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🔓 Bond Data</h3>
          <p className="text-xs text-gray-600 mt-1">Full bond hearing statistics and trends.</p>
        </Link>
        <Link href="/analysis/detained-vs-released" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">⛓️ Detained vs. Released</h3>
          <p className="text-xs text-gray-600 mt-1">How custody status changes case outcomes.</p>
        </Link>
        <Link href="/representation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">👔 Representation</h3>
          <p className="text-xs text-gray-600 mt-1">Legal representation in immigration court.</p>
        </Link>
      </div>

      <RelatedAnalysis current="bond-system" />

      <ArticleSchema title="The Price of Freedom — Immigration Bond and Detention" description="$11,412 average bond. 4.3% grant rate. 1.59M bond hearings analyzed." url="https://www.openimmigration.us/analysis/bond-system" datePublished="2026-02-26" />
    </div>
  )
}
