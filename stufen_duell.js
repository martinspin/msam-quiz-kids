// =========================================================
// STUFEN-DUELLE GEGEN DEN COMPUTER (stufen_duell.js) - TEIL 1
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
  if (kapId === 1) {
    startePferderennenStufe1();
  } else {
    alert("Dieses Stufen-Duell folgt gleich – wir starten jetzt Stufe 1 (Pferderennen)!");
    startePferderennenStufe1();
  }
}

function startePferderennenStufe1() {
  const fragenPool = Array.of(
    { typ: "ton", frage: "Welcher Ton klingt HÖHER?", midi1: 60, midi2: 72, antworten: Array.of("1. Ton (tiefer)", "2. Ton (höher)"), richtig: 1 },
    { typ: "ton", frage: "Welcher Ton klingt TIEFER?", midi1: 74, midi2: 62, antworten: Array.of("1. Ton", "2. Ton"), richtig: 1 },
    { typ: "ton", frage: "Welcher Ton klingt HÖHER?", midi1: 67, midi2: 60, antworten: Array.of("1. Ton", "2. Ton"), richtig: 0 },
    { typ: "ton", frage: "Welcher Ton klingt TIEFER?", midi1: 64, midi2: 76, antworten: Array.of("1. Ton", "2. Ton"), richtig: 0 },
    { typ: "wissen", frage: "Wo liegen auf dem Klavier die TIEFEN Töne?", antworten: Array.of("Links auf der Tastatur", "Rechts auf der Tastatur"), richtig: 0 },
    { typ: "wissen", frage: "Wo liegen auf dem Klavier die HOHEN Töne?", antworten: Array.of("Links auf der Tastatur", "Rechts auf der Tastatur"), richtig: 1 },
    { typ: "wissen", frage: "Wie viele schwarze Tasten sind in der KLEINEN Gruppe?", antworten: Array.of("2 schwarze Tasten", "3 schwarze Tasten"), richtig: 0 },
    { typ: "wissen", frage: "Wie viele schwarze Tasten sind in der GROSSEN Gruppe?", antworten: Array.of("2 schwarze Tasten", "3 schwarze Tasten"), richtig: 1 },
    { typ: "wissen", frage: "Welcher Ton liegt LINKS vor den 2 schwarzen Tasten?", antworten: Array.of("Das C", "Das F"), richtig: 0 },
    { typ: "wissen", frage: "Welcher Ton liegt LINKS vor den 3 schwarzen Tasten?", antworten: Array.of("Das C", "Das F"), richtig: 1 }
  );

  let spielerPos = 0;
  let botPos = 0;
  let runde = 0;
  let sperre = false;
  let laufend = true;
  const fragen = fragenPool.slice().sort(() => Math.random() - 0.5);

  function spieleTonPaar(m1, m2) {
    if (typeof klavierAudio !== "undefined" && typeof klavierAudio.spieleMidi === "function") {
      klavierAudio.spieleMidi(m1);
      setTimeout(() => klavierAudio.spieleMidi(m2), 550);
    }
  }
// =========================================================
// STUFEN-DUELLE GEGEN DEN COMPUTER (stufen_duell.js) - TEIL 2
// =========================================================

  function zeichneRennen(feedbackText = "Gib Gas! Jede richtige Antwort gibt deinem Pferd einen Turbo-Sprung!", feedbackFarbe = "#334155") {
    const f = fragen.at(runde % fragen.length);

    document.getElementById("main-content").innerHTML = `
      <div class="card" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
          <h2 style="margin:0;">🐎 Stufe 1: Musik-Pferderennen</h2>
          <button class="btn-ghost" onclick="stoppeDuellTimer(); zeigeKapitel(1)">Abbrechen</button>
        </div>

        <div style="background:linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%); border:3px solid #16a34a; border-radius:16px; padding:16px 18px; margin-bottom:16px; position:relative; overflow:hidden;">
          <div style="position:absolute; right:16px; top:8px; bottom:8px; width:6px; background:repeating-linear-gradient(0deg, #000 0px, #000 8px, #fff 8px, #fff 16px); border-radius:3px;"></div>
          <div style="position:absolute; right:26px; top:6px; font-size:12px; font-weight:900; color:#15803d;">ZIEL 🏁</div>

          <div style="margin-bottom:14px;">
            <div style="font-size:13px; font-weight:800; color:#1e3a8a; margin-bottom:4px;">🏇 Dein Rennpferd (${Math.min(100, Math.round(spielerPos))}%)</div>
            <div style="height:36px; background:rgba(255,255,255,0.65); border-radius:10px; position:relative; border:1px dashed #16a34a;">
              <div id="pferd-spieler" style="position:absolute; left:calc(${Math.min(88, spielerPos * 0.88)}%); top:1px; font-size:28px; transition:left 0.35s ease-out; transform:scaleX(-1);">🐎</div>
            </div>
          </div>

          <div>
            <div style="font-size:13px; font-weight:800; color:#991b1b; margin-bottom:4px;">🤖 Blitz-Huf (Computer: <span id="bot-prozent">${Math.min(100, Math.round(botPos))}</span>%)</div>
            <div style="height:36px; background:rgba(255,255,255,0.65); border-radius:10px; position:relative; border:1px dashed #16a34a;">
              <div id="pferd-bot" style="position:absolute; left:calc(${Math.min(88, botPos * 0.88)}%); top:1px; font-size:28px; transition:left 0.3s linear; transform:scaleX(-1);">🦄</div>
            </div>
          </div>
        </div>

        <div id="duell-feedback" style="text-align:center; font-weight:800; font-size:15px; color:${feedbackFarbe}; margin-bottom:14px; min-height:22px;">
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
      setTimeout(() => spieleTonPaar(f.midi1, f.midi2), 200);
    }

    document.querySelectorAll(".duell-ant-btn").forEach((btn) => {
      btn.onclick = () => {
        if (sperre || !laufend) return;
        sperre = true;
        const wahl = Number(btn.getAttribute("data-idx"));

        if (wahl === f.richtig) {
          spielerPos += 17;
          if (typeof klavierAudio !== "undefined" && typeof klavierAudio.spieleMidi === "function") klavierAudio.spieleMidi(72);
          if (spielerPos >= 100) { beendePferderennen(true); return; }
          runde++;
          sperre = false;
          zeichneRennen("⚡ TURBO-GALOPP! Super gemacht – weiter!", "#16a34a");
        } else {
          botPos += 8;
          if (typeof klavierAudio !== "undefined" && typeof klavierAudio.spieleMidi === "function") klavierAudio.spieleMidi(48);
          if (botPos >= 100) { beendePferderennen(false); return; }
          runde++;
          sperre = false;
          zeichneRennen("💨 Stolperer! Blitz-Huf holt auf – schnell die nächste Frage!", "#dc2626");
        }
      };
    });
  }

  function beendePferderennen(gewonnen) {
    laufend = false;
    stoppeDuellTimer();

    if (gewonnen) {
      try {
        const fanfareAudio = new Audio("sounds/fanfare.mp3");
        fanfareAudio.volume = 0.85;
        fanfareAudio.play().catch(() => {});
      } catch (e) {}
      if (typeof starteKapitelKonfetti === "function") starteKapitelKonfetti();

      const daten = ladeFortschritt();
      daten.sterne += 15;
      speichereFortschritt(daten);

      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:34px;">
          <div style="font-size:60px; margin-bottom:10px;">🏆🐎🎉</div>
          <h2>SIEG IM PFERDERENNEN!</h2>
          <p class="quiz-hint" style="margin:10px 0 18px;">Du hast Blitz-Huf abgehängt und als Erste:r die Ziellinie überquert!</p>
          <div style="font-size:22px; font-weight:900; color:#d97706; margin-bottom:22px;">+15 Bonus-⭐ gewonnen!</div>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn-primary" onclick="startePferderennenStufe1()">Nochmal reiten 🐎</button>
            <button class="btn-ghost" onclick="zeigeKapitel(1)">Zurück zu Stufe 1</button>
          </div>
        </div>`;
    } else {
      document.getElementById("main-content").innerHTML = `
        <div class="card" style="text-align:center; padding:34px;">
          <div style="font-size:60px; margin-bottom:10px;">🦄💨</div>
          <h2>Knapp verloren!</h2>
          <p class="quiz-hint" style="margin:10px 0 22px;">Blitz-Huf war diesmal eine Nasenlänge schneller. Gleich nochmal – du packst das!</p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn-primary" onclick="startePferderennenStufe1()">Revanche starten! 🐎</button>
            <button class="btn-ghost" onclick="zeigeKapitel(1)">Zurück zu Stufe 1</button>
          </div>
        </div>`;
    }
  }

  duellTimer = setInterval(() => {
    if (!laufend) return;
    botPos += 3.1;
    const botEl = document.getElementById("pferd-bot");
    const prozEl = document.getElementById("bot-prozent");
    if (botEl) botEl.style.left = `calc(${Math.min(88, botPos * 0.88)}%)`;
    if (prozEl) prozEl.textContent = Math.min(100, Math.round(botPos));
    if (botPos >= 100) beendePferderennen(false);
  }, 700);

  zeichneRennen();
}
