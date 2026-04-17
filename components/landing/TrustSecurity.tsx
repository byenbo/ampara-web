const items = [
  {
    bg: 'bg-emerald-100',
    color: 'text-emerald-700',
    title: 'Verificación de identidad real',
    desc: 'Cada usuario pasa por un proceso de verificación antes de poder actuar en la plataforma.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
  },
  {
    bg: 'bg-blue-100',
    color: 'text-blue-700',
    title: 'Datos cifrados y protegidos',
    desc: 'Tu información personal nunca se comparte sin tu consentimiento. Cifrado de extremo a extremo.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    bg: 'bg-purple-100',
    color: 'text-purple-700',
    title: 'Acuerdos con respaldo legal',
    desc: 'Cada acuerdo cerrado queda documentado y tiene validez como compromiso registrado.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
]

export function TrustSecurity() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">Seguridad y confianza</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-900">
            Tu seguridad, nuestra prioridad
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-primary-900 mb-2">{item.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
