import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const requests = [
  {
    initials: 'L',
    name: 'Laura M.',
    amount: 300,
    period: '1 mes',
    city: 'Málaga',
    profession: 'Freelance',
    score: 78,
    desc: 'Necesito cubrir un desfase de tesorería mientras cobro una factura pendiente.',
    badges: ['Identidad verificada', 'Aval disponible'],
  },
  {
    initials: 'C',
    name: 'Carlos T.',
    amount: 800,
    period: '3 meses',
    city: 'Nerja',
    profession: 'Carpintero',
    score: 65,
    desc: 'Material para un proyecto grande. Lo devuelvo en cuotas mensuales.',
    badges: ['Identidad verificada'],
  },
  {
    initials: 'A',
    name: 'Ana P.',
    amount: 150,
    period: '2 semanas',
    city: 'Málaga',
    profession: 'Estudiante',
    score: 91,
    desc: 'Matrícula de un curso de formación. Devuelvo en 2 semanas al cobrar.',
    badges: ['Identidad verificada', 'Aval disponible'],
  },
]

export function ActiveRequests() {
  return (
    <section id="solicitudes" className="py-20 bg-neutral-50">
      <div className="max-w-container mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">Solicitudes activas</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-900">
            Personas reales, necesidades reales
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {requests.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-display font-bold text-primary-700">
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-neutral-800 text-sm">{r.name}</div>
                  <div className="text-xs text-neutral-400">{r.city} · {r.profession}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xs text-neutral-400">Puntuación</div>
                  <div className="font-bold text-primary-700 text-sm">{r.score} pts</div>
                </div>
              </div>

              <div className="font-display font-extrabold text-2xl text-primary-700 mb-1">{r.amount} €</div>
              <div className="text-sm text-neutral-500 mb-3">Plazo: {r.period}</div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">{r.desc}</p>

              <div className="flex flex-wrap gap-2">
                {r.badges.map((b) => (
                  <Badge key={b} variant="green">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/registro">
            <Button variant="outline" size="lg">
              Ver todas las solicitudes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
