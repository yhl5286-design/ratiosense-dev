# RatioSense — English Edition (v4-en)

해외 참여자 수업용 영어판입니다. 한국어판 `../v4`에서 **만들어 낸 것**이므로
이 폴더의 `.html`은 손으로 고치지 않습니다. 고칠 것이 있으면 대조표나 패치를
고치고 다시 빌드합니다.

## 어떻게 만들어지나

```
../v4/*.html  ─┐
               ├─▶  _build/build.mjs  ─▶  v4-en/*.html
_build/i18n/   │      ① 번역: 뽑아 둔 자리에만 영어를 끼운다
_build/tr/     │      ② 패치: 경로·음성·글꼴·로그를 손질한다
_build/patch   ─┘
```

| 파일 | 하는 일 |
|---|---|
| `_build/extract.mjs` | 한국어판에서 **화면에 나갈 한글만** 뽑아 `_build/i18n/*.json`을 만든다. 코드 주석은 뽑지 않는다. |
| `_build/tr/*.mjs` | 사람이 쓰는 번역문. `{ '한국어': 'English' }` |
| `_build/fill.mjs` | `tr/`의 번역을 `i18n/`의 대조표에 옮겨 담는다. |
| `_build/patch.mjs` | 문자열이 아니라 **코드**를 고친다(아래 참고). |
| `_build/build.mjs` | 번역 + 패치를 얹어 `v4-en/*.html`을 쓴다. |
| `_build/check.mjs` | 추출기가 옳은지 본다 — 되붙이기 동일 + 빠진 한글 0. |
| `_build/verify.mjs` | 산출물에 한글이 남았는지 본다. |

## 늘 쓰는 차례

```bash
cd v4-en
node _build/check.mjs      # 추출기 건강 검사
node _build/extract.mjs    # 한국어판이 바뀌었으면 대조표 갱신
node _build/fill.mjs       # 번역문 반영
node _build/build.mjs      # 영어판 생성
node _build/verify.mjs     # 한글 0 확인
```

미리 보려면 `rs-main-deploy`에서 `node v4/_tools/serve.mjs` 를 띄우고
<http://localhost:8777/v4-en/index.html>.

## 패치가 손질하는 것

1. **자산 경로** — 그림·영상·효과음·`support.js`·디자인시스템은 `../v4/`를 그대로
   참조한다. 복제하지 않으므로 영어판 폴더는 HTML 다섯 개(약 0.5MB)뿐이고,
   그림을 고치면 양쪽에 함께 반영된다.
2. **음성** — 사전 생성 mp3는 한국어 전용이라 `window.RS_TTS = {}`로 비우고
   브라우저 내장 음성(`en-US`)만 쓴다. 한자어 수 읽기·「대」·밀리리터 같은
   한국어 전용 다듬기는 영어 규칙으로 갈아 끼운다
   (`2:3` → "2 to 3", `20mL` → "20 milliliters", `°` → "degrees").
3. **한국어 문법 코드** — 조사(`josa`, `jz`)와 그것으로 문장을 잇던 자리는
   영어에 옮길 수 없으므로 문장째 다시 쓰거나 지운다.
4. **글꼴** — Do Hyeon/Noto Sans KR → Fredoka/Nunito.
5. **이름 강조** — 인물 이름을 따옴표로 감싸는 `markNames`에 낱말 경계를 넣었다.
   영어 이름은 다른 낱말 안에 들어갈 수 있기 때문이다.
6. **로그** — `tab` 값에 `en`을 붙여(`colorV3en` 등) 한국어판 응답과 섞이지
   않게 한다. 수집 주소는 한국어판과 같다.

패치마다 **몇 번 일어나야 하는지**를 함께 적어 두었다. 한국어판이 바뀌어
패치가 헛나가면 빌드가 그 자리에서 멈춘다 — 조용히 틀린 영어판이 나오지
않게 하려는 것이다.

## 번역에서 정한 것

- **안내자 이름은 Ratia** — 레시오를 그대로 Ratio로 옮기면 수학 용어 *ratio*,
  앱 이름 *RatioSense*와 겹쳐 「the world is full of 'Ratio'」처럼 읽힌다.
  이름은 Ratia, 개념은 ratio로 갈랐다. 바꾸려면 `_build/tr/*.mjs`의
  `'레시오'` 한 줄만 고치면 된다.
- 나머지 인물은 원래 이름 그대로 — Munsell · Signac · Munch · Eratosthenes · Dain.
- **계이름은 음이름으로** — 도레미파솔라시도′ → C D E F G A B C′.
  라 = 440Hz가 곧 A440이므로 영어권 교실에서는 음이름이 분명하다.
- 방 이름 — The Color Secret · The Sound Secret · The Map Secret ·
  The Secret of Ratio.
- 어휘 수준은 초등 5~6학년(CEFR A2 안팎), 문장은 짧게.

## 남은 일

- **수업에 쓸 기기에서 소리를 들어 볼 것.** 브라우저 내장 음성은 기기마다
  음색이 다르다. Windows Chrome은 영어 음성이 넉넉하지만 iPad Safari는
  적어 인물 구분이 한국어판 mp3보다 약하다. 부족하면 그때 영어 TTS로
  mp3를 사전 생성하는 단계를 붙인다.
