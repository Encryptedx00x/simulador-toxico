'use strict';
// Leitura do texto livre (sem DOM, testável com `node check.js`).
// 1) sai do jogo (demissão/término) ou palavrão; 2) parece uma das respostas sugeridas → vira ela;
// 3) senão, cai numa categoria e o personagem responde com uma fala daquela categoria.

// palavra inteira com acentos (\b do JS não entende "não")
const W = s => new RegExp(`(?<![\\p{L}\\p{N}])(?:${s})(?![\\p{L}\\p{N}])`, 'iu');

const CATS = [
  // xingamento direto (escala até o final "Mandou a real") vs palavrão solto (só leva bronca).
  // Comparados com o texto sem acento e sem letra esticada (ver `harsh`), então os padrões não têm acento.
  ['insult', W([
    'vai se f[ou]der|se f[ou]de|vsf|vsfd|vtnc|vtmnc|tnc|tmnc|pnc|pau no cu|vai tomar no c[u*]|tomar no c[u*]|toma no c[u*]|enfia no c[u*]',
    'vai (?:a|pra) merda|vai pro inferno|vai pra (?:puta que (?:te )?pariu|pqp)|vai catar coquinho|sai fora|some daqui|cala (?:a )?boca|cala a porra da boca',
    'fdp|filh[oa] da puta|filh[oa] de uma puta|arrombad[oa]|cuzao|cuzona|babaca|otari[oa]|idiota|imbecil|escrot[oa]|palhac[oa]|corn[oa]|vagabund[oa]',
    'desgracad[oa]|chupa|chupar|mama aqui|mama|meu pau|minha rola|minha pica|meu ovo|meus ovos|puxa[- ]?saco|retardad[oa]|lixo|inutil|nojent[oa]|trouxa|mane',
    'merdinha|bostinha|seu merda|sua merda|seu bosta|sua bosta|piranha|vadia|vaca|puta|safad[oa]|canalha|cretin[oa]|verme|jumento|anta|burr[oa]|besta',
    'morre|morra|vai morrer|se mata|smt|foda-se voce|fodase voce',
    'fuck you|fuck u|fu|f u|fuck off|go fuck yourself|gfy|stfu|gtfo|shut up|screw you|suck my|smd|eat a dick|kiss my ass|eat shit|go to hell|go die|drop dead|die|kys|kill yourself',
    'asshole|dumbass|jackass|idiot|moron|stupid|bitch|son of a bitch|bastard|dick|dickhead|prick|douche(?:bag)?|jerk|loser|piece of shit|pos|twat|wanker|cunt|slut|whore|clown|trash|garbage|f\*ck you',
  ].join('|'))],
  ['swear', W('porra|porr[ao]|p\*rra|prr|caralho|krl|crl|carai|caraio|merda|mrd|puta que pariu|pqp|cacete|droga|bosta|foda|foda-se|fodase|fodasse|que se foda|putz|puts|inferno|fuck|fucking|fucked|f\*ck|shit|sh\*t|damn|dammit|wtf|omfg|goddamn|crap|hell|bullshit|ffs')],
  ['sorry', W('desculpa|desculpe|perd[aã]o|foi mal|sinto muito|sorry|my bad|apologi[sz]e|apologies')],
  ['love', W('te amo|amo voc[eê]|lind[oa]|gat[oa]|saudade|love you|ily|miss you|cute|beautiful|handsome')],
  ['money', W('sal[aá]rio|aumento|dinheiro|pix|pagar|pagamento|grana|reais|raise|salary|money|pay|paid|bonus|venmo')],
  ['sick', W('doente|passando mal|febre|hospital|m[eé]dico|atestado|enjoad[oa]|sick|fever|doctor|ill|hospital|throwing up')],
  ['tired', W('cansad[oa]|exaust[oa]|dormir|sono|morto de sono|tired|exhausted|sleep|sleepy')],
  ['laugh', /(k{3,}|haha|hehe|(?<![\p{L}])rs(?![\p{L}])|lol|lmao|😂|🤣)/iu],
  ['no', W('n[aã]o|nao|amanh[aã]|depois|hor[aá]rio|direitos?|clt|sindicato|hora extra|chega|no|nope|nah|tomorrow|later|overtime|stop|enough')],
  ['yes', W('sim|claro|ok|okay|pode deixar|beleza|blz|fechado|bora|t[aá] bom|certo|com certeza|yes|yeah|yep|sure|on it|got it|will do|of course|sounds good')],
];

const STOP = new Set(('que com pra para por uma uns umas the and you for this that with isso esse essa este esta voce vou ta tou to its are was your our meu minha seu sua mas but ' +
  'amor babe mano bro dona sim yes ok aqui ali now agora just only then entao pode can will vai').split(' '));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]+/g, ' ');
const words = s => norm(s).split(/\s+/).filter(w => w.length >= 3 && !STOP.has(w));
const same = (a, b) => a === b || (a.length >= 5 && b.length >= 5 && a.slice(0, 5) === b.slice(0, 5)); // "postar"~"postando"

// Índice da resposta sugerida mais parecida, ou -1. Exige 2 palavras em comum,
// ou 1 quando a opção é curtinha (ex.: "Não"). Empate total = ninguém.
function matchOption(text, optTexts) {
  const typed = words(text);
  if (!typed.length) return -1;
  let best = -1, bestKey = 0, tie = false;
  optTexts.forEach((t, i) => {
    const ow = words(t);
    const score = ow.filter(w => typed.some(x => same(x, w))).length;
    const ok = score >= 2 || (score >= 1 && ow.length <= 2);
    if (!ok) return;
    const key = score + score / ow.length; // desempate: quem teve uma parte maior casada
    if (key > bestKey) { best = i; bestKey = key; tie = false } else if (key === bestKey) tie = true;
  });
  return tie ? -1 : best;
}

// sem acento, minúsculo e sem letra esticada ("caralhooooo" → "caralho", "vaaai" → "vai")
const harsh = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/(\p{L})\1{2,}/gu, '$1');

// perguntas sobre o personagem (ele responde indignado, mas responde). Testadas no texto sem acento.
const ASK = [
  ['job', W('qual (?:e )?(?:a )?sua profissao|sua profissao|voce trabalha com|vc trabalha com|trabalha com o que|o que (?:e )?que voce faz|o que voce faz|o que vc faz|qual (?:e )?(?:o )?seu (?:trampo|trabalho|emprego|cargo)|what do you do|what(?:\'?s| is) your job|your job|for a living|profession')],
  ['name', W('qual (?:e )?(?:o )?seu nome|como voce se chama|como vc se chama|quem (?:e|eh) voce|quem e vc|what(?:\'?s| is) your name|who are you')],
  ['age', W('quantos anos|sua idade|how old')],
  ['where', W('onde (?:voce|vc|tu) (?:ta|esta|tá)|cade voce|cade vc|where are you|where r u')],
  ['doing', W('(?:o )?que (?:voce|vc) (?:ta|esta) fazendo|fazendo o que|what are you doing|wyd')],
  ['why', W('por ?que (?:voce|vc) (?:e|eh|ta|esta|fica) (?:assim|desse jeito|tao)|pq (?:voce|vc) (?:e|eh|ta|fica) assim|why are you (?:like this|so|being like this)')],
  ['jealous', W('ciume|ciumes|ciument[oa]|jealous')],
  ['loveq', W('(?:voce|vc) me ama|me ama mesmo|do you (?:even )?love me|you love me')],
  ['sleep', W('(?:voce|vc) (?:nao|n) dorme|nao descansa|(?:don\'?t|do) you (?:ever )?sleep|go to sleep')],
];

function classify(text, quitPattern) {
  if (W(quitPattern).test(text)) return 'quit';
  const h = harsh(text);
  if (CATS[0][1].test(h)) return 'insult';
  if (CATS[1][1].test(h)) return 'swear';
  const letters = text.replace(/[^\p{L}]/gu, '');
  if (letters.length >= 6 && letters === letters.toUpperCase() && letters !== letters.toLowerCase()) return 'shout';
  for (const [k, rx] of ASK) if (rx.test(h)) return 'ask_' + k;
  for (const [k, rx] of CATS) if (rx.test(text)) return k;
  if (!/[\p{L}\p{N}]/u.test(text)) return 'emoji';
  if (text.includes('?')) return 'q';
  return 'other';
}

if (typeof module !== 'undefined') module.exports = { W, classify, matchOption };

// Atalhos pra escrever conteúdo: E(falas, [texto, sanidade, moral, ...reação], ...). H = só no Insuportável.
const E = (boss, ...opts) => ({ boss: [].concat(boss), opts: opts.map(o => Array.isArray(o) ? { t: o[0], s: o[1] || 0, m: o[2] || 0, r: o.slice(3) } : o) });
const H = (...a) => ({ ...E(...a), hard: true });
