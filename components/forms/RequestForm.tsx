'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { requestSchema, type RequestInput } from '@/lib/validations/request'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export function RequestForm({ userId }: { userId: string }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestInput>({
    resolver: zodResolver(requestSchema),
    defaultValues: { urgency_level: 'media', income_frequency: 'mensual', repayment_type: 'dinero' },
  })

  async function onSubmit(data: RequestInput) {
    setLoading(true)
    setServerError(null)

    const { error } = await supabase.from('requests').insert({
      ...data,
      user_id: userId,
      status: 'open',
    })

    if (error) {
      setServerError('Error al publicar la solicitud. Inténtalo de nuevo.')
      setLoading(false)
      return
    }

    router.push('/dashboard/solicitante')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Importe solicitado (€)"
          type="number"
          placeholder="300"
          error={errors.amount?.message}
          {...register('amount', { valueAsNumber: true })}
        />
        <Input
          label="Plazo de devolución (días)"
          type="number"
          placeholder="30"
          error={errors.repayment_days?.message}
          {...register('repayment_days', { valueAsNumber: true })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">Motivo de la solicitud</label>
        <textarea
          rows={4}
          placeholder="Explica brevemente para qué necesitas el apoyo y cómo lo vas a utilizar..."
          className={`w-full rounded-lg border-[1.5px] bg-white px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-300 outline-none transition-all resize-none ${
            errors.reason
              ? 'border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
          }`}
          {...register('reason')}
        />
        {errors.reason && <p className="text-xs text-red-500">{errors.reason.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Ciudad"
          placeholder="Málaga"
          error={errors.city?.message}
          {...register('city')}
        />
        <Input
          label="Profesión"
          placeholder="Autónomo, empleado..."
          error={errors.profession?.message}
          {...register('profession')}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Select
          label="Frecuencia de ingresos"
          error={errors.income_frequency?.message}
          options={[
            { value: 'diario',    label: 'Diario' },
            { value: 'semanal',   label: 'Semanal' },
            { value: 'mensual',   label: 'Mensual' },
            { value: 'irregular', label: 'Irregular' },
          ]}
          {...register('income_frequency')}
        />
        <Select
          label="Nivel de urgencia"
          error={errors.urgency_level?.message}
          options={[
            { value: 'baja',  label: 'Baja — tengo margen' },
            { value: 'media', label: 'Media — en breve' },
            { value: 'alta',  label: 'Alta — urgente' },
          ]}
          {...register('urgency_level')}
        />
      </div>

      <Select
        label="Tipo de devolución"
        error={errors.repayment_type?.message}
        options={[
          { value: 'dinero',          label: 'Solo dinero' },
          { value: 'dinero_servicio', label: 'Dinero + servicio' },
          { value: 'dinero_producto', label: 'Dinero + producto' },
          { value: 'personalizado',   label: 'Acuerdo personalizado' },
        ]}
        {...register('repayment_type')}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">Cómo vas a devolver el apoyo</label>
        <textarea
          rows={3}
          placeholder="Describe cómo y cuándo devolverás el apoyo recibido..."
          className={`w-full rounded-lg border-[1.5px] bg-white px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-300 outline-none transition-all resize-none ${
            errors.repayment_description
              ? 'border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
          }`}
          {...register('repayment_description')}
        />
        {errors.repayment_description && (
          <p className="text-xs text-red-500">{errors.repayment_description.message}</p>
        )}
      </div>

      {/* Guarantor (optional) */}
      <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4">
        <p className="text-sm font-medium text-neutral-700 mb-3">Aval (opcional)</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Nombre del aval"
            placeholder="Nombre completo"
            {...register('guarantor_name')}
          />
          <Input
            label="Teléfono del aval"
            type="tel"
            placeholder="+34 600 000 000"
            {...register('guarantor_phone')}
          />
        </div>
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Button type="submit" fullWidth size="lg" loading={loading}>
        Publicar solicitud
      </Button>
    </form>
  )
}
