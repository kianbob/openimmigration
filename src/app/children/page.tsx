import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Unaccompanied Children in Immigration Court',
  description: 'Data on unaccompanied migrant children in U.S. immigration courts — pending cases, case completion times, outcomes, and representation rates.',
}

export default function ChildrenPage() {
  const stats = loadData('stats.json')
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Unaccompanied Children' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Unaccompanied Children in Immigration Court</h1>
      <p className="text-lg text-gray-600 mb-8">
        Unaccompanied alien children (UAC) — minors who arrive in the U.S. without a parent or guardian —
        face the immigration court system alone. Their cases raise unique due process concerns.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The UAC Challenge</h2>
        <p>
          When an unaccompanied child is apprehended at the border or within the U.S., they are transferred
          to the Office of Refugee Resettlement (ORR) and placed with a sponsor (often a family member).
          But they still face removal proceedings in immigration court.
        </p>
        <p>
          These children — some as young as 3 or 4 years old — are expected to navigate complex legal
          proceedings. While some jurisdictions provide attorneys for UACs, many do not. Children without
          legal representation face a nearly impossible task of understanding and defending themselves
          against deportation.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Key Issues</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Representation:</strong> Unlike adults, some UACs receive appointed counsel through
          government programs or legal aid organizations. But coverage is inconsistent.</li>
          <li><strong>Special Immigrant Juvenile Status (SIJS):</strong> Some UACs qualify for SIJS if they
          were abused, neglected, or abandoned — but the process is complex and requires state court involvement.</li>
          <li><strong>Asylum claims:</strong> Many UACs fled gang violence, trafficking, or family abuse in
          Central America. Their claims require sensitive handling.</li>
          <li><strong>In absentia orders:</strong> UACs who don&apos;t appear for hearings (often because sponsors
          moved or didn&apos;t understand the process) receive removal orders in their absence.</li>
        </ul>

        <p>
          These cases exist within a system of {stats.totalCases.toLocaleString()} total immigration cases,
          where {stats.inAbsentia.toLocaleString()} in absentia orders have been issued — many to individuals
          who didn&apos;t understand the process, including children and their sponsors.
        </p>
      </div>
    </div>
  )
}
