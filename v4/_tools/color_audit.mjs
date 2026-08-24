/* color_audit.mjs — 색깔 방 낭독을 한 줄씩 훑어 mp3가 실제로 재생 가능한지까지 본다.
   매니페스트 등록 여부만이 아니라 파일이 성한지(빈 파일·잘린 파일·오류 응답)도 확인한다. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const V4 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const norm = raw => {
  const t = raw == null ? '' : (typeof raw === 'string' ? raw : (Array.isArray(raw) ? raw.join(' ') : String(raw)));
  return t.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, '')
          .replace(/mL/g, ' 밀리리터 ').replace(/\s+/g, ' ').trim();
};
const ttsKey = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return h.toString(36); };

const html = fs.readFileSync(path.join(V4, 'ColorRoom.dc.html'), 'utf8');
const src = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1]
  .replace(/^\s*class Component extends DCLogic\s*\{/, 'class Component {');
const shim = `
  const localStorage = { getItem: (k) => (STORE[k] === undefined ? null : STORE[k]), setItem: () => {}, removeItem: () => {} };
  const speechSynthesis = { getVoices: () => [], cancel(){}, speak(){}, resume(){} };
  const document = { addEventListener(){}, visibilityState:'visible', createElement:()=>({style:{},appendChild(){}}) };
  const window = { addEventListener(){}, localStorage, RS_TTS:{}, matchMedia:()=>({matches:false}) };
  const Audio = function(){ return { play: () => ({ catch(){} }), pause(){}, addEventListener(){} }; };
`;
const make = done => new (new Function('STORE', shim + '\n' + src + '\nreturn Component;')(
  { 'rs3_user': JSON.stringify({ code: 'scan' }), 'rs3_done:scan': JSON.stringify(done) }))();

/* mp3가 정말 재생 가능한 파일인지 — ID3 + 첫 프레임 동기 + 규격 */
function mp3info(p) {
  if (!fs.existsSync(p)) return { ok: false, why: '파일 없음' };
  const b = fs.readFileSync(p);
  if (b.length < 2000) return { ok: false, why: `너무 작음(${b.length}B) — 오류 응답일 수 있음` };
  if (b.slice(0, 1).toString() === '{') return { ok: false, why: 'JSON 오류 응답' };
  let i = 0;
  if (b.slice(0, 3).toString() === 'ID3') i = 10 + ((b[6] << 21) | (b[7] << 14) | (b[8] << 7) | b[9]);
  while (i < b.length - 4 && !(b[i] === 0xFF && (b[i + 1] & 0xE0) === 0xE0)) i++;
  if (i >= b.length - 4) return { ok: false, why: 'MPEG 프레임 없음' };
  const ver = { 0: '2.5', 2: '2', 3: '1' }[(b[i + 1] >> 3) & 3];
  const brT = ver === '1' ? [0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,0]
                          : [0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,0];
  const br = brT[(b[i + 2] >> 4) & 15];
  const sr = { '1': [44100,48000,32000], '2': [22050,24000,16000], '2.5': [11025,12000,8000] }[ver][(b[i + 2] >> 2) & 3];
  const ch = ['stereo','joint','dual','mono'][(b[i + 3] >> 6) & 3];
  return { ok: true, spec: `MPEG${ver} ${br}kbps ${sr}Hz ${ch}`, sec: (b.length - i) * 8 / (br * 1000), bytes: b.length };
}

const manSrc = fs.readFileSync(path.join(V4, 'tts', 'manifest.js'), 'utf8');
const manKeys = new Set([...manSrc.matchAll(/['"]([0-9a-z]{1,9})['"]\s*:/g)].map(m => m[1]));

/* 낭독되는 대사 모으기 — STEPS(진도 두 갈래) + CUP_ASK */
const lines = [];
for (const [tag, done] of [['처음', []], ['이어서', ['sound', 'map']]]) {
  const room = make(done);
  (room.STEPS || []).forEach((s, i) => {
    const raw = s.k === 'story' ? (s.lines || []).join(' ') : s.say;
    const t = norm(raw);
    if (t) lines.push({ who: s.who || 'ratio', text: t, where: `STEPS[${i}] ${s.k} (${tag})`, step: i });
  });
  if (room.CUP_ASK) lines.push({ who: 'munsell', text: norm(room.CUP_ASK), where: `CUP_ASK 직접 호출 (${tag})`, step: -1 });
}

const seen = new Set(), rows = [];
for (const l of lines) {
  const key = ttsKey(l.who + '|' + l.text);
  if (seen.has(key)) continue;
  seen.add(key);
  rows.push({ ...l, key, inMan: manKeys.has(key), file: mp3info(path.join(V4, 'tts', key + '.mp3')) });
}

rows.sort((a, b) => a.step - b.step);
const bad = rows.filter(r => !r.inMan || !r.file.ok);
console.log(`색깔 방 낭독 ${rows.length}개 검사\n`);
for (const r of rows) {
  const mark = (r.inMan && r.file.ok) ? '  ' : '✗ ';
  const st = r.inMan ? (r.file.ok ? `${r.file.spec} ${r.file.sec.toFixed(1)}s` : `mp3 문제: ${r.file.why}`) : '매니페스트 미등록';
  console.log(`${mark}${r.key.padEnd(8)} ${r.who.padEnd(8)} ${r.where.padEnd(28)} ${st}`);
  console.log(`   ${r.text.slice(0, 70)}${r.text.length > 70 ? '…' : ''}`);
}
console.log(`\n=== 브라우저 음성으로 새는 대사: ${bad.length}건 ===`);
bad.forEach(r => console.log(`  ${r.key}  ${r.who}  ${r.where}\n    ${r.text}`));
