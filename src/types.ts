export type SectionType = 'idea' | 'market' | 'support' | 'infra'

export interface ReportSection {
  id: string
  type: SectionType
  content: string // 줄바꿈으로 항목 구분 (기존 done/todo 와 같은 방식)
}

export interface Report {
  id: string
  project: string
  weekStart: string // YYYY-MM-DD, 항상 월요일로 저장됨
  done: string // 이번 주 한 일 (줄바꿈으로 항목 구분)
  todo: string // 다음 주 할 일
  issues: string // 이슈 및 리스크
  memo: string // 자유 메모
  sections: ReportSection[] // 그 주에 필요할 때만 골라 붙이는 선택형 항목
  createdAt: string // ISO datetime
  updatedAt: string // ISO datetime
}

// 추가할 수 있는 항목 종류와 표시 이름 (select 노출 순서대로)
export const SECTION_TYPES: SectionType[] = ['idea', 'market', 'support', 'infra']

export const SECTION_LABELS: Record<SectionType, string> = {
  idea: '아이디어 제안',
  market: '시장 동향',
  support: '타부서 협조 및 지원 요청',
  infra: '환경 셋업 및 인프라 제약',
}
