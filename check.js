// node check.js — verificação da leitura de texto livre
const assert = require('assert');
const { classify, matchOption } = require('./text.js');
const Q = 'me demito|pedir as contas';
const cases = [
  ['me demito agora', 'quit'], ['vai se foder', 'insult'], ['vai tomar no cu', 'insult'], ['chupa aqui', 'insult'], ['vai à merda', 'insult'], ['porra, de novo?', 'swear'], ['fuck off', 'insult'], ['oh shit', 'swear'], ['VAI SE FODER', 'insult'], ['vsf', 'insult'], ['vtnc', 'insult'], ['tnc', 'insult'], ['morre', 'insult'], ['smt', 'insult'], ['vaaai se fuder', 'insult'], ['cala a boca', 'insult'], ['gtfo', 'insult'], ['kys', 'insult'], ['seu inútil', 'insult'], ['pqp', 'swear'], ['caralhooooo', 'swear'], ['krl', 'swear'], ['foda-se', 'swear'], ['mamãe mandou beijo', 'other'], ['santa paciência', 'other'], ['NÃO VOU FAZER ISSO', 'shout'],
  ['desculpa, não vai se repetir', 'sorry'], ['te amo', 'love'], ['e meu aumento?', 'money'],
  ['tô passando mal', 'sick'], ['tô morto de sono', 'tired'], ['kkkkkk', 'laugh'],
  ['não', 'no'], ['pode deixar', 'yes'], ['🙄', 'emoji'], ['quem decidiu isso?', 'q'], ['banana', 'other'],
  ['vou pra casa agora', 'other'], // "pra/para" não é "não"
  ['qual é sua profissão mesmo?', 'ask_job'], ['vc trabalha com o que?', 'ask_job'], ['qual seu nome?', 'ask_name'],
  ['quantos anos vc tem?', 'ask_age'], ['onde vc tá?', 'ask_where'], ['o que você tá fazendo?', 'ask_doing'],
  ['por que você é assim?', 'ask_why'], ['isso é ciúme?', 'ask_jealous'], ['você me ama?', 'ask_loveq'],
  ['vc não dorme?', 'ask_sleep'], ['what do you do?', 'ask_job'], ['wyd', 'ask_doing'],
  ['quanto custa o pão?', 'q'], // pergunta qualquer continua sendo "q"
];
for (const [t, k] of cases) assert.strictEqual(classify(t, Q), k, t);
const opts = ['Postando! #gratidão', 'Não', 'Posto e desativo os comentários'];
assert.strictEqual(matchOption('não vou postar nada', opts), 1);
assert.strictEqual(matchOption('posto mas desativo comentários', opts), 2);
assert.strictEqual(matchOption('banana', opts), -1);
assert.strictEqual(matchOption('Ouvi tudo, faço as 3 versões', ['Ouvi tudo. Faço as 3 versões', 'Pode resumir por texto? 😅', '"Perfeito!" (não ouviu)']), 0);
assert.strictEqual(classify('hello there', Q), 'other'); // "hell" não pega "hello"
console.log('ok', cases.length + 5, 'casos');
