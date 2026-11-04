'use strict';
// Táticas de abuso: classificam cada situação pelo texto, ordenam a conversa em escalada
// (fase 1 → 3) e aparecem no final como "o que rolou aqui".
// ponytail: classificação por regex no texto; se errar muito, trocar por tag manual no evento.

PT.ui.tacTitle = 'O que rolou aqui';
PT.ui.tacShare = 'Identifiquei {n} táticas abusivas.';
PT.ui.tactics = [
  { id: 'menos', ph: 1, n: 'Menosprezo', d: 'Te diminui com frase educada, até você duvidar da própria capacidade.',
    re: /esperava mais|e pouco|nao e seu forte|nao tem cara|constrangedor|lent[oa]\b|potencial|talento|nao serve|seu nivel|ninguem ia levar|nem todo mundo nasceu|nao entenderia|obedecer|nao vendia|nao aparece|pior possivel|so isso que voce/ },
  { id: 'explo', ph: 1, n: 'Exploração com nome bonito', d: 'Trabalho e tempo a mais, sem pagar, vendidos como oportunidade, propósito ou parceria.',
    re: /sabado|domingo|fim de semana|hora extra|horas extras|ferias|de graca|visibilidade|precinho|desconto|desconta|depois que (a loja comecar a )?vender|90 dias|120 dias|em bolo|mesmo salario|oportunidade|aditivo|parceria|day off|22h a semana|\bpj\b|uma familia|dancinha|expediente|corte de custos|cancun|mentoria|camiseta|bate o ponto|meta do trimestre|estagiario|plano de saude|vr\b/ },
  { id: 'compa', ph: 1, n: 'Comparação', d: 'Usa outra pessoa como régua pra você nunca estar à altura.',
    re: /juliana|junior|sobrinho|primo|prima|\bex\b|minha ex|meu ex|nora|ganha mais|passou no concurso|igual seu pai|faria por r\$|ela tem razao|ele tem razao/ },
  { id: 'cred', ph: 2, n: 'Roubo de crédito', d: 'Seu trabalho vira mérito de outra pessoa. O erro continua sendo seu.',
    re: /credito|meu nome|com o seu nome|assinatura|eu apresento|eu falo\b|foi nossa|e nosso|como designer|o case|foi do time|disse que foi minha|falei que foi minha|ideia foi minha|tirei seu nome|so o meu/ },
  { id: 'vigia', ph: 2, n: 'Vigilância', d: 'Controle disfarçado de gestão ou de cuidado: print, localização, horário, tela.',
    re: /print|localizacao|status|visto por ultimo|planilha|webcam|tempo de tela|cronometr|rastre|frame|relatorio|check-in|placa|seu uber|ausente|clicou|minha camera|tava online|ficou online|senha|seguir \d|os nomes|visualizou|respondeu \d|fazendo o que|com quem|quem e |curtiu|apagou|voce bebeu|vaga no|onde voce ta/ },
  { id: 'gas', ph: 2, n: 'Gaslighting', d: 'Reescreve o que aconteceu até você duvidar da própria memória.',
    re: /nunca pedi|entende tudo errado|entendeu errado|exager|ouviu errado|era sobre outra|nao foi isso|eu nunca disse|imaginando coisa|por amor|eu so me preocupo|eu so cuido|sonhei|sonho e aviso|o universo|a vela sabe|atestado|um dia\.\.\. sei|era brincadeira|voce que provoca|voce que entendeu/ },
  { id: 'iso', ph: 3, n: 'Isolamento', d: 'Afasta você de amigos e família até sobrar só quem te machuca.',
    re: /carol|lucao|amig|bloque|silenciei|so precisa de mim|so eu importo|deixar de seguir|sair com a gente|grupo da faculdade|nao gosto dessa|ve(r)? menos|cancelo|sem mim|me adiciona|fiquei sozinh|me adiciona|grupo do|seus amigos|wi-fi|so a gente|afast/ },
  { id: 'amea', ph: 3, n: 'Ameaça e chantagem', d: 'Medo como ferramenta: emprego, segredo, exposição ou reputação em jogo.',
    re: /demit|justa causa|substitu|na sua ficha|seu historico|conto pra|vou contar|expor|testamento|segredo|na lista|cortes|proximo emprego|\brh\b|juridico|estrela no google|eu bloqueio|vou lembrar|com a sua avo|vou ate la|nao respeita|postar seu nome|mostrei suas mensagens|outro designer/ },
];

EN.ui.tacTitle = 'What just happened';
EN.ui.tacShare = 'I spotted {n} abusive tactics.';
EN.ui.tactics = [
  { id: 'menos', ph: 1, n: 'Belittling', d: 'Polite little digs until you doubt your own competence.',
    re: /expected more|not your strength|not enough|embarrassing|slow\b|potential|talent|not cut out|your level|nobody would take|not everyone|wouldn'?t understand|follow(ing)? orders|underwhelm|mediocre|at least you tried/ },
  { id: 'explo', ph: 1, n: 'Exploitation, rebranded', d: 'Extra time and work, unpaid, sold as opportunity, purpose or "family".',
    re: /saturday|sunday|weekend|overtime|pto|vacation|for free|exposure|discount|deduct|after (the store|it) (starts|sells)|net ?90|net ?120|in cake|same salary|opportunity|addendum|we'?re a family|day off|salaried|\b1099\b|contractor|a family|dance|tiktok|budget cuts|cancun|mentorship|t-shirt|quarter target|intern|health plan/ },
  { id: 'compa', ph: 1, n: 'Comparison', d: 'Someone else becomes the yardstick so you never measure up.',
    re: /cousin|nephew|niece|\bex\b|my ex|makes more|got the job|just like your (dad|father)|would do it for \$|tyler|brittany|jenna'?s|daughter-in-law/ },
  { id: 'cred', ph: 2, n: 'Credit theft', d: 'Your work becomes someone else\'s win. The mistakes stay yours.',
    re: /credit|my name|your name|signature|i'?ll present|i'?ll say it|it'?s ours|it was ours|as the designer|the case study|team effort|i said it first|was my idea|took your name|just put mine/ },
  { id: 'vigia', ph: 2, n: 'Surveillance', d: 'Control disguised as management or care: screenshots, location, timestamps.',
    re: /screenshot|location|status|last seen|spreadsheet|webcam|screen time|timed|track|frame by frame|report|check-in|license plate|your uber|away\b|clicks?|green dot|were online|password|follow(ed|ing)? \d|the names|left me on read|replied at|doing what|who is|who'?s that|liked|deleted|were you drinking|job posting|clock in|where are you/ },
  { id: 'gas', ph: 2, n: 'Gaslighting', d: 'Rewrites what happened until you doubt your own memory.',
    re: /never asked|got it all wrong|misunderstood|overreact|heard wrong|about someone else|that'?s not what|i never said|imagining things|out of love|i just worry|i just care|i dreamed|dreams are signs|the universe|the candle knows|sick day|yeah right|just kidding|you provoke|you misunderstood/ },
  { id: 'iso', ph: 3, n: 'Isolation', d: 'Cuts you off from friends and family until only the abuser is left.',
    re: /\bjess\b|tyler|friend|block|muted|only need me|only i matter|unfollow|hang out with us|group chat|don'?t like (her|him|that)|see (her|him) less|cancel|without me|add me|add me|the group|your friends|wi-?fi|just us|pushing you away/ },
  { id: 'amea', ph: 3, n: 'Threats and blackmail', d: 'Fear as a tool: your job, a secret, exposure or your reputation on the line.',
    re: /fire(d)?\b|terminat|replace|your file|your record|i'?ll tell|gonna tell|expose|will\b.*inheritance|secret|on the list|layoffs|next job|\bhr\b|legal|one star|i'?ll block|i'?ll remember|your grandma|i'?m coming over|disrespect|posting your name|showed your texts|another designer/ },
];

// texto de um evento (falas + reações), sem acento e minúsculo
const evText = ev => {
  const bits = [];
  const add = l => { if (!l) return; if (typeof l === 'string') bits.push(l); else bits.push(l.tx || l.sys || l.audio || '') };
  (ev.boss || []).forEach(add);
  // só as falas do personagem: as reações misturam assunto e geram falso positivo

  return bits.join(' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
};
const evTactics = (ev, list) => {
  if (!ev) return [];
  if (!ev._tac) { const t = evText(ev); ev._tac = list.filter(x => x.re.test(t)).map(x => x.id) }
  return ev._tac;
};
// fase da situação: a tática mais pesada que ela usa (H = sempre 3, sem tática = 1)
const evPhase = (ev, list) => ev.hard ? 3 : Math.max(1, ...evTactics(ev, list).map(id => list.find(x => x.id === id).ph));
