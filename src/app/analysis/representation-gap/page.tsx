import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'The Representation Gap: 73.3% of Immigration Respondents Have No Lawyer | Open Immigration',
  description: 'Only 26.7% of the 9.6 million people who have faced immigration court had legal representation. With 6.4 million never detained and 2.1 million detained — often in remote facilities — access to counsel remains the system\'s deepest inequity.',
}

export default function RepresentationGapPage() {
  const stats = loadData('stats.json')
  const custody = loadData('custody.json') as Array<{ code: string; name: string; count: number }>

  const neverDetained = custody.find((c) => c.code === 'N')
  const detained = custody.find((c) => c.code === 'D')
  const released = custody.find((c) => c.code === 'R')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Representation Gap' },
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'The Representation Gap: 73.3% of Immigration Respondents Have No Lawyer',
          description: metadata.description,
          publisher: { '@type': 'Organization', name: 'Open Immigration' },
        })}}
      />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">System Analysis</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Representation Gap</h1>
      <p className="text-lg text-gray-600 mb-8">
        Immigration court is the only courtroom in America where the government is always represented by a trained attorney —
        and the other side usually isn&apos;t. Only <strong>26.7%</strong> of the {(stats.totalCases as number).toLocaleString()} people
        in our dataset had legal representation. The other 73.3% faced the system alone.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Numbers Are Stark</h2>
        <p>
          Across {(stats.totalCases as number).toLocaleString()} immigration cases, just <strong>one in four respondents</strong> had a lawyer.
          There is no right to appointed counsel in immigration proceedings — unlike criminal court, where the Sixth Amendment
          guarantees a public defender. Immigration respondents, including asylum seekers fleeing persecution, must find
          and pay for their own attorney or go without.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary">26.7%</div>
            <div className="text-sm text-gray-600 mt-1">Had Representation</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-red-700">73.3%</div>
            <div className="text-sm text-gray-600 mt-1">No Attorney</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-gray-700">{(stats.totalCases as number).toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Total Cases</div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Detention Makes It Worse</h2>
        <p>
          Custody status dramatically affects access to counsel. Of the {(stats.totalCases as number).toLocaleString()} cases in our dataset:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>{neverDetained ? neverDetained.count.toLocaleString() : '6,410,730'} (66%)</strong> were never detained — these respondents must navigate a complex legal system while living in the community, often without knowledge of available legal services</li>
          <li><strong>{detained ? detained.count.toLocaleString() : '2,115,304'} (22%)</strong> were detained — held in facilities often located in remote areas far from legal aid organizations, making attorney access extremely difficult</li>
          <li><strong>{released ? released.count.toLocaleString() : '1,069,619'} (11%)</strong> were released from detention — facing the challenge of finding new representation mid-case, often in unfamiliar cities</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Representation Changes Outcomes</h2>
        <p>
          Research consistently shows that represented respondents are far more likely to prevail in immigration court.
          A lawyer can help gather evidence, prepare asylum applications, present legal arguments, and — critically —
          ensure the respondent actually appears for hearings. With <strong>{(stats.inAbsentia as number).toLocaleString()} in absentia orders</strong> in
          our dataset, representing <Link href="/analysis/in-absentia" className="text-primary hover:underline">13.3% of all proceedings</Link>,
          the connection between representation and court appearance is itself a major factor.
        </p>
        <p>
          Unrepresented respondents are more likely to miss hearings (they may not understand the notice or know the date),
          fail to file required paperwork, miss filing deadlines, or make legal arguments that inadvertently harm their case.
          In a system where <Link href="/analysis/judge-variation" className="text-primary hover:underline">judge grant rates vary from 0% to 44.9%</Link>,
          having a lawyer who knows the assigned judge&apos;s tendencies can be decisive.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-lg my-8">
          <p className="font-semibold text-amber-800 mb-2">💡 Key Insight</p>
          <p className="text-amber-900 text-sm">
            Immigration court is an adversarial system where the government always has a lawyer and the respondent usually doesn&apos;t.
            With a <strong>26.7% representation rate</strong> and over 2 million people detained in facilities far from legal services,
            the system structurally disadvantages the people whose liberty is at stake.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Structural Problem</h2>
        <p>
          The representation gap isn&apos;t simply about individual choice. Immigration law is extraordinarily complex —
          sometimes compared to the tax code in its intricacy. Respondents often speak limited English, may not understand
          the legal system, and frequently cannot afford an attorney. Pro bono legal services exist but are vastly
          oversubscribed, with most organizations reporting they can serve only a fraction of those who seek help.
        </p>
        <p>
          For the {detained ? detained.count.toLocaleString() : '2,115,304'} detained respondents, the barriers are even higher.
          Many detention facilities are located in rural areas — hours from the nearest immigration attorney. Detained
          individuals have limited phone access, cannot conduct their own research, and must rely on whatever legal
          resources exist within the facility.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What the Data Shows</h2>
        <p>
          The representation rate of 26.7% across {(stats.totalCases as number).toLocaleString()} cases reveals a system where
          the majority of respondents — many facing deportation to countries where they fear persecution — navigate
          complex legal proceedings without professional help. Combined with the system&apos;s{' '}
          <Link href="/analysis/backlog-crisis" className="text-primary hover:underline">massive backlog</Link>,{' '}
          <Link href="/analysis/judge-variation" className="text-primary hover:underline">judge variation</Link>, and{' '}
          <Link href="/analysis/geographic-lottery" className="text-primary hover:underline">geographic disparities</Link>,
          the lack of representation compounds every other inequity in the system.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👻 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">2.16 million deportation orders issued when respondents didn&apos;t appear — often because they had no lawyer.</p>
        </Link>
        <Link href="/analysis/detained-vs-released" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🔒 Detained vs. Released</h3>
          <p className="text-sm text-gray-600 mt-1">How custody status shapes every aspect of an immigration case.</p>
        </Link>
      </div>
    </div>
  )
}
