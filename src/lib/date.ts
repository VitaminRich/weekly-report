const pad = (n: number) => String(n).padStart(2, '0')

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** 어떤 날짜를 넣어도 그 주의 월요일(YYYY-MM-DD)을 돌려준다 */
export function mondayOf(iso: string): string {
  const d = parseDate(iso)
  const diff = (d.getDay() + 6) % 7 // 월요일부터 지난 일수
  d.setDate(d.getDate() - diff)
  return toISODate(d)
}

export function thisMonday(): string {
  return mondayOf(toISODate(new Date()))
}

/** 예: 2026년 7월 1주차 */
export function weekLabel(weekStart: string): string {
  const start = parseDate(weekStart)
  const nth = Math.ceil(start.getDate() / 7)
  return `${start.getFullYear()}년 ${start.getMonth() + 1}월 ${nth}주차`
}

/** 예: 7/6 ~ 7/12 */
export function weekRange(weekStart: string): string {
  const start = parseDate(weekStart)
  const end = parseDate(weekStart)
  end.setDate(end.getDate() + 6)
  return `${start.getMonth() + 1}/${start.getDate()} ~ ${end.getMonth() + 1}/${end.getDate()}`
}

/** 예: 2026.07.06 14:30 */
export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** 예: 2026년 7월 6일 */
export function formatDateKorean(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}
