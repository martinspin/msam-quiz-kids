// kapitel5.js – Stufe 1, Kapitel 5: Rhythmik (da, bon-bon, kau-gum-mi, gum-mi-bärch-en + Live-Tap-Groove)
function mischeZufallKap5(arr) {
  const kopie = arr.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function baueKap5RhythmusSVG(bausteine, takt = "4/4", playheadProzent = -1, trefferSet = null) {
  const breite = 560;
  const hoehe = 135;
  let svg = `<svg viewBox="0 0 ${breite} ${hoehe}" style="width:100%; max-width:520px; height:auto; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; display:block; margin:8px auto;">`;
  svg += `<line x1="20" y1="66" x2="${breite - 20}" y2="66" stroke="#94a3b8" stroke-width="2" />`;

  if (takt) {
    const [z, n] = takt.split("/");
    svg += `<text x="44" y="56" font-size="22" font-weight="800" fill="#0f172a" text-anchor="middle">${z}</text>`;
    svg += `<text x="44" y="82" font-size="22" font-weight="800" fill="#0f172a" text-anchor="middle">${n}</text>`;
  }

  const startX = takt ? 95 : 70;
  const nutzBreite = breite - startX - 45;
  const gesamtSchlaege = bausteine.reduce((sum, b) => sum + b.dauer, 0);
  let laufSchlag = 0;

  bausteine.forEach((b, i) => {
    const x = startX + (laufSchlag / Math.max(1, gesamtSchlaege)) * nutzBreite + 22;
    const farbe = trefferSet && trefferSet.has(i) ? "#16a34a" : "#1e293b";

    if (b.typ === "v") {
      svg += `<ellipse cx="${x}" cy="66" rx="11" ry="8" transform="rotate(-15 ${x} 66)" fill="${farbe}"/>`;
      svg += `<line x1="${x + 9.5}" y1="66" x2="${x + 9.5}" y2="22" stroke="${farbe}" stroke-width="3"/>`;
    } else if (b.typ === "h") {
      svg += `<ellipse cx="${x}" cy="66" rx="11" ry="8" transform="rotate(-15 ${x} 66)" fill="#fff" stroke="${farbe}" stroke-width="3"/>`;
      svg += `<line x1="${x + 9.5}" y1="66" x2="${x + 9.5}" y2="22" stroke="${farbe}" stroke-width="3"/>`;
    } else if (b.typ === "ph") {
      svg += `<ellipse cx="${x}" cy="66" rx="11" ry="8" transform="rotate(-15 ${x} 66)" fill="#fff" stroke="${farbe}" stroke-width="3"/>`;
      svg += `<line x1="${x + 9.5}" y1="66" x2="${x + 9.5}" y2="22" stroke="${farbe}" stroke-width="3"/>`;
      svg += `<circle cx="${x + 19}" cy="64" r="4" fill="${farbe}"/>`;
    } else if (b.typ === "g") {
      svg += `<ellipse cx="${x}" cy="66" rx="13" ry="8.5" fill="#fff" stroke="${farbe}" stroke-width="3.2"/>`;
    } else if (b.typ === "vp") {
      svg += `<path d="M ${x - 4} 44 L ${x + 6} 56 L ${x - 4} 66 L ${x + 5} 77 C ${x - 3} 81 ${x - 3} 89 ${x + 4} 92" fill="none" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/>`;
    }

    if (b.wort) {
      svg += `<text x="${x + 6}" y="116" font-size="14" font-weight="700" fill="${farbe}" text-anchor="middle">${b.wort}</text>`;
    }
    laufSchlag += b.dauer;
  });

  if (playheadProzent >= 0) {
    const px = startX + 16 + (playheadProzent / 100) * (nutzBreite - 10);
    svg += `<line x1="${px}" y1="14" x2="${px}" y2="122" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>`;
  }

  svg += `</svg>`;
  return svg;
}

function starteKap5Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap5Notenwerte();
  if (nummer === 2) starteKap5Zaehlen();
  if (nummer === 3) starteKap5LiveTap(false);
  if (nummer === 4) starteKap5LiveTap(true);
  if (nummer === 5 || nummer === 6) starteKap5Boss();
}

// 5.1 Süssigkeiten-Notenwerte (10 Runden)
function starteKap5Notenwerte() {
  const runden = mischeZufallKap5(Array.of(
    { bild: Array.of({ typ: "v", dauer: 1, wort: "" }), frage: "Welches Wort & wie viele Schläge hat diese Viertelnote?", antwort: "da" },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "" }), frage: "Welches Wort & wie viele Schläge hat diese Halbe Note?", antwort: "bon-bon" },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "" }), frage: "Welches Wort & wie viele Schläge hat die punktierte Halbe?", antwort: "kau-gum-mi" },
    { bild: Array.of({ typ: "g", dauer: 4, wort: "" }), frage: "Welches Wort & wie viele Schläge hat diese Ganze Note?", antwort: "gum-mi-bärch-en" },
    { bild: Array.of({ typ: "vp", dauer: 1, wort: "" }), frage: "Was bedeutet dieses Zeichen (Viertelpause)?", antwort: "sch" },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "" }), frage: "Ein hohler Notenkopf mit Hals dauert 2 Schläge – wie heisst das Wort?", antwort: "bon-bon" },
    { bild: Array.of({ typ: "g", dauer: 4, wort: "" }), frage: "Ein hohler Kreis ohne Hals dauert 4 Schläge – wie heisst das Wort?", antwort: "gum-mi-bärch-en" },
    { bild: Array.of({ typ: "v", dauer: 1, wort: "" }), frage: "Ein ausgefüllter Notenkopf mit Hals dauert 1 Schlag – wie heisst das Wort?", antwort: "da" },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "" }), frage: "Halbe Note mit Punkt daneben = 3 Schläge. Welches Wort passt?", antwort: "kau-gum-mi" },
    { bild: Array.of({ typ: "vp", dauer: 1, wort: "" }), frage: "1 Schlag lang ganz still sein heisst...", antwort: "sch" }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap5_1", 100, "Süssigkeiten-Profi!", "da, bon-bon, kau-gum-mi und gum-mi-bärch-en sitzen bombenfest!");
      return;
    }
    const akt = runden.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.1 Süssigkeiten-Notenwerte</span><span>${idx + 1} / ${runden.length}</span></div>
        ${baueKap5RhythmusSVG(akt.bild, "")}
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap5_1('da')">1️⃣ da (1 Schlag)</button>
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap5_1('bon-bon')">2️⃣ bon-bon (2 Schläge)</button>
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap5_1('kau-gum-mi')">3️⃣ kau-gum-mi (3 Schläge)</button>
          <button class="answer-btn" style="background:#ede9fe; border-color:#7c3aed; color:#4c1d95;" onclick="checkKap5_1('gum-mi-bärch-en')">4️⃣ gum-mi-bärch-en (4 Schläge)</button>
          <button class="answer-btn" style="grid-column:span 2; background:#f1f5f9; border-color:#64748b; color:#334155;" onclick="checkKap5_1('sch')">🤫 sch (1 Schlag Pause)</button>
        </div>
      </div>`;
  };

  window.checkKap5_1 = (wahl) => {
    if (wahl === runden.at(idx).antwort) {
      klavierAudio.spieleMidi(67, 0.35);
      idx++;
      render("Goldrichtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Zähle die Silben mit: da (1), bon-bon (2), kau-gum-mi (3), gum-mi-bärch-en (4)!");
    }
  };
  render();
}
// 5.2 Schläge zusammenzählen im 2/4, 3/4 und 4/4-Takt (10 Runden)
function starteKap5Zaehlen() {
  const runden = mischeZufallKap5(Array.of(
    { bild: Array.of({ typ: "v", dauer: 1, wort: "da" }, { typ: "v", dauer: 1, wort: "da" }), antwort: "2" },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "bon-bon" }, { typ: "v", dauer: 1, wort: "da" }), antwort: "3" },
    { bild: Array.of({ typ: "g", dauer: 4, wort: "gum-mi-bärch-en" }), antwort: "4" },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "kau-gum-mi" }), antwort: "3" },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "bon-bon" }, { typ: "h", dauer: 2, wort: "bon-bon" }), antwort: "4" },
    { bild: Array.of({ typ: "v", dauer: 1, wort: "da" }, { typ: "vp", dauer: 1, wort: "sch" }), antwort: "2" },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "kau-gum-mi" }, { typ: "v", dauer: 1, wort: "da" }), antwort: "4" },
    { bild: Array.of({ typ: "v", dauer: 1, wort: "da" }, { typ: "h", dauer: 2, wort: "bon-bon" }), antwort: "3" },
    { bild: Array.of({ typ: "v", dauer: 1, wort: "da" }, { typ: "vp", dauer: 1, wort: "sch" }, { typ: "h", dauer: 2, wort: "bon-bon" }), antwort: "4" },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "bon-bon" }), antwort: "2" }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap5_2", 120, "Takt-Meister!", "Du zählst 2er-, 3er- und 4er-Takte im Schlaf zusammen!");
      return;
    }
    const akt = runden.at(idx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.2 Schläge zusammenzählen</span><span>${idx + 1} / ${runden.length}</span></div>
        ${baueKap5RhythmusSVG(akt.bild, "")}
        <p class="quiz-hint">${hinweis || "Wie viele Schläge hat dieser Takt insgesamt?"}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:16px;">
          <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap5_2('2')">2️⃣ 2 Schläge (2/4)</button>
          <button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap5_2('3')">3️⃣ 3 Schläge (3/4)</button>
          <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e;" onclick="checkKap5_2('4')">4️⃣ 4 Schläge (4/4)</button>
        </div>
      </div>`;
  };

  window.checkKap5_2 = (wahl) => {
    if (wahl === runden.at(idx).antwort) {
      klavierAudio.spieleMidi(69, 0.35);
      idx++;
      render("Perfekt gezählt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Tipp: Zähle einfach alle Silben unter den Noten zusammen!");
    }
  };
  render();
}
function starteKap5Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap5Notenwerte();
  if (nummer === 2) starteKap5Zaehlen();
  if (nummer === 3) starteKap5SongTrackViertel();
  if (nummer === 4) starteKap5SongTrackLangeNoten();
  if (nummer === 5 || nummer === 6) starteKap5Boss();
}

// 5.3 Duolingo-Song-Track: Viertel & Pause (da & sch)
function starteKap5SongTrackViertel() {
  const songs = Array.of(
    { titel: "5.3 Da-Da-Start (4/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }) },
    { titel: "5.3 Pausen-Hüpfer (3/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }) }
  );

  let songIdx = 0, animId = null, aktiv = false, startZeit = 0, notenListe = Array.of(), punkte = 0;
  const zielPunkte = 10, beatMs = 660, pxProBeat = 105, zielX = 85;
  const stopSong = () => { aktiv = false; if (animId) cancelAnimationFrame(animId); };

  const starteSong = () => {
    stopSong();
    const song = songs.at(songIdx % songs.length);
    let beat = 3;
    notenListe = song.seq.map((n, i) => { const o = { id: i, t: n.t, d: n.d, w: n.w, beat, status: "offen" }; beat += n.d; return o; });
    const gesamtBeats = beat + 1;
    const melodie = Array.of(60, 64, 67, 64, 65, 69, 67, 62, 64, 67, 72, 67);

    for (let b = 0; b < gesamtBeats; b++) {
      setTimeout(() => {
        if (!aktiv || !document.getElementById("kap5-track-svg-3")) return;
        klavierAudio.spieleMidi(b < 3 ? 76 : melodie.at(b % melodie.length), 0.35, b < 3 ? 0.3 : 0.45);
      }, b * beatMs);
    }

    startZeit = performance.now();
    aktiv = true;
    const loop = (jetzt) => {
      if (!aktiv || !document.getElementById("kap5-track-svg-3")) return;
      const aktBeat = (jetzt - startZeit) / beatMs;
      let svg = `<line x1="20" y1="68" x2="540" y2="68" stroke="#cbd5e1" stroke-width="3"/><rect x="${zielX - 24}" y="16" width="48" height="104" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>`;

      notenListe.forEach((n) => {
        const x = zielX + (n.beat - aktBeat) * pxProBeat;
        if (n.status === "offen" && aktBeat - n.beat > 0.48) n.status = n.t === "vp" ? "ok" : "verpasst";
        if (x < -40 || x > 580) return;
        const f = n.status === "ok" ? "#16a34a" : n.status === "verpasst" ? "#ef4444" : "#1e293b";
        if (n.t === "v") svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="${f}"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
        else svg += `<path d="M ${x - 4} 46 L ${x + 6} 58 L ${x - 4} 68 L ${x + 5} 79" fill="none" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/>`;
        svg += `<text x="${x + 5}" y="114" font-size="13" font-weight="800" fill="${f}" text-anchor="middle">${n.w}</text>`;
      });

      const el = document.getElementById("kap5-track-svg-3");
      if (el) el.innerHTML = svg;
      if (aktBeat >= gesamtBeats) {
        stopSong();
        if (punkte >= zielPunkte) { window.onkeydown = null; abschliessenSpiel("kap5_3", 140, "Viertel-Track-Star! 🥁", "Du hast alle da-Noten im Song-Fluss gefangen!"); }
        else { songIdx++; renderUI(`Noch ${zielPunkte - punkte} Treffer bis zum Ziel!`); }
        return;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
  };

  const renderUI = (msg = "") => {
    const song = songs.at(songIdx % songs.length);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>${song.titel}</span><span>⭐ ${punkte} / ${zielPunkte} Treffer</span></div>
        <svg id="kap5-track-svg-3" viewBox="0 0 560 132" style="width:100%; max-width:520px; height:auto; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; display:block; margin:8px auto;"></svg>
        <p id="kap5-msg-3" class="quiz-hint" style="font-weight:700;">${msg || "Tippe im gelben Feld auf «da» – bei «sch» nicht tippen!"}</p>
        <button id="kap5-pad-3" onpointerdown="trefferKap5Track3()" style="width:100%; max-width:350px; height:120px; margin-top:8px; border-radius:22px; border:3px solid #16a34a; background:linear-gradient(135deg,#22c55e,#15803d); color:#fff; font-size:25px; font-weight:900; box-shadow:0 6px 0 #14532d; cursor:pointer; touch-action:manipulation;">🥁 TAP! (oder Leertaste)</button>
      </div>`;
    setTimeout(starteSong, 300);
  };

  window.trefferKap5Track3 = () => {
    klavierAudio.spieleMidi(72, 0.3, 1.0);
    if (!aktiv) return;
    const aktBeat = (performance.now() - startZeit) / beatMs;
    const k = notenListe.find((n) => n.status === "offen" && Math.abs(aktBeat - n.beat) <= 0.48);
    const msgEl = document.getElementById("kap5-msg-3");
    if (!k) return;
    if (k.t === "vp") { k.status = "verpasst"; klavierAudio.spieleQuietsch(); if (msgEl) msgEl.textContent = "🤫 Bei «sch» ist Pause!"; }
    else { k.status = "ok"; punkte = Math.min(zielPunkte, punkte + 1); if (msgEl) msgEl.textContent = `🔥 PERFEKT! (${punkte} / ${zielPunkte})`; }
  };
  window.onkeydown = (e) => { if (e.code === "Space" && document.getElementById("kap5-pad-3")) { e.preventDefault(); window.trefferKap5Track3(); } };
  renderUI();
}
function starteKap5Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap5Notenwerte();
  if (nummer === 2) starteKap5Zaehlen();
  if (nummer === 3) starteKap5SongTrackViertel();
  if (nummer === 4) starteKap5SongTrackLangeNoten();
  if (nummer === 5 || nummer === 6) starteKap5Boss();
}

// 5.3 Duolingo-Song-Track: 5 entspannte Songs mit Vierteln (da) & Pausen (sch)
function starteKap5SongTrackViertel() {
  const songs = Array.of(
    { titel: "Song 1/5: Gemütlicher Start (4/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }) },
    { titel: "Song 2/5: Erste Pause (4/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }) },
    { titel: "Song 3/5: Walzer-Schritt (3/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }) },
    { titel: "Song 4/5: Echo-Hüpfer (4/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }) },
    { titel: "Song 5/5: Finale (4/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }) }
  );

  let songIdx = 0, animId = null, aktiv = false, startZeit = 0, notenListe = Array.of();
  const beatMs = 880, pxProBeat = 95, zielX = 85;
  const stopSong = () => { aktiv = false; if (animId) cancelAnimationFrame(animId); };

  const starteSong = () => {
    stopSong();
    const song = songs.at(songIdx);
    let beat = 3;
    notenListe = song.seq.map((n, i) => { const o = { id: i, t: n.t, d: n.d, w: n.w, beat, status: "offen" }; beat += n.d; return o; });
    const gesamtBeats = beat + 1;
    const melodie = Array.of(60, 64, 67, 64, 65, 69, 67, 62, 64, 67, 72, 67);

    for (let b = 0; b < gesamtBeats; b++) {
      setTimeout(() => {
        if (!aktiv || !document.getElementById("kap5-track-svg-3")) return;
        klavierAudio.spieleMidi(b < 3 ? 76 : melodie.at(b % melodie.length), 0.35, b < 3 ? 0.3 : 0.45);
      }, b * beatMs);
    }

    startZeit = performance.now();
    aktiv = true;
    const loop = (jetzt) => {
      if (!aktiv || !document.getElementById("kap5-track-svg-3")) return;
      const aktBeat = (jetzt - startZeit) / beatMs;
      let svg = `<line x1="20" y1="68" x2="540" y2="68" stroke="#cbd5e1" stroke-width="3"/><rect x="${zielX - 28}" y="16" width="56" height="104" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>`;

      notenListe.forEach((n) => {
        const x = zielX + (n.beat - aktBeat) * pxProBeat;
        if (n.status === "offen" && aktBeat - n.beat > 0.58) n.status = n.t === "vp" ? "ok" : "verpasst";
        if (x < -40 || x > 580) return;
        const f = n.status === "ok" ? "#16a34a" : n.status === "verpasst" ? "#ef4444" : "#1e293b";
        if (n.t === "v") svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="${f}"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
        else svg += `<path d="M ${x - 4} 46 L ${x + 6} 58 L ${x - 4} 68 L ${x + 5} 79" fill="none" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/>`;
        svg += `<text x="${x + 5}" y="114" font-size="13" font-weight="800" fill="${f}" text-anchor="middle">${n.w}</text>`;
      });

      const el = document.getElementById("kap5-track-svg-3");
      if (el) el.innerHTML = svg;
      if (aktBeat >= gesamtBeats) {
        stopSong();
        const verpasst = notenListe.filter((n) => n.status === "verpasst").length;
        if (verpasst <= 1) {
          songIdx++;
          if (songIdx >= songs.length) {
            window.onkeydown = null;
            abschliessenSpiel("kap5_3", 140, "5-Song-Champion! 🥁", "Du hast alle 5 Songs mit Vierteln und Pausen gemeistert!");
          } else {
            renderUI(`Super! Song ${songIdx}/5 geschafft – auf zum nächsten! ✅`);
          }
        } else {
          renderUI("Fast! Probieren wir diesen Song gleich nochmals gemütlich.");
        }
        return;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
  };

  const renderUI = (msg = "") => {
    const song = songs.at(songIdx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>${song.titel}</span><span>Song ${songIdx + 1} / ${songs.length}</span></div>
        <svg id="kap5-track-svg-3" viewBox="0 0 560 132" style="width:100%; max-width:520px; height:auto; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; display:block; margin:8px auto;"></svg>
        <p id="kap5-msg-3" class="quiz-hint" style="font-weight:700;">${msg || "Tippe ganz entspannt im gelben Feld auf «da» – bei «sch» nicht tippen!"}</p>
        <button id="kap5-pad-3" onpointerdown="trefferKap5Track3()" style="width:100%; max-width:350px; height:120px; margin-top:8px; border-radius:22px; border:3px solid #16a34a; background:linear-gradient(135deg,#22c55e,#15803d); color:#fff; font-size:25px; font-weight:900; box-shadow:0 6px 0 #14532d; cursor:pointer; touch-action:manipulation;">🥁 TAP! (oder Leertaste)</button>
      </div>`;
    setTimeout(starteSong, 350);
  };

  window.trefferKap5Track3 = () => {
    klavierAudio.spieleMidi(72, 0.3, 1.0);
    if (!aktiv) return;
    const aktBeat = (performance.now() - startZeit) / beatMs;
    const k = notenListe.find((n) => n.status === "offen" && Math.abs(aktBeat - n.beat) <= 0.58);
    const msgEl = document.getElementById("kap5-msg-3");
    if (!k) return;
    if (k.t === "vp") { k.status = "verpasst"; klavierAudio.spieleQuietsch(); if (msgEl) msgEl.textContent = "🤫 Bei «sch» ist Pause!"; }
    else { k.status = "ok"; if (msgEl) msgEl.textContent = "🔥 PERFEKT!"; }
  };
  window.onkeydown = (e) => { if (e.code === "Space" && document.getElementById("kap5-pad-3")) { e.preventDefault(); window.trefferKap5Track3(); } };
  renderUI();
}
// 5.4 Duolingo-Song-Track: 5 entspannte Songs mit langen Noten (bon-bon, kau-gum-mi, gum-mi-bärch-en)
function starteKap5SongTrackLangeNoten() {
  const songs = Array.of(
    { titel: "Song 1/5: Bon-Bon Einstieg (4/4)", seq: Array.of({ t: "h", d: 2, w: "bon-bon" }, { t: "h", d: 2, w: "bon-bon" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }) },
    { titel: "Song 2/5: Kaugummi-Walzer (3/4)", seq: Array.of({ t: "ph", d: 3, w: "kau-gum-mi" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "ph", d: 3, w: "kau-gum-mi" }) },
    { titel: "Song 3/5: Gummibärchen-Riese (4/4)", seq: Array.of({ t: "g", d: 4, w: "gum-mi-bärch-en" }, { t: "h", d: 2, w: "bon-bon" }, { t: "h", d: 2, w: "bon-bon" }, { t: "g", d: 4, w: "gum-mi-bärch-en" }) },
    { titel: "Song 4/5: Süssigkeiten-Mix (4/4)", seq: Array.of({ t: "ph", d: 3, w: "kau-gum-mi" }, { t: "v", d: 1, w: "da" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }) },
    { titel: "Song 5/5: Lange-Noten-Finale (4/4)", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "g", d: 4, w: "gum-mi-bärch-en" }, { t: "ph", d: 3, w: "kau-gum-mi" }, { t: "vp", d: 1, w: "sch" }) }
  );

  let songIdx = 0, animId = null, aktiv = false, startZeit = 0, notenListe = Array.of();
  const beatMs = 880, pxProBeat = 95, zielX = 85;
  const stopSong = () => { aktiv = false; if (animId) cancelAnimationFrame(animId); };

  const starteSong = () => {
    stopSong();
    const song = songs.at(songIdx);
    let beat = 3;
    notenListe = song.seq.map((n, i) => { const o = { id: i, t: n.t, d: n.d, w: n.w, beat, status: "offen" }; beat += n.d; return o; });
    const gesamtBeats = beat + 1;
    const melodie = Array.of(60, 64, 67, 64, 65, 69, 67, 62, 64, 67, 72, 67);

    for (let b = 0; b < gesamtBeats; b++) {
      setTimeout(() => {
        if (!aktiv || !document.getElementById("kap5-track-svg-4")) return;
        klavierAudio.spieleMidi(b < 3 ? 76 : melodie.at(b % melodie.length), 0.35, b < 3 ? 0.3 : 0.45);
      }, b * beatMs);
    }

    startZeit = performance.now();
    aktiv = true;
    const loop = (jetzt) => {
      if (!aktiv || !document.getElementById("kap5-track-svg-4")) return;
      const aktBeat = (jetzt - startZeit) / beatMs;
      let svg = `<line x1="20" y1="68" x2="540" y2="68" stroke="#cbd5e1" stroke-width="3"/><rect x="${zielX - 28}" y="16" width="56" height="104" rx="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>`;

      notenListe.forEach((n) => {
        const x = zielX + (n.beat - aktBeat) * pxProBeat;
        if (n.status === "offen" && aktBeat - n.beat > 0.58) n.status = n.t === "vp" ? "ok" : "verpasst";
        if (x < -40 || x > 580) return;
        const f = n.status === "ok" ? "#16a34a" : n.status === "verpasst" ? "#ef4444" : "#1e293b";
        if (n.t === "v") svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="${f}"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
        else if (n.t === "h" || n.t === "ph") {
          svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="#fff" stroke="${f}" stroke-width="3"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
          if (n.t === "ph") svg += `<circle cx="${x + 19}" cy="66" r="4" fill="${f}"/>`;
        } else if (n.t === "g") svg += `<ellipse cx="${x}" cy="68" rx="13" ry="8.5" fill="#fff" stroke="${f}" stroke-width="3.2"/>`;
        else svg += `<path d="M ${x - 4} 46 L ${x + 6} 58 L ${x - 4} 68 L ${x + 5} 79" fill="none" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/>`;
        svg += `<text x="${x + 5}" y="114" font-size="13" font-weight="800" fill="${f}" text-anchor="middle">${n.w}</text>`;
      });

      const el = document.getElementById("kap5-track-svg-4");
      if (el) el.innerHTML = svg;
      if (aktBeat >= gesamtBeats) {
        stopSong();
        const verpasst = notenListe.filter((n) => n.status === "verpasst").length;
        if (verpasst <= 1) {
          songIdx++;
          if (songIdx >= songs.length) {
            window.onkeydown = null;
            abschliessenSpiel("kap5_4", 160, "Lange-Noten-Champion! 🎸", "Alle 5 Songs mit bon-bon, kau-gum-mi und gum-mi-bärch-en gemeistert!");
          } else {
            renderUI(`Super! Song ${songIdx}/5 geschafft – weiter geht's! ✅`);
          }
        } else {
          renderUI("Fast! Probieren wir diesen Song gleich nochmals gemütlich.");
        }
        return;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
  };

  const renderUI = (msg = "") => {
    const song = songs.at(songIdx);
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>${song.titel}</span><span>Song ${songIdx + 1} / ${songs.length}</span></div>
        <svg id="kap5-track-svg-4" viewBox="0 0 560 132" style="width:100%; max-width:520px; height:auto; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; display:block; margin:8px auto;"></svg>
        <p id="kap5-msg-4" class="quiz-hint" style="font-weight:700;">${msg || "Tippe ganz entspannt am Anfang jeder Note im blauen Ziel-Feld!"}</p>
        <button id="kap5-pad-4" onpointerdown="trefferKap5Track4()" style="width:100%; max-width:350px; height:120px; margin-top:8px; border-radius:22px; border:3px solid #0284c7; background:linear-gradient(135deg,#0ea5e9,#0369a1); color:#fff; font-size:25px; font-weight:900; box-shadow:0 6px 0 #0c4a6e; cursor:pointer; touch-action:manipulation;">🥁 TAP! (oder Leertaste)</button>
      </div>`;
    setTimeout(starteSong, 350);
  };

  window.trefferKap5Track4 = () => {
    klavierAudio.spieleMidi(72, 0.3, 1.0);
    if (!aktiv) return;
    const aktBeat = (performance.now() - startZeit) / beatMs;
    const k = notenListe.find((n) => n.status === "offen" && Math.abs(aktBeat - n.beat) <= 0.58);
    const msgEl = document.getElementById("kap5-msg-4");
    if (!k) return;
    if (k.t === "vp") { k.status = "verpasst"; klavierAudio.spieleQuietsch(); if (msgEl) msgEl.textContent = "🤫 Bei «sch» ist Pause!"; }
    else { k.status = "ok"; if (msgEl) msgEl.textContent = "🔥 PERFEKT!"; }
  };
  window.onkeydown = (e) => { if (e.code === "Space" && document.getElementById("kap5-pad-4")) { e.preventDefault(); window.trefferKap5Track4(); } };
  renderUI();
}
// 5.5 Boss-Challenge: 5 Blitz-Fragen + 3 gemütliche Boss-Songs mit allen Süssigkeiten-Noten!
function starteKap5Boss() {
  const aufgaben = mischeZufallKap5(Array.of(
    { bild: Array.of({ typ: "g", dauer: 4, wort: "" }), frage: "Boss-Check 1/5: Wie heisst dieses 4-Schlag-Wort?", antwort: "gum-mi-bärch-en", opt: Array.of("gum-mi-bärch-en|4️⃣ gum-mi-bärch-en", "kau-gum-mi|3️⃣ kau-gum-mi") },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "" }), frage: "Boss-Check 2/5: Wie viele Schläge hat «kau-gum-mi»?", antwort: "3", opt: Array.of("3|3️⃣ 3 Schläge", "2|2️⃣ 2 Schläge") },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "bon-bon" }, { typ: "v", dauer: 1, wort: "da" }), frage: "Boss-Check 3/5: «bon-bon» + «da» ergeben welchen Takt?", antwort: "3", opt: Array.of("3|3️⃣ 3/4-Takt (3 Schläge)", "4|4️⃣ 4/4-Takt (4 Schläge)") },
    { bild: Array.of({ typ: "v", dauer: 1, wort: "da" }, { typ: "vp", dauer: 1, wort: "sch" }), frage: "Boss-Check 4/5: Was machst du bei «sch»?", antwort: "pause", opt: Array.of("pause|🤫 1 Schlag Pause", "lang|🎵 Lang spielen") },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "kau-gum-mi" }, { typ: "v", dauer: 1, wort: "da" }), frage: "Boss-Check 5/5: «kau-gum-mi» (3) + «da» (1) = ?", antwort: "4", opt: Array.of("4|4️⃣ 4 Schläge", "3|3️⃣ 3 Schläge") }
  ));
  let idx = 0;

  const renderFrage = (hinweis = "") => {
    if (idx >= aufgaben.length) {
      starteBossFinaleSongs();
      return;
    }
    const akt = aufgaben.at(idx);
    const btns = akt.opt.map((e) => {
      const [v, l] = e.split("|");
      return `<button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;" onclick="checkKap5Boss('${v}')">${l}</button>`;
    }).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.5 Boss Phase 1: Blitz-Check</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        ${baueKap5RhythmusSVG(akt.bild, "")}
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${btns}</div>
      </div>`;
  };

  window.checkKap5Boss = (wahl) => {
    if (wahl === aufgaben.at(idx).antwort) {
      klavierAudio.spieleMidi(72, 0.3);
      idx++;
      renderFrage("Treffer! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      renderFrage("Zähle die Silben mit: da (1), bon-bon (2), kau-gum-mi (3), gum-mi-bärch-en (4)!");
    }
  };

  const starteBossFinaleSongs = () => {
    const songs = Array.of(
      { titel: "Boss-Song 1/3: Süssigkeiten-Mix", seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "h", d: 2, w: "bon-bon" }, { t: "vp", d: 1, w: "sch" }, { t: "ph", d: 3, w: "kau-gum-mi" }, { t: "v", d: 1, w: "da" }) },
      { titel: "Boss-Song 2/3: Gummibärchen-Tanz", seq: Array.of({ t: "g", d: 4, w: "gum-mi-bärch-en" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "h", d: 2, w: "bon-bon" }) },
      { titel: "Boss-Song 3/3: Meister-Medley", seq: Array.of({ t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "g", d: 4, w: "gum-mi-bärch-en" }, { t: "ph", d: 3, w: "kau-gum-mi" }, { t: "v", d: 1, w: "da" }) }
    );
    let songIdx = 0, animId = null, aktiv = false, startZeit = 0, noten = Array.of();
    const beatMs = 860, pxProBeat = 95, zielX = 85;
    const stopBoss = () => { aktiv = false; if (animId) cancelAnimationFrame(animId); };

    const starteLauf = () => {
      stopBoss();
      const song = songs.at(songIdx);
      let beat = 3;
      noten = song.seq.map((n, i) => { const o = { id: i, t: n.t, d: n.d, w: n.w, beat, status: "offen" }; beat += n.d; return o; });
      const gesamtBeats = beat + 1;
      const melodie = Array.of(60, 64, 67, 72, 69, 67, 64, 62, 65, 69, 72, 67);

      for (let b = 0; b < gesamtBeats; b++) {
        setTimeout(() => {
          if (!aktiv || !document.getElementById("kap5-boss-svg")) return;
          klavierAudio.spieleMidi(b < 3 ? 76 : melodie.at(b % melodie.length), 0.35, b < 3 ? 0.3 : 0.45);
        }, b * beatMs);
      }

      startZeit = performance.now();
      aktiv = true;
      const loop = (jetzt) => {
        if (!aktiv || !document.getElementById("kap5-boss-svg")) return;
        const aktBeat = (jetzt - startZeit) / beatMs;
        let svg = `<line x1="20" y1="68" x2="540" y2="68" stroke="#cbd5e1" stroke-width="3"/><rect x="${zielX - 28}" y="16" width="56" height="104" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="3.5"/>`;

        noten.forEach((n) => {
          const x = zielX + (n.beat - aktBeat) * pxProBeat;
          if (n.status === "offen" && aktBeat - n.beat > 0.58) n.status = n.t === "vp" ? "ok" : "verpasst";
          if (x < -40 || x > 580) return;
          const f = n.status === "ok" ? "#16a34a" : n.status === "verpasst" ? "#ef4444" : "#1e293b";
          if (n.t === "v") svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="${f}"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
          else if (n.t === "h" || n.t === "ph") {
            svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="#fff" stroke="${f}" stroke-width="3"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
            if (n.t === "ph") svg += `<circle cx="${x + 19}" cy="66" r="4" fill="${f}"/>`;
          } else if (n.t === "g") svg += `<ellipse cx="${x}" cy="68" rx="13" ry="8.5" fill="#fff" stroke="${f}" stroke-width="3.2"/>`;
          else svg += `<path d="M ${x - 4} 46 L ${x + 6} 58 L ${x - 4} 68 L ${x + 5} 79" fill="none" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/>`;
          svg += `<text x="${x + 5}" y="114" font-size="13" font-weight="800" fill="${f}" text-anchor="middle">${n.w}</text>`;
        });

        const el = document.getElementById("kap5-boss-svg");
        if (el) el.innerHTML = svg;
        if (aktBeat >= gesamtBeats) {
          stopBoss();
          const verpasst = noten.filter((n) => n.status === "verpasst").length;
          if (verpasst <= 1) {
            songIdx++;
            if (songIdx >= songs.length) {
              window.onkeydown = null;
              abschliessenSpiel("kap5_5", 200, "Rhythmus-Entdecker Boss! 🏆", "Blitz-Check UND alle 3 Boss-Songs gemeistert!");
            } else {
              renderBossUI(`Boss-Song ${songIdx}/3 geschafft – auf zum nächsten! 🏆`);
            }
          } else {
            renderBossUI("Fast! Probieren wir diesen Boss-Song gleich nochmals.");
          }
          return;
        }
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    };

    const renderBossUI = (msg = "") => {
      const song = songs.at(songIdx);
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>5.5 ${song.titel}</span><span>Song ${songIdx + 1} / ${songs.length}</span></div>
          <svg id="kap5-boss-svg" viewBox="0 0 560 132" style="width:100%; max-width:520px; height:auto; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; display:block; margin:8px auto;"></svg>
          <p id="kap5-boss-msg" class="quiz-hint" style="font-weight:700;">${msg || "Alle Notenwerte gemischt – tappe im goldenen Feld!"}</p>
          <button id="kap5-boss-pad" onpointerdown="trefferKap5BossTrack()" style="width:100%; max-width:350px; height:120px; margin-top:8px; border-radius:22px; border:3px solid #d97706; background:linear-gradient(135deg,#f59e0b,#b45309); color:#fff; font-size:25px; font-weight:900; box-shadow:0 6px 0 #78350f; cursor:pointer; touch-action:manipulation;">🏆 BOSS-TAP! (oder Leertaste)</button>
        </div>`;
      setTimeout(starteLauf, 350);
    };

    window.trefferKap5BossTrack = () => {
      klavierAudio.spieleMidi(76, 0.3, 1.0);
      if (!aktiv) return;
      const aktBeat = (performance.now() - startZeit) / beatMs;
      const k = noten.find((n) => n.status === "offen" && Math.abs(aktBeat - n.beat) <= 0.58);
      const msgEl = document.getElementById("kap5-boss-msg");
      if (!k) return;
      if (k.t === "vp") { k.status = "verpasst"; klavierAudio.spieleQuietsch(); if (msgEl) msgEl.textContent = "🤫 Bei «sch» nicht tippen!"; }
      else { k.status = "ok"; if (msgEl) msgEl.textContent = "🏆 BOSS-TREFFER!"; }
    };
    window.onkeydown = (e) => { if (e.code === "Space" && document.getElementById("kap5-boss-pad")) { e.preventDefault(); window.trefferKap5BossTrack(); } };
    renderBossUI();
  };

  renderFrage();
}
