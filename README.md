# Pharm 101: Glycerol Trinitrate (GTN)

> **Mobile-first Google Material Design Web App** based on the emergency pharmacology guide by **Dr. Robert Buttner** published on [Life in the Fast Lane (LITFL) Top 200 Drugs](https://litfl.com/pharm-101-gtn/).

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
  - **ACEM Pharm 101 Self-Assessment Quiz:** 5 questions with instantaneous rationale feedback and score tracking.
  - **Card Bookmarks:** Save high-yield cards to `localStorage` for rapid exam review.
  - **Material Dark & Light Theme:** Automatic OS color-scheme detection with manual toggle.
- **100% Vanilla Tech Stack:** Latest semantic HTML5, modern CSS3 with custom properties, and vanilla ES6+ JavaScript. No build step or heavy framework dependencies required.

---

## 🚀 Running the Web App

You can open `index.html` directly in any web browser, or serve it with Python:

```bash
# Start a local static server
python3 -m http.server 8080

# Open in browser:
# http://localhost:8080
```
