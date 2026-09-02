/* build.mjs — 한국어판 v4에서 영어판 v4-en을 만든다.
   영어판 HTML은 손으로 고치지 않는다. 언제나 이 스크립트가 만들어 낸다.
   한국어판이 바뀌면 대조표만 채우고 다시 돌리면 된다.

     1) ../v4의 원본을 읽는다
     2) _build/i18n/*.json의 대조표대로 한글 문자열을 영어로 바꾼다(뽑아 둔 자리에만)
     3) _build/patch.mjs의 코드 손질을 얹는다(경로·음성·글꼴·로그)
     4) v4-en/에 쓴다

   v4-en 폴더에서:  node _build/build.mjs            아직 못 옮긴 것은 한글로 남기고 알려 준다
                    node _build/build.mjs --strict   하나라도 비어 있으면 멈춘다                 */
import fs from 'node:fs';
import path from 'node:path';
import { units, FILES } from './extract.mjs';
import { patch } from './patch.mjs';

const SRC = path.resolve('../v4');
const DST = path.resolve('.');
const I18N = path.resolve('_build/i18n');
const STRICT = process.argv.includes('--strict');

let missTotal = 0, doneTotal = 0;
const holes = [];

/* 영어에는 아포스트로피가 흔하다(Let's · the Earth's). 그 자리를 감싼 것이
   작은따옴표 리터럴이면 그대로 넣는 순간 자바스크립트가 깨진다.
   그래서 번역문은 늘 평범하게 적고, 넣을 때 여기서 감싼 것에 맞춰 다듬는다. */
function escapeFor(en, q) {
  if (q === "'") return en.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  if (q === '"') return en.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  if (q === '`') return en.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  if (q === 'A') return en.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  if (q === 'T') return en.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return en;
}

for (const f of FILES) {
  const src = fs.readFileSync(path.join(SRC, f), 'utf8');
  const name = f.replace(/\.dc\.html$|\.html$/, '');
  const tablePath = path.join(I18N, name + '.json');
  const table = JSON.parse(fs.readFileSync(tablePath, 'utf8')).strings || {};

  /* 2) 번역 — 뽑아 둔 자리만 바꾼다. 뒤에서부터 넣어 앞자리 위치가 밀리지 않게 한다. */
  const us = units(src);
  let out = '', p = 0, miss = 0, done = 0;
  for (const u of us) {
    const en = table[u.ko];
    out += src.slice(p, u.a);
    if (en) { out += escapeFor(en, u.q); done++; }
    else { out += u.ko; miss++; if (holes.length < 400) holes.push([name, u.ko]); }
    p = u.b;
  }
  out += src.slice(p);

  /* 3) 코드 손질 */
  const { out: patched, report } = patch(f, out);

  /* 4) 쓰기 */
  fs.writeFileSync(path.join(DST, f), patched, 'utf8');
  missTotal += miss; doneTotal += done;
  console.log(`${f.padEnd(20)} 옮김 ${String(done).padStart(4)}  남음 ${String(miss).padStart(4)}  손질 ${report.length}종`);
}

console.log('─'.repeat(58));
console.log(`옮긴 자리 ${doneTotal} · 아직 한글인 자리 ${missTotal}`);
if (missTotal) {
  const seen = new Set();
  console.log('\n아직 못 옮긴 것(앞에서부터):');
  for (const [n, ko] of holes) {
    if (seen.has(n + '|' + ko)) continue;
    seen.add(n + '|' + ko);
    if (seen.size > 15) break;
    console.log(`  ${n.padEnd(10)} ${ko.slice(0, 66)}`);
  }
  if (STRICT) { console.error('\n--strict: 대조표가 다 채워지지 않아 멈춥니다.'); process.exit(1); }
} else {
  console.log('대조표가 모두 채워졌습니다.');
}
