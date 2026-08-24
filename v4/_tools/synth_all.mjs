/* synth_all.mjs — 아직 mp3가 없는 대사를 CLOVA Voice Premium으로 한 번에 받아 tts/_new/에 넣는다.
   먼저 `node _tools/make_voice_check.mjs` 로 목록을 최신으로 만든 뒤 v4 폴더에서 실행한다.

   필요한 환경변수: NCP_CLOVA_CLIENT_ID, NCP_CLOVA_CLIENT_SECRET
   미리 보기만 하려면:  node _tools/synth_all.mjs --dry                                        */
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const ID = process.env.NCP_CLOVA_CLIENT_ID;
const SECRET = process.env.NCP_CLOVA_CLIENT_SECRET;
const URL = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';

if (!DRY && (!ID || !SECRET)) {
  console.error('환경변수 NCP_CLOVA_CLIENT_ID / NCP_CLOVA_CLIENT_SECRET 가 없습니다.');
  console.error('tts/RESYNTH-TODO.md 의 「API 키 준비」를 보고 셸에 넣은 뒤 다시 실행하세요.');
  console.error('목록만 보려면: node _tools/synth_all.mjs --dry');
  process.exit(1);
}

/* --who=munsell  그 인물의 대사만 받는다(목소리를 바꿨을 때).
   --all          이미 mp3가 있는 줄까지 다시 받는다. 음성 키는 인물코드+대사로 정해지므로
                  화자만 바꿔 다시 받으면 같은 키의 파일을 그대로 갈아 끼우게 된다. */
const WHO = (process.argv.find(a => a.startsWith('--who=')) || '').split('=')[1] || '';
const ALL = process.argv.includes('--all');

const data = JSON.parse(fs.readFileSync('_tools/voice_check.json', 'utf8'));
const todo = [];
for (const g of data.groups) for (const r of g.rows) {
  if (WHO && r.who !== WHO) continue;
  if (!ALL && r.reg) continue;
  todo.push(r);
}

/* 같은 키가 두 방에 겹쳐 나올 수 있으니 한 번만 받는다 */
const seen = new Set();
const rows = todo.filter(r => (seen.has(r.key) ? false : (seen.add(r.key), true)));

fs.mkdirSync(path.join('tts', '_new'), { recursive: true });
console.log('받을 대사 ' + rows.length + '줄' + (DRY ? '  (미리 보기 — 실제로 받지 않음)' : ''));

let ok = 0, fail = 0, skip = 0;
for (const r of rows) {
  const out = path.join('tts', '_new', r.key + '.mp3');
  if (fs.existsSync(out)) { skip++; console.log('건너뜀  ' + r.key + '  (이미 _new에 있음)'); continue; }
  if (DRY) { console.log('예정    ' + r.key + '  ' + r.speaker.padEnd(9) + r.text.slice(0, 46)); continue; }
  try {
    const body = new URLSearchParams({
      speaker: r.speaker, text: r.text, format: 'mp3', speed: '0', pitch: '0', volume: '0',
    });
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': ID,
        'X-NCP-APIGW-API-KEY': SECRET,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + (await res.text()).slice(0, 160));
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(out, buf);
    ok++;
    console.log('받음    ' + r.key + '  ' + r.speaker.padEnd(9) + buf.length.toLocaleString() + ' bytes  ' + r.text.slice(0, 34));
  } catch (e) {
    fail++;
    console.error('실패    ' + r.key + '  ' + e.message);
  }
}
console.log('');
console.log('받음 ' + ok + ' · 건너뜀 ' + skip + ' · 실패 ' + fail + '  →  tts/_new/');
if (ok) console.log('다음: mp3를 tts/ 로 옮기고 manifest.js에 키를 등록한 뒤 RS_TTS_V를 올리세요.');
