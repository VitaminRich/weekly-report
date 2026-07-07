import { useEffect, useMemo, useState } from 'react'
import type { Report } from './types'
import { loadReports, saveReports, uid } from './lib/storage'
import StatsCards from './components/StatsCards'
import ReportForm, { type ReportDraft } from './components/ReportForm'
import ReportList from './components/ReportList'
import PreviewModal from './components/PreviewModal'

type View = 'list' | 'form'
type SortOrder = 'newest' | 'oldest'

export default function App() {
  const [reports, setReports] = useState<Report[]>(() => loadReports())
  const [view, setView] = useState<View>('list')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [projectFilter, setProjectFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  // 보고서가 바뀔 때마다 localStorage에 자동 저장
  useEffect(() => {
    saveReports(reports)
  }, [reports])

  const projects = useMemo(
    () =>
      Array.from(new Set(reports.map((r) => r.project))).sort((a, b) =>
        a.localeCompare(b, 'ko'),
      ),
    [reports],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = reports.filter((r) => {
      if (projectFilter !== 'all' && r.project !== projectFilter) return false
      if (!q) return true
      const sectionText = r.sections.map((s) => s.content).join(' ')
      const hay =
        `${r.project} ${r.done} ${r.todo} ${r.issues} ${r.memo} ${sectionText}`.toLowerCase()
      return hay.includes(q)
    })
    list.sort((a, b) =>
      sortOrder === 'newest'
        ? b.weekStart.localeCompare(a.weekStart) || b.updatedAt.localeCompare(a.updatedAt)
        : a.weekStart.localeCompare(b.weekStart) || a.updatedAt.localeCompare(b.updatedAt),
    )
    return list
  }, [reports, search, projectFilter, sortOrder])

  const editing = editingId ? (reports.find((r) => r.id === editingId) ?? null) : null
  const previewing = previewId ? (reports.find((r) => r.id === previewId) ?? null) : null

  function handleSave(draft: ReportDraft) {
    const now = new Date().toISOString()
    if (editing) {
      setReports((rs) =>
        rs.map((r) => (r.id === editing.id ? { ...r, ...draft, updatedAt: now } : r)),
      )
    } else {
      setReports((rs) => [{ id: uid(), ...draft, createdAt: now, updatedAt: now }, ...rs])
    }
    setEditingId(null)
    setView('list')
  }

  function handleDelete(id: string) {
    if (!window.confirm('이 보고서를 삭제할까요? 삭제하면 되돌릴 수 없습니다.')) return
    setReports((rs) => rs.filter((r) => r.id !== id))
  }

  function openNew() {
    setEditingId(null)
    setView('form')
  }

  function openEdit(id: string) {
    setEditingId(id)
    setView('form')
  }

  function backToList() {
    setEditingId(null)
    setView('list')
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              주
            </span>
            <div>
              <h1>주간보고</h1>
              <p>Weekly Report Manager</p>
            </div>
          </div>
          {view === 'list' ? (
            <button type="button" className="btn btn-primary" onClick={openNew}>
              + 새 보고서 작성
            </button>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={backToList}>
              목록으로
            </button>
          )}
        </div>
      </header>

      <main className="container">
        {view === 'form' ? (
          <ReportForm
            key={editingId ?? 'new'}
            initial={editing}
            projects={projects}
            onSave={handleSave}
            onCancel={backToList}
          />
        ) : (
          <>
            <StatsCards reports={reports} />

            <section className="toolbar" aria-label="검색과 필터">
              <input
                className="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="프로젝트, 내용, 이슈 검색"
              />
              <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
                <option value="all">전체 프로젝트</option>
                {projects.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              >
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
            </section>

            {reports.length === 0 ? (
              <div className="empty">
                <h3>아직 작성한 보고서가 없습니다</h3>
                <p>첫 주간보고를 작성해서 이번 주를 정리해 보세요</p>
                <button type="button" className="btn btn-primary" onClick={openNew}>
                  + 첫 보고서 작성
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty">
                <h3>검색 결과가 없습니다</h3>
                <p>검색어나 필터 조건을 바꿔 보세요</p>
              </div>
            ) : (
              <ReportList
                reports={filtered}
                onPreview={setPreviewId}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            )}

            <p className="footnote">모든 데이터는 이 브라우저의 localStorage에 저장됩니다</p>
          </>
        )}
      </main>

      {previewing && <PreviewModal report={previewing} onClose={() => setPreviewId(null)} />}
    </div>
  )
}
