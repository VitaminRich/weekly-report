import type { Report } from '../types'
import { formatDateTime, weekLabel, weekRange } from '../lib/date'
import { splitLines } from '../lib/html'

interface Props {
  reports: Report[]
  onPreview: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

/** 프로젝트 이름을 6가지 배지 색 중 하나로 안정적으로 매핑한다 */
function badgeClass(project: string): string {
  let h = 0
  for (let i = 0; i < project.length; i++) {
    h = (h + project.charCodeAt(i)) % 6
  }
  return `badge badge-${h}`
}

export default function ReportList({ reports, onPreview, onEdit, onDelete }: Props) {
  return (
    <div className="report-list">
      {reports.map((r) => {
        const doneItems = splitLines(r.done)
        const todoItems = splitLines(r.todo)
        const issueItems = splitLines(r.issues)
        const snippet = doneItems.slice(0, 2).join(' / ')

        return (
          <article className="report-card" key={r.id}>
            <div className="card-title-row">
              <h3>{weekLabel(r.weekStart)}</h3>
              <span className={badgeClass(r.project)}>{r.project}</span>
            </div>
            <p className="card-range">
              {weekRange(r.weekStart)} 주간, 마지막 수정 {formatDateTime(r.updatedAt)}
            </p>

            <div className="card-meta">
              <span className="meta-chip">한 일 {doneItems.length}건</span>
              <span className="meta-chip">할 일 {todoItems.length}건</span>
              {issueItems.length > 0 && (
                <span className="meta-chip chip-issue">이슈 {issueItems.length}건</span>
              )}
            </div>

            {snippet !== '' && <p className="card-snippet">{snippet}</p>}

            <div className="card-actions">
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => onPreview(r.id)}>
                미리보기
              </button>
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => onEdit(r.id)}>
                수정
              </button>
              <button
                type="button"
                className="btn btn-sm btn-ghost btn-danger"
                onClick={() => onDelete(r.id)}
              >
                삭제
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
