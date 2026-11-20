// =========================================================
// STUFEN-DUELLE GEGEN DEN COMPUTER (ALLE 8 STUFEN) - TEIL 1
// 8 Stufen mit je 6 Kapiteln (Kapitel 1–48), rundenbasiert,
// ohne Zeitdruck, bunt gemischt & 75% Computer-Trefferquote
// =========================================================

let duellTimer = null;

function stoppeDuellTimer() {
  if (duellTimer) {
    clearInterval(duellTimer);
    duellTimer = null;
  }
}

const STUFEN_DUELL_CONFIG = Array.of(
  { stufe: 1, titel: "🐎 Stufe 1: Musik-Pferderennen gegen Blitz-Huf", gegner: "Blitz-Huf", spielerIcon: "🐎", gegnerIcon: "🦄", farbe: "#16a34a", bg: "linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%)" },
  { stufe: 2, titel: "🐸 Stufe 2: Frosch-Hüpfen gegen Quak-Bot", gegner: "Quak-Bot", spielerIcon: "🐸", gegnerIcon: "🤖", farbe: "#0284c7", bg: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)" },
  { stufe: 3, titel: "🐢 Stufe 3: Schildkröten-Sprint gegen Turbo-Panzer", gegner: "Turbo-Panzer", spielerIcon: "🐢", gegnerIcon: "🦾", farbe: "#0d9488", bg: "linear-gradient(180deg, #ccfbf1 0%, #99f6e4 100%)" },
  { stufe: 4, titel: "🐬 Stufe 4: Delfin-Wellenreiten gegen Sonar-Bot", gegner: "Sonar-Bot", spielerIcon: "🐬", gegnerIcon: "🛸", farbe: "#2563eb", bg: "linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%)" },
  { stufe: 5, titel: "🦅 Stufe 5: Adler-Gipfelflug gegen Sturm-Schwinge", gegner: "Sturm-Schwinge", spielerIcon: "🦅", gegnerIcon: "⚡", farbe: "#7c3aed", bg: "linear-gradient(180deg, #ede9fe 0%, #ddd6fe 100%)" },
  { stufe: 6, titel: "🦊 Stufe 6: Fuchs-Fährtenjagd gegen Schlau-Bot", gegner: "Schlau-Bot", spielerIcon: "🦊", gegnerIcon: "🧠", farbe: "#ea580c", bg: "linear-gradient(180deg, #ffedd5 0%, #fed7aa 100%)" },
  { stufe: 7, titel: "🐉 Stufe 7: Drachen-Wolkenritt gegen Funken-Flug", gegner: "Funken-Flug", spielerIcon: "🐉", gegnerIcon: "🔥", farbe: "#dc2626", bg: "linear-gradient(180deg, #fee2e2 0%, #fecaca 100%)" },
  { stufe: 8, titel: "🦁 Stufe 8: Meister-Löwen-Finale gegen Maestro-Bot", gegner: "Maestro-Bot", spielerIcon: "🦁", gegnerIcon: "👑", farbe: "#d97706", bg: "linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)" }
);

function starteStufenDuell(stufenNummer) {
  stoppeDuellTimer();
  const nr = Math.min(8, Math.max(1, Number(stufenNummer) || 1));
  starteRundenDuell(nr);
}

function starteRundenDuell(stufeNr) {
  const cfg = STUFEN_DUELL_CONFIG.find((c) => c.stufe === stufeNr) || STUFEN_DUELL_CONFIG.at(0);

  const fragenBasis = Array.of(
    { minStufe: 1, typ: "ton", frage: "Welcher Ton klingt HÖHER?", midi1: 60, midi2: 72, antworten: Array.of("1. Ton", "2. Ton"), richtig: 1 },
    { minStufe: 1, typ: "ton", frage: "Welcher Ton klingt TIEFER?", midi1: 74, midi2: 62, antworten: Array.of("1. Ton", "2. Ton"), richtig: 1 },
    { minStufe: 1, typ: "ton", frage: "Welcher Ton klingt HÖHER?", midi1: 69, midi2: 60, antworten: Array.of("1. Ton", "2. Ton"), richtig: 0 },
    { minStufe: 1, typ: "ton", frage: "Welcher Ton klingt TIEFER?", midi1: 64, midi2: 76, antworten: Array.of("1. Ton", "2. Ton"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Wo liegen auf dem Klavier die TIEFEN Töne?", antworten: Array.of("Links auf der Tastatur", "Rechts auf der Tastatur"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Wo liegen auf dem Klavier die HOHEN Töne?", antworten: Array.of("Links auf der Tastatur", "Rechts auf der Tastatur"), richtig: 1 },
    { minStufe: 1, typ: "wissen", frage: "Wie viele schwarze Tasten hat die KLEINE Gruppe?", antworten: Array.of("2 schwarze Tasten", "3 schwarze Tasten"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Wie viele schwarze Tasten hat die GROSSE Gruppe?", antworten: Array.of("2 schwarze Tasten", "3 schwarze Tasten"), richtig: 1 },
    { minStufe: 1, typ: "wissen", frage: "Welcher Ton liegt LINKS vor den 2 schwarzen Tasten?", antworten: Array.of("Das C", "Das F"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Welcher Ton liegt LINKS vor den 3 schwarzen Tasten?", antworten: Array.of("Das C", "Das F"), richtig: 1 },
    { minStufe: 1, typ: "wissen", frage: "Wie heisst der Stammton direkt nach dem G?", antworten: Array.of("H", "A"), richtig: 1 },
    { minStufe: 1, typ: "wissen", frage: "Wie viele Notenlinien hat ein Notensystem?", antworten: Array.of("4 Linien", "5 Linien"), richtig: 1 },
    { minStufe: 1, typ: "wissen", frage: "Wo liegt das eingestrichene c' im Violinschlüssel?", antworten: Array.of("Auf einer eigenen Hilfslinie unter dem System", "Auf der obersten Linie"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Welcher Ton liegt auf der 2. Notenlinie (wo der Violinschlüssel startet)?", antworten: Array.of("Das g'", "Das e'"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Wie viele Schläge dauert eine Ganze Note?", antworten: Array.of("2 Schläge", "4 Schläge"), richtig: 1 },
    { minStufe: 1, typ: "wissen", frage: "Wie viele Schläge dauert eine Halbe Note?", antworten: Array.of("2 Schläge", "1 Schlag"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Wie viele Schläge dauert eine Viertelnote?", antworten: Array.of("1 Schlag", "4 Schläge"), richtig: 0 },
    { minStufe: 1, typ: "wissen", frage: "Was bedeutet ein Wiederholungszeichen (Doppelstrich mit 2 Punkten)?", antworten: Array.of("Stück ist sofort zu Ende", "Abschnitt wird nochmal gespielt"), richtig: 1 },
    { minStufe: 2, typ: "wissen", frage: "Wie viele Achtelnoten passen zusammen in einen Viertelschlag?", antworten: Array.of("2 Achtelnoten", "4 Achtelnoten"), richtig: 0 },
    { minStufe: 2, typ: "wissen", frage: "Was macht ein Kreuz (♯) vor einer Note?", antworten: Array.of("Erhöht den Ton um einen Halbton", "Erniedrigt den Ton um einen Halbton"), richtig: 0 },
    { minStufe: 2, typ: "wissen", frage: "Was macht ein Be (♭) vor einer Note?", antworten: Array.of("Erhöht den Ton um einen Halbton", "Erniedrigt den Ton um einen Halbton"), richtig: 1 },
    { minStufe: 2, typ: "wissen", frage: "Welcher Ton liegt im Bassschlüssel auf der 4. Linie (zwischen den zwei Punkten)?", antworten: Array.of("Das kleine f", "Das kleine c"), richtig: 0 },
    { minStufe: 2, typ: "wissen", frage: "Was bedeutet „forte“ (f) in der Musik?", antworten: Array.of("Leise spielen", "Laut spielen"), richtig: 1 },
    { minStufe: 2, typ: "wissen", frage: "Was bedeutet „piano“ (p) in der Musik?", antworten: Array.of("Leise spielen", "Schnell spielen"), richtig: 0 },
    { minStufe: 3, typ: "wissen", frage: "Was hebt ein Auflösungszeichen (♮) wieder auf?", antworten: Array.of("Nur Pausen", "Ein vorheriges ♯ oder ♭"), richtig: 1 },
    { minStufe: 3, typ: "wissen", frage: "Was bewirkt ein Punkt hinter einer Note?", antworten: Array.of("Verlängert sie um die Hälfte ihres Wertes", "Macht die Note doppelt so laut"), richtig: 0 },
    { minStufe: 4, typ: "wissen", frage: "Wie heisst der Abstand vom C zum nächsten höheren C?", antworten: Array.of("Quinte", "Oktave"), richtig: 1 },
    { minStufe: 5, typ: "wissen", frage: "Wie viele Vorzeichen hat C-Dur?", antworten: Array.of("Keine Vorzeichen", "1 Kreuz (Fis)"), richtig: 0 },
    { minStufe: 6, typ: "wissen", frage: "Welches Vorzeichen hat G-Dur?", antworten: Array.of("1 Kreuz (Fis)", "1 Be (B)"), richtig: 0 },
    { minStufe: 7, typ: "wissen", frage: "Welches Vorzeichen hat F-Dur?", antworten: Array.of("1 Kreuz (Fis)", "1 Be (B)"), richtig: 1 },
    { minStufe: 8, typ: "wissen", frage: "Wie viele Töne bilden einen einfachen Dreiklang?", antworten: Array.of("3 Töne", "4 Töne"), richtig: 0 }
  );

  const passendeFragen = fragenBasis.filter((f) => f.minStufe <= stufeNr);
  const anzahlFragen = 10;
  const fragen = passendeFragen.slice().sort(() => Math.random() - 0.5).slice(0, anzahlFragen);
// =========================================================
// STUFEN-DUELLE GEGEN DEN COMPUTER (ALLE 8 STUFEN) - TEIL 2
// =========================================================

  let runde = 0;
  let spielerPunkte = 0;
  let botPunkte = 0;
  let sperre = false;

  function spieleTonPaar(m1, m2) {
    if (typeof klavierAudio !== "undefined" && typeof klavierAudio.spieleMidi === "function") {
      klavierAudio.spieleMidi(m1);
      setTimeout(() => klavierAudio.spieleMidi(m2), 600);
    }
  }

  function zeichneRunde(feedbackText = "Lass dir Zeit – kein Zeitlimit! Wer hat nach 10 Fragen mehr Treffer?", feedbackFarbe = "#334155") {
    const f = fragen.at(runde);
    const spielerProzent = Math.round((spielerPunkte / anzahlFragen) * 100);
    const botProzent = Math.round((botPunkte / anzahlFragen) * 100);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
          <div>
            <h2 style="margin:0;">${cfg.titel}</h2>
            <div style="font-size:13px; font-weight:700; color:#64748b; margin-top:2px;">Frage ${runde + 1} von ${anzahlFragen} • Kein Zeitdruck</div>
          </div>
          <button class="btn-ghost" onclick="zeigeStartseite()">Abbrechen</button>
        </div>

        <div style="background:${cfg.bg}; border:2px solid ${cfg.farbe}; border-radius:16px; padding:14px 16px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:800; margin-bottom:4px;">
            <span>${cfg.spielerIcon} Du: ${spielerPunkte} / ${anzahlFragen}</span>
            <span>🏁 Ziel</span>
          </div>
          <div style="background:rgba(255,255,255,0.75); border-radius:999px; height:14px; overflow:hidden; margin-bottom:10px;">
            <div style="width:${spielerProzent}%; background:${cfg.farbe}; height:100%; transition:width 0.35s ease;"></div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:800; margin-bottom:4px;">
            <span>${cfg.gegnerIcon} ${cfg.gegner}: ${botPunkte} / ${anzahlFragen}</span>
            <span>🏁 Ziel</span>
          </div>
          <div style="background:rgba(255,255,255,0.75); border-radius:999px; height:14px; overflow:hidden;">
            <div style="width:${botProzent}%; background:#64748b; height:100%; transition:width 0.35s ease;"></div>
          </div>
        </div>

        <div style="text-align:center; font-size:14px; font-weight:800; color:${feedbackFarbe}; margin-bottom:14px;">
          ${feedbackText}
        </div>

        <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:14px; padding:18px; text-align:center;">
          <div style="font-size:19px; font-weight:900; color:#0f172a; margin-bottom:12px;">${f.frage}</div>
          ${f.typ === "ton" ? `<button class="btn-ghost" id="btn-hoeren" style="margin-bottom:14px; font-weight:800;">🔊 Töne nochmal anhören</button>` : ""}
          <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap;">
            ${f.antworten.map((ant, idx) => `<button class="btn-primary duell-ant-btn" data-idx="${idx}" style="font-size:17px; padding:12px 24px;">${ant}</button>`).join("")}
          </div>
        </div>
      </div>
    `;
    if (f.typ === "ton") {
      const btnHoeren = document.getElementById("btn-hoeren");
      if (btnHoeren) btnHoeren.onclick = () => spieleTonPaar(f.midi1, f.midi2);
      setTimeout(() => spieleTonPaar(f.midi1, f.midi2), 250);
    }

    document.querySelectorAll(".duell-ant-btn").forEach((btn) => {
      btn.onclick = () => {
        if (sperre) return;
        sperre = true;

        const wahl = Number(btn.getAttribute("data-idx"));
        const kindRichtig = wahl === f.richtig;
        const botRichtig = Math.random() < 0.75;

        if (kindRichtig) {
          spielerPunkte++;
          if (typeof klavierAudio !== "undefined" && typeof klavierAudio.spieleMidi === "function") klavierAudio.spieleMidi(72);
        } else {
          if (typeof klavierAudio !== "undefined" && typeof klavierAudio.spieleMidi === "function") klavierAudio.spieleMidi(48);
        }

        if (botRichtig) {
          botPunkte++;
        }

        const kindText = kindRichtig ? "✅ Du: Richtig!" : `❌ Du: Leider falsch (richtig wäre: ${f.antworten.at(f.richtig)})`;
        const botText = botRichtig ? `${cfg.gegner}: auch richtig` : `${cfg.gegner}: daneben getippt!`;
        const gesamtFeedback = `${kindText}  •  ${botText}`;
        const farbe = kindRichtig ? "#16a34a" : "#dc2626";

        runde++;
        if (runde >= anzahlFragen) {
          setTimeout(() => beendeRundenDuell(), 900);
        } else {
          setTimeout(() => {
            sperre = false;
            zeichneRunde(gesamtFeedback, farbe);
          }, 900);
        }
      };
    });
  }

  function beendeRundenDuell() {
    const gewonnen = spielerPunkte > botPunkte;
    const unentschieden = spielerPunkte === botPunkte;

    if (gewonnen || unentschieden) {
      try {
        const fanfareAudio = new Audio("sounds/fanfare.mp3");
        fanfareAudio.volume = 0.85;
        fanfareAudio.play().catch(() => {});
      } catch (e) {}
      if (typeof starteKapitelKonfetti === "function") starteKapitelKonfetti();

      const daten = ladeFortschritt();
      daten.sterne += 15;
      speichereFortschritt(daten);

      const ueberschrift = gewonnen ? `SIEG IN STUFE ${stufeNr}!` : "UNENTSCHIEDEN – DU GEWINNST!";
      const untertext = gewonnen
        ? `Stark gemacht! Du hast ${spielerPunkte} zu ${botPunkte} gegen ${cfg.gegner} gewonnen!`
        : `Spannendes Kopf-an-Kopf-Rennen (${spielerPunkte} zu ${botPunkte}) – der Bonus gehört dir!`;

      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:34px;">
          <div style="font-size:60px; margin-bottom:10px;">🏆${cfg.spielerIcon}🎉</div>
          <h2>${ueberschrift}</h2>
          <p class="quiz-hint" style="margin:10px 0 18px;">${untertext}</p>
          <div style="font-size:22px; font-weight:900; color:#d97706; margin-bottom:22px;">+15 Bonus-⭐ gewonnen!</div>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn-primary" onclick="starteRundenDuell(${stufeNr})">Nochmal spielen ${cfg.spielerIcon}</button>
            <button class="btn-ghost" onclick="zeigeStartseite()">Zur Startseite</button>
          </div>
        </div>`;
    } else {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:34px;">
          <div style="font-size:60px; margin-bottom:10px;">${cfg.gegnerIcon}💨</div>
          <h2>Knapp verloren (${spielerPunkte} : ${botPunkte})!</h2>
          <p class="quiz-hint" style="margin:10px 0 22px;">${cfg.gegner} hatte diesmal einen Treffer mehr. Gleich nochmal – du packst das!</p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn-primary" onclick="starteRundenDuell(${stufeNr})">Revanche starten! ${cfg.spielerIcon}</button>
            <button class="btn-ghost" onclick="zeigeStartseite()">Zur Startseite</button>
          </div>
        </div>`;
    }
  }

  zeichneRunde();
}
