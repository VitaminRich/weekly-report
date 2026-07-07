# 001: 협업·기억 체계 도입 (docs setup)

- 작성자: 공통 (docs)
- 날짜: 2026-07-07
- ROADMAP 항목: 해당 없음 (ROADMAP 작업 항목이 아니라 "JK 정리 0단계" 이전의 문서/협업 체계 세팅)
- 커밋 메시지: `[docs] 협업 체계 도입: CLAUDE.md, ROADMAP, 프롬프트 박제 구조`

## 프롬프트 원문

(Claude Code에 실제로 붙여넣은 내용을 한 글자도 바꾸지 않고 그대로 보존한다.)

```
[목적]
이 저장소에 협업과 기억 체계를 도입한다. 채팅 기록이 아니라 저장소 문서가
계획의 원본이 되도록, 새로 추가된 문서들을 정착시키고 PROJECT.md에 반영한다.

[사전 상태]
루트에 CLAUDE.md, docs/ROADMAP.md, docs/hy-log.md, docs/jk-log.md,
docs/prompts/_TEMPLATE.md, docs/prompts/000-baseline.md 가 이미 배치되어 있다.
하나라도 없으면 작업을 멈추고 어떤 파일이 없는지 알려라.

[작업 범위]
1. 위 문서들을 먼저 읽는다. 특히 CLAUDE.md의 하드 규칙과 docs/ROADMAP.md의
   현재 위치를 파악한 상태로 작업한다.
2. PROJECT.md를 다음과 같이 수정한다. 추가만 하고 기존 내용은 고치지 않는다.
   - "8. 문서 구조" 장을 새로 추가하고 각 문서의 역할을 짧게 소개한다:
     CLAUDE.md(하드 규칙, 모든 Claude Code 세션이 읽음),
     docs/ROADMAP.md(확장 계획과 현재 위치),
     docs/prompts/(실제 사용한 프롬프트 원문 박제, 번호순),
     docs/hy-log.md(확장 기록), docs/jk-log.md(진단과 정리 기록)
   - 문서 맨 아래의 "학습 노트·블로그 초안은 앞으로 docs/에 모을 예정" 문장을
     실제 구조가 도입되었다는 내용으로 갱신한다.
   - 3장 작업 방식에 규칙 한 줄을 추가한다:
     "프롬프트 원문은 docs/prompts/NNN-이름.md 로 박제하여 해당 커밋에 포함한다."
   - 7장 진행 로그 표에 행을 추가한다:
     | 2026-07-07 | docs | — | 협업 체계 도입 (CLAUDE.md, ROADMAP, prompts 박제 구조) | — |
3. 이 프롬프트의 원문 전체를 docs/prompts/001-docs-setup.md 로 저장한다.
   형식은 docs/prompts/_TEMPLATE.md 를 따르고, 프롬프트 원문 블록에는
   지금 이 프롬프트를 한 글자도 바꾸지 않고 그대로 넣는다.
   실행 결과 절에는 실제 확인 결과를 채운다.
4. docs/ROADMAP.md는 수정하지 않는다. 현재 위치는 그대로 "JK 정리 0단계"다.

[하지 말 것]
- src/ 아래 코드 파일을 일절 수정하지 않는다
- README.md를 수정하지 않는다
- PROJECT.md의 기존 문장(1~7장, 초기 진단 내용)을 고치거나 다듬지 않는다
- 새로 배치된 문서들(CLAUDE.md, ROADMAP.md 등)의 내용을 임의로 수정하지 않는다

[완료 기준]
- npm run build 통과 (코드를 건드리지 않았으므로 당연히 통과해야 하며, 확인용이다)
- PROJECT.md에 8장, 3장 규칙 한 줄, 진행 로그 행이 추가되어 있다
- docs/prompts/001-docs-setup.md 가 존재하고 이 프롬프트 원문이 그대로 들어 있다
- git status 결과를 보여주고, 변경과 추가 파일이 위 목록과 일치하는지 확인한 뒤
  새 문서 전체(CLAUDE.md, docs/)와 PROJECT.md 수정을 포함하여
  커밋 메시지 `[docs] 협업 체계 도입: CLAUDE.md, ROADMAP, 프롬프트 박제 구조` 로
  커밋하고 푸시한다
```

## 실행 결과

- 빌드: **통과** (`npm run build` → `tsc && vite build`, vite v6.4.3, 36 modules transformed, built in 523ms). 코드는 건드리지 않았으므로 확인용.
- 완료 기준 확인:
  - [x] npm run build 통과
  - [x] PROJECT.md에 8장(문서 구조) 추가
  - [x] PROJECT.md 3.1에 규칙 한 줄 추가 ("프롬프트 원문은 `docs/prompts/NNN-이름.md` 로 박제하여 해당 커밋에 포함한다.")
  - [x] PROJECT.md 7장 진행 로그에 협업 체계 도입 행 추가
  - [x] PROJECT.md 맨 아래 문장을 "체계가 실제로 도입됨" 내용으로 갱신
  - [x] docs/prompts/001-docs-setup.md 생성, 프롬프트 원문 그대로 포함
  - [x] ROADMAP.md 미수정 (현재 위치 "JK 정리 0단계" 유지)
  - [x] src/, README.md 미수정
- 사전 상태 확인: 지정된 6개 문서(CLAUDE.md, docs/ROADMAP.md, docs/hy-log.md, docs/jk-log.md, docs/prompts/_TEMPLATE.md, docs/prompts/000-baseline.md) 모두 존재 확인 후 진행.
- 예상과 달랐던 점 / 다음에 넘길 메모:
  - PROJECT.md는 지시대로 "추가만" 하고 1~7장 기존 문장은 손대지 않음. 단, 명시적으로 요청된 맨 아래 마무리 문장 1줄만 갱신함.
  - 다음 작업은 ROADMAP 현재 위치대로 **JK 정리 0단계 (0a: App.tsx 데이터 로직 커스텀 훅 분리)**. 프롬프트는 `docs/prompts/002-*.md`로 박제 예정.
