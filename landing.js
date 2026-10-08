/**
 * Pharm 101: Landing Page & Directory
 * Google Material Design 3 Mobile-First Vanilla Web App
 */

(() => {
  'use strict';

  const state = {
    theme: localStorage.getItem('gtn_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    filter: 'all',
    searchQuery: ''
  };

  const body = document.body;
  const topAppBar = document.getElementById('topAppBar');
  const menuButton = document.getElementById('menuButton');
  const navDrawer = document.getElementById('navDrawer');
  const drawerScrim = document.getElementById('drawerScrim');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const metaThemeColor = document.getElementById('meta-theme-color');
  const catalogSearchInput = document.getElementById('catalogSearchInput');
  const catalogSearchClearBtn = document.getElementById('catalogSearchClearBtn');
  const catalogSearchBanner = document.getElementById('catalogSearchBanner');
  const catalogSearchQueryDisplay = document.getElementById('catalogSearchQueryDisplay');
  const catalogResetSearchBtn = document.getElementById('catalogResetSearchBtn');
  const filterChips = document.querySelectorAll('[data-catalog-filter]');
  const catalogCards = document.querySelectorAll('.catalog-card');
  const appSnackbar = document.getElementById('appSnackbar');
  const snackbarText = document.getElementById('snackbarText');

  // Theme Management
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      themeIcon.textContent = 'light_mode';
      metaThemeColor.setAttribute('content', '#131314');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      themeIcon.textContent = 'dark_mode';
      metaThemeColor.setAttribute('content', '#1a73e8');
    }
    state.theme = theme;
    localStorage.setItem('gtn_theme', theme);
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    showSnackbar(`Switched to ${state.theme} theme`);
  }

  themeToggleBtn.addEventListener('click', toggleTheme);

  // Drawer
  function openDrawer() {
    navDrawer.classList.add('open');
    drawerScrim.classList.add('visible');
    navDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    drawerScrim.classList.remove('visible');
    navDrawer.setAttribute('aria-hidden', 'true');
  }

  menuButton.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerScrim.addEventListener('click', closeDrawer);

  // Filter Chips
  function filterCatalog(category) {
    state.filter = category;

    filterChips.forEach(chip => {
      if (chip.dataset.catalogFilter === category) {
        chip.classList.add('active');
        chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        chip.classList.remove('active');
      }
    });

    catalogCards.forEach(card => {
      const cardCats = card.dataset.category || '';
      if (category === 'all' || cardCats.includes(category)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    if (state.searchQuery) {
      clearCatalogSearch();
    }
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterCatalog(chip.dataset.catalogFilter);
    });
  });

  // Search Functionality
  function performCatalogSearch(query) {
    const cleanQuery = query.trim().toLowerCase();
    state.searchQuery = cleanQuery;

    if (!cleanQuery) {
      clearCatalogSearch();
      return;
    }

    catalogSearchClearBtn.style.display = 'flex';
    catalogSearchBanner.style.display = 'flex';
    catalogSearchQueryDisplay.textContent = query;

    let matchCount = 0;

    catalogCards.forEach(card => {
      const drugKeywords = (card.dataset.drug || '') + ' ' + card.textContent.toLowerCase();
      if (drugKeywords.includes(cleanQuery)) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (matchCount === 0) {
      showSnackbar(`No drugs found matching "${query}"`);
    }
  }

  function clearCatalogSearch() {
    state.searchQuery = '';
    catalogSearchInput.value = '';
    catalogSearchClearBtn.style.display = 'none';
    catalogSearchBanner.style.display = 'none';
    filterCatalog(state.filter);
  }

  catalogSearchInput.addEventListener('input', (e) => {
    performCatalogSearch(e.target.value);
  });

  catalogSearchClearBtn.addEventListener('click', clearCatalogSearch);
  catalogResetSearchBtn.addEventListener('click', clearCatalogSearch);

  // Scroll Elevation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      topAppBar.classList.add('scrolled');
    } else {
      topAppBar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toast Snackbar
  let snackbarTimeout = null;
  function showSnackbar(msg, duration = 3000) {
    if (snackbarTimeout) clearTimeout(snackbarTimeout);
    snackbarText.textContent = msg;
    appSnackbar.classList.add('visible');
    snackbarTimeout = setTimeout(() => {
      appSnackbar.classList.remove('visible');
    }, duration);
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
  });

})();
