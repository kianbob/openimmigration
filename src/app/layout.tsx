import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const BASE_URL = 'https://www.openimmigration.us'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | OpenImmigration',
    default: 'U.S. Immigration Data — Judge Records, Wait Times, Court Stats | OpenImmigration',
  },
  description: 'Explore millions of U.S. immigration court records. Look up any immigration judge by name, track case outcomes, court backlogs, asylum decisions, deportation orders, and judge statistics from official DOJ data.',
  openGraph: {
    type: 'website',
    siteName: 'OpenImmigration',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: './',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  other: {
    'google-site-verification': '',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2HE8DGKLE1" strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-2HE8DGKLE1');`}
      </Script>
      {/* Google AdSense - add script tag here once approved */}
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
