/**
 * Pharm 101: Furosemide
 * Google Material Design 3 Mobile-First Vanilla Web App
 * Personal Clinical Pharmacology Reference
 */

(() => {
  'use strict';

  // =========================================================================
  // 1. State Management & DOM References
  // =========================================================================
  const state = {
    activeFilter: 'all',
    searchQuery: '',
    bookmarks: JSON.parse(localStorage.getItem('furosemide_bookmarks') || '[]'),
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
  const fKInput = document.getElementById('fKInput');
  const fSbpInput = document.getElementById('fSbpInput');
  const checkVolumeDepletion = document.getElementById('checkVolumeDepletion');
  const checkDigoxinLithium = document.getElementById('checkDigoxinLithium');
  const checkAminoglycosides = document.getElementById('checkAminoglycosides');
  const checkNsaidUse = document.getElementById('checkNsaidUse');
  const checkSulfaAnaphylaxis = document.getElementById('checkSulfaAnaphylaxis');
  const evalFurosemideSafetyBtn = document.getElementById('evalFurosemideSafetyBtn');
  const resetFurosemideSafetyBtn = document.getElementById('resetFurosemideSafetyBtn');
  const furosemideSafetyResultBox = document.getElementById('furosemideSafetyResultBox');
  const furosemideSafetyForm = document.getElementById('furosemideSafetyForm');

  // Converter & FST Calculator
  const converterDirection = document.getElementById('converterDirection');
  const inputDoseGroup = document.getElementById('inputDoseGroup');
  const inputDoseLabel = document.getElementById('inputDoseLabel');
  const inputDoseValue = document.getElementById('inputDoseValue');
  const weightGroup = document.getElementById('weightGroup');
  const fstPatientWeight = document.getElementById('fstPatientWeight');
  const calcConverterBtn = document.getElementById('calcConverterBtn');
  const resultBoxTitle = document.getElementById('resultBoxTitle');
  const resultBoxValue = document.getElementById('resultBoxValue');
  const rateBoxValue = document.getElementById('rateBoxValue');
  const converterTipText = document.getElementById('converterTipText');

  // Quiz elements
  const quizContainer = document.getElementById('quizContainer');
  const currentScoreDisplay = document.getElementById('currentScore');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  // =========================================================================
  // 2. Quiz Data (Clinical Pharmacology Self-Assessment)
  // =========================================================================
  const quizData = [
    {
      id: 1,
      question: "At which primary anatomic and molecular site does furosemide inhibit electrolyte reabsorption?",
      options: [
        "Proximal convoluted tubule (SGLT2 / Carbonic anhydrase)",
        "Thick ascending limb of the Loop of Henle (NKCC2 cotransporter)",
        "Early distal convoluted tubule (NCCT cotransporter)",
        "Cortical collecting duct (ENaC sodium channel)"
      ],
      correctIndex: 1,
      explanation: "Furosemide acts on the luminal surface of the thick ascending limb (TAL) of the Loop of Henle, reversibly inhibiting the Na⁺/K⁺/2Cl⁻ (NKCC2) cotransporter, which normally reabsorbs ~25% of filtered NaCl."
    },
    {
      id: 2,
      question: "Why does IV furosemide relieve dyspnea in acute pulmonary edema within 5–15 minutes, well before significant diuresis begins?",
      options: [
        "Direct central depression of the medullary dyspnea center",
        "Renal COX-2 stimulation generates prostaglandins (PGE₂), inducing acute systemic venodilation and preload reduction",
        "Direct bronchodilation via beta-2 adrenergic stimulation",
        "Rapid oncotic fluid shift into the lymphatic system"
      ],
      correctIndex: 1,
      explanation: "Within 5–15 minutes of IV injection, furosemide stimulates renal COX-2 to produce vasodilatory prostaglandins (PGE₂ and PGI₂), promoting systemic venous capacitance pooling and lowering left ventricular filling pressures prior to natriuresis."
    },
    {
      id: 3,
      question: "What is the typical oral bioavailability of furosemide used for bedside Oral-to-IV dose conversion?",
      options: [
        "10% – 20%",
        "~50% (The 50% Rule)",
        "85% – 95%",
        "< 5%"
      ],
      correctIndex: 1,
      explanation: "Oral furosemide has an average bioavailability of ~50% (range 40%–60%). A standard 40 mg oral tablet is roughly equivalent to a 20 mg IV bolus."
    },
    {
      id: 4,
      question: "How do NSAIDs interact with furosemide to impair both its hemodynamic and diuretic actions?",
      options: [
        "They inactivate furosemide through direct chemical precipitation in plasma",
        "They inhibit renal prostaglandin synthesis (blunting venodilation) and compete for proximal tubule OAT secretion",
        "They accelerate hepatic CYP450 breakdown of loop diuretics",
        "They permanently block apical chloride channels in the collecting duct"
      ],
      correctIndex: 1,
      explanation: "NSAIDs inhibit cyclooxygenase, suppressing prostaglandin synthesis necessary for acute venodilation and renal vasodilation. Furthermore, NSAIDs compete with furosemide for active organic acid transporter (OAT) secretion in the proximal tubule."
    },
    {
      id: 5,
      question: "Which acid-base and electrolyte disturbance is classically associated with aggressive loop diuretic therapy?",
      options: [
        "Hyperkalemic normal anion gap metabolic acidosis",
        "Hypokalemic, hypochloremic metabolic alkalosis",
        "Hypokalemic metabolic acidosis with hyperchloremia",
        "Hypermagnesemic respiratory acidosis"
      ],
      correctIndex: 1,
      explanation: "High sodium delivery to the cortical collecting duct stimulates ENaC-mediated sodium reabsorption and reciprocal aldosterone-driven excretion of potassium (K⁺) and hydrogen ions (H⁺), resulting in hypokalemic, hypochloremic metabolic alkalosis."
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
      } else if (item.dataset.target) {
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

    if (state.searchQuery) {
      clearSearch();
    }
  }

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setCategoryFilter(btn.dataset.filter);
    });
  });

  bottomNavItems.forEach(item => {
    item.addEventListener('click', () => {
      setCategoryFilter(item.dataset.nav);
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
    link.addEventListener('click', () => {
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
    setCategoryFilter(state.activeFilter);
  }

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  searchClearBtn.addEventListener('click', clearSearch);
  resetSearchBtn.addEventListener('click', clearSearch);

  // =========================================================================
  // 6. Bedside Furosemide Safety & Electrolyte Screener
  // =========================================================================
  function evaluateFurosemideSafety() {
    const k = parseFloat(fKInput.value);
    const sbp = parseFloat(fSbpInput.value);
    const isVolumeDepleted = checkVolumeDepletion.checked;
    const hasDigoxinLithium = checkDigoxinLithium.checked;
    const hasAminoglycosides = checkAminoglycosides.checked;
    const hasNsaid = checkNsaidUse.checked;
    const hasSulfaAnaphylaxis = checkSulfaAnaphylaxis.checked;

    if (isNaN(k) || isNaN(sbp)) {
      showSnackbar('Please enter valid Potassium and Blood Pressure values');
      return;
    }

    const issues = [];
    let severity = 'safe'; // 'safe', 'caution', 'danger'

    // 1. Critical Red Flags
    if (hasSulfaAnaphylaxis) {
      severity = 'danger';
      issues.push('<strong>CRITICAL ALLERGY ALERT:</strong> Severe documented sulfonamide anaphylaxis. Furosemide contains a sulfonamide moiety; high risk of severe hypersensitivity.');
    }

    if (isVolumeDepleted || sbp < 90) {
      severity = 'danger';
      issues.push(`<strong>HYPOVOLEMIA / HYPOTENSION RISK (SBP ${sbp} mmHg):</strong> Dehydration or shock. Diuresis in hypovolemia converts prerenal azotemia into ischemic acute tubular necrosis (ATN) and causes cardiovascular collapse.`);
    }

    if (k < 3.0) {
      severity = 'danger';
      issues.push(`<strong>SEVERE HYPOKALEMIA (K⁺ ${k} mmol/L):</strong> Potassium is critically low (< 3.0 mmol/L). Further loop diuresis will precipitate life-threatening cardiac arrhythmias (VT/VF/Torsades). Replete potassium first!`);
    }

    // 2. Relative Cautions
    if (k >= 3.0 && k < 3.5 && severity !== 'danger') {
      severity = 'caution';
      issues.push(`<strong>BORDERLINE LOW POTASSIUM (K⁺ ${k} mmol/L):</strong> Supplement oral or IV potassium concurrently to avoid severe hypokalemic arrhythmogenesis.`);
    }

    if (hasDigoxinLithium && severity !== 'danger') {
      severity = 'caution';
      issues.push('<strong>DIGOXIN / LITHIUM CO-THERAPY:</strong> Furosemide-induced hypokalemia and hypomagnesemia drastically increase digoxin myocardial toxicity. Volume depletion impairs lithium clearance, risking toxicity.');
    }

    if (hasAminoglycosides && severity !== 'danger') {
      severity = 'caution';
      issues.push('<strong>SYNERGISTIC OTOTOXICITY RISK:</strong> Concomitant aminoglycosides (gentamicin). Administer furosemide strictly at a slow infusion rate (≤ 4 mg/min) to prevent inner ear stria vascularis injury.');
    }

    if (hasNsaid && severity !== 'danger') {
      severity = 'caution';
      issues.push('<strong>NSAID RESISTANCE:</strong> Concomitant NSAIDs blunt vasodilatory prostaglandin synthesis and compete for proximal tubule OAT secretion, reducing diuretic efficacy by up to 50%.');
    }

    // Render Results
    furosemideSafetyResultBox.style.display = 'block';

    if (severity === 'danger') {
      furosemideSafetyResultBox.className = 'safety-result-box danger-box';
      furosemideSafetyResultBox.innerHTML = `
        <div class="result-badge danger">
          <span class="material-symbols-outlined">cancel</span>
          <span>HIGH RISK / CONTRAINDICATED</span>
        </div>
        <h4>DO NOT ADMINISTER STANDARD FUROSEMIDE</h4>
        <p>The patient exhibits high-risk clinical red flags:</p>
        <ul>${issues.map(item => `<li>${item}</li>`).join('')}</ul>
      `;
    } else if (severity === 'caution') {
      furosemideSafetyResultBox.className = 'safety-result-box warning-alert';
      furosemideSafetyResultBox.innerHTML = `
        <div class="result-badge caution">
          <span class="material-symbols-outlined">warning</span>
          <span>PROCEED WITH CAUTION / MONITOR ELECTROLYTES</span>
        </div>
        <h4>MONITORING & DOSE ADJUSTMENT REQUIRED</h4>
        <p>Administer with caution under appropriate electrolyte monitoring:</p>
        <ul>${issues.map(item => `<li>${item}</li>`).join('')}</ul>
      `;
    } else {
      furosemideSafetyResultBox.className = 'safety-result-box';
      furosemideSafetyResultBox.style.backgroundColor = '#e6f4ea';
      furosemideSafetyResultBox.style.border = '1px solid #34a853';
      furosemideSafetyResultBox.innerHTML = `
        <div class="result-badge safe">
          <span class="material-symbols-outlined">check_circle</span>
          <span>ELECTROLYTE & VOLUME CRITERIA MET</span>
        </div>
        <h4 style="color: #137333;">SAFE TO ADMINISTER FUROSEMIDE</h4>
        <p style="color: #137333; font-size: 0.84rem;">Serum potassium (${k} mmol/L) and SBP (${sbp} mmHg) are acceptable. No signs of severe volume depletion or sulfa anaphylaxis.</p>
        <ul style="color: #137333;">
          <li>Administer IV boluses slowly over 2–5 minutes (≤ 4 mg/min) to prevent ototoxicity.</li>
          <li>Monitor urine output, renal function, and electrolytes every 12–24 hours.</li>
        </ul>
      `;
    }

    furosemideSafetyResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showSnackbar('Furosemide safety screening complete');
  }

  evalFurosemideSafetyBtn.addEventListener('click', evaluateFurosemideSafety);

  resetFurosemideSafetyBtn.addEventListener('click', () => {
    furosemideSafetyForm.reset();
    furosemideSafetyResultBox.style.display = 'none';
    showSnackbar('Safety screener reset');
  });

  // =========================================================================
  // 7. Oral-to-IV Converter & Furosemide Stress Test Calculator
  // =========================================================================
  function updateConverterUI() {
    const mode = converterDirection.value;

    if (mode === 'fst-calc') {
      inputDoseGroup.style.display = 'none';
      weightGroup.style.display = 'flex';
      resultBoxTitle.textContent = 'FST Diagnostic Protocol Dose';
    } else if (mode === 'po-to-iv') {
      inputDoseGroup.style.display = 'flex';
      inputDoseLabel.textContent = 'Daily Oral Dose (mg):';
      weightGroup.style.display = 'none';
      resultBoxTitle.textContent = 'Equivalent IV Dose';
    } else {
      inputDoseGroup.style.display = 'flex';
      inputDoseLabel.textContent = 'Daily IV Dose (mg):';
      weightGroup.style.display = 'none';
      resultBoxTitle.textContent = 'Equivalent Oral (PO) Dose';
    }
    calculateConverter();
  }

  function calculateConverter() {
    const mode = converterDirection.value;

    if (mode === 'po-to-iv') {
      const poDose = parseFloat(inputDoseValue.value) || 0;
      const ivDose = Math.round(poDose * 0.5);
      resultBoxValue.textContent = `${ivDose} mg IV (Single or Divided)`;
      rateBoxValue.textContent = 'Slow IV push (≤ 4 mg/min to avoid ototoxicity)';
      converterTipText.textContent = `Based on ~50% oral bioavailability. A ${poDose} mg PO dose equals approximately ${ivDose} mg IV.`;
    } else if (mode === 'iv-to-po') {
      const ivDose = parseFloat(inputDoseValue.value) || 0;
      const poDose = Math.round(ivDose * 2.0);
      resultBoxValue.textContent = `${poDose} mg PO Daily`;
      rateBoxValue.textContent = 'Oral administration (Peak effect 1h, duration 6–8h)';
      converterTipText.textContent = `Based on ~50% oral bioavailability. A ${ivDose} mg IV dose requires approximately ${poDose} mg orally.`;
    } else {
      const weight = parseFloat(fstPatientWeight.value) || 70;
      const naiveDose = Math.round(weight * 1.0);
      const userDose = Math.round(weight * 1.5);
      resultBoxValue.textContent = `${naiveDose} mg (Loop-Naive) OR ${userDose} mg (Prior Loop Users)`;
      rateBoxValue.textContent = 'Standard FST Endpoint: ≥ 200 mL urine in first 2 hours';
      converterTipText.textContent = `Furosemide Stress Test: Administer ${naiveDose} mg IV (1.0 mg/kg) if naive, or ${userDose} mg IV (1.5 mg/kg) if previously on loops. Urine output < 200 mL over 2 hours indicates severe tubular dysfunction and predicts progression to Stage 3 AKI / RRT.`;
    }
  }

  converterDirection.addEventListener('change', updateConverterUI);
  calcConverterBtn.addEventListener('click', calculateConverter);
  inputDoseValue.addEventListener('input', calculateConverter);
  fstPatientWeight.addEventListener('input', calculateConverter);

  // FAB button jumps to converter
  fabAction.addEventListener('click', () => {
    setCategoryFilter('tools');
    const converterSection = document.getElementById('converter-calculator-section');
    converterSection.scrollIntoView({ behavior: 'smooth' });
  });

  // =========================================================================
  // 8. Furosemide Pharm 101 Quiz Engine
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

      const buttons = card.querySelectorAll('.quiz-option-btn');
      const feedbackDiv = card.querySelector('.q-feedback');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.dataset.optIdx, 10);
          const isCorrect = selectedIdx === q.correctIndex;

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

    localStorage.setItem('furosemide_bookmarks', JSON.stringify(state.bookmarks));
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
      pd: 'Pharmacodynamics (NKCC2 & Prostaglandin Venodilation)',
      pk: 'Pharmacokinetics (50% Rule & Secretion)',
      indications: 'Clinical Uses & Indications',
      adverse: 'Adverse Effects & Ototoxicity',
      contraindications: 'Precautions & Absolute Red Flags'
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
    updateConverterUI();
    renderQuiz();
    updateBookmarkUI();
  }

  document.addEventListener('DOMContentLoaded', init);

})();
