'use client'

import { useState } from 'react'
import { acceptOffer, rejectOffer } from '@/app/actions/offers'

export function OfferActions({
  offerId,
  requestId,
}: {
  offerId: string
  requestId: string
}) {
  const [loading, setLoading] = useState<'accept' | 'reject' | null>(null)
  const [done, setDone] = useState(false)

  async function handleAccept() {
    setLoading('accept')
    await acceptOffer(offerId, requestId)
    setDone(true)
  }

  async function handleReject() {
    setLoading('reject')
    await rejectOffer(offerId, requestId)
    setDone(true)
  }

  if (done) return null

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={handleAccept}
        disabled={loading !== null}
        className="flex-1 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-900 transition-colors disabled:opacity-60"
      >
        {loading === 'accept' ? 'Aceptando...' : 'Aceptar'}
      </button>
      <button
        onClick={handleReject}
        disabled={loading !== null}
        className="flex-1 py-2 rounded-lg border border-neutral-200 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors disabled:opacity-60"
      >
        {loading === 'reject' ? 'Rechazando...' : 'Rechazar'}
      </button>
    </div>
  )
}
