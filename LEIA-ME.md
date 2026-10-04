# Modelo navegável de podologia

Abra `index.html` diretamente no navegador, ou execute `npm start` nesta pasta e acesse http://127.0.0.1:4173. Requer Node.js apenas para o servidor local. Não há dependências de instalação.

Página responsiva em HTML, CSS e JavaScript, com fonte e imagens locais. Sem animações, integrações, formulário de coleta ou publicação. Menu mobile, detalhes dos serviços, perguntas frequentes e diálogo de agendamento demonstrativo funcionam localmente.

O nome é provisório. Fotos geradas pela ferramenta imagegen são fictícias; não representam a profissional nem o ambiente real. A marca vetorial é uma adaptação conceitual do círculo e contorno do pé. Os ícones de interface são Solar Outline, disponibilizados pelo Iconify. Manrope é distribuída sob SIL Open Font License.

O arquivo `src/data/clinica.js` concentra dados de negócio e textos dos serviços. Telefones e endereço ainda não foram informados. Não configure contatos inventados. Antes de publicar, confirmar nome, serviços, conteúdo, contatos e fotografias; remover a restrição de indexação apenas quando o site estiver pronto para uso real.

Direção visual: musgo #304A3C, verde profundo #1C2D24, dourado #C8AE78, marfim #F3EFE6, sálvia #DCE5DC e linho #E9E1D3. Espaçamento amplo, recortes discretos, sem ondas entre seções. Tipografia Manrope.

## Revisão otimizada — 2026-10-04
Hero e navegação revisadas, tipografia maior, serviços em lista no celular, atalho contextual de contato, imagens responsivas AVIF com fallback WebP e carregamento adiado abaixo da dobra. Sem animações.

Verificação local: cinco larguras entre 320 e 1440 px, sem overflow, imagens ausentes ou erros de JavaScript. Menu, diálogos, FAQ, retorno de foco e conteúdo sem JavaScript verificados. Axe WCAG A/AA não encontrou violações automáticas no estado inicial mobile; isso não substitui uma auditoria humana completa.

Comparação em laboratório: navegador Edge, viewport 390x844, DPR 2, cache desabilitado, latência 150 ms, download 200.000 bytes/s e CPU 4x mais lenta. LCP observado caiu de 10.044 ms para 984 ms. Transferência inicial de recursos caiu de 1.897.424 para 75.640 bytes, aproximadamente 96%. CLS observado: 0. Medição única em cada versão; não representa dados de usuários reais nem garantia em produção.

As fotos originais foram preservadas em work/originais no projeto. O site usa apenas as variantes leves. Os arquivos de imagem AVIF maiores somam 154.386 bytes, contra 5.418.883 bytes dos PNGs originais (redução de aproximadamente 97%).
