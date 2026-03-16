import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'
import { CrimeRateChart, WelfareUsageChart, LaborForceChart } from './Charts'

export const metadata: Metadata = {
  title: 'Immigration Myths vs. Data — Crime, Welfare, Jobs, and the "Invasion"',
  description: 'Data debunking the most common immigration myths: immigrants commit less crime, use less welfare, and don\'t steal jobs. What the numbers actually show.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/immigration-myths' },
}

export default function ImmigrationMythsPage() {
  return (
    <>
      <ArticleSchema
        title="Immigration Myths vs. Data"
        description="Data debunking common immigration myths about crime, welfare, jobs, and invasion rhetoric."
        url="https://www.openimmigration.us/analysis/immigration-myths"
        datePublished="2026-03-16"
        dateModified="2026-03-16"
      />

      <section className="bg-gray-900 text-white py-16 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 mb-10">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Analysis', href: '/analysis' },
            { label: 'Immigration Myths' },
          ]} />
          <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 mt-4">Fact Check</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Immigration Myths vs. Data</h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl">
            Immigrants commit <strong className="text-white">less crime</strong> than native-born Americans.
            They use <strong className="text-white">less welfare</strong>. They don&apos;t
            <strong className="text-white"> steal jobs</strong> — they create them. And the &quot;invasion&quot;?
            The unauthorized population has been <strong className="text-white">roughly flat for 15 years</strong>.
            Here&apos;s what the data actually shows.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">47%</div>
              <div className="text-sm text-gray-400 mt-1">Less Crime</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">50%</div>
              <div className="text-sm text-gray-400 mt-1">Less Welfare</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">80%</div>
              <div className="text-sm text-gray-400 mt-1">More Entrepreneurial</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-400">~11M</div>
              <div className="text-sm text-gray-400 mt-1">Undoc. Pop (Flat)</div>
            </div>
          </div>
          <ShareButtons url="https://www.openimmigration.us/analysis/immigration-myths" title="Immigration Myths vs. Data" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

          <p className="text-lg italic border-l-4 border-primary pl-4">
            This analysis examines the most common claims about immigration and compares them to peer-reviewed
            research, federal data, and independent analyses. We don&apos;t cherry-pick studies — we cite the
            consensus of the evidence.
          </p>

          {/* MYTH 1 */}
          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">
            Myth #1: &quot;Immigrants Are Criminals&quot;
          </h2>
          <p className="font-bold text-green-700">
            Reality: Immigrants — including undocumented immigrants — commit crimes at significantly lower rates
            than native-born Americans.
          </p>
          <p>
            This is one of the most extensively studied questions in criminology, and the evidence is overwhelming
            and consistent across methodologies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A <strong>2020 study in the Proceedings of the National Academy of Sciences</strong> using Texas
              data (2012–2018) found that undocumented immigrants were <strong>47% less likely</strong> to be
              incarcerated than native-born citizens. Legal immigrants were <strong>65% less likely</strong>.</li>
            <li>The <strong>Cato Institute</strong> analyzed Texas criminal conviction data and found that
              undocumented immigrants had a criminal conviction rate <strong>56% below</strong> native-born
              Americans in 2018.</li>
            <li>A <strong>2024 Stanford study</strong> analyzing 150 years of data found that immigrants have
              been less likely to be incarcerated than native-born Americans in <strong>every decade since
              1870</strong>.</li>
            <li><strong>FBI Uniform Crime Reports</strong> show that cities with larger immigrant populations
              tend to have <em>lower</em> crime rates, not higher.</li>
          </ul>

          <div className="not-prose my-8">
            <CrimeRateChart />
          </div>

          <p>
            The finding holds across immigrant groups, across time periods, and across methodologies. It&apos;s
            not a close call. The question isn&apos;t whether immigrants are more criminal than natives — they&apos;re
            clearly not. The question is why the myth persists despite decades of contrary evidence.
          </p>
          <p>
            The answer is partly <strong>media coverage</strong>. Crimes committed by immigrants receive
            disproportionate attention, particularly from outlets with anti-immigration editorial positions.
            A single crime committed by an undocumented immigrant generates national headlines, while the
            thousands of crimes committed by native-born citizens on the same day go unreported nationally.
            This <strong>availability bias</strong> creates a distorted perception of relative risk.
          </p>

          {/* MYTH 2 */}
          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">
            Myth #2: &quot;Immigrants Drain Welfare&quot;
          </h2>
          <p className="font-bold text-green-700">
            Reality: Noncitizens use public benefits at lower rates than citizens and are barred from most
            federal programs entirely.
          </p>
          <p>
            The data on benefit usage is unambiguous. Noncitizens participate in every major federal benefit
            program at <strong>lower rates</strong> than U.S. citizens:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>SNAP (food stamps)</strong>: 6% of noncitizens vs. 12% of citizens</li>
            <li><strong>Medicaid</strong>: 16% of noncitizens vs. 23% of citizens</li>
            <li><strong>SSI</strong>: 1.2% of noncitizens vs. 2.5% of citizens</li>
            <li><strong>TANF (cash assistance)</strong>: 0.3% of noncitizens vs. 0.8% of citizens</li>
            <li><strong>Housing assistance</strong>: 2.1% of noncitizens vs. 4.5% of citizens</li>
          </ul>

          <div className="not-prose my-8">
            <WelfareUsageChart />
          </div>

          <p>
            The lower usage rates aren&apos;t surprising when you understand the legal framework:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Undocumented immigrants</strong> are barred from SNAP, Medicaid (except emergency care),
              SSI, TANF, housing assistance, and the Affordable Care Act marketplace. They are eligible for
              essentially nothing.</li>
            <li><strong>Legal permanent residents</strong> face a 5-year waiting period before accessing most
              federal means-tested benefits (per the 1996 welfare reform law).</li>
            <li><strong>Work visa holders</strong> (H-1B, H-2A, etc.) are generally ineligible for means-tested
              programs.</li>
            <li><strong>Refugees and asylees</strong> are the one group with immediate access to benefits, which
              makes sense — they&apos;re fleeing persecution and often arrive with nothing.</li>
          </ul>
          <p>
            The myth persists partly because of confusion between <strong>household-level and individual-level
            data</strong>. A household headed by a noncitizen may have higher benefit usage if it includes
            U.S. citizen children who are independently eligible for programs like Medicaid and SNAP. But
            attributing a citizen child&apos;s Medicaid coverage to their noncitizen parent is statistically
            misleading.
          </p>

          {/* MYTH 3 */}
          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">
            Myth #3: &quot;They&apos;re Stealing Our Jobs&quot;
          </h2>
          <p className="font-bold text-green-700">
            Reality: Immigrants largely fill complementary roles in the labor market, and areas with more
            immigration tend to have lower unemployment.
          </p>
          <p>
            The &quot;lump of labor&quot; fallacy — the idea that there is a fixed number of jobs and every job
            taken by an immigrant is one fewer for a native — has been debunked by economists across the political
            spectrum. In reality:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Immigrants <strong>create demand</strong> as well as supply. They buy food, rent apartments, get
              haircuts, and purchase goods — generating economic activity that creates jobs.</li>
            <li>Immigrant and native-born workers are often <strong>complements, not substitutes</strong>.
              Immigrants disproportionately fill roles at the top (STEM, medicine) and bottom (agriculture,
              food processing) of the skill distribution, while native-born workers concentrate in the middle.</li>
            <li>The labor force participation rate for immigrants (<strong>66%</strong>) exceeds that of the
              native-born population (<strong>62%</strong>). Immigrants are more likely to be working, not
              less.</li>
            <li>States with the highest immigration rates — Texas, Florida, California — have unemployment
              rates at or below the national average.</li>
          </ul>

          <div className="not-prose my-8">
            <LaborForceChart />
          </div>

          <p>
            The National Academy of Sciences&apos; comprehensive 2017 study found that immigration has a
            <strong>near-zero effect</strong> on the overall wages and employment of native-born workers.
            The small group that faces some wage competition — native-born workers without a high school
            diploma — experiences an estimated <strong>2–5% wage reduction</strong> over the long run. But
            this same group also benefits from lower prices on food, construction, and services produced by
            immigrant labor.
          </p>

          {/* MYTH 4 */}
          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">
            Myth #4: &quot;We&apos;re Being Invaded&quot;
          </h2>
          <p className="font-bold text-green-700">
            Reality: The unauthorized immigrant population has been roughly flat at 10.5–11.5 million since
            2008. High border encounter numbers reflect repeat crossings and changed enforcement patterns, not
            a growing unauthorized population.
          </p>
          <p>
            The &quot;invasion&quot; narrative relies on conflating <strong>border encounters</strong> with
            <strong>population growth</strong>. These are very different metrics:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Border encounters (FY2022)</strong>: 2.2 million. This sounds like an invasion.</li>
            <li><strong>Net change in unauthorized population (2022)</strong>: Approximately +200,000–500,000.
              Most encounters result in expulsions, returns, or asylum claims that enter a legal process.</li>
            <li><strong>Repeat crossers</strong> inflate encounter counts. Under Title 42, the same person
              could be expelled and try again multiple times, generating multiple &quot;encounters&quot; from
              a single individual. CBP estimated that <strong>27% of encounters in FY2022</strong> involved
              repeat crossers.</li>
            <li><strong>Self-surrenders</strong>: Many encounters involve asylum seekers who approach Border
              Patrol agents and <em>request</em> processing. They are not evading law enforcement — they are
              seeking it. This is the opposite of an invasion.</li>
          </ul>
          <p>
            The DHS, Pew Research Center, and Center for Migration Studies all estimate the unauthorized
            population at roughly <strong>11 million in 2024</strong> — essentially unchanged from 2008.
            During the same period, the U.S. population grew by 25 million. The unauthorized share of the
            population has actually <strong>declined</strong> from about 4% in 2007 to about 3.3% today.
          </p>
          <p>
            An &quot;invasion&quot; where the invading population doesn&apos;t grow isn&apos;t an invasion.
            It&apos;s a moral panic.
          </p>

          {/* MYTH 5 */}
          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">
            Myth #5: &quot;They Don&apos;t Want to Assimilate&quot;
          </h2>
          <p className="font-bold text-green-700">
            Reality: Today&apos;s immigrants are learning English and integrating at rates comparable to or
            faster than previous waves.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>English proficiency</strong>: 72% of immigrants report speaking English well or very
              well (Census Bureau). Among the second generation, it&apos;s <strong>99%</strong>.</li>
            <li><strong>Naturalization rates</strong>: Among eligible immigrants, 66% become citizens —
              higher than historical averages for previous immigration waves.</li>
            <li><strong>Military service</strong>: Immigrants serve in the U.S. military at rates comparable
              to the native-born population, and noncitizens have earned the Medal of Honor in every American
              war.</li>
            <li><strong>Intermarriage</strong>: 12% of all new marriages in the U.S. are interracial/interethnic,
              a rate driven significantly by immigrant-native partnerships.</li>
            <li><strong>Homeownership</strong>: Immigrant homeownership rates approach native-born rates after
              20 years in the country, following a pattern virtually identical to previous immigration waves.</li>
          </ul>
          <p>
            The assimilation anxiety has been part of American culture since the 1750s, when Benjamin Franklin
            worried that German immigrants would never learn English. Those concerns proved wrong then, and
            the data shows they&apos;re wrong now.
          </p>

          {/* MYTH 6 */}
          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">
            Myth #6: &quot;They Should Just Come Legally&quot;
          </h2>
          <p className="font-bold text-green-700">
            Reality: For most would-be immigrants, there is no legal pathway available. The &quot;line&quot;
            they&apos;re told to wait in either doesn&apos;t exist or is 20+ years long.
          </p>
          <p>
            This is perhaps the most pernicious myth because it sounds reasonable. But it relies on the assumption
            that legal pathways exist for people who want to use them. For most, they don&apos;t:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No family connection + no employer sponsor = no visa</strong>. There is no general
              &quot;I want to immigrate&quot; application. You need a qualifying family member in the U.S. or
              an employer willing to sponsor you.</li>
            <li><strong>Unskilled workers</strong> have essentially zero legal pathways. There are only
              <strong>5,000 visas per year</strong> for &quot;other workers&quot; (EB-3 unskilled) — compared
              to millions who could fill available jobs.</li>
            <li><strong>The diversity visa lottery</strong> offers 55,000 slots for 12+ million applicants
              annually — a 0.4% chance.</li>
            <li><strong>Family visa waits exceed 20 years</strong> for some categories and countries
              (see our <Link href="/analysis/visa-backlog-crisis" className="text-primary underline">Visa
              Backlog Crisis</Link> analysis).</li>
            <li><strong>Refugee resettlement</strong> has been slashed from 85,000+ annual slots to as low as
              15,000 under recent administrations.</li>
          </ul>
          <p>
            Telling someone to &quot;come legally&quot; when no legal option exists is like telling a drowning
            person to use the bridge — when there is no bridge.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Why Myths Persist</h2>
          <p>
            Immigration myths persist not because evidence is unavailable, but because they serve political
            purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Fear is politically useful</strong>. Candidates who position immigrants as threats can
              rally voters without proposing workable solutions.</li>
            <li><strong>Confirmation bias</strong>: People remember anecdotes that confirm their beliefs and
              ignore data that contradicts them. A single crime by an immigrant is more memorable than a study
              of 10 million data points.</li>
            <li><strong>Media incentives</strong>: Conflict and fear generate engagement. &quot;Immigrants
              commit less crime than you do&quot; doesn&apos;t drive clicks.</li>
            <li><strong>Complexity aversion</strong>: The real immigration story is complicated — mixed effects,
              trade-offs, regional variation. Myths are simple. Simple wins in a soundbite culture.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Bottom Line</h2>
          <p>
            Every major claim in the anti-immigration playbook — crime, welfare, jobs, invasion — is contradicted
            by the evidence. Not by a close margin, but decisively:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Immigrants commit <strong>less crime</strong> → 47–65% lower incarceration rates</li>
            <li>Immigrants use <strong>less welfare</strong> → 50% lower benefit usage, barred from most programs</li>
            <li>Immigrants <strong>don&apos;t steal jobs</strong> → higher labor participation, complementary skills</li>
            <li>There is <strong>no invasion</strong> → unauthorized population flat for 15 years</li>
            <li>They <strong>do assimilate</strong> → 99% English proficiency by second generation</li>
            <li>Most <strong>can&apos;t &quot;come legally&quot;</strong> → legal pathways are broken or nonexistent</li>
          </ul>
          <p>
            This doesn&apos;t mean immigration has zero costs or that every policy should be open borders. Real
            trade-offs exist, and reasonable people can disagree about the optimal level and composition of
            immigration. But the debate should start from facts, not myths. And the facts overwhelmingly favor
            more immigration, not less.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Sources & Methodology</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Light, Massoglia, & King, &quot;Comparing crime rates between undocumented immigrants, legal immigrants, and native-born US citizens in Texas&quot; PNAS (2020)</li>
              <li>• Cato Institute, &quot;Criminal Immigrants in Texas&quot; series (2018–2024)</li>
              <li>• National Academy of Sciences, &quot;The Economic and Fiscal Consequences of Immigration&quot; (2017)</li>
              <li>• Institute on Taxation and Economic Policy, tax contribution analyses</li>
              <li>• Bureau of Labor Statistics, Foreign-Born Workers data</li>
              <li>• Pew Research Center, unauthorized immigrant population estimates</li>
              <li>• Center for Migration Studies, demographic analyses</li>
              <li>• Census Bureau, American Community Survey (language, homeownership data)</li>
              <li>• U.S. Department of Agriculture, farm labor surveys</li>
            </ul>
          </div>
        </div>

        <RelatedAnalysis current="immigration-myths" />
      </div>
    </>
  )
}
