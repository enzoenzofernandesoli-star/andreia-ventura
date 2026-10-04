const botaoMenu = document.querySelector('.menu-botao');
const navegacao = document.querySelector('#navegacao');
function fecharMenu() { navegacao.classList.remove('aberto'); botaoMenu.setAttribute('aria-expanded', 'false'); botaoMenu.setAttribute('aria-label', 'Abrir menu'); }
botaoMenu.addEventListener('click', () => {
  const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
  navegacao.classList.toggle('aberto', !aberto);
  botaoMenu.setAttribute('aria-expanded', String(!aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
});
navegacao.querySelectorAll('a').forEach(link => link.addEventListener('click', fecharMenu));
document.addEventListener('keydown', evento => { if (evento.key === 'Escape' && navegacao.classList.contains('aberto')) { fecharMenu(); botaoMenu.focus(); } });
document.addEventListener('click', evento => { if (!evento.target.closest('.cabecalho')) fecharMenu(); });
window.matchMedia('(min-width: 901px)').addEventListener('change', fecharMenu);
document.addEventListener('focusin', evento => {
  if (!evento.target.closest('.cabecalho')) fecharMenu();
});
const modal = document.querySelector('#modal');
let origemModal;
function abrirModal(titulo, texto, agendamento = false) {
  origemModal = document.activeElement;
  document.querySelector('#modal-titulo').textContent = titulo;
  document.querySelector('#modal-texto').textContent = texto;
  modal.querySelector('.sobretitulo').textContent = agendamento ? 'MODELO DEMONSTRATIVO' : 'CUIDADO INDIVIDUAL';
  modal.querySelector('.aviso-modal').hidden = agendamento;
  document.body.classList.add('modal-aberto');
  modal.showModal();
}
document.querySelectorAll('[data-servico]').forEach(botao => botao.addEventListener('click', () => {
  const servico = window.dadosClinica.servicos[botao.dataset.servico];
  abrirModal(servico.titulo, servico.texto);
}));
document.querySelector('[data-agendar]').addEventListener('click', () => abrirModal('Vamos cuidar de você.', 'Este site é um modelo de apresentação. O telefone e a agenda ainda serão confirmados pela clínica. Nenhuma solicitação foi enviada e nenhum agendamento foi realizado.', true));
document.querySelector('.fechar-modal').addEventListener('click', () => modal.close());
document.querySelector('#modal-acao').addEventListener('click', () => modal.close());
modal.addEventListener('click', evento => { const retangulo = modal.getBoundingClientRect(); if (evento.target === modal && (evento.clientX < retangulo.left || evento.clientX > retangulo.right || evento.clientY < retangulo.top || evento.clientY > retangulo.bottom)) modal.close(); });
modal.addEventListener('close', () => { document.body.classList.remove('modal-aberto'); origemModal?.focus(); });

// O atalho só aparece depois da hero e sai antes da área de contato.
const barraMobile = document.querySelector('.barra-mobile');
const hero = document.querySelector('.hero');
const contato = document.querySelector('#contato');
const telaPequena = window.matchMedia('(max-width: 640px)');
function atualizarAtalho() {
  const passouHero = hero.getBoundingClientRect().bottom <= 0;
  const chegouContato = contato.getBoundingClientRect().top < window.innerHeight;
  barraMobile.hidden = !telaPequena.matches || !passouHero || chegouContato || modal.open;
}
const observadorSecoes = new IntersectionObserver(atualizarAtalho, { threshold: 0 });
observadorSecoes.observe(hero);
observadorSecoes.observe(contato);
telaPequena.addEventListener('change', atualizarAtalho);
modal.addEventListener('close', atualizarAtalho);
document.querySelectorAll('[data-servico], [data-agendar]').forEach(botao => botao.addEventListener('click', atualizarAtalho));
atualizarAtalho();
