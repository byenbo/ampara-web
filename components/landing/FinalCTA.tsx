import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  return (
    <section className="py-24 bg-primary-700">
      <div className="max-w-container mx-auto px-5 text-center">
        <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          ¿Necesitas apoyo o quieres apoyar?
        </h2>
        <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
          Únete a la comunidad de personas que se apoyan mutuamente. Sin bancos, sin complicaciones.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/registro">
            <Button variant="white" size="lg">
              Pide apoyo ahora
            </Button>
          </Link>
          <Link href="/registro">
            <Button variant="outline-white" size="lg">
              Ver solicitudes activas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
