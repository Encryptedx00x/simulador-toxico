'use strict';
// Começos variados: cada partida sorteia um histórico (mensagens antes do jogo) e,
// pro personagem padrão de cada cenário, uma abertura. Personagens com abertura própria mantêm a deles.

// ───────────────────────────── PT · CHEFE ─────────────────────────────
PT.chefe.histories = [
  PT.chefe.history,
  [
    { at: 17 * 60 + 58, who: 'npc', l: 'Sexta liberada, gente! Bom fim de semana 🍻' },
    { at: 18 * 60 + 1, who: 'npc', l: 'Ah, só deixa a apresentação de segunda redondinha, tá?' },
    { at: 18 * 60 + 3, who: 'me', l: 'Pode deixar!' },
    { sys: '{first} visualizou Apresentacao_Apice.pptx às 22:46' },
  ],
  [
    { at: 19 * 60 + 40, who: 'me', l: 'Boa noite! Segue a versão final da apresentação 📎' },
    { at: 19 * 60 + 41, who: 'npc', l: '👍' },
    { sys: '{first} visualizou Apresentacao_Apice.pptx às 22:46' },
  ],
  [
    { at: 13 * 60 + 12, who: 'npc', l: 'Bom almoço de domingo a todos! Família em primeiro lugar 🙏❤️' },
    { at: 13 * 60 + 13, who: 'npc', l: '(mas a apresentação é segunda 9h, hein)' },
    { at: 13 * 60 + 20, who: 'me', l: 'Kkk tá tudo certo' },
    { sys: '{first} visualizou Apresentacao_Apice.pptx às 22:46' },
  ],
];
PT.chefe.openings = [
  PT.chefe.opening,
  E(['Vi seu story no bar ontem 🍺', 'Engraçado: pra cerveja tem tempo. Pra fazer direito, não.'],
    ['Era aniversário de um amigo', -5, -5, 'Que bom. Amigo é importante. Emprego também.'],
    ['Era só uma cerveja', -5, 5, 'Uma cerveja que durou mais que sua dedicação. Abri a apresentação. Tenho uns pontinhos.'],
    ['Você me segue no Instagram??', 3, -10, 'Sigo em tudo. Sou um líder presente.']),
  E([{ audio: '2:58', tx: 'Fala, {p:campeão|campeã}… é rapidinho, tá? Duas coisinhas na apresentação. Na verdade são mais. Mas começa pelas duas. Me liga se puder. Ou não precisa. Mas liga.' }],
    ['Ouvi! Pode mandar as coisinhas', -5, 5, 'São 74. Vou mandando.'],
    ['Pode mandar por texto?', 0, -5, 'Áudio é mais humano. Mas tá: são 74 coisinhas.'],
    ['[liga de volta]', -10, 5, { sys: 'Chamada de voz · 1 min' }, 'Caiu. Vou mandar por áudio mesmo.']),
];

// ───────────────────────────── PT · RELACIONAMENTO ─────────────────────────────
PT.love.histories = [
  PT.love.history,
  [
    { at: 20 * 60 + 10, who: 'npc', l: 'Vai mesmo nesse aniversário?' },
    { at: 20 * 60 + 11, who: 'me', l: 'Vou, amor. Volto cedo ❤️' },
    { at: 20 * 60 + 11, who: 'npc', l: 'Cedo que horas?' },
    { at: 20 * 60 + 12, who: 'me', l: 'Umas 1h' },
    { at: 20 * 60 + 12, who: 'npc', l: 'Tá.' },
    { sys: '{name} visualizou seu story às 23:11' },
  ],
  [
    { at: 21 * 60 + 30, who: 'npc', l: '{p:Tá lindo|Tá linda}, hein. Pra quem?' },
    { at: 21 * 60 + 31, who: 'me', l: 'Pra você, amor 😘' },
    { at: 21 * 60 + 31, who: 'npc', l: 'Mas eu não vou estar lá.' },
    { sys: '{name} visualizou seu story às 23:11' },
  ],
  [
    { at: 22 * 60 + 5, who: 'me', l: 'Cheguei no aniversário do Lucão 🎉' },
    { at: 22 * 60 + 5, who: 'npc', l: 'Tem muita gente aí?' },
    { at: 22 * 60 + 6, who: 'me', l: 'Umas 20 pessoas' },
    { at: 22 * 60 + 6, who: 'npc', l: '{Quantos são homens|Quantas são mulheres}?' },
    { sys: '{name} visualizou seu story às 23:11' },
  ],
];
PT.love.openings = [
  PT.love.opening,
  E(['Você tá online e não falou comigo.', 'Tá falando com quem?'],
    ['Com o grupo do aniversário', -5, 0, 'Manda print.'],
    ['Tava vendo a hora, amor', 0, -5, 'Pra ver a hora não precisa ficar 4 minutos online.'],
    ['Com você, agora ❤️', -5, 5, 'Agora porque eu chamei.']),
  E(['Por que tem gente dançando colado no fundo do seu story?'],
    ['Não sou eu, amor!', -5, 0, 'Mas você tava perto. Perto demais.'],
    ['É o aniversariante com a namorada', 0, 0, 'Sei. Manda um vídeo 360° do lugar.'],
    ['Quer que eu apague o story?', -10, 5, 'Apaga. E posta um falando de mim.']),
];

// ───────────────────────────── EN · BOSS ─────────────────────────────
EN.chefe.histories = [
  EN.chefe.history,
  [
    { at: 17 * 60 + 58, who: 'npc', l: 'Have a great weekend, team! 🍻' },
    { at: 18 * 60 + 1, who: 'npc', l: 'Just make sure Monday\'s deck is polished 🙏' },
    { at: 18 * 60 + 3, who: 'me', l: 'Will do!' },
    { sys: '{first} viewed Apex_Pitch.pptx at 10:46 PM' },
  ],
  [
    { at: 19 * 60 + 40, who: 'me', l: 'Here\'s the final version of the deck 📎' },
    { at: 19 * 60 + 41, who: 'npc', l: '👍' },
    { sys: '{first} viewed Apex_Pitch.pptx at 10:46 PM' },
  ],
  [
    { at: 13 * 60 + 12, who: 'npc', l: 'Enjoy your Sunday, everyone! Family first 🙏❤️' },
    { at: 13 * 60 + 13, who: 'npc', l: '(but the deck is due Monday 9am)' },
    { at: 13 * 60 + 20, who: 'me', l: 'Haha all good' },
    { sys: '{first} viewed Apex_Pitch.pptx at 10:46 PM' },
  ],
];
EN.chefe.openings = [
  EN.chefe.opening,
  E(['saw your story at the bar last night 🍺', 'funny how you have bandwidth for beer but not for doing it right'],
    ['It was a friend\'s birthday', -5, -5, 'Great. Friends matter. So does your job.'],
    ['I\'m here, go ahead', -5, 5, 'Great. Opened the deck. Few small thoughts.'],
    ['You follow me on Instagram??', 3, -10, 'I follow you everywhere. Present leadership.']),
  E([{ audio: 'Loom · 2:58', tx: 'Hey, quick one… two tiny things on the deck. Actually more. But start with the two. Call me if you can. Or don\'t. But call.' }],
    ['Watched it! Send the tiny things', -5, 5, 'It\'s 74. Sending now.'],
    ['Can you send it as text?', 0, -5, 'Video is more human. But fine: 74 tiny things.'],
    ['[call back]', -10, 5, { sys: 'Voice call · 1 min' }, 'Dropped. I\'ll just send another Loom.']),
];

// ───────────────────────────── EN · RELATIONSHIP ─────────────────────────────
EN.love.histories = [
  EN.love.history,
  [
    { at: 20 * 60 + 10, who: 'npc', l: 'you\'re really going to that party?' },
    { at: 20 * 60 + 11, who: 'me', l: 'yes babe, back early ❤️' },
    { at: 20 * 60 + 11, who: 'npc', l: 'early like what time?' },
    { at: 20 * 60 + 12, who: 'me', l: '1ish' },
    { at: 20 * 60 + 12, who: 'npc', l: 'ok.' },
    { sys: '{name} viewed your story at 11:11 PM' },
  ],
  [
    { at: 21 * 60 + 30, who: 'npc', l: 'you look good. for who?' },
    { at: 21 * 60 + 31, who: 'me', l: 'for you babe 😘' },
    { at: 21 * 60 + 31, who: 'npc', l: 'but I won\'t be there.' },
    { sys: '{name} viewed your story at 11:11 PM' },
  ],
  [
    { at: 22 * 60 + 5, who: 'me', l: 'made it to Tyler\'s 🎉' },
    { at: 22 * 60 + 5, who: 'npc', l: 'lots of people there?' },
    { at: 22 * 60 + 6, who: 'me', l: 'like 20' },
    { at: 22 * 60 + 6, who: 'npc', l: 'how many are {guys|girls}?' },
    { sys: '{name} viewed your story at 11:11 PM' },
  ],
];
EN.love.openings = [
  EN.love.opening,
  E(['you’re online and not talking to me.', 'who are you texting?'],
    ['The party group chat', -5, 0, 'screenshot.'],
    ['Just checking the time, babe', 0, -5, 'checking the time doesn\'t take 4 minutes online.'],
    ['You, now ❤️', -5, 5, 'now because I texted first.']),
  E(['why are people slow dancing in the back of your story?'],
    ['That\'s not me, babe!', -5, 0, 'but you were close. too close.'],
    ['It\'s the birthday boy and his girlfriend', 0, 0, 'sure. send me a 360° video of the place.'],
    ['Want me to delete it?', -10, 5, 'delete it. and post one about me.']),
];
