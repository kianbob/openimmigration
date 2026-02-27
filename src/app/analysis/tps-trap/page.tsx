import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Permanent Temporary — 1 Million People Trapped in TPS Limbo',
  description: 'Over 1 million people hold Temporary Protected Status. Some "temporary" designations have lasted 20+ years. The TPS trap, explained with data.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/tps-trap' },
}

export default function TPSTrapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Permanent Temporary' },
      ]} />

      <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Legal Status</span>
      <h1 className="font-heading text-4xl font-bold mb-6">Permanent Temporary</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p className="text-xl text-gray-600 mb-8">
          Over <strong>1 million people</strong> in the United States hold Temporary Protected Status — a legal
          status that was designed to last 6-18 months. Some have held it for over 20 years. TPS has become
          one of immigration&apos;s great contradictions: a program that is &quot;temporary&quot; in law but permanent in practice.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">The TPS Paradox</h2>
        <p>
          TPS was created in 1990 for a sensible reason: when a country experiences a war, earthquake, or other
          disaster, it&apos;s cruel to deport people back to danger. So the government designates the country,
          and nationals already in the U.S. can stay and work until conditions improve.
        </p>
        <p>
          The problem: conditions in many countries never fully &quot;improve&quot; to the point where mass return is
          feasible. El Salvador was designated after earthquakes in 2001. Honduras after Hurricane Mitch in 1998.
          Haiti after the 2010 earthquake. Two decades later, these designations persist — renewed every 18 months,
          each time debating whether conditions are &quot;safe enough&quot; for return.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Who Holds TPS Today</h2>
        <p>
          The TPS population has exploded in recent years, driven by massive new designations:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Venezuela — 403,320 pending applications</strong>. Designated in 2021 amid economic collapse
          under Maduro. The largest single TPS population.</li>
          <li><strong>Haiti — 331,355 pending</strong>. Originally designated after the 2010 earthquake, repeatedly
          extended through political instability, gang violence, and the 2021 assassination of President Moïse.</li>
          <li><strong>Ukraine — 143,364 pending</strong>. Designated after Russia&apos;s 2022 invasion. One of the
          fastest-growing TPS populations.</li>
          <li><strong>El Salvador — 117,192 pending</strong>. Designated in 2001. Many holders have been in the U.S.
          for 25 years, own homes, and have U.S. citizen children.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Trap</h2>
        <p>
          TPS creates a uniquely cruel form of limbo:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>TPS doesn&apos;t lead to a green card</strong>. Unlike asylum, which provides a path to permanent
          residency after one year, TPS is a dead end. You can stay and work — but you can never advance.</li>
          <li><strong>You must re-register every 18 months</strong>. Miss a deadline by a day and you lose status
          entirely. For 20+ years, every 18 months, the same paperwork and the same anxiety.</li>
          <li><strong>Your life grows roots while your status doesn&apos;t</strong>. After 20 years, a Salvadoran TPS
          holder has American children, a mortgage, a small business, pays taxes — but legally remains
          &quot;temporary.&quot;</li>
          <li><strong>Policy changes can yank it away</strong>. Each administration can terminate TPS designations.
          The Trump administration attempted to end TPS for several countries; courts blocked most terminations.
          The Biden administration re-designated them. The current administration is again moving to terminate.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">20 Years of &quot;Temporary&quot;</h2>
        <p>
          Consider a Salvadoran who received TPS in 2001 after the earthquakes. Today, in 2026:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>They&apos;ve lived in the U.S. for <strong>25 years</strong></li>
          <li>Their children, born here, are <strong>U.S. citizens ages 5-25</strong></li>
          <li>They&apos;ve re-registered approximately <strong>17 times</strong></li>
          <li>They&apos;ve paid <strong>25 years of taxes</strong></li>
          <li>They still have <strong>no path to permanent status</strong></li>
        </ul>
        <p>
          At what point does &quot;temporary&quot; become a fiction? The political answer depends on your party.
          The human answer seems obvious.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Economic Reality</h2>
        <p>
          TPS holders are deeply embedded in the American economy. They work in construction, healthcare,
          restaurants, and childcare — industries with persistent labor shortages. Studies estimate TPS holders
          contribute billions in taxes and economic output annually.
        </p>
        <p>
          Terminating TPS for long-term holders would add hundreds of thousands of people to the unauthorized
          population overnight — people who are currently documented, tax-paying, and employed.
          It would also add their cases to the already-overwhelmed immigration court system&apos;s
          {' '}<Link href="/backlog" className="text-primary hover:underline">1.9 million pending cases</Link>.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Political Football</h2>
        <p>
          TPS has become a proxy war for broader immigration debate:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Restrictionists argue</strong> that &quot;temporary means temporary&quot; — the program was never
          meant to be permanent, and endless extensions incentivize illegal immigration</li>
          <li><strong>Advocates argue</strong> that deporting people after 20+ years of lawful presence is
          effectively punishing them for following the rules — and would devastate families and communities</li>
          <li><strong>Legislative solutions have failed</strong> — Multiple bills to create a path from TPS to
          green cards have stalled in Congress. Neither party has the votes to resolve the issue.</li>
        </ul>
        <p>
          The result: over 1 million people in permanent uncertainty, renewed 18 months at a time, for as long
          as politicians refuse to make a decision.
        </p>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/tps-trap" title="Permanent Temporary — The TPS Trap" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/tps" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🛡️ TPS Data</h3>
          <p className="text-xs text-gray-600 mt-1">Full TPS application data by country.</p>
        </Link>
        <Link href="/daca" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🎓 DACA</h3>
          <p className="text-xs text-gray-600 mt-1">Another &quot;temporary&quot; program that became long-term.</p>
        </Link>
        <Link href="/amnesty" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📜 Amnesty Programs</h3>
          <p className="text-xs text-gray-600 mt-1">History of legalization programs.</p>
        </Link>
      </div>

      <RelatedAnalysis current="tps-trap" />

      <ArticleSchema title="Permanent Temporary — 1 Million People Trapped in TPS Limbo" description="Over 1 million TPS holders in permanent temporary status. Some for 20+ years." url="https://www.openimmigration.us/analysis/tps-trap" datePublished="2026-02-26" />
    </div>
  )
}
