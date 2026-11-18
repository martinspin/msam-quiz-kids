// KAPITEL 3: Fingersatz (Gezeichnete Rechte & Linke Hand mit klickbaren Fingernägeln)

const FINGER_FARBEN = {
  1: { bg: "#ef4444", border: "#b91c1c" },
  2: { bg: "#f97316", border: "#c2410c" },
  3: { bg: "#eab308", border: "#a16207" },
  4: { bg: "#22c55e", border: "#15803d" },
  5: { bg: "#3b82f6", border: "#1d4ed8" }
};

function mischeZufallKap3(liste) {
  const kopie = liste.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie.at(i);
    kopie.splice(i, 1, kopie.at(j));
    kopie.splice(j, 1, temp);
  }
  return kopie;
}

function baueFingerZahlKachelHTML(zahl, onclickCode = "", klickbar = false) {
  const f = FINGER_FARBEN[zahl] || { bg: "#64748b", border: "#334155" };
  return `
    <div class="note-card" ${onclickCode ? `onclick="${onclickCode}"` : ""}
         style="background:${f.bg}; border-color:${f.border}; color:#ffffff; ${klickbar ? "cursor:pointer;" : "cursor:default;"}">
      ${zahl}
    </div>`;
}

// Zeichnet eine organische, nahtlos ineinander übergehende Kinderhand aus Spielersicht (RH & LH)
function baueHandSVG(handTyp, optionen = {}) {
  const highlightFinger = optionen.highlightFinger || 0;
  const onClickFnName = optionen.onClickFnName || "";
  const isLeft = handTyp === "LH";

  // Ein einziger durchgehender Pfad für Handgelenk, Handrücken & alle 5 Finger (RH aus Spielersicht)
  const handUmrissPfad = `
    M 118 282
    L 118 238
    C 106 232, 92 218, 76 196
    L 42 162
    C 31 151, 46 134, 60 145
    L 98 176
    L 98 58
    C 98 40, 124 40, 124 58
    L 124 132
    L 132 132
    L 132 34
    C 132 16, 158 16, 158 34
    L 158 130
    L 166 130
    L 166 46
    C 166 28, 192 28, 192 46
    L 192 136
    L 200 136
    L 200 76
    C 200 58, 224 58, 224 76
    L 224 188
    C 224 218, 212 232, 200 238
    L 200 282
    Z
  `;

  // Fingernägel & unsichtbare grosse Klickzonen für jeden Finger (1–5)
  const fingerZonen = Array.of(
    {
      nr: 1,
      nagel: `<rect x="40" y="144" width="16" height="20" rx="8" transform="rotate(-44 48 154)" />`,
      klick: `<circle cx="58" cy="162" r="24" />`
    },
    {
      nr: 2,
      nagel: `<rect x="103" y="47" width="16" height="21" rx="8" />`,
      klick: `<rect x="94" y="38" width="34" height="96" rx="17" />`
    },
    {
      nr: 3,
      nagel: `<rect x="137" y="23" width="16" height="22" rx="8" />`,
      klick: `<rect x="128" y="16" width="34" height="114" rx="17" />`
    },
    {
      nr: 4,
      nagel: `<rect x="171" y="35" width="16" height="21" rx="8" />`,
      klick: `<rect x="162" y="28" width="34" height="106" rx="17" />`
    },
    {
      nr: 5,
      nagel: `<rect x="205" y="65" width="14" height="19" rx="7" />`,
      klick: `<rect x="196" y="58" width="32" height="92" rx="16" />`
    }
  );

  const zonenSVG = fingerZonen.map((f) => {
    const leuchtet = highlightFinger === f.nr;
    const nagelFill = leuchtet ? "#facc15" : "#fff1f2";
    const nagelStroke = leuchtet ? "#b45309" : "#f43f5e";
    const nagelWidth = leuchtet ? "3.2" : "2.2";
    const schein = leuchtet
      ? `<g fill="rgba(250, 204, 21, 0.42)" stroke="#f59e0b" stroke-width="2.5">${f.klick}</g>`
      : "";
    const klickAttr = onClickFnName ? `onclick="${onClickFnName}(${f.nr})" style="cursor:pointer;"` : "";

    return `
      <g ${klickAttr}>
        ${schein}
        <g fill="${nagelFill}" stroke="${nagelStroke}" stroke-width="${nagelWidth}">
          ${f.nagel}
        </g>
        <g fill="transparent">${f.klick}</g>
      </g>`;
  }).join("");

  const label = isLeft ? "👈 Linke Hand (LH)" : "Rechte Hand (RH) 👉";
  const badgeBg = isLeft ? "#e0f2fe" : "#fef3c7";
  const badgeColor = isLeft ? "#0369a1" : "#b45309";

  return `
    <div style="display:flex; flex-direction:column; align-items:center;">
      <div style="background:${badgeBg}; color:${badgeColor}; font-weight:800; font-size:14px; padding:4px 14px; border-radius:999px; margin-bottom:6px;">
        ${label}
      </div>
      <svg viewBox="0 0 265 290" style="width:100%; max-width:265px; height:auto; user-select:none; overflow:visible;">
        <defs>
          <linearGradient id="hautVerlauf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffedd5" />
            <stop offset="100%" stop-color="#fdba74" />
          </linearGradient>
        </defs>
        <g transform="${isLeft ? "translate(265, 0) scale(-1, 1)" : ""}">
          <!-- Durchgehende, nahtlose Hand-Silhouette -->
          <path d="${handUmrissPfad}" fill="url(#hautVerlauf)" stroke="#c2410c" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" />
          <!-- Feine Fingerknöchel-Linien auf dem Handrücken -->
          <path d="M 105 142 Q 111 139 117 142 M 139 138 Q 145 135 151 138 M 173 142 Q 179 139 185 142 M 206 150 Q 212 147 218 150"
                fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" opacity="0.45" />
          ${zonenSVG}
        </g>
      </svg>
    </div>`;
}

function starteKap3Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap3RechteHand();
  if (nummer === 2) starteKap3LinkeHand();
  if (nummer === 3) starteKap3WelcheZahl();
  if (nummer === 4) starteKap3SchrittSprung();
  if (nummer === 5) starteKap3Kinderlieder();
  if (nummer === 6) starteKap3Boss();
}

// 3.1 Rechte Hand: Zahl wird gezeigt, Kind drückt den richtigen Fingernagel
function starteKap3RechteHand() {
  const zahlen = mischeZufallKap3(Array.of(1, 2, 3, 4, 5, 1, 3, 5, 2, 4));
  const midis = { 1: 60, 2: 62, 3: 64, 4: 65, 5: 67 };
  let idx = 0;

  const render = (hinweis = "Tippe den passenden Fingernagel auf der rechten Hand an!") => {
    if (idx >= zahlen.length) {
      abschliessenSpiel("kap3_1", 120, "Rechte-Hand-Profi!", "Du kennst alle 5 Finger der rechten Hand (1 bis 5)!");
      return;
    }
    const ziel = zahlen.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.1 Rechte Hand (RH)</span><span>${idx + 1} / ${zahlen.length}</span></div>
        <div style="display:flex; justify-content:center; margin:8px 0;">
          ${baueFingerZahlKachelHTML(ziel)}
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div style="margin-top:8px;">
          ${baueHandSVG("RH", { onClickFnName: "checkKap3RH" })}
        </div>
      </div>`;
  };

  window.checkKap3RH = (fingerNr) => {
    const ziel = zahlen.at(idx);
    klavierAudio.spieleMidi(midis[fingerNr]);
    if (fingerNr === ziel) {
      idx++;
      render("Super! Genau der richtige Finger ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Der Daumen ist 1, der kleine Finger ist 5!");
    }
  };
  render();
}
// 3.2 Linke Hand: Zahl wird gezeigt, Kind drückt den richtigen Fingernagel
function starteKap3LinkeHand() {
  const zahlen = mischeZufallKap3(Array.of(1, 2, 3, 4, 5, 2, 5, 1, 4, 3));
  const midis = { 1: 60, 2: 59, 3: 57, 4: 55, 5: 53 };
  let idx = 0;

  const render = (hinweis = "Tippe den passenden Fingernagel auf der linken Hand an!") => {
    if (idx >= zahlen.length) {
      abschliessenSpiel("kap3_2", 120, "Linke-Hand-Profi!", "Auch bei der linken Hand sitzt jeder Finger von 1 bis 5!");
      return;
    }
    const ziel = zahlen.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.2 Linke Hand (LH)</span><span>${idx + 1} / ${zahlen.length}</span></div>
        <div style="display:flex; justify-content:center; margin:8px 0;">
          ${baueFingerZahlKachelHTML(ziel)}
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div style="margin-top:8px;">
          ${baueHandSVG("LH", { onClickFnName: "checkKap3LH" })}
        </div>
      </div>`;
  };

  window.checkKap3LH = (fingerNr) => {
    const ziel = zahlen.at(idx);
    klavierAudio.spieleMidi(midis[fingerNr]);
    if (fingerNr === ziel) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Auch links ist der Daumen immer 1 und der kleine Finger 5!");
    }
  };
  render();
}

// 3.3 Gemischt RH / LH: Ein Finger leuchtet, Kind tippt unten die Zahl (1–5) an
function starteKap3WelcheZahl() {
  const aufgaben = mischeZufallKap3(Array.of(
    { hand: "RH", finger: 1 },
    { hand: "LH", finger: 5 },
    { hand: "RH", finger: 3 },
    { hand: "LH", finger: 2 },
    { hand: "RH", finger: 5 },
    { hand: "LH", finger: 1 },
    { hand: "RH", finger: 4 },
    { hand: "LH", finger: 4 },
    { hand: "RH", finger: 2 },
    { hand: "LH", finger: 3 }
  ));
  let idx = 0;

  const render = (hinweis = "Welcher Finger leuchtet gelb? Tippe unten die Zahl an!") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap3_3", 150, "Finger-Detektiv!", "Du erkennst jeden Finger an der rechten und linken Hand sofort!");
      return;
    }
    const akt = aufgaben.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.3 Welcher Finger leuchtet?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <p class="quiz-hint">${hinweis}</p>
        <div style="margin:6px 0;">
          ${baueHandSVG(akt.hand, { highlightFinger: akt.finger })}
        </div>
        <div class="cards-pool" style="margin-top:12px;">
          ${Array.of(1, 2, 3, 4, 5).map((z) => baueFingerZahlKachelHTML(z, `checkKap3Zahl(${z})`, true)).join("")}
        </div>
      </div>`;
  };

  window.checkKap3Zahl = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.finger) {
      klavierAudio.spieleMidi(58 + akt.finger * 2);
      idx++;
      render(`Richtig! Das ist Finger ${akt.finger} ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Zähle vom Daumen (1) bis zum kleinen Finger (5)!");
    }
  };
  render();
}
// 3.4 Knifflig: Hand mit markiertem Finger + einfacher Pfeil (➡️) oder doppelter Pfeil (➡️➡️)
function starteKap3SchrittSprung() {
  const aufgaben = mischeZufallKap3(Array.of(
    { hand: "RH", start: 1, dir: "rechts", schritte: 1, ziel: 2 },
    { hand: "RH", start: 2, dir: "rechts", schritte: 2, ziel: 4 },
    { hand: "RH", start: 5, dir: "links", schritte: 1, ziel: 4 },
    { hand: "RH", start: 4, dir: "links", schritte: 2, ziel: 2 },
    { hand: "LH", start: 1, dir: "links", schritte: 1, ziel: 2 },
    { hand: "LH", start: 2, dir: "links", schritte: 2, ziel: 4 },
    { hand: "LH", start: 5, dir: "rechts", schritte: 1, ziel: 4 },
    { hand: "LH", start: 3, dir: "rechts", schritte: 2, ziel: 1 }
  ));
  let idx = 0;

  const render = (hinweis = "Wandere vom gelben Finger um 1 Schritt (➡️) oder 2 Schritte (➡️➡️)!") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap3_4", 180, "Finger-Akrobat!", "Schritte und Sprünge auf beiden Händen meisterst du spielend!");
      return;
    }
    const akt = aufgaben.at(idx);
    const pfeilIcon = akt.dir === "rechts"
      ? (akt.schritte === 1 ? "➡️" : "➡️➡️")
      : (akt.schritte === 1 ? "⬅️" : "⬅️⬅️");
    const boxStyle = akt.dir === "rechts"
      ? "background:#fef3c7; border:2px solid #f59e0b;"
      : "background:#e0f2fe; border:2px solid #0284c7;";

    const anzeige = akt.dir === "rechts"
      ? `<span>🟨</span><span>${pfeilIcon}</span>`
      : `<span>${pfeilIcon}</span><span>🟨</span>`;

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.4 Schritt oder Sprung</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="display:inline-flex; align-items:center; gap:14px; ${boxStyle} padding:8px 22px; border-radius:14px; font-size:32px; font-weight:900; margin:6px 0;">
          ${anzeige}
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div style="margin-top:6px;">
          ${baueHandSVG(akt.hand, { highlightFinger: akt.start, onClickFnName: "checkKap3Schritt" })}
        </div>
      </div>`;
  };

  window.checkKap3Schritt = (fingerNr) => {
    const akt = aufgaben.at(idx);
    klavierAudio.spieleMidi(58 + fingerNr * 2);
    if (fingerNr === akt.ziel) {
      idx++;
      render("Perfekt gelandet! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      const art = akt.schritte === 1 ? "1 Finger weiter (Nachbar)" : "2 Finger weiter (1 überspringen)";
      render(`Nicht ganz – gehe vom gelben Finger ${art} nach ${akt.dir}!`);
    }
  };
  render();
}
// 3.5 Kurze Passagen bekannter Kinderlieder mit Fingerzahlen (4–7 Töne) auf der Hand drücken
function starteKap3Kinderlieder() {
  const lieder = Array.of(
    {
      titel: "🦆 Alle meine Entchen",
      hand: "RH",
      finger: Array.of(1, 2, 3, 4, 5, 5),
      midis: Array.of(60, 62, 64, 65, 67, 67)
    },
    {
      titel: "👦 Hänschen klein",
      hand: "RH",
      finger: Array.of(5, 3, 3, 4, 2, 2),
      midis: Array.of(67, 64, 64, 65, 62, 62)
    },
    {
      titel: "🔔 Bruder Jakob",
      hand: "RH",
      finger: Array.of(1, 2, 3, 1),
      midis: Array.of(60, 62, 64, 60)
    },
    {
      titel: "🦊 Fuchs, du hast die Gans gestohlen",
      hand: "RH",
      finger: Array.of(1, 2, 3, 4, 5, 3, 5),
      midis: Array.of(60, 62, 64, 65, 67, 64, 67)
    },
    {
      titel: "🐦 Kuckuck, Kuckuck",
      hand: "LH",
      finger: Array.of(1, 3, 1, 3, 2, 3, 2),
      midis: Array.of(67, 64, 67, 64, 65, 64, 62)
    }
  );
  let liedIdx = 0;
  let schritt = 0;

  const render = (hinweis = "Tippe die Fingerzahlen der Reihe nach auf der Hand an!") => {
    if (liedIdx >= lieder.length) {
      abschliessenSpiel("kap3_5", 200, "Kinderlieder-Pianist!", "Du hast alle 5 Kinderlieder nach Fingersatz gespielt!");
      return;
    }
    const lied = lieder.at(liedIdx);
    const kachelnHTML = lied.finger.map((z, i) => {
      const f = FINGER_FARBEN[z];
      const fertig = i < schritt;
      const aktuell = i === schritt;
      const stil = fertig
        ? "background:#dcfce7; border-color:#16a34a; color:#15803d; opacity:0.65;"
        : aktuell
          ? `background:${f.bg}; border-color:#1e293b; color:#ffffff; transform:scale(1.14); box-shadow:0 6px 14px rgba(0,0,0,0.25);`
          : `background:${f.bg}; border-color:${f.border}; color:#ffffff; opacity:0.85;`;
      return `<div class="note-card" style="${stil} cursor:default;">${fertig ? "✓" : z}</div>`;
    }).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>3.5 Kinderlieder nach Zahlen</span><span>Lied ${liedIdx + 1} / ${lieder.length}</span></div>
        <h2 style="margin-bottom:8px;">${lied.titel}</h2>
        <div class="cards-pool" style="margin:10px 0;">${kachelnHTML}</div>
        <p class="quiz-hint">${hinweis}</p>
        <div style="margin-top:6px;">
          ${baueHandSVG(lied.hand, { onClickFnName: "checkKap3LiedFinger" })}
        </div>
      </div>`;
  };

  window.checkKap3LiedFinger = (fingerNr) => {
    const lied = lieder.at(liedIdx);
    const erwartet = lied.finger.at(schritt);
    if (fingerNr === erwartet) {
      klavierAudio.spieleMidi(lied.midis.at(schritt));
      schritt++;
      if (schritt >= lied.finger.length) {
        liedIdx++;
        schritt = 0;
        render("Bravo! Melodie komplett gespielt 🎵 Weiter mit dem nächsten Lied!");
      } else {
        render("Super! Weiter zum nächsten Finger 🎵");
      }
    } else {
      klavierAudio.spieleQuietsch();
      render(`Schau auf die hervorgehobene Zahl: gesucht ist Finger ${erwartet}!`);
    }
  };
  render();
}

// 3.6 Boss-Challenge: Fingersatz (Zufallsmix mit 3 Herzen, Fanfare & Konfetti!)
function starteKap3Boss() {
  const fragen = mischeZufallKap3(Array.of(
    { modus: "druecken", hand: "RH", ziel: 3 },
    { modus: "druecken", hand: "LH", ziel: 4 },
    { modus: "zahl", hand: "RH", finger: 5 },
    { modus: "zahl", hand: "LH", finger: 2 },
    { modus: "schritt", hand: "RH", start: 2, dir: "rechts", schritte: 2, ziel: 4 },
    { modus: "schritt", hand: "LH", start: 1, dir: "links", schritte: 1, ziel: 2 },
    { modus: "druecken", hand: "LH", ziel: 1 },
    { modus: "schritt", hand: "RH", start: 5, dir: "links", schritte: 2, ziel: 3 }
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
          <button class="btn-primary" onclick="starteKap3Boss()">Boss-Challenge neu starten</button>
        </div>`;
      return;
    }
    if (idx >= fragen.length) {
      starteFanfareUndKonfetti();
      abschliessenSpiel("kap3_6", 250, "🎉 FINGERSATZ-MEISTER! 🎉", "Du beherrschst beide Hände blind – geniesse die Fanfare!");
      return;
    }

    const akt = fragen.at(idx);
    const herzen = "❤️".repeat(leben) + "🤍".repeat(3 - leben);

    if (akt.modus === "druecken") {
      const text = hinweis || "Tippe den passenden Fingernagel auf der Hand an!";
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div style="display:flex; justify-content:center; margin:6px 0;">${baueFingerZahlKachelHTML(akt.ziel)}</div>
          <p class="quiz-hint">${text}</p>
          ${baueHandSVG(akt.hand, { onClickFnName: "checkKap3BossHand" })}
        </div>`;
    } else if (akt.modus === "zahl") {
      const text = hinweis || "Welcher Finger leuchtet gelb? Tippe unten die Zahl an!";
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <p class="quiz-hint">${text}</p>
          ${baueHandSVG(akt.hand, { highlightFinger: akt.finger })}
          <div class="cards-pool" style="margin-top:12px;">
            ${Array.of(1, 2, 3, 4, 5).map((z) => baueFingerZahlKachelHTML(z, `checkKap3BossZahl(${z})`, true)).join("")}
          </div>
        </div>`;
    } else {
      const pfeilIcon = akt.dir === "rechts"
        ? (akt.schritte === 1 ? "➡️" : "➡️➡️")
        : (akt.schritte === 1 ? "⬅️" : "⬅️⬅️");
      const boxStyle = akt.dir === "rechts"
        ? "background:#fef3c7; border:2px solid #f59e0b;"
        : "background:#e0f2fe; border:2px solid #0284c7;";
      const anzeige = akt.dir === "rechts"
        ? `<span>🟨</span><span>${pfeilIcon}</span>`
        : `<span>${pfeilIcon}</span><span>🟨</span>`;
      const text = hinweis || "Folge dem Pfeil vom gelben Finger aus!";

      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div style="display:inline-flex; align-items:center; gap:14px; ${boxStyle} padding:8px 22px; border-radius:14px; font-size:32px; font-weight:900; margin:6px 0;">
            ${anzeige}
          </div>
          <p class="quiz-hint">${text}</p>
          ${baueHandSVG(akt.hand, { highlightFinger: akt.start, onClickFnName: "checkKap3BossHand" })}
        </div>`;
    }
  };

  window.checkKap3BossHand = (fingerNr) => {
    const akt = fragen.at(idx);
    klavierAudio.spieleMidi(58 + fingerNr * 2);
    if (fingerNr === akt.ziel) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben! (-1 Herz)");
    }
  };

  window.checkKap3BossZahl = (wahl) => {
    const akt = fragen.at(idx);
    if (wahl === akt.finger) {
      klavierAudio.spieleMidi(58 + akt.finger * 2);
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben! (-1 Herz)");
    }
  };

  render();
}
