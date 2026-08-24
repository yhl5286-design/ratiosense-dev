# 음성 고치는 법

대사를 고치면 그 줄의 음성을 다시 만들어야 합니다. 이 문서 하나만 보고 따라 하면 됩니다.

모든 명령은 **`rs-main-deploy/v4` 폴더**에서 실행합니다.

---

## 왜 다시 만들어야 하나

음성 파일 이름은 **대사에서 계산한 키**입니다. `<화자코드>|<읽을 글>` 을 해시로 줄인 값이라, **대사를 한 글자만 고쳐도 키가 바뀌어** 기존 mp3와 연결이 끊깁니다.

연결이 끊긴 줄은 앱이 브라우저 내장 음성으로 대신 읽습니다. 소리가 사라지지는 않지만, **그 대사만 목소리가 달라집니다** — 먼셀·뭉크·시냐크·다인은 한국어 남성·아동 내장 음성이 없어 성인 여성 목소리로 읽힙니다.

---

## 전체 흐름

```
① 대사 고치기          방 파일(ColorRoom.dc.html 등)의 STEPS
        ↓
② 목록 다시 뽑기        node _tools/make_voice_check.mjs
                       node _tools/gen_todo.mjs
        ↓
③ 무엇이 밀렸는지 보기   tts/RESYNTH-TODO.md
        ↓
④ 음성 받기            node _tools/synth_all.mjs        (API 키 필요)
        ↓
⑤ 설치하기             node _tools/install_new.mjs
        ↓
⑥ 들어 보기            _tools/voice_check.html
```

②와 ⑥ 사이를 몇 번 돌아도 됩니다. **대사가 확정되기 전에는 ④를 하지 마세요** — 또 고치면 받은 음성이 헛돕니다.

---

## ① 대사 고치기

대사의 정본은 **방 파일 안의 `STEPS`** 입니다. `tts/lines.csv` 는 예전 기록이라 정본이 아닙니다.

| 종류 | 소리로 읽히나 |
|---|---|
| 단계의 `say` | ✅ |
| `story` 단계의 `lines` | ✅ (여러 줄을 공백 하나로 이어 붙여 한 덩어리로 읽습니다) |
| 색깔방의 `CUP_ASK` | ✅ |
| 토스트 알림의 제목·본문 | ❌ 화면에만 |
| 칩 글자, 오답 풀이(`fb`) | ❌ |
| 단계의 `hi`·`hint`, 배너·버튼·눈금·수첩 글자 | ❌ |

읽히지 않는 것만 고쳤다면 ②부터 할 필요가 없습니다.

## ② 목록 다시 뽑기

```
node _tools/make_voice_check.mjs
node _tools/gen_todo.mjs
```

첫 줄이 방 코드를 그대로 읽어 대사와 키를 뽑고, 둘째 줄이 그것으로 `tts/RESYNTH-TODO.md` 를 다시 씁니다. **표를 손으로 고치지 마세요** — 이 두 줄이 정답입니다.

## ③ 무엇이 밀렸는지 보기

`tts/RESYNTH-TODO.md` 를 엽니다.

- **1부** — 음성이 없는 줄 목록. 방·단계·키·화자·CLOVA 화자코드·**실제로 읽히는 원문**
- **2부** — 방별 전체 대사 대장. 나오는 차례대로, 음성 유무(✅/⬜)까지

「합성할 원문」 열은 앱이 진짜로 읽는 글자입니다. 이모지가 빠지고, `mL` 이 ` 밀리리터 `로, 비의 숫자가 한자어(`1 대 2` → `일 대 이`)로 바뀐 뒤의 모습이라, **이 열을 그대로 합성기에 넣으면 됩니다.**

## ④ 음성 받기

먼저 API 키를 셸에 넣습니다(아래 「API 키 준비」).

```
node _tools/synth_all.mjs --dry     무엇을 받을지 미리 본다
node _tools/synth_all.mjs           실제로 받는다 → tts/_new/
```

한 줄만 다시 받으려면:

```
echo "대사 원문" | python _tools/synth.py <키> <CLOVA 화자코드>
```

## ⑤ 설치하기

```
node _tools/install_new.mjs --dry   무엇을 설치할지 미리 본다
node _tools/install_new.mjs         실제로 설치한다
```

세 가지를 한꺼번에 합니다.

1. `tts/_new/*.mp3` 를 `tts/` 로 옮깁니다
2. `tts/manifest.js` 목록에 키를 등록합니다 (대사를 주석으로 함께 적어 둡니다)
3. **`window.RS_TTS_V` 를 지금 시각으로 올립니다** — 이걸 올려야 브라우저가 새 음성을 받아 갑니다. 안 올리면 옛 음성이 그대로 재생됩니다

되돌리려면 함께 만들어지는 `tts/manifest.js.bak-<시각>` 을 `manifest.js` 로 되돌리고, `tts/` 로 옮겨진 mp3를 지우면 됩니다.

## ⑥ 들어 보기

②를 한 번 더 돌린 뒤 `_tools/voice_check.html` 을 브라우저로 엽니다. 대사가 앱에 나오는 차례대로 늘어서고, 각 줄의 재생 단추로 바로 들어 볼 수 있습니다.

파일을 두 번 눌러 여는 대신 로컬 서버로 여세요(그냥 열면 `voice_check.json` 을 못 읽습니다).

```
python -m http.server 8777      v4의 윗 폴더에서 실행
```

그다음 `http://localhost:8777/v4/_tools/voice_check.html`

---

## API 키 준비


## 목소리를 바꾸려면

음성 키는 `인물코드|대사문장` 해시라서 **화자를 바꿔도 키가 그대로**입니다. mp3만 갈아 끼우면 되고 매니페스트는 손대지 않습니다.

```
node _tools/synth_samples.mjs                       후보 견본 받기
                                                    → _tools/voice_picker.html 에서 고르기
(_tools/cast.json 의 speaker 를 고른 값으로 고친다)
node _tools/make_voice_check.mjs                    바뀐 배정 반영
node _tools/synth_all.mjs --all --who=munsell       그 인물 대사 전부 새 목소리로
node _tools/install_new.mjs --replace               갈아 끼우기(옛 파일은 tts/_old/ 로)
```

`--who` 를 빼면 모든 인물, `--all` 을 빼면 아직 음성이 없는 줄만 받습니다.

`synth.py` 와 `synth_all.mjs` 는 환경변수 두 개를 읽습니다 — `NCP_CLOVA_CLIENT_ID`, `NCP_CLOVA_CLIENT_SECRET`.

1. [console.ncloud.com](https://console.ncloud.com) 로그인
2. **Services → AI·NAVER API → CLOVA Voice - Premium** 이용 신청
3. 계정 메뉴 → **마이페이지 → 인증키 관리** 에서 Client ID / Client Secret 확인
4. 셸에 넣고 **그 창에서** 합성 명령을 실행합니다

PowerShell

```
$env:NCP_CLOVA_CLIENT_ID = "여기에 Client ID"
$env:NCP_CLOVA_CLIENT_SECRET = "여기에 Client Secret"
```

Git Bash

```
export NCP_CLOVA_CLIENT_ID="여기에 Client ID"
export NCP_CLOVA_CLIENT_SECRET="여기에 Client Secret"
```

키는 셸을 닫으면 사라집니다. **파일에 적어 두지 마세요** — 이 폴더는 구글 드라이브로 동기화됩니다.

---

## 화자 배정 (확정)

| 코드 | 인물 | CLOVA 화자 |
|---|---|---|
| `ratio` | 레시오 (안내자) | `vhyeri` |
| `munch` | 화가 뭉크 | `njooahn` |
| `munsell` | 과학자 먼셀 | `nwoosik` |
| `signac` | 화가 시냐크 | `nraewon` |
| `kid` | 다인 (또래 아이) | `ndain` |
| `eratos` | 에라토스테네스 | `nwontak` |

## 파일이 하는 일

| 파일 | 하는 일 |
|---|---|
| `_tools/make_voice_check.mjs` | 방 코드에서 대사·키를 뽑아 `voice_check.json` 을 만든다 |
| `_tools/gen_todo.mjs` | 그것으로 `tts/RESYNTH-TODO.md`(대사·음성 대장)를 쓴다 |
| `_tools/synth_all.mjs` | 음성 없는 줄을 한 번에 받아 `tts/_new/` 에 넣는다 |
| `_tools/synth.py` | 한 줄만 받는다 |
| `_tools/install_new.mjs` | `_new` 의 mp3를 설치하고 매니페스트·판 번호를 갱신한다 |
| `_tools/voice_check.html` | 대사 차례대로 들어 보는 페이지 |
| `_tools/cast.json` | **인물별 목소리 배정. 목소리를 바꾸려면 여기만 고친다** |
| `_tools/synth_samples.mjs` | 후보 화자 견본을 `tts/_samples/` 에 받는다(앱 음성은 그대로) |
| `_tools/voice_picker.html` | 인물마다 후보를 들어 보고 고르는 페이지 |
| `tts/manifest.js` | 어떤 키에 mp3가 있는지 앱에 알려 주는 목록 + 음성 판 번호 |
| `tts/RESYNTH-TODO.md` | ②가 만드는 문서. 손으로 고치지 않는다 |
| `tts/lines.csv`, `tts/lines_edits.json` | 예전 기록. 지금은 참고용 |

## 자주 걸리는 것

**새 음성을 넣었는데 옛 목소리가 나온다** — `RS_TTS_V` 를 안 올렸거나 브라우저가 캐시를 쥐고 있습니다. `install_new.mjs` 가 자동으로 올려 주며, 그래도 그러면 강력 새로고침(Ctrl+Shift+R) 하세요.

**목록에 없는 키라고 경고가 뜬다** — 음성을 받은 뒤 대사를 또 고친 것입니다. ②를 다시 돌려 목록을 맞춘 뒤 확인하세요.

**한 대사만 여자 목소리로 읽힌다** — 그 줄의 mp3가 없다는 뜻입니다. `voice_check.html` 에서 ⬜ 표시를 찾아 보세요.

**비가 "한 대 이"로 읽힌다** — 색깔·평가의 방은 `1 대 2` 를 `일 대 이` 로 바꿔 읽도록 코드에 규칙이 들어 있습니다. 다른 방에 같은 문제가 있으면 그 방 `speak()` 에 같은 규칙을 넣고, `make_voice_check.mjs` 의 `SINO_ROOMS` 에 방 이름을 더하세요. **둘을 함께 고치지 않으면 키가 어긋납니다.**

**대사가 도중에 끊긴다** — 긴 문장은 `chunks()` 로 66자쯤에서 잘라 이어 읽고, 크롬이 멈춰 서면 4초마다 이어 주도록 되어 있습니다. 네 방 모두 들어 있습니다. 그래도 끊기면 `chunks()` 의 66을 줄이세요.
