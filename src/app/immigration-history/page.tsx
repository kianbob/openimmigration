import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'U.S. Immigration History Timeline — 1790 to Present',
  description: 'Comprehensive timeline of every major U.S. immigration law, from the 1790 Naturalization Act to modern-day DACA, Title 42, and mass deportation policies.',
  alternates: { canonical: 'https://www.openimmigration.us/immigration-history' },
}

/* ── data ────────────────────────────────────────────────────────────── */

interface TimelineEvent {
  year: number
  title: string
  description: string
  category: 'law' | 'policy' | 'event' | 'court'
  impact: 'restrictive' | 'expansive' | 'neutral'
  significance: 1 | 2 | 3 // 3 = most significant
}

const timeline: TimelineEvent[] = [
  { year: 1790, title: 'Naturalization Act of 1790', description: 'The first federal law on citizenship. Limited naturalization to "free white persons" of "good moral character" who had lived in the U.S. for two years. Set the racial foundation for immigration policy that would last over 150 years.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 1795, title: 'Naturalization Act of 1795', description: 'Extended the residency requirement from 2 to 5 years and required a declaration of intent 3 years before naturalization.', category: 'law', impact: 'restrictive', significance: 1 },
  { year: 1798, title: 'Alien and Sedition Acts', description: 'Gave the president power to deport "dangerous" aliens and extended naturalization residency to 14 years. The Alien Friends Act and Alien Enemies Act granted sweeping deportation authority — the latter still exists today and was invoked by Trump in 2025.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 1808, title: 'End of the Slave Trade', description: 'Congress banned the importation of enslaved people, as permitted by the Constitution after 1808. Illegal slave trading continued, but this marked the end of legal forced migration.', category: 'law', impact: 'neutral', significance: 2 },
  { year: 1819, title: 'Steerage Act of 1819', description: 'First federal law regulating immigration. Required ship captains to report passengers to customs, creating the first immigration records. Also set minimum space and provision requirements for passenger ships.', category: 'law', impact: 'neutral', significance: 2 },
  { year: 1848, title: 'Treaty of Guadalupe Hidalgo', description: 'Ended the Mexican-American War. Mexico ceded California, Nevada, Utah, Arizona, and parts of Colorado, New Mexico, Kansas, and Wyoming. Over 100,000 Mexicans in ceded territories became U.S. citizens overnight.', category: 'event', impact: 'expansive', significance: 3 },
  { year: 1849, title: 'California Gold Rush Immigration', description: 'The Gold Rush triggered the first large-scale Chinese immigration. Over 25,000 Chinese arrived in California in 1852 alone, providing crucial labor for mining and later railroad construction.', category: 'event', impact: 'expansive', significance: 2 },
  { year: 1854, title: 'Know-Nothing Movement Peaks', description: 'The anti-immigrant, anti-Catholic "Know-Nothing" party (American Party) won 100+ Congressional seats. They opposed Irish and German Catholic immigration, foreshadowing future nativist movements.', category: 'event', impact: 'restrictive', significance: 2 },
  { year: 1862, title: 'Homestead Act', description: 'Offered 160 acres of public land to settlers, including immigrants who declared intent to become citizens. Drove massive European immigration to the Midwest and Great Plains.', category: 'law', impact: 'expansive', significance: 2 },
  { year: 1868, title: '14th Amendment — Birthright Citizenship', description: 'Established that all persons born in the United States are citizens, regardless of their parents\' status. This principle of jus soli (right of the soil) remains the foundation of American citizenship — and a target of restrictionist efforts.', category: 'law', impact: 'expansive', significance: 3 },
  { year: 1870, title: 'Naturalization Act of 1870', description: 'Extended naturalization rights to "aliens of African nativity and to persons of African descent." Asians remained excluded from citizenship.', category: 'law', impact: 'expansive', significance: 2 },
  { year: 1875, title: 'Page Act', description: 'First federal immigration restriction law. Banned immigration of "undesirable" individuals including convicted criminals and Asian women suspected of prostitution. In practice, it blocked most Chinese women from entering.', category: 'law', impact: 'restrictive', significance: 2 },
  { year: 1882, title: 'Chinese Exclusion Act', description: 'The first law to ban immigration based on race and nationality. Prohibited Chinese laborers from entering for 10 years (later made permanent). Not repealed until 1943. Established the principle that the government could exclude entire ethnic groups.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 1882, title: 'Immigration Act of 1882', description: 'Imposed a 50-cent head tax on all immigrants and barred "lunatics," "idiots," and those likely to become "public charges." Established federal control over immigration (previously a state matter).', category: 'law', impact: 'restrictive', significance: 2 },
  { year: 1886, title: 'Statue of Liberty Dedicated', description: '"Give me your tired, your poor, your huddled masses yearning to breathe free." The Statue of Liberty was dedicated in New York Harbor, becoming the enduring symbol of immigrant welcome — even as Congress was tightening restrictions.', category: 'event', impact: 'neutral', significance: 2 },
  { year: 1892, title: 'Ellis Island Opens', description: 'Ellis Island opened as the primary federal immigration processing station. Over its 62-year operation (1892-1954), approximately 12 million immigrants were processed here. About 2% were turned away.', category: 'event', impact: 'neutral', significance: 3 },
  { year: 1907, title: 'Gentlemen\'s Agreement with Japan', description: 'An informal agreement where Japan stopped issuing passports to laborers bound for the U.S. in exchange for the U.S. not formally excluding Japanese immigrants. Ended by the 1924 Immigration Act.', category: 'policy', impact: 'restrictive', significance: 2 },
  { year: 1917, title: 'Immigration Act of 1917', description: 'Created the "Asiatic Barred Zone" excluding immigrants from most of Asia and the Pacific Islands. Also imposed a literacy test for all immigrants over 16, vetoed by three previous presidents before finally passing.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 1921, title: 'Emergency Quota Act', description: 'First numerical limits on immigration. Set quotas at 3% of each nationality\'s population in the 1910 census, effectively favoring Northern and Western Europeans over Southern and Eastern Europeans.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 1924, title: 'Immigration Act of 1924 (Johnson-Reed Act)', description: 'Established the National Origins Quota system, limiting immigration to 2% of each nationality in the 1890 census — deliberately designed to exclude Southern/Eastern Europeans and completely ban Asian immigration. This law shaped U.S. demographics for 40 years.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 1924, title: 'Border Patrol Established', description: 'The U.S. Border Patrol was created to enforce immigration laws along the borders, initially with just 450 officers. Mexican immigration was not numerically restricted, but the Border Patrol began regulating it.', category: 'policy', impact: 'restrictive', significance: 3 },
  { year: 1942, title: 'Bracero Program Begins', description: 'A bilateral agreement with Mexico brought millions of temporary agricultural workers to the U.S. The program ran until 1964 and employed over 4.6 million Mexican workers. It demonstrated that labor demand drives migration regardless of legal frameworks.', category: 'policy', impact: 'expansive', significance: 3 },
  { year: 1943, title: 'Magnuson Act (Chinese Exclusion Repeal)', description: 'Repealed the Chinese Exclusion Act after 61 years, but only allowed 105 Chinese immigrants per year. A wartime gesture to ally China, not a genuine opening.', category: 'law', impact: 'expansive', significance: 2 },
  { year: 1948, title: 'Displaced Persons Act', description: 'First refugee legislation. Admitted 200,000 European refugees displaced by WWII, with a preference for people from Soviet-occupied countries. Set the precedent for refugee admission as a separate category.', category: 'law', impact: 'expansive', significance: 2 },
  { year: 1952, title: 'Immigration and Nationality Act (McCarran-Walter Act)', description: 'Maintained the national origins quota system but eliminated racial restrictions on naturalization for the first time. Asians could finally become citizens. Created the visa preference system still used today.', category: 'law', impact: 'neutral', significance: 3 },
  { year: 1954, title: 'Operation Wetback', description: 'A military-style mass deportation campaign targeting undocumented Mexican immigrants. Over 1 million people were deported or pressured to leave. The operation was marked by civil rights abuses, including deportation of U.S. citizens.', category: 'policy', impact: 'restrictive', significance: 3 },
  { year: 1954, title: 'Ellis Island Closes', description: 'Ellis Island processed its last immigrant and closed as an immigration station after 62 years. Air travel and consular processing had made centralized processing obsolete.', category: 'event', impact: 'neutral', significance: 1 },
  { year: 1965, title: 'Hart-Celler Act (Immigration and Nationality Act of 1965)', description: 'The most transformative immigration law in American history. Abolished the national origins quota system and replaced it with a preference system based on family ties and skills. Unintentionally transformed U.S. demographics by opening immigration to Asia, Latin America, and Africa. Senator Ted Kennedy famously (and incorrectly) promised it would not change the ethnic mix of the country.', category: 'law', impact: 'expansive', significance: 3 },
  { year: 1975, title: 'Fall of Saigon — Vietnamese Refugee Crisis', description: 'The fall of South Vietnam triggered the largest refugee resettlement in U.S. history to that point. Over 130,000 Vietnamese were evacuated immediately, with hundreds of thousands more arriving in subsequent years. Southeast Asian communities transformed cities like Orange County, CA and Houston, TX.', category: 'event', impact: 'expansive', significance: 3 },
  { year: 1980, title: 'Refugee Act of 1980', description: 'Created a systematic process for refugee admission and resettlement. Adopted the UN definition of refugee, established the annual presidential determination of refugee admissions, and created the Office of Refugee Resettlement. Set the refugee cap at 50,000/year.', category: 'law', impact: 'expansive', significance: 3 },
  { year: 1980, title: 'Mariel Boatlift', description: 'Castro opened the port of Mariel and 125,000 Cubans fled to Florida in six months. The episode, which included some criminals and mentally ill individuals, became a political flashpoint and shaped Cuban immigration policy for decades.', category: 'event', impact: 'expansive', significance: 2 },
  { year: 1986, title: 'Immigration Reform and Control Act (IRCA) — "Reagan Amnesty"', description: 'The landmark compromise: amnesty for ~2.7 million undocumented immigrants who had been in the U.S. since 1982, in exchange for employer sanctions and increased border enforcement. The amnesty worked; the enforcement didn\'t. The last time the U.S. attempted comprehensive immigration reform that actually passed.', category: 'law', impact: 'expansive', significance: 3 },
  { year: 1990, title: 'Immigration Act of 1990', description: 'Increased legal immigration by 40%, created the Diversity Visa Lottery (55,000 visas/year), established Temporary Protected Status (TPS), and created the H-1B visa program for skilled workers. The most expansive immigration legislation since 1965.', category: 'law', impact: 'expansive', significance: 3 },
  { year: 1993, title: 'World Trade Center Bombing', description: 'The 1993 bombing by foreign nationals began linking immigration policy to national security. Several conspirators had exploited asylum or visa processes, foreshadowing post-9/11 security-focused restrictions.', category: 'event', impact: 'neutral', significance: 1 },
  { year: 1994, title: 'Operation Gatekeeper', description: 'Massive border enforcement buildup in San Diego sector — walls, sensors, agents. Pushed migration routes into more dangerous desert areas. Border deaths increased dramatically, but crossings continued. The origin of the modern "border wall" concept.', category: 'policy', impact: 'restrictive', significance: 2 },
  { year: 1994, title: 'California Proposition 187', description: 'California voters passed Prop 187 to deny public services to undocumented immigrants. While struck down by courts, it galvanized Latino voter registration and turned California from a swing state to a deep blue state.', category: 'event', impact: 'restrictive', significance: 2 },
  { year: 1996, title: 'IIRIRA (Illegal Immigration Reform and Immigrant Responsibility Act)', description: 'One of the harshest immigration laws ever passed. Created 3- and 10-year bars on reentry after unlawful presence, expanded mandatory detention, limited judicial review of deportation orders, and established the 287(g) program. Made it nearly impossible for undocumented immigrants to "get in line." Still the foundation of modern immigration enforcement.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 1996, title: 'AEDPA (Antiterrorism and Effective Death Penalty Act)', description: 'Expanded grounds for deportation, created "aggravated felony" category that sweeps in minor offenses, and limited judicial review of removal orders. Worked in tandem with IIRIRA to create the modern deportation machine.', category: 'law', impact: 'restrictive', significance: 2 },
  { year: 2001, title: 'September 11 Attacks', description: 'The 9/11 attacks fundamentally transformed immigration from a labor/demographics issue into a national security issue. The 19 hijackers had entered on valid visas, leading to massive security-focused restructuring of immigration agencies.', category: 'event', impact: 'restrictive', significance: 3 },
  { year: 2002, title: 'Homeland Security Act — Creation of DHS', description: 'The INS was abolished and its functions split among three new agencies within the Department of Homeland Security: CBP (border), ICE (enforcement), and USCIS (benefits). Placing immigration under "homeland security" cemented its framing as a security issue.', category: 'law', impact: 'restrictive', significance: 3 },
  { year: 2005, title: 'REAL ID Act', description: 'Required states to verify immigration status for driver\'s licenses, restricted habeas corpus for immigration cases, and waived environmental laws for border wall construction.', category: 'law', impact: 'restrictive', significance: 2 },
  { year: 2006, title: 'Secure Fence Act', description: 'Authorized 700 miles of double-layered fencing along the southern border. Supported by senators Obama, Clinton, Biden, and Schumer — all of whom later opposed Trump\'s border wall.', category: 'law', impact: 'restrictive', significance: 2 },
  { year: 2010, title: 'Arizona SB 1070', description: 'Arizona\'s "show me your papers" law required police to check immigration status during stops. The Supreme Court struck down most provisions but upheld the status-check requirement. Spawned copycat laws in other states.', category: 'law', impact: 'restrictive', significance: 2 },
  { year: 2012, title: 'DACA (Deferred Action for Childhood Arrivals)', description: 'Obama\'s executive action protected ~800,000 undocumented immigrants who arrived as children from deportation and granted work permits. DACA became one of the most popular and legally controversial immigration programs — still in legal limbo over a decade later.', category: 'policy', impact: 'expansive', significance: 3 },
  { year: 2014, title: 'Central American Border Surge', description: 'A surge of unaccompanied minors and families from Central America overwhelmed border processing. Obama called it a "humanitarian situation" and expanded family detention. The surge foreshadowed larger crises to come.', category: 'event', impact: 'neutral', significance: 2 },
  { year: 2017, title: 'Executive Order 13769 — "Travel Ban"', description: 'Trump\'s first executive order banned entry from seven Muslim-majority countries. After multiple court challenges, a modified version (EO 13780) was upheld by the Supreme Court in Trump v. Hawaii (2018). Banned nationals from Iran, Libya, Somalia, Syria, Yemen, North Korea, and Venezuela.', category: 'policy', impact: 'restrictive', significance: 3 },
  { year: 2018, title: 'Zero Tolerance / Family Separation', description: 'The Trump administration\'s "zero tolerance" policy prosecuted all adults crossing the border illegally, resulting in over 5,500 children being separated from their parents. The policy was reversed after bipartisan outrage, but some families remained separated for years.', category: 'policy', impact: 'restrictive', significance: 3 },
  { year: 2019, title: 'Remain in Mexico (MPP)', description: 'The Migrant Protection Protocols forced asylum seekers to wait in Mexico for their U.S. court hearings. Over 70,000 people were sent back to often dangerous Mexican border cities. Asylum grant rates in MPP were around 1%.', category: 'policy', impact: 'restrictive', significance: 2 },
  { year: 2020, title: 'Title 42 Public Health Order', description: 'Using COVID-19 as justification, the CDC ordered the rapid expulsion of migrants at the border without asylum processing. Over 2.8 million Title 42 expulsions occurred between 2020-2023. Critics called it a pretext to bypass asylum law.', category: 'policy', impact: 'restrictive', significance: 3 },
  { year: 2021, title: 'Afghan Refugee Crisis', description: 'The withdrawal from Afghanistan brought ~90,000 Afghan refugees to the U.S. under Operation Allies Welcome. Most arrived through humanitarian parole, creating a large population in legal limbo without a clear path to permanent status.', category: 'event', impact: 'expansive', significance: 2 },
  { year: 2022, title: 'Uniting for Ukraine Program', description: 'Biden created a humanitarian parole program for Ukrainian refugees fleeing Russia\'s invasion. Over 100,000 Ukrainians arrived under the program, which required U.S.-based sponsors.', category: 'policy', impact: 'expansive', significance: 2 },
  { year: 2022, title: 'CHNV Parole Programs', description: 'Biden expanded humanitarian parole to nationals of Cuba, Haiti, Nicaragua, and Venezuela (CHNV). Up to 30,000/month could enter legally with sponsors. These programs significantly reduced unauthorized border crossings from these countries.', category: 'policy', impact: 'expansive', significance: 2 },
  { year: 2023, title: 'End of Title 42', description: 'Title 42 officially ended on May 11, 2023, replaced by new asylum restrictions requiring migrants to apply through the CBP One app or seek asylum in transit countries first.', category: 'policy', impact: 'neutral', significance: 2 },
  { year: 2024, title: 'Biden Asylum Executive Order', description: 'Biden issued an executive order restricting asylum when border crossings exceeded 2,500/day. Effectively shut down asylum processing at the border — a more restrictive posture than Trump\'s first term. Border crossings dropped significantly.', category: 'policy', impact: 'restrictive', significance: 2 },
  { year: 2025, title: 'Trump Second Term — Mass Deportation Initiative', description: 'Trump\'s second term launched unprecedented enforcement: ICE raids in sensitive locations (schools, churches), invocation of the Alien Enemies Act (from 1798), birthright citizenship challenge, termination of CHNV parole programs, suspended refugee admissions, and expanded expedited removal nationwide. The most aggressive immigration enforcement posture in modern history.', category: 'policy', impact: 'restrictive', significance: 3 },
]

/* ── helpers ──────────────────────────────────────────────────────────── */

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, string> = {
    law: 'bg-blue-100 text-blue-700',
    policy: 'bg-purple-100 text-purple-700',
    event: 'bg-gray-100 text-gray-700',
    court: 'bg-yellow-100 text-yellow-700',
  }
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[category]}`}>{category}</span>
}

function ImpactIndicator({ impact }: { impact: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    restrictive: { label: '🔒 Restrictive', cls: 'text-red-600' },
    expansive: { label: '🔓 Expansive', cls: 'text-green-600' },
    neutral: { label: '⚖️ Neutral', cls: 'text-gray-600' },
  }
  const { label, cls } = map[impact]
  return <span className={`text-xs font-medium ${cls}`}>{label}</span>
}

/* ── page ─────────────────────────────────────────────────────────────── */

export default function ImmigrationHistoryPage() {
  const restrictiveCount = timeline.filter(e => e.impact === 'restrictive').length
  const expansiveCount = timeline.filter(e => e.impact === 'expansive').length

  const eras = [
    { name: 'Open Door Era', years: '1790–1875', description: 'Minimal federal regulation. States managed immigration. Nearly open borders for Europeans.' },
    { name: 'Restriction Era', years: '1875–1943', description: 'Chinese Exclusion, national origins quotas, Asiatic Barred Zone. Immigration as racial engineering.' },
    { name: 'Reform Era', years: '1943–1986', description: 'Gradual opening: end of racial exclusions, Hart-Celler Act, refugee programs, Reagan amnesty.' },
    { name: 'Enforcement Era', years: '1986–present', description: 'IIRIRA, post-9/11 security state, DHS, border militarization, mass detention, DACA, Title 42.' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'U.S. Immigration History Timeline — 1790 to Present',
    description: 'Every major U.S. immigration law and policy from the founding to today.',
    url: 'https://www.openimmigration.us/immigration-history',
    publisher: { '@type': 'Organization', name: 'OpenImmigration' },
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Immigration History' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Immigration History Timeline</h1>
      <p className="text-lg text-gray-600 mb-2">
        From the 1790 Naturalization Act to Trump&apos;s 2025 mass deportation initiative — a comprehensive
        timeline of every major U.S. immigration law, policy, and turning point across 235 years.
      </p>
      <p className="text-gray-600 mb-8">
        This timeline contains <strong>{timeline.length} entries</strong>: {restrictiveCount} restrictive,
        {' '}{expansiveCount} expansive, and {timeline.length - restrictiveCount - expansiveCount} neutral.
        The history of American immigration is a constant tension between welcome and exclusion.
      </p>

      {/* ── Era Overview ────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Four Eras of Immigration Policy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {eras.map((era, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-heading font-bold mb-1">{era.name}</h3>
            <p className="text-xs text-primary font-medium mb-2">{era.years}</p>
            <p className="text-sm text-gray-600">{era.description}</p>
          </div>
        ))}
      </div>

      {/* ── Editorial ───────────────────────────────────────────────── */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
        <h2 className="font-heading text-xl font-bold mb-2">📊 The Arc of Immigration History</h2>
        <p className="text-gray-700 mb-3">
          Reading the full timeline reveals an uncomfortable pattern: nearly every restrictive immigration law
          in American history was driven by racial animus, economic anxiety, or national security panic — and
          was later recognized as unjust. The Chinese Exclusion Act, national origins quotas, Japanese internment,
          Operation Wetback — all are now viewed as shameful episodes.
        </p>
        <p className="text-gray-700">
          The libertarian question: if history consistently judges immigration restrictions as wrong in hindsight,
          what will future generations think of today&apos;s policies? The 3-and-10-year bars of IIRIRA, family
          separation, mass detention, and the Title 42 asylum shutdown may one day join the Chinese Exclusion Act
          in the hall of national regrets.
        </p>
      </div>

      {/* ── Timeline ────────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-6">Complete Timeline</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {timeline.map((event, i) => (
            <div key={i} className="relative pl-12 md:pl-20">
              {/* Dot */}
              <div className={`absolute left-2.5 md:left-6.5 w-3 h-3 rounded-full border-2 border-white ${
                event.impact === 'restrictive' ? 'bg-red-500' :
                event.impact === 'expansive' ? 'bg-green-500' : 'bg-gray-400'
              }`} style={{ top: '1.25rem' }} />

              <div className={`bg-white border rounded-xl p-5 ${
                event.significance === 3 ? 'border-primary/30 shadow-sm' : 'border-gray-200'
              }`}>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-lg font-bold text-primary">{event.year}</span>
                  <CategoryBadge category={event.category} />
                  <ImpactIndicator impact={event.impact} />
                  {event.significance === 3 && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">⭐ Major</span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Key Statistics ───────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4 mt-12">Immigration by the Numbers (Historical)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">12M</div>
          <div className="text-sm text-gray-600">Immigrants through Ellis Island (1892–1954)</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">2.7M</div>
          <div className="text-sm text-gray-600">Legalized under 1986 Reagan Amnesty</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">46.2M</div>
          <div className="text-sm text-gray-600">Foreign-born U.S. residents (2024)</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">800K</div>
          <div className="text-sm text-gray-600">DACA recipients at peak</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">2.8M</div>
          <div className="text-sm text-gray-600">Title 42 expulsions (2020–2023)</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-primary">3.5M+</div>
          <div className="text-sm text-gray-600">Immigration court backlog (2025)</div>
        </div>
      </div>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/immigration-by-president" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Immigration by President</h3>
          <p className="text-sm text-gray-600">Compare enforcement across administrations.</p>
        </Link>
        <Link href="/deportation" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Deportation Statistics</h3>
          <p className="text-sm text-gray-600">Modern deportation data and trends.</p>
        </Link>
        <Link href="/daca" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">DACA Data</h3>
          <p className="text-sm text-gray-600">Deferred Action for Childhood Arrivals statistics.</p>
        </Link>
        <Link href="/amnesty" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Amnesty & Legalization</h3>
          <p className="text-sm text-gray-600">History and data on legalization programs.</p>
        </Link>
        <Link href="/how-many-immigrants-in-the-us" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">How Many Immigrants?</h3>
          <p className="text-sm text-gray-600">Current foreign-born population breakdown.</p>
        </Link>
        <Link href="/visa-types" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Visa Types Guide</h3>
          <p className="text-sm text-gray-600">Modern visa categories and how they evolved.</p>
        </Link>
      </div>
    </div>
  )
}
