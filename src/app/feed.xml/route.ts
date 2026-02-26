const BASE_URL = 'https://www.openimmigration.us'

const articles = [
  { title: 'The Backlog Crisis', slug: 'backlog-crisis', desc: 'How the immigration court backlog grew to nearly 2 million cases — and why it keeps growing.' },
  { title: 'Judge Roulette: How Your Judge Determines Your Fate', slug: 'judge-variation', desc: 'Asylum outcomes vary dramatically by judge. Same law, wildly different results.' },
  { title: 'The Representation Gap', slug: 'representation-gap', desc: 'Only 27% of immigrants have lawyers. How representation changes outcomes.' },
  { title: 'The Geographic Lottery', slug: 'geographic-lottery', desc: 'Your odds of winning asylum depend heavily on where your case is heard.' },
  { title: 'The Deportation Machine', slug: 'deportation-machine', desc: 'How removal orders are issued — and what the data reveals about the process.' },
  { title: 'Asylum Outcomes by Nationality', slug: 'asylum-by-nationality', desc: 'How asylum grant rates differ by country of origin.' },
  { title: 'In Absentia: Deported Without a Hearing', slug: 'in-absentia', desc: 'Over 2 million in absentia orders — when immigrants miss their court dates.' },
  { title: 'Detained vs. Released: Does Custody Affect Outcomes?', slug: 'detained-vs-released', desc: 'How detention status correlates with case outcomes.' },
]

export async function GET() {
  const items = articles.map(a => `
    <item>
      <title>${a.title}</title>
      <link>${BASE_URL}/analysis/${a.slug}</link>
      <description>${a.desc}</description>
      <guid>${BASE_URL}/analysis/${a.slug}</guid>
      <pubDate>${new Date('2026-02-26').toUTCString()}</pubDate>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OpenImmigration — Analysis</title>
    <link>${BASE_URL}</link>
    <description>Data-driven analysis of the U.S. immigration court system from official DOJ records.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml.trim(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
