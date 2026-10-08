/**
 * Pharm 101: Propofol
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
    bookmarks: JSON.parse(localStorage.getItem('propofol_bookmarks') || '[]'),
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
  const pSbpInput = document.getElementById('pSbpInput');
  const pHrInput = document.getElementById('pHrInput');
  const checkAirwayReady = document.getElementById('checkAirwayReady');
  const checkHypovolemia = document.getElementById('checkHypovolemia');
  const checkElderlyFrail = document.getElementById('checkElderlyFrail');
  const checkEggSoyAllergy = document.getElementById('checkEggSoyAllergy');
  const checkPrisRisk = document.getElementById('checkPrisRisk');
  const evalPropofolSafetyBtn = document.getElementById('evalPropofolSafetyBtn');
  const resetPropofolSafetyBtn = document.getElementById('resetPropofolSafetyBtn');
  const propofolSafetyResultBox = document.getElementById('propofolSafetyResultBox');
  const propofolSafetyForm = document.getElementById('propofolSafetyForm');

  // Dosing Calculator
  const patientWeight = document.getElementById('patientWeight');
  const dosingIndication = document.getElementById('dosingIndication');
  const calcDoseBtn = document.getElementById('calcDoseBtn');
  const doseMgText = document.getElementById('doseMgText');
  const doseMlText = document.getElementById('doseMlText');
  const doseClinicalTip = document.getElementById('doseClinicalTip');

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
      question: "What primarily terminates the clinical anaesthetic effect of a single IV propofol induction bolus?",
      options: [
        "Rapid hepatic glucuronidation and CYP hydroxylation",
        "Rapid pulmonary extra-hepatic metabolism",
        "Redistribution from the vessel-rich brain to skeletal muscle and fat",
        "Renal tubular excretion of unchanged drug"
      ],
      correctIndex: 2,
      explanation: "After a single IV bolus, awakening occurs within 3–8 minutes primarily due to rapid REDISTRIBUTION down concentration gradients from vessel-rich CNS tissue to poorly perfused peripheral compartments (muscle and adipose), NOT metabolic clearance."
    },
    {
      id: 2,
      question: "Which of the following statements regarding propofol's analgesic properties is accurate?",
      options: [
        "It provides potent somatic analgesia comparable to fentanyl",
        "It provides moderate visceral analgesia but poor cutaneous relief",
        "It has zero analgesic properties and requires co-administered analgesics",
        "It provides hyperalgesic reversal at low sub-hypnotic doses"
      ],
      correctIndex: 2,
      explanation: "Propofol is purely a sedative-hypnotic and has ZERO analgesic properties. During procedural sedation or general anaesthesia, failure to co-administer adequate analgesia will cause hemodynamic surges and purposeful patient movement in response to painful stimuli."
    },
    {
      id: 3,
      question: "Which clinical constellation defines Propofol Infusion Syndrome (PRIS)?",
      options: [
        "Respiratory alkalosis, hypokalemia, and malignant hypertension",
        "Severe refractory metabolic acidosis, rhabdomyolysis, hyperkalemia, and cardiovascular collapse",
        "Bronchospasm, profound urticaria, and angioedema within seconds of injection",
        "Disseminated intravascular coagulation and hyperthermia"
      ],
      correctIndex: 1,
      explanation: "PRIS is a life-threatening mitochondrial failure syndrome seen with high doses (> 4–5 mg/kg/h) or prolonged infusions (> 48h). Hallmarks include severe lactic/metabolic acidosis, rhabdomyolysis, hyperkalemia, hepatomegaly, acute renal failure, and refractory bradyarrhythmias."
    },
    {
      id: 4,
      question: "Why does total body clearance of propofol exceed standard hepatic blood flow?",
      options: [
        "Extensive active biliary excretion",
        "Significant extra-hepatic metabolism occurs in the lungs",
        "Plasma cholinesterase breakdown in peripheral blood",
        "Direct volatile elimination through alveolar exhalation"
      ],
      correctIndex: 1,
      explanation: "Total body clearance of propofol (1.5–2.2 L/min) exceeds normal hepatic blood flow (~1.2 L/min), proving the presence of significant extra-hepatic clearance, predominantly via pulmonary metabolism."
    },
    {
      id: 5,
      question: "How does propofol alter cardiovascular hemodynamics upon induction?",
      options: [
        "Increases afterload while maintaining preload, triggering marked tachycardia",
        "Decreases both preload and afterload with negative inotropy and blunted baroreceptor reflex",
        "Pure arteriolar vasoconstriction with reflex bradycardia",
        "Isolated positive inotropic stimulation of beta-1 adrenergic receptors"
      ],
      correctIndex: 1,
      explanation: "Propofol produces significant systemic venodilation (preload drop) and arteriolar dilation (afterload drop), combined with direct negative inotropic myocardial depression. Furthermore, it blunts the normal baroreceptor reflex, resulting in minimal compensatory tachycardia."
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
  // 6. Bedside Propofol Safety & Airway Screener
  // =========================================================================
  function evaluatePropofolSafety() {
    const sbp = parseFloat(pSbpInput.value);
    const hr = parseFloat(pHrInput.value);
    const airwayReady = checkAirwayReady.checked;
    const hypovolemic = checkHypovolemia.checked;
    const isElderlyFrail = checkElderlyFrail.checked;
    const hasEggSoyAllergy = checkEggSoyAllergy.checked;
    const prisRisk = checkPrisRisk.checked;

    if (isNaN(sbp) || isNaN(hr)) {
      showSnackbar('Please enter valid Blood Pressure and Heart Rate values');
      return;
    }

    const issues = [];
    let severity = 'safe'; // 'safe', 'caution', 'danger'

    // 1. Critical Red Flags
    if (!airwayReady) {
      severity = 'danger';
      issues.push('<strong>CRITICAL AIRWAY RISK:</strong> Airway rescue equipment, BVM, and suction not confirmed ready. Propofol induces profound apnea and loss of protective reflexes; never administer without immediate airway rescue capability.');
    }

    if (hasEggSoyAllergy) {
      severity = 'danger';
      issues.push('<strong>ALLERGY RED FLAG:</strong> History of severe egg/soy anaphylaxis. Propofol lipid emulsion contains egg yolk lecithin and soybean oil; risk of life-threatening hypersensitivity.');
    }

    if (hypovolemic || sbp < 90) {
      severity = 'danger';
      issues.push(`<strong>HEMODYNAMIC COLLAPSE RISK (SBP ${sbp} mmHg):</strong> Uncorrected shock or severe hypotension. Propofol-induced venodilation, arteriolar dilation, and negative inotropy will cause catastrophic circulatory arrest. Resuscitate with volume/vasopressors first, or use ketamine/etomidate.`);
    }

    if (prisRisk) {
      severity = 'danger';
      issues.push('<strong>PRIS ALERT:</strong> High-dose (>4–5 mg/kg/h) or prolonged (>48h) continuous infusion. Strict monitoring for metabolic acidosis, hyperkalemia, elevated CK, and lipid levels is mandatory to prevent Propofol Infusion Syndrome.');
    }

    // 2. Relative Cautions
    if (isElderlyFrail && severity !== 'danger') {
      severity = 'caution';
      issues.push('<strong>ELDERLY / FRAIL PATIENT:</strong> Volume of distribution is reduced and CNS sensitivity is heightened. Reduce induction dose by 50%–70% (target 0.5–1.0 mg/kg) and administer slowly over 60 seconds.');
    }

    const shockIndex = hr / sbp;
    if (shockIndex >= 0.9 && severity !== 'danger') {
      severity = 'caution';
      issues.push(`<strong>ELEVATED SHOCK INDEX (${shockIndex.toFixed(2)}):</strong> HR exceeds or approximates SBP, indicating occult hypovolemia or impending circulatory compromise. Reduce induction dose significantly.`);
    }

    // Render Results
    propofolSafetyResultBox.style.display = 'block';

    if (severity === 'danger') {
      propofolSafetyResultBox.className = 'safety-result-box danger-box';
      propofolSafetyResultBox.innerHTML = `
        <div class="result-badge danger">
          <span class="material-symbols-outlined">cancel</span>
          <span>HIGH RISK / CONTRAINDICATED</span>
        </div>
        <h4>DO NOT ADMINISTER STANDARD PROPOFOL</h4>
        <p>The patient exhibits high-risk safety red flags:</p>
        <ul>${issues.map(item => `<li>${item}</li>`).join('')}</ul>
      `;
    } else if (severity === 'caution') {
      propofolSafetyResultBox.className = 'safety-result-box warning-alert';
      propofolSafetyResultBox.innerHTML = `
        <div class="result-badge caution">
          <span class="material-symbols-outlined">warning</span>
          <span>PROCEED WITH CAUTION / DOSE REDUCTION</span>
        </div>
        <h4>MODIFIED DOSE & MONITORING REQUIRED</h4>
        <p>Administer with extreme caution under continuous monitoring:</p>
        <ul>${issues.map(item => `<li>${item}</li>`).join('')}</ul>
      `;
    } else {
      propofolSafetyResultBox.className = 'safety-result-box';
      propofolSafetyResultBox.style.backgroundColor = '#e6f4ea';
      propofolSafetyResultBox.style.border = '1px solid #34a853';
      propofolSafetyResultBox.innerHTML = `
        <div class="result-badge safe">
          <span class="material-symbols-outlined">check_circle</span>
          <span>HEMODYNAMIC & AIRWAY CRITERIA MET</span>
        </div>
        <h4 style="color: #137333;">SAFE TO PROCEED WITH PROPOFOL</h4>
        <p style="color: #137333; font-size: 0.84rem;">Airway equipment confirmed, SBP (${sbp} mmHg) stable, and no active anaphylaxis history.</p>
        <ul style="color: #137333;">
          <li>Ensure co-administration of an analgesic agent if the procedure involves pain.</li>
          <li>Pre-oxygenate thoroughly; anticipate transient apnea and have BVM ready.</li>
        </ul>
      `;
    }

    propofolSafetyResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showSnackbar('Propofol safety screening complete');
  }

  evalPropofolSafetyBtn.addEventListener('click', evaluatePropofolSafety);

  resetPropofolSafetyBtn.addEventListener('click', () => {
    propofolSafetyForm.reset();
    propofolSafetyResultBox.style.display = 'none';
    showSnackbar('Safety screener reset');
  });

  // =========================================================================
  // 7. Weight-Based Propofol Dosing Calculator
  // =========================================================================
  function calculateDose() {
    const weight = parseFloat(patientWeight.value);
    const indication = dosingIndication.value;

    if (isNaN(weight) || weight <= 0) {
      showSnackbar('Please enter a valid patient weight');
      return;
    }

    let minDoseMg, maxDoseMg, tip;

    switch (indication) {
      case 'sedation':
        minDoseMg = weight * 0.5;
        maxDoseMg = weight * 1.0;
        tip = 'Titrate in small 10–20 mg (1–2 mL) aliquots every 60–90 seconds. Always co-administer analgesia (e.g., fentanyl 1–2 mcg/kg).';
        break;
      case 'adult-rsi':
        minDoseMg = weight * 1.5;
        maxDoseMg = weight * 2.5;
        tip = 'Standard healthy adult RSI dose. Inject over 30–45 seconds. Anticipate apnea and have paralysis / airway ready.';
        break;
      case 'elderly-rsi':
        minDoseMg = weight * 0.5;
        maxDoseMg = weight * 1.0;
        tip = 'Reduced dose for patients >65 years or with borderline hemodynamics. Inject slowly over 60 seconds to avoid dramatic blood pressure drop.';
        break;
      case 'peds-rsi':
        minDoseMg = weight * 2.5;
        maxDoseMg = weight * 3.5;
        tip = 'Higher dose required due to larger volume of distribution in pediatric patients. Ensure adequate pre-oxygenation.';
        break;
      default:
        minDoseMg = weight * 1.5;
        maxDoseMg = weight * 2.5;
        tip = 'Standard induction dose.';
    }

    const minMl = (minDoseMg / 10).toFixed(1);
    const maxMl = (maxDoseMg / 10).toFixed(1);

    doseMgText.textContent = `${Math.round(minDoseMg)} – ${Math.round(maxDoseMg)} mg`;
    doseMlText.textContent = `${minMl} – ${maxMl} mL`;
    doseClinicalTip.textContent = tip;

    showSnackbar('Dose calculation updated');
  }

  calcDoseBtn.addEventListener('click', calculateDose);
  patientWeight.addEventListener('input', calculateDose);
  dosingIndication.addEventListener('change', calculateDose);

  // FAB button jumps to dosing calculator
  fabAction.addEventListener('click', () => {
    setCategoryFilter('tools');
    const doseSection = document.getElementById('dosing-calculator-section');
    doseSection.scrollIntoView({ behavior: 'smooth' });
    patientWeight.focus();
  });

  // =========================================================================
  // 8. Propofol Pharm 101 Quiz Engine
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

    localStorage.setItem('propofol_bookmarks', JSON.stringify(state.bookmarks));
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
      pd: 'Pharmacodynamics (GABA & Multi-Organ Effects)',
      pk: 'Pharmacokinetics & Redistribution Mechanics',
      indications: 'Clinical Uses & Dosing Protocols',
      adverse: 'Adverse Effects & PRIS Alert',
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
    calculateDose();
    renderQuiz();
    updateBookmarkUI();
  }

  document.addEventListener('DOMContentLoaded', init);

})();
