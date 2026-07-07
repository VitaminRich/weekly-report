# 주간보고 관리 (Weekly Report Manager)

React 19 + TypeScript + Vite로 만든 주간보고 작성/관리 웹앱입니다.
서버 없이 브라우저 localStorage에 저장되는 개인용 도구입니다.

## 실행 방법 (Windows PowerShell 기준)

Node.js 18 이상이 설치되어 있어야 합니다. 확인 명령: `node -v`

```powershell
cd weekly-report
npm install
npm run dev
```

터미널에 표시되는 주소(기본값 http://localhost:5173)를 브라우저로 열면 됩니다.

## 주요 기능

- 주간보고 작성: 프로젝트, 주 시작일(어떤 날짜를 골라도 월요일로 자동 보정), 이번 주 한 일, 다음 주 할 일, 이슈, 메모
- 프로젝트별 분류: 색상 배지와 프로젝트 필터
- 목록 조회: 최신순 / 오래된순 정렬
- 검색: 프로젝트 이름과 모든 본문 내용에서 검색
- 통계 카드: 전체 보고서, 이번 달 작성, 프로젝트 수, 이슈 포함 보고서
- HTML 미리보기: 공유 가능한 문서 형태로 렌더링, HTML 복사와 파일 다운로드 지원
- 수정과 삭제
- localStorage 자동 저장 (키: `weekly-report.reports`)

## 폴더 구조

```
src/
  App.tsx                 전체 화면 조립과 상태 관리 (여기서부터 읽으면 좋음)
  types.ts                Report 타입 정의
  index.css               디자인 시스템 전체
  lib/
    date.ts               주차 계산, 날짜 포맷
    storage.ts            localStorage 읽기/쓰기
    html.ts               보고서를 HTML 문서로 변환
  components/
    StatsCards.tsx        통계 카드
    ReportForm.tsx        작성/수정 폼
    ReportList.tsx        보고서 목록
    PreviewModal.tsx      HTML 미리보기 모달
```

## 데이터 관련 주의

- 데이터는 지금 사용하는 브라우저의 localStorage에만 저장됩니다. 다른 브라우저나 다른 기기와 공유되지 않습니다.
- 브라우저 사용 기록(사이트 데이터)을 삭제하면 보고서도 함께 사라집니다. 중요한 보고서는 미리보기에서 HTML 다운로드로 백업해 두는 것을 권장합니다.

## 배포

```powershell
npm run build
```

생성된 `dist` 폴더를 Vercel 같은 정적 호스팅에 올리면 됩니다.
