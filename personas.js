'use strict';
// Personagens: cada partida sorteia um por cenário. Sobrescrevem opening/final/nags
// e somam eventos próprios (pool) ao pool compartilhado do cenário.
// npc.first = como o texto chama o NPC; npc.g = gênero do NPC ('o'/'a') pros sufixos {o}.

// ───────────────────────────── PT · CHEFE ─────────────────────────────
PT.chefe.variants = [
  { npc: PT.chefe.npc },
  { // Dona Márcia: doce na forma, cruel no conteúdo. Nunca grita; só deixa claro que você não basta.
    npc: () => ({ name: 'Márcia Albuquerque', first: 'Dona Márcia', g: 'a', av: 'MA', color: '#9d174d', role: 'Diretora de Operações' }),
    opening: E(['Boa noite, meu anjo 🌷', 'Dei uma olhadinha na apresentação. Fiquei um pouquinho… decepcionada. Mas a culpa é minha, eu que esperei demais.'],
      ['O que houve, Dona Márcia?', -5, 5, 'Nada, {p:querido|querida}. Você fez o que conseguiu. É que o que você consegue é pouco 🌷'],
      ['Decepcionada com o quê?', 0, -10, 'Não é o quê. É o todo. Mas descansa, eu arrumo sozinha. Como sempre.'],
      ['Vejo isso amanhã cedo', 5, -10, 'Claro. Descansa. Eu fico aqui com 61 anos fazendo o seu trabalho 🌷']),
    pool: [
      E(['Lembra que eu te contratei quando ninguém te queria? Só tô lembrando. Sem cobrança 🌷'],
        ['Lembro, sou {p:grato|grata}', -10, 10, 'Que bom. Gratidão se mostra no sábado também.'],
        ['Você me contratou pelo meu currículo', 0, -10, 'Seu currículo era o pior da pilha, meu bem. Eu vi potencial. Ainda tô procurando.'],
        ['Isso é chantagem emocional', 5, -15, 'Nossa. Depois de tudo que eu fiz por você 💔']),
      E(['Vou levar bolo de cenoura pra equipe amanhã 🥕 Menos pra quem saiu às 18h na sexta. Não vou falar nomes.'],
        ['Saí às 18h porque era meu horário', 0, -10, 'Horário é pra quem só quer cumprir tabela. Eu achei que você queria mais.'],
        ['Vou levar um bolo também!', -5, 10, 'Que fofura. Só não leva de cenoura, que aí parece que você quer competir comigo.'],
        ['Tô de dieta', 0, -5, 'Tá vendo? Sempre se excluindo. Depois não entende por que não é {p:promovido|promovida}.']),
      E([{ audio: '1:12', tx: 'Oi meu bem, é a Márcia… tô no carro… eu oro por você todo dia, viu? Pra Deus te dar o que falta. Foco. Capacidade. Principalmente capacidade. Beijo, fica com Deus 🌷' }],
        ['Amém 🙏', -10, 10, 'Amém. E amanhã 7h, tá? Pra gente rever tudo que você fez.'],
        ['O que falta em mim?', -10, -5, 'Ah, meu bem… se eu tiver que explicar, já respondi.'],
        ['Ouvir de novo', -5, 0, 'Pode ouvir quantas vezes quiser. Não vai ficar menos verdade 🌷']),
      E(['A Juliana entrou depois de você e já lidera um projeto. Não tô comparando 🌷 Só tô feliz por ela.'],
        ['Que bom pra ela', -10, 5, 'É. Ela não precisa que eu revise tudo. Deve ser bom ser assim.'],
        ['Eu também quero liderar', 0, -5, 'Quer? Que bonitinho. Primeiro aprende a entregar sem erro de vírgula.'],
        ['Isso é comparação', 5, -10, 'É observação, {p:querido|querida}. Comparação seria se tivesse algo pra comparar.']),
    ],
    nags: ['Oi?', 'Tudo bem com você? Fiquei preocupada 🌷', 'Visualizou, né. Tudo bem. Tô acostumada.', 'Não precisa responder. Eu me viro sozinha.'],
    final: E(['Bom, meu anjo. Vou deitar.', 'Amanhã eu apresento, tá? Não é falta de confiança. É só que o cliente merece o melhor 🌷'],
      ['Boa noite, Dona Márcia', 0, 5, 'Boa noite. Dorme pensando no que dá pra melhorar. É bastante coisa 🌷'],
      ['Eu queria apresentar', 0, -5, 'Eu sei, meu bem. Querer não é poder.'],
      ['Tá bom', 0, -5, '"Tá bom". Nossa. Nem um obrigado.']),
    free: {
      no: ['Tudo bem. Eu faço sozinha. Como sempre 🌷', 'Nossa. Não esperava isso de você. Mas também não esperava muita coisa.'],
      yes: ['Que bom, meu anjo. Pena que precisa eu pedir.', 'Isso. Às vezes você me surpreende. Às vezes.'],
      other: ['Não entendi, mas tudo bem. Eu já me acostumei a não entender você 🌷', 'Vou orar por isso 🙏'],
      laugh: ['Que bom que alguém tá feliz nessa equipe. Com os resultados que a gente tem 🙂'],
      sorry: ['Não precisa pedir desculpa, meu bem. Precisa não errar. São coisas diferentes 🌷'],
      money: ['Dinheiro? Eu te dou oportunidade, que vale mais. Pra quem sabe aproveitar.', 'Quando você valer mais, a gente conversa 🌷'],
    },
  },
  { // Kaique: CEO de 24 anos. O abuso vem embalado de "mentalidade".
    npc: () => ({ name: 'Kaique Moraes', first: 'Kaique', g: 'o', av: 'KM', color: '#7c3aed', role: 'Founder & CEO · PetTech 🐶🚀' }),
    opening: E(['fala 🤙 tá on?', 'bora fazer um brainstorm do pitch de amanhã. rapidinho, 5 min'],
      ['Bora! 🚀', -5, 5, 'é isso. (foram 3 horas)'],
      ['Kaique, é domingo 23h', 5, -10, 'mano, quem precisa de domingo não é founder. é funcionário. você escolhe o que quer ser.'],
      ['Tô descansando', 0, -5, 'descansando com o salário que a gente te paga? bonito.']),
    pool: [
      E(['e se a gente colocasse IA no pitch? em tudo.'],
        ['Coloco "powered by AI" em todo slide', -5, 10, 'gênio. foi minha ideia, mas você executou bem.'],
        ['Mas o produto é passeador de cachorro', 0, -5, 'isso é o que você vê. por isso você é designer e eu sou CEO.'],
        ['IA pra quê?', 0, -10, 'se você precisa perguntar, você não é pro nosso momento, mano.']),
      E(['salário esse mês vai atrasar uns dias. tô fechando a rodada. mas te dou 0,001% da empresa 🙌'],
        ['Valeu demais!', -10, 10, 'isso é mentalidade de dono. quem reclama de salário não vira sócio.'],
        ['Equity não paga boleto', 5, -15, 'mentalidade de escassez. tá explicado por que você não sai do lugar.'],
        ['Quanto vale 0,001%?', 0, -5, 'hoje? uns R$ 3. mas é o que você vale também, sendo sincero.']),
      E(['amanhã 5h30 tem banho de gelo com o time. opcional. mas eu vou lembrar quem foi 🧊'],
        ['Tô dentro 🧊', -15, 10, 'monstro. traz sua própria banheira.'],
        ['Moro em kitnet, não tenho banheira', 0, -5, 'é isso que acontece quando a pessoa não tem ambição, mano.'],
        ['Prefiro dormir', 5, -10, 'dormir é pra quem não tem sonho. tá anotado.']),
    ],
    nags: ['??', 'mano', 'tá on?', 'vou mandar no grupo do time que você sumiu'],
    final: E(['top. vou dormir 4h que é o que o corpo precisa', 'amanhã eu apresento e você fica do lado fazendo cara de confiante 🤙'],
      ['tmj 🤙', 0, 5, '🚀'],
      ['Por que eu não apresento?', 0, -5, 'você não tem presença, mano. não é crítica. é dado.'],
      ['👍', 0, 0, 'joinha é meio boomer, mas ok']),
  },
];

// ───────────────────────────── PT · RELACIONAMENTO ─────────────────────────────
PT.love.variants = [
  { npc: PT.love.npc },
  { // Felipe/Camila: a vítima. Transforma qualquer coisa sua numa dívida com ele(a).
    npc: g => g === 'o'
      ? { name: 'Felipe', av: 'F', color: '#0d9488', role: 'Namorado 💙' }
      : { name: 'Camila', av: 'C', color: '#c026d3', role: 'Namorada 💗' },
    opening: E(['Que bom que você tá feliz aí 🙂', 'Eu tô em casa passando mal. Mas não quero atrapalhar a sua noite.'],
      ['O que você tá sentindo?', -10, 5, 'Nada. Só uma dor no peito. Deve ser ver você feliz sem mim.'],
      ['Quer que eu vá aí?', -15, 10, 'Não precisa. Eu me viro sozinh{o}. Como sempre.'],
      ['Toma uma água e deita', 0, -10, '"Toma uma água". Se fosse com {o Lucão|a Carol} você já tinha ido.']),
    pool: [
      E(['Tô indo pro hospital.', '…é uma farmácia. Mas podia ser hospital. Você nem ia saber.'],
        ['Tô indo aí!', -15, 10, 'Não precisa. Já comprei o remédio. Obrigad{o} por lembrar que eu existo.'],
        ['Quer que eu faça um Pix?', 0, -5, 'Não é sobre dinheiro. Você acha que resolve tudo pagando.'],
        ['Farmácia não é hospital', 5, -15, 'Vou lembrar dessa frase no meu velório.']),
      E(['Vi seu story rindo. Eu não rio assim desde que a gente começou.'],
        ['Quer que eu apague?', -10, 10, 'Não. Deixa. Pra todo mundo ver como você é feliz sem mim.'],
        ['Foi uma piada do Lucão', 0, -5, 'Que bom que ele te faz rir. Eu só te faço sofrer, né?'],
        ['Bora rir juntos então? 😄', 0, 5, 'Não consigo. Mas obrigad{o} por tentar. Pela primeira vez.']),
      E(['Vou ficar off um tempo. Não me procura.'],
        ['Tô aqui, amor ❤️', -10, 10, 'Demorou {delay} pra perceber que eu sumi. Anotado.'],
        ['Ok, respeito seu espaço', 0, -15, 'RESPEITA?? Era pra você me procurar!!'],
        ['Tá bom', 0, -10, 'Tá bom. Vou sumir então. Ninguém ia sentir falta mesmo.']),
    ],
    nags: ['Tudo bem, já entendi.', 'Tô vendo que eu não sou prioridade.', 'Ok.', 'Ninguém liga pra mim mesmo.'],
    final: E(['Vou tentar dormir.', 'Se eu não conseguir, a culpa não é sua. (é sua)'],
      ['Boa noite, amor ❤️', 0, 5, 'Boa noite. Se cuida. Eu não consigo.'],
      ['Quer conversar?', -15, 10, 'Agora não. Amanhã às 7h. Antes do seu trabalho.'],
      ['Dorme bem', 0, 0, 'Vou tentar. Pela 5ª noite seguida.']),
    free: {
      no: ['Tudo bem. Eu já sabia.', 'Ok. Vou chorar sozinh{o} então.'],
      yes: ['Sério? Você faria isso por mim? Nunca faz.', 'Você ainda se importa… às vezes.'],
      other: ['Tanto faz. Nada que eu sinto importa mesmo.', '…'],
      laugh: ['Ri mesmo. Eu tô aqui me sentindo um lixo.'],
      sorry: ['Você sempre pede desculpa e eu sempre sofro.', 'Tudo bem. Já me acostumei a ser deixad{o} de lado.'],
      money: ['Dinheiro não compra o que eu sinto.', 'Vai me pagar pra eu parar de sofrer?'],
    },
  },
  { // Gustavo/Larissa: o controle em forma de planilha. Seu valor vira nota.
    npc: g => g === 'o'
      ? { name: 'Gustavo', av: 'G', color: '#4f46e5', role: 'Namorado 💙' }
      : { name: 'Larissa', av: 'L', color: '#e11d48', role: 'Namorada 💗' },
    opening: E(['O combinado é você voltar 00h30.', 'Seu check-in das 23h tá atrasado 12 minutos. Tô com a planilha aberta 📊'],
      ['Desculpa, fazendo check-in! ✅', -5, 5, 'Ótimo. Próximo às 23h30. Com foto. Sem gente no fundo.'],
      ['Que planilha??', 0, -10, 'A do NOSSO relacionamento. Te mandei. Você nunca abre. Igual não abre seu coração.'],
      ['Amor, é um aniversário', 0, -5, 'Aniversário tá na aba "eventos tolerados". Até 00h30.']),
    pool: [
      E(['Quantas cervejas até agora? O combinado é 2.'],
        ['2, prometo', -5, 0, 'Tem 3 copos no story do Lucão. Mentir também vai pra planilha.'],
        ['Não tô contando', 0, -10, 'Por isso eu conto por você. Alguém tem que ser adulto aqui.'],
        ['Tô no guaraná zero', 0, 10, 'Orgulhos{o}. Viu como você melhora quando eu acompanho?']),
      E(['Atualizei nosso app de casal: agora tem ranking. Você tá em 2º. De 2.'],
        ['Como eu subo no ranking?', -10, 10, 'Responde em menos de 1 minuto. E para de me decepcionar.'],
        ['Isso é muito bizarro', 0, -15, 'Bizarro é você não ter meta nenhuma pra gente.'],
        ['Quem é o 1º?', 0, -5, 'Eu. Sempre fui. Você que nunca acompanhou.']),
      E(['Marquei terapia de casal. Sábado 8h. O terapeuta é meu primo.'],
        ['Tá bom…', -15, 10, 'Ele já leu a planilha. Já sabe o que você faz.'],
        ['Seu primo??', 0, -10, 'Ele é imparcial. Concorda comigo, mas é imparcial.'],
        ['Prefiro alguém neutro', 0, -15, 'Neutro é quem não sabe o que você apronta.']),
    ],
    nags: ['Check-in atrasado.', '??', 'Sua média de resposta caiu.', 'Anotado 📊'],
    final: E(['Check-in final registrado.', 'Amanhã às 8h a gente faz a retrospectiva da noite. Tem 14 pontos.'],
      ['Combinado ✅', 0, 5, '👍 Nota da noite: 6,5. Já foi pior.'],
      ['Retrospectiva??', 0, -5, 'Com slides. Você precisa ver onde erra.'],
      ['Boa noite ❤️', 0, 0, 'Boa noite. Seu sono ideal é 7h40. Se apressa.']),
    free: {
      no: ['Anotado: -5 pontos.', 'Recusa registrada na aba "conflitos". É a 9ª.'],
      yes: ['+5 pontos ✅ Viu como dá?', 'Ótimo. Registrado.'],
      other: ['Isso não está na planilha. Reformula.', 'Responde no formato combinado: sim, não ou justificativa.'],
      laugh: ['Risada não é resposta. -2 pontos.'],
      sorry: ['Desculpa registrada. 3ª da semana. Você estourou a cota.'],
      money: ['Gastos de hoje: quero na planilha até 8h.', 'Já viu a aba "orçamento do casal"? Você tá no vermelho.'],
    },
  },
];

// ───────────────────────────── EN · BOSS ─────────────────────────────
EN.chefe.variants = [
  { npc: EN.chefe.npc },
  { // Linda: sweet on the surface, cruel underneath. Never yells; just makes sure you know you're not enough.
    npc: () => ({ name: 'Linda Pierce', first: 'Linda', g: 'a', av: 'LP', color: '#be185d', role: 'Director of Operations' }),
    opening: E(['Hi sweetie 🌷', 'Took a little peek at the deck. I\'m a teeny bit… disappointed. But that\'s on me, I expected too much.'],
      ['What happened, Linda?', -5, 5, 'Nothing, hon. You did what you could. It\'s just that what you can do isn\'t much 🌷'],
      ['Disappointed with what?', 0, -10, 'It\'s not a what. It\'s the whole thing. But you rest, I\'ll fix it myself. As usual.'],
      ['I\'ll look at it in the morning', 5, -10, 'Of course. You rest. I\'ll be up at 61 years old doing your job 🌷']),
    pool: [
      E(['Remember I hired you when nobody else would? Just remembering. No pressure 🌷'],
        ['I remember, I\'m grateful', -10, 10, 'Good. Gratitude shows on Saturdays too.'],
        ['You hired me for my resume', 0, -10, 'Your resume was the worst in the pile, sweetie. I saw potential. Still looking for it.'],
        ['That\'s emotional blackmail', 5, -15, 'Wow. After everything I\'ve done for you 💔']),
      E(['Bringing banana bread for the team tomorrow 🍌 Except for whoever left at 5:01 on Friday. Not naming names.'],
        ['I left at 5 because that\'s my hours', 0, -10, 'Hours are for people who just want to get by. I thought you wanted more.'],
        ['I\'ll bring something too!', -5, 10, 'How sweet. Just not banana bread, it\'ll look like you\'re competing with me.'],
        ['I\'m on a diet', 0, -5, 'See? Always leaving yourself out. Then you wonder why you\'re not promoted.']),
      E([{ audio: '1:12', tx: 'Hi sweetie, it\'s Linda… I\'m in the car… I pray for you every night, you know that? For God to give you what you\'re missing. Focus. Ability. Mostly ability. Bless your heart 🌷' }],
        ['Amen 🙏', -10, 10, 'Amen. And 7 AM tomorrow, ok? So we can go over everything you did.'],
        ['What am I missing?', -10, -5, 'Oh, sweetie… if I have to explain, I already answered.'],
        ['Listen again', -5, 0, 'Listen as many times as you like. It won\'t get any less true 🌷']),
      E(['Jordan started after you and is already leading a project. Not comparing 🌷 I\'m just happy for her.'],
        ['Good for her', -10, 5, 'Yes. She doesn\'t need me to review everything. Must be nice being like that.'],
        ['I want to lead too', 0, -5, 'Do you? How cute. First learn to ship without a typo.'],
        ['That\'s a comparison', 5, -10, 'It\'s an observation, hon. A comparison would need something to compare.']),
    ],
    nags: ['Hi?', 'Everything ok? I got worried 🌷', 'Read it, I see. That\'s fine. I\'m used to it.', 'No need to reply. I\'ll manage alone.'],
    final: E(['Well, sweetie. Heading to bed.', 'I\'ll present tomorrow, ok? It\'s not that I don\'t trust you. The client just deserves the best 🌷'],
      ['Good night, Linda', 0, 5, 'Night. Fall asleep thinking about what you can improve. It\'s quite a list 🌷'],
      ['I wanted to present', 0, -5, 'I know, hon. Wanting isn\'t the same as being able to.'],
      ['Ok', 0, -5, '"Ok." Wow. Not even a thank you.']),
    free: {
      no: ['That\'s fine. I\'ll do it myself. As usual 🌷', 'Wow. Didn\'t expect that from you. Then again, I don\'t expect much.'],
      yes: ['Good, sweetie. Shame I have to ask.', 'There you go. Sometimes you surprise me. Sometimes.'],
      other: ['Didn\'t follow, but that\'s fine. I\'m used to not understanding you 🌷', 'I\'ll pray on it 🙏'],
      laugh: ['Glad someone\'s happy on this team. With the results we have 🙂'],
      sorry: ['No need to apologize, hon. You need to not mess up. Different things 🌷'],
      money: ['Money? I give you opportunity, which is worth more. For people who know how to use it.', 'When you\'re worth more, we\'ll talk 🌷'],
    },
  },
  {
    npc: () => ({ name: 'Tanner Brooks', first: 'Tanner', g: 'o', av: 'TB', color: '#7c3aed', role: 'Founder & CEO · Pawsome AI 🐶🚀' }),
    opening: {
      boss: ['yo 🤙', 'u up? saw the green dot wanna jam on the pitch real quick? 5 min tops'],
      opts: [
        { t: 'Let\'s go! 🚀', s: -5, m: 5, r: ['that\'s founder energy 🦁 (it was 3 hours)'] },
        { t: 'Tanner, it\'s 11pm on a Sunday', s: 5, m: -10, r: ['Sunday is just a Monday that hasn\'t woken up yet. heard that on a podcast. you should listen to podcasts.'] },
        { t: 'Playing video games', m: -5, r: ['nice. write a LinkedIn post about what it taught you about leadership'] },
      ],
    },
    pool: [
      { boss: ['what if we added AI to the pitch', 'not sure where. everywhere'], opts: [
        { t: 'Adding "AI-powered" to every slide', s: -5, m: 10, r: ['GENIUS. valuation just 3x\'d'] },
        { t: 'We\'re a dog-walking app', m: -5, r: ['dog walking WITH AI. see the difference?'] },
        { t: 'AI for what?', m: -10, r: ['for the raise, bro'] },
      ] },
      { boss: ['payroll might be a few days late this month', 'closing our seed round', 'but I\'m giving you 0.001% equity 🙌'], opts: [
        { t: 'Thank you!!', s: -10, m: 10, r: ['when we hit unicorn you\'re buying a Tesla'] },
        { t: 'Equity doesn\'t pay rent', s: 5, m: -15, r: ['scarcity mindset, bro. read "Rich Dad Poor Dad"'] },
        { t: 'What\'s 0.001% worth?', m: -5, r: ['today? like 60 cents. in 10 years… maybe 80'] },
      ] },
      { boss: ['team cold plunge tomorrow 5:30am before the pitch 🧊', 'optional. but I\'ll remember who came'], opts: [
        { t: 'I\'m in 🧊', s: -15, m: 10, r: ['beast. bring your own tub'] },
        { t: 'I live in a studio, no tub', m: -5, r: ['use the sink. mindset is everything'] },
        { t: 'I\'d rather sleep', s: 5, m: -10, r: ['sleep is for people without dreams, bro'] },
      ] },
    ],
    nags: ['??', 'bro', 'u there', 'send a voice memo then', 'let\'s gooo', 'posting this in #general'],
    final: {
      boss: ['ok we\'re cooked. sleeping 4h, it\'s all the body needs', 'tmrw I pitch and you stand behind me looking confident', 'lfg 🤙🚀'],
      opts: [
        { t: 'lfg 🤙', m: 5, r: ['🚀'] },
        { t: 'Why can\'t I pitch?', m: -5, r: ['you don\'t have the storytelling yet bro'] },
        { t: '👍', r: ['thumbs up is kinda boomer but ok'] },
      ],
    },
  },
];

// ───────────────────────────── EN · RELATIONSHIP ─────────────────────────────
EN.love.variants = [
  { npc: EN.love.npc },
  {
    npc: g => g === 'o'
      ? { name: 'Ethan', av: 'E', color: '#0d9488', role: 'Boyfriend 💙' }
      : { name: 'Chloe', av: 'C', color: '#c026d3', role: 'Girlfriend 💗' },
    opening: {
      boss: ['hey', 'glad you\'re having fun 🙂 I\'m home feeling really sick but I don\'t want to ruin your night'],
      opts: [
        { t: 'What\'s wrong?', s: -10, m: 5, r: ['nothing. chest pain. probably sadness. have fun tho'] },
        { t: 'Want me to come over?', s: -15, m: 10, r: ['no it\'s fine. I\'ll handle it alone. like always.'] },
        { t: 'Drink some water and rest', m: -10, r: ['wow. "drink water". so supportive.'] },
      ],
    },
    pool: [
      { boss: ['I\'m going to the ER.', '…', 'it\'s a CVS. but it could have been the ER.'], opts: [
        { t: 'On my way!', s: -15, m: 10, r: ['no need. got Tylenol. but thanks for finally caring.'] },
        { t: 'Want me to Venmo you?', m: -5, r: ['it\'s not about money. it\'s about presence.'] },
        { t: 'CVS isn\'t the ER', s: 5, m: -15, r: ['wow. I\'ll remember that at my funeral.'] },
      ] },
      { boss: ['saw you laughing in your story.', 'I haven\'t laughed like that since 2022.'], opts: [
        { t: 'Want me to delete it?', s: -10, m: 10, r: ['no. leave it. so everyone sees how happy you are without me.'] },
        { t: 'Tyler made a joke', m: -5, r: ['glad Tyler makes you laugh. I only make you suffer, right?'] },
        { t: 'Let\'s laugh together then? 😄', m: 5, r: ['not in the mood. but thanks for trying.'] },
      ] },
      { boss: ['I\'m logging off for a while.', 'don\'t text me.', '(are you texting me?)'], opts: [
        { t: 'I\'m here babe ❤️', s: -10, m: 10, r: ['took you {delay}. but ok.'] },
        { t: 'Ok, I respect your space', m: -15, r: ['RESPECT?? you were supposed to chase me!!'] },
        { t: 'Ok', m: -10, r: ['"ok". wow. I\'m disappearing then.', { sys: '{name} came back online 40 seconds later' }] },
      ] },
    ],
    nags: ['it\'s fine. I get it.', 'I can tell I\'m not a priority.', 'ok.', '…', 'going to sleep. if I don\'t wake up, it was nice knowing you.', 'nobody cares anyway.'],
    final: {
      boss: ['ok. gonna try to sleep.', 'if I can\'t, it\'s not your fault.', '(it\'s your fault)'],
      opts: [
        { t: 'Good night babe ❤️', m: 5, r: ['night. take care of yourself. I can\'t.'] },
        { t: 'Want to talk?', s: -15, m: 10, r: ['not now. tomorrow 7am. before your work.'] },
        { t: 'Sleep well', r: ['I\'ll try. for the 5th night in a row.'] },
      ],
    },
  },
  {
    npc: g => g === 'o'
      ? { name: 'Josh', av: 'J', color: '#4f46e5', role: 'Boyfriend 💙' }
      : { name: 'Brittany', av: 'B', color: '#e11d48', role: 'Girlfriend 💗' },
    opening: {
      boss: ['hi! quick reminder: we agreed you\'d be home by 12:30.', 'I have the spreadsheet open 📊 your 11pm check-in is 12 minutes late.'],
      opts: [
        { t: 'Sorry, checking in! ✅', s: -5, m: 5, r: ['great. next check-in 11:30. with a selfie.'] },
        { t: 'What spreadsheet??', m: -10, r: ['the spreadsheet of OUR relationship. I shared it on Google Drive. you never open it.'] },
        { t: 'Babe, it\'s a birthday', m: -5, r: ['birthdays are on the "tolerated events" tab. until 12:30.'] },
      ],
    },
    pool: [
      { boss: ['how many drinks so far?', 'the agreement is 2 per event.'], opts: [
        { t: '2, I promise', s: -5, r: ['Tyler\'s story shows 3 cups. explain.'] },
        { t: 'I\'m not counting', m: -10, r: ['that\'s why I count for you ❤️'] },
        { t: 'Just Diet Coke', m: 10, r: ['proud of you. +10 points on the spreadsheet 📈'] },
      ] },
      { boss: ['updated our couples app: there\'s a weekly leaderboard now.', 'you\'re in 2nd place.', 'out of 2.'], opts: [
        { t: 'How do I climb?', s: -10, m: 10, r: ['reply in under 1 minute. compliment me 3x a day.'] },
        { t: 'This is so weird', m: -15, r: ['weird is having no goals in a relationship.'] },
        { t: 'Who\'s 1st?', m: -5, r: ['me, obviously.'] },
      ] },
      { boss: ['booked us couples therapy.', 'Saturday 8am.', 'the therapist is my cousin.'], opts: [
        { t: 'Ok…', s: -15, m: 10, r: ['he\'s already on my side but he\'ll be impartial.'] },
        { t: 'Your COUSIN??', m: -10, r: ['he\'s very professional. he did an online course.'] },
        { t: 'I\'d prefer someone neutral', m: -15, r: ['so you admit you have something to hide.'] },
      ] },
    ],
    nags: ['check-in overdue.', '??', 'your response time is awful. weekly average dropped.', 'noting that.', 'logged in the spreadsheet 📊', 'answer or I\'m calling.'],
    final: {
      boss: ['ok. final check-in logged.', 'tomorrow 8am we do a retro of tonight.', 'bring a pen 📊'],
      opts: [
        { t: 'Deal ✅', m: 5, r: ['👍 (tonight\'s score: 6.5/10)'] },
        { t: 'A retro??', m: -5, r: ['with slides. like at your job.'] },
        { t: 'Good night ❤️', r: ['night. your ideal sleep is 7h40. hurry.'] },
      ],
    },
  },
];

// ───────── Voz de cada personagem no texto livre (o resto cai no free do cenário) ─────────

PT.chefe.variants[2].free = {
  "no": [
    "mano, \"não\" é palavra de quem não escala",
    "ok, anotei no Notion como \"resistência\"",
    "respeito. mas discordo. mas respeito. mas faz"
  ],
  "yes": [
    "é isso!! 🚀🚀",
    "top. mentalidade de dono",
    "monstro 🦁"
  ],
  "other": [
    "top. não entendi mas top",
    "manda isso num áudio",
    "interessante. vou levar pro board"
  ],
  "laugh": [
    "kkkkk tmj",
    "rir libera dopamina. mas foca"
  ],
  "sorry": [
    "relaxa, erro é aprendizado. só não erra mais",
    "fail fast, mano. só não falha amanhã"
  ],
  "money": [
    "mano, foca no equity",
    "dinheiro é consequência. salário é atraso"
  ]
};


EN.chefe.variants[2].free = {
  "no": [
    "bro \"no\" is a scarcity word",
    "logged it in Notion as \"resistance\"",
    "respect. disagree. but respect. but do it"
  ],
  "yes": [
    "LFG 🚀🚀",
    "that's owner mentality",
    "absolute beast 🦁"
  ],
  "other": [
    "love it. didn't get it but love it",
    "send that as a Loom",
    "interesting. taking it to the board"
  ],
  "laugh": [
    "lmao same",
    "laughing releases dopamine. but focus"
  ],
  "sorry": [
    "fail fast bro. just don't fail tomorrow",
    "all good, mistakes are data"
  ],
  "money": [
    "bro focus on the equity",
    "salary is a lagging indicator"
  ]
};
EN.love.variants[1].free = {
  "no": [
    "fine. I knew it.",
    "ok. I'll just cry alone then.",
    "idk why I even try."
  ],
  "yes": [
    "really? you'd do that for me? 🥺",
    "so you still care…",
    "idk if I deserve it. but thanks."
  ],
  "other": [
    "whatever. nothing matters anyway.",
    "…",
    "ok. I'll just sit here. in the dark."
  ],
  "laugh": [
    "glad you're laughing. I haven't laughed in months.",
    "laugh away. I'm dying here."
  ],
  "sorry": [
    "you always say sorry and I always suffer.",
    "it's fine. I'm used to being forgotten."
  ],
  "money": [
    "money can't fix how I feel.",
    "are you going to pay me to stop hurting?"
  ]
};
EN.love.variants[2].free = {
  "no": [
    "logged: -5 points.",
    "refusal recorded in the \"conflicts\" tab.",
    "ok. that's going in the retro."
  ],
  "yes": [
    "+5 points ✅",
    "great. logged.",
    "daily goal hit 📈"
  ],
  "other": [
    "didn't get that. reply in the agreed format: yes, no or justification.",
    "that's not on the spreadsheet.",
    "creating a new category for that."
  ],
  "laugh": [
    "laughing isn't an answer. -2 points.",
    "reason for laughing? I need to categorize it."
  ],
  "sorry": [
    "apology logged. 3rd this week.",
    "accepted. but you're over your monthly apology quota."
  ],
  "money": [
    "need tonight's expenses in the spreadsheet by 8am.",
    "have you seen the \"couple budget\" tab?"
  ]
};
