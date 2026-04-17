import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { OfferCard } from '@/components/dashboard/OfferCard'
import { Badge } from '@/components/ui/Badge'
import type { Profile, Offer } from '@/types'

export const metadata = { title: 'Ofertas — Ampara' }

export default async function OffersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  const [{ data: sent }, { data: received }] = await Promise.all([
    // Ofertas que yo he enviado (soy apoyador)
    supabase
      .from('offers')
      .select('*, profiles(full_name, city, trust_score), requests(amount, reason, city)')
      .eq('supporter_id', user!.id)
      .order('created_at', { ascending: false }),
    // Ofertas recibidas en mis solicitudes
    supabase
      .from('offers')
      .select('*, profiles(full_name, city, trust_score), requests!inner(user_id, amount, reason)')
      .eq('requests.user_id', user!.id)
      .order('created_at', { ascending: false }),
  ])

  const p = profile as Profile

  return (
    <>
      <TopBar profile={p} title="Ofertas" />
      <main className="flex-1 p-6 flex flex-col gap-8">
        {/* Sent offers */}
        <div>
          <h2 className="font-display font-bold text-neutral-900 mb-4">
            Ofertas enviadas ({sent?.length ?? 0})
          </h2>
          {sent && sent.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(sent as Offer[]).map((o) => (
                <OfferCard key={o.id} offer={o} isOwner={false} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
              <p className="text-neutral-500 text-sm">No has enviado ninguna oferta todavía.</p>
            </div>
          )}
        </div>

        {/* Received offers */}
        <div>
          <h2 className="font-display font-bold text-neutral-900 mb-4">
            Ofertas recibidas ({received?.length ?? 0})
          </h2>
          {received && received.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(received as Offer[]).map((o) => (
                <OfferCard key={o.id} offer={o} isOwner={true} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
              <p className="text-neutral-500 text-sm">Aún no has recibido ofertas en tus solicitudes.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
