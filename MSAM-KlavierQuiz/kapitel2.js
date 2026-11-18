// KAPITEL 2: Klaviertasten (10-12 zufällige Runden pro Spiel, Fanfare & Konfetti, Pfeil ⬅️ / ➡️ & Buchstabenkärtchen)

function mischeZufallKap2(liste) {
  const kopie = liste.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie.at(i);
    kopie.splice(i, 1, kopie.at(j));
    kopie.splice(j, 1, temp);
  }
  return kopie;
}

function starteKap2Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap2ZwillingeDrillinge();
  if (nummer === 2) starteKap2CDE();
  if (nummer === 3) starteKap2FGAH();
  if (nummer === 4) starteKap2LeuchtTaste();
  if (nummer === 5) starteKap2Nachbarn();
  if (nummer === 6) starteKap2Boss();
}

// 2.1 Zwillinge (2 schwarze Tasten) und Drillinge (3 schwarze Tasten) – 10 zufällige Runden
function starteKap2ZwillingeDrillinge() {
  const runden = mischeZufallKap2(Array.of(
    { highlight: Array.of(49, 51), typ: "zwilling", frage: "Schau auf die markierten schwarzen Tasten: Zwillinge oder Drillinge?" },
    { highlight: Array.of(54, 56, 58), typ: "drilling", frage: "Wie viele schwarze Tasten gehören hier zusammen?" },
    { highlight: Array.of(61, 63), typ: "zwilling", frage: "Erkennst du diese Gruppe schwarzer Tasten?" },
    { highlight: Array.of(66, 68, 70), typ: "drilling", frage: "Sind das Zwillinge oder Drillinge?" },
    { highlight: Array.of(49, 51), typ: "zwilling", frage: "Welche Gruppe leuchtet hier links auf der Klaviatur?" },
    { highlight: Array.of(54, 56, 58), typ: "drilling", frage: "Zwillinge oder Drillinge – was leuchtet hier?" },
    { highlight: Array.of(61, 63), typ: "zwilling", frage: "Zähle die leuchtenden schwarzen Tasten rechts:" },
    { highlight: Array.of(66, 68, 70), typ: "drilling", frage: "Welche Gruppe leuchtet hier ganz rechts?" },
    { highlight: Array.of(49, 51), typ: "zwilling", frage: "Gehören diese Tasten zu den Zwillingen oder Drillingen?" },
    { highlight: Array.of(54, 56, 58), typ: "drilling", frage: "Was leuchtet hier in der Mitte der Klaviatur?" }
  ));
  let idx = 0;

  const render = (hinweis = "Zähle die schwarzen Tasten in der markierten Gruppe!") => {
    if (idx >= runden.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap2_1", 120, "Tasten-Adlerauge!", "Du unterscheidest Zwillinge und Drillinge auf einen Blick!");
      return;
    }
    const akt = runden.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>2.1 Zwillinge & Drillinge</span><span>${idx + 1} / ${runden.length}</span></div>
        <h2>${akt.frage}</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div id="kb-kap2-1" style="margin:14px 0;"></div>
        <div class="answer-grid" style="grid-template-columns: 1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0369a1;" onclick="checkKap2ZwillDrill('zwilling')">👯 Zwillinge (2er-Gruppe)</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#d97706; color:#b45309;" onclick="checkKap2ZwillDrill('drilling')">☘️ Drillinge (3er-Gruppe)</button>
        </div>
      </div>`;

    baueKlaviatur("kb-kap2-1", {
      startMidi: 48,
      endMidi: 72,
      highlightMidis: akt.highlight,
      zeigeNotennamen: false,
      onKeyClick: (midi) => klavierAudio.spieleMidi(midi)
    });
  };

  window.checkKap2ZwillDrill = (wahl) => {
    const akt = runden.at(idx);
    if (wahl === akt.typ) {
      akt.highlight.forEach((m, i) => setTimeout(() => klavierAudio.spieleMidi(m), i * 110));
      idx++;
      render("Super erkannt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render(`Tipp: Zähle genau – es sind ${akt.typ === "zwilling" ? "2 schwarze Tasten (Zwillinge)" : "3 schwarze Tasten (Drillinge)"}!`);
    }
  };
  render();
}

// 2.2 C – D – E an den Zwillingen – 12 zufällige Runden
function starteKap2CDE() {
  const zwillingsTasten = Array.of(49, 51, 61, 63);
  const aufgaben = mischeZufallKap2(Array.of(
    { ton: "C", pos: "aussen links neben den Zwillingen", midis: Array.of(48, 60, 72), tipp: "C liegt direkt links ausserhalb der 2 schwarzen Tasten!" },
    { ton: "D", pos: "in der Mitte zwischen den Zwillingen", midis: Array.of(50, 62), tipp: "D sitzt genau in der Lücke zwischen den Zwillingen!" },
    { ton: "E", pos: "aussen rechts neben den Zwillingen", midis: Array.of(52, 64), tipp: "E liegt direkt rechts ausserhalb der 2 schwarzen Tasten!" },
    { ton: "D", pos: "in der Mitte der Zwillinge", midis: Array.of(50, 62), tipp: "Schau in die Mitte zwischen die 2 schwarzen Tasten." },
    { ton: "C", pos: "aussen links an den Zwillingen", midis: Array.of(48, 60, 72), tipp: "Links neben dem Zwilling wohnt immer das C!" },
    { ton: "E", pos: "aussen rechts an den Zwillingen", midis: Array.of(52, 64), tipp: "Rechts neben dem Zwilling wohnt immer das E!" },
    { ton: "C", pos: "links vor den 2 schwarzen Tasten", midis: Array.of(48, 60, 72), tipp: "Tippe auf die weisse Taste links vor den Zwillingen!" },
    { ton: "E", pos: "rechts nach den 2 schwarzen Tasten", midis: Array.of(52, 64), tipp: "Tippe auf die weisse Taste rechts hinter den Zwillingen!" },
    { ton: "D", pos: "genau zwischen den 2 schwarzen Tasten", midis: Array.of(50, 62), tipp: "Zwischen den beiden Zwillingen liegt D!" },
    { ton: "C", pos: "aussen links neben einem Zwilling", midis: Array.of(48, 60, 72), tipp: "C wohnt links aussen am Zwilling." },
    { ton: "D", pos: "in der Zwillings-Lücke", midis: Array.of(50, 62), tipp: "D wohnt genau in der Lücke der Zwillinge." },
    { ton: "E", pos: "aussen rechts neben einem Zwilling", midis: Array.of(52, 64), tipp: "E wohnt rechts aussen am Zwilling." }
  ));
  let idx = 0;

  const render = (hinweis = "Tippe die gesuchte Taste auf dem Klavier an!") => {
    if (idx >= aufgaben.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap2_2", 140, "Zwillings-Experte!", "C (aussen links), D (Mitte) und E (aussen rechts) findest du jetzt blind!");
      return;
    }
    const akt = aufgaben.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>2.2 C – D – E an den Zwillingen</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="display:flex; justify-content:center; align-items:center; gap:14px; margin:10px 0;">
          ${baueKaertchenHTML(akt.ton)}
          <div style="text-align:left;">
            <div style="font-size:13px; color:var(--muted); font-weight:700;">Gesuchte Position:</div>
            <div style="font-size:18px; font-weight:800;">${akt.pos}</div>
          </div>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div id="kb-kap2-2" style="margin-top:14px;"></div>
      </div>`;

    baueKlaviatur("kb-kap2-2", {
      startMidi: 48,
      endMidi: 72,
      highlightMidis: zwillingsTasten,
      zeigeNotennamen: false,
      onKeyClick: (midi) => {
        klavierAudio.spieleMidi(midi);
        if (akt.midis.includes(midi)) {
          idx++;
          render(`Perfekt! Das ist ${akt.ton} ✅`);
        } else {
          klavierAudio.spieleQuietsch();
          render(`Nicht ganz – Tipp: ${akt.tipp}`);
        }
      }
    });
  };
  render();
}
// 2.3 F – G – A – H an den Drillingen – 12 zufällige Runden
function starteKap2FGAH() {
  const drillingsTasten = Array.of(54, 56, 58, 66, 68, 70);
  const aufgaben = mischeZufallKap2(Array.of(
    { ton: "F", pos: "aussen links neben den Drillingen", midis: Array.of(53, 65), tipp: "F liegt ganz links aussen vor den 3 schwarzen Tasten!" },
    { ton: "H", pos: "aussen rechts neben den Drillingen", midis: Array.of(59, 71), tipp: "H liegt ganz rechts aussen hinter den 3 schwarzen Tasten!" },
    { ton: "G", pos: "innen links in den Drillingen", midis: Array.of(55, 67), tipp: "G sitzt in der ersten (linken) Lücke der Drillinge!" },
    { ton: "A", pos: "innen rechts in den Drillingen", midis: Array.of(57, 69), tipp: "A sitzt in der zweiten (rechten) Lücke der Drillinge!" },
    { ton: "F", pos: "aussen links an den Drillingen", midis: Array.of(53, 65), tipp: "Ganz links aussen an den Drillingen liegt F." },
    { ton: "A", pos: "innen rechts bei den Drillingen", midis: Array.of(57, 69), tipp: "Innen rechts in den Drillingen liegt A." },
    { ton: "G", pos: "innen links bei den Drillingen", midis: Array.of(55, 67), tipp: "Innen links in den Drillingen liegt G." },
    { ton: "H", pos: "aussen rechts an den Drillingen", midis: Array.of(59, 71), tipp: "Ganz rechts aussen an den Drillingen liegt H." },
    { ton: "F", pos: "direkt links vor den 3 schwarzen Tasten", midis: Array.of(53, 65), tipp: "Vor dem Drilling wohnt immer das F!" },
    { ton: "G", pos: "in der ersten Lücke der Drillinge", midis: Array.of(55, 67), tipp: "Erste Lücke von links in den Drillingen = G." },
    { ton: "A", pos: "in der zweiten Lücke der Drillinge", midis: Array.of(57, 69), tipp: "Zweite Lücke von links in den Drillingen = A." },
    { ton: "H", pos: "direkt rechts hinter den 3 schwarzen Tasten", midis: Array.of(59, 71), tipp: "Hinter dem Drilling wohnt immer das H!" }
  ));
  let idx = 0;

  const render = (hinweis = "Tippe die richtige Taste an den Drillingen an!") => {
    if (idx >= aufgaben.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap2_3", 140, "Drillings-Profi!", "F, G, A und H an den Drillingen sitzen jetzt bombenfest!");
      return;
    }
    const akt = aufgaben.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>2.3 F – G – A – H an den Drillingen</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="display:flex; justify-content:center; align-items:center; gap:14px; margin:10px 0;">
          ${baueKaertchenHTML(akt.ton)}
          <div style="text-align:left;">
            <div style="font-size:13px; color:var(--muted); font-weight:700;">Gesuchte Position:</div>
            <div style="font-size:18px; font-weight:800;">${akt.pos}</div>
          </div>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div id="kb-kap2-3" style="margin-top:14px;"></div>
      </div>`;

    baueKlaviatur("kb-kap2-3", {
      startMidi: 48,
      endMidi: 72,
      highlightMidis: drillingsTasten,
      zeigeNotennamen: false,
      onKeyClick: (midi) => {
        klavierAudio.spieleMidi(midi);
        if (akt.midis.includes(midi)) {
          idx++;
          render(`Perfekt! Das ist ${akt.ton} ✅`);
        } else {
          klavierAudio.spieleQuietsch();
          render(`Nicht ganz – Tipp: ${akt.tipp}`);
        }
      }
    });
  };
  render();
}

// 2.4 Welche Taste leuchtet? – 12 zufällige Runden (mit C – D – E – F – G – A – H – C Auswahl)
function starteKap2LeuchtTaste() {
  const aufgaben = mischeZufallKap2(Array.of(
    { midi: 60, ziel: "C", tipp: "Aussen links neben den Zwillingen liegt C!" },
    { midi: 50, ziel: "D", tipp: "Genau in der Mitte zwischen den Zwillingen liegt D!" },
    { midi: 64, ziel: "E", tipp: "Aussen rechts neben den Zwillingen liegt E!" },
    { midi: 53, ziel: "F", tipp: "Aussen links vor den Drillingen liegt F!" },
    { midi: 67, ziel: "G", tipp: "Innen links in den Drillingen liegt G!" },
    { midi: 57, ziel: "A", tipp: "Innen rechts in den Drillingen liegt A!" },
    { midi: 71, ziel: "H", tipp: "Aussen rechts hinter den Drillingen liegt H!" },
    { midi: 72, ziel: "C", tipp: "Ganz rechts aussen links neben dem Zwilling liegt das hohe C!" },
    { midi: 62, ziel: "D", tipp: "In der Lücke der Zwillinge wohnt D!" },
    { midi: 52, ziel: "E", tipp: "Rechts aussen an den Zwillingen wohnt E!" },
    { midi: 65, ziel: "F", tipp: "Links aussen an den Drillingen wohnt F!" },
    { midi: 69, ziel: "A", tipp: "Zweite Lücke der Drillinge = A!" }
  ));
  let idx = 0;

  const render = (hinweis = "Schau auf die gelb leuchtende Taste und wähle unten den richtigen Namen!") => {
    if (idx >= aufgaben.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap2_4", 150, "Tasten-Erkenner!", "Du erkennst jede leuchtende Taste sofort!");
      return;
    }
    const akt = aufgaben.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>2.4 Welche Taste leuchtet?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <h2>Wie heisst die leuchtende Taste?</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div id="kb-kap2-4" style="margin:14px 0;"></div>
        ${baueOktavAuswahlHTML("checkKap2Leucht")}
      </div>`;

    baueKlaviatur("kb-kap2-4", {
      startMidi: 48,
      endMidi: 72,
      highlightMidis: Array.of(akt.midi),
      zeigeNotennamen: false,
      onKeyClick: (midi) => klavierAudio.spieleMidi(midi)
    });
  };

  window.checkKap2Leucht = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.ziel) {
      klavierAudio.spieleMidi(akt.midi);
      idx++;
      render("Genau richtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render(`Tipp: ${akt.tipp}`);
    }
  };
  render();
}
// 2.5 Nachbarn auf der Klaviatur – 12 zufällige Runden mit Pfeil (⬅️ links / ➡️ rechts)
function starteKap2Nachbarn() {
  const aufgaben = mischeZufallKap2(Array.of(
    { startMidi: 60, richtung: "rechts", zielMidi: 62, zielName: "D", tipp: "Die leuchtende Taste ist C – rechts daneben (➡️) liegt D!" },
    { startMidi: 67, richtung: "links",  zielMidi: 65, zielName: "F", tipp: "Die leuchtende Taste ist G – links daneben (⬅️) liegt F!" },
    { startMidi: 64, richtung: "rechts", zielMidi: 65, zielName: "F", tipp: "Die leuchtende Taste ist E – direkt rechts daneben (➡️) liegt F!" },
    { startMidi: 59, richtung: "rechts", zielMidi: 60, zielName: "C", tipp: "Die leuchtende Taste ist H – rechts daneben (➡️) beginnt wieder C!" },
    { startMidi: 69, richtung: "links",  zielMidi: 67, zielName: "G", tipp: "Die leuchtende Taste ist A – links daneben (⬅️) liegt G!" },
    { startMidi: 50, richtung: "links",  zielMidi: 48, zielName: "C", tipp: "Die leuchtende Taste ist D – links daneben (⬅️) liegt C!" },
    { startMidi: 53, richtung: "rechts", zielMidi: 55, zielName: "G", tipp: "Die leuchtende Taste ist F – rechts daneben (➡️) liegt G!" },
    { startMidi: 60, richtung: "links",  zielMidi: 59, zielName: "H", tipp: "Die leuchtende Taste ist C – links daneben (⬅️) liegt H!" },
    { startMidi: 55, richtung: "rechts", zielMidi: 57, zielName: "A", tipp: "Die leuchtende Taste ist G – rechts daneben (➡️) liegt A!" },
    { startMidi: 65, richtung: "links",  zielMidi: 64, zielName: "E", tipp: "Die leuchtende Taste ist F – links daneben (⬅️) liegt E!" },
    { startMidi: 57, richtung: "rechts", zielMidi: 59, zielName: "H", tipp: "Die leuchtende Taste ist A – rechts daneben (➡️) liegt H!" },
    { startMidi: 62, richtung: "rechts", zielMidi: 64, zielName: "E", tipp: "Die leuchtende Taste ist D – rechts daneben (➡️) liegt E!" }
  ));
  let idx = 0;

  const render = (hinweis = "Schau auf den Pfeil neben der gelben Taste und tippe unten den Nachbarn an!") => {
    if (idx >= aufgaben.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap2_5", 160, "Nachbar-Navigator!", "Du findest jeden Tasten-Nachbarn nach links und rechts blitzschnell!");
      return;
    }
    const akt = aufgaben.at(idx);
    const pfeilBox = akt.richtung === "rechts"
      ? `<div style="display:inline-flex; align-items:center; gap:12px; background:#fef3c7; border:2px solid #f59e0b; padding:8px 20px; border-radius:14px; font-size:30px; font-weight:900;"><span>🟨</span><span>➡️</span></div>`
      : `<div style="display:inline-flex; align-items:center; gap:12px; background:#e0f2fe; border:2px solid #0284c7; padding:8px 20px; border-radius:14px; font-size:30px; font-weight:900;"><span>⬅️</span><span>🟨</span></div>`;

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>2.5 Nachbarn auf der Klaviatur</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:6px 0 8px;">${pfeilBox}</div>
        <p class="quiz-hint">${hinweis}</p>
        <div id="kb-kap2-5" style="margin:12px 0;"></div>
        ${baueOktavAuswahlHTML("checkKap2Nachbar")}
      </div>`;

    baueKlaviatur("kb-kap2-5", {
      startMidi: 48,
      endMidi: 72,
      highlightMidis: Array.of(akt.startMidi),
      zeigeNotennamen: false,
      onKeyClick: (midi) => klavierAudio.spieleMidi(midi)
    });
  };

  window.checkKap2Nachbar = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.zielName) {
      klavierAudio.spieleMidi(akt.zielMidi);
      idx++;
      render(`Super! Das ist ${akt.zielName} ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Tipp: ${akt.tipp}`);
    }
  };
  render();
}

// 2.6 Boss-Challenge: Klaviertasten – 12 zufällige Runden (mit buntem Kärtchen & Nachbar-Pfeil)
function starteKap2Boss() {
  const fragen = mischeZufallKap2(Array.of(
    { modus: "taste",   ton: "D", highlight: Array.of(),   zielMidis: Array.of(50, 62) },
    { modus: "taste",   ton: "F", highlight: Array.of(),   zielMidis: Array.of(53, 65) },
    { modus: "nachbar", richtung: "rechts", highlight: Array.of(64), zielMidi: 65, zielName: "F" },
    { modus: "taste",   ton: "A", highlight: Array.of(),   zielMidis: Array.of(57, 69) },
    { modus: "nachbar", richtung: "links",  highlight: Array.of(60), zielMidi: 59, zielName: "H" },
    { modus: "taste",   ton: "H", highlight: Array.of(),   zielMidis: Array.of(59, 71) },
    { modus: "taste",   ton: "C", highlight: Array.of(),   zielMidis: Array.of(48, 60, 72) },
    { modus: "taste",   ton: "G", highlight: Array.of(),   zielMidis: Array.of(55, 67) },
    { modus: "taste",   ton: "E", highlight: Array.of(),   zielMidis: Array.of(52, 64) },
    { modus: "nachbar", richtung: "rechts", highlight: Array.of(59), zielMidi: 60, zielName: "C" },
    { modus: "nachbar", richtung: "links",  highlight: Array.of(67), zielMidi: 65, zielName: "F" },
    { modus: "nachbar", richtung: "rechts", highlight: Array.of(60), zielMidi: 62, zielName: "D" }
  ));
  let idx = 0;
  let leben = 3;

  const render = (hinweis = "") => {
    if (leben <= 0) {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:32px;">
          <div style="font-size:52px;">💔</div>
          <h2>Fast geschafft!</h2>
          <p class="quiz-hint" style="margin:10px 0 20px;">Alle 3 Herzen aufgebraucht – versuche es gleich noch einmal!</p>
          <button class="btn-primary" onclick="starteKap2Boss()">Boss-Challenge neu starten</button>
        </div>`;
      return;
    }
    if (idx >= fragen.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap2_6", 250, "🎉 KLAVIERTASTEN-MEISTER! 🎉", "Du kennst jede einzelne Taste blind – geniesse die Fanfare!");
      return;
    }

    const akt = fragen.at(idx);
    const herzen = "❤️".repeat(leben) + "🤍".repeat(3 - leben);

    if (akt.modus === "nachbar") {
      const pfeilBox = akt.richtung === "rechts"
        ? `<div style="display:inline-flex; align-items:center; gap:12px; background:#fef3c7; border:2px solid #f59e0b; padding:8px 20px; border-radius:14px; font-size:30px; font-weight:900;"><span>🟨</span><span>➡️</span></div>`
        : `<div style="display:inline-flex; align-items:center; gap:12px; background:#e0f2fe; border:2px solid #0284c7; padding:8px 20px; border-radius:14px; font-size:30px; font-weight:900;"><span>⬅️</span><span>🟨</span></div>`;
      const text = hinweis || "Schau auf den Pfeil neben der gelben Taste und tippe unten den Nachbarn an!";

      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div style="margin:6px 0 8px;">${pfeilBox}</div>
          <p class="quiz-hint">${text}</p>
          <div id="kb-kap2-6" style="margin:14px 0;"></div>
          ${baueOktavAuswahlHTML("checkKap2BossNachbar")}
        </div>`;

      baueKlaviatur("kb-kap2-6", {
        startMidi: 48,
        endMidi: 72,
        highlightMidis: akt.highlight,
        zeigeNotennamen: false,
        onKeyClick: (midi) => klavierAudio.spieleMidi(midi)
      });
    } else {
      const text = hinweis || "Drücke diese Taste auf dem Klavier!";
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div style="display:flex; justify-content:center; margin:6px 0 8px;">
            ${baueKaertchenHTML(akt.ton)}
          </div>
          <p class="quiz-hint">${text}</p>
          <div id="kb-kap2-6" style="margin-top:14px;"></div>
        </div>`;

      baueKlaviatur("kb-kap2-6", {
        startMidi: 48,
        endMidi: 72,
        highlightMidis: Array.of(),
        zeigeNotennamen: false,
        onKeyClick: (midi) => {
          klavierAudio.spieleMidi(midi);
          if (akt.zielMidis.includes(midi)) {
            idx++;
            render("Volltreffer! ✅");
          } else {
            leben--;
            klavierAudio.spieleQuietsch();
            render("Daneben – 1 Herz verloren! Schau auf Zwillinge und Drillinge!");
          }
        }
      });
    }
  };

  window.checkKap2BossNachbar = (wahl) => {
    const akt = fragen.at(idx);
    if (wahl === akt.zielName) {
      klavierAudio.spieleMidi(akt.zielMidi);
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben – 1 Herz verloren! Schau genau auf den Pfeil neben der gelben Taste!");
    }
  };
  render();
}
