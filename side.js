'use strict';
// Conversas paralelas que dá pra responder (events por contato) + final do dia (daily) por cenário.
// Efeito das respostas: [texto, sanidade, moral(chefe), ...reação]. Moral quase sempre 0: é vida paralela.

const sideEvents = (sc, map) => { for (const [id, evs] of Object.entries(map)) { const c = sc.side.find(x => x.id === id); if (c) c.events = evs } };

// ───────────────────────────── PT ─────────────────────────────
Object.assign(PT.ui, {
  sideNags: ['??', 'Oi?', 'Visualizou, né', 'Responde quando puder', 'Tá aí?'],
  sideFree: ['Hm, tá bom.', 'Entendi. Depois a gente se fala.', '😅', 'Ok!', 'Tá certo então.'],
  dailyLabel: 'Final secreto de hoje',
  daily: {
    emoji3: 'responda {first} 3 vezes só com emoji',
    sorry3: 'peça desculpa 3 vezes',
    shout2: 'perca a paciência no CAPS LOCK 2 vezes',
    q3: 'responda 3 vezes com outra pergunta',
    love2: 'diga "te amo" 2 vezes pra {first}',
    ghost: 'deixe {first} te cobrar até cansar, sem responder nada',
    side4: 'responda 4 conversas paralelas',
    zen: 'chegue ao fim com sanidade 80 ou mais',
  },
});

sideEvents(PT.chefe, {
  mae: [
    E(['Meu amor, tá acordad{p:o|a} ainda?', 'Amanhã tem trabalho, hein'],
      ['Tô trabalhando, mãe', 2, 0, 'Domingo, essa hora?? Esse {first} não tem mãe não?'],
      ['Já vou dormir, te amo ❤️', 8, 0, 'Também te amo. Dorme com Deus 🙏'],
      ['Mãe, vai dormir', -3, 0, 'Tá bom. Só queria saber se você tá bem. Boa noite.']),
    E(['Te mandei um vídeo do padre falando sobre ansiedade 🙏', 'Assiste, é rapidinho. 47 minutos.'],
      ['Vejo amanhã, mãe', 3, 0, 'Amanhã você esquece. Te conheço.'],
      ['Assisti, gostei muito ❤️', 5, 0, 'Assistiu em 4 segundos? Hmm. Tá bom 😊'],
      ['Mãe, eu tô trabalhando', -2, 0, 'Por isso mesmo que eu mandei 🙏']),
    E(['Vem almoçar domingo que vem?', 'Vou fazer lasanha 🍝'],
      ['Vou sim! ❤️', 8, 0, 'Oba! Traz refrigerante. E traz alguém, hein, tô ficando velha.'],
      ['Depende do trabalho', -5, 0, 'Trabalho, trabalho. Um dia você vai sentir falta da minha lasanha.'],
      ['Só se tiver pudim', 6, 0, 'Pudim tem. Juízo eu já não sei 😄']),
  ],
  fam: [
    E(['Tia Cida: Bom dia família abençoada 🌻🙏', '(são 23h52)'],
      ['Bom dia, tia! 🌻', 3, 0, 'Tia Cida: Que lindo ver os jovens acordados cedo! Deus abençoe 🙏'],
      ['Tia, é quase meia-noite', -2, 0, 'Tia Cida: Bom dia é estado de espírito 🌻'],
      ['[manda figurinha de café]', 4, 0, 'Tio Beto: [manda figurinha de café maior ainda]']),
    E(['Tio Beto: alguém sabe mexer em impressora? A minha só imprime em rosa', 'Tio Beto: @você você que mexe com computador'],
      ['Amanhã eu passo aí, tio', -5, 0, 'Tio Beto: 7h então. Traz pão.'],
      ['Desliga e liga de novo', 4, 0, 'Tio Beto: FUNCIONOU!!! Gênio da família 🏆'],
      ['Não mexo com impressora, tio', -2, 0, 'Tio Beto: Estudou tanto pra quê, então?']),
  ],
  pelada: [
    E(['Quinta tem pelada? Precisamos de goleiro 🧤'],
      ['Topo! Preciso extravasar', 8, 0, 'Fechou! Traz a bola. E os R$ 25 do mês passado.'],
      ['Não dá, muito trabalho', -3, 0, 'Trabalho de novo? Vai virar igual seu chefe, hein.'],
      ['Só se eu jogar na linha', 3, 0, 'Tá. Mas aí o campo é por sua conta.']),
  ],
  cond: [
    E(['Síndico: Informamos que o barulho de teclado após 22h está incomodando o 302.', 'Síndico: Favor digitar com mais delicadeza.'],
      ['Desculpa, vou digitar baixinho', -3, 0, 'Síndico: Agradecemos a colaboração. O 302 também.'],
      ['Teclado não faz barulho', 0, 0, 'Síndico: O 302 discorda. Advertência registrada.'],
      ['O 302 ouve pagode até 3h', 5, 0, 'Síndico: Isso será tratado na assembleia. Na qual você também não foi.']),
  ],
  banco: [
    E(['Banco Laranja: Identificamos uma compra de R$ 89,90 em "CURSO MINDSET DE ABUNDANCIA". Foi você?'],
      ['Não fui eu!!', -5, 0, 'Banco Laranja: Cartão bloqueado. Um novo chega em 15 dias úteis 🧡'],
      ['Fui eu sim… 😔', 2, 0, 'Banco Laranja: Compra confirmada. Desejamos muita abundância 🧡'],
      ['Deve ter sido meu chefe', 3, 0, 'Banco Laranja: Não entendemos. Mas registramos 🧡']),
  ],
  ex: [
    E(['oi… tá acordad{p:o|a}?', 'lembrei de você'],
      ['Oi… 👀', -8, 0, 'que bom que respondeu. ainda trabalha naquela firma tóxica? 😬'],
      ['[visualizar e não responder]', 8, 0, '…'],
      ['Tô trabalhando', 0, 0, 'domingo? você não mudou nada kkk']),
    E(['vi que você tá online', 'tá tudo bem? você parece com sono nas fotos'],
      ['Tô numa ótima fase!', -3, 0, 'ótima fase domingo 23h trabalhando? sei 😏'],
      ['[bloquear]', 10, 0, { sys: 'Você bloqueou este contato' }],
      ['Você também parece', 2, 0, 'touché']),
  ],
});

sideEvents(PT.love, {
  carol: [
    E(['Ei, {p:amigo|amiga}. Cadê você? Sumiu da pista 💃'],
      ['Tô no banheiro respondendo {name}', -5, 0, 'De novo?? É o aniversário do Lucão, não do seu relacionamento.'],
      ['Tô indo! 💃', 10, 0, 'ISSO!! Vem que vai tocar aquela!'],
      ['Só um minuto', 0, 0, 'Um minuto. Tô cronometrando ⏱️']),
    E(['Posso ser sincera?', 'Desde que você começou com {name}, nunca mais saiu com a gente.'],
      ['Você tem razão… 😔', -5, 0, 'Não tô brigando. Só sinto sua falta. Tô aqui, tá? 💜'],
      ['É fase, vai melhorar', -3, 0, 'É fase faz 2 anos, {p:amigo|amiga}.'],
      ['Me ajuda a sair dessa?', 12, 0, 'SEMPRE. Amanhã eu passo aí e a gente conversa. Hoje: dança 💜']),
    E(['Quer que eu responda {name} por você? 😈'],
      ['Pelo amor de Deus, não', -2, 0, 'Tá bom. Eu ia mandar só um "ok." 😇'],
      ['Responde! 😂', 6, 0, 'Mandei: "tô dançando, depois falo". Respira.'],
      ['Me dá um abraço', 10, 0, 'Vem cá 🫂']),
  ],
  lucas: [
    E(['CADÊ VOCÊ? VAI TER PARABÉNS AGORA 🎂', 'Se você não vier eu choro'],
      ['Tô indo!! 🎉', 8, 0, 'TE AMO! Vem que o bolo é de brigadeiro'],
      ['Já vou, só respondendo uma coisa', -3, 0, 'É {name} de novo, né? 😒'],
      ['Canta sem mim, tô no banheiro', -5, 0, 'Vou mandar o vídeo pra você ver o que perdeu']),
    E(['Sério, tá tudo bem?', 'Você tá com uma cara…'],
      ['Tá tudo ótimo!', -5, 0, 'Tá. Se precisar, tô aqui. Bêbado, mas aqui.'],
      ['Mais ou menos…', 6, 0, 'Vem pra varanda que a gente conversa. Levo uma cerveja.'],
      ['É {name} de novo', 4, 0, 'Eu sabia. Vem cá, hoje é dia de festa, não de interrogatório.']),
  ],
  mae: [
    E(['Tá tudo bem aí, {p:filho|filha}?', 'Volta de Uber, viu. Não pega carona com quem bebeu'],
      ['Tá tudo bem, mãe ❤️', 5, 0, 'Graças a Deus. Me avisa quando chegar 🙏'],
      ['Mais ou menos, mãe', 3, 0, 'Quer que eu te busque? Vou de pijama mesmo.'],
      ['Mãe, tô na festa', -2, 0, 'Por isso mesmo que eu tô perguntando!']),
    E(['{name} me ligou perguntando onde você tava 😕', 'Tá tudo bem entre vocês?'],
      ['Tá sim, mãe', -6, 0, 'Hum. Tá bom. Mas mãe sente as coisas, viu.'],
      ['Não sei, mãe…', 8, 0, 'Amanhã vem almoçar aqui. Só você. A gente conversa ❤️'],
      ['Por que {name} ligou pra você??', -4, 0, 'Também achei estranho. Às 23h50.']),
  ],
  role: [
    E(['Rolê: alguém viu a comanda do Fabinho?', 'Rolê: e quem vai rachar o Uber depois?'],
      ['Eu racho!', 3, 0, 'Fechou. Somos 6 num Uber de 4. Clássico.'],
      ['Vou embora mais cedo', -3, 0, 'Lá vem… 🙄'],
      ['[manda figurinha]', 2, 0, 'Rolê: kkkkkk']),
  ],
  sogra: [
    E(['{name} me ligou chorando.', 'Você podia ter mais consideração, né?'],
      ['Desculpa, vou resolver', -10, 0, 'Bom. Eu sabia que você ia entender. Família é isso.'],
      ['Eu só tô num aniversário', 3, 0, 'Aniversário. Sei. No meu tempo a gente não precisava de festa.'],
      ['[visualizar e não responder]', 6, 0, 'Vi que você visualizou.']),
    E(['Domingo tem almoço aqui. Você vem, né?', 'Faço questão.'],
      ['Vou sim!', -5, 0, 'Ótimo. Traz sobremesa. Não aquela do mês passado.'],
      ['Domingo é almoço na minha mãe', -3, 0, 'Ah, sua mãe. Claro. Sempre ela.'],
      ['Vou ver com {name}', 0, 0, '{name} já confirmou por você 🙂']),
  ],
});

PT.chefe.daily = {
  emoji3: { e: '🗿', t: 'Comunicação não-verbal', d: 'Depois do terceiro emoji, {first} desistiu de entender e te promoveu a "Head de Cultura". Ninguém sabe o que você faz. Nem você.' },
  sorry3: { e: '🙇', t: 'Desculpômetro estourado', d: 'Na terceira desculpa, {first} ficou com dó e mandou você dormir. Primeira vez na história da firma.' },
  shout2: { e: '📢', t: 'CAPS LOCK LIBERTADOR', d: 'O segundo grito vazou no grupo da firma. Metade da equipe reagiu com 👏. Você virou líder sindical sem querer.' },
  q3: { e: '❓', t: 'Método socrático', d: 'Na terceira pergunta, {first} percebeu que não sabia o que queria. Cancelou a reunião. Você dormiu 7 horas.' },
  love2: { e: '💘', t: 'Climão corporativo', d: '"Te amo" duas vezes pra chefia. {first} te deu folga amanhã só pra não ter que olhar na sua cara.' },
  ghost: { e: '👻', t: 'Fantasma profissional', d: 'Você deixou {first} falando sozinh{o}. A apresentação foi parar no colo do estagiário. O estagiário pediu demissão.' },
  side4: { e: '🤹', t: 'Multitarefa nível mãe', d: 'Respondeu mãe, grupo, banco e ex enquanto segurava {first}. O LinkedIn te sugeriu uma vaga de controlador de tráfego aéreo.' },
  zen: { e: '🧘', t: 'Monge do home office', d: 'Você terminou a noite com a sanidade intacta. {first} ficou tão desconcertad{o} com sua calma que foi procurar terapia.' },
};
PT.love.daily = {
  emoji3: { e: '🗿', t: 'Só emoji', d: '{name} tentou interpretar seus 3 emojis por 40 minutos, desistiu e foi dormir. Você ganhou 40 minutos de paz.' },
  sorry3: { e: '🙇', t: 'Desculpa profissional', d: 'Na terceira desculpa, {name} soltou um "tá, eu também exagerei". Isso nunca tinha acontecido. Você printou.' },
  shout2: { e: '📢', t: 'Grito de liberdade', d: 'O segundo CAPS LOCK saiu tão alto que o pagode inteiro ouviu. O Lucão subiu na mesa e puxou o coro. Você terminou no microfone.' },
  q3: { e: '❓', t: 'Interrogatório reverso', d: 'Você respondeu tudo com pergunta. {name} ficou tão confus{o} que esqueceu por que tava brav{o}.' },
  love2: { e: '💘', t: 'Love bombing reverso', d: 'Dois "te amo" seguidos deixaram {name} desconfiad{o}: "O que você aprontou?". Mas pelo menos parou de perguntar {do primo|da prima}.' },
  ghost: { e: '👻', t: 'Visualizou e não respondeu', d: 'Você fez com {name} o que {name} sempre faz com você. Vieram 47 mensagens e um "ok." final. Pela primeira vez, quem tá de boa é você.' },
  side4: { e: '🤹', t: 'Vida social existe', d: 'Você respondeu amiga, mãe, aniversariante e grupo. Lembrou que tem gente que gosta de você sem planilha.' },
  zen: { e: '🧘', t: 'Inabalável', d: 'Sanidade intacta até o fim. {name} percebeu que a chantagem não funciona mais. Agora tá tentando com a sua mãe.' },
};

// ───────────────────────────── EN ─────────────────────────────
Object.assign(EN.ui, {
  sideNags: ['??', 'hello?', 'saw you read that', 'answer when you can', 'you there?'],
  sideFree: ['Ok!', 'Got it. Talk later.', '😅', 'Hm, ok.', 'Alright then.'],
  dailyLabel: 'Today\'s secret ending',
  daily: {
    emoji3: 'reply to {first} 3 times with only emojis',
    sorry3: 'say sorry 3 times',
    shout2: 'lose it in CAPS LOCK twice',
    q3: 'answer 3 times with another question',
    love2: 'say "love you" to {first} twice',
    ghost: 'let {first} ping you until they give up, without answering',
    side4: 'answer 4 side conversations',
    zen: 'finish with 80+ sanity',
  },
});

sideEvents(EN.chefe, {
  mom: [
    E(['Honey, are you still up?', 'You have work tomorrow!'],
      ['Working, Mom', 2, 0, 'On a Sunday?? Does this {first} not have a mother?'],
      ['Going to bed, love you ❤️', 8, 0, 'Love you too. Sleep tight 🙏'],
      ['Mom, go to sleep', -3, 0, 'Ok. Just wanted to know you\'re ok. Night.']),
    E(['Sent you a video about anxiety from my yoga teacher 🙏', 'It\'s short. 47 minutes.'],
      ['I\'ll watch tomorrow', 3, 0, 'You won\'t. I know you.'],
      ['Watched it, loved it ❤️', 5, 0, 'In 4 seconds? Hmm. Ok 😊'],
      ['Mom, I\'m working', -2, 0, 'That\'s exactly why I sent it 🙏']),
    E(['Are you coming home for Thanksgiving?', 'I\'m making the green bean casserole 🦃'],
      ['Wouldn\'t miss it ❤️', 8, 0, 'Yay! And bring someone, I\'m getting old.'],
      ['Depends on work', -5, 0, 'Work, work. One day you\'ll miss my casserole.'],
      ['Only if there\'s pie', 6, 0, 'There\'s pie. And questions about your love life 😄']),
  ],
  ff: [
    E(['Dave: who\'s starting a kicker at flex lmao', 'Dave: @you you\'re 0-6 btw'],
      ['Trading my whole team rn', 4, 0, 'Dave: I\'ll give you a used water bottle for your RB'],
      ['No time, work', -3, 0, 'Dave: {p:bro|girl} your boss owns you'],
      ['[send a gif]', 3, 0, 'Dave: 💀']),
  ],
  room: [
    E(['Roommate: did you eat my leftover pad thai', 'Roommate: it had my name on it'],
      ['Yes. Sorry. Stress eating', 3, 0, 'Roommate: understandable. Venmo me $14'],
      ['No??', -2, 0, 'Roommate: the fork is in YOUR room'],
      ['I\'ll buy you two', 2, 0, 'Roommate: deal. Extra spring rolls']),
  ],
  hr: [
    E(['HR: Quick pulse survey! On a scale of 1–10, how supported do you feel by leadership? 💜', '(anonymous*)'],
      ['10!', -6, 2, 'HR: Love that! Your manager has been notified of your enthusiasm 💜'],
      ['3', 4, -5, 'HR: Thanks for your honesty! Your manager has been notified 💜'],
      ['What does the asterisk mean?', 0, 0, 'HR: 💜']),
  ],
  land: [
    E(['Landlord: Hi! Coming by tomorrow at 8am to "check the vibe" 🙏'],
      ['Sure, no problem', -5, 0, 'Landlord: Great! Also rent is going up. Vibes are expensive.'],
      ['I need 24h notice', 4, 0, 'Landlord: This IS notice. It\'s 9 hours. Close enough!'],
      ['I won\'t be home', 0, 0, 'Landlord: That\'s fine, I have a key 🙂']),
  ],
  ex: [
    E(['u up?', 'thought about you'],
      ['hey… 👀', -8, 0, 'glad you answered. still at that toxic job? 😬'],
      ['[leave on read]', 8, 0, '…'],
      ['working', 0, 0, 'on a Sunday? you haven\'t changed lol']),
    E(['saw you\'re online', 'you ok? you look exhausted in your pics'],
      ['Thriving, actually!', -3, 0, 'thriving at 11pm on a Sunday at work? sure 😏'],
      ['[block]', 10, 0, { sys: 'You blocked this contact' }],
      ['So do you', 2, 0, 'touché']),
  ],
});

sideEvents(EN.love, {
  jess: [
    E(['Hey. Where are you? You vanished from the dance floor 💃'],
      ['Bathroom, texting {name}', -5, 0, 'AGAIN?? It\'s Tyler\'s birthday, not your relationship\'s.'],
      ['Coming! 💃', 10, 0, 'YES!! They\'re about to play our song!'],
      ['Just a minute', 0, 0, 'One minute. I\'m timing it ⏱️']),
    E(['Can I be honest?', 'Since you started dating {name}, you never hang out with us.'],
      ['You\'re right… 😔', -5, 0, 'Not fighting. I just miss you. I\'m here, ok? 💜'],
      ['It\'s a phase', -3, 0, 'It\'s been a phase for 2 years, babe.'],
      ['Help me get out of this?', 12, 0, 'ALWAYS. Brunch tomorrow, we\'ll talk. Tonight: dance 💜']),
    E(['Want me to text {name} for you? 😈'],
      ['God, no', -2, 0, 'Fine. I was only going to send "k." 😇'],
      ['Do it 😂', 6, 0, 'Sent: "dancing, talk later". Breathe.'],
      ['I need a hug', 10, 0, 'Come here 🫂']),
  ],
  tyler: [
    E(['WHERE ARE YOU WE\'RE DOING CAKE 🎂', 'If you don\'t come I\'ll cry'],
      ['Coming!! 🎉', 8, 0, 'LOVE YOU! It\'s funfetti'],
      ['One sec, replying to something', -3, 0, 'It\'s {name} again isn\'t it 😒'],
      ['Sing without me, I\'m in the bathroom', -5, 0, 'Sending you the video so you see what you missed']),
    E(['Seriously, you ok?', 'You look… stressed'],
      ['Totally fine!', -5, 0, 'Ok. I\'m here if you need. Drunk, but here.'],
      ['Not really…', 6, 0, 'Meet me on the patio. I\'ll bring you a drink.'],
      ['It\'s {name} again', 4, 0, 'Knew it. Come here. It\'s a party, not an interrogation.']),
  ],
  mom: [
    E(['Everything ok, honey?', 'Take an Uber home, don\'t ride with anyone who\'s been drinking'],
      ['All good, Mom ❤️', 5, 0, 'Thank God. Text me when you\'re home 🙏'],
      ['Kind of…', 3, 0, 'Want me to come get you? I\'ll come in my pajamas.'],
      ['Mom, I\'m at a party', -2, 0, 'That\'s exactly why I\'m asking!']),
    E(['{name} called me asking where you were 😕', 'Is everything ok with you two?'],
      ['Yeah, Mom', -6, 0, 'Hmm. Ok. But moms can tell, you know.'],
      ['I don\'t know, Mom…', 8, 0, 'Come for brunch tomorrow. Just you. We\'ll talk ❤️'],
      ['Why did {name} call YOU??', -4, 0, 'I thought it was weird too. At 11:50pm.']),
  ],
  squad: [
    E(['Squad: who has Tyler\'s card', 'Squad: and who\'s splitting the Uber'],
      ['I\'ll split!', 3, 0, 'Squad: 6 of us in an Uber for 4. Classic.'],
      ['I\'m leaving early', -3, 0, 'Squad: here we go… 🙄'],
      ['[send a gif]', 2, 0, 'Squad: lmaooo']),
  ],
  inlaw: [
    E(['Hi sweetie. {name} called me crying.', 'You could be more considerate, you know.'],
      ['Sorry, I\'ll fix it', -10, 0, 'Good. I knew you\'d understand. That\'s family.'],
      ['I\'m just at a birthday party', 3, 0, 'A party. Sure. In my day we didn\'t need parties.'],
      ['[leave on read]', 6, 0, 'I see you read that.']),
    E(['Sunday dinner at our place. You\'re coming, right?', 'I insist.'],
      ['Of course!', -5, 0, 'Great. Bring dessert. Not the one from last time.'],
      ['Sunday is dinner with my family', -3, 0, 'Oh, your family. Of course. Always them.'],
      ['I\'ll check with {name}', 0, 0, '{name} already said yes for you 🙂']),
  ],
});

EN.chefe.daily = {
  emoji3: { e: '🗿', t: 'Non-verbal communication', d: 'After your third emoji, {first} gave up and promoted you to "Head of Culture". Nobody knows what you do. Including you.' },
  sorry3: { e: '🙇', t: 'Apology overflow', d: 'On your third sorry, {first} felt bad and told you to go to bed. A first in company history.' },
  shout2: { e: '📢', t: 'LIBERATING CAPS LOCK', d: 'Your second scream leaked into #general. Half the team reacted 👏. You accidentally started a union.' },
  q3: { e: '❓', t: 'Socratic method', d: 'By your third question, {first} realized they had no idea what they wanted. Meeting canceled. You slept 7 hours.' },
  love2: { e: '💘', t: 'HR incident', d: 'Two "love you"s to your boss. {first} gave you tomorrow off just to avoid eye contact.' },
  ghost: { e: '👻', t: 'Professional ghost', d: 'You left {first} on read on purpose. The deck went to the intern. The intern quit.' },
  side4: { e: '🤹', t: 'Multitasking legend', d: 'You handled Mom, the league, your roommate and HR while holding off {first}. LinkedIn suggested you for air traffic control.' },
  zen: { e: '🧘', t: 'Remote work monk', d: 'You ended the night with your sanity intact. {first} was so unsettled by your calm they booked a therapist.' },
};
EN.love.daily = {
  emoji3: { e: '🗿', t: 'Emoji only', d: '{name} spent 40 minutes decoding your 3 emojis, gave up and went to bed. You got 40 minutes of peace.' },
  sorry3: { e: '🙇', t: 'Professional apologizer', d: 'On your third sorry, {name} said "ok, I overreacted too". That had never happened. You screenshotted it.' },
  shout2: { e: '📢', t: 'Freedom scream', d: 'Your second CAPS LOCK was so loud the whole bar heard. Tyler stood on a table and started a chant. You broke up into the karaoke mic.' },
  q3: { e: '❓', t: 'Reverse interrogation', d: 'You answered everything with a question. {name} got so confused they forgot why they were mad.' },
  love2: { e: '💘', t: 'Reverse love bombing', d: 'Two "love you"s in a row made {name} suspicious: "what did you do?". But at least they stopped asking about the cousin.' },
  ghost: { e: '👻', t: 'Left on read', d: 'You did to {name} what {name} always does to you. 47 texts and a final "k." For once, you\'re the calm one.' },
  side4: { e: '🤹', t: 'Social life exists', d: 'You answered your bestie, your mom, the birthday boy and the group. Remembered people like you without a spreadsheet.' },
  zen: { e: '🧘', t: 'Unshakeable', d: 'Sanity intact till the end. {name} realized the guilt trips don\'t work anymore. Now they\'re trying it on your mom.' },
};

// ───────── Xingamentos: reações por cenário, 3 versões do final "Mandou a real", voz dos personagens ─────────
Object.assign(PT.chefe.free, {"swear": ["Olha a boca. Isso aqui é um ambiente profissional. Às 23h. No zap.", "Vou fingir que o corretor te traiu.", "Palavrão não entrega slide.", "Calma. Respira. Agora volta pro slide 12.", "Anotado: dificuldade de comunicação não-violenta."], "insult1": ["Como é que é??", "Vou printar e mandar pro RH. Brincadeira. Não é brincadeira.", "Vou considerar que foi o cansaço falando. Uma vez.", "Uau. Vou guardar esse print com carinho pra sua avaliação.", "Você sabe que eu tenho acesso ao seu ponto, né?", "Nossa. Depois de tudo que eu fiz por você. Tipo te dar trabalho.", "Vou fingir que não li. Mas eu li. E printei. E encaminhei.", "Isso foi pra mim ou pro grupo da família? Porque se foi pra mim… 😶"], "insult2": ["Segunda vez. Na terceira, a conversa é com o RH.", "Último aviso. Respira e manda os slides.", "Já mandei o print pro diretor. Ele riu. Mas mandou anotar.", "Ok. Tô abrindo uma ocorrência. Título: \"Domingo\".", "Mais uma e eu te desligo. Do grupo e da empresa."]});
PT.chefe.endings.curse.d = ["Você disse o que todo mundo pensa. O print rodou em 14 grupos. {p:Desempregado|Desempregada}, mas lenda.", "Seu xingamento virou figurinha no grupo da firma. Desligamento às 9h01, ovação às 9h02.", "{first} encaminhou pro RH. O RH encaminhou pro jurídico. O jurídico encaminhou pro grupo de memes. Lenda ({p:desempregado|desempregada})."];
Object.assign(PT.love.free, {"swear": ["Olha a boca.", "Tá xingando por quê? Bebeu, né?", "Fala assim com o Lucão também?", "Nossa. Que agressividade. Vou printar.", "Isso foi pra mim??"], "insult1": ["Como é que é??", "Printei. Vou mandar pra sua mãe.", "Uau. Agora eu sei quem você é de verdade.", "Você nunca falou assim comigo. Foi a Carol que te ensinou?", "Tá vendo? Quem é {p:o tóxico|a tóxica} aqui é você.", "Nossa. Vou postar isso no story. Com música triste.", "Eu só queria saber onde você tava e você me trata assim??", "Você vai se arrepender disso. Amanhã. Às 7h. Quando eu te ligar."], "insult2": ["De novo?? Última chance antes de eu te bloquear.", "Mais uma e acabou. Dessa vez é sério. (das outras 14 também era)", "Já mandei print pra minha mãe, pra sua mãe e pro grupo das amigas.", "Ok. Tô indo aí. Agora.", "Vou contar até 3. Não, até 1. Pede desculpa."]});
PT.love.endings.curse.d = ["Bloqueio em 4 segundos. Primeira noite de paz em 2 anos.", "{name} printou tudo e postou no story. Os comentários? Todos do seu lado.", "Você soltou tudo que tava engasgado há 2 anos. O Lucão aplaudiu. A Carol chorou. Você dormiu como um bebê."];
Object.assign(EN.chefe.free, {"swear": ["Language. This is a professional environment. At 11pm. On Slack.", "I'll pretend autocorrect betrayed you.", "Profanity doesn't ship decks.", "Deep breath. Now back to slide 12.", "Noted: struggles with nonviolent communication."], "insult1": ["Excuse me??", "Screenshotting this for HR. Kidding. Not kidding.", "I'll assume that was the exhaustion talking. Once.", "Wow. Saving this for your performance review.", "You know I can see your badge swipes, right?", "After everything I've done for you. Like giving you work.", "I'll pretend I didn't read that. But I did. And forwarded it.", "Was that meant for me or your group chat? Because if it was for me… 😶"], "insult2": ["Second time. Third time it's a conversation with HR.", "Final warning. Breathe and send the deck.", "Forwarded to the VP. He laughed. But he took notes.", "Ok. I'm opening a ticket. Title: \"Sunday\".", "One more and you're offboarded. From Slack and from the company."]});
EN.chefe.endings.curse.d = ["The screenshot hit 14 group chats and r/antiwork. Unemployed, but a legend.", "Your message became a custom emoji in the company Slack. Fired at 9:01, worshipped at 9:02.", "{first} forwarded it to HR. HR forwarded it to Legal. Legal forwarded it to the meme channel. Legend."];
Object.assign(EN.love.free, {"swear": ["Language.", "Why are you swearing? Are you drunk?", "Do you talk like that to Tyler too?", "Wow. So aggressive. Screenshotting.", "Was that for me??"], "insult1": ["Excuse me??", "Screenshotted. Sending it to your mom.", "Wow. Now I know who you really are.", "You never talked to me like that. Did Jess teach you that?", "See? YOU'RE the toxic one.", "Posting this on my story. With a sad song.", "I just wanted to know where you were and you treat me like this??", "You'll regret this. Tomorrow. 7am. When I call you."], "insult2": ["Again?? Last chance before I block you.", "One more and we're done. For real this time. (it was for real the other 14 times too)", "Already sent screenshots to my mom, your mom and the group chat.", "Ok. I'm coming over. Now.", "I'm counting to 3. No, to 1. Apologize."]});
EN.love.endings.curse.d = ["Blocked in 4 seconds. First peaceful night in 2 years.", "{name} posted the screenshots. The comments? All on your side.", "You said everything you held in for 2 years. Tyler clapped. Jess cried. You slept like a baby."];
PT.ui.sideCurse = ["Olha a boca!", "Nossa. Que grosseria.", "Vou fingir que não li.", "Credo. Tá tudo bem?", "Não precisava disso, né?"];
EN.ui.sideCurse = ["Language!", "Wow. Rude.", "I'll pretend I didn't read that.", "Yikes. You ok?", "That was uncalled for."];
PT.chefe.variants[1].free.insult1 = ["Nossa. Vou orar por você. Com força 🙏", "Eu te dei emprego e você me fala isso? 💔🌷"];
PT.chefe.variants[2].free.insult1 = ["mano. isso é feedback? anotado", "pesado. mas respeito a sinceridade. vou levar pro board"];
PT.love.variants[1].free.insult1 = ["Pronto. Era isso que faltava pra eu desabar.", "Vou chorar até amanhã. Parabéns."];
PT.love.variants[2].free.insult1 = ["Ofensa registrada. -30 pontos.", "Isso vai pra aba \"violações graves\"."];
EN.chefe.variants[1].free.insult1 = ["Wow. I\'ll pray for you. Hard 🙏", "I gave you a job and you talk to me like that? 💔🌷"];
EN.chefe.variants[2].free.insult1 = ["{p:bro|girl}. that's a vibe check fail", "harsh. but radical candor. respect"];
EN.love.variants[1].free.insult1 = ["great. that's exactly what I needed to fall apart.", "I'll be crying till morning. congrats."];
EN.love.variants[2].free.insult1 = ["insult logged. -30 points.", "that goes in the \"serious violations\" tab."];

// ───────── Depois da reação ao xingamento: manipulação/ameaça (escalada sem encerrar o jogo) ─────────
PT.love.free.insultFollow = ["E depois eu que sou {o tóxico|a tóxica}.","Depois de tudo que eu fiz por você.","Já printei. Já mandei pro grupo das minhas amigas.","Ninguém nunca vai te aguentar como eu aguento.","Tô passando mal por sua causa. {p:Satisfeito|Satisfeita}?","Apaga essa mensagem. Agora. Eu espero.","Vou contar pra sua mãe como você fala comigo.","Amanhã a gente conversa. Às 7h. Antes do seu trabalho.","Você só fala assim porque bebeu. Ou porque tá com alguém aí.","Tudo bem. Vou postar uma indireta e você vai saber que é pra você."];
EN.love.free.insultFollow = ["and somehow I'M the toxic one.","after everything I've done for you.","already screenshotted. already sent it to my group chat.","nobody will ever put up with you like I do.","I feel sick because of you. happy now?","delete that message. now. I'll wait.","I'm telling your mom how you talk to me.","we'll talk tomorrow. 7am. before work.","you only talk like that because you're drunk. or because someone's next to you.","fine. I'm posting a subtweet and you'll know it's about you."];
PT.chefe.free.insultFollow = ["Sua avaliação de desempenho acabou de ficar muito interessante.","Amanhã 8h, na minha sala. Traz o crachá.","Vou fingir que foi o corretor. Pela última vez.","Mas e os slides? Vão sair quando?","Lembra que o RH me deve um favor.","Você sabe quantos currículos eu recebo por semana?","Interessante. O banco de horas acabou de zerar."];
EN.chefe.free.insultFollow = ["Your performance review just got very interesting.","My office. 8am. Bring your badge.","I'll pretend that was autocorrect. Last time.","Anyway. Where are the slides?","Remember HR owes me a favor.","Do you know how many résumés I get a week?","Interesting. Your PTO just got \"realigned\"."];
