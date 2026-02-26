import Link from 'next/link'

const ALL_ARTICLES = [
  { slug: 'backlog-crisis', title: 'The Backlog Crisis', desc: 'How 1.9M cases piled up.' },
  { slug: 'judge-variation', title: 'Judge Roulette', desc: 'Same law, wildly different outcomes.' },
  { slug: 'representation-gap', title: 'Representation Gap', desc: 'Only 26.7% had lawyers.' },
  { slug: 'geographic-lottery', title: 'Geographic Lottery', desc: 'Court location determines fate.' },
  { slug: 'deportation-machine', title: 'The Deportation Machine', desc: '628K removal orders and counting.' },
  { slug: 'asylum-by-nationality', title: 'Asylum by Nationality', desc: 'Country of origin shapes outcomes.' },
  { slug: 'in-absentia', title: 'In Absentia Orders', desc: '2.1M deported without showing up.' },
  { slug: 'detained-vs-released', title: 'Detained vs. Released', desc: 'Custody changes everything.' },
  { slug: 'fentanyl-pipeline', title: 'The Fentanyl Pipeline', desc: 'Drugs come through ports of entry.' },
  { slug: 'speed-of-justice', title: 'The Speed of Justice', desc: 'Why cases take years.' },
  { slug: 'bond-system', title: 'The Price of Freedom', desc: '$11K bond, 4.3% grant rate.' },
  { slug: 'tps-trap', title: 'Permanent Temporary', desc: '1M+ trapped in TPS limbo.' },
  { slug: 'children-in-court', title: 'Children Facing Judges', desc: 'Kids in court without lawyers.' },
  { slug: 'border-to-courtroom', title: 'Border to Courtroom', desc: '12M encounters → 1.9M cases.' },
]

export default function RelatedAnalysis({ current, count = 3 }: { current: string; count?: number }) {
  const related = ALL_ARTICLES.filter(a => a.slug !== current).slice(0, count)
  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="font-heading text-xl font-bold mb-4">More Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map(a => (
          <Link key={a.slug} href={`/analysis/${a.slug}`}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-sm">{a.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
