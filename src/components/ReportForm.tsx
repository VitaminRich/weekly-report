import { useState } from 'react'
import type { Report } from '../types'
import { mondayOf, thisMonday, weekLabel, weekRange } from '../lib/date'

export type ReportDraft = Pick<
  Report,
  'project' | 'weekStart' | 'done' | 'todo' | 'issues' | 'memo'
>

interface Props {
  initial: Report | null
  projects: string[]
  onSave: (draft: ReportDraft) => void
  onCancel: () => void
}

export default function ReportForm({ initial, projects, onSave, onCancel }: Props) {
  const [project, setProject] = useState(initial?.project ?? '')
  const [weekStart, setWeekStart] = useState(initial?.weekStart ?? thisMonday())
  const [done, setDone] = useState(initial?.done ?? '')
  const [todo, setTodo] = useState(initial?.todo ?? '')
  const [issues, setIssues] = useState(initial?.issues ?? '')
  const [memo, setMemo] = useState(initial?.memo ?? '')
  const [error, setError] = useState('')

  const monday = mondayOf(weekStart)

  function handleSubmit() {
    const p = project.trim()
    if (!p) {
      setError('프로젝트 이름을 입력해 주세요')
      return
    }
    onSave({ project: p, weekStart: monday, done, todo, issues, memo })
  }

  return (
    <section className="form-card">
      <div className="form-head">
        <h2>{initial ? '보고서 수정' : '새 주간보고 작성'}</h2>
        <p className="form-sub">
          {weekLabel(monday)} ({weekRange(monday)}) 보고서를 작성합니다
        </p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span className="field-label">
            프로젝트 <b className="req">필수</b>
          </span>
          <input
            list="project-list"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="예: 신규 서비스 개발"
          />
          <datalist id="project-list">
            {projects.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </label>

        <label className="field">
          <span className="field-label">주 시작일</span>
          <input
            type="date"
            value={weekStart}
            onChange={(e) => {
              if (e.target.value) setWeekStart(e.target.value)
            }}
          />
          <span className="field-help">어느 날짜를 골라도 그 주의 월요일로 자동 정리됩니다</span>
        </label>
      </div>

      <label className="field">
        <span className="field-label">이번 주 한 일</span>
        <textarea
          value={done}
          onChange={(e) => setDone(e.target.value)}
          placeholder={'로그인 화면 UI 구현 완료\nAPI 명세서 초안 작성'}
        />
        <span className="field-help">한 줄에 하나씩 작성하면 미리보기에서 목록으로 정리됩니다</span>
      </label>

      <label className="field">
        <span className="field-label">다음 주 할 일</span>
        <textarea
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder={'회원가입 기능 개발 착수\n디자인 시안 리뷰 회의'}
        />
      </label>

      <label className="field">
        <span className="field-label">이슈 및 리스크</span>
        <textarea
          value={issues}
          onChange={(e) => setIssues(e.target.value)}
          placeholder={'외부 API 응답 지연으로 일정 영향 가능성'}
        />
      </label>

      <label className="field">
        <span className="field-label">메모</span>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="자유롭게 기록할 내용"
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          취소
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          {initial ? '수정 내용 저장' : '보고서 저장'}
        </button>
      </div>
    </section>
  )
}
