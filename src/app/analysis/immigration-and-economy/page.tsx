import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'
import { WorkforceShareChart, SectorDependenceChart, SSContributionChart, EntrepreneurshipChart } from './Charts'

export const metadata: Metadata = {
  title: 'Immigration & the Economy — $2.6 Trillion Impact',
  description: 'Immigrants comprise 18.6% of the U.S. workforce, founded 44% of Fortune 500 companies, and contribute $97B+ in taxes even when undocumented. The economic data on immigration.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/immigration-and-economy' },
}

export default function ImmigrationEconomyPage() {
  return (
    <>
      <ArticleSchema
        title="Immigration and the Economy"
        description="Immigrants comprise 18.6% of the U.S. workforce, founded 44% of Fortune 500 companies, and pay billions in taxes."
        url="https://www.openimmigration.us/analysis/immigration-and-economy"
        datePublished="2026-03-16"
        dateModified="2026-03-16"
      />

      <section className="bg-gray-900 text-white py-16 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 mb-10">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Analysis', href: '/analysis' },
            { label: 'Immigration & Economy' },
          ]} />
          <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 mt-4">Economic Analysis</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Immigration and the Economy</h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl">
            Immigrants are <strong className="text-white">18.6% of the American workforce</strong>, founded
            <strong className="text-white"> 44% of Fortune 500 companies</strong>, and contribute over
            <strong className="text-white"> $400 billion in federal taxes</strong> annually.
            Even undocumented immigrants pay <strong className="text-white">$96.7 billion</strong> in taxes per year.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">18.6%</div>
              <div className="text-sm text-gray-400 mt-1">Of U.S. Workforce</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">44%</div>
              <div className="text-sm text-gray-400 mt-1">Fortune 500 Founded</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">$97B</div>
              <div className="text-sm text-gray-400 mt-1">Undoc. Taxes/Year</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">$22.6B</div>
              <div className="text-sm text-gray-400 mt-1">SS Contributions (Undoc.)</div>
            </div>
          </div>
          <ShareButtons url="https://www.openimmigration.us/analysis/immigration-and-economy" title="Immigration and the Economy" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

          <h2 className="font-heading text-2xl font-bold text-gray-900">The Workforce Engine</h2>
          <p>
            The foreign-born population comprises <strong>18.6% of the U.S. civilian labor force</strong> —
            approximately 30.8 million workers as of 2024. This is the highest share since the Bureau of Labor
            Statistics began tracking the data, and it reflects a long-term trend: immigrants have been a
            growing share of the workforce for three decades.
          </p>
          <p>
            This growth isn&apos;t accidental — it&apos;s structural. The native-born U.S. workforce is aging and
            growing slowly. Between 2020 and 2024, the native-born working-age population grew by less than 0.5%
            annually, while the foreign-born workforce grew by over 3% per year. Without immigration, the U.S.
            labor force would be <strong>shrinking</strong>, threatening economic growth, Social Security solvency,
            and the housing market.
          </p>
          <p>
            The Federal Reserve Bank of Dallas estimated that immigration accounted for roughly <strong>50% of
            U.S. labor force growth</strong> between 2019 and 2024, and the Congressional Budget Office projects
            that recent immigration will add <strong>$7 trillion to GDP over the next decade</strong>.
          </p>

          <div className="not-prose my-8">
            <WorkforceShareChart />
          </div>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Essential Industries</h2>
          <p>
            Immigrant labor concentration varies dramatically by sector, and in several critical industries,
            the economy would collapse without it:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Agriculture</strong>: 73% of farmworkers are foreign-born, and roughly half are
              undocumented. American food production is fundamentally dependent on immigrant labor — a
              fact that every administration acknowledges privately and ignores publicly.</li>
            <li><strong>Construction</strong>: 30% of construction workers are immigrants. In high-growth
              states like Texas and Florida, the share exceeds 40%. Housing cost discussions that ignore
              immigration&apos;s role in <a href="https://permitcore.io" className="text-primary hover:underline">construction labor and permit activity</a> are incomplete.</li>
            <li><strong>Hospitality</strong>: 31% of hotel and restaurant workers are foreign-born. The
              post-COVID labor shortage in hospitality was directly linked to reduced immigration during
              the pandemic.</li>
            <li><strong>Tech/STEM</strong>: 24% of STEM workers are immigrants, rising to 40%+ in computer
              science and engineering. Over 60% of the top AI researchers working in the U.S. were born
              abroad.</li>
            <li><strong>Healthcare</strong>: 18% of healthcare workers are immigrants, including 29% of
              physicians and 24% of home health aides. Rural healthcare would be devastated without
              international medical graduates.</li>
          </ul>

          <div className="not-prose my-8">
            <SectorDependenceChart />
          </div>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Entrepreneurship Machine</h2>
          <p>
            The data on immigrant entrepreneurship is staggering and consistent across every measure:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>44% of Fortune 500 companies</strong> were founded by immigrants or their children,
              including Apple (Steve Jobs — son of a Syrian immigrant), Google (Sergey Brin — born in Russia),
              Amazon (Jeff Bezos — adopted by a Cuban immigrant), Tesla (Elon Musk — born in South Africa),
              and hundreds more.</li>
            <li><strong>55% of billion-dollar startups</strong> (&quot;unicorns&quot;) in the U.S. have at
              least one immigrant founder.</li>
            <li>Immigrants are <strong>80% more likely</strong> to start a business than native-born Americans,
              according to the Kauffman Foundation.</li>
            <li>Immigrants file patents at a rate <strong>76% higher</strong> than the native-born population,
              driving innovation that benefits the entire economy.</li>
          </ul>

          <div className="not-prose my-8">
            <EntrepreneurshipChart />
          </div>

          <p>
            These aren&apos;t just tech billionaires. Immigrants are overrepresented in small business ownership
            across every sector — from restaurants and dry cleaners to medical practices and construction firms.
            The immigrant entrepreneurship rate holds across education levels, suggesting it&apos;s driven by
            self-selection (people willing to uproot their lives tend to be risk-takers) rather than skill level.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">Tax Revenue and Fiscal Impact</h2>
          <p>
            The fiscal contribution of immigrants is well-documented and consistently positive at the federal level:
          </p>
          <p>
            All immigrants (documented and undocumented) paid an estimated <strong>$405 billion in federal taxes</strong>
            and <strong>$154 billion in state and local taxes</strong> in 2024. This includes income tax, payroll tax,
            sales tax, property tax, and excise taxes.
          </p>
          <p>
            <strong>Undocumented immigrants specifically</strong> paid an estimated <strong>$96.7 billion in total
            taxes</strong> in 2024 — $59.4 billion in federal taxes and $37.3 billion in state and local taxes. This
            is according to the Institute on Taxation and Economic Policy (ITEP), and the figure is broadly consistent
            with estimates from the Congressional Budget Office and Social Security Administration.
          </p>
          <p>
            This tax contribution is particularly remarkable because undocumented immigrants are <strong>barred from
            nearly all federal benefit programs</strong>. They cannot receive Social Security benefits, Medicare,
            Medicaid (with narrow exceptions for emergency care), food stamps, or housing assistance. They pay into
            systems they can never collect from.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Social Security Lifeline</h2>
          <p>
            Perhaps the most underappreciated contribution is to Social Security. Undocumented immigrants — using
            Individual Taxpayer Identification Numbers (ITINs) or mismatched Social Security numbers — contributed
            an estimated <strong>$22.6 billion to Social Security</strong> in 2024.
          </p>
          <p>
            This money goes into the Social Security trust fund and will <strong>never be claimed by the people
            who paid it</strong>. The Social Security Administration itself has acknowledged that undocumented
            immigrant contributions are essential to the system&apos;s solvency. The SSA&apos;s &quot;Earnings
            Suspense File&quot; — where payments from non-matching Social Security numbers are held — contains
            over <strong>$1.8 trillion</strong> in cumulative contributions.
          </p>

          <div className="not-prose my-8">
            <SSContributionChart />
          </div>

          <p>
            In an era when Social Security faces a projected shortfall by 2033, the irony is stark:
            the workers most vilified in the immigration debate are literally <strong>subsidizing the retirement
            of the people who want them deported</strong>.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Wage Impact Debate</h2>
          <p>
            The most contentious economic question about immigration is its effect on wages. The evidence is
            more nuanced than either side typically admits:
          </p>
          <p>
            <strong>The academic consensus</strong>, as summarized by the National Academy of Sciences in its
            landmark 2017 report, is that immigration has a <strong>small negative effect on the wages of
            prior immigrants</strong> (who compete directly for similar jobs) and a <strong>near-zero or
            slightly positive effect on native-born wages</strong> overall.
          </p>
          <p>
            The key insight is that immigrant and native-born workers are often <strong>complements, not
            substitutes</strong>. Immigrant construction laborers allow native-born foremen and contractors
            to be more productive. Immigrant nannies and eldercare workers allow native-born women to
            participate in the workforce. Immigrant scientists and engineers expand the frontier of
            innovation, creating jobs for everyone.
          </p>
          <p>
            However, the distributional effects matter. Low-skilled native-born workers in direct competition
            with immigrants — primarily those without a high school diploma — do face some wage pressure,
            estimated at <strong>2–5% over the long run</strong>. This is real and shouldn&apos;t be dismissed.
            But the solution isn&apos;t to restrict immigration — it&apos;s to ensure that the gains from
            immigration (which are large and broadly shared) are used to compensate the small group of workers
            who bear the costs.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">What Happens If Immigration Stops?</h2>
          <p>
            The CBO modeled a scenario of significantly reduced immigration and the results are sobering:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>GDP would be $7 trillion lower</strong> over the next decade</li>
            <li><strong>Federal revenue would drop by $1 trillion</strong>, increasing deficits</li>
            <li><strong>Social Security insolvency</strong> would accelerate by 2–3 years</li>
            <li><strong>Inflation would increase</strong> as labor shortages drive up wages in essential sectors (food, housing, healthcare)</li>
            <li><strong>Housing construction</strong> would slow further, worsening the existing shortage</li>
            <li><strong>Agricultural output</strong> would decline 20–30%, raising food prices dramatically</li>
          </ul>
          <p>
            Japan provides a real-world cautionary tale. Its restrictive immigration policy has contributed to
            three decades of economic stagnation, a shrinking workforce, a collapsing pension system, and
            rural depopulation. The U.S. has avoided this trajectory precisely because of immigration.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Bottom Line</h2>
          <p>
            The economic case for immigration isn&apos;t a close call. Immigrants are <strong>18.6% of the
            workforce</strong>, <strong>disproportionately entrepreneurial</strong>, <strong>net tax
            contributors</strong>, and <strong>essential to the solvency of Social Security</strong>.
            Even undocumented immigrants — the most politically controversial group — pay nearly <strong>$100
            billion in taxes annually</strong> while being barred from most benefit programs.
          </p>
          <p>
            The debate over immigration is rarely an economic debate — it&apos;s a cultural one wearing
            economic clothing. When politicians claim immigrants &quot;steal jobs&quot; or &quot;drain
            resources,&quot; they are contradicting decades of research from across the political spectrum.
            The Cato Institute (libertarian), the Brookings Institution (center-left), and the Federal
            Reserve (nonpartisan) all agree: immigration is a net economic positive for the United States.
          </p>
          <p>
            The question has never been <em>whether</em> immigration benefits the economy. It&apos;s whether
            we can build a system smart enough to maximize those benefits while managing the real (but smaller
            than advertised) costs. The current system — with its <Link href="/backlog" className="text-primary hover:underline">decades-long backlogs</Link>, arbitrary <Link href="/green-card" className="text-primary hover:underline">visa caps</Link>, and
            massive <Link href="/analysis/cost-of-immigration-enforcement" className="text-primary hover:underline">enforcement apparatus</Link> — does neither.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Sources & Methodology</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Bureau of Labor Statistics, Foreign-Born Workers: Labor Force Characteristics (2024)</li>
              <li>• Congressional Budget Office, &quot;The Budgetary Impact of Immigration&quot; (2024)</li>
              <li>• National Academy of Sciences, &quot;The Economic and Fiscal Consequences of Immigration&quot; (2017)</li>
              <li>• Institute on Taxation and Economic Policy, &quot;Undocumented Immigrants&apos; Tax Contributions&quot; (2024)</li>
              <li>• Social Security Administration, &quot;Effects of Unauthorized Immigration on the Actuarial Status of the Social Security Trust Funds&quot;</li>
              <li>• National Foundation for American Policy, Fortune 500 immigrant founder analysis</li>
              <li>• Kauffman Foundation, entrepreneurship data</li>
              <li>• Federal Reserve Bank of Dallas, labor force analyses</li>
              <li>• USDA Economic Research Service, farm labor data</li>
            </ul>
          </div>
        </div>

        <RelatedAnalysis current="immigration-and-economy" />
      </div>
    </>
  )
}
