import { z } from 'zod'

export const onboardingSchema = z.object({
  full_name: z.string().min(2, 'Introduce tu nombre completo'),
  phone: z
    .string()
    .min(9, 'Teléfono inválido')
    .regex(/^[0-9+\s-]+$/, 'Solo números y + -'),
  city: z.string().min(2, 'Indica tu ciudad'),
  role: z.enum(['solicitante', 'apoyador', 'ambos'], {
    errorMap: () => ({ message: 'Elige un rol' }),
  }),
})

export type OnboardingInput = z.infer<typeof onboardingSchema>
