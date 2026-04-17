'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#solicitudes', label: 'Solicitudes' },
    { href: '#confianza', label: 'Confianza' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-container mx-auto h-full px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-xl text-primary-700 tracking-tight">
          Ampar<span className="text-primary-500">a</span>
        </Link>

        {/* Nav links desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-700 hover:text-primary-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link href="/registro">
            <Button variant="primary" size="sm">
              Pide apoyo
            </Button>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 shadow-lg">
          <nav className="flex flex-col px-5 py-4 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-neutral-700 hover:text-primary-700"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" size="sm" fullWidth>
                  Entrar
                </Button>
              </Link>
              <Link href="/registro" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" size="sm" fullWidth>
                  Pide apoyo
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
