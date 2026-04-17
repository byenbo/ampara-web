import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { Request } from '@/types'

interface RequestCardProps {
  request: Request
  showActions?: boolean
}

const urgencyColor: Record<string, 'red' | 'amber' | 'green'> = {
  alta:  'red',
  media: 'amber',
  baja:  'green',
}

const urgencyLabel: Record<string, string> = {
  alta:  'Urgente',
  media: 'Normal',
  baja:  'Flexible',
}

const repaymentLabel: Record<string, string> = {
  dinero:          'Solo dinero',
  dinero_servicio: 'Dinero + servicio',
  dinero_producto: 'Dinero + producto',
  personalizado:   'Acuerdo personalizado',
}

export function RequestCard({ request, showActions = true }: RequestCardProps) {
  const initials = request.profiles?.full_name?.[0] ?? '?'
  const name = request.profiles?.full_name ?? 'Anónimo'
  const score = request.profiles?.trust_score ?? 0

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-neutral-800 text-sm truncate">{name}</div>
          <div className="text-xs text-neutral-400">{request.city}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-neutral-400">Puntuación</div>
          <div className="font-bold text-primary-700 text-sm">{score} pts</div>
        </div>
      </div>

      <div className="font-display font-extrabold text-2xl text-primary-700 mb-1">
        {request.amount.toLocaleString('es-ES')} €
      </div>
      <div className="text-sm text-neutral-500 mb-3">
        Plazo: {request.repayment_days} días ·{' '}
        {request.profession}
      </div>

      {request.reason && (
        <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">{request.reason}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {request.urgency_level && (
          <Badge variant={urgencyColor[request.urgency_level] ?? 'neutral'}>
            {urgencyLabel[request.urgency_level]}
          </Badge>
        )}
        {request.repayment_type && (
          <Badge variant="blue">
            {repaymentLabel[request.repayment_type] ?? request.repayment_type}
          </Badge>
        )}
      </div>

      {showActions && (
        <Link
          href={`/dashboard/solicitudes/${request.id}`}
          className="block w-full text-center py-2.5 rounded-lg border-2 border-primary-700 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors"
        >
          Ver solicitud →
        </Link>
      )}
    </div>
  )
}
