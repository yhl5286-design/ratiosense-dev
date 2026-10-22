/* dump_steps.mjs — 각 방의 현재 단계 목록을 번호와 함께 뽑는다(논문 화면 캡처 계획용).
   쓰는 법:  node _tools/dump_steps.mjs            사람이 읽는 표
             node _tools/dump_steps.mjs --json     기계용 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const V4 = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function room(name, done) {
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

const KIND = {
  story: '이야기', chips: '보기 고르기', lab: '실험(조작)', cups: '컵 옮겨 담기',
  demo: '시범', dots: '점 찍기', grid: '격자 칠하기', blank: '빈칸 채우기',
  finish: '마침', door: '자물쇠', finale: '피날레', phi: '황금비 막대',
};

function label(s) {
  if (s.k === 'story') return (s.lines || [])[0] || '';
  return (s.say || '').slice(0, 58);
}
function tag(s) {
  const t = [];
  if (s.mode) t.push(s.mode);
  if (s.unit) t.push(s.unit);
  if (s.id) t.push(s.id);
  if (s.demo) t.push('demo:' + s.demo);
  if (s.art) t.push('그림');
  if (s.lockR) t.push('빨강' + s.lockR + '고정');
  if (s.n) t.push(s.n + '칸');
  return t.join(' · ');
}

const ROOMS = [
  ['ColorRoom', '🎨 색깔의 비밀', []],
  ['SoundRoom', '🎼 소리의 비밀', ['color']],
  ['MapRoom', '🗺️ 지도의 비밀', ['color', 'sound']],
  ['EvalRoom', '🏛️ 평가의 방', ['color', 'sound', 'map']],
];

const out = [];
for (const [name, title, done] of ROOMS) {
  let r;
  try { r = room(name, done); } catch (e) { console.log('!! ' + name + ' 읽기 실패: ' + e.message); continue; }
  const steps = (r.STEPS || []).map((s, i) => ({
    no: i + 1, k: s.k, kind: KIND[s.k] || s.k, who: s.who || '', tag: tag(s), label: label(s),
  }));
  out.push({ name, title, steps });
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(out, null, 1));
} else {
  for (const r of out) {
    console.log('\n== ' + r.title + ' — 전체 ' + r.steps.length + '단계 ==');
    for (const s of r.steps) {
      console.log(String(s.no).padStart(3) + '  ' + s.kind.padEnd(8) + (s.who || '-').padEnd(9)
        + (s.tag || '').padEnd(24) + s.label);
    }
  }
}
