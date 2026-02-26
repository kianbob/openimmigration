import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Children Facing Judges Alone — Minors in Immigration Court',
  description: 'Tens of thousands of unaccompanied children face immigration judges every year — many without lawyers. How the system handles its most vulnerable respondents.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/children-in-court' },
}

export default function ChildrenInCourtPage() {
  const stats = loadData('stats.json')
  const border = loadData('border-encounters.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Children in Court' },
      ]} />

      <span className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Vulnerable Populations</span>
      <h1 className="font-heading text-4xl font-bold mb-6">Children Facing Judges Alone</h1>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-xl text-gray-600 mb-8">
          Every year, tens of thousands of unaccompanied children appear in U.S. immigration court. Many are
          under 10 years old. Most don&apos;t have lawyers. They face the same judges, the same legal standards,
          and the same consequences as adults. The system was not designed for them.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Children in the Immigration System</h2>
        <p>
          CBP encountered over <strong>{border.grandTotal.toLocaleString()} people</strong> at the border
          between FY2020 and FY2026. A significant portion are children — both &quot;unaccompanied alien children&quot; (UACs)
          who arrive without a parent, and children in family units. All of them eventually face immigration court.
        </p>
        <p>
          Unaccompanied children are first transferred to the Office of Refugee Resettlement (ORR), which places
          them with sponsors — usually relatives already in the U.S. Then they receive a Notice to Appear in
          immigration court. From that point, they navigate the same system as adults.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">No Right to a Lawyer</h2>
        <p>
          In the American criminal justice system, every defendant — including children — has the right to a
          public defender. In immigration court, no such right exists. Children can hire their own lawyers, but
          cannot be appointed one at government expense.
        </p>
        <p>
          This means a 5-year-old from Guatemala can be called before a federal judge, asked to articulate a
          legal basis for asylum, respond to government arguments, and present evidence — all without a lawyer.
          This isn&apos;t hypothetical. It happens regularly.
        </p>
        <p>
          In a now-famous 2016 exchange, a former EOIR chief judge testified that immigration law is
          &quot;simple enough for a 3-year-old to understand.&quot; The statement was widely ridiculed, but it reflected
          the system&apos;s actual stance: children are treated as respondents, not as children.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Representation Gap for Kids</h2>
        <p>
          Overall, only {stats.representationRate}% of immigration respondents have lawyers. For unaccompanied
          children, the rate is somewhat higher thanks to pro bono legal organizations and congressional funding
          for legal orientation programs — but still far from universal.
        </p>
        <p>
          The impact of representation is dramatic. Children with lawyers win their cases at 10x the rate of
          those without. For asylum cases specifically, represented children are granted protection at rates
          above 70%, while unrepresented children are denied at similar rates.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Special Immigrant Juvenile Status</h2>
        <p>
          One pathway designed specifically for children is Special Immigrant Juvenile Status (SIJS), which
          provides green cards to abused, neglected, or abandoned children. The process requires a state court
          finding of dependency, then a USCIS application.
        </p>
        <p>
          SIJS has a massive backlog. Children often &quot;age out&quot; — turning 21 before their application is processed,
          losing eligibility. The irony: a program designed to protect children fails because the system is too
          slow to process their cases before they become adults.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">In Absentia Orders Against Children</h2>
        <p>
          When someone doesn&apos;t appear for their immigration hearing, the judge issues an in absentia removal
          order. This happens to children too. A child placed with a sponsor in one state may receive a hearing
          notice for a court in another state. The sponsor may not understand the notice. The child certainly
          doesn&apos;t. The result: deportation ordered against a child who didn&apos;t know they had a hearing.
        </p>
        <p>
          Our data shows <Link href="/analysis/in-absentia" className="text-primary hover:underline">{stats.inAbsentia.toLocaleString()} in
          absentia orders</Link> across all cases. While we can&apos;t isolate children&apos;s in absentia rates
          from the aggregate data, advocates report it&apos;s a persistent problem — particularly for young
          children whose sponsors move or change contact information.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">What Would Change Look Like?</h2>
        <p>
          Multiple proposals exist to reform how children are treated in immigration court:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Universal representation for children</strong> — Multiple bills have proposed guaranteed
          lawyers for all unaccompanied children. Cost estimates: $100-200M/year.</li>
          <li><strong>Child-friendly court procedures</strong> — Age-appropriate hearings, trained judges,
          specialized dockets. Some courts already have juvenile dockets.</li>
          <li><strong>Best interest standard</strong> — Currently, immigration judges cannot consider the
          &quot;best interest of the child&quot; in their decisions. Family courts use this standard universally.</li>
          <li><strong>Automatic continuances</strong> — Prohibiting in absentia orders against children
          without confirmed receipt of hearing notices.</li>
        </ul>
      </div>

      <ShareButtons url="https://www.openimmigration.us/analysis/children-in-court" title="Children Facing Judges Alone" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/children" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">👶 Children Data</h3>
          <p className="text-xs text-gray-600 mt-1">Unaccompanied minors and family unit data.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">👔 Representation Gap</h3>
          <p className="text-xs text-gray-600 mt-1">How lawyers change outcomes for everyone.</p>
        </Link>
        <Link href="/analysis/in-absentia" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🏚️ In Absentia Orders</h3>
          <p className="text-xs text-gray-600 mt-1">Deported without showing up.</p>
        </Link>
      </div>

      <RelatedAnalysis current="children-in-court" />

      <ArticleSchema title="Children Facing Judges Alone — Minors in Immigration Court" description="Tens of thousands of unaccompanied children face immigration judges without lawyers." url="https://www.openimmigration.us/analysis/children-in-court" datePublished="2026-02-26" />
    </div>
  )
}
