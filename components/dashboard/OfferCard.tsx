import { Badge } from '@/components/ui/Badge'
import type { Offer } from '@/types'

interface OfferCardProps {
  offer: Offer
  onAccept?: (id: string) => void
  onReject?: (id: string) => void
  isOwner?: boolean
}

const statusConfig = {
  pending:  { label: 'Pendiente', variant: 'amber' as const },
  accepted: { label: 'Aceptada',  variant: 'green' as const },
  rejected: { label: 'Rechazada', variant: 'red' as const },
}

export function OfferCard({ offer, onAccept, onReject, isOwner }: OfferCardProps) {
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
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onAccept?.(offer.id)}
            className="flex-1 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-900 transition-colors"
          >
            Aceptar
          </button>
          <button
            onClick={() => onReject?.(offer.id)}
            className="flex-1 py-2 rounded-lg border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors"
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
  )
}
