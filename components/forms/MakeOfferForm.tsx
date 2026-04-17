'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function MakeOfferForm({
  requestId,
  supporterId,
}: {
  requestId: string
  supporterId: string
}) {
  const router = useRouter()
  const supabase = createClient()
  const [amount, setAmount] = useState('')
  const [terms, setTerms] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!amount || !terms) { setError('Completa todos los campos.'); return }
    setLoading(true)
    setError(null)

    const { error: err } = await supabase.from('offers').insert({
      request_id:      requestId,
      supporter_id:    supporterId,
      proposed_amount: Number(amount),
      proposed_terms:  terms,
      status:          'pending',
    })

    setLoading(false)
    if (err) { setError('Error al enviar la oferta.'); return }
    setSuccess(true)
    router.refresh()
  }

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-4 text-sm text-emerald-700 font-medium">
        ✓ Oferta enviada correctamente. El solicitante la revisará pronto.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Importe que ofreces (€)"
        type="number"
        placeholder="300"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">Condiciones que propones</label>
        <textarea
          rows={3}
          placeholder="Describe el plazo, la forma de devolución o cualquier condición que quieras negociar..."
          className="w-full rounded-lg border-[1.5px] border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-300 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">{error}</div>
      )}
      <Button type="submit" loading={loading}>
        Enviar oferta
      </Button>
    </form>
  )
}
