import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { OfferChat } from '@/components/dashboard/OfferChat'
import { Badge } from '@/components/ui/Badge'
import type { Profile } from '@/types'

export const metadata = { title: 'Chat — Ampara' }

export default async function ChatPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const { data: offer } = await supabase
    .from('offers')
    .select('*, profiles(full_name, city, trust_score), requests(user_id, amount, repayment_days, reason, city)')
    .eq('id', offerId)
    .single()

  if (!offer) notFound()

  const isSupporter = offer.supporter_id === user.id
  const isBorrower = offer.requests?.user_id === user.id
  if (!isSupporter && !isBorrower) notFound()

  const p = profile as Profile
  const otherName = isSupporter
    ? (offer.requests as { user_id: string } & { borrower?: { full_name: string } })?.borrower?.full_name ?? 'Solicitante'
    : offer.profiles?.full_name ?? 'Apoyador'

  const statusLabel = { pending: 'Pendiente', accepted: 'Aceptada', rejected: 'Rechazada' }
  const statusVariant = { pending: 'amber', accepted: 'green', rejected: 'red' } as const

  return (
    <>
      <TopBar profile={p} title={`Chat con ${otherName}`} />
      <main className="flex-1 flex flex-col overflow-hidden p-4 md:p-6 gap-4 max-w-2xl mx-auto w-full">
        {/* Offer summary */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4 flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="text-xs text-neutral-400 mb-0.5">Oferta para solicitud de</div>
            <div className="font-semibold text-neutral-800 text-sm">
              {offer.requests?.amount?.toLocaleString('es-ES')} € · {offer.requests?.repayment_days} días
            </div>
            <div className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{offer.requests?.reason}</div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge variant={statusVariant[offer.status as keyof typeof statusVariant]}>
              {statusLabel[offer.status as keyof typeof statusLabel]}
            </Badge>
            <Link
              href={`/dashboard/chat/${offerId}/contrato`}
              className="text-xs text-primary-600 hover:text-primary-800 flex items-center gap-1 font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ver contrato
            </Link>
          </div>
        </div>

        {/* Chat */}
        <div className="bg-white rounded-xl border border-neutral-200 flex flex-col flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          <OfferChat
            offerId={offerId}
            currentUserId={user.id}
            currentUserName={p.full_name ?? 'Tú'}
          />
        </div>
      </main>
    </>
  )
}
