/* solve.js — drive.html이 쓰는 자동 풀이기.
   화면마다 과제를 풀어 관문을 열고 다음으로 넘어간다.

   무엇을 알아내려는 것인가
     ① 모든 관문이 실제로 통과되는가 (막혀서 못 넘어가는 자리가 없는가)
     ② 조작 로그(lab·cup·plot·harp 등)가 제대로 찍히는가
   시간은 재지 않는다 — 기계는 백 칸을 0.2초에 칠하므로 사람의 시간과 무관하다.

   푸는 방법
     화면 유형을 미리 알지 못해도 되도록, 「다음을 눌러 본다 → 안 넘어가면
     조작 하나를 해 본다」를 되풀이한다. 조작 후보는 아래 순서로 만든다.
       1) 슬라이더 훑기   2) 낱말 카드를 빈칸으로 끌기
       3) 무대 안의 누를 수 있는 것 하나씩   4) 글상자에 한 줄 적기
     잘못 눌러도 앱은 힌트만 띄우므로 되풀이해도 안전하다. */

(function (global) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* ── 화면 안의 조작 대상 모으기 ── */
  function stage(d) { return d.querySelector('.rs-play') || d.body; }

  function clickables(d) {
    const st = stage(d);
    const out = [];
    st.querySelectorAll('button, a, [data-blank], [onclick]').forEach(e => out.push(e));
    /* 인라인 스타일에 cursor:pointer 를 준 것들 — 격자 칸·표 줄·컵 따위 */
    st.querySelectorAll('[style*="cursor:pointer"], [style*="cursor: pointer"]').forEach(e => {
      if (out.indexOf(e) < 0) out.push(e);
    });
    /* 되돌리는 단추는 빼둔다 — 돌림 순서에 끼면 쌓아 둔 것을 매번 지워
       영영 관문이 열리지 않는다(「비우기」가 그랬다). */
    const UNDO = /비우기|되돌리|다시 하기|다시하기|지우기|취소|바꾸기|처음/;
    return out.filter(e => {
      const r = e.getBoundingClientRect();
      if (!(r.width > 4 && r.height > 4)) return false;
      return !UNDO.test((e.textContent || '') + ' ' + (e.getAttribute('aria-label') || ''));
    });
  }

  /* 실험을 확정하는 단추 — 값을 맞춘 뒤 이것을 눌러야 결과가 남는다 */
  function runBtns(d) {
    return clickables(d).filter(e =>
      /기록하기|확인하기|완성하기|제출|확인|완료|만들기/.test(e.textContent || ''));
  }

  function sliders(d) { return [...stage(d).querySelectorAll('input[type="range"]')]; }
  function textareas(d) { return [...stage(d).querySelectorAll('textarea, input[type="text"]')]; }
  function banks(d) { return [...stage(d).querySelectorAll('[data-card-panel] span, [data-card-panel] button')]; }
  function blanks(d) { return [...stage(d).querySelectorAll('[data-blank]')]; }

  const mid = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };

  function pev(w, type, x, y, target) {
    const E = w.PointerEvent || w.MouseEvent;
    const ev = new E(type, { bubbles: true, cancelable: true, clientX: x, clientY: y,
                             pointerId: 1, pointerType: 'mouse', button: 0, buttons: type === 'pointerup' ? 0 : 1 });
    (target || w.document).dispatchEvent(ev);
  }

  /* 낱말 카드를 빈칸 위로 끌어다 놓는다 — 카드에는 클릭 경로가 없고 끌기만 있다 */
  async function drag(w, card, blank) {
    const a = mid(card), b = mid(blank);
    pev(w, 'pointerdown', a.x, a.y, card);
    await sleep(20);
    pev(w, 'pointermove', (a.x + b.x) / 2, (a.y + b.y) / 2);
    await sleep(20);
    pev(w, 'pointermove', b.x, b.y);
    await sleep(20);
    pev(w, 'pointerup', b.x, b.y);
    await sleep(60);
  }

  async function setSlider(w, el, v) {
    const set = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, 'value').set;
    set.call(el, String(v));
    el.dispatchEvent(new w.Event('input', { bubbles: true }));
    el.dispatchEvent(new w.Event('change', { bubbles: true }));
    await sleep(40);
  }

  async function typeIn(w, el, text) {
    const proto = el.tagName === 'TEXTAREA' ? w.HTMLTextAreaElement : w.HTMLInputElement;
    const set = Object.getOwnPropertyDescriptor(proto.prototype, 'value').set;
    set.call(el, text);
    el.dispatchEvent(new w.Event('input', { bubbles: true }));
    el.dispatchEvent(new w.Event('change', { bubbles: true }));
    await sleep(60);
  }

  /* 한 화면에서 해 볼 조작을 차례로 만들어 낸다 */
  async function* actions(w, d) {
    /* 1) 슬라이더 — 하나짜리는 훑고, 둘이면 비를 바꿔 가며 함께 맞춘다.
       두 양을 같은 비로 놓아야 열리는 화면(자유 실험)이 있다. */
    const ss = sliders(d);
    if (ss.length >= 2) {
      const a = ss[0], b = ss[1];
      const lo = +(a.min || 0), hi = +(a.max || 100), stp = +(a.step || 1) || 1;
      for (const k of [2, 0.5, 1.5, 3, 1]) {
        for (let v = lo + stp; v <= hi; v += Math.max(stp, Math.round((hi - lo) / 14 / stp) * stp)) {
          const va = v, vb = Math.round(v * k / stp) * stp;
          yield async () => {
            await setSlider(w, a, va); await setSlider(w, b, vb);
            for (const rb of runBtns(d)) { rb.click(); await sleep(220); }
          };
        }
      }
    }
    for (const sl of ss) {
      const lo = +(sl.min || 0), hi = +(sl.max || 100), stp = +(sl.step || 1) || 1;
      const n = Math.min(60, Math.max(4, Math.round((hi - lo) / stp)));
      for (let i = 0; i <= n; i++) {
        yield async () => {
          await setSlider(w, sl, lo + Math.round((hi - lo) * i / n / stp) * stp);
          for (const rb of runBtns(d)) { rb.click(); await sleep(200); }
        };
      }
    }
    /* 2) 낱말 카드 → 빈칸 */
    const bs = blanks(d);
    if (bs.length) {
      for (const bl of bs) {
        for (const c of banks(d)) {
          yield async () => { await drag(w, c, bl); };
        }
      }
    }
    /* 3) 누를 수 있는 것 하나씩 (두 바퀴 — 상태가 바뀌며 새로 열리는 것이 있다) */
    /* 3-앞) ＋ 꼴 단추는 한 번에 1mL씩만 오르는 곳이 있어 길게 눌러야 한다.
       색깔의 방 자유 실험이 그렇다(상한 200mL · ＋ 한 번에 1mL). */
    const plus = clickables(d).filter(e =>
      /[＋+]|더하기|늘리기/.test((e.textContent || '') + ' ' + (e.getAttribute('aria-label') || '')));
    if (plus.length >= 2) {
      for (const [na, nb] of [[20, 40], [15, 30], [30, 60], [10, 20], [25, 50], [50, 100], [30, 30], [20, 20], [10, 10]]) {
        yield async () => {
          for (let i = 0; i < na; i++) { plus[0].click(); await sleep(12); }
          for (let i = 0; i < nb; i++) { plus[1].click(); await sleep(12); }
          await sleep(150);
          for (const rb of runBtns(d)) { rb.click(); await sleep(260); }
        };
      }
    }
    /* 3-가) 한 단추를 연달아 눌러 값을 쌓은 뒤 확정 단추를 누른다 —
       ＋를 한 번씩 돌려 누르면 40mL에 닿기 전에 다른 조작이 끼어든다 */
    for (const e of clickables(d)) {
      for (let rep = 1; rep <= 10; rep++) {
        yield async () => {
          e.click(); await sleep(200);
          for (const rb of runBtns(d)) { rb.click(); await sleep(240); }
        };
      }
    }
    /* 3-나) 여섯 바퀴 — 컵 붓기처럼 애니메이션이 끝나야 다음 클릭을 받는 곳이 있다 */
    for (let pass = 0; pass < 6; pass++) {
      for (const e of clickables(d)) {
        yield async () => { e.click(); await sleep(260); };
      }
    }
    /* 4) 글상자 */
    for (const t of textareas(d)) {
      yield async () => { await typeIn(w, t, '비가 같으면 같은 색이에요.'); };
    }
  }

  /* 화면 하나를 푼다. 넘어가면 true */
  async function solveOne(w, d, primaryFn, posFn, cap) {
    const before = posFn();
    /* 먼저 그냥 눌러 본다 — 조작이 필요 없는 화면(story 등) */
    primaryFn(); await sleep(300);
    if (posFn() !== before) return { ok: true, tries: 0 };

    let tries = 0;
    for await (const act of actions(w, d)) {
      if (tries++ > cap) break;
      try { await act(); } catch (e) {}
      /* 맞히면 저절로 넘어가는 화면이 많다 — 먼저 자리만 본다.
         「다음」은 네 번에 한 번만 눌러 헛된 토스트를 줄인다. */
      if (posFn() !== before) return { ok: true, tries };
      if (tries % 4 === 0) {
        primaryFn(); await sleep(150);
        if (posFn() !== before) return { ok: true, tries };
      }
    }
    primaryFn(); await sleep(200);
    if (posFn() !== before) return { ok: true, tries };
    return { ok: false, tries };
  }

  global.RSSolve = { solveOne, sleep };
})(window);
