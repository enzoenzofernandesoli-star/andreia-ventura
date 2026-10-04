const fs = require('node:fs');
const path = require('node:path');

const raiz = path.resolve(__dirname, '..');
const destino = path.join(raiz, 'dist');
if (path.dirname(destino) !== raiz || path.basename(destino) !== 'dist') {
  throw new Error('Diretório de saída inválido');
}
fs.mkdirSync(destino, { recursive: true });
// Publicar apenas os arquivos do navegador; server.cjs é exclusivo do ambiente local.
for (const arquivo of ['index.html', 'styles.css', 'app.js', 'assets', 'src/data']) {
  const saida = path.join(destino, arquivo);
  fs.mkdirSync(path.dirname(saida), { recursive: true });
  fs.cpSync(path.join(raiz, arquivo), saida, { recursive: true });
}
console.log('Site estático preparado em dist/.');
