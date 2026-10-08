/**
 * LITFL Pharm 101: Glycerol Trinitrate (GTN)
 * Google Material Design 3 Mobile-First Vanilla Web App
 * Based on Emergency Pharmacology article by Dr. Robert Buttner
 */

(() => {
  'use strict';

  // =========================================================================
  // 1. State Management & DOM References
  // =========================================================================
  const state = {
    activeFilter: 'all',
    searchQuery: '',
    bookmarks: JSON.parse(localStorage.getItem('gtn_bookmarks') || '[]'),
    theme: localStorage.getItem('gtn_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    quizScore: 0,
    quizAnswered: 0
  };

  // DOM Elements
  const body = document.body;
  const topAppBar = document.getElementById('topAppBar');
  const menuButton = document.getElementById('menuButton');
  const navDrawer = document.getElementById('navDrawer');
  const drawerScrim = document.getElementById('drawerScrim');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const chipButtons = document.querySelectorAll('.md3-chip');
  const bottomNavItems = document.querySelectorAll('.nav-item');
  const drawerItems = document.querySelectorAll('.drawer-item');
  const cardSections = document.querySelectorAll('.card-section');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchBanner = document.getElementById('searchBanner');
  const searchQueryDisplay = document.getElementById('searchQueryDisplay');
  const resetSearchBtn = document.getElementById('resetSearchBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const metaThemeColor = document.getElementById('meta-theme-color');
  const fabAction = document.getElementById('fabAction');
  const appSnackbar = document.getElementById('appSnackbar');
  const snackbarText = document.getElementById('snackbarText');

  // Bookmarks Dialog
  const bookmarkListBtn = document.getElementById('bookmarkListBtn');
  const bookmarkDot = document.getElementById('bookmarkDot');
  const bookmarksDialog = document.getElementById('bookmarksDialog');
  const bookmarksDialogBody = document.getElementById('bookmarksDialogBody');
  const closeBookmarksDialogBtn = document.getElementById('closeBookmarksDialogBtn');
  const doneBookmarksBtn = document.getElementById('doneBookmarksBtn');
  const clearAllBookmarksBtn = document.getElementById('clearAllBookmarksBtn');

  // Safety Screener
  const safetyForm = document.getElementById('safetyCheckerForm');
  const evaluateSafetyBtn = document.getElementById('evaluateSafetyBtn');
  const resetSafetyBtn = document.getElementById('resetSafetyBtn');
  const safetyResultBox = document.getElementById('safetyResultBox');
  const sbpInput = document.getElementById('sbpInput');
  const hrInput = document.getElementById('hrInput');
  const checkRvInfarct = document.getElementById('checkRvInfarct');
  const checkFixedCo = document.getElementById('checkFixedCo');
  const checkPde5 = document.getElementById('checkPde5');

  // Tolerance Window Planner
  const patchApplyTime = document.getElementById('patchApplyTime');
  const calcScheduleBtn = document.getElementById('calcScheduleBtn');
  const activePeriodText = document.getElementById('activePeriodText');
  const freePeriodText = document.getElementById('freePeriodText');

  // Quiz elements
  const quizContainer = document.getElementById('quizContainer');
  const currentScoreDisplay = document.getElementById('currentScore');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  // =========================================================================
  // 2. Quiz Data (ACEM Primary Pharmacology Questions)
  // =========================================================================
  const quizData = [
    {
      id: 1,
      question: "Which vascular compartment is affected FIRST and at LOWER concentrations by GTN?",
      options: [
        "Arterioles (Resistance vessels)",
        "Veins (Capacitance vessels)",
        "Capillaries",
        "Coronary arteries exclusively"
      ],
      correctIndex: 1,
      explanation: "Veins are dilated first at lower doses, resulting in venous blood pooling, decreased cardiac preload, and reduced left ventricular end-diastolic volume. Arterial dilation occurs at higher doses."
    },
    {
      id: 2,
      question: "What is the intracellular second messenger activated downstream of GTN-mediated nitric oxide (NO) release?",
      options: [
        "Cyclic AMP (cAMP)",
        "Cyclic GMP (cGMP)",
        "Inositol trisphosphate (IP3)",
        "Diacylglycerol (DAG)"
      ],
      correctIndex: 1,
      explanation: "NO activates soluble guanylyl cyclase, which increases cGMP. cGMP activates PKG, leading to myosin light chain dephosphorylation and vascular smooth muscle relaxation."
    },
    {
      id: 3,
      question: "What biochemical mechanism causes tachyphylaxis (nitrate tolerance) during continuous IV GTN infusions?",
      options: [
        "Depletion of intracellular sulfhydryl (-SH) groups in smooth muscle",
        "Upregulation of endothelin receptors",
        "Downregulation of beta-adrenergic receptors",
        "Rapid renal excretion of active metabolites"
      ],
      correctIndex: 0,
      explanation: "Continuous exposure leads to depletion of tissue sulfhydryl (-SH) groups required for NO biotransformation. An 8-hour nitrate-free interval restores sensitivity."
    },
    {
      id: 4,
      question: "Why is GTN strictly avoided in acute Inferior/Posterior MI with Right Ventricular (RV) infarction?",
      options: [
        "It triggers severe coronary artery spasm",
        "The ischemic RV is exquisitely preload-dependent; venodilation causes catastrophic hypotension",
        "It causes direct myocardial necrosis",
        "It accelerates AV-nodal conduction into ventricular tachycardia"
      ],
      correctIndex: 1,
      explanation: "In RV infarction, stroke volume is critically dependent on elevated right atrial venous filling pressures. GTN-induced venodilation precipitates abrupt cardiovascular collapse."
    },
    {
      id: 5,
      question: "What is the oral bioavailability of Glycerol Trinitrate (GTN)?",
      options: [
        "85% – 95%",
        "50% – 60%",
        "10% – 20%",
        "< 1%"
      ],
      correctIndex: 2,
      explanation: "GTN has very low bioavailability (10–20%) due to massive first-pass hepatic metabolism. This is why it is given sublingually (onset 1–3 min) or intravenously."
    }
  ];

  // =========================================================================
  // 3. UI Theme & Scroll Elevation
  // =========================================================================
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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      topAppBar.classList.add('scrolled');
    } else {
      topAppBar.classList.remove('scrolled');
    }
  }, { passive: true });

  // =========================================================================
  // 4. Navigation & Category Filtering
  // =========================================================================
  function setCategoryFilter(category) {
    state.activeFilter = category;

    // Update Chip Buttons
    chipButtons.forEach(chip => {
      if (chip.dataset.filter === category) {
        chip.classList.add('active');
        chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        chip.classList.remove('active');
      }
    });

    // Update Bottom Nav
    bottomNavItems.forEach(item => {
      if (item.dataset.nav === category) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Drawer Items
    drawerItems.forEach(item => {
      if (item.dataset.target === category) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Filter Sections
    cardSections.forEach(section => {
      const sectionCat = section.dataset.category;
      if (category === 'all' || sectionCat === category) {
        section.classList.remove('hidden-by-filter');
      } else {
        section.classList.add('hidden-by-filter');
      }
    });

    // If searching, clear query
    if (state.searchQuery) {
      clearSearch();
    }
  }

  // Chip bar clicks
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      setCategoryFilter(filter);
    });
  });

  // Bottom navigation clicks
  bottomNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetNav = item.dataset.nav;
      setCategoryFilter(targetNav);
      // Smooth scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Drawer open / close
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

  drawerItems.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCat = link.dataset.target;
      if (targetCat) {
        setCategoryFilter(targetCat);
      }
      closeDrawer();
    });
  });

  // =========================================================================
  // 5. Search Functionality
  // =========================================================================
  function performSearch(query) {
    const cleanQuery = query.trim().toLowerCase();
    state.searchQuery = cleanQuery;

    if (!cleanQuery) {
      clearSearch();
      return;
    }

    searchClearBtn.style.display = 'flex';
    searchBanner.style.display = 'flex';
    searchQueryDisplay.textContent = query;

    let matchCount = 0;

    cardSections.forEach(section => {
      const text = section.textContent.toLowerCase();
      if (text.includes(cleanQuery)) {
        section.classList.remove('hidden-by-filter');
        matchCount++;
      } else {
        section.classList.add('hidden-by-filter');
      }
    });

    if (matchCount === 0) {
      showSnackbar(`No results found for "${query}"`);
    }
  }

  function clearSearch() {
    state.searchQuery = '';
    searchInput.value = '';
    searchClearBtn.style.display = 'none';
    searchBanner.style.display = 'none';
    // Restore current category filter
    setCategoryFilter(state.activeFilter);
  }

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  searchClearBtn.addEventListener('click', clearSearch);
  resetSearchBtn.addEventListener('click', clearSearch);

  // =========================================================================
  // 6. Bedside Safety Screener Decision Support Tool
  // =========================================================================
  function evaluateSafety() {
    const sbp = parseFloat(sbpInput.value);
    const hr = parseFloat(hrInput.value);
    const hasRvInfarct = checkRvInfarct.checked;
    const hasFixedCo = checkFixedCo.checked;
    const hasPde5 = checkPde5.checked;

    if (isNaN(sbp) || isNaN(hr)) {
      showSnackbar('Please enter valid Blood Pressure and Heart Rate values');
      return;
    }

    const issues = [];
    let severity = 'safe'; // 'safe', 'caution', 'danger'

    // 1. Critical Red Flags (Absolute Contraindications)
    if (hasPde5) {
      severity = 'danger';
      issues.push('<strong>CRITICAL CONTRAINDICATION:</strong> Recent PDE-5 inhibitor use (sildenafil <24h or tadalafil <48h). Synergistic cGMP accumulation causes profound, refractory, and potentially fatal cardiovascular shock.');
    }

    if (hasRvInfarct) {
      severity = 'danger';
      issues.push('<strong>ABSOLUTE CONTRAINDICATION:</strong> Inferior/RV Infarct. The infarcted RV is extremely preload-dependent. GTN venodilation precipitates sudden, catastrophic drop in stroke volume.');
    }

    if (hasFixedCo) {
      severity = 'danger';
      issues.push('<strong>ABSOLUTE CONTRAINDICATION:</strong> Fixed cardiac output state (severe Aortic Stenosis, HOCM, tamponade). Inability to augment stroke volume in response to afterload reduction leads to collapse.');
    }

    if (sbp < 90) {
      severity = 'danger';
      issues.push(`<strong>SEVERE HYPOTENSION (SBP ${sbp} mmHg):</strong> Baseline systolic BP is < 90 mmHg. GTN will critically compromise coronary perfusion pressure (CPP = DBP - LVEDP).`);
    }

    // 2. Precautions / Cautions
    if (sbp >= 90 && sbp <= 100 && severity !== 'danger') {
      severity = 'caution';
      issues.push(`<strong>BORDERLINE LOW SBP (${sbp} mmHg):</strong> Close monitoring required. Begin with lowest dose sublingual spray/tablet while patient is strictly seated/supine.`);
    }

    if (hr < 50) {
      severity = severity === 'danger' ? 'danger' : 'caution';
      issues.push(`<strong>BRADYCARDIA (${hr} bpm):</strong> Heart rate < 50 bpm limits stroke volume compensation.`);
    } else if (hr > 100) {
      severity = severity === 'danger' ? 'danger' : 'caution';
      issues.push(`<strong>TACHYCARDIA (${hr} bpm):</strong> Heart rate > 100 bpm reduces diastolic coronary perfusion time; GTN reflex tachycardia may exacerbate myocardial ischemia.`);
    }

    // Render Results
    safetyResultBox.style.display = 'block';

    if (severity === 'danger') {
      safetyResultBox.className = 'safety-result-box danger-box';
      safetyResultBox.innerHTML = `
        <div class="result-badge danger">
          <span class="material-symbols-outlined">cancel</span>
          <span>GTN CONTRAINDICATED (HIGH RISK)</span>
        </div>
        <h4>DO NOT ADMINISTER GTN</h4>
        <p>The patient has one or more absolute contraindications based on LITFL / ACEM guidelines:</p>
        <ul>${issues.map(item => `<li>${item}</li>`).join('')}</ul>
      `;
    } else if (severity === 'caution') {
      safetyResultBox.className = 'safety-result-box warning-alert';
      safetyResultBox.innerHTML = `
        <div class="result-badge caution">
          <span class="material-symbols-outlined">warning</span>
          <span>PROCEED WITH CAUTION</span>
        </div>
        <h4>RELATIVE PRECAUTIONS PRESENT</h4>
        <p>Administer with extreme caution under continuous cardiac and blood pressure monitoring:</p>
        <ul>${issues.map(item => `<li>${item}</li>`).join('')}</ul>
      `;
    } else {
      safetyResultBox.className = 'safety-result-box';
      safetyResultBox.style.backgroundColor = '#e6f4ea';
      safetyResultBox.style.border = '1px solid #34a853';
      safetyResultBox.innerHTML = `
        <div class="result-badge safe">
          <span class="material-symbols-outlined">check_circle</span>
          <span>HEMODYNAMIC CRITERIA MET</span>
        </div>
        <h4 style="color: #137333;">SAFE TO TITRATE GTN</h4>
        <p style="color: #137333; font-size: 0.84rem;">Systolic BP (${sbp} mmHg) & HR (${hr} bpm) are acceptable. No RV infarct, fixed outflow tract obstruction, or PDE-5 inhibitor co-ingestion reported.</p>
        <ul style="color: #137333;">
          <li>Sublingual spray/tablet: 300–600 mcg sublingually q5min (up to 3 doses) with patient supine/seated.</li>
          <li>IV infusion: Titrate by 5–10 mcg/min every 3–5 min targeting clinical relief and SBP > 100 mmHg.</li>
        </ul>
      `;
    }

    safetyResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showSnackbar('Safety evaluation complete');
  }

  evaluateSafetyBtn.addEventListener('click', evaluateSafety);

  resetSafetyBtn.addEventListener('click', () => {
    safetyForm.reset();
    safetyResultBox.style.display = 'none';
    showSnackbar('Safety screener reset');
  });

  // FAB button jumps directly to safety tool
  fabAction.addEventListener('click', () => {
    setCategoryFilter('tools');
    const safetySection = document.getElementById('safety-checker-section');
    safetySection.scrollIntoView({ behavior: 'smooth' });
    sbpInput.focus();
  });

  // =========================================================================
  // 7. 8-Hour Nitrate Tolerance Schedule Planner
  // =========================================================================
  function calculateToleranceSchedule() {
    const inputVal = patchApplyTime.value; // e.g. "08:00"
    if (!inputVal) return;

    const [hoursStr, minutesStr] = inputVal.split(':');
    let startHour = parseInt(hoursStr, 10);
    let startMin = parseInt(minutesStr, 10);

    // Active window is 16 hours
    let endActiveHour = (startHour + 16) % 24;
    let endActiveMin = startMin;

    function formatTime(h, m) {
      const padH = String(h).padStart(2, '0');
      const padM = String(m).padStart(2, '0');
      const suffix = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return `${padH}:${padM} (${h12}:${padM} ${suffix})`;
    }

    const startFormatted = formatTime(startHour, startMin);
    const endActiveFormatted = formatTime(endActiveHour, endActiveMin);

    activePeriodText.textContent = `${startFormatted} — ${endActiveFormatted} (16 Hours Active)`;
    freePeriodText.textContent = `${endActiveFormatted} — ${startFormatted} next morning (8 Hours Drug-Free)`;

    showSnackbar('Updated 8-hour nitrate-free interval');
  }

  calcScheduleBtn.addEventListener('click', calculateToleranceSchedule);
  patchApplyTime.addEventListener('change', calculateToleranceSchedule);

  // =========================================================================
  // 8. Pharm 101 Quiz Engine
  // =========================================================================
  function renderQuiz() {
    quizContainer.innerHTML = '';
    state.quizScore = 0;
    state.quizAnswered = 0;
    currentScoreDisplay.textContent = '0';
    restartQuizBtn.style.display = 'none';

    quizData.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';
      card.dataset.questionId = q.id;

      card.innerHTML = `
        <div class="q-header">
          <span class="q-number">Question ${qIndex + 1} of ${quizData.length}</span>
        </div>
        <div class="q-text">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, optIdx) => `
            <button class="quiz-option-btn" data-opt-idx="${optIdx}">
              <span class="material-symbols-outlined" style="font-size: 18px;">radio_button_unchecked</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="q-feedback" id="feedback-${q.id}"></div>
      `;

      // Option event listeners
      const buttons = card.querySelectorAll('.quiz-option-btn');
      const feedbackDiv = card.querySelector('.q-feedback');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.dataset.optIdx, 10);
          const isCorrect = selectedIdx === q.correctIndex;

          // Disable all buttons for this question
          buttons.forEach((b, idx) => {
            b.disabled = true;
            if (idx === q.correctIndex) {
              b.classList.add('correct');
              b.querySelector('.material-symbols-outlined').textContent = 'check_circle';
            } else if (idx === selectedIdx && !isCorrect) {
              b.classList.add('incorrect');
              b.querySelector('.material-symbols-outlined').textContent = 'cancel';
            }
          });

          // Show feedback
          feedbackDiv.classList.add('visible');
          if (isCorrect) {
            feedbackDiv.classList.add('correct-fb');
            feedbackDiv.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
            state.quizScore++;
            currentScoreDisplay.textContent = state.quizScore;
          } else {
            feedbackDiv.classList.add('incorrect-fb');
            feedbackDiv.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
          }

          state.quizAnswered++;
          if (state.quizAnswered === quizData.length) {
            restartQuizBtn.style.display = 'inline-flex';
            showSnackbar(`Quiz complete! Your score: ${state.quizScore} / ${quizData.length}`);
          }
        });
      });

      quizContainer.appendChild(card);
    });
  }

  restartQuizBtn.addEventListener('click', renderQuiz);

  // =========================================================================
  // 9. Bookmarks & Local Storage
  // =========================================================================
  function updateBookmarkUI() {
    const bookmarkButtons = document.querySelectorAll('.bookmark-card-btn');
    bookmarkButtons.forEach(btn => {
      const cardId = btn.dataset.cardId;
      if (state.bookmarks.includes(cardId)) {
        btn.classList.add('bookmarked');
        btn.querySelector('.material-symbols-outlined').textContent = 'bookmark';
      } else {
        btn.classList.remove('bookmarked');
        btn.querySelector('.material-symbols-outlined').textContent = 'bookmark_border';
      }
    });

    if (state.bookmarks.length > 0) {
      bookmarkDot.style.display = 'block';
    } else {
      bookmarkDot.style.display = 'none';
    }

    localStorage.setItem('gtn_bookmarks', JSON.stringify(state.bookmarks));
  }

  function toggleBookmark(cardId) {
    const index = state.bookmarks.indexOf(cardId);
    if (index > -1) {
      state.bookmarks.splice(index, 1);
      showSnackbar('Removed from bookmarks');
    } else {
      state.bookmarks.push(cardId);
      showSnackbar('Saved to bookmarks');
    }
    updateBookmarkUI();
  }

  document.querySelectorAll('.bookmark-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(btn.dataset.cardId);
    });
  });

  function renderBookmarksDialog() {
    bookmarksDialogBody.innerHTML = '';
    if (state.bookmarks.length === 0) {
      bookmarksDialogBody.innerHTML = '<p style="font-size: 0.88rem; color: var(--md-sys-color-outline); padding: 12px 0;">No bookmarked sections yet. Click the bookmark icon on any card to save it for rapid review.</p>';
      return;
    }

    const cardTitles = {
      hero: 'Drug Overview & Summary',
      pd: 'Pharmacodynamics (NO / cGMP Pathway)',
      pk: 'Pharmacokinetics & Tolerance',
      indications: 'Clinical Uses & Indications',
      adverse: 'Adverse Effects',
      contraindications: 'Precautions & Contraindications'
    };

    state.bookmarks.forEach(id => {
      const item = document.createElement('div');
      item.className = 'bookmark-dialog-item';
      item.innerHTML = `
        <span style="font-weight: 500; font-size: 0.88rem;">${cardTitles[id] || id}</span>
        <button class="md3-icon-button jump-to-card-btn" data-jump-id="${id}" title="Jump to section">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      `;

      item.querySelector('.jump-to-card-btn').addEventListener('click', () => {
        bookmarksDialog.close();
        setCategoryFilter('all');
        const targetElement = document.getElementById(`${id}-section`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });

      bookmarksDialogBody.appendChild(item);
    });
  }

  bookmarkListBtn.addEventListener('click', () => {
    renderBookmarksDialog();
    bookmarksDialog.showModal();
  });

  closeBookmarksDialogBtn.addEventListener('click', () => bookmarksDialog.close());
  doneBookmarksBtn.addEventListener('click', () => bookmarksDialog.close());

  clearAllBookmarksBtn.addEventListener('click', () => {
    state.bookmarks = [];
    updateBookmarkUI();
    renderBookmarksDialog();
    showSnackbar('All bookmarks cleared');
  });

  // =========================================================================
  // 10. Toast / Snackbar Utility
  // =========================================================================
  let snackbarTimeout = null;
  function showSnackbar(msg, duration = 3000) {
    if (snackbarTimeout) clearTimeout(snackbarTimeout);
    snackbarText.textContent = msg;
    appSnackbar.classList.add('visible');
    snackbarTimeout = setTimeout(() => {
      appSnackbar.classList.remove('visible');
    }, duration);
  }

  // =========================================================================
  // 11. Initialization
  // =========================================================================
  function init() {
    applyTheme(state.theme);
    themeToggleBtn.addEventListener('click', toggleTheme);
    calculateToleranceSchedule();
    renderQuiz();
    updateBookmarkUI();
  }

  document.addEventListener('DOMContentLoaded', init);

})();
