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
  document.querySelector('#previa-mensagem').hidden = true;
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
const escolhas = [...document.querySelectorAll('input[name="servicos"]')];
const cartoes = [...document.querySelectorAll('.servico')];
const botaoVer = document.querySelector('#ver-servicos');
const resumo = document.querySelector('#resumo-servicos');
function servicosEscolhidos() {
  return escolhas.filter(campo => campo.checked).map(campo => window.dadosClinica.servicos[campo.value].titulo);
}
function atualizarSelecao() {
  const titulos = servicosEscolhidos();
  resumo.textContent = titulos.length ? `${titulos.length} ${titulos.length === 1 ? 'cuidado selecionado' : 'cuidados selecionados'}: ${titulos.join(' · ')}.` : 'Escolha os serviços acima ou converse conosco para entender por onde começar.';
  escolhas.forEach(campo => {
    campo.closest('.servico').classList.toggle('selecionado', campo.checked);
    campo.nextElementSibling.textContent = campo.checked ? 'Cuidado selecionado' : 'Selecionar cuidado';
  });
}
escolhas.forEach(campo => {
  campo.closest('label').hidden = false;
  campo.addEventListener('change', atualizarSelecao);
});
cartoes.slice(4).forEach(cartao => { cartao.hidden = true; });
botaoVer.hidden = false;
document.querySelector('#convite-servicos').hidden = false;
botaoVer.addEventListener('click', () => {
  const abrir = botaoVer.getAttribute('aria-expanded') !== 'true';
  cartoes.slice(4).forEach(cartao => { cartao.hidden = !abrir; });
  botaoVer.setAttribute('aria-expanded', String(abrir));
  botaoVer.innerHTML = abrir ? 'Ver menos serviços <span aria-hidden="true">−</span>' : 'Ver mais serviços <span aria-hidden="true">+</span>';
  if (abrir) escolhas[4].focus({ preventScroll: true });
});
function montarMensagem() {
  const titulos = servicosEscolhidos();
  return titulos.length ? `Olá! Gostaria de agendar uma avaliação e saber mais sobre os seguintes cuidados:\n\n${titulos.map(titulo => `• ${titulo}`).join('\n')}\n\nQuais horários estão disponíveis?` : 'Olá! Gostaria de agendar uma avaliação de podologia. Podem me orientar sobre os cuidados e horários disponíveis?';
}
document.querySelectorAll('[data-agendar]').forEach(botao => botao.addEventListener('click', () => {
  const mensagem = montarMensagem();
  const telefone = String(window.dadosClinica.telefone || '').replace(/\D/g, '');
  if (/^55\d{10,11}$/.test(telefone)) {
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener,noreferrer');
    return;
  }
  abrirModal('Seu cuidado, em uma mensagem.', 'Sua mensagem está pronta. O WhatsApp da clínica ainda será confirmado; por enquanto, você pode copiar o texto. Nenhuma mensagem foi enviada.', true);
  document.querySelector('#mensagem-servicos').value = mensagem;
  document.querySelector('#status-copia').textContent = '';
  document.querySelector('#previa-mensagem').hidden = false;
}));
document.querySelector('#copiar-mensagem').addEventListener('click', async () => {
  const campo = document.querySelector('#mensagem-servicos');
  try {
    await navigator.clipboard.writeText(campo.value);
    document.querySelector('#status-copia').textContent = 'Mensagem copiada.';
  } catch {
    campo.focus();
    campo.select();
    document.querySelector('#status-copia').textContent = 'Selecione e copie o texto acima.';
  }
});
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
