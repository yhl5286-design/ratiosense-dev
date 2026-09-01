/* install_new.mjs — tts/_new/ 에 받아 둔 mp3를 실제로 쓰이도록 설치한다.
     ① tts/_new/*.mp3 를 tts/ 로 옮기고
     ② tts/manifest.js 의 목록에 키를 등록하고
     ③ window.RS_TTS_V 를 지금 시각으로 올린다(이걸 올려야 브라우저가 새 음성을 받아 간다)

   쓰는 법 (v4 폴더에서):
     node _tools/install_new.mjs --dry     무엇을 할지 미리 본다
     node _tools/install_new.mjs           실제로 설치한다

   되돌리려면 manifest.js.bak-<시각> 파일을 manifest.js 로 되돌리고,
   tts/ 로 옮긴 mp3를 지우면 된다. */
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const NEW = path.join('tts', '_new');
const MAN = path.join('tts', 'manifest.js');

if (!fs.existsSync(NEW)) { console.error('tts/_new 폴더가 없습니다. 먼저 음성을 받아 오세요.'); process.exit(1); }

const files = fs.readdirSync(NEW).filter(f => f.toLowerCase().endsWith('.mp3'));
if (!files.length) { console.log('tts/_new 에 새 mp3가 없습니다. 할 일이 없습니다.'); process.exit(0); }

let man = fs.readFileSync(MAN, 'utf8');
const registered = new Set([...man.matchAll(/['"]([0-9a-z]{1,9})['"]\s*:/g)].map(m => m[1]));

/* 목록에 있는 대사인지 대조한다 — 이름을 잘못 붙인 파일을 거르기 위해서다 */
let known = new Map();
try {
  const vc = JSON.parse(fs.readFileSync('_tools/voice_check.json', 'utf8'));
  for (const g of vc.groups) for (const r of g.rows) known.set(r.key, r);
} catch (e) { console.log('(voice_check.json 을 읽지 못해 대사 대조는 건너뜁니다)'); }

/* --replace — 이미 등록된 키도 갈아 끼운다(목소리만 바꿔 다시 받았을 때).
   옛 mp3는 tts/_old/ 로 옮겨 두므로 마음에 안 들면 되돌릴 수 있다. */
const REPLACE = process.argv.includes('--replace');

const add = [], repl = [], skip = [], unknown = [];
for (const f of files) {
  const key = path.basename(f, path.extname(f));
  if (known.size && !known.has(key)) unknown.push(key);
  if (registered.has(key)) { (REPLACE ? repl : skip).push({ key, f }); continue; }
  add.push({ key, f });
}

const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);

console.log('새 음성 ' + files.length + '개  ·  등록할 것 ' + add.length + '개  ·  갈아 끼울 것 ' + repl.length + '개  ·  건너뛸 것 ' + skip.length + '개');
if (skip.length && !REPLACE) console.log('  (이미 등록된 키입니다. 목소리만 바꿔 받은 것이라면 --replace 를 붙이세요.)');
for (const a of repl) {
  const r = known.get(a.key);
  console.log('  ~ ' + a.key.padEnd(9) + (r ? (r.cast || '').padEnd(5) + r.text.slice(0, 40) : ''));
}
if (unknown.length) console.log('⚠ 지금 대사 목록에 없는 키 ' + unknown.length + '개: ' + unknown.join(', ') + '\n  (대사를 그 뒤에 또 고쳤을 수 있습니다. 확인하세요.)');
for (const a of add) {
  const r = known.get(a.key);
  console.log('  + ' + a.key.padEnd(9) + (r ? (r.cast || '').padEnd(5) + r.text.slice(0, 40) : ''));
}
if (!add.length && !repl.length) { console.log('등록하거나 갈아 끼울 것이 없습니다.'); process.exit(0); }

if (DRY) { console.log('\n(미리 보기 — 아무것도 바꾸지 않았습니다. --dry 를 빼고 다시 실행하세요.)'); process.exit(0); }

/* ① 파일 옮기기 — 갈아 끼우는 것은 옛 파일을 tts/_old/ 로 물려 둔다 */
for (const a of add) fs.renameSync(path.join(NEW, a.f), path.join('tts', a.key + '.mp3'));
if (repl.length) {
  const OLD = path.join('tts', '_old', stamp);
  fs.mkdirSync(OLD, { recursive: true });
  for (const a of repl) {
    const live = path.join('tts', a.key + '.mp3');
    if (fs.existsSync(live)) fs.renameSync(live, path.join(OLD, a.key + '.mp3'));
    fs.renameSync(path.join(NEW, a.f), live);
  }
  console.log('옛 음성 ' + repl.length + '개를 ' + OLD + ' 에 물려 두었습니다.');
}

/* ② 매니페스트에 등록 — 마지막 };  바로 앞에 덧붙인다.
   갈아 끼우기만 한 경우 목록은 그대로다(음성 키가 인물코드+대사로 정해지므로 화자가 바뀌어도 키는 같다). */
fs.writeFileSync(MAN + '.bak-' + stamp, man, 'utf8');
if (add.length) {
const block = '  /* ── ' + stamp + ' 추가 ── */\n'
  + add.map(a => {
      const r = known.get(a.key);
      return (r ? '  // ' + (r.cast || r.who) + ': ' + r.text.slice(0, 70) + '\n' : '') + "  '" + a.key + "': 1,";
    }).join('\n') + '\n';
const at = man.lastIndexOf('};');
if (at < 0) { console.error('manifest.js 에서 목록의 끝(};)을 찾지 못했습니다. 직접 넣어 주세요.'); process.exit(1); }
man = man.slice(0, at) + block + man.slice(at);
}

/* ③ 음성 판 번호 올리기 */
man = man.replace(/RS_TTS_V = '\d+'/, "RS_TTS_V = '" + stamp + "'");
fs.writeFileSync(MAN, man, 'utf8');

/* ④ 방 파일이 매니페스트를 부르는 태그에도 같은 판 번호를 박는다.
   판 번호가 없으면 브라우저가 옛 목록을 캐시에 붙들어, 새 음성을 등록해도 옛 소리가 난다. */
let stamped = 0;
for (const room of ['ColorRoom', 'SoundRoom', 'MapRoom', 'EvalRoom']) {
  const f = room + '.dc.html';
  if (!fs.existsSync(f)) continue;
  const before = fs.readFileSync(f, 'utf8');
  const after = before.replace(/<script src="tts\/manifest\.js(?:\?v=\d+)?"><\/script>/,
                               '<script src="tts/manifest.js?v=' + stamp + '"></script>');
  if (after !== before) { fs.writeFileSync(f, after, 'utf8'); stamped++; }
}
if (stamped) console.log('방 파일 ' + stamped + '개의 매니페스트 태그에 판 번호를 박았습니다.');

console.log('\n설치 끝 — 등록 ' + add.length + '개 · 음성 판 번호 ' + stamp);
console.log('되돌리려면: tts/manifest.js.bak-' + stamp + ' 를 manifest.js 로 되돌리세요.');
console.log('다음: node _tools/make_voice_check.mjs && node _tools/gen_todo.mjs 로 목록을 갱신하고,');
console.log('      _tools/voice_check.html 을 열어 새 음성을 들어 보세요.');
