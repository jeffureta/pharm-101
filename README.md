# Pharm 101: Glycerol Trinitrate (GTN)

> **Mobile-first Google Material Design Web App** for personal clinical pharmacology reference, emergency decision support, and self-assessment.

---

## 📖 Clinical Pharmacology Summary

- **Generic Name:** Glycerol Trinitrate (GTN) / Nitroglycerin (NTG)
- **Class:** Vasodilator (Organic Nitrate)
- **Primary Mechanism:** Cleaved in vascular smooth muscle releasing Nitric Oxide ($\text{NO}$) $\rightarrow$ stimulates soluble guanylyl cyclase $\rightarrow$ $\uparrow\text{cGMP}$ $\rightarrow$ Protein Kinase G (PKG) activation $\rightarrow$ dephosphorylation of myosin light chains $\rightarrow$ vascular smooth muscle relaxation and vasodilation.
- **Differential Vascular Actions:**
  - **Veins first / lower concentrations:** Venodilation increases capacitance, reduces cardiac preload and left ventricular (LV) end-diastolic volume.
  - **Higher concentrations:** Systemic arterial dilation reduces afterload and blood pressure. Directly dilates epicardial coronary arteries and decreases LV wall tension ($T = \frac{P \cdot r}{2h}$), substantially lowering myocardial oxygen demand ($\text{MVO}_2$).
- **Pharmacokinetics:**
  - **Bioavailability:** $10\%–20\%$ (extensive hepatic first-pass clearance).
  - **Half-Life ($t_{1/2}$):** $2–8\text{ minutes}$.
  - **Routes & Timings:** Sublingual onset $1–3\text{ minutes}$, duration $15–30\text{ minutes}$.
  - **Metabolism:** Hepatic glutathione organic nitrate reductase into 1,2-dinitro derivative (retains significant vasodilator potency); excreted renally.
- **Tachyphylaxis (Nitrate Tolerance):**
  - Smooth muscle tolerance develops with continuous IV infusion or round-the-clock transdermal wear due to depletion of intracellular tissue sulfhydryl ($-\text{SH}$) groups.
  - Mitigated by an intentional **8-hour drug-free interval** between doses.
- **Clinical Indications:**
  1. Angina pectoris (effort, vasospastic / Prinzmetal, unstable)
  2. Acute Coronary Syndrome (ACS / STEMI / NSTEMI)
  3. Hypertensive emergencies
  4. Acute Pulmonary Oedema (APO)
  5. Aortic dissection (*must be preceded by / co-administered with beta-blockers*)
- **Adverse Effects:** Throbbing nitrate headache, postural hypotension, reflex tachycardia, salt & water retention with longer-acting nitrates.
- **Contraindications & Red Flags:**
  - Severe hypotension ($\text{SBP} < 90\text{ mmHg}$)
  - **Inferior / Posterior MI with RV infarction** (*catastrophic preload collapse*)
  - Fixed cardiac output states (severe Aortic Stenosis, HOCM, cardiac tamponade)
  - Severe tachycardia ($> 100\text{ bpm}$) or bradycardia ($< 50\text{ bpm}$)
  - Concomitant PDE-5 inhibitors (*sildenafil* $< 24\text{h}$, *tadalafil* $< 48\text{h}$)

---

## 🎨 Google Material Design Features

- **Material You (Material 3) Aesthetics:** Clean Google rounded cards, tonal color surfaces, elevation layers, pill chips, and Roboto / Google Sans typography.
- **Mobile-First Responsive Layout:**
  - Optimized bottom navigation bar for single-handed thumb interaction on smartphones.
  - Sticky pill-shaped search bar with instant client-side filtering.
  - Horizontal chip filter scroller for fast section jumping.
  - Touch targets $\ge 48\text{px}$ with safe area insets (`env(safe-area-inset-bottom)`).
- **Interactive Clinical Decision Support Tools:**
  - **Bedside Safety & Red Flag Screener:** Evaluates SBP, heart rate, RV MI risk, fixed output obstructions, and PDE-5 inhibitor co-ingestion with immediate visual alerts (Red Alert / Amber Caution / Green Safe).
  - **8-Hour Nitrate Tolerance Planner:** Computes on/off scheduling to preserve vascular sulfhydryl reserves.
  - **Pharm 101 Self-Assessment Quiz:** 5 questions with instantaneous rationale feedback and score tracking.
  - **Card Bookmarks:** Save high-yield cards to `localStorage` for rapid review.
  - **Material Dark & Light Theme:** Automatic OS color-scheme detection with manual toggle.
- **100% Vanilla Tech Stack:** Latest semantic HTML5, modern CSS3 with custom properties, and vanilla ES6+ JavaScript. No build step or heavy framework dependencies required.

---

## 🛠️ Prompt Reference & Template Guide for Future Drug Pages

This section serves as a permanent reference for creating additional drug pages in this series (e.g. Adrenaline, Amiodarone, Propofol, Salbutamol, Ketamine, Morphine) formatted for personal clinical use.

### 1. Generation Prompts Reference

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

---

### 2. Standard Drug Page Blueprint & Checklist

When building another drug page from an online reference or clinical textbook for personal use, ensure the following template rules are followed:

| Component | Standard Implementation Pattern | Personalization Rule |
| :--- | :--- | :--- |
| **Top App Bar** | Sticky header with menu drawer button, search pill, theme toggle, and bookmark drawer. | **No author avatar circles** (e.g. no "RB" circle in the top right). Use clean branding: `Pharm 101 • Clinical Pharmacology`. |
| **Hero Card** | Drug title, chemical name/aliases, key metric tiles (Class, Mechanism, Bioavailability, Half-life, Onset, Key Phenomenon). | **No external author citation banners** or website badges. Use generic tags like `Clinical Pharmacology • Basic Science`. |
| **Pharmacodynamics** | Step-by-step visual cascade (Receptor/Enzyme $\rightarrow$ Second messenger $\rightarrow$ Cellular effect) + differential tissue/vascular actions. | Highlight direct physiological mechanism and clinical significance. |
| **Pharmacokinetics** | Metric badges for ADME (Bioavailability, $t_{1/2}$, Onset, Duration, Metabolism, Excretion) + tolerance/tachyphylaxis box. | Focus on actionable bedside kinetics. |
| **Clinical Indications** | Responsive card grid with icon tags (1st line, IV infusion, emergency bolus). | High-yield acute indications. |
| **Adverse Effects** | List with warning color indicators and physiological explanations. | Extensions of primary pharmacology. |
| **Contraindications / Red Flags** | High-contrast danger cards for absolute contraindications and preload/rate dependencies. | Flag critical drug-drug interactions (e.g. PDE-5 inhibitors) and preload dependencies. |
| **Bedside Interactive Tool** | Form assessing hemodynamics (BP, HR, rhythm, specific contraindication checks) outputting immediate Red/Amber/Green alerts. | Keep interactive and practical for point-of-care assessment. |
| **Specialized Drug Tool** | Drug-specific calculator (e.g., 8-Hour Drug-Free Window Planner for nitrates, Infusion Rate / Weight Calculator for inotropes). | Provide dynamic calculation with real-time DOM feedback. |
| **Self-Assessment Quiz** | 5 high-yield multiple-choice questions with instant correct/incorrect feedback and rationale. | Keep questions clinical and concept-oriented. |
| **Bottom Navigation Bar** | Mobile-first 5-tab thumb-friendly navigation (Summary, Dynamics, Kinetics, Safety, Quiz). | Essential for mobile viewport accessibility. |
| **References / Citations** | **Omitted / Removed** for personal use copies. | Keep the app self-contained without external reading lists or author links. |

---

## 🚀 Running the Web App

You can open `index.html` directly in any web browser, or serve it with Python:

```bash
# Start a local static server
python3 -m http.server 8080

# Open in browser:
# http://localhost:8080
```
