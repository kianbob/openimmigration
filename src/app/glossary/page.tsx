import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Immigration Court Glossary — Key Terms & Definitions',
  description: 'Comprehensive glossary of U.S. immigration court terms. Definitions for asylum, removal proceedings, NTA, BIA, EOIR, voluntary departure, in absentia, and 50+ more terms.',
  alternates: { canonical: 'https://www.openimmigration.us/glossary' },
  openGraph: {
    title: 'Immigration Court Glossary — Key Terms & Definitions',
    description: 'Comprehensive glossary of U.S. immigration court terms. Definitions for asylum, removal proceedings, NTA, BIA, EOIR, voluntary departure, in absentia, and 50+ more terms.',
  },
}

const terms = [
  { term: 'Asylum', def: 'Protection granted to individuals who can prove they face persecution in their home country based on race, religion, nationality, political opinion, or membership in a particular social group. Must be applied for within one year of arrival (with exceptions).', link: '/asylum' },
  { term: 'BIA (Board of Immigration Appeals)', def: 'The appellate body within EOIR that reviews immigration judge decisions. Located in Falls Church, Virginia. Most appeals are decided by a single board member reviewing the record, not a full panel hearing.', link: '/appeals' },
  { term: 'Bond Hearing', def: 'A hearing where a detained immigrant asks to be released on bond. Immigration judges set bond amounts (minimum $1,500) based on flight risk and danger to community. Average bond is approximately $11,400.', link: '/bond' },
  { term: 'Cancellation of Removal', def: 'A form of relief allowing certain long-term residents to avoid deportation. Requires 10 years of continuous physical presence, good moral character, and proof that removal would cause "exceptional and extremely unusual hardship" to a U.S. citizen or permanent resident spouse, parent, or child.' },
  { term: 'CBP (Customs and Border Protection)', def: 'The DHS agency that patrols U.S. borders, operates ports of entry, and processes encounters with people entering or attempting to enter the U.S. without authorization.', link: '/border' },
  { term: 'Continuance', def: 'A postponement of an immigration hearing to a later date. Judges grant continuances for many reasons: missing documents, pending USCIS applications, attorney scheduling, or simply an overcrowded docket. Multiple continuances can extend cases by years.' },
  { term: 'Credible Fear Interview', def: 'A screening interview conducted by a USCIS asylum officer to determine if someone has a "significant possibility" of establishing eligibility for asylum. Those who pass are placed in removal proceedings with the opportunity to apply for asylum.' },
  { term: 'DACA (Deferred Action for Childhood Arrivals)', def: 'A policy allowing certain individuals who came to the U.S. as children to receive renewable two-year work permits and protection from deportation. Does not provide a path to citizenship or permanent resident status.', link: '/daca' },
  { term: 'Detained Docket', def: 'Cases heard in immigration courts located within or near detention facilities. Detained cases typically move faster but respondents have less access to lawyers and evidence gathering.' },
  { term: 'EOIR (Executive Office for Immigration Review)', def: 'The Department of Justice agency that houses all U.S. immigration courts and the Board of Immigration Appeals. EOIR employs the immigration judges who hear removal cases. It is separate from USCIS (which handles applications) and ICE (which handles enforcement).' },
  { term: 'Grant of Relief', def: 'A favorable decision where the immigration judge allows the respondent to remain in the U.S. This includes asylum grants, cancellation of removal, adjustment of status, withholding of removal, and other forms of protection.' },
  { term: 'ICE (Immigration and Customs Enforcement)', def: 'The DHS agency responsible for interior immigration enforcement, detention, and removal. ICE attorneys serve as the "prosecution" in immigration court, arguing for the deportation of respondents.', link: '/enforcement' },
  { term: 'IJ (Immigration Judge)', def: 'A DOJ attorney appointed to preside over immigration court proceedings. Immigration judges are not Article III judges — they are employees of the executive branch (DOJ), which critics argue compromises judicial independence.', link: '/judges' },
  { term: 'In Absentia Order', def: 'A removal order issued when a respondent fails to appear for their immigration hearing. The judge may order deportation without the person present. Can sometimes be reopened if the person shows the absence was due to exceptional circumstances or lack of proper notice.', link: '/analysis/in-absentia' },
  { term: 'Individual Hearing (Merits Hearing)', def: 'The full trial-like hearing where an immigration judge considers evidence, hears testimony, and makes a decision on a case. Distinguished from a "master calendar hearing," which is a short scheduling or procedural appearance.' },
  { term: 'LPR (Lawful Permanent Resident)', def: 'A foreign national authorized to live and work permanently in the United States, commonly known as a "green card holder." LPRs can be placed in removal proceedings if they commit certain crimes or fraud.', link: '/green-card' },
  { term: 'Master Calendar Hearing', def: 'A short procedural hearing — typically a few minutes — where the judge confirms the charges, takes pleadings, sets future hearing dates, and addresses preliminary matters. Multiple cases are scheduled in the same block.' },
  { term: 'NTA (Notice to Appear)', def: 'The charging document that initiates removal proceedings. Filed by DHS (usually ICE or CBP), it lists the factual allegations and charges of removability against the respondent. Receipt of an NTA is the starting point of an immigration court case.' },
  { term: 'Non-Detained Docket', def: 'Cases where the respondent is not in ICE custody. These cases typically take much longer to resolve due to scheduling backlogs and continuances. The vast majority of pending cases are on the non-detained docket.' },
  { term: 'Parole', def: 'Temporary permission to enter or remain in the U.S. granted on a case-by-case basis for urgent humanitarian reasons or significant public benefit. Parole does not constitute formal "admission" and can be revoked.' },
  { term: 'PD (Priority Date)', def: 'The date that establishes an immigrant\'s place in line for a visa. For family-based cases, it\'s when the petition is filed. For employment-based cases, it varies. Wait times from priority date to visa availability can be decades.' },
  { term: 'Removal Proceedings', def: 'The formal process in immigration court where a judge determines whether a foreign national should be ordered removed (deported) from the United States or allowed to remain under some form of relief.' },
  { term: 'Removal Order', def: 'A judge\'s order requiring a person to leave the United States. Can be executed by ICE immediately (for detained individuals) or at a later date. A removal order carries a bar on future re-entry (typically 10 years).', link: '/deportation' },
  { term: 'Respondent', def: 'The person facing removal proceedings in immigration court — equivalent to a "defendant" in criminal court. Immigration court uses civil, not criminal, terminology.' },
  { term: 'SIJS (Special Immigrant Juvenile Status)', def: 'A pathway to a green card for children who have been abused, neglected, or abandoned by a parent. Requires a state court finding of dependency and a USCIS application. Has a significant backlog, with many children aging out before approval.' },
  { term: 'Stipulated Removal', def: 'An agreement where the respondent consents to be removed without a full hearing, often in exchange for certain conditions. Common in cases where the person wants to leave quickly to avoid prolonged detention.' },
  { term: 'TPS (Temporary Protected Status)', def: 'A designation allowing nationals of certain countries to live and work in the U.S. temporarily due to ongoing armed conflict, natural disasters, or other extraordinary conditions in their home country. Must be redesignated periodically by the Secretary of Homeland Security.', link: '/tps' },
  { term: 'Title 8', def: 'The section of U.S. federal law that governs immigration and nationality. Standard removal proceedings, asylum, and most immigration court matters fall under Title 8 authority.' },
  { term: 'Title 42', def: 'A public health authority used from 2020-2023 to quickly expel migrants at the border without standard immigration processing, citing COVID-19 pandemic risks. Ended May 11, 2023.' },
  { term: 'UAC (Unaccompanied Alien Child)', def: 'A child under 18 with no lawful immigration status who has no parent or legal guardian in the U.S. available to provide care. UACs are transferred to ORR custody and eventually placed with sponsors while their immigration cases proceed.', link: '/children' },
  { term: 'USCIS (U.S. Citizenship and Immigration Services)', def: 'The DHS agency that handles immigration applications — green cards, naturalization, work permits, asylum (affirmative), DACA, and TPS. Separate from EOIR (courts) and ICE (enforcement).', link: '/uscis' },
  { term: 'Voluntary Departure', def: 'An agreement where the respondent leaves the U.S. voluntarily instead of receiving a formal removal order. Benefits: no removal order on record, no re-entry bar. Must leave by the deadline or the voluntary departure converts to a removal order.' },
  { term: 'Withholding of Removal', def: 'A form of protection similar to asylum but with a higher burden of proof ("more likely than not" persecution). Does not provide a path to a green card and only protects against removal to the specific country of feared persecution.' },
  { term: 'Writ of Habeas Corpus', def: 'A legal action in federal court challenging the lawfulness of detention. Immigration detainees sometimes file habeas petitions when they believe their continued detention violates due process.' },
]

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />
      <h1 className="font-heading text-4xl font-bold mb-2">Immigration Court Glossary</h1>
      <p className="text-lg text-gray-600 mb-8">
        {terms.length} key terms and definitions for understanding the U.S. immigration court system.
        From asylum to voluntary departure, this glossary covers the language used in immigration proceedings.
      </p>

      {/* Quick jump alphabet */}
      <div className="flex flex-wrap gap-1 mb-8">
        {Array.from(new Set(terms.map(t => t.term[0].toUpperCase()))).sort().map(letter => (
          <a key={letter} href={`#letter-${letter}`}
            className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors">
            {letter}
          </a>
        ))}
      </div>

      {/* Terms grouped by letter */}
      {Array.from(new Set(terms.map(t => t.term[0].toUpperCase()))).sort().map(letter => {
        const letterTerms = terms.filter(t => t.term[0].toUpperCase() === letter)
        return (
          <div key={letter} id={`letter-${letter}`} className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-primary border-b border-gray-200 pb-2 mb-4">{letter}</h2>
            <div className="space-y-4">
              {letterTerms.map(t => (
                <div key={t.term} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-2">
                    {t.term}
                    {t.link && (
                      <Link href={t.link} className="ml-2 text-sm font-normal text-primary hover:underline">
                        View data →
                      </Link>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.def}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Related */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/how-immigration-court-works" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">🏛️ How Immigration Court Works</h3>
          <p className="text-xs text-gray-600 mt-1">Step-by-step guide to the process.</p>
        </Link>
        <Link href="/faq" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">❓ FAQ</h3>
          <p className="text-xs text-gray-600 mt-1">Common questions answered.</p>
        </Link>
        <Link href="/analysis" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
          <h3 className="font-bold text-sm">📝 Analysis</h3>
          <p className="text-xs text-gray-600 mt-1">14 in-depth reports on the immigration system.</p>
        </Link>
      </div>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'Immigration Court Glossary',
        description: 'Key terms and definitions for understanding the U.S. immigration court system.',
        url: 'https://www.openimmigration.us/glossary',
        hasDefinedTerm: terms.slice(0, 10).map(t => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.def,
        })),
      }) }} />
    </div>
  )
}
