// node promo/render.mjs <cena.html> <largura> <altura> <saida.mp4>
// Renderiza uma cena com render(t) quadro a quadro no Edge headless (DevTools Protocol) e monta o MP4 com ffmpeg.
// A cena define window.DURATION (s) e window.MARKS (instantes que ganham um "plim" de notificação).
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const [scene, W, H, out] = process.argv.slice(2);
const FPS = 30, PORT = 9333;
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const work = join(tmpdir(), 'toxico-render-' + Date.now());
const frames = join(work, 'frames'); mkdirSync(frames, { recursive: true });

const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${join(work, 'profile')}`, `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(t => t.type === 'page') } catch {}
    if (!target) await sleep(200);
  }
  if (!target) throw new Error('Edge não abriu o DevTools');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok, err) => { ws.onopen = ok; ws.onerror = err });
  let id = 0; const pending = new Map(), waiters = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.err(new Error(m.error.message)) : p.ok(m.result) }
    else if (m.method) waiters.filter(w => w.method === m.method).forEach(w => w.ok(m.params));
  };
  const send = (method, params = {}) => new Promise((ok, err) => { const i = ++id; pending.set(i, { ok, err }); ws.send(JSON.stringify({ id: i, method, params })) });
  const once = method => new Promise(ok => waiters.push({ method, ok }));
  const evalJS = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile: false });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url: 'file:///' + resolve(scene).replace(/\\/g, '/') });
  await loaded;
  await evalJS('document.fonts.ready.then(() => 1)');
  await sleep(300);
  const dur = await evalJS('window.DURATION'), marks = await evalJS('window.MARKS || []');
  const n = Math.round(dur * FPS);
  for (let i = 0; i < n; i++) {
    await evalJS(`render(${(i / FPS).toFixed(4)})`);
    const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
    writeFileSync(join(frames, `f${String(i).padStart(5, '0')}.jpg`), Buffer.from(data, 'base64'));
    if (i % 60 === 0) process.stdout.write(`\r${i}/${n} quadros`);
  }
  console.log(`\r${n}/${n} quadros`);
  ws.close();

  // trilha: um "plim" curto (dois tons) em cada marca, silêncio no resto
  const SR = 44100, samples = new Int16Array(Math.ceil(dur * SR));
  // cada marca: número (= mensagem recebida) ou {t, k}. k: in | out | key | whoosh | thump | cta
  const add = (t, len, fn) => {
    const s0 = Math.floor(t * SR);
    for (let k = 0; k < len * SR && s0 + k < samples.length; k++)
      samples[s0 + k] = Math.max(-32767, Math.min(32767, samples[s0 + k] + fn(k / SR)));
  };
  const tone = (f, decay, amp) => x => Math.sin(2 * Math.PI * f * x) * Math.exp(-x / decay) * amp;
  let lp = 0; // ruído filtrado (whoosh/teclado)
  const noise = (amp, cut) => () => (lp += (Math.random() * 2 - 1 - lp) * cut) * amp;
  for (const m of marks) {
    const { t, k } = typeof m === 'number' ? { t: m, k: 'in' } : m;
    if (k === 'in') { add(t, .14, tone(880, .03, 9000)); add(t + .07, .14, tone(1320, .035, 8000)) }
    else if (k === 'out') { add(t, .06, tone(1760, .012, 5000)); add(t + .03, .06, tone(2350, .012, 3500)) }
    else if (k === 'key') add(t, .025, (n => x => n() * Math.exp(-x / .006))(noise(9000, .5)))
    else if (k === 'whoosh') add(t - .1, .32, (n => x => n() * Math.sin(Math.PI * x / .32) ** 2)(noise(5000, .12)))
    else if (k === 'thump') add(t, .25, tone(85, .07, 15000))
    else if (k === 'cta') [660, 880, 1320].forEach((f, i) => add(t + i * .04, .5, tone(f, .16, 5500)));
  }
  const wav = Buffer.alloc(44 + samples.length * 2);
  wav.write('RIFF', 0); wav.writeUInt32LE(36 + samples.length * 2, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(SR, 24);
  wav.writeUInt32LE(SR * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36);
  wav.writeUInt32LE(samples.length * 2, 40); Buffer.from(samples.buffer).copy(wav, 44);
  writeFileSync(join(work, 'sfx.wav'), wav);

  mkdirSync(dirname(resolve(out)), { recursive: true });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(frames, 'f%05d.jpg'), '-i', join(work, 'sfx.wav'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', resolve(out)], { stdio: 'inherit' });
  console.log('ok', resolve(out));
} finally {
  edge.kill();
  await sleep(500);
  try { rmSync(work, { recursive: true, force: true }) } catch {}
}
