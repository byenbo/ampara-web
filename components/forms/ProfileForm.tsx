'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { Profile } from '@/types'

const schema = z.object({
  full_name: z.string().min(2, 'Nombre requerido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  city: z.string().min(2, 'Ciudad requerida'),
  role: z.enum(['solicitante', 'apoyador', 'ambos']),
})

type FormData = z.infer<typeof schema>

export function ProfileForm({ profile }: { profile: Profile }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: profile.full_name ?? '',
      phone:     profile.phone    ?? '',
      city:      profile.city     ?? '',
      role:      profile.role     ?? 'solicitante',
    },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    setSaved(false)
    setError(null)

    const { error: err } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', profile.id)

    setLoading(false)
    if (err) { setError('Error al guardar. Inténtalo de nuevo.'); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Nombre completo" error={errors.full_name?.message} {...register('full_name')} />
      <Input label="Teléfono" type="tel" error={errors.phone?.message} {...register('phone')} />
      <Input label="Ciudad" error={errors.city?.message} {...register('city')} />
      <Select
        label="Rol"
        error={errors.role?.message}
        options={[
          { value: 'solicitante', label: 'Solicitante' },
          { value: 'apoyador',   label: 'Apoyador' },
          { value: 'ambos',      label: 'Ambos' },
        ]}
        {...register('role')}
      />

      {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">{error}</div>}
      {saved && <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-700">✓ Perfil guardado correctamente</div>}

      <Button type="submit" loading={loading} className="self-end">
        Guardar cambios
      </Button>
    </form>
  )
}
