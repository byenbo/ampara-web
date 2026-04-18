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
    </div>
  )
}
