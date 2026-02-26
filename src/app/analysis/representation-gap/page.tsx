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
  title: 'The Representation Gap — Only 26.7% of Immigrants Have Lawyers',
  description: 'Only 26.7% of immigrants in removal proceedings have lawyers. Represented immigrants are 5x more likely to win. No right to a public defender.',
}

export default function RepresentationGapPage() {
  const stats = loadData('stats.json')
  const languages = loadData('languages.json')
  const gender = loadData('gender.json')

  const spanishTotal = languages.filter((l: { name: string }) => l.name.startsWith('SPANISH') || l.name === 'SP ').reduce((s: number, l: { count: number }) => s + l.count, 0)
  const totalLang = languages.reduce((s: number, l: { count: number }) => s + l.count, 0)
  const nonEnglishPct = (((totalLang - 744685) / totalLang) * 100).toFixed(1)
  const male = gender.find((g: { code: string }) => g.code === 'M')
  const female = gender.find((g: { code: string }) => g.code === 'F')
  const unrepresented = Math.round(stats.totalCases * (1 - stats.representationRate / 100))

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'Representation Gap' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Access to Justice</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Representation Gap</h1>
      <p className="text-lg text-gray-600 mb-8">
        Only {stats.representationRate}% of people in immigration court have a lawyer. That means roughly
        {' '}{(unrepresented / 1e6).toFixed(1)} million people have faced a trained government prosecutor
        alone — in a system where having an attorney is the single strongest predictor of survival.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 not-prose">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{stats.representationRate}%</div>
          <div className="text-xs text-gray-600 mt-1">Have a Lawyer</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">5×</div>
          <div className="text-xs text-gray-600 mt-1">More Likely to Win</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{nonEnglishPct}%</div>
          <div className="text-xs text-gray-600 mt-1">Non-English Speakers</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">$0</div>
          <div className="text-xs text-gray-600 mt-1">Public Defender Budget</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">No Right to a Lawyer</h2>
        <p>
          In criminal court, if you can&apos;t afford an attorney, one will be provided for you. That&apos;s
          the Sixth Amendment. It does not apply to immigration court.
        </p>
        <p>
          Immigration proceedings are technically &quot;civil&quot; — even though the consequence is being
          ripped from your home, separated from your family, and sent to a country where you may face
          persecution or death. Because it&apos;s &quot;civil,&quot; there is <strong>zero constitutional right
          to appointed counsel</strong>. If you can&apos;t afford a lawyer — and at $5,000-$15,000 per case,
          most immigrants can&apos;t — you represent yourself.
        </p>
        <p>
          Think about what that means in practice: a Guatemalan farmer who speaks Mam (a Mayan language
          spoken by {languages.find((l: { code: string }) => l.code === 'MAM')?.count.toLocaleString()} people in our data)
          stands before an immigration judge and argues complex asylum law against a trained ICE trial attorney.
          The proceedings are in English, through an interpreter. The farmer must prove, under a preponderance
          of evidence, that they meet the legal definition of a &quot;refugee&quot; under INA §208.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Language Barrier</h2>
        <p>
          The representation gap is compounded by a massive language barrier. Of {totalLang.toLocaleString()} cases
          with language data:
        </p>

        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Language</th>
                <th className="px-4 py-3 text-right font-semibold">Cases</th>
                <th className="px-4 py-3 text-right font-semibold">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Spanish', count: spanishTotal },
                { name: 'English', count: 744685 },
                { name: 'Creole', count: 248185 },
                { name: 'Mandarin', count: 178698 },
                { name: 'Portuguese', count: 174068 },
                { name: 'Russian', count: 116134 },
                { name: 'Punjabi', count: 88735 },
                { name: 'Arabic', count: 44727 },
                { name: 'Foo Chow', count: 42444 },
                { name: 'Hindi', count: 39244 },
              ].map(l => (
                <tr key={l.name} className="border-t border-gray-100">
                  <td className="px-4 py-2 font-medium">{l.name}</td>
                  <td className="px-4 py-2 text-right">{l.count.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{((l.count / totalLang) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">Top 10 of 50+ languages in the data. Spanish includes duplicate codes.</p>
        </div>

        <p>
          <strong>{nonEnglishPct}% of respondents don&apos;t speak English.</strong> They navigate asylum forms,
          evidentiary submissions, and legal arguments through interpreters — if interpreters for their language
          are even available. For speakers of indigenous languages like Mam ({languages.find((l: { code: string }) => l.code === 'MAM')?.count.toLocaleString()} cases),
          K&apos;iche&apos; ({languages.find((l: { code: string }) => l.code === 'QUI')?.count.toLocaleString()} cases),
          or Konjobal ({languages.find((l: { code: string }) => l.code === 'KON')?.count.toLocaleString()} cases),
          even finding an interpreter can be impossible.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What Lawyers Actually Do</h2>
        <p>
          It&apos;s not just about arguing in court. An immigration attorney:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identifies relief options:</strong> Many respondents qualify for protections they don&apos;t know exist — cancellation of removal, VAWA protections, U-visas for crime victims, withholding under CAT.</li>
          <li><strong>Gathers evidence:</strong> Country condition reports, expert declarations, medical records, police reports from the home country. An unrepresented person wouldn&apos;t know what evidence is needed or how to get it.</li>
          <li><strong>Prepares testimony:</strong> Asylum hinges on credibility. Attorneys coach clients to present their stories clearly and consistently — not to lie, but to present traumatic experiences in the structured way the court expects.</li>
          <li><strong>Prevents in absentia orders:</strong> Files address changes, tracks hearing dates, requests continuances. Of the {stats.inAbsentia.toLocaleString()} in absentia orders, a huge proportion involve unrepresented respondents.</li>
          <li><strong>Files appeals:</strong> The Board of Immigration Appeals (BIA) exists, but filing an appeal requires legal expertise that pro se respondents simply don&apos;t have.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Who Gets a Lawyer?</h2>
        <p>
          Representation isn&apos;t randomly distributed. You&apos;re more likely to have an attorney if you:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Live in a major metro:</strong> NYC, LA, San Francisco, and Chicago have dense networks of pro bono legal organizations and law school clinics.</li>
          <li><strong>Are not detained:</strong> Non-detained respondents have years to find attorneys. Detained respondents, held in remote facilities with limited phone access, have far less ability to find and work with lawyers.</li>
          <li><strong>Have community connections:</strong> Established immigrant communities share attorney referrals. Recent arrivals without networks are on their own.</li>
          <li><strong>Can pay:</strong> Immigration attorneys charge $5,000-$15,000+ per case. Most respondents earn minimum wage or less.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Gender Dimension</h2>
        <p>
          Of {(male.count + female.count).toLocaleString()} cases with gender data,{' '}
          <strong>{male.count.toLocaleString()} ({((male.count / (male.count + female.count)) * 100).toFixed(1)}%)</strong> are male
          and <strong>{female.count.toLocaleString()} ({((female.count / (male.count + female.count)) * 100).toFixed(1)}%)</strong> are female.
          The representation gap hits both genders, but women face unique challenges — domestic violence claims
          require specific evidence, VAWA protections have complex eligibility rules, and women with children
          face additional barriers to attending hearings and meeting with attorneys.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Cascade Effect</h3>
              <p className="text-sm text-amber-800">
                No lawyer → can&apos;t navigate the system → miss hearings → in absentia removal order → permanent
                deportation bar → can&apos;t reopen because that also requires a lawyer. The {stats.representationRate}%
                representation rate isn&apos;t just a statistic — it&apos;s a system designed to fail the people it processes.
                With {nonEnglishPct}% not speaking English and {stats.inAbsentia.toLocaleString()} in absentia orders, the
                representation gap is arguably the single biggest structural flaw in U.S. immigration courts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/representation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore representation rates by court and case type.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚪 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.1 million deported without being present.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📍 Geographic Lottery</h3>
          <p className="text-sm text-gray-600 mt-1">Where you are determines your access to attorneys.</p>
        </Link>
      </div>

      <RelatedAnalysis current="representation-gap" />
      <ShareButtons url="https://www.openimmigration.us/analysis/representation-gap" title={metadata.title as string} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Representation Gap — Only 26.7% of Immigrants Have Lawyers',
        url: 'https://www.openimmigration.us/analysis/representation-gap',
        publisher: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
      }) }} />
          <ArticleSchema title="The Representation Gap — Only 26.7% of Immigrants Have Lawyers" description="Only 26.7% of immigrants in removal proceedings have lawyers. Represented immigrants are 5x more likely to win. No right to a public defender." url="" datePublished="2026-02-26" />
</div>
  )
}
