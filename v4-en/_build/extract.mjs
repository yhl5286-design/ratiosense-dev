/* extract.mjs — 한국어판 v4에서 사용자에게 보이는 한글 문자열만 뽑아 번역 대조표를 만든다.
   코드 주석의 한글은 개발자 메모이므로 건드리지 않는다.

   방 파일 구조
     1..<helmet>        머리말·CSS  (한글은 주석뿐 → 제외)
     </helmet>..</x-dc> 화면 템플릿  (텍스트 노드·속성값 → 대상)
     <script x-dc>..    Component   (문자열 리터럴 → 대상)

   v4-en 폴더에서:  node _build/extract.mjs                                     */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('../v4');
const OUT = path.resolve('_build/i18n');
const HAN = /[가-힣]/;
export const FILES = ['index.html', 'ColorRoom.dc.html', 'SoundRoom.dc.html', 'MapRoom.dc.html', 'EvalRoom.dc.html'];

/* ── 주석 구간 표시 — 그 안의 한글은 뽑지 않는다 ── */
function commentMask(s) {
  const m = new Uint8Array(s.length);
  const mark = (a, b) => { for (let i = a; i < b && i < s.length; i++) m[i] = 1; };
  for (const x of s.matchAll(/<!--[\s\S]*?-->/g)) mark(x.index, x.index + x[0].length);
  for (const x of s.matchAll(/\/\*[\s\S]*?\*\//g)) mark(x.index, x.index + x[0].length);
  /* 줄 주석 — 앞부분의 따옴표가 짝을 이룰 때만 주석으로 본다 */
  let off = 0;
  for (const line of s.split('\n')) {
    const i = line.indexOf('//');
    if (i >= 0) {
      const head = line.slice(0, i);
      const even = c => (head.split(c).length - 1) % 2 === 0;
      if (even("'") && even('"') && even('`') && !/[:=\w]$/.test(head.trimEnd())) mark(off + i, off + line.length);
    }
    off += line.length + 1;
  }
  /* patch.mjs가 통째로 걷어내는 한국어 전용 음성 코드 — 그 안의 한글은 화면에 보이지
     않으므로 번역 대상이 아니다. 한자어 배열('영','일','이'…)이 대조표에 섞이면
     번역할 것이 남은 것처럼 보인다. */
  for (const x of s.matchAll(/^ *SINO\(v\) \{[^\n]*\n/gm)) mark(x.index, x.index + x[0].length);
  for (const x of s.matchAll(/\.replace\(\/\(\[가-힣A-Za-z0-9\]\+\)[\s\S]*?\.replace\(\/\\s\+\/g, ' '\)\.trim\(\);/g))
    mark(x.index, x.index + x[0].length);
  /* 지도 방의 축척 물음은 한국어 조사(는/이/가)를 이어 붙여 문장을 만든다.
     조각으로 옮기면 영어 문장이 되지 않으므로 patch.mjs가 문장째 다시 쓴다. */
  for (const x of s.matchAll(/ *const sj = \(\(obj\.n\.charCodeAt[\s\S]*?얼마일까요\?'\);/g))
    mark(x.index, x.index + x[0].length);
  /* josa는 위 문장에서만 쓰이던 조사 값이다. 영어판에서는 patch.mjs가 지운다. */
  for (const x of s.matchAll(/josa:'[가-힣]+', /g)) mark(x.index, x.index + x[0].length);
  /* 소리 방의 조사 고르개 jz('이','가')도 마찬가지다 — 영어에는 조사가 없다. */
  for (const x of s.matchAll(/this\.jz\([^)]*\)/g)) mark(x.index, x.index + x[0].length);
  return m;
}
const clean = (m, a, b) => { for (let i = a; i < b; i++) if (m[i]) return false; return true; };

const LIT = new RegExp(
  "'((?:[^'\\\\\\n]|\\\\.)*)'" + '|' +
  '"((?:[^"\\\\\\n]|\\\\.)*)"' + '|' +
  '`((?:[^`\\\\]|\\\\.)*)`', 'g');

/* ── 한 파일에서 (시작, 끝, 원문) 목록을 뽑는다 ── */
export function units(src) {
  const m = commentMask(src);
  const out = [];
  /* q는 그 자리를 감싼 것이 무엇인지 적어 둔다 — 영어를 넣을 때 어떻게 이스케이프할지
     이 값으로 정한다. '  "  `  는 자바스크립트 리터럴, T는 화면 글자, A는 태그 속성. */
  const push = (a, b, q) => {
    const t = src.slice(a, b);
    if (HAN.test(t) && clean(m, a, b)) out.push({ a, b, ko: t, q });
  };
  const textNodes = (from, to) => {
    for (const x of src.slice(from, to).matchAll(/>([^<>]+)</g)) {
      const raw = x[1];
      const lead = raw.length - raw.trimStart().length;
      const a = from + x.index + 1 + lead;
      push(a, a + raw.trim().length, 'T');
    }
    for (const x of src.slice(from, to).matchAll(/\b(?:placeholder|aria-label|alt|title|label)\s*=\s*"([^"]*)"/g)) {
      const a = from + x.index + x[0].indexOf('"') + 1;
      push(a, a + x[1].length, 'A');
    }
  };

  /* <title> — 브라우저 탭에 보이므로 번역 대상이다 */
  const ti = src.match(/<title>([^<]*)<\/title>/);
  if (ti) push(ti.index + 7, ti.index + 7 + ti[1].length, 'T');

  const hEnd = src.indexOf('</helmet>');
  const tEnd = src.indexOf('</x-dc>');

  if (hEnd >= 0 && tEnd > hEnd) {
    /* 방 파일 — 템플릿 구간 */
    textNodes(hEnd + 9, tEnd);
  } else {
    /* index.html — body 전체 */
    const bA = src.indexOf('<body'), bB = src.lastIndexOf('</body>');
    if (bA >= 0 && bB > bA) textNodes(bA, bB);
  }

  /* 스크립트 구간 — 따옴표 리터럴 안쪽 */
  const sA = src.indexOf('<script type="text/x-dc"');
  const scriptA = sA >= 0 ? sA : Math.max(0, src.indexOf('<script>', src.lastIndexOf('</div>')));
  const body = src.slice(scriptA);
  for (const x of body.matchAll(LIT)) {
    const g = x[1] !== undefined ? 1 : x[2] !== undefined ? 2 : 3;
    const a = scriptA + x.index + 1;
    push(a, a + x[g].length, x[0][0]);
  }

  /* 겹치는 구간 제거 — 앞선 것을 남긴다 */
  out.sort((p, q) => p.a - q.a || q.b - p.b);
  const keep = [];
  let last = -1;
  for (const u of out) if (u.a >= last) { keep.push(u); last = u.b; }
  return keep;
}

if (import.meta.url.endsWith('extract.mjs') && process.argv[1] && process.argv[1].endsWith('extract.mjs')) {
  fs.mkdirSync(OUT, { recursive: true });
  let total = 0, done = 0;
  for (const f of FILES) {
    const src = fs.readFileSync(path.join(SRC, f), 'utf8');
    const us = units(src);
    const name = f.replace(/\.dc\.html$|\.html$/, '');
    const dst = path.join(OUT, name + '.json');
    const prev = fs.existsSync(dst) ? (JSON.parse(fs.readFileSync(dst, 'utf8')).strings || {}) : {};
    const strings = {};
    for (const u of us) if (!(u.ko in strings)) strings[u.ko] = prev[u.ko] || '';
    fs.writeFileSync(dst, JSON.stringify({ _file: f, _count: Object.keys(strings).length, strings }, null, 1), 'utf8');
    const d = Object.values(strings).filter(Boolean).length;
    total += Object.keys(strings).length; done += d;
    console.log(`${name.padEnd(10)} 자리 ${String(us.length).padStart(4)}  고유 ${String(Object.keys(strings).length).padStart(4)}  번역됨 ${d}`);
  }
  console.log('─'.repeat(52));
  console.log(`고유 문자열 합계 ${total} · 번역됨 ${done}`);
}
