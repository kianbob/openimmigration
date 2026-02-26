import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.openimmigration.us'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/about', '/faq', '/dashboard', '/backlog', '/asylum', '/courts', '/nationalities',
    '/judges', '/states', '/search', '/representation', '/charges',
    '/deportation', '/how-immigration-court-works',
    '/analysis', '/analysis/backlog-crisis', '/analysis/judge-variation',
    '/analysis/representation-gap', '/analysis/geographic-lottery',
    '/analysis/deportation-machine', '/analysis/asylum-by-nationality',
    '/analysis/in-absentia', '/analysis/detained-vs-released',
    '/amnesty', '/bond', '/children',
  ]

  return staticPages.map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date('2026-02-26'),
    changeFrequency: path === '' ? 'weekly' : 'monthly' as const,
    priority: path === '' ? 1.0 : path.startsWith('/analysis') ? 0.7 : 0.8,
  }))
}
