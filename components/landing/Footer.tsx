import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-neutral-950 py-14">
      <div className="max-w-container mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-bold text-xl text-white mb-3">
            Ampar<span className="text-primary-500">a</span>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Apoyo financiero entre personas. Sin bancos, sin comisiones ocultas.
          </p>
        </div>

        <div>
          <div className="font-semibold text-neutral-300 text-sm mb-4">Plataforma</div>
          <ul className="flex flex-col gap-2">
            {['Cómo funciona', 'Solicitudes', 'Para apoyadores', 'FAQ'].map((l) => (
              <li key={l}>
                <a href="#" className="text-neutral-500 text-sm hover:text-white transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold text-neutral-300 text-sm mb-4">Empresa</div>
          <ul className="flex flex-col gap-2">
            {['Sobre Ampara', 'Blog', 'Contacto'].map((l) => (
              <li key={l}>
                <a href="#" className="text-neutral-500 text-sm hover:text-white transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold text-neutral-300 text-sm mb-4">Legal</div>
          <ul className="flex flex-col gap-2">
            {['Privacidad', 'Términos de uso', 'Cookies'].map((l) => (
              <li key={l}>
                <a href="#" className="text-neutral-500 text-sm hover:text-white transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-container mx-auto px-5 mt-10 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between gap-2">
        <p className="text-neutral-600 text-sm">© 2026 Ampara · ampara.es</p>
        <p className="text-neutral-600 text-sm">Hecho con ♥ en Málaga</p>
      </div>
    </footer>
  )
}
