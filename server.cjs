const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const raiz = __dirname;
const porta = Number(process.env.PORT || 4173);
const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
http.createServer((pedido, resposta) => {
  let caminho;
  try { caminho = decodeURIComponent(new URL(pedido.url, 'http://localhost').pathname); } catch { resposta.writeHead(400); return resposta.end('Pedido inválido'); }
  const arquivo = path.resolve(raiz, '.' + (caminho === '/' ? '/index.html' : caminho));
  if (!arquivo.startsWith(raiz + path.sep)) { resposta.writeHead(403); return resposta.end('Acesso negado'); }
  fs.stat(arquivo, (erro, estado) => {
    if (erro || !estado.isFile()) { resposta.writeHead(404); return resposta.end('Arquivo não encontrado'); }
    const extensao = path.extname(arquivo);
    const etag = `W/"${estado.size}-${Math.trunc(estado.mtimeMs)}"`;
    const cabecalhos = {
      'Content-Type': tipos[extensao] || 'application/octet-stream',
      'Cache-Control': /\.(avif|webp|woff2|svg)$/.test(extensao) ? 'public, max-age=3600' : 'no-cache',
      'ETag': etag,
      'Vary': 'Accept-Encoding',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
    if (pedido.headers['if-none-match'] === etag) { resposta.writeHead(304, cabecalhos); return resposta.end(); }
    const compactar = /\.(html|css|js|svg|json)$/.test(extensao) && estado.size > 1024 && /\bgzip\b/.test(pedido.headers['accept-encoding'] || '');
    if (compactar) cabecalhos['Content-Encoding'] = 'gzip';
    else cabecalhos['Content-Length'] = estado.size;
    resposta.writeHead(200, cabecalhos);
    if (pedido.method === 'HEAD') return resposta.end();
    const leitura = fs.createReadStream(arquivo);
    leitura.on('error', () => resposta.destroy());
    if (compactar) leitura.pipe(zlib.createGzip()).pipe(resposta);
    else leitura.pipe(resposta);
  });
}).listen(porta, '127.0.0.1', () => console.log(`Modelo disponível em http://127.0.0.1:${porta}`));
