interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  color?: 'teal' | 'amber' | 'blue' | 'purple'
  icon: React.ReactNode
}

const colors = {
  teal:   { bg: 'bg-primary-50',  icon: 'text-primary-600',  val: 'text-primary-700' },
  amber:  { bg: 'bg-amber-50',    icon: 'text-amber-600',    val: 'text-amber-700' },
  blue:   { bg: 'bg-blue-50',     icon: 'text-blue-600',     val: 'text-blue-700' },
  purple: { bg: 'bg-purple-50',   icon: 'text-purple-600',   val: 'text-purple-700' },
}

export function StatCard({ label, value, sub, color = 'teal', icon }: StatCardProps) {
  const c = colors[color]
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 ${c.bg} ${c.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <div className={`font-display font-bold text-2xl ${c.val}`}>{value}</div>
        <div className="text-sm text-neutral-500">{label}</div>
        {sub && <div className="text-xs text-neutral-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}
