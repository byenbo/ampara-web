const stats = [
  { value: '512', label: 'acuerdos cerrados' },
  { value: '94%', label: 'devolución a tiempo' },
  { value: '48h', label: 'media primera oferta' },
  { value: '4.8★', label: 'valoración media' },
]

export function Stats() {
  return (
    <section className="bg-primary-900 py-8">
      <div className="max-w-container mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-white">{s.value}</div>
            <div className="text-sm text-primary-200 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
