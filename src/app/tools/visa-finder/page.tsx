'use client'

import { useState } from 'react'
import Link from 'next/link'

type VisaInfo = {
  name: string
  code: string
  description: string
  requirements: string[]
  processingTime: string
  estimatedCost: string
  link: string
}

const visaDatabase: Record<string, VisaInfo[]> = {
  family: [
    {
      name: 'Immediate Relative (IR)',
      code: 'IR-1/CR-1',
      description: 'For spouses, unmarried children under 21, and parents of U.S. citizens. No annual cap — the fastest family path.',
      requirements: ['U.S. citizen sponsor', 'Proof of qualifying relationship', 'Affidavit of Support (I-864)', 'Medical exam'],
      processingTime: '12–24 months',
      estimatedCost: '$2,500–$5,000+',
      link: '/wait-times',
    },
    {
      name: 'Family Preference (F1–F4)',
      code: 'F1/F2A/F2B/F3/F4',
      description: 'For more distant family relationships — adult children, siblings of U.S. citizens, and family of green card holders. Subject to annual caps and long waits.',
      requirements: ['U.S. citizen or LPR sponsor', 'Approved I-130 petition', 'Visa number availability', 'Affidavit of Support'],
      processingTime: '2–23+ years depending on category and country',
      estimatedCost: '$2,500–$5,000+',
      link: '/wait-times',
    },
    {
      name: 'K-1 Fiancé(e) Visa',
      code: 'K-1',
      description: 'For fiancé(e)s of U.S. citizens. Must marry within 90 days of entry.',
      requirements: ['U.S. citizen petitioner', 'Met in person within 2 years', 'Intent to marry within 90 days', 'Medical exam'],
      processingTime: '12–18 months',
      estimatedCost: '$2,000–$4,000',
      link: '/wait-times',
    },
  ],
  employment: [
    {
      name: 'H-1B Specialty Occupation',
      code: 'H-1B',
      description: 'For workers in specialty occupations requiring at least a bachelor\'s degree. Subject to annual lottery (85,000 cap).',
      requirements: ['Job offer from U.S. employer', 'Bachelor\'s degree or equivalent', 'Specialty occupation', 'Labor Condition Application'],
      processingTime: '3–6 months (15 days with premium processing)',
      estimatedCost: '$5,000–$10,000 (employer-paid)',
      link: '/h1b',
    },
    {
      name: 'Employment-Based Green Card (EB-1/EB-2/EB-3)',
      code: 'EB-1/EB-2/EB-3',
      description: 'Permanent residency through employment. EB-1 for extraordinary ability, EB-2 for advanced degrees, EB-3 for skilled workers.',
      requirements: ['Job offer (usually)', 'Labor certification (PERM) for most categories', 'Employer sponsorship', 'Qualifying education/experience'],
      processingTime: '1–10+ years depending on category and country of birth',
      estimatedCost: '$10,000–$20,000+',
      link: '/wait-times',
    },
    {
      name: 'L-1 Intracompany Transfer',
      code: 'L-1A/L-1B',
      description: 'For managers, executives, or specialized knowledge workers transferring from a foreign office to a U.S. office.',
      requirements: ['1 year employment with foreign company', 'Qualifying relationship between companies', 'Manager/executive or specialized knowledge role'],
      processingTime: '2–6 months',
      estimatedCost: '$5,000–$10,000',
      link: '/wait-times',
    },
    {
      name: 'O-1 Extraordinary Ability',
      code: 'O-1',
      description: 'For individuals with extraordinary ability in sciences, arts, education, business, or athletics.',
      requirements: ['Evidence of extraordinary ability', 'Peer consultation', 'U.S. employer or agent sponsor'],
      processingTime: '2–4 months (15 days with premium)',
      estimatedCost: '$5,000–$15,000',
      link: '/wait-times',
    },
  ],
  student: [
    {
      name: 'F-1 Student Visa',
      code: 'F-1',
      description: 'For full-time students at accredited U.S. universities, colleges, or language programs.',
      requirements: ['Acceptance at SEVP-certified school', 'Proof of financial support', 'Ties to home country', 'English proficiency'],
      processingTime: '2–4 months',
      estimatedCost: '$500–$1,500',
      link: '/wait-times',
    },
    {
      name: 'J-1 Exchange Visitor',
      code: 'J-1',
      description: 'For exchange visitors in approved programs — students, researchers, trainees, au pairs.',
      requirements: ['Sponsoring organization (DS-2019)', 'Proof of funding', 'English ability', 'Ties to home country'],
      processingTime: '1–3 months',
      estimatedCost: '$500–$2,000',
      link: '/wait-times',
    },
    {
      name: 'M-1 Vocational Student',
      code: 'M-1',
      description: 'For students in vocational or non-academic programs.',
      requirements: ['Acceptance at SEVP-certified vocational school', 'Proof of financial support'],
      processingTime: '2–4 months',
      estimatedCost: '$500–$1,500',
      link: '/wait-times',
    },
  ],
  investor: [
    {
      name: 'EB-5 Immigrant Investor',
      code: 'EB-5',
      description: 'Green card through investment. Minimum $800,000 in a Targeted Employment Area (TEA) or $1,050,000 elsewhere. Must create 10 jobs.',
      requirements: ['Minimum investment ($800K–$1.05M)', 'Create 10 full-time jobs', 'Lawful source of funds', 'Active involvement in enterprise'],
      processingTime: '2–5+ years',
      estimatedCost: '$850,000–$1,100,000+ (including investment)',
      link: '/wait-times',
    },
    {
      name: 'E-2 Treaty Investor',
      code: 'E-2',
      description: 'Nonimmigrant visa for citizens of treaty countries who invest a substantial amount in a U.S. business.',
      requirements: ['Treaty country citizenship', 'Substantial investment', 'Direct and develop the enterprise', 'Intent to depart when status ends'],
      processingTime: '2–6 months',
      estimatedCost: '$100,000–$500,000+ (including investment)',
      link: '/wait-times',
    },
    {
      name: 'E-1 Treaty Trader',
      code: 'E-1',
      description: 'For citizens of treaty countries engaged in substantial trade between the U.S. and their home country.',
      requirements: ['Treaty country citizenship', 'Substantial trade with U.S.', 'Principal trader or essential employee'],
      processingTime: '2–6 months',
      estimatedCost: '$5,000–$15,000',
      link: '/wait-times',
    },
  ],
  humanitarian: [
    {
      name: 'Asylum',
      code: 'Asylum',
      description: 'Protection for people already in the U.S. who face persecution in their home country based on race, religion, nationality, political opinion, or social group.',
      requirements: ['Present in the U.S.', 'File within 1 year of arrival (with exceptions)', 'Credible fear of persecution', 'Based on protected ground'],
      processingTime: '6 months–5+ years (massive backlog)',
      estimatedCost: '$0 filing fee (legal fees $5,000–$15,000+)',
      link: '/asylum',
    },
    {
      name: 'Refugee Resettlement',
      code: 'Refugee',
      description: 'For people outside the U.S. who have been persecuted or fear persecution. Requires UNHCR referral.',
      requirements: ['Outside the U.S.', 'Meet refugee definition', 'UNHCR or embassy referral', 'Not firmly resettled elsewhere'],
      processingTime: '1–3+ years',
      estimatedCost: '$0 (government-funded)',
      link: '/asylum',
    },
    {
      name: 'Temporary Protected Status (TPS)',
      code: 'TPS',
      description: 'Temporary protection for nationals of designated countries facing armed conflict, natural disaster, or extraordinary conditions.',
      requirements: ['National of designated country', 'Continuous physical presence', 'Filed during registration period', 'No disqualifying criminal history'],
      processingTime: '3–12 months',
      estimatedCost: '$50–$500',
      link: '/tps',
    },
    {
      name: 'U Visa (Crime Victims)',
      code: 'U',
      description: 'For victims of certain crimes who assist law enforcement. Leads to green card eligibility after 3 years.',
      requirements: ['Victim of qualifying crime', 'Suffered substantial abuse', 'Helpful to law enforcement', 'Law enforcement certification'],
      processingTime: '5–7+ years (severe backlog)',
      estimatedCost: '$0 filing fee',
      link: '/wait-times',
    },
    {
      name: 'DACA',
      code: 'DACA',
      description: 'Deferred action for individuals who came to the U.S. as children. Provides work authorization and deportation relief (renewals only — new applications blocked).',
      requirements: ['Arrived before age 16', 'Continuous residence since June 15, 2007', 'In school, graduated, or military', 'No serious criminal history'],
      processingTime: '3–8 months (renewals)',
      estimatedCost: '$495',
      link: '/daca',
    },
  ],
}

const categories = [
  { id: 'family', label: 'Family-Sponsored', icon: '👨‍👩‍👧‍👦', desc: 'A U.S. citizen or green card holder is sponsoring me' },
  { id: 'employment', label: 'Employment-Based', icon: '💼', desc: 'I have a job offer or employer sponsor' },
  { id: 'student', label: 'Student', icon: '🎓', desc: 'I want to study in the United States' },
  { id: 'investor', label: 'Investor / Business', icon: '📈', desc: 'I want to invest in or start a U.S. business' },
  { id: 'humanitarian', label: 'Humanitarian / Refugee', icon: '🛡️', desc: 'I\'m fleeing persecution or need protection' },
]

export default function VisaFinderPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedVisa, setExpandedVisa] = useState<string | null>(null)

  const results = selectedCategory ? visaDatabase[selectedCategory] || [] : []

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-primary text-sm hover:underline">← All Tools</Link>
      </div>

      <h1 className="font-heading text-4xl font-bold mb-3">Visa Finder</h1>
      <p className="text-lg text-gray-600 mb-10">
        Answer one question to find which U.S. visa categories may be right for you.
        This tool provides general guidance — consult an immigration attorney for your specific case.
      </p>

      {/* Step 1: Category Selection */}
      <div className="mb-10">
        <h2 className="font-heading text-xl font-bold mb-4">What best describes your situation?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setExpandedVisa(null) }}
              className={`text-left p-5 rounded-xl border-2 transition-all ${
                selectedCategory === cat.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 hover:border-primary/40 hover:shadow-sm'
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="font-bold">{cat.label}</div>
              <div className="text-sm text-gray-500">{cat.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Results */}
      {selectedCategory && (
        <div className="animate-in">
          <h2 className="font-heading text-xl font-bold mb-4">
            {results.length} visa option{results.length !== 1 ? 's' : ''} for {categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}
          </h2>
          <div className="space-y-4">
            {results.map(visa => (
              <div
                key={visa.code}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedVisa(expandedVisa === visa.code ? null : visa.code)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{visa.name}</h3>
                      <span className="inline-block text-xs font-mono bg-gray-100 px-2 py-0.5 rounded mt-1">{visa.code}</span>
                      <p className="text-gray-600 mt-2 text-sm">{visa.description}</p>
                    </div>
                    <span className="text-gray-400 text-xl ml-4 flex-shrink-0">
                      {expandedVisa === visa.code ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {expandedVisa === visa.code && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Requirements</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {visa.requirements.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-1">Processing Time</h4>
                        <p className="font-bold text-primary">{visa.processingTime}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-1">Estimated Cost</h4>
                        <p className="font-bold text-primary">{visa.estimatedCost}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">
                      Costs and processing times are estimates based on published USCIS data. Actual costs may vary.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="font-bold text-amber-900 mb-2">⚠️ This is not legal advice</h3>
            <p className="text-sm text-amber-800">
              The Visa Finder provides general information about U.S. visa categories. Immigration law is complex —
              eligibility depends on many factors not covered here. Consult a qualified immigration attorney for advice
              specific to your situation.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
