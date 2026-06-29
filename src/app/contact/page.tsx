import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact OpenImmigration for questions, data requests, corrections, or media inquiries. We respond within 48 hours.',
  alternates: { canonical: 'https://www.openimmigration.us/contact' },
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <h1 className="font-heading text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8">
        Have a question, data request, or found an error? We&apos;d love to hear from you.
        OpenImmigration is a project of <a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TheDataProject.ai</a>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-heading text-xl font-bold mb-3">📧 General Inquiries</h2>
          <p className="text-gray-600 text-sm mb-3">
            Questions about our data, methodology, or how to use our tools.
          </p>
          <a href="mailto:hello@openimmigration.us" className="text-primary font-semibold hover:underline">
            hello@openimmigration.us
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-heading text-xl font-bold mb-3">📰 Media & Press</h2>
          <p className="text-gray-600 text-sm mb-3">
            Journalist? Researcher? We can help with data requests and context.
          </p>
          <a href="mailto:press@openimmigration.us" className="text-primary font-semibold hover:underline">
            press@openimmigration.us
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-heading text-xl font-bold mb-3">🐛 Corrections & Errors</h2>
          <p className="text-gray-600 text-sm mb-3">
            Found incorrect data or a broken page? Please let us know so we can fix it.
          </p>
          <a href="mailto:corrections@openimmigration.us" className="text-primary font-semibold hover:underline">
            corrections@openimmigration.us
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-heading text-xl font-bold mb-3">🔒 Privacy</h2>
          <p className="text-gray-600 text-sm mb-3">
            Questions about your data or our privacy practices.
          </p>
          <a href="mailto:privacy@openimmigration.us" className="text-primary font-semibold hover:underline">
            privacy@openimmigration.us
          </a>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
        <h2 className="font-heading text-xl font-bold mb-3">About OpenImmigration</h2>
        <p className="text-gray-600 mb-4">
          OpenImmigration is a free, open-data platform that makes U.S. immigration court records and
          enforcement data accessible to everyone. We aggregate data from the Department of Justice (EOIR),
          DHS, ICE, and CBP, plus FOIA-obtained datasets from organizations like the{' '}
          <a href="https://deportationdata.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Deportation Data Project
          </a>.
        </p>
        <p className="text-gray-600">
          We are part of <a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TheDataProject.ai</a>,
          a portfolio of 60+ data-driven websites that make public records accessible and understandable.
        </p>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm">
          We typically respond within 48 hours.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="/about" className="text-primary font-medium hover:underline">About Us →</Link>
          <Link href="/privacy-policy" className="text-primary font-medium hover:underline">Privacy Policy →</Link>
          <Link href="/downloads" className="text-primary font-medium hover:underline">Download Data →</Link>
        </div>
      </div>
    </div>
  )
}
