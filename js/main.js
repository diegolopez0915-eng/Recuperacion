// =========================================================
// MAIN.JS — Interacciones y animaciones
// Proyecto 2 · CodeMentor IA
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Scroll suave + cierre de menú móvil ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('mainNav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
        const nav = document.getElementById('navContent');
        if (nav && nav.classList.contains('show')) new bootstrap.Collapse(nav).hide();
      }
    });
  });

  /* ---- Navbar + progreso + volver arriba + link activo ---- */
  const mainNav = document.getElementById('mainNav');
  const backTop = document.getElementById('back-to-top');
  const progress = document.getElementById('scroll-progress');
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));

  function onScroll() {
    const y = window.pageYOffset;
    if (mainNav) mainNav.classList.toggle('scrolled', y > 40);
    if (backTop) backTop.classList.toggle('show', y > 520);
    if (progress) {
      const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    }
    let current = '';
    sections.forEach(sec => { if (y >= sec.offsetTop - 130) current = sec.getAttribute('id'); });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---- Contadores animados ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 24));
        const timer = setInterval(() => {
          n += step;
          if (n >= target) { n = target; clearInterval(timer); }
          el.textContent = n;
        }, 45);
        cIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cIO.observe(c));
  }

  /* ---- Texto que se escribe solo (hero) ---- */
  const typeEl = document.getElementById('typing-word');
  if (typeEl) {
    const words = ['programar', 'crear apps', 'pensar en código', 'resolver bugs'];
    let wi = 0, ci = 0, deleting = false;
    function type() {
      const word = words[wi];
      typeEl.textContent = word.substring(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(type, 90); }
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(type, 1700); }
      else if (deleting && ci > 0) { ci--; setTimeout(type, 45); }
      else { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 350); }
    }
    setTimeout(type, 800);
  }

  /* ---- Chat abrir / cerrar + chips + accesos ---- */
  const chatFab = document.getElementById('chat-toggle');
  const chatWin = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-input');

  function openChat() {
    chatWin.classList.add('active');
    if (chatInput) chatInput.focus();
  }
  if (chatFab && chatWin) {
    chatFab.addEventListener('click', () => {
      chatWin.classList.toggle('active');
      if (chatWin.classList.contains('active') && chatInput) chatInput.focus();
    });
  }
  if (chatClose && chatWin) chatClose.addEventListener('click', () => chatWin.classList.remove('active'));

  ['nav-chat', 'hero-chat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', (e) => { e.preventDefault(); openChat(); });
  });

  document.querySelectorAll('.chat-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q');
      if (!q || !chatInput) return;
      chatInput.value = q;
      document.getElementById('chat-send').click();
    });
  });

  /* ---- Contador de caracteres del ejercicio ---- */
  const fixInput = document.getElementById('fix-input');
  const fixCount = document.getElementById('fix-count');
  if (fixInput && fixCount) {
    fixInput.addEventListener('input', () => { fixCount.textContent = fixInput.value.length; });
  }

  /* ---- Año dinámico ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  onScroll();
});
