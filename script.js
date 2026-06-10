/* ── Scroll progress bar ── */
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (s / h * 100) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ── Nav: scrolled state ── */
const navbar = document.getElementById('navbar');
function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── Mobile menu ── */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Reveal on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ── Hero parallax ── */
const heroPhoto = document.getElementById('heroPhoto');
function updateParallax() {
  if (!heroPhoto) return;
  const y = window.scrollY;
  if (y < window.innerHeight * 1.2) {
    heroPhoto.style.transform = `translateY(${y * 0.35}px)`;
  }
}
window.addEventListener('scroll', updateParallax, { passive: true });

/* ── Hero particles ── */
const particlesContainer = document.getElementById('heroParticles');
function spawnParticle() {
  if (!particlesContainer) return;
  const p = document.createElement('div');
  p.className = 'hero-particle';
  const size = Math.random() * 6 + 2;
  const x = Math.random() * 100;
  const duration = Math.random() * 12 + 10;
  const delay = Math.random() * 6;
  p.style.cssText = `
    width:${size}px;height:${size}px;
    left:${x}%;bottom:${Math.random() * 20 - 10}%;
    animation-duration:${duration}s;
    animation-delay:${delay}s;
  `;
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), (duration + delay) * 1000);
}
for (let i = 0; i < 18; i++) spawnParticle();
setInterval(spawnParticle, 2200);

/* ── Floating CTA visibility ── */
const floatingCta = document.getElementById('floatingCta');
window.addEventListener('scroll', () => {
  floatingCta.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── Form submit feedback ── */
const formSubmit = document.getElementById('formSubmit');
if (formSubmit) {
  formSubmit.addEventListener('click', () => {
    formSubmit.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Demande envoyée !
    `;
    formSubmit.style.background = '#1a7a40';
    formSubmit.disabled = true;
    setTimeout(() => {
      formSubmit.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Envoyer ma demande
      `;
      formSubmit.style.background = '';
      formSubmit.disabled = false;
    }, 3000);
  });
}

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
