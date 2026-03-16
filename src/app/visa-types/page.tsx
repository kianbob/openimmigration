import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'U.S. Visa Types — Complete Guide to Every Visa Category',
  description: 'Comprehensive guide to all U.S. visa categories: family, employment, diversity, refugee, student, tourist. Numbers issued, processing times, requirements, and costs.',
  alternates: { canonical: 'https://www.openimmigration.us/visa-types' },
}

/* ── data ────────────────────────────────────────────────────────────── */

interface VisaCategory {
  id: string
  name: string
  icon: string
  color: string
  description: string
  annualCap: string
  issued2023: number
  processingTime: string
  cost: string
  types: {
    code: string
    name: string
    description: string
    annualLimit: string
    avgWait: string
    requirements: string[]
  }[]
  editorial: string
}

const categories: VisaCategory[] = [
  {
    id: 'family',
    name: 'Family-Based Immigration',
    icon: '👨‍👩‍👧‍👦',
    color: 'blue',
    description: 'Family reunification is the cornerstone of U.S. immigration. U.S. citizens and permanent residents can sponsor relatives for green cards. Family-based immigration accounts for about 65% of all legal immigration.',
    annualCap: '~480,000/year (plus unlimited immediate relatives)',
    issued2023: 548000,
    processingTime: '1–23+ years depending on category and country',
    cost: '$535 (I-130) + $1,225 (I-485) + biometrics',
    types: [
      { code: 'IR', name: 'Immediate Relatives', description: 'Spouses, unmarried children under 21, and parents of U.S. citizens', annualLimit: 'Unlimited', avgWait: '6–18 months', requirements: ['U.S. citizen sponsor', 'Proof of relationship', 'Affidavit of Support (I-864)', 'Medical exam'] },
      { code: 'F1', name: 'Family First Preference', description: 'Unmarried adult children of U.S. citizens', annualLimit: '23,400', avgWait: '7–23 years', requirements: ['U.S. citizen parent', 'Unmarried, age 21+', 'Affidavit of Support'] },
      { code: 'F2A', name: 'Family 2A Preference', description: 'Spouses and minor children of permanent residents', annualLimit: '87,934', avgWait: '2–5 years', requirements: ['LPR sponsor', 'Proof of marriage/parentage', 'Affidavit of Support'] },
      { code: 'F2B', name: 'Family 2B Preference', description: 'Unmarried adult children of permanent residents', annualLimit: '26,266', avgWait: '10–23 years', requirements: ['LPR parent', 'Unmarried, age 21+', 'Affidavit of Support'] },
      { code: 'F3', name: 'Family Third Preference', description: 'Married adult children of U.S. citizens', annualLimit: '23,400', avgWait: '15–24 years', requirements: ['U.S. citizen parent', 'Married', 'Affidavit of Support'] },
      { code: 'F4', name: 'Family Fourth Preference', description: 'Brothers and sisters of adult U.S. citizens', annualLimit: '65,000', avgWait: '15–24 years', requirements: ['U.S. citizen sibling, age 21+', 'Affidavit of Support'] },
    ],
    editorial: 'The family visa backlog is the immigration system\'s greatest cruelty. Telling someone they can sponsor their sibling — but the wait is 24 years — is not a functioning system. It\'s a bureaucratic rejection disguised as a queue.',
  },
  {
    id: 'employment',
    name: 'Employment-Based Immigration',
    icon: '💼',
    color: 'green',
    description: 'Employment-based visas bring skilled workers, investors, and professionals. They include both temporary work visas (H-1B, L-1, O-1) and permanent immigration (green card) categories.',
    annualCap: '140,000 green cards/year + uncapped temporary visas',
    issued2023: 192000,
    processingTime: '6 months – 50+ years (India EB-2/EB-3)',
    cost: '$460–$11,160+ depending on category',
    types: [
      { code: 'H-1B', name: 'H-1B Specialty Occupation', description: 'Temporary visa for workers in specialty occupations requiring a bachelor\'s degree or higher', annualLimit: '85,000 (65K + 20K masters)', avgWait: 'Lottery + 3–8 months', requirements: ['Bachelor\'s degree or equivalent', 'Specialty occupation', 'Employer sponsorship', 'Prevailing wage'] },
      { code: 'EB-1', name: 'EB-1 Priority Workers', description: 'Extraordinary ability, outstanding professors/researchers, multinational executives', annualLimit: '40,040', avgWait: '1–2 years', requirements: ['Extraordinary ability evidence', 'No labor certification needed (EB-1A)', 'Self-petition allowed (EB-1A)'] },
      { code: 'EB-2', name: 'EB-2 Advanced Degree', description: 'Professionals with advanced degrees or exceptional ability', annualLimit: '40,040', avgWait: '2–50+ years (India)', requirements: ['Master\'s degree or bachelor\'s + 5 years experience', 'Labor certification (PERM)', 'National Interest Waiver alternative'] },
      { code: 'EB-3', name: 'EB-3 Skilled Workers', description: 'Skilled workers, professionals, and other workers', annualLimit: '40,040', avgWait: '2–50+ years (India)', requirements: ['2+ years experience or bachelor\'s degree', 'Labor certification (PERM)', 'Full-time permanent job offer'] },
      { code: 'EB-5', name: 'EB-5 Investor', description: 'Immigrant investors who create U.S. jobs', annualLimit: '10,000', avgWait: '2–4 years', requirements: ['$1,050,000 investment ($800,000 in TEA)', 'Create 10+ full-time jobs', 'Lawful source of funds'] },
      { code: 'L-1', name: 'L-1 Intracompany Transfer', description: 'Managers, executives, and specialized knowledge workers transferred within a company', annualLimit: 'No cap', avgWait: '2–6 months', requirements: ['1 year employment abroad in last 3 years', 'Manager/executive or specialized knowledge', 'Qualifying relationship between companies'] },
      { code: 'O-1', name: 'O-1 Extraordinary Ability', description: 'Individuals with extraordinary ability in sciences, arts, education, business, or athletics', annualLimit: 'No cap', avgWait: '2–4 months (premium)', requirements: ['Extraordinary ability evidence', 'Coming to work in area of expertise', 'Consultation from peer group'] },
    ],
    editorial: 'The H-1B lottery — where qualified workers are selected by random chance — is perhaps the most absurd feature of U.S. immigration. And the 50+ year green card wait for Indian EB-2/EB-3 applicants isn\'t a queue — it\'s a life sentence of temporary status.',
  },
  {
    id: 'diversity',
    name: 'Diversity Visa Lottery',
    icon: '🎰',
    color: 'purple',
    description: 'The Diversity Visa program allocates 55,000 immigrant visas annually through a random lottery to applicants from countries with low rates of immigration to the United States.',
    annualCap: '55,000/year',
    issued2023: 52000,
    processingTime: 'Lottery drawing + 8–14 months processing',
    cost: '$330 (DV fee) + $325 (immigrant visa fee)',
    types: [
      { code: 'DV', name: 'Diversity Visa', description: 'Random lottery for nationals of underrepresented countries', annualLimit: '55,000', avgWait: '1–2 years from selection', requirements: ['Born in eligible country', 'High school education or 2 years qualifying work experience', 'No sponsor needed', 'Selected in random lottery (typically <1% selection rate)'] },
    ],
    editorial: 'The DV lottery is actually one of the more elegant immigration solutions — it\'s simple, doesn\'t require wealth or connections, and diversifies immigration beyond the usual source countries. Of course, that\'s exactly why restrictionists want to eliminate it.',
  },
  {
    id: 'refugee',
    name: 'Refugee & Asylum',
    icon: '🏛️',
    color: 'red',
    description: 'The U.S. offers protection to people fleeing persecution through two systems: the refugee program (applied from abroad) and asylum (applied from within the U.S. or at the border).',
    annualCap: 'Presidential determination (125,000 FY2024 cap for refugees)',
    issued2023: 68000,
    processingTime: '2–10+ years (refugee); 6 months–7 years (asylum)',
    cost: 'Free (no filing fees)',
    types: [
      { code: 'Refugee', name: 'Refugee Admission', description: 'People outside the U.S. referred by UNHCR for resettlement', annualLimit: 'Presidential cap (125K FY24)', avgWait: '2–10 years', requirements: ['Outside the U.S.', 'UNHCR referral or embassy referral', 'Persecution based on race, religion, nationality, political opinion, or social group', 'Background checks and medical exam'] },
      { code: 'Affirmative', name: 'Affirmative Asylum', description: 'Filed proactively with USCIS within 1 year of arrival', annualLimit: 'No cap', avgWait: '2–7 years', requirements: ['Physically in the U.S.', 'Filed within 1 year of arrival', 'Fear of persecution on protected grounds', 'Interview with asylum officer'] },
      { code: 'Defensive', name: 'Defensive Asylum', description: 'Claimed as a defense against removal in immigration court', annualLimit: 'No cap', avgWait: '3–7 years', requirements: ['In removal proceedings', 'Fear of persecution on protected grounds', 'Hearing before immigration judge', 'Can appeal to BIA'] },
      { code: 'TPS', name: 'Temporary Protected Status', description: 'Temporary protection for nationals of designated countries experiencing crisis', annualLimit: 'Varies by designation', avgWait: 'N/A (temporary, renewable)', requirements: ['National of designated country', 'Physically present in U.S. by designation date', 'Register during open period', 'No serious criminal bars'] },
    ],
    editorial: 'The asylum system is simultaneously overwhelmed and underfunded. A 7-year wait to hear your asylum case isn\'t due process — it\'s denial by delay. And the political pendulum swings between treating asylum seekers as refugees deserving protection and as illegal immigrants to be expelled.',
  },
  {
    id: 'student',
    name: 'Student Visas',
    icon: '🎓',
    color: 'indigo',
    description: 'The U.S. hosts over 1 million international students, making it the world\'s top destination for higher education. Student visas are temporary but often serve as a pathway to employment and eventual immigration.',
    annualCap: 'No numerical cap',
    issued2023: 452000,
    processingTime: '3–8 weeks for visa; school admission varies',
    cost: '$185 (visa) + $350 (SEVIS fee)',
    types: [
      { code: 'F-1', name: 'F-1 Academic Student', description: 'Students attending universities, colleges, high schools, or language programs', annualLimit: 'No cap', avgWait: '3–8 weeks', requirements: ['Acceptance at SEVP-certified school', 'Proof of financial support', 'Intent to return home', 'English proficiency'] },
      { code: 'J-1', name: 'J-1 Exchange Visitor', description: 'Exchange programs including researchers, professors, and cultural exchange', annualLimit: 'No cap', avgWait: '3–6 weeks', requirements: ['Accepted in exchange program', 'DS-2019 from sponsor', 'May require 2-year home residency'] },
      { code: 'M-1', name: 'M-1 Vocational Student', description: 'Students in vocational or non-academic programs', annualLimit: 'No cap', avgWait: '3–8 weeks', requirements: ['Acceptance at SEVP-certified school', 'Proof of financial support', 'Limited work authorization'] },
      { code: 'OPT', name: 'Optional Practical Training', description: 'Post-graduation work authorization for F-1 students', annualLimit: 'No cap', avgWait: '3–5 months (EAD)', requirements: ['Completed or enrolled in degree program', '12 months standard (36 months for STEM)', 'Employment in field of study'] },
    ],
    editorial: 'International students subsidize American higher education, contribute billions to the economy, and many become tomorrow\'s entrepreneurs and innovators. Yet we make it extraordinarily difficult for them to stay after graduation. We train the world\'s talent, then send it home to compete against us.',
  },
  {
    id: 'tourist',
    name: 'Tourist & Business Visas',
    icon: '✈️',
    color: 'teal',
    description: 'Non-immigrant visas for temporary visits including tourism, business, medical treatment, and transit. The B-1/B-2 visa is the most commonly issued U.S. visa.',
    annualCap: 'No numerical cap',
    issued2023: 6800000,
    processingTime: '1 week – 6+ months (varies by embassy)',
    cost: '$185',
    types: [
      { code: 'B-1', name: 'B-1 Business Visitor', description: 'Temporary business activities: meetings, conferences, negotiations', annualLimit: 'No cap', avgWait: '1 week – 6 months', requirements: ['Ties to home country', 'Proof of funds', 'Intent to return', 'No employment in U.S.'] },
      { code: 'B-2', name: 'B-2 Tourist', description: 'Tourism, vacation, medical treatment, visiting family', annualLimit: 'No cap', avgWait: '1 week – 6 months', requirements: ['Ties to home country', 'Proof of funds', 'Intent to return', 'Travel itinerary'] },
      { code: 'ESTA', name: 'ESTA / Visa Waiver Program', description: 'Visa-free travel for nationals of 41 countries for up to 90 days', annualLimit: 'No cap', avgWait: '72 hours (online)', requirements: ['National of VWP country', 'Valid e-passport', 'No prior immigration violations', 'Online ESTA application'] },
    ],
    editorial: 'The tourist visa interview is where the system\'s biases are most visible. A young, unmarried person from a developing country faces a 50%+ denial rate, while someone from a wealthy country breezes through the Visa Waiver Program without even an interview.',
  },
]

/* ── page ─────────────────────────────────────────────────────────────── */

export default function VisaTypesPage() {
  const totalIssued = categories.reduce((s, c) => s + c.issued2023, 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Complete Guide to U.S. Visa Types',
    description: 'Every U.S. visa category explained: family, employment, diversity, refugee, student, and tourist visas.',
    url: 'https://www.openimmigration.us/visa-types',
    publisher: { '@type': 'Organization', name: 'OpenImmigration' },
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Visa Types' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Visa Types — Complete Guide</h1>
      <p className="text-lg text-gray-600 mb-2">
        The U.S. visa system has over 180 visa categories spanning temporary and permanent immigration.
        In 2023, the U.S. issued approximately <strong>{totalIssued.toLocaleString()}</strong> visas across
        all categories.
      </p>
      <p className="text-gray-600 mb-8">
        This guide covers every major visa category: who qualifies, how long it takes, what it costs,
        and how many are issued each year.
      </p>

      {/* ── Overview Stats ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {categories.map((c) => (
          <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{c.icon}</div>
            <div className="text-sm font-bold">{c.issued2023.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{c.name.split(' ')[0]}</div>
          </div>
        ))}
      </div>

      {/* ── Quick Navigation ────────────────────────────────────────── */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-12">
        <h2 className="font-bold text-sm mb-2">Jump to:</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="text-sm text-primary hover:underline">
              {c.icon} {c.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── Category Sections ───────────────────────────────────────── */}
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <h2 className="font-heading text-2xl font-bold">{cat.name}</h2>
              <p className="text-sm text-gray-500">
                {cat.annualCap} · {cat.issued2023.toLocaleString()} issued in 2023
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{cat.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-sm font-bold">{cat.issued2023.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Issued 2023</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-sm font-bold">{cat.processingTime}</div>
              <div className="text-xs text-gray-500">Processing Time</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-sm font-bold">{cat.cost}</div>
              <div className="text-xs text-gray-500">Filing Cost</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-sm font-bold">{cat.types.length}</div>
              <div className="text-xs text-gray-500">Sub-Categories</div>
            </div>
          </div>

          {/* Sub-types */}
          <div className="space-y-3 mb-4">
            {cat.types.map((t) => (
              <div key={t.code} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-bold">
                    <span className="text-primary mr-2">{t.code}</span>
                    {t.name}
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t.annualLimit}/yr</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Wait: {t.avgWait}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{t.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.requirements.map((req, i) => (
                    <span key={i} className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Editorial */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
            <p className="text-sm text-gray-700">💡 <strong>Analysis:</strong> {cat.editorial}</p>
          </div>
        </section>
      ))}

      {/* ── Summary Table ───────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Visa Category Comparison</h2>
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-right font-semibold">Issued 2023</th>
              <th className="px-4 py-3 text-left font-semibold">Annual Cap</th>
              <th className="px-4 py-3 text-left font-semibold">Processing Time</th>
              <th className="px-4 py-3 text-left font-semibold">Cost</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.icon} {c.name}</td>
                <td className="px-4 py-3 text-right font-mono">{c.issued2023.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-600">{c.annualCap}</td>
                <td className="px-4 py-3 text-gray-600">{c.processingTime}</td>
                <td className="px-4 py-3 text-gray-600">{c.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <h2 className="font-heading text-2xl font-bold mb-4">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/how-long-to-get-a-green-card" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Green Card Wait Times</h3>
          <p className="text-sm text-gray-600">Processing times by category and country of birth.</p>
        </Link>
        <Link href="/how-to-become-a-us-citizen" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">How to Become a Citizen</h3>
          <p className="text-sm text-gray-600">Step-by-step naturalization guide with timeline.</p>
        </Link>
        <Link href="/h1b" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">H-1B Visa Data</h3>
          <p className="text-sm text-gray-600">Detailed H-1B statistics, top employers, and trends.</p>
        </Link>
        <Link href="/wait-times" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">Court Wait Times</h3>
          <p className="text-sm text-gray-600">Immigration court processing and hearing wait times.</p>
        </Link>
        <Link href="/uscis" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">USCIS Data</h3>
          <p className="text-sm text-gray-600">Application data from U.S. Citizenship and Immigration Services.</p>
        </Link>
        <Link href="/how-many-immigrants-in-the-us" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
          <h3 className="font-heading font-bold mb-1">How Many Immigrants?</h3>
          <p className="text-sm text-gray-600">46.2M foreign-born population breakdown.</p>
        </Link>
      </div>
    </div>
  )
}
