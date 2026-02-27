import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { glossaryTerms } from '@/lib/glossary-terms'

export const metadata: Metadata = {
  title: 'Immigration Court Glossary — Key Terms & Definitions',
  description: 'Comprehensive glossary of U.S. immigration court terms. Definitions for asylum, removal proceedings, NTA, BIA, EOIR, voluntary departure, in absentia, and 50+ more terms.',
  alternates: { canonical: 'https://www.openimmigration.us/glossary' },
  openGraph: {
    title: 'Immigration Court Glossary — Key Terms & Definitions',
    description: 'Comprehensive glossary of U.S. immigration court terms. Definitions for asylum, removal proceedings, NTA, BIA, EOIR, voluntary departure, in absentia, and 50+ more terms.',
  },
}

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />
      <h1 className="font-heading text-4xl font-bold mb-2">Immigration Court Glossary</h1>
      <p className="text-lg text-gray-600 mb-8">
        {glossaryTerms.length} key terms and definitions for understanding the U.S. immigration court system.
        From asylum to voluntary departure, this glossary covers the language used in immigration proceedings.
      </p>

      {/* Quick jump alphabet */}
      <div className="flex flex-wrap gap-1 mb-8">
        {Array.from(new Set(glossaryTerms.map(t => t.term[0].toUpperCase()))).sort().map(letter => (
          <a key={letter} href={`#letter-${letter}`}
            className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors">
            {letter}
          </a>
        ))}
      </div>

      {/* Terms grouped by letter */}
      {Array.from(new Set(glossaryTerms.map(t => t.term[0].toUpperCase()))).sort().map(letter => {
        const letterTerms = glossaryTerms.filter(t => t.term[0].toUpperCase() === letter)
        return (
          <div key={letter} id={`letter-${letter}`} className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-primary border-b border-gray-200 pb-2 mb-4">{letter}</h2>
            <div className="space-y-4">
              {letterTerms.map(t => (
                <div key={t.term} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-2">
                    <Link href={`/glossary/${t.slug}`} className="hover:text-primary transition-colors">
                      {t.term}
                    </Link>
                    {t.link && (
                      <Link href={t.link} className="ml-2 text-sm font-normal text-primary hover:underline">
                        View data →
                      </Link>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.def}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Related */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/how-immigration-court-works" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🏛️ How Immigration Court Works</h3>
          <p className="text-xs text-gray-600 mt-1">Step-by-step guide to the process.</p>
        </Link>
        <Link href="/faq" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">❓ FAQ</h3>
          <p className="text-xs text-gray-600 mt-1">Common questions answered.</p>
        </Link>
        <Link href="/analysis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📝 Analysis</h3>
          <p className="text-xs text-gray-600 mt-1">14 in-depth reports on the immigration system.</p>
        </Link>
      </div>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'Immigration Court Glossary',
        description: 'Key terms and definitions for understanding the U.S. immigration court system.',
        url: 'https://www.openimmigration.us/glossary',
        hasDefinedTerm: glossaryTerms.slice(0, 10).map(t => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.def,
        })),
      }) }} />
    </div>
  )
}
