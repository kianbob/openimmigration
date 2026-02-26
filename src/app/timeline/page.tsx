import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

const events = [
  { year: 1790, title: 'Naturalization Act', desc: 'First U.S. immigration law — limits citizenship to "free white persons" of "good moral character" who have lived in the U.S. for two years.' },
  { year: 1808, title: 'Slave Trade Banned', desc: 'Congress bans the importation of enslaved people, as allowed by the Constitution after 20 years.' },
  { year: 1848, title: 'Treaty of Guadalupe Hidalgo', desc: 'Mexico cedes half its territory. ~80,000 Mexicans become U.S. residents overnight.' },
  { year: 1862, title: 'Homestead Act', desc: 'Offers free land to settlers, drawing millions of European immigrants westward.' },
  { year: 1875, title: 'Page Act', desc: 'First restrictive immigration law — bans "undesirable" immigrants including forced laborers and women suspected of prostitution from Asia.' },
  { year: 1882, title: 'Chinese Exclusion Act', desc: 'First law to ban immigration by nationality. Bars Chinese laborers for 10 years (renewed until 1943).' },
  { year: 1892, title: 'Ellis Island Opens', desc: 'New York immigration station processes 12 million immigrants over 62 years.' },
  { year: 1907, title: 'Peak Immigration Year', desc: '1.3 million immigrants arrive in a single year — a record that stands for decades.' },
  { year: 1917, title: 'Immigration Act of 1917', desc: 'Creates "Asiatic Barred Zone" banning immigration from most of Asia. Adds literacy test requirement.' },
  { year: 1921, title: 'Emergency Quota Act', desc: 'First numerical limits on immigration. Caps arrivals at 3% of each nationality present in 1910 census.' },
  { year: 1924, title: 'National Origins Act', desc: 'Tightens quotas to 2% based on 1890 census — explicitly designed to favor Northern Europeans over Southern/Eastern Europeans.' },
  { year: 1942, title: 'Bracero Program', desc: 'U.S.-Mexico agreement brings millions of temporary agricultural workers to the U.S. (runs until 1964).' },
  { year: 1943, title: 'Chinese Exclusion Repealed', desc: 'Magnuson Act repeals the Chinese Exclusion Act, but sets a tiny quota of 105 Chinese immigrants per year.' },
  { year: 1948, title: 'Displaced Persons Act', desc: 'First refugee legislation. Admits 400,000 Europeans displaced by WWII.' },
  { year: 1952, title: 'Immigration and Nationality Act', desc: 'McCarran-Walter Act consolidates immigration law. Maintains national origins quotas but eliminates race as a bar to naturalization.' },
  { year: 1954, title: 'Operation Wetback', desc: 'Mass deportation campaign removes over 1 million Mexican nationals and Mexican-Americans. Widely criticized for civil rights violations.' },
  { year: 1965, title: 'Hart-Celler Act', desc: 'Abolishes national origins quota system. Creates family- and employment-based preference system still used today. Transforms U.S. immigration from European to global.' },
  { year: 1975, title: 'Fall of Saigon', desc: '130,000 Vietnamese refugees resettled in the U.S. as the Vietnam War ends.' },
  { year: 1980, title: 'Refugee Act', desc: 'Creates formal refugee resettlement program. Defines "refugee" based on UN standards.' },
  { year: 1986, title: 'IRCA (Simpson-Mazzoli)', desc: 'Immigration Reform and Control Act grants amnesty to 2.7 million unauthorized immigrants. Also criminalizes hiring undocumented workers.' },
  { year: 1990, title: 'Immigration Act of 1990', desc: 'Increases legal immigration by 40%. Creates Diversity Visa lottery (55,000/year) and TPS.' },
  { year: 1994, title: 'Operation Gatekeeper', desc: 'Massive border enforcement buildup at San Diego. Pushes illegal crossings to more dangerous desert routes.' },
  { year: 1996, title: 'IIRIRA', desc: 'Illegal Immigration Reform and Immigrant Responsibility Act. Creates 3/10-year bars for unlawful presence, expedited removal, and mandatory detention.' },
  { year: 2001, title: 'September 11 Attacks', desc: 'Immigration policy shifts to national security focus. INS abolished in 2003, replaced by DHS agencies (CBP, ICE, USCIS).' },
  { year: 2002, title: 'HSA Creates DHS', desc: 'Homeland Security Act creates the Department of Homeland Security. Immigration enforcement moves from DOJ to DHS.' },
  { year: 2012, title: 'DACA Established', desc: 'Executive action creates Deferred Action for Childhood Arrivals, protecting ~800,000 "Dreamers" from deportation.' },
  { year: 2017, title: 'Travel Ban', desc: 'Executive order bans travel from several Muslim-majority countries. Family separation policy begins at the southern border.' },
  { year: 2018, title: 'Family Separation Crisis', desc: '"Zero tolerance" policy separates thousands of children from parents at the border. Policy reversed after public outcry.' },
  { year: 2020, title: 'Title 42', desc: 'COVID-era public health order enables rapid expulsion of migrants without asylum processing. Used 2.8 million times.' },
  { year: 2021, title: 'Border Surge Begins', desc: 'Encounters surge past 1.7 million. Backlog passes 1.5 million cases.' },
  { year: 2023, title: 'Record 3.1M Encounters', desc: 'FY2023 sets all-time record for border encounters. Title 42 ends in May 2023.' },
  { year: 2024, title: 'Border Executive Action', desc: 'Biden limits asylum at the border when encounters exceed thresholds. Crossings decline sharply.' },
  { year: 2025, title: 'Mass Deportation Push', desc: 'New administration launches aggressive interior enforcement. ICE removals surge to 320K in FY2025. Refugee program halted.' },
]

export const metadata: Metadata = {
  title: 'U.S. Immigration Timeline — 1790 to 2025, Key Laws & Events | OpenImmigration',
  description: 'Complete timeline of U.S. immigration history from the Naturalization Act of 1790 to the 2025 enforcement surge. Key laws, policy changes, and turning points.',
  alternates: { canonical: 'https://www.openimmigration.us/timeline' },
}

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Immigration Timeline' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Immigration Timeline</h1>
      <p className="text-lg text-gray-600 mb-10">
        235 years of immigration policy — from open borders to national origins quotas to the modern enforcement
        state. Understanding today&apos;s immigration system requires knowing how we got here.
      </p>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-8">
          {events.map((e, i) => (
            <div key={i} className="relative pl-14">
              <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-primary border-2 border-white shadow" />
              <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl font-bold text-primary">{e.year}</span>
                  <h2 className="font-heading text-lg font-bold">{e.title}</h2>
                </div>
                <p className="text-gray-600 text-sm">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 prose prose-lg max-w-none text-gray-700">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Patterns in Immigration History</h2>
        <p>
          U.S. immigration policy has always oscillated between openness and restriction. The pattern repeats:
          economic need draws immigrants → nativist backlash restricts entry → labor shortages create new pathways
          → cycle repeats. The specific groups targeted change (Chinese → Southern Europeans → Mexicans → Muslims),
          but the dynamic is remarkably consistent.
        </p>
        <p>
          The 1965 Hart-Celler Act is the single most transformative moment — it replaced a system explicitly
          designed to maintain a white European majority with one based on family ties and skills. The result:
          the U.S. immigrant population shifted from 80%+ European to majority Latin American and Asian within
          a generation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/how-immigration-court-works" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📖 How Courts Work</h3>
          <p className="text-sm text-gray-600 mt-1">The modern immigration court system explained.</p>
        </Link>
        <Link href="/legal-immigration" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">🗽 Legal Immigration</h3>
          <p className="text-sm text-gray-600 mt-1">Today&apos;s pathways shaped by this history.</p>
        </Link>
        <Link href="/analysis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold">📊 Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">Data-driven deep dives into the modern system.</p>
        </Link>
      </div>
    </div>
  )
}
