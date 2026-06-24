'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dict } from '@/lib/i18n'

import Image from 'next/image'

export function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // 1. Check for manually saved theme
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light'
    
    // 2. Check for system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const defaultTheme = systemPrefersDark ? 'dark' : 'light'

    const initialTheme = savedTheme || defaultTheme
    
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)

    // Listen for system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newSystemTheme = e.matches ? 'dark' : 'light'
        setTheme(newSystemTheme)
        document.documentElement.setAttribute('data-theme', newSystemTheme)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className="sticky top-0 w-full z-50 transition-all duration-300"
        style={{
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative flex flex-col">
          {/* Top Row: Date | Brand Logo | Actions */}
          <div className="flex items-center justify-between h-20">
            {/* Left Date (Desktop) / Hamburger (Mobile/Tablet) */}
            <div className="w-1/4 flex items-center">
              <div className="hidden md:flex items-center text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5 md:hidden"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Centered Brand Logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="flex items-center gap-2 group">
                <span
                  className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-center"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  Pule<span style={{ color: 'var(--accent-red)' }}>feed</span>
                </span>
              </Link>
            </div>

            {/* Right Actions */}
            <div className="w-1/4 flex items-center justify-end gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>

              {/* Search */}
              <Link
                href="/search"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-muted)' }}
                aria-label={dict.search}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </Link>

              {/* Hamburger Button (Desktop Hidden, Tablet/Mobile visible beside date) */}
              <button
                className="w-9 h-9 hidden md:flex lg:hidden items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Row: Centered Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t border-border">
            <Link
              href="/"
              className={`text-xs uppercase tracking-[0.18em] font-semibold transition-colors hover:text-[var(--accent-red)] ${isActive('/') ? 'text-[var(--accent-red)]' : 'text-[var(--text-secondary)]'}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-xs uppercase tracking-[0.18em] font-semibold transition-colors hover:text-[var(--accent-red)] ${isActive('/about') ? 'text-[var(--accent-red)]' : 'text-[var(--text-secondary)]'}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-xs uppercase tracking-[0.18em] font-semibold transition-colors hover:text-[var(--accent-red)] ${isActive('/contact') ? 'text-[var(--accent-red)]' : 'text-[var(--text-secondary)]'}`}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className={`text-xs uppercase tracking-[0.18em] font-semibold transition-colors hover:text-[var(--accent-red)] ${isActive('/privacy') ? 'text-[var(--accent-red)]' : 'text-[var(--text-secondary)]'}`}
            >
              Policy
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-80 flex flex-col"
            style={{ background: 'var(--bg-primary)', borderLeft: '1px solid var(--border)' }}
          >
            {/* Mobile Nav Header */}
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <Link href="/" className="flex items-center gap-2 group">
                <span
                  className="font-display font-bold text-2xl tracking-tight"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
                >
                  Pule<span style={{ color: 'var(--accent-red)' }}>feed</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5"
                style={{ color: 'var(--text-muted)' }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg label-caps text-base transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                🏠 {dict.home}
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-3 px-4 py-3 rounded-lg label-caps text-base transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                ℹ️ About
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 px-4 py-3 rounded-lg label-caps text-base transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                ✉️ Contact
              </Link>

              <Link
                href="/privacy"
                className="flex items-center gap-3 px-4 py-3 rounded-lg label-caps text-base transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                🔒 Policy
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
