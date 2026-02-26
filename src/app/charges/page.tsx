import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Immigration Charges & Offenses',
  description: 'What immigration charges are filed in U.S. courts — only 1.64% of cases involve alleged criminal activity. Most are immigration violations alone.',
}

export default function ChargesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Charges' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Charges & Offenses</h1>
      <p className="text-lg text-gray-600 mb-8">
        What charges bring people into immigration court — and the surprising fact that only <strong>1.64%</strong> of
        new FY2026 cases involved alleged criminal activity beyond possible illegal entry.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">98.4%</div>
          <div className="text-sm text-gray-600 mt-1">Immigration Violations Only</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-danger">1.64%</div>
          <div className="text-sm text-gray-600 mt-1">Alleged Criminal Activity</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Understanding Immigration Charges</h2>
        <p>
          Immigration cases are initiated through a &quot;Notice to Appear&quot; (NTA) that specifies the charges —
          the immigration violations that the government alleges. Common charges include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Present without admission or parole</strong> — The most common charge, for those who entered without inspection</li>
          <li><strong>Overstayed visa</strong> — Entered legally but remained beyond authorized period</li>
          <li><strong>Violated status conditions</strong> — Violated the terms of a visa (e.g., working on a tourist visa)</li>
          <li><strong>Criminal grounds</strong> — Convicted of certain crimes that make a person deportable</li>
          <li><strong>Security grounds</strong> — Terrorism, espionage, or other national security charges</li>
        </ul>
        <p>
          The data shows that the overwhelming majority of immigration court cases involve
          <strong> immigration violations alone</strong>, not criminal activity. Only 1.64% of new FY2026 cases
          sought deportation based on any alleged criminal activity apart from possible illegal entry.
        </p>
      </div>
    </div>
  )
}
