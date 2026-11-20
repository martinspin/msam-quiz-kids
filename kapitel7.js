// 1/3 KAPITEL 7: Violinschlüssel bis g'' (mit noten-renderer.js & klaviatur.js)

const VIOLIN_NOTEN_KAP7 = Array.of(
  { id: "g1", stufe: 2, ton: "G", label: "g'", midi: 67, merkspruch: "Schlüssel-g' liegt auf der 2. Linie (Schnecken-Linie)!" },
  { id: "a1", stufe: 3, ton: "A", label: "a'", midi: 69, merkspruch: "Das a' wohnt im 2. Zwischenraum!" },
  { id: "h1", stufe: 4, ton: "H", label: "h'", midi: 71, merkspruch: "Das h' liegt genau auf der 3. Linie (Mittel-Linie)!" },
  { id: "c2", stufe: 5, ton: "C", label: "c''", midi: 72, merkspruch: "Das zweigestrichene c'' wohnt im 3. Zwischenraum!" },
  { id: "d2", stufe: 6, ton: "D", label: "d''", midi: 74, merkspruch: "Das zweigestrichene d'' liegt auf der 4. Linie!" },
  { id: "e2", stufe: 7, ton: "E", label: "e''", midi: 76, merkspruch: "Das zweigestrichene e'' wohnt ganz oben im 4. Zwischenraum!" },
  { id: "f2", stufe: 8, ton: "F", label: "f''", midi: 77, merkspruch: "Das zweigestrichene f'' liegt ganz oben auf der 5. Linie (Dach-Linie)!" },
  { id: "g2", stufe: 9, ton: "G", label: "g''", midi: 79, merkspruch: "Das zweigestrichene g'' sitzt oben AUF dem Dach (über der 5. Linie)!" }
);

function mischeZufallKap7(liste) {
  const kopie = liste.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie.at(i);
    kopie.splice(i, 1, kopie.at(j));
    kopie.splice(j, 1, temp);
  }
  return kopie;
}

function midiZuDeutschLabelKap7(midi) {
  const namen = Array.of("c", "cis", "d", "dis", "e", "f", "fis", "g", "gis", "a", "ais", "h");
  const rest = midi % 12;
  const oktave = Math.floor(midi / 12) - 1;
  const basis = namen.at(rest);
  if (oktave === 4) return `${basis}'`;
  if (oktave === 5) return `${basis}''`;
  return basis;
}

function midiZuStammtonKap7(midi) {
  const namen = Array.of("C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "Ais", "H");
  return namen.at(midi % 12);
}

function zeigeKap7Klaviatur(containerId, onKeyClick) {
  baueKlaviatur(containerId, {
    startMidi: 60,
    endMidi: 83,
    highlightMidis: Array.of(60, 72),
    zeigeNotennamen: false,
    onKeyClick: onKeyClick
  });
}

function starteKap7Spiel(nummer) {
  if (typeof appMusik !== "undefined") {
    if (typeof appMusik.pause === "function") appMusik.pause();
    if (typeof appMusik.stop === "function") appMusik.stop();
  }
  const bgAudio = document.getElementById("bg-music");
  if (bgAudio) bgAudio.pause();

  if (nummer === 1) starteKap7AnkerOben();
  if (nummer === 2) starteKap7AlleNotenOben();
  if (nummer === 3) starteKap7HoheNoteKlavier();
  if (nummer === 4) starteKap7MelodienTonraum();
  if (nummer === 5) starteKap7HoehenflugMeister();
}

// 7.1 Anker-Töne oben (c'' – e'' – g'') – 10 Runden
function starteKap7AnkerOben() {
  const anker = VIOLIN_NOTEN_KAP7.filter((n) => Array.of("c2", "e2", "g2").includes(n.id));
  const runden = mischeZufallKap7(Array.of(
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(2), anker.at(1), anker.at(0), anker.at(2)
  ));
  let idx = 0;

  const render = (hinweis = "Welcher obere Anker-Ton (c'', e'' oder g'') leuchtet hier?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap7_1", 160, "Höhen-Navigator!", "c'' (3. Raum), e'' (4. Raum) und g'' (auf dem Dach) sitzen bombenfest!");
      return;
    }
    const ziel = runden.at(idx);
    const buttonsHTML = Array.of("C", "E", "G").map((t) => `
      <button class="answer-btn" style="background:#fce7f3; border-color:#db2777; color:#831843; font-size:24px;"
              onclick="checkKap7Anker('${t}')">${t}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.1 Anker-Töne oben (c'' – e'' – g'')</span><span>${idx + 1} / ${runden.length}</span></div>
        <div id="kap7-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${buttonsHTML}</div>
      </div>`;

    renderNotenSystem("kap7-noten-box", {
      schluessel: "violin",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#db2777" }),
      zeigeSpickzettel: true
    });
  };

  window.checkKap7Anker = (wahl) => {
    const ziel = runden.at(idx);
    klavierAudio.spieleMidi(ziel.midi);
    if (wahl === ziel.ton) {
      idx++;
      render(`Super! Das ist das zweigestrichene ${ziel.label}! ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Merkspruch: ${ziel.merkspruch}`);
    }
  };
  render();
}
// 7.2 Alle Noten von h' bis g'' sicher benennen – 10 Runden
function starteKap7AlleNotenOben() {
  const pool = VIOLIN_NOTEN_KAP7.filter((n) => n.stufe >= 4);
  const runden = mischeZufallKap7(Array.of(
    pool.at(0), pool.at(1), pool.at(2), pool.at(3), pool.at(4), pool.at(5),
    pool.at(1), pool.at(3), pool.at(4), pool.at(5)
  ));
  let idx = 0;

  const render = (hinweis = "Wie heisst diese Note im oberen Violinschlüssel?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap7_2", 180, "Noten-Überflieger!", "Du liest h', c'', d'', e'', f'' und g'' bis ganz nach oben flüssig!");
      return;
    }
    const ziel = runden.at(idx);
    const buttonsHTML = Array.of("H", "C", "D", "E", "F", "G").map((t) => `
      <button class="answer-btn" style="background:#fdf2f8; border-color:#db2777; color:#831843; font-size:22px;"
              onclick="checkKap7Name('${t}')">${t}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.2 Alle Noten von g' bis g''</span><span>${idx + 1} / ${runden.length}</span></div>
        <div id="kap7-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${buttonsHTML}</div>
      </div>`;

    renderNotenSystem("kap7-noten-box", {
      schluessel: "violin",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#db2777" }),
      zeigeSpickzettel: false
    });
  };

  window.checkKap7Name = (wahl) => {
    const ziel = runden.at(idx);
    klavierAudio.spieleMidi(ziel.midi);
    if (wahl === ziel.ton) {
      idx++;
      render(`Goldrichtig – ${ziel.label}! ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Tipp: ${ziel.merkspruch}`);
    }
  };
  render();
}

// 7.3 Hohe Note auf dem Klavier finden – 10 Runden
function starteKap7HoheNoteKlavier() {
  const pool = VIOLIN_NOTEN_KAP7.filter((n) => n.stufe >= 4);
  const runden = mischeZufallKap7(Array.of(
    pool.at(0), pool.at(1), pool.at(2), pool.at(3), pool.at(4), pool.at(5),
    pool.at(5), pool.at(3), pool.at(2), pool.at(1)
  ));
  let idx = 0;

  const render = (hinweis = "Lies die hohe Note und tippe die richtige Taste in der zweigestrichenen Oktave an!") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap7_3", 200, "Oktav-Entdecker!", "Du findest auch die hohen Töne bis g'' sofort auf den Tasten!");
      return;
    }
    const ziel = runden.at(idx);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.3 Hohe Note auf dem Klavier</span><span>${idx + 1} / ${runden.length}</span></div>
        <div id="kap7-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis}</p>
        <div id="kap7-klaviatur-box" style="margin-top:10px;"></div>
        <div style="font-size:12px; color:#64748b; margin-top:6px;">
          Links leuchtet c' (Schloss-c') · in der Mitte leuchtet das zweigestrichene c''
        </div>
      </div>`;

    renderNotenSystem("kap7-noten-box", {
      schluessel: "violin",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#0284c7" }),
      zeigeSpickzettel: false
    });

    zeigeKap7Klaviatur("kap7-klaviatur-box", (midi) => {
      const aktZiel = runden.at(idx);
      const tasteLabel = midiZuDeutschLabelKap7(midi);
      const tonName = midiZuStammtonKap7(midi);
      klavierAudio.spieleMidi(midi);

      if (midi === aktZiel.midi) {
        idx++;
        render(`Volltreffer – ${aktZiel.label}! ✅`);
      } else if (tonName === aktZiel.ton) {
        klavierAudio.spieleQuietsch();
        render(`Fast! Das war ${tasteLabel} – suche ${aktZiel.label} rechts beim leuchtenden c''!`);
      } else {
        klavierAudio.spieleQuietsch();
        render(`Das war ${tasteLabel}. ${aktZiel.merkspruch}`);
      }
    });
  };
  render();
}
// 7.4 Melodien im grossen Tonraum (g' bis g'') – 4 Melodien
function starteKap7MelodienTonraum() {
  const lieder = Array.of(
    {
      titel: "🐦 Kuckuck, Kuckuck",
      startTipp: "Starte hoch auf dem g'' (oben AUF der 5. Linie) und springe hinunter zum e''!",
      noten: Array.of(
        { stufe: 9, ton: "G", midi: 79, label: "g''" },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 9, ton: "G", midi: 79 },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 6, ton: "D", midi: 74 },
        { stufe: 5, ton: "C", midi: 72 },
        { stufe: 6, ton: "D", midi: 74 },
        { stufe: 5, ton: "C", midi: 72 }
      )
    },
    {
      titel: "✨ Ode an die Freude (Obere Lage)",
      startTipp: "Starte auf dem hohen e'' (4. Zwischenraum) und klettere bis zum g''!",
      noten: Array.of(
        { stufe: 7, ton: "E", midi: 76, label: "e''" },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 8, ton: "F", midi: 77 },
        { stufe: 9, ton: "G", midi: 79 },
        { stufe: 9, ton: "G", midi: 79 },
        { stufe: 8, ton: "F", midi: 77 },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 6, ton: "D", midi: 74 },
        { stufe: 5, ton: "C", midi: 72 }
      )
    },
    {
      titel: "🐝 Summ, summ, summ (Obere Lage)",
      startTipp: "Starte ganz oben auf dem zweigestrichenen g'' (auf dem Dach)!",
      noten: Array.of(
        { stufe: 9, ton: "G", midi: 79, label: "g''" },
        { stufe: 8, ton: "F", midi: 77 },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 6, ton: "D", midi: 74 },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 8, ton: "F", midi: 77 },
        { stufe: 6, ton: "D", midi: 74 },
        { stufe: 5, ton: "C", midi: 72 }
      )
    },
    {
      titel: "🔔 Glockengeläut (g' bis g'')",
      startTipp: "Vom g' auf der 2. Linie hoch zum c'', e'' und bis aufs Dach g''!",
      noten: Array.of(
        { stufe: 2, ton: "G", midi: 67, label: "g'" },
        { stufe: 5, ton: "C", midi: 72 },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 9, ton: "G", midi: 79 },
        { stufe: 7, ton: "E", midi: 76 },
        { stufe: 5, ton: "C", midi: 72 }
      )
    }
  );

  let liedIdx = 0;
  let schritt = 0;

  const render = (hinweis = "") => {
    if (liedIdx >= lieder.length) {
      abschliessenSpiel("kap7_4", 230, "Gipfel-Pianist!", "Du spielst Melodien sicher bis ganz nach oben zum zweigestrichenen g''!");
      return;
    }
    const lied = lieder.at(liedIdx);
    const text = hinweis || lied.startTipp;

    const rendererNoten = lied.noten.map((n, i) => ({
      stufe: n.stufe,
      farbe: i < schritt ? "#16a34a" : i === schritt ? "#db2777" : "#334155",
      label: n.label || ""
    }));

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>7.4 Melodien im grossen Tonraum</span><span>Lied ${liedIdx + 1} / ${lieder.length}</span></div>
        <h2 style="margin-bottom:4px;">${lied.titel}</h2>
        <div id="kap7-lied-noten" style="margin:10px 0;"></div>
        <p class="quiz-hint">${text}</p>
        <div id="kap7-lied-klaviatur" style="margin-top:10px;"></div>
        <div style="font-size:12px; color:#64748b; margin-top:6px;">
          Links leuchtet c' · in der Mitte leuchtet c''
        </div>
      </div>`;

    renderNotenSystem("kap7-lied-noten", {
      schluessel: "violin",
      noten: rendererNoten,
      zeigeSpickzettel: false
    });

    zeigeKap7Klaviatur("kap7-lied-klaviatur", (midi) => {
      const aktLied = lieder.at(liedIdx);
      const ziel = aktLied.noten.at(schritt);
      const tasteLabel = midiZuDeutschLabelKap7(midi);
      const tonName = midiZuStammtonKap7(midi);

      if (midi === ziel.midi) {
        klavierAudio.spieleMidi(ziel.midi);
        schritt++;
        if (schritt >= aktLied.noten.length) {
          liedIdx++;
          schritt = 0;
          render("Bravo! Wunderschön gespielt! 🎶 Auf zur nächsten Melodie!");
        } else {
          render("Super! Weiter zur nächsten Note 🎵");
        }
      } else {
        klavierAudio.spieleMidi(midi);
        klavierAudio.spieleQuietsch();
        if (tonName === ziel.ton) {
          render(`Fast! ${tasteLabel} ist in der falschen Oktave – achte auf die leuchtenden c'- und c''-Tasten!`);
        } else {
          render(`Das war ${tasteLabel} – schau auf die pink leuchtende Note!`);
        }
      }
    });
  };
  render();
}
// 7.5 Abschluss-Challenge (ID "kap7_6" wie in KAPITEL_DATEN) – 10 Fragen
function starteKap7HoehenflugMeister() {
  const fragen = mischeZufallKap7(Array.of(
    { modus: "name", stufe: 5, ton: "C", label: "c''", midi: 72 },
    { modus: "name", stufe: 9, ton: "G", label: "g''", midi: 79 },
    { modus: "name", stufe: 7, ton: "E", label: "e''", midi: 76 },
    { modus: "name", stufe: 4, ton: "H", label: "h'", midi: 71 },
    { modus: "name", stufe: 8, ton: "F", label: "f''", midi: 77 },
    { modus: "klavier", stufe: 5, ton: "C", label: "c''", midi: 72 },
    { modus: "klavier", stufe: 9, ton: "G", label: "g''", midi: 79 },
    { modus: "klavier", stufe: 6, ton: "D", label: "d''", midi: 74 },
    { modus: "klavier", stufe: 8, ton: "F", label: "f''", midi: 77 },
    { modus: "klavier", stufe: 7, ton: "E", label: "e''", midi: 76 }
  ));

  let idx = 0;
  let leben = 3;

  const render = (hinweis = "") => {
    if (leben <= 0) {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:32px;">
          <div style="font-size:52px;">💔</div>
          <h2>Knapp am Höhenflug-Abzeichen vorbei!</h2>
          <p class="quiz-hint" style="margin:10px 0 20px;">Alle 3 Herzen verbraucht – starte gleich den nächsten Flug!</p>
          <button class="btn-primary" onclick="starteKap7HoehenflugMeister()">Challenge neu starten</button>
        </div>`;
      return;
    }
    if (idx >= fragen.length) {
      abschliessenSpiel("kap7_6", 250, "Höhenflug-Meister! 🚀", "Du beherrschst den Violinschlüssel jetzt von c' bis ganz nach oben zum g''!");
      return;
    }

    const akt = fragen.at(idx);
    const herzen = "❤️".repeat(leben) + "🤍".repeat(3 - leben);

    if (akt.modus === "name") {
      const btns = Array.of("H", "C", "D", "E", "F", "G").map((t) => `
        <button class="answer-btn" style="background:#fce7f3; border-color:#db2777; font-size:22px;"
                onclick="checkKap7MeisterName('${t}')">${t}</button>`).join("");
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>🚀 Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div id="kap7-meister-noten" style="margin:10px 0;"></div>
          <p class="quiz-hint">${hinweis || "Wie heisst diese hohe Note?"}</p>
          <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${btns}</div>
        </div>`;

      renderNotenSystem("kap7-meister-noten", {
        schluessel: "violin",
        noten: Array.of({ stufe: akt.stufe, farbe: "#db2777" }),
        zeigeSpickzettel: false
      });
    } else {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>🚀 Challenge ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div id="kap7-meister-noten" style="margin:10px 0;"></div>
          <p class="quiz-hint">${hinweis || "Tippe die richtige Taste in der zweigestrichenen Oktave an!"}</p>
          <div id="kap7-meister-klaviatur" style="margin-top:10px;"></div>
        </div>`;

      renderNotenSystem("kap7-meister-noten", {
        schluessel: "violin",
        noten: Array.of({ stufe: akt.stufe, farbe: "#0284c7" }),
        zeigeSpickzettel: false
      });

      zeigeKap7Klaviatur("kap7-meister-klaviatur", (midi) => {
        const zielFrage = fragen.at(idx);
        const tasteLabel = midiZuDeutschLabelKap7(midi);
        klavierAudio.spieleMidi(midi);
        if (midi === zielFrage.midi) {
          idx++;
          render("Volltreffer! ✅");
        } else {
          leben--;
          klavierAudio.spieleQuietsch();
          render(`Das war ${tasteLabel}! (-1 Herz)`);
        }
      });
    }
  };

  window.checkKap7MeisterName = (wahl) => {
    const akt = fragen.at(idx);
    klavierAudio.spieleMidi(akt.midi);
    if (wahl === akt.ton) {
      idx++;
      render("Stark! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben! (-1 Herz)");
    }
  };

  render();
}
