type BadgeVariant = 'green' | 'amber' | 'blue' | 'purple' | 'neutral' | 'red'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  green:   'bg-emerald-100 text-emerald-700',
  amber:   'bg-amber-100 text-amber-700',
  blue:    'bg-blue-100 text-blue-700',
  purple:  'bg-purple-100 text-purple-700',
  neutral: 'bg-neutral-100 text-neutral-700',
  red:     'bg-red-100 text-red-600',
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
