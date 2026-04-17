import Link from 'next/link'
import type { Profile } from '@/types'
import { Button } from '@/components/ui/Button'

interface TopBarProps {
  profile: Profile
  title?: string
}

export function TopBar({ profile, title }: TopBarProps) {
  const hour = new Date().getHours()
  const greeting =
    hour < 13 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
      <div>
        {title ? (
          <h1 className="font-display font-bold text-neutral-900 text-lg">{title}</h1>
        ) : (
          <div>
            <span className="text-sm text-neutral-500">{greeting}, </span>
            <span className="text-sm font-semibold text-neutral-800">
              {profile.full_name?.split(' ')[0] ?? 'usuario'}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {(profile.role === 'solicitante' || profile.role === 'ambos') && (
          <Link href="/dashboard/solicitudes/nueva">
            <Button variant="primary" size="sm">
              + Nueva solicitud
            </Button>
          </Link>
        )}

        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
            {profile.trust_score} pts
          </span>
        </div>
      </div>
    </header>
  )
}
