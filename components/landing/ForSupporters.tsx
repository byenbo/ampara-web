const perks = [
  { title: 'Tú eliges a quién apoyar', desc: 'Ves el perfil completo antes de hacer ninguna oferta.' },
  { title: 'Negocias las condiciones', desc: 'Propón el importe y el plazo que más te convengan.' },
  { title: 'Los acuerdos quedan registrados', desc: 'Todo queda documentado en la plataforma.' },
]

export function ForSupporters() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-container mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-3">Para apoyadores</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-900 mb-6">
            Elige en quién confiar
          </h2>
          <p className="text-neutral-500 mb-8 leading-relaxed">
            En Ampara no eres un inversor. Eres una persona que decide apoyar a otra persona real,
            con toda la información por delante y en tus propios términos.
          </p>
          <div className="flex flex-col gap-4">
            {perks.map((p) => (
              <div key={p.title} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-neutral-800 text-sm">{p.title}</div>
                  <div className="text-neutral-500 text-sm">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard visual */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-lg p-6">
          <div className="font-display font-bold text-neutral-800 mb-4 text-sm">Mis apoyos activos</div>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Laura M.', due: '15 jun', amount: '300 €', status: 'Al día', ok: true },
              { name: 'Carlos T.', due: '1 jul', amount: '800 €', status: 'Al día', ok: true },
              { name: 'Ana P.', due: '22 abr', amount: '150 €', status: 'Pendiente', ok: false },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                    {row.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-800">{row.name}</div>
                    <div className="text-xs text-neutral-400">Vence {row.due}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary-700">{row.amount}</div>
                  <div className={`text-xs font-medium ${row.ok ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {row.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between">
            <span className="text-sm text-neutral-500">Total gestionado</span>
            <span className="font-bold text-primary-700">1.250 €</span>
          </div>
        </div>
      </div>
    </section>
  )
}
