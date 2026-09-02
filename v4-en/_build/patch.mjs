/* patch.mjs — 한국어판 코드를 영어판으로 바꾸는 손질.
   번역(문자열 교체)과 달리 여기서는 「코드」를 고친다. 크게 넷이다.

     1) 자산 경로  그림·영상·디자인시스템·support.js는 ../v4/ 것을 그대로 쓴다(복제하지 않는다)
     2) 음성       한국어 전용 처리(한자어 수 읽기·「대」·밀리리터)를 영어 규칙으로 갈아 끼운다
     3) 글꼴       Do Hyeon/Noto Sans KR → Fredoka/Nunito
     4) 로그       tab 값에 en을 붙여 한국어판 응답과 섞이지 않게 한다

   각 손질은 「반드시 몇 번 일어나야 한다」를 함께 적어 두었다. 한국어판이 바뀌어
   패치가 헛나가면 빌드가 그 자리에서 멈춘다. 조용히 틀린 영어판이 나오지 않게 하려는 것이다. */

/* eratos.mp4?v=2 처럼 뒤에 붙은 물음표까지 받아 준다 */
const ASSET = /^[\w./-]+\.(?:jpe?g|png|mp4|mp3)(?:\?[\w=.&-]*)?$/;

/* [from, to, 최소 횟수]  — to가 함수면 치환 함수로 쓴다 */
function rules(file) {
  /* file은 아래 규칙에서 방을 가려낼 때 쓴다 */
  const room = file.endsWith('.dc.html');
  const LAB = { 'ColorRoom.dc.html': 'colorV3', 'SoundRoom.dc.html': 'soundV3',
                'MapRoom.dc.html': 'mapV3', 'EvalRoom.dc.html': 'evalV3', 'index.html': 'hubV3' }[file];
  const r = [];

  /* ── 1. 문서 언어 ── */
  r.push([/<html lang="ko">/g, '<html lang="en">', 0]);
  r.push([/<html>\n/g, '<html lang="en">\n', 0]);

  /* ── 2. 자산 경로 → ../v4/ ── */
  r.push([/<script src="\.\/support\.js"><\/script>/g, '<script src="../v4/support.js"></script>', room ? 1 : 0]);
  r.push([/(["'])(_ds\/organic-)/g, '$1../v4/$2', 1]);
  /* 따옴표 안이 그림·영상 파일 이름뿐인 리터럴만 앞에 ../v4/를 붙인다 */
  r.push([/(['"])([\w./-]+\.(?:jpe?g|png|mp4|mp3)(?:\?[\w=.&-]*)?)\1/g,
          (m, q, p) => (ASSET.test(p) && !p.startsWith('../') ? q + '../v4/' + p + q : m), room ? 1 : 0]);

  /* ── 3. 음성: 사전 생성 mp3는 한국어 전용이므로 비운다 → 항상 브라우저 음성 ── */
  r.push([/<script src="tts\/manifest\.js[^"]*"><\/script>/g,
          '<script>/* English edition speaks through the browser voice — no pre-made mp3 files. */\n'
          + 'window.RS_TTS = {}; window.RS_TTS_V = \'en\';</script>', room ? 1 : 0]);

  /* 목소리 후보를 영어 음성에서 고른다 */
  r.push([/\.filter\(v => v\.lang && v\.lang\.toLowerCase\(\)\.indexOf\('ko'\) === 0\)/g,
          ".filter(v => v.lang && v.lang.toLowerCase().indexOf('en') === 0)", 0]);

  /* 성별을 이름으로 가려내는 목록 — 영어 음성 이름으로 바꾼다 */
  r.push([/const FEM = \/[^/]*\/i;/g,
          'const FEM = /female|woman|zira|samantha|susan|hazel|jenny|aria|michelle|ava|allison|karen|moira|tessa|fiona|serena|catherine|\\bemma\\b|\\bamy\\b/i;', 0]);
  r.push([/const MALE = \/[^/]*\/i;/g,
          'const MALE = /\\bman\\b|\\bmale\\b|david|mark|guy|george|james|ryan|daniel|alex|fred|thomas|oliver|brian|\\beric\\b|christopher|roger/i;', 0]);

  /* 읽어 주는 언어 */
  r.push([/u\.lang = 'ko-KR';/g, "u.lang = 'en-US';", room ? 1 : 0]);

  /* 한자어 수 읽기는 영어에 필요 없다 — 비는 "2 to 3"으로 읽힌다 */
  r.push([/^ *SINO\(v\) \{[^\n]*\n/gm,
          '  /* Korean numeral reading is not needed here: a ratio is spoken as "2 to 3". */\n', room ? 1 : 0]);

  /* 소리로 내보내기 전 다듬기 — 콜론은 to로, 단위는 풀어서 읽는다 */
  r.push([/\.replace\(\/\(\[가-힣A-Za-z0-9\]\+\)[\s\S]*?\.replace\(\/\\s\+\/g, ' '\)\.trim\(\);/g,
          "/* A ratio written with a colon is spoken as \"to\": 2:3 → \"2 to 3\".\n"
          + "         Units are spelled out so the voice does not read them letter by letter.\n"
          + "         No word boundary before the unit: it has to catch \"20mL\" as well as \"mL\". */\n"
          + "      .replace(/°/g, ' degrees ')\n"
          + "      .replace(/([A-Za-z0-9.]+)\\s*:\\s*([A-Za-z0-9.]+)/g, '$1 to $2')\n"
          + "      .replace(/mL\\b/g, ' milliliters ').replace(/cm\\b/g, ' centimeters ')\n"
          + "      .replace(/Hz\\b/g, ' hertz ')\n"
          + "      .replace(/\\s+/g, ' ').replace(/ ([.,!?])/g, '$1').trim();", room ? 1 : 0]);

  /* 없어진 코드를 설명하는 주석은 남겨 두면 뒤에 읽는 사람을 헷갈리게 한다 */
  /* 방마다 붙어 있는 주석이 조금씩 다르므로 횟수를 강제하지 않는다.
     빠뜨린 것이 있으면 아래 「한자어가 남았는가」 검사가 잡는다. */
  r.push([/^ *\/\* 비를 읽을 때 쓰는 한자어[^\n]*\r?\n/gm, '', 0]);
  r.push([/ *\/\* 비를 읽을 때 '1 대 2'[\s\S]*?\*\/\r?\n/g, '', 0]);
  r.push([/ *\/\* 비를 콜론으로 적은 것은[\s\S]*?\*\/\r?\n/g, '', 0]);

  /* 지도 방의 축척 물음 — 한국어는 이름 뒤에 조사를 붙여 문장을 만든다(다리는·길이는).
     영어에는 조사가 없어 조각을 옮겨서는 문장이 되지 않으므로 문장째 다시 쓴다.
     obj.josa·obj.dim은 여기서만 쓰이던 값이라 영어판에서는 쓰이지 않는다. */
  r.push([/ *const sj = \(\(obj\.n\.charCodeAt[\s\S]*?얼마일까요\?'\);/g,
          "      v.scaleTitle = obj.shape === 'unit'\n"
          + "        ? 'This map has a scale of 1 : 10,000. On this map, 1cm stands for how many cm in real life?'\n"
          + "        : ('On the map the ' + obj.n + ' is drawn ' + obj.cells + 'cm long. "
          + "How long is the real ' + obj.n + '?');", file === 'MapRoom.dc.html' ? 1 : 0]);

  /* 위 문장에서만 쓰이던 조사 값 — 영어판에서는 쓰이지 않으므로 지운다 */
  r.push([/josa:'[가-힣]+', /g, '', 0]);

  /* 인물 이름을 따옴표로 감싸 강조하는 자리(markNames). 한국어 이름은 다른 낱말 속에
     들어갈 일이 없었지만 영어 이름은 그렇지 않다. 낱말 경계를 넣어 이름이 통째로
     나올 때만 감싸게 한다. */
  r.push([new RegExp(String.raw`"\(\?<!\[\\u0027\\u2018\\u2019\]\)" \+ n \+ "\(\?!\[\\u0027\\u2018\\u2019\]\)"`, 'g'),
          String.raw`"(?<!['‘’\\w])" + n + "(?!['‘’\\w])"`, room ? 1 : 0]);

  /* 조사 고르개 — 영어에는 붙일 조사가 없으므로 빈 문자열로 바꾼다 */
  r.push([/ \+ this\.jz\([^)]*\)/g, '', 0]);

  /* ── 4. 글꼴 ── */
  r.push([/family=Do\+Hyeon&family=Noto\+Sans\+KR:wght@400;500;700/g,
          'family=Fredoka:wght@400;500;600&family=Nunito:wght@400;600;700;800', 1]);
  r.push([/"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif/g,
          '"Nunito","Segoe UI",system-ui,sans-serif', 1]);
  r.push([/'Do Hyeon','Noto Sans KR',sans-serif/g, "'Fredoka','Nunito',sans-serif", 1]);

  /* ── 5. 로그 — 한국어판 응답과 섞이지 않게 tab 값을 나눈다 ── */
  if (LAB) {
    r.push([new RegExp("LAB = '" + LAB + "'", 'g'), "LAB = '" + LAB + "en'", room ? 1 : 0]);
    r.push([new RegExp("tab:'" + LAB + "',eventType:'pilot\\." + LAB + "\\.'", 'g'),
            "tab:'" + LAB + "en',eventType:'pilot." + LAB + "en.'", room ? 0 : 1]);
  }
  return r;
}

export function patch(file, src) {
  let out = src;
  const report = [];
  for (const [from, to, min] of rules(file)) {
    const n = (out.match(from) || []).length;
    if (n < min) throw new Error(`${file}: 패치가 ${min}번 일어나야 하는데 ${n}번 — ${String(from).slice(0, 74)}`);
    if (n) { out = out.replace(from, to); report.push([String(from).slice(0, 52), n]); }
  }
  if (/this\.SINO\(/.test(out)) throw new Error(file + ': SINO 호출이 남았습니다');
  if (/ko-KR/.test(out)) throw new Error(file + ': ko-KR이 남았습니다');
  if (/한자어/.test(out)) throw new Error(file + ': 없어진 한국어 음성 코드를 설명하는 주석이 남았습니다');
  return { out, report };
}
