'use strict';
// Conversas paralelas no modo multitarefa: cada contato responde com a própria voz quando você
// manda mensagem livre (chat), e quem tinha pouca coisa ganha mais situações (events).

Object.assign(PT.ui, {
  multiTitle: 'Conversas paralelas',
  multi: [['Normal', 'de vez em quando alguém chama'], ['Multitarefa', 'todo mundo chama, responde quem quiser']],
  readChat: 'Ver conversa', seeEnd: 'Ver final',
});
Object.assign(EN.ui, {
  multiTitle: 'Side chats',
  multi: [['Normal', 'someone texts every now and then'], ['Multitasking', 'everyone texts, reply to anyone']],
  readChat: 'Read the chat', seeEnd: 'See ending',
  youTitle: 'You are', you: [['He', 'addressed as a man'], ['She', 'addressed as a woman']],
});

const contact = (sc, id, { chat, events = [] }) => {
  const c = sc.side.find(x => x.id === id);
  if (!c) return;
  c.chat = chat;
  c.events = [...(c.events || []), ...events];
};

// ───────────────────────────── PT · CHEFE ─────────────────────────────
contact(PT.chefe, 'mae', { chat: ['Ai que bom que você respondeu ❤️', 'Tá comendo direito? Fala a verdade.', 'Esse seu chefe não tem limite, né? Vou rezar por ele. E por você.', 'Domingo que vem você vem almoçar. Não aceito não.', 'Te amo, viu. Desliga esse computador.'] });
contact(PT.chefe, 'fam', {
  chat: ['Tio Beto: 👍', 'Tia Cida: Que bênção ver você no grupo! 🌻', 'Primo Júnior: kkkkk', 'Tio Beto: [figurinha de bom dia com gato]', 'Vó Lurdes: quem é essa pessoa no grupo?'],
  events: [
    E(['Tia Cida: E aí, quando sai o casamento? 💍', 'Tia Cida: Sua prima já tá no segundo filho'],
      ['Ainda não, tia', -3, 0, 'Tia Cida: O tempo passa, hein. Tic tac ⏰'],
      ['Quando a tia parar de perguntar', 5, 0, 'Tio Beto: KKKKKKKKK', 'Tia Cida: Não achei graça.'],
      ['[sair do grupo]', 6, 0, { sys: 'Tio Beto adicionou você de volta' }, 'Tio Beto: saiu sem querer né']),
  ],
});
contact(PT.chefe, 'pelada', {
  chat: ['Fabinho: e aí, vai ou não vai?', 'Marcão: quem trouxer a bola joga de linha', 'Fabinho: quinta 20h, sem atraso', 'Dudu: alguém tem colete laranja?', 'Marcão: confirmados: 9. falta 1'],
  events: [
    E(['Marcão: alguém tem notícia do Gui? Sumiu desde que virou gerente', 'Marcão: igual você tá ficando'],
      ['Tô vivo, só trabalhando muito', -3, 0, 'Marcão: trabalhar demais dá cãibra na alma'],
      ['Quinta eu volto, prometo', 6, 0, 'Fabinho: printei. vai ter que vir'],
      ['O Gui virou o chefe dele', 2, 0, 'Dudu: o ciclo da vida kkkk']),
    E(['Fabinho: votação: churrasco depois da pelada?', 'Fabinho: cada um leva 1kg de carne'],
      ['Bora! 🍖', 6, 0, 'Marcão: aprovado. você leva a picanha'],
      ['Tô duro esse mês', -2, 0, 'Fabinho: leva o carvão então'],
      ['Depende do meu chefe', -4, 0, 'Dudu: seu chefe manda até no seu churrasco? 💀']),
  ],
});
contact(PT.chefe, 'cond', {
  chat: ['Síndico: Mensagem recebida. Será discutida em assembleia.', 'Síndico: Favor respeitar o horário de silêncio.', 'Dona Neide (302): Eu ouvi tudo, viu.', 'Síndico: Lembramos que é proibido estender roupa na sacada.'],
  events: [
    E(['Síndico: Assembleia extraordinária amanhã às 7h sobre "barulho de teclado e suspiros após 22h".'],
      ['Estarei lá', -5, 0, 'Síndico: Traga sua defesa por escrito.'],
      ['Suspiros??', 3, 0, 'Dona Neide (302): Você suspira muito alto. Tá tudo bem aí?'],
      ['Não vou', 0, 0, 'Síndico: Sua ausência será interpretada como confissão.']),
  ],
});
contact(PT.chefe, 'banco', {
  chat: ['Banco Laranja: Não entendemos sua mensagem 🧡 Digite 1 para falar com um atendente.', 'Banco Laranja: Seu atendimento foi encerrado por inatividade 🧡', 'Banco Laranja: Que tal um empréstimo pré-aprovado de R$ 50.000? 🧡', 'Banco Laranja: Avalie nosso atendimento de 1 a 5 🧡'],
  events: [
    E(['Banco Laranja: Você tem um limite pré-aprovado de R$ 15.000 🧡', 'Banco Laranja: Juros de só 14,9% ao mês'],
      ['Aceito!', -10, 0, 'Banco Laranja: Parabéns! Primeira parcela vence amanhã 🧡'],
      ['14,9% ao MÊS??', 4, 0, 'Banco Laranja: É o preço da liberdade financeira 🧡'],
      ['Não, obrigad{p:o|a}', 2, 0, 'Banco Laranja: Tudo bem. Vamos perguntar de novo em 5 minutos 🧡']),
  ],
});
contact(PT.chefe, 'ex', { chat: ['kkkk você não muda', 'saudade das nossas conversas sem chefe no meio', 'tá bom, vou deixar você trabalhar. ou não 👀', 'lembrei de você ouvindo aquela música hoje'] });

// ───────────────────────────── PT · RELACIONAMENTO ─────────────────────────────
contact(PT.love, 'carol', { chat: ['LARGA ESSE CELULAR 😤', 'Tô do seu lado, viu? Sempre 💜', 'Quer que eu vá aí no banheiro te buscar?', 'Você merece alguém que te deixe curtir em paz.', 'Vem dançar que vai tocar aquela!'] });
contact(PT.love, 'lucas', { chat: ['VEM PRO BOLO 🎂', 'Você é a melhor pessoa dessa festa, sabia? (tô bêbado)', 'Larga o celular e vem cantar comigo', 'Te amo, {p:amigo|amiga} 🥹', 'Quem tá te mandando mensagem? É {name}, né?'] });
contact(PT.love, 'mae', { chat: ['Juízo, hein ❤️', 'Me avisa quando chegar, tá?', 'Você tá feliz, {p:filho|filha}? Fala a verdade.', 'Amanhã vem almoçar aqui ❤️'] });
contact(PT.love, 'role', {
  chat: ['Fabinho: kkkkkkk', 'Bia: quem pegou meu carregador', 'Fabinho: alguém sabe onde fica o banheiro', 'Bia: o Lucão tá subindo na mesa de novo', 'Rolê: [vídeo do Lucão chorando no karaokê]'],
  events: [
    E(['Bia: gente, quem vai no after?', 'Bia: lá em casa, tem pizza'],
      ['Eu vou! 🍕', 8, 0, 'Bia: ÊÊÊ'],
      ['Preciso ver com {name}', -6, 0, 'Fabinho: lá vem…', 'Bia: 😐'],
      ['Tô {p:morto|morta} de cansaço', 0, 0, 'Bia: fraco. mas respeito']),
    E(['Fabinho: votação: foto do grupo agora ou depois de mais uma rodada?'],
      ['Agora! 📸', 6, 0, 'Fabinho: vem pra cá que a luz tá boa'],
      ['Não posso sair em foto', -6, 0, 'Bia: pq?? é {name} que não deixa né', 'Bia: ah, {p:amigo|amiga}…'],
      ['Depois de mais uma', 4, 0, 'Fabinho: sábia decisão 🍻']),
  ],
});
contact(PT.love, 'sogra', { chat: ['Hum.', 'Vou falar com {name} sobre isso.', 'Na minha época as pessoas respeitavam mais.', '{name} merece alguém que esteja em casa num sábado.'] });

// ───────────────────────────── EN · BOSS ─────────────────────────────
contact(EN.chefe, 'mom', { chat: ['Aw, so glad you answered ❤️', 'Are you eating? Be honest.', 'That boss of yours has no limits. I\'ll pray for him. And you.', 'You\'re coming for dinner Sunday. No excuses.', 'Love you. Close that laptop.'] });
contact(EN.chefe, 'ff', {
  chat: ['Dave: lmaooo', 'Mike: trade offer: my kicker for your RB', 'Dave: you\'re 0-6 {p:bro|girl}', 'Chris: who\'s doing the draft party next year', 'Dave: [gif of a crying QB]'],
  events: [
    E(['Dave: last place has to do the SAT again. league rules', 'Dave: you\'re in last btw'],
      ['I\'ll take the SAT', -4, 0, 'Dave: legend. we\'re livestreaming it'],
      ['Trading my whole roster tonight', 4, 0, 'Mike: I\'ll give you a punter and a hug'],
      ['My boss owns my Sundays', -2, 0, 'Chris: {p:bro|girl} that\'s not a fantasy problem, that\'s a life problem']),
  ],
});
contact(EN.chefe, 'room', {
  chat: ['Roommate: k', 'Roommate: did you take out the trash', 'Roommate: venmo request incoming', 'Roommate: why is your light still on it\'s midnight'],
  events: [
    E(['Roommate: your typing is so loud I can hear it through the wall', 'Roommate: are you ok in there?'],
      ['Work emergency', -3, 0, 'Roommate: on a Sunday? quit lol'],
      ['Sorry, typing softer', 0, 0, 'Roommate: now you\'re typing angrily softer'],
      ['Not really', 6, 0, 'Roommate: want some leftover pizza? I\'m up']),
  ],
});
contact(EN.chefe, 'hr', {
  chat: ['HR: Thanks for reaching out! A team member will respond within 5–7 business days 💜', 'HR: Have you tried our wellness app? 💜', 'HR: We hear you! (We are not able to act on this.) 💜'],
  events: [
    E(['HR: Reminder: Wellness Week starts tomorrow! 💜', 'HR: Mandatory 6am meditation in the office'],
      ['Can\'t wait 💜', -8, 3, 'HR: Love that! Attendance is tracked 💜'],
      ['Mandatory meditation??', 3, 0, 'HR: Relaxation is a team effort 💜'],
      ['Can I meditate at home?', 0, -2, 'HR: Remote wellness is not supported at this time 💜']),
  ],
});
contact(EN.chefe, 'land', {
  chat: ['Landlord: 👍', 'Landlord: Also the dryer is broken. Fixing it next month. Maybe.', 'Landlord: Reminder: rent is due on the 1st. It\'s the 3rd.', 'Landlord: Please stop flushing at night, the pipes are old.'],
  events: [
    E(['Landlord: The building is going "luxury". New rent: $3,400.', 'Landlord: Comes with a rooftop. Rooftop not built yet.'],
      ['I\'ll renew', -10, 0, 'Landlord: Great choice! Rooftop ETA: 2029.'],
      ['$3,400??', 4, 0, 'Landlord: It\'s the market. I don\'t make the rules. I just raise them.'],
      ['I\'m moving out', 6, 0, 'Landlord: Sad to see you go! Deposit will be returned in 6–8 months.']),
  ],
});
contact(EN.chefe, 'ex', { chat: ['lol you haven\'t changed', 'miss talking to you without a boss in the middle', 'ok I\'ll let you work. or not 👀', 'heard our song today and thought of you'] });

// ───────────────────────────── EN · RELATIONSHIP ─────────────────────────────
contact(EN.love, 'jess', { chat: ['GET OFF YOUR PHONE 😤', 'I\'m on your side, always 💜', 'Want me to come get you from the bathroom?', 'You deserve someone who lets you have fun in peace.', 'Come dance, they\'re playing our song!'] });
contact(EN.love, 'tyler', { chat: ['CAKE TIME 🎂', 'you\'re the best person at this party (I\'m drunk)', 'drop the phone and come sing with me', 'love you man 🥹', 'who\'s texting you? it\'s {name} isn\'t it'] });
contact(EN.love, 'mom', { chat: ['Be careful ❤️', 'Text me when you\'re home, ok?', 'Are you happy, honey? Be honest.', 'Come over for brunch tomorrow ❤️'] });
contact(EN.love, 'squad', {
  chat: ['Squad: lmaooo', 'Squad: who took my charger', 'Squad: where\'s the bathroom', 'Squad: Tyler is on the table again', 'Squad: [video of Tyler crying at karaoke]'],
  events: [
    E(['Squad: who\'s coming to the after party?', 'Squad: my place, there\'s pizza'],
      ['I\'m in! 🍕', 8, 0, 'Squad: LET\'S GO'],
      ['Need to check with {name}', -6, 0, 'Squad: here we go…', 'Squad: 😐'],
      ['I\'m exhausted', 0, 0, 'Squad: weak. but respect']),
    E(['Squad: vote: group pic now or after one more round?'],
      ['Now! 📸', 6, 0, 'Squad: come here, the lighting is good'],
      ['I can\'t be in pics', -6, 0, 'Squad: why?? is it {name}?', 'Squad: oh babe…'],
      ['After one more', 4, 0, 'Squad: wise 🍻']),
  ],
});
contact(EN.love, 'inlaw', { chat: ['Hmm.', 'I\'ll be talking to {name} about this.', 'In my day people had more respect.', '{name} deserves someone who stays home on a Saturday.'] });
