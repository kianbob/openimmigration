'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const courtData = [
  { label: 'Courts', href: '/courts' },
  { label: 'Judges', href: '/judges' },
  { label: 'Nationalities', href: '/nationalities' },
  { label: 'Backlog', href: '/backlog' },
  { label: 'Asylum', href: '/asylum' },
  { label: 'Wait Times', href: '/wait-times' },
  { label: 'Representation', href: '/representation' },
  { label: 'Bond', href: '/bond' },
  { label: 'Appeals', href: '/appeals' },
  { label: 'Deportation', href: '/deportation' },
  { label: 'Demographics', href: '/demographics' },
  { label: 'Charges', href: '/charges' },
  { label: 'By State', href: '/states' },
]

const immigrationData = [
  { label: 'Border Encounters', href: '/border' },
  { label: 'ICE Enforcement', href: '/enforcement' },
  { label: 'Drug Seizures', href: '/drug-seizures' },
  { label: 'Legal Immigration', href: '/legal-immigration' },
  { label: 'Visa Overstays', href: '/overstays' },
  { label: 'TPS', href: '/tps' },
  { label: 'DACA', href: '/daca' },
  { label: 'Naturalization', href: '/naturalization' },
  { label: 'Green Cards', href: '/green-card' },
  { label: 'Children', href: '/children' },
  { label: 'USCIS Backlog', href: '/uscis' },
]

const morePages = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Compare', href: '/compare' },
  { label: 'Statistics', href: '/statistics' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'How It Works', href: '/how-immigration-court-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
]

const analysisArticles = [
  { label: 'The Backlog Crisis', href: '/analysis/backlog-crisis' },
  { label: 'Judge Roulette', href: '/analysis/judge-variation' },
  { label: 'Representation Gap', href: '/analysis/representation-gap' },
  { label: 'Geographic Lottery', href: '/analysis/geographic-lottery' },
  { label: 'Deportation Machine', href: '/analysis/deportation-machine' },
  { label: 'Asylum by Nationality', href: '/analysis/asylum-by-nationality' },
  { label: 'In Absentia Orders', href: '/analysis/in-absentia' },
  { label: 'Fentanyl Pipeline', href: '/analysis/fentanyl-pipeline' },
  { label: 'Speed of Justice', href: '/analysis/speed-of-justice' },
  { label: 'The Bond System', href: '/analysis/bond-system' },
  { label: 'The TPS Trap', href: '/analysis/tps-trap' },
  { label: 'Children in Court', href: '/analysis/children-in-court' },
  { label: 'Border to Courtroom', href: '/analysis/border-to-courtroom' },
  { label: 'Detained vs. Released', href: '/analysis/detained-vs-released' },
]

function DesktopDropdown({ label, items, wide }: { label: string; items: { label: string; href: string }[]; wide?: boolean }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="text-sm font-medium hover:text-blue-200 transition-colors py-4">
        {label} ▾
      </button>
      {open && (
        <div className={`absolute top-full left-0 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 py-2 z-50 max-h-[70vh] overflow-y-auto ${wide ? 'w-64' : 'w-52'}`}>
          {items.map(a => (
            <Link key={a.href} href={a.href} className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
              {a.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileSection({ title, items, onNavigate }: { title: string; items: { label: string; href: string }[]; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10"
      >
        {title}
        <span className="text-xs">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div className="bg-white/5">
          {items.map(item => (
            <Link key={item.href} href={item.href} onClick={onNavigate}
              className="block px-8 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault()
        router.push('/search')
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [router])

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            OpenImmigration
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-5">
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-200 transition-colors">Dashboard</Link>
            <DesktopDropdown label="Court Data" items={courtData} />
            <DesktopDropdown label="Immigration" items={immigrationData} />
            <DesktopDropdown label="Analysis" items={analysisArticles} wide />
            <DesktopDropdown label="More" items={morePages} />
            <Link href="/search" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
              🔍 Search
            </Link>
          </div>

          {/* Tablet */}
          <div className="hidden md:flex lg:hidden items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-200">Dashboard</Link>
            <DesktopDropdown label="Data" items={[...courtData.slice(0, 6), ...immigrationData.slice(0, 4)]} />
            <DesktopDropdown label="Analysis" items={analysisArticles.slice(0, 8)} />
            <Link href="/search" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">🔍</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/20 pb-4 max-h-[80vh] overflow-y-auto">
          <Link href="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Dashboard</Link>
          <MobileSection title="Court Data" items={courtData} onNavigate={() => setOpen(false)} />
          <MobileSection title="Immigration Data" items={immigrationData} onNavigate={() => setOpen(false)} />
          <MobileSection title="Analysis (14)" items={analysisArticles} onNavigate={() => setOpen(false)} />
          <MobileSection title="More" items={morePages} onNavigate={() => setOpen(false)} />
          <Link href="/search" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-semibold hover:bg-white/10">🔍 Search</Link>
        </div>
      )}
    </nav>
  )
}
