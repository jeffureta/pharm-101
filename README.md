# Pharm 101: Clinical Pharmacology & Bedside Reference

> **Mobile-first Google Material Design Web App Suite** for personal clinical pharmacology reference, point-of-care decision support, interactive calculators, and self-assessment.

---

## 🏛️ Application Architecture & File Structure

```text
pharm-101/
├── index.html       # Central Drug Directory & Landing Page (Search, Category filters, Comparison matrix)
├── landing.js       # Search & filter controller for the Landing Page
├── gtn.html         # Glycerol Trinitrate (GTN) Clinical Module
├── app.js           # GTN Safety Screener, 8h Planner, & Quiz Controller
├── propofol.html    # Propofol Clinical Module (Hypnotic, Kinetics, Airway & PRIS)
├── propofol.js      # Propofol Airway Screener, Dosing Calculator, & Quiz Controller
├── style.css        # Unified Google Material Design 3 (Material You) mobile-first stylesheet
├── manifest.json    # Progressive Web App manifest
├── favicon.svg      # Vector Material medical badge icon
└── README.md        # Comprehensive documentation & Prompt Reference
```

---

## 📖 Drug Summaries

### 1. Glycerol Trinitrate (GTN) • [`gtn.html`](file:///Users/jeffureta/repos/pharm-101/gtn.html)
- **Class:** Vasodilator (Organic Nitrate)
- **Primary Mechanism:** Cleaved in vascular smooth muscle releasing Nitric Oxide ($\text{NO}$) $\rightarrow$ stimulates soluble guanylyl cyclase $\rightarrow$ $\uparrow\text{cGMP}$ $\rightarrow$ Protein Kinase G (PKG) activation $\rightarrow$ dephosphorylation of myosin light chains $\rightarrow$ vascular smooth muscle relaxation and vasodilation.
- **Differential Vascular Actions:**
  - **Veins first / lower concentrations:** Venodilation increases capacitance, reduces cardiac preload and left ventricular (LV) end-diastolic volume.
  - **Higher concentrations:** Systemic arterial dilation reduces afterload and blood pressure. Directly dilates epicardial coronary arteries and decreases LV wall tension ($T = \frac{P \cdot r}{2h}$), substantially lowering myocardial oxygen demand ($\text{MVO}_2$).
- **Pharmacokinetics:**
  - **Bioavailability:** $10\%–20\%$ (extensive hepatic first-pass clearance).
  - **Half-Life ($t_{1/2}$):** $2–8\text{ minutes}$.
  - **Routes & Timings:** Sublingual onset $1–3\text{ minutes}$, duration $15–30\text{ minutes}$.
  - **Metabolism:** Hepatic conversion to active 1,2-dinitro derivative; renal excretion.
- **Tachyphylaxis (Nitrate Tolerance):**
  - Smooth muscle tolerance develops with continuous IV infusion or round-the-clock transdermal wear due to depletion of intracellular tissue sulfhydryl ($-\text{SH}$) groups.
  - Mitigated by an intentional **8-hour drug-free interval** between doses.
- **Clinical Indications:** Angina pectoris, Acute Coronary Syndrome (ACS / STEMI / NSTEMI), Hypertensive emergencies, Acute Pulmonary Oedema (APO), Aortic dissection (*with beta-blockade*).
- **Adverse Effects:** Throbbing nitrate headache, postural hypotension, reflex tachycardia, salt & water retention with longer-acting nitrates.
- **Contraindications & Red Flags:**
  - Severe hypotension ($\text{SBP} < 90\text{ mmHg}$)
  - **Inferior / Posterior MI with RV infarction** (*catastrophic preload collapse*)
  - Fixed cardiac output states (severe Aortic Stenosis, HOCM, cardiac tamponade)
  - Severe tachycardia ($> 100\text{ bpm}$) or bradycardia ($< 50\text{ bpm}$)
  - Concomitant PDE-5 inhibitors (*sildenafil* $< 24\text{h}$, *tadalafil* $< 48\text{h}$)

---

### 2. Propofol • [`propofol.html`](file:///Users/jeffureta/repos/pharm-101/propofol.html)
- **Class:** Intravenous Anaesthetic / Sedative-Hypnotic (GABA$_A$ Receptor Modulator)
- **Primary Mechanism:** Binds the $\beta$-subunit of the ligand-gated $\text{GABA}_A$ receptor, increasing chloride ($\text{Cl}^-$) channel opening duration $\rightarrow$ neuronal hyperpolarization $\rightarrow$ profound hypnosis and CNS depression. Also reduces intracranial pressure ($\text{ICP}$) by lowering $\text{CMRO}_2$ and $\text{CBF}$.
- **CRITICAL ANALGESIC PEARL:** **Zero Analgesic Properties.** Propofol provides no pain relief; painful procedures require co-administered analgesics (e.g. fentanyl, ketamine) to prevent tachycardia and hypertension.
- **Pharmacokinetics & Kinetics Rule:**
  - **Onset:** Extremely rapid, $< 30–45\text{ seconds}$ (1 arm-brain circulation time).
  - **Offset Mechanism:** Rapid awakening ($3–8\text{ min}$) after a single bolus is terminated by **rapid redistribution** from the vessel-rich central nervous system to poorly perfused muscle and fat tissue, *not* by metabolic breakdown.
  - **Distribution Half-Life ($t_{1/2\alpha}$):** $2–4\text{ minutes}$.
  - **Elimination Half-Life ($t_{1/2\beta}$):** $4–23\text{ minutes}$ (can prolong with multi-day infusions due to deep compartment saturation).
  - **Metabolism & Extra-Hepatic Clearance:** Hepatic glucuronidation and sulfation. Total body clearance ($1.5–2.2\text{ L/min}$) exceeds normal hepatic blood flow, demonstrating significant **extra-hepatic pulmonary clearance**.
- **Clinical Indications:**
  1. **Procedural Sedation:** $0.5–1.0\text{ mg/kg}$ titrated in $10–20\text{ mg}$ aliquots with analgesia.
  2. **Adult RSI:** $1.5–2.5\text{ mg/kg}$ IV bolus over $30–45\text{ seconds}$.
  3. **Elderly / Shock Induction:** Reduce dose to $0.5–1.0\text{ mg/kg}$ injected slowly over $60\text{ seconds}$.
  4. **Pediatric RSI:** $2.5–3.5\text{ mg/kg}$ IV due to larger volume of distribution.
  5. **TIVA & ICU Sedation:** Continuous titrated infusion ($1.5–6\text{ mg/kg/h}$).
- **Adverse Effects:**
  - Systemic hypotension (venodilation, arteriolar dilation, direct negative inotropy, and blunted baroreceptor reflex).
  - Apnea, tidal volume collapse, and loss of airway protective reflexes (aspiration risk).
  - Intense pain on peripheral injection (lipid aqueous emulsion irritation).
  - **Propofol Infusion Syndrome (PRIS):** Potentially fatal complication of high-dose ($> 4–5\text{ mg/kg/h}$) and prolonged ($> 48\text{h}$) infusions; characterized by refractory metabolic acidosis, rhabdomyolysis, hyperkalemia, hepatomegaly, renal failure, and refractory bradycardia/asystole.
- **Contraindications & Red Flags:**
  - Uncorrected severe hypovolemic, hemorrhagic, or septic shock.
  - Unmonitored or unassisted airway without immediate airway rescue equipment.
  - Severe anaphylaxis to egg or soy components (formulation contains egg yolk lecithin and soybean oil).
  - Fixed cardiac output states (severe Aortic Stenosis).

---

## 🎨 Google Material Design Features

- **Material You (Material 3) Aesthetics:** Clean Google rounded cards, tonal color surfaces, elevation layers, pill chips, and Roboto / Google Sans typography.
- **Mobile-First Responsive Layout:**
  - Optimized bottom navigation bar for single-handed thumb interaction on smartphones.
  - Sticky pill-shaped search bar with instant client-side filtering.
  - Horizontal chip filter scroller for fast section jumping.
  - Touch targets $\ge 48\text{px}$ with safe area insets (`env(safe-area-inset-bottom)`).
- **Interactive Clinical Decision Support Tools:**
  - **GTN Bedside Safety & RV Infarct Red Flag Screener:** Form evaluating hemodynamics and preload dependencies.
  - **8-Hour Nitrate Tolerance Scheduler:** Dynamically computes active window and required 8-hour washout window.
  - **Propofol Airway & PRIS Safety Screener:** Point-of-care hemodynamic and airway risk triage.
  - **Propofol Weight-Based Dosing Calculator:** Calculates exact mg and mL volumes for 1% formulation across adult, elderly, and pediatric protocols.
  - **Pharm 101 Self-Assessment Quizzes:** 5 multiple-choice questions per drug with instant rationale feedback and score tracking.
  - **LocalStorage Bookmarks:** Save high-yield cards for quick recall.
  - **Material Dark & Light Theme:** Automatic OS color-scheme detection with manual toggle.
- **100% Vanilla Tech Stack:** Latest semantic HTML5, modern CSS3 with custom properties, and vanilla ES6+ JavaScript. No build step or heavy framework dependencies required.

---

## 🛠️ Prompt Reference & Permanent Template Guide

This section serves as a permanent reference for creating additional drug pages in this series (e.g. Adrenaline, Amiodarone, Ketamine, Salbutamol, Morphine) formatted for personal clinical use.

### 1. Generation Prompts History

#### Initial Build Prompt:
> *"Open chrome and look at `<URL-OF-MEDICAL-ARTICLE>`. I want you to get the main information of the article and apply a google like design. Moreover, make sure the web app has a mobile first approach. One more thing, use the latest vanilla version of HTML and JavaScript to build it. As far as design goes, you can use Material CSS to make it look like a Google Web App."*

#### Personalization & Cleanup Prompt (The "Clean Personal Use" Refinement):
> *"Open Chrome and look at index.html. Edit the app and take out the following things:*
> *1. Any word pattern like "LITFL TOP 200 Drugs"*
> *2. The circle to the top right with "RB" on it*
> *3. Anything to do with "Dr. Robert Buttner"*
> *4. Anything to do with "ACEM TOP 200 Drugs"*
> *5. Remove the further reading section at the bottom of the app.*
> *Basically, I want those removed because I would use this app for personal use. Lastly, edit README.md to add an entry in there about this prompt so that it could be referenced in the future whenever I would make another page like this."*

#### Multi-Drug Directory Expansion Prompt:
> *"Open Chrome and look at https://litfl.com/pharm-101-<drug>/ . Copy the relevant contents of that website and make a new one using @index.html , @style.css , @app.js , and @README.md as a reference on how to make it. Next, save it as "<drug>.html" and rename @index.html to "gtn.html" . Now, edit the file structure making way for a new "index.html" as a landing page which will link to "<drug>.html" and "gtn.html". Moreover, make sure that @app.js and @style.css is also updated if need be. Lastly, have a look at @README.md as a guide on the purpose of this app."*

---

### 2. Standard Drug Page Blueprint & Checklist

When adding the next drug to the suite, follow this checklist:

| Component | Standard Implementation Pattern | Personalization Rule |
| :--- | :--- | :--- |
| **Directory Link** | Add the new drug card to `index.html` grid and drawer links in all HTML files. | Use clean category tags (`cardiovascular`, `anaesthesia`, `analgesia`, `emergency`). |
| **Top App Bar** | Sticky header with menu drawer button, search pill, theme toggle, and bookmark drawer. | Brand links back to `index.html`. No author avatar circle. Brand: `Pharm 101 • Clinical Pharmacology`. |
| **Hero Card** | Drug title, chemical name/aliases, key metric tiles (Class, Mechanism, Onset, Duration, Half-life, Key Phenomenon). | Badge: `Clinical Pharmacology • Basic Science`. No external citation banners. |
| **Pharmacodynamics** | Step-by-step visual cascade (Receptor/Enzyme $\rightarrow$ Second messenger $\rightarrow$ Cellular effect) + organ systems breakdown. | Highlight direct physiological mechanism and clinical significance. |
| **Pharmacokinetics** | Metric badges for ADME ($t_{1/2}$, Onset, Duration, Clearance, Metabolism, Excretion) + redistribution/tolerance deep dive. | Focus on actionable bedside kinetics. |
| **Clinical Indications** | Responsive card grid with icon tags (1st line, IV infusion, emergency bolus). | High-yield acute indications. |
| **Adverse Effects** | List with warning color indicators and physiological explanations. | Extensions of primary pharmacology. |
| **Contraindications / Red Flags** | High-contrast danger cards for absolute contraindications and preload/airway dependencies. | Flag critical drug-drug interactions and preload dependencies. |
| **Bedside Interactive Tool** | Form assessing hemodynamics (BP, HR, rhythm, specific contraindication checks) outputting immediate Red/Amber/Green alerts. | Keep interactive and practical for point-of-care assessment. |
| **Specialized Drug Tool** | Drug-specific calculator (e.g. Weight-based dosing calculator, infusion titration tool, tolerance timer). | Provide dynamic calculation with real-time DOM feedback. |
| **Self-Assessment Quiz** | 5 high-yield multiple-choice questions with instant correct/incorrect feedback and rationale. | Keep questions clinical and concept-oriented. |
| **Bottom Navigation Bar** | Mobile-first 5-tab thumb-friendly navigation (Summary, Dynamics, Kinetics, Safety, Quiz). | Essential for mobile viewport accessibility. |

---

## 🚀 Running the Web App

You can open `index.html` directly in any web browser, or serve it with Python:

```bash
# Start a local static server
python3 -m http.server 8080

# Open in browser:
# http://localhost:8080
```
