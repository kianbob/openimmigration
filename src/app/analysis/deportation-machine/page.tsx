import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'The Deportation Machine in 2025',
  description: 'Record case closures, mass deportation orders, and what the immigration court data actually shows about deportation under the current administration.',
}

export default function DeportationMachinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'The Deportation Machine' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Trends</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Deportation Machine in 2025</h1>
      <p className="text-lg text-gray-600 mb-8">
        In FY2026 so far, immigration judges have ordered deportation in <strong>78.5%</strong> of completed cases —
        149,706 deportation orders through December 2025. Here&apos;s what the numbers actually show.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Numbers</h2>
        <p>
          Through the first three months of FY2026 (October–December 2025), immigration courts completed
          <strong> 193,858 cases</strong>. Of these:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>38,215</strong> received removal orders in December alone</li>
          <li><strong>7,359</strong> were given voluntary departure</li>
          <li><strong>10,502</strong> were allowed to stay under other provisions</li>
          <li><strong>1,455</strong> were granted relief (asylum or other protection)</li>
        </ul>
        <p>
          That means <strong>79.2% of cases completed in December 2025</strong> resulted in a deportation order
          of some kind. Only 2.5% resulted in granted relief.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Backlog Reduction Push</h2>
        <p>
          EOIR has been aggressively closing cases to reduce the backlog. The pending caseload dropped from
          a peak of 4.18 million to 3.38 million — the sharpest decrease in EOIR history. But the method
          matters: much of this reduction came through in absentia removal orders (deporting people who didn&apos;t
          show up) and expedited proceedings.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Who Gets Deported</h2>
        <p>The top nationalities receiving deportation orders in FY2026:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Mexico</strong> — 33,830 deportation orders</li>
          <li><strong>Guatemala</strong> — 19,169</li>
          <li><strong>Honduras</strong> — 18,746</li>
          <li><strong>Venezuela</strong> — 14,679</li>
          <li><strong>Colombia</strong> — 9,328</li>
        </ul>
        <p>
          Only <strong>1.64%</strong> of new FY2026 cases sought deportation based on alleged criminal activity.
          The vast majority of deportation proceedings are for immigration violations alone.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Representation Problem</h2>
        <p>
          Only <strong>26.7%</strong> of immigrants had an attorney when a removal order was issued in December 2025.
          That means nearly 3 out of 4 people ordered deported faced the process without legal representation —
          navigating complex immigration law against a trained government prosecutor.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ 193,858 cases closed in first 3 months of FY2026 vs. 130,642 new cases filed</li>
                <li>→ Net backlog reduction of 63,216 cases in Q1 FY2026</li>
                <li>→ Only 1.64% of new cases involve alleged criminal activity</li>
                <li>→ Only 701 asylum grants in December 2025 out of 57,531 completed cases</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
