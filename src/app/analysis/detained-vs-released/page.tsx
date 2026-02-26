import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Detained vs. Released — How Custody Status Affects Outcomes',
  description: 'Immigration detention dramatically changes case outcomes and processing times. Detained cases resolve faster but with worse outcomes for the immigrant.',
}

export default function DetainedVsReleasedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Detained vs. Released' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Detention</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Detained vs. Released</h1>
      <p className="text-lg text-gray-600 mb-8">
        Whether an immigrant is detained or released while awaiting their hearing dramatically affects
        outcomes, representation rates, and case processing times.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Detention Effect</h2>
        <p>
          Immigration detention creates a fundamentally different legal environment. Detained immigrants face
          their proceedings while locked up — often in remote facilities far from legal aid organizations,
          family support, and the evidence they need to present their cases.
        </p>
        <p>
          The data shows several key differences between detained and non-detained cases:
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Speed</h3>
        <p>
          Detained cases move through the system much faster. The &quot;rocket docket&quot; for detained cases
          can resolve in weeks or months, while non-detained cases may take years. While faster resolution
          reduces the backlog, speed can come at the cost of thoroughness.
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Representation</h3>
        <p>
          Detained immigrants have significantly lower representation rates. Detention facilities are often
          in remote locations far from legal service providers. Many detained immigrants can&apos;t afford an
          attorney and can&apos;t access free legal aid. The result: they face trained government prosecutors alone.
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900 mt-6">Outcomes</h3>
        <p>
          Detained immigrants generally have worse outcomes. They&apos;re more likely to be ordered deported,
          less likely to apply for relief, and less likely to win if they do apply. This is partly a selection
          effect (those detained may have weaker cases) and partly a function of reduced access to legal help
          and evidence.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Bond Hearings</h2>
        <p>
          In FY2026 through December 2025, immigration judges held <strong>15,540 bond hearings</strong>.
          Of these, <strong>4,062 were granted bond</strong> — about 26%. Bond amounts and grant rates
          vary significantly by court and judge.
        </p>
        <p>
          A bond grant means the immigrant can be released from detention while their case proceeds.
          Those who can&apos;t post bond or are denied bond remain detained, often for months or years.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ 15,540 bond hearings in Q1 FY2026, only 26% granted</li>
                <li>→ Detained cases resolve much faster but with worse outcomes</li>
                <li>→ Remote detention facilities limit access to legal representation</li>
                <li>→ The U.S. detains more immigrants than any other country</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
