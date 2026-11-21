// kapitel0.js – Gehör & Klang-Entdecker (Stufe 1 – entspanntes Tempo)
function mischeZufallKap0(arr) {
  const kopie = arr.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function spieleTonFolgeLangsam(toene, abstandMs = 620, dauerSek = 0.7) {
  toene.forEach((midi, i) => {
    setTimeout(() => {
      if (typeof klavierAudio !== "undefined") {
        klavierAudio.spieleMidi(midi, dauerSek);
      }
    }, i * abstandMs);
  });
}

function starteKap0Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap0HochTief();
  if (nummer === 2) starteKap0GleichVerschieden();
  if (nummer === 3) starteKap0MelodieRichtung();
  if (nummer === 4) starteKap0StaccatoLegato();
  if (nummer === 5 || nummer === 6) starteKap0Boss();
}

// 1.1 Hoch oder tief? (10 Runden)
function starteKap0HochTief() {
  const runden = mischeZufallKap0(Array.of(
    { toene: Array.of(52, 72), antwort: "hoch" },
    { toene: Array.of(74, 53), antwort: "tief" },
    { toene: Array.of(48, 67), antwort: "hoch" },
    { toene: Array.of(76, 55), antwort: "tief" },
    { toene: Array.of(55, 76), antwort: "hoch" },
    { toene: Array.of(72, 50), antwort: "tief" },
    { toene: Array.of(50, 71), antwort: "hoch" },
    { toene: Array.of(79, 57), antwort: "tief" },
    { toene: Array.of(53, 74), antwort: "hoch" },
    { toene: Array.of(69, 48), antwort: "tief" }
  ));
  let idx = 0;

  const render = (hinweis = "Höre gut zu: Ist der 2. Ton höher oder tiefer als der 1. Ton?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap0_2", 100, "Ohren-Spitzer!", "Du erkennst sofort, ob ein Ton hoch hinaufklettert oder tief hinuntertaucht!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleTonFolgeLangsam(akt.toene, 650, 0.75);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.1 Hoch oder tief?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap0_1()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#fef9c3; border-color:#eab308; color:#713f12;" onclick="checkKap0_1('hoch')">🐦 2. Ton ist HÖHER</button>
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap0_1('tief')">🐻 2. Ton ist TIEFER</button>
        </div>
      </div>`;
  };

  window.replayKap0_1 = () => spieleTonFolgeLangsam(runden.at(idx).toene, 650, 0.75);
  window.checkKap0_1 = (wahl) => {
    if (wahl === runden.at(idx).antwort) {
      idx++;
      render("Super gehört! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Hör nochmals genau hin: Geht der 2. Ton nach oben (wie ein Vogel) oder nach unten (wie ein Bär)?", true);
    }
  };
  render();
}
// 1.2 Gleich oder verschieden? (10 Runden)
function starteKap0GleichVerschieden() {
  const runden = mischeZufallKap0(Array.of(
    { toene: Array.of(60, 60), antwort: "gleich" },
    { toene: Array.of(60, 67), antwort: "verschieden" },
    { toene: Array.of(64, 64), antwort: "gleich" },
    { toene: Array.of(65, 57), antwort: "verschieden" },
    { toene: Array.of(67, 67), antwort: "gleich" },
    { toene: Array.of(62, 69), antwort: "verschieden" },
    { toene: Array.of(69, 69), antwort: "gleich" },
    { toene: Array.of(72, 64), antwort: "verschieden" },
    { toene: Array.of(62, 62), antwort: "gleich" },
    { toene: Array.of(60, 65), antwort: "verschieden" }
  ));
  let idx = 0;

  const render = (hinweis = "Sind beide Töne genau gleich oder verschieden?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap0_3", 100, "Zwillings-Ohr!", "Du erkennst sofort, ob zwei Töne Zwillinge sind oder verschieden klingen!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleTonFolgeLangsam(akt.toene, 650, 0.75);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.2 Gleich oder verschieden?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap0_2()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap0_2('gleich')">👯 Genau gleich</button>
          <button class="answer-btn" style="background:#fee2e2; border-color:#ef4444; color:#7f1d1d;" onclick="checkKap0_2('verschieden')">🔀 Verschieden</button>
        </div>
      </div>`;
  };

  window.replayKap0_2 = () => spieleTonFolgeLangsam(runden.at(idx).toene, 650, 0.75);
  window.checkKap0_2 = (wahl) => {
    if (wahl === runden.at(idx).antwort) {
      idx++;
      render("Goldrichtig! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Wenn beide Töne genau gleich hoch bleiben, sind es Zwillinge!", true);
    }
  };
  render();
}

// 1.3 Steigt oder fällt die Melodie? (10 Runden)
function starteKap0MelodieRichtung() {
  const runden = mischeZufallKap0(Array.of(
    { toene: Array.of(60, 64, 67), antwort: "steigt" },
    { toene: Array.of(67, 64, 60), antwort: "faellt" },
    { toene: Array.of(62, 65, 69), antwort: "steigt" },
    { toene: Array.of(72, 67, 64), antwort: "faellt" },
    { toene: Array.of(60, 62, 64), antwort: "steigt" },
    { toene: Array.of(69, 67, 65), antwort: "faellt" },
    { toene: Array.of(64, 67, 72), antwort: "steigt" },
    { toene: Array.of(67, 65, 62), antwort: "faellt" },
    { toene: Array.of(57, 60, 64), antwort: "steigt" },
    { toene: Array.of(65, 62, 59), antwort: "faellt" }
  ));
  let idx = 0;

  const render = (hinweis = "Klettert die kleine 3-Ton-Melodie nach oben oder rutscht sie nach unten?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap0_4", 120, "Melodie-Kompass!", "Du hörst sofort, in welche Richtung eine Melodie wandert!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleTonFolgeLangsam(akt.toene, 580, 0.65);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.3 Steigt oder fällt die Melodie?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap0_3()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#fef9c3; border-color:#eab308; color:#713f12;" onclick="checkKap0_3('steigt')">📈 Steigt (Treppe rauf)</button>
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap0_3('faellt')">📉 Fällt (Rutsche runter)</button>
        </div>
      </div>`;
  };

  window.replayKap0_3 = () => spieleTonFolgeLangsam(runden.at(idx).toene, 580, 0.65);
  window.checkKap0_3 = (wahl) => {
    if (wahl === runden.at(idx).antwort) {
      idx++;
      render("Perfekt gehört! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Hör auf den letzten Ton: Wird er immer höher oder immer tiefer?", true);
    }
  };
  render();
}
// 1.4 Staccato (hüpfend) oder Legato (gebunden)? (10 Runden)
function starteKap0StaccatoLegato() {
  const runden = mischeZufallKap0(Array.of(
    { toene: Array.of(60, 62, 64, 65), art: "staccato" },
    { toene: Array.of(60, 62, 64, 65), art: "legato" },
    { toene: Array.of(67, 65, 64, 62), art: "staccato" },
    { toene: Array.of(67, 65, 64, 62), art: "legato" },
    { toene: Array.of(60, 64, 67, 64), art: "staccato" },
    { toene: Array.of(60, 64, 67, 64), art: "legato" },
    { toene: Array.of(65, 64, 62, 60), art: "staccato" },
    { toene: Array.of(65, 64, 62, 60), art: "legato" },
    { toene: Array.of(62, 64, 65, 67), art: "staccato" },
    { toene: Array.of(62, 64, 65, 67), art: "legato" }
  ));
  let idx = 0;

  const spieleArt = (akt) => {
    if (akt.art === "staccato") {
      spieleTonFolgeLangsam(akt.toene, 540, 0.14);
    } else {
      spieleTonFolgeLangsam(akt.toene, 580, 0.85);
    }
  };

  const render = (hinweis = "Hüpfen die Töne kurz wie ein Frosch (Staccato) oder fliessen sie weich zusammen (Legato)?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap0_5", 140, "Klang-Experte!", "Staccato und Legato unterscheidest du jetzt im Schlaf!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleArt(akt);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.4 Staccato oder Legato?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap0_4()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap0_4('staccato')">🐸 Staccato (kurz & hüpfend)</button>
          <button class="answer-btn" style="background:#ede9fe; border-color:#7c3aed; color:#4c1d95;" onclick="checkKap0_4('legato')">🦢 Legato (weich & gebunden)</button>
        </div>
      </div>`;
  };

  window.replayKap0_4 = () => spieleArt(runden.at(idx));
  window.checkKap0_4 = (wahl) => {
    if (wahl === runden.at(idx).art) {
      idx++;
      render("Super erkannt! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Bei Staccato sind Pausen zwischen den kurzen Tönen, bei Legato klingen sie lang!", true);
    }
  };
  render();
}

// 1.5 Boss-Challenge: Gehör-Entdecker (10 gemischte Runden)
function starteKap0Boss() {
  const aufgaben = mischeZufallKap0(Array.of(
    { frage: "Ist der 2. Ton höher oder tiefer?", toene: Array.of(52, 74), dauer: 0.75, antwort: "hoch", opt: Array.of("hoch|🐦 Höher", "tief|🐻 Tiefer") },
    { frage: "Ist der 2. Ton höher oder tiefer?", toene: Array.of(72, 50), dauer: 0.75, antwort: "tief", opt: Array.of("hoch|🐦 Höher", "tief|🐻 Tiefer") },
    { frage: "Sind diese 2 Töne gleich oder verschieden?", toene: Array.of(64, 64), dauer: 0.75, antwort: "gleich", opt: Array.of("gleich|👯 Gleich", "verschieden|🔀 Verschieden") },
    { frage: "Sind diese 2 Töne gleich oder verschieden?", toene: Array.of(60, 67), dauer: 0.75, antwort: "verschieden", opt: Array.of("gleich|👯 Gleich", "verschieden|🔀 Verschieden") },
    { frage: "Steigt oder fällt diese Melodie?", toene: Array.of(60, 64, 67), dauer: 0.65, antwort: "steigt", opt: Array.of("steigt|📈 Steigt", "faellt|📉 Fällt") },
    { frage: "Steigt oder fällt diese Melodie?", toene: Array.of(69, 65, 62), dauer: 0.65, antwort: "faellt", opt: Array.of("steigt|📈 Steigt", "faellt|📉 Fällt") },
    { frage: "Klingt das Staccato oder Legato?", toene: Array.of(60, 62, 64, 65), dauer: 0.14, antwort: "staccato", opt: Array.of("staccato|🐸 Staccato", "legato|🦢 Legato") },
    { frage: "Klingt das Staccato oder Legato?", toene: Array.of(67, 65, 64, 62), dauer: 0.85, antwort: "legato", opt: Array.of("staccato|🐸 Staccato", "legato|🦢 Legato") },
    { frage: "Ist der 2. Ton höher oder tiefer?", toene: Array.of(55, 76), dauer: 0.75, antwort: "hoch", opt: Array.of("hoch|🐦 Höher", "tief|🐻 Tiefer") },
    { frage: "Steigt oder fällt diese Melodie?", toene: Array.of(72, 67, 60), dauer: 0.65, antwort: "faellt", opt: Array.of("steigt|📈 Steigt", "faellt|📉 Fällt") }
  ));
  let idx = 0;

  const render = (hinweis = "", autoPlay = true) => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap0_boss", 220, "Gehör-Entdecker Boss! 🏆", "Du hast alle 10 Gehör-Prüfungen souverän gemeistert!");
      return;
    }
    const akt = aufgaben.at(idx);
    if (autoPlay) spieleTonFolgeLangsam(akt.toene, 580, akt.dauer);

    const btns = akt.opt.map((entry) => {
      const [val, label] = entry.split("|");
      return `<button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap0Boss('${val}')">${label}</button>`;
    }).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>1.5 Boss-Challenge: Gehör</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef9c3; border-color:#eab308; color:#713f12; max-width:260px;"
                  onclick="replayKap0Boss()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">${btns}</div>
      </div>`;
  };

  window.replayKap0Boss = () => {
    const akt = aufgaben.at(idx);
    spieleTonFolgeLangsam(akt.toene, 580, akt.dauer);
  };
  window.checkKap0Boss = (wahl) => {
    if (wahl === aufgaben.at(idx).antwort) {
      idx++;
      render("Boss-Punkt geholt! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Hör dir die Töne nochmals in Ruhe an!", true);
    }
  };
  render();
}
