import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Immigration Judge Statistics',
  description: 'Explore asylum grant rates, case volumes, and decision patterns for U.S. immigration judges. Over 600 judges across 68 courts.',
}

export default function JudgesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Judges' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Judge Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        There are approximately 600 immigration judges across 68 courts. Each judge carries an average
        caseload of over 5,000 pending cases. Asylum grant rates vary dramatically — from under 10% to over 90%.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">~600</div>
          <div className="text-sm text-gray-600 mt-1">Immigration Judges</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">68</div>
          <div className="text-sm text-gray-600 mt-1">Immigration Courts</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-warning">5,600+</div>
          <div className="text-sm text-gray-600 mt-1">Avg Cases Per Judge</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 mb-12">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Understanding Judge Statistics</h2>
        <p>
          Immigration judges are employees of the Department of Justice, appointed by the Attorney General.
          Unlike federal judges, they are not Article III judges with lifetime tenure — they serve at the
          pleasure of the AG and can be reassigned, disciplined, or removed.
        </p>
        <p>
          Judge statistics matter because research consistently shows that <strong>the assigned judge is
          the single strongest predictor of asylum case outcomes</strong> — more than nationality, type of
          persecution, or quality of evidence.
        </p>
        <p>
          We will publish individual judge statistics (asylum grant rates, case volumes, deportation rates)
          once our EOIR case data processing is complete. This data helps identify systemic patterns in
          how the immigration court system operates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/analysis/judge-variation" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
          <h3 className="font-heading text-lg font-bold">⚖️ Judge Roulette Analysis</h3>
          <p className="text-sm text-gray-600 mt-2">How your judge determines your fate — the data behind asylum outcome variation.</p>
        </Link>
        <Link href="/courts" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
          <h3 className="font-heading text-lg font-bold">🏛️ Courts</h3>
          <p className="text-sm text-gray-600 mt-2">Explore outcomes by court location.</p>
        </Link>
      </div>
    </div>
  )
}
