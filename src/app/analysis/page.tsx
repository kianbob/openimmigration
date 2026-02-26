import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Analysis & Reports',
  description: 'In-depth analysis of U.S. immigration court data — backlog trends, judge variation, representation gaps, geographic disparities, and more.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis' },
}

const articles = [
  {
    slug: 'backlog-crisis',
    title: 'The Backlog Crisis',
    desc: 'How the immigration court backlog grew from 200,000 to nearly 2 million cases — and why it keeps growing.',
    category: 'System',
  },
  {
    slug: 'judge-variation',
    title: 'Judge Roulette: How Your Judge Determines Your Fate',
    desc: 'Asylum outcomes vary dramatically by judge. Same law, wildly different results.',
    category: 'Judges',
  },
  {
    slug: 'representation-gap',
    title: 'The Representation Gap',
    desc: 'Immigrants with lawyers win at 5x the rate. But only 26.7% have representation.',
    category: 'Access',
  },
  {
    slug: 'geographic-lottery',
    title: 'The Geographic Lottery',
    desc: 'Your odds of winning asylum depend heavily on where your case is heard.',
    category: 'Courts',
  },
  {
    slug: 'deportation-machine',
    title: 'The Deportation Machine in 2025',
    desc: 'Record case closures, mass deportation orders, and what the numbers actually show.',
    category: 'Trends',
  },
  {
    slug: 'asylum-by-nationality',
    title: 'Asylum Outcomes by Nationality',
    desc: 'How country of origin affects your chances — and what drives the differences.',
    category: 'Asylum',
  },
  {
    slug: 'in-absentia',
    title: 'Ordered Deported Without Showing Up',
    desc: 'In absentia removal orders — how many cases are decided without the immigrant present.',
    category: 'System',
  },
  {
    slug: 'detained-vs-released',
    title: 'Detained vs. Released: How Custody Status Affects Outcomes',
    desc: 'Immigration detention dramatically changes case outcomes and processing times.',
    category: 'Detention',
  },
  {
    slug: 'fentanyl-pipeline',
    title: 'The Fentanyl Pipeline',
    desc: '65,000 lbs of fentanyl seized — but most comes through legal ports of entry, not between them. How drug and immigration policy collide.',
    category: 'Border',
  },
  {
    slug: 'speed-of-justice',
    title: 'The Speed of Justice',
    desc: '12.4 million proceedings analyzed. Average wait: 397 days. Some courts average 2.7 years. Why the system is so slow.',
    category: 'System',
  },
  {
    slug: 'bond-system',
    title: 'The Price of Freedom: Immigration Bond',
    desc: 'Average bond: $11,412. Grant rate: 4.3%. How wealth determines who waits in jail and who waits at home.',
    category: 'Detention',
  },
  {
    slug: 'tps-trap',
    title: 'Permanent Temporary: The TPS Trap',
    desc: 'Over 1 million people hold "temporary" status — some for 20+ years. The TPS paradox, explained.',
    category: 'Legal Status',
  },
  {
    slug: 'children-in-court',
    title: 'Children Facing Judges Alone',
    desc: 'Tens of thousands of unaccompanied children in immigration court. Most without lawyers.',
    category: 'Vulnerable Populations',
  },
  {
    slug: 'border-to-courtroom',
    title: 'From Border to Courtroom',
    desc: '12M encounters → 1.9M pending cases → outcomes. The pipeline from CBP to immigration court to deportation.',
    category: 'System Overview',
  },
]

export default function AnalysisPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Analysis' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Analysis & Reports</h1>
      <p className="text-lg text-gray-600 mb-10">
        In-depth analysis of patterns, trends, and disparities in U.S. immigration court data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(article => (
          <Link key={article.slug} href={`/analysis/${article.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
            <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">
              {article.category}
            </div>
            <h2 className="font-heading text-xl font-bold group-hover:text-primary transition-colors">{article.title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{article.desc}</p>
            <span className="text-primary text-sm font-medium mt-3 inline-block">Read analysis →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
