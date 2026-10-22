/* synth_samples.mjs — 목소리를 고르기 위한 견본을 받는다. 실제 앱 음성은 건드리지 않는다.

   1단계 · 후보 화자 전체를 공통 문장으로 하나씩
     node _tools/synth_samples.mjs
       → tts/_samples/<화자>.mp3 와 _samples/index.json

   2단계 · 마음에 든 몇을 그 인물의 실제 대사로 다시
     node _tools/synth_samples.mjs --who=munsell --speakers=nsinu,njihun,ndaeseong
       → tts/_samples/munsell__<화자>.mp3

   목록만 보려면 --dry. 이미 받아 둔 파일은 건너뛰고, --force 면 다시 받는다.
   필요한 환경변수: NCP_CLOVA_CLIENT_ID, NCP_CLOVA_CLIENT_SECRET

   후보 코드는 CLOVA가 거절하면 그냥 건너뛴다. 못 쓰는 코드가 섞여 있어도 괜찮다. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const V4 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(V4, 'tts', '_samples');
const URL = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';

const arg = n => (process.argv.find(a => a.startsWith('--' + n + '=')) || '').split('=')[1] || '';
const has = n => process.argv.includes('--' + n);
const DRY = has('dry'), FORCE = has('force');
const ID = process.env.NCP_CLOVA_CLIENT_ID, SECRET = process.env.NCP_CLOVA_CLIENT_SECRET;

/* 후보 화자. 옆의 설명은 참고용 짐작이므로 실제 판단은 들어 보고 하세요.
   'v'로 시작하면 Pro 화자, 'n'으로 시작하면 일반 화자입니다. */
const CANDIDATES = [
  /* 여성 */
  ['vhyeri', '여성 · Pro · 현재 레시오'], ['vgoeun', '여성 · Pro'], ['vmikyung', '여성 · Pro'],
  ['vyuna', '여성 · Pro'], ['vara', '여성 · Pro'], ['vian', '여성 · Pro'],
  ['nara', '여성'], ['nminyoung', '여성'], ['nyuna', '여성'], ['njiwon', '여성'],
  ['ngoeun', '여성'], ['neunyoung', '여성'], ['nsunkyung', '여성'], ['nkyunglee', '여성'],
  /* 남성 */
  ['vdaeseong', '남성 · Pro'], ['vhyunbin', '남성 · Pro'], ['vjaewook', '남성 · Pro'],
  ['njinho', '남성'], ['nsinu', '남성'], ['njihun', '남성'], ['njoonyoung', '남성'],
  ['nwoosik', '남성 · 현재 먼셀'], ['nraewon', '남성 · 현재 시냐크'], ['njooahn', '남성 · 현재 뭉크'],
  ['ndaeseong', '남성'], ['ngyeongjun', '남성'], ['nseungpyo', '남성'], ['nsangdo', '남성'],
  ['njonghyun', '남성'], ['nminsang', '남성'], ['nwontak', '남성 · 현재 에라토스테네스'],
  ['nyoungil', '남성'], ['njihwan', '남성'],
  /* 아이 */
  ['ndain', '아동 · 현재 다인'], ['vdain', '아동 · Pro'], ['nhajun', '아동'], ['nbora', '아동'],
];

const COMMON = '안녕하세요. 빨강 물감 10 밀리리터 씩 두 컵을 부었어요. 노랑 물감은 몇 컵을 부어야 할까요?';

async function get(speaker, text, out) {
  const body = new URLSearchParams({ speaker, text, format: 'mp3', speed: '0', pitch: '0', volume: '0' });
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': ID, 'X-NCP-APIGW-API-KEY': SECRET,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  if (!res.ok) return { ok: 0, why: 'HTTP ' + res.status + ' ' + (await res.text()).slice(0, 90) };
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) return { ok: 0, why: '내용이 너무 짧음(' + buf.length + 'B)' };
  fs.writeFileSync(out, buf);
  return { ok: 1, size: buf.length };
}

const who = arg('who');
const cast = JSON.parse(fs.readFileSync(path.join(V4, '_tools', 'cast.json'), 'utf8')).cast;
if (who && !cast[who]) { console.error('cast.json 에 없는 인물: ' + who); process.exit(1); }

const pick = arg('speakers');
const rows = (pick ? pick.split(',').map(s => [s.trim(), '지정']) : CANDIDATES).filter(r => r[0]);
const text = who ? cast[who].sample : COMMON;
const tag = who ? who + '__' : '';

if (!DRY && (!ID || !SECRET)) {
  console.error('환경변수 NCP_CLOVA_CLIENT_ID / NCP_CLOVA_CLIENT_SECRET 가 없습니다.');
  console.error('목록만 보려면: node _tools/synth_samples.mjs --dry');
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
console.log((who ? cast[who].name + ' 대사로 ' : '공통 문장으로 ') + rows.length + '명' + (DRY ? '  (미리 보기)' : ''));
console.log('  「' + text.slice(0, 42) + '…」\n');

const done = [];
let ok = 0, skip = 0, fail = 0;
for (const [spk, note] of rows) {
  const out = path.join(OUT, tag + spk + '.mp3');
  if (!FORCE && fs.existsSync(out)) { skip++; done.push({ speaker: spk, note, file: tag + spk + '.mp3' }); continue; }
  if (DRY) { console.log('예정    ' + spk.padEnd(12) + note); continue; }
  const r = await get(spk, text, out);
  if (r.ok) { ok++; done.push({ speaker: spk, note, file: tag + spk + '.mp3' }); console.log('받음    ' + spk.padEnd(12) + note); }
  else { fail++; console.log('건너뜀  ' + spk.padEnd(12) + r.why); }
}

if (!DRY) {
  const ix = path.join(OUT, 'index.json');
  const prev = fs.existsSync(ix) ? JSON.parse(fs.readFileSync(ix, 'utf8')) : { sets: {} };
  prev.sets[who || '_common'] = { text, rows: done };
  prev.ver = String(Date.now());
  fs.writeFileSync(ix, JSON.stringify(prev, null, 1), 'utf8');
  console.log('\n받음 ' + ok + ' · 건너뜀 ' + skip + ' · 못 받음 ' + fail + '  →  tts/_samples/');
  console.log('들어 보기: _tools/voice_picker.html');
}
