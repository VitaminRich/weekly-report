import type { Report } from '../types'
import { formatDateKorean, weekLabel, weekRange } from './date'

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** 줄바꿈으로 구분된 텍스트를 항목 배열로. 맨 앞의 "- " 표시는 정리한다 */
export function splitLines(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean)
}

function listBlock(text: string): string {
  const items = splitLines(text)
  if (items.length === 0) return '<p class="empty">작성된 내용이 없습니다</p>'
  return `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`
}

function paraBlock(text: string): string {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return '<p class="empty">작성된 내용이 없습니다</p>'
  return lines.map((l) => `<p>${escapeHtml(l)}</p>`).join('')
}

/** 보고서 한 건을 그대로 공유할 수 있는 독립 HTML 문서로 만든다 */
export function reportToHtml(r: Report): string {
  const label = weekLabel(r.weekStart)
  const range = weekRange(r.weekStart)
  const updated = formatDateKorean(r.updatedAt)

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(r.project)} 주간보고 ${label}</title>
<style>
  body {
    margin: 0;
    background: #eff1f5;
    font-family: 'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
    color: #1b2233;
  }
  .sheet {
    max-width: 720px;
    margin: 36px auto;
    background: #ffffff;
    border: 1px solid #dfe3ea;
    border-radius: 10px;
    padding: 48px 52px 40px;
  }
  .eyebrow {
    display: inline-block;
    font-size: 12px;
    letter-spacing: 0.14em;
    font-weight: 800;
    color: #c0362c;
    border: 1.5px solid #c0362c;
    border-radius: 4px;
    padding: 3px 9px;
    margin: 0 0 14px;
  }
  h1 {
    font-size: 27px;
    letter-spacing: -0.01em;
    margin: 0 0 6px;
  }
  .meta {
    color: #525a6b;
    font-size: 14px;
    margin: 0 0 22px;
  }
  .rule {
    border: 0;
    border-top: 3px solid #1b2233;
    margin: 0 0 3px;
  }
  .rule-thin {
    border: 0;
    border-top: 1px solid #1b2233;
    margin: 0 0 26px;
  }
  h2 {
    font-size: 16px;
    margin: 30px 0 10px;
    padding-left: 11px;
    border-left: 4px solid #24439e;
  }
  ul { margin: 0; padding-left: 22px; }
  li { margin: 7px 0; line-height: 1.65; }
  p { margin: 7px 0; line-height: 1.7; }
  .empty { color: #8b93a3; }
  footer {
    margin-top: 40px;
    padding-top: 14px;
    border-top: 1px solid #dfe3ea;
    color: #8b93a3;
    font-size: 12.5px;
    display: flex;
    justify-content: space-between;
  }
  @media print {
    body { background: #ffffff; }
    .sheet { border: 0; margin: 0; max-width: none; padding: 0; }
  }
</style>
</head>
<body>
<div class="sheet">
  <p class="eyebrow">WEEKLY REPORT</p>
  <h1>${escapeHtml(r.project)} 주간보고</h1>
  <p class="meta">${label} (${range})</p>
  <hr class="rule" />
  <hr class="rule-thin" />
  <h2>이번 주 한 일</h2>
  ${listBlock(r.done)}
  <h2>다음 주 할 일</h2>
  ${listBlock(r.todo)}
  <h2>이슈 및 리스크</h2>
  ${listBlock(r.issues)}
  <h2>메모</h2>
  ${paraBlock(r.memo)}
  <footer><span>작성 기준일 ${updated}</span><span>주간보고 관리</span></footer>
</div>
</body>
</html>`
}
