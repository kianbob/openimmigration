import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { glossaryTerms, getTermBySlug, getRelatedTerms } from '@/lib/glossary-terms'

const BASE_URL = 'https://www.openimmigration.us'

export function generateStaticParams() {
  return glossaryTerms.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const term = getTermBySlug(slug)
  if (!term) return {}
  return {
    title: `${term.term} — Immigration Court Glossary Definition`,
    description: term.def,
    alternates: { canonical: `${BASE_URL}/glossary/${term.slug}` },
    openGraph: {
      title: `${term.term} — Immigration Court Glossary`,
      description: term.def,
      url: `${BASE_URL}/glossary/${term.slug}`,
    },
  }
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const term = getTermBySlug(slug)
  if (!term) notFound()

  const related = getRelatedTerms(term.relatedTerms)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Glossary', href: '/glossary' },
        { label: term.term },
      ]} />

      <h1 className="font-heading text-4xl font-bold mb-4">{term.term}</h1>

      {term.link && (
        <Link href={term.link} className="inline-flex items-center gap-1 text-primary font-medium hover:underline mb-6">
          📊 Explore {term.term.split('(')[0].trim()} data →
        </Link>
      )}

      {/* Main definition */}
      <div className="prose prose-lg max-w-none mt-6 mb-10">
        {term.longDef.split('\n\n').map((para, i) => (
          <p key={i} className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
        ))}
      </div>

      {/* Related Terms */}
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold mb-4">Related Terms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map(r => (
              <Link key={r.slug} href={`/glossary/${r.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all">
                <h3 className="font-bold text-sm mb-1">{r.term}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{r.def}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Data */}
      {term.relatedData.length > 0 && (
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold mb-4">Related Data</h2>
          <div className="flex flex-wrap gap-3">
            {term.relatedData.map(d => (
              <Link key={d.href} href={d.href}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                {d.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to glossary */}
      <div className="border-t border-gray-200 pt-6">
        <Link href="/glossary" className="text-primary font-medium hover:underline">
          ← Back to full glossary ({glossaryTerms.length} terms)
        </Link>
      </div>

      {/* DefinedTerm structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: term.term,
        description: term.def,
        url: `${BASE_URL}/glossary/${term.slug}`,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          name: 'Immigration Court Glossary',
          url: `${BASE_URL}/glossary`,
        },
      }) }} />
    </div>
  )
}
