/* gap_scan.mjs — 방 코드에서 낭독 대사를 뽑아 mp3가 없는 것을 찾는다.
   방 파일의 Component 클래스를 실제로 실행해 STEPS를 얻으므로,
   didColor() 같은 분기와 HP.forEach로 만들어지는 대사까지 빠짐없이 잡는다.
   앞선 방을 마친 학습자와 건너뛴 학습자는 듣는 대사가 다르므로 두 경우를 모두 훑는다. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const V4 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOMS = ['ColorRoom', 'SoundRoom', 'MapRoom', 'EvalRoom'];

/* speak()의 다듬기 규칙 — 방마다 치환 목록이 조금씩 다르므로 합집합을 쓴다 */
function norm(raw) {
  const t = raw == null ? '' : (typeof raw === 'string' ? raw : (Array.isArray(raw) ? raw.join(' ') : String(raw)));
  return t.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, '')
          .replace(/mL/g, ' 밀리리터 ').replace(/cm/g, ' 센티미터 ').replace(/Hz/g, ' 헤르츠 ')
          .replace(/\s+/g, ' ').trim();
}
function ttsKey(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return h.toString(36); }

/* 방 파일의 클래스 본문만 떼어 내 최소한의 브라우저 흉내 위에서 돌린다.
   done 목록을 갈아 끼워 '앞 방을 마친 학습자' 경우도 만들어 낸다. */
function loadRoom(name, done) {
  const html = fs.readFileSync(path.join(V4, name + '.dc.html'), 'utf8');
  const m = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error(name + ': 스크립트 블록을 찾지 못했다');
  const src = m[1].replace(/^\s*class Component extends DCLogic\s*\{/, 'class Component {');
  const store = { 'rs3_user': JSON.stringify({ code: 'scan' }), 'rs3_done:scan': JSON.stringify(done) };
  const shim = `
    const localStorage = { getItem: (k) => (STORE[k] === undefined ? null : STORE[k]), setItem: () => {}, removeItem: () => {} };
    const speechSynthesis = { getVoices: () => [], cancel(){}, speak(){}, resume(){} };
    const document = { addEventListener(){}, visibilityState:'visible', createElement:()=>({style:{},appendChild(){}}) };
    const window = { addEventListener(){}, localStorage, RS_TTS:{}, matchMedia:()=>({matches:false}) };
    const Audio = function(){ return { play: () => ({ catch(){} }), pause(){}, addEventListener(){} }; };
  `;
  return new (new Function('STORE', shim + '\n' + src + '\nreturn Component;')(store))();
}

/* 한 방에서 낭독되는 (화자, 대사) 쌍을 모두 모은다 */
function collect(name, room, tag) {
  const out = [];
  const add = (who, raw, where) => { const t = norm(raw); if (t && t !== '[object Object]') out.push({ who: who || 'ratio', text: t, where }); };
  (room.STEPS || []).forEach((s, i) => {
    const who = name === 'EvalRoom' ? 'ratio' : (s.who || 'ratio');
    if (s.k === 'story') add(who, (s.lines || []).join(' '), `${name}[${tag}] STEPS[${i}] story`);
    else if (s.k === 'rooms' && typeof room.roomsSay === 'function') {
      ['rooms', 'collect', 'reveal'].forEach(stage => {
        try { add(who, room.roomsSay(stage), `${name}[${tag}] STEPS[${i}] rooms:${stage}`); } catch (e) {}
      });
    } else if (s.say) add(who, s.say, `${name}[${tag}] STEPS[${i}] ${s.k}`);
  });
  return out;
}

/* STEPS 밖에서 this.speak('…', '화자')로 직접 부르는 문자열 상수 */
function directCalls(name) {
  const html = fs.readFileSync(path.join(V4, name + '.dc.html'), 'utf8');
  const out = [];
  const re = /this\.speak\(\s*(['"])((?:\.|(?!\1)[^\])*)\1\s*(?:,\s*(['"])([a-z]+)\3)?\s*\)/g;
  let m;
  while ((m = re.exec(html))) out.push({ who: m[4] || 'ratio', text: norm(m[2].replace(/\'/g, "'").replace(/\\"/g, '"')), where: `${name} speak() 직접 호출` });
  return out.filter(x => x.text);
}

const manSrc = fs.readFileSync(path.join(V4, 'tts', 'manifest.js'), 'utf8');
const manKeys = new Set([...manSrc.matchAll(/['"]([0-9a-z]{1,9})['"]\s*:/g)].map(m => m[1]));

const rows = [], seen = new Set();
for (const name of ROOMS) {
  const lines = [];
  /* 앞 방을 하나도 안 마친 경우 · 다 마친 경우 */
  for (const [tag, done] of [['처음', []], ['이어서', ['color', 'sound', 'map']]]) {
    let room;
    try { room = loadRoom(name, done); } catch (e) { console.log(`[건너뜀] ${name}(${tag}): ${e.message}`); continue; }
    try { lines.push(...collect(name, room, tag)); } catch (e) { console.log(`[건너뜀] ${name}(${tag}) STEPS: ${e.message}`); }
  }
  lines.push(...directCalls(name));
  for (const l of lines) {
    const key = ttsKey(l.who + '|' + l.text);
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({ room: name, key, who: l.who, inMan: manKeys.has(key),
                mp3: fs.existsSync(path.join(V4, 'tts', key + '.mp3')), where: l.where, text: l.text });
  }
}

const missing = rows.filter(r => !r.inMan || !r.mp3);
const byRoom = {};
rows.forEach(r => { byRoom[r.room] = (byRoom[r.room] || 0) + 1; });
console.log(`대사 ${rows.length}개 검사 (${Object.entries(byRoom).map(([k, v]) => k + ' ' + v).join(' · ')}) · 매니페스트 키 ${manKeys.size}개`);
console.log(`\n=== mp3가 없어 브라우저 음성으로 대체되는 대사: ${missing.length}건 ===`);
for (const r of missing) {
  console.log(`\n[${r.room}] key=${r.key}  화자=${r.who}  매니페스트=${r.inMan}  mp3=${r.mp3}`);
  console.log(`  위치: ${r.where}`);
  console.log(`  대사: ${r.text}`);
}
fs.writeFileSync(path.join(V4, '_tools', 'gap_scan_result.json'), JSON.stringify({ rows, missing }, null, 2), 'utf8');
