const KAPITEL_DATEN = Array.of(
  {
    id: 0,
    stufe: 1,
    titel: "1. Gehör-Detektive",
    beschreibung: "Trainiere deine Ohren: Hoch & tief, Schritte & Sprünge, Staccato, Legato, Dur & Moll.",
    farbe: "#ec4899",
    icon: "👂",
    aktiv: true,
    spiele: Array.of(
      { id: "kap0_1", nr: 1, titel: "1.1 Hoch oder tief?", beschreibung: "Höre, ob der 2. Ton höher, tiefer oder gleich ist." },
      { id: "kap0_2", nr: 2, titel: "1.2 Steigt oder fällt die Melodie?", beschreibung: "Erkenne die Richtung einer kleinen Melodie." },
      { id: "kap0_3", nr: 3, titel: "1.3 Schritt oder grosser Sprung?", beschreibung: "Unterscheide kleine Schritte und weite Sprünge." },
      { id: "kap0_4", nr: 4, titel: "1.4 Staccato oder Legato?", beschreibung: "Hüpfende Töne vs. weich verbundene Töne hören." },
      { id: "kap0_5", nr: 5, titel: "1.5 Dur oder Moll?", beschreibung: "Spüre fröhliche und nachdenkliche Klänge." },
      { id: "kap0_boss", nr: 6, titel: "1.6 Gehör-Meister", beschreibung: "Abschluss-Challenge für spitze Detektiv-Ohren." }
    )
  },
  {
    id: 1,
    stufe: 1,
    titel: "2. Stammtöne",
    beschreibung: "Lerne die 7 Stammtöne C, D, E, F, G, A, H, Nachbartöne und Doppelschritte.",
    farbe: "#ef4444",
    icon: "🔤",
    aktiv: true,
    spiele: Array.of(
      { id: "kap1_1", nr: 1, titel: "2.1 Die 7 Stammtöne sortieren", beschreibung: "Bringe C bis H in die richtige Reihenfolge." },
      { id: "kap1_2", nr: 2, titel: "2.2 Lücken in der Tonleiter", beschreibung: "Welcher Stammton fehlt in der Reihe?" },
      { id: "kap1_3", nr: 3, titel: "2.3 Nachbartöne finden", beschreibung: "Welcher Ton liegt direkt davor oder danach?" },
      { id: "kap1_4", nr: 4, titel: "2.4 Rückwärts zählen", beschreibung: "Die Stammtöne von oben nach unten meistern." },
      { id: "kap1_5", nr: 5, titel: "2.5 Doppelschritte", beschreibung: "Mache Doppelschritte nach oben und unten." },
      { id: "kap1_6", nr: 6, titel: "2.6 Stammtöne-Meister", beschreibung: "Abschluss-Challenge für Kapitel 2." }
    )
  },
  {
    id: 2,
    stufe: 1,
    titel: "3. Klaviertasten",
    beschreibung: "Finde C bis H sicher über die Zwillinge und Drillinge auf dem Klavier.",
    farbe: "#f97316",
    icon: "🎹",
    aktiv: true,
    spiele: Array.of(
      { id: "kap2_1", nr: 1, titel: "3.1 Zwillinge & Drillinge", beschreibung: "Erkenne die 2er- und 3er-Gruppen schwarzer Tasten." },
      { id: "kap2_2", nr: 2, titel: "3.2 C – D – E an den Zwillingen", beschreibung: "Finde C, D und E an den Zwillingen." },
      { id: "kap2_3", nr: 3, titel: "3.3 F – G – A – H an den Drillingen", beschreibung: "Orientiere dich sicher bei den Drillingen." },
      { id: "kap2_4", nr: 4, titel: "3.4 Welche Taste leuchtet?", beschreibung: "Benenne jede leuchtende Taste auf dem Klavier." },
      { id: "kap2_5", nr: 5, titel: "3.5 Nachbarn auf der Klaviatur", beschreibung: "Finde den Nachbarn links oder rechts." },
      { id: "kap2_6", nr: 6, titel: "3.6 Tasten-Profi", beschreibung: "Abschluss-Challenge auf der Klaviatur." }
    )
  },
  {
    id: 4,
    stufe: 1,
    titel: "4. Relatives Notenlesen",
    beschreibung: "Erkenne Linien- und Zwischenraumnoten, Schritte, Sprünge und Tonhöhen.",
    farbe: "#22c55e",
    icon: "🎼",
    aktiv: true,
    spiele: Array.of(
      { id: "kap4_1", nr: 1, titel: "4.1 Linie oder Zwischenraum?", beschreibung: "Unterscheide Linien- und Zwischenraumnoten." },
      { id: "kap4_2", nr: 2, titel: "4.2 Höher, tiefer oder gleich?", beschreibung: "Vergleiche zwei Noten miteinander." },
      { id: "kap4_3", nr: 3, titel: "4.3 Schritte & Sprünge", beschreibung: "Geht die Melodie einen Schritt oder einen Sprung?" },
      { id: "kap4_4", nr: 4, titel: "4.4 Melodie-Verlauf lesen", beschreibung: "Verfolge kleine Melodien auf und ab." },
      { id: "kap4_boss", nr: 5, titel: "4.5 Notenlese-Entdecker", beschreibung: "Abschluss-Challenge im relativen Notenlesen." }
    )
  },
  {
    id: 5,
    stufe: 1,
    titel: "5. Rhythmus & Notenwerte",
    beschreibung: "Spüre Viertel-, Halbe-, Dreiviertel- und Ganze Noten mit Rhythmus-Wörtern und Takten.",
    farbe: "#0891b2",
    icon: "🥁",
    aktiv: true,
    spiele: Array.of(
      { id: "kap5_1", nr: 1, titel: "5.1 Rhythmus-Wörter (Da, Bon-bon...)", beschreibung: "Lerne die 4 Grund-Notenwerte kennen." },
      { id: "kap5_2", nr: 2, titel: "5.2 Tonlängen hören", beschreibung: "Wie viele Schläge klingt der Ton?" },
      { id: "kap5_3", nr: 3, titel: "5.3 Aushalte-Pad", beschreibung: "Halte den Ton exakt im Takt gedrückt." },
      { id: "kap5_4", nr: 4, titel: "5.4 3/4- und 4/4-Takte bauen", beschreibung: "Fülle den Takt mit den passenden Notenwerten." },
      { id: "kap5_5", nr: 5, titel: "5.5 Rhythmus-Mix", beschreibung: "Kombiniere verschiedene Notenwerte sicher." },
      { id: "kap5_6", nr: 6, titel: "5.6 Rhythmus-Profi", beschreibung: "Abschluss-Challenge für Rhythmus & Notenwerte." }
    )
  },
  {
    id: 6,
    stufe: 1,
    titel: "6. Violinschlüssel & Stücke",
    beschreibung: "Lies C bis A im Violinschlüssel, spiele echte Kinderlieder und hol dir dein Diplom!",
    farbe: "#7c3aed",
    icon: "🏆",
    aktiv: true,
    spiele: Array.of(
      { id: "kap6_1", nr: 1, titel: "6.1 Die 3 Anker-Töne (C – E – G)", beschreibung: "Finde C, E und G sofort im Violinschlüssel." },
      { id: "kap6_2", nr: 2, titel: "6.2 Notennamen lesen (C bis A)", beschreibung: "Benenne alle Noten von C bis A sicher." },
      { id: "kap6_3", nr: 3, titel: "6.3 Note auf dem Klavier finden", beschreibung: "Lies die Note und tippe die Taste an." },
      { id: "kap6_4", nr: 4, titel: "6.4 Kinderlieder nach Noten", beschreibung: "Spiele Alle meine Entchen, Hänschen klein & mehr!" },
      { id: "kap6_5", nr: 5, titel: "6.5 Ton & Rhythmus-Kombi", beschreibung: "Erkenne Tonname und Rhythmus gleichzeitig." },
      { id: "kap6_6", nr: 6, titel: "6.6 MSAM Musik-Kids Meister-Diplom", beschreibung: "Die grosse Abschlussprüfung!" }
    )
  },
  {
    id: 7,
    stufe: 2,
    titel: "7. Violinschlüssel bis zum hohen G",
    beschreibung: "Erweitere deinen Tonraum nach oben: H, C5, D5, E5, F5 und das hohe G5 sicher lesen!",
    farbe: "#db2777",
    icon: "🚀",
    aktiv: true,
    spiele: Array.of(
      { id: "kap7_1", nr: 1, titel: "7.1 Anker-Töne oben (C5 – E5 – G5)", beschreibung: "Finde das hohe C, E und G im Violinschlüssel." },
      { id: "kap7_2", nr: 2, titel: "7.2 Alle Noten von G4 bis G5", beschreibung: "Benenne H, C, D, E, F und G sicher." },
      { id: "kap7_3", nr: 3, titel: "7.3 Hohe Note auf dem Klavier", beschreibung: "Tippe die richtige Taste in der oberen Oktave an." },
      { id: "kap7_4", nr: 4, titel: "7.4 Melodien im grossen Tonraum", beschreibung: "Spiele bekannte Melodien von C4 bis G5 nach Noten." },
      { id: "kap7_6", nr: 5, titel: "7.5 Höhenflug-Meister", beschreibung: "Abschluss-Challenge im erweiterten Violinschlüssel!" }
    )
  },
  {
    id: 8,
    stufe: 2,
    titel: "8. Bassschlüssel für die linke Hand",
    beschreibung: "Entdecke die tiefen Töne der linken Hand rund um das kleine C und das F.",
    farbe: "#2563eb",
    icon: "𝄢",
    aktiv: true,
    spiele: Array.of(
      { id: "kap8_1", nr: 1, titel: "8.1 Anker-Töne im Bass (C – F – G)", beschreibung: "Die drei wichtigsten Orientierungspunkte für links." },
      { id: "kap8_2", nr: 2, titel: "8.2 Fünf-Finger-Raum (C bis G)", beschreibung: "Lies C, D, E, F und G im Bassschlüssel sicher." },
      { id: "kap8_3", nr: 3, titel: "8.3 Bass-Note auf dem Klavier", beschreibung: "Finde den tiefen Ton links vom Schloss-C." },
      { id: "kap8_4", nr: 4, titel: "8.4 Kleine Bass-Melodien", beschreibung: "Spiele erste Begleit-Melodien für die linke Hand." },
      { id: "kap8_6", nr: 5, titel: "8.5 Bassschlüssel-Profi", beschreibung: "Abschluss-Challenge für die linke Hand!" }
    )
  },
  {
    id: 9,
    stufe: 2,
    titel: "9. Pausen & Achtelnoten",
    beschreibung: "Spüre schnelle Achtelpaare (Ti-ti) sowie Viertel- und Halbe Pausen im Takt.",
    farbe: "#0d9488",
    icon: "⏱️",
    aktiv: true,
    spiele: Array.of(
      { id: "kap9_1", nr: 1, titel: "9.1 Achtelnoten (Ti-ti) kennenlernen", beschreibung: "Zwei flinke Schläge auf einen Puls hören und lesen." },
      { id: "kap9_2", nr: 2, titel: "9.2 Viertel- und Halbe Pausen", beschreibung: "Auch Stille gehört zur Musik – zähle genau mit!" },
      { id: "kap9_3", nr: 3, titel: "9.3 Rhythmus-Echo mit Pausen", beschreibung: "Erkenne den passenden Rhythmus zum Hörbeispiel." },
      { id: "kap9_4", nr: 4, titel: "9.4 Takte bauen mit Achteln & Pausen", beschreibung: "Fülle 3/4- und 4/4-Takte exakt auf." },
      { id: "kap9_6", nr: 5, titel: "9.5 Takt-Meister Stufe 2", beschreibung: "Abschluss-Challenge für Rhythmus-Entdecker!" }
    )
  },
  {
    id: 10,
    stufe: 2,
    titel: "10. Erste schwarze Tasten (Fis & B)",
    beschreibung: "Lerne die zwei wichtigsten schwarzen Tasten Fis (#) und B (b) sowie das Auflösungszeichen kennen.",
    farbe: "#ea580c",
    icon: "🎹",
    aktiv: true,
    spiele: Array.of(
      { id: "kap10_1", nr: 1, titel: "10.1 Das Kreuz (#) macht aus F ein Fis", beschreibung: "Ein Halbtonschritt nach rechts – finde Fis!" },
      { id: "kap10_2", nr: 2, titel: "10.2 Das Be (b) macht aus H ein B", beschreibung: "Ein Halbtonschritt nach links – finde B!" },
      { id: "kap10_3", nr: 3, titel: "10.3 Auflösungszeichen (♮) – zurück auf Weiss", beschreibung: "Wann gilt wieder F oder H?" },
      { id: "kap10_4", nr: 4, titel: "10.4 Fis & B im Notenbild erkennen", beschreibung: "Lies Vorzeichen vor der Note sicher." },
      { id: "kap10_6", nr: 5, titel: "10.5 Vorzeichen-Entdecker", beschreibung: "Abschluss-Challenge für Fis und B!" }
    )
  },
  {
    id: 11,
    stufe: 2,
    titel: "11. Dynamik & Ausdruck",
    beschreibung: "Entdecke leise (p), laut (f), crescendo, staccato und legato beim Hören und Lesen.",
    farbe: "#16a34a",
    icon: "🎭",
    aktiv: true,
    spiele: Array.of(
      { id: "kap11_1", nr: 1, titel: "11.1 Piano (p) und Forte (f)", beschreibung: "Was bedeuten p, mp, mf und f?" },
      { id: "kap11_2", nr: 2, titel: "11.2 Crescendo & Decrescendo", beschreibung: "Wird die Musik lauter oder leiser?" },
      { id: "kap11_3", nr: 3, titel: "11.3 Staccato-Punkt & Legato-Bogen", beschreibung: "Erkenne Spielweisen im Notenbild." },
      { id: "kap11_4", nr: 4, titel: "11.4 Ausdrucks-Detektiv", beschreibung: "Höre das Beispiel und wähle die passenden Zeichen." },
      { id: "kap11_6", nr: 5, titel: "11.5 Ausdrucks-Künstler", beschreibung: "Abschluss-Challenge für Dynamik & Vortrag!" }
    )
  },
  {
    id: 12,
    stufe: 2,
    titel: "12. Beidhändig lesen & Entdecker-Diplom",
    beschreibung: "Lies rechte und linke Hand im Klaviersystem zusammen und hol dir dein Stufe-2-Diplom!",
    farbe: "#9333ea",
    icon: "🎓",
    aktiv: true,
    spiele: Array.of(
      { id: "kap12_1", nr: 1, titel: "12.1 Rechte Hand oder linke Hand?", beschreibung: "Ordne Noten im grossen Klaviersystem richtig zu." },
      { id: "kap12_2", nr: 2, titel: "12.2 Wechselspiel rechts & links", beschreibung: "Spiele kleine Frage-Antwort-Melodien beidhändig." },
      { id: "kap12_3", nr: 3, titel: "12.3 Begleitton links + Melodie rechts", beschreibung: "Kombiniere Bass-Anker und Melodie-Töne." },
      { id: "kap12_4", nr: 4, titel: "12.4 Konzertstück-Check", beschreibung: "Noten, Rhythmus, Vorzeichen & Dynamik zusammen." },
      { id: "kap12_6", nr: 5, titel: "12.5 MSAM Entdecker-Diplom · Stufe 2", beschreibung: "Die grosse Abschlussprüfung der Entdecker-Kids!" }
    )
  }
);


function ladeFortschritt() {
  try {
    const roh = localStorage.getItem("klavierEntdeckerFortschritt");
    if (roh) return JSON.parse(roh);
  } catch (e) {}
  return { sterne: 0, erledigt: Array.of() };
}

function speichereFortschritt(daten) {
  try {
    localStorage.setItem("klavierEntdeckerFortschritt", JSON.stringify(daten));
  } catch (e) {}
  aktualisiereSterneAnzeige();
  if (typeof synchronisiereFortschrittMitCloud === "function") {
    synchronisiereFortschrittMitCloud().catch(() => {});
  }
}

function aktualisiereSterneAnzeige() {
  const daten = ladeFortschritt();
  const el = document.getElementById("star-count");
  if (el) el.textContent = daten.sterne;
}

function abschliessenSpiel(spielId, sternePlus, titel, text) {
  const daten = ladeFortschritt();
  if (!daten.erledigt.includes(spielId)) {
    daten.erledigt.push(spielId);
    daten.sterne += sternePlus;
    speichereFortschritt(daten);
  }
  document.getElementById("main-content").innerHTML = `
    <div class="card" style="text-align:center; padding:32px;">
      <div style="font-size:56px;">🏆</div>
      <h2>${titel}</h2>
      <p class="quiz-hint" style="margin:10px 0 18px;">${text}</p>
      <div style="font-size:20px; font-weight:800; color:#f59e0b; margin-bottom:20px;">+${sternePlus} ⭐</div>
      <button class="btn-primary" onclick="zeigeStartseite()">Zurück zur Übersicht</button>
    </div>`;
}
// Fanfare & Konfetti bei allen Boss-Challenges (Kapitel 1 bis 6)
if (typeof abschliessenSpiel === "function") {
  const _originalAbschliessenSpiel = abschliessenSpiel;
  window.abschliessenSpiel = function(spielId, punkte, titel, text) {
    const idText = String(spielId || "").toLowerCase();
    const titelText = String(titel || "").toLowerCase();

        const istBoss =
      idText.includes("boss") ||
      idText.endsWith("_6");


    window._istBossChallenge = istBoss;
    if (istBoss) {
      if (typeof starteFanfareUndKonfetti === "function") {
        starteFanfareUndKonfetti(true);
      }
    } else if (typeof klavierAudio !== "undefined") {
      klavierAudio.spieleErfolg();
    }

    _originalAbschliessenSpiel(spielId, punkte, titel, text);
    window._istBossChallenge = false;
  };
}


function zeigeKapitel(kapitelId) {
  if (typeof appMusik !== "undefined") appMusik.stop();
  const kap = KAPITEL_DATEN.find((k) => k.id === kapitelId);
  if (!kap) {
    zeigeStartseite();
    return;
  }
  const daten = ladeFortschritt();

  const spieleHTML = kap.spiele.map((s) => {
    const fertig = daten.erledigt.includes(s.id);
    return `
      <div class="game-card" style="cursor:pointer;" onclick="starteKapitelSpiel(${kap.id}, ${s.nr})">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="margin:0;">${fertig ? "✅ " : ""}${s.titel}</h3>
        </div>
        <p style="margin:8px 0 0; color:var(--muted);">${s.beschreibung}</p>
      </div>`;
  }).join("");

  document.getElementById("main-content").innerHTML = `
    <div style="margin-bottom:16px;">
      <button class="btn-ghost" onclick="zeigeStartseite()">← Zurück zu den Kapiteln</button>
    </div>
    <div class="card" style="border-top:6px solid ${kap.farbe}; margin-bottom:18px;">
      <div style="font-size:32px;">${kap.icon}</div>
      <h2 style="margin:6px 0;">${kap.titel}</h2>
      <p style="margin:0; color:var(--muted);">${kap.beschreibung}</p>
    </div>
    <div class="games-grid">${spieleHTML}</div>`;
}

function starteKapitelSpiel(kapitelId, spielNr) {
  const fn = window[`starteKap${kapitelId}Spiel`];
  if (typeof fn === "function") fn(spielNr);
}

window.toggleMsamStufe = function(stufeNr) {
  const bereich = document.getElementById(`stufe-inhalt-${stufeNr}`);
  const pfeil = document.getElementById(`stufe-pfeil-${stufeNr}`);
  if (!bereich) return;
  const istOffen = bereich.style.display !== "none";
  bereich.style.display = istOffen ? "none" : "block";
  if (pfeil) pfeil.textContent = istOffen ? "▶" : "▼";
};

function zeigeStartseite() {
  if (typeof appMusik !== "undefined") appMusik.resumeWennAktiv();
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
    { nr: 1, titel: "Stufe 1 · Einsteiger-Kids", untertitel: "Kapitel 1–6: Gehör, Stammtöne, Klaviatur, Noten & Rhythmus", farbe: "#e11d48", offen: true },
    { nr: 2, titel: "Stufe 2 · Entdecker-Kids", untertitel: "Kapitel 7–12: Hohes G, Bassschlüssel, Achtel & Pausen, Fis & B, Dynamik", farbe: "#7c3aed", offen: true }
  );

  const stufenHTML = stufenMeta.map((st) => {
    const stufenKapitel = KAPITEL_DATEN.filter((k) => (k.stufe || 1) === st.nr);
    const gesamtSpiele = stufenKapitel.reduce((sum, k) => sum + k.spiele.length, 0);
    const erledigtSpiele = stufenKapitel.reduce(
      (sum, k) => sum + k.spiele.filter((s) => daten.erledigt.includes(s.id)).length,
      0
    );

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

    return `
      <div style="margin-bottom: 18px; border-radius: 18px; overflow: hidden; border: 2px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
        <button type="button" onclick="toggleMsamStufe(${st.nr})"
                style="width:100%; display:flex; justify-content:space-between; align-items:center; padding:16px 20px; background:#f8fafc; border:none; border-left:8px solid ${st.farbe}; cursor:pointer; text-align:left; gap:12px;">
          <div>
            <div style="font-size:19px; font-weight:900; color:#0f172a;">${st.titel}</div>
            <div style="font-size:13px; color:#475569; margin-top:2px;">${st.untertitel}</div>
          </div>
          <div style="display:flex; align-items:center; gap:12px; flex-shrink:0;">
            <span style="background:#ffffff; border:2px solid #cbd5e1; border-radius:999px; padding:4px 12px; font-size:13px; font-weight:800; color:#334155;">
              ${erledigtSpiele} / ${gesamtSpiele} ⭐
            </span>
            <span id="stufe-pfeil-${st.nr}" style="font-size:16px; font-weight:900; color:#475569;">${st.offen ? "▼" : "▶"}</span>
          </div>
        </button>
        <div id="stufe-inhalt-${st.nr}" style="display:${st.offen ? "block" : "none"}; padding:16px;">
          <div class="chapters-grid">${kartenHTML}</div>
        </div>
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
    ${stufenHTML}`;
}

document.addEventListener("DOMContentLoaded", () => {
  zeigeStartseite();
});
// Automatischer "← Zurück"-Button in allen Spielen
(function aktiviereZurueckButton() {
  const hauptbereich = document.getElementById("main-content");
  if (!hauptbereich) return;

  const observer = new MutationObserver(() => {
    const spielKarte = hauptbereich.querySelector(".card .quiz-meta");
    if (!spielKarte) return;
    if (hauptbereich.querySelector("#msam-back-btn")) return;

    const backBar = document.createElement("div");
    backBar.id = "msam-back-btn";
    backBar.style.cssText = "display:flex; justify-content:flex-start; margin-bottom:10px;";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "← Zurück";
    btn.style.cssText = "background:#f1f5f9; border:2px solid #cbd5e1; color:#334155; font-weight:800; font-size:14px; padding:6px 14px; border-radius:10px; cursor:pointer;";

    btn.addEventListener("click", () => {
      if (typeof zeigeStartseite === "function") {
        zeigeStartseite();
      } else if (typeof renderKapitelUebersicht === "function") {
        renderKapitelUebersicht();
      } else if (typeof appMusik !== "undefined") {
        appMusik.resumeWennAktiv();
        location.reload();
      } else {
        location.reload();
      }
    });

    backBar.appendChild(btn);
    const card = spielKarte.closest(".card");
    if (card) {
      card.insertBefore(backBar, card.firstChild);
    }
  });

  observer.observe(hauptbereich, { childList: true, subtree: true });
})();
/// Verbesserte Vorlese-Hilfe mit automatischer Auswahl der natürlichsten deutschen Stimme
(function aktiviereVorleseHilfe() {
  const hauptbereich = document.getElementById("main-content");
  if (!hauptbereich || !("speechSynthesis" in window)) return;

  let besteStimme = null;

  function waehleBesteDeutscheStimme() {
    const stimmen = window.speechSynthesis.getVoices();
    if (!stimmen.length) return;

    const deutsch = stimmen.filter((s) => s.lang.toLowerCase().startsWith("de"));
    const favoriten = Array.of("anna", "petra", "helena", "google deutsch", "natural", "premium", "enhanced");

    for (const fav of favoriten) {
      const treffer = deutsch.find((s) => s.name.toLowerCase().includes(fav));
      if (treffer) {
        besteStimme = treffer;
        return;
      }
    }
    besteStimme = deutsch.at(0) || null;
  }

  waehleBesteDeutscheStimme();
  window.speechSynthesis.onvoiceschanged = waehleBesteDeutscheStimme;

  function liesVor(text) {
    window.speechSynthesis.cancel();
    const sauber = String(text || "")
      .replace(/[✅❌⬇️➡️⬆️👣🦘📉📈👑🎓🎹🏆❤️🤍🔊]/g, "")
      .replace(/–/g, ", ")
      .trim();
    if (!sauber) return;

    const satz = new SpeechSynthesisUtterance(sauber);
    if (besteStimme) satz.voice = besteStimme;
    satz.lang = "de-DE";
    satz.rate = 0.96;
    satz.pitch = 1.05;
    window.speechSynthesis.speak(satz);
  }

  const observer = new MutationObserver(() => {
    const hinweis = hauptbereich.querySelector(".card .quiz-hint");
    if (!hinweis) return;
    if (hinweis.parentElement.querySelector("#msam-tts-btn")) return;

    const ttsBtn = document.createElement("button");
    ttsBtn.id = "msam-tts-btn";
    ttsBtn.type = "button";
    ttsBtn.textContent = "🔊 Vorlesen";
    ttsBtn.style.cssText = "display:inline-flex; align-items:center; gap:4px; margin:6px auto 4px; background:#eff6ff; border:2px solid #93c5fd; color:#1d4ed8; font-weight:800; font-size:13px; padding:4px 12px; border-radius:999px; cursor:pointer;";

    ttsBtn.addEventListener("click", () => {
      const frageTitel = hauptbereich.querySelector(".card h2");
      const textZumLesen = frageTitel ? `${frageTitel.textContent}. ${hinweis.textContent}` : hinweis.textContent;
      liesVor(textZumLesen);
    });

    hinweis.insertAdjacentElement("afterend", ttsBtn);
  });

  observer.observe(hauptbereich, { childList: true, subtree: true });
})();
// Musik-Tiere sammeln beim Abschluss einer Kapitel-Boss-Challenge
(function aktiviereMusikTiere() {
  const TIER_SAMMLUNG = Array.of(
    { kap: 1, emoji: "🐶", name: "Spürnasen-Hund", match: Array.of("kap0_boss", "kap0_6") },
    { kap: 2, emoji: "🦉", name: "Tonleiter-Eule", match: Array.of("kap1_6", "kap1_boss") },
    { kap: 3, emoji: "🦊", name: "Tasten-Fuchs", match: Array.of("kap2_6", "kap2_boss") },
    { kap: 4, emoji: "🐸", name: "Linien-Frosch", match: Array.of("kap4_boss", "kap4_6") },
    { kap: 5, emoji: "🦁", name: "Takt-Löwe", match: Array.of("kap5_6", "kap5_boss") },
    { kap: 6, emoji: "🦄", name: "Meister-Einhorn", match: Array.of("kap6_6", "kap6_boss") }
  );

  function holeFreigeschalteteTiere() {
    let erledigt = Array.of();
    try {
      const daten = typeof ladeFortschritt === "function"
        ? ladeFortschritt()
        : JSON.parse(localStorage.getItem("pianoKidsFortschritt") || "{}");
      if (Array.isArray(daten.erledigt)) erledigt = daten.erledigt;
    } catch (e) {}

    return TIER_SAMMLUNG.filter((tier) =>
      tier.match.some((id) => erledigt.includes(id))
    );
  }

  function zeigeNeuesTierPopup(tier) {
    const popup = document.createElement("div");
    popup.style.cssText = "position:fixed; inset:0; background:rgba(15,23,42,0.55); display:flex; align-items:center; justify-content:center; z-index:100000; padding:16px;";
    popup.innerHTML = `
      <div style="background:#fffbeb; border:4px solid #f59e0b; border-radius:24px; padding:28px 24px; max-width:360px; width:100%; text-align:center; box-shadow:0 20px 40px rgba(0,0,0,0.25);">
        <div style="font-size:14px; font-weight:900; color:#b45309; text-transform:uppercase; letter-spacing:1px;">Neuer Musik-Freund!</div>
        <div style="font-size:84px; margin:10px 0;">${tier.emoji}</div>
        <h2 style="margin:4px 0 8px; color:#1e1b4b;">${tier.name}</h2>
        <p style="font-size:15px; color:#334155; margin-bottom:18px;">Du hast Kapitel ${tier.kap} gemeistert und dieses Tier für deine Sammlung gewonnen!</p>
        <button id="tier-popup-ok" style="background:#f59e0b; color:#fff; border:none; font-weight:900; font-size:17px; padding:10px 26px; border-radius:14px; cursor:pointer;">Juhu, einsammeln! 🎉</button>
      </div>`;
    document.body.appendChild(popup);
    document.getElementById("tier-popup-ok").onclick = () => popup.remove();
  }

  function baueTierLeiste() {
    const hauptbereich = document.getElementById("main-content");
    if (!hauptbereich) return;
    if (hauptbereich.querySelector(".quiz-meta")) return; // Nicht mitten im Spiel anzeigen
    if (hauptbereich.querySelector("#msam-tier-sammlung")) return;

    const gewonnen = holeFreigeschalteteTiere();
    const kartenHTML = TIER_SAMMLUNG.map((tier) => {
      const frei = gewonnen.some((g) => g.kap === tier.kap);
      return `
        <div style="flex:1; min-width:68px; background:${frei ? "#fef3c7" : "#f1f5f9"}; border:2px solid ${frei ? "#f59e0b" : "#cbd5e1"}; border-radius:14px; padding:8px 4px; text-align:center; opacity:${frei ? "1" : "0.55"};">
          <div style="font-size:32px; filter:${frei ? "none" : "grayscale(100%) opacity(0.45)"};">${tier.emoji}</div>
          <div style="font-size:11px; font-weight:800; color:${frei ? "#92400e" : "#64748b"}; margin-top:2px;">${frei ? tier.name : `Kapitel ${tier.kap}`}</div>
        </div>`;
    }).join("");

    const box = document.createElement("div");
    box.id = "msam-tier-sammlung";
    box.style.cssText = "background:#ffffff; border:2px solid #fde68a; border-radius:18px; padding:12px 14px; margin-bottom:16px; box-shadow:0 4px 12px rgba(0,0,0,0.04);";
    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:900; font-size:15px; color:#1e1b4b;">🐾 Meine Musik-Freunde</span>
        <span style="font-weight:800; font-size:13px; color:#b45309;">${gewonnen.length} / ${TIER_SAMMLUNG.length} gesammelt</span>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:space-between;">
        ${kartenHTML}
      </div>`;

    hauptbereich.insertBefore(box, hauptbereich.firstChild);
  }

  // Bei Abschluss einer Boss-Challenge Tier freischalten
  if (typeof abschliessenSpiel === "function") {
    const _prevAbschluss = abschliessenSpiel;
    window.abschliessenSpiel = function(spielId, punkte, titel, text) {
      const vorher = holeFreigeschalteteTiere().map((t) => t.kap);
      _prevAbschluss(spielId, punkte, titel, text);

      const passendesTier = TIER_SAMMLUNG.find((t) => t.match.includes(String(spielId)));
      if (passendesTier && !vorher.includes(passendesTier.kap)) {
        setTimeout(() => zeigeNeuesTierPopup(passendesTier), 400);
      }
    };
  }

  const observer = new MutationObserver(() => {
    setTimeout(baueTierLeiste, 40);
  });
  const hauptbereich = document.getElementById("main-content");
  if (hauptbereich) {
    observer.observe(hauptbereich, { childList: true });
    baueTierLeiste();
  }
})();
// Automatischer "Abmelden"-Button für Schülerwechsel auf dem iPad/Computer
(function aktiviereAbmeldenButton() {
  function fuegeAbmeldenHinzu() {
    if (document.getElementById("msam-logout-btn")) return;

    const header = document.querySelector("header") || document.querySelector(".top-bar") || document.body;
    const btn = document.createElement("button");
    btn.id = "msam-logout-btn";
    btn.type = "button";
    btn.textContent = "🚪 Abmelden";
    btn.style.cssText = "position:fixed; top:12px; right:14px; z-index:9999; background:#fee2e2; border:2px solid #ef4444; color:#b91c1c; font-weight:800; font-size:13px; padding:6px 12px; border-radius:999px; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.08);";

    btn.addEventListener("click", () => {
      if (!confirm("Möchtest du dich wirklich abmelden?")) return;

      // 1. Lokalen Fortschritt entfernen (in Firebase bleibt er sicher!)
      localStorage.removeItem("klavierEntdeckerFortschritt");

      // 2. Alle Profil- & Login-Einträge sicher aus dem localStorage löschen
      Object.keys(localStorage).forEach((key) => {
        const k = key.toLowerCase();
        if (k.includes("msam") || k.includes("profil") || k.includes("user") || k.includes("login") || k.includes("name") || k.includes("schueler")) {
          localStorage.removeItem(key);
        }
      });

      // 3. Seite direkt neu laden, damit die Anmeldung sauber erscheint
      location.reload();
    });

    header.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fuegeAbmeldenHinzu);
  } else {
    fuegeAbmeldenHinzu();
  }
})();

// Eigener Spielstand (Sterne, Spiele & Tiere) pro Schülername
(function trenneSpielstandNachName() {
  function holeAktuellenNamen() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || "";
      const k = key.toLowerCase();
      if (k.includes("user") || k.includes("name") || k.includes("schueler") || k.includes("login")) {
        const val = (localStorage.getItem(key) || "").trim();
        if (val && !val.startsWith("{")) return val.toLowerCase();
        try {
          const obj = JSON.parse(val);
          if (obj && obj.name) return String(obj.name).trim().toLowerCase();
        } catch (e) {}
      }
    }
    const headerName = document.querySelector("#user-name, .user-name, #schueler-name");
    if (headerName && headerName.textContent.trim()) {
      return headerName.textContent.trim().toLowerCase();
    }
    return "gast";
  }

  function speicherSchluessel() {
    return "msam_quizkids_stand_" + holeAktuellenNamen();
  }

  if (typeof ladeFortschritt === "function" && typeof speichereFortschritt === "function") {
    window.ladeFortschritt = function() {
      try {
        const roh = localStorage.getItem(speicherSchluessel());
        if (roh) {
          const parsed = JSON.parse(roh);
          return {
            sterne: Number(parsed.sterne) || 0,
            erledigt: Array.isArray(parsed.erledigt) ? parsed.erledigt : Array.of()
          };
        }
      } catch (e) {}
      return { sterne: 0, erledigt: Array.of() };
    };

 window.speichereFortschritt = function(daten) {
      try {
        localStorage.setItem(speicherSchluessel(), JSON.stringify(daten));
        localStorage.setItem("klavierEntdeckerFortschritt", JSON.stringify(daten));
      } catch (e) {}
      aktualisiereSterneAnzeige();
      if (typeof synchronisiereFortschrittMitCloud === "function") {
        synchronisiereFortschrittMitCloud().catch((err) => console.warn("Cloud-Sync:", err));
      }
    };
  }
})();
// Titel "MSAM Quiz Kids" sicher finden, vergrössern und exakt zentrieren
(function zentriereHaupttitelExakt() {
  function styleTitel() {
    const kandidaten = document.querySelectorAll("h1, h2, .logo, .title, header div, header span");
    for (const el of kandidaten) {
      const text = (el.textContent || "").trim().toLowerCase();
      if (text.includes("msam") && text.includes("quiz kids") && el.children.length <= 1) {
        el.style.setProperty("font-size", "clamp(28px, 5vw, 44px)", "important");
        el.style.setProperty("font-weight", "900", "important");
        el.style.setProperty("text-align", "center", "important");
        el.style.setProperty("width", "100%", "important");
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("margin", "8px auto", "important");
        el.style.setProperty("line-height", "1.15", "important");

        if (el.parentElement) {
          el.parentElement.style.setProperty("flex-wrap", "wrap", "important");
          el.parentElement.style.setProperty("justify-content", "center", "important");
          el.parentElement.style.setProperty("text-align", "center", "important");
        }
        break;
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", styleTitel);
  } else {
    styleTitel();
  }
})();

// ============================================================
// PERSÖNLICHES MSAM MEISTER-DIPLOM (Komplett-Paket)
// ============================================================

(function initMeisterDiplom() {
  if (document.getElementById("msam-diplom-styles")) return;
  const style = document.createElement("style");
  style.id = "msam-diplom-styles";
  style.textContent = `
    .diplom-banner-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #ffffff;
      border: 2px solid #fef3c7;
      border-radius: 999px;
      padding: 12px 22px;
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(217, 119, 6, 0.35);
      transition: transform 0.15s ease;
    }
    .diplom-banner-btn:hover { transform: scale(1.04); }
    .diplom-urkunde {
      background: linear-gradient(180deg, #fffbeb 0%, #ffffff 50%, #fef3c7 100%);
      border: 8px double #d97706;
      border-radius: 24px;
      padding: 32px 24px;
      max-width: 720px;
      margin: 12px auto;
      text-align: center;
      box-shadow: 0 18px 40px rgba(180, 83, 9, 0.18);
    }
    .diplom-schule { font-size: 14px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #b45309; margin-bottom: 6px; }
    .diplom-titel { font-size: clamp(28px, 5vw, 42px); font-weight: 900; color: #78350f; margin: 4px 0 14px 0; }
    .diplom-name { font-size: clamp(26px, 4.5vw, 38px); font-weight: 900; color: #1e293b; border-bottom: 3px solid #f59e0b; display: inline-block; padding: 4px 28px; margin: 10px 0 16px 0; }
    .diplom-tiere { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin: 20px 0; }
    .diplom-tier-badge { background: #ffffff; border: 2px solid #fcd34d; border-radius: 14px; padding: 8px 12px; font-size: 13px; font-weight: 700; color: #78350f; }
    .diplom-siegel { width: 78px; height: 78px; border-radius: 50%; background: radial-gradient(circle, #fbbf24 0%, #d97706 100%); color: #ffffff; font-weight: 900; font-size: 12px; display: flex; align-items: center; justify-content: center; margin: 16px auto 0 auto; border: 3px dashed #fef3c7; }
  `;
  document.head.appendChild(style);
})();

function holeAktuellenSchuelerNameUndStand() {
  let name = "";
  let erledigt = Array.of();
  let sterne = 0;

  try {
    const nameEl = document.querySelector("#aktueller-schueler-name, .schueler-name, #user-name");
    const aktiverName =
      localStorage.getItem("msam_aktueller_schueler") ||
      localStorage.getItem("aktuellerSchueler") ||
      localStorage.getItem("schuelerName") ||
      (typeof aktuellerSchueler === "string" ? aktuellerSchueler : "") ||
      (typeof aktiverSchueler === "string" ? aktiverSchueler : "") ||
      (nameEl ? nameEl.textContent.trim() : "");

    if (aktiverName) name = aktiverName;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key);
      if (!val || !val.startsWith("{")) continue;
      const obj = JSON.parse(val);
      if (!obj || typeof obj !== "object") continue;

      const gefundeneListe =
        obj.erledigt || obj.abgeschlossen || obj.geloest ||
        obj.geloesteSpiele || obj.fertigeSpiele || obj.spiele;

      if (Array.isArray(gefundeneListe)) {
        const passtZumName =
          !aktiverName ||
          key.toLowerCase().includes(aktiverName.toLowerCase()) ||
          (obj.name && obj.name.toLowerCase() === aktiverName.toLowerCase());

        if (passtZumName && gefundeneListe.length >= erledigt.length) {
          if (obj.name) name = obj.name;
          erledigt = gefundeneListe;
          sterne = obj.sterne || obj.punkte || obj.score || erledigt.length * 100;
        }
      }
    }
  } catch (e) {}

  return { name, erledigt, sterne };
}

function druckeMeisterDiplom() {
  const urkundeEl = document.getElementById("msam-diplom-druckbereich");
  if (!urkundeEl) return;

  const nameInput = urkundeEl.querySelector("#diplom-name-input");
  const eingetragenerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Musik-Meister/in";

  const klon = urkundeEl.cloneNode(true);
  klon.querySelectorAll(".no-print").forEach((el) => el.remove());

  const klonInput = klon.querySelector("#diplom-name-input");
  if (klonInput) {
    const nameDiv = document.createElement("div");
    nameDiv.className = "diplom-name";
    nameDiv.textContent = eingetragenerName;
    klonInput.replaceWith(nameDiv);
  }

  const druckFenster = window.open("", "_blank", "width=850,height=1100");
  if (!druckFenster) {
    window.print();
    return;
  }

  druckFenster.document.write(`
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <title>MSAM Meister-Diplom</title>
      <style>
        * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #ffffff; display: flex; justify-content: center; align-items: center; }
        .diplom-urkunde { background: linear-gradient(180deg, #fffbeb 0%, #ffffff 50%, #fef3c7 100%); border: 8px double #d97706; border-radius: 24px; padding: 40px 32px; width: 100%; max-width: 720px; text-align: center; }
        .diplom-schule { font-size: 14px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #b45309; margin-bottom: 6px; }
        .diplom-titel { font-size: 40px; font-weight: 900; color: #78350f; margin: 6px 0 16px 0; }
        .diplom-name { font-size: 34px; font-weight: 900; color: #1e293b; border-bottom: 3px solid #f59e0b; display: inline-block; padding: 4px 28px; margin: 12px 0 18px 0; }
        .diplom-tiere { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin: 22px 0; }
        .diplom-tier-badge { background: #ffffff; border: 2px solid #fcd34d; border-radius: 14px; padding: 8px 14px; font-size: 14px; font-weight: 700; color: #78350f; }
        .diplom-siegel { width: 84px; height: 84px; border-radius: 50%; background: #d97706; color: #ffffff; font-weight: 900; font-size: 13px; display: flex; align-items: center; justify-content: center; margin: 18px auto 0 auto; border: 3px dashed #fef3c7; }
        @page { size: A4 portrait; margin: 12mm; }
      </style>
    </head>
    <body>
      ${klon.outerHTML}
      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 250);
        };
      <\/script>
    </body>
    </html>
  `);
  druckFenster.document.close();
}
function zeigeMeisterDiplom() {
  if (typeof starteFanfareUndKonfetti === "function") starteFanfareUndKonfetti(true);

  const daten = holeAktuellenSchuelerNameUndStand();
  const heute = new Date().toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" });
  const tiere = Array.of(
    "🐶 Spürnasen-Hund",
    "🦉 Tonleiter-Eule",
    "🦊 Tasten-Fuchs",
    "🐸 Linien-Frosch",
    "🦁 Takt-Löwe",
    "🦄 Meister-Einhorn"
  );

  const zielContainer =
    document.getElementById("main-content") ||
    document.getElementById("kapitel-container") ||
    document.getElementById("app") ||
    document.querySelector("main") ||
    document.body;

  zielContainer.innerHTML = `
    <div id="msam-diplom-druckbereich" class="diplom-urkunde">
      <div class="diplom-schule">Musikschule Appenzeller Mittelland · MSAM Quiz Kids</div>
      <div style="font-size:44px; margin:6px 0;">🏆🎶🏆</div>
      <h1 class="diplom-titel">Meister-Diplom · Stufe 1</h1>
      <p style="font-size:17px; color:#475569; margin:0;">Hiermit wird feierlich bestätigt, dass</p>
      <div style="margin:12px 0 18px 0;">
        <input
          type="text"
          id="diplom-name-input"
          value="${(daten.name || "").replace(/"/g, "&quot;")}"
          placeholder="Hier deinen Namen eintragen..."
          style="font-size:clamp(24px,4.5vw,34px); font-weight:900; color:#1e293b; text-align:center; border:none; border-bottom:3px solid #f59e0b; background:rgba(255,255,255,0.85); border-radius:10px 10px 0 0; padding:6px 18px; width:min(92%,440px); outline:none;"
        />
      </div>
      <p style="font-size:16px; color:#334155; max-width:520px; margin:0 auto; line-height:1.5;">
        die <strong>Stufe 1</strong> (alle <strong>6 Musik-Kapitel</strong>) mit <strong>${daten.sterne} Sternen</strong> erfolgreich gemeistert hat!
      </p>
      <div class="diplom-tiere">
        ${tiere.map((t) => `<div class="diplom-tier-badge">${t}</div>`).join("")}
      </div>
      <div class="diplom-siegel">MSAM<br>STUFE 1</div>
      <p style="font-size:13px; color:#64748b; margin-top:16px;">Ausgestellt am ${heute}</p>
      <div class="no-print" style="margin-top:24px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button class="btn-primary" style="font-size:17px; padding:12px 22px;" onclick="druckeMeisterDiplom()">
          🖨️ Drucken / als PDF speichern
        </button>
        <button class="answer-btn" style="padding:12px 20px;" onclick="location.reload()">
          ⬅️ Zurück zu den Kapiteln
        </button>
      </div>
    </div>
  `;
}

setInterval(() => {
  if (document.getElementById("msam-diplom-start-card") || document.getElementById("msam-diplom-druckbereich")) return;

  const kandidat =
    document.getElementById("main-content") ||
    document.getElementById("kapitel-container") ||
    document.getElementById("app") ||
    document.querySelector("main") ||
    document.body;

  if (!kandidat) return;

  const text = kandidat.innerText || "";
  const istStartseite =
    text.includes("Gehör-Detektive") ||
    text.includes("Stammtöne") ||
    text.includes("Klaviertasten");

  if (!istStartseite) return;

  const daten = holeAktuellenSchuelerNameUndStand();
  const anzahl = daten.erledigt.length;
  const hatDiplom =
    daten.erledigt.includes("kap6_6") ||
    daten.erledigt.includes("kap6_boss") ||
    anzahl >= 30;

  const karte = document.createElement("div");
  karte.id = "msam-diplom-start-card";
  karte.style.cssText = `
    max-width: 680px;
    margin: 22px auto 32px auto;
    padding: 20px 22px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    border: 3px solid ${hatDiplom ? "#f59e0b" : "#cbd5e1"};
    background: ${hatDiplom ? "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" : "#f8fafc"};
  `;

  if (hatDiplom) {
    karte.innerHTML = `
      <div style="font-size:38px; margin-bottom:6px;">🎓🏆🦄</div>
      <h3 style="margin:0 0 6px 0; color:#78350f; font-size:21px;">Dein MSAM Meister-Diplom (Stufe 1) ist bereit!</h3>
      <p style="margin:0 0 14px 0; color:#92400e; font-size:15px;">
        Herzlichen Glückwunsch${daten.name ? ", <strong>" + daten.name + "</strong>" : ""}! Du hast Stufe 1 erfolgreich gemeistert.
      </p>
      <button class="diplom-banner-btn" onclick="zeigeMeisterDiplom()">
        🎓 Stufe-1-Urkunde öffnen &amp; als PDF speichern
      </button>
    `;
  } else {
    karte.innerHTML = `
      <div style="font-size:34px; margin-bottom:6px;">🔒🎓</div>
      <h3 style="margin:0 0 6px 0; color:#334155; font-size:19px;">MSAM Meister-Diplom · Stufe 1</h3>
      <p style="margin:0 0 10px 0; color:#64748b; font-size:14px;">
        Meistere alle 6 Kapitel der Stufe 1 und sammle alle 6 Musik-Tiere, um deine persönliche Urkunde freizuschalten!
      </p>
      <div style="font-size:13px; font-weight:700; color:#475569;">
        Fortschritt Stufe 1: ${anzahl} Aufgaben gelöst
      </div>
    `;
  }

  kandidat.appendChild(karte);
}, 700);
