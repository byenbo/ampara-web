export type UserRole = 'solicitante' | 'apoyador' | 'ambos'

export interface Profile {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  city: string | null
  role: UserRole | null
  avatar_url: string | null
  trust_score: number
  onboarding_completed: boolean
  created_at: string
}

export interface Request {
  id: string
  user_id: string
  amount: number
  repayment_days: number
  reason: string | null
  city: string | null
  profession: string | null
  income_frequency: string | null
  urgency_level: 'baja' | 'media' | 'alta' | null
  repayment_type: string | null
  repayment_description: string | null
  guarantor_name: string | null
  guarantor_phone: string | null
  status: 'open' | 'in_progress' | 'closed' | 'cancelled'
  created_at: string
  profiles?: Pick<Profile, 'full_name' | 'city' | 'trust_score' | 'role'>
}

export interface Offer {
  id: string
  request_id: string
  supporter_id: string
  proposed_amount: number | null
  proposed_terms: string | null
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  profiles?: Pick<Profile, 'full_name' | 'city' | 'trust_score'>
  requests?: Pick<Request, 'amount' | 'reason' | 'city'>
}

export interface Agreement {
  id: string
  request_id: string
  borrower_id: string
  supporter_id: string
  amount: number | null
  repayment_terms: string | null
  agreement_status: 'active' | 'completed' | 'defaulted'
  created_at: string
  borrower?: Pick<Profile, 'full_name' | 'city'>
  supporter?: Pick<Profile, 'full_name' | 'city'>
  requests?: Pick<Request, 'reason' | 'repayment_days'>
}
