/**
 * main.js
 * Initializes the pin catalog: renders pin cards, handles modal,
 * mobile menu toggle, contact form, and footer year.
 */

'use strict';

/* ── Pin Data ─────────────────────────────────────────────────── */
const PINS_DATA = [
  {
    id: 1,
    name: 'Totoro en el bosque',
    category: 'anime',
    categoryLabel: 'Anime',
    description: 'El adorable espíritu del bosque en su forma más tierna. Esmalte brillante con detalles en dorado.',
    price: 4500,
    image: 'assets/images/pins/pin-1.svg',
    specs: { Tamaño: '3 cm', Material: 'Zinc + esmalte', Esmalte: 'Brillante' }
  },
  {
    id: 2,
    name: 'Nota Musical',
    category: 'musica',
    categoryLabel: 'Música',
    description: 'Para los que llevan la música en el corazón. Diseño minimalista con fondo burdeo y nota dorada.',
    price: 3500,
    image: 'assets/images/pins/pin-2.svg',
    specs: { Tamaño: '2.5 cm', Material: 'Zinc + esmalte', Esmalte: 'Mate' }
  },
  {
    id: 3,
    name: 'Paleta de Artista',
    category: 'arte',
    categoryLabel: 'Arte',
    description: 'Una pequeña paleta de colores que celebra la creatividad. Multicolor con bordes plateados.',
    price: 5000,
    image: 'assets/images/pins/pin-3.svg',
    specs: { Tamaño: '3.5 cm', Material: 'Zinc + esmalte', Esmalte: 'Brillante' }
  },
  {
    id: 4,
    name: 'Meme Stonks',
    category: 'humor',
    categoryLabel: 'Humor',
    description: 'El meme más viral hecho pin. Perfecto para arrancar una sonrisa a cualquiera.',
    price: 3000,
    image: 'assets/images/pins/pin-4.svg',
    specs: { Tamaño: '3 cm', Material: 'Zinc + esmalte', Esmalte: 'Brillante' }
  },
  {
    id: 5,
    name: 'Nombre Personalizado',
    category: 'personalizado',
    categoryLabel: 'Personalizado',
    description: 'Tu nombre o el mensaje que elijas. Diseño exclusivo creado especialmente para ti.',
    price: 7000,
    image: 'assets/images/pins/pin-5.svg',
    specs: { Tamaño: '4 cm', Material: 'Zinc + esmalte', Esmalte: 'Mate o Brillante' }
  },
  {
    id: 6,
    name: 'Naruto Uzumaki',
    category: 'anime',
    categoryLabel: 'Anime',
    description: 'El ninja más carismático en versión chibi. Esmalte duro con detalles en naranja y amarillo.',
    price: 4800,
    image: 'assets/images/pins/pin-6.svg',
    specs: { Tamaño: '3.2 cm', Material: 'Zinc + esmalte', Esmalte: 'Brillante' }
  },
  {
    id: 7,
    name: 'Vinilo Retro',
    category: 'musica',
    categoryLabel: 'Música',
    description: 'Un disco de vinilo en estilo retro que rinde homenaje a la música analógica.',
    price: 4000,
    image: 'assets/images/pins/pin-7.svg',
    specs: { Tamaño: '3 cm', Material: 'Zinc + esmalte', Esmalte: 'Glitter' }
  },
  {
    id: 8,
    name: 'Galaxia Acuarela',
    category: 'arte',
    categoryLabel: 'Arte',
    description: 'Una galaxia en tonos violetas y azules con efecto acuarela único. Cada pin es irrepetible.',
    price: 5500,
    image: 'assets/images/pins/pin-8.svg',
    specs: { Tamaño: '3.8 cm', Material: 'Zinc + esmalte', Esmalte: 'Translúcido' }
  },
  {
    id: 9,
    name: 'Gato de Schrödinger',
    category: 'humor',
    categoryLabel: 'Humor',
    description: '¿Está vivo o muerto? La incertidumbre nunca fue tan adorable. Perfecto para amantes de la física.',
    price: 3800,
    image: 'assets/images/pins/pin-9.svg',
    specs: { Tamaño: '2.8 cm', Material: 'Zinc + esmalte', Esmalte: 'Mate' }
  },
  {
    id: 10,
    name: 'Pino de Temporada',
    category: 'personalizado',
    categoryLabel: 'Personalizado',
    description: 'Un pino verde con detalles de tu elección: estrellas, nieve, luces. Especial para fechas.',
    price: 6500,
    image: 'assets/images/pins/pin-10.svg',
    specs: { Tamaño: '4 cm', Material: 'Zinc + esmalte', Esmalte: 'Brillante' }
  },
  {
    id: 11,
    name: 'Demon Slayer',
    category: 'anime',
    categoryLabel: 'Anime',
    description: 'Tanjiro con su kimono de llamas. Colores vibrantes y contornos negros precisos.',
    price: 5200,
    image: 'assets/images/pins/pin-11.svg',
    specs: { Tamaño: '3.5 cm', Material: 'Zinc + esmalte', Esmalte: 'Brillante' }
  },
  {
    id: 12,
    name: 'Cafeína ☕',
    category: 'humor',
    categoryLabel: 'Humor',
    description: 'Para los que no pueden funcionar sin su dosis de café. Divertido y muy universitario.',
    price: 3200,
    image: 'assets/images/pins/pin-12.svg',
    specs: { Tamaño: '2.5 cm', Material: 'Zinc + esmalte', Esmalte: 'Mate' }
  }
];

/* Expose pins data globally for filters.js and cart.js */
window.PINS_DATA = PINS_DATA;

/* ── Format currency (CLP) ────────────────────────────────────── */
function formatPrice(price) {
  return '$' + price.toLocaleString('es-CL');
}
window.formatPrice = formatPrice;

/* ── Render pin cards ─────────────────────────────────────────── */
function renderPins(pins) {
  const grid = document.getElementById('pinsGrid');
  const emptyMsg = document.getElementById('emptyMsg');

  if (!grid) return;

  grid.innerHTML = '';

  if (pins.length === 0) {
    emptyMsg.hidden = false;
    return;
  }
  emptyMsg.hidden = true;

  pins.forEach((pin, index) => {
    const card = createPinCard(pin, index);
    grid.appendChild(card);
  });
}
window.renderPins = renderPins;

/* ── Create a single pin card element ────────────────────────── */
function createPinCard(pin, index) {
  const card = document.createElement('article');
  card.className = 'pin-card';
  card.setAttribute('data-id', pin.id);
  card.setAttribute('data-category', pin.category);
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Ver detalles de ${pin.name}`);
  card.style.animationDelay = `${index * 0.05 + 0.05}s`;

  card.innerHTML = `
    <div class="pin-card__image-wrap">
      <img class="pin-card__image" src="${pin.image}" alt="${pin.name}" loading="lazy" />
      <div class="pin-card__overlay" aria-hidden="true"></div>
    </div>
    <div class="pin-card__body">
      <p class="pin-card__category">${pin.categoryLabel}</p>
      <h3 class="pin-card__name">${pin.name}</h3>
      <p class="pin-card__price">${formatPrice(pin.price)}</p>
      <button class="pin-card__btn" data-id="${pin.id}" aria-label="Ver detalles de ${pin.name}">
        Ver Detalles
      </button>
    </div>
  `;

  /* Click or keyboard opens modal */
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('pin-card__btn')) {
      openModal(pin.id);
    }
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(pin.id);
    }
  });

  card.querySelector('.pin-card__btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(pin.id);
  });

  return card;
}

/* ── Modal ────────────────────────────────────────────────────── */
let currentModalPin = null;

function openModal(pinId) {
  const pin = PINS_DATA.find(p => p.id === pinId);
  if (!pin) return;
  currentModalPin = pin;

  document.getElementById('modalImage').src = pin.image;
  document.getElementById('modalImage').alt = pin.name;
  document.getElementById('modalCategory').textContent = pin.categoryLabel;
  document.getElementById('modalPinName').textContent = pin.name;
  document.getElementById('modalDescription').textContent = pin.description;
  document.getElementById('modalPrice').textContent = formatPrice(pin.price);

  const specsList = document.getElementById('modalSpecs');
  specsList.innerHTML = '';
  Object.entries(pin.specs).forEach(([key, val]) => {
    const li = document.createElement('li');
    li.className = 'modal__spec-item';
    li.innerHTML = `<strong>${key}:</strong> ${val}`;
    specsList.appendChild(li);
  });

  const overlay = document.getElementById('modalOverlay');
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';

  /* Focus the close button for accessibility */
  setTimeout(() => document.getElementById('modalClose').focus(), 50);
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.hidden = true;
  document.body.style.overflow = '';
  currentModalPin = null;
}

/* ── Modal Event Listeners ────────────────────────────────────── */
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const addCartBtn = document.getElementById('modalAddCart');
  const shareBtn = document.getElementById('modalShare');

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });

  addCartBtn.addEventListener('click', () => {
    if (currentModalPin) {
      window.cartAddItem(currentModalPin);
      closeModal();
      showToast(`"${currentModalPin.name}" añadido al carrito 🛒`);
    }
  });

  shareBtn.addEventListener('click', () => {
    if (!currentModalPin) return;
    const text = `¡Mira este pin! ${currentModalPin.name} — ${formatPrice(currentModalPin.price)}`;
    if (navigator.share) {
      navigator.share({ title: currentModalPin.name, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        showToast('¡Enlace copiado al portapapeles! 📋');
      }).catch(() => {
        showToast('Comparte: ' + text);
      });
    }
  });
}

/* ── Toast Notification ───────────────────────────────────────── */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('toast--show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('toast--show');
  }, 3000);
}
window.showToast = showToast;

/* ── Mobile Menu Toggle ───────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  /* Close on nav link click */
  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Contact Form ─────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('¡Mensaje enviado! Te contactaremos pronto 💌');
    form.reset();
  });
}

/* ── Footer Year ──────────────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Smooth scroll for anchor links ─────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Init ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderPins(PINS_DATA);
  initModal();
  initMobileMenu();
  initContactForm();
  setFooterYear();
  initSmoothScroll();
});
