import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import JudgesTable from './JudgesTable'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Judge Statistics — 1,269 Judges',
  description: 'Explore asylum grant rates, case volumes, and decision patterns for 1,269 U.S. immigration judges.',
}

export default function JudgesPage() {
  const judges = loadData('judge-index.json')
  const stats = loadData('stats.json')

  const avgGrant = (judges.reduce((s: number, j: { grantRate: number }) => s + j.grantRate, 0) / judges.length).toFixed(1)
  const avgRemoval = (judges.reduce((s: number, j: { removalRate: number }) => s + j.removalRate, 0) / judges.length).toFixed(1)
  const maxGrant = judges.reduce((max: { grantRate: number; name: string }, j: { grantRate: number; name: string }) => j.grantRate > max.grantRate ? j : max, judges[0])
  const minGrant = judges.reduce((min: { grantRate: number; name: string }, j: { grantRate: number; name: string }) => j.grantRate < min.grantRate ? j : min, judges[0])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Judges' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Judge Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        {judges.length.toLocaleString()} immigration judges (with 50+ decisions) across {stats.totalCourts} courts.
        Grant rates range from {minGrant.grantRate}% to {maxGrant.grantRate}%. Click column headers to sort.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary">{judges.length.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Judges</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-success">{avgGrant}%</div>
          <div className="text-sm text-gray-600 mt-1">Avg Grant Rate</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-danger">{avgRemoval}%</div>
          <div className="text-sm text-gray-600 mt-1">Avg Removal Rate</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-warning">{maxGrant.grantRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Highest Grant Rate</div>
        </div>
      </div>

      <JudgesTable judges={judges} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
