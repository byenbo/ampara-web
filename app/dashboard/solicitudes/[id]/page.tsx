import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { OfferCard } from '@/components/dashboard/OfferCard'
import { Badge } from '@/components/ui/Badge'
import { MakeOfferForm } from '@/components/forms/MakeOfferForm'
import type { Profile, Request, Offer } from '@/types'

export const metadata = { title: 'Solicitud — Ampara' }

const repaymentLabel: Record<string, string> = {
  dinero: 'Solo dinero', dinero_servicio: 'Dinero + servicio',
  dinero_producto: 'Dinero + producto', personalizado: 'Acuerdo personalizado',
}

const urgencyLabel: Record<string, string> = { alta: 'Urgente', media: 'Normal', baja: 'Flexible' }
const urgencyColor: Record<string, 'red' | 'amber' | 'green'> = { alta: 'red', media: 'amber', baja: 'green' }

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  const [{ data: request }, { data: offers }] = await Promise.all([
    supabase
      .from('requests')
      .select('*, profiles(full_name, city, trust_score, role)')
      .eq('id', id)
      .single(),
    supabase
      .from('offers')
      .select('*, profiles(full_name, city, trust_score)')
      .eq('request_id', id)
      .order('created_at', { ascending: false }),
  ])

  if (!request) notFound()

  const p = profile as Profile
  const r = request as Request
  const isOwner = r.user_id === user!.id
  const canOffer = !isOwner && (p.role === 'apoyador' || p.role === 'ambos')

  return (
    <>
      <TopBar profile={p} />
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {/* Request card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-lg">
                  {r.profiles?.full_name?.[0] ?? '?'}
                </div>
                <div>
                  <div className="font-semibold text-neutral-800">{r.profiles?.full_name}</div>
                  <div className="text-sm text-neutral-400">{r.city} · {r.profiles?.trust_score} pts</div>
                </div>
              </div>
              <div className="flex gap-2">
                {r.urgency_level && (
                  <Badge variant={urgencyColor[r.urgency_level]}>{urgencyLabel[r.urgency_level]}</Badge>
                )}
                <Badge variant="neutral" className="capitalize">{r.status}</Badge>
              </div>
            </div>

            <div className="font-display font-extrabold text-4xl text-primary-700 mb-1">
              {r.amount.toLocaleString('es-ES')} €
            </div>
            <div className="text-neutral-500 text-sm mb-5">
              Plazo: {r.repayment_days} días · {r.profession} · {r.income_frequency}
            </div>

            <h3 className="font-semibold text-neutral-800 mb-2 text-sm">Motivo</h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-5">{r.reason}</p>

            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
              <div>
                <div className="text-xs text-neutral-400 mb-1">Tipo de devolución</div>
                <div className="text-sm font-medium text-neutral-800">
                  {r.repayment_type ? repaymentLabel[r.repayment_type] : '—'}
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1">Descripción de devolución</div>
                <div className="text-sm text-neutral-700">{r.repayment_description ?? '—'}</div>
              </div>
              {r.guarantor_name && (
                <div>
                  <div className="text-xs text-neutral-400 mb-1">Aval</div>
                  <div className="text-sm font-medium text-neutral-800">{r.guarantor_name}</div>
                </div>
              )}
            </div>
          </div>

          {/* Make offer */}
          {canOffer && r.status === 'open' && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-display font-bold text-neutral-900 mb-4">Hacer una oferta</h3>
              <MakeOfferForm requestId={r.id} supporterId={user!.id} />
            </div>
          )}

          {/* Offers */}
          {isOwner && offers && offers.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-neutral-900 mb-4">
                Ofertas recibidas ({offers.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(offers as Offer[]).map((o) => (
                  <OfferCard key={o.id} offer={o} isOwner={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
