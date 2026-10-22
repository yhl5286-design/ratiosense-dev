/* fill.mjs — 대조표에 영어를 채워 넣는다.
   _build/tr/<방>.mjs 가 { "한국어": "English" } 를 내보내면 그대로 옮겨 담는다.
   대조표에 없는 열쇠(한국어판이 바뀌어 사라진 문장)는 알려 준다.

   v4-en 폴더에서:  node _build/fill.mjs [방이름 …]                              */
import fs from 'node:fs';
import path from 'node:path';

const NAMES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['index', 'ColorRoom', 'SoundRoom', 'MapRoom', 'EvalRoom'];

for (const name of NAMES) {
  const trPath = path.resolve('_build/tr', name + '.mjs');
  if (!fs.existsSync(trPath)) { console.log(`${name.padEnd(10)} 번역 파일 없음 — 건너뜀`); continue; }
  const tr = (await import('file://' + trPath.replace(/\\/g, '/'))).default;

  const jsonPath = path.resolve('_build/i18n', name + '.json');
  const doc = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const strings = doc.strings;

  let set = 0;
  const stray = [];
  for (const [ko, en] of Object.entries(tr)) {
    if (!(ko in strings)) { stray.push(ko); continue; }
    if (en) { strings[ko] = en; set++; }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(doc, null, 1), 'utf8');
  const left = Object.entries(strings).filter(([, v]) => !v).map(([k]) => k);
  console.log(`${name.padEnd(10)} 채움 ${String(set).padStart(4)} / ${String(Object.keys(strings).length).padStart(4)}   남음 ${left.length}`);
  if (stray.length) {
    console.log(`  ⚠ 대조표에 없는 열쇠 ${stray.length}개 (한국어판이 바뀌었을 수 있습니다)`);
    stray.slice(0, 5).forEach(s => console.log('     · ' + s.slice(0, 70)));
  }
  if (left.length && left.length <= 25) left.forEach(s => console.log('     ▫ ' + s.slice(0, 88)));
}
