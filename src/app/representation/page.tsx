import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Legal Representation in Immigration Court — Only 26.7% Have Lawyers',
  description: 'Only 26.7% of immigrants in removal proceedings have attorneys. Represented immigrants win 5x more often. No right to a public defender.',
}

export default function RepresentationPage() {
  const stats = loadData('stats.json')
  const languages = loadData('languages.json')
  const totalLang = languages.reduce((s: number, l: { count: number }) => s + l.count, 0)
  const englishCount = languages.find((l: { code: string }) => l.code === 'ENG')?.count || 0
  const nonEnglishPct = (((totalLang - englishCount) / totalLang) * 100).toFixed(1)
  const unrepresented = Math.round(stats.totalCases * (1 - stats.representationRate / 100))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Representation' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Legal Representation in Immigration Court</h1>
      <p className="text-lg text-gray-600 mb-8">
        Only <strong>{stats.representationRate}%</strong> of immigrants had a lawyer when removal orders were issued.
        That means roughly <strong>{(unrepresented / 1e6).toFixed(1)} million people</strong> faced a trained
        government prosecutor alone — in proceedings that could determine whether they live or die.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(100 - stats.representationRate).toFixed(1)}%</div>
          <div className="text-sm text-gray-600 mt-1">Without Lawyers</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">5×</div>
          <div className="text-sm text-gray-600 mt-1">Higher Win Rate</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{nonEnglishPct}%</div>
          <div className="text-sm text-gray-600 mt-1">Non-English Speaking</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-gray-700">$0</div>
          <div className="text-sm text-gray-600 mt-1">Govt-Funded Counsel</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Core Problem</h2>
        <p>
          In criminal court, the Sixth Amendment guarantees an attorney. In immigration court — technically
          &quot;civil&quot; proceedings — there is no such right. The government prosecutes removal through
          trained ICE trial attorneys, while respondents are left to defend themselves.
        </p>
        <p>
          Research consistently shows that represented immigrants are <strong>5x more likely to win their cases</strong>.
          For asylum specifically, the gap is even wider — closer to 10x. This isn&apos;t just because lawyers
          cherry-pick strong cases. Controlling for case strength, the representation effect remains enormous.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">By the Numbers</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-primary">{stats.asylumGranted.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Asylum Grants — the vast majority with attorney help</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-red-600">{stats.removalOrders.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Removal Orders — disproportionately unrepresented</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-amber-600">{stats.inAbsentia.toLocaleString()}</div>
            <div className="text-sm text-gray-600">In Absentia Orders — mostly without attorneys tracking dates</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-gray-600">{stats.totalJudges.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Judges — each handling thousands of pro se respondents</div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Who Gets a Lawyer?</h2>
        <p>
          Representation isn&apos;t evenly distributed. It correlates with geography (major metros have more
          pro bono networks), custody status (non-detained have more time to find attorneys), community networks
          (established ethnic communities share referrals), and ability to pay ($5,000-$15,000+ per case).
        </p>
        <p>
          Detained immigrants have the lowest representation rates — they&apos;re often held in remote facilities
          with limited phone access and no immigration lawyers nearby. This compounds the
          <Link href="/analysis/detained-vs-released" className="text-primary hover:underline"> detention disadvantage</Link>.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Cascade</h3>
              <p className="text-sm text-amber-800">
                No lawyer → can&apos;t navigate the system → miss hearings → in absentia removal order →
                permanent bar → can&apos;t reopen without a lawyer. The {stats.representationRate}% representation
                rate drives the {stats.inAbsentia.toLocaleString()} in absentia orders, which drive the backlog,
                which overwhelms the {stats.totalJudges.toLocaleString()} judges. It&apos;s all connected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Link href="/analysis/representation-gap"
          className="inline-block bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-medium">
          Read Full Representation Gap Analysis →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚪 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.1 million deported without being present — many without lawyers.</p>
        </Link>
        <Link href="/demographics" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Demographics</h3>
          <p className="text-sm text-gray-600 mt-1">{nonEnglishPct}% non-English speakers in 50+ languages.</p>
        </Link>
      </div>
    </div>
  )
}
