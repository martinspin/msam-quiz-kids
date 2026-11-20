// KAPITEL 6: Violinschlüssel (mit violin.svg), Notennamen & Melodien auf dem Klavier

const VIOLIN_NOTEN = Array.of(
  { id: "C1", stufe: 0, ton: "C", midi: 60, merkspruch: "C hat seinen eigenen kleinen Gürtel (Hilfslinie) unter den Linien!" },
  { id: "D1", stufe: 1, ton: "D", midi: 62, merkspruch: "D hängt direkt unter der 1. Linie!" },
  { id: "E1", stufe: 2, ton: "E", midi: 64, merkspruch: "E liegt genau auf der 1. Linie von unten!" },
  { id: "F1", stufe: 3, ton: "F", midi: 65, merkspruch: "F sitzt im 1. Zwischenraum!" },
  { id: "G1", stufe: 4, ton: "G", midi: 67, merkspruch: "G liegt auf der 2. Linie – genau dort, wo der Violinschlüssel startet!" },
  { id: "A1", stufe: 5, ton: "A", midi: 69, merkspruch: "A sitzt im 2. Zwischenraum!" }
);

function mischeZufallKap6(liste) {
  const kopie = liste.slice();
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = kopie.at(i);
    kopie.splice(i, 1, kopie.at(j));
    kopie.splice(j, 1, temp);
  }
  return kopie;
}

function baueViolinSystemSVG(notenListe, optionen = {}) {
  const markiereGLinie = optionen.markiereGLinie === true;
  const anzahl = notenListe.length;
  const breite = Math.max(340, 145 + anzahl * 72);
  const hoehe = 195;
  const untersteLinieY = 140;
  const halbSchrittY = 10;

  const linienStufen = Array.of(2, 4, 6, 8, 10);
  const linienSVG = linienStufen.map((st) => {
    const y = untersteLinieY - (st - 2) * halbSchrittY;
    const istG = markiereGLinie && st === 4;
    return `<line x1="22" y1="${y}" x2="${breite - 22}" y2="${y}"
                  stroke="${istG ? "#7c3aed" : "#334155"}"
                  stroke-width="${istG ? "3.4" : "2.3"}" stroke-linecap="round" />`;
  }).join("");

  const schluesselSVG = `<image href="violin.svg" x="22" y="19" width="74" height="164" preserveAspectRatio="xMidYMid meet" />`;
  const startX = 128;
  const abstandX = anzahl <= 2 ? 90 : 66;

  const notenSVG = notenListe.map((n, i) => {
    const cx = startX + i * abstandX;
    const cy = untersteLinieY - (n.stufe - 2) * halbSchrittY;
    const farbe = n.farbe || "#0f172a";
    const schlaege = n.schlaege || 1;
    const gefuellt = schlaege === 1;
    const hatHals = schlaege <= 3;

    const aktivRing = n.aktiv
      ? `<circle cx="${cx}" cy="${cy}" r="21" fill="rgba(124, 58, 237, 0.22)" stroke="#7c3aed" stroke-width="2.5" />`
      : "";
    const hilfslinie = n.stufe === 0
      ? `<line x1="${cx - 22}" y1="${cy}" x2="${cx + 22}" y2="${cy}" stroke="#334155" stroke-width="2.8" stroke-linecap="round" />`
      : "";
    const hals = hatHals
      ? `<line x1="${cx + 11.5}" y1="${cy - 2}" x2="${cx + 11.5}" y2="${cy - 46}" stroke="${farbe}" stroke-width="3" stroke-linecap="round" />`
      : "";
    const kopf = gefuellt
      ? `<ellipse cx="${cx}" cy="${cy}" rx="12.5" ry="9" transform="rotate(-16 ${cx} ${cy})" fill="${farbe}" />`
      : `<ellipse cx="${cx}" cy="${cy}" rx="12.5" ry="9" transform="rotate(-16 ${cx} ${cy})" fill="none" stroke="${farbe}" stroke-width="3.2" />`;
    const labelOben = n.label
      ? `<text x="${cx}" y="26" text-anchor="middle" font-size="18" font-weight="900" fill="${farbe}">${n.label}</text>`
      : "";

    return `<g>${aktivRing}${hilfslinie}${hals}${kopf}${labelOben}</g>`;
  }).join("");

  return `
    <div style="display:flex; justify-content:center; margin:8px 0;">
      <svg viewBox="0 0 ${breite} ${hoehe}" style="width:100%; max-width:${Math.min(breite + 40, 580)}px; height:auto; background:#f5f3ff; border:2px solid #ddd6fe; border-radius:18px;">
        ${linienSVG}${schluesselSVG}${notenSVG}
      </svg>
    </div>`;
}

function starteKap6Spiel(nummer) {
  if (typeof appMusik !== "undefined") {
    if (typeof appMusik.pause === "function") appMusik.pause();
    if (typeof appMusik.stop === "function") appMusik.stop();
  }
  const bgAudio = document.getElementById("bg-music");
  if (bgAudio) bgAudio.pause();

  if (nummer === 1) starteKap6AnkerToene();
  if (nummer === 2) starteKap6NotennamenLesen();
  if (nummer === 3) starteKap6NoteAufKlavier();
  if (nummer === 4) starteKap6KinderliederNoten();
  if (nummer === 5) starteKap6TonUndRhythmus();
  if (nummer === 6) starteKap6FinaleDiplom();
}

// 6.1 Die 3 Anker-Töne im Violinschlüssel (C – E – G) (10 Runden)
function starteKap6AnkerToene() {
  const anker = VIOLIN_NOTEN.filter((n) => Array.of("C", "E", "G").includes(n.ton));
  const runden = mischeZufallKap6(Array.of(
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(0), anker.at(1), anker.at(2),
    anker.at(2), anker.at(0), anker.at(1), anker.at(2)
  ));
  let idx = 0;

  const render = (hinweis = "Welcher der 3 Anker-Töne (C, E oder G) steht hier im Violinschlüssel?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap6_1", 150, "Anker-Profi!", "C, E und G im Violinschlüssel erkennst du jetzt sofort!");
      return;
    }
    const ziel = runden.at(idx);
    const buttonsHTML = Array.of("C", "E", "G").map((t) => `
      <button class="answer-btn" style="background:#ede9fe; border-color:#7c3aed; color:#4c1d95; font-size:24px;"
              onclick="checkKap6Anker('${t}')">${t}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>6.1 Die 3 Anker-Töne (C – E – G)</span><span>${idx + 1} / ${runden.length}</span></div>
        ${baueViolinSystemSVG(Array.of({ stufe: ziel.stufe, farbe: "#7c3aed" }), { markiereGLinie: true })}
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${buttonsHTML}</div>
      </div>`;
  };

  window.checkKap6Anker = (wahl) => {
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

// 6.2 Alle Noten von C bis A im Violinschlüssel benennen (10 Runden)
function starteKap6NotennamenLesen() {
  const runden = mischeZufallKap6(Array.of(0, 1, 2, 3, 4, 5, 2, 4, 1, 3));
  let idx = 0;

  const render = (hinweis = "Wie heisst diese Note im Violinschlüssel?") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap6_2", 170, "Notennamen-Champion!", "Du liest alle Noten von C bis A im Violinschlüssel flüssig!");
      return;
    }
    const ziel = VIOLIN_NOTEN.at(runden.at(idx));
    const buttonsHTML = VIOLIN_NOTEN.map((n) => `
      <button class="answer-btn" style="background:#f5f3ff; border-color:#7c3aed; color:#3b0764; font-size:22px;"
              onclick="checkKap6Name('${n.ton}')">${n.ton}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>6.2 Notennamen lesen (C bis A)</span><span>${idx + 1} / ${runden.length}</span></div>
        ${baueViolinSystemSVG(Array.of({ stufe: ziel.stufe, farbe: "#7c3aed" }))}
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${buttonsHTML}</div>
      </div>`;
  };

  window.checkKap6Name = (wahl) => {
    const ziel = VIOLIN_NOTEN.at(runden.at(idx));
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
// 6.3 Note im Violinschlüssel lesen & direkt auf dem Klavier antippen (10 Runden)
function starteKap6NoteAufKlavier() {
  const runden = mischeZufallKap6(Array.of(0, 2, 4, 1, 3, 5, 2, 0, 4, 3));
  let idx = 0;

  const render = (hinweis = "Lies die Note oben und tippe die passende Taste auf dem Klavier an!") => {
    if (idx >= runden.length) {
      abschliessenSpiel("kap6_3", 190, "Blattspiel-Entdecker!", "Du setzt Noten aus dem Violinschlüssel direkt auf den Klaviertasten um!");
      return;
    }
    const ziel = VIOLIN_NOTEN.at(runden.at(idx));

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>6.3 Note auf dem Klavier finden</span><span>${idx + 1} / ${runden.length}</span></div>
        ${baueViolinSystemSVG(Array.of({ stufe: ziel.stufe, farbe: "#0284c7" }))}
        <p class="quiz-hint">${hinweis}</p>
        <div style="margin-top:8px;">
          ${baueKap6Klaviatur("checkKap6KlavierTaste")}
        </div>
      </div>`;
  };

  window.checkKap6KlavierTaste = (tonName, midi) => {
    const ziel = VIOLIN_NOTEN.at(runden.at(idx));
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

// 6.4 Bekannte Kinderlieder nach Noten direkt auf der Klaviatur spielen! (6 Kinderlieder)
function starteKap6KinderliederNoten() {
  const lieder = Array.of(
    {
      titel: "🦆 Alle meine Entchen (Anfang)",
      startTipp: "Starte auf C (links neben den Zwillingen)!",
      noten: Array.of(
        { stufe: 0, ton: "C", midi: 60, schlaege: 1 },
        { stufe: 1, ton: "D", midi: 62, schlaege: 1 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 1 },
        { stufe: 3, ton: "F", midi: 65, schlaege: 1 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 2 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 2 }
      )
    },
    {
      titel: "👦 Hänschen klein (Anfang)",
      startTipp: "Starte auf G (2. Linie – Schlüssel-Linie)!",
      noten: Array.of(
        { stufe: 4, ton: "G", midi: 67, schlaege: 1 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 1 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 2 },
        { stufe: 3, ton: "F", midi: 65, schlaege: 1 },
        { stufe: 1, ton: "D", midi: 62, schlaege: 1 },
        { stufe: 1, ton: "D", midi: 62, schlaege: 2 }
      )
    },
    {
      titel: "🔔 Bruder Jakob (Anfang)",
      startTipp: "Starte wieder auf C!",
      noten: Array.of(
        { stufe: 0, ton: "C", midi: 60, schlaege: 1 },
        { stufe: 1, ton: "D", midi: 62, schlaege: 1 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 1 },
        { stufe: 0, ton: "C", midi: 60, schlaege: 1 }
      )
    },
    {
      titel: "✨ Morgen kommt der Weihnachtsmann (Anfang)",
      startTipp: "Starte auf C und springe hoch zum G!",
      noten: Array.of(
        { stufe: 0, ton: "C", midi: 60, schlaege: 1 },
        { stufe: 0, ton: "C", midi: 60, schlaege: 1 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 1 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 1 },
        { stufe: 5, ton: "A", midi: 69, schlaege: 1 },
        { stufe: 5, ton: "A", midi: 69, schlaege: 1 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 2 }
      )
    },
    {
      titel: "🐦 Kuckuck, ruft’s aus dem Wald (Anfang)",
      startTipp: "Starte hoch auf G und springe zum E!",
      noten: Array.of(
        { stufe: 4, ton: "G", midi: 67, schlaege: 2 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 1 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 2 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 1 }
      )
    },
    {
      titel: "🎂 Backe, backe Kuchen (Anfang)",
      startTipp: "Starte auf C und hüpfe hoch!",
      noten: Array.of(
        { stufe: 0, ton: "C", midi: 60, schlaege: 1 },
        { stufe: 0, ton: "C", midi: 60, schlaege: 1 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 1 },
        { stufe: 2, ton: "E", midi: 64, schlaege: 1 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 1 },
        { stufe: 4, ton: "G", midi: 67, schlaege: 1 },
        { stufe: 5, ton: "A", midi: 69, schlaege: 2 }
      )
    }
  );
  let liedIdx = 0;
  let schritt = 0;

  const render = (hinweis = "") => {
    if (liedIdx >= lieder.length) {
      abschliessenSpiel("kap6_4", 230, "Konzert-Pianist!", "Du hast 6 echte Kinderlieder nach Noten auf dem Klavier gespielt!");
      return;
    }
    const lied = lieder.at(liedIdx);
    const text = hinweis || lied.startTipp;

    const svgNoten = lied.noten.map((n, i) => ({
      stufe: n.stufe,
      schlaege: n.schlaege,
      farbe: i < schritt ? "#16a34a" : i === schritt ? "#7c3aed" : "#0f172a",
      aktiv: i === schritt,
      label: i === 0 ? n.ton : ""
    }));

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>6.4 Kinderlieder nach Noten</span><span>Lied ${liedIdx + 1} / ${lieder.length}</span></div>
        <h2 style="margin-bottom:4px;">${lied.titel}</h2>
        ${baueViolinSystemSVG(svgNoten)}
        <p class="quiz-hint">${text}</p>
        <div style="margin-top:8px;">
          ${baueKap6Klaviatur("checkKap6LiedTaste")}
        </div>
      </div>`;
  };

  window.checkKap6LiedTaste = (tonName, midi) => {
    const lied = lieder.at(liedIdx);
    const ziel = lied.noten.at(schritt);
    if (tonName === ziel.ton) {
      klavierAudio.spieleMidi(ziel.midi);
      schritt++;
      if (schritt >= lied.noten.length) {
        liedIdx++;
        schritt = 0;
        render("Bravo! Wunderschön gespielt! 🎶 Auf zum nächsten Lied!");
      } else {
        render("Super! Weiter zur nächsten Note 🎵");
      }
    } else {
      klavierAudio.spieleMidi(midi);
      klavierAudio.spieleQuietsch();
      render(`Das war ${tonName} – schau genau, welche Note gerade lila leuchtet!`);
    }
  };
  render();
}
// 6.5 Ton & Rhythmus-Kombi: Tonname + Rhythmus-Wort (Da / Bon-bon) zusammen erkennen (10 Runden)
function starteKap6TonUndRhythmus() {
  const aufgaben = mischeZufallKap6(Array.of(
    { stufe: 0, ton: "C", schlaege: 1, wort: "Da", midi: 60 },
    { stufe: 4, ton: "G", schlaege: 2, wort: "Bon-bon", midi: 67 },
    { stufe: 2, ton: "E", schlaege: 1, wort: "Da", midi: 64 },
    { stufe: 1, ton: "D", schlaege: 2, wort: "Bon-bon", midi: 62 },
    { stufe: 3, ton: "F", schlaege: 1, wort: "Da", midi: 65 },
    { stufe: 5, ton: "A", schlaege: 2, wort: "Bon-bon", midi: 69 },
    { stufe: 4, ton: "G", schlaege: 1, wort: "Da", midi: 67 },
    { stufe: 0, ton: "C", schlaege: 2, wort: "Bon-bon", midi: 60 },
    { stufe: 2, ton: "E", schlaege: 2, wort: "Bon-bon", midi: 64 },
    { stufe: 5, ton: "A", schlaege: 1, wort: "Da", midi: 69 }
  ));
  let idx = 0;

  const render = (hinweis = "Welcher Tonname UND welches Rhythmus-Wort passen zu dieser Note?") => {
    if (idx >= aufgaben.length) {
      abschliessenSpiel("kap6_5", 210, "Kombi-Genie!", "Du liest gleichzeitig Tonhöhe und Rhythmus wie ein echter Musiker!");
      return;
    }
    const akt = aufgaben.at(idx);
    const falschTon = akt.ton === "G" ? "E" : "G";
    const falschWort = akt.wort === "Da" ? "Bon-bon" : "Da";

    const optionen = mischeZufallKap6(Array.of(
      { text: `${akt.ton} – ${akt.wort}`, richtig: true },
      { text: `${akt.ton} – ${falschWort}`, richtig: false },
      { text: `${falschTon} – ${akt.wort}`, richtig: false },
      { text: `${falschTon} – ${falschWort}`, richtig: false }
    ));

    const buttonsHTML = optionen.map((opt) => `
      <button class="answer-btn" style="background:#f5f3ff; border-color:#7c3aed; font-size:20px;"
              onclick="checkKap6Kombi(${opt.richtig})">${opt.text}</button>`).join("");

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="quiz-meta"><span>6.5 Ton & Rhythmus-Kombi</span><span>${idx + 1} / ${aufgaben.length}</span></div>
        ${baueViolinSystemSVG(Array.of({ stufe: akt.stufe, schlaege: akt.schlaege, farbe: "#7c3aed" }))}
        <p class="quiz-hint">${hinweis}</p>
        <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${buttonsHTML}</div>
      </div>`;
  };

  window.checkKap6Kombi = (richtig) => {
    const akt = aufgaben.at(idx);
    klavierAudio.spieleMidi(akt.midi, akt.schlaege === 2 ? 1.2 : 0.6);
    if (richtig) {
      idx++;
      render("Volltreffer! Ton UND Rhythmus stimmen ✅");
    } else {
      klavierAudio.spieleQuietsch();
      render("Schau auf beides: Wo liegt der Notenkopf, und ist er schwarz (Da) oder weiss (Bon-bon)?");
    }
  };
  render();
}
// 6.6 Finale Abschluss-Prüfung: Piano-Kids Meister-Diplom! (10 Runden)
function starteKap6FinaleDiplom() {
  const fragen = mischeZufallKap6(Array.of(
    { modus: "note", stufe: 0, ton: "C", midi: 60 },
    { modus: "note", stufe: 4, ton: "G", midi: 67 },
    { modus: "note", stufe: 2, ton: "E", midi: 64 },
    { modus: "klavier", stufe: 3, ton: "F", midi: 65 },
    { modus: "klavier", stufe: 5, ton: "A", midi: 69 },
    { modus: "rhythmus", wort: "Kau-gum-mi", schlaege: 3 },
    { modus: "rhythmus", wort: "Gum-mi-bär-chen", schlaege: 4 },
    { modus: "klavier", stufe: 1, ton: "D", midi: 62 },
    { modus: "note", stufe: 5, ton: "A", midi: 69 },
    { modus: "rhythmus", wort: "Bon-bon", schlaege: 2 }
  ));
  let idx = 0;
  let leben = 3;

  const zeigeDiplomUrkunde = () => {
    if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti(true);
    const daten = ladeFortschritt();
    if (!daten.erledigt.includes("kap6_6")) daten.erledigt.push("kap6_6");
    daten.sterne += 300;
    speichereFortschritt(daten);

    document.getElementById("main-content").innerHTML = `
      <div id="msam-diplom-karte" class="card" style="text-align:center; padding:32px 20px; border:4px solid #f59e0b; background:linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);">
        <div style="font-size:62px; margin-bottom:6px;">🎓🎶🏆</div>
        <div style="font-size:14px; font-weight:900; letter-spacing:2px; color:#b45309; text-transform:uppercase;">Offizielles Musikschul-Zertifikat</div>
        <h1 style="margin:8px 0; color:#1e1b4b;">MSAM Musik-Kids Meister-Diplom</h1>

        <div style="margin:14px auto; max-width:340px;">
          <input id="diplom-name-input" type="text" placeholder="Dein Vorname hier eintippen..."
                 oninput="document.getElementById('diplom-name-anzeige').textContent = this.value.trim() || 'Super-Musiker/in'"
                 style="width:100%; padding:10px 14px; font-size:18px; font-weight:700; text-align:center; border:2px solid #f59e0b; border-radius:12px; background:#ffffff; color:#1e1b4b;" />
        </div>

        <div style="font-size:15px; color:#64748b; margin-top:6px;">Verliehen an</div>
        <div id="diplom-name-anzeige" style="font-size:30px; font-weight:900; color:#b45309; margin:4px 0 14px; font-family:Georgia, serif;">
          Super-Musiker/in
        </div>

        <p style="font-size:17px; color:#334155; max-width:480px; margin:0 auto 16px;">
          Herzlichen Glückwunsch! Du hast alle Kapitel gemeistert: Stammtöne, Tasten, Notenlesen, Rhythmus & Violinschlüssel!
        </p>
        <div class="reward-badge" style="font-size:20px;">+300 Bonus-Sterne ⭐ (Gesamt: ${daten.sterne} ⭐)</div>
        <div style="margin-top:24px; display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
          <button class="btn-primary" style="background:#f59e0b; border-color:#d97706;" onclick="if (typeof druckeMsamDiplom === 'function') { druckeMsamDiplom(document.getElementById('diplom-name-anzeige').textContent, ${daten.sterne}); } else { window.print(); }">🖨️ Diplom drucken</button>
          <button class="btn-primary" onclick="zeigeStartseite()">Zurück zur Übersicht</button>
        </div>
      </div>`;
  };

  const render = (hinweis = "") => {
    if (leben <= 0) {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:32px;">
          <div style="font-size:52px;">💔</div>
          <h2>Fast am Diplom!</h2>
          <p class="quiz-hint" style="margin:10px 0 20px;">Alle 3 Herzen aufgebraucht – starte gleich den nächsten Versuch!</p>
          <button class="btn-primary" onclick="starteKap6FinaleDiplom()">Abschlussprüfung neu starten</button>
        </div>`;
      return;
    }
    if (idx >= fragen.length) {
      zeigeDiplomUrkunde();
      return;
    }

    const akt = fragen.at(idx);
    const herzen = "❤️".repeat(leben) + "🤍".repeat(3 - leben);

    if (akt.modus === "note") {
      const btns = Array.of("C", "D", "E", "F", "G", "A").map((t) => `
        <button class="answer-btn" style="background:#ede9fe; border-color:#7c3aed; font-size:22px;"
                onclick="checkKap6FinaleWahl(${t === akt.ton}, ${akt.midi})">${t}</button>`).join("");
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>🎓 Finale ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          ${baueViolinSystemSVG(Array.of({ stufe: akt.stufe, farbe: "#7c3aed" }))}
          <p class="quiz-hint">${hinweis || "Wie heisst diese Note im Violinschlüssel?"}</p>
          <div class="answer-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:14px;">${btns}</div>
        </div>`;
    } else if (akt.modus === "rhythmus") {
      const btns = Array.of(1, 2, 3, 4).map((s) => `
        <button class="answer-btn" style="background:#fef3c7; border-color:#f59e0b; font-size:20px;"
                onclick="checkKap6FinaleWahl(${s === akt.schlaege}, 64)">${s} ${s === 1 ? "Schlag" : "Schläge"}</button>`).join("");
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>🎓 Finale ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          <div style="font-size:32px; font-weight:900; color:#b45309; margin:18px 0;">„${akt.wort}“</div>
          <p class="quiz-hint">${hinweis || "Wie viele Schläge dauert dieses Rhythmus-Wort?"}</p>
          <div class="answer-grid" style="grid-template-columns:1fr 1fr; margin-top:14px;">${btns}</div>
        </div>`;
    } else {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center;">
          <div class="quiz-meta"><span>🎓 Finale ${idx + 1} / ${fragen.length}</span><span>${herzen}</span></div>
          ${baueViolinSystemSVG(Array.of({ stufe: akt.stufe, farbe: "#0284c7" }))}
          <p class="quiz-hint">${hinweis || "Lies die Note und tippe die passende Taste auf dem Klavier!"}</p>
          <div style="margin-top:8px;">${baueKap6Klaviatur("checkKap6FinaleKlavier")}</div>
        </div>`;
    }
  };

  window.checkKap6FinaleWahl = (richtig, midi) => {
    klavierAudio.spieleMidi(midi, 0.6);
    if (richtig) {
      idx++;
      render("Stark! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render("Daneben! (-1 Herz)");
    }
  };

  window.checkKap6FinaleKlavier = (tonName, midi) => {
    const akt = fragen.at(idx);
    klavierAudio.spieleMidi(midi);
    if (tonName === akt.ton) {
      idx++;
      render("Volltreffer! ✅");
    } else {
      leben--;
      klavierAudio.spieleQuietsch();
      render(`Das war ${tonName}! (-1 Herz)`);
    }
  };

  render();
}

// Kompatible Klaviatur für Kapitel 6 (funktioniert mit jeder keyboard.js-Version)
function baueKap6Klaviatur(callbackName) {
  const weisseToene = Array.of(
    { ton: "C", midi: 60 }, { ton: "D", midi: 62 }, { ton: "E", midi: 64 },
    { ton: "F", midi: 65 }, { ton: "G", midi: 67 }, { ton: "A", midi: 69 },
    { ton: "H", midi: 71 }, { ton: "C", midi: 72 }, { ton: "D", midi: 74 },
    { ton: "E", midi: 76 }, { ton: "F", midi: 77 }, { ton: "G", midi: 79 },
    { ton: "A", midi: 81 }, { ton: "H", midi: 83 }
  );
  const schwarzePositionen = Array.of(
    { idx: 0, midi: 61 }, { idx: 1, midi: 63 },
    { idx: 3, midi: 66 }, { idx: 4, midi: 68 }, { idx: 5, midi: 70 },
    { idx: 7, midi: 73 }, { idx: 8, midi: 75 },
    { idx: 10, midi: 78 }, { idx: 11, midi: 80 }, { idx: 12, midi: 82 }
  );

  const wBreite = 42;
  const wHoehe = 155;
  const gesamtBreite = weisseToene.length * wBreite;

  const weisseSVG = weisseToene.map((t, i) => `
    <rect x="${i * wBreite}" y="0" width="${wBreite}" height="${wHoehe}" rx="0" ry="6"
          fill="#ffffff" stroke="#1e293b" stroke-width="2" style="cursor:pointer;"
          onclick="${callbackName}('${t.ton}', ${t.midi})" />`).join("");

  const schwarzeSVG = schwarzePositionen.map((s) => `
    <rect x="${(s.idx + 1) * wBreite - 13}" y="0" width="26" height="96" rx="0" ry="5"
          fill="#0f172a" stroke="#000000" stroke-width="1.5" style="cursor:pointer;"
          onclick="klavierAudio.spieleMidi(${s.midi}, 0.4)" />`).join("");

  return `
    <div style="display:flex; justify-content:center; overflow-x:auto; margin-top:8px;">
      <svg viewBox="0 0 ${gesamtBreite} ${wHoehe}" style="width:100%; max-width:588px; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        ${weisseSVG}
        ${schwarzeSVG}
      </svg>
    </div>`;
}
