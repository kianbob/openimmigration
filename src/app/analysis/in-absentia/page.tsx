import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'In Absentia — 2.1 Million Deported Without a Hearing',
  description: '2,162,444 immigration proceedings ended in absentia — 13.3% of all proceedings. What happens when people miss their court dates.',
}

export default function InAbsentiaPage() {
  const stats = loadData('stats.json')
  const rate = ((stats.inAbsentia / stats.totalProceedings) * 100).toFixed(1)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis', href: '/analysis' }, { label: 'In Absentia Orders' }]} />
      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Due Process</div>
      <h1 className="font-heading text-4xl font-bold mb-4">In Absentia: Deported Without a Hearing</h1>
      <p className="text-lg text-gray-600 mb-8">
        {stats.inAbsentia.toLocaleString()} immigration proceedings — {rate}% of {stats.totalProceedings.toLocaleString()} total — ended
        with an in absentia order, where the respondent wasn&apos;t present.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Is an In Absentia Order?</h2>
        <p>
          When an immigrant doesn&apos;t appear for their court hearing, the immigration judge can proceed without
          them and issue a removal order &quot;in absentia.&quot; This means the person is ordered deported without
          anyone hearing their side of the story, examining their evidence, or evaluating whether they qualify for relief.
        </p>
        <p>
          For asylum seekers, this is devastating. A person who fled persecution, filed an asylum application,
          and then missed a hearing — perhaps because they moved and the notice went to their old address — can
          be ordered removed without any consideration of their claim.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why People Miss Court</h2>
        <p>The reasons are less about defiance than about system failures:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Address changes:</strong> Immigrants move frequently — fleeing domestic violence, following jobs, staying with different family members. Hearing notices sent to old addresses never arrive.</li>
          <li><strong>Notice failures:</strong> The government bears the burden of proving notice was delivered. In practice, mail to immigrant communities is unreliable, and many respondents claim they never received notice.</li>
          <li><strong>Rescheduled hearings:</strong> Courts frequently reschedule, sometimes years out. A hearing moved from 2023 to 2026 requires the respondent to track the change — something nearly impossible without an attorney.</li>
          <li><strong>Transportation barriers:</strong> Courts may be hours away. Immigrants without driver&apos;s licenses, with work obligations, or with childcare needs may physically be unable to attend.</li>
          <li><strong>No attorney:</strong> With only {stats.representationRate}% having legal representation, most respondents have no one tracking their case, filing address changes, or ensuring they know when and where to appear.</li>
          <li><strong>Fear:</strong> Some immigrants fear that appearing in court will lead to immediate detention and deportation, especially during enforcement crackdowns.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Scale of the Problem</h2>
        <p>
          {stats.inAbsentia.toLocaleString()} in absentia orders across {stats.totalProceedings.toLocaleString()} proceedings
          means that <strong>roughly 1 in 8 immigration proceedings</strong> ends without the respondent present.
          Many of these cases involved people who may have had valid claims to asylum or other relief.
        </p>
        <p>
          In absentia orders can be reopened if the respondent can show they didn&apos;t receive proper notice
          or had exceptional circumstances. But the reopening process itself requires navigating the legal system —
          which brings us back to the representation problem.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The Representation Connection</h3>
              <p className="text-sm text-amber-800">
                Studies consistently show that represented immigrants are far less likely to receive in absentia orders.
                Attorneys file address changes, track hearing dates, request continuances when needed, and ensure their
                clients appear. The {stats.representationRate}% representation rate directly fuels the {rate}% in absentia rate.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Only {stats.representationRate}% have lawyers — and it shows.</p>
        </Link>
        <Link href="/analysis/deportation-machine" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚙️ The Deportation Machine</h3>
          <p className="text-sm text-gray-600 mt-1">How removal orders, voluntary departures, and closures work.</p>
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: 'In Absentia — 2.1 Million Deported Without a Hearing', url: 'https://www.openimmigration.us/analysis/in-absentia', publisher: { '@type': 'Organization', name: 'OpenImmigration' } }) }} />
    </div>
  )
}
