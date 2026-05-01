const btnDemo = document.getElementById('btnDemo');
const btnStart = document.getElementById('btnStart');
const contactForm = document.getElementById('contactForm');
const submitFeedback = document.getElementById('submitFeedback');
const hamburgerToggle = document.getElementById('hamburgerToggle');
const siteNav = document.getElementById('siteNav');

const scrollToSection = (targetId) => {
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

btnDemo?.addEventListener('click', () => scrollToSection('#produk'));
btnStart?.addEventListener('click', () => scrollToSection('#kontak'));

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();
  
  const whatsappMessage = `Halo, saya ${name}%0AEmail: ${email}%0APesan: ${message}`;
  const whatsappUrl = `https://wa.me/+6281283338556?text=${whatsappMessage}`;
  
  window.open(whatsappUrl, '_blank');
  contactForm.reset();
});

hamburgerToggle?.addEventListener('click', () => {
  hamburgerToggle.classList.toggle('active');
  siteNav?.classList.toggle('open');
  const expanded = hamburgerToggle.classList.contains('active');
  hamburgerToggle.setAttribute('aria-expanded', String(expanded));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      hamburgerToggle?.classList.remove('active');
      hamburgerToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const faqCards = document.querySelectorAll('.faq-card');
faqCards.forEach((card) => {
  const button = card.querySelector('.faq-question');
  button?.setAttribute('aria-expanded', 'false');
  button?.addEventListener('click', () => {
    const isOpen = card.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Animasi scroll untuk semua elemen
const animateOnScroll = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Pilih semua elemen yang ingin dianimasikan
  const elementsToAnimate = document.querySelectorAll(`
    .hero-copy, .hero-card, .hero-stats, .hero-actions,
    .trust-item, .feature-card, .product-card, .journey-card,
    .highlight-card, .gallery-card, .testimonial-card, .faq-card,
    .section-heading, .contact-card, .video-wrap
  `);

  elementsToAnimate.forEach((el) => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
};

// Jalankan animasi saat DOM siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}

// Parallax effect untuk background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const body = document.body;
  body.style.setProperty('--scroll-offset', `${scrolled * 0.5}px`);
})
