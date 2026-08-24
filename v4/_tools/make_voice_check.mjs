/* make_voice_check.mjs — 대사별 mp3를 바로 들어 보는 확인 페이지의 자료를 만든다.
   방 코드에서 대사 차례를 그대로 뽑으므로 앱에서 듣는 순서와 같다.
   결과는 _tools/voice_check.json — voice_check.html이 이 파일을 읽는다. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const V4 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* 비를 한자어로 읽는 방 — 앱의 speak()에 같은 규칙이 들어 있는 방만 적는다.
   규칙이 없는 방에까지 적용하면 이미 만들어 둔 mp3의 키와 어긋난다. */
const SINO_ROOMS = new Set(['ColorRoom', 'EvalRoom']);
const SINO = v => { const S = ['영','일','이','삼','사','오','육','칠','팔','구','십']; return +v <= 10 ? S[+v] : v; };
const norm = (raw, room) => {
  const t = raw == null ? '' : (typeof raw === 'string' ? raw : (Array.isArray(raw) ? raw.join(' ') : String(raw)));
  let x = t.replace(/[\u{1F300}-\u{1FAFF}☀-➿️]/gu, '');
  if (SINO_ROOMS.has(room)) {
    x = x.replace(/(?<![\d.])(\d+)\s*대\s*(\d+\.\d+)/g, (mm, a, b) => SINO(a) + ' 대 ' + b)
         .replace(/(?<![\d.])(\d+)\s*대\s*(\d+)(?![.\d])/g, (mm, a, b) => SINO(a) + ' 대 ' + SINO(b));
  }
  return x.replace(/mL/g, ' 밀리리터 ').replace(/cm/g, ' 센티미터 ').replace(/Hz/g, ' 헤르츠 ')
          .replace(/\s+/g, ' ').trim();
};
const ttsKey = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return h.toString(36); };

function make(name, done) {
  const html = fs.readFileSync(path.join(V4, name + '.dc.html'), 'utf8');
  const src = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1]
    .replace(/^\s*class Component extends DCLogic\s*\{/, 'class Component {');
  const shim = [
    'const localStorage = { getItem: (k) => (STORE[k] === undefined ? null : STORE[k]), setItem: () => {}, removeItem: () => {} };',
    'const speechSynthesis = { getVoices: () => [], cancel(){}, speak(){}, resume(){} };',
    'const document = { addEventListener(){}, visibilityState:"visible", createElement:()=>({style:{},appendChild(){}}) };',
    'const window = { addEventListener(){}, localStorage, RS_TTS:{}, matchMedia:()=>({matches:false}) };',
    'const Audio = function(){ return { play: () => ({ catch(){} }), pause(){}, addEventListener(){} }; };',
  ].join('\n');
  const store = { 'rs3_user': JSON.stringify({ code: 'scan' }), 'rs3_done:scan': JSON.stringify(done) };
  return new (new Function('STORE', shim + '\n' + src + '\nreturn Component;')(store))();
}

function lines(name, done) {
  const room = make(name, done), out = [];
  (room.STEPS || []).forEach((s, i) => {
    const raw = s.k === 'story' ? (s.lines || []).join(' ') : s.say;
    const t = norm(raw, name);
    if (!t) return;
    const who = name === 'EvalRoom' ? 'ratio' : (s.who || 'ratio');
    out.push({ step: i, who, text: t, key: ttsKey(who + '|' + t) });
  });
  /* STEPS 밖에서 부르는 대사 — 색깔 방의 컵 세기 물음 */
  if (name === 'ColorRoom' && room.CUP_ASK) {
    const t = norm(room.CUP_ASK, name);
    out.push({ step: 11.5, who: 'munsell', text: t, key: ttsKey('munsell|' + t) });
  }
  return out.sort((a, b) => a.step - b.step);
}

/* 인물별 목소리는 _tools/cast.json 한 곳에서만 정한다. 파일이 없으면 예전 값을 쓴다. */
const CAST = (() => {
  const f = path.join(V4, '_tools', 'cast.json');
  if (fs.existsSync(f)) {
    const c = JSON.parse(fs.readFileSync(f, 'utf8')).cast, o = {};
    for (const k in c) o[k] = [c[k].name, c[k].speaker];
    return o;
  }
  return {
    ratio: ['레시오', 'vhyeri'], munch: ['뭉크', 'njooahn'], munsell: ['먼셀', 'nwoosik'],
    signac: ['시냐크', 'nraewon'], eratos: ['에라토스테네스', 'nwontak'], kid: ['다인', 'ndain'],
  };
})();
const manSrc = fs.readFileSync(path.join(V4, 'tts', 'manifest.js'), 'utf8');
const manKeys = new Set([...manSrc.matchAll(/['"]([0-9a-z]{1,9})['"]\s*:/g)].map(m => m[1]));

const data = {
  ver: (manSrc.match(/RS_TTS_V = '(\d+)'/) || [, '1'])[1],
  fixed: '1fcvula',
  groups: [
    { title: '🎨 색깔의 비밀 방 — 전체',
      note: '앱에서 나오는 차례 그대로입니다.',
      rows: lines('ColorRoom', []) },
    { title: '🎼 소리의 방 — 전체',
      note: '색깔 방을 마치고 들어온 차례입니다.',
      rows: lines('SoundRoom', ['color']) },
    { title: '🗺️ 지도의 방 — 전체',
      note: '색깔·소리를 마치고 들어온 차례입니다.',
      rows: lines('MapRoom', ['color', 'sound']) },
    { title: '🏛️ 평가의 방 — 전체',
      note: '세 방을 마친 뒤 듣는 차례입니다.',
      rows: lines('EvalRoom', ['color','sound','map']) },
  ],
};
data.groups.forEach(g => g.rows.forEach(r => {
  r.cast = CAST[r.who] ? CAST[r.who][0] : r.who;
  r.speaker = CAST[r.who] ? CAST[r.who][1] : '—';
  r.reg = manKeys.has(r.key);
}));

fs.writeFileSync(path.join(V4, '_tools', 'voice_check.json'), JSON.stringify(data, null, 1), 'utf8');
console.log('만듦: _tools/voice_check.json');
data.groups.forEach(g => console.log(`  ${g.title} — ${g.rows.length}줄`));
