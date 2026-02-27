export interface GlossaryTerm {
  term: string
  slug: string
  def: string
  longDef: string
  link?: string
  relatedTerms: string[] // slugs
  relatedData: { label: string; href: string }[]
}

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/\(([^)]+)\)/g, '$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const rawTerms: Omit<GlossaryTerm, 'slug'>[] = [
  {
    term: 'Asylum',
    def: 'Protection granted to individuals who can prove they face persecution in their home country based on race, religion, nationality, political opinion, or membership in a particular social group. Must be applied for within one year of arrival (with exceptions).',
    longDef: `Asylum is a form of international protection recognized under U.S. and international law that allows individuals who have fled persecution in their home countries to remain in the United States legally. To qualify, an applicant must demonstrate a well-founded fear of persecution based on one of five protected grounds: race, religion, nationality, political opinion, or membership in a particular social group.

There are two pathways to asylum in the U.S. **Affirmative asylum** is filed proactively with USCIS, where an asylum officer conducts a non-adversarial interview. If not approved, the case is referred to immigration court. **Defensive asylum** is raised as a defense against removal in immigration court proceedings before an immigration judge.

Under current law, asylum applications must generally be filed within one year of the applicant's last arrival in the United States, though exceptions exist for changed or extraordinary circumstances. The one-year filing deadline is one of the most common reasons asylum claims are denied.

Asylum grant rates vary dramatically — from over 80% for applicants from certain countries to under 10% for others. Having legal representation significantly increases the likelihood of a successful outcome. Asylum seekers who are granted protection can apply for a green card after one year and eventually pursue U.S. citizenship.

The U.S. immigration court system currently has over 3 million pending cases, many of which involve asylum claims, contributing to wait times that can stretch 4-6 years or longer in some courts.`,
    link: '/asylum',
    relatedTerms: ['credible-fear-interview', 'withholding-of-removal', 'removal-proceedings', 'respondent', 'ij-immigration-judge'],
    relatedData: [
      { label: 'Asylum Case Outcomes', href: '/asylum' },
      { label: 'Asylum by Nationality', href: '/analysis/asylum-by-nationality' },
      { label: 'Court Backlog', href: '/backlog' },
    ],
  },
  {
    term: 'BIA (Board of Immigration Appeals)',
    def: 'The appellate body within EOIR that reviews immigration judge decisions. Located in Falls Church, Virginia. Most appeals are decided by a single board member reviewing the record, not a full panel hearing.',
    longDef: `The Board of Immigration Appeals (BIA) is the highest administrative body for interpreting and applying immigration law in the United States. It is housed within the Executive Office for Immigration Review (EOIR) under the Department of Justice. The BIA is located in Falls Church, Virginia, and typically does not hold in-person hearings — instead, it reviews written records and briefs from immigration court proceedings.

When a respondent or the government disagrees with an immigration judge's decision, either party may appeal to the BIA. Appeals must generally be filed within 30 days of the judge's decision. The BIA has approximately 23 board members, though the number fluctuates with appointments.

Most BIA decisions are made by a single board member through "streamlined" review, where the member can affirm the immigration judge's decision without writing a full opinion. More complex or precedent-setting cases may be referred to a three-member panel. The BIA also issues "published" or "precedent" decisions that are binding on all immigration judges nationwide, shaping how immigration law is applied across the country.

If a party disagrees with the BIA's decision, the next step is to file a petition for review with the appropriate U.S. Circuit Court of Appeals. This moves the case from the administrative system into the federal judiciary. BIA processing times vary but often take 6-12 months, adding significant time to already lengthy immigration proceedings.

The BIA's role has been controversial, with critics arguing that streamlined single-member review and high caseloads compromise the quality of appellate review.`,
    link: '/appeals',
    relatedTerms: ['eoir-executive-office-for-immigration-review', 'ij-immigration-judge', 'removal-proceedings', 'grant-of-relief', 'removal-order'],
    relatedData: [
      { label: 'Appeals Data', href: '/appeals' },
      { label: 'Judge Statistics', href: '/judges' },
      { label: 'Court Backlog', href: '/backlog' },
    ],
  },
  {
    term: 'Bond Hearing',
    def: 'A hearing where a detained immigrant asks to be released on bond. Immigration judges set bond amounts (minimum $1,500) based on flight risk and danger to community. Average bond is approximately $11,400.',
    longDef: `A bond hearing is a proceeding in immigration court where a detained noncitizen requests release from custody on bond while their removal case is pending. Bond hearings are separate from the merits of the underlying immigration case — they focus solely on whether the person should be released and, if so, at what amount.

Immigration judges consider two primary factors when deciding bond: whether the individual poses a danger to the community, and whether they are a flight risk (likely to appear for future court hearings). The minimum immigration bond is $1,500, set by statute, but actual bond amounts vary widely. The national average is approximately $11,400, though bonds can range from the minimum to $50,000 or more depending on the circumstances.

Not everyone is eligible for a bond hearing. Certain categories of individuals are subject to "mandatory detention" under the Immigration and Nationality Act — including those with certain criminal convictions, those apprehended at the border, and those subject to expedited removal. For these individuals, no bond hearing is available, and they must remain detained for the duration of their proceedings.

Bond decisions can be appealed to the Board of Immigration Appeals (BIA). If circumstances change — for example, if the person obtains an attorney, finds a sponsor, or conditions of release become available — the respondent can request a new bond hearing, known as a "bond redetermination."

Studies show that individuals released on bond are significantly more likely to obtain legal representation and ultimately win their cases than those who remain detained throughout proceedings. The bond system has been criticized for creating a two-tiered system where wealthier detainees can secure release while indigent individuals remain locked up regardless of the merits of their case.`,
    link: '/bond',
    relatedTerms: ['detained-docket', 'removal-proceedings', 'ij-immigration-judge', 'respondent', 'ice-immigration-and-customs-enforcement'],
    relatedData: [
      { label: 'Bond Data & Trends', href: '/bond' },
      { label: 'Bond System Analysis', href: '/analysis/bond-system' },
      { label: 'Detained vs Released', href: '/analysis/detained-vs-released' },
    ],
  },
  {
    term: 'Cancellation of Removal',
    def: 'A form of relief allowing certain long-term residents to avoid deportation. Requires 10 years of continuous physical presence, good moral character, and proof that removal would cause "exceptional and extremely unusual hardship" to a U.S. citizen or permanent resident spouse, parent, or child.',
    longDef: `Cancellation of removal is a discretionary form of relief from deportation available to certain long-term residents of the United States who are in removal proceedings. It comes in two forms: one for lawful permanent residents (LPRs) and one for non-permanent residents.

For **non-permanent residents** (the more commonly invoked form), the requirements are stringent. The applicant must demonstrate: (1) continuous physical presence in the U.S. for at least 10 years, (2) good moral character during that period, (3) no disqualifying criminal convictions, and (4) that removal would result in "exceptional and extremely unusual hardship" to a qualifying relative — a U.S. citizen or lawful permanent resident spouse, parent, or child.

The "exceptional and extremely unusual hardship" standard is one of the highest in immigration law. Ordinary hardship — such as economic difficulty, separation from family, or disruption of education — is generally insufficient. Applicants must show hardship far beyond what would normally be expected from deportation.

For **lawful permanent residents**, the requirements differ: 5 years of LPR status, 7 years of continuous residence, and no aggravated felony conviction. The hardship standard is lower.

Congress caps non-LPR cancellation of removal at 4,000 grants per fiscal year, making it an extremely competitive form of relief. Immigration judges have broad discretion in these cases, and outcomes vary significantly by judge and jurisdiction. If granted, the applicant receives lawful permanent resident status — a green card — regardless of how they originally entered the country.`,
    relatedTerms: ['removal-proceedings', 'removal-order', 'grant-of-relief', 'lpr-lawful-permanent-resident', 'ij-immigration-judge'],
    relatedData: [
      { label: 'Court Case Outcomes', href: '/courts' },
      { label: 'Judge Statistics', href: '/judges' },
      { label: 'Deportation Data', href: '/deportation' },
    ],
  },
  {
    term: 'CBP (Customs and Border Protection)',
    def: 'The DHS agency that patrols U.S. borders, operates ports of entry, and processes encounters with people entering or attempting to enter the U.S. without authorization.',
    longDef: `U.S. Customs and Border Protection (CBP) is the largest federal law enforcement agency in the United States, operating under the Department of Homeland Security (DHS). CBP is responsible for securing the nation's borders — both at and between official ports of entry — and facilitating lawful international trade and travel.

CBP encompasses several operational components. The **Office of Field Operations (OFO)** manages the 328 official ports of entry, including land border crossings, airports, and seaports. **U.S. Border Patrol** is responsible for securing the areas between ports of entry, primarily along the U.S.-Mexico and U.S.-Canada borders. The **Air and Marine Operations** division provides air and marine support.

When CBP encounters individuals attempting to enter the U.S. without authorization or without proper documentation, the agency processes these "encounters" and determines initial disposition — which may include apprehension, expulsion, or referral to immigration court. CBP officers issue Notices to Appear (NTAs) that initiate removal proceedings and conduct credible fear screenings for individuals expressing fear of return.

CBP encounter data is one of the most closely watched immigration metrics. In recent fiscal years, CBP has recorded over 2 million encounters annually at the southern border, though these numbers include repeat crossings by the same individuals. Encounter statistics are published monthly and are frequently cited in policy debates.

CBP has approximately 60,000 employees, including roughly 20,000 Border Patrol agents and 27,000 CBP officers, making it a massive operational force with significant impact on immigration court caseloads.`,
    link: '/border',
    relatedTerms: ['nta-notice-to-appear', 'credible-fear-interview', 'removal-proceedings', 'title-42', 'ice-immigration-and-customs-enforcement'],
    relatedData: [
      { label: 'Border Encounters', href: '/border' },
      { label: 'Drug Seizures', href: '/drug-seizures' },
      { label: 'Border to Courtroom', href: '/analysis/border-to-courtroom' },
    ],
  },
  {
    term: 'Continuance',
    def: 'A postponement of an immigration hearing to a later date. Judges grant continuances for many reasons: missing documents, pending USCIS applications, attorney scheduling, or simply an overcrowded docket. Multiple continuances can extend cases by years.',
    longDef: `A continuance in immigration court is a postponement of a scheduled hearing to a future date. Continuances are one of the primary mechanisms by which immigration cases extend over months and years, contributing significantly to the massive backlog in the immigration court system.

Immigration judges have broad discretion to grant or deny continuances. Common reasons include: the respondent needs time to find an attorney, an attorney has a scheduling conflict, the respondent is waiting on a pending application with USCIS (such as a visa petition or work permit), evidence or documents are not yet available, an interpreter is needed, or the court's own docket is overcrowded.

A single case may receive numerous continuances over its lifetime. It is not uncommon for a case to be continued 10, 15, or even 20 times before reaching a final decision. Each continuance typically pushes the next hearing out by weeks or months, depending on the court's availability. In heavily backlogged courts, a single continuance can delay the next hearing by a year or more.

The use of continuances has been a focal point of immigration court reform debates. Some argue that generous continuance policies are essential to due process — giving respondents adequate time to prepare their cases and obtain counsel. Others contend that excessive continuances contribute to a system where cases languish for years, creating uncertainty for respondents and undermining the efficiency of immigration enforcement.

Recent policy shifts have alternately encouraged and restricted the granting of continuances, with some administrations pushing judges to limit delays and others emphasizing judicial discretion and due process.`,
    relatedTerms: ['master-calendar-hearing', 'individual-hearing-merits-hearing', 'ij-immigration-judge', 'non-detained-docket', 'respondent'],
    relatedData: [
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Wait Times', href: '/wait-times' },
      { label: 'Speed of Justice', href: '/analysis/speed-of-justice' },
    ],
  },
  {
    term: 'Credible Fear Interview',
    def: 'A screening interview conducted by a USCIS asylum officer to determine if someone has a "significant possibility" of establishing eligibility for asylum. Those who pass are placed in removal proceedings with the opportunity to apply for asylum.',
    longDef: `A credible fear interview (CFI) is a threshold screening conducted by a USCIS asylum officer to determine whether an individual who has been placed in expedited removal has a credible fear of persecution or torture if returned to their home country. The standard is whether there is a "significant possibility" that the person could establish eligibility for asylum — a relatively low bar compared to the full asylum standard.

The process typically begins when someone is apprehended at or near a U.S. border and expresses a fear of returning to their country, or indicates an intention to apply for asylum. They are then referred for a credible fear interview, which usually takes place while the individual is in detention.

During the interview, an asylum officer asks about the individual's background, the harm they experienced or fear, and the reasons they cannot return. The interview is non-adversarial — there is no government attorney present — and the applicant may have a consultant (though not necessarily an attorney) present.

If the asylum officer finds that the individual has a credible fear, they are placed in full removal proceedings before an immigration judge, where they can apply for asylum, withholding of removal, or protection under the Convention Against Torture. If the officer does not find credible fear, the individual can request review by an immigration judge, who makes an independent determination.

Historically, credible fear passage rates have been relatively high — often 70-80% or more — though they fluctuate with policy changes and adjudication standards. Critics debate whether the standard is appropriately calibrated: some argue it is too easy to pass, while others contend it is a necessary safeguard to prevent refoulement (returning someone to a country where they face persecution).`,
    relatedTerms: ['asylum', 'withholding-of-removal', 'removal-proceedings', 'cbp-customs-and-border-protection', 'uscis-us-citizenship-and-immigration-services'],
    relatedData: [
      { label: 'Asylum Data', href: '/asylum' },
      { label: 'Border Encounters', href: '/border' },
      { label: 'USCIS Backlog', href: '/uscis' },
    ],
  },
  {
    term: 'DACA (Deferred Action for Childhood Arrivals)',
    def: 'A policy allowing certain individuals who came to the U.S. as children to receive renewable two-year work permits and protection from deportation. Does not provide a path to citizenship or permanent resident status.',
    longDef: `Deferred Action for Childhood Arrivals (DACA) is an executive policy established in 2012 that provides temporary protection from deportation and work authorization to certain individuals who were brought to the United States as children without legal immigration status. Often called "Dreamers," DACA recipients represent a population that grew up in the U.S., attended American schools, and in many cases consider the U.S. their only home.

To initially qualify for DACA, applicants had to meet several criteria: arrival in the U.S. before age 16, continuous residence since June 15, 2007, presence in the U.S. on June 15, 2012, no lawful immigration status, currently in school or holding a high school diploma/GED (or honorably discharged from the military), and no significant criminal history.

DACA grants a two-year period of deferred action (protection from deportation) and eligibility for an Employment Authorization Document (work permit). Recipients must renew every two years and pay a filing fee. Importantly, DACA does **not** provide lawful immigration status, a path to a green card, or eligibility for most federal benefits.

At its peak, approximately 800,000 individuals received DACA protection, though the active recipient population has declined as the program has been closed to new applicants since 2017. DACA has faced numerous legal challenges, with federal courts issuing conflicting rulings about the program's legality. As of 2025, DACA remains in legal limbo, with existing recipients able to renew but no new applications being accepted.

DACA recipients contribute significantly to the U.S. economy, with studies estimating they pay billions in taxes and hold jobs across all sectors. Legislative efforts to provide a permanent solution for Dreamers — including the DREAM Act — have repeatedly stalled in Congress.`,
    link: '/daca',
    relatedTerms: ['parole', 'lpr-lawful-permanent-resident', 'removal-proceedings', 'uscis-us-citizenship-and-immigration-services', 'title-8'],
    relatedData: [
      { label: 'DACA Recipients Data', href: '/daca' },
      { label: 'USCIS Backlog', href: '/uscis' },
      { label: 'Legal Immigration', href: '/legal-immigration' },
    ],
  },
  {
    term: 'Detained Docket',
    def: 'Cases heard in immigration courts located within or near detention facilities. Detained cases typically move faster but respondents have less access to lawyers and evidence gathering.',
    longDef: `The detained docket refers to immigration court cases where the respondent is held in ICE custody throughout their proceedings. These cases are heard in immigration courts located within or adjacent to detention facilities across the country. The detained docket operates under fundamentally different conditions than the non-detained docket, with significant implications for case outcomes.

Cases on the detained docket move much faster than non-detained cases. While a non-detained case might take 3-6 years to reach a final decision, detained cases are often resolved within weeks or months. This speed is driven by both policy (detained cases are prioritized) and practical considerations (the government bears the cost of detention, creating an incentive to resolve cases quickly).

However, the speed of detained proceedings raises serious due process concerns. Detained individuals have significantly less access to legal representation — studies show that only about 15-20% of detained respondents have attorneys, compared to roughly 60% of non-detained respondents. Detention facilities are often located in remote areas far from legal service providers, making it difficult for detainees to find counsel, gather evidence, contact witnesses, or obtain documents from their home countries.

The disparity in outcomes is stark. Represented detained individuals are far more likely to win their cases than those without counsel. Studies have consistently shown that detention reduces the likelihood of a favorable outcome, even controlling for the merits of the case.

The detained docket has grown substantially over the years as immigration detention capacity has expanded. ICE operates or contracts with over 200 detention facilities nationwide, with an average daily detained population that has ranged from 30,000 to over 50,000 in recent years.`,
    relatedTerms: ['non-detained-docket', 'bond-hearing', 'ice-immigration-and-customs-enforcement', 'removal-proceedings', 'respondent'],
    relatedData: [
      { label: 'Detained vs Released', href: '/analysis/detained-vs-released' },
      { label: 'Bond Data', href: '/bond' },
      { label: 'Representation Rates', href: '/representation' },
    ],
  },
  {
    term: 'EOIR (Executive Office for Immigration Review)',
    def: 'The Department of Justice agency that houses all U.S. immigration courts and the Board of Immigration Appeals. EOIR employs the immigration judges who hear removal cases. It is separate from USCIS (which handles applications) and ICE (which handles enforcement).',
    longDef: `The Executive Office for Immigration Review (EOIR) is the component of the U.S. Department of Justice (DOJ) responsible for adjudicating immigration cases. EOIR oversees the nation's immigration court system, the Board of Immigration Appeals (BIA), and the Office of the Chief Administrative Hearing Officer (OCAHO).

EOIR operates approximately 70 immigration courts across the United States, staffed by over 600 immigration judges. These courts handle removal proceedings — the formal process to determine whether a noncitizen should be deported or allowed to remain. The immigration courts are not part of the independent federal judiciary (Article III courts); they are administrative courts within the executive branch, meaning immigration judges serve at the direction of the Attorney General.

This structural arrangement has been a longstanding source of controversy. Because immigration judges are DOJ employees, they are subject to performance metrics, policy directives, and hiring decisions made by politically appointed officials. Critics argue this compromises judicial independence — for example, past administrations have implemented case completion quotas that pressure judges to decide cases quickly rather than thoroughly.

EOIR's caseload has grown dramatically, from roughly 250,000 pending cases a decade ago to over 3 million in 2025. This massive backlog means that many respondents wait years for their hearings, creating uncertainty and hardship. The backlog has prompted calls for structural reform, including proposals to convert immigration courts into an independent court system outside the DOJ.

EOIR also maintains the Legal Orientation Program (LOP), which provides basic legal information to detained individuals, and publishes data on court operations, case outcomes, and judge-level statistics that form the foundation of OpenImmigration's analysis.`,
    relatedTerms: ['ij-immigration-judge', 'bia-board-of-immigration-appeals', 'removal-proceedings', 'ice-immigration-and-customs-enforcement', 'uscis-us-citizenship-and-immigration-services'],
    relatedData: [
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Immigration Courts', href: '/courts' },
      { label: 'Judge Statistics', href: '/judges' },
    ],
  },
  {
    term: 'Grant of Relief',
    def: 'A favorable decision where the immigration judge allows the respondent to remain in the U.S. This includes asylum grants, cancellation of removal, adjustment of status, withholding of removal, and other forms of protection.',
    longDef: `A grant of relief in immigration court refers to any favorable decision by an immigration judge that allows a respondent to remain in the United States rather than being removed (deported). Relief can take many forms, each with different legal requirements, benefits, and long-term implications.

The most common forms of relief include: **Asylum**, which provides protection for those fleeing persecution and leads to a green card after one year. **Cancellation of removal**, available to long-term residents who meet strict eligibility requirements, which also results in a green card. **Adjustment of status**, which allows eligible individuals to obtain a green card through a family or employment petition while in proceedings. **Withholding of removal**, which prevents deportation to a specific country but does not provide a green card. **Protection under the Convention Against Torture (CAT)**, for those who can show it is more likely than not they would be tortured if returned. **Voluntary departure**, which while technically not "relief" in the traditional sense, allows someone to leave on their own terms without a removal order.

Grant rates vary enormously across the immigration court system. Nationally, approximately 30-40% of cases that reach a decision result in some form of relief, but this figure masks huge variation by court location, judge, nationality of the respondent, and whether the respondent has legal representation. Some judges grant relief in over 80% of cases while others grant in fewer than 5%.

Having an attorney is the single most significant factor in obtaining relief. Represented respondents are up to five times more likely to receive a favorable outcome compared to those proceeding without counsel.`,
    relatedTerms: ['asylum', 'cancellation-of-removal', 'withholding-of-removal', 'voluntary-departure', 'ij-immigration-judge'],
    relatedData: [
      { label: 'Asylum Outcomes', href: '/asylum' },
      { label: 'Judge Grant Rates', href: '/judges' },
      { label: 'Representation Gap', href: '/analysis/representation-gap' },
    ],
  },
  {
    term: 'ICE (Immigration and Customs Enforcement)',
    def: 'The DHS agency responsible for interior immigration enforcement, detention, and removal. ICE attorneys serve as the "prosecution" in immigration court, arguing for the deportation of respondents.',
    longDef: `U.S. Immigration and Customs Enforcement (ICE) is the Department of Homeland Security (DHS) agency responsible for enforcing federal immigration law within the interior of the United States. Created in 2003 as part of the post-9/11 reorganization of the federal government, ICE has two main operational divisions: Enforcement and Removal Operations (ERO) and Homeland Security Investigations (HSI).

**ERO** is the division most directly involved in immigration court proceedings. ERO identifies, arrests, detains, and removes noncitizens who are in violation of immigration law. ERO operates the nation's immigration detention system, manages alternatives to detention (such as ankle monitors and check-ins), and carries out deportation flights. ERO's arrest and removal statistics are closely tracked metrics in immigration policy debates.

**HSI** investigates transnational crime, including human trafficking, smuggling, cybercrime, and financial crimes. While important, HSI's work is less directly connected to immigration court proceedings.

In immigration court, ICE is represented by **Office of the Principal Legal Advisor (OPLA)** attorneys, who serve as the government's prosecutors. These attorneys argue for the removal of respondents, cross-examine witnesses, and can appeal immigration judge decisions to the BIA. The dynamic in immigration court is essentially ICE attorney versus respondent (who may or may not have their own attorney).

ICE's enforcement priorities have shifted significantly across administrations, ranging from focusing on individuals with serious criminal records to broader enforcement against any removable noncitizen. These shifting priorities directly impact immigration court caseloads and the types of cases judges hear.

ICE's annual budget exceeds $8 billion, and the agency employs approximately 20,000 people, making it a central player in the U.S. immigration system.`,
    link: '/enforcement',
    relatedTerms: ['cbp-customs-and-border-protection', 'removal-order', 'detained-docket', 'eoir-executive-office-for-immigration-review', 'removal-proceedings'],
    relatedData: [
      { label: 'ICE Enforcement Data', href: '/enforcement' },
      { label: 'Deportation Statistics', href: '/deportation' },
      { label: 'Deportation Machine', href: '/analysis/deportation-machine' },
    ],
  },
  {
    term: 'IJ (Immigration Judge)',
    def: 'A DOJ attorney appointed to preside over immigration court proceedings. Immigration judges are not Article III judges — they are employees of the executive branch (DOJ), which critics argue compromises judicial independence.',
    longDef: `Immigration judges (IJs) are attorneys appointed by the Attorney General to preside over immigration court proceedings within the Executive Office for Immigration Review (EOIR). Unlike federal judges who enjoy lifetime appointments and constitutional protections of independence, immigration judges are executive branch employees who serve at the pleasure of the Attorney General.

There are currently over 600 immigration judges serving in approximately 70 immigration courts across the country. They are responsible for conducting removal hearings, making decisions on applications for relief (such as asylum, cancellation of removal, and withholding of removal), setting bond, and managing their dockets.

Immigration judges wield enormous power — their decisions determine whether individuals are allowed to remain in the United States or are deported. Yet they operate under significant constraints. They face mounting caseloads (some judges have over 4,000 pending cases), administrative pressure to meet case completion targets, and limited support staff compared to other judicial systems.

The lack of structural independence is a defining feature of the immigration court system. The Attorney General can issue decisions that bind all immigration judges, effectively setting legal precedent through a political appointee rather than an independent judiciary. Past Attorneys General have used this power to restrict asylum eligibility, limit continuances, and alter procedural rules.

Judge-to-judge variation in outcomes is striking. OpenImmigration data shows that asylum grant rates can vary from under 5% to over 90% depending on the assigned judge, even within the same court. This "judge roulette" effect means that the outcome of a case may depend as much on which judge hears it as on the merits of the claim.

The immigration judge corps has experienced significant hiring waves and attrition. Burnout, politicization, and working conditions have contributed to turnover, with the judges' union (NAIJ) advocating for independent court status.`,
    link: '/judges',
    relatedTerms: ['eoir-executive-office-for-immigration-review', 'bia-board-of-immigration-appeals', 'removal-proceedings', 'grant-of-relief', 'master-calendar-hearing'],
    relatedData: [
      { label: 'Judge Statistics', href: '/judges' },
      { label: 'Judge Roulette Analysis', href: '/analysis/judge-variation' },
      { label: 'Court Backlog', href: '/backlog' },
    ],
  },
  {
    term: 'In Absentia Order',
    def: 'A removal order issued when a respondent fails to appear for their immigration hearing. The judge may order deportation without the person present. Can sometimes be reopened if the person shows the absence was due to exceptional circumstances or lack of proper notice.',
    longDef: `An in absentia removal order is issued by an immigration judge when a respondent fails to appear for a scheduled court hearing. Under the Immigration and Nationality Act, if the respondent has been properly served with notice of the hearing and does not attend, the judge may proceed in their absence and order removal based on the charges in the Notice to Appear (NTA).

In absentia orders have become increasingly common as the immigration court backlog has grown. With hearings often scheduled years after the initial NTA is filed, respondents may have moved, lost track of hearing dates, or never received proper notice. EOIR data shows that in absentia rates have exceeded 40% in some recent fiscal years, meaning nearly half of scheduled hearings resulted in no-show orders.

There are pathways to reopen an in absentia order, but they are limited. A respondent can file a motion to reopen if they can demonstrate: (1) they did not receive proper notice of the hearing, (2) they were in federal or state custody at the time, or (3) exceptional circumstances prevented their attendance (such as a serious illness, death in the family, or natural disaster). Motions based on lack of notice have no time limit, but motions based on exceptional circumstances must generally be filed within 180 days.

The in absentia issue highlights systemic problems in the immigration court system. Many respondents, particularly those without attorneys, do not understand the notice system, cannot read English-language court documents, or have addresses that change frequently. Some may never receive the hearing notice at all if it is sent to an outdated address.

Research suggests that respondents with legal representation are significantly less likely to receive in absentia orders, underscoring the importance of access to counsel in the immigration system.`,
    link: '/analysis/in-absentia',
    relatedTerms: ['removal-order', 'nta-notice-to-appear', 'removal-proceedings', 'respondent', 'master-calendar-hearing'],
    relatedData: [
      { label: 'In Absentia Analysis', href: '/analysis/in-absentia' },
      { label: 'Representation Rates', href: '/representation' },
      { label: 'Court Backlog', href: '/backlog' },
    ],
  },
  {
    term: 'Individual Hearing (Merits Hearing)',
    def: 'The full trial-like hearing where an immigration judge considers evidence, hears testimony, and makes a decision on a case. Distinguished from a "master calendar hearing," which is a short scheduling or procedural appearance.',
    longDef: `An individual hearing, also called a merits hearing, is the full evidentiary hearing in immigration court where the substance of a respondent's case is decided. This is the trial-like proceeding where the immigration judge hears testimony, considers documentary evidence, and ultimately decides whether to grant relief or order removal.

Individual hearings are distinguished from master calendar hearings, which are brief procedural appearances for scheduling and preliminary matters. While a master calendar hearing might last only a few minutes, an individual hearing can last several hours or even span multiple days for complex cases.

During an individual hearing, the respondent (or their attorney) presents their case for relief. This may include the respondent's own testimony about their experiences, testimony from expert witnesses (such as country conditions experts or psychologists), and documentary evidence such as country reports, medical records, personal declarations, and supporting affidavits. The ICE trial attorney cross-examines witnesses and may present the government's evidence.

The immigration judge evaluates the credibility of the respondent's testimony, applies the relevant legal standards, and issues a decision — either orally from the bench at the conclusion of the hearing or in a written decision issued later. The judge may grant some form of relief (asylum, cancellation of removal, etc.), deny all relief and order removal, or grant voluntary departure.

Preparation for an individual hearing is intensive and is a primary reason why legal representation is so critical. Attorneys help clients compile evidence, prepare testimony, identify legal arguments, and present their case in a structured manner. Unrepresented respondents often struggle to navigate the complex evidentiary and procedural requirements, significantly reducing their chances of a favorable outcome.

Wait times for individual hearings have grown substantially, with some courts scheduling merits hearings 4-6 years after the initial master calendar hearing.`,
    relatedTerms: ['master-calendar-hearing', 'ij-immigration-judge', 'grant-of-relief', 'removal-order', 'respondent'],
    relatedData: [
      { label: 'Wait Times', href: '/wait-times' },
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Representation Gap', href: '/analysis/representation-gap' },
    ],
  },
  {
    term: 'LPR (Lawful Permanent Resident)',
    def: 'A foreign national authorized to live and work permanently in the United States, commonly known as a "green card holder." LPRs can be placed in removal proceedings if they commit certain crimes or fraud.',
    longDef: `A Lawful Permanent Resident (LPR) is a foreign national who has been granted authorization to live and work in the United States on a permanent basis. Commonly known as "green card holders," LPRs hold one of the most secure immigration statuses available, though it falls short of U.S. citizenship.

LPR status can be obtained through several pathways: **family-based immigration** (sponsorship by a U.S. citizen or LPR family member), **employment-based immigration** (employer sponsorship, often requiring labor certification), the **diversity visa lottery**, **refugee or asylee adjustment**, and certain **special immigrant categories** (including SIJS for abused children and religious workers).

As LPRs, individuals can live and work anywhere in the United States without restriction, travel internationally (with some limitations), sponsor certain family members for immigration, and after meeting residency requirements, apply for U.S. citizenship through naturalization.

However, LPR status is not irrevocable. Green card holders can be placed in removal proceedings if they commit certain criminal offenses (particularly "aggravated felonies" as defined by immigration law), commit fraud, abandon their permanent residence, or are found to have been ineligible for their green card in the first place. LPRs in removal proceedings may be eligible for cancellation of removal if they meet the requirements (5 years of LPR status and 7 years of continuous residence).

The number of green cards issued annually is capped at approximately 1 million, with the largest categories being family-based (about 65%) and employment-based (about 15%). Wait times for green cards can be extraordinary — some family-based categories have backlogs exceeding 20 years, and employment-based applicants from high-demand countries like India face similar delays.`,
    link: '/green-card',
    relatedTerms: ['cancellation-of-removal', 'removal-proceedings', 'pd-priority-date', 'naturalization', 'uscis-us-citizenship-and-immigration-services'],
    relatedData: [
      { label: 'Green Card Data', href: '/green-card' },
      { label: 'Legal Immigration', href: '/legal-immigration' },
      { label: 'Naturalization', href: '/naturalization' },
    ],
  },
  {
    term: 'Master Calendar Hearing',
    def: 'A short procedural hearing — typically a few minutes — where the judge confirms the charges, takes pleadings, sets future hearing dates, and addresses preliminary matters. Multiple cases are scheduled in the same block.',
    longDef: `A master calendar hearing (MCH) is the initial and procedural phase of immigration court proceedings. Think of it as analogous to an arraignment or pre-trial hearing in criminal court — it is a brief appearance, typically lasting only a few minutes per case, where preliminary matters are addressed before the case proceeds to a full individual (merits) hearing.

During a master calendar hearing, several key events occur. The immigration judge reads the charges listed in the Notice to Appear (NTA) and asks the respondent to admit or deny the factual allegations. The respondent indicates whether they wish to designate a country of removal and whether they will be seeking any form of relief (such as asylum). The judge may ask about the need for an interpreter, the status of legal representation, and any other preliminary matters. Finally, the judge schedules the next hearing — either another master calendar hearing or an individual hearing.

Master calendar hearings are scheduled in blocks, with multiple cases (sometimes 30-50 or more) set for the same time slot. This creates a "cattle call" atmosphere that has been widely criticized — respondents, many of whom do not speak English and do not have lawyers, wait for hours as the judge works through the docket one case at a time.

For unrepresented respondents, the master calendar hearing can be confusing and intimidating. They may not understand the charges, the options for relief, or the consequences of their responses. Legal orientation programs and pro bono attorneys at some courts try to provide basic guidance, but many respondents navigate this critical stage alone.

A case may have multiple master calendar hearings before an individual hearing is scheduled — particularly if the respondent is seeking an attorney, waiting for a USCIS decision, or requires additional time. Each continuance at the master calendar stage adds to the overall backlog.`,
    relatedTerms: ['individual-hearing-merits-hearing', 'nta-notice-to-appear', 'continuance', 'ij-immigration-judge', 'respondent'],
    relatedData: [
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Wait Times', href: '/wait-times' },
      { label: 'Speed of Justice', href: '/analysis/speed-of-justice' },
    ],
  },
  {
    term: 'NTA (Notice to Appear)',
    def: 'The charging document that initiates removal proceedings. Filed by DHS (usually ICE or CBP), it lists the factual allegations and charges of removability against the respondent. Receipt of an NTA is the starting point of an immigration court case.',
    longDef: `The Notice to Appear (NTA) is the foundational charging document in immigration court proceedings — it is the formal instrument by which the Department of Homeland Security (DHS) initiates removal proceedings against a noncitizen. The NTA is analogous to an indictment or complaint in criminal or civil court and serves as the jurisdictional basis for the immigration court to hear the case.

An NTA contains several required elements: the respondent's identifying information, the factual allegations underlying the charges (such as entering without inspection, overstaying a visa, or committing a criminal offense), the specific statutory charges of removability under the Immigration and Nationality Act, and the time and place of the initial hearing. The NTA must be served on the respondent and filed with the immigration court to vest the court with jurisdiction.

NTAs are issued by various DHS components, primarily ICE's Enforcement and Removal Operations (ERO) and Customs and Border Protection (CBP). The circumstances triggering an NTA issuance vary widely — from border apprehensions to interior arrests to referrals from USCIS when an application is denied.

A significant legal development in recent years has been the Supreme Court's interpretation of NTA requirements. In *Pereira v. Sessions* (2018), the Court held that an NTA that does not specify the time and place of the hearing does not trigger certain legal consequences. This decision spawned extensive litigation about "defective" NTAs, as DHS has historically issued many NTAs without complete hearing information (adding the date later via a separate notice).

The volume of NTAs issued has enormous downstream effects on immigration courts. Spikes in NTA filings — often corresponding to surges in border encounters or changes in enforcement priorities — create waves of new cases that exacerbate the court backlog, sometimes by hundreds of thousands of cases in a single year.`,
    relatedTerms: ['removal-proceedings', 'cbp-customs-and-border-protection', 'ice-immigration-and-customs-enforcement', 'respondent', 'master-calendar-hearing'],
    relatedData: [
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Border Encounters', href: '/border' },
      { label: 'Border to Courtroom', href: '/analysis/border-to-courtroom' },
    ],
  },
  {
    term: 'Non-Detained Docket',
    def: 'Cases where the respondent is not in ICE custody. These cases typically take much longer to resolve due to scheduling backlogs and continuances. The vast majority of pending cases are on the non-detained docket.',
    longDef: `The non-detained docket refers to immigration court cases where the respondent is not in ICE custody during proceedings. These individuals may have been released on bond, paroled, released on their own recognizance, or may never have been detained at all. The non-detained docket represents the vast majority of pending immigration cases — approximately 90% or more of the total backlog.

Non-detained cases operate on a fundamentally different timeline than detained cases. While detained cases are prioritized and often resolved within weeks or months, non-detained cases can take years — in many courts, 4-6 years or longer — to reach a final hearing. This is because immigration courts schedule detained cases first (due to the cost and liberty implications of detention), pushing non-detained cases further and further into the future.

The extended timeline of the non-detained docket has both advantages and disadvantages for respondents. On the positive side, individuals living in the community have much greater access to legal representation, can work (if authorized), maintain family ties, and gather evidence for their cases. Studies consistently show that non-detained respondents have significantly better outcomes than detained individuals, in large part because they are more likely to have attorneys.

On the negative side, years of uncertainty take a psychological toll on respondents and their families. Lives remain in limbo as individuals wait for resolution. Some respondents move, lose contact with their attorneys, or miss hearing notices during the lengthy wait — resulting in in absentia removal orders.

The non-detained docket's massive backlog is the defining challenge of the U.S. immigration court system, with over 3 million pending cases as of 2025.`,
    relatedTerms: ['detained-docket', 'continuance', 'in-absentia-order', 'bond-hearing', 'removal-proceedings'],
    relatedData: [
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Wait Times', href: '/wait-times' },
      { label: 'Backlog Crisis Analysis', href: '/analysis/backlog-crisis' },
    ],
  },
  {
    term: 'Parole',
    def: 'Temporary permission to enter or remain in the U.S. granted on a case-by-case basis for urgent humanitarian reasons or significant public benefit. Parole does not constitute formal "admission" and can be revoked.',
    longDef: `Parole is a mechanism in U.S. immigration law that allows the Department of Homeland Security to permit individuals to enter or remain in the United States temporarily without being formally "admitted." Under Section 212(d)(5) of the Immigration and Nationality Act, parole may be granted on a case-by-case basis for "urgent humanitarian reasons" or "significant public benefit."

Parole has been used in a variety of contexts throughout immigration history. **Humanitarian parole** is granted to individuals facing emergencies such as medical treatment needs, family crises, or threats to personal safety. **Public interest parole** is used for situations like allowing witnesses to enter for legal proceedings or enabling individuals to participate in programs deemed beneficial to the U.S.

In recent years, parole has become a significant policy tool through large-scale programs. The Biden administration created parole programs for nationals of Cuba, Haiti, Nicaragua, and Venezuela (CHNV), as well as the Uniting for Ukraine program, allowing individuals from these countries to enter the U.S. temporarily with a sponsor. These programs paroled hundreds of thousands of individuals, drawing both praise (for providing orderly alternatives to irregular border crossing) and criticism (for what opponents characterized as exceeding the statutory "case-by-case" requirement).

Critically, parole does not constitute formal admission to the United States. Parolees do not have immigrant or nonimmigrant status, cannot independently adjust to permanent residence (without an independent basis), and their parole can be revoked at any time. Parole is temporary — it expires at the end of the designated period, and the individual must then depart, seek another status, or face potential removal proceedings.

The legal status and future of large-scale parole programs remains a contested area of immigration policy and litigation.`,
    relatedTerms: ['daca-deferred-action-for-childhood-arrivals', 'tps-temporary-protected-status', 'removal-proceedings', 'lpr-lawful-permanent-resident', 'cbp-customs-and-border-protection'],
    relatedData: [
      { label: 'Legal Immigration', href: '/legal-immigration' },
      { label: 'Border Encounters', href: '/border' },
      { label: 'USCIS Backlog', href: '/uscis' },
    ],
  },
  {
    term: 'PD (Priority Date)',
    def: 'The date that establishes an immigrant\'s place in line for a visa. For family-based cases, it\'s when the petition is filed. For employment-based cases, it varies. Wait times from priority date to visa availability can be decades.',
    longDef: `The priority date (PD) is the date that establishes an immigrant's position in the queue for a green card (permanent residence). Because the number of immigrant visas issued each year is limited by statutory caps and per-country limits, the priority date determines when an applicant can take the final steps toward obtaining their green card.

For **family-based immigration**, the priority date is typically the date when the U.S. citizen or LPR sponsor files the I-130 petition with USCIS. For **employment-based immigration**, the priority date is usually the date the labor certification application (PERM) is filed with the Department of Labor, or the date the I-140 petition is filed if no labor certification is required.

The U.S. Department of State publishes a monthly **Visa Bulletin** that lists "cutoff dates" for each preference category and country of chargeability. If an applicant's priority date is earlier than the cutoff date listed in the bulletin, their visa number is "current" and they can proceed with their green card application (adjustment of status or consular processing).

Wait times vary enormously depending on the category and country of origin. Some categories have no backlog and are immediately available. Others have crushing delays. For example, Filipino siblings of U.S. citizens (F4 category) have faced wait times exceeding 20 years. Indian nationals in the EB-2 and EB-3 employment-based categories face backlogs estimated at decades.

The per-country limit — which caps any single country at 7% of the total immigrant visas available in a category — disproportionately affects applicants from high-demand countries like India, China, Mexico, and the Philippines. Reform proposals such as eliminating or raising per-country caps have been debated for years but have not been enacted.`,
    relatedTerms: ['lpr-lawful-permanent-resident', 'uscis-us-citizenship-and-immigration-services', 'cancellation-of-removal', 'removal-proceedings', 'title-8'],
    relatedData: [
      { label: 'Green Card Data', href: '/green-card' },
      { label: 'Legal Immigration', href: '/legal-immigration' },
      { label: 'USCIS Backlog', href: '/uscis' },
    ],
  },
  {
    term: 'Removal Proceedings',
    def: 'The formal process in immigration court where a judge determines whether a foreign national should be ordered removed (deported) from the United States or allowed to remain under some form of relief.',
    longDef: `Removal proceedings are the formal legal process conducted in U.S. immigration courts to determine whether a noncitizen should be ordered removed (deported) from the United States or allowed to remain under some form of legal protection. These proceedings are initiated when the Department of Homeland Security files a Notice to Appear (NTA) with the immigration court.

Removal proceedings follow a general structure. They begin with one or more **master calendar hearings**, where the judge addresses preliminary matters, takes the respondent's pleadings on the charges, and schedules future hearings. The case then progresses to an **individual hearing** (merits hearing), where the judge hears testimony, considers evidence, and makes a decision.

Throughout proceedings, the respondent may apply for various forms of relief: asylum, withholding of removal, protection under the Convention Against Torture, cancellation of removal, adjustment of status, voluntary departure, or other applicable forms of protection. The burden is on the respondent to prove eligibility for any relief sought.

Immigration proceedings are civil, not criminal, in nature. This distinction has significant legal implications. Most importantly, there is no constitutional right to appointed counsel in immigration court — unlike criminal defendants, respondents in removal proceedings must find and pay for their own attorneys or go without. There is also no right to a jury trial.

However, respondents do retain certain constitutional protections, including due process rights under the Fifth Amendment. They must receive proper notice, have the opportunity to present evidence, and be heard by a neutral decision-maker.

The current immigration court system handles over 3 million pending cases, with completion times averaging 2-4 years and stretching much longer in many jurisdictions. This massive caseload raises fundamental questions about due process, efficiency, and the structural adequacy of the system.`,
    relatedTerms: ['nta-notice-to-appear', 'master-calendar-hearing', 'individual-hearing-merits-hearing', 'ij-immigration-judge', 'grant-of-relief'],
    relatedData: [
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Case Charges', href: '/charges' },
      { label: 'Wait Times', href: '/wait-times' },
    ],
  },
  {
    term: 'Removal Order',
    def: 'A judge\'s order requiring a person to leave the United States. Can be executed by ICE immediately (for detained individuals) or at a later date. A removal order carries a bar on future re-entry (typically 10 years).',
    longDef: `A removal order is a formal order issued by an immigration judge requiring a noncitizen to leave the United States. It is the most consequential adverse outcome in immigration court proceedings, carrying both immediate and long-term legal consequences.

When an immigration judge orders removal, the order may be executed in different ways depending on the circumstances. For **detained individuals**, ICE's Enforcement and Removal Operations may execute the removal relatively quickly — often within days or weeks — by arranging transportation (typically deportation flights) to the individual's country of origin or last residence. For **non-detained individuals**, execution of the removal order may be deferred, and the person may be given a period to arrange their departure.

The legal consequences of a removal order extend far beyond physical departure. A formal removal order triggers a statutory bar on re-entry to the United States — typically **10 years**, though the bar can be **20 years** for repeat offenders or **permanent** for those with certain criminal convictions. Individuals who re-enter the U.S. after being removed may face federal criminal prosecution for illegal re-entry, which carries potential prison sentences.

Removal orders can be appealed to the Board of Immigration Appeals (BIA) within 30 days. Filing an appeal does not automatically stay (pause) the execution of the order for detained individuals, though a stay can be requested. If the BIA upholds the order, the next recourse is a petition for review to the applicable U.S. Circuit Court of Appeals.

In some cases, removal orders are issued **in absentia** when the respondent fails to appear for a hearing. These orders can be challenging to reopen but are not impossible if the respondent can show lack of notice or exceptional circumstances.

Removal orders may also be issued through **expedited removal** or **stipulated removal** processes, which bypass full immigration court proceedings.`,
    link: '/deportation',
    relatedTerms: ['removal-proceedings', 'in-absentia-order', 'voluntary-departure', 'bia-board-of-immigration-appeals', 'ice-immigration-and-customs-enforcement'],
    relatedData: [
      { label: 'Deportation Statistics', href: '/deportation' },
      { label: 'Deportation Machine', href: '/analysis/deportation-machine' },
      { label: 'In Absentia Analysis', href: '/analysis/in-absentia' },
    ],
  },
  {
    term: 'Respondent',
    def: 'The person facing removal proceedings in immigration court — equivalent to a "defendant" in criminal court. Immigration court uses civil, not criminal, terminology.',
    longDef: `In U.S. immigration court, the person facing removal proceedings is called the "respondent." This term reflects the civil nature of immigration proceedings — unlike criminal court, where the accused is called the "defendant," immigration court uses its own terminology to distinguish the administrative process from the criminal justice system.

The respondent is the individual whom the Department of Homeland Security has charged with being removable from the United States. They are named in the Notice to Appear (NTA) and appear before an immigration judge who will determine their case. The government is represented by an ICE trial attorney, who argues for the respondent's removal.

Respondents in immigration court come from all walks of life and circumstances. They may be asylum seekers fleeing persecution, long-term residents who committed criminal offenses, individuals who overstayed visas, people apprehended at the border, or family members of U.S. citizens caught in technical immigration violations. The diversity of respondents' backgrounds and claims contributes to the complexity of the immigration court system.

One of the most significant aspects of being a respondent in immigration court is the lack of a guaranteed right to counsel. Unlike criminal proceedings, where the Sixth Amendment ensures representation for those who cannot afford an attorney, immigration respondents must secure their own legal representation or proceed pro se (without an attorney). Studies estimate that roughly 40% of respondents in immigration court are unrepresented, a figure that rises to over 80% for detained individuals.

The disparity in outcomes between represented and unrepresented respondents is dramatic. Research consistently shows that respondents with attorneys are 3-5 times more likely to obtain a favorable outcome. For asylum seekers specifically, having an attorney can increase the grant rate from single digits to over 50%, highlighting the critical importance of legal representation in these proceedings.`,
    relatedTerms: ['removal-proceedings', 'nta-notice-to-appear', 'ij-immigration-judge', 'ice-immigration-and-customs-enforcement', 'grant-of-relief'],
    relatedData: [
      { label: 'Representation Rates', href: '/representation' },
      { label: 'Representation Gap', href: '/analysis/representation-gap' },
      { label: 'Court Statistics', href: '/courts' },
    ],
  },
  {
    term: 'SIJS (Special Immigrant Juvenile Status)',
    def: 'A pathway to a green card for children who have been abused, neglected, or abandoned by a parent. Requires a state court finding of dependency and a USCIS application. Has a significant backlog, with many children aging out before approval.',
    longDef: `Special Immigrant Juvenile Status (SIJS) is a humanitarian immigration protection designed for children in the United States who have been abused, neglected, or abandoned by one or both parents. SIJS provides a pathway to lawful permanent residence (a green card) for vulnerable young people who cannot safely return to their home countries due to family circumstances.

The SIJS process involves two separate legal systems. First, the child must obtain a **Special Findings Order** from a state court (typically a juvenile, family, or probate court) that makes specific findings: the child is dependent on the court or has been placed in the custody of a state agency, department, or individual; reunification with one or both parents is not viable due to abuse, neglect, or abandonment; and it would not be in the child's best interest to be returned to their home country.

Second, with the state court order in hand, the child files a petition (Form I-360) with USCIS seeking classification as a Special Immigrant Juvenile. If USCIS approves the I-360 and a visa number is available, the child can then apply for adjustment of status to become a lawful permanent resident.

However, significant backlogs plague the SIJS system. Due to per-country visa limits, children from countries like El Salvador, Guatemala, Honduras, India, and Mexico may wait years for a visa number to become available. During this waiting period, children continue to age — and if they turn 21 before their visa becomes current, they risk "aging out" and losing eligibility. Congress has provided some protections against aging out, but the system remains imperfect.

The SIJS backlog is particularly cruel because it affects some of the most vulnerable individuals in the immigration system — children who have already experienced abuse or abandonment and who face prolonged uncertainty about their legal status and future.`,
    relatedTerms: ['lpr-lawful-permanent-resident', 'uscis-us-citizenship-and-immigration-services', 'uac-unaccompanied-alien-child', 'removal-proceedings', 'pd-priority-date'],
    relatedData: [
      { label: 'Children in Immigration', href: '/children' },
      { label: 'Children in Court', href: '/analysis/children-in-court' },
      { label: 'USCIS Backlog', href: '/uscis' },
    ],
  },
  {
    term: 'Stipulated Removal',
    def: 'An agreement where the respondent consents to be removed without a full hearing, often in exchange for certain conditions. Common in cases where the person wants to leave quickly to avoid prolonged detention.',
    longDef: `Stipulated removal is a process by which a respondent in immigration court agrees to waive their right to a full hearing and consents to a removal order. Essentially, the respondent and the government reach an agreement that the person will be ordered removed without contesting the charges or seeking relief before an immigration judge.

Stipulated removal orders must be reviewed and approved by an immigration judge to ensure that the respondent's waiver is knowing and voluntary. The judge typically confirms on the record that the respondent understands the consequences of agreeing to removal — including the re-entry bars and the waiver of any claims to relief — and that no one has coerced or pressured the person into the agreement.

There are several reasons a respondent might agree to stipulated removal. For detained individuals, it offers a way to leave custody more quickly rather than waiting weeks or months for a hearing. Some respondents have no viable claims to relief and prefer to be removed quickly so they can return to their families abroad. In some cases, the government may agree to favorable conditions — such as allowing voluntary departure rather than a formal removal order, or agreeing not to pursue criminal charges.

However, stipulated removal has been criticized, particularly when involving detained individuals who lack legal representation. Without an attorney to explain the consequences and evaluate potential claims to relief, respondents may unknowingly waive valid defenses to removal. Pro se respondents may not understand that they could qualify for asylum, cancellation of removal, or other forms of protection.

The use of stipulated removal has varied across administrations and jurisdictions. Some courts and ICE offices rely on it heavily as a docket management tool, while others use it sparingly. Advocates have pushed for stronger safeguards to ensure that stipulated removals are truly voluntary and informed.`,
    relatedTerms: ['removal-order', 'voluntary-departure', 'removal-proceedings', 'detained-docket', 'respondent'],
    relatedData: [
      { label: 'Deportation Statistics', href: '/deportation' },
      { label: 'Court Backlog', href: '/backlog' },
      { label: 'Detained vs Released', href: '/analysis/detained-vs-released' },
    ],
  },
  {
    term: 'TPS (Temporary Protected Status)',
    def: 'A designation allowing nationals of certain countries to live and work in the U.S. temporarily due to ongoing armed conflict, natural disasters, or other extraordinary conditions in their home country. Must be redesignated periodically by the Secretary of Homeland Security.',
    longDef: `Temporary Protected Status (TPS) is a humanitarian immigration program that allows nationals of designated countries to live and work in the United States when conditions in their home country make safe return impossible or unreasonable. The Secretary of Homeland Security can designate a country for TPS based on three conditions: ongoing armed conflict, environmental disaster, or other extraordinary and temporary conditions.

TPS was created by the Immigration Act of 1990 and has been used to protect nationals of numerous countries over the decades. As of 2025, TPS-designated countries include El Salvador, Haiti, Honduras, Nepal, Nicaragua, Somalia, South Sudan, Sudan, Syria, Ukraine, Venezuela, Yemen, and several others. The number of TPS holders is estimated at over 800,000.

To qualify for TPS, individuals must have been continuously physically present in the U.S. since a specified date, meet filing deadlines, and have no disqualifying criminal history. TPS must be redesignated or extended periodically by the Secretary of Homeland Security — designations are not permanent and can be terminated if the Secretary determines that conditions in the home country have improved sufficiently.

TPS provides two main benefits: protection from removal (deportation) and eligibility for Employment Authorization Documents (work permits). TPS holders can also obtain travel authorization to leave and re-enter the U.S. However, TPS does not independently lead to a green card or citizenship — it is temporary by design.

The temporary nature of TPS has become one of its most controversial aspects. Many TPS holders have lived in the U.S. for 20+ years under successive redesignations, building families, businesses, and deep community roots. Their status remains precarious, subject to political decisions about whether to extend or terminate their designations. Advocates have pushed for legislation granting TPS holders a path to permanent residence, arguing that "temporary" has become permanent in practice.`,
    link: '/tps',
    relatedTerms: ['parole', 'daca-deferred-action-for-childhood-arrivals', 'uscis-us-citizenship-and-immigration-services', 'removal-proceedings', 'lpr-lawful-permanent-resident'],
    relatedData: [
      { label: 'TPS Data', href: '/tps' },
      { label: 'TPS Trap Analysis', href: '/analysis/tps-trap' },
      { label: 'Legal Immigration', href: '/legal-immigration' },
    ],
  },
  {
    term: 'Title 8',
    def: 'The section of U.S. federal law that governs immigration and nationality. Standard removal proceedings, asylum, and most immigration court matters fall under Title 8 authority.',
    longDef: `Title 8 of the United States Code is the body of federal law that governs immigration and nationality in the United States. It contains the Immigration and Nationality Act (INA), the foundational statute that defines the rules for entering, remaining in, and being removed from the country. Virtually every aspect of the immigration system — from visa categories to removal proceedings to naturalization — is rooted in Title 8.

Title 8 establishes the categories of immigrants and nonimmigrants, sets annual visa limits, defines the grounds for inadmissibility and deportability, creates the asylum system, authorizes the immigration court system, and outlines the naturalization process. The INA, originally enacted in 1952 and substantially amended many times since, is the core statute within Title 8.

In the context of immigration enforcement, "Title 8" is often used to distinguish standard immigration processing from other authorities. During the COVID-19 pandemic, the government relied on **Title 42** — a public health authority — to expel migrants at the border without standard immigration procedures. The distinction between Title 8 and Title 42 processing became a major policy flashpoint: Title 8 processing involves formal immigration proceedings with access to asylum and other protections, while Title 42 allowed rapid expulsion without such opportunities.

With the end of Title 42 on May 11, 2023, all border processing reverted to Title 8 authority. Under Title 8, individuals who are apprehended or who present themselves at ports of entry are processed through the standard immigration system — which may include credible fear interviews, issuance of Notices to Appear, and placement in removal proceedings before immigration judges.

Title 8 also establishes criminal penalties for immigration violations, including illegal entry (a misdemeanor) and illegal re-entry after removal (a felony), bridging the immigration and criminal justice systems.`,
    relatedTerms: ['title-42', 'removal-proceedings', 'nta-notice-to-appear', 'asylum', 'cbp-customs-and-border-protection'],
    relatedData: [
      { label: 'Court Case Data', href: '/courts' },
      { label: 'Border Encounters', href: '/border' },
      { label: 'Legal Immigration', href: '/legal-immigration' },
    ],
  },
  {
    term: 'Title 42',
    def: 'A public health authority used from 2020-2023 to quickly expel migrants at the border without standard immigration processing, citing COVID-19 pandemic risks. Ended May 11, 2023.',
    longDef: `Title 42 refers to Section 265 of Title 42 of the United States Code, a public health authority that grants the CDC Director and the Secretary of Health and Human Services the power to prohibit the introduction of persons into the United States when there is a "serious danger" of introducing a communicable disease.

In March 2020, at the outset of the COVID-19 pandemic, the CDC issued an order under Title 42 directing CBP to rapidly expel noncitizens arriving at the U.S. land borders. The stated rationale was that congregate settings in immigration processing facilities posed a risk of disease transmission. Under this authority, individuals encountered at the border were expelled — often within hours — without the standard immigration proceedings that would occur under Title 8.

Title 42 fundamentally altered border processing. Rather than being placed in removal proceedings, screened for asylum, or processed through the standard immigration system, individuals were simply turned back across the border. Between March 2020 and May 2023, over 2.8 million expulsions were carried out under Title 42 authority.

The policy was deeply controversial. Supporters argued it was a necessary public health measure to prevent COVID-19 outbreaks in detention facilities. Critics countered that it was used primarily as an immigration enforcement tool under the guise of public health, noting that it denied asylum seekers access to protection and that public health experts questioned its medical necessity. Multiple lawsuits challenged the policy from both sides — immigration advocates sought to end it, while some states sought to maintain it.

Title 42 formally ended on May 11, 2023, when the COVID-19 public health emergency was terminated. With its end, all border processing reverted to standard Title 8 immigration authority, resulting in significant changes to border processing procedures and case volumes in immigration courts.`,
    relatedTerms: ['title-8', 'cbp-customs-and-border-protection', 'credible-fear-interview', 'removal-proceedings', 'asylum'],
    relatedData: [
      { label: 'Border Encounters', href: '/border' },
      { label: 'Timeline', href: '/timeline' },
      { label: 'Court Backlog', href: '/backlog' },
    ],
  },
  {
    term: 'UAC (Unaccompanied Alien Child)',
    def: 'A child under 18 with no lawful immigration status who has no parent or legal guardian in the U.S. available to provide care. UACs are transferred to ORR custody and eventually placed with sponsors while their immigration cases proceed.',
    longDef: `An Unaccompanied Alien Child (UAC), also referred to as an unaccompanied minor, is defined in U.S. immigration law as a child who is under 18 years of age, has no lawful immigration status in the United States, and has no parent or legal guardian in the U.S. available to provide care and physical custody. UACs receive special protections under the Trafficking Victims Protection Reauthorization Act (TVPRA) and the Flores Settlement Agreement.

When a UAC is encountered by CBP at the border or by ICE in the interior, the child must be transferred to the custody of the Office of Refugee Resettlement (ORR), a division of the Department of Health and Human Services (HHS), within 72 hours. ORR operates a network of shelters and facilities where children are housed while the agency works to identify suitable sponsors — typically parents, relatives, or family friends already in the U.S. — with whom the child can be placed.

UACs have specific procedural protections in immigration court. They cannot be ordered removed in absentia (if they fail to appear, the case must be continued rather than decided in their absence). They are eligible for Special Immigrant Juvenile Status (SIJS) if they meet the criteria. They may also apply for asylum and are exempt from the one-year filing deadline.

The number of UACs encountered at the southern border has fluctuated significantly, from roughly 25,000-30,000 in some years to over 130,000 in peak years. The children come predominantly from Central American countries (Guatemala, Honduras, and El Salvador) and increasingly from other nations. Many are fleeing violence, gang recruitment, poverty, or family breakdown.

The UAC population presents unique challenges for the immigration court system. These are children navigating complex legal proceedings, often without attorneys (representation rates for UACs have improved but remain inadequate), while dealing with trauma, language barriers, and the stress of family separation.`,
    link: '/children',
    relatedTerms: ['sijs-special-immigrant-juvenile-status', 'removal-proceedings', 'cbp-customs-and-border-protection', 'asylum', 'in-absentia-order'],
    relatedData: [
      { label: 'Children in Immigration', href: '/children' },
      { label: 'Children in Court', href: '/analysis/children-in-court' },
      { label: 'Border Encounters', href: '/border' },
    ],
  },
  {
    term: 'USCIS (U.S. Citizenship and Immigration Services)',
    def: 'The DHS agency that handles immigration applications — green cards, naturalization, work permits, asylum (affirmative), DACA, and TPS. Separate from EOIR (courts) and ICE (enforcement).',
    longDef: `U.S. Citizenship and Immigration Services (USCIS) is the component of the Department of Homeland Security responsible for administering the nation's lawful immigration system. USCIS processes millions of immigration applications and petitions each year, covering virtually every type of immigration benefit — from green cards and naturalization to work permits, travel documents, asylum, and humanitarian programs.

USCIS is distinct from the other immigration agencies. While ICE handles enforcement and removal, and EOIR (within the DOJ) operates the immigration courts, USCIS is the "benefits" agency — it adjudicates applications from individuals seeking immigration status or benefits. The agency operates through a network of field offices, service centers, and asylum offices across the country.

Key USCIS functions include: processing **family-based and employment-based immigrant petitions** (I-130, I-140), adjudicating **adjustment of status** applications (I-485) for green cards, conducting **naturalization** interviews and ceremonies, processing **work permits** (EADs), handling **affirmative asylum** applications (those filed proactively, not in court), administering **DACA** renewals, managing **TPS** designations and applications, and conducting **credible fear** and **reasonable fear** interviews.

USCIS is largely funded by filing fees rather than congressional appropriations, which creates a unique dynamic — the agency's budget depends on the volume and type of applications it processes. This fee-funded model has led to periodic funding crises when application volumes drop or surge unexpectedly.

USCIS faces its own massive backlog, with over 8 million pending applications as of recent counts. Processing times for many application types have stretched to years — naturalization applications that once took 6 months can now take 18-24 months, and employment-based green card processing can take even longer. These delays have significant real-world impacts on applicants' lives, employment, and travel.`,
    link: '/uscis',
    relatedTerms: ['eoir-executive-office-for-immigration-review', 'ice-immigration-and-customs-enforcement', 'credible-fear-interview', 'lpr-lawful-permanent-resident', 'daca-deferred-action-for-childhood-arrivals'],
    relatedData: [
      { label: 'USCIS Backlog Data', href: '/uscis' },
      { label: 'Naturalization', href: '/naturalization' },
      { label: 'Green Card Data', href: '/green-card' },
    ],
  },
  {
    term: 'Voluntary Departure',
    def: 'An agreement where the respondent leaves the U.S. voluntarily instead of receiving a formal removal order. Benefits: no removal order on record, no re-entry bar. Must leave by the deadline or the voluntary departure converts to a removal order.',
    longDef: `Voluntary departure is a form of relief in immigration court that allows a respondent to leave the United States on their own terms, at their own expense, within a specified period, instead of being formally ordered removed (deported). While it results in the person leaving the country, voluntary departure offers significant advantages over a removal order.

The primary benefits of voluntary departure include: **no formal removal order** on the person's immigration record, **no statutory bar** on future re-entry (unlike a removal order, which triggers a 10-year or longer bar), and the ability to **preserve future immigration options** that might be foreclosed by a removal order. For someone who may have a pathway to return legally in the future — such as through a family petition or employment sponsor — voluntary departure can be critically important.

Voluntary departure can be granted at two stages. **Pre-hearing voluntary departure** may be granted before or during the master calendar hearing, typically allowing 120 days to depart. **Post-hearing voluntary departure** may be granted at the conclusion of the individual hearing, typically allowing 60 days. The requirements are stricter for post-hearing grants, including good moral character, physical presence for at least one year, the ability to pay for travel, and posting a voluntary departure bond.

The consequences of failing to depart by the deadline are severe. If the person remains past the voluntary departure date, the grant automatically converts into a removal order, and the person may face a civil penalty of $1,000-$5,000 and a 10-year bar on several forms of immigration relief. This makes compliance with the departure deadline essential.

Voluntary departure is often a strategic choice made in consultation with an attorney. In cases where the respondent has no viable claim to relief, voluntary departure may be the best option — preserving future immigration possibilities while avoiding the harsher consequences of a removal order.`,
    relatedTerms: ['removal-order', 'removal-proceedings', 'grant-of-relief', 'respondent', 'ij-immigration-judge'],
    relatedData: [
      { label: 'Deportation Statistics', href: '/deportation' },
      { label: 'Court Outcomes', href: '/courts' },
      { label: 'Judge Statistics', href: '/judges' },
    ],
  },
  {
    term: 'Withholding of Removal',
    def: 'A form of protection similar to asylum but with a higher burden of proof ("more likely than not" persecution). Does not provide a path to a green card and only protects against removal to the specific country of feared persecution.',
    longDef: `Withholding of removal is a form of protection under Section 241(b)(3) of the Immigration and Nationality Act that prevents the United States from removing an individual to a country where their life or freedom would be threatened on account of race, religion, nationality, membership in a particular social group, or political opinion. It is often sought alongside or as an alternative to asylum.

The key differences between withholding of removal and asylum are significant. The burden of proof for withholding is higher: the applicant must show it is "more likely than not" (greater than 50% probability) that they would face persecution, compared to asylum's lower "well-founded fear" standard (which can be met with as little as a 10% chance of persecution). However, withholding has some advantages: there is **no one-year filing deadline** (unlike asylum), and certain bars to asylum eligibility (such as the one-year deadline or firm resettlement) do not apply.

The benefits of withholding of removal are more limited than asylum. While asylum leads to permanent resident status and eventually citizenship, withholding provides only protection from removal to the specific country of feared persecution. The individual does not receive a green card, cannot petition for family members, and could theoretically be removed to a third country. Withholding is also not discretionary — if the applicant meets the legal standard, the judge must grant it — whereas asylum is discretionary even if eligibility is established.

In practice, withholding of removal serves as a critical safety net for individuals who qualify for protection but are barred from asylum — most commonly because they missed the one-year filing deadline or because they were convicted of a "particularly serious crime" that bars asylum but not withholding (for crimes with sentences under certain thresholds).

Many asylum applicants also file for withholding of removal and protection under the Convention Against Torture (CAT) as alternative forms of relief, ensuring they have fallback options if asylum is denied.`,
    relatedTerms: ['asylum', 'removal-proceedings', 'removal-order', 'grant-of-relief', 'credible-fear-interview'],
    relatedData: [
      { label: 'Asylum Data', href: '/asylum' },
      { label: 'Court Outcomes', href: '/courts' },
      { label: 'Asylum by Nationality', href: '/analysis/asylum-by-nationality' },
    ],
  },
  {
    term: 'Writ of Habeas Corpus',
    def: 'A legal action in federal court challenging the lawfulness of detention. Immigration detainees sometimes file habeas petitions when they believe their continued detention violates due process.',
    longDef: `A writ of habeas corpus is a fundamental legal remedy, rooted in the U.S. Constitution (Article I, Section 9), that allows individuals to challenge the legality of their detention before a federal court. In the immigration context, habeas corpus petitions are a critical tool for detained noncitizens who believe their imprisonment violates the law or the Constitution.

Immigration detainees may file habeas petitions in federal district court in several situations. **Prolonged detention** is one of the most common grounds — when an individual has been held for months or years without a bond hearing or without a realistic prospect of removal, they may argue that continued detention violates due process under the Fifth Amendment. The Supreme Court addressed this in *Zadvydas v. Davis* (2001), holding that the government cannot detain individuals indefinitely when there is no significant likelihood of removal in the reasonably foreseeable future, establishing a presumptive six-month limit.

Other grounds for habeas petitions include challenges to **mandatory detention** without a bond hearing, claims that detention conditions are unconstitutional, arguments that the government failed to follow proper procedures, and challenges to the legality of the underlying removal order.

Habeas corpus occupies a unique procedural space. Immigration cases generally must go through the administrative system (immigration court → BIA → circuit court petition for review). But habeas petitions go directly to federal district court, bypassing the administrative process. This makes habeas a powerful tool, though courts have debated the boundaries of habeas jurisdiction in immigration cases.

The importance of habeas corpus in immigration law cannot be overstated. It serves as a constitutional check on the executive branch's power to detain noncitizens, ensuring that detention is lawful and subject to judicial review. Without habeas, individuals could be held indefinitely without meaningful oversight — a result fundamentally inconsistent with American legal traditions.`,
    relatedTerms: ['detained-docket', 'bond-hearing', 'removal-order', 'ice-immigration-and-customs-enforcement', 'removal-proceedings'],
    relatedData: [
      { label: 'Bond Data', href: '/bond' },
      { label: 'Detained vs Released', href: '/analysis/detained-vs-released' },
      { label: 'Court Backlog', href: '/backlog' },
    ],
  },
]

// Add a computed term for naturalization (referenced by LPR)
const naturalizationSlug = 'naturalization' // not a term, just a link target

export const glossaryTerms: GlossaryTerm[] = rawTerms.map(t => ({
  ...t,
  slug: slugify(t.term),
}))

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find(t => t.slug === slug)
}

export function getRelatedTerms(slugs: string[]): GlossaryTerm[] {
  return slugs.map(s => glossaryTerms.find(t => t.slug === s)).filter((t): t is GlossaryTerm => !!t)
}
