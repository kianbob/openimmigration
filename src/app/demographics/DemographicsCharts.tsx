'use client'

import GenderChart from '@/components/charts/GenderChart'
import LanguagesChart from '@/components/charts/LanguagesChart'
import CustodyChart from '@/components/charts/CustodyChart'

interface Props {
  gender: { name: string; count: number }[]
  languages: { name: string; count: number }[]
  custody: { code: string; name: string; count: number }[]
}

export default function DemographicsCharts({ gender, languages, custody }: Props) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-4">Gender Distribution</h2>
        <GenderChart data={gender} />
      </div>
      <div>
        <h2 className="font-heading text-2xl font-bold mb-4">Top 15 Languages</h2>
        <LanguagesChart data={languages} />
      </div>
      <div>
        <h2 className="font-heading text-2xl font-bold mb-4">Custody Status</h2>
        <CustodyChart data={custody} />
      </div>
    </div>
  )
}
