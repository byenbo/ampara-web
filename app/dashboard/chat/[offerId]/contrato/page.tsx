import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'

export const metadata = { title: 'Contrato — Ampara' }

export default async function ContratoPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params
  const supabase = await createClient()
  const admin = createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: offer } = await admin
    .from('offers')
    .select('*, profiles(full_name, city, email), requests(user_id, amount, repayment_days, reason, city, repayment_type, repayment_description)')
    .eq('id', offerId)
    .single()

  if (!offer) notFound()

  const isSupporter = offer.supporter_id === user.id
  const isBorrower = offer.requests?.user_id === user.id
  if (!isSupporter && !isBorrower) notFound()

  const { data: borrowerProfile } = await admin
    .from('profiles')
    .select('full_name, city, email')
    .eq('id', offer.requests?.user_id)
    .single()

  const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  const amount = offer.proposed_amount ?? offer.requests?.amount
  const days = offer.requests?.repayment_days
  const supporterName = offer.profiles?.full_name ?? 'Apoyador'
  const borrowerName = borrowerProfile?.full_name ?? 'Solicitante'
  const city = offer.requests?.city ?? offer.profiles?.city ?? '—'

  return (
    <main className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            href={`/dashboard/chat/${offerId}`}
            className="text-sm text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al chat
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir / Guardar PDF
          </button>
        </div>

        {/* Contract */}
        <div className="bg-white rounded-xl border border-neutral-200 p-8 text-neutral-800 font-serif leading-relaxed">
          <div className="text-center mb-8">
            <div className="font-display font-bold text-2xl text-primary-700 mb-1">Ampara</div>
            <h1 className="text-xl font-bold text-neutral-900">Acuerdo de Apoyo Económico entre Particulares</h1>
            <div className="text-sm text-neutral-400 mt-1">{today} · {city}</div>
          </div>

          <p className="mb-6 text-sm">
            En {city}, a {today}, las partes abajo firmantes acuerdan voluntariamente el siguiente
            acuerdo de apoyo económico a través de la plataforma <strong>Ampara</strong>, bajo las
            condiciones que se detallan:
          </p>

          <h2 className="font-bold text-base mb-3 border-b border-neutral-100 pb-1">1. Partes</h2>
          <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
            <div>
              <div className="text-xs text-neutral-400 mb-1 font-sans">APOYADOR</div>
              <div className="font-semibold">{supporterName}</div>
              <div className="text-neutral-500">{offer.profiles?.city ?? '—'}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400 mb-1 font-sans">SOLICITANTE</div>
              <div className="font-semibold">{borrowerName}</div>
              <div className="text-neutral-500">{borrowerProfile?.city ?? '—'}</div>
            </div>
          </div>

          <h2 className="font-bold text-base mb-3 border-b border-neutral-100 pb-1">2. Objeto del acuerdo</h2>
          <p className="text-sm mb-6">
            El apoyador se compromete a prestar al solicitante la cantidad de{' '}
            <strong>{amount?.toLocaleString('es-ES')} €</strong> con el fin de:{' '}
            {offer.requests?.reason ?? '—'}
          </p>

          <h2 className="font-bold text-base mb-3 border-b border-neutral-100 pb-1">3. Condiciones de devolución</h2>
          <div className="text-sm mb-6 space-y-2">
            <div><span className="text-neutral-400">Plazo:</span> {days} días desde la entrega del importe.</div>
            <div><span className="text-neutral-400">Forma de devolución:</span> {offer.proposed_terms ?? offer.requests?.repayment_description ?? '—'}</div>
            {offer.requests?.repayment_type && (
              <div><span className="text-neutral-400">Tipo:</span> {offer.requests.repayment_type}</div>
            )}
          </div>

          <h2 className="font-bold text-base mb-3 border-b border-neutral-100 pb-1">4. Condiciones generales</h2>
          <ul className="text-sm mb-6 space-y-2 list-disc list-inside text-neutral-700">
            <li>Este acuerdo es voluntario y entre particulares, sin intermediación financiera regulada.</li>
            <li>Ampara actúa como plataforma de encuentro y no garantiza el cumplimiento del acuerdo.</li>
            <li>En caso de incumplimiento, las partes podrán acudir a la vía extrajudicial o judicial correspondiente.</li>
            <li>El historial de conversaciones en el chat de Ampara podrá usarse como evidencia del acuerdo alcanzado.</li>
            <li>Ambas partes declaran haber leído y entendido estas condiciones antes de firmar.</li>
          </ul>

          <h2 className="font-bold text-base mb-6 border-b border-neutral-100 pb-1">5. Firmas</h2>
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <div className="border-t-2 border-neutral-300 pt-3">
                <div className="text-xs text-neutral-400 mb-1">Apoyador</div>
                <div className="font-semibold text-sm">{supporterName}</div>
                <div className="text-xs text-neutral-400 mt-4">Fecha: _______________</div>
              </div>
            </div>
            <div>
              <div className="border-t-2 border-neutral-300 pt-3">
                <div className="text-xs text-neutral-400 mb-1">Solicitante</div>
                <div className="font-semibold text-sm">{borrowerName}</div>
                <div className="text-xs text-neutral-400 mt-4">Fecha: _______________</div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-300">
            Generado por Ampara · ampara.es · Referencia: {offerId.slice(0, 8).toUpperCase()}
          </div>
        </div>
      </div>
    </main>
  )
}
