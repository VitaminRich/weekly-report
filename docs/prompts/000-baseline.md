# 000: 최초 생성 프롬프트 (baseline)

- 작성자: HY
- 날짜: 2026-07-07
- ROADMAP 항목: baseline (Fable5 단일 프롬프트 원본)
- 커밋: baseline

## 프롬프트 원문

```
나는 코딩을 잘 모르는 사람이다.
React + TypeScript로 주간보고 관리 웹앱을 만들어줘.
필요한 기능:
- 주간보고 작성
- 프로젝트별 분류
- 이번 주 한 일, 다음 주 할 일, 이슈, 메모 입력
- 보고서 목록 조회
- 검색과 필터
- 통계 카드
- HTML 미리보기
- 로컬스토리지 저장
- 예쁜 대시보드 UI
설치부터 실행까지 가능한 전체 코드를 만들어줘.
가능하면 한 번에 완성해줘.
```

## 실행 결과

- Claude Fable 5가 단일 응답으로 전체 프로젝트 생성 (React 19 + TypeScript + Vite)
- 빌드: 통과 (생성 환경에서 npm install + npm run build 검증 후 전달됨)
- 초기 진단은 PROJECT.md 6장 참고
