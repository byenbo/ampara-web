import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { RequestForm } from '@/components/forms/RequestForm'
import type { Profile } from '@/types'

export const metadata = { title: 'Nueva solicitud — Ampara' }

export default async function NewRequestPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  if (!['solicitante', 'ambos'].includes(profile?.role ?? '')) {
    redirect('/dashboard')
  }

  const p = profile as Profile

  return (
    <>
      <TopBar profile={p} title="Nueva solicitud" />
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
            <div className="mb-8">
              <h2 className="font-display font-bold text-xl text-neutral-900 mb-2">
                Publica tu solicitud de apoyo
              </h2>
              <p className="text-neutral-500 text-sm">
                Sé transparente y claro. Las solicitudes con buena descripción reciben 3× más ofertas.
              </p>
            </div>
            <RequestForm userId={user!.id} />
          </div>
        </div>
      </main>
    </>
  )
}
