// KAPITEL 1: Stammtöne (Reine farbige Buchstaben-Kärtchen, Fanfare & Konfetti – 10-12 zufällige Runden)

const STAMM_KAERTCHEN = {
  C: { buchstabe: "C", farbe: "#ef4444", bg: "#fee2e2", midi: 60 },
  D: { buchstabe: "D", farbe: "#f97316", bg: "#ffedd5", midi: 62 },
  E: { buchstabe: "E", farbe: "#ca8a04", bg: "#fef9c3", midi: 64 },
  F: { buchstabe: "F", farbe: "#16a34a", bg: "#dcfce7", midi: 65 },
  G: { buchstabe: "G", farbe: "#0891b2", bg: "#cffafe", midi: 67 },
  A: { buchstabe: "A", farbe: "#2563eb", bg: "#dbeafe", midi: 69 },
  H: { buchstabe: "H", farbe: "#9333ea", bg: "#f3e8ff", midi: 71 }
};

const REIHENFOLGE = Array.of("C", "D", "E", "F", "G", "A", "H");
const OKTAV_REIHE = Array.of("C", "D", "E", "F", "G", "A", "H", "C2");

function mischeListe(liste) {
  const kopie = [...liste];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie[i];
    kopie[i] = kopie[j];
    kopie[j] = temp;
  }
  return kopie;
}

function baueKaertchenHTML(buchstabe, onclickCode = "", klein = false) {
  const basisTon = buchstabe === "C2" ? "C" : buchstabe;
  const k = STAMM_KAERTCHEN[basisTon] || {
    buchstabe: basisTon,
    farbe: "#475569",
    bg: "#f1f5f9"
  };
  return `
    <button type="button" class="stamm-card ${klein ? "klein" : ""}"
      style="background:${k.bg}; border-color:${k.farbe}; color:${k.farbe};"
      ${onclickCode ? `onclick="${onclickCode}"` : ""}>
      <span class="stamm-letter" style="font-size:${klein ? "24px" : "34px"};">${k.buchstabe}</span>
    </button>`;
}

// Baut die 8er-Auswahlreihe C – D – E – F – G – A – H – C (mit hohem C oben)
function baueOktavAuswahlHTML(handlerName) {
  return `
    <div class="cards-pool" style="justify-content:center; gap:8px; margin-top:14px;">
      ${OKTAV_REIHE.map((code) => {
        const ton = code === "C2" ? "C" : code;
        const midi = code === "C2" ? 72 : STAMM_KAERTCHEN[ton].midi;
        return baueKaertchenHTML(code, `${handlerName}('${ton}', ${midi})`, true);
      }).join("")}
    </div>`;
}

function starteKap1Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap1Ordnen();
  if (nummer === 2) starteKap1StammOderNicht();
  if (nummer === 3) starteKap1Nachbar();
  if (nummer === 4) starteKap1Fehlt();
  if (nummer === 5) starteKap1Doppelschritte();
  if (nummer === 6) starteKap1Boss();
}

// 1.1 Ordne die Töne (2 Durchgänge: 1x vorwärts C->H, 1x rückwärts H->C)
function starteKap1Ordnen() {
  let runde = 1;
  let gewaehlt = Array.of();
  let zielReihe = [...REIHENFOLGE];
  let gemischt = mischeListe(REIHENFOLGE);

  const render = (hinweis = "Runde 1 von 2: Tippe die Kärtchen von C bis H an!") => {
    if (gewaehlt.length === zielReihe.length) {
      if (runde === 1) {
        runde = 2;
        gewaehlt = Array.of();
        zielReihe = [...REIHENFOLGE].reverse();
        gemischt = mischeListe(REIHENFOLGE);
        render("Super! Runde 2 von 2: Jetzt rückwärts von H hinunter bis C!");
        return;
      }
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap1_1", 120, "Perfekt geordnet!", "Du kannst alle 7 Stammtöne vorwärts und rückwärts in Blitzzeit sortieren!");
      return;
    }
    document.getElementById("main-content").innerHTML = `
      <div class="card">
        <div class="quiz-meta"><span>1.1 Ordne die Töne (Runde ${runde}/2)</span><span>${gewaehlt.length} / 7</span></div>
        <h2>${runde === 1 ? "Bringe alle 7 Stammtöne von C bis H in die Reihe!" : "Jetzt rückwärts: Von H hinunter bis C!"}</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div class="slot-row">
          ${zielReihe.map((_, idx) =>
            gewaehlt[idx]
              ? baueKaertchenHTML(gewaehlt[idx], "", true)
              : `<div class="stamm-slot">${idx + 1}</div>`
          ).join("")}
        </div>
        <div class="cards-pool">
          ${gemischt.map((b) =>
            gewaehlt.includes(b) ? "" : baueKaertchenHTML(b, `waehleOrdnen('${b}')`, true)
          ).join("")}
        </div>
      </div>`;
  };

  window.waehleOrdnen = (b) => {
    const erwartet = zielReihe[gewaehlt.length];
    if (b === erwartet) {
      klavierAudio.spieleMidi(STAMM_KAERTCHEN[b].midi);
      gewaehlt.push(b);
      render(runde === 1 ? "Klasse! Welcher Ton kommt als Nächstes?" : "Stark! Welcher Ton liegt direkt darunter?");
    } else {
      klavierAudio.spieleFehler();
      render(`Tipp: Nach ${gewaehlt.length === 0 ? "dem Start" : gewaehlt[gewaehlt.length - 1]} kommt nicht ${b}!`);
    }
  };
  render();
}
// 1.2 Stammton oder nicht? (12 zufällig gemischte Karten inkl. Gummientchen)
function starteKap1StammOderNicht() {
  const karten = mischeListe(Array.of(
    { buchstabe: "C", istStamm: true,  tipp: "C ist der allererste Stammton!" },
    { buchstabe: "B", istStamm: false, tipp: "Achtung: Im Deutschen heisst der Stammton H, nicht B!" },
    { buchstabe: "G", istStamm: true,  tipp: "G gehört zu C–D–E–F–G–A–H." },
    { buchstabe: "Fis", istStamm: false, tipp: "Fis hat ein Kreuz (♯) und ist kein Stammton." },
    { buchstabe: "H", istStamm: true,  tipp: "H ist der 7. Stammton!" },
    { buchstabe: "M", istStamm: false, tipp: "Das Musik-Alphabet geht nur von A bis H!" },
    { buchstabe: "E", istStamm: true,  tipp: "E ist der 3. Stammton." },
    { buchstabe: "Cis", istStamm: false, tipp: "Cis ist ein erhöhter Ton, kein Stammton." },
    { buchstabe: "F", istStamm: true,  tipp: "F liegt direkt nach E (C–D–E–F)." },
    { buchstabe: "Es", istStamm: false, tipp: "Es ist ein erniedrigter Ton und kein Stammton." },
    { buchstabe: "A", istStamm: true,  tipp: "A liegt zwischen G und H." },
    { buchstabe: "K", istStamm: false, tipp: "Nach H beginnt wieder C – K gibt es nicht!" }
  ));
  let idx = 0;

  const render = (hinweis = "Gehört dieses Kärtchen zu den 7 Stammtönen?") => {
    if (idx >= karten.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap1_2", 120, "Stammton-Detektiv!", "12 von 12 erkannt – du lässt dich von keinem falschen Ton austricksen!");
      return;
    }
    const akt = karten[idx];
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.2 Stammton oder nicht?</span><span>${idx + 1} / ${karten.length}</span></div>
        <h2>Ist das ein Stammton?</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div style="display:flex; justify-content:center; margin:18px 0;">
          ${baueKaertchenHTML(akt.buchstabe)}
        </div>
        <div class="answer-grid" style="grid-template-columns: 1fr 1fr;">
          <button class="answer-btn" style="background:#dcfce7; border-color:#22c55e; color:#15803d;" onclick="checkStamm(true)">✅ Ja, Stammton</button>
          <button class="answer-btn" style="background:#fee2e2; border-color:#ef4444; color:#b91c1c;" onclick="checkStamm(false)">❌ Nein, keiner</button>
        </div>
      </div>`;
  };

  window.checkStamm = (wahl) => {
    const akt = karten[idx];
    if (wahl === akt.istStamm) {
      if (akt.istStamm) {
        klavierAudio.spieleMidi(STAMM_KAERTCHEN[akt.buchstabe].midi);
      } else {
        klavierAudio.spieleQuietsch();
      }
      idx++;
      render("Richtig erkannt! Weiter geht’s:");
    } else {
      klavierAudio.spieleFehler();
      render(`Nicht ganz – Tipp: ${akt.tipp}`);
    }
  };
  render();
}

// 1.3 Finde den Nachbarn (12 zufällig gemischte Aufgaben mit C–D–E–F–G–A–H–C unten)
function starteKap1Nachbar() {
  const aufgaben = mischeListe(Array.of(
    { basis: "D", richtung: "oben",  ziel: "E", tipp: "Nach D kommt E (C – D – E)" },
    { basis: "G", richtung: "unten", ziel: "F", tipp: "Vor G steht F (E – F – G)" },
    { basis: "H", richtung: "oben",  ziel: "C", tipp: "Nach H kommt oben wieder das C (G – A – H – C)!" },
    { basis: "C", richtung: "unten", ziel: "H", tipp: "Direkt unter dem hohen C liegt H (G – A – H – C)!" },
    { basis: "E", richtung: "oben",  ziel: "F", tipp: "Direkt nach E folgt F" },
    { basis: "A", richtung: "unten", ziel: "G", tipp: "Vor A kommt G" },
    { basis: "F", richtung: "oben",  ziel: "G", tipp: "Nach F kommt G (E – F – G)" },
    { basis: "D", richtung: "unten", ziel: "C", tipp: "Unter D liegt der Startton C!" },
    { basis: "A", richtung: "oben",  ziel: "H", tipp: "Nach A kommt H (G – A – H)" },
    { basis: "F", richtung: "unten", ziel: "E", tipp: "Unter F liegt E (D – E – F)" },
    { basis: "C", richtung: "oben",  ziel: "D", tipp: "Direkt über C wohnt D" },
    { basis: "H", richtung: "unten", ziel: "A", tipp: "Vor H steht A (G – A – H)" }
  ));
  let idx = 0;

  const render = (hinweis = "Tippe das richtige Nachbar-Kärtchen an!") => {
    if (idx >= aufgaben.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap1_3", 140, "Nachbar-Profi!", "Du kennst jeden oberen und unteren Nachbarn – sogar beim Sprung H ↔ C!");
      return;
    }
    const akt = aufgaben[idx];
    const pfeil = akt.richtung === "oben" ? "⬆️ Nachbar DARÜBER" : "⬇️ Nachbar DARUNTER";
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.3 Finde den Nachbarn</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <h2>Welcher Stammton liegt direkt ${akt.richtung === "oben" ? "über" : "unter"} ${akt.basis}?</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div style="display:flex; justify-content:center; align-items:center; gap:14px; margin:16px 0;">
          ${baueKaertchenHTML(akt.basis)}
          <div style="font-weight:800; color:var(--primary);">${pfeil}</div>
        </div>
        ${baueOktavAuswahlHTML("checkNachbarKap1")}
      </div>`;
  };

  window.checkNachbarKap1 = (wahl, midi) => {
    const akt = aufgaben[idx];
    if (wahl === akt.ziel) {
      klavierAudio.spieleMidi(midi || STAMM_KAERTCHEN[wahl].midi);
      idx++;
      render("Volltreffer! ✅");
    } else {
      klavierAudio.spieleFehler();
      render(`Fast! Tipp: ${akt.tipp}`);
    }
  };
  render();
}
// 1.4 Lücken-Detektiv (10 zufällig gemischte Aufgaben – Frage in 1 Zeile, Auswahl in 1 Zeile)
function starteKap1Fehlt() {
  const aufgaben = mischeListe(Array.of(
    { reihe: Array.of("C", "?", "E", "F"), ziel: "D", tipp: "Zwischen C und E liegt D." },
    { reihe: Array.of("E", "F", "?", "A"), ziel: "G", tipp: "Nach F und vor A steht G." },
    { reihe: Array.of("G", "A", "?", "C"), ziel: "H", tipp: "Nach A und vor dem oberen C liegt H." },
    { reihe: Array.of("A", "H", "?", "D"), ziel: "C", tipp: "Nach H startet die Tonleiter wieder mit C!" },
    { reihe: Array.of("D", "?", "F", "G"), ziel: "E", tipp: "Zwischen D und F steht E." },
    { reihe: Array.of("F", "G", "?", "H"), ziel: "A", tipp: "Zwischen G und H liegt A." },
    { reihe: Array.of("H", "?", "D", "E"), ziel: "C", tipp: "Nach H kommt wieder C!" },
    { reihe: Array.of("C", "D", "E", "?"), ziel: "F", tipp: "Direkt nach E folgt F." },
    { reihe: Array.of("G", "?", "H", "C"), ziel: "A", tipp: "Zwischen G und H wohnt A." },
    { reihe: Array.of("F", "E", "?", "C"), ziel: "D", tipp: "Hier geht es rückwärts: F – E – D – C!" }
  ));
  let idx = 0;

  const render = (hinweis = "Welcher Stammton fehlt an der Stelle mit dem Fragezeichen?") => {
    if (idx >= aufgaben.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap1_4", 140, "Lücken-Detektiv!", "Keine Tonleiter-Lücke bleibt vor dir verborgen!");
      return;
    }
    const akt = aufgaben[idx];
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.4 Lücken in der Tonleiter</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <h2>Welcher Ton fehlt in der Reihe?</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div style="display:flex; flex-wrap:nowrap; justify-content:center; align-items:center; gap:10px; margin:18px 0;">
          ${akt.reihe.map((b) =>
            b === "?"
              ? `<div class="stamm-slot" style="width:52px; height:52px; min-width:52px; display:flex; align-items:center; justify-content:center; border-color:#ef4444; color:#ef4444; font-size:26px;">?</div>`
              : baueKaertchenHTML(b, "", true)
          ).join("")}
        </div>
        ${baueOktavAuswahlHTML("checkFehltKap1")}
      </div>`;
  };

  window.checkFehltKap1 = (wahl, midi) => {
    const akt = aufgaben[idx];
    if (wahl === akt.ziel) {
      klavierAudio.spieleMidi(midi || STAMM_KAERTCHEN[wahl].midi);
      idx++;
      render("Genau richtig! ✅");
    } else {
      klavierAudio.spieleFehler();
      render(`Noch nicht – Tipp: ${akt.tipp}`);
    }
  };
  render();
}

// 1.5 Doppelschritte (10 zufällig gemischte Aufgaben mit 2 Pfeilen ⬆️⬆️ / ⬇️⬇️)
function starteKap1Doppelschritte() {
  const aufgaben = mischeListe(Array.of(
    { start: "C", richtung: "hoch",   ziel: "E", tipp: "Doppelschritt nach oben von C: C – (D) – E!" },
    { start: "E", richtung: "hoch",   ziel: "G", tipp: "Doppelschritt nach oben von E: E – (F) – G!" },
    { start: "G", richtung: "hoch",   ziel: "H", tipp: "Doppelschritt nach oben von G: G – (A) – H!" },
    { start: "D", richtung: "hoch",   ziel: "F", tipp: "Doppelschritt nach oben von D: D – (E) – F!" },
    { start: "F", richtung: "hoch",   ziel: "A", tipp: "Doppelschritt nach oben von F: F – (G) – A!" },
    { start: "G", richtung: "runter", ziel: "E", tipp: "Doppelschritt nach unten von G: G – (F) – E!" },
    { start: "E", richtung: "runter", ziel: "C", tipp: "Doppelschritt nach unten von E: E – (D) – C!" },
    { start: "H", richtung: "runter", ziel: "G", tipp: "Doppelschritt nach unten von H: H – (A) – G!" },
    { start: "A", richtung: "hoch",   ziel: "C", tipp: "Doppelschritt nach oben von A: A – (H) – C!" },
    { start: "C", richtung: "runter", ziel: "A", tipp: "Doppelschritt nach unten von C: C – (H) – A!" }
  ));
  let idx = 0;

  const render = (hinweis = "Mache einen Doppelschritt!") => {
    if (idx >= aufgaben.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap1_5", 150, "Doppelschritt-Meister!", "Du meisterst alle Doppelschritte vorwärts und rückwärts!");
      return;
    }
    const akt = aufgaben[idx];
    const doppelPfeil = akt.richtung === "hoch" ? "⬆️⬆️" : "⬇️⬇️";
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.5 Doppelschritte</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <h2>Doppelschritt ${akt.richtung === "hoch" ? "nach OBEN" : "nach UNTEN"} von ${akt.start}:</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div style="display:flex; justify-content:center; align-items:center; gap:14px; margin:16px 0;">
          ${baueKaertchenHTML(akt.start)}
          <div style="font-size:28px; font-weight:800;">${doppelPfeil}</div>
        </div>
        ${baueOktavAuswahlHTML("checkSprungKap1")}
      </div>`;
  };

  window.checkSprungKap1 = (wahl, midi) => {
    const akt = aufgaben[idx];
    if (wahl === akt.ziel) {
      klavierAudio.spieleMidi(midi || STAMM_KAERTCHEN[wahl].midi);
      idx++;
      render("Super Doppelschritt! ✅");
    } else {
      klavierAudio.spieleFehler();
      render(`Fast! Tipp: ${akt.tipp}`);
    }
  };
  render();
}

// 1.6 Stammtöne-Meister (12 zufällig gemischte Abschluss-Fragen ohne verräterische Klammern)
function starteKap1Boss() {
  const fragen = mischeListe(Array.of(
    { frage: "Wie viele Stammtöne gibt es insgesamt?", antworten: Array.of("5", "7", "8", "12"), ziel: "7", tipp: "Zähle C, D, E, F, G, A, H zusammen." },
    { frage: "Welcher Stammton liegt direkt über H?", antworten: Array.of("A", "B", "C", "D"), ziel: "C", tipp: "Nach H fängt die Reihe wieder bei C an!" },
    { frage: "Welcher Ton liegt genau in der Mitte zwischen E und G?", antworten: Array.of("D", "F", "A", "H"), ziel: "F", tipp: "C – D – E – F – G!" },
    { frage: "Was ist KEIN echter Stammton?", antworten: Array.of("D", "F", "Fis", "A"), ziel: "Fis", tipp: "Stammtöne haben keine Vorzeichen wie -is oder -es." },
    { frage: "Welcher Stammton kommt direkt vor G?", antworten: Array.of("E", "F", "A", "H"), ziel: "F", tipp: "E – F – G – A!" },
    { frage: "Doppelschritt von C nach oben:", antworten: Array.of("D", "E", "F", "G"), ziel: "E", tipp: "Von C zwei Schritte hoch landet auf E!" },
    { frage: "Welcher Ton liegt direkt unter C?", antworten: Array.of("D", "G", "A", "H"), ziel: "H", tipp: "Unter dem C wohnt der 7. Stammton H." },
    { frage: "Welche Reihe stimmt rückwärts?", antworten: Array.of("H – A – G – F", "H – G – A – F", "A – H – G – F", "G – H – A – F"), ziel: "H – A – G – F", tipp: "Von oben nach unten: H, A, G, F, E, D, C." },
    { frage: "Welcher Ton liegt zwischen G und H?", antworten: Array.of("F", "A", "B", "C"), ziel: "A", tipp: "G – A – H!" },
    { frage: "Wie heisst der 4. Stammton (C = 1, D = 2, E = 3)?", antworten: Array.of("F", "G", "A", "H"), ziel: "F", tipp: "1=C, 2=D, 3=E, 4=F!" },
    { frage: "Doppelschritt von G nach oben:", antworten: Array.of("F", "A", "H", "C"), ziel: "H", tipp: "Von G zwei Schritte hoch landet auf H!" },
    { frage: "Welcher Stammton fehlt: A – H – C – ? – E", antworten: Array.of("B", "D", "F", "G"), ziel: "D", tipp: "Nach C kommt D!" }
  ));
  let idx = 0;

  const render = (hinweis = "Meister-Prüfung Kapitel 1: Wähle die richtige Antwort!") => {
    if (idx >= fragen.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti();
      abschliessenSpiel("kap1_6", 200, "Stammtöne-Meister! 🏆", "Du hast alle 12 Meisterfragen von Kapitel 1 souverän gelöst!");
      return;
    }
    const akt = fragen[idx];
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.6 Stammtöne-Meister</span><span>${idx + 1} / ${fragen.length}</span></div>
        <h2>${akt.frage}</h2>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns: 1fr 1fr; margin-top:18px;">
          ${akt.antworten.map((a) => `
            <button class="answer-btn" onclick="checkBossKap1('${a}')">${a}</button>
          `).join("")}
        </div>
      </div>`;
  };

  window.checkBossKap1 = (wahl) => {
    const akt = fragen[idx];
    if (wahl === akt.ziel) {
      klavierAudio.spieleErfolg();
      idx++;
      render("Stark! Nächste Meisterfrage:");
    } else {
      klavierAudio.spieleFehler();
      render(`Tipp: ${akt.tipp}`);
    }
  };
  render();
}
