// kapitel9.js – Stufe 2, Kapitel 3: Schwarze Tasten & Kreuz-Töne (ohne Notation)
function mischeZufallKap9(arr) {
  const kopie = arr.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function starteKap9Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap9KreuzRegel();
  if (nummer === 2) starteKap9Zwillinge();
  if (nummer === 3) starteKap9Drillinge();
  if (nummer === 4) starteKap9AlleFuenf();
  if (nummer === 5 || nummer === 6) starteKap9Boss();
}

function baueKap9Klaviatur(callbackName, zeigeWeisseNamen = true) {
  const weisse = Array.of("C", "D", "E", "F", "G", "A", "H", "C");
  const schwarze = Array.of(
    { name: "cis", left: 8.5, midi: 61 },
    { name: "dis", left: 21, midi: 63 },
    { name: "fis", left: 46, midi: 66 },
    { name: "gis", left: 58.5, midi: 68 },
    { name: "ais", left: 71, midi: 70 }
  );
  const wHtml = weisse.map((t, i) => `
    <button onclick="klavierAudio.spieleMidi(${Array.of(60, 62, 64, 65, 67, 69, 71, 72).at(i)}, 0.5)"
            style="flex:1; height:145px; background:#fff; border:1.5px solid #94a3b8; border-radius:0 0 10px 10px;
                   display:flex; align-items:flex-end; justify-content:center; padding-bottom:10px;
                   font-weight:700; font-size:15px; color:#64748b; cursor:pointer;">${zeigeWeisseNamen ? t : ""}</button>`).join("");
  const sHtml = schwarze.map((s) => `
    <button onclick="${callbackName}('${s.name}', ${s.midi})"
            style="position:absolute; top:0; left:${s.left}%; width:8%; height:90px; background:#1e293b;
                   border:2px solid #0f172a; border-radius:0 0 8px 8px; cursor:pointer; z-index:2;"></button>`).join("");
  return `<div style="position:relative; display:flex; max-width:460px; margin:12px auto 0; user-select:none;">${wHtml}${sHtml}</div>`;
}

// 9.1 Was macht das Kreuz (♯)? (10 Runden)
function starteKap9KreuzRegel() {
  const runden = mischeZufallKap9(Array.of(
    { frage: "Was macht ein Kreuz (♯) vor einem Ton?", antwort: "hoeher", opt: Array.of("hoeher|⬆️ Es macht den Ton einen halben Schritt höher", "tiefer|⬇️ Es macht den Ton tiefer") },
    { frage: "In welche Richtung gehst du beim Kreuz (♯) auf den Tasten?", antwort: "rechts", opt: Array.of("rechts|➡️ Nach rechts (höher)", "links|⬅️ Nach links (tiefer)") },
    { frage: "Welche Endung bekommen Töne mit einem Kreuz (♯)?", antwort: "is", opt: Array.of("is|✨ -is (z. B. cis, fis)", "es|🎈 -es (z. B. ces, fes)") },
    { frage: "Wie heisst der erhöhte Ton direkt rechts neben C?", antwort: "cis", opt: Array.of("cis|🎹 cis", "dis|🎹 dis") },
    { frage: "Wie heisst der erhöhte Ton direkt rechts neben F?", antwort: "fis", opt: Array.of("fis|🎹 fis", "gis|🎹 gis") },
    { frage: "Wie heisst der erhöhte Ton direkt rechts neben G?", antwort: "gis", opt: Array.of("gis|🎹 gis", "ais|🎹 ais") },
    { frage: "Wie heisst der erhöhte Ton direkt rechts neben D?", antwort: "dis", opt: Array.of("dis|🎹 dis", "cis|🎹 cis") },
    { frage: "Wie heisst der erhöhte Ton direkt rechts neben A?", antwort: "ais", opt: Array.of("ais|🎹 ais", "gis|🎹 gis") },
    { frage: "Aus welchem Stammton entsteht «fis»?", antwort: "F", opt: Array.of("F|🎵 Aus dem F (F + ♯)", "G|🎵 Aus dem G (G + ♯)") },
    { frage: "Aus welchem Stammton entsteht «cis»?", antwort: "C", opt: Array.of("C|🎵 Aus dem C (C + ♯)", "D|🎵 Aus dem D (D + ♯)") }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap9_1", 140, "Kreuz-Kenner!", "Die -is-Regel und das Kreuz (♯) hast du jetzt voll im Griff!");
      return;
    }
    const akt = runden.at(idx);
    const btns = akt.opt.map((e) => {
      const [val, label] = e.split("|");
      return `<button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap9_1('${val}')">${label}</button>`;
    }).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>9.1 Was macht das Kreuz (♯)?</span><span>${idx + 1} / ${runden.length}</span></div>
        <div style="font-size:42px; margin:10px 0;">♯</div>
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">${btns}</div>
      </div>`;
  };

  window.checkKap9_1 = (wahl) => {
    if (wahl === runden.at(idx).antwort) {
      klavierAudio.spieleMidi(66, 0.4);
      idx++;
      render("Goldrichtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Merkregel: Das Kreuz (♯) schiebt den Ton nach rechts (höher) und hängt ein «-is» an!");
    }
  };
  render();
}
// 9.2 Zwillinge mit Kreuz: cis & dis (10 Runden)
function starteKap9Zwillinge() {
  const runden = mischeZufallKap9(Array.of(
    "cis", "dis", "cis", "dis", "cis", "dis", "dis", "cis", "cis", "dis"
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap9_2", 150, "Zwillings-Profi!", "cis und dis bei den 2 schwarzen Tasten findest du sofort!");
      return;
    }
    const ziel = runden.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>9.2 Zwillinge: cis & dis</span><span>${idx + 1} / ${runden.length}</span></div>
        <h3 style="margin:10px 0; font-size:24px; color:#0f172a;">Tippe auf: <span style="color:#d97706;">${ziel}</span></h3>
        <p class="quiz-hint">${hinweis || "Schau auf die Zwillinge (2 schwarze Tasten): Links ist cis, rechts ist dis!"}</p>
        ${baueKap9Klaviatur("checkKap9_2", true)}
      </div>`;
  };

  window.checkKap9_2 = (taste, midi) => {
    klavierAudio.spieleMidi(midi, 0.6);
    const ziel = runden.at(idx);
    if (taste === ziel) {
      idx++;
      render(`Super, das ist ${ziel}! ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Das war ${taste}. Gesucht ist ${ziel} (bei den 2 schwarzen Zwillingen)!`);
    }
  };
  render();
}

// 9.3 Drillinge mit Kreuz: fis, gis & ais (10 Runden)
function starteKap9Drillinge() {
  const runden = mischeZufallKap9(Array.of(
    "fis", "gis", "ais", "fis", "gis", "ais", "fis", "ais", "gis", "fis"
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap9_3", 170, "Drillings-Profi!", "fis, gis und ais bei den 3 schwarzen Tasten sitzen bombenfest!");
      return;
    }
    const ziel = runden.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>9.3 Drillinge: fis, gis & ais</span><span>${idx + 1} / ${runden.length}</span></div>
        <h3 style="margin:10px 0; font-size:24px; color:#0f172a;">Tippe auf: <span style="color:#d97706;">${ziel}</span></h3>
        <p class="quiz-hint">${hinweis || "Schau auf die Drillinge (3 schwarze Tasten): fis (links), gis (Mitte), ais (rechts)!"}</p>
        ${baueKap9Klaviatur("checkKap9_3", true)}
      </div>`;
  };

  window.checkKap9_3 = (taste, midi) => {
    klavierAudio.spieleMidi(midi, 0.6);
    const ziel = runden.at(idx);
    if (taste === ziel) {
      idx++;
      render(`Volltreffer, das ist ${ziel}! ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Das war ${taste}. Gesucht ist ${ziel} (bei den 3 schwarzen Drillingen)!`);
    }
  };
  render();
}
// 9.4 Alle 5 Kreuz-Tasten gemischt (cis, dis, fis, gis, ais) (10 Runden)
function starteKap9AlleFuenf() {
  const runden = mischeZufallKap9(Array.of(
    "cis", "fis", "gis", "dis", "ais", "fis", "cis", "ais", "gis", "dis"
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap9_4", 190, "Schwarze-Tasten-Profi!", "Du findest alle 5 erhöhten Töne blitzschnell!");
      return;
    }
    const ziel = runden.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>9.4 Alle 5 Kreuz-Tasten</span><span>${idx + 1} / ${runden.length}</span></div>
        <h3 style="margin:10px 0; font-size:24px; color:#0f172a;">Tippe auf: <span style="color:#d97706;">${ziel}</span></h3>
        <p class="quiz-hint">${hinweis || "Zwillinge (cis, dis) oder Drillinge (fis, gis, ais) – tippe die richtige Taste!"}</p>
        ${baueKap9Klaviatur("checkKap9_4", false)}
      </div>`;
  };

  window.checkKap9_4 = (taste, midi) => {
    klavierAudio.spieleMidi(midi, 0.6);
    const ziel = runden.at(idx);
    if (taste === ziel) {
      idx++;
      render(`Perfekt, das war ${ziel}! ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Das war ${taste}. Tipp: Such zuerst den Stammton (ohne -is) und geh 1 Schritt nach rechts!`);
    }
  };
  render();
}

// 9.5 Boss-Challenge: Kreuz-Entdecker (10 Runden)
function starteKap9Boss() {
  const aufgaben = mischeZufallKap9(Array.of(
    { typ: "taste", ziel: "fis", frage: "Boss-Taste: Tippe auf fis (links bei den Drillingen)!" },
    { typ: "taste", ziel: "cis", frage: "Boss-Taste: Tippe auf cis (links bei den Zwillingen)!" },
    { typ: "taste", ziel: "ais", frage: "Boss-Taste: Tippe auf ais (rechts bei den Drillingen)!" },
    { typ: "taste", ziel: "dis", frage: "Boss-Taste: Tippe auf dis (rechts bei den Zwillingen)!" },
    { typ: "taste", ziel: "gis", frage: "Boss-Taste: Tippe auf gis (in der Mitte der Drillinge)!" },
    { typ: "quiz", frage: "Wohin schiebt das Kreuz (♯) einen Ton?", antwort: "rechts", opt: Array.of("rechts|➡️ Einen halben Schritt nach rechts (höher)", "links|⬅️ Einen halben Schritt nach links (tiefer)") },
    { typ: "quiz", frage: "Wie heisst G mit einem Kreuz (♯) davor?", antwort: "gis", opt: Array.of("gis|✨ gis", "ges|🎈 ges") },
    { typ: "quiz", frage: "Wie heisst D mit einem Kreuz (♯) davor?", antwort: "dis", opt: Array.of("dis|✨ dis", "des|🎈 des") },
    { typ: "taste", ziel: "fis", frage: "Boss-Taste: Tippe nochmals auf fis!" },
    { typ: "taste", ziel: "cis", frage: "Boss-Finale: Tippe auf cis!" }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap9_5", 230, "Kreuz-Entdecker Boss! 🏆", "Du beherrschst alle 5 Kreuz-Töne (cis, dis, fis, gis, ais) meisterhaft!");
      return;
    }
    const akt = aufgaben.at(idx);
    const bodyHTML = akt.typ === "taste"
      ? baueKap9Klaviatur("checkKap9BossTaste", false)
      : `<div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:16px;">
           ${akt.opt.map((e) => {
             const [v, l] = e.split("|");
             return `<button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap9BossQuiz('${v}')">${l}</button>`;
           }).join("")}
         </div>`;

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>9.5 Boss-Challenge: Kreuz-Töne</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <p class="quiz-hint" style="margin-top:14px;">${hinweis || akt.frage}</p>
        ${bodyHTML}
      </div>`;
  };

  window.checkKap9BossTaste = (taste, midi) => {
    klavierAudio.spieleMidi(midi, 0.6);
    const akt = aufgaben.at(idx);
    if (taste === akt.ziel) {
      idx++;
      render("Boss-Punkt geholt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render(`Das war ${taste}. Gesucht ist ${akt.ziel}!`);
    }
  };

  window.checkKap9BossQuiz = (wahl) => {
    if (wahl === aufgaben.at(idx).antwort) {
      klavierAudio.spieleMidi(66, 0.4);
      idx++;
      render("Boss-Punkt geholt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Merkregel: Kreuz (♯) = nach rechts (höher) + Endung «-is»!");
    }
  };
  render();
}
