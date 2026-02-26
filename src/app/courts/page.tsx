import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'
import CourtsTable from './CourtsTable'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Courts — All 88 U.S. Immigration Courts',
  description: 'Explore case volumes, outcomes, and grant rates for all 88 U.S. immigration courts. Data from DOJ EOIR.',
}

export default function CourtsPage() {
  const courts = loadData('courts.json')
  const stats = loadData('stats.json')

  const totalCases = courts.reduce((sum: number, c: { cases: number }) => sum + c.cases, 0)
  const activeCourts = courts.filter((c: { active: boolean }) => c.active).length

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Immigration Courts' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Immigration Courts</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. has {stats.totalCourts} immigration courts operated by the Executive Office for Immigration Review (EOIR).
        {activeCourts} are currently active. Click column headers to sort.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{stats.totalCourts}</div>
          <div className="text-sm text-gray-600">Total Courts</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{activeCourts}</div>
          <div className="text-sm text-gray-600">Active Courts</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{(totalCases / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Total Cases Across Courts</div>
        </div>
      </div>

      <CourtsTable courts={courts} />

      <p className="text-sm text-gray-500 mt-6 text-center">
        Data source: {stats.dataSource}
      </p>
    </div>
  )
}
