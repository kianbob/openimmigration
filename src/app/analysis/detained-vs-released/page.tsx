import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Detained vs. Released — 2.1 Million Locked Up, 6.4 Million Not',
  description: 'How detention shapes immigration outcomes. 6.4M never detained, 2.1M detained, 1.1M released. Detained immigrants get faster hearings but worse outcomes.',
}

export default function DetainedVsReleasedPage() {
  const custody = loadData('custody.json')
  const stats = loadData('stats.json')
  const gender = loadData('gender.json')
  const total = custody.reduce((s: number, c: { count: number }) => s + c.count, 0)
  const detained = custody.find((c: { code: string }) => c.code === 'D')
  const released = custody.find((c: { code: string }) => c.code === 'R')
  const never = custody.find((c: { code: string }) => c.code === 'N')
  const male = gender.find((g: { code: string }) => g.code === 'M')
  const female = gender.find((g: { code: string }) => g.code === 'F')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Detained vs. Released' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Custody</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Detained vs. Released</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. immigration system handles {total.toLocaleString()} cases across three custody tracks:
        never detained, actively detained, and released from detention. Which track you&apos;re on may
        matter more than the strength of your case.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-10 not-prose">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-blue-700">{(never?.count / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Never Detained</div>
          <div className="text-xs text-gray-400">{((never?.count / total) * 100).toFixed(1)}% of cases</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-red-700">{(detained?.count / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Detained</div>
          <div className="text-xs text-gray-400">{((detained?.count / total) * 100).toFixed(1)}% of cases</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-amber-700">{(released?.count / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Released</div>
          <div className="text-xs text-gray-400">{((released?.count / total) * 100).toFixed(1)}% of cases</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Three Tracks</h2>
        <p>
          Immigration court operates two fundamentally different systems under one roof. The <strong>detained docket</strong> moves
          fast — cases are resolved in weeks or months because the government is paying to house the respondent.
          The <strong>non-detained docket</strong> is where the backlog lives — cases take 3-5 years because
          there&apos;s no urgency (or cost) to resolve them quickly.
        </p>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 text-lg mb-2">Never Detained — {never?.count.toLocaleString()} cases</h3>
            <p className="text-sm text-blue-800 mb-3">
              The majority. These are people who received a Notice to Appear (NTA) but were never taken into custody.
              They live in the community while their case proceeds — often for years.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-blue-900">Advantages:</div>
                <ul className="list-disc pl-4 text-blue-800 space-y-1 mt-1">
                  <li>Years to find a lawyer</li>
                  <li>Time to gather evidence</li>
                  <li>Can work (with authorization)</li>
                  <li>Stay with family</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-blue-900">Disadvantages:</div>
                <ul className="list-disc pl-4 text-blue-800 space-y-1 mt-1">
                  <li>Years of legal uncertainty</li>
                  <li>Must track court dates</li>
                  <li>High in absentia risk</li>
                  <li>Lives on hold indefinitely</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-red-900 text-lg mb-2">Detained — {detained?.count.toLocaleString()} cases</h3>
            <p className="text-sm text-red-800 mb-3">
              Held in ICE detention facilities — which are often repurposed jails or privately-run prisons.
              Cases are fast-tracked because detention costs the government ~$150/day per person.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-red-900">Advantages:</div>
                <ul className="list-disc pl-4 text-red-800 space-y-1 mt-1">
                  <li>Faster resolution</li>
                  <li>Won&apos;t miss hearings</li>
                  <li>Priority on docket</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-red-900">Disadvantages:</div>
                <ul className="list-disc pl-4 text-red-800 space-y-1 mt-1">
                  <li>Almost no access to lawyers</li>
                  <li>Can&apos;t gather evidence</li>
                  <li>Pressure to accept VD</li>
                  <li>Remote facility locations</li>
                  <li>Much worse outcomes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 text-lg mb-2">Released — {released?.count.toLocaleString()} cases</h3>
            <p className="text-sm text-amber-800 mb-3">
              Initially detained, then released — through bond hearings, parole, or court orders.
              Their cases move to the non-detained docket.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-amber-900">How they get out:</div>
                <ul className="list-disc pl-4 text-amber-800 space-y-1 mt-1">
                  <li>Post bond ($1,500-$25,000+)</li>
                  <li>Parole (discretionary)</li>
                  <li>Order of supervision</li>
                  <li>Habeas corpus petition</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-amber-900">What happens next:</div>
                <ul className="list-disc pl-4 text-amber-800 space-y-1 mt-1">
                  <li>Case joins the backlog</li>
                  <li>Better attorney access</li>
                  <li>Same in absentia risks</li>
                  <li>Bond money at risk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Detention Outcome Gap</h2>
        <p>
          Research consistently shows that detained immigrants have significantly worse outcomes than non-detained ones,
          even controlling for case strength. The reasons are structural:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Attorney access collapses in detention:</strong> Many ICE facilities are in rural areas — Lumpkin, Georgia; Pearsall, Texas; Adelanto, California. Immigration lawyers cluster in cities. Detained respondents may have phone access for 30 minutes a day, if that.</li>
          <li><strong>Evidence gathering is impossible:</strong> You can&apos;t get affidavits from witnesses, request police reports from your home country, or visit the consulate when you&apos;re locked up.</li>
          <li><strong>Coercion to accept voluntary departure:</strong> ICE officers and even judges may suggest VD as the &quot;easy way out.&quot; When you&apos;re in jail and don&apos;t understand the system, accepting seems rational even if you have a strong case.</li>
          <li><strong>Compressed timelines:</strong> Detained cases get fast-tracked. What might be a 3-year case on the non-detained docket becomes a 3-week case in detention. There&apos;s simply not enough time to build a proper defense.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Who Gets Detained?</h2>
        <p>
          Detention isn&apos;t random. You&apos;re more likely to be detained if you:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Were apprehended at or near the border</li>
          <li>Have a criminal conviction (even minor — DUI, shoplifting)</li>
          <li>Were previously ordered removed and reentered</li>
          <li>Were flagged in a workplace raid or enforcement operation</li>
          <li>Failed a credible fear screening</li>
        </ul>
        <p>
          Mandatory detention applies in several categories — certain criminal convictions, arriving aliens, and
          terrorism-related charges all trigger automatic detention with no bond hearing.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Demographics</h2>
        <p>
          Of {(male.count + female.count).toLocaleString()} cases with gender data,
          {' '}<strong>{((male.count / (male.count + female.count)) * 100).toFixed(1)}% are male</strong> and
          {' '}<strong>{((female.count / (male.count + female.count)) * 100).toFixed(1)}% are female</strong>.
          Men are disproportionately represented in detention (they account for a much higher share of the detained
          docket than the non-detained docket), reflecting enforcement patterns that target male border crossers
          and criminal history-based detention.
        </p>
        <p>
          Women in detention face specific challenges: separation from children, limited access to
          gender-specific healthcare, and difficulty preparing domestic violence-based asylum claims from inside
          a detention facility.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Cost</h2>
        <p>
          ICE detention costs approximately <strong>$150 per person per day</strong>. With {detained?.count.toLocaleString()} detention
          cases in the system (not all simultaneously), the annual cost of immigration detention runs into the billions.
          Private prison companies — GEO Group, CoreCivic — operate many of the largest facilities and have
          financial incentives to keep beds full.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Central Paradox</h3>
              <p className="text-sm text-amber-800">
                The system detains people to ensure they show up for court. But detention also strips them of the
                resources they need to win their cases — attorneys, evidence, time. The result: detained immigrants
                get faster hearings but worse outcomes. Non-detained immigrants wait years but have better odds.
                The system forces a choice between speed and fairness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/bond" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">💰 Bond Hearings</h3>
          <p className="text-sm text-gray-600 mt-1">How bond decisions determine who stays locked up.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Detention makes the attorney crisis worse.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📍 Geographic Lottery</h3>
          <p className="text-sm text-gray-600 mt-1">Detention location determines your court and judge.</p>
        </Link>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/detained-vs-released" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Detained vs. Released — How Custody Status Shapes Immigration Outcomes',
        url: 'https://www.openimmigration.us/analysis/detained-vs-released',
        publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
      }) }} />
    </div>
  )
}
