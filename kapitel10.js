// kapitel10.js – Stufe 2, Kapitel 4: Lautstärke & Ausdruck (p, mf, f, crescendo, decrescendo)
function mischeZufallKap10(arr) {
  const kopie = arr.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function spieleKap10Dynamik(toene, lautstaerken, abstandMs = 520) {
  if (typeof klavierAudio === "undefined") return;
  toene.forEach((midi, i) => {
    const vol = Array.isArray(lautstaerken) ? lautstaerken.at(i) : lautstaerken;
    setTimeout(() => klavierAudio.spieleMidi(midi, 0.7, vol), i * abstandMs);
  });
}

function starteKap10Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap10Zeichen();
  if (nummer === 2) starteKap10HoerenPF();
  if (nummer === 3) starteKap10CrescendoWissen();
  if (nummer === 4) starteKap10HoerenCrescendo();
  if (nummer === 5 || nummer === 6) starteKap10Boss();
}

// 10.1 p (leise), mf (mittellaut) und f (laut) erkennen (10 Runden)
function starteKap10Zeichen() {
  const runden = mischeZufallKap10(Array.of(
    { symbol: "p", frage: "Was bedeutet dieses Zeichen (piano)?", antwort: "leise" },
    { symbol: "f", frage: "Was bedeutet dieses Zeichen (forte)?", antwort: "laut" },
    { symbol: "mf", frage: "Was bedeutet dieses Zeichen (mezzoforte)?", antwort: "mittel" },
    { symbol: "p", frage: "Wie spielst du, wenn «p» unter den Noten steht?", antwort: "leise" },
    { symbol: "f", frage: "Wie spielst du, wenn «f» unter den Noten steht?", antwort: "laut" },
    { symbol: "mf", frage: "Wie spielst du, wenn «mf» unter den Noten steht?", antwort: "mittel" },
    { symbol: "p", frage: "Welches Zeichen steht für «piano» (leise wie eine Maus)?", antwort: "leise" },
    { symbol: "f", frage: "Welches Zeichen steht für «forte» (laut wie ein Löwe)?", antwort: "laut" },
    { symbol: "mf", frage: "«Mezzoforte» (mf) liegt genau in der Mitte. Was heisst das?", antwort: "mittel" },
    { symbol: "f", frage: "Das Orchester spielt ein kräftiges «f» – wie klingt das?", antwort: "laut" }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap10_1", 140, "Dynamik-Kenner!", "p, mf und f erkennst du jetzt auf jedem Notenblatt!");
      return;
    }
    const akt = runden.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>10.1 Leise (p), mittellaut (mf) & laut (f)</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="font-size:52px; font-family:Georgia, serif; font-style:italic; font-weight:800; color:#7c3aed; margin:12px 0;">${akt.symbol}</div>
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap10_1('leise')">🐭 Leise (p)</button>
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap10_1('mittel')">🦊 Mittellaut (mf)</button>
          <button class="answer-btn" style="background:#fee2e2; border-color:#ef4444; color:#7f1d1d;" onclick="checkKap10_1('laut')">🦁 Laut (f)</button>
        </div>
      </div>`;
  };

  window.checkKap10_1 = (wahl) => {
    const akt = runden.at(idx);
    if (wahl === akt.antwort) {
      const vol = wahl === "leise" ? 0.18 : wahl === "mittel" ? 0.55 : 1.0;
      klavierAudio.spieleMidi(67, 0.5, vol);
      idx++;
      render("Goldrichtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Merkhilfe: p = piano (leise), mf = mezzoforte (mittellaut), f = forte (laut)!");
    }
  };
  render();
}

// 10.2 Laut (f) oder leise (p) hören? (10 Runden)
function starteKap10HoerenPF() {
  const runden = mischeZufallKap10(Array.of(
    { toene: Array.of(60, 64, 67), art: "p" },
    { toene: Array.of(60, 64, 67), art: "f" },
    { toene: Array.of(67, 65, 64, 62), art: "p" },
    { toene: Array.of(67, 65, 64, 62), art: "f" },
    { toene: Array.of(62, 65, 69), art: "p" },
    { toene: Array.of(62, 65, 69), art: "f" },
    { toene: Array.of(64, 67, 72), art: "p" },
    { toene: Array.of(64, 67, 72), art: "f" },
    { toene: Array.of(69, 67, 65), art: "p" },
    { toene: Array.of(69, 67, 65), art: "f" }
  ));
  let idx = 0;

  const spieleAkt = (akt) => spieleKap10Dynamik(akt.toene, akt.art === "p" ? 0.18 : 1.0, 520);

  const render = (hinweis = "Höre gut hin: Spielt das Klavier gerade piano (leise) oder forte (laut)?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap10_2", 160, "Feines Gehör!", "Piano und forte unterscheidest du am Klang sofort!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleAkt(akt);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>10.2 Piano (p) oder Forte (f) hören?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:16px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:250px;"
                  onclick="replayKap10_2()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap10_2('p')">🐭 piano (p) – leise</button>
          <button class="answer-btn" style="background:#fee2e2; border-color:#ef4444; color:#7f1d1d;" onclick="checkKap10_2('f')">🦁 forte (f) – laut</button>
        </div>
      </div>`;
  };

  window.replayKap10_2 = () => spieleAkt(runden.at(idx));
  window.checkKap10_2 = (wahl) => {
    if (wahl === runden.at(idx).art) {
      idx++;
      render("Super gehört! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Hör nochmals hin: Flüstert die Melodie ganz sanft (p) oder ruft sie kräftig (f)?", true);
    }
  };
  render();
}
// 10.3 Crescendo (<) und Decrescendo (>) verstehen (10 Runden)
function starteKap10CrescendoWissen() {
  const runden = mischeZufallKap10(Array.of(
    { anzeige: "crescendo", frage: "Was bedeutet das Wort «crescendo»?", antwort: "lauter" },
    { anzeige: "decrescendo", frage: "Was bedeutet das Wort «decrescendo»?", antwort: "leiser" },
    { anzeige: "<", frage: "Die Gabel öffnet sich immer weiter (<). Was passiert mit dem Ton?", antwort: "lauter" },
    { anzeige: ">", frage: "Die Gabel wird immer enger (>). Was passiert mit dem Ton?", antwort: "leiser" },
    { anzeige: "cresc.", frage: "«cresc.» ist die Abkürzung für crescendo. Wie spielst du?", antwort: "lauter" },
    { anzeige: "decresc.", frage: "«decresc.» ist die Abkürzung für decrescendo. Wie spielst du?", antwort: "leiser" },
    { anzeige: "<", frage: "Ein Zug kommt näher und wird immer kräftiger – welches Zeichen passt?", antwort: "lauter" },
    { anzeige: ">", frage: "Ein Zug fährt weg und verschwindet in der Ferne – welches Zeichen passt?", antwort: "leiser" },
    { anzeige: "crescendo", frage: "Von «p» (leise) nach «f» (laut) werden nennt man...", antwort: "lauter" },
    { anzeige: "decrescendo", frage: "Von «f» (laut) nach «p» (leise) werden nennt man...", antwort: "leiser" }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap10_3", 170, "Gabel-Meister!", "Crescendo und decrescendo hast du jetzt voll drauf!");
      return;
    }
    const akt = runden.at(idx);
    const istGabel = akt.anzeige === "<" || akt.anzeige === ">";
    const visual = istGabel
      ? `<svg viewBox="0 0 220 54" style="width:200px; height:48px; margin:8px auto; display:block;">
           ${akt.anzeige === "<"
             ? `<line x1="20" y1="27" x2="200" y2="8" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="27" x2="200" y2="46" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>`
             : `<line x1="20" y1="8" x2="200" y2="27" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="46" x2="200" y2="27" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>`}
         </svg>`
      : `<div style="font-size:36px; font-family:Georgia, serif; font-style:italic; font-weight:800; color:#7c3aed; margin:10px 0;">${akt.anzeige}</div>`;

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>10.3 Crescendo & Decrescendo</span><span>${idx + 1} / ${runden.length}</span></div>
        ${visual}
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap10_3('lauter')">📈 Immer lauter werden (crescendo)</button>
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap10_3('leiser')">📉 Immer leiser werden (decrescendo)</button>
        </div>
      </div>`;
  };

  window.checkKap10_3 = (wahl) => {
    if (wahl === runden.at(idx).antwort) {
      klavierAudio.spieleMidi(64, 0.4, 0.7);
      idx++;
      render("Perfekt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Merkhilfe: Öffnet sich die Gabel (<), wird der Ton grösser/lauter (crescendo)!");
    }
  };
  render();
}

// 10.4 Wird die Musik lauter oder leiser? (Hör-Spiel, 10 Runden)
function starteKap10HoerenCrescendo() {
  const runden = mischeZufallKap10(Array.of(
    { toene: Array.of(60, 62, 64, 65, 67), art: "lauter" },
    { toene: Array.of(67, 65, 64, 62, 60), art: "leiser" },
    { toene: Array.of(60, 60, 60, 60, 60), art: "lauter" },
    { toene: Array.of(67, 67, 67, 67, 67), art: "leiser" },
    { toene: Array.of(62, 64, 65, 67, 69), art: "lauter" },
    { toene: Array.of(69, 67, 65, 64, 62), art: "leiser" },
    { toene: Array.of(64, 65, 67, 69, 72), art: "lauter" },
    { toene: Array.of(72, 69, 67, 65, 64), art: "leiser" },
    { toene: Array.of(60, 64, 67, 64, 60), art: "lauter" },
    { toene: Array.of(60, 64, 67, 64, 60), art: "leiser" }
  ));
  let idx = 0;

  const spieleAkt = (akt) => {
    const kurve = akt.art === "lauter"
      ? Array.of(0.14, 0.30, 0.52, 0.78, 1.0)
      : Array.of(1.0, 0.75, 0.50, 0.28, 0.14);
    spieleKap10Dynamik(akt.toene, kurve, 500);
  };

  const render = (hinweis = "Höre auf die Lautstärke: Wird die Tonfolge immer lauter oder immer leiser?", autoPlay = true) => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap10_4", 190, "Lautstärke-Detektiv!", "Crescendo und decrescendo hörst du jetzt sofort heraus!");
      return;
    }
    const akt = runden.at(idx);
    if (autoPlay) spieleAkt(akt);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>10.4 Wird es lauter oder leiser?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="margin:16px 0;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:250px;"
                  onclick="replayKap10_4()">🔊 Nochmals hören</button>
        </div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap10_4('lauter')">📈 Immer lauter (crescendo)</button>
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap10_4('leiser')">📉 Immer leiser (decrescendo)</button>
        </div>
      </div>`;
  };

  window.replayKap10_4 = () => spieleAkt(runden.at(idx));
  window.checkKap10_4 = (wahl) => {
    if (wahl === runden.at(idx).art) {
      idx++;
      render("Goldrichtig gehört! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Vergleiche den allerersten Ton mit dem letzten Ton: Wird es kräftiger oder zarter?", true);
    }
  };
  render();
}
// 10.5 Boss-Challenge: Dynamik-Dirigent (10 gemischte Runden)
function starteKap10Boss() {
  const aufgaben = mischeZufallKap10(Array.of(
    { typ: "quiz", frage: "Welches Zeichen steht für «piano» (leise)?", antwort: "p", opt: Array.of("p|🐭 p", "f|🦁 f", "mf|🦊 mf") },
    { typ: "quiz", frage: "Welches Zeichen steht für «forte» (laut)?", antwort: "f", opt: Array.of("p|🐭 p", "f|🦁 f", "mf|🦊 mf") },
    { typ: "quiz", frage: "Was bedeutet «crescendo»?", antwort: "lauter", opt: Array.of("lauter|📈 Lauter werden", "leiser|📉 Leiser werden") },
    { typ: "quiz", frage: "Was bedeutet «decrescendo»?", antwort: "leiser", opt: Array.of("lauter|📈 Lauter werden", "leiser|📉 Leiser werden") },
    { typ: "quiz", frage: "Was bedeutet «mf» (mezzoforte)?", antwort: "mittel", opt: Array.of("leise|🐭 Ganz leise", "mittel|🦊 Mittellaut", "laut|🦁 Sehr laut") },
    { typ: "hoerPF", toene: Array.of(60, 64, 67), art: "p", frage: "Hör-Boss: Spielt das Klavier piano (leise) oder forte (laut)?" },
    { typ: "hoerPF", toene: Array.of(67, 64, 60), art: "f", frage: "Hör-Boss: Spielt das Klavier piano (leise) oder forte (laut)?" },
    { typ: "hoerCresc", toene: Array.of(60, 62, 64, 65, 67), art: "lauter", frage: "Hör-Boss: Wird die Tonfolge lauter oder leiser?" },
    { typ: "hoerCresc", toene: Array.of(67, 65, 64, 62, 60), art: "leiser", frage: "Hör-Boss: Wird die Tonfolge lauter oder leiser?" },
    { typ: "quiz", frage: "Welche Gabel bedeutet «crescendo» (lauter werden)?", antwort: "auf", opt: Array.of("auf|📐 < (Gabel öffnet sich)", "zu|📐 > (Gabel schliesst sich)") }
  ));
  let idx = 0;

  const spieleBossAudio = (akt) => {
    if (akt.typ === "hoerPF") {
      spieleKap10Dynamik(akt.toene, akt.art === "p" ? 0.18 : 1.0, 520);
    } else if (akt.typ === "hoerCresc") {
      const kurve = akt.art === "lauter" ? Array.of(0.14, 0.30, 0.52, 0.78, 1.0) : Array.of(1.0, 0.75, 0.50, 0.28, 0.14);
      spieleKap10Dynamik(akt.toene, kurve, 500);
    }
  };

  const render = (hinweis = "", autoPlay = true) => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap10_5", 230, "Dynamik-Dirigent Boss! 🏆", "Du beherrschst alle Lautstärke-Zeichen und hörst jede Nuance!");
      return;
    }
    const akt = aufgaben.at(idx);
    const istHoer = akt.typ !== "quiz";
    if (istHoer && autoPlay) spieleBossAudio(akt);

    const replayBtn = istHoer
      ? `<div style="margin:14px 0;"><button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f; max-width:240px;" onclick="replayKap10Boss()">🔊 Nochmals hören</button></div>`
      : "";

    const opts = akt.typ === "quiz"
      ? akt.opt
      : akt.typ === "hoerPF"
        ? Array.of("p|🐭 piano (leise)", "f|🦁 forte (laut)")
        : Array.of("lauter|📈 Lauter (crescendo)", "leiser|📉 Leiser (decrescendo)");

    const btns = opts.map((e) => {
      const [v, l] = e.split("|");
      return `<button class="answer-btn" style="background:#ede9fe; border-color:#7c3aed; color:#4c1d95;" onclick="checkKap10Boss('${v}')">${l}</button>`;
    }).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>10.5 Boss-Challenge: Dynamik</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        ${replayBtn}
        <p class="quiz-hint" style="margin-top:12px;">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(${opts.length}, 1fr); margin-top:16px;">${btns}</div>
      </div>`;
  };

  window.replayKap10Boss = () => spieleBossAudio(aufgaben.at(idx));
  window.checkKap10Boss = (wahl) => {
    const akt = aufgaben.at(idx);
    const ziel = akt.typ === "quiz" ? akt.antwort : akt.art;
    if (wahl === ziel) {
      if (akt.typ === "quiz") klavierAudio.spieleMidi(67, 0.4, 0.7);
      idx++;
      render("Boss-Punkt geholt! ✅", true);
    } else {
      klavierAudio.spieleQuietsch();
      render("Fast! Überlege nochmals in Ruhe oder hör dir den Klang nochmals an!", true);
    }
  };
  render();
}
