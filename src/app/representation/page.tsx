import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Legal Representation in Immigration Court',
  description: 'Only a fraction of immigrants have legal representation. Explore how having a lawyer changes immigration court outcomes.',
}

export default function RepresentationPage() {
  const stats = loadData('stats.json')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Representation' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Legal Representation</h1>
      <p className="text-lg text-gray-600 mb-8">
        Only <strong>{stats.representationRate}%</strong> of immigrants had an attorney when a removal order was issued.
        Legal representation dramatically changes outcomes — represented immigrants win at 5x the rate.
        Across {stats.totalCases.toLocaleString()} total cases, this gap has had enormous consequences.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-danger">{(100 - stats.representationRate).toFixed(1)}%</div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.asylumGranted.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Asylum Grants</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.removalOrders.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Removal Orders</div>
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
        <p>
          Of the {stats.inAbsentia.toLocaleString()} in absentia orders issued, many were to unrepresented
          individuals who may not have understood the court process or received proper notice.
        </p>
      </div>

      <Link href="/analysis/representation-gap"
        className="inline-block bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium">
        Read Full Analysis →
      </Link>
    </div>
  )
}
