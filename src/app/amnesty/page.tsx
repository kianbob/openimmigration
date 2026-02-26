import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Amnesty & Legalization Programs — History & Data',
  description: 'History of U.S. immigration amnesty programs — from IRCA 1986 (2.7M legalized) to DACA (515K active). How legalization programs shaped immigration court caseloads.',
}

export default function AmnestyPage() {
  const stats = loadData('stats.json')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Amnesty & Legalization' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Amnesty & Legalization Programs</h1>
      <p className="text-lg text-gray-600 mb-8">
        The U.S. has periodically created pathways to legal status for undocumented immigrants.
        These programs directly affect immigration court caseloads — reducing them when legalization
        is broad, and increasing them when programs expire or are challenged.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">2.7M</div>
          <div className="text-sm text-gray-600 mt-1">IRCA 1986 Legalized</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">515K</div>
          <div className="text-sm text-gray-600 mt-1">Active DACA Recipients</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">~320K</div>
          <div className="text-sm text-gray-600 mt-1">TPS Holders</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{(stats.pendingCases / 1e6).toFixed(1)}M</div>
          <div className="text-sm text-gray-600 mt-1">Pending Court Cases</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Major Legalization Programs</h2>

        <div className="not-prose space-y-4 my-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">Immigration Reform and Control Act (IRCA) — 1986</h3>
                <p className="text-sm text-gray-600 mt-1">
                  The largest amnesty in U.S. history. Signed by President Reagan, it legalized approximately
                  2.7 million undocumented immigrants who had been continuously present since January 1, 1982.
                  Also included a Special Agricultural Workers (SAW) program for farmworkers.
                </p>
              </div>
              <div className="text-2xl font-bold text-primary ml-4">2.7M</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">NACARA — 1997</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Nicaraguan Adjustment and Central American Relief Act provided paths to permanent residence
                  for Nicaraguans, Cubans, and certain Salvadorans, Guatemalans, and Eastern Europeans.
                  Our data shows {stats.totalCases.toLocaleString()} total court cases — NACARA removed
                  thousands from the deportation pipeline.
                </p>
              </div>
              <div className="text-2xl font-bold text-primary ml-4">~150K</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">DACA — 2012</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Deferred Action for Childhood Arrivals protects immigrants who arrived as children from
                  deportation and provides work authorization. Currently 515,570 active recipients. Not a path
                  to citizenship — just temporary protection that must be renewed every two years.
                </p>
              </div>
              <div className="text-2xl font-bold text-primary ml-4">515K</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">Temporary Protected Status (TPS)</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Grants temporary protection to nationals of designated countries experiencing armed conflict,
                  natural disasters, or other extraordinary conditions. Currently covers ~320,000 people from
                  16 countries including Venezuela, Haiti, El Salvador, and Ukraine.
                </p>
              </div>
              <div className="text-2xl font-bold text-primary ml-4">~320K</div>
            </div>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Backlog Connection</h2>
        <p>
          Every person who receives legalization is one fewer case in the immigration court system. Conversely,
          when programs like DACA or TPS are terminated, recipients can be placed into removal proceedings —
          adding to the {stats.pendingCases.toLocaleString()} pending cases.
        </p>
        <p>
          The absence of comprehensive immigration reform since 1986 is a major driver of the current backlog.
          Without a legal pathway, millions of undocumented immigrants remain in a system that can only process
          them through courts staffed by {stats.totalJudges.toLocaleString()} judges across {stats.totalCourts} courts.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Why It Matters</h3>
              <p className="text-sm text-amber-800">
                The debate over amnesty is fundamentally a debate about the backlog. With {stats.pendingCases.toLocaleString()} pending
                cases, the system cannot process everyone through courts. Legalization programs reduce caseloads;
                enforcement-only approaches increase them. Neither side disputes the math — only the policy response.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/daca" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🎓 DACA Recipients</h3>
          <p className="text-sm text-gray-600 mt-1">515,570 active Dreamers — data by country and state.</p>
        </Link>
        <Link href="/analysis/backlog-crisis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📈 Backlog Crisis</h3>
          <p className="text-sm text-gray-600 mt-1">How 1.9 million cases piled up.</p>
        </Link>
        <Link href="/uscis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📋 USCIS Data</h3>
          <p className="text-sm text-gray-600 mt-1">5.4 million applications in the USCIS pipeline.</p>
        </Link>
      </div>
    </div>
  )
}
