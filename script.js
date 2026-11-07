// Pato Clean — interações do site (seleção de itens, mensagem do WhatsApp e perguntas frequentes)
(function () {
  var NUMERO = '5547997829540';
  var BASE = 'Olá, Pato Clean! 🦆\nQuero um orçamento de higienização.';
  var FIM = '\nPode me passar valor e disponibilidade?';
  var AMARELO = 'oklch(0.886 0.177 95.2)';

  var itens = Array.prototype.slice.call(document.querySelectorAll('button[aria-pressed]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('a[href*="wa.me"]'));

  function nomeDoItem(botao) {
    var s = botao.querySelector('span');
    return (s ? s.textContent : botao.textContent).trim();
  }

  function atualizarLinks() {
    var marcados = itens.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; }).map(nomeDoItem);
    var msg = BASE + (marcados.length ? '\nItens: ' + marcados.join(', ') + '.' : '') + FIM;
    var url = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(msg);
    links.forEach(function (a) { a.href = url; });
  }

  itens.forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.style.backgroundColor = on ? AMARELO : '';
      atualizarLinks();
    });
  });

  // Conversão do Google Ads ao clicar em qualquer botão de WhatsApp
  links.forEach(function (a) {
    a.addEventListener('click', function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: 'AW-18436557438/QHtwCM_JnJ0dEP6UntdE', transport_type: 'beacon' });
      }
    });
  });

  // Perguntas frequentes (abrir/fechar)
  document.querySelectorAll('button[aria-expanded]').forEach(function (b) {
    var painel = document.querySelector('[role="region"][aria-labelledby="' + b.id + '"]');
    var item = b.closest('[data-state]') && b.parentElement && b.parentElement.parentElement;
    b.addEventListener('click', function () {
      var abrir = b.getAttribute('aria-expanded') !== 'true';
      var estado = abrir ? 'open' : 'closed';
      b.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      [b, b.parentElement, item, painel].forEach(function (el) { if (el) el.setAttribute('data-state', estado); });
      if (painel) painel.hidden = !abrir;
    });
  });

  atualizarLinks();
})();
