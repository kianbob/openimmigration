import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Asylum Outcomes by Nationality',
  description: 'How country of origin affects asylum case outcomes in U.S. immigration courts. Grant rates, denial rates, and what drives the differences.',
}

export default function AsylumByNationalityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'Asylum by Nationality' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">Asylum</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Asylum Outcomes by Nationality</h1>
      <p className="text-lg text-gray-600 mb-8">
        Country of origin significantly affects asylum outcomes. Applicants from some countries are granted asylum
        at rates above 50%, while others are denied at 90%+. Here&apos;s what the data shows and why.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">The Pattern</h2>
        <p>
          Asylum grant rates vary enormously by nationality. Historically, applicants from countries with
          well-documented human rights crises — like China, Ethiopia, and Eritrea — have higher grant rates.
          Applicants from Mexico and Central America face much lower rates, despite significant violence in
          those countries.
        </p>
        <p>
          This pattern reflects several factors: the types of persecution claims, the quality of country
          condition evidence available, judicial attitudes toward different types of claims, and the
          evolving legal standards for what qualifies as persecution.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Some Countries Have Higher Grant Rates</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Government persecution is clearer:</strong> Claims against repressive governments (China, Eritrea)
          fit the classic asylum framework better than claims about gang violence or domestic abuse</li>
          <li><strong>Country condition evidence:</strong> Some countries have extensive State Department and human rights
          documentation that supports asylum claims</li>
          <li><strong>Legal precedent:</strong> Certain types of claims from certain countries have established legal precedent
          that makes them easier to win</li>
          <li><strong>Representation rates:</strong> Applicants from some nationalities are more likely to find pro bono legal help</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Central American Challenge</h2>
        <p>
          Mexico, Guatemala, Honduras, and El Salvador collectively account for the largest share of immigration
          court cases. These countries also tend to have lower asylum grant rates, partly because many claims
          involve gang violence and domestic abuse — categories where the legal standards have been contentious
          and shifting.
        </p>
        <p>
          In FY2026, Mexico leads all nationalities in deportation orders (33,830), followed by Guatemala
          (19,169), Honduras (18,746), Venezuela (14,679), and Colombia (9,328).
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Venezuela Surge</h2>
        <p>
          Venezuela has emerged as a major source of asylum cases, reflecting the political and economic crisis
          that has driven millions to flee. Venezuelan cases are still relatively new in the system, and
          outcomes are still developing as courts work through the backlog.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ Asylum grant rates can vary by 50+ percentage points between nationalities</li>
                <li>→ Country of origin interacts with judge assignment — some judges are more receptive to certain country claims</li>
                <li>→ Legal standards for gang-based and domestic violence claims have shifted across administrations</li>
                <li>→ Representation rates also vary by nationality, compounding the differences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
