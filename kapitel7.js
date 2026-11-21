// kapitel7.js – Stufe 2, Kapitel 1: Gehörbildung Aufbau (ab 8 Jahren)
function mischeZufallKap7(arr) {
  const kopie = arr.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function spieleKap7Klang(toene, gleichzeitig = false, abstandMs = 620) {
  if (typeof klavierAudio === "undefined") return;
  if (gleichzeitig) {
    toene.forEach((midi) => klavierAudio.spieleMidi(midi, 1.1));
  } else {
    toene.forEach((midi, i) => {
      setTimeout(() => klavierAudio.spieleMidi(midi, 0.75), i * abstandMs);
    });
  }
}

function starteKap7Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap7EinzelOderAkkord();
  if (nummer === 2) starteKap7SchrittOderSprung();
  if (nummer === 3) starteKap7KuckuckFeuerwehr();
  if (nummer === 4) starteKap7EchoSpiel();
  if (nummer === 5 || nummer === 6) starteKap7Boss();
}

// 7.1 Einzelton oder Zusammenklang? (10 Runden)
function starteKap7EinzelOderAkkord() {
  const runden = mischeZufallKap7(Array.of(
    { toene: Array.of(60), mehrstimmig: false },
    { toene: Array.of(60, 64, 67), mehrstimmig: true },
    { toene: Array.of(65), mehrstimmig: false },
    { toene: Array.of(62, 65, 69), mehrstimmig: true },
    { toene: Array.of(67), mehrstimmig: false },
    { toene: Array.of(64, 67, 72), mehrstimmig: true },
    { toene: Array.of(62), mehrstimmig: false },
    { toene: Array.of(60, 67), mehrstimmig: true },
    { toene: Array.of(69), mehrstimmig: false },
    { toene: Array.of(65, 69, 72), mehrstimmig: true }
  ));
  let idx = 0;

  const render = (hinweis = "Klingt hier nur ein einzelner Ton oder ein ganzer Zusammenklang?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap7_1", 140, "Klang-Detektiv!", "Einzeltöne und volle Zusammenklänge unterscheidest du sofort!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleKap7Klang(akt.toene, akt.mehrstimmig);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.1 Einzelton oder Zusammenklang?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap7_1()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap7_1(false)">☝️ Nur 1 Einzelton</button>
          <button class="answer-btn" style="background:#ede9fe; border-color:#7c3aed; color:#4c1d95;" onclick="checkKap7_1(true)">🎹 Zusammenklang (mehrere Töne)</button>
        </div>
      </div>`;
  };

  window.replayKap7_1 = () => spieleKap7Klang(runden.at(idx).toene, runden.at(idx).mehrstimmig);
  window.checkKap7_1 = (wahlMehr) => {
    if (wahlMehr === runden.at(idx).mehrstimmig) {
      idx++;
      render("Super gehört! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Hör nochmals hin: Klingt es ganz schlank (1 Ton) oder voll und breit (mehrere Töne)?", true);
    }
  };
  render();
}

// 7.2 Kleiner Schritt oder grosser Sprung? (10 Runden)
function starteKap7SchrittOderSprung() {
  const runden = mischeZufallKap7(Array.of(
    { toene: Array.of(60, 62), typ: "schritt" },
    { toene: Array.of(60, 72), typ: "sprung" },
    { toene: Array.of(65, 64), typ: "schritt" },
    { toene: Array.of(60, 67), typ: "sprung" },
    { toene: Array.of(64, 65), typ: "schritt" },
    { toene: Array.of(72, 60), typ: "sprung" },
    { toene: Array.of(67, 69), typ: "schritt" },
    { toene: Array.of(62, 71), typ: "sprung" },
    { toene: Array.of(62, 60), typ: "schritt" },
    { toene: Array.of(69, 60), typ: "sprung" }
  ));
  let idx = 0;

  const render = (hinweis = "Liegen die zwei Töne direkt nebeneinander (Schritt) oder weit auseinander (Sprung)?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap7_2", 160, "Abstands-Profi!", "Kleine Schritte und weite Sprünge hörst du jetzt sofort heraus!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleKap7Klang(akt.toene, false, 640);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.2 Kleiner Schritt oder grosser Sprung?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap7_2()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap7_2('schritt')">👣 Kleiner Schritt</button>
          <button class="answer-btn" style="background:#fef9c3; border-color:#eab308; color:#713f12;" onclick="checkKap7_2('sprung')">🦘 Grosser Sprung</button>
        </div>
      </div>`;
  };

  window.replayKap7_2 = () => spieleKap7Klang(runden.at(idx).toene, false, 640);
  window.checkKap7_2 = (wahl) => {
    if (wahl === runden.at(idx).typ) {
      idx++;
      render("Volltreffer! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Beim kleinen Schritt sind die Töne direkte Nachbarn!", true);
    }
  };
  render();
}
// 7.3 Kuckuck oder Feuerwehrhorn? (10 Runden)
function starteKap7KuckuckFeuerwehr() {
  const runden = mischeZufallKap7(Array.of(
    { toene: Array.of(67, 64), typ: "kuckuck" },
    { toene: Array.of(60, 67), typ: "feuerwehr" },
    { toene: Array.of(69, 65), typ: "kuckuck" },
    { toene: Array.of(62, 69), typ: "feuerwehr" },
    { toene: Array.of(64, 60), typ: "kuckuck" },
    { toene: Array.of(65, 72), typ: "feuerwehr" },
    { toene: Array.of(72, 69), typ: "kuckuck" },
    { toene: Array.of(60, 67), typ: "feuerwehr" },
    { toene: Array.of(67, 64), typ: "kuckuck" },
    { toene: Array.of(64, 71), typ: "feuerwehr" }
  ));
  let idx = 0;

  const render = (hinweis = "Ruft hier der Kuckuck (abwärts) oder das Feuerwehrhorn (aufwärts)?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap7_3", 180, "Ruf-Experte!", "Kuckuck und Feuerwehrhorn erkennst du an jedem Klang!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleKap7Klang(akt.toene, false, 580);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.3 Kuckuck oder Feuerwehrhorn?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap7_3()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap7_3('kuckuck')">🐦 Kuckuck (Ku-ckuck!)</button>
          <button class="answer-btn" style="background:#fee2e2; border-color:#ef4444; color:#7f1d1d;" onclick="checkKap7_3('feuerwehr')">🚒 Feuerwehrhorn (Ta-tü!)</button>
        </div>
      </div>`;
  };

  window.replayKap7_3 = () => spieleKap7Klang(runden.at(idx).toene, false, 580);
  window.checkKap7_3 = (wahl) => {
    if (wahl === runden.at(idx).typ) {
      idx++;
      render("Goldrichtig! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Der Kuckuck ruft nach unten, das Feuerwehrhorn ruft hoch hinauf!", true);
    }
  };
  render();
}

// 7.4 Echo-Spiel: 2–3 Töne nachtippen (10 Runden)
function starteKap7EchoSpiel() {
  const tasten = Array.of(
    { ton: "C", midi: 60 }, { ton: "D", midi: 62 },
    { ton: "E", midi: 64 }, { ton: "F", midi: 65 }, { ton: "G", midi: 67 }
  );
  const runden = Array.of(
    Array.of("C", "D"),
    Array.of("E", "D"),
    Array.of("C", "E"),
    Array.of("G", "E"),
    Array.of("C", "D", "E"),
    Array.of("E", "D", "C"),
    Array.of("C", "E", "G"),
    Array.of("G", "E", "C"),
    Array.of("D", "E", "F"),
    Array.of("G", "F", "E")
  );
  let idx = 0;
  let eingabe = Array.of();

  const spieleEcho = () => {
    const folge = runden.at(idx).map((t) => tasten.find((x) => x.ton === t).midi);
    spieleKap7Klang(folge, false, 600);
  };

  const render = (hinweis = "Höre gut zu und tippe die Melodie als Echo nach!", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap7_4", 200, "Echo-Champion!", "Du hast alle 10 Melodien nach dem Gehör nachgespielt!");
      return;
    }
    const ziel = runden.at(idx);
    if (autoPlay) spieleEcho();

    const punkteAnzeige = ziel.map((_, i) => (i < eingabe.length ? `✅ ${eingabe.at(i)}` : "⭕")).join("  ");
    const btns = tasten.map((t) => `
      <button onclick="checkKap7Echo('${t.ton}', ${t.midi})"
              style="flex:1; height:120px; background:#fff; border:2px solid #0284c7; border-radius:0 0 12px 12px;
                     display:flex; align-items:flex-end; justify-content:center; padding-bottom:12px;
                     font-weight:800; font-size:20px; color:#0c4a6e; cursor:pointer;">${t.ton}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.4 Echo-Spiel (${ziel.length} Töne)</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:12px 0; display:flex; justify-content:center; gap:12px; align-items:center;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:210px;"
                  onclick="replayKap7Echo()">🔊 Melodie hören</button>
          <span style="font-size:18px; font-weight:800;">${punkteAnzeige}</span>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div style="display:flex; gap:6px; max-width:380px; margin:12px auto 0;">${btns}</div>
      </div>`;
  };

  window.replayKap7Echo = () => spieleEcho();
  window.checkKap7Echo = (ton, midi) => {
    klavierAudio.spieleMidi(midi, 0.6);
    const ziel = runden.at(idx);
    const erwartet = ziel.at(eingabe.length);
    if (ton === erwartet) {
      eingabe.push(ton);
      if (eingabe.length >= ziel.length) {
        idx++;
        eingabe = Array.of();
        setTimeout(() => render("Echo perfekt nachgespielt! ✅", true), 450);
      } else {
        render(`Super (${ton})! Welcher Ton kommt als Nächstes?`, false);
      }
    } else {
      klavierAudio.spieleQuietsch();
      eingabe = Array.of();
      render(`Das war ${ton}. Hör dir das Echo nochmals von vorne an!`, true);
    }
  };
  render();
}
// 7.5 Boss-Challenge: Ohren-Profi (10 gemischte Runden)
function starteKap7Boss() {
  const aufgaben = mischeZufallKap7(Array.of(
    { frage: "Einzelton oder Zusammenklang?", toene: Array.of(60, 64, 67), mehr: true, antwort: "mehr", opt: Array.of("ein|☝️ 1 Einzelton", "mehr|🎹 Zusammenklang") },
    { frage: "Einzelton oder Zusammenklang?", toene: Array.of(64), mehr: false, antwort: "ein", opt: Array.of("ein|☝️ 1 Einzelton", "mehr|🎹 Zusammenklang") },
    { frage: "Kleiner Schritt oder grosser Sprung?", toene: Array.of(62, 64), mehr: false, antwort: "schritt", opt: Array.of("schritt|👣 Schritt", "sprung|🦘 Sprung") },
    { frage: "Kleiner Schritt oder grosser Sprung?", toene: Array.of(60, 72), mehr: false, antwort: "sprung", opt: Array.of("schritt|👣 Schritt", "sprung|🦘 Sprung") },
    { frage: "Kuckuck oder Feuerwehrhorn?", toene: Array.of(67, 64), mehr: false, antwort: "kuckuck", opt: Array.of("kuckuck|🐦 Kuckuck", "feuerwehr|🚒 Feuerwehr") },
    { frage: "Kuckuck oder Feuerwehrhorn?", toene: Array.of(60, 67), mehr: false, antwort: "feuerwehr", opt: Array.of("kuckuck|🐦 Kuckuck", "feuerwehr|🚒 Feuerwehr") },
    { frage: "Einzelton oder Zusammenklang?", toene: Array.of(62, 65, 69), mehr: true, antwort: "mehr", opt: Array.of("ein|☝️ 1 Einzelton", "mehr|🎹 Zusammenklang") },
    { frage: "Kleiner Schritt oder grosser Sprung?", toene: Array.of(67, 65), mehr: false, antwort: "schritt", opt: Array.of("schritt|👣 Schritt", "sprung|🦘 Sprung") },
    { frage: "Kuckuck oder Feuerwehrhorn?", toene: Array.of(69, 65), mehr: false, antwort: "kuckuck", opt: Array.of("kuckuck|🐦 Kuckuck", "feuerwehr|🚒 Feuerwehr") },
    { frage: "Kuckuck oder Feuerwehrhorn?", toene: Array.of(65, 72), mehr: false, antwort: "feuerwehr", opt: Array.of("kuckuck|🐦 Kuckuck", "feuerwehr|🚒 Feuerwehr") }
  ));
  let idx = 0;

  const render = (hinweis = "", autoPlay = true) => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap7_5", 240, "Ohren-Profi Boss! 🏆", "Du hast alle 10 Gehör-Prüfungen der Stufe 2 gemeistert!");
      return;
    }
    const akt = aufgaben.at(idx);
    if (autoPlay) spieleKap7Klang(akt.toene, akt.mehr, 600);

    const btns = akt.opt.map((entry) => {
      const [val, label] = entry.split("|");
      return `<button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap7Boss('${val}')">${label}</button>`;
    }).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.5 Boss-Challenge: Ohren-Profi</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div style="margin:18px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:260px;"
                  onclick="replayKap7Boss()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">${btns}</div>
      </div>`;
  };

  window.replayKap7Boss = () => {
    const akt = aufgaben.at(idx);
    spieleKap7Klang(akt.toene, akt.mehr, 600);
  };
  window.checkKap7Boss = (wahl) => {
    if (wahl === aufgaben.at(idx).antwort) {
      idx++;
      render("Boss-Punkt geholt! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Hör dir den Klang nochmals in Ruhe an!", true);
    }
  };
  render();
}
