import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

function loadData(filename: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
}

export const metadata: Metadata = {
  title: 'Immigration Bond Hearings — 74% Denied, Average $7,500+',
  description: 'Immigration bond data — 15,540 hearings in Q1 FY2026, only 26% granted. Bond amounts average $7,500+. How bond decisions shape case outcomes.',
}

export default function BondPage() {
  const stats = loadData('stats.json')
  const custody = loadData('custody.json')
  const detained = custody.find((c: { code: string }) => c.code === 'D')
  const released = custody.find((c: { code: string }) => c.code === 'R')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Bond Hearings' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Bond Hearings</h1>
      <p className="text-lg text-gray-600 mb-8">
        When immigrants are detained, a bond hearing determines whether they can be released while their
        case proceeds. In Q1 FY2026, judges held 15,540 bond hearings — and denied 74% of them.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">15,540</div>
          <div className="text-sm text-gray-600 mt-1">Bond Hearings (Q1)</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">4,062</div>
          <div className="text-sm text-gray-600 mt-1">Bond Granted (26%)</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">74%</div>
          <div className="text-sm text-gray-600 mt-1">Bond Denied</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-amber-700">{detained?.count.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Total Detained Cases</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">How Bond Hearings Work</h2>
        <p>
          Immigration bond hearings are separate from the main removal proceeding. They answer one question:
          should this person be released from detention while their case is pending?
        </p>
        <p>
          The judge considers two factors: whether the person is a flight risk and whether they pose a
          danger to the community. The minimum bond is $1,500, but judges frequently set bonds at
          $5,000, $10,000, $15,000, or higher. The average bond amount exceeds $7,500.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Bond Matters So Much</h2>
        <p>
          Bond isn&apos;t just about getting out of jail. It fundamentally changes case outcomes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Attorney access:</strong> Released immigrants can meet with lawyers, attend consultations, and build their cases. Detained immigrants have phone access for minutes a day.</li>
          <li><strong>Evidence gathering:</strong> You can&apos;t get affidavits, country condition reports, or medical records from inside a detention facility.</li>
          <li><strong>Family support:</strong> Released immigrants can maintain family connections, continue working, and avoid the psychological toll of indefinite detention.</li>
          <li><strong>Coercion reduction:</strong> Detained immigrants face constant pressure to accept voluntary departure rather than fight their cases.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Mandatory Detention</h2>
        <p>
          Not everyone gets a bond hearing. Certain categories trigger <strong>mandatory detention</strong> with
          no possibility of bond:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Certain criminal convictions (aggravated felonies, drug offenses, multiple convictions)</li>
          <li>Terrorism-related charges</li>
          <li>Arriving aliens at ports of entry (unless they pass a credible fear interview)</li>
          <li>People with prior removal orders who reentered illegally</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Custody Pipeline</h2>
        <p>
          Of all cases in our data, {detained?.count.toLocaleString()} involved detained individuals and
          {' '}{released?.count.toLocaleString()} were released from detention (through bond, parole, or court
          orders). Those who are released join the non-detained docket and typically have better outcomes —
          not because their cases are stronger, but because they have more resources to fight them.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">The $7,500 Barrier</h3>
              <p className="text-sm text-amber-800">
                For an immigrant earning minimum wage (or nothing, while detained), a $7,500 bond might as well
                be $7 million. Many families scrape together money from extended networks. Some use bond fund
                organizations. Many simply can&apos;t pay — and remain detained for the duration of proceedings
                that can last months or years.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/analysis/detained-vs-released" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🔒 Detained vs. Released</h3>
          <p className="text-sm text-gray-600 mt-1">How custody status shapes outcomes for {(detained?.count / 1e6).toFixed(1)}M detained cases.</p>
        </Link>
        <Link href="/analysis/representation-gap" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">👔 Representation Gap</h3>
          <p className="text-sm text-gray-600 mt-1">Detained immigrants have the lowest attorney access.</p>
        </Link>
      </div>
    </div>
  )
}
