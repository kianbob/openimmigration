import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'In Absentia Deportation Orders — Deported Without Showing Up',
  description: 'Tens of thousands of immigrants are ordered deported without appearing in court. What in absentia orders mean and why they happen.',
}

export default function InAbsentiaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Analysis', href: '/analysis' },
        { label: 'In Absentia Orders' },
      ]} />

      <div className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded-full inline-block mb-3">System</div>
      <h1 className="font-heading text-4xl font-bold mb-4">Ordered Deported Without Showing Up</h1>
      <p className="text-lg text-gray-600 mb-8">
        When immigrants don&apos;t appear for their court hearings, judges can issue &quot;in absentia&quot; removal
        orders — deportation orders entered without the person present. These orders have become a key
        tool in reducing the court backlog.
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">What Are In Absentia Orders?</h2>
        <p>
          Under immigration law, if a respondent fails to appear at a scheduled hearing, the immigration judge
          may order them removed &quot;in absentia&quot; — in their absence. This means the person is ordered deported
          without having the opportunity to present their case or any defense.
        </p>
        <p>
          In absentia orders are a significant and growing portion of case completions. They allow courts
          to clear cases from the docket without full hearings, but raise serious due process concerns.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why People Don&apos;t Show Up</h2>
        <p>The reasons for non-appearance are more complex than simple avoidance:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Notice problems:</strong> Hearing notices may be sent to wrong addresses, especially after
          changes of address that weren&apos;t properly filed with the court</li>
          <li><strong>Confusion about dates and locations:</strong> Immigration court procedures can be confusing,
          especially for non-English speakers without legal representation</li>
          <li><strong>Transportation barriers:</strong> Courts may be far from where the immigrant lives, and
          many lack transportation or can&apos;t take time off work</li>
          <li><strong>Fear:</strong> Some immigrants fear attending court, especially in the current enforcement climate</li>
          <li><strong>Left the country:</strong> Some people have already departed the U.S. voluntarily</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">The Due Process Concern</h2>
        <p>
          In absentia orders effectively skip the entire adversarial process. No evidence is presented.
          No defense is offered. No credibility determination is made. The judge simply orders removal
          based on the government&apos;s charges.
        </p>
        <p>
          Research suggests that many people who receive in absentia orders had viable claims for relief —
          they just weren&apos;t there to make them. This is especially concerning for asylum seekers, who may
          have strong cases but lost their chance to present them.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Representation Matters — Again</h2>
        <p>
          Represented immigrants are significantly more likely to appear at their hearings. Attorneys help
          ensure clients understand hearing schedules, assist with address changes, and provide reminders.
          The overlap between low representation rates and high in absentia rates is not a coincidence.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Key Context</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>→ In absentia orders have become a major tool for backlog reduction</li>
                <li>→ Represented immigrants appear at court at much higher rates</li>
                <li>→ Notice problems are a significant factor in non-appearance</li>
                <li>→ In absentia orders can be reopened if the immigrant can show proper cause</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
