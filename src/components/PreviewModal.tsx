import { useEffect, useMemo, useState } from 'react'
import type { Report } from '../types'
import { reportToHtml } from '../lib/html'
import { weekLabel } from '../lib/date'

interface Props {
  report: Report
  onClose: () => void
}

function fallbackCopy(text: string) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(ta)
  }
}

export default function PreviewModal({ report, onClose }: Props) {
  const html = useMemo(() => reportToHtml(report), [report])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(html)
    } catch {
      fallbackCopy(html)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  function downloadHtml() {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `주간보고_${report.project}_${report.weekStart}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="보고서 미리보기"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3>
            {report.project} {weekLabel(report.weekStart)}
          </h3>
          <div className="modal-actions">
            <button type="button" className="btn btn-sm btn-ghost" onClick={copyHtml}>
              {copied ? '복사 완료' : 'HTML 복사'}
            </button>
            <button type="button" className="btn btn-sm btn-ghost" onClick={downloadHtml}>
              HTML 다운로드
            </button>
            <button type="button" className="btn btn-sm btn-primary" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
        <iframe className="modal-frame" title="보고서 미리보기" srcDoc={html} sandbox="" />
      </div>
    </div>
  )
}
