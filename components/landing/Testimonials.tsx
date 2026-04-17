const testimonials = [
  {
    name: 'Laura M.',
    role: 'Solicitante · Freelance',
    stars: 5,
    quote:
      'En menos de 48 horas tenía tres ofertas. Al final elegí la de Javier, que me dio un mes de plazo sin intereses. Algo impensable en un banco.',
  },
  {
    name: 'Javier R.',
    role: 'Apoyador · Málaga',
    stars: 5,
    quote:
      'Me gusta elegir yo a quién apoyo. Puedo ver el perfil, la razón, la puntuación… y tomar una decisión informada. Me parece honesto.',
  },
  {
    name: 'Pablo T.',
    role: 'Emprendedor · Granada',
    stars: 4,
    quote:
      'Ampara me permitió financiar material para un proyecto cuando los bancos me dijeron que no. Funcionó y lo devolví antes del plazo.',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">Testimonios</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-900">
            Lo que dicen quienes lo han vivido
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < t.stars ? 'text-amber-500' : 'text-neutral-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-neutral-800 text-sm">{t.name}</div>
                <div className="text-xs text-neutral-400">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
