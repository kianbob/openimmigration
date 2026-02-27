import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import CompareClient from './CompareClient'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Compare Immigration Courts & Judges — Side-by-Side Statistics',
  description: 'Compare immigration courts and judges side by side. See grant rates, case volumes, removal rates, and outcomes for up to 5 courts or judges at once.',
  alternates: { canonical: 'https://www.openimmigration.us/compare' },
  openGraph: {
    title: 'Compare Immigration Courts & Judges — Side-by-Side Statistics',
    description: 'Compare immigration courts and judges side by side. See grant rates, case volumes, removal rates, and outcomes for up to 5 courts or judges at once.',
  },
}

export default function ComparePage() {
  const courts = loadData('court-index.json')
  const judges = loadData('judge-index.json')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]} />
      <h1 className="font-heading text-4xl font-bold mb-2">Compare Courts & Judges</h1>
      <p className="text-lg text-gray-600 mb-8">
        Select up to 5 immigration courts or judges to compare side by side. See how grant rates,
        caseloads, and outcomes differ across the system.
      </p>

      <CompareClient courts={courts} judges={judges} />

      {/* SEO content */}
      <div className="mt-16 prose prose-lg max-w-none text-gray-600">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Why Compare Courts and Judges?</h2>
        <p>
          Immigration court outcomes vary dramatically depending on where your case is heard and which judge
          presides. Two courts in the same state can have grant rates that differ by 20 percentage points or more.
          Two judges in the same court can reach opposite conclusions on similar cases.
        </p>
        <p>
          This tool lets you see those differences for yourself. Select any combination of courts or judges and
          compare their statistics side by side — total cases, grant rates, removal orders, and more.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What the Data Shows</h2>
        <p>
          Our analysis of {courts.length} immigration courts and {judges.length.toLocaleString()} judges reveals
          significant variation in outcomes. Grant rates for individual judges range from 0% to over 90%.
          Court-level differences, while less extreme, still represent the difference between likely approval
          and almost certain denial for many asylum seekers.
        </p>
        <p>
          These differences matter because immigration case assignment is essentially random — respondents don&apos;t
          choose their court or judge. As our <Link href="/analysis/judge-variation" className="text-primary hover:underline">judge variation analysis</Link> and{' '}
          <Link href="/analysis/geographic-lottery" className="text-primary hover:underline">geographic lottery analysis</Link> show,
          this randomness creates profound inequities in the system.
        </p>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Source: Department of Justice, Executive Office for Immigration Review (EOIR).
        Data current through February 2026. <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
