import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Immigration Cases by State',
  description: 'Explore U.S. immigration court cases by state — pending cases, outcomes, and court locations across all 50 states.',
}

const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
]

export default function StatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'By State' }]} />
      <h1 className="font-heading text-4xl font-bold mb-4">Immigration Cases by State</h1>
      <p className="text-lg text-gray-600 mb-8">
        Immigration cases are concentrated in a few states — Florida, Texas, New York, and California
        account for the majority of the backlog. Explore case volumes and outcomes by state.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {STATES.map(state => {
          const slug = state.toLowerCase().replace(/\s+/g, '-')
          return (
            <a key={state} href={`/states/${slug}`}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium hover:border-primary/40 hover:shadow-sm transition-all text-center">
              {state}
            </a>
          )
        })}
      </div>

      <p className="text-sm text-gray-500 mt-8 text-center">
        State-level data with case volumes, outcomes, and trends will be populated from EOIR case data.
      </p>
    </div>
  )
}
