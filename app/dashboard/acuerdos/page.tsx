import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { Badge } from '@/components/ui/Badge'
import type { Profile, Agreement } from '@/types'

export const metadata = { title: 'Acuerdos — Ampara' }

export default async function AgreementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  const { data: agreements } = await supabase
    .from('agreements')
    .select(`
      *,
      requests(reason, repayment_days),
      borrower:borrower_id(full_name, city),
      supporter:supporter_id(full_name, city)
    `)
    .or(`borrower_id.eq.${user!.id},supporter_id.eq.${user!.id}`)
    .order('created_at', { ascending: false })

  const p = profile as Profile

  const statusConfig = {
    active:    { label: 'Activo',      variant: 'green'   as const },
    completed: { label: 'Completado',  variant: 'blue'    as const },
    defaulted: { label: 'Impagado',    variant: 'red'     as const },
  }

  return (
    <>
      <TopBar profile={p} title="Acuerdos" />
      <main className="flex-1 p-6">
        {agreements && agreements.length > 0 ? (
          <div className="flex flex-col gap-4">
            {agreements.map((a: Agreement & {
              borrower: { full_name: string } | null
              supporter: { full_name: string } | null
              requests: { reason: string; repayment_days: number } | null
            }) => {
              const isBorrower = a.borrower_id === user!.id
              const otherParty = isBorrower ? a.supporter?.full_name : a.borrower?.full_name
              const st = statusConfig[a.agreement_status] ?? statusConfig.active

              return (
                <div key={a.id} className="bg-white rounded-xl border border-neutral-200 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-semibold text-neutral-800">
                        {isBorrower ? `Apoyado por ${otherParty}` : `Apoyando a ${otherParty}`}
                      </div>
                      {a.requests?.reason && (
                        <p className="text-sm text-neutral-500 mt-0.5 line-clamp-1">{a.requests.reason}</p>
                      )}
                    </div>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-neutral-100">
                    <div>
                      <div className="text-xs text-neutral-400">Importe</div>
                      <div className="font-bold text-primary-700 text-sm mt-0.5">
                        {a.amount?.toLocaleString('es-ES')} €
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400">Plazo</div>
                      <div className="font-medium text-neutral-800 text-sm mt-0.5">
                        {a.requests?.repayment_days ?? '—'} días
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400">Fecha inicio</div>
                      <div className="font-medium text-neutral-800 text-sm mt-0.5">
                        {new Date(a.created_at).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>

                  {a.repayment_terms && (
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <div className="text-xs text-neutral-400 mb-1">Condiciones del acuerdo</div>
                      <p className="text-sm text-neutral-600">{a.repayment_terms}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-16 text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="font-display font-bold text-neutral-900 mb-2">Sin acuerdos todavía</h3>
            <p className="text-neutral-500 text-sm">
              Cuando una oferta sea aceptada, el acuerdo aparecerá aquí.
            </p>
          </div>
        )}
      </main>
    </>
  )
}
