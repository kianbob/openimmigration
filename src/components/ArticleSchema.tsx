export default function ArticleSchema({ title, description, url, datePublished, dateModified }: {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        datePublished: datePublished || '2026-02-26',
        dateModified: dateModified || '2026-02-26',
        author: { '@type': 'Organization', name: 'OpenImmigration', url: 'https://www.openimmigration.us' },
        publisher: { '@type': 'Organization', name: 'TheDataProject.ai', url: 'https://thedataproject.ai' },
      })
    }} />
  )
}
