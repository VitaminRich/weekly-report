export interface Report {
  id: string
  project: string
  weekStart: string // YYYY-MM-DD, 항상 월요일로 저장됨
  done: string // 이번 주 한 일 (줄바꿈으로 항목 구분)
  todo: string // 다음 주 할 일
  issues: string // 이슈 및 리스크
  memo: string // 자유 메모
  createdAt: string // ISO datetime
  updatedAt: string // ISO datetime
}
