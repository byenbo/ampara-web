import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { OfferActions } from '@/components/dashboard/OfferActions'
import type { Offer } from '@/types'

interface OfferCardProps {
  offer: Offer
  isOwner?: boolean
}

const statusConfig = {
  pending:  { label: 'Pendiente', variant: 'amber' as const },
  accepted: { label: 'Aceptada',  variant: 'green' as const },
  rejected: { label: 'Rechazada', variant: 'red' as const },
}

export function OfferCard({ offer, isOwner }: OfferCardProps) {
  const status = statusConfig[offer.status]
  const name = offer.profiles?.full_name ?? 'Apoyador'

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-sm">
            {name[0]}
          </div>
          <div>
            <div className="font-semibold text-neutral-800 text-sm">{name}</div>
            <div className="text-xs text-neutral-400">
              {offer.profiles?.city} · {offer.profiles?.trust_score} pts
            </div>
          </div>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="font-display font-bold text-xl text-primary-700 mb-1">
        {offer.proposed_amount?.toLocaleString('es-ES')} €
      </div>

      {offer.proposed_terms && (
        <p className="text-sm text-neutral-500 mb-3 leading-relaxed">{offer.proposed_terms}</p>
      )}

      <div className="text-xs text-neutral-400">
        {new Date(offer.created_at).toLocaleDateString('es-ES', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}
      </div>

      {isOwner && offer.status === 'pending' && (
        <OfferActions offerId={offer.id} requestId={offer.request_id} />
      )}

      <Link
        href={`/dashboard/chat/${offer.id}`}
        className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-neutral-200 text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Abrir chat
      </Link>
    </div>
  )
}
