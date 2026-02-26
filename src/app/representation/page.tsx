import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legal Representation in Immigration Court',
  description: 'Only 27% of immigrants ordered deported had legal representation. Explore how having a lawyer changes immigration court outcomes.',
}

export default function RepresentationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Representation' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Legal Representation</h1>
      <p className="text-lg text-gray-600 mb-8">
        In December 2025, only <strong>26.7%</strong> of immigrants had an attorney when a removal order was issued.
        Legal representation dramatically changes outcomes — represented immigrants win at 5x the rate.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-danger">73.3%</div>
          <div className="text-sm text-gray-600 mt-1">Unrepresented When Deported</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-success">5x</div>
          <div className="text-sm text-gray-600 mt-1">Higher Win Rate With Lawyer</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-warning">$0</div>
          <div className="text-sm text-gray-600 mt-1">Govt-Provided Counsel</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 mb-12">
        <p>
          Unlike criminal court, there is no right to a government-provided attorney in immigration proceedings.
          Immigration court is classified as civil, even though the consequences — deportation, family separation,
          and potential return to persecution — can be as severe as criminal penalties.
        </p>
        <p>
          Representation rates vary significantly by court location, detention status, and nationality.
          Detained immigrants have particularly low representation rates, as they are often held in
          remote facilities far from legal aid organizations.
        </p>
      </div>

      <Link href="/analysis/representation-gap"
        className="inline-block bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium">
        Read Full Analysis →
      </Link>
    </div>
  )
}
