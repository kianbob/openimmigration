import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Bond Hearings — Statistics & Data',
  description: 'Immigration bond hearing data — 15,540 bond hearings in Q1 FY2026, only 26% granted. Explore bond rates by court and judge.',
}

export default function BondPage() {
  const stats = loadData('stats.json')
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Bond Hearings' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Bond Hearings</h1>
      <p className="text-lg text-gray-600 mb-8">
        In FY2026 through December 2025, immigration judges held <strong>15,540 bond hearings</strong>.
        Of these, only <strong>4,062 (26%)</strong> were granted bond.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">15,540</div>
          <div className="text-sm text-gray-600 mt-1">Bond Hearings (FY2026 Q1)</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-success">4,062</div>
          <div className="text-sm text-gray-600 mt-1">Bond Granted</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-danger">74%</div>
          <div className="text-sm text-gray-600 mt-1">Bond Denied</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Is Immigration Bond?</h2>
        <p>
          Immigration bond is the amount of money a detained immigrant must pay to be released from
          detention while their case proceeds. Bond hearings are separate from the main removal proceedings —
          they determine only whether the person can be released, not the outcome of their case.
        </p>
        <p>
          The minimum bond amount is $1,500, but judges frequently set bonds at $5,000, $10,000, or higher.
          Bond amounts and grant rates vary significantly by court and judge.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Bond Matters</h2>
        <p>
          Being released on bond allows immigrants to better prepare their cases — they can hire attorneys,
          gather evidence, and maintain family connections. Detained immigrants have significantly lower
          representation rates and worse case outcomes.
        </p>
        <p>
          The 74% denial rate means the majority of immigrants who request bond remain detained throughout
          their proceedings — sometimes for months or years.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">System Context</h2>
        <p>
          Bond hearings occur within a system handling {stats.totalCases.toLocaleString()} total cases,
          with {stats.pendingCases.toLocaleString()} currently pending. Only {stats.representationRate}% of
          those ordered deported had legal representation — and detained individuals have even lower representation rates.
        </p>
      </div>
    </div>
  )
}
