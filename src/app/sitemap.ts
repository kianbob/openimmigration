import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://www.openimmigration.us'

function loadIndex(filename: string) {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', filename), 'utf8'))
  } catch { return [] }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/about', '/faq', '/dashboard', '/backlog', '/asylum', '/courts', '/nationalities',
    '/judges', '/states', '/search', '/representation', '/charges',
    '/deportation', '/how-immigration-court-works',
    '/analysis', '/analysis/backlog-crisis', '/analysis/judge-variation',
    '/analysis/representation-gap', '/analysis/geographic-lottery',
    '/analysis/deportation-machine', '/analysis/asylum-by-nationality',
    '/analysis/in-absentia', '/analysis/detained-vs-released',
    '/amnesty', '/bond', '/children', '/demographics', '/appeals',
    '/border', '/enforcement', '/legal-immigration', '/overstays', '/drug-seizures',
    '/tps', '/wait-times', '/timeline', '/downloads',
    '/uscis', '/daca', '/green-card', '/naturalization',
  ]

  const entries: MetadataRoute.Sitemap = staticPages.map(p => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date('2026-02-26'),
    changeFrequency: p === '' ? 'weekly' : 'monthly' as const,
    priority: p === '' ? 1.0 : p.startsWith('/analysis') ? 0.7 : 0.8,
  }))

  // Court detail pages
  const courtIndex = loadIndex('court-index.json')
  for (const c of courtIndex) {
    if (c.slug) entries.push({ url: `${BASE_URL}/courts/${c.slug}`, lastModified: new Date('2026-02-26'), priority: 0.7 })
  }

  // Nationality detail pages
  const natIndex = loadIndex('nationality-index.json')
  for (const n of natIndex) {
    if (n.slug) entries.push({ url: `${BASE_URL}/nationalities/${n.slug}`, lastModified: new Date('2026-02-26'), priority: 0.7 })
  }

  // Judge detail pages
  const judgeIndex = loadIndex('judge-index.json')
  for (const j of judgeIndex) {
    if (j.slug) entries.push({ url: `${BASE_URL}/judges/${j.slug}`, lastModified: new Date('2026-02-26'), priority: 0.6 })
  }

  return entries
}
