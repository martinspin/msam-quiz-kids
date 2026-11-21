// kapitel5.js – Stufe 1, Kapitel 5: Rhythmus & Notenwerte (nutzt zentrale audio.js)
function mischeZufallKap5(arr) {
  const kopie = arr.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function baueKap5RhythmusSVG(bausteine, takt = "4/4") {
  const breite = 560, hoehe = 135;
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

  bausteine.forEach((b) => {
    const x = startX + (laufSchlag / Math.max(1, gesamtSchlaege)) * nutzBreite + 20;
    const f = "#1e293b";
    if (b.typ === "v") {
      svg += `<ellipse cx="${x}" cy="66" rx="10.5" ry="7.8" transform="rotate(-15 ${x} 66)" fill="${f}"/><line x1="${x + 9}" y1="66" x2="${x + 9}" y2="22" stroke="${f}" stroke-width="3"/>`;
    } else if (b.typ === "h" || b.typ === "ph") {
      svg += `<ellipse cx="${x}" cy="66" rx="10.5" ry="7.8" transform="rotate(-15 ${x} 66)" fill="#fff" stroke="${f}" stroke-width="3"/><line x1="${x + 9}" y1="66" x2="${x + 9}" y2="22" stroke="${f}" stroke-width="3"/>`;
      if (b.typ === "ph") svg += `<circle cx="${x + 19}" cy="64" r="4" fill="${f}"/>`;
    } else if (b.typ === "g") {
      svg += `<ellipse cx="${x}" cy="66" rx="13" ry="8.5" fill="#fff" stroke="${f}" stroke-width="3.2"/>`;
    } else if (b.typ === "vp") {
      svg += `<path d="M ${x - 4} 44 L ${x + 6} 56 L ${x - 4} 66 L ${x + 5} 77 C ${x - 3} 81 ${x - 3} 89 ${x + 4} 92" fill="none" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/>`;
    }
    if (b.wort) svg += `<text x="${x + 6}" y="116" font-size="14" font-weight="700" fill="${f}" text-anchor="middle">${b.wort}</text>`;
    laufSchlag += b.dauer;
  });
  return `${svg}</svg>`;
}

function starteKap5Spiel(nummer) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  if (nummer === 1) starteKap5Notenwerte();
  if (nummer === 2) starteKap5Zaehlen();
  if (nummer === 3) starteKap5SongTrackViertel();
  if (nummer === 4) starteKap5SongTrackLangeNoten();
  if (nummer === 5 || nummer === 6) starteKap5Boss();
}

// 5.1 Süssigkeiten-Notenwerte kennenlernen
function starteKap5Notenwerte() {
  const fragen = mischeZufallKap5(Array.of(
    { bild: Array.of({ typ: "v", dauer: 1, wort: "" }), frage: "Wie heisst diese Note (1 Schlag)?", antwort: "da", opt: Array.of("da|1️⃣ da", "bon-bon|2️⃣ bon-bon") },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "" }), frage: "Wie heisst diese weisse Note mit Hals (2 Schläge)?", antwort: "bon-bon", opt: Array.of("bon-bon|2️⃣ bon-bon", "da|1️⃣ da") },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "" }), frage: "Weisse Note mit Hals UND Punkt (3 Schläge) – wie heisst sie?", antwort: "kau-gum-mi", opt: Array.of("kau-gum-mi|3️⃣ kau-gum-mi", "gum-mi-bärch-en|4️⃣ gum-mi-bärch-en") },
    { bild: Array.of({ typ: "g", dauer: 4, wort: "" }), frage: "Grosser Kreis ohne Hals (4 Schläge) – wie heisst sie?", antwort: "gum-mi-bärch-en", opt: Array.of("gum-mi-bärch-en|4️⃣ gum-mi-bärch-en", "bon-bon|2️⃣ bon-bon") },
    { bild: Array.of({ typ: "vp", dauer: 1, wort: "" }), frage: "Der Blitz ist eine Pause (1 Schlag). Was sagen wir?", antwort: "sch", opt: Array.of("sch|🤫 sch (1 Schlag Pause)", "da|1️⃣ da") },
    { bild: Array.of({ typ: "h", dauer: 2, wort: "" }), frage: "Wie viele Schläge dauert «bon-bon»?", antwort: "2", opt: Array.of("2|2️⃣ 2 Schläge", "4|4️⃣ 4 Schläge") },
    { bild: Array.of({ typ: "ph", dauer: 3, wort: "" }), frage: "Wie viele Schläge dauert «kau-gum-mi»?", antwort: "3", opt: Array.of("3|3️⃣ 3 Schläge", "2|2️⃣ 2 Schläge") },
    { bild: Array.of({ typ: "g", dauer: 4, wort: "" }), frage: "Wie viele Schläge dauert «gum-mi-bärch-en»?", antwort: "4", opt: Array.of("4|4️⃣ 4 Schläge", "3|3️⃣ 3 Schläge") },
    { bild: Array.of({ typ: "v", dauer: 1, wort: "" }), frage: "Wie viele Schläge dauert «da»?", antwort: "1", opt: Array.of("1|1️⃣ 1 Schlag", "2|2️⃣ 2 Schläge") },
    { bild: Array.of({ typ: "vp", dauer: 1, wort: "" }), frage: "Wie lange dauert die «sch»-Pause?", antwort: "1", opt: Array.of("1|1️⃣ 1 Schlag leise sein", "3|3️⃣ 3 Schläge") }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= fragen.length) {
      abschliessenSpiel("kap5_1", 100, "Süssigkeiten-Profi! 🍬", "da, bon-bon, kau-gum-mi, gum-mi-bärch-en und sch sitzen perfekt!");
      return;
    }
    const akt = fragen.at(idx);
    const btns = akt.opt.map((e) => {
      const [v, l] = e.split("|");
      return `<button class="answer-btn" style="background:#dcfce7; border-color:#16a34a; color:#14532d;" onclick="checkKap5_1('${v}')">${l}</button>`;
    }).join("");
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>5.1 Süssigkeiten-Notenwerte</span><span>${idx + 1} / ${fragen.length}</span></div>
        ${baueKap5RhythmusSVG(akt.bild, "")}
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${btns}</div>
      </div>`;
  };

  window.checkKap5_1 = (wahl) => {
    if (wahl === fragen.at(idx).antwort) { klavierAudio.spieleMidi(67, 0.35); idx++; render("Super! ✅"); }
    else { klavierAudio.spieleQuietsch(); render("Merkhilfe: da (1), bon-bon (2), kau-gum-mi (3), gum-mi-bärch-en (4), sch (Pause)!"); }
  };
  render();
}

// 5.2 Schläge zusammenzählen
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
    if (wahl === runden.at(idx).antwort) { klavierAudio.spieleMidi(69, 0.35); idx++; render("Perfekt gezählt! ✅"); }
    else { klavierAudio.spieleQuietsch(); render("Tipp: Zähle einfach alle Silben unter den Noten zusammen!"); }
  };
  render();
}
// Gemeinsame Song-Track-Engine (nutzt klavierAudio.ladeSongMp3 & stopSongMp3 aus audio.js)
function starteKap5SongTrackEngine(cfg) {
  let songIdx = 0, animId = null, aktiv = false, startZeit = 0, notenListe = Array.of();
  let gedrueckt = false, aktiveNote = null, aktAudio = null;
  const pxProBeat = 95, zielX = 85;

  const stopTon = () => {
    gedrueckt = false;
    aktiveNote = null;
    if (typeof klavierAudio !== "undefined" && klavierAudio.stopAlle) klavierAudio.stopAlle();
  };
  const stopSong = () => {
    aktiv = false;
    stopTon();
    if (typeof klavierAudio !== "undefined" && klavierAudio.stopSongMp3) klavierAudio.stopSongMp3();
    aktAudio = null;
    if (animId) cancelAnimationFrame(animId);
  };

  const starteSong = () => {
    stopSong();
    const song = cfg.songs.at(songIdx);
    const beatMs = song.bpm ? 60000 / song.bpm : (cfg.beatMs || 880);
    const vorlauf = song.vorlauf ?? song.takt;
    let beat = vorlauf;
    notenListe = song.seq.map((n, i) => {
      const o = { id: i, t: n.t, d: n.d, w: n.w, beat, status: "offen", gehalten: 0 };
      beat += n.d;
      return o;
    });
    const gesamtBeats = beat + 1;

    if (song.mp3) {
      aktAudio = klavierAudio.ladeSongMp3(song.mp3, song.volume);
      const offsetMs = song.offsetMs || 0;

      for (let b = 0; b < vorlauf; b++) {
        setTimeout(() => {
          if (!aktiv || !document.getElementById(cfg.svgId)) return;
          if (!song.hatIntro) klavierAudio.spieleMidi(b === 0 ? 84 : 79, 0.12, 0.45);
          const msgEl = document.getElementById(cfg.msgId);
          if (msgEl) msgEl.textContent = `🎧 Einzählen (${song.takt}/4-Takt – ${vorlauf} Schläge): ${b + 1} ...`;
        }, b * beatMs);
      }

      const startVerzoegerung = Math.max(0, vorlauf * beatMs - offsetMs);
      setTimeout(() => {
        if (!aktiv || !document.getElementById(cfg.svgId) || !aktAudio) return;
        aktAudio.play().catch((err) => console.warn("Audio-Start:", err));
        const msgEl = document.getElementById(cfg.msgId);
        if (msgEl && !gedrueckt) msgEl.textContent = "🔥 Jetzt im Takt tippen & lange Noten halten!";
      }, startVerzoegerung);
    } else {
      const akkorde4 = Array.of(Array.of(48, 60, 64, 67), Array.of(43, 59, 62, 67), Array.of(45, 60, 64, 69), Array.of(41, 60, 65, 69));
      const melodie4 = Array.of(72, 71, 69, 67, 69, 71, 72, 74, 72, 69, 67, 64, 65, 67, 69, 72);
      const melodie3 = Array.of(72, 67, 64, 71, 67, 62, 69, 64, 60, 72, 71, 67);
      for (let b = 0; b < gesamtBeats; b++) {
        setTimeout(() => {
          if (!aktiv || !document.getElementById(cfg.svgId)) return;
          const vor = b < vorlauf;
          if (vor) {
            klavierAudio.spieleMidi(b === 0 ? 84 : 79, 0.12, 0.35);
          } else {
            const sb = b - vorlauf, akk = akkorde4.at(Math.floor(sb / song.takt) % 4), schlag = sb % song.takt;
            if (song.takt === 3) {
              if (schlag === 0) klavierAudio.spieleMidi(akk.at(0), 0.7, 0.42);
              else akk.slice(1).forEach((t) => klavierAudio.spieleMidi(t, 0.35, 0.25));
              klavierAudio.spieleMidi(melodie3.at(sb % melodie3.length), 0.45, 0.32);
            } else {
              if (schlag === 0 || schlag === 2) akk.forEach((t) => klavierAudio.spieleMidi(t, 0.75, schlag === 0 ? 0.36 : 0.24));
              else klavierAudio.spieleMidi(akk.at(0) + 12, 0.3, 0.22);
              klavierAudio.spieleMidi(melodie4.at(sb % melodie4.length), 0.45, 0.32);
            }
          }
          const msgEl = document.getElementById(cfg.msgId);
          if (msgEl && !gedrueckt) msgEl.textContent = vor ? `🥁 Einzählen (${song.takt}/4-Takt – ${vorlauf} Schläge): ${b + 1} ...` : "🔥 Antippen & bei langen Noten GEDRÜCKT HALTEN!";
        }, b * beatMs);
      }
    }

    startZeit = performance.now();
    aktiv = true;

    const loop = (jetzt) => {
      if (!aktiv || !document.getElementById(cfg.svgId)) { stopSong(); return; }
      const aktBeat = (jetzt - startZeit) / beatMs;
      const msgEl = document.getElementById(cfg.msgId);

      if (gedrueckt) {
        const pauseJetzt = notenListe.find((n) => n.t === "vp" && aktBeat >= n.beat + 0.12 && aktBeat <= n.beat + n.d - 0.12);
        if (pauseJetzt && pauseJetzt.status !== "verpasst") {
          pauseJetzt.status = "verpasst";
          klavierAudio.spieleQuietsch();
          if (msgEl) msgEl.textContent = "🤫 Bei «sch» den Finger wegnehmen!";
        }
      }
      if (gedrueckt && aktiveNote && aktiveNote.status === "halten") {
        aktiveNote.gehalten = Math.max(0, Math.min(aktiveNote.d, aktBeat - aktiveNote.beat));
        if (aktiveNote.gehalten >= aktiveNote.d - 0.32) {
          aktiveNote.status = "ok";
          if (msgEl) msgEl.textContent = `🔥 SUPER GEHALTEN! (${aktiveNote.w})`;
        }
      }

      let svg = `<line x1="20" y1="68" x2="540" y2="68" stroke="#cbd5e1" stroke-width="3"/>`;
      svg += `<rect x="${zielX - 28}" y="16" width="56" height="104" rx="14" fill="${gedrueckt ? "#bbf7d0" : cfg.zoneFill}" stroke="${cfg.zoneStroke}" stroke-width="3.2"/>`;

      notenListe.forEach((n) => {
        const x = zielX + (n.beat - aktBeat) * pxProBeat;
        const balkenBreite = Math.max(0, n.d * pxProBeat - 22);
        if (n.status === "offen" && aktBeat - n.beat > 0.58) n.status = n.t === "vp" ? "ok" : "verpasst";
        if (n.status === "halten" && !gedrueckt) {
          n.status = n.gehalten >= n.d - 0.35 ? "ok" : "verpasst";
          if (n.status === "verpasst" && msgEl) msgEl.textContent = `✋ «${n.w}» noch länger gedrückt halten!`;
        }
        if (n.status === "halten" && aktBeat > n.beat + n.d + 0.25) n.status = "ok";
        if (x + balkenBreite < -40 || x > 580) return;

        const f = n.status === "ok" ? "#16a34a" : n.status === "verpasst" ? "#ef4444" : n.status === "halten" ? "#0284c7" : "#1e293b";
        if (n.t !== "vp" && n.d > 1) {
          const fuellBreite = Math.min(balkenBreite, (n.gehalten / n.d) * balkenBreite);
          svg += `<rect x="${x + 12}" y="58" width="${balkenBreite}" height="20" rx="10" fill="#e2e8f0" stroke="${f}" stroke-width="2"/>`;
          if (fuellBreite > 2) svg += `<rect x="${x + 12}" y="58" width="${fuellBreite}" height="20" rx="10" fill="#22c55e"/>`;
        }
        if (n.t === "v") svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="${f}"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
        else if (n.t === "h" || n.t === "ph") {
          svg += `<ellipse cx="${x}" cy="68" rx="11" ry="8" transform="rotate(-15 ${x} 68)" fill="#fff" stroke="${f}" stroke-width="3"/><line x1="${x + 9}" y1="68" x2="${x + 9}" y2="24" stroke="${f}" stroke-width="3"/>`;
          if (n.t === "ph") svg += `<circle cx="${x + 19}" cy="66" r="4" fill="${f}"/>`;
        } else if (n.t === "g") svg += `<ellipse cx="${x}" cy="68" rx="13" ry="8.5" fill="#fff" stroke="${f}" stroke-width="3.2"/>`;
        else svg += `<path d="M ${x - 4} 46 L ${x + 6} 58 L ${x - 4} 68 L ${x + 5} 79" fill="none" stroke="${f}" stroke-width="3.2" stroke-linecap="round"/>`;
        const textX = n.t !== "vp" && n.d > 1 ? x + 12 + balkenBreite / 2 : x + 5;
        svg += `<text x="${textX}" y="114" font-size="13" font-weight="800" fill="${f}" text-anchor="middle">${n.w}</text>`;
      });

      const el = document.getElementById(cfg.svgId);
      if (el) el.innerHTML = svg;
      if (aktBeat >= gesamtBeats) {
        stopSong();
        const verpasst = notenListe.filter((n) => n.status === "verpasst").length;
        if (verpasst <= 1) {
          songIdx++;
          if (songIdx >= cfg.songs.length) { window.onkeydown = null; window.onkeyup = null; cfg.onFertig(); }
          else renderUI(`Super! Song ${songIdx}/${cfg.songs.length} geschafft – nächster Song startet! ✅`);
        } else renderUI("Fast! Halte die langen Balken ganz bis zum Ende gedrückt.");
        return;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
  };
  const renderUI = (msg = "") => {
    const song = cfg.songs.at(songIdx);
    const vorlauf = song.vorlauf ?? song.takt;
    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>${song.titel}</span><span>${song.takt}/4-Takt (${vorlauf} Schläge) | ${songIdx + 1}/${cfg.songs.length}</span></div>
        <svg id="${cfg.svgId}" viewBox="0 0 560 132" style="width:100%; max-width:520px; height:auto; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; display:block; margin:8px auto;"></svg>
        <p id="${cfg.msgId}" class="quiz-hint" style="font-weight:700;">${msg || `🎵 Einzählen (${song.takt}/4-Takt – ${vorlauf} Schläge): 1 ...`}</p>
        <button id="${cfg.padId}"
          onpointerdown="${cfg.tapFnName}Down()" onpointerup="${cfg.tapFnName}Up()"
          onpointerleave="${cfg.tapFnName}Up()" onpointercancel="${cfg.tapFnName}Up()"
          style="width:100%; max-width:350px; height:120px; margin-top:8px; border-radius:22px; border:3px solid ${cfg.btnBorder}; background:${cfg.btnBg}; color:#fff; font-size:23px; font-weight:900; box-shadow:0 6px 0 ${cfg.btnShadow}; cursor:pointer; touch-action:none; user-select:none;">
          🎹 DRÜCKEN & HALTEN!
        </button>
      </div>`;
    starteSong();
  };

  window[cfg.tapFnName + "Down"] = () => {
    if (gedrueckt) return;
    gedrueckt = true;
    const pad = document.getElementById(cfg.padId);
    if (pad) pad.style.transform = "translateY(4px)";
    klavierAudio.spieleMidi(72, 3.6, 1.0);
    if (!aktiv) return;
    const beatMs = cfg.songs.at(songIdx).bpm ? 60000 / cfg.songs.at(songIdx).bpm : (cfg.beatMs || 880);
    const aktBeat = (performance.now() - startZeit) / beatMs;
    const k = notenListe.find((n) => n.status === "offen" && Math.abs(aktBeat - n.beat) <= 0.58);
    const msgEl = document.getElementById(cfg.msgId);
    if (!k) return;
    if (k.t === "vp") { k.status = "verpasst"; klavierAudio.spieleQuietsch(); if (msgEl) msgEl.textContent = "🤫 Bei «sch» ist Pause – nicht drücken!"; }
    else if (k.d === 1) { k.status = "ok"; aktiveNote = k; if (msgEl) msgEl.textContent = "🔥 PERFEKT! (da)"; }
    else { k.status = "halten"; aktiveNote = k; if (msgEl) msgEl.textContent = `✋ Halten für «${k.w}» (${k.d} Schläge)...`; }
  };
  window[cfg.tapFnName + "Up"] = () => {
    if (!gedrueckt) return;
    const pad = document.getElementById(cfg.padId);
    if (pad) pad.style.transform = "translateY(0)";
    stopTon();
  };
  window.onkeydown = (e) => { if (e.code === "Space" && document.getElementById(cfg.padId)) { e.preventDefault(); if (!e.repeat) window[cfg.tapFnName + "Down"](); } };
  window.onkeyup = (e) => { if (e.code === "Space" && document.getElementById(cfg.padId)) { e.preventDefault(); window[cfg.tapFnName + "Up"](); } };
  renderUI();
}

// 5.3 Viertel & Pause (da & sch)
function starteKap5SongTrackViertel() {
  starteKap5SongTrackEngine({
    svgId: "kap5-svg-3", msgId: "kap5-msg-3", padId: "kap5-pad-3", tapFnName: "tapKap5Viertel",
    zoneFill: "#fef3c7", zoneStroke: "#f59e0b", btnBorder: "#16a34a", btnBg: "linear-gradient(135deg,#22c55e,#15803d)", btnShadow: "#14532d",
    btnLabel: "🎹 DRÜCKEN & HALTEN!",
    songs: Array.of(
      { titel: "5.3 Song 1: Gemütlicher Start", takt: 4, seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }) },
      { titel: "5.3 Song 2: Erste Pause", takt: 4, seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }) },
      { titel: "5.3 Song 3: Walzer-Schritt", takt: 3, seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }) },
      { titel: "5.3 Song 4: Echo-Hüpfer", takt: 4, seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }) },
      { titel: "5.3 Song 5: Viertel-Finale", takt: 3, seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }) }
    ),
    onFertig: () => abschliessenSpiel("kap5_3", 140, "5-Song-Champion! 🥁", "Alle 5 Songs im 3/4- und 4/4-Takt gemeistert!")
  });
}
// 5.4 Lange Noten (inkl. sounds/dancepop_76bpm.mp3 über zentrale audio.js)
function starteKap5SongTrackLangeNoten() {
  starteKap5SongTrackEngine({
    svgId: "kap5-svg-4", msgId: "kap5-msg-4", padId: "kap5-pad-4", tapFnName: "tapKap5LangeNoten",
    zoneFill: "#e0f2fe", zoneStroke: "#0284c7", btnBorder: "#0284c7", btnBg: "linear-gradient(135deg,#0ea5e9,#0369a1)", btnShadow: "#0c4a6e",
    btnLabel: "🎹 DRÜCKEN & HALTEN!",
    songs: Array.of(
      {
        titel: "5.4 Song 1: Dance-Pop Drop",
        takt: 4,
        bpm: 76,
        mp3: "sounds/dancepop_76bpm.mp3",
        vorlauf: 4,
        offsetMs: 2200,
        hatIntro: true,
        seq: Array.of({ t: "h", d: 2, w: "bon-bon" }, { t: "h", d: 2, w: "bon-bon" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "v", d: 1, w: "da" })
      },
      { titel: "5.4 Song 2: Kaugummi-Walzer", takt: 3, seq: Array.of({ t: "ph", d: 3, w: "kau-gum-mi" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "ph", d: 3, w: "kau-gum-mi" }) },
      { titel: "5.4 Song 3: Gummibärchen-Riese", takt: 4, seq: Array.of({ t: "g", d: 4, w: "gum-mi-bärch-en" }, { t: "h", d: 2, w: "bon-bon" }, { t: "h", d: 2, w: "bon-bon" }, { t: "g", d: 4, w: "gum-mi-bärch-en" }) },
      { titel: "5.4 Song 4: Süssigkeiten-Mix", takt: 3, seq: Array.of({ t: "ph", d: 3, w: "kau-gum-mi" }, { t: "h", d: 2, w: "bon-bon" }, { t: "vp", d: 1, w: "sch" }, { t: "ph", d: 3, w: "kau-gum-mi" }) },
      { titel: "5.4 Song 5: Lange-Noten-Finale", takt: 4, seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "g", d: 4, w: "gum-mi-bärch-en" }, { t: "ph", d: 3, w: "kau-gum-mi" }, { t: "vp", d: 1, w: "sch" }) }
    ),
    onFertig: () => abschliessenSpiel("kap5_4", 160, "Lange-Noten-Champion! 🎸", "bon-bon, kau-gum-mi und gum-mi-bärch-en im 3/4- und 4/4-Takt gemeistert!")
  });
}

// 5.5 Boss-Challenge
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
      starteKap5SongTrackEngine({
        svgId: "kap5-svg-boss", msgId: "kap5-msg-boss", padId: "kap5-pad-boss", tapFnName: "tapKap5Boss", beatMs: 860,
        zoneFill: "#fef3c7", zoneStroke: "#d97706", btnBorder: "#d97706", btnBg: "linear-gradient(135deg,#f59e0b,#b45309)", btnShadow: "#78350f",
        btnLabel: "🏆 DRÜCKEN & HALTEN!",
        songs: Array.of(
          { titel: "5.5 Boss-Song 1: Süssigkeiten-Mix", takt: 4, seq: Array.of({ t: "v", d: 1, w: "da" }, { t: "h", d: 2, w: "bon-bon" }, { t: "vp", d: 1, w: "sch" }, { t: "ph", d: 3, w: "kau-gum-mi" }, { t: "v", d: 1, w: "da" }) },
          { titel: "5.5 Boss-Song 2: Kaugummi-Walzer", takt: 3, seq: Array.of({ t: "ph", d: 3, w: "kau-gum-mi" }, { t: "h", d: 2, w: "bon-bon" }, { t: "vp", d: 1, w: "sch" }) },
          { titel: "5.5 Boss-Song 3: Meister-Medley", takt: 4, seq: Array.of({ t: "g", d: 4, w: "gum-mi-bärch-en" }, { t: "h", d: 2, w: "bon-bon" }, { t: "v", d: 1, w: "da" }, { t: "vp", d: 1, w: "sch" }) }
        ),
        onFertig: () => abschliessenSpiel("kap5_5", 200, "Rhythmus-Entdecker Boss! 🏆", "Blitz-Check UND alle 3 Boss-Songs gemeistert!")
      });
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
    if (wahl === aufgaben.at(idx).antwort) { klavierAudio.spieleMidi(72, 0.3); idx++; renderFrage("Treffer! ✅"); }
    else { klavierAudio.spieleQuietsch(); renderFrage("Zähle die Silben mit: da (1), bon-bon (2), kau-gum-mi (3), gum-mi-bärch-en (4)!"); }
  };
  renderFrage();
}
