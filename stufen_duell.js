// =========================================================
// STUFEN-DUELLE GEGEN DEN COMPUTER (stufen_duell.js) - TEIL 1
// Rundenbasiert, ohne Zeitdruck, bunt gemischt & 75% Bot-Quote
// =========================================================

let duellTimer = null;

function stoppeDuellTimer() {
  if (duellTimer) {
    clearInterval(duellTimer);
    duellTimer = null;
  }
}

function starteStufenDuell(kapId) {
  stoppeDuellTimer();
  starteRundenDuell(kapId || 1);
}

function starteRundenDuell(stufeNr) {
  const istStufe2 = stufeNr === 2;
  const titel = istStufe2 ? "🐸 Stufe 2: Frosch-Hüpfen gegen Quak-Bot" : "🐎 Stufe 1: Musik-Pferderennen gegen Blitz-Huf";
  const gegnerName = istStufe2 ? "Quak-Bot" : "Blitz-Huf";
  const spielerIcon = istStufe2 ? "🐸" : "🐎";
  const gegnerIcon = istStufe2 ? "🤖" : "🦄";

  const fragenStufe1 = Array.of(
    { typ: "ton", frage: "Welcher Ton klingt HÖHER?", midi1: 60, midi2: 72, antworten: Array.of("1. Ton", "2. Ton"), richtig: 1 },
    { typ: "ton", frage: "Welcher Ton klingt TIEFER?", midi1: 74, midi2: 62, antworten: Array.of("1. Ton", "2. Ton"), richtig: 1 },
    { typ: "ton", frage: "Welcher Ton klingt HÖHER?", midi1: 69, midi2: 60, antworten: Array.of("1. Ton", "2. Ton"), richtig: 0 },
    { typ: "ton", frage: "Welcher Ton klingt TIEFER?", midi1: 64, midi2: 76, antworten: Array.of("1. Ton", "2. Ton"), richtig: 0 },
    { typ: "wissen", frage: "Wo liegen auf dem Klavier die TIEFEN Töne?", antworten: Array.of("Links auf der Tastatur", "Rechts auf der Tastatur"), richtig: 0 },
    { typ: "wissen", frage: "Wo liegen auf dem Klavier die HOHEN Töne?", antworten: Array.of("Links auf der Tastatur", "Rechts auf der Tastatur"), richtig: 1 },
    { typ: "wissen", frage: "Wie viele schwarze Tasten hat die KLEINE Gruppe?", antworten: Array.of("2 schwarze Tasten", "3 schwarze Tasten"), richtig: 0 },
    { typ: "wissen", frage: "Wie viele schwarze Tasten hat die GROSSE Gruppe?", antworten: Array.of("2 schwarze Tasten", "3 schwarze Tasten"), richtig: 1 },
    { typ: "wissen", frage: "Welcher Ton liegt LINKS vor den 2 schwarzen Tasten?", antworten: Array.of("Das C", "Das F"), richtig: 0 },
    { typ: "wissen", frage: "Welcher Ton liegt LINKS vor den 3 schwarzen Tasten?", antworten: Array.of("Das C", "Das F"), richtig: 1 },
    { typ: "wissen", frage: "Wie heisst der Stammton direkt nach dem G?", antworten: Array.of("H", "A"), richtig: 1 },
    { typ: "wissen", frage: "Wie viele Notenlinien hat ein Notensystem?", antworten: Array.of("4 Linien", "5 Linien"), richtig: 1 },
    { typ: "wissen", frage: "Wo liegt das eingestrichene c' im Violinschlüssel?", antworten: Array.of("Auf einer eigenen Hilfslinie unter dem System", "Auf der obersten Linie"), richtig: 0 },
    { typ: "wissen", frage: "Welcher Ton liegt auf der 2. Notenlinie (wo der Violinschlüssel startet)?", antworten: Array.of("Das g'", "Das e'"), richtig: 0 },
    { typ: "wissen", frage: "Wie viele Schläge dauert eine Ganze Note?", antworten: Array.of("2 Schläge", "4 Schläge"), richtig: 1 },
    { typ: "wissen", frage: "Wie viele Schläge dauert eine Halbe Note?", antworten: Array.of("2 Schläge", "1 Schlag"), richtig: 0 },
    { typ: "wissen", frage: "Wie viele Schläge dauert eine Viertelnote?", antworten: Array.of("1 Schlag", "4 Schläge"), richtig: 0 },
    { typ: "wissen", frage: "Was bedeutet ein Wiederholungszeichen (Doppelstrich mit 2 Punkten)?", antworten: Array.of("Stück ist sofort zu Ende", "Abschnitt wird nochmal gespielt"), richtig: 1 }
  );

  const fragenStufe2 = Array.of(
    { typ: "wissen", frage: "Wie viele Achtelnoten passen zusammen in einen Viertelschlag?", antworten: Array.of("2 Achtelnoten", "4 Achtelnoten"), richtig: 0 },
    { typ: "wissen", frage: "Was macht ein Kreuz (♯) vor einer Note?", antworten: Array.of("Erhöht den Ton um einen Halbton", "Erniedrigt den Ton um einen Halbton"), richtig: 0 },
    { typ: "wissen", frage: "Was macht ein Be (♭) vor einer Note?", antworten: Array.of("Erhöht den Ton um einen Halbton", "Erniedrigt den Ton um einen Halbton"), richtig: 1 },
    { typ: "wissen", frage: "Welcher Ton liegt im Bassschlüssel auf der 4. Linie (zwischen den zwei Punkten)?", antworten: Array.of("Das kleine f", "Das kleine c"), richtig: 0 },
    { typ: "wissen", frage: "Was bedeutet „forte“ (f) in der Musik?", antworten: Array.of("Leise spielen", "Laut spielen"), richtig: 1 },
    { typ: "wissen", frage: "Was bedeutet „piano“ (p) in der Musik?", antworten: Array.of("Leise spielen", "Schnell spielen"), richtig: 0 }
  );

  const gesamtPool = istStufe2 ? fragenStufe1.concat(fragenStufe2) : fragenStufe1;
  const anzahlFragen = 8;
  const fragen = gesamtPool.slice().sort(() => Math.random() - 0.5).slice(0, anzahlFragen);

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
// =========================================================
// STUFEN-DUELLE GEGEN DEN COMPUTER (stufen_duell.js) - TEIL 2
// =========================================================

  function zeichneRunde(feedbackText = "Lass dir Zeit – es gibt kein Zeitlimit! Wer hat nach 8 Fragen mehr Treffer?", feedbackFarbe = "#334155") {
    const f = fragen.at(runde);
    const spielerProzent = Math.round((spielerPunkte / anzahlFragen) * 100);
    const botProzent = Math.round((botPunkte / anzahlFragen) * 100);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
          <div>
            <h2 style="margin:0;">${titel}</h2>
            <div style="font-size:13px; font-weight:700; color:#64748b; margin-top:2px;">Frage ${runde + 1} von ${anzahlFragen} • Kein Zeitdruck</div>
          </div>
          <button class="btn-ghost" onclick="zeigeStartseite()">Abbrechen</button>
        </div>

        <div style="background:linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%); border:3px solid #16a34a; border-radius:16px; padding:16px 18px; margin-bottom:16px; position:relative; overflow:hidden;">
          <div style="position:absolute; right:16px; top:8px; bottom:8px; width:6px; background:repeating-linear-gradient(0deg, #000 0px, #000 8px, #fff 8px, #fff 16px); border-radius:3px;"></div>
          <div style="position:absolute; right:26px; top:6px; font-size:12px; font-weight:900; color:#15803d;">ZIEL 🏁</div>

          <div style="margin-bottom:14px;">
            <div style="font-size:14px; font-weight:800; color:#1e3a8a; margin-bottom:4px;">${spielerIcon} Du: ${spielerPunkte} von ${anzahlFragen} richtig</div>
            <div style="height:36px; background:rgba(255,255,255,0.65); border-radius:10px; position:relative; border:1px dashed #16a34a;">
              <div style="position:absolute; left:calc(${Math.min(88, spielerProzent * 0.88)}%); top:1px; font-size:28px; transition:left 0.4s ease-out; transform:scaleX(-1);">${spielerIcon}</div>
            </div>
          </div>

          <div>
            <div style="font-size:14px; font-weight:800; color:#991b1b; margin-bottom:4px;">${gegnerIcon} ${gegnerName}: ${botPunkte} von ${anzahlFragen} richtig</div>
            <div style="height:36px; background:rgba(255,255,255,0.65); border-radius:10px; position:relative; border:1px dashed #16a34a;">
              <div style="position:absolute; left:calc(${Math.min(88, botProzent * 0.88)}%); top:1px; font-size:28px; transition:left 0.4s ease-out; transform:scaleX(-1);">${gegnerIcon}</div>
            </div>
          </div>
        </div>

        <div id="duell-feedback" style="text-align:center; font-weight:800; font-size:15px; color:${feedbackFarbe}; margin-bottom:14px; min-height:24px;">
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
        // Computer trifft zu genau 75 % (zwischen 70 % und 80 %)
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
        const botText = botRichtig ? `${gegnerName}: auch richtig` : `${gegnerName}: daneben getippt!`;
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

      const ueberschrift = gewonnen ? "SIEG IM STUFEN-DUELL!" : "UNENTSCHIEDEN – DU GEWINNST!";
      const untertext = gewonnen
        ? `Stark gemacht! Du hast ${spielerPunkte} zu ${botPunkte} gegen ${gegnerName} gewonnen!`
        : `Spannendes Kopf-an-Kopf-Rennen (${spielerPunkte} zu ${botPunkte}) – der Bonus gehört dir!`;

      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:34px;">
          <div style="font-size:60px; margin-bottom:10px;">🏆${spielerIcon}🎉</div>
          <h2>${ueberschrift}</h2>
          <p class="quiz-hint" style="margin:10px 0 18px;">${untertext}</p>
          <div style="font-size:22px; font-weight:900; color:#d97706; margin-bottom:22px;">+15 Bonus-⭐ gewonnen!</div>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn-primary" onclick="starteRundenDuell(${stufeNr})">Nochmal spielen ${spielerIcon}</button>
            <button class="btn-ghost" onclick="zeigeStartseite()">Zur Startseite</button>
          </div>
        </div>`;
    } else {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:34px;">
          <div style="font-size:60px; margin-bottom:10px;">${gegnerIcon}💨</div>
          <h2>Knapp verloren (${spielerPunkte} : ${botPunkte})!</h2>
          <p class="quiz-hint" style="margin:10px 0 22px;">${gegnerName} hatte diesmal einen Treffer mehr. Gleich nochmal – du packst das!</p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn-primary" onclick="starteRundenDuell(${stufeNr})">Revanche starten! ${spielerIcon}</button>
            <button class="btn-ghost" onclick="zeigeStartseite()">Zur Startseite</button>
          </div>
        </div>`;
    }
  }

  zeichneRunde();
}
