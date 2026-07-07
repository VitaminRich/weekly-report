import type { Report } from '../types'

const KEY = 'weekly-report.reports'

export function loadReports(): Report[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (r): r is Report =>
        typeof r === 'object' && r !== null && typeof (r as Report).id === 'string',
    )
  } catch {
    return []
  }
}

export function saveReports(reports: Report[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(reports))
  } catch {
    // 저장 공간 초과 등 예외는 조용히 무시 (앱 동작은 유지)
  }
}

export function uid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
