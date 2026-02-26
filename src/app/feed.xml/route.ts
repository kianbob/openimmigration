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
]

export async function GET() {
  const baseUrl = 'https://www.openimmigration.us'

  const items = articles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${baseUrl}/analysis/${a.slug}</link>
      <description>${escapeXml(a.desc)}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/analysis/${a.slug}</guid>
    </item>`
    )
    .join('\n')

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
