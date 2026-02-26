import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions About Immigration Courts',
  description: 'Common questions about U.S. immigration courts, the backlog, asylum, deportation, and how the system works.',
}

const faqs = [
  {
    q: 'What is an immigration court?',
    a: 'Immigration courts are administrative courts within the Department of Justice\'s Executive Office for Immigration Review (EOIR). They decide whether immigrants should be allowed to stay in the U.S. or be deported. There are 68 immigration courts across the country, staffed by about 600 judges.',
  },
  {
    q: 'How many immigration court cases are pending?',
    a: 'As of December 2025, there are 3,377,998 pending cases before U.S. immigration courts. Of these, 2,339,623 involve asylum applications.',
  },
  {
    q: 'Why is the immigration court backlog so large?',
    a: 'The backlog grew because new cases consistently exceeded the system\'s capacity to resolve them. Record border migration from 2021-2024 generated millions of new cases. Despite hiring more judges, the court system cannot keep pace with filings.',
  },
  {
    q: 'How long does an immigration court case take?',
    a: 'Average wait times exceed 4 years in many courts. Some cases take much longer. Detained cases move faster (weeks to months), while non-detained cases can take years to reach a hearing.',
  },
  {
    q: 'Do immigrants have the right to a lawyer?',
    a: 'No. Unlike criminal court, there is no right to a government-provided attorney in immigration proceedings. Immigrants can hire their own lawyer, but most cannot afford one. Only about 27% of immigrants ordered deported in December 2025 had legal representation.',
  },
  {
    q: 'What is the asylum grant rate?',
    a: 'Grant rates vary enormously by judge, court, and nationality. Overall, in December 2025, only 1,455 out of 57,531 completed cases resulted in granted relief (2.5%), of which 701 were asylum grants. However, this includes many non-asylum cases; asylum-specific grant rates among merit hearings are higher.',
  },
  {
    q: 'What happens if someone doesn\'t show up for court?',
    a: 'If an immigrant doesn\'t appear for their hearing, the judge can issue an "in absentia" removal order — ordering deportation without the person present. These orders can be reopened if the person can show they had good cause for not appearing.',
  },
  {
    q: 'Are immigration judges real judges?',
    a: 'Immigration judges are Department of Justice employees appointed by the Attorney General. They are not Article III judges with lifetime tenure — they can be reassigned or removed. This means they lack the independence of federal judges, which some argue affects the fairness of proceedings.',
  },
  {
    q: 'What is a removal order?',
    a: 'A removal order (formerly called a deportation order) is a legal order requiring a person to leave the United States. In FY2026 through December 2025, immigration judges issued removal orders in 78.5% of completed cases.',
  },
  {
    q: 'Where does OpenImmigration get its data?',
    a: 'Our primary source is the EOIR Case Data — a comprehensive dataset published monthly by the Department of Justice. This data was made public through FOIA requests. We supplement it with published statistics from USCIS, TRAC at Syracuse University, and Congressional Research Service reports.',
  },
  {
    q: 'Is OpenImmigration free?',
    a: 'Yes. OpenImmigration is completely free with no paywalls, no registration, and no ads. We believe public data should be publicly accessible.',
  },
  {
    q: 'Does OpenImmigration identify individual immigrants?',
    a: 'No. All data is aggregated. We do not publish or display any personally identifiable information about individual immigrants.',
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-600 mb-10">
        Common questions about U.S. immigration courts, the backlog, asylum, and how the system works.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-heading text-lg font-bold mb-2">{faq.q}</h2>
            <p className="text-gray-700">{faq.a}</p>
          </div>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })
      }} />
    </div>
  )
}
