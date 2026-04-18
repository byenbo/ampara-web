import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ContratoEditor } from '@/components/dashboard/ContratoEditor'

export const metadata = { title: 'Contrato — Ampara' }

export default async function ContratoPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params
  const supabase = await createClient()
  const admin = createAdminClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: offer } = await admin
    .from('offers')
    .select('*, profiles(full_name, city), requests(user_id, amount, repayment_days, reason, city, repayment_description)')
    .eq('id', offerId)
    .single()

  if (!offer) notFound()

  const isSupporter = offer.supporter_id === user.id
  const isBorrower = offer.requests?.user_id === user.id
  if (!isSupporter && !isBorrower) notFound()

  const { data: borrowerProfile } = await admin
    .from('profiles')
    .select('full_name, city')
    .eq('id', offer.requests?.user_id)
    .single()

  return (
    <ContratoEditor
      data={{
        offerId,
        supporterName: offer.profiles?.full_name ?? 'Apoyador',
        supporterCity: offer.profiles?.city ?? '',
        borrowerName:  borrowerProfile?.full_name ?? 'Solicitante',
        borrowerCity:  borrowerProfile?.city ?? '',
        amount:        offer.proposed_amount ?? offer.requests?.amount ?? 0,
        days:          offer.requests?.repayment_days ?? 30,
        reason:        offer.requests?.reason ?? '',
        repaymentTerms: offer.proposed_terms ?? offer.requests?.repayment_description ?? '',
        city:          offer.requests?.city ?? '',
      }}
    />
  )
}
