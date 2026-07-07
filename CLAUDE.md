# CLAUDE.md

Claude Code가 이 저장소에서 작업할 때 반드시 지켜야 하는 규칙이다.
이 파일의 규칙은 사용자의 개별 프롬프트보다 우선한다. 충돌하면 작업을 멈추고 사용자에게 알린다.

## 프로젝트 개요

주간보고 관리 웹앱 (React 19 + TypeScript + Vite, localStorage 저장, 서버 없음).
이 저장소의 진짜 목적은 앱 자체가 아니라 [PROJECT.md](PROJECT.md)에 있다.
AI가 만든 코드를 "키울 수 있는 구조"로 바꾸는 학습 프로젝트다.

- 확장 담당: HY (기능을 추가한다)
- 정리 담당: JK (구조를 다듬는다)
- 전체 계획: [docs/ROADMAP.md](docs/ROADMAP.md) (작업 전 반드시 읽는다)

## 하드 규칙 (절대 위반 금지)

1. **1 프롬프트 = 1 커밋.** 요청받은 작업 범위를 벗어난 코드를 건드리지 않는다.
   "하는 김에" 다른 파일을 정리하거나 개선하지 않는다.
2. **빌드 통과 전 커밋 금지.** 커밋 전 반드시 `npm run build`가 성공해야 한다.
3. **저장 데이터 형식(Report 타입, localStorage 구조)을 바꿀 때는 반드시
   schemaVersion 증가 + 구버전 자동 마이그레이션 함수를 함께 작성한다.**
   기존 사용자의 보고서가 깨지는 변경은 어떤 이유로도 금지.
4. **localStorage 키 접두어는 `weekly-report.` 로 고정.** 임의로 새 키 체계를 만들지 않는다.
5. 작업 완료 시 해당 프롬프트 파일(docs/prompts/NNN-*.md)의 완료 기준을 하나씩 확인하고,
   확인 결과를 사용자에게 보고한다.
6. ROADMAP.md의 현재 위치(다음 작업 표시)와 다른 작업을 요청받으면,
   순서가 어긋났음을 먼저 알리고 진행 여부를 확인한다.

## 커밋 규칙

- 커밋 메시지 접두어: `[HY/expand]` 확장 작업, `[JK/refactor]` 정리 작업, `[docs]` 문서
- 예: `[HY/expand] 1a: Section 타입과 schemaVersion 마이그레이션 추가`
- 커밋에는 사용된 프롬프트 파일(docs/prompts/NNN-*.md)을 함께 포함한다.

## 저장소 구조

```
CLAUDE.md            이 파일. 하드 규칙 (모든 세션이 읽음)
PROJECT.md           프로젝트 헌법. 목적, 학습 로드맵, 진행 로그 (진행 로그는 여기 하나만)
README.md            앱 사용법 (실행, 기능, 폴더 구조)
docs/
  ROADMAP.md         기능 확장 계획 전체. 단계별 체크박스와 다음 작업 표시
  hy-log.md          HY의 확장 기록 (의도, 검증 결과)
  jk-log.md          JK의 진단과 정리 기록 (블로그 원석)
  prompts/
    _TEMPLATE.md     프롬프트 작성 양식
    000-*.md         실제 사용한 프롬프트 원문 박제 (번호순)
src/                 앱 코드 (구조는 README.md 참고)
```

## 작업 흐름

1. 작업 시작 전 `git pull`
2. docs/ROADMAP.md에서 현재 위치 확인
3. docs/prompts/의 해당 프롬프트 실행
4. 빌드 확인, 완료 기준 체크
5. ROADMAP.md 체크박스 갱신 + PROJECT.md 진행 로그에 한 줄 추가
6. 커밋 앤 푸시
