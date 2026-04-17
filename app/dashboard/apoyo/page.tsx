import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { RequestCard } from '@/components/dashboard/RequestCard'
import { OfferCard } from '@/components/dashboard/OfferCard'
import { Badge } from '@/components/ui/Badge'
import type { Profile, Request, Offer } from '@/types'

export const metadata = { title: 'Apoyar — Ampara' }

export default async function SupporterDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  if (!['apoyador', 'ambos'].includes(profile?.role ?? '')) {
    redirect('/dashboard')
  }

  const [{ data: openRequests }, { data: myOffers }] = await Promise.all([
    supabase
      .from('requests')
      .select('*, profiles(full_name, city, trust_score, role)')
      .eq('status', 'open')
      .neq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(9),
    supabase
      .from('offers')
      .select('*, profiles(full_name, city, trust_score), requests(amount, reason, city)')
      .eq('supporter_id', user!.id)
      .order('created_at', { ascending: false }),
  ])

  const p = profile as Profile

  return (
    <>
      <TopBar profile={p} title="Apoyar a la comunidad" />
      <main className="flex-1 p-6 flex flex-col gap-8">
        {/* Open requests marketplace */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-neutral-900">Solicitudes disponibles</h2>
              <p className="text-neutral-500 text-sm mt-0.5">
                {openRequests?.length ?? 0} solicitudes abiertas ahora mismo
              </p>
            </div>
          </div>

          {openRequests && openRequests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(openRequests as Request[]).map((r) => (
                <RequestCard key={r.id} request={r} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-neutral-900 mb-2">No hay solicitudes abiertas</h3>
              <p className="text-neutral-500 text-sm">
                Vuelve más tarde. La comunidad está creciendo.
              </p>
            </div>
          )}
        </div>

        {/* My offers */}
        {myOffers && myOffers.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-neutral-900 mb-4">Mis ofertas enviadas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(myOffers as Offer[]).map((o) => (
                <OfferCard key={o.id} offer={o} isOwner={false} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
