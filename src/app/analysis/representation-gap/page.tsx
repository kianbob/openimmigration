import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Representation Gap — How Lawyers Change Immigration Court Outcomes',
  description: 'Only 27% of immigrants ordered deported had legal representation. Those with attorneys win cases at dramatically higher rates.',
}

export default function RepresentationGapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Representation Gap' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Access to Justice</div>
      <h1 className="font-heading text-4xl font-bold mb-4">The Representation Gap</h1>
      <p className="text-lg text-gray-600 mb-8">
        Only <strong>26.7%</strong> of immigrants had legal representation when ordered deported in December 2025.
        Having a lawyer dramatically changes outcomes — but most can&apos;t afford one, and the government doesn&apos;t provide one.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">No Right to a Lawyer</h2>
        <p>
          Unlike criminal court, there is <strong>no right to a government-provided attorney</strong> in immigration
          proceedings. Immigration court is civil, not criminal — even though the consequences (deportation, separation
          from family, return to persecution) can be just as severe.
        </p>
        <p>
          This means that if you can&apos;t afford a lawyer, you represent yourself — navigating a complex legal system
          in a language you may not speak, against a trained government prosecutor (the DHS trial attorney).
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Impact of Representation</h2>
        <p>
          The data consistently shows that legal representation is the single most important factor
          in immigration court outcomes — even more than the merits of the case. Research has found:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Represented immigrants are <strong>5 times more likely</strong> to win their cases than unrepresented ones</li>
          <li>For asylum cases specifically, represented applicants are <strong>3-4 times more likely</strong> to be granted asylum</li>
          <li>Represented individuals are more likely to appear at hearings (reducing in absentia deportation orders)</li>
          <li>Represented cases are more likely to identify viable forms of relief that the immigrant didn&apos;t know existed</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Who Gets a Lawyer?</h2>
        <p>
          Representation rates vary enormously by geography and detention status:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Detained immigrants</strong> have much lower representation rates — held in remote facilities far from legal aid organizations</li>
          <li><strong>Urban areas</strong> (New York, Los Angeles) have higher representation rates due to more legal aid organizations</li>
          <li><strong>Unaccompanied children</strong> have varying representation rates — some jurisdictions provide counsel, others don&apos;t</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Numbers</h2>
        <p>
          In December 2025, only <strong>26.7% of immigrants</strong> had an attorney when a removal order was issued.
          That means nearly <strong>3 out of 4 people ordered deported</strong> faced the process alone.
        </p>
        <p>
          This gap isn&apos;t just an access-to-justice issue — it&apos;s a data integrity issue. When most respondents
          are unrepresented, case outcomes reflect the absence of advocacy as much as the merits of the underlying claims.
          The system is effectively measuring whether people have lawyers, not whether they have valid cases.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ Immigration proceedings are civil, not criminal — no right to appointed counsel</li>
                <li>→ 73.3% of deportation orders in Dec 2025 were issued to unrepresented immigrants</li>
                <li>→ Represented immigrants win at roughly 5x the rate of unrepresented ones</li>
                <li>→ Some cities have funded universal representation programs with dramatic results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/representation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Data</h3>
          <p className="text-sm text-gray-600 mt-1">Explore representation rates by court, nationality, and case type.</p>
        </Link>
        <Link href="/analysis/backlog-crisis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📈 The Backlog Crisis</h3>
          <p className="text-sm text-gray-600 mt-1">How 3.3 million cases piled up.</p>
        </Link>
      </div>
    </div>
  )
}
