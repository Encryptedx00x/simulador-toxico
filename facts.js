'use strict';
// Quem é cada personagem (pras perguntas do texto livre) + respostas indignadas por cenário + descrição dos níveis.
// Placeholders nas respostas: {job} {Job} {age} {where} {Where} {doing} {Doing} (maiúscula = começa a frase).
// No namoro, facts = { o: namorado, a: namorada }.

const facts = (sc, list) => list.forEach((f, i) => { if (sc.variants[i]) sc.variants[i].facts = f });

// ───────────────────────────── PT ─────────────────────────────
facts(PT.chefe, [
  { job: 'gerente de novos negócios', age: '38', where: 'no escritório aqui de casa', doing: 'revisando a sua apresentação' },
  { job: 'diretora de operações', age: '61', where: 'no estacionamento da igreja', doing: 'rezando por você e revisando slide' },
  { job: 'CEO e fundador da PetTech', age: '24', where: 'num coworking aberto 24h', doing: 'treinando o pitch no espelho' },
  { job: 'Head de Growth', age: '34', where: 'na esteira', doing: 'gravando um reels sobre produtividade' },
  { job: 'dono da empresa', age: '72', where: 'na sala com a Cida', doing: 'vendo o jornal' },
  { job: 'coordenador de eficiência operacional', age: '31', where: 'no home office com 3 monitores', doing: 'monitorando o seu status' },
  { job: 'gerente sênior', age: '40', where: 'no salão', doing: 'colocando meu nome nos seus slides' },
  { job: 'supervisor', age: '29', where: 'no bar com a diretoria', doing: 'fazendo networking' },
  { job: 'diretor jurídico', age: '58', where: 'no escritório', doing: 'redigindo uma notificação' },
  { job: 'gestora de pessoas e felicidade', age: '33', where: 'na aula de yoga', doing: 'montando a dinâmica de amanhã' },
]);
facts(PT.love, [
  { o: { job: 'analista de sistemas', age: '27', where: 'em casa', doing: 'vendo série sozinho' }, a: { job: 'dentista', age: '26', where: 'em casa', doing: 'vendo série sozinha' } },
  { o: { job: 'professor de educação física', age: '28', where: 'em casa, no escuro', doing: 'deitado olhando pro teto' }, a: { job: 'enfermeira', age: '27', where: 'em casa, no escuro', doing: 'deitada olhando pro teto' } },
  { o: { job: 'contador', age: '30', where: 'no escritório de casa', doing: 'atualizando a planilha' }, a: { job: 'contadora', age: '29', where: 'no escritório de casa', doing: 'atualizando a planilha' } },
  { o: { job: 'influenciador', age: '25', where: 'no meu ring light', doing: 'editando um reels' }, a: { job: 'influenciadora', age: '24', where: 'no meu ring light', doing: 'editando um reels' } },
  { o: { job: 'streamer (12 seguidores)', age: '23', where: 'no PC', doing: 'na fila da ranqueada' }, a: { job: 'streamer (12 seguidores)', age: '22', where: 'no PC', doing: 'na fila da ranqueada' } },
  { o: { job: 'advogado', age: '31', where: 'em casa', doing: 'olhando fotos antigas' }, a: { job: 'advogada', age: '30', where: 'em casa', doing: 'olhando fotos antigas' } },
  { o: { job: 'terapeuta holístico', age: '29', where: 'no meu altar', doing: 'tirando tarô sobre você' }, a: { job: 'terapeuta holística', age: '28', where: 'no meu altar', doing: 'tirando tarô sobre você' } },
  { o: { job: 'farmacêutico', age: '32', where: 'na cozinha', doing: 'esquentando uma sopa pra você' }, a: { job: 'farmacêutica', age: '31', where: 'na cozinha', doing: 'esquentando uma sopa pra você' } },
  { o: { job: 'perito criminal', age: '35', where: 'no notebook', doing: 'analisando seu story frame a frame' }, a: { job: 'perita criminal', age: '33', where: 'no notebook', doing: 'analisando seu story frame a frame' } },
  { o: { job: 'gerente de banco', age: '30', where: 'na casa da minha mãe', doing: 'escolhendo a cor dos guardanapos' }, a: { job: 'cerimonialista', age: '29', where: 'na casa da minha mãe', doing: 'escolhendo a cor dos guardanapos' } },
]);

Object.assign(PT.chefe.free, {
  ask_job: ['Eu sou {job}. SEU chefe. Lembra quem assina seu ponto?', 'Sério? {Job}. Tá no meu crachá, na assinatura do e-mail e no LinkedIn.', 'Sou {job}. E você, por enquanto, ainda trabalha aqui.'],
  ask_name: ['{name}. Tá no meu e-mail, no grupo e no seu holerite.', 'É {first}. Você tá bem? Vou anotar "desatenção".'],
  ask_age: ['{age}. Por quê? Tá contando quanto falta pra eu me aposentar? Falta muito.', 'Tenho {age} e trabalho mais que você.'],
  ask_where: ['{Where}. Trabalhando. Diferente de alguns.', '{Where}, com o notebook aberto. Liderança não tem folga.'],
  ask_doing: ['{Doing}. E esperando os seus slides.', 'Tô {doing}. Multitarefa. Devia tentar.'],
  ask_why: ['Assim como? Exigente? Obrigado.', 'Eu sou assim porque o mercado é assim. Não leva pro pessoal.'],
  ask_jealous: ['Ciúme do quê? Do seu tempo livre? Você não tem.', 'Ciúme não. Controle de qualidade.'],
  ask_loveq: ['Isso aqui é um ambiente profissional. Às 23h. No zap.', 'Amo resultado. Me entrega resultado.'],
  ask_sleep: ['Dormir é pra quem já bateu a meta.', 'Durmo 4 horas. É o segredo do sucesso. Li num livro.'],
});
Object.assign(PT.love.free, {
  ask_job: ['Sério que você não lembra que eu sou {job}?? A gente tá junto faz 2 anos.', '{Job}. Igual ontem. Igual sempre. Você nunca presta atenção em mim.', 'Eu sou {job}, tá? Se você ouvisse quando eu falo, saberia.'],
  ask_name: ['Meu nome é {name}. Você bebeu muito, né?', 'É {name}. Tá vendo? Já tá até esquecendo de mim.'],
  ask_age: ['{age}. Você nunca lembra. Nem do meu aniversário lembrou direito.', 'Tenho {age}. Por quê? Vai me trocar por alguém mais nov{o}?'],
  ask_where: ['{Where}. Sozinh{o}. Esperando você. Como sempre.', '{Where}, olhando seu story pela décima vez.'],
  ask_doing: ['Tô {doing}. E pensando em quem tá do seu lado.', '{Doing}. Mas isso não importa. Importa o que VOCÊ tá fazendo.'],
  ask_why: ['Assim como? Eu só me preocupo. Você que me deixa assim.', 'Eu sou assim porque você me dá motivo.'],
  ask_jealous: ['Ciúme? Eu? Imagina. Só quero saber tudo, o tempo todo.', 'Não é ciúme. É cuidado. Tem diferença. (não tem)'],
  ask_loveq: ['Claro que amo. Por isso que eu controlo. Digo, cuido.', 'Amo. Mais do que você me ama, com certeza.'],
  ask_sleep: ['Como eu vou dormir com você aí nessa festa?', 'Só durmo quando você chegar. E mandar foto da porta.'],
});
PT.chefe.lvlDesc = ['pra quem começou a terapia', 'a experiência padrão', 'modo rescisão indireta'];
PT.love.lvlDesc = ['pra quem começou a terapia', 'a experiência padrão', 'modo "a gente precisa conversar"'];

// ───────────────────────────── EN ─────────────────────────────
facts(EN.chefe, [
  { job: 'VP of Growth', age: '41', where: 'in my home office', doing: 'reviewing your deck' },
  { job: 'Director of Operations', age: '55', where: 'at my desk', doing: 'drafting a follow-up email' },
  { job: 'Founder & CEO of Pawsome AI', age: '24', where: 'at a 24h coworking space', doing: 'practicing my pitch in the mirror' },
  { job: 'Chief Hustle Officer', age: '34', where: 'on the treadmill', doing: 'filming a productivity reel' },
  { job: 'the owner of this company', age: '74', where: 'in the living room with Barb', doing: 'watching the news' },
  { job: 'Ops Manager', age: '31', where: 'at my 3-monitor setup', doing: 'monitoring your status' },
  { job: 'Senior Manager', age: '40', where: 'at the salon', doing: 'putting my name on your slides' },
  { job: 'Team Lead', age: '29', where: 'at a bar with leadership', doing: 'networking' },
  { job: 'General Counsel', age: '58', where: 'at the office', doing: 'drafting a notice' },
  { job: 'People & Happiness Lead', age: '33', where: 'at yoga', doing: 'planning tomorrow\'s icebreaker' },
]);
facts(EN.love, [
  { o: { job: 'a software engineer', age: '27', where: 'at home', doing: 'watching Netflix alone' }, a: { job: 'a dental hygienist', age: '26', where: 'at home', doing: 'watching Netflix alone' } },
  { o: { job: 'a PE teacher', age: '28', where: 'at home, in the dark', doing: 'lying in bed staring at the ceiling' }, a: { job: 'a nurse', age: '27', where: 'at home, in the dark', doing: 'lying in bed staring at the ceiling' } },
  { o: { job: 'an accountant', age: '30', where: 'at my desk', doing: 'updating the spreadsheet' }, a: { job: 'an accountant', age: '29', where: 'at my desk', doing: 'updating the spreadsheet' } },
  { o: { job: 'a content creator', age: '25', where: 'in front of my ring light', doing: 'editing a reel' }, a: { job: 'a content creator', age: '24', where: 'in front of my ring light', doing: 'editing a reel' } },
  { o: { job: 'a streamer (12 followers)', age: '23', where: 'at my PC', doing: 'sitting in ranked queue' }, a: { job: 'a streamer (12 followers)', age: '22', where: 'at my PC', doing: 'sitting in ranked queue' } },
  { o: { job: 'a lawyer', age: '31', where: 'at home', doing: 'looking at old photos' }, a: { job: 'a lawyer', age: '30', where: 'at home', doing: 'looking at old photos' } },
  { o: { job: 'a reiki healer', age: '29', where: 'at my altar', doing: 'pulling tarot cards about you' }, a: { job: 'a reiki healer', age: '28', where: 'at my altar', doing: 'pulling tarot cards about you' } },
  { o: { job: 'a pharmacist', age: '32', where: 'in the kitchen', doing: 'heating up soup for you' }, a: { job: 'a pharmacist', age: '31', where: 'in the kitchen', doing: 'heating up soup for you' } },
  { o: { job: 'a forensic analyst', age: '35', where: 'at my laptop', doing: 'analyzing your story frame by frame' }, a: { job: 'a forensic analyst', age: '33', where: 'at my laptop', doing: 'analyzing your story frame by frame' } },
  { o: { job: 'a bank manager', age: '30', where: 'at my mom\'s', doing: 'picking napkin colors' }, a: { job: 'a wedding planner', age: '29', where: 'at my mom\'s', doing: 'picking napkin colors' } },
]);

Object.assign(EN.chefe.free, {
  ask_job: ['I\'m {job}. YOUR boss. Remember who approves your PTO?', 'Seriously? {Job}. It\'s on my badge, my email signature and my LinkedIn.', 'I\'m {job}. And you, for now, still work here.'],
  ask_name: ['{name}. It\'s on my emails, the channel and your paycheck.', 'It\'s {first}. Are you ok? Noting "lack of focus".'],
  ask_age: ['{age}. Why? Counting how long until I retire? A long time.', 'I\'m {age} and I work harder than you.'],
  ask_where: ['{Where}. Working. Unlike some people.', '{Where}, laptop open. Leadership doesn\'t clock out.'],
  ask_doing: ['{Doing}. And waiting on your slides.', 'I\'m {doing}. Multitasking. You should try it.'],
  ask_why: ['Like what? Demanding? Thank you.', 'I\'m like this because the market is like this. Don\'t take it personally.'],
  ask_jealous: ['Jealous of what? Your free time? You don\'t have any.', 'Not jealous. Quality control.'],
  ask_loveq: ['This is a professional environment. At 11pm. On Slack.', 'I love results. Give me results.'],
  ask_sleep: ['Sleep is for people who hit their quota.', 'I sleep 4 hours. Secret to success. Read it in a book.'],
});
Object.assign(EN.love.free, {
  ask_job: ['are you serious? I\'m {job}. we\'ve been together 2 years.', '{Job}. like yesterday. like always. you never listen to me.', 'I\'m {job}, ok? if you listened when I talk you\'d know.'],
  ask_name: ['my name is {name}. you\'re drunk, aren\'t you?', 'it\'s {name}. see? you\'re already forgetting me.'],
  ask_age: ['{age}. you never remember. you barely remembered my birthday.', 'I\'m {age}. why? trading me for someone younger?'],
  ask_where: ['{Where}. alone. waiting for you. as usual.', '{Where}, watching your story for the 10th time.'],
  ask_doing: ['I\'m {doing}. and thinking about who\'s next to you.', '{Doing}. but that doesn\'t matter. what are YOU doing?'],
  ask_why: ['like what? I just worry. you make me like this.', 'I\'m like this because you give me reasons.'],
  ask_jealous: ['jealous? me? no. I just want to know everything, all the time.', 'it\'s not jealousy. it\'s care. there\'s a difference. (there isn\'t)'],
  ask_loveq: ['of course I do. that\'s why I control. I mean, care.', 'I do. more than you love me, that\'s for sure.'],
  ask_sleep: ['how am I supposed to sleep with you at that party?', 'I\'ll sleep when you\'re home. and send a pic of the front door.'],
});
EN.chefe.lvlDesc = ['for therapy beginners', 'the standard experience', 'constructive dismissal mode'];
EN.love.lvlDesc = ['for therapy beginners', 'the standard experience', '"we need to talk" mode'];
