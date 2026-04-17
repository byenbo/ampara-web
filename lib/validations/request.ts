import { z } from 'zod'

export const requestSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Introduce un importe' })
    .min(50, 'Mínimo 50€')
    .max(5000, 'Máximo 5.000€'),
  repayment_days: z
    .number({ invalid_type_error: 'Introduce el plazo' })
    .min(7, 'Mínimo 7 días')
    .max(365, 'Máximo 365 días'),
  reason: z.string().min(20, 'Explica brevemente el motivo (mín. 20 caracteres)'),
  city: z.string().min(2, 'Indica tu ciudad'),
  profession: z.string().min(2, 'Indica tu profesión'),
  income_frequency: z.enum(['diario', 'semanal', 'mensual', 'irregular']),
  urgency_level: z.enum(['baja', 'media', 'alta']),
  repayment_type: z.enum(['dinero', 'dinero_servicio', 'dinero_producto', 'personalizado']),
  repayment_description: z.string().min(10, 'Describe cómo devolverás el apoyo'),
  guarantor_name: z.string().optional(),
  guarantor_phone: z.string().optional(),
})

export type RequestInput = z.infer<typeof requestSchema>
