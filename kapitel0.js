// KAPITEL 0 (Anzeige Kapitel 1): Gehör-Detektive für alle MSAM-Instrumente

function mischeZufallKap0(liste) {
  const kopie = liste.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie.at(i);
    kopie.splice(i, 1, kopie.at(j));
    kopie.splice(j, 1, temp);
  }
  return kopie;
}

function spieleTonfolgeKap0(notenListe, dauer = 0.95, abstandMs = 1150) {
  notenListe.forEach((midi, i) => {
    setTimeout(() => {
      if (typeof klavierAudio !== "undefined") {
        klavierAudio.spieleMidi(midi, dauer);
      }
    }, 180 + i * abstandMs);
  });
}

function spieleAkkordKap0(notenListe, dauer = 1.0) {
  notenListe.forEach((midi) => {
    if (typeof klavierAudio !== "undefined") {
      klavierAudio.spieleMidi(midi, dauer);
    }
  });
}

// Echter Steinway-Flügel im Staccato (0.11 Sekunden)
function spieleStaccatoTonKap0(midi) {
  if (typeof klavierAudio !== "undefined") {
    klavierAudio.spieleMidi(midi, 0.18, 1.0);
  }
}

function spieleStaccatoFolgeKap0(notenListe, abstandMs = 400) {
  notenListe.forEach((midi, i) => {
    setTimeout(() => spieleStaccatoTonKap0(midi), 120 + i * abstandMs);
  });
}


function spieleStaccatoFolgeKap0(notenListe, abstandMs = 380) {
  notenListe.forEach((midi, i) => {
    setTimeout(() => spieleStaccatoTonKap0(midi), 120 + i * abstandMs);
  });
}


function starteKap0Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap0MelodieRichtung();
  if (nummer === 2) starteKap0SchrittSprung();
  if (nummer === 3) starteKap0StaccatoLegato();
  if (nummer === 4) starteKap0DurMoll();
  if (nummer === 5) starteKap0Boss();
}


// 1.1 Hoch oder tief? (Vogel vs. Bär)
function starteKap0HochTief() {
  const aufgaben = mischeZufallKap0(Array.of(
    { m1: 60, m2: 72, typ: "hoch" },
    { m1: 72, m2: 60, typ: "tief" },
    { m1: 64, m2: 64, typ: "gleich" },
    { m1: 62, m2: 74, typ: "hoch" },
    { m1: 76, m2: 64, typ: "tief" },
    { m1: 67, m2: 67, typ: "gleich" },
    { m1: 60, m2: 69, typ: "hoch" },
    { m1: 71, m2: 62, typ: "tief" },
    { m1: 65, m2: 65, typ: "gleich" },
    { m1: 64, m2: 76, typ: "hoch" }
  ));
  let idx = 0;

  const spieleAktuell = () => {
    const akt = aufgaben.at(idx);
    spieleTonfolgeKap0(Array.of(akt.m1, akt.m2), 0.55, 420);
  };

  const render = (hinweis = "Höre gut zu: Ist der 2. Ton höher, tiefer oder gleich?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap0_1", 120, "Ohren-Spitzer!", "Du erkennst hohe und tiefe Töne sofort!");
      return;
    }
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.1 Hoch oder tief?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:18px 0;">
          <button id="kap0-play-btn" class="btn-primary" style="font-size:20px; padding:14px 28px;">🔊 Töne anhören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap0HT('tief')">🐻 Tiefer</button>
          <button class="answer-btn" style="background:#f1f5f9; border-color:#64748b; color:#0f172a;" onclick="checkKap0HT('gleich')">➡️ Gleich</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap0HT('hoch')">🐦 Höher</button>
        </div>
      </div>`;
    document.getElementById("kap0-play-btn").onclick = spieleAktuell;
    spieleAktuell();
  };

  window.checkKap0HT = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.typ) {
      idx++;
      render("Super gehört! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      setTimeout(spieleAktuell, 300);
      render("Hör nochmals genau hin: Klettert der 2. Ton nach oben oder fällt er nach unten?");
    }
  };
  render();
}

// 1.2 Steigt oder fällt die Melodie?
function starteKap0MelodieRichtung() {
  const aufgaben = mischeZufallKap0(Array.of(
    { toene: Array.of(60, 64, 67), typ: "hoch" },
    { toene: Array.of(72, 67, 64), typ: "tief" },
    { toene: Array.of(65, 65, 65), typ: "gleich" },
    { toene: Array.of(62, 65, 69), typ: "hoch" },
    { toene: Array.of(74, 71, 67), typ: "tief" },
    { toene: Array.of(64, 64, 64), typ: "gleich" },
    { toene: Array.of(60, 67, 72), typ: "hoch" },
    { toene: Array.of(76, 72, 67), typ: "tief" },
    { toene: Array.of(67, 67, 67), typ: "gleich" },
    { toene: Array.of(64, 69, 76), typ: "hoch" }
  ));
  let idx = 0;

  const spieleAktuell = () => {
    spieleTonfolgeKap0(aufgaben.at(idx).toene, 0.45, 420);
  };

  const render = (hinweis = "In welche Richtung wandert diese Melodie?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap0_2", 140, "Melodie-Detektiv!", "Du hörst sofort, ob eine Melodie steigt, fällt oder bleibt!");
      return;
    }
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.2 Steigt oder fällt die Melodie?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:18px 0;">
          <button id="kap0-play-btn" class="btn-primary" style="font-size:20px; padding:14px 28px;">🔊 Melodie anhören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap0Mel('tief')">📉 Fällt abwärts</button>
          <button class="answer-btn" style="background:#f1f5f9; border-color:#64748b; color:#0f172a;" onclick="checkKap0Mel('gleich')">➡️ Bleibt gleich</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap0Mel('hoch')">📈 Steigt aufwärts</button>
        </div>
      </div>`;
    document.getElementById("kap0-play-btn").onclick = spieleAktuell;
    spieleAktuell();
  };

  window.checkKap0Mel = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.typ) {
      idx++;
      render("Goldrichtig gehört! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      setTimeout(spieleAktuell, 300);
      render("Hör nochmals hin: Wird die Melodie immer höher, immer tiefer oder bleibt sie auf einem Ton?");
    }
  };
  render();
}
// 1.3 Schritt oder grosser Sprung?
function starteKap0SchrittSprung() {
  const aufgaben = mischeZufallKap0(Array.of(
    { m1: 60, m2: 62, typ: "schritt" },
    { m1: 60, m2: 72, typ: "sprung" },
    { m1: 64, m2: 65, typ: "schritt" },
    { m1: 62, m2: 74, typ: "sprung" },
    { m1: 67, m2: 65, typ: "schritt" },
    { m1: 72, m2: 60, typ: "sprung" },
    { m1: 69, m2: 71, typ: "schritt" },
    { m1: 64, m2: 76, typ: "sprung" },
    { m1: 65, m2: 64, typ: "schritt" },
    { m1: 71, m2: 60, typ: "sprung" }
  ));
  let idx = 0;

  const spieleAktuell = () => {
    const akt = aufgaben.at(idx);
    spieleTonfolgeKap0(Array.of(akt.m1, akt.m2), 0.55, 420);
  };

  const render = (hinweis = "Liegen die zwei Töne ganz nah beieinander oder machen sie einen grossen Sprung?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap0_3", 150, "Abstands-Ass!", "Kleine Schritte und weite Sprünge erkennst du blind!");
      return;
    }
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.3 Schritt oder grosser Sprung?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:18px 0;">
          <button id="kap0-play-btn" class="btn-primary" style="font-size:20px; padding:14px 28px;">🔊 Töne anhören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap0SS('schritt')">👣 Kleiner Schritt</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap0SS('sprung')">🦘 Grosser Sprung</button>
        </div>
      </div>`;
    document.getElementById("kap0-play-btn").onclick = spieleAktuell;
    spieleAktuell();
  };

  window.checkKap0SS = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.typ) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      setTimeout(spieleAktuell, 300);
      render("Tipp: Ein kleiner Schritt klingt wie Nachbarn, ein grosser Sprung hat viel Platz dazwischen!");
    }
  };
  render();
}

// 1.4 Staccato (hüpfend) oder Legato (gleitend)?
function starteKap0StaccatoLegato() {
  const aufgaben = mischeZufallKap0(Array.of(
    { toene: Array.of(60, 62, 64, 65), typ: "staccato" },
    { toene: Array.of(60, 62, 64, 65), typ: "legato" },
    { toene: Array.of(67, 65, 64, 62), typ: "staccato" },
    { toene: Array.of(67, 65, 64, 62), typ: "legato" },
    { toene: Array.of(64, 67, 72, 67), typ: "staccato" },
    { toene: Array.of(64, 67, 72, 67), typ: "legato" },
    { toene: Array.of(72, 69, 65, 60), typ: "staccato" },
    { toene: Array.of(72, 69, 65, 60), typ: "legato" }
  ));
  let idx = 0;

  const spieleAktuell = () => {
    const akt = aufgaben.at(idx);
    if (akt.typ === "staccato") {
      spieleStaccatoFolgeKap0(akt.toene, 380);
    } else {
      spieleTonfolgeKap0(akt.toene, 0.85, 420);
    }
  };

  const render = (hinweis = "Hüpfen die Töne kurz (Staccato) oder gleiten sie weich (Legato)?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap0_4", 160, "Artikulations-Ass!", "Staccato und Legato hörst du wie ein echter Musiker!");
      return;
    }
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.4 Staccato oder Legato?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:18px 0;">
          <button id="kap0-play-btn" class="btn-primary" style="font-size:20px; padding:14px 28px;">🔊 Melodie anhören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap0SL('staccato')">🐸 Staccato (kurz & hüpfend)</button>
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap0SL('legato')">🦢 Legato (weich & gebunden)</button>
        </div>
      </div>`;
    document.getElementById("kap0-play-btn").onclick = spieleAktuell;
    spieleAktuell();
  };

  window.checkKap0SL = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.typ) {
      idx++;
      render("Klasse gehört! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      setTimeout(spieleAktuell, 300);
      render("Achte auf die Pausen: Beim Staccato sind die Töne ganz kurz abgehackt!");
    }
  };
  render();
}
// 1.5 Dur (fröhlich) oder Moll (nachdenklich)?
function starteKap0DurMoll() {
  const aufgaben = mischeZufallKap0(Array.of(
    { toene: Array.of(60, 64, 67), typ: "dur" },
    { toene: Array.of(60, 63, 67), typ: "moll" },
    { toene: Array.of(65, 69, 72), typ: "dur" },
    { toene: Array.of(62, 65, 69), typ: "moll" },
    { toene: Array.of(67, 71, 74), typ: "dur" },
    { toene: Array.of(64, 67, 71), typ: "moll" },
    { toene: Array.of(62, 66, 69), typ: "dur" },
    { toene: Array.of(69, 72, 76), typ: "moll" }
  ));
  let idx = 0;

  const spieleAktuell = () => {
    spieleAkkordKap0(aufgaben.at(idx).toene, 1.1);
  };

  const render = (hinweis = "Klingt dieser Klang hell wie die Sonne (Dur) oder weich wie eine Wolke (Moll)?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap0_5", 170, "Klangfarben-Kenner!", "Du spürst den Unterschied zwischen Dur und Moll sofort!");
      return;
    }
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.5 Dur oder Moll?</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:18px 0;">
          <button id="kap0-play-btn" class="btn-primary" style="font-size:20px; padding:14px 28px;">🔊 Klang anhören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap0DM('dur')">☀️ Dur (fröhlich & hell)</button>
          <button class="answer-btn" style="background:#e0e7ff; border-color:#4f46e5; color:#1e1b4b;" onclick="checkKap0DM('moll')">☁️ Moll (sanft & nachdenklich)</button>
        </div>
      </div>`;
    document.getElementById("kap0-play-btn").onclick = spieleAktuell;
    spieleAktuell();
  };

  window.checkKap0DM = (wahl) => {
    const akt = aufgaben.at(idx);
    if (wahl === akt.typ) {
      idx++;
      render("Wunderbar gespürt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      setTimeout(spieleAktuell, 300);
      render("Hör nochmals auf die Stimmung des Klangs: Strahlt er wie die Sonne oder klingt er weich?");
    }
  };
  render();
}

// 1.6 Boss-Challenge: Gehör-Meister (10 gemischte Höraufgaben)
function starteKap0Boss() {
  const fragen = mischeZufallKap0(Array.of(
    { modus: "ht", m1: 60, m2: 72, antwort: "hoch", frage: "Ist der 2. Ton höher oder tiefer?", opt1: Array.of("tief", "🐻 Tiefer"), opt2: Array.of("hoch", "🐦 Höher") },
    { modus: "ht", m1: 74, m2: 62, antwort: "tief", frage: "Ist der 2. Ton höher oder tiefer?", opt1: Array.of("tief", "🐻 Tiefer"), opt2: Array.of("hoch", "🐦 Höher") },
    { modus: "ss", m1: 64, m2: 65, antwort: "schritt", frage: "Kleiner Schritt oder grosser Sprung?", opt1: Array.of("schritt", "👣 Schritt"), opt2: Array.of("sprung", "🦘 Sprung") },
    { modus: "ss", m1: 60, m2: 72, antwort: "sprung", frage: "Kleiner Schritt oder grosser Sprung?", opt1: Array.of("schritt", "👣 Schritt"), opt2: Array.of("sprung", "🦘 Sprung") },
    { modus: "sl", toene: Array.of(60, 62, 64, 65), antwort: "staccato", frage: "Staccato oder Legato?", opt1: Array.of("staccato", "🐸 Staccato"), opt2: Array.of("legato", "🦢 Legato") },
    { modus: "sl", toene: Array.of(67, 65, 64, 62), antwort: "legato", frage: "Staccato oder Legato?", opt1: Array.of("staccato", "🐸 Staccato"), opt2: Array.of("legato", "🦢 Legato") },
    { modus: "dm", toene: Array.of(60, 64, 67), antwort: "dur", frage: "Klingt das nach Dur oder Moll?", opt1: Array.of("dur", "☀️ Dur"), opt2: Array.of("moll", "☁️ Moll") },
    { modus: "dm", toene: Array.of(60, 63, 67), antwort: "moll", frage: "Klingt das nach Dur oder Moll?", opt1: Array.of("dur", "☀️ Dur"), opt2: Array.of("moll", "☁️ Moll") },
    { modus: "mel", toene: Array.of(60, 64, 67), antwort: "hoch", frage: "Steigt oder fällt die Melodie?", opt1: Array.of("tief", "📉 Fällt"), opt2: Array.of("hoch", "📈 Steigt") },
    { modus: "mel", toene: Array.of(72, 67, 64), antwort: "tief", frage: "Steigt oder fällt die Melodie?", opt1: Array.of("tief", "📉 Fällt"), opt2: Array.of("hoch", "📈 Steigt") }
  ));
  let idx = 0;
  let leben = 3;

  const spieleAktuell = () => {
    const akt = fragen.at(idx);
    if (akt.modus === "ht" || akt.modus === "ss") {
      spieleTonfolgeKap0(Array.of(akt.m1, akt.m2), 0.5, 380);
    } else if (akt.modus === "sl") {
      if (akt.antwort === "staccato") {
        spieleStaccatoFolgeKap0(akt.toene, 380);
      } else {
        spieleTonfolgeKap0(akt.toene, 0.85, 420);
      }
    } else if (akt.modus === "dm") {
      spieleAkkordKap0(akt.toene, 1.0);
    } else {
      spieleTonfolgeKap0(akt.toene, 0.42, 320);
    }
  };

  const render = (hinweis = "") => {
    if (leben <= 0) {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:32px;">
          <div style="font-size:52px;">💔</div>
          <h2>Fast geschafft!</h2>
          <p class="quiz-hint" style="margin:10px 0 20px;">Alle 3 Herzen aufgebraucht – versuche es gleich noch einmal!</p>
          <button class="btn-primary" onclick="starteKap0Boss()">Boss-Challenge neu starten</button>
        </div>`;
      return;
    }
    if (idx >= fragen.length) {
      if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti(true);
      abschliessenSpiel("kap0_boss", 250, "🎉 GEHÖR-MEISTER! 🎉", "Deine Ohren sind spitze – du hast alle Hör-Prüfungen gemeistert!");
      return;
    }

    const akt = fragen.at(idx);
    const herzen = "❤️".repeat(leben) + "🤍".repeat(3 - leben);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>👑 Gehör-Boss ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
        <div style="margin:14px 0;">
          <button id="kap0-play-btn" class="btn-primary" style="font-size:18px; padding:12px 24px;">🔊 Nochmal anhören</button>
        </div>
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" onclick="checkKap0Boss('${akt.opt1.at(0)}')">${akt.opt1.at(1)}</button>
          <button class="answer-btn" onclick="checkKap0Boss('${akt.opt2.at(0)}')">${akt.opt2.at(1)}</button>
        </div>
      </div>`;
    document.getElementById("kap0-play-btn").onclick = spieleAktuell;
    spieleAktuell();
  };

  window.checkKap0Boss = (wahl) => {
    const akt = fragen.at(idx);
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
