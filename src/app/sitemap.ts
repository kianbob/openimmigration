import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { glossaryTerms } from '@/lib/glossary-terms'

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
    '/analysis/fentanyl-pipeline', '/analysis/speed-of-justice', '/analysis/bond-system',
    '/analysis/tps-trap', '/analysis/children-in-court', '/analysis/border-to-courtroom',
    '/analysis/enforcement-trends-2026',
    '/uscis', '/daca', '/green-card', '/naturalization',
    '/compare', '/compare/courts', '/glossary', '/statistics', '/h1b',
    '/rankings/toughest-courts', '/rankings/toughest-judges',
    '/tools', '/tools/visa-finder', '/tools/wait-time-calculator',
    '/tools/immigration-cost-calculator', '/tools/judge-lookup', '/tools/compare-countries',
    '/rankings/fastest-courts', '/rankings/most-backlogged',
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

  // State detail pages
  const US_CODES = new Set(['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC','PR','GU','VI','AS','MP'])
  const statesData = loadIndex('states.json')
  for (const s of statesData) {
    if (US_CODES.has(s.code)) {
      const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      entries.push({ url: `${BASE_URL}/states/${slug}`, lastModified: new Date('2026-02-26'), priority: 0.7 })
    }
  }

  // Glossary term pages
  for (const term of glossaryTerms) {
    entries.push({ url: `${BASE_URL}/glossary/${term.slug}`, lastModified: new Date('2026-02-26'), priority: 0.6 })
  }

  return entries
}
