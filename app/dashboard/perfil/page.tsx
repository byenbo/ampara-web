import { createClient } from '@/lib/supabase/server'
import { TopBar } from '@/components/dashboard/TopBar'
import { ProfileForm } from '@/components/forms/ProfileForm'
import type { Profile } from '@/types'

export const metadata = { title: 'Mi perfil — Ampara' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  const p = profile as Profile

  return (
    <>
      <TopBar profile={p} title="Mi perfil" />
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {/* Profile header */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center font-display font-bold text-primary-700 text-2xl">
              {p.full_name?.[0] ?? '?'}
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-xl text-neutral-900">{p.full_name}</h2>
              <p className="text-neutral-500 text-sm">{p.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
                  {p.trust_score} pts de confianza
                </span>
                <span className="text-xs text-neutral-400 capitalize">{p.role}</span>
              </div>
            </div>
          </div>

          {/* Edit form */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h3 className="font-display font-bold text-neutral-900 mb-6">Editar información</h3>
            <ProfileForm profile={p} />
          </div>

          {/* Account info */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h3 className="font-display font-bold text-neutral-900 mb-4">Cuenta</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Email</span>
                <span className="text-neutral-800 font-medium">{p.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Miembro desde</span>
                <span className="text-neutral-800 font-medium">
                  {new Date(p.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Verificado</span>
                <span className="text-emerald-600 font-semibold">✓ Sí</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
