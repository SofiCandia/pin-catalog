/**
 * cart.js
 * Manages a shopping cart with localStorage persistence.
 * Exposes window.cartAddItem() for use by main.js.
 */

'use strict';

(function () {

  const STORAGE_KEY = 'pinCatalogCart';

  /* ── Load cart from localStorage ──────────────────────────── */
  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  /* ── Save cart to localStorage ─────────────────────────────── */
  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (_) { /* storage full or unavailable */ }
  }

  let cart = loadCart();

  /* ── Add item to cart ──────────────────────────────────────── */
  function cartAddItem(pin) {
    const existing = cart.find(item => item.id === pin.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id:       pin.id,
        name:     pin.name,
        price:    pin.price,
        image:    pin.image,
        category: pin.category,
        qty:      1
      });
    }
    saveCart(cart);
    renderCart();
    updateBadge();
  }

  /* ── Remove item from cart ─────────────────────────────────── */
  function cartRemoveItem(pinId) {
    cart = cart.filter(item => item.id !== pinId);
    saveCart(cart);
    renderCart();
    updateBadge();
  }

  /* ── Change item quantity ──────────────────────────────────── */
  function cartChangeQty(pinId, delta) {
    const item = cart.find(i => i.id === pinId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
    renderCart();
    updateBadge();
  }

  /* ── Compute total items count ─────────────────────────────── */
  function totalItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  /* ── Compute total price ───────────────────────────────────── */
  function totalPrice() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  /* ── Update FAB badge ──────────────────────────────────────── */
  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    const count = totalItems();
    if (!badge) return;
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  /* ── Render cart panel items ───────────────────────────────── */
  function renderCart() {
    const container = document.getElementById('cartItems');
    const totalEl   = document.getElementById('cartTotal');
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
      container.innerHTML = '<p class="cart-panel__empty">Tu carrito está vacío.</p>';
    } else {
      cart.forEach(item => {
        const el = createCartItem(item);
        container.appendChild(el);
      });
    }

    if (totalEl) {
      totalEl.textContent = window.formatPrice
        ? window.formatPrice(totalPrice())
        : '$' + totalPrice().toLocaleString('es-CL');
    }
  }

  /* ── Create cart item element ──────────────────────────────── */
  function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.setAttribute('data-id', item.id);

    div.innerHTML = `
      <img class="cart-item__image" src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__price">${window.formatPrice ? window.formatPrice(item.price) : '$' + item.price.toLocaleString('es-CL')}</p>
        <div class="cart-item__qty">
          <button class="cart-item__qty-btn js-qty-dec" data-id="${item.id}" aria-label="Reducir cantidad">−</button>
          <span class="cart-item__qty-count">${item.qty}</span>
          <button class="cart-item__qty-btn js-qty-inc" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
        </div>
        <button class="cart-item__remove js-remove" data-id="${item.id}" aria-label="Eliminar ${item.name}">Eliminar</button>
      </div>
    `;

    div.querySelector('.js-qty-dec').addEventListener('click', () => cartChangeQty(item.id, -1));
    div.querySelector('.js-qty-inc').addEventListener('click', () => cartChangeQty(item.id, +1));
    div.querySelector('.js-remove').addEventListener('click', () => cartRemoveItem(item.id));

    return div;
  }

  /* ── Open / Close cart panel ───────────────────────────────── */
  function openCart() {
    document.getElementById('cartPanel').hidden   = false;
    document.getElementById('cartBackdrop').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('cartPanel').hidden   = true;
    document.getElementById('cartBackdrop').hidden = true;
    document.body.style.overflow = '';
  }

  /* ── Request Order ─────────────────────────────────────────── */
  function requestOrder() {
    if (cart.length === 0) {
      window.showToast && window.showToast('Tu carrito está vacío 😊');
      return;
    }

    const lines = cart.map(i =>
      `• ${i.name} x${i.qty} — ${window.formatPrice ? window.formatPrice(i.price * i.qty) : '$' + (i.price * i.qty).toLocaleString('es-CL')}`
    ).join('\n');
    const total = window.formatPrice ? window.formatPrice(totalPrice()) : '$' + totalPrice().toLocaleString('es-CL');
    const message = encodeURIComponent(
      `¡Hola! Quiero hacer un pedido:\n\n${lines}\n\nTotal: ${total}\n\n¿Podemos coordinar la compra? 📍`
    );

    /* Open WhatsApp. Replace the empty string with a phone number to pre-select a contact,
       e.g. 'https://wa.me/56912345678?text=...' — leave empty to let the user choose. */
    const waUrl = `https://wa.me/?text=${message}`;
    window.open(waUrl, '_blank', 'noopener');
  }

  /* ── Init ──────────────────────────────────────────────────── */
  function initCart() {
    const fab       = document.getElementById('cartFab');
    const closeBtn  = document.getElementById('cartClose');
    const backdrop  = document.getElementById('cartBackdrop');
    const requestBtn = document.getElementById('cartRequest');

    if (fab)       fab.addEventListener('click', openCart);
    if (closeBtn)  closeBtn.addEventListener('click', closeCart);
    if (backdrop)  backdrop.addEventListener('click', closeCart);
    if (requestBtn) requestBtn.addEventListener('click', requestOrder);

    document.addEventListener('keydown', (e) => {
      const panel = document.getElementById('cartPanel');
      if (e.key === 'Escape' && panel && !panel.hidden) closeCart();
    });

    renderCart();
    updateBadge();
  }

  /* Expose public API */
  window.cartAddItem = cartAddItem;

  document.addEventListener('DOMContentLoaded', initCart);

})();
