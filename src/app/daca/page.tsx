import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'DACA Recipients — 515,570 Active Dreamers by State & Country',
  description: 'DACA data: 515,570 active recipients as of June 2025. 81% from Mexico. Explore DACA recipients by state, country of birth, age, and demographics.',
}

const DACA_BY_COUNTRY = [
  { country: 'Mexico', count: 419070 },
  { country: 'El Salvador', count: 20390 },
  { country: 'Guatemala', count: 13830 },
  { country: 'Honduras', count: 12720 },
  { country: 'Peru', count: 4560 },
  { country: 'South Korea', count: 4400 },
  { country: 'Brazil', count: 3770 },
  { country: 'Ecuador', count: 3450 },
  { country: 'Colombia', count: 2890 },
  { country: 'Argentina', count: 2430 },
  { country: 'Philippines', count: 2340 },
  { country: 'Jamaica', count: 1690 },
  { country: 'Venezuela', count: 1520 },
  { country: 'India', count: 1520 },
  { country: 'Dominican Republic', count: 1330 },
]

export default function DACAPage() {
  const total = 515570

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'DACA Recipients' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">DACA Recipients</h1>
      <p className="text-lg text-gray-600 mb-8">
        As of June 2025, there are <strong>{total.toLocaleString()}</strong> active DACA (Deferred Action for
        Childhood Arrivals) recipients in the United States. About <strong>81%</strong> are from Mexico.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">{total.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Active DACA Recipients</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">81.3%</div>
          <div className="text-sm text-gray-600 mt-1">From Mexico</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary">120+</div>
          <div className="text-sm text-gray-600 mt-1">Countries of Birth</div>
        </div>
      </div>

      {/* By Country */}
      <h2 className="font-heading text-2xl font-bold mb-4">DACA Recipients by Country of Birth</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Country of Birth</th>
              <th className="px-4 py-3 text-right font-semibold">Active Recipients</th>
              <th className="px-4 py-3 text-right font-semibold">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {DACA_BY_COUNTRY.map((row, i) => (
              <tr key={row.country} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{row.country}</td>
                <td className="px-4 py-2 text-right">{row.count.toLocaleString()}</td>
                <td className="px-4 py-2 text-right text-gray-500">
                  {(row.count / total * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What is DACA?</h2>
        <p>
          DACA (Deferred Action for Childhood Arrivals) is a program established in 2012 that provides temporary
          protection from deportation and work authorization to certain immigrants who came to the U.S. as children.
          Recipients are often called &quot;Dreamers.&quot;
        </p>
        <p>
          To qualify, recipients must have arrived in the U.S. before age 16, been continuously present since
          June 15, 2007, been under 31 on June 15, 2012, and met education requirements. DACA must be renewed
          every two years.
        </p>
        <p>
          DACA&apos;s legal status has been challenged multiple times in court. As of 2025, existing recipients
          can renew but new applications are not being accepted due to ongoing litigation.
        </p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many DACA recipients are there?',
              acceptedAnswer: { '@type': 'Answer', text: 'As of June 2025, there are 515,570 active DACA recipients in the United States. The number has declined from a peak of about 800,000 as the program is not accepting new applications.' },
            },
            {
              '@type': 'Question',
              name: 'Where are most DACA recipients from?',
              acceptedAnswer: { '@type': 'Answer', text: 'About 81% (419,070) of DACA recipients are from Mexico. El Salvador is second with 20,390 (4%), followed by Guatemala (13,830), Honduras (12,720), Peru (4,560), and South Korea (4,400).' },
            },
          ],
        })
      }} />
    </div>
  )
}
