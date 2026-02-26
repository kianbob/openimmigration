'use client'

import OutcomesChart from '@/components/charts/OutcomesChart'
import YearlyTrendsChart from '@/components/charts/YearlyTrendsChart'

interface Props {
  outcomes: { name: string; count: number }[]
  trends: { year: number; filed: number; completed: number; grants: number }[]
}

export default function DeportationCharts({ outcomes, trends }: Props) {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="font-heading text-xl font-bold mb-4">Case Outcomes</h3>
        <OutcomesChart data={outcomes} />
      </div>
      <div>
        <h3 className="font-heading text-xl font-bold mb-4">Cases Filed vs Completed vs Grants</h3>
        <YearlyTrendsChart data={trends} />
      </div>
    </div>
  )
}
