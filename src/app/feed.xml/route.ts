const articles = [
  {
    slug: 'backlog-crisis',
    title: 'The Backlog Crisis',
    desc: 'How the immigration court backlog grew from 200,000 to over 1.9 million cases.',
    date: '2026-02-01',
  },
  {
    slug: 'judge-variation',
    title: 'Judge Roulette: How Your Judge Determines Your Fate',
    desc: 'Asylum outcomes vary dramatically by judge. Same law, wildly different results.',
    date: '2026-02-01',
  },
  {
    slug: 'representation-gap',
    title: 'The Representation Gap',
    desc: 'Immigrants with lawyers win at 5x the rate. But only 26.7% have representation.',
    date: '2026-02-01',
  },
  {
    slug: 'geographic-lottery',
    title: 'The Geographic Lottery',
    desc: 'Your odds of winning asylum depend heavily on where your case is heard.',
    date: '2026-02-01',
  },
  {
    slug: 'deportation-machine',
    title: 'The Deportation Machine in 2025',
    desc: 'Record case closures, mass deportation orders, and what the numbers actually show.',
    date: '2026-02-01',
  },
  {
    slug: 'asylum-by-nationality',
    title: 'Asylum Outcomes by Nationality',
    desc: 'How country of origin affects your chances — and what drives the differences.',
    date: '2026-02-01',
  },
  {
    slug: 'in-absentia',
    title: 'Ordered Deported Without Showing Up',
    desc: 'In absentia removal orders — how many cases are decided without the immigrant present.',
    date: '2026-02-01',
  },
  {
    slug: 'detained-vs-released',
    title: 'Detained vs. Released: How Custody Status Affects Outcomes',
    desc: 'Immigration detention dramatically changes case outcomes and processing times.',
    date: '2026-02-01',
  },
  {
    slug: 'fentanyl-pipeline',
    title: 'The Fentanyl Pipeline — Drugs, Borders, and Immigration Policy',
    desc: '65,000 lbs of fentanyl seized. Most comes through legal ports of entry, not between them.',
    date: '2026-02-26',
  },
  {
    slug: 'speed-of-justice',
    title: 'The Speed of Justice — Why Immigration Cases Take Years',
    desc: '12.4M proceedings analyzed. Average wait: 397 days. Some courts average 2.7 years.',
    date: '2026-02-26',
  },
  {
    slug: 'bond-system',
    title: 'The Price of Freedom — Immigration Bond and Detention',
    desc: '$11,412 average bond. 4.3% grant rate. 1.59M bond hearings analyzed.',
    date: '2026-02-26',
  },
  {
    slug: 'tps-trap',
    title: 'Permanent Temporary — 1 Million People Trapped in TPS Limbo',
    desc: 'Over 1 million TPS holders in permanent temporary status. Some for 20+ years.',
    date: '2026-02-26',
  },
  {
    slug: 'children-in-court',
    title: 'Children Facing Judges Alone — Minors in Immigration Court',
    desc: 'Tens of thousands of unaccompanied children face immigration judges without lawyers.',
    date: '2026-02-26',
  },
  {
    slug: 'border-to-courtroom',
    title: 'From Border to Courtroom — 12M Encounters to 1.9M Cases',
    desc: 'The pipeline from border encounter to court to deportation.',
    date: '2026-02-26',
  },
]

const pages = [
  { path: '/border', title: 'Border Encounters — 12M+ CBP Encounters FY2020-2026', desc: 'Comprehensive CBP encounter data by year, nationality, demographics, and border sector.', date: '2026-02-26' },
  { path: '/enforcement', title: 'ICE Enforcement — Removals, Returns & Arrests', desc: 'ICE deportation and interior enforcement data FY2014-2026.', date: '2026-02-26' },
  { path: '/legal-immigration', title: 'Legal Immigration — Green Cards, Refugees & Naturalization', desc: 'Legal immigration pathways: ~1M green cards/year, refugee admissions, naturalization trends.', date: '2026-02-26' },
  { path: '/overstays', title: 'Visa Overstays — 478K+ Overstays in FY2024', desc: 'DHS visa overstay data by year and country, estimated unauthorized population.', date: '2026-02-26' },
  { path: '/drug-seizures', title: 'Drug Seizures at the U.S. Border — 65,000 lbs of Fentanyl', desc: 'CBP drug seizure data FY2023-2026. Fentanyl, meth, cocaine, heroin by year and location.', date: '2026-02-26' },
  { path: '/tps', title: 'Temporary Protected Status — 1M+ Pending Applications', desc: 'TPS data from 17 countries: Venezuela, Haiti, Ukraine lead with 877K pending combined.', date: '2026-02-26' },
  { path: '/wait-times', title: 'Immigration Court Wait Times — How Long Cases Take', desc: 'Average case duration is 397 days. Wait times by court, year, and distribution.', date: '2026-02-26' },
  { path: '/appeals', title: 'Appeals to the Board of Immigration Appeals', desc: '1.46M BIA appeals analyzed — decisions, filers, trends.', date: '2026-02-26' },
  { path: '/timeline', title: 'U.S. Immigration Timeline — 1790 to 2025', desc: 'Key laws and events in U.S. immigration history from the Naturalization Act to today.', date: '2026-02-26' },
  { path: '/downloads', title: 'Download Immigration Data — Free JSON Datasets', desc: '18 free JSON datasets: courts, judges, encounters, drugs, wait times, and more.', date: '2026-02-26' },
  { path: '/compare', title: 'Compare Immigration Courts & Judges — Side-by-Side', desc: 'Interactive tool to compare up to 5 courts or judges side by side on grant rates, caseloads, and outcomes.', date: '2026-02-26' },
  { path: '/statistics', title: 'U.S. Immigration Statistics 2026 — Key Numbers & Facts', desc: 'Comprehensive statistics from courts, borders, enforcement, and legal immigration in one place.', date: '2026-02-26' },
  { path: '/glossary', title: 'Immigration Court Glossary — 34 Key Terms Defined', desc: 'Definitions for asylum, BIA, EOIR, removal proceedings, TPS, and 28 more immigration terms.', date: '2026-02-26' },
]

export async function GET() {
  const baseUrl = 'https://www.openimmigration.us'

  const articleItems = articles.map(
    (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${baseUrl}/analysis/${a.slug}</link>
      <description>${escapeXml(a.desc)}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/analysis/${a.slug}</guid>
    </item>`
  )

  const pageItems = pages.map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${baseUrl}${p.path}</link>
      <description>${escapeXml(p.desc)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid>${baseUrl}${p.path}</guid>
    </item>`
  )

  const items = [...pageItems, ...articleItems].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OpenImmigration — Analysis &amp; Reports</title>
    <link>${baseUrl}</link>
    <description>In-depth analysis of U.S. immigration court data — backlog trends, judge variation, representation gaps, and more.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
