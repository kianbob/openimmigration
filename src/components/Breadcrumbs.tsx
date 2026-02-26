import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.openimmigration.us${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
        {items.map((item, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-1">›</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
