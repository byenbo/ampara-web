const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Todo el mundo está verificado',
    desc: 'Antes de publicar o apoyar, verificamos la identidad real de cada persona.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Los acuerdos son claros',
    desc: 'Cada acuerdo queda registrado con todas las condiciones aceptadas por ambas partes.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Comunidad real, no algoritmos',
    desc: 'Las personas eligen a quién apoyar. No hay un sistema automatizado que decide por ti.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Sin comisiones ocultas',
    desc: 'Lo que ves es lo que hay. Ampara es transparente en cada paso del proceso.',
  },
]

export function WhyAmpara() {
  return (
    <section id="confianza" className="py-20 bg-primary-900">
      <div className="max-w-container mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-200 uppercase tracking-wider mb-3">Por qué Ampara</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            Apoyo con garantías
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-primary-700/40 border border-primary-700 rounded-2xl p-6 hover:bg-primary-700/60 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/30 flex items-center justify-center text-primary-200 mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-white mb-2">{f.title}</h3>
              <p className="text-primary-200 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
