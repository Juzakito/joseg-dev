/**
 * JOSÉ GONZÁLEZ — PORTFOLIO ULTRA PREMIUM
 * Interactive Logic: Spotlight, ScrollSpy, Lightbox, Clipboard & Analytics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Efecto Spotlight dinámico en tarjetas (Estilo Linear / Vercel)
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 2. IntersectionObserver para Revelado Suave en Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. ScrollSpy para el Navbar Flotante
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollSpyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  // 4. Galería Interactiva de Casos de Estudio (INVENTA)
  const mainPreview = document.getElementById('inventa-main-preview-img');
  const previewCaption = document.getElementById('inventa-preview-caption');
  const thumbBtns = document.querySelectorAll('.case-thumb-btn');

  const captionsMap = {
    'inventa-dashboard.jpg': 'Dashboard Ejecutivo — KPIs y predicción de demanda',
    'inventa-inventory.jpg': 'Gestión de Inventarios — Control de stock y niveles críticos',
    'inventa-analytics.jpg': 'Analítica Predictiva — Tendencias y compras automatizadas',
    'inventa-mobile.jpg': 'Experiencia Responsive — Acceso en cualquier dispositivo'
  };

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      if (!src) return;

      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mainPreview) {
        mainPreview.style.opacity = '0.4';
        setTimeout(() => {
          mainPreview.src = src;
          mainPreview.style.opacity = '1';
          if (previewCaption && captionsMap[src]) {
            previewCaption.textContent = captionsMap[src];
          }
        }, 120);
      }
    });
  });

  // 5. Lightbox Modal para Inspección de Capturas
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const previewContainer = document.getElementById('inventa-main-preview');

  if (previewContainer && lightbox && lightboxImg) {
    previewContainer.addEventListener('click', () => {
      if (mainPreview) {
        lightboxImg.src = mainPreview.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

  // 6. Copia de Email con Notificación Toast Flotante
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', e => {
      e.preventDefault();
      const email = 'jmgonzalez.contact@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Correo copiado: jmgonzalez.contact@gmail.com');
      }).catch(() => {
        showToast('Correo: jmgonzalez.contact@gmail.com');
      });
    });
  }

  // 7. Manejo del Formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';

      setTimeout(() => {
        submitBtn.innerHTML = '✓ ¡Mensaje Recibido!';
        showToast('✓ Gracias por tu mensaje. Te responderé en breve.');
        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 4000);
      }, 700);
    });
  }
});
