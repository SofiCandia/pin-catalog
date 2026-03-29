/**
 * filters.js
 * Handles category filter buttons – filters the pin grid
 * without reloading the page. Uses a 300ms fade transition.
 */

'use strict';

(function () {

  const TRANSITION_MS = 300;
  let activeFilter = 'todos';

  /* ── Apply filter ──────────────────────────────────────────── */
  function applyFilter(category) {
    activeFilter = category;

    const filtered = category === 'todos'
      ? window.PINS_DATA
      : window.PINS_DATA.filter(p => p.category === category);

    const grid = document.getElementById('pinsGrid');

    /* Fade out */
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(6px)';
    grid.style.transition = `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`;

    setTimeout(() => {
      window.renderPins(filtered);

      /* Fade in */
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    }, TRANSITION_MS);
  }

  /* ── Update button active states ───────────────────────────── */
  function updateButtons(activeCategory) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const isActive = btn.dataset.filter === activeCategory;
      btn.classList.toggle('filter-btn--active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  /* ── Init filters ──────────────────────────────────────────── */
  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter;
        if (category === activeFilter) return; /* No-op if already selected */
        updateButtons(category);
        applyFilter(category);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initFilters);

})();
