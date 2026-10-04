# Andreia Ventura — Podologia

Modelo de site responsivo para apresentação de uma clínica de podologia, em verde musgo e dourado. Conteúdo e fotografias ilustrativos.

## Abrir localmente

Abra `index.html` no navegador ou execute:

```sh
npm start
```

Acesse `http://127.0.0.1:4173`. O servidor requer Node.js e não precisa de instalação de dependências.

## Recursos

- Layout para computador e celular, sem animações.
- Hero mobile com fotografia atrás do texto e contraste reforçado.
- Menu mobile, detalhes dos serviços, dúvidas expansíveis e contato demonstrativo.
- Fotografias responsivas AVIF/WebP e fonte Manrope local.
- Navegação por teclado e retorno de foco nos diálogos.

## Verificar código

```sh
npm run check
```

## Antes de publicar

Confirmar nome, serviços, telefone, endereço e imagens reais. O agendamento é demonstrativo e não envia solicitações. A página está marcada como `noindex,nofollow` enquanto for um modelo.

Os arquivos podem ser hospedados em um servidor estático. Não há API, banco de dados ou integração de agendamento.

## Vercel

O arquivo `vercel.json` define a publicação estática: `npm run build` prepara `dist/`, contendo somente arquivos do navegador. O preset é `Other` (`framework: null`). O servidor `server.cjs` serve apenas para desenvolvimento local e não deve ser executado como função na Vercel.

Detalhes de implementação e testes em [LEIA-ME.md](LEIA-ME.md). Créditos dos recursos em [assets/CREDITOS.md](assets/CREDITOS.md).
