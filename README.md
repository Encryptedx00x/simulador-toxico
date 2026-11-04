# Simulador Tóxico — toxico.online

Jogo interativo de humor, em formato de conversa, bilíngue (PT/EN). A pessoa enfrenta situações
difíceis — um chefe abusivo ou um relacionamento tóxico — e vai reconhecendo os padrões de
comportamento por trás delas. Site estático, sem build, sem backend e sem IA: todo o conteúdo é
escrito à mão, com roteiros próprios por idioma (o inglês é localizado, não traduzido).

## Arquitetura

- `content-pt.js` / `content-en.js` — cenários (chefe, relacionamento), situações e finais.
- `personas.js` — 3 personagens por cenário/idioma; cada partida sorteia um, com abertura,
  cobranças e despedida próprias, mais 3 situações exclusivas.
- `game.js` — o motor: chat, timers, níveis de toxicidade, respostas livres por palavras-chave e
  coleção de finais.

## Rodar localmente

```bash
python -m http.server 5173
# http://localhost:5173
```

Links diretos: `?s=chefe`, `?s=namorado`, `?s=namorada`, `&lang=en`.

## Publicar

É um site 100% estático: basta servir os arquivos versionados em qualquer servedor web ou
hospedagem estática. Os links dos scripts no `index.html` aceitam um parâmetro de versão
(`?v=<commit>`) para evitar cache antigo após uma atualização.
