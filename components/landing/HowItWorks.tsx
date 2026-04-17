const steps = [
  {
    n: '01',
    title: 'Publica tu solicitud',
    desc: 'Indica cuánto necesitas, en qué plazo y cómo lo devolverás. Sin burocracia.',
  },
  {
    n: '02',
    title: 'Recibe ofertas verificadas',
    desc: 'Personas reales revisarán tu solicitud y te harán propuestas personalizadas.',
  },
  {
    n: '03',
    title: 'Cierra el acuerdo y cumple',
    desc: 'Acepta la oferta que más te convenga. El acuerdo queda registrado en la plataforma.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">Cómo funciona</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-900">
            Simple, claro, humano
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="font-display font-extrabold text-5xl text-primary-100 mb-4">{s.n}</div>
              <h3 className="font-display font-bold text-lg text-primary-900 mb-2">{s.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
