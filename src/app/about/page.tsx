import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'About',
  description: 'OpenImmigration makes U.S. immigration court data accessible. Learn about our data sources, methodology, and mission.',
  alternates: { canonical: 'https://www.openimmigration.us/about' },
}

export default function AboutPage() {
  const stats = loadData('stats.json')
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      <h1 className="font-heading text-4xl font-bold mb-6">About OpenImmigration</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p>
          <strong>OpenImmigration</strong> is a free, open-data platform that makes U.S. immigration court records
          accessible and understandable. We believe this data — which shapes the lives of millions of people — should
          be available to everyone, not locked behind paywalls or buried in government PDFs.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Our Data</h2>
        <p>
          Our primary data source is the <strong>EOIR Case Data</strong> — a comprehensive dataset published monthly by the
          Department of Justice&apos;s Executive Office for Immigration Review (EOIR). This dataset was made public through
          Freedom of Information Act (FOIA) requests originally filed by the Transactional Records Access Clearinghouse
          (TRAC) at Syracuse University.
        </p>
        <p>The dataset includes:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Cases</strong> — Every immigration court case with nationality, language, city/state, custody status, case type, dates, and attorney information</li>
          <li><strong>Proceedings</strong> — Hearing dates, adjournments, outcomes, and decisions</li>
          <li><strong>Charges</strong> — Immigration charges filed in each case</li>
          <li><strong>Judges</strong> — Judge assignments and court locations</li>
          <li><strong>Applications</strong> — Asylum and other relief applications filed</li>
          <li><strong>Appeals</strong> — Board of Immigration Appeals data</li>
        </ul>
        <p>
          We supplement EOIR data with:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>CBP Encounter Data</strong> — Monthly border encounter statistics from U.S. Customs and Border Protection (FY2020-2026)</li>
          <li><strong>ICE ERO Statistics</strong> — Deportation, arrest, and detention data from Immigration and Customs Enforcement</li>
          <li><strong>USCIS Quarterly Reports</strong> — Green card, naturalization, DACA, and application backlog data</li>
          <li><strong>DHS Overstay Reports</strong> — Annual visa overstay data reported to Congress</li>
          <li><strong>DHS Yearbook of Immigration Statistics</strong> — Historical legal immigration, refugee, and enforcement data</li>
          <li><strong>CBP Drug Seizure Statistics</strong> — Drug type, weight, and location data for border seizures (FY2023-2026)</li>
        </ul>
        <p>
          All data is from official U.S. government sources — public records that should be accessible to everyone.
          We process raw data into clean JSON files and make them available for <a href="/downloads" className="text-primary hover:underline">free download</a>.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What We Cover</h2>
        <p>OpenImmigration provides a comprehensive view of the U.S. immigration system:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a href="/courts" className="text-primary hover:underline"><strong>Immigration Courts</strong></a> — 88 courts, 1,400+ judges, 9.7M cases</li>
          <li><a href="/border" className="text-primary hover:underline"><strong>Border Encounters</strong></a> — 12M+ CBP encounters (FY2020-2026)</li>
          <li><a href="/drug-seizures" className="text-primary hover:underline"><strong>Drug Seizures</strong></a> — 1.9M lbs seized, including 65K lbs of fentanyl</li>
          <li><a href="/enforcement" className="text-primary hover:underline"><strong>ICE Enforcement</strong></a> — Deportations, removals, and interior enforcement</li>
          <li><a href="/legal-immigration" className="text-primary hover:underline"><strong>Legal Immigration</strong></a> — Green cards, refugees, and naturalization</li>
          <li><a href="/tps" className="text-primary hover:underline"><strong>TPS</strong></a> — 1M+ Temporary Protected Status applications from 17 countries</li>
          <li><a href="/wait-times" className="text-primary hover:underline"><strong>Wait Times</strong></a> — Case duration analysis across all courts</li>
          <li><a href="/appeals" className="text-primary hover:underline"><strong>Appeals</strong></a> — 1.46M Board of Immigration Appeals cases</li>
          <li><a href="/timeline" className="text-primary hover:underline"><strong>Immigration Timeline</strong></a> — 235 years of U.S. immigration history</li>
          <li><a href="/analysis" className="text-primary hover:underline"><strong>14 In-Depth Analyses</strong></a> — Backlog crisis, judge variation, fentanyl pipeline, bond system, and more</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why This Matters</h2>
        <p>
          The U.S. immigration court system currently has a backlog of over <strong>{(stats.pendingCases / 1e6).toFixed(1)} million cases</strong>.
          Wait times can exceed 4 years. Asylum grant rates vary wildly — from under 10% to over 90% — depending
          on the judge assigned to a case. Whether someone is deported or allowed to stay can depend more on
          geography and judicial assignment than the merits of their case.
        </p>
        <p>
          Only about <strong>{stats.representationRate}% of immigrants</strong> in removal proceedings have legal representation.
          Those with attorneys are significantly more likely to win their cases.
        </p>
        <p>
          These are facts that should be accessible to everyone — journalists investigating the system,
          researchers studying patterns, attorneys preparing cases, policymakers making decisions,
          and the public understanding how immigration enforcement actually works.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">What We Don&apos;t Do</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>We don&apos;t identify individual immigrants — all data is aggregated</li>
          <li>We don&apos;t advocate for any particular immigration policy</li>
          <li>We don&apos;t charge for access — no paywalls, no registration</li>
          <li>We don&apos;t editorialize the data — we present it with context</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Part of TheDataProject.ai</h2>
        <p>
          OpenImmigration is part of <a href="https://thedataproject.ai" className="text-primary hover:underline">TheDataProject.ai</a>,
          a portfolio of data-driven platforms that make public records accessible. Our sister sites include{' '}
          <a href="https://www.openmedicaid.org" className="text-primary hover:underline">OpenMedicaid</a>,{' '}
          <a href="https://www.openmedicare.us" className="text-primary hover:underline">OpenMedicare</a>,{' '}
          <a href="https://www.openlobby.us" className="text-primary hover:underline">OpenLobby</a>,{' '}
          <a href="https://www.vaccinewatch.org" className="text-primary hover:underline">VaccineWatch</a>, and more.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Press & Media</h2>
        <p>
          For press inquiries, data requests, or collaboration opportunities, contact us at{' '}
          <a href="mailto:info@thedataproject.ai" className="text-primary hover:underline">info@thedataproject.ai</a>.
        </p>
      </div>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About OpenImmigration',
          url: 'https://www.openimmigration.us/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'OpenImmigration',
            url: 'https://www.openimmigration.us',
            parentOrganization: {
              '@type': 'Organization',
              name: 'TheDataProject.ai',
              url: 'https://thedataproject.ai',
            },
          },
        })
      }} />
    </div>
  )
}
