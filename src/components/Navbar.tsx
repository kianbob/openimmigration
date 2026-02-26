'use client'
import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'Courts', href: '/courts' },
  { label: 'Judges', href: '/judges' },
  { label: 'Nationalities', href: '/nationalities' },
  { label: 'Backlog', href: '/backlog' },
  { label: 'Asylum', href: '/asylum' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Demographics', href: '/demographics' },
  { label: 'Appeals', href: '/appeals' },
  { label: 'Border', href: '/border' },
]

const analysisArticles = [
  { label: 'The Backlog Crisis', href: '/analysis/backlog-crisis' },
  { label: 'Judge Roulette', href: '/analysis/judge-variation' },
  { label: 'Representation Gap', href: '/analysis/representation-gap' },
  { label: 'Geographic Lottery', href: '/analysis/geographic-lottery' },
  { label: 'Deportation Machine', href: '/analysis/deportation-machine' },
  { label: 'Asylum by Nationality', href: '/analysis/asylum-by-nationality' },
  { label: 'In Absentia Orders', href: '/analysis/in-absentia' },
  { label: 'Detained vs. Released', href: '/analysis/detained-vs-released' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [analysisOpen, setAnalysisOpen] = useState(false)

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
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-blue-200 transition-colors">
                {item.label}
              </Link>
            ))}
            <div className="relative" onMouseEnter={() => setAnalysisOpen(true)} onMouseLeave={() => setAnalysisOpen(false)}>
              <Link href="/analysis" className="text-sm font-medium hover:text-blue-200 transition-colors">
                Analysis ▾
              </Link>
              {analysisOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 py-2 w-56 z-50">
                  {analysisArticles.map(a => (
                    <Link key={a.href} href={a.href} className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition-colors">
                      {a.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/search" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
              Search
            </Link>
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
        <div className="md:hidden border-t border-white/20 pb-4">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-white/10">{item.label}</Link>
          ))}
          <Link href="/analysis" onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-white/10 font-medium">Analysis</Link>
          <Link href="/search" onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-white/10">Search</Link>
        </div>
      )}
    </nav>
  )
}
