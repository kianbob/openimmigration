import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Judge Roulette — How Your Judge Determines Your Fate',
  description: 'Asylum grant rates vary from under 10% to over 90% depending on the immigration judge. Same law, same evidence, wildly different outcomes.',
}

export default function JudgeVariationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Judge Variation' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Judges</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Judge Roulette</h1>
      <p className="text-lg text-gray-600 mb-8">
        In U.S. immigration courts, the judge assigned to your case may matter more than the merits of your case.
        Asylum grant rates range from under 10% to over 90% depending on the judge.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Variation Problem</h2>
        <p>
          Immigration law is the same everywhere. The legal standard for asylum doesn&apos;t change from one
          courtroom to the next. Yet outcomes vary enormously. Studies have consistently found that the single
          strongest predictor of asylum case outcomes is <strong>which judge is assigned to the case</strong> — more
          than nationality, type of claim, or quality of evidence.
        </p>
        <p>
          This phenomenon has been called &quot;refugee roulette&quot; by legal scholars. An asylum seeker with the same
          claim, the same evidence, and the same legal arguments can be granted asylum by one judge and ordered
          deported by another — in the same courthouse.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why It Happens</h2>
        <p>Several factors contribute to the variation:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>No jury, no panel:</strong> Immigration courts are not Article III courts. Cases are decided by
            a single judge with broad discretion. There&apos;s no jury to moderate individual tendencies.
          </li>
          <li>
            <strong>Subjective credibility determinations:</strong> Asylum cases often hinge on whether the judge
            believes the applicant&apos;s testimony. This is inherently subjective.
          </li>
          <li>
            <strong>Political appointment dynamics:</strong> Immigration judges are DOJ employees hired by the
            Attorney General. Different administrations have prioritized different judicial philosophies.
          </li>
          <li>
            <strong>Burnout and caseload pressure:</strong> Judges carrying 5,000+ cases face enormous pressure
            to move quickly, which can affect the thoroughness of individual case review.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What This Means</h2>
        <p>
          The practical impact is staggering. An asylum seeker assigned to a judge with a 10% grant rate
          has a fundamentally different future than one assigned to a judge with a 90% grant rate — based
          purely on the random assignment of their case.
        </p>
        <p>
          This raises serious questions about equal protection and due process in a system where life-or-death
          decisions depend so heavily on which courtroom you walk into.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ Immigration judges are DOJ employees, not independent Article III judges</li>
                <li>→ There are approximately 600 immigration judges across 68 courts</li>
                <li>→ The average judge caseload exceeds 5,000 pending cases</li>
                <li>→ Grant rate variation persists even within the same courthouse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/judges" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👨‍⚖️ Judge Statistics</h3>
          <p className="text-sm text-gray-600 mt-1">Explore grant rates and caseloads for individual judges.</p>
        </Link>
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📍 Geographic Lottery</h3>
          <p className="text-sm text-gray-600 mt-1">How court location affects case outcomes.</p>
        </Link>
      </div>
    </div>
  )
}
