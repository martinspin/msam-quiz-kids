// 1/3 APP.JS: Kapitel-Daten (Stufe 1 & Stufe 2)

const KAPITEL_DATEN = Array.of(
  {
    id: 0,
    stufe: 1,
    titel: "1. Gehör & Klang-Entdecker",
    icon: "👂",
    farbe: "#f59e0b",
    beschreibung: "Melodie-Richtung, Schritt oder Sprung, Staccato, Legato, Dur & Moll!",
    spiele: Array.of(
      { id: "kap0_2", titel: "1.1 Steigt oder fällt die Melodie?", punkte: 100, startFn: "starteKap0Spiel(1)" },
      { id: "kap0_3", titel: "1.2 Schritt oder Sprung?", punkte: 100, startFn: "starteKap0Spiel(2)" },
      { id: "kap0_4", titel: "1.3 Staccato oder Legato?", punkte: 120, startFn: "starteKap0Spiel(3)" },
      { id: "kap0_5", titel: "1.4 Dur oder Moll?", punkte: 150, startFn: "starteKap0Spiel(4)" },
      { id: "kap0_boss", titel: "1.5 Boss-Challenge: Gehör-Meister", punkte: 250, startFn: "starteKap0Spiel(5)" }
    )
  },
   {
    id: 1,
    stufe: 1,
    titel: "2. Die 7 Stammtöne",
    icon: "🔤",
    farbe: "#e11d48",
    beschreibung: "C, D, E, F, G, A, H – lerne das musikalische Alphabet vorwärts und rückwärts!",
    spiele: Array.of(
      { id: "kap1_1", titel: "2.1 Ordne die Töne", punkte: 120, startFn: "starteKap1Spiel(1)" },
      { id: "kap1_2", titel: "2.2 Stammton oder nicht?", punkte: 120, startFn: "starteKap1Spiel(2)" },
      { id: "kap1_3", titel: "2.3 Finde den Nachbarn", punkte: 140, startFn: "starteKap1Spiel(3)" },
      { id: "kap1_4", titel: "2.4 Lücken-Detektiv", punkte: 140, startFn: "starteKap1Spiel(4)" },
      { id: "kap1_6", titel: "2.5 Stammtöne-Meister", punkte: 200, startFn: "starteKap1Spiel(6)" }
    )
  },
 {
    id: 2,
    stufe: 1,
    titel: "3. Klaviatur-Entdecker",
    icon: "🎹",
    farbe: "#d97706",
    beschreibung: "Zwillinge, Drillinge und alle weissen Tasten – werde zum echten Tasten-Profi!",
    spiele: Array.of(
      { id: "kap2_1", titel: "3.1 Zwillinge & Drillinge", punkte: 120, startFn: "starteKap2Spiel(1)" },
      { id: "kap2_2", titel: "3.2 C – D – E an den Zwillingen", punkte: 140, startFn: "starteKap2Spiel(2)" },
      { id: "kap2_3", titel: "3.3 F – G – A – H an den Drillingen", punkte: 140, startFn: "starteKap2Spiel(3)" },
      { id: "kap2_4", titel: "3.4 Welche Taste leuchtet?", punkte: 150, startFn: "starteKap2Spiel(4)" },
      { id: "kap2_6", titel: "3.5 Klaviertasten-Meister", punkte: 250, startFn: "starteKap2Spiel(6)" }
    )
  },
{
    id: 4,
    stufe: 1,
    titel: "4. Noten lesen lernen",
    icon: "🎼",
    farbe: "#4f46e5",
    beschreibung: "Linien, Zwischenräume, Schritte & Sprünge im Notensystem!",
    spiele: Array.of(
      { id: "kap4_1", titel: "4.1 Linie oder Zwischenraum?", punkte: 120, startFn: "starteKap4Spiel(1)" },
      { id: "kap4_2", titel: "4.2 Höher, tiefer oder gleich?", punkte: 140, startFn: "starteKap4Spiel(2)" },
      { id: "kap4_3", titel: "4.3 Schritte & Sprünge", punkte: 150, startFn: "starteKap4Spiel(3)" },
      { id: "kap4_4", titel: "4.4 Melodie-Verlauf lesen", punkte: 180, startFn: "starteKap4Spiel(4)" },
      { id: "kap4_5", titel: "4.5 Noten-Detektiv Boss", punkte: 250, startFn: "starteKap4Spiel(5)" }
    )
  },
  
    {
    id: 5,
    stufe: 1,
    titel: "5. Rhythmus & Notenwerte",
    icon: "🥁",
    farbe: "#ea580c",
    beschreibung: "Viertel, Halbe und Ganze Noten: Klatsche und zähle den Takt wie ein Profi!",
    spiele: Array.of(
      { id: "kap5_1", titel: "5.1 Notenwerte erkennen", punkte: 120, startFn: "starteKap5Spiel(1)" },
      { id: "kap5_2", titel: "5.2 Schläge zählen", punkte: 130, startFn: "starteKap5Spiel(2)" },
      { id: "kap5_3", titel: "5.3 Rhythmus klopfen", punkte: 150, startFn: "starteKap5Spiel(3)" },
      { id: "kap5_4", titel: "5.4 Takt-Baumeister", punkte: 160, startFn: "starteKap5Spiel(4)" },
      { id: "kap5_5", titel: "5.5 Rhythmus-Meister", punkte: 200, startFn: "starteKap5Spiel(5)" }
    )
  },
    {
    id: 6,
    stufe: 1,
    titel: "6. Violinschlüssel & Notennamen",
    icon: "🎼",
    farbe: "#7c3aed",
    beschreibung: "Die 3 Anker-Töne C–E–G, Noten von C bis A lesen und erste Lieder spielen!",
    spiele: Array.of(
      { id: "kap6_1", titel: "6.1 Die 3 Anker-Töne (C – E – G)", punkte: 150, startFn: "starteKap6Spiel(1)" },
      { id: "kap6_2", titel: "6.2 Notennamen lesen (C bis A)", punkte: 170, startFn: "starteKap6Spiel(2)" },
      { id: "kap6_3", titel: "6.3 Note auf dem Klavier finden", punkte: 190, startFn: "starteKap6Spiel(3)" },
      { id: "kap6_4", titel: "6.4 Kinderlieder nach Noten spielen", punkte: 230, startFn: "starteKap6Spiel(4)" },
      { id: "kap6_5", titel: "6.5 Violinschlüssel-Meister", punkte: 280, startFn: "starteKap6Spiel(5)" }
    )
  },

  {
    id: 7,
    stufe: 2,
    titel: "7. Violinschlüssel bis g''",
    icon: "🚀",
    farbe: "#db2777",
    beschreibung: "Hoch hinaus: Lerne h', c'', d'', e'', f'' und das zweigestrichene g'' auf dem Dach!",
    spiele: Array.of(
      { id: "kap7_1", titel: "7.1 Anker-Töne oben (c''–e''–g'')", punkte: 160, startFn: "starteKap7Spiel(1)" },
      { id: "kap7_2", titel: "7.2 Alle Noten von g' bis g''", punkte: 180, startFn: "starteKap7Spiel(2)" },
      { id: "kap7_3", titel: "7.3 Hohe Note auf dem Klavier", punkte: 200, startFn: "starteKap7Spiel(3)" },
      { id: "kap7_4", titel: "7.4 Melodien im grossen Tonraum", punkte: 230, startFn: "starteKap7Spiel(4)" },
      { id: "kap7_6", titel: "7.5 Höhenflug-Meister", punkte: 250, startFn: "starteKap7Spiel(5)" }
    )
  },
  {
    id: 8,
    stufe: 2,
    titel: "8. Bassschlüssel (Linke Hand)",
    icon: "𝄢",
    farbe: "#2563eb",
    beschreibung: "Tiefe Töne entdecken: Lerne den Bassschlüssel von c bis c' für die linke Hand!",
    spiele: Array.of(
      { id: "kap8_1", titel: "8.1 Anker-Töne im Bass (f – a – c')", punkte: 160, startFn: "starteKap8Spiel(1)" },
      { id: "kap8_2", titel: "8.2 Notennamen lesen (f bis c')", punkte: 180, startFn: "starteKap8Spiel(2)" },
      { id: "kap8_3", titel: "8.3 Bass-Note auf dem Klavier (ganze Oktave c bis c')", punkte: 200, startFn: "starteKap8Spiel(3)" },
      { id: "kap8_4", titel: "8.4 Kleine Bass-Melodien", punkte: 230, startFn: "starteKap8Spiel(4)" },
      { id: "kap8_6", titel: "8.5 Bassschlüssel-Profi", punkte: 250, startFn: "starteKap8Spiel(5)" }
    )
  }
);

// 2/3 APP.JS: Fortschritts-Speicher & Startseite (mit Auto-Schliessen erledigter Stufen)

function speicherSchluessel() {
  const profil = typeof ladeMsamProfil === "function" ? ladeMsamProfil() : null;
  return profil && profil.id ? `msam_quizkids_stand_${profil.id}` : "klavierEntdeckerFortschritt";
}

function ladeFortschritt() {
  const profil = typeof ladeMsamProfil === "function" ? ladeMsamProfil() : null;
  const schluessel = Array.of(
    "klavierEntdeckerFortschritt",
    profil && profil.id ? `msam_quizkids_stand_${profil.id}` : null
  ).filter(Boolean);

  let besteSterne = 0;
  const erledigtSet = new Set();

  schluessel.forEach((key) => {
    try {
      const roh = localStorage.getItem(key);
      if (roh) {
        const parsed = JSON.parse(roh);
        if ((Number(parsed.sterne) || 0) > besteSterne) {
          besteSterne = Number(parsed.sterne) || 0;
        }
        if (Array.isArray(parsed.erledigt)) {
          parsed.erledigt.forEach((id) => erledigtSet.add(id));
        }
      }
    } catch (e) {}
  });

  return { sterne: besteSterne, erledigt: Array.from(erledigtSet) };
}

function speichereFortschritt(daten) {
  const profil = typeof ladeMsamProfil === "function" ? ladeMsamProfil() : null;
  const schluessel = Array.of(
    "klavierEntdeckerFortschritt",
    profil && profil.id ? `msam_quizkids_stand_${profil.id}` : null
  ).filter(Boolean);

  schluessel.forEach((key) => {
    try {
      localStorage.setItem(key, JSON.stringify(daten));
    } catch (e) {}
  });
  aktualisiereSterneAnzeige();
}

function aktualisiereSterneAnzeige() {
  const el = document.getElementById("star-count");
  if (el) el.textContent = ladeFortschritt().sterne;
}

function toggleMsamStufe(nr) {
  const inhalt = document.getElementById(`stufe-inhalt-${nr}`);
  const pfeil = document.getElementById(`stufe-pfeil-${nr}`);
  if (!inhalt) return;
  const istGeradeOffen = inhalt.style.display !== "none";
  inhalt.style.display = istGeradeOffen ? "none" : "block";
  if (pfeil) pfeil.textContent = istGeradeOffen ? "▶" : "▼";
}

function zeigeStartseite() {
  if (typeof appMusik !== "undefined" && typeof appMusik.resumeWennAktiv === "function") {
    appMusik.resumeWennAktiv();
  }
  if (typeof ladeMsamProfil === "function" && !ladeMsamProfil()) {
    zeigeMsamAnmeldung(false);
    return;
  }
  aktualisiereSterneAnzeige();
  const daten = ladeFortschritt();
  const profil = typeof ladeMsamProfil === "function" ? ladeMsamProfil() : null;
  const begruessung = profil
    ? `Hallo ${profil.vorname}! 🎹`
    : `Willkommen bei <span style="text-transform:lowercase;">msam quiz kids</span>! 🎹`;

   const stufenMeta = Array.of(
    { nr: 1, titel: "Stufe 1 · Einsteiger-Kids", untertitel: "Gehör, Stammtöne, Klaviatur, Violinschlüssel (c'–g') & Rhythmus", farbe: "#e11d48", duellTitel: "🐎 Musik-Pferderennen gegen Blitz-Huf" },
    { nr: 2, titel: "Stufe 2 · Entdecker-Kids", untertitel: "Violinschlüssel bis g'', Bassschlüssel (c–c'), Achtel & Vorzeichen", farbe: "#7c3aed", duellTitel: "🐸 Frosch-Hüpfen gegen Quak-Bot" },
    { nr: 3, titel: "Stufe 3 · Rhythmus-Profis", untertitel: "Auflösungszeichen, punktierte Noten, Taktarten & Pausenwerte", farbe: "#0d9488", duellTitel: "🐢 Schildkröten-Sprint gegen Turbo-Panzer" },
    { nr: 4, titel: "Stufe 4 · Tonleiter-Surfer", untertitel: "Halbton- & Ganztonschritte, Oktave & erste Dur-Tonleitern", farbe: "#2563eb", duellTitel: "🐬 Delfin-Wellenreiten gegen Sonar-Bot" },
    { nr: 5, titel: "Stufe 5 · Intervall-Flieger", untertitel: "Prime bis Oktave hören & bestimmen, Dynamik & Tempozeichen", farbe: "#6d28d9", duellTitel: "🦅 Adler-Gipfelflug gegen Sturm-Schwinge" },
    { nr: 6, titel: "Stufe 6 · Vorzeichen-Füchse", untertitel: "Quintenzirkel mit Kreuzen (♯) & Bes (♭), Moll-Parallelen", farbe: "#ea580c", duellTitel: "🦊 Fuchs-Fährtenjagd gegen Schlau-Bot" },
    { nr: 7, titel: "Stufe 7 · Akkord-Bändiger", untertitel: "Dur- & Moll-Dreiklänge, Umkehrungen & Begleitmuster", farbe: "#dc2626", duellTitel: "🐉 Drachen-Wolkenritt gegen Funken-Flug" },
    { nr: 8, titel: "Stufe 8 · Musik-Meister:innen", untertitel: "Kadenzen, Formenlehre, Gehör-Mix & grosses Abschluss-Finale", farbe: "#d97706", duellTitel: "🦁 Meister-Löwen-Finale gegen Maestro-Bot" }
  );


  let ersteAktiveGefunden = false;

  const stufenHTML = stufenMeta.map((st) => {
    const stufenKapitel = KAPITEL_DATEN.filter((k) => (k.stufe || 1) === st.nr);
    const gesamtSpiele = stufenKapitel.reduce((sum, k) => sum + k.spiele.length, 0);
    const erledigtSpiele = stufenKapitel.reduce(
      (sum, k) => sum + k.spiele.filter((s) => daten.erledigt.includes(s.id)).length,
      0
    );

    const istFertig = gesamtSpiele > 0 && erledigtSpiele >= gesamtSpiele;
    let istOffen = false;
    if (!istFertig && !ersteAktiveGefunden) {
      istOffen = true;
      ersteAktiveGefunden = true;
    }

    const statusBadge = istFertig
      ? `<span style="background:#dcfce7; border:2px solid #16a34a; border-radius:999px; padding:4px 12px; font-size:13px; font-weight:800; color:#15803d;">✅ Geschafft</span>`
      : `<span style="background:#ffffff; border:2px solid #cbd5e1; border-radius:999px; padding:4px 12px; font-size:13px; font-weight:800; color:#334155;">${erledigtSpiele} / ${gesamtSpiele} ⭐</span>`;

    const kartenHTML = stufenKapitel.map((kap) => {
      const erledigtAnzahl = kap.spiele.filter((s) => daten.erledigt.includes(s.id)).length;
      return `
        <div class="chapter-card" style="border-top: 6px solid ${kap.farbe}; cursor:pointer;"
             onclick="zeigeKapitel(${kap.id})">
          <div class="chapter-icon">${kap.icon}</div>
          <h3>${kap.titel}</h3>
          <p>${kap.beschreibung}</p>
          <div class="chapter-progress">${erledigtAnzahl} / ${kap.spiele.length} Spiele gemeistert</div>
        </div>`;
    }).join("");

    const duellLeisteHTML = istFertig
      ? `<div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:14px 20px; background:linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-top:2px solid #c4b5fd; flex-wrap:wrap;">
          <div>
            <div style="font-size:15px; font-weight:900; color:#5b21b6;">⚔️ Stufen-Duell freigeschaltet: ${st.duellTitel}</div>
            <div style="font-size:12px; color:#6d28d9;">Tritt jetzt gegen den Computer an (+15 Bonus-⭐)!</div>
          </div>
          <button type="button" class="btn-primary" style="background:#7c3aed; flex-shrink:0;" onclick="starteStufenDuell(${st.nr})">Duell starten! 🚀</button>
        </div>`
      : `<div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px 20px; background:#f8fafc; border-top:1px dashed #cbd5e1; color:#64748b; flex-wrap:wrap;">
          <div style="font-size:14px; font-weight:700;">🔒 Stufen-Duell: ${st.duellTitel} <span style="font-weight:400; font-size:12px;">(wird freigeschaltet, sobald alle Spiele dieser Stufe geschafft sind)</span></div>
        </div>`;

    return `
      <div style="margin-bottom: 18px; border-radius: 18px; overflow: hidden; border: 2px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
        <button type="button" onclick="toggleMsamStufe(${st.nr})"
                style="width:100%; display:flex; justify-content:space-between; align-items:center; padding:16px 20px; background:${istFertig ? "#f0fdf4" : "#f8fafc"}; border:none; border-left:8px solid ${istFertig ? "#16a34a" : st.farbe}; cursor:pointer; text-align:left; gap:12px;">
          <div>
            <div style="font-size:19px; font-weight:900; color:#0f172a;">${st.titel}</div>
            <div style="font-size:13px; color:#475569; margin-top:2px;">${st.untertitel}</div>
          </div>
          <div style="display:flex; align-items:center; gap:12px; flex-shrink:0;">
            ${statusBadge}
            <span id="stufe-pfeil-${st.nr}" style="font-size:16px; font-weight:900; color:#475569;">${istOffen ? "▼" : "▶"}</span>
          </div>
        </button>
        <div id="stufe-inhalt-${st.nr}" style="display:${istOffen ? "block" : "none"}; padding:16px;">
          <div class="chapters-grid">${kartenHTML}</div>
        </div>
        ${duellLeisteHTML}
      </div>`;
  }).join("");

  document.getElementById("main-content").innerHTML = `
    <div class="hero-box">
      <div style="font-size:13px; font-weight:800; color:#e11d48; text-transform:lowercase; margin-bottom:4px;">
        musikschule appenzeller mittelland
      </div>
      <h1>${begruessung}</h1>
      <p>Wähle eine Stufe und ein Kapitel aus, um Sterne zu sammeln!</p>
      ${typeof baueMsamStatusLeiste === "function" ? baueMsamStatusLeiste() : ""}
    </div>
    ${stufenHTML}
    ${baueMsamDiplomBox(daten, profil)}`;
}

function druckeMsamDiplom(name, sterne) {
  const datum = new Date().toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const fenster = window.open("", "_blank", "width=900,height=680");
  if (!fenster) {
    window.print();
    return;
  }
  fenster.document.write(`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Musik-Diplom – ${name}</title>
  <style>
    @page { size: A4 landscape; margin: 14mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #fffbeb;
      color: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .urkunde {
      width: 100%;
      max-width: 980px;
      background: linear-gradient(180deg, #fffbeb 0%, #ffffff 50%, #fef3c7 100%);
      border: 8px double #d97706;
      border-radius: 24px;
      padding: 44px 48px;
      text-align: center;
      box-shadow: 0 12px 35px rgba(180, 83, 9, 0.15);
    }
    .schule {
      font-size: 16px;
      font-weight: 800;
      color: #e11d48;
      letter-spacing: 0.6px;
      margin-bottom: 10px;
    }
    .emoji { font-size: 58px; margin: 8px 0; }
    h1 {
      font-size: 40px;
      font-weight: 900;
      color: #92400e;
      margin: 6px 0 18px;
    }
    .sub { font-size: 18px; color: #475569; }
    .name {
      font-size: 38px;
      font-weight: 900;
      color: #0f172a;
      margin: 14px auto;
      padding: 8px 28px;
      border-bottom: 3px solid #f59e0b;
      display: inline-block;
    }
    .text {
      font-size: 19px;
      line-height: 1.6;
      color: #334155;
      max-width: 680px;
      margin: 14px auto 28px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 36px;
      padding-top: 18px;
      border-top: 1px solid #fde68a;
      font-size: 15px;
      color: #64748b;
    }
    .sig { text-align: center; min-width: 220px; }
    .sig-line { border-top: 1.5px solid #94a3b8; margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="urkunde">
    <div class="schule">🎶 musikschule appenzeller mittelland · msam quiz kids</div>
    <div class="emoji">🎓🏆🎹</div>
    <h1>Offizielles Musik-Diplom</h1>
    <div class="sub">Hiermit wird feierlich bestätigt, dass</div>
    <div class="name">${name}</div>
    <div class="text">
      die <strong>Stufe 1 (Einsteiger-Kids)</strong> in Musiklehre, Gehörbildung,
      Klaviatur, Notenlesen und Rhythmus erfolgreich gemeistert und dabei stolze
      <strong>${sterne} ⭐</strong> gesammelt hat!
    </div>
    <div class="footer">
      <div class="sig">
        <div style="font-weight:700; color:#0f172a; margin-bottom:4px;">${datum}</div>
        <div class="sig-line"></div>
        <div>Datum</div>
      </div>
      <div style="font-size:36px;">🌟</div>
      <div class="sig">
        <div style="font-weight:700; color:#e11d48; margin-bottom:4px;">msam quiz kids</div>
        <div class="sig-line"></div>
        <div>musikschule appenzeller mittelland</div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 250);
    };
  </script>
</body>
</html>`);
  fenster.document.close();
}

function baueMsamDiplomBox(daten, profil) {
  const stufe1Kapitel = KAPITEL_DATEN.filter((k) => (k.stufe || 1) === 1);
  const stufe1Gesamt = stufe1Kapitel.reduce((sum, k) => sum + k.spiele.length, 0);
  const stufe1Erledigt = stufe1Kapitel.reduce(
    (sum, k) => sum + k.spiele.filter((s) => daten.erledigt.includes(s.id)).length,
    0
  );
  const stufe1Geschafft = stufe1Erledigt >= stufe1Gesamt || stufe1Erledigt >= 20 || daten.sterne >= 2000;
  const name = profil ? `${profil.vorname} ${profil.nachname || ""}`.trim() : "Klavier-Entdecker/in";
  const sichererName = name.replace(/'/g, "\\'");

  if (!stufe1Geschafft) {
    return `
      <div class="card" style="margin-top:20px; text-align:center; border:2px dashed #cbd5e1; background:#f8fafc;">
        <div style="font-size:34px;">🎓</div>
        <h3 style="margin:6px 0;">Dein musikschule appenzeller mittelland Diplom</h3>
        <p style="color:#64748b; font-size:14px;">Meistere alle Kapitel der Stufe 1, um dein persönliches Diplom freizuschalten!</p>
      </div>`;
  }

  return `
    <div id="msam-diplom-karte" class="card" style="margin-top:22px; text-align:center; border:4px double #d97706; background:linear-gradient(180deg, #fffbeb 0%, #ffffff 100%); padding:28px 20px;">
      <div style="font-size:13px; font-weight:800; color:#e11d48; text-transform:lowercase; letter-spacing:0.5px;">
        musikschule appenzeller mittelland · msam quiz kids
      </div>
      <div style="font-size:46px; margin:8px 0;">🎓🏆🎶</div>
      <h2 style="font-size:24px; color:#92400e; margin:4px 0;">Offizielles Musik-Diplom</h2>
      <p style="font-size:15px; color:#475569; margin:8px 0;">Hiermit wird bestätigt, dass</p>
      <div style="font-size:26px; font-weight:900; color:#0f172a; margin:6px 0;">${name}</div>
      <p style="font-size:15px; color:#334155; max-width:480px; margin:8px auto;">
        die <strong>Stufe 1 (Einsteiger-Kids)</strong> erfolgreich gemeistert und dabei stolze
        <strong>${daten.sterne} ⭐</strong> gesammelt hat!
      </p>
      <div style="margin-top:16px;">
        <button class="btn-primary" style="background:#d97706;" onclick="druckeMsamDiplom('${sichererName}', ${daten.sterne})">🖨️ Diplom drucken / als PDF speichern</button>
      </div>
    </div>`;
}

function zeigeKapitel(kapitelId) {
  const kap = KAPITEL_DATEN.find((k) => k.id === kapitelId);
  if (!kap) { zeigeStartseite(); return; }
  const daten = ladeFortschritt();

  const spieleHTML = kap.spiele.map((sp) => {
    const geschafft = daten.erledigt.includes(sp.id);
    return `
      <div class="card" style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:12px; border-left:6px solid ${geschafft ? "#16a34a" : kap.farbe};">
        <div>
          <div style="font-size:17px; font-weight:800; color:#0f172a;">${geschafft ? "✅ " : ""}${sp.titel}</div>
          <div style="font-size:13px; color:#64748b;">Belohnung: +${sp.punkte} ⭐</div>
        </div>
        <button class="btn-primary" style="background:${kap.farbe}; flex-shrink:0;" onclick="${sp.startFn}">
          ${geschafft ? "Nochmal" : "Spielen"}
        </button>
      </div>`;
  }).join("");

  document.getElementById("main-content").innerHTML = `
    <div style="margin-bottom:14px;">
      <button class="btn-ghost" onclick="zeigeStartseite()">← Zurück zur Übersicht</button>
    </div>
    <div class="hero-box" style="border-top: 6px solid ${kap.farbe};">
      <div style="font-size:38px;">${kap.icon}</div>
      <h1>${kap.titel}</h1>
      <p>${kap.beschreibung}</p>
    </div>
    ${spieleHTML}`;
}


function starteKapitelKonfetti() {
  const farben = Array.of("#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899");
  const container = document.createElement("div");
  container.style.cssText = "position:fixed; inset:0; pointer-events:none; overflow:hidden; z-index:9999;";
  document.body.appendChild(container);

  for (let i = 0; i < 85; i++) {
    const schnipsel = document.createElement("div");
    const farbe = farben.at(i % farben.length);
    const links = Math.random() * 100;
    const dauer = 2.2 + Math.random() * 1.8;
    const verzoegerung = Math.random() * 0.4;
    const groesse = 8 + Math.random() * 8;

    schnipsel.style.cssText = `
      position:absolute;
      top:-20px;
      left:${links}%;
      width:${groesse}px;
      height:${groesse * 0.6}px;
      background:${farbe};
      border-radius:2px;
      opacity:0.95;
      transform:rotate(${Math.random() * 360}deg);
      transition: transform ${dauer}s ease-in ${verzoegerung}s, top ${dauer}s ease-in ${verzoegerung}s, opacity 0.6s ease ${dauer}s;
    `;
    container.appendChild(schnipsel);

    requestAnimationFrame(() => {
      schnipsel.style.top = "105vh";
      schnipsel.style.transform = `rotate(${360 + Math.random() * 540}deg) translateX(${(Math.random() - 0.5) * 120}px)`;
    });
  }

  setTimeout(() => container.remove(), 4600);
}

function abschliessenSpiel(spielId, punkte, titel, text) {
  const daten = ladeFortschritt();
  const neu = !daten.erledigt.includes(spielId);
  if (neu) {
    daten.erledigt.push(spielId);
    daten.sterne += punkte;
  } else {
    daten.sterne += Math.round(punkte / 4);
  }
  speichereFortschritt(daten);

  let kapId = 0;
  let kapStufe = 1;
  let kapitelKomplett = false;
  let istLetztesKapitelDerStufe = false;

  KAPITEL_DATEN.forEach((k) => {
    if (k.spiele.some((s) => s.id === spielId)) {
      kapId = k.id;
      kapStufe = k.stufe;
      kapitelKomplett = k.spiele.every((s) => daten.erledigt.includes(s.id));
      const stufenKapitel = KAPITEL_DATEN.filter((x) => x.stufe === k.stufe);
      istLetztesKapitelDerStufe = stufenKapitel.length >= 6 && stufenKapitel[stufenKapitel.length - 1].id === k.id;
    }
  });

  if (kapitelKomplett) {
    try {
      const fanfareAudio = new Audio("sounds/fanfare.mp3");
      fanfareAudio.volume = 0.85;
      fanfareAudio.play().catch(() => {});
    } catch (e) {}
    starteKapitelKonfetti();
  }

  document.getElementById("main-content").innerHTML = `
    <div class="card" style="text-align:center; padding:34px;">
      <div style="font-size:56px; margin-bottom:8px;">${kapitelKomplett ? "🎉🏆🎉" : "🏆"}</div>
      <h2>${titel}</h2>
      <p class="quiz-hint" style="margin:10px 0 18px;">${text}</p>
      ${kapitelKomplett ? `<div style="font-size:18px; font-weight:800; color:#16a34a; margin-bottom:10px;">🌟 Kapitel komplett geschafft! 🌟</div>` : ""}
      <div style="font-size:20px; font-weight:900; color:#d97706; margin-bottom:22px;">
        +${neu ? punkte : Math.round(punkte / 4)} ⭐ gesammelt!
      </div>
      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
        ${kapitelKomplett && istLetztesKapitelDerStufe ? `<button class="btn-primary" style="background:#7c3aed;" onclick="starteStufenDuell(${kapStufe})">⚔️ Stufen-Duell gegen Computer!</button>` : ""}
        <button class="btn-primary" onclick="zeigeKapitel(${kapId})">Weiter im Kapitel</button>
        <button class="btn-ghost" onclick="zeigeStartseite()">Zur Startseite</button>
      </div>
    </div>`;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", zeigeStartseite);
} else {
  zeigeStartseite();
}

