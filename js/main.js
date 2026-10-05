(function () {
  'use strict';
  // Tramas: lineas onduladas generadas por codigo
  document.querySelectorAll('.tramas').forEach(function (svg) {
    var d = '';
    for (var i = 0; i < 14; i++) {
      var o = i * 9;
      d += '<path d="M-20 ' + (260 + o) + ' C 150 ' + (120 + o) + ', 230 ' + (520 - o) + ', 330 ' + (430 + o) +
           ' S 520 ' + (330 - o) + ', 640 ' + (560 + o) + '"/>';
    }
    svg.innerHTML = d;
  });

  // Navbar con fondo al hacer scroll
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Cerrar menu movil al elegir un enlace
  document.querySelectorAll('#menu .nav-link, #menu .btn').forEach(function (a) {
    a.addEventListener('click', function () {
      var m = document.getElementById('menu');
      if (m.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(m).hide();
    });
  });

  // Reveal al entrar en pantalla
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('visible'); });
  }

  // Formulario (validacion en el cliente)
  var form = document.getElementById('form');
  var ok = document.getElementById('ok');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('.form-control, .form-select').forEach(function (f) {
      var good = f.checkValidity();
      f.classList.toggle('is-invalid', !good);
      if (!good) valid = false;
    });
    ok.classList.toggle('d-none', !valid);
    if (valid) form.reset();
  });

  document.getElementById('year').textContent = '\u00A9 ' + new Date().getFullYear();
})();
