'use client'

import { useState } from 'react'

const faqs = [
  {
    q: '¿Ampara es un banco o una entidad financiera?',
    a: 'No. Ampara es una plataforma de confianza entre personas. No somos un banco, ni concedemos préstamos. Facilitamos que dos personas lleguen a un acuerdo de apoyo económico directo.',
  },
  {
    q: '¿Es seguro compartir mis datos personales?',
    a: 'Sí. Tus datos están cifrados y nunca se comparten con terceros sin tu consentimiento. La verificación de identidad se realiza de forma segura y solo usamos los datos necesarios para operar.',
  },
  {
    q: '¿Qué pasa si alguien no devuelve el apoyo?',
    a: 'El acuerdo queda registrado en la plataforma y el incumplimiento afecta negativamente a la puntuación del usuario. En casos graves, el acuerdo puede ser reportado a la comunidad.',
  },
  {
    q: '¿Cuánto cobra Ampara?',
    a: 'Ampara no cobra comisiones por las transacciones entre usuarios. El modelo de negocio se basa en funcionalidades premium opcionales, no en comisiones ocultas.',
  },
  {
    q: '¿Cuánto tardo en recibir mi primera oferta?',
    a: 'La media es de 48 horas. Depende de la cantidad solicitada, la claridad de tu solicitud y tu puntuación de confianza.',
  },
  {
    q: '¿Puedo ser solicitante y apoyador a la vez?',
    a: 'Sí. Al crear tu perfil puedes elegir el rol "Ambos" y actuar en los dos sentidos dentro de la plataforma.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-neutral-50">
      <div className="max-w-container mx-auto px-5 max-w-2xl">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-900">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-neutral-800 text-sm pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
