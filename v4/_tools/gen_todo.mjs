/* gen_todo.mjs — 방 코드에서 뽑은 대사 목록(voice_check.json)으로
   ① 재합성 대기 목록과 ② 방 전체 대사 대장을 한 문서로 만든다.

   쓰는 법 (v4 폴더에서):
     node _tools/make_voice_check.mjs      대사를 코드에서 다시 뽑는다
     node _tools/gen_todo.mjs              tts/RESYNTH-TODO.md 를 다시 쓴다

   손으로 표를 고치지 마세요 — 대사를 고칠 때마다 위 두 명령을 돌리면 저절로 맞습니다. */
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('_tools/voice_check.json', 'utf8'));
const esc = (t) => t.replace(/\|/g, '\\|');

const pending = [];
for (const g of data.groups) for (const r of g.rows) if (!r.reg) pending.push({ ...r, room: g.title });

const byCast = {};
pending.forEach(r => { byCast[r.cast] = (byCast[r.cast] || 0) + 1; });
const castLine = Object.entries(byCast).map(([k, v]) => `${k} ${v}줄`).join(' · ');

const CAST_TABLE = `| 코드 | 인물 | CLOVA 화자 |
|---|---|---|
| \`ratio\` | 레시오 (안내자) | \`vhyeri\` |
| \`munch\` | 화가 뭉크 | \`njooahn\` |
| \`munsell\` | 과학자 먼셀 | \`nwoosik\` |
| \`signac\` | 화가 시냐크 | \`nraewon\` |
| \`kid\` | 다인 (또래 아이) | \`ndain\` |
| \`eratos\` | 에라토스테네스 | \`nwontak\` |
`;

let md = `# 대사·음성 대장

**이 문서는 자동 생성됩니다.** 대사를 고친 뒤 v4 폴더에서 아래 두 줄을 돌리면 다시 만들어집니다.

\`\`\`
node _tools/make_voice_check.mjs
node _tools/gen_todo.mjs
\`\`\`

대사를 한 글자라도 고치면 그 줄의 음성 키가 바뀌어 기존 mp3와 어긋납니다. 어긋난 줄은 앱이 브라우저 내장 음성으로 대신 읽어 주므로 소리가 끊기지는 않지만, **그 대사만 목소리가 달라집니다**(먼셀·뭉크·시냐크·다인은 한국어 남성·아동 내장 음성이 없어 성인 여성 음성으로 읽힙니다).

마지막 생성: 음성 판 번호 \`${data.ver}\` 기준

---

# 1부 · 재합성 대기 — ${pending.length}줄

${castLine}

| 방 | 단계 | 새 키 | 화자 | CLOVA | 합성할 원문 (읽히는 그대로) |
|---|---|---|---|---|---|
`;
for (const r of pending) {
  md += `| ${r.room.replace(/ —.*$/, '')} | ${r.step} | \`${r.key}\` | ${r.cast} | \`${r.speaker}\` | ${esc(r.text)} |\n`;
}

md += `
> **원문 열은 앱이 실제로 읽는 문자열입니다.** 이모지가 지워지고, \`mL\`이 \` 밀리리터 \`로, 비의 숫자가 한자어(\`1 대 2\` → \`일 대 이\`)로 바뀐 뒤의 형태라, 이 열을 그대로 합성기에 넣으면 됩니다.

## 한 번에 합성하기

1. NCP 인증정보를 셸에 넣습니다(아래 「API 키 준비」).
2. \`node _tools/synth_all.mjs\` — 위 표의 모든 줄을 \`tts/_new/\`에 받아 옵니다. \`--dry\`를 붙이면 목록만 봅니다.
3. 받은 mp3를 \`tts/\`로 옮기고, \`tts/manifest.js\`의 목록에 \`'<키>': 1,\`을 추가합니다.
4. \`window.RS_TTS_V\`를 새 날짜·시각(\`YYYYMMDDhhmm\`)으로 올립니다. **이걸 올리지 않으면 브라우저에 남은 옛 음성이 그대로 재생됩니다.**
5. \`node _tools/make_voice_check.mjs\` 를 다시 돌리고 \`_tools/voice_check.html\`을 열어 한 줄씩 들어 봅니다.

한 줄만 다시 받으려면:

\`\`\`
echo "대사 원문" | python _tools/synth.py <키> <CLOVA 화자>
\`\`\`

## API 키 준비

\`synth.py\`와 \`synth_all.mjs\`는 환경변수 두 개를 읽습니다 — \`NCP_CLOVA_CLIENT_ID\`, \`NCP_CLOVA_CLIENT_SECRET\`.

1. [console.ncloud.com](https://console.ncloud.com) 로그인
2. **Services → AI·NAVER API → CLOVA Voice - Premium** 이용 신청
3. 계정 메뉴 → **마이페이지 → 인증키 관리**에서 Client ID / Client Secret 확인
4. 셸에 넣고 그 창에서 합성 명령을 실행합니다

PowerShell

\`\`\`
$env:NCP_CLOVA_CLIENT_ID = "여기에 Client ID"
$env:NCP_CLOVA_CLIENT_SECRET = "여기에 Client Secret"
\`\`\`

Git Bash

\`\`\`
export NCP_CLOVA_CLIENT_ID="여기에 Client ID"
export NCP_CLOVA_CLIENT_SECRET="여기에 Client Secret"
\`\`\`

키는 셸을 닫으면 사라집니다. 파일에 적어 두지 마세요 — 이 폴더는 구글 드라이브로 동기화됩니다.

## 화자 배정 (확정)

${CAST_TABLE}
## 쓰이지 않게 된 옛 mp3

대사를 고치기 전의 키입니다. 새 음성을 넣어 확인한 뒤에 지우세요.

\`2pc7k5\` \`19zl0po\` \`1mlgkyu\` \`1mdivm9\` \`1dax7lw\` \`cpya95\` \`1szjzby\` \`2ua18a\` \`1n99xk1\`

그리고 통째로 없어진 단계 두 개의 대사 — 레시오의 "잠깐, 더 생각해봐요!" 예고와, 편지 앞에 있던 "수첩에 적은 이 비가 바로 물감 만드는 법이야…" 입니다.

---

# 2부 · 방 전체 대사 대장

앱에서 나오는 차례 그대로입니다. **소리가 붙는 대사만** 실려 있습니다 — 토스트 알림, 칩 글자와 오답 풀이(\`fb\`), 단계의 \`hi\`·\`hint\`, 배너·버튼·눈금·수첩 글자는 화면에만 나오고 읽히지 않으므로 재합성 대상이 아닙니다.

`;

for (const g of data.groups) {
  const miss = g.rows.filter(r => !r.reg).length;
  md += `## ${g.title}\n\n${g.note}  \n전체 ${g.rows.length}줄 · 음성 있음 ${g.rows.length - miss}줄 · **대기 ${miss}줄**\n\n`;
  md += `| 단계 | 음성 | 키 | 화자 | 대사 |\n|---|---|---|---|---|\n`;
  for (const r of g.rows) {
    md += `| ${r.step} | ${r.reg ? '✅' : '⬜'} | \`${r.key}\` | ${r.cast} | ${esc(r.text)} |\n`;
  }
  md += `\n`;
}

fs.writeFileSync('tts/RESYNTH-TODO.md', md, 'utf8');
console.log('tts/RESYNTH-TODO.md 새로 씀 — 대기 ' + pending.length + '줄 (' + castLine + ')');
