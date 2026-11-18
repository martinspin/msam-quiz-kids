// KAPITEL 4 (Anzeige Kapitel 3): Relatives Notenlesen für alle MSAM-Instrumente

const NOTEN_STUFEN = {
  0: { name: "C", midi: 60, istLinie: true },
  1: { name: "D", midi: 62, istLinie: false },
  2: { name: "E", midi: 64, istLinie: true },
  3: { name: "F", midi: 65, istLinie: false },
  4: { name: "G", midi: 67, istLinie: true },
  5: { name: "A", midi: 69, istLinie: false },
  6: { name: "H", midi: 71, istLinie: true },
  7: { name: "C2", midi: 72, istLinie: false },
  8: { name: "D2", midi: 74, istLinie: true },
  9: { name: "E2", midi: 76, istLinie: false },
  10: { name: "F2", midi: 77, istLinie: true }
};

function mischeZufallKap4(liste) {
  const kopie = liste.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie.at(i);
    kopie.splice(i, 1, kopie.at(j));
    kopie.splice(j, 1, temp);
  }
  return kopie;
}

function baueNotensystemSVG(notenListe) {
  const anzahl = notenListe.length;
  const breite = Math.max(320, 120 + anzahl * 76);
  const hoehe = 185;
  const untersteLinieY = 132;
  const halbSchrittY = 10;

  const linienStufen = Array.of(2, 4, 6, 8, 10);
  const linienSVG = linienStufen.map((st) => {
    const y = untersteLinieY - (st - 2) * halbSchrittY;
    return `<line x1="22" y1="${y}" x2="${breite - 22}" y2="${y}" stroke="#334155" stroke-width="2.4" stroke-linecap="round" />`;
  }).join("");

  const startX = Math.round(breite / 2) - ((anzahl - 1) * 42);
  const abstandX = anzahl <= 2 ? 84 : 68;

  const notenSVG = notenListe.map((n, i) => {
    const cx = startX + i * abstandX;
    const cy = untersteLinieY - (n.stufe - 2) * halbSchrittY;
    const farbe = n.farbe || "#0f172a";
    const strokeFarbe = n.border || "#0f172a";
    const aktivRing = n.aktiv
      ? `<circle cx="${cx}" cy="${cy}" r="21" fill="rgba(250, 204, 21, 0.35)" stroke="#f59e0b" stroke-width="2.5" />`
      : "";
    const hilfslinie = n.stufe === 0
      ? `<line x1="${cx - 22}" y1="${cy}" x2="${cx + 22}" y2="${cy}" stroke="#334155" stroke-width="2.6" stroke-linecap="round" />`
      : "";
    const labelOben = n.label
      ? `<text x="${cx}" y="${Math.min(cy - 22, 26)}" text-anchor="middle" font-size="22" font-weight="900" fill="${farbe}">${n.label}</text>`
      : "";

    return `
      <g>
        ${aktivRing}
        ${hilfslinie}
        <ellipse cx="${cx}" cy="${cy}" rx="13" ry="9.5" transform="rotate(-16 ${cx} ${cy})"
                 fill="${farbe}" stroke="${strokeFarbe}" stroke-width="2" />
        ${labelOben}
      </g>`;
  }).join("");

  return `
    <div style="display:flex; justify-content:center; margin:8px 0;">
      <svg viewBox="0 0 ${breite} ${hoehe}" style="width:100%; max-width:${Math.min(breite + 40, 560)}px; height:auto; background:#fffbeb; border:2px solid #fde68a; border-radius:18px;">
        ${linienSVG}
        ${notenSVG}
      </svg>
    </div>`;
}

function starteKap4Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap4LinieZwischenraum();
  if (nummer === 2) starteKap4GleichHochTief();
  if (nummer === 3) starteKap4SchrittDoppelschritt();
  if (nummer === 4) starteKap4MelodienSpielen();
  if (nummer === 5 || nummer === 6) starteKap4Boss();
}
// 3.1 Linie oder Zwischenraum?
function starteKap4LinieZwischenraum() {
  const stufen = mischeZufallKap4(Array.of(2, 3, 4, 5, 6, 7, 8, 9, 10, 4));
  let idx = 0;

  const render = (hinweis = "Geht eine Linie durch den Notenkopf oder liegt er dazwischen?") => {
    if (idx >= stufen.length) {
      abschliessenSpiel("kap4_1", 120, "Linien-Adlerauge!", "Du erkennst sofort jede Linie und jeden Zwischenraum!");
      return;
    }
    const st = stufen.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.1 Linie oder Zwischenraum?</span><span>${idx + 1} / ${stufen.length}</span></div>
        ${baueNotensystemSVG(Array.of({ stufe: st, farbe: "#4f46e5", border: "#312e81" }))}
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#e0e7ff; border-color:#4f46e5; color:#1e1b4b;" onclick="checkKap4LZ(true)">➖ Auf einer Linie</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap4LZ(false)">⬜ Im Zwischenraum</button>
        </div>
      </div>`;
  };

  window.checkKap4LZ = (wahlLinie) => {
    const info = NOTEN_STUFEN[stufen.at(idx)];
    klavierAudio.spieleMidi(info.midi);
    if (wahlLinie === info.istLinie) {
      idx++;
      render("Genau richtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Wenn die Linie mitten durch die Note geht, liegt sie auf einer Linie!");
    }
  };
  render();
}

// 3.2 Gleich, höher oder tiefer?
function starteKap4GleichHochTief() {
  const aufgaben = mischeZufallKap4(Array.of(
    { n1: 2, n2: 3, typ: "hoch" },
    { n1: 5, n2: 4, typ: "tief" },
    { n1: 4, n2: 4, typ: "gleich" },
    { n1: 6, n2: 7, typ: "hoch" },
    { n1: 8, n2: 7, typ: "tief" },
    { n1: 3, n2: 3, typ: "gleich" },
    { n1: 4, n2: 5, typ: "hoch" },
    { n1: 6, n2: 5, typ: "tief" },
    { n1: 7, n2: 7, typ: "gleich" },
    { n1: 2, n2: 2, typ: "gleich" }
  ));
  let idx = 0;

  const render = (hinweis = "Vergleiche die 2. Note mit der 1. Note!") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap4_2", 140, "Tonhöhen-Profi!", "Du siehst sofort, ob die Melodie gleich bleibt, steigt oder fällt!");
      return;
    }
    const akt = aufgaben.at(idx);
    const noten = Array.of(
      { stufe: akt.n1, farbe: "#0284c7", border: "#0369a1" },
      { stufe: akt.n2, farbe: "#f59e0b", border: "#b45309" }
    );
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.2 Höher, tiefer oder gleich?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        ${baueNotensystemSVG(noten)}
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap4GHT('tief')">⬇️ Tiefer</button>
          <button class="answer-btn" style="background:#f1f5f9; border-color:#64748b; color:#0f172a;" onclick="checkKap4GHT('gleich')">➡️ Gleicher Ton</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap4GHT('hoch')">⬆️ Höher</button>
        </div>
      </div>`;
  };

  window.checkKap4GHT = (wahl) => {
    const akt = aufgaben.at(idx);
    klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n1].midi, 0.5);
    setTimeout(() => klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n2].midi, 0.8), 260);
    if (wahl === akt.typ) {
      idx++;
      render("Super gehört und gesehen! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Schau auf die gelbe 2. Note: Liegt sie weiter oben, weiter unten oder gleich?");
    }
  };
  render();
}

// 3.3 Schritt oder Doppelschritt?
function starteKap4SchrittDoppelschritt() {
  const aufgaben = mischeZufallKap4(Array.of(
    { n1: 2, n2: 3, typ: "schritt" },
    { n1: 2, n2: 4, typ: "doppel" },
    { n1: 5, n2: 4, typ: "schritt" },
    { n1: 5, n2: 3, typ: "doppel" },
    { n1: 4, n2: 5, typ: "schritt" },
    { n1: 4, n2: 6, typ: "doppel" },
    { n1: 7, n2: 6, typ: "schritt" },
    { n1: 8, n2: 6, typ: "doppel" },
    { n1: 3, n2: 5, typ: "doppel" },
    { n1: 6, n2: 7, typ: "schritt" }
  ));
  let idx = 0;

  const render = (hinweis = "Kleiner Schritt (Nachbar) oder Doppelschritt (eine Note übersprungen)?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap4_3", 150, "Schritt- & Sprung-Meister!", "Linie-zu-Linie und Zwischenraum-zu-Zwischenraum erkennst du blind!");
      return;
    }
    const akt = aufgaben.at(idx);
    const noten = Array.of(
      { stufe: akt.n1, farbe: "#059669", border: "#065f46" },
      { stufe: akt.n2, farbe: "#f59e0b", border: "#b45309" }
    );
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.3 Schritte & Sprünge</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        ${baueNotensystemSVG(noten)}
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap4SD('schritt')">👣 Schritt (1 weiter)</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap4SD('doppel')">🦘 Doppelschritt (2 weiter)</button>
        </div>
      </div>`;
  };

  window.checkKap4SD = (wahl) => {
    const akt = aufgaben.at(idx);
    klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n1].midi, 0.5);
    setTimeout(() => klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n2].midi, 0.8), 260);
    if (wahl === akt.typ) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Bei einem Doppelschritt liegen beide Noten auf Linien oder beide in Zwischenräumen!");
    }
  };
  render();
}
// 3.4 Melodie-Verlauf lesen (10 zufällige 3-Ton-Melodien)
function starteKap4MelodienSpielen() {
  const aufgaben = mischeZufallKap4(Array.of(
    { stufen: Array.of(2, 3, 4), richtung: "hoch" },
    { stufen: Array.of(6, 5, 4), richtung: "tief" },
    { stufen: Array.of(2, 4, 6), richtung: "hoch" },
    { stufen: Array.of(6, 4, 2), richtung: "tief" },
    { stufen: Array.of(4, 4, 4), richtung: "gleich" },
    { stufen: Array.of(3, 4, 5), richtung: "hoch" },
    { stufen: Array.of(7, 6, 5), richtung: "tief" },
    { stufen: Array.of(3, 5, 7), richtung: "hoch" },
    { stufen: Array.of(8, 6, 4), richtung: "tief" },
    { stufen: Array.of(5, 5, 5), richtung: "gleich" }
  ));
  let idx = 0;

  const render = (hinweis = "In welche Richtung bewegt sich diese kleine Melodie?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap4_4", 180, "Melodie-Leser!", "Du erkennst ganze Ton-Verläufe auf einen Blick!");
      return;
    }
    const akt = aufgaben.at(idx);
    const noten = akt.stufen.map((st, i) => ({
      stufe: st,
      farbe: i === 0 ? "#0284c7" : i === 1 ? "#0ea5e9" : "#f59e0b",
      border: "#0f172a"
    }));

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.4 Melodie-Verlauf lesen</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        ${baueNotensystemSVG(noten)}
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap4Mel('tief')">📉 Geht abwärts</button>
          <button class="answer-btn" style="background:#f1f5f9; border-color:#64748b; color:#0f172a;" onclick="checkKap4Mel('gleich')">➡️ Bleibt gleich</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap4Mel('hoch')">📈 Geht aufwärts</button>
        </div>
      </div>`;
  };

  window.checkKap4Mel = (wahl) => {
    const akt = aufgaben.at(idx);
    akt.stufen.forEach((st, i) => {
      setTimeout(() => klavierAudio.spieleMidi(NOTEN_STUFEN[st].midi, 0.5), i * 240);
    });
    if (wahl === akt.richtung) {
      idx++;
      render("Klasse erkannt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Schau von links nach rechts: Klettern die Noten nach oben, nach unten oder bleiben sie gleich?");
    }
  };
  render();
}

// 3.5 Boss-Challenge: Relatives Notenlesen (10 gemischte Runden für alle Instrumente)
function starteKap4Boss() {
  const fragen = mischeZufallKap4(Array.of(
    { typ: "lz", stufe: 4, istLinie: true },
    { typ: "lz", stufe: 5, istLinie: false },
    { typ: "sd", n1: 2, n2: 4, antwort: "doppel" },
    { typ: "sd", n1: 6, n2: 5, antwort: "schritt" },
    { typ: "ght", n1: 3, n2: 6, antwort: "hoch" },
    { typ: "ght", n1: 7, n2: 4, antwort: "tief" },
    { typ: "lz", stufe: 8, istLinie: true },
    { typ: "sd", n1: 3, n2: 5, antwort: "doppel" },
    { typ: "mel", stufen: Array.of(2, 4, 6), antwort: "hoch" },
    { typ: "mel", stufen: Array.of(8, 6, 4), antwort: "tief" }
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
          <button class="btn-primary" onclick="starteKap4Boss()">Boss-Challenge neu starten</button>
        </div>`;
      return;
    }
    if (idx >= fragen.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti(true);
      abschliessenSpiel("kap4_boss", 250, "🎉 NOTENLESE-ENTDECKER! 🎉", "Du meisterst Linien, Zwischenräume, Schritte, Sprünge und Melodieverläufe wie ein Profi!");
      return;
    }

    const akt = fragen.at(idx);
    const herzen = "❤️".repeat(leben) + "🤍".repeat(3 - leben);

    if (akt.typ === "lz") {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          ${baueNotensystemSVG(Array.of({ stufe: akt.stufe, farbe: "#4f46e5", border: "#312e81" }))}
          <p class="quiz-hint">${hinweis || "Linie oder Zwischenraum?"}</p>
          <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
            <button class="answer-btn" onclick="checkKap4BossLZ(true)">➖ Linie</button>
            <button class="answer-btn" onclick="checkKap4BossLZ(false)">⬜ Zwischenraum</button>
          </div>
        </div>`;
    } else if (akt.typ === "sd") {
      const noten = Array.of(
        { stufe: akt.n1, farbe: "#059669", border: "#065f46" },
        { stufe: akt.n2, farbe: "#f59e0b", border: "#b45309" }
      );
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          ${baueNotensystemSVG(noten)}
          <p class="quiz-hint">${hinweis || "Schritt oder Doppelschritt?"}</p>
          <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
            <button class="answer-btn" onclick="checkKap4BossSD('schritt')">👣 Schritt</button>
            <button class="answer-btn" onclick="checkKap4BossSD('doppel')">🦘 Doppelschritt</button>
          </div>
        </div>`;
    } else if (akt.typ === "ght") {
      const noten = Array.of(
        { stufe: akt.n1, farbe: "#0284c7", border: "#0369a1" },
        { stufe: akt.n2, farbe: "#f59e0b", border: "#b45309" }
      );
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          ${baueNotensystemSVG(noten)}
          <p class="quiz-hint">${hinweis || "Ist die 2. Note höher, tiefer oder gleich?"}</p>
          <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
            <button class="answer-btn" onclick="checkKap4BossGHT('tief')">⬇️ Tiefer</button>
            <button class="answer-btn" onclick="checkKap4BossGHT('gleich')">➡️ Gleich</button>
            <button class="answer-btn" onclick="checkKap4BossGHT('hoch')">⬆️ Höher</button>
          </div>
        </div>`;
    } else {
      const noten = akt.stufen.map((st, i) => ({
        stufe: st,
        farbe: i === 0 ? "#0284c7" : i === 1 ? "#0ea5e9" : "#f59e0b",
        border: "#0f172a"
      }));
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          ${baueNotensystemSVG(noten)}
          <p class="quiz-hint">${hinweis || "Wohin bewegt sich diese Melodie?"}</p>
          <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
            <button class="answer-btn" onclick="checkKap4BossMel('tief')">📉 Abwärts</button>
            <button class="answer-btn" onclick="checkKap4BossMel('gleich')">➡️ Gleich</button>
            <button class="answer-btn" onclick="checkKap4BossMel('hoch')">📈 Aufwärts</button>
          </div>
        </div>`;
    }
  };

  window.checkKap4BossLZ = (wahl) => {
    const akt = fragen.at(idx);
    klavierAudio.spieleMidi(NOTEN_STUFEN[akt.stufe].midi);
    if (wahl === akt.istLinie) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben – 1 Herz verloren!");
    }
  };

  window.checkKap4BossSD = (wahl) => {
    const akt = fragen.at(idx);
    klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n1].midi, 0.4);
    setTimeout(() => klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n2].midi, 0.7), 220);
    if (wahl === akt.antwort) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben – 1 Herz verloren!");
    }
  };

  window.checkKap4BossGHT = (wahl) => {
    const akt = fragen.at(idx);
    klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n1].midi, 0.4);
    setTimeout(() => klavierAudio.spieleMidi(NOTEN_STUFEN[akt.n2].midi, 0.7), 220);
    if (wahl === akt.antwort) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben – 1 Herz verloren!");
    }
  };

  window.checkKap4BossMel = (wahl) => {
    const akt = fragen.at(idx);
    akt.stufen.forEach((st, i) => {
      setTimeout(() => klavierAudio.spieleMidi(NOTEN_STUFEN[st].midi, 0.4), i * 200);
    });
    if (wahl === akt.antwort) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben – 1 Herz verloren!");
    }
  };
  render();
}
