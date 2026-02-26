import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Unaccompanied Children in Immigration Court — UAC Data & Statistics',
  description: 'Unaccompanied migrant children face immigration court alone. Many as young as 3-4 years old must defend themselves against deportation without a lawyer.',
  alternates: { canonical: 'https://www.openimmigration.us/children' },
}

export default function ChildrenPage() {
  const stats = loadData('stats.json')
  const gender = loadData('gender.json')
  const languages = loadData('languages.json')

  const mamCases = languages.find((l: { code: string }) => l.code === 'MAM')?.count || 0
  const quicheCases = languages.find((l: { code: string }) => l.code === 'QUI')?.count || 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Unaccompanied Children' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Unaccompanied Children in Immigration Court</h1>
      <p className="text-lg text-gray-600 mb-8">
        Every year, tens of thousands of unaccompanied minors are placed into immigration court proceedings.
        Some are as young as 3 years old. They face the same complex legal system as adults — often without
        a lawyer, and sometimes without even speaking the language.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">~80K</div>
          <div className="text-sm text-gray-600 mt-1">UACs Apprehended (FY2024)</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{stats.representationRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Overall Rep Rate</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{stats.inAbsentia.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Total In Absentia Orders</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">SIJS</div>
          <div className="text-sm text-gray-600 mt-1">Key Relief Path</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">How a Child Ends Up in Court</h2>
        <p>
          When Border Patrol or ICE encounters an unaccompanied alien child (UAC) — defined as someone
          under 18 without a parent or guardian — they are transferred to the Office of Refugee Resettlement
          (ORR). ORR places them with a sponsor (usually a family member in the U.S.) while their immigration
          case proceeds.
        </p>
        <p>
          But placement with a sponsor doesn&apos;t end the legal process. The child still has a pending case in
          immigration court. They must appear for hearings, respond to charges, and either establish a legal
          basis to remain or face removal.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">A Child Representing Themselves</h2>
        <p>
          Unlike criminal court, there is no guaranteed right to an attorney in immigration proceedings —
          even for children. While some jurisdictions have programs providing lawyers for UACs, coverage is
          inconsistent. A child without a lawyer must:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Understand the charges against them (usually &quot;unlawful presence&quot; or &quot;entry without inspection&quot;)</li>
          <li>Identify and apply for any available relief (asylum, SIJS, T-visa, U-visa)</li>
          <li>Gather and present evidence supporting their claim</li>
          <li>Appear for all scheduled hearings (which may be years apart)</li>
          <li>Respond to legal motions from the ICE trial attorney</li>
        </ul>
        <p>
          Many of these children speak only Spanish — or indigenous languages like Mam ({mamCases.toLocaleString()} cases
          in our data) or K&apos;iche&apos; ({quicheCases.toLocaleString()} cases). Some cannot read in any language.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Special Immigrant Juvenile Status (SIJS)</h2>
        <p>
          SIJS is the primary relief pathway for UACs. It&apos;s available to children who were abused, neglected,
          or abandoned by one or both parents. The process requires:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>State court findings:</strong> A state family or juvenile court must find that the child was abused/neglected/abandoned and that reunification with the parent isn&apos;t viable.</li>
          <li><strong>USCIS petition:</strong> File Form I-360 for SIJ classification.</li>
          <li><strong>Adjustment of status:</strong> Once classified, apply for a green card (which may take years due to visa backlogs).</li>
        </ol>
        <p>
          The process requires navigating two separate court systems (state family court + federal immigration
          court) — something essentially impossible without legal help.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">In Absentia: Children Who Don&apos;t Appear</h2>
        <p>
          A significant number of UAC cases end in absentia — the child doesn&apos;t show up for their hearing
          and receives a removal order by default. This often happens because:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The sponsor moved and didn&apos;t update the court address</li>
          <li>The hearing notice was sent to ORR&apos;s address, not the sponsor&apos;s</li>
          <li>The sponsor is undocumented and fears appearing at a government building</li>
          <li>The child aged out during the multi-year wait and lost track of the case</li>
          <li>No attorney was tracking the case or court dates</li>
        </ul>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-900 mb-2">The Due Process Question</h3>
              <p className="text-sm text-red-800">
                In 2018, a federal judge asked a government attorney whether a 3-year-old could represent
                themselves in court. The attorney suggested the toddler could learn immigration law.
                This exchange highlighted the absurdity of a system that expects children to navigate
                complex legal proceedings without guaranteed counsel — in a system where only {stats.representationRate}%
                of respondents overall have lawyers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Only {stats.representationRate}% have lawyers — children included.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🚪 In Absentia Orders</h3>
          <p className="text-sm text-gray-600 mt-1">{stats.inAbsentia.toLocaleString()} people deported without showing up.</p>
        </Link>
        <Link href="/demographics" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Demographics</h3>
          <p className="text-sm text-gray-600 mt-1">Gender, language, and custody data for all cases.</p>
        </Link>
      </div>
    </div>
  )
}
