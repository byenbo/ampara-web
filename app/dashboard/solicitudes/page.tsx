import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { RequestCard } from '@/components/dashboard/RequestCard'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { Profile, Request } from '@/types'

export const metadata = { title: 'Solicitudes — Ampara' }

export default async function RequestsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  const { data: requests } = await supabase
    .from('requests')
    .select('*, profiles(full_name, city, trust_score, role)')
    .eq('status', 'open')
    .order('created_at', { ascending: false })

  const p = profile as Profile

  return (
    <>
      <TopBar profile={p} title="Marketplace de solicitudes" />
      <main className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-neutral-500 text-sm">
            {requests?.length ?? 0} solicitudes abiertas
          </p>
          {(p.role === 'solicitante' || p.role === 'ambos') && (
            <Link href="/dashboard/solicitudes/nueva">
              <Button variant="primary">+ Nueva solicitud</Button>
            </Link>
          )}
        </div>

        {requests && requests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(requests as Request[]).map((r) => (
              <RequestCard key={r.id} request={r} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-16 text-center">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="font-display font-bold text-neutral-900 mb-2">No hay solicitudes abiertas</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Sé el primero en publicar una solicitud en la comunidad.
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
