/* verify.mjs — 만들어 낸 영어판을 되짚어 본다.
   추출기를 산출물에 그대로 다시 돌려, 화면에 나갈 자리에 한글이 남았는지 본다.
   코드 주석의 한글은 개발자 메모이므로 세지 않는다(추출기가 애초에 뽑지 않는다).

   v4-en 폴더에서:  node _build/verify.mjs                                       */
import fs from 'node:fs';
import path from 'node:path';
import { units, FILES } from './extract.mjs';

let bad = 0;
for (const f of FILES) {
  const src = fs.readFileSync(path.resolve('.', f), 'utf8');
  /* 추출기는 한글이 든 자리만 집어내므로, 여기서 걸리는 것이 곧 덜 옮긴 자리다 */
  const left = units(src);
  console.log(`${f.padEnd(20)} 화면에 나갈 자리 중 한글이 남은 것 ${left.length}`);
  if (left.length) {
    bad += left.length;
    left.slice(0, 10).forEach(u => console.log('    · ' + u.ko.slice(0, 100)));
  }
}
console.log('─'.repeat(56));
console.log(bad ? `한글이 ${bad}자리 남았습니다.` : '화면에 나갈 자리에 한글이 없습니다 — 영어판이 온전합니다.');
process.exit(bad ? 1 : 0);
