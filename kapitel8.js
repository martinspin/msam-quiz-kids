// 8.1 Anker-Töne im Bass (f – a – c') (10 Runden)
function starteKap8AnkerToene() {
  const anker = BASS_NOTEN.filter((n) => Array.of("f", "a", "c'").includes(n.ton));
  const runden = mischeZufallKap8(Array.of(
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(0), anker.at(2), anker.at(1), anker.at(0)
  ));
  let idx = 0;

  const render = (hinweis = "Welcher der 3 Anker-Töne (f, a oder c') steht hier im Bassschlüssel?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap8_1", 160, "Bass-Anker-Profi!", "f, a und c' im Bassschlüssel erkennst du jetzt sofort!");
      return;
    }
    const ziel = runden.at(idx);
    const buttonsHTML = Array.of("f", "a", "c'").map((t) => `
      <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e; font-size:24px;"
              onclick="checkKap8Anker('${t}')">${t}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>8.1 Anker-Töne im Bass (f – a – c')</span><span>${idx + 1} / ${runden.length}</span></div>
        <div id="kap8-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${buttonsHTML}</div>
      </div>`;
    renderNotenSystem("kap8-noten-box", {
      schluessel: "bass",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#0284c7" }),
      zeigeSpickzettel: false
    });
  };

  window.checkKap8Anker = (wahl) => {
    const ziel = runden.at(idx);
    klavierAudio.spieleMidi(ziel.midi);
    if (wahl === ziel.ton) {
      idx++;
      render("Goldrichtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render(`Merkspruch: ${ziel.merkspruch}`);
    }
  };
  render();
}

// 8.1 Anker-Töne im Bass (c – f – c') (10 Runden)
function starteKap8AnkerToene() {
  const anker = BASS_NOTEN.filter((n) => Array.of("c", "f", "c'").includes(n.ton));
  const runden = mischeZufallKap8(Array.of(
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(1), anker.at(2), anker.at(0), anker.at(1)
  ));
  let idx = 0;

  const render = (hinweis = "Welcher der 3 Anker-Töne (c, f oder c') steht hier im Bassschlüssel?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap8_1", 160, "Bass-Anker-Profi!", "c, f und c' im Bassschlüssel erkennst du jetzt sofort!");
      return;
    }
    const ziel = runden.at(idx);
    const buttonsHTML = Array.of("c", "f", "c'").map((t) => `
      <button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e; font-size:24px;"
              onclick="checkKap8Anker('${t}')">${t}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>8.1 Anker-Töne im Bass (c – f – c')</span><span>${idx + 1} / ${runden.length}</span></div>
        <div id="kap8-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${buttonsHTML}</div>
      </div>`;
    renderNotenSystem("kap8-noten-box", {
      schluessel: "bass",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#0284c7" }),
      zeigeSpickzettel: true
    });
  };

  window.checkKap8Anker = (wahl) => {
    const ziel = runden.at(idx);
    klavierAudio.spieleMidi(ziel.midi);
    if (wahl === ziel.ton) {
      idx++;
      render("Goldrichtig! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render(`Merkspruch: ${ziel.merkspruch}`);
    }
  };
  render();
}
// 8.2 Fünf-Finger-Raum der linken Hand (f bis c') (10 Runden)
function starteKap8FuenfFingerRaum() {
  const raum = BASS_NOTEN.filter((n) => n.stufe >= 6 && n.stufe <= 10); // f, g, a, h, c'
  const runden = mischeZufallKap8(Array.of(
    0, 1, 2, 3, 4, 0, 2, 4, 1, 3
  ));
  let idx = 0;

  const render = (hinweis = "Wie heisst diese Note im Fünf-Finger-Raum (f bis c')?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap8_2", 180, "Fünf-Finger-Profi!", "Du liest alle Noten von f bis c' im Bassschlüssel flüssig!");
      return;
    }
    const ziel = raum.at(runden.at(idx));
    const buttonsHTML = raum.map((n) => `
      <button class="answer-btn" style="background:#f0f9ff; border-color:#0284c7; color:#0c4a6e; font-size:22px;"
              onclick="checkKap8Raum('${n.ton}')">${n.ton}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>8.2 Fünf-Finger-Raum (f bis c')</span><span>${idx + 1} / ${runden.length}</span></div>
        <div id="kap8-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(5, 1fr); margin-top:14px;">${buttonsHTML}</div>
      </div>`;
    renderNotenSystem("kap8-noten-box", {
      schluessel: "bass",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#0284c7" }),
      zeigeSpickzettel: false
    });
  };

  window.checkKap8Raum = (wahl) => {
    const ziel = raum.at(runden.at(idx));
    klavierAudio.spieleMidi(ziel.midi);
    if (wahl === ziel.ton) {
      idx++;
      render("Perfekt gelesen! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render(`Tipp: ${ziel.merkspruch}`);
    }
  };
  render();
}

// 8.3 Bass-Note auf dem Klavier finden (c bis c') (10 Runden)
function starteKap8NoteAufKlavier() {
  const runden = mischeZufallKap8(Array.of(0, 1, 2, 3, 4, 5, 6, 7, 3, 0));
  let idx = 0;

  const render = (hinweis = "Lies die Bass-Note oben und tippe die passende Taste an!") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap8_3", 200, "Bass-Tasten-Entdecker!", "Du setzt alle Bass-Noten von c bis c' direkt auf dem Klavier um!");
      return;
    }
    const ziel = BASS_NOTEN.at(runden.at(idx));

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>8.3 Bass-Note auf dem Klavier</span><span>${idx + 1} / ${runden.length}</span></div>
        <div id="kap8-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis}</p>
        <div style="margin-top:8px;">
          ${baueKap8Klaviatur("checkKap8KlavierTaste")}
        </div>
      </div>`;
    renderNotenSystem("kap8-noten-box", {
      schluessel: "bass",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#0369a1" }),
      zeigeSpickzettel: false
    });
  };

  window.checkKap8KlavierTaste = (tonName, midi) => {
    const ziel = BASS_NOTEN.at(runden.at(idx));
    klavierAudio.spieleMidi(midi);
    if (tonName === ziel.ton) {
      idx++;
      render(`Genau richtig – das ist ${ziel.ton}! ✅`);
    } else {
      klavierAudio.spieleQuietsch();
      render(`Das war ${tonName}. ${ziel.merkspruch}`);
    }
  };
  render();
}
// 8.4 Kleine Bass-Melodien für die linke Hand spielen (10 Melodie-Motive)
function starteKap8BassMelodien() {
  const melodien = Array.of(
    { titel: "1. Alle meine Entchen (Bass)", tipp: "Starte auf dem tiefen c!", toene: Array.of("c", "d", "e", "f", "g") },
    { titel: "2. Hänschen klein (Bass)", tipp: "Starte auf dem g (4. Zwischenraum)!", toene: Array.of("g", "e", "e", "f", "d", "d") },
    { titel: "3. Bruder Jakob (Bass)", tipp: "Starte auf c und gehe hoch bis e!", toene: Array.of("c", "d", "e", "c") },
    { titel: "4. Kuckuck ruft (Bass)", tipp: "Springe vom g zum e!", toene: Array.of("g", "e", "g", "e") },
    { titel: "5. Abwärts vom c' (Daumen)", tipp: "Starte oben auf der Hilfslinie c'!", toene: Array.of("c'", "h", "a", "g", "f") },
    { titel: "6. Aufwärts zum c'", tipp: "Starte auf der f-Linie (Schlüsselton)!", toene: Array.of("f", "g", "a", "h", "c'") },
    { titel: "7. Dreiklang-Sprung unten", tipp: "Hüpfe von c über e zum g!", toene: Array.of("c", "e", "g", "e", "c") },
    { titel: "8. Dreiklang-Sprung oben", tipp: "Starte auf der f-Linie!", toene: Array.of("f", "a", "c'", "a", "f") },
    { titel: "9. Weihnachtsmann-Anfang", tipp: "Von c hoch zum g und a!", toene: Array.of("c", "c", "g", "g", "a", "a", "g") },
    { titel: "10. Oktav-Finale (c bis c')", tipp: "Von ganz unten (c) bis ganz oben (c')!", toene: Array.of("c", "e", "g", "c'") }
  );
  let mIdx = 0;
  let schritt = 0;

  const render = (hinweis = "") => {
    if (mIdx >= melodien.length) {
      abschliessenSpiel("kap8_4", 230, "Bass-Melodie-Künstler!", "Du hast alle 10 Bass-Melodien sicher nach Noten gespielt!");
      return;
    }
    const mel = melodien.at(mIdx);
    const svgNoten = mel.toene.map((t, i) => {
      const info = BASS_NOTEN.find((b) => b.ton === t);
      return {
        stufe: info.stufe,
        farbe: i < schritt ? "#16a34a" : i === schritt ? "#f59e0b" : "#94a3b8"
      };
    });

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>8.4 ${mel.titel}</span><span>${mIdx + 1} / ${melodien.length}</span></div>
        <div id="kap8-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis || mel.tipp}</p>
        <div style="margin-top:8px;">
          ${baueKap8Klaviatur("checkKap8MelodieTaste")}
        </div>
      </div>`;
    renderNotenSystem("kap8-noten-box", {
      schluessel: "bass",
      noten: svgNoten,
      zeigeSpickzettel: false
    });
  };

  window.checkKap8MelodieTaste = (tonName, midi) => {
    const mel = melodien.at(mIdx);
    const zielTon = mel.toene.at(schritt);
    klavierAudio.spieleMidi(midi);
    if (tonName === zielTon) {
      schritt++;
      if (schritt >= mel.toene.length) {
        mIdx++;
        schritt = 0;
        render("Melodie geschafft! Weiter zur nächsten! ✅");
      } else {
        render(`Super (${tonName})! Jetzt die orange Note spielen.`);
      }
    } else {
      klavierAudio.spieleQuietsch();
      render(`Das war ${tonName}. Gesucht ist die orange Note!`);
    }
  };
  render();
}

// 8.5 Boss-Challenge: Bassschlüssel-Profi (10 gemischte Runden)
function starteKap8Boss() {
  const aufgaben = mischeZufallKap8(Array.of(
    { typ: "name", ton: "f", frage: "Welcher Ton liegt genau zwischen den zwei Punkten des Bassschlüssels?" },
    { typ: "name", ton: "c'", frage: "Wie heisst diese Note auf der oberen Hilfslinie?" },
    { typ: "name", ton: "c", frage: "Wie heisst diese Note im 2. Zwischenraum?" },
    { typ: "name", ton: "a", frage: "Welche Note liegt ganz oben auf der 5. Linie?" },
    { typ: "name", ton: "d", frage: "Welche Note sitzt genau auf der mittleren (3.) Linie?" },
    { typ: "klavier", ton: "g", frage: "Boss-Klavier: Tippe die gezeigte Bass-Note auf der Klaviatur!" },
    { typ: "klavier", ton: "e", frage: "Boss-Klavier: Tippe die gezeigte Bass-Note auf der Klaviatur!" },
    { typ: "klavier", ton: "h", frage: "Boss-Klavier: Tippe die gezeigte Bass-Note auf der Klaviatur!" },
    { typ: "klavier", ton: "f", frage: "Boss-Klavier: Tippe den Schlüsselton f auf der Klaviatur!" },
    { typ: "klavier", ton: "c'", frage: "Boss-Finale: Tippe das eingestrichene c' auf der Klaviatur!" }
  ));
  let idx = 0;

  const render = (hinweis = "") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap8_5", 250, "Bassschlüssel-Profi! 🏆", "Du beherrschst den Bassschlüssel von c bis c' meisterhaft!");
      return;
    }
    const akt = aufgaben.at(idx);
    const ziel = BASS_NOTEN.find((b) => b.ton === akt.ton);
    const interaktionHTML = akt.typ === "name"
      ? `<div class="answer-grid" style="grid-template-columns:repeat(4, 1fr); margin-top:14px;">
           ${BASS_NOTEN.map((n) => `<button class="answer-btn" style="background:#e0f2fe; border-color:#0284c7; color:#0c4a6e; font-size:20px;" onclick="checkKap8Boss('${n.ton}', ${n.midi})">${n.ton}</button>`).join("")}
         </div>`
      : `<div style="margin-top:8px;">${baueKap8Klaviatur("checkKap8Boss")}</div>`;

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>8.5 Bassschlüssel-Profi (Boss)</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        <div id="kap8-noten-box" style="margin:10px 0;"></div>
        <p class="quiz-hint">${hinweis || akt.frage}</p>
        ${interaktionHTML}
      </div>`;
    renderNotenSystem("kap8-noten-box", {
      schluessel: "bass",
      noten: Array.of({ stufe: ziel.stufe, farbe: "#0284c7" }),
      zeigeSpickzettel: false
    });
  };

  window.checkKap8Boss = (tonName, midi) => {
    const akt = aufgaben.at(idx);
    const ziel = BASS_NOTEN.find((b) => b.ton === akt.ton);
    klavierAudio.spieleMidi(midi);
    if (tonName === ziel.ton) {
      idx++;
      render("Boss-Punkt geholt! ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render(`Fast! Das war ${tonName}. ${ziel.merkspruch}`);
    }
  };
  render();
}
