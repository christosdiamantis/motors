# Progress

## Current milestone
Implemented initial Next.js App Router application: Greek theory, six-stage conceptual motor diagram, circuit element explanations, laboratory calculation engine, torque-versus-slip graph, self-assessed questions, formula sheet, dark mode and local progress. Awaiting dependency installation and verification.

## Sources
Inventory: 13 PDF files under materials, including Lecture 4 - Ασύγχρονες Ηλεκτρικές Μηχανές.pdf (141 pages), Φροντιστήριο ΑΜ.pdf, and other lecture/tutorial material on electromagnetism, transformers and DC machines. announcements.md identifies the first lab objective. No first-lab handout or instrument manual is present.

## Mathematical decisions
Lecture 4 pp. 64–71: resistance average, locked-rotor branch neglected, X1 fraction explicit, no-load rotor branch neglected, phasor-consistent shunt voltage computed from branch complex power. Total torque uses three-phase air-gap power and synchronous mechanical angular speed (pp. 82–86, 101). Synthetic inputs labelled. Rc may include rotational losses under no-load approximation; electromagnetic torque is distinct from shaft torque.

## Incomplete / next steps
Install dependencies; run build and automated tests; fix errors. Verify UI in browser. Add the missing laboratory handout and conform to it. Improve simulator with phase waveforms, rotor-current animation, physically justified controls and reduced-motion behavior. Expand question modes, formulas, chart axes and laboratory measurements. Add Tailwind, math rendering and full accessibility checks. Review remaining source diagrams visually, complete source catalog and add precise citations. Progress currently covers questions only. No actual lab measurements supplied.


## Verification 2026-11-20
- npm run build: passed with Next.js 16.4.6 and TypeScript strict mode. Warning: Next inferred an ancestor lockfile but ignored it.
- npm test: 3 passed; Node 26 emitted a module-type warning. Tests cover basic parameter values, power consistency and rated-speed validation; independent numerical torque verification remains necessary.
- npm install next@latest: audit reported 0 vulnerabilities.
- Browser interaction and visual testing have not been performed.
- Important gaps: lab handout and instrument manual absent; source review incomplete; no phase-voltage waveform, realistic motor dynamics, line-input converter, no-load speed input, interactive exam mode, Tailwind, KaTeX, or comprehensive formula reference. The circuit diagram is schematic and needs a true circuit drawing. The app is a partial first milestone, not the complete requested platform.
- Next: verify the numerical model against independently calculated reference cases, visually inspect source circuit diagrams and UI, add the missing lab materials and implement the remaining requested interactions.


## New source reconciliation — 2026-11-20
- New handout (4 pages) and instrumentation PDF (8 pages) read in full. Handout page 4 rendered and visually inspected. Diagram shows supply L1/L2/L3/N/PE, variable transformer, line-to-line voltmeter, one-phase wattmeter, motor terminals and star link; it does not show a separate ammeter or coupled generator. Handout pages 2–3 prescribe no-load, low-voltage stationary test without rotation, supply off, then resistance measurements. Instrumentation pages 2, 5–6 describe series current measurement, analyzer and tachometer.
- Independent Python complex-arithmetic reference for initial synthetic example: R1=4 Ω; R2'=3.2 Ω; X1=X2'=1.7435595774 Ω; Rc=442.0831127 Ω; Xm=116.0499497 Ω; s=0.04; air-gap power=1717.167527 W; rotor copper loss=68.686701 W; converted power=1648.480826 W; electromagnetic torque=10.931828 N m; rated shaft torque=9.947184 N m. Model uses no-load approximation and inferred Rc can absorb mechanical loss.
- In progress: update inaccurate missing-handout messages, add cited lab sequence and instrumentation, improve model/tests and learning interactions. The rendered source image lab-schematic-review.png is for verification only.


## Continuation milestone — 2026-11-20 (supersedes older status above)
- Read all 4 pages of “Ασύγχρονη Μηχανή-Φυλλάδιο Εργαστηρίου 2026_Vol2.pdf” and all 8 pages of “Οργανολογία.pdf”; rendered and visually inspected handout p. 4. It shows a line-to-line voltmeter, W on one phase and neutral, a three-phase motor linked in star and PE; no separate ammeter or generator symbol. The bench diagram in the app is conceptual, not a wiring guide.
- Laboratory now follows the handout sequence, adds instrument explanations and a line/phase calculator, and accepts both no-load and stationary measured speeds. Warnings cover rated-voltage stationary input and no-load speed far from synchronous. Phase-resistance inputs refer to individual winding measurements, not line-to-line resistance.
- The calculation engine now returns three-phase air-gap power, rotor copper loss and converted power. Python complex arithmetic independently checked the numerical reference noted above. Five automated tests cover this reference, star/delta conversion, invalid cases, voltage-squared torque scaling and power conservation.
- Added selectable equivalent circuit, conceptual 6-stage SVG motor with waveforms, controls and reduced-motion mode; torque/slip graph with keyboard-accessible slider; four-question self-assessed exam; tutorial numerical exercise and formula additions. Visited sections and exercise completion persist locally.
- Tests: npm run build passed, including strict TypeScript checks; npm test passed 5/5. Local dev server returned HTTP 200. Browser interaction test was attempted but user input was detected in the existing Chrome window, so it was not completed. Mobile and accessibility testing remain unverified.
- The simulator is explicitly conceptual: final slip and acceleration are illustrative, not a load/inertia solution. Phase current waveform and actual load physics remain to be implemented. Reduced motion needs browser testing.
- Remaining work: comprehensive UI/browser testing; trace all formulas and source references, inspect lecture diagrams and tutorial further; complete complete formula variable descriptions and graph tooltips; add numerical examples and exercise variety; implement multiple-choice / true-false modes and persist exam results; track completed theory and lab simulations rather than visits only; provide full motor controls; integrate Tailwind, shadcn/ui where useful, and KaTeX; review responsive, contrast, screen reader and print behavior; handle optional or missing nameplate values without blocking parameter estimation; include a faithful but explicitly non-instructional instrumentation diagram if source clarity permits. Add more independent examples and test low power factor, rounding, small slip and bad stored data.
- Known limitations: the synthetic input values follow the test approximations rather than a full dynamical experiment; Rc can absorb mechanical losses. Torque comparison uses electromagnetic versus rated shaft torque; unknown friction prevents a direct shaft prediction. No source states exact leakage split; 0.5 is a user-adjustable assumption. The source describes voltage raised to the non-starting threshold; do not describe it as a mechanically locked rotor. Exact temperature and frequency corrections are not modeled.
- No Git repository exists. The review image lab-schematic-review.png was generated solely for source inspection.

## Source inventory (all available PDFs, page counts)
- materials/Lecture 0 - Εισαγωγή.pdf — 27 pages.
- materials/1/Lecture 1 - Ηλεκτρομαγνητισμός και μαγνητικά κυκλώματα_partA.pdf — 36; Μαγνητικά κυκλώματα - φροντιστήριο.pdf — 4; Φροντιστήριο Μαγνητικά Κυκλώματα - Λύσεις.pdf — 8.
- materials/2/Lecture 2 - Μετασχηματιστές.pdf — 43; Lecture 2 - Μετασχηματιστές_partA.pdf — 15; Transformers Solutions άσκηση 1.pdf — 2; Transformers Solutions άσκηση 2.pdf — 3; Φροντιστήριο μετασχηματιστές.pdf — 2.
- materials/3/Lecture 3 - Μηχανές συνεχούς ρεύματος_partA.pdf — 38; Φροντιστήριο μηχανές συνεχούς ρεύματος.pdf — 3.
- materials/4/Lecture 4 - Ασύγχρονες Ηλεκτρικές Μηχανές.pdf — 141; Φροντιστήριο ΑΜ.pdf — 2.
- materials/Ασύγχρονη Μηχανή-Φυλλάδιο Εργαστηρίου 2026_Vol2.pdf — 4; materials/Οργανολογία.pdf — 8.
- announcements.md identifies the parameter estimation and torque comparison objective; its grading discussion is not reproduced as a permanent requirement.

