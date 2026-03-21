// NAV
window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(function(a) {
  a.addEventListener('click', function() {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// TABS
function showTab(tabName) {
  // Remove active class from all grids
  document.querySelectorAll('.services-grid').forEach(function(g) {
    g.classList.remove('tab-active', 'tab-active-block');
  });
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  // Show target grid
  var target = document.getElementById('tab-' + tabName);
  if (target) {
    if (tabName === 'talleres') {
      target.classList.add('tab-active-block');
    } else {
      target.classList.add('tab-active');
    }
  }
  // Activate button
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    if (b.getAttribute('data-tab') === tabName) {
      b.classList.add('active');
    }
  });
}

// CAROUSEL - robust version
var carSlide = 0;
var carTimer = null;
var carReady = false;

function carGetPerView() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 960 ? 2 : 3;
}

function carInit() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;
  var cards = track.querySelectorAll('.testimonial-card');
  if (!cards.length) return;
  var wrap = track.parentElement;
  if (!wrap || wrap.offsetWidth === 0) {
    // Try again in 100ms if layout not ready
    setTimeout(carInit, 100);
    return;
  }
  carReady = true;
  carRender();
  carResetTimer();
}

function carRender() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;
  var cards = track.querySelectorAll('.testimonial-card');
  var perView = carGetPerView();
  var wrap = track.parentElement;
  var gap = 20;
  var totalW = wrap.offsetWidth || 800;
  var cardW = Math.floor((totalW - gap * (perView - 1)) / perView);

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.width = cardW + 'px';
    cards[i].style.minWidth = cardW + 'px';
    cards[i].style.flexShrink = '0';
  }

  var total = Math.ceil(cards.length / perView);
  if (carSlide >= total) carSlide = 0;
  var offset = carSlide * (cardW + gap) * perView;
  track.style.transform = 'translateX(-' + offset + 'px)';

  var dotsEl = document.getElementById('carouselDots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  for (var j = 0; j < total; j++) {
    var d = document.createElement('span');
    d.className = 'dot' + (j === carSlide ? ' active' : '');
    d.style.cursor = 'pointer';
    (function(idx) {
      d.onclick = function() { carSlide = idx; carRender(); carResetTimer(); };
    })(j);
    dotsEl.appendChild(d);
  }
}

function carouselNext() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;
  var cards = track.querySelectorAll('.testimonial-card');
  var total = Math.ceil(cards.length / carGetPerView());
  carSlide = (carSlide + 1) % total;
  carRender();
}
function carouselPrev() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;
  var cards = track.querySelectorAll('.testimonial-card');
  var total = Math.ceil(cards.length / carGetPerView());
  carSlide = (carSlide - 1 + total) % total;
  carRender();
}
function carResetTimer() {
  clearInterval(carTimer);
  carTimer = setInterval(carouselNext, 4500);
}

window.addEventListener('resize', function() { carSlide = 0; carRender(); });
// Multiple init attempts to handle cached pages
document.addEventListener('DOMContentLoaded', function() { setTimeout(carInit, 200); });
window.addEventListener('load', function() { setTimeout(carInit, 100); });
setTimeout(carInit, 500);

// FREE CONSULT FORM -> WhatsApp
function submitFreeConsult() {
  var name = document.getElementById('fc_name').value.trim();
  var lastname = document.getElementById('fc_lastname').value.trim();
  var email = document.getElementById('fc_email').value.trim();
  var phone = document.getElementById('fc_phone').value.trim();
  var service = document.getElementById('fc_service').value;
  var msg = document.getElementById('fc_msg').value.trim();
  var privacy = document.getElementById('fc_privacy').checked;

  if (!name) { alert('Por favor escribe tu nombre.'); return; }
  if (!email) { alert('Por favor escribe tu correo electrónico.'); return; }
  if (!privacy) { alert('Debes aceptar la política de privacidad.'); return; }

  var text = encodeURIComponent(
    '🎁 CONSULTA DIAGNÓSTICO GRATIS

' +
    '👤 Nombre: ' + name + ' ' + lastname + '
' +
    '📧 Correo: ' + email + '
' +
    '📞 Teléfono: ' + (phone || 'No indicado') + '
' +
    '🎯 Servicio: ' + (service || 'No especificado') + '
' +
    '💬 Mensaje: ' + (msg || 'Sin mensaje') + '

' +
    'Enviado desde psychessacademy.github.io'
  );
  var _waLink = document.createElement('a');
  _waLink.href = 'https://wa.me/50371250807?text=' + text;
  _waLink.target = '_blank'; _waLink.rel = 'noopener noreferrer';
  document.body.appendChild(_waLink); _waLink.click(); document.body.removeChild(_waLink);
  document.getElementById('fc_success').style.display = 'block';
  document.getElementById('fc_success').scrollIntoView({ behavior: 'smooth' });
  // Hide form fields
  var card = document.getElementById('freeFormCard');
  card.querySelectorAll('.form-group, .form-row, .privacy-check').forEach(function(el) { el.style.display = 'none'; });
  card.querySelector('.form-submit-btn').style.display = 'none';
  card.querySelector('.free-form-title').style.display = 'none';
  card.querySelector('.free-form-sub').style.display = 'none';
}

// CONTACT FORM -> WhatsApp
function sendContactWA() {
  var name = document.getElementById('ct_name').value.trim();
  var email = document.getElementById('ct_email').value.trim();
  var service = document.getElementById('ct_service').value;
  var msg = document.getElementById('ct_msg').value.trim();
  var privacy = document.getElementById('ct_privacy').checked;

  if (!name) { alert('Por favor escribe tu nombre.'); return; }
  if (!privacy) { alert('Debes aceptar la politica de privacidad.'); return; }

  var msgText = 'Hola PsyChess Academy!' +
    '%0A%0ANombre: ' + encodeURIComponent(name) +
    '%0ACorreo: ' + encodeURIComponent(email || 'No indicado') +
    '%0AServicio: ' + encodeURIComponent(service || 'No especificado') +
    '%0AMensaje: ' + encodeURIComponent(msg || 'Sin mensaje');

  var waLink = document.createElement('a');
  waLink.href = 'https://wa.me/50371250807?text=' + msgText;
  waLink.target = '_blank';
  waLink.rel = 'noopener noreferrer';
  document.body.appendChild(waLink);
  waLink.click();
  document.body.removeChild(waLink);
}function sendContactWA() {
  var name = document.getElementById('ct_name').value.trim();
  var email = document.getElementById('ct_email').value.trim();
  var service = document.getElementById('ct_service').value;
  var msg = document.getElementById('ct_msg').value.trim();
  var privacy = document.getElementById('ct_privacy').checked;

  if (!name) { alert('Por favor escribe tu nombre.'); return; }
  if (!privacy) { alert('Debes aceptar la política de privacidad.'); return; }

  var text = encodeURIComponent(
    '👋 Hola PsyChess Academy!

' +
    '👤 Nombre: ' + name + '
' +
    '📧 Correo: ' + (email || 'No indicado') + '
' +
    '🎯 Servicio: ' + (service || 'No especificado') + '
' +
    '💬 Mensaje: ' + (msg || 'Sin mensaje');

  var waLink = document.createElement('a');
  waLink.href = 'https://wa.me/50371250807?text=' + msgText;
  waLink.target = '_blank';
  waLink.rel = 'noopener noreferrer';
  document.body.appendChild(waLink);
  waLink.click();
  document.body.removeChild(waLink);
}

// SCROLL REVEAL
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .wk-card, .about-point, .pillar, .free-point, .why-item, .why-feature').forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObs.observe(el);
});