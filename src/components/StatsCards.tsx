import type { Report } from '../types'

interface Props {
  reports: Report[]
}

export default function StatsCards({ reports }: Props) {
  const now = new Date()
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const monthCount = reports.filter((r) => r.weekStart.startsWith(ym)).length
  const projectCount = new Set(reports.map((r) => r.project)).size
  const issueCount = reports.filter((r) => r.issues.trim() !== '').length

  const items = [
    { label: '전체 보고서', value: reports.length, unit: '건' },
    { label: '이번 달 작성', value: monthCount, unit: '건' },
    { label: '프로젝트', value: projectCount, unit: '개' },
    { label: '이슈 포함', value: issueCount, unit: '건' },
  ]

  return (
    <section className="stats" aria-label="현황 요약">
      {items.map((it) => (
        <div className="stat-card" key={it.label}>
          <span className="stat-label">{it.label}</span>
          <span className="stat-value">
            {it.value}
            <em>{it.unit}</em>
          </span>
        </div>
      ))}
    </section>
  )
}
