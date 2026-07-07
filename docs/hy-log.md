# hy-log.md — 확장 기록 (HY)

작업 하나가 끝날 때마다 아래 형식으로 위에 추가한다.

---

## 형식

### YYYY-MM-DD | 항목 (예: 1a) | 프롬프트 파일 (예: prompts/001-section-types.md)

- 왜 이 기능을 넣었는지:
- 검증 결과 (완료 기준 체크):
- JK에게 넘기는 메모 (위태로워 보이는 부분, 급하게 넘어간 부분):

---

## 기록

### 2026-07-07 | 확장 1단계 | prompts/002-optional-sections.md

- 왜: 매주 고정 4항목만으로 부족 → 그 주에 필요한 항목만 골라 붙이는 선택형 섹션 추가
  (아이디어 제안 / 시장 동향 / 타부서 협조 및 지원 요청 / 환경 셋업 및 인프라 제약)
- 검증: npm run build 통과. 실제 src 모듈(loadReports/saveReports/reportToHtml)을 esbuild로
  번들해 Node에서 12/12 통과 — 구버전 보존, 저장-재로드 유지, 미리보기 렌더, XSS 이스케이프.
  브라우저 클릭 검증은 미실시(사용자 몫).
- 오염 기록: HY가 이번 세션에서 옛 ROADMAP의 설계 정답(Section discriminated union,
  schemaVersion+마이그레이션, 유형분류표)을 이미 읽은 상태로 구현함. 사용자 승인 후 진행. 클린룸 아님.
- JK에게 넘기는 메모: 섹션 로직이 App/ReportForm/ReportList/html 4곳에 분산.
  ReportForm useState 8개. schemaVersion 없이 storage에서 방어적 정규화.
  단일 Section 형태({id,type,content})라 표/이미지형 확장 시 재설계 필요.

### 2026-07-07 | baseline | prompts/000-baseline.md

- 왜: 학습 환자(patient)가 될 초기 코드 생성
- 검증: 설치와 실행 확인, 기본 기능 동작 확인
- 메모: 초기 진단은 PROJECT.md 6장에 정리됨
