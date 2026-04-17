import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { RequestCard } from '@/components/dashboard/RequestCard'
import { OfferCard } from '@/components/dashboard/OfferCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Profile, Request, Offer, Agreement } from '@/types'

export const metadata = { title: 'Mis solicitudes — Ampara' }

export default async function BorrowerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  if (!['solicitante', 'ambos'].includes(profile?.role ?? '')) {
    redirect('/dashboard')
  }

  const [{ data: requests }, { data: agreements }] = await Promise.all([
    supabase
      .from('requests')
      .select('*, profiles(full_name, city, trust_score, role)')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('agreements')
      .select('*, requests(reason, repayment_days), supporter:supporter_id(full_name, city)')
      .eq('borrower_id', user!.id)
      .order('created_at', { ascending: false }),
  ])

  const p = profile as Profile

  return (
    <>
      <TopBar profile={p} title="Mis solicitudes" />
      <main className="flex-1 p-6 flex flex-col gap-8">
        {/* CTA */}
        <div className="flex items-center justify-between">
          <p className="text-neutral-500 text-sm">
            {requests?.length
              ? `Tienes ${requests.length} solicitud${requests.length !== 1 ? 'es' : ''}`
              : 'Aún no tienes solicitudes'}
          </p>
          <Link href="/dashboard/solicitudes/nueva">
            <Button variant="primary">+ Nueva solicitud</Button>
          </Link>
        </div>

        {/* My requests */}
        {requests && requests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(requests as Request[]).map((r) => (
              <RequestCard key={r.id} request={r} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-display font-bold text-neutral-900 mb-2">Sin solicitudes todavía</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Publica tu primera solicitud y empieza a recibir ofertas de la comunidad.
            </p>
            <Link href="/dashboard/solicitudes/nueva">
              <Button variant="primary">Publicar solicitud</Button>
            </Link>
          </div>
        )}

        {/* Agreements */}
        {agreements && agreements.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-neutral-900 mb-4">Acuerdos activos</h2>
            <div className="flex flex-col gap-3">
              {agreements.map((a: Agreement & { supporter: { full_name: string; city: string } | null }) => (
                <div key={a.id} className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-neutral-800 text-sm">
                      Apoyado por {a.supporter?.full_name ?? '—'}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {a.amount?.toLocaleString('es-ES')} € · Iniciado{' '}
                      {new Date(a.created_at).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                  <Badge variant={a.agreement_status === 'active' ? 'green' : 'neutral'}>
                    {a.agreement_status === 'active' ? 'Activo' : 'Completado'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
