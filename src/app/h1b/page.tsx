import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

const BASE_URL = 'https://www.openimmigration.us'

export const metadata: Metadata = {
  title: 'H-1B Visa Data & Statistics — Cap, Approval Rates, Top Employers',
  description: 'Comprehensive H-1B visa statistics: 85,000 annual cap, approval rates, top employers, processing times, and country-level data. Explore H-1B trends and workforce impact.',
  alternates: { canonical: `${BASE_URL}/h1b` },
  openGraph: {
    title: 'H-1B Visa Data & Statistics',
    description: 'Comprehensive H-1B visa statistics: 85,000 annual cap, approval rates, top employers, processing times, and country-level data.',
    url: `${BASE_URL}/h1b`,
  },
}

const topEmployers = [
  { name: 'Amazon', approvals: '~14,000' },
  { name: 'Infosys', approvals: '~12,500' },
  { name: 'Tata Consultancy Services', approvals: '~10,000' },
  { name: 'Google', approvals: '~9,500' },
  { name: 'Meta (Facebook)', approvals: '~7,500' },
  { name: 'Microsoft', approvals: '~7,000' },
  { name: 'Apple', approvals: '~5,500' },
  { name: 'Cognizant', approvals: '~5,000' },
  { name: 'Deloitte', approvals: '~4,500' },
  { name: 'Wipro', approvals: '~4,000' },
]

const topCountries = [
  { country: 'India', share: '~73%' },
  { country: 'China', share: '~12%' },
  { country: 'Canada', share: '~2%' },
  { country: 'South Korea', share: '~1.5%' },
  { country: 'Philippines', share: '~1%' },
]

const faqItems = [
  {
    q: 'What is the H-1B visa annual cap?',
    a: 'The H-1B visa has an annual cap of 85,000 new visas: 65,000 for applicants with a bachelor\'s degree or equivalent, and an additional 20,000 reserved for applicants with a U.S. master\'s degree or higher. Certain employers, such as universities and nonprofit research institutions, are exempt from the cap.',
  },
  {
    q: 'How are H-1B visas selected when demand exceeds the cap?',
    a: 'When the number of applications exceeds the cap (which happens nearly every year), USCIS conducts a lottery to randomly select which petitions will be processed. In recent years, registrations have exceeded 700,000 for 85,000 available slots, resulting in selection rates around 12-15%.',
  },
  {
    q: 'How long does H-1B processing take?',
    a: 'Regular H-1B processing takes 3-6 months. Premium processing, available for an additional $2,805 fee, guarantees a response within 15 business days. Processing times can vary significantly based on the USCIS service center handling the case.',
  },
  {
    q: 'Can H-1B visa holders apply for a green card?',
    a: 'Yes. H-1B is a "dual intent" visa, meaning holders can pursue permanent residence (a green card) while maintaining H-1B status. The employer typically sponsors the green card through the PERM labor certification process. However, wait times for employment-based green cards can be extremely long — decades for Indian nationals in certain categories.',
  },
  {
    q: 'What happens if an H-1B worker loses their job?',
    a: 'H-1B workers who lose their employment have a 60-day grace period to find a new employer willing to sponsor them, change to another visa status, or depart the United States. If a new employer is found, they must file a new H-1B petition (this transfer is not subject to the annual cap).',
  },
]

export default function H1BPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'H-1B Visa Data' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">H-1B Visa Data & Statistics</h1>
      <p className="text-lg text-gray-600 mb-8">
        The H-1B is America&apos;s primary work visa for skilled professionals. With an annual cap of 85,000 and
        demand far exceeding supply, the H-1B program is one of the most closely watched aspects of U.S. immigration policy.
      </p>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Annual Cap', value: '85,000', sub: '65K + 20K master\'s' },
          { label: 'Active Holders', value: '~780K', sub: 'Workers in the U.S.' },
          { label: 'Top Country', value: 'India', sub: '~73% of approvals' },
          { label: 'Lottery Rate', value: '~14%', sub: 'FY2025 selection' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-sm font-medium mt-1">{s.label}</div>
            <div className="text-xs text-gray-500">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* What is H-1B */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">What Is the H-1B Visa?</h2>
        <div className="text-gray-700 space-y-4">
          <p>
            The H-1B visa is a nonimmigrant work visa that allows U.S. employers to hire foreign professionals
            in &quot;specialty occupations&quot; — jobs that require at least a bachelor&apos;s degree or equivalent in a
            specific field. The visa is valid for an initial period of three years and can be extended to a maximum
            of six years, with further extensions possible for those with pending green card applications.
          </p>
          <p>
            H-1B workers span a wide range of industries, though technology and IT services dominate. Common
            occupations include software engineers, data scientists, financial analysts, engineers, architects,
            physicians, and university professors. The visa requires the employer to pay at least the prevailing
            wage for the occupation in the geographic area.
          </p>
          <p>
            Unlike most nonimmigrant visas, the H-1B allows &quot;dual intent&quot; — holders can pursue permanent
            residence (a green card) while maintaining their temporary status. This makes the H-1B a common
            stepping stone to permanent immigration for skilled workers.
          </p>
        </div>
      </section>

      {/* Annual Cap */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Annual Cap & Lottery</h2>
        <div className="text-gray-700 space-y-4">
          <p>
            Congress set the H-1B annual cap at 65,000 visas, with an additional 20,000 reserved for applicants
            holding a master&apos;s degree or higher from a U.S. institution — bringing the total effective cap to
            85,000 new H-1B visas per fiscal year. Certain employers are exempt from the cap entirely, including
            institutions of higher education, nonprofit research organizations, and government research entities.
          </p>
          <p>
            Demand has consistently outstripped supply. In FY2025, USCIS received over 470,000 registrations for
            the 85,000 available slots, resulting in a selection rate of approximately 14%. This lottery system means
            that even highly qualified applicants with job offers from major employers face uncertainty about
            whether they will be selected.
          </p>
          <p>
            USCIS implemented an electronic registration system in 2020, replacing the previous system where
            employers had to submit full petition packages before learning if they were selected. The registration
            fee is $215 per beneficiary. In 2024, USCIS switched to a beneficiary-centric selection process to
            reduce the impact of multiple registrations for the same individual.
          </p>
        </div>
      </section>

      {/* Top Employers */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Top H-1B Employers</h2>
        <p className="text-gray-700 mb-4">
          The largest H-1B employers include both major tech companies and IT consulting firms. The mix reflects the
          dual nature of the program — directly employed tech workers alongside outsourcing and consulting arrangements.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Employer</th>
                <th className="text-right py-2 font-semibold">Est. Annual Approvals</th>
              </tr>
            </thead>
            <tbody>
              {topEmployers.map((e, i) => (
                <tr key={e.name} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2">{e.name}</td>
                  <td className="py-2 text-right text-gray-600">{e.approvals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Source: USCIS H-1B employer data hub. Figures are approximate and reflect recent fiscal years.
        </p>
      </section>

      {/* Top Countries */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Approvals by Country of Birth</h2>
        <p className="text-gray-700 mb-4">
          India dominates H-1B approvals, accounting for approximately 73% of all H-1B workers. China is a distant second.
          This concentration reflects both the size of India&apos;s IT workforce and the structure of the tech industry&apos;s hiring pipeline.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {topCountries.map(c => (
            <div key={c.country} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <div className="font-bold text-primary">{c.share}</div>
              <div className="text-sm text-gray-600">{c.country}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Approval Trends */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Approval Trends</h2>
        <div className="text-gray-700 space-y-4">
          <p>
            H-1B approval rates have fluctuated with policy changes. Under the Obama administration, approval rates
            exceeded 95%. During the Trump administration, Request for Evidence (RFE) rates spiked and approval rates
            dipped to around 85%, particularly for IT consulting companies. The Biden administration saw rates recover
            to approximately 93-95%.
          </p>
          <p>
            Denial rates are not distributed equally. Large tech companies like Google, Amazon, and Microsoft maintain
            near-100% approval rates, while IT staffing and consulting firms face significantly higher denial and
            RFE rates — reflecting USCIS scrutiny of the employer-employee relationship in third-party placement arrangements.
          </p>
        </div>
      </section>

      {/* Processing Times */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Processing Times</h2>
        <div className="text-gray-700 space-y-4">
          <p>
            Regular H-1B petition processing typically takes 3-6 months, though times can vary significantly by service center
            and time of year. The California Service Center and Vermont Service Center handle most H-1B petitions.
          </p>
          <p>
            <strong>Premium processing</strong> is available for a fee of $2,805, guaranteeing a decision (approval, denial,
            or request for evidence) within 15 business days. Most employers filing time-sensitive petitions opt for premium
            processing. If USCIS fails to meet the 15-day deadline, the fee is refunded.
          </p>
        </div>
      </section>

      {/* H-1B vs Other Work Visas */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">H-1B vs. Other Work Visas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Visa</th>
                <th className="text-left py-2 font-semibold">Purpose</th>
                <th className="text-left py-2 font-semibold">Duration</th>
                <th className="text-left py-2 font-semibold">Cap</th>
              </tr>
            </thead>
            <tbody>
              {[
                { visa: 'H-1B', purpose: 'Specialty occupations', duration: '3+3 years', cap: '85,000/year' },
                { visa: 'L-1', purpose: 'Intracompany transfers', duration: '1-3 + extensions', cap: 'No cap' },
                { visa: 'O-1', purpose: 'Extraordinary ability', duration: '3 years + extensions', cap: 'No cap' },
                { visa: 'TN', purpose: 'USMCA professionals', duration: '3 years, renewable', cap: 'No cap' },
                { visa: 'H-2B', purpose: 'Temporary non-ag workers', duration: '1 year', cap: '66,000/year' },
                { visa: 'E-2', purpose: 'Treaty investors', duration: '2-5 years', cap: 'No cap' },
              ].map((v, i) => (
                <tr key={v.visa} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2 font-medium">{v.visa}</td>
                  <td className="py-2 text-gray-600">{v.purpose}</td>
                  <td className="py-2 text-gray-600">{v.duration}</td>
                  <td className="py-2 text-gray-600">{v.cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl p-5 group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                {item.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold mb-4">Explore More Immigration Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/legal-immigration" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-sm">🗽 Legal Immigration</h3>
            <p className="text-xs text-gray-600 mt-1">Annual admissions, visa categories, and trends.</p>
          </Link>
          <Link href="/green-card" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-sm">💳 Green Card Data</h3>
            <p className="text-xs text-gray-600 mt-1">Employment-based and family-based permanent residence.</p>
          </Link>
          <Link href="/naturalization" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-sm">🇺🇸 Naturalization</h3>
            <p className="text-xs text-gray-600 mt-1">Path from H-1B to citizenship.</p>
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }) }} />
    </div>
  )
}
