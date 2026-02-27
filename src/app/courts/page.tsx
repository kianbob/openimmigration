import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { titleCase } from '@/lib/utils'
import fs from 'fs'
import path from 'path'
import CourtsTable from './CourtsTable'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'All 88 U.S. Immigration Courts — Grant Rates, Cases & Outcomes',
  description: 'Explore case volumes, grant rates, and outcomes for all 88 U.S. immigration courts. Grant rates range from 0.8% (Houston) to 21% (New York). DOJ EOIR data.',
  alternates: { canonical: 'https://www.openimmigration.us/courts' },
}

export default function CourtsPage() {
  const courts = loadData('court-index.json')
  const stats = loadData('stats.json')

  const totalCases = courts.reduce((sum: number, c: { cases: number }) => sum + c.cases, 0)
  const activeCourts = courts.filter((c: { active: boolean }) => c.active).length
  const qualified = courts.filter((c: { grantRate: number | null; completed: number }) => c.grantRate != null && c.completed > 1000)
  const highest = [...qualified].sort((a: { grantRate: number }, b: { grantRate: number }) => b.grantRate - a.grantRate)[0]
  const lowest = [...qualified].sort((a: { grantRate: number }, b: { grantRate: number }) => a.grantRate - b.grantRate)[0]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Immigration Courts' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Immigration Courts</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. has {stats.totalCourts} immigration courts processing {(totalCases / 1e6).toFixed(1)} million cases.
        Grant rates range from <strong>{lowest?.grantRate}%</strong> ({titleCase(lowest?.city)}, {lowest?.state}) to{' '}
        <strong>{highest?.grantRate}%</strong> ({titleCase(highest?.city)}). Where your case is heard can determine your fate.
        Click column headers to sort. Click any court for detailed data.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{stats.totalCourts}</div>
          <div className="text-sm text-gray-600">Total Courts</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{activeCourts}</div>
          <div className="text-sm text-gray-600">Active Courts</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-green-700">{highest?.grantRate}%</div>
          <div className="text-sm text-gray-600">Highest Grant Rate</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-red-700">{lowest?.grantRate}%</div>
          <div className="text-sm text-gray-600">Lowest Grant Rate</div>
        </div>
      </div>

      <CourtsTable courts={courts} />

      {/* Why This Data Matters */}
      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Why This Data Matters</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            The United States operates 88 immigration courts, and the data reveals an uncomfortable truth: where your case is heard can determine your fate. Grant rates vary enormously — from courts that approve relief in roughly one in five cases to courts where fewer than one in a hundred receive protection. These aren&apos;t different legal systems; they&apos;re the same laws applied by different judges in different cities, producing radically different results.
          </p>
          <p>
            This geographic lottery has real consequences. Immigrants don&apos;t choose which court hears their case — it&apos;s determined by where they live or where they&apos;re detained. A family fleeing violence might face near-certain denial in one court and have a reasonable chance of protection in another, simply based on geography. This variation reflects differences in local legal culture, judicial philosophy, the availability of pro bono attorneys, and caseload pressures that force some courts to rush through proceedings.
          </p>
          <p>
            For policymakers, this data raises serious questions about judicial independence and consistency in immigration law. Unlike federal courts, immigration judges are employees of the Department of Justice — part of the executive branch, not the judiciary. They face performance quotas, political pressure, and enormous caseloads. Understanding how each court operates is the first step toward a system that delivers more consistent, fair outcomes regardless of zip code.
          </p>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/geographic-lottery" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📍 Geographic Lottery Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">How court location determines outcomes — the {highest?.grantRate}% vs {lowest?.grantRate}% gap explained.</p>
        </Link>
        <Link href="/analysis/judge-variation" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">⚖️ Judge Roulette</h3>
          <p className="text-sm text-gray-600 mt-1">Within each court, judge variation adds another layer of randomness.</p>
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        Source: Department of Justice, Executive Office for Immigration Review (EOIR). Data current through February 2026.{' '}
        <Link href="/about" className="hover:text-gray-600">Learn more →</Link>
      </p>
    </div>
  )
}
