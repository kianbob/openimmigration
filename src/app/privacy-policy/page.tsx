import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for OpenImmigration. Learn how we handle your data and protect your privacy.',
  alternates: { canonical: 'https://www.openimmigration.us/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <h1 className="font-heading text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 29, 2026</p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          OpenImmigration (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your
          privacy. This policy explains how we collect, use, and protect information when you visit
          openimmigration.us (the &quot;Site&quot;). OpenImmigration is a project of TheDataProject.ai.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Information We Collect</h2>
        <h3 className="font-heading text-xl font-bold text-gray-900">Automatically Collected Information</h3>
        <p>When you visit our Site, we may automatically collect:</p>
        <ul>
          <li>IP address (anonymized)</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
          <li>Device type and operating system</li>
        </ul>
        <p>
          We use Google Analytics to understand how visitors use our Site. Google Analytics uses cookies to
          collect anonymous usage data. You can opt out of Google Analytics by installing the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>

        <h3 className="font-heading text-xl font-bold text-gray-900">Information You Provide</h3>
        <p>
          If you subscribe to our newsletter, we collect your email address. We do not sell, share, or
          distribute your email address to third parties. You can unsubscribe at any time.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">How We Use Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Improve our Site and content</li>
          <li>Understand visitor behavior and preferences</li>
          <li>Send newsletter updates (if subscribed)</li>
          <li>Ensure site security and prevent abuse</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Cookies</h2>
        <p>
          Our Site uses cookies for analytics purposes. Cookies are small text files stored on your device.
          You can control cookie settings through your browser. Disabling cookies will not affect your
          ability to use the Site.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li><strong>Google Analytics</strong> — website traffic analysis</li>
          <li><strong>Google AdSense</strong> — display advertising (may use cookies for ad personalization)</li>
          <li><strong>Vercel</strong> — website hosting</li>
        </ul>
        <p>
          These services have their own privacy policies. We encourage you to review them.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Advertising</h2>
        <p>
          We may display advertisements through Google AdSense. Google and its partners may use cookies to
          serve ads based on your prior visits to our Site or other websites. You can opt out of personalized
          advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Google&apos;s Ads Settings
          </a>.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Data About Public Officials</h2>
        <p>
          OpenImmigration publishes data about immigration judges, courts, and government agencies derived
          from official U.S. Department of Justice records. This is public information published in the
          public interest. We do not collect or publish private information about any individual.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Children&apos;s Privacy</h2>
        <p>
          Our Site is not directed at children under 13. We do not knowingly collect personal information
          from children under 13. If you believe we have collected such information, please{' '}
          <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request deletion of your personal data</li>
          <li>Opt out of data collection</li>
          <li>Unsubscribe from communications</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be posted on this page with
          an updated revision date.
        </p>

        <h2 className="font-heading text-2xl font-bold text-gray-900">Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please visit our{' '}
          <Link href="/contact" className="text-primary hover:underline">contact page</Link> or email
          us at privacy@openimmigration.us.
        </p>
      </div>
    </div>
  )
}
