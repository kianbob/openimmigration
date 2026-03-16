import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Interactive Tools',
  description: 'Free immigration tools — visa finder, wait time calculator, cost estimator, judge lookup, and country comparison. Navigate the U.S. immigration system with data.',
  alternates: { canonical: 'https://www.openimmigration.us/tools' },
}

const tools = [
  {
    href: '/tools/visa-finder',
    title: 'Visa Finder',
    desc: 'Answer a few questions to find which U.S. visa category fits your situation — family, employment, student, investor, or humanitarian.',
    icon: '🔍',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    href: '/tools/wait-time-calculator',
    title: 'Wait Time Calculator',
    desc: 'Enter your visa category and country of birth to estimate how long you\'ll wait based on current visa bulletin data.',
    icon: '⏳',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    href: '/tools/immigration-cost-calculator',
    title: 'Immigration Cost Calculator',
    desc: 'Get a full cost breakdown — filing fees, legal fees, medical exams, biometrics, and more — for any immigration pathway.',
    icon: '💰',
    color: 'bg-green-50 border-green-200',
  },
  {
    href: '/tools/judge-lookup',
    title: 'Judge Lookup',
    desc: 'Search immigration judges by name or court. See their grant rate, denial rate, and total cases decided.',
    icon: '⚖️',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    href: '/tools/compare-countries',
    title: 'Compare Countries',
    desc: 'Compare immigration statistics between two countries — total cases, visa types, asylum rates, and deportation data.',
    icon: '🌍',
    color: 'bg-teal-50 border-teal-200',
  },
]

export default function ToolsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Tools' }]} />

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Interactive Tools</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Free tools to help you navigate the U.S. immigration system. Built on real government data — no account required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`${tool.color} border rounded-2xl p-8 hover:shadow-lg transition-all group`}
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h2 className="font-heading text-2xl font-bold group-hover:text-primary transition-colors">
                {tool.title}
              </h2>
              <p className="text-gray-600 mt-2">{tool.desc}</p>
              <span className="text-primary text-sm font-semibold mt-4 inline-block">
                Use tool →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="font-heading text-2xl font-bold mb-3">Looking for raw data?</h2>
          <p className="text-gray-600 mb-4">
            All our datasets are free to download — JSON files ready for researchers, journalists, and developers.
          </p>
          <Link href="/downloads" className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
            Download Data →
          </Link>
        </div>
      </section>
    </>
  )
}
