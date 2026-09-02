/* check.mjs — 추출기가 옳은지 두 가지로 확인한다.
   1) 되붙이기: 뽑은 자리를 원문 그대로 도로 끼우면 파일이 한 바이트도 달라지지 않아야 한다.
   2) 빠짐 조사: 뽑은 자리를 지우고 남은 한글은 모두 주석이어야 한다. 아니면 화면에 남는다.

   v4-en 폴더에서:  node _build/check.mjs                                       */
import fs from 'node:fs';
import path from 'node:path';
import { units, FILES } from './extract.mjs';

const SRC = path.resolve('../v4');
let bad = 0;

for (const f of FILES) {
  const src = fs.readFileSync(path.join(SRC, f), 'utf8');
  const us = units(src);

  /* 1) 되붙이기 */
  let out = '', p = 0;
  for (const u of us) { out += src.slice(p, u.a) + u.ko; p = u.b; }
  out += src.slice(p);
  const same = out === src;

  /* 2) 빠짐 조사 — 뽑은 자리를 비우고 주석도 비운 뒤 남는 한글 */
  let holed = '', q = 0;
  for (const u of us) { holed += src.slice(q, u.a); q = u.b; }
  holed += src.slice(q);
  const noComment = holed
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n').map(l => {
      const i = l.indexOf('//');
      if (i < 0) return l;
      const head = l.slice(0, i);
      const even = c => (head.split(c).length - 1) % 2 === 0;
      return (even("'") && even('"') && even('`')) ? head : l;
    }).join('\n');

  /* 아래는 영어판에서 patch.mjs가 통째로 갈아 끼우는 한국어 전용 음성 코드다.
     번역 대상이 아니므로 빠짐으로 세지 않는다. */
  const PATCHED = /SINO|가-힣|FEM =|MALE =|밀리리터|센티미터|헤르츠|const sj =|v\.scaleTitle|obj\.josa|1 : 10,000인 지도예요|josa:|this\.jz\(/;

  const all = [...noComment.matchAll(/[^\n]*[가-힣][^\n]*/g)].map(m => m[0].trim());
  const left = all.filter(l => !PATCHED.test(l));
  const byPatch = all.length - left.length;
  console.log(`${f.padEnd(20)} 되붙이기 ${same ? '동일 ✔' : '깨짐 ✘'}   빠진 한글 줄 ${left.length}   (패치가 맡는 줄 ${byPatch})`);
  if (!same) bad++;
  if (left.length) {
    bad++;
    left.slice(0, 12).forEach(l => console.log('    · ' + l.slice(0, 120)));
    if (left.length > 12) console.log(`    … 외 ${left.length - 12}줄`);
  }
}
console.log('─'.repeat(56));
console.log(bad ? `문제 ${bad}건 — 추출기를 고쳐야 합니다.` : '모든 파일 통과 — 뽑은 자리가 정확하고 빠진 한글이 없습니다.');
process.exit(bad ? 1 : 0);
