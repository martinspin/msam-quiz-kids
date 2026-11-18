// KAPITEL 5: Rhythmus & Notenwerte (Viertel, Halbe, Dreiviertel, Ganze)

const RHYTHMUS_WERTE = Array.of(
  {
    schlaege: 1,
    wort: "Da",
    silben: Array.of("Da"),
    name: "Viertelnote",
    zaehlen: "1",
    farbe: "#4f46e5",
    bg: "#e0e7ff"
  },
  {
    schlaege: 2,
    wort: "Bon-bon",
    silben: Array.of("Bon", "bon"),
    name: "Halbe Note",
    zaehlen: "1 – 2",
    farbe: "#0284c7",
    bg: "#e0f2fe"
  },
  {
    schlaege: 3,
    wort: "Kau-gum-mi",
    silben: Array.of("Kau", "gum", "mi"),
    name: "Dreiviertelnote (punktierte Halbe)",
    zaehlen: "1 – 2 – 3",
    farbe: "#059669",
    bg: "#dcfce7"
  },
  {
    schlaege: 4,
    wort: "Gum-mi-bär-chen",
    silben: Array.of("Gum", "mi", "bär", "chen"),
    name: "Ganze Note",
    zaehlen: "1 – 2 – 3 – 4",
    farbe: "#d97706",
    bg: "#fef3c7"
  }
);

function mischeZufallKap5(liste) {
  const kopie = liste.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie.at(i);
    kopie.splice(i, 1, kopie.at(j));
    kopie.splice(j, 1, temp);
  }
  return kopie;
}

function baueNotenwertSVG(schlaege, farbe = "#0f172a", groesse = 96) {
  const gefuellt = schlaege === 1;
  const hatHals = schlaege <= 3;
  const hatPunkt = schlaege === 3;

  const kopf = gefuellt
    ? `<ellipse cx="44" cy="70" rx="14" ry="10" transform="rotate(-18 44 70)" fill="${farbe}" />`
    : `<ellipse cx="44" cy="70" rx="14" ry="10" transform="rotate(-18 44 70)" fill="#ffffff" stroke="${farbe}" stroke-width="3.6" />`;

  const hals = hatHals
    ? `<line x1="56" y1="68" x2="56" y2="18" stroke="${farbe}" stroke-width="3.4" stroke-linecap="round" />`
    : "";

  const punkt = hatPunkt
    ? `<circle cx="67" cy="70" r="4.5" fill="${farbe}" />`
    : "";

  return `
    <svg viewBox="0 0 96 96" style="width:${groesse}px; height:${groesse}px; display:inline-block;">
      ${hals}
      ${kopf}
      ${punkt}
    </svg>`;
}

function spieleTonMitSchlaegen(schlaege, midi = 64) {
  const tempoMs = 520;
  klavierAudio.spieleMidi(midi, (schlaege * tempoMs) / 1000 + 0.25);
  for (let i = 0; i < schlaege; i++) {
    setTimeout(() => {
      klavierAudio.spieleMidi(i === 0 ? 84 : 79, 0.08);
    }, i * tempoMs);
  }
}

function starteKap5Spiel(nummer) {
  if (typeof appMusik !== "undefined") {
    if (typeof appMusik.pause === "function") appMusik.pause();
    if (typeof appMusik.stop === "function") appMusik.stop();
  }
  const bgAudio = document.getElementById("bg-music");
  if (bgAudio) bgAudio.pause();

  if (nummer === 1) starteKap5WoerterUndNoten();
  if (nummer === 2) starteKap5TonlaengenHoeren();
  if (nummer === 3) starteKap5VomWortZumZaehlen();
  if (nummer === 4) starteKap5AushaltePad();
  if (nummer === 5) starteKap5TaktBaumeister();
  if (nummer === 6) starteKap5Boss();
}
// 5.1 Rhythmus-Wörter & Notenwerte zuordnen
function starteKap5WoerterUndNoten() {
  const runden = mischeZufallKap5(Array.of(1, 2, 3, 4, 1, 2, 3, 4));
  let idx = 0;

  const render = (hinweis = "Welches Rhythmus-Wort gehört zu dieser Note?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap5_1", 120, "Rhythmus-Wort-Profi!", "Da, Bon-bon, Kau-gum-mi und Gum-mi-bär-chen sitzen perfekt!");
      return;
    }
    const zielSchlaege = runden.at(idx);
    const zielObj = RHYTHMUS_WERTE.find((w) => w.schlaege === zielSchlaege);

    const buttonsHTML = RHYTHMUS_WERTE.map((w) => `
      <button class="answer-btn" style="background:${w.bg}; border-color:${w.farbe}; color:#0f172a;"
              onclick="checkKap5Wort(${w.schlaege})">
        <div style="font-size:19px; font-weight:900;">${w.wort}</div>
        <div style="font-size:12px; color:#475569;">${w.name}</div>
      </button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.1 Rhythmus-Wörter & Noten</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:10px 0;">
          ${baueNotenwertSVG(zielObj.schlaege, zielObj.farbe, 118)}
        </div>
        <button class="btn-ghost" onclick="spieleTonMitSchlaegen(${zielObj.schlaege}, 64)">🔊 Anhören</button>
        <p class="quiz-hint" style="margin-top:10px;">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${buttonsHTML}</div>
      </div>`;
  };

  window.checkKap5Wort = (wahlSchlaege) => {
    const zielSchlaege = runden.at(idx);
    spieleTonMitSchlaegen(wahlSchlaege, 64);
    if (wahlSchlaege === zielSchlaege) {
      idx++;
      render("Genau richtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Schau auf Kopf, Hals und Punkt der Note und zähle die Silben!");
    }
  };
  render();
}

// 5.2 Tonlängen hören: Wie viele Schläge klingt der Flügelton?
function starteKap5TonlaengenHoeren() {
  const runden = mischeZufallKap5(Array.of(1, 2, 3, 4, 2, 4, 1, 3));
  let idx = 0;

  const render = (hinweis = "Höre gut zu und sprich das Rhythmus-Wort mit!") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap5_2", 140, "Rhythmus-Ohr!", "Du hörst sofort, wie viele Schläge ein Ton ausgehalten wird!");
      return;
    }
    const zielSchlaege = runden.at(idx);

    const buttonsHTML = RHYTHMUS_WERTE.map((w) => `
      <button class="answer-btn" style="background:${w.bg}; border-color:${w.farbe}; display:flex; flex-direction:column; align-items:center;"
              onclick="checkKap5Hoeren(${w.schlaege})">
        ${baueNotenwertSVG(w.schlaege, w.farbe, 56)}
        <span style="font-size:17px; font-weight:900;">${w.wort}</span>
      </button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.2 Tonlängen hören</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:14px 0;">
          <button class="btn-primary" style="font-size:18px; padding:14px 26px;" onclick="spieleTonMitSchlaegen(${zielSchlaege}, 60)">
            🔊 Ton abspielen
          </button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${buttonsHTML}</div>
      </div>`;

    setTimeout(() => spieleTonMitSchlaegen(zielSchlaege, 60), 220);
  };

  window.checkKap5Hoeren = (wahlSchlaege) => {
    const zielSchlaege = runden.at(idx);
    if (wahlSchlaege === zielSchlaege) {
      idx++;
      render("Super gehört! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Tippe noch einmal auf „Ton abspielen“ und sprich Da / Bon-bon / Kau-gum-mi / Gum-mi-bär-chen dazu!");
    }
  };
  render();
}
// 5.3 Vom Wort zum Zählen (1 – 2 – 3 – 4)
function starteKap5VomWortZumZaehlen() {
  const runden = mischeZufallKap5(Array.of(1, 2, 3, 4, 3, 1, 4, 2));
  let idx = 0;

  const render = (hinweis = "Wie zählen wir diese Note im Takt aus?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap5_3", 150, "Takt-Zähler!", "Du kannst jetzt jedes Rhythmus-Wort sicher in Zählzeiten übersetzen!");
      return;
    }
    const zielSchlaege = runden.at(idx);
    const zielObj = RHYTHMUS_WERTE.find((w) => w.schlaege === zielSchlaege);

    const buttonsHTML = RHYTHMUS_WERTE.map((w) => `
      <button class="answer-btn" style="background:${w.bg}; border-color:${w.farbe};"
              onclick="checkKap5Zaehlen(${w.schlaege})">
        <div style="font-size:22px; font-weight:900;">${w.zaehlen}</div>
        <div style="font-size:13px; color:#475569;">(${w.schlaege} ${w.schlaege === 1 ? "Schlag" : "Schläge"})</div>
      </button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.3 Vom Wort zum Zählen</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="display:flex; justify-content:center; align-items:center; gap:16px; margin:10px 0;">
          ${baueNotenwertSVG(zielObj.schlaege, zielObj.farbe, 92)}
          <div style="font-size:26px; font-weight:900; color:${zielObj.farbe};">„${zielObj.wort}“</div>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${buttonsHTML}</div>
      </div>`;
  };

  window.checkKap5Zaehlen = (wahlSchlaege) => {
    const zielSchlaege = runden.at(idx);
    spieleTonMitSchlaegen(wahlSchlaege, 67);
    if (wahlSchlaege === zielSchlaege) {
      idx++;
      render("Perfekt gezählt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Zähle die Silben von dem Wort ab – jede Silbe ist genau ein Schlag!");
    }
  };
  render();
}

// 5.4 Aushalte-Pad: Ton drücken und genau für 1, 2, 3 oder 4 Schläge halten!
function starteKap5AushaltePad() {
  const runden = mischeZufallKap5(Array.of(2, 3, 4, 1, 3, 4));
  let idx = 0;
  let timer = null;
  let schlagZaehler = 0;
  let gedrueckt = false;

  const render = (hinweis = "Halte das Pad gedrückt, bis alle Silben geleuchtet haben – und lass dann los!") => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (idx >= runden.length) {
      abschliessenSpiel("kap5_4", 180, "Aushalte-Champion!", "Du hältst Viertel, Halbe, Dreiviertel und Ganze genau auf den Punkt!");
      return;
    }
    const zielSchlaege = runden.at(idx);
    const zielObj = RHYTHMUS_WERTE.find((w) => w.schlaege === zielSchlaege);

    const silbenHTML = zielObj.silben.map((s, i) => `
      <span id="silbe-box-${i}" style="display:inline-block; padding:8px 14px; margin:4px; border-radius:12px; border:2px solid ${zielObj.farbe}; background:#ffffff; font-weight:900; font-size:20px;">
        ${s} (${i + 1})
      </span>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.4 Aushalte-Pad</span><span>${idx + 1} / ${runden.length}</span></div>
        <div>${baueNotenwertSVG(zielObj.schlaege, zielObj.farbe, 90)}</div>
        <div style="margin:6px 0 10px;">${silbenHTML}</div>
        <p class="quiz-hint">${hinweis}</p>
        <button id="aushalte-pad"
                onpointerdown="startePadHalten()"
                onpointerup="stoppePadHalten()"
                onpointerleave="stoppePadHalten()"
                style="margin-top:12px; width:240px; height:96px; border-radius:22px; border:4px solid ${zielObj.farbe}; background:${zielObj.bg}; font-size:20px; font-weight:900; cursor:pointer; user-select:none; touch-action:none;">
          🎹 Gedrückt halten!
        </button>
      </div>`;
  };
  window.startePadHalten = () => {
    if (gedrueckt) return;
    gedrueckt = true;
    schlagZaehler = 1;
    const zielSchlaege = runden.at(idx);
    const zielObj = RHYTHMUS_WERTE.find((w) => w.schlaege === zielSchlaege);

    klavierAudio.spieleMidi(64, 2.8);
    const box0 = document.getElementById("silbe-box-0");
    if (box0) {
      box0.style.background = zielObj.farbe;
      box0.style.color = "#ffffff";
    }

    timer = setInterval(() => {
      if (!gedrueckt) return;
      schlagZaehler++;
      const box = document.getElementById(`silbe-box-${schlagZaehler - 1}`);
      if (box) {
        box.style.background = zielObj.farbe;
        box.style.color = "#ffffff";
      }
      klavierAudio.spieleMidi(81, 0.08);
    }, 520);
  };

  window.stoppePadHalten = () => {
    if (!gedrueckt) return;
    gedrueckt = false;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    const zielSchlaege = runden.at(idx);
    if (schlagZaehler === zielSchlaege) {
      idx++;
      render("Punktlandung! Genau im richtigen Moment losgelassen ✅");
    } else if (schlagZaehler < zielSchlaege) {
      klavierAudio.spieleQuietsch();
      render(`Zu früh losgelassen (${schlagZaehler} statt ${zielSchlaege} Schläge)!`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Zu lange gehalten (${schlagZaehler} statt ${zielSchlaege} Schläge)!`);
    }
  };

  render();
}

// 5.5 Takt-Baumeister: 3/4- und 4/4-Takte mit der richtigen Note auffüllen
function starteKap5TaktBaumeister() {
  const aufgaben = mischeZufallKap5(Array.of(
    { takt: 4, schonDa: Array.of(2), fehlt: 2 },
    { takt: 4, schonDa: Array.of(3), fehlt: 1 },
    { takt: 4, schonDa: Array.of(1, 1), fehlt: 2 },
    { takt: 4, schonDa: Array.of(2, 1), fehlt: 1 },
    { takt: 3, schonDa: Array.of(2), fehlt: 1 },
    { takt: 3, schonDa: Array.of(1), fehlt: 2 },
    { takt: 3, schonDa: Array.of(1, 1), fehlt: 1 },
    { takt: 4, schonDa: Array.of(1), fehlt: 3 }
  ));
  let idx = 0;

  const render = (hinweis = "Welche Note macht den Takt genau voll?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap5_5", 200, "Takt-Baumeister!", "Du beherrschst den 3/4-Takt und den 4/4-Takt souverän!");
      return;
    }
    const akt = aufgaben.at(idx);

    const kartenHTML = akt.schonDa.map((s) => {
      const obj = RHYTHMUS_WERTE.find((w) => w.schlaege === s);
      return `
        <div style="padding:8px 12px; border:2px solid ${obj.farbe}; border-radius:14px; background:#ffffff; text-align:center;">
          ${baueNotenwertSVG(obj.schlaege, obj.farbe, 58)}
          <div style="font-size:12px; font-weight:800;">${obj.wort}</div>
        </div>`;
    }).join("");

    const buttonsHTML = RHYTHMUS_WERTE.map((w) => `
      <button class="answer-btn" style="background:${w.bg}; border-color:${w.farbe}; display:flex; flex-direction:column; align-items:center;"
              onclick="checkKap5Takt(${w.schlaege})">
        ${baueNotenwertSVG(w.schlaege, w.farbe, 52)}
        <span style="font-size:15px; font-weight:900;">${w.wort} (${w.schlaege})</span>
      </button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.5 Takt-Baumeister</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="display:inline-block; background:#fef3c7; color:#b45309; border:2px solid #f59e0b; padding:6px 16px; border-radius:999px; font-weight:900; font-size:18px; margin-bottom:12px;">
          ${akt.takt}/4-Takt (${akt.takt} Schläge insgesamt)
        </div>
        <div class="cards-pool" style="margin:8px 0 12px;">
          ${kartenHTML}
          <div style="padding:18px 22px; border:3px dashed #64748b; border-radius:14px; font-size:26px; font-weight:900; color:#64748b;">?</div>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${buttonsHTML}</div>
      </div>`;
  };

  window.checkKap5Takt = (wahlSchlaege) => {
    const akt = aufgaben.at(idx);
    spieleTonMitSchlaegen(wahlSchlaege, 64);
    if (wahlSchlaege === akt.fehlt) {
      idx++;
      render(`Stark! Zusammen sind es genau ${akt.takt} Schläge ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Zähle zusammen: Im ${akt.takt}/4-Takt brauchen wir insgesamt ${akt.takt} Schläge!`);
    }
  };
  render();
}
// 5.6 Boss-Challenge: Rhythmus & Notenwerte (3 Herzen, Flügel-Fanfare & Konfetti!)
function starteKap5Boss() {
  const fragen = mischeZufallKap5(Array.of(
    { modus: "wort", schlaege: 3 },
    { modus: "wort", schlaege: 4 },
    { modus: "zaehl", schlaege: 2 },
    { modus: "zaehl", schlaege: 3 },
    { modus: "takt", takt: 4, schonDa: Array.of(2, 1), fehlt: 1 },
    { modus: "takt", takt: 3, schonDa: Array.of(1), fehlt: 2 },
    { modus: "wort", schlaege: 1 },
    { modus: "takt", takt: 4, schonDa: Array.of(1), fehlt: 3 }
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
          <button class="btn-primary" onclick="starteKap5Boss()">Boss-Challenge neu starten</button>
        </div>`;
      return;
    }
    if (idx >= fragen.length) {
      starteFanfareUndKonfetti();
      abschliessenSpiel("kap5_6", 250, "🎉 RHYTHMUS-MEISTER! 🎉", "Du hast alle 5 Kapitel von Piano-Kids gemeistert!");
      return;
    }

    const akt = fragen.at(idx);
    const herzen = "❤️".repeat(leben) + "🤍".repeat(3 - leben);

    if (akt.modus === "wort") {
      const obj = RHYTHMUS_WERTE.find((w) => w.schlaege === akt.schlaege);
      const btns = RHYTHMUS_WERTE.map((w) => `
        <button class="answer-btn" style="background:${w.bg}; border-color:${w.farbe};" onclick="checkKap5Boss(${w.schlaege === akt.schlaege})">
          ${w.wort}
        </button>`).join("");
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          ${baueNotenwertSVG(obj.schlaege, obj.farbe, 108)}
          <p class="quiz-hint">${hinweis || "Welches Rhythmus-Wort passt zu dieser Note?"}</p>
          <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${btns}</div>
        </div>`;
    } else if (akt.modus === "zaehl") {
      const obj = RHYTHMUS_WERTE.find((w) => w.schlaege === akt.schlaege);
      const btns = RHYTHMUS_WERTE.map((w) => `
        <button class="answer-btn" style="background:${w.bg}; border-color:${w.farbe};" onclick="checkKap5Boss(${w.schlaege === akt.schlaege})">
          ${w.zaehlen}
        </button>`).join("");
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div style="font-size:28px; font-weight:900; color:${obj.farbe}; margin:14px 0;">„${obj.wort}“</div>
          <p class="quiz-hint">${hinweis || "Wie zählen wir dieses Wort im Takt aus?"}</p>
          <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${btns}</div>
        </div>`;
    } else {
      const karten = akt.schonDa.map((s) => {
        const o = RHYTHMUS_WERTE.find((w) => w.schlaege === s);
        return `<div style="padding:6px 10px; border:2px solid ${o.farbe}; border-radius:12px;">${baueNotenwertSVG(o.schlaege, o.farbe, 50)}</div>`;
      }).join("");
      const btns = RHYTHMUS_WERTE.map((w) => `
        <button class="answer-btn" style="background:${w.bg}; border-color:${w.farbe};" onclick="checkKap5Boss(${w.schlaege === akt.fehlt})">
          ${w.wort} (${w.schlaege})
        </button>`).join("");
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>👑 Boss-Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div style="font-weight:900; font-size:18px; margin-bottom:8px;">${akt.takt}/4-Takt</div>
          <div class="cards-pool">${karten}<div style="padding:14px 18px; border:2px dashed #64748b; border-radius:12px; font-weight:900;">?</div></div>
          <p class="quiz-hint">${hinweis || "Welche Note füllt den Takt?"}</p>
          <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${btns}</div>
        </div>`;
    }
  };

  window.checkKap5Boss = (richtig) => {
    if (richtig) {
      klavierAudio.spieleMidi(67, 0.5);
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
