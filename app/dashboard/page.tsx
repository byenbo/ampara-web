import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { StatCard } from '@/components/dashboard/StatCard'
import { RequestCard } from '@/components/dashboard/RequestCard'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { Profile, Request } from '@/types'

export const metadata = { title: 'Dashboard — Ampara' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  const [
    { count: requestCount },
    { count: offerCount },
    { count: agreementCount },
    { data: recentRequests },
  ] = await Promise.all([
    supabase.from('requests').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
    supabase.from('offers').select('*', { count: 'exact', head: true }).eq('supporter_id', user!.id),
    supabase.from('agreements').select('*', { count: 'exact', head: true })
      .or(`borrower_id.eq.${user!.id},supporter_id.eq.${user!.id}`),
    supabase.from('requests')
      .select('*, profiles(full_name, city, trust_score, role)')
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(3),
  ])

  const p = profile as Profile

  return (
    <>
      <TopBar profile={p} />
      <main className="flex-1 p-6 flex flex-col gap-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Mis solicitudes"
            value={requestCount ?? 0}
            color="teal"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <StatCard
            label="Ofertas realizadas"
            value={offerCount ?? 0}
            color="amber"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
          />
          <StatCard
            label="Acuerdos activos"
            value={agreementCount ?? 0}
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          />
        </div>

        {/* Shortcuts */}
        <div className="flex flex-wrap gap-3">
          {(p.role === 'solicitante' || p.role === 'ambos') && (
            <Link href="/dashboard/solicitudes/nueva">
              <Button variant="primary">+ Nueva solicitud</Button>
            </Link>
          )}
          <Link href="/dashboard/solicitudes">
            <Button variant="outline">Ver marketplace</Button>
          </Link>
          <Link href="/dashboard/perfil">
            <Button variant="ghost">Mi perfil</Button>
          </Link>
        </div>

        {/* Recent open requests */}
        {recentRequests && recentRequests.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-neutral-900">Solicitudes recientes</h2>
              <Link href="/dashboard/solicitudes" className="text-sm text-primary-700 hover:underline font-medium">
                Ver todas →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {(recentRequests as Request[]).map((r) => (
                <RequestCard key={r.id} request={r} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {(!recentRequests || recentRequests.length === 0) && (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="font-display font-bold text-neutral-900 mb-2">Aún no hay solicitudes</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Sé el primero en publicar una solicitud o espera a que lleguen de la comunidad.
            </p>
            {(p.role === 'solicitante' || p.role === 'ambos') && (
              <Link href="/dashboard/solicitudes/nueva">
                <Button variant="primary">Publicar solicitud</Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </>
  )
}
