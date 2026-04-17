import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { OnboardingForm } from '@/components/forms/OnboardingForm'

export const metadata = { title: 'Completa tu perfil — Ampara' }

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Si ya completó el onboarding, ir al dashboard
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', user.id)
    .single()

  if (profile?.onboarding_completed) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="px-5 py-4 border-b border-neutral-200 bg-white">
        <Link href="/" className="font-display font-bold text-xl text-primary-700">
          Ampar<span className="text-primary-500">a</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-md p-8 md:p-10 w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === 1
                      ? 'bg-primary-700 text-white'
                      : 'bg-neutral-200 text-neutral-400'
                  }`}
                >
                  {step === 1 ? '✓' : step}
                </div>
                {step < 3 && <div className="flex-1 h-0.5 bg-neutral-200" />}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h1 className="font-display font-bold text-2xl text-primary-900 mb-2">
              Cuéntanos sobre ti
            </h1>
            <p className="text-neutral-500 text-sm">
              Solo tardas 1 minuto. Esta información es necesaria para verificar tu identidad en la plataforma.
            </p>
          </div>

          <OnboardingForm userId={user.id} />
        </div>
      </main>
    </div>
  )
}
