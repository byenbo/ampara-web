'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function acceptOffer(offerId: string, requestId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { data: offer } = await supabase
    .from('offers')
    .select('*, requests(user_id, amount)')
    .eq('id', offerId)
    .single()

  if (!offer) return { error: 'Oferta no encontrada' }
  if (offer.requests?.user_id !== user.id) return { error: 'Sin permisos' }

  // Marcar esta oferta como aceptada
  await supabase.from('offers').update({ status: 'accepted' }).eq('id', offerId)

  // Rechazar las demás ofertas pendientes de esta solicitud
  await supabase
    .from('offers')
    .update({ status: 'rejected' })
    .eq('request_id', requestId)
    .eq('status', 'pending')
    .neq('id', offerId)

  // Marcar la solicitud como en progreso
  await supabase.from('requests').update({ status: 'in_progress' }).eq('id', requestId)

  // Crear el acuerdo
  await supabase.from('agreements').insert({
    request_id:      requestId,
    borrower_id:     user.id,
    supporter_id:    offer.supporter_id,
    amount:          offer.proposed_amount ?? offer.requests?.amount,
    repayment_terms: offer.proposed_terms,
    agreement_status: 'active',
  })

  revalidatePath(`/dashboard/solicitudes/${requestId}`)
  revalidatePath('/dashboard/acuerdos')
  revalidatePath('/dashboard/ofertas')
  return { success: true }
}

export async function rejectOffer(offerId: string, requestId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { data: offer } = await supabase
    .from('offers')
    .select('*, requests(user_id)')
    .eq('id', offerId)
    .single()

  if (!offer) return { error: 'Oferta no encontrada' }
  if (offer.requests?.user_id !== user.id) return { error: 'Sin permisos' }

  await supabase.from('offers').update({ status: 'rejected' }).eq('id', offerId)

  revalidatePath(`/dashboard/solicitudes/${requestId}`)
  revalidatePath('/dashboard/ofertas')
  return { success: true }
}
