import ArticleSchema from '@/components/ArticleSchema'
import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedAnalysis from '@/components/RelatedAnalysis'
import Link from 'next/link'
import { PetitionsVsCapChart, TopEmployersChart, WageChart, CountryChart } from './Charts'

export const metadata: Metadata = {
  title: 'H-1B Debate — Tech, Wages & the Lottery',
  description: 'The H-1B visa program receives 470K+ applications for 85K slots. 72% go to Indian nationals. Analysis of tech industry dependence, wage data, lottery problems, and per-country caps.',
  alternates: { canonical: 'https://www.openimmigration.us/analysis/h1b-debate' },
}

export default function H1BDebatePage() {
  return (
    <>
      <ArticleSchema
        title="The H-1B Debate"
        description="470K+ applications for 85K slots. Tech industry dependence, wage suppression claims vs data, and the lottery system."
        url="https://www.openimmigration.us/analysis/h1b-debate"
        datePublished="2026-03-16"
        dateModified="2026-03-16"
      />

      <section className="bg-gray-900 text-white py-16 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 mb-10">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Analysis', href: '/analysis' },
            { label: 'H-1B Debate' },
          ]} />
          <span className="inline-block bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 mt-4">Work Visas</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">The H-1B Debate</h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl">
            <strong className="text-white">470,000 petitions</strong> for <strong className="text-white">85,000 slots</strong>.
            <strong className="text-white"> 72% of recipients</strong> are from India. The tech industry says it
            can&apos;t survive without H-1B workers. Critics say it suppresses wages. The data tells a more
            complicated story.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">85K</div>
              <div className="text-sm text-gray-400 mt-1">Annual Cap</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-400">470K+</div>
              <div className="text-sm text-gray-400 mt-1">Petitions Filed</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">72%</div>
              <div className="text-sm text-gray-400 mt-1">From India</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">$110K</div>
              <div className="text-sm text-gray-400 mt-1">Median Salary</div>
            </div>
          </div>
          <ShareButtons url="https://www.openimmigration.us/analysis/h1b-debate" title="The H-1B Debate" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

          <h2 className="font-heading text-2xl font-bold text-gray-900">How H-1B Works</h2>
          <p>
            The H-1B visa allows U.S. employers to temporarily hire foreign workers in &quot;specialty
            occupations&quot; — typically requiring a bachelor&apos;s degree or higher. Created by the
            Immigration Act of 1990, the program was designed to give American companies access to global
            talent in fields where domestic workers are scarce.
          </p>
          <p>
            The annual cap is <strong>85,000 visas</strong> — 65,000 for applicants with bachelor&apos;s
            degrees and 20,000 for those with U.S. master&apos;s degrees or higher. Universities and
            research institutions are exempt from the cap, meaning the actual number of H-1B workers is
            significantly higher. Approximately <strong>580,000 people</strong> hold active H-1B status
            at any time.
          </p>
          <p>
            When petitions exceed the cap — which has been the case every year since 2014 — <Link href="/uscis" className="text-blue-700 underline hover:text-blue-900">USCIS</Link> conducts
            a <strong>random lottery</strong>. In FY2024, 470,342 petitions were filed for 85,000 slots,
            giving each petition roughly an <strong>18% chance</strong> of selection. In FY2023, the odds
            were even worse: 758,994 petitions, yielding an 11% selection rate.
          </p>

          <div className="not-prose my-8">
            <PetitionsVsCapChart />
          </div>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Tech Industry Dependence</h2>
          <p>
            The H-1B program is dominated by the technology sector. Computer-related occupations account for
            approximately <strong>65% of all H-1B approvals</strong>. The top employers are a mix of American
            tech giants and Indian IT outsourcing firms:
          </p>

          <div className="not-prose my-8">
            <TopEmployersChart />
          </div>

          <p>
            The presence of both categories — companies like Google and Amazon alongside outsourcing firms like
            Infosys and TCS — reflects the fundamental tension in the H-1B debate. These are very different
            use cases:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Tech companies (Google, Amazon, Meta, Apple)</strong>: Hire H-1B workers for highly
              specialized roles at very high salaries (often $150K+). These workers are typically recruited
              from top global universities and bring skills that are genuinely scarce in the U.S. labor market.
              Their contribution to innovation and economic growth is substantial.
            </li>
            <li>
              <strong>Outsourcing firms (Infosys, TCS, Cognizant)</strong>: Use H-1B to bring workers from
              India for IT services contracts, often at lower wage levels. Critics argue these firms use the
              program to undercut American workers by importing cheaper labor. The median salary at outsourcing
              firms is typically <strong>$80,000–$95,000</strong>, compared to <strong>$130,000+</strong> at
              major tech companies.
            </li>
          </ul>
          <p>
            This dual use makes blanket statements about H-1B — either as essential talent pipeline or as
            wage suppression tool — incomplete. <strong>Both are happening simultaneously</strong>, and good
            policy would distinguish between them rather than treating all H-1B employment identically.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Wage Suppression Debate</h2>
          <p>
            The claim that H-1B workers suppress wages is the most contentious aspect of the debate. The
            evidence is mixed:
          </p>
          <p>
            <strong>Evidence for wage pressure</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The prevailing wage system allows employers to pay H-1B workers at <strong>Level 1 (entry-level)
              wages</strong> for their occupation and area — which can be 30–40% below the median for the role.
              About 8% of H-1B petitions are filed at Level 1.</li>
            <li>Economic studies by Harvard&apos;s George Borjas and others have found that <strong>STEM wage
              growth slowed</strong> in fields with high H-1B usage compared to fields with low usage.</li>
            <li>Outsourcing firms specifically use the H-1B to bring workers at lower cost, which directly
              competes with American IT workers at similar skill levels.</li>
          </ul>
          <p>
            <strong>Evidence against significant wage suppression</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The median H-1B salary is approximately <strong>$110,000</strong> — well above the national
              median income of $63,000 and above the median for tech workers generally.</li>
            <li>Studies by Giovanni Peri (UC Davis) found that H-1B workers <strong>increase productivity</strong>
              and patenting rates, generating innovation spillovers that raise wages for all workers in the
              affected industry.</li>
            <li>Tech sector wages have risen dramatically over the H-1B era. If the program were suppressing
              wages, you&apos;d expect stagnation — instead, software engineer salaries have roughly doubled
              since 2010.</li>
            <li>The <strong>unemployment rate for STEM workers</strong> is consistently below 2%, suggesting
              labor scarcity, not surplus.</li>
          </ul>

          <div className="not-prose my-8">
            <WageChart />
          </div>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Lottery Problem</h2>
          <p>
            Using a <strong>random lottery</strong> to allocate a scarce resource (H-1B visas) is economically
            irrational. The lottery treats a $200,000/year Google AI researcher identically to a $70,000/year
            entry-level IT consultant. It provides no mechanism for distinguishing between workers who would
            generate enormous economic value and those who would generate modest value.
          </p>
          <p>
            The lottery also creates perverse incentives. Some employers filed multiple petitions for the same
            worker through different entities, inflating the petition count and reducing odds for legitimate
            single-petition applicants. USCIS implemented a &quot;beneficiary-centric&quot; lottery in FY2024
            to address this, reducing duplicative filings from an estimated 408,000 to near zero — which is why
            petitions dropped from 759K to 470K between FY2023 and FY2024.
          </p>
          <p>
            A <strong>market-based alternative</strong> — such as allocating visas by salary level (highest-paid
            workers selected first) or by auction — would ensure the program attracts the highest-value workers
            and minimize wage suppression concerns. Several economists across the political spectrum have proposed
            such reforms, but Congress has not acted.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Per-Country Cap Problem</h2>
          <p>
            While the H-1B visa itself doesn&apos;t have a per-country cap, the <strong>employment-based green
            card</strong> — which most H-1B workers eventually apply for — does. The 7% per-country limit on
            green cards means that Indian nationals (72% of H-1B holders) face <strong>estimated wait times
            of 50–90 years</strong> for a permanent green card.
          </p>

          <div className="not-prose my-8">
            <CountryChart />
          </div>

          <p>
            This creates a uniquely perverse situation: skilled workers enter on H-1B (3–6 year visa), apply
            for a green card, and then spend <strong>decades</strong> in a queue while tied to a single employer
            (changing jobs risks losing their place in line). They pay full taxes, buy homes, raise American
            children — but remain legally &quot;temporary&quot; for their entire working lives.
          </p>
          <p>
            The per-country cap treats India (1.4 billion people) the same as Iceland (370,000). The Fairness
            for High-Skilled Immigrants Act, which would eliminate per-country caps, has been introduced in
            multiple sessions of Congress with bipartisan support but has never passed, blocked by senators
            concerned about reduced access for smaller countries.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Indentured Servitude Problem</h2>
          <p>
            H-1B workers are tied to their sponsoring employer. While portability provisions allow transfers,
            the process takes months and carries risk. For workers in the green card queue, changing employers
            can jeopardize their application — effectively creating a form of <strong>labor market bondage</strong>
            where workers accept lower wages, longer hours, and worse conditions because the cost of leaving
            (losing their immigration status) is catastrophic.
          </p>
          <p>
            This employer dependency is the most legitimate critique of the H-1B program. It gives employers
            outsized power over workers, suppresses the workers&apos; ability to negotiate wages, and reduces
            labor market competition. The fix is straightforward: <strong>decouple immigration status from
            specific employers</strong>. Give H-1B workers portable status (similar to how a driver&apos;s
            license lets you drive any car, not just one) and watch wages rise as workers gain bargaining power.
          </p>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">What Both Sides Get Right (and Wrong)</h2>
          <p>
            <strong>Proponents are right</strong> that:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The U.S. tech industry genuinely needs global talent</li>
            <li>H-1B workers generate innovation, patents, and economic growth</li>
            <li>85,000 slots is far too few for the world&apos;s largest <Link href="/analysis/immigration-and-economy" className="text-blue-700 underline hover:text-blue-900">economic impact</Link></li>
            <li>Restricting H-1B would push companies to offshore entire operations</li>
          </ul>
          <p>
            <strong>Critics are right</strong> that:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Some employers use the program to undercut American workers</li>
            <li>The prevailing wage system allows below-market compensation</li>
            <li>Employer dependency creates exploitative power dynamics</li>
            <li>The lottery is economically irrational</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Libertarian Case for Reform</h2>
          <p>
            From a free-market perspective, the H-1B program is a mess of government central planning:
            arbitrary caps, random allocation, employer-tied status, and wage floors set by bureaucrats
            rather than markets. The libertarian solution:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Raise or eliminate the cap</strong>: Let market demand determine how many skilled
              workers enter, not a number set in 1990.</li>
            <li><strong>Allocate by salary, not lottery</strong>: Select the highest-paid applicants first,
              ensuring the program attracts top talent and eliminates wage suppression concerns.</li>
            <li><strong>Make status portable</strong>: Decouple work authorization from specific employers
              so workers can compete in the open market.</li>
            <li><strong>Eliminate per-country green card caps</strong>: Treat individuals as individuals,
              not as representatives of their birth country.</li>
            <li><strong>Create a startup visa</strong>: Allow entrepreneurs to self-sponsor, rather than
              requiring employer sponsorship that excludes the most innovative workers.</li>
          </ul>

          <h2 className="font-heading text-2xl font-bold text-gray-900 mt-10">The Bottom Line</h2>
          <p>
            The H-1B program is simultaneously essential and badly designed. It channels hundreds of thousands
            of talented workers into the U.S. economy while creating exploitative employment relationships,
            decades-long green card waits, and a lottery system that defies economic logic.
          </p>
          <p>
            The solution isn&apos;t to eliminate H-1B — that would be economically catastrophic for the tech
            industry and the broader economy. Nor is it to maintain the status quo, which allows legitimate
            abuses. It&apos;s to redesign the program around market principles: more visas, portable status,
            salary-based allocation, and a path to permanence that doesn&apos;t require waiting longer than
            a human career.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Sources & Methodology</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• USCIS H-1B Employer Data Hub</li>
              <li>• Department of Labor, Office of Foreign Labor Certification (LCA data)</li>
              <li>• Congressional Research Service, &quot;H-1B Visa Program&quot; (2024)</li>
              <li>• National Foundation for American Policy, H-1B analyses</li>
              <li>• Peri, Shih, & Sparber, &quot;STEM Workers, H-1B Visas, and Productivity&quot;</li>
              <li>• Borjas, &quot;Immigration and the American Worker&quot;</li>
              <li>• Cato Institute, immigration and labor market studies</li>
              <li>• USCIS H-1B registration data (FY2021–FY2024)</li>
            </ul>
          </div>
        </div>

        <RelatedAnalysis current="h1b-debate" />
      </div>
    </>
  )
}
