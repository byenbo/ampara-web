'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = '65%'
    }, 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-neutral-50">
      {/* Decoración radial */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #A8D9CF 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="max-w-container mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Texto */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 w-fit">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-dot" />
            <span className="text-sm font-medium text-primary-700">512 acuerdos cerrados</span>
          </div>

          <h1 className="font-display font-extrabold text-primary-900 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 54px)' }}>
            Cuando el banco<br />
            no llega,{' '}
            <em className="not-italic text-primary-500">llega Ampara</em>
          </h1>

          <p className="text-lg text-neutral-500 max-w-md leading-relaxed">
            Publica tu solicitud de apoyo económico y recibe ofertas de personas
            reales. Sin bancos, sin comisiones ocultas.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/registro">
              <Button variant="primary" size="lg">
                Pide apoyo ahora
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <a href="#como-funciona">
              <Button variant="outline" size="lg">
                Ver cómo funciona
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: '✓', text: '+500 acuerdos' },
              { icon: '✓', text: 'Usuarios verificados' },
              { icon: '✓', text: 'Sin comisiones ocultas' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="text-emerald-500 font-bold">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Card stack */}
        <div className="relative h-80 md:h-96 flex items-center justify-center">
          {/* Card atrás */}
          <div
            className="absolute bg-white rounded-2xl shadow-md border border-neutral-200 p-5 w-72"
            style={{ transform: 'rotate(-4deg) translateY(24px)', zIndex: 1 }}
          >
            <div className="text-xs text-neutral-400 mb-2">Acuerdo cerrado</div>
            <div className="font-display font-bold text-2xl text-primary-700">350 €</div>
            <div className="text-sm text-neutral-500 mt-1">30 días · Devuelto ✓</div>
          </div>

          {/* Card media */}
          <div
            className="absolute bg-primary-50 border border-primary-200 rounded-2xl p-5 w-72"
            style={{ transform: 'rotate(2deg) translateY(8px)', zIndex: 2 }}
          >
            <div className="text-xs text-primary-700 font-semibold mb-2">Apoyador</div>
            <div className="font-display font-bold text-lg text-primary-900">Javier Ruiz</div>
            <div className="text-sm text-primary-700 mt-1">Ofrece 350 € · Málaga</div>
          </div>

          {/* Card principal */}
          <div className="relative bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 w-72" style={{ zIndex: 3 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-display font-bold text-primary-700">
                M
              </div>
              <div>
                <div className="font-semibold text-neutral-800 text-sm">María García</div>
                <div className="text-xs text-neutral-400">Málaga · Verificada ✓</div>
              </div>
            </div>
            <div className="font-display font-extrabold text-3xl text-primary-700 mb-1">350 €</div>
            <div className="text-sm text-neutral-500 mb-4">Plazo: 30 días</div>
            <div className="text-xs text-neutral-400 mb-1">Nivel de interés</div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: '0%' }}
              />
            </div>
            <div className="text-right text-xs text-emerald-600 font-medium mt-1">3 ofertas recibidas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
