'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ContratoData {
  offerId: string
  supporterName: string
  supporterCity: string
  borrowerName: string
  borrowerCity: string
  amount: number
  days: number
  reason: string
  repaymentTerms: string
  city: string
}

export function ContratoEditor({ data }: { data: ContratoData }) {
  const [fields, setFields] = useState({
    supporterName: data.supporterName,
    supporterCity: data.supporterCity,
    borrowerName: data.borrowerName,
    borrowerCity: data.borrowerCity,
    amount: String(data.amount),
    days: String(data.days),
    reason: data.reason,
    repaymentTerms: data.repaymentTerms,
    city: data.city,
    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
    extraClause: '',
  })

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            href={`/dashboard/chat/${data.offerId}`}
            className="text-sm text-neutral-500 hover:text-neutral-800 flex items-center gap-1.5 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al chat
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-700 text-white text-sm font-semibold hover:bg-primary-900 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir / Guardar PDF
          </button>
        </div>

        <p className="text-xs text-neutral-400 text-center mb-4 print:hidden">
          Edita cualquier campo antes de imprimir o guardar como PDF.
        </p>

        {/* Contract card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 print:shadow-none print:border-0 print:rounded-none">

          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-neutral-100">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 mb-3">
              <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="font-display font-bold text-2xl text-primary-700">Ampara</div>
            <h1 className="text-lg font-bold text-neutral-900 mt-1">Acuerdo de Apoyo Económico entre Particulares</h1>
            <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-400">Lugar:</span>
                <input
                  value={fields.city}
                  onChange={set('city')}
                  className="text-xs font-medium text-neutral-700 border-b border-dashed border-neutral-300 focus:border-primary-500 outline-none bg-transparent w-28 print:border-0"
                />
              </div>
              <span className="text-neutral-200">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-400">Fecha:</span>
                <input
                  value={fields.date}
                  onChange={set('date')}
                  className="text-xs font-medium text-neutral-700 border-b border-dashed border-neutral-300 focus:border-primary-500 outline-none bg-transparent w-40 print:border-0"
                />
              </div>
            </div>
          </div>

          {/* Section 1: Parties */}
          <section className="mb-7">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-4">1. Partes del acuerdo</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-xl p-4">
                <div className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-3">Apoyador</div>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-neutral-400">Nombre completo</label>
                    <input
                      value={fields.supporterName}
                      onChange={set('supporterName')}
                      className="block w-full text-sm font-semibold text-neutral-800 border-b border-dashed border-primary-200 focus:border-primary-500 outline-none bg-transparent py-0.5 print:border-0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400">Ciudad</label>
                    <input
                      value={fields.supporterCity}
                      onChange={set('supporterCity')}
                      className="block w-full text-sm text-neutral-700 border-b border-dashed border-primary-200 focus:border-primary-500 outline-none bg-transparent py-0.5 print:border-0"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Solicitante</div>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-neutral-400">Nombre completo</label>
                    <input
                      value={fields.borrowerName}
                      onChange={set('borrowerName')}
                      className="block w-full text-sm font-semibold text-neutral-800 border-b border-dashed border-neutral-300 focus:border-primary-500 outline-none bg-transparent py-0.5 print:border-0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400">Ciudad</label>
                    <input
                      value={fields.borrowerCity}
                      onChange={set('borrowerCity')}
                      className="block w-full text-sm text-neutral-700 border-b border-dashed border-neutral-300 focus:border-primary-500 outline-none bg-transparent py-0.5 print:border-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Amount */}
          <section className="mb-7">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-4">2. Objeto del acuerdo</h2>
            <div className="bg-neutral-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Importe (€)</label>
                  <div className="flex items-center gap-1">
                    <input
                      value={fields.amount}
                      onChange={set('amount')}
                      type="number"
                      className="text-2xl font-display font-bold text-primary-700 border-b-2 border-dashed border-primary-200 focus:border-primary-600 outline-none bg-transparent w-28 print:border-0"
                    />
                    <span className="text-2xl font-display font-bold text-primary-700">€</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Plazo (días)</label>
                  <div className="flex items-center gap-1">
                    <input
                      value={fields.days}
                      onChange={set('days')}
                      type="number"
                      className="text-xl font-semibold text-neutral-700 border-b-2 border-dashed border-neutral-200 focus:border-primary-500 outline-none bg-transparent w-16 print:border-0"
                    />
                    <span className="text-sm text-neutral-400">días</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Motivo del préstamo</label>
                <textarea
                  value={fields.reason}
                  onChange={set('reason')}
                  rows={2}
                  className="w-full text-sm text-neutral-700 border border-dashed border-neutral-200 focus:border-primary-400 outline-none bg-white rounded-lg px-3 py-2 resize-none print:border-0 print:px-0"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Repayment */}
          <section className="mb-7">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-4">3. Condiciones de devolución</h2>
            <div className="bg-neutral-50 rounded-xl p-4">
              <label className="text-xs text-neutral-400 block mb-1">Forma y condiciones acordadas</label>
              <textarea
                value={fields.repaymentTerms}
                onChange={set('repaymentTerms')}
                rows={3}
                className="w-full text-sm text-neutral-700 border border-dashed border-neutral-200 focus:border-primary-400 outline-none bg-white rounded-lg px-3 py-2 resize-none print:border-0 print:px-0"
              />
            </div>
          </section>

          {/* Section 4: Extra clause */}
          <section className="mb-7">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-4">4. Cláusula adicional <span className="text-neutral-300 font-normal normal-case tracking-normal">(opcional)</span></h2>
            <div className="bg-neutral-50 rounded-xl p-4">
              <textarea
                value={fields.extraClause}
                onChange={set('extraClause')}
                rows={2}
                placeholder="Añade cualquier condición extra que hayáis acordado en el chat..."
                className="w-full text-sm text-neutral-700 border border-dashed border-neutral-200 focus:border-primary-400 outline-none bg-white rounded-lg px-3 py-2 resize-none placeholder:text-neutral-300 print:border-0 print:px-0"
              />
            </div>
          </section>

          {/* Section 5: General terms */}
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-3">5. Condiciones generales</h2>
            <ul className="text-xs text-neutral-500 space-y-1.5 leading-relaxed">
              <li className="flex gap-2"><span className="text-primary-400 shrink-0">·</span>Este acuerdo es voluntario y entre particulares, sin intermediación financiera regulada.</li>
              <li className="flex gap-2"><span className="text-primary-400 shrink-0">·</span>Ampara actúa como plataforma de encuentro y no garantiza el cumplimiento del acuerdo.</li>
              <li className="flex gap-2"><span className="text-primary-400 shrink-0">·</span>En caso de incumplimiento, las partes podrán acudir a la vía extrajudicial o judicial.</li>
              <li className="flex gap-2"><span className="text-primary-400 shrink-0">·</span>El historial de conversaciones en el chat de Ampara podrá usarse como evidencia.</li>
              <li className="flex gap-2"><span className="text-primary-400 shrink-0">·</span>Ambas partes declaran haber leído y aceptado estas condiciones.</li>
            </ul>
          </section>

          {/* Signatures */}
          <div className="border-t border-neutral-100 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-5">6. Firmas</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="h-14 border-b-2 border-neutral-200 mb-2" />
                <div className="text-xs text-neutral-400 mb-0.5">Apoyador</div>
                <div className="text-sm font-semibold text-neutral-800">{fields.supporterName}</div>
                <div className="text-xs text-neutral-400 mt-2">Fecha: _______________</div>
              </div>
              <div>
                <div className="h-14 border-b-2 border-neutral-200 mb-2" />
                <div className="text-xs text-neutral-400 mb-0.5">Solicitante</div>
                <div className="text-sm font-semibold text-neutral-800">{fields.borrowerName}</div>
                <div className="text-xs text-neutral-400 mt-2">Fecha: _______________</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-neutral-50 flex items-center justify-between">
            <div className="text-xs text-neutral-300">ampara.es</div>
            <div className="text-xs text-neutral-300">Ref: {data.offerId.slice(0, 8).toUpperCase()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
