'use strict';
// Simulador Tóxico — motor. Conteúdo: content-*.js (cenários), personas.js, side.js (conversas paralelas e finais do dia).

const $ = s => document.querySelector(s);
const qs = new URLSearchParams(location.search);
const store = { get: k => { try { return localStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch {} } };
let L = qs.get('lang') ? (qs.get('lang') === 'en' ? 1 : 0) : store.get('lang') != null ? +store.get('lang') : (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 0 : 1;
let SOUND = store.get('sound') !== '0';
let LVL = +(store.get('lvl') || 2);
let MULTI = store.get('multi') === '1'; // modo multitarefa nas conversas paralelas
let PG = store.get('pg') === 'a' ? 'a' : 'o'; // "Você é" (ele/ela) nos cenários sem gênero definido pela escolha
// namorado → você é mulher; namorada → você é homem; nos outros cenários, o que a pessoa escolheu
const playerG = () => KEY === 'namorado' ? 'a' : KEY === 'namorada' ? 'o' : PG;
let C, SC, SCID, V, KEY, G = 'o', NPC = null; // conteúdo do idioma, cenário, id do cenário, personagem, chave da URL, gênero do npc

// side = chance de alguém das conversas paralelas chamar depois de cada resposta
// nags = quantas vezes cobra a mesma pergunta antes de desistir (menos flood: o peso está no conteúdo)
const LEVELS = { 1: { mult: .6, nag: 45000, nags: 1, events: 7, side: .2 }, 2: { mult: 1, nag: 30000, nags: 2, events: 10, side: .3 }, 3: { mult: 1.5, nag: 18000, nags: 3, events: 12, side: .45 } };
const SCENARIO_KEYS = { chefe: 'chefe', namorado: 'love', namorada: 'love', cliente: 'cliente', familia: 'familia' };

// {name} {first} = NPC · {o} = sufixo do NPC · {primo|prima} = segue o gênero do NPC (no namoro, o rival também)
// {p:querido|querida} = segue o gênero de quem joga (namorado → mulher, namorada → homem; senão masculino)
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : '';
let F = {}; // fatos do personagem atual (profissão, idade, onde está, o que está fazendo)
const T = s => s == null ? '' : String(s)
  .replace(/\{(job|age|where|doing)\}/g, (_, k) => F[k] || '').replace(/\{(Job|Where|Doing)\}/g, (_, k) => cap(F[k.toLowerCase()] || ''))
  .replace(/\{delay\}/g, () => { const n = (st && st.delay) || 1; return L ? `${n} minute${n > 1 ? 's' : ''}` : `${n} minuto${n > 1 ? 's' : ''}` })
  .replace(/\{name\}/g, NPC ? NPC.name : '').replace(/\{first\}/g, NPC ? NPC.first : '').replace(/\{o\}/g, G)
  // gênero de quem joga: sempre UMA forma só (nunca "o(a)"). No namoro vem da escolha; nos outros, do "Você é".
  .replace(/\{p:([^|{}]*)\|([^{}]*)\}/g, (_, m, f) => playerG() === 'a' ? f : m)
  .replace(/\{([^|{}:]*)\|([^{}]*)\}/g, (_, m, f) => G === 'a' ? f : m);
const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };
const wait = ms => new Promise(r => setTimeout(r, ms));
const pad = n => String(n).padStart(2, '0');
const hhmm = m => {
  const h = Math.floor(m / 60) % 24, mm = pad(m % 60);
  return L ? `${h % 12 || 12}:${mm} ${h < 12 ? 'AM' : 'PM'}` : `${pad(h)}:${mm}`;
};
const dur = m => Math.max(0, Math.floor(m / 60)) + ':' + pad(Math.max(0, m % 60));
// efeito [sanidade, moral] de cada tipo de texto livre (leitura em text.js)
const FREE_FX = { no: [5, -10], laugh: [0, -5], yes: [-8, 5], q: [-3, -3], other: [-5, -3], sorry: [-5, 3], love: [-3, 3],
  money: [3, -8], sick: [5, -5], tired: [3, -5], emoji: [0, -3], shout: [5, -12], swear: [3, -5] };
// xingamento direto: 1º e 2º levam reação (moral despenca, sanidade alivia); o 3º encerra em "Mandou a real"
const INSULT_FX = [8, -20];

// Final do dia: cada cenário tem um gatilho sorteado pela data (igual pra todo mundo no mesmo dia).
const DAILY = ['emoji3', 'sorry3', 'shout2', 'q3', 'love2', 'ghost', 'side4', 'zen'];
const today = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` };
const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const dailyTrig = id => DAILY[hash(today() + id) % DAILY.length];

let st, chats, current, timers = [], started = false, screen = 'picker';

function setTimer(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id }
function clearTimers() { timers.forEach(clearTimeout); timers = [] }

function beep(kind) {
  if (!SOUND) return;
  try {
    const a = beep.ctx || (beep.ctx = new (window.AudioContext || window.webkitAudioContext)());
    (kind === 'call' ? [660, 880, 660, 880] : [880, 1320]).forEach((f, i) => {
      const o = a.createOscillator(), g = a.createGain();
      o.frequency.value = f; o.connect(g); g.connect(a.destination);
      const t = a.currentTime + i * .1;
      g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.0001, t + .12);
      o.start(t); o.stop(t + .13);
    });
  } catch {}
}

function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e }

// ───────────────────────────── CHAT ─────────────────────────────
function buildChats() {
  chats = {};
  const list = $('#chatList'); list.textContent = '';
  const wrap = $('#msgsWrap'); wrap.textContent = '';
  const defs = [{ id: 'npc', name: NPC.name, av: NPC.av, color: NPC.color, pv: '' }, ...SC.side.map(s => ({ ...s, name: T(s.name), pv: T(s.pv) }))];
  for (const d of defs) {
    const item = el('div', 'chatItem');
    const av = el('div', 'av', d.av); av.style.background = d.color;
    const mid = el('div', 'mid'); const nm = el('div', 'nm', d.name); const pv = el('div', 'pv', d.pv); mid.append(nm, pv);
    const rt = el('div', 'rt'); const tm = el('span', '', ''); const bd = el('span', 'badge hidden', '0'); rt.append(tm, bd);
    item.append(av, mid, rt); list.append(item);
    const box = el('div', 'msgs hidden');
    box.append(el('div', 'day', C.ui.today));
    wrap.append(box);
    const c = chats[d.id] = { ...d, item, pvEl: pv, tmEl: tm, bdEl: bd, box, unread: 0, opened: false,
      queue: shuffle(d.events || []), pending: null, busy: false };
    item.onclick = () => { openChat(d.id); $('#side').classList.remove('open') };
    // a prévia da lista é a mensagem real da conversa; `open` são as que vêm depois dela
    if (d.id !== 'npc') {
      const at = SC.start - rand(30, 300);
      [...(d.pv ? [d.pv] : []), ...(d.open || [])].forEach(l => addMsg(d.id, 'in', l, at, true));
    }
  }
}

const statusOf = id => id === 'npc' ? NPC.role + ' · ' + C.ui.online : chats[id].pending ? C.ui.online : '';

function openChat(id) {
  current = id;
  const c = chats[id];
  for (const k in chats) { chats[k].box.classList.toggle('hidden', k !== id); chats[k].item.classList.toggle('on', k === id) }
  c.unread = 0; c.bdEl.classList.add('hidden'); updMenuBadge();
  $('#hAv').textContent = c.av; $('#hAv').style.background = c.color;
  $('#hName').textContent = c.name;
  $('#hStatus').textContent = statusOf(id); $('#hStatus').classList.remove('typing');
  if (!c.opened && c.bonus && st && !st.ended) fx(c.bonus, 0, true);
  c.opened = true;
  renderChips();
  scrollDown();
}

// chips e caixa de texto refletem a conversa aberta: o chefe (st.waiting) ou um contato (pending)
function renderChips() {
  const box = $('#chips'); box.textContent = '';
  if (!chats || !st) return;
  requestAnimationFrame(scrollDown); // as opções ocupam espaço: mantém a última mensagem visível
  const id = current, c = chats[id];
  const ev = id === 'npc' ? (st.busy ? null : st.waiting) : (c.busy ? null : c.pending);
  // multitarefa: dá pra mandar mensagem livre pra qualquer contato a qualquer hora
  const freeChat = st.multi && id !== 'npc' && !c.busy;
  $('#compose').classList.toggle('hidden', st.ended || (id !== 'npc' && !c.pending && !st.multi));
  $('#endBar').classList.toggle('hidden', !st.ended || !$('#modal').classList.contains('hidden'));
  $('#send').disabled = (!ev && !freeChat) || st.ended;
  if (!ev || st.ended) return;
  for (const o of ev.opts) {
    const b = el('button', 'chip ' + (o.cls || ''), T(o.t));
    b.onclick = () => reply(o, null, id);
    box.append(b);
  }
}

function updMenuBadge() {
  const n = Object.values(chats).reduce((a, c) => a + c.unread, 0);
  $('#menuBadge').textContent = n; $('#menuBadge').classList.toggle('hidden', !n);
  $('#backBadge').textContent = n; $('#backBadge').classList.toggle('hidden', !n);
}

function scrollDown() { const w = $('#msgsWrap'); w.scrollTop = w.scrollHeight; pinned = true }

// Fica "grudado" no fim enquanto você está no fim: se a área da conversa encolher (opções aparecendo,
// teclado do celular, barra do navegador), volta pra última mensagem. Se você subiu pra reler, não puxa.
let pinned = true;
{
  const w = $('#msgsWrap');
  w.addEventListener('scroll', () => { pinned = w.scrollTop + w.clientHeight >= w.scrollHeight - 60 }, { passive: true });
  const keep = () => { if (pinned) w.scrollTop = w.scrollHeight };
  if (window.ResizeObserver) new ResizeObserver(keep).observe(w);
  if (window.visualViewport) visualViewport.addEventListener('resize', keep);
  $('#inp').addEventListener('focus', () => setTimeout(keep, 350)); // depois que o teclado termina de subir
}

// line: 'texto' | {audio,tx} | {sys}
function addMsg(id, dir, line, at, silent) {
  const c = chats[id];
  let node, preview;
  if (line.sys) {
    node = el('div', 'sys', T(line.sys)); preview = T(line.sys);
  } else {
    node = el('div', 'msg ' + dir);
    if (line.audio) {
      const a = el('div', 'audio');
      const pic = el('div', 'av', c.av); pic.style.cssText = `background:${c.color};width:38px;height:38px;font-size:13px`;
      a.append(pic, el('button', 'play', '▶'), el('div', 'wave'), el('span', 'dur', line.audio));
      const btn = el('button', 'txBtn', C.ui.transcribe);
      const tx = el('span', 'tx hidden', T(line.tx));
      btn.onclick = () => { tx.classList.remove('hidden'); btn.remove(); scrollDown() };
      a.querySelector('.play').onclick = btn.onclick;
      node.append(a, btn, tx);
      preview = '🎤 ' + line.audio;
    } else {
      const txt = T(line); node.append(document.createTextNode(txt)); preview = txt;
    }
    const tm = el('span', 'tm', at != null ? hhmm(at) : '');
    if (dir === 'out') tm.append(el('span', 'tick', '✓✓'));
    node.append(tm);
  }
  c.box.append(node);
  c.pvEl.textContent = (dir === 'out' ? '✓✓ ' : '') + preview;
  if (at != null) c.tmEl.textContent = hhmm(at);
  if (!silent && current !== id) {
    c.unread++; c.bdEl.textContent = c.unread; c.bdEl.classList.remove('hidden'); updMenuBadge();
    if (dir === 'in') toast(c.name, preview, id);
  }
  if (!silent && dir === 'in') beep();
  if (current === id) scrollDown();
  return node;
}

function toast(name, text, id) {
  const t = el('div', 'toast'); t.append(el('b', '', name), document.createTextNode(text));
  t.onclick = () => { openChat(id); $('#side').classList.remove('open'); t.remove() };
  $('#toast').append(t); setTimeout(() => t.remove(), 3500);
}

function updStats() {
  st.s = Math.max(0, Math.min(100, st.s)); st.m = Math.max(0, Math.min(100, st.m));
  $('#sVal').textContent = st.s; $('#sBar i').style.width = st.s + '%';
  $('#mVal').textContent = st.m; $('#mBar i').style.width = st.m + '%';
  $('#zVal').textContent = SC.z(st);
  $('#file').textContent = SC.f(st);
  $('#clock').textContent = hhmm(st.clock);
  document.body.classList.toggle('low', st.s < 30);
}

// nível multiplica só o dano; bônus de abrir conversa (raw) não é escalado
function fx(s = 0, m = 0, raw) {
  const k = raw ? 1 : LEVELS[st.lvl].mult;
  if (s < 0) s = Math.round(s * k);
  if (m < 0) m = Math.round(m * k);
  st.s += s; st.m += m; updStats();
  if (s <= -15 || m <= -15) { const p = $('#pane'); p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake') }
  [[s, '#sStat'], [m, '#mStat']].forEach(([d, sel]) => {
    if (!d) return;
    const x = el('span', 'delta ' + (d > 0 ? 'pos' : 'neg'), (d > 0 ? '+' : '') + d);
    $(sel).append(x); setTimeout(() => x.remove(), 1600);
  });
}

// alguém digita e manda as falas numa conversa
async function say(id, lines) {
  const c = chats[id], hs = $('#hStatus');
  for (const line of lines) {
    if (st.ended) return;
    if (!line.sys) {
      const len = line.audio ? 40 : T(line).length;
      const typing = el('div', 'typingB'); typing.append(el('i'), el('i'), el('i'));
      c.box.append(typing); if (current === id) scrollDown();
      if (current === id) { hs.textContent = line.audio ? C.ui.recording : C.ui.typing; hs.classList.add('typing') }
      await wait(Math.min(2600, 500 + len * 28));
      typing.remove();
      if (current === id) { hs.textContent = statusOf(id); hs.classList.remove('typing') }
    } else await wait(500);
    if (st.ended) return;
    addMsg(id, 'in', line, st.clock);
    await wait(250);
  }
}

// quanto tempo (no relógio do jogo) você está demorando pra responder: 5 s reais = 1 min
const waited = () => Math.max(1, Math.round((Date.now() - st.askedReal) / 5000));

function showOpts(ev) {
  st.waiting = ev; st.nags = 0; st.askedAt = st.clock; st.askedReal = Date.now();
  renderChips();
  armNag();
}

function armNag() {
  clearTimeout(st.nagT);
  const base = LEVELS[st.lvl].nag;
  st.nagT = setTimeout(async () => {
    // no dia do final "ghost" cobra pelo menos 2 vezes, senão 1 vácuo no Levinho já liberava
    const max = Math.max(LEVELS[st.lvl].nags, st.trig === 'ghost' ? 2 : 0);
    if (!st.waiting || st.ended || st.busy || st.nags >= max) return;
    const ev = st.waiting;
    st.nags++; st.clock = Math.max(st.clock, st.askedAt + waited());
    await say('npc', [pick(V.nags || SC.nags)]);
    if (st.waiting !== ev) return; // respondeu enquanto ele digitava
    fx(st.lvl === 3 ? -3 : 0, -5);
    if (st.nags >= max) bump('ghost'); // cobrou até desistir e você não respondeu
    if (checkEnd()) return;
    armNag();
  }, st.nags ? base * .7 : base);
}

// fala do personagem pra um tipo de texto livre, sem repetir até esgotar
function freeLine(k) {
  const own = V.free && V.free[k];
  // xingamentos misturam a voz do personagem com as reações gerais do cenário (mais variedade)
  const lines = /^(insult|swear)/.test(k) ? [...(own || []), ...(SC.free[k] || [])] : own || SC.free[k] || SC.free.other;
  const bag = st.bags[k] = st.bags[k] && st.bags[k].length ? st.bags[k] : shuffle(lines);
  return bag.pop();
}

function bump(k) { st.cnt[k] = (st.cnt[k] || 0) + 1 }

// final do dia: true se a condição de hoje foi cumprida (encerra o jogo)
function dailyHit(atFinal) {
  const c = st.cnt;
  const ok = { emoji3: c.emoji >= 3, sorry3: c.sorry >= 3, shout2: c.shout >= 2, q3: c.q >= 3, love2: c.love >= 2,
    ghost: c.ghost >= 1, side4: c.side >= 4, zen: atFinal && st.s >= 80 }[st.trig];
  return !!(ok && SC.daily && SC.daily[st.trig]);
}

async function reply(opt, freeText, id = 'npc') {
  if (id !== 'npc') return sideReply(opt, freeText, id);
  if (!st.waiting || st.ended || st.busy) return;
  st.busy = true;
  clearTimeout(st.nagT);
  const ev = st.waiting, isFinal = ev === st.final;
  st.waiting = null;
  renderChips();
  st.delay = waited();
  st.clock = Math.max(st.clock, st.askedAt + st.delay);
  addMsg('npc', 'out', freeText != null ? freeText : opt.t, st.clock);
  if (freeText != null) {
    const k = classify(freeText, SC.quit);
    if (k === 'quit') { await wait(1200); return end(k) }
    bump(k);
    if (k === 'insult') {
      if (st.cnt.insult >= 3) { await wait(1200); return end('curse') }
      // reação + uma camada de manipulação/ameaça; `floor`: ofensa nunca encerra pelo humor, só no 3º xingamento
      opt = { s: INSULT_FX[0], m: INSULT_FX[1], floor: true, r: [freeLine(st.cnt.insult === 1 ? 'insult1' : 'insult2'), freeLine('insultFollow')] };
    } else if (k.startsWith('ask_')) {
      // pergunta sobre o personagem: responde (indignado) e conta como "pergunta" pro final do dia
      bump('q');
      if (dailyHit()) { await wait(1200); return end('daily') }
      opt = { s: -2, m: -3, r: [freeLine(SC.free[k] || (V.free && V.free[k]) ? k : 'q')] };
    } else {
      if (dailyHit()) { await wait(1200); return end('daily') }
      const i = matchOption(freeText, ev.opts.map(o => T(o.t)));
      opt = i >= 0 ? ev.opts[i] : { s: FREE_FX[k][0], m: FREE_FX[k][1], r: [freeLine(k)] };
    }
  }
  await wait(700);
  st.clock += 1 + (opt.min || 0); // a reação vem logo depois (ou depois da chamada)
  st.ver++;
  fx(opt.s || 0, opt.m || 0);
  if (opt.floor && st.m < 5) { st.m = 5; updStats() }
  if (checkEnd()) return;
  await say('npc', opt.r || []);
  st.busy = false;
  if (st.ended || checkEnd()) return;
  if (isFinal) {
    await wait(1500);
    return end(dailyHit(true) ? 'daily' : st.m >= 75 ? 'star' : st.m >= 40 ? 'survive' : 'target');
  }
  maybeSide();
  st.clock += rand(8, 20); // tempo até a próxima cobrança
  await wait(rand(1200, 2600));
  next();
}

// ─────────── conversas paralelas ───────────
// normal: de vez em quando alguém chama (até 2 abertas). multitarefa: chamam bem mais (até 4) e às vezes 2 de uma vez.
function maybeSide() {
  const free = Object.values(chats).filter(c => c.id !== 'npc' && c.queue.length && !c.pending && !c.busy);
  const pending = Object.values(chats).filter(c => c.pending).length;
  const chance = st.multi ? .6 : LEVELS[st.lvl].side, cap = st.multi ? 3 : 1;
  if (free.length && pending < cap && Math.random() < chance) {
    const picks = shuffle(free).slice(0, st.multi && Math.random() < .3 ? 2 : 1);
    picks.forEach(c => setTimer(() => sideEvent(c.id), rand(1500, 6000)));
  } else if (st.pings.length && Math.random() < .2) {
    const p = st.pings.shift();
    setTimer(() => { if (!st.ended && !chats[p.id].pending) addMsg(p.id, 'in', p.l, st.clock) }, rand(800, 4000));
  }
}

async function sideEvent(id) {
  const c = chats[id];
  if (st.ended || c.pending || c.busy || !c.queue.length) return;
  const ev = c.queue.shift();
  c.busy = true;
  await say(id, ev.boss);
  c.busy = false;
  if (st.ended) return;
  c.pending = ev;
  if (current === id) { $('#hStatus').textContent = statusOf(id); renderChips() }
  // ignorou? a pessoa cobra uma vez e a sanidade sente
  setTimer(async () => {
    if (c.pending !== ev || st.ended || c.busy) return;
    await say(id, [pick(C.ui.sideNags)]);
    fx(-3, 0);
    checkEnd();
  }, 45000);
}

// multitarefa: os contatos também chamam sozinhos, mesmo enquanto você enrola o chefe
function sideTick() {
  if (st.ended || !st.multi) return;
  maybeSide();
  setTimer(sideTick, rand(18000, 32000));
}

// mensagem livre pra um contato sem nada pendente (só no multitarefa): ele responde com a própria voz
async function sideChat(text, id) {
  const c = chats[id];
  c.busy = true; renderChips();
  addMsg(id, 'out', text, st.clock);
  const k = classify(text, '(?!)');
  await wait(rand(700, 1600));
  const line = k === 'insult' || k === 'swear' ? pick(C.ui.sideCurse) : pick(c.chat || C.ui.sideFree);
  fx(k === 'insult' || k === 'swear' ? -3 : c.bonus > 0 ? 2 : 0, 0);
  bump('side');
  if (dailyHit()) { await wait(800); return end('daily') }
  await say(id, [line]);
  c.busy = false;
  if (current === id) renderChips();
}

async function sideReply(opt, freeText, id) {
  const c = chats[id];
  const ev = c.pending;
  if (!ev && freeText != null && st.multi && !c.busy && !st.ended) return sideChat(freeText, id);
  if (!ev || c.busy || st.ended) return;
  c.pending = null; c.busy = true;
  renderChips();
  addMsg(id, 'out', freeText != null ? freeText : opt.t, st.clock);
  if (freeText != null) {
    const k = classify(freeText, '(?!)');
    const i = matchOption(freeText, ev.opts.map(o => T(o.t)));
    // não bateu com nenhuma opção: o contato responde com a própria voz e a pergunta dele continua aberta
    opt = k === 'insult' || k === 'swear' ? { s: -4, r: [pick(C.ui.sideCurse)] }
      : i >= 0 ? ev.opts[i] : { s: -1, r: [pick(c.chat || C.ui.sideFree)], keep: true };
  }
  await wait(600);
  fx(opt.s || 0, opt.m || 0);
  if (checkEnd()) return;
  bump('side');
  if (dailyHit()) { await wait(1000); return end('daily') }
  await say(id, opt.r || []);
  if (opt.keep && !st.ended) c.pending = ev;
  c.busy = false;
  if (current === id) { $('#hStatus').textContent = statusOf(id); renderChips() }
}

function checkEnd() {
  if (st.ended) return true;
  if (st.s <= 0) { end('burnout'); return true }
  if (st.m <= 0) { end('fired'); return true }
  if (SC.zDead && SC.zDead(st)) { end('battery'); return true }
  return false;
}

async function next() {
  if (st.ended) return;
  const ev = st.clock >= SC.endAt || !st.queue.length ? st.final : st.queue.shift();
  if (ev === st.final) st.queue = [];
  else st.played.push(ev);
  if (ev.call) beep('call');
  await say('npc', ev.boss);
  if (!st.ended) showOpts(ev);
}

function end(id) {
  if (st.ended) return;
  st.ended = true; st.waiting = null; clearTimeout(st.nagT); clearTimers();
  renderChips();
  setTimeout(() => showEnding(id), 1400);
}

// ───────────────────────────── TELAS ─────────────────────────────
function modal(build) {
  const card = $('#card'); card.textContent = '';
  build(card);
  $('#modal').classList.remove('hidden');
  card.scrollTop = 0;
}
function closeModal() { $('#modal').classList.add('hidden') }
// fim de jogo: fecha a tela final e mostra a conversa (renderChips exibe a barra "Ver final / Jogar de novo")
function readChat() { closeModal(); openChat('npc'); scrollDown() }
// tocar fora do cartão na tela final também fecha
$('#modal').addEventListener('click', e => { if (e.target === $('#modal') && screen === 'end') readChat() });

function showLang() {
  screen = 'lang'; started = false;
  document.body.dataset.sc = '';
  applyStatic();
  modal(card => {
    card.append(el('div', 'tape', '☢ SIMULADOR TÓXICO · TOXIC SIMULATOR ☢'));
    card.append(el('h1', '', 'Escolha o idioma'), el('p', '', 'Choose your language'));
    const row = el('div', 'langs');
    [['🇧🇷', 'Português', 'versão brasileira', 0], ['🇺🇸', 'English', 'american edition', 1]].forEach(([flag, name, sub, v]) => {
      const b = el('button', 'langBtn' + (L === v ? ' on' : ''));
      b.append(el('b', '', flag), el('span', '', name), el('small', '', sub));
      b.onclick = () => { L = v; store.set('lang', L); showPicker() };
      row.append(b);
    });
    card.append(row);
    card.append(el('p', 'fine', 'Cada idioma tem roteiros próprios · Each language has its own scripts'));
  });
}

function showPicker() {
  started = false; screen = 'picker';
  C = L ? EN : PT;
  document.body.dataset.sc = '';
  applyStatic();
  modal(card => {
    card.append(el('div', 'tape', '☢ ' + (L ? 'TOXIC SIMULATOR' : 'SIMULADOR TÓXICO') + ' ☢'));
    card.append(el('h1', '', C.ui.pickTitle), el('p', '', C.ui.pickSub));
    for (const id of ['chefe', 'love', 'cliente', 'familia'].filter(k => C[k])) {
      const sc = C[id];
      const box = el('div', 'scCard ' + id);
      box.append(el('div', 'scName', sc.icon + ' ' + sc.pick), el('p', '', sc.pickDesc));
      const row = el('div', 'row');
      const mk = (label, k) => { const b = el('button', 'btn', label); b.onclick = () => go(k); row.append(b) };
      if (id === 'love') { mk('💙 ' + C.ui.bf, 'namorado'); mk('💗 ' + C.ui.gf, 'namorada') }
      else mk(C.ui.open + ' →', id);
      box.append(row); card.append(box);
    }
    const back = el('button', 'btn ghost', '🌐 ' + (L ? 'Language' : 'Idioma')); back.onclick = showLang; card.append(back);
  });
}

function setScenario(key) {
  KEY = key; C = L ? EN : PT;
  SCID = SCENARIO_KEYS[key];
  SC = C[SCID];
  G = key === 'namorada' ? 'a' : 'o';
  // sorteia personagem, evitando repetir o último
  const opts = SC.variants.filter(v => v !== V);
  V = pick(opts.length ? opts : SC.variants);
  NPC = { ...V.npc(G) };
  NPC.first = NPC.first || NPC.name.split(' ')[0];
  F = V.facts ? (V.facts[G] || V.facts) : { job: (NPC.role || '').toLowerCase() };
  if (NPC.g) G = NPC.g;
  document.body.dataset.sc = SCID;
  const u = new URL(location); u.searchParams.set('s', key); u.searchParams.delete('lang'); history.replaceState(null, '', u);
}

function go(key) { setScenario(key); showIntro() }

function levelPicker(card) {
  card.append(el('div', 'lvlTitle', C.ui.lvlTitle));
  const row = el('div', 'lvls');
  C.ui.lvls.forEach(([name, desc], i) => {
    const b = el('button', 'lvl' + (LVL === i + 1 ? ' on' : ''));
    b.append(el('b', '', '☠'.repeat(i + 1)), el('span', '', name), el('small', '', (SC && SC.lvlDesc && SC.lvlDesc[i]) || desc));
    b.onclick = () => { LVL = i + 1; store.set('lvl', LVL); row.querySelectorAll('.lvl').forEach((x, j) => x.classList.toggle('on', j === i)) };
    row.append(b);
  });
  card.append(row);
}

function showIntro() {
  screen = 'intro'; started = false; applyStatic();
  modal(card => {
    card.append(el('div', 'big', SC.intro.big), el('h1', '', T(SC.intro.h)));
    T(SC.intro.p).split('\n\n').forEach(p => card.append(el('p', '', p)));
    const trig = dailyTrig(SCID);
    if (SC.daily && SC.daily[trig]) card.append(el('div', 'daily', `🎲 ${C.ui.dailyLabel}: ${T(C.ui.daily[trig])}`));
    // "Você é": no namoro o gênero já vem da escolha; nos outros a pessoa escolhe e TODAS as falas seguem
    if (SCID !== 'love') {
      card.append(el('div', 'lvlTitle', C.ui.youTitle));
      const grow = el('div', 'lvls two');
      C.ui.you.forEach(([name, desc], i) => {
        const g = i ? 'a' : 'o';
        const gb = el('button', 'lvl' + (PG === g ? ' on' : ''));
        gb.append(el('b', '', i ? '👩' : '👨'), el('span', '', name), el('small', '', desc));
        gb.onclick = () => { PG = g; store.set('pg', g); grow.querySelectorAll('.lvl').forEach((x, j) => x.classList.toggle('on', j === i)) };
        grow.append(gb);
      });
      card.append(grow);
    }
    levelPicker(card);
    // conversas paralelas: normal (de vez em quando) ou multitarefa (todo mundo chama, responde quem quiser)
    card.append(el('div', 'lvlTitle', C.ui.multiTitle));
    const mrow = el('div', 'lvls two');
    C.ui.multi.forEach(([name, desc], i) => {
      const mb = el('button', 'lvl' + (MULTI === !!i ? ' on' : ''));
      mb.append(el('b', '', i ? '💬💬💬' : '💬'), el('span', '', name), el('small', '', desc));
      mb.onclick = () => { MULTI = !!i; store.set('multi', MULTI ? '1' : '0'); mrow.querySelectorAll('.lvl').forEach((x, j) => x.classList.toggle('on', j === i)) };
      mrow.append(mb);
    });
    card.append(mrow);
    const b = el('button', 'cta', C.ui.open); b.onclick = start; card.append(b);
    card.append(el('p', 'fine', T(SC.intro.fine)));
    const back = el('button', 'btn ghost', C.ui.back); back.onclick = showPicker; card.append(back);
  });
}

function applyStatic() {
  C = L ? EN : PT;
  document.documentElement.lang = L ? 'en' : 'pt-BR';
  $('#langBtn').textContent = L ? 'PT' : 'EN';
  $('#soundBtn').textContent = SOUND ? '🔔' : '🔕';
  $('#chatsTitle').textContent = C.ui.chats;
  $('#seeEnd').textContent = '🏁 ' + C.ui.seeEnd; $('#playAgain').textContent = '↻ ' + C.ui.again;
  $('#inp').placeholder = C.ui.type;
  $('#brandName').textContent = L ? 'TOXIC SIMULATOR' : 'SIMULADOR TÓXICO';
  if (SC) {
    $('#appName').textContent = SC.appName;
    $('[data-t=sanity]').textContent = T(SC.stats.s);
    $('[data-t=moral]').textContent = T(SC.stats.m);
    $('[data-t=sleep]').textContent = T(SC.stats.z);
    $('[data-t=file]').textContent = T(SC.stats.f);
    if (!started) $('#clock').textContent = hhmm(SC.start);
  }
}

// escalada: sorteia e ordena pela fase da tática (menosprezo → controle → isolamento/ameaça)
const arc = evs => shuffle(evs).map(e => [evPhase(e, C.ui.tactics), e]).sort((a, b) => a[0] - b[0]).map(x => x[1]);

function start() {
  clearTimers();
  if (st && st.nagT) clearTimeout(st.nagT);
  started = true; screen = 'game';
  const lv = LEVELS[LVL];
  const own = V.pool || [];
  const hard = LVL === 3 ? SC.pool.filter(e => e.hard) : [];
  const soft = shuffle(SC.pool.filter(e => !e.hard)).slice(0, Math.max(0, lv.events - hard.length - own.length));
  st = { lvl: LVL, multi: MULTI, bags: {}, cnt: {}, trig: dailyTrig(SCID), s: 100, m: 50, start: SC.start, clock: SC.start, ver: 0, ended: false, waiting: null, busy: false, nags: 0,
    final: V.final || SC.final, queue: [V.opening || pick(SC.openings || [SC.opening]), ...arc([...own, ...soft, ...hard])], played: [], pings: shuffle(SC.pings || []) };
  applyStatic(); buildChats();
  for (const h of pick(SC.histories || [SC.history])) h.sys ? addMsg('npc', 'in', h, null, true) : addMsg('npc', h.who === 'me' ? 'out' : 'in', h.l, h.at, true);
  openChat('npc'); updStats(); closeModal();
  $('#endBar').classList.add('hidden');
  setTimer(next, 1500);
  if (st.multi) setTimer(sideTick, rand(12000, 20000));
}

// táticas que apareceram na conversa principal, mais frequentes primeiro (desempate: mais pesada)
const tacticsSeen = () => {
  const n = {}; (st.played || []).forEach(e => evTactics(e, C.ui.tactics).forEach(id => n[id] = (n[id] || 0) + 1));
  return C.ui.tactics.filter(t => n[t.id]).sort((a, b) => n[b.id] - n[a.id] || b.ph - a.ph);
};

const listGet = k => { try { return JSON.parse(store.get(k) || '[]') } catch { return [] } };
const listAdd = (k, v) => { const l = [...new Set([...listGet(k), v])]; store.set(k, JSON.stringify(l)); return l };

function showEnding(id) {
  screen = 'end';
  const isDaily = id === 'daily';
  const e = isDaily ? SC.daily[st.trig] : SC.endings[id];
  // alguns finais têm várias versões; ao reabrir pela barra do fim, mantém a mesma
  const desc = st.endId === id && st.endDesc ? st.endDesc : Array.isArray(e.d) ? pick(e.d) : e.d;
  st.endId = id; st.endDesc = desc;
  const got = isDaily ? listGet(`found:${L}:${SCID}`) : listAdd(`found:${L}:${SCID}`, id);
  const days = isDaily ? listAdd(`daily:${L}:${SCID}`, st.trig) : listGet(`daily:${L}:${SCID}`);
  const title = T(e.t), lv = C.ui.lvls[st.lvl - 1][0];
  const share = C.ui.shareTxt.replace('{sc}', SC.pick).replace('{lv}', lv).replace('{t}', title).replace('{sl}', T(SC.stats.s)).replace('{s}', st.s).replace('{ml}', T(SC.stats.m)).replace('{m}', st.m);
  const tacs = tacticsSeen();
  const shareFull = tacs.length ? share + ' ' + C.ui.tacShare.replace('{n}', tacs.length) : share;
  const url = location.origin + location.pathname + '?s=' + KEY + (L ? '&lang=en' : '');
  modal(card => {
    card.append(el('div', 'tape', isDaily ? '🎲 ' + C.ui.dailyLabel.toUpperCase() : '☠'.repeat(st.lvl) + ' ' + lv.toUpperCase()));
    card.append(el('div', 'big emoji', e.e), el('h1', '', title), el('p', '', T(desc)));
    const sc3 = el('div', 'scores');
    [[st.s, SC.stats.s], [st.m, SC.stats.m], [SC.z(st), SC.stats.z]].forEach(([v, l]) => { const d = el('div'); d.append(el('b', '', String(v)), el('span', '', T(l))); sc3.append(d) });
    card.append(sc3);
    if (tacs.length) {
      const tb = el('div', 'tacs'); tb.append(el('div', 'lvlTitle', C.ui.tacTitle));
      tacs.slice(0, 3).forEach(t => { const d = el('div', 'tac'); d.append(el('b', '', t.n), el('span', '', t.d)); tb.append(d) });
      card.append(tb);
    }
    const all = Object.keys(SC.endings);
    const col = el('div', 'found');
    col.append(el('div', 'lvlTitle', `${C.ui.found} ${got.length}/${all.length} · 🎲 ${days.length}/${DAILY.length}`));
    const tags = el('div', 'tags');
    all.forEach(k => tags.append(el('span', got.includes(k) ? 'tag on' : 'tag', got.includes(k) ? SC.endings[k].e + ' ' + T(SC.endings[k].t) : '🔒 ???')));
    col.append(tags); card.append(col);
    const again = el('button', 'cta', C.ui.again); again.onclick = () => { setScenario(KEY); showIntro() }; card.append(again);
    const read = el('button', 'btn readBtn', '📖 ' + C.ui.readChat);
    read.onclick = readChat;
    card.append(read);
    const x2 = el('button', 'closeX', '✕'); x2.setAttribute('aria-label', C.ui.readChat); x2.onclick = readChat;
    card.prepend(x2);
    const row = el('div', 'row');
    const wa = el('button', 'btn', 'WhatsApp'); wa.onclick = () => open('https://wa.me/?text=' + encodeURIComponent(shareFull + ' ' + url), '_blank', 'noopener');
    const x = el('button', 'btn', 'X'); x.onclick = () => open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareFull) + '&url=' + encodeURIComponent(url), '_blank', 'noopener');
    const cp = el('button', 'btn', C.ui.copy); cp.onclick = () => { navigator.clipboard?.writeText(shareFull + ' ' + url).then(() => cp.textContent = C.ui.copied).catch(() => {}) };
    row.append(wa, x, cp); card.append(row);
    const oth = el('button', 'btn ghost', C.ui.other); oth.onclick = showPicker; card.append(oth);
    card.append(el('p', 'fine note', T(SC.note)));
  });
}

// ───────────────────────────── BOOT ─────────────────────────────
$('#compose').onsubmit = e => {
  e.preventDefault();
  const v = $('#inp').value.trim();
  if (!v || !st || st.ended || $('#send').disabled) return;
  $('#inp').value = '';
  reply(null, v, current);
};
$('#menuBtn').onclick = () => $('#side').classList.toggle('open');
$('#backBtn').onclick = () => $('#side').classList.add('open');
$('#seeEnd').onclick = () => showEnding(st.endId);
$('#playAgain').onclick = () => { setScenario(KEY); showIntro() };
$('#soundBtn').onclick = () => { SOUND = !SOUND; store.set('sound', SOUND ? '1' : '0'); applyStatic(); if (SOUND) beep() };
$('#langBtn').onclick = () => {
  L = L ? 0 : 1; store.set('lang', L);
  if (screen === 'game' && !st.ended) { location.reload(); return } // conteúdo é outro, reinicia
  if (screen === 'lang') showLang(); else if (screen === 'picker' || !KEY) showPicker(); else { setScenario(KEY); showIntro() }
};

const s0 = qs.get('s');
if (SCENARIO_KEYS[s0] && (L ? EN : PT)[SCENARIO_KEYS[s0]]) go(s0); else showLang();
