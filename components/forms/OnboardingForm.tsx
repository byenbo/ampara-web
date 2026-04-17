'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { onboardingSchema, type OnboardingInput } from '@/lib/validations/onboarding'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const roles = [
  {
    value: 'solicitante',
    label: 'Solicitante',
    desc: 'Quiero pedir apoyo económico a personas de la comunidad.',
    icon: '🙋',
  },
  {
    value: 'apoyador',
    label: 'Apoyador',
    desc: 'Quiero ayudar a otras personas con apoyo económico.',
    icon: '🤝',
  },
  {
    value: 'ambos',
    label: 'Ambos',
    desc: 'Quiero pedir y también apoyar según el momento.',
    icon: '⚡',
  },
]

export function OnboardingForm({ userId }: { userId: string }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OnboardingInput>({ resolver: zodResolver(onboardingSchema) })

  async function onSubmit(data: OnboardingInput) {
    setLoading(true)
    setServerError(null)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: data.full_name,
        phone: data.phone,
        city: data.city,
        role: data.role,
        onboarding_completed: true,
      })

    if (error) {
      setServerError('Error al guardar el perfil. Inténtalo de nuevo.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        label="Nombre completo"
        placeholder="María García"
        error={errors.full_name?.message}
        {...register('full_name')}
      />
      <Input
        label="Teléfono"
        type="tel"
        placeholder="+34 600 000 000"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Input
        label="Ciudad"
        placeholder="Málaga"
        error={errors.city?.message}
        {...register('city')}
      />

      {/* Role selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-neutral-700">
          ¿Cuál es tu rol en Ampara?
        </label>
        <div className="grid gap-3">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => {
                setSelectedRole(r.value)
                setValue('role', r.value as OnboardingInput['role'], { shouldValidate: true })
              }}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                selectedRole === r.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-primary-200 hover:bg-neutral-50'
              }`}
            >
              <span className="text-2xl">{r.icon}</span>
              <div>
                <div className="font-semibold text-neutral-800 text-sm">{r.label}</div>
                <div className="text-neutral-500 text-xs mt-0.5">{r.desc}</div>
              </div>
              {selectedRole === r.value && (
                <div className="ml-auto w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Button type="submit" fullWidth size="lg" loading={loading}>
        Completar perfil →
      </Button>
    </form>
  )
}
