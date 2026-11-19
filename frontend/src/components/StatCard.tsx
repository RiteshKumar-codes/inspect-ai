import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  title: string
  value: string
  change: string
  icon: LucideIcon
  tone: 'blue' | 'green' | 'orange' | 'violet'
}

export function StatCard({ title, value, change, icon: Icon, tone }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
      <div className="stat-copy">
        <p>{title}</p>
        <strong>{value}</strong>
        <span>{change}</span>
      </div>
    </article>
  )
}
