// msam quiz kids: Schüler-Login, Cloud-Datenbank & Lehrpersonen-Cockpit

const MSAM_PROTO = "https" + "://";
const MSAM_HOST = "firestore" + ".googleapis.com";
const MSAM_PROJECT_ID = "msam-quiz-kids";
const MSAM_FIRESTORE_URL = `${MSAM_PROTO}${MSAM_HOST}/v1/projects/${MSAM_PROJECT_ID}/databases/(default)/documents/msam_schueler`;
const MSAM_LEHRPERSONEN = Array.of(
  { id: "adrian_popp", name: "Adrian Popp (Drumset / Perkussion)", pin: "1001" },
  { id: "albert_graf", name: "Albert Graf (Hackbrett)", pin: "1002" },
  { id: "alessia_heim", name: "Alessia Heim (Hackbrett)", pin: "1003" },
  { id: "aline_spaltenstein", name: "Aline Spaltenstein (Kontrabass)", pin: "1004" },
  { id: "alla_ternova", name: "Alla Ternova (Streicher)", pin: "1005" },
  { id: "anna_fronczak", name: "Anna Fronczak (Klarinette / Gesang)", pin: "1006" },
  { id: "clarigna_kueng", name: "Clarigna Küng (Violine / Viola)", pin: "1007" },
  { id: "claudia_mantovani", name: "Claudia Mantovani (Harfe)", pin: "1008" },
  { id: "daniel_weniger", name: "Daniel Weniger (Gitarre / E-Gitarre)", pin: "1009" },
  { id: "dieter_magsam", name: "Dieter Magsam (Gitarre / Ukulele)", pin: "1010" },
  { id: "dionys_tschopp", name: "Dionys Tschopp (Cornet / Trompete)", pin: "1011" },
  { id: "eliane_buechel", name: "Eliane Büchel (Akkordeon / Schwyzerörgeli)", pin: "1012" },
  { id: "emanuel_andriescu", name: "Emanuel Andriescu (Saxofon)", pin: "1013" },
  { id: "enrico_cerpelloni", name: "Enrico Cerpelloni (Horn / Alphorn)", pin: "1014" },
  { id: "knight_eun_joo", name: "Eun-Joo Knight (Blockflöte)", pin: "1015" },
  { id: "franziska_raymann", name: "Franziska Raymann (Eltern-Kind-Singen)", pin: "1016" },
  { id: "frida_sailer", name: "Frida Sailer (Jugendchor / El-Ki-Si)", pin: "1017" },
  { id: "hiroko_haag", name: "Hiroko Haag (Gesang / Orgel / El-Ki-Si)", pin: "1018" },
  { id: "jasmin_knobel", name: "Jasmin Knobel (Akkordeon / Schwyzerörgeli)", pin: "1019" },
  { id: "kinga_horvath", name: "Kinga Horvath (Querflöte / Blockflöte)", pin: "1020" },
  { id: "krasimir_stefanov", name: "Krasimir Stefanov (Posaune)", pin: "1021" },
  { id: "linus_tschopp", name: "Linus Tschopp (Euphonium / Es-Horn / Posaune)", pin: "1022" },
  { id: "livia_loewe", name: "Livia Loewe (Violine / Viola)", pin: "1023" },
  { id: "manuela_engel", name: "Manuela Engel (Klavier)", pin: "1024" },
  { id: "martin_senn", name: "Martin Senn (Klavier / E-Piano / Keyboard)", pin: "1025" },
  { id: "mathieu_casareale", name: "Mathieu Casareale (Drumset / Perkussion)", pin: "1026" },
  { id: "mihaela_stefanova", name: "Mihaela Stefanova (Klavier / Orgel)", pin: "1027" },
  { id: "milena_salvatti", name: "Milena Salvatti (Violoncello)", pin: "1028" },
  { id: "olaf_krueger", name: "Olaf Krüger (Violoncello)", pin: "1029" },
  { id: "oleksii_samoriezov", name: "Oleksii Samoriezov (Gitarre / Ukulele / E-Gitarre)", pin: "1030" },
  { id: "patrick_kessler", name: "Patrick Kessler (Kontrabass)", pin: "1031" },
  { id: "regula_weiss", name: "Regula Weiss (Oboe)", pin: "1032" },
  { id: "ruediger_schwedes", name: "Rüdiger Schwedes (Fagott)", pin: "1033" },
  { id: "sarah_fleten", name: "Sarah Fleten (Querflöte)", pin: "1034" },
  { id: "sari_weber", name: "Sari Weber (Klavier)", pin: "1035" },
  { id: "sissi_riegg", name: "Sissi Riegg (Jodel)", pin: "1036" },
  { id: "stephane_boelingen", name: "Stéphane Bölingen (Klavier)", pin: "1037" },
  { id: "thorsten_pabst", name: "Thorsten Pabst (Klavier)", pin: "1038" },
  { id: "ute_weyrich", name: "Ute Weyrich (Trompete)", pin: "1039" },
  { id: "wolfgang_wahl", name: "Wolfgang Wahl (Drums)", pin: "1040" }
);


function ladeMsamProfil() {
  try {
    const roh = localStorage.getItem("msamSchuelerProfil");
    return roh ? JSON.parse(roh) : null;
  } catch (e) {
    return null;
  }
}
  const altesProfil = ladeMsamProfil();
  if (!altesProfil || altesProfil.id !== schuelerId) {
    localStorage.setItem("klavierEntdeckerFortschritt", JSON.stringify({ sterne: 0, erledigt: [] }));
  }

function speichereMsamProfil(profil) {
  try {
    localStorage.setItem("msamSchuelerProfil", JSON.stringify(profil));
  } catch (e) {}
}

function baueMsamStatusLeiste() {
  const profil = ladeMsamProfil();
  if (!profil) return "";
  return `
    <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-top:12px;">
      <button class="btn-ghost" onclick="zeigeMsamRangliste(false)">🏆 Rangliste</button>
      <button class="btn-ghost" onclick="zeigeMsamAnmeldung(true)">✏️ Name / Lehrperson</button>
      <button class="btn-ghost" onclick="zeigeMsamLehrpersonenLogin()">👩‍🏫 Lehrpersonen</button>
    </div>`;
}

async function msamSafeFirestorePatch(profil, body) {
  const docUrl = `${MSAM_FIRESTORE_URL}/${encodeURIComponent(profil.id)}`;
  let finalSterne = Number(body.fields.sterne?.integerValue || 0);
  let finalErledigt = (body.fields.erledigt?.arrayValue?.values || []).map((v) => v.stringValue).filter(Boolean);

  try {
    const getRes = await fetch(docUrl);
    if (getRes.ok && body && body.fields) {
      const cloudJson = await getRes.json();
      const cf = cloudJson.fields || {};

      // 1. Höhere Sterne behalten
      const cloudSterne = Number(cf.sterne?.integerValue || cf.sterne?.doubleValue || 0);
      finalSterne = Math.max(cloudSterne, finalSterne);
      body.fields.sterne = { integerValue: String(finalSterne) };

      // 2. Gelöste Aufgaben-Liste (erledigt) vereinigen
      const cloudErledigt = (cf.erledigt?.arrayValue?.values || []).map((v) => v.stringValue).filter(Boolean);
      finalErledigt = Array.from(new Set([...cloudErledigt, ...finalErledigt]));

      body.fields.erledigt = {
        arrayValue: { values: finalErledigt.map((id) => ({ stringValue: id })) }
      };

      // 3. Höhere erledigtAnzahl behalten
      const cloudAnzahl = Number(cf.erledigtAnzahl?.integerValue || 0);
      const maxAnzahl = Math.max(cloudAnzahl, finalErledigt.length, Number(body.fields.erledigtAnzahl?.integerValue || 0));
      body.fields.erledigtAnzahl = { integerValue: String(maxAnzahl) };
    }
  } catch (e) {
    console.warn("Firebase Vorab-Check übersprungen:", e);
  }

  // Vereinigte Daten direkt lokal speichern und Anzeige aktualisieren
  try {
    const lokal = typeof ladeFortschritt === "function" ? ladeFortschritt() : { sterne: 0, erledigt: [] };
    lokal.sterne = finalSterne;
    lokal.erledigt = finalErledigt;
    localStorage.setItem("klavierEntdeckerFortschritt", JSON.stringify(lokal));
    if (typeof aktualisiereSterneAnzeige === "function") {
      aktualisiereSterneAnzeige();
    }
  } catch (e) {}

  return fetch(docUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

async function ladeAlleMsamSchuelerAusCloud() {
  const res = await fetch(`${MSAM_FIRESTORE_URL}?pageSize=200`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ? err.error.message : "HTTP " + res.status);
  }
  const data = await res.json();
  if (!data.documents) return Array.of();
  return data.documents.map((doc) => {
    const f = doc.fields || {};
    const id = doc.name.split("/").pop();
    return {
      id,
      vorname: f.vorname ? f.vorname.stringValue : "",
      nachname: f.nachname ? f.nachname.stringValue : "",
      lehrpersonId: f.lehrpersonId ? f.lehrpersonId.stringValue : "",
      lehrpersonName: f.lehrpersonName ? f.lehrpersonName.stringValue : "",
      sterne: f.sterne ? Number(f.sterne.integerValue) : 0,
      erledigtAnzahl: f.erledigtAnzahl ? Number(f.erledigtAnzahl.integerValue) : 0,
      letztesSpiel: f.letztesSpiel ? f.letztesSpiel.stringValue : ""
    };
  });
}

function zeigeMsamAnmeldung(alsModal = false) {
  const aktuellesProfil = ladeMsamProfil();
  const lpOptionen = MSAM_LEHRPERSONEN.map((lp) => {
    const sel = aktuellesProfil && aktuellesProfil.lehrpersonId === lp.id ? "selected" : "";
    return `<option value="${lp.id}" ${sel}>${lp.name}</option>`;
  }).join("");

  const html = `
    <div class="card" style="max-width:480px; margin:20px auto; text-align:center; border-top:6px solid #e11d48;">
      <div style="font-size:48px;">🏆🎶</div>
      <h2 style="margin:6px 0;"><span style="text-transform:lowercase;">msam quiz kids</span></h2>
      <p class="quiz-hint">Gib deinen Namen ein und wähle deine Lehrperson an der <span style="text-transform:lowercase;">musikschule appenzeller mittelland</span> aus!</p>

      <div style="text-align:left; margin-top:16px; display:flex; flex-direction:column; gap:12px;">
        <div>
          <label style="font-weight:800; font-size:14px;">Vorname</label>
          <input id="msam-vorname" type="text" placeholder="z. B. Mia"
                 value="${aktuellesProfil ? aktuellesProfil.vorname : ""}"
                 style="width:100%; padding:12px; border-radius:12px; border:2px solid #cbd5e1; font-size:16px; margin-top:4px; box-sizing:border-box;" />
        </div>
        <div>
          <label style="font-weight:800; font-size:14px;">Nachname</label>
          <input id="msam-nachname" type="text" placeholder="z. B. Muster"
                 value="${aktuellesProfil ? aktuellesProfil.nachname : ""}"
                 style="width:100%; padding:12px; border-radius:12px; border:2px solid #cbd5e1; font-size:16px; margin-top:4px; box-sizing:border-box;" />
        </div>
        <div>
          <label style="font-weight:800; font-size:14px;">Meine Lehrperson (<span style="text-transform:lowercase;">msam</span>)</label>
          <select id="msam-lehrperson"
                  style="width:100%; padding:12px; border-radius:12px; border:2px solid #cbd5e1; font-size:16px; margin-top:4px; background:#ffffff;">
            ${lpOptionen}
          </select>
        </div>
      </div>

      <p id="msam-login-fehler" style="color:#dc2626; font-weight:700; margin-top:10px;"></p>

      <div style="margin-top:16px; display:flex; gap:10px; justify-content:center;">
        <button class="btn-primary" onclick="speichereMsamLogin()">Mitspielen ▶</button>
        ${alsModal ? `<button class="btn-ghost" onclick="zeigeStartseite()">Abbrechen</button>` : ""}
      </div>
    </div>`;

  document.getElementById("main-content").innerHTML = html;
}
window.speichereMsamLogin = async () => {
  const vorname = document.getElementById("msam-vorname").value.trim();
  const nachname = document.getElementById("msam-nachname").value.trim();
  const lpId = document.getElementById("msam-lehrperson").value;

  if (!vorname || !nachname) {
    document.getElementById("msam-login-fehler").textContent = "Bitte Vorname und Nachname eingeben!";
    return;
  }
  const lpObj = MSAM_LEHRPERSONEN.find((l) => l.id === lpId) || MSAM_LEHRPERSONEN.at(0);
  const schuelerId = `${vorname.toLowerCase()}_${nachname.toLowerCase()}_${lpObj.id}`.replace(/[^a-z0-9_]/g, "");

  // Lokalen Stand nur zurücksetzen, wenn sich ein anderer Schüler anmeldet
  const altesProfil = ladeMsamProfil();
  if (!altesProfil || altesProfil.id !== schuelerId) {
    localStorage.setItem("klavierEntdeckerFortschritt", JSON.stringify({ sterne: 0, erledigt: [] }));
  }

  speichereMsamProfil({
    id: schuelerId,
    vorname,
    nachname,
    lehrpersonId: lpObj.id,
    lehrpersonName: lpObj.name
  });

  try {
    await synchronisiereFortschrittMitCloud();
  } catch (e) {
    console.warn("Cloud-Sync Fehler:", e);
  }
  if (typeof aktualisiereSterneAnzeige === "function") aktualisiereSterneAnzeige();
  zeigeStartseite();
};

async function zeigeMsamRangliste(nurMeineKlasse = false) {
  const profil = ladeMsamProfil();
  document.getElementById("main-content").innerHTML = `
    <div class="card" style="text-align:center;">
      <h2>🏆 <span style="text-transform:lowercase;">msam quiz kids</span> – Rangliste</h2>
      <p class="quiz-hint">Lade aktuelle Punktestände...</p>
    </div>`;

  let teilnehmer = Array.of();
  try {
    teilnehmer = await ladeAlleMsamSchuelerAusCloud();
    teilnehmer.sort((a, b) => (b.sterne || 0) - (a.sterne || 0));
  } catch (e) {
    console.warn("Fehler beim Laden der Rangliste:", e);
  }

  if (teilnehmer.length === 0 && profil) {
    const lokal = ladeFortschritt();
    teilnehmer.push({ ...profil, sterne: lokal.sterne, erledigtAnzahl: lokal.erledigt.length });
  }

  if (nurMeineKlasse && profil) {
    teilnehmer = teilnehmer.filter((t) => t.lehrpersonId === profil.lehrpersonId);
  }

  const zeilenHTML = teilnehmer.map((t, idx) => {
    const istIch = profil && t.id === profil.id;
    const platzIcon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`;
    const anzeigeName = `${t.vorname} ${t.nachname ? t.nachname.charAt(0) + "." : ""}`;
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; border-radius:14px; margin-bottom:8px;
                  background:${istIch ? "#fef3c7" : "#f8fafc"}; border:2px solid ${istIch ? "#f59e0b" : "#e2e8f0"};">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:20px; font-weight:900; min-width:34px;">${platzIcon}</span>
          <div style="text-align:left;">
            <div style="font-weight:900; font-size:16px;">${anzeigeName} ${istIch ? "(Du! ⭐)" : ""}</div>
            <div style="font-size:12px; color:#64748b;">${t.lehrpersonName} • ${t.erledigtAnzahl || 0} / 30 Spiele</div>
          </div>
        </div>
        <div style="font-weight:900; font-size:18px; color:#b45309;">${t.sterne || 0} ⭐</div>
      </div>`;
  }).join("");

  document.getElementById("main-content").innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <h2 style="margin:0;">🏆 <span style="text-transform:lowercase;">msam quiz kids</span> – Rangliste</h2>
        <button class="btn-ghost" onclick="zeigeStartseite()">← Zurück</button>
      </div>
      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
        <button class="${!nurMeineKlasse ? "btn-primary" : "btn-ghost"}" onclick="zeigeMsamRangliste(false)">Alle <span style="text-transform:lowercase;">msam</span> Kids</button>
        <button class="${nurMeineKlasse ? "btn-primary" : "btn-ghost"}" onclick="zeigeMsamRangliste(true)">Meine Klasse</button>
      </div>
      <div>${zeilenHTML || "<p>Noch keine Einträge vorhanden.</p>"}</div>
    </div>`;
}

function zeigeMsamLehrpersonenLogin() {
  const lpOptionen = MSAM_LEHRPERSONEN.map((lp) => `<option value="${lp.id}">${lp.name}</option>`).join("");

  document.getElementById("main-content").innerHTML = `
    <div class="card" style="max-width:440px; margin:20px auto; text-align:center;">
      <div style="font-size:44px;">👩‍🏫👨‍🏫</div>
      <h2>Lehrpersonen-Cockpit (<span style="text-transform:lowercase;">msam</span>)</h2>
      <p class="quiz-hint">Wähle deinen Namen und gib deine 4-stellige PIN ein.</p>
      <select id="lp-login-id" style="width:100%; padding:12px; border-radius:12px; border:2px solid #cbd5e1; font-size:16px; margin-top:12px;">
        ${lpOptionen}
      </select>
      <input id="lp-login-pin" type="password" inputmode="numeric" maxlength="4" placeholder="PIN (z. B. 1111)"
             style="width:100%; padding:12px; border-radius:12px; border:2px solid #cbd5e1; font-size:18px; text-align:center; margin-top:10px; box-sizing:border-box;" />
      <p id="lp-login-fehler" style="color:#dc2626; font-weight:700; margin-top:8px;"></p>
      <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
        <button class="btn-primary" onclick="pruefeMsamLehrpersonenPin()">Cockpit öffnen</button>
        <button class="btn-ghost" onclick="zeigeStartseite()">Zurück</button>
      </div>
    </div>`;
}

window.loescheMsamSchueler = async (schuelerId, name) => {
  if (!confirm(`Eintrag von "${name}" wirklich aus der Rangliste löschen?`)) return;
  await fetch(`${MSAM_FIRESTORE_URL}/${schuelerId}`, { method: "DELETE" });
  const aktuellesProfil = ladeMsamProfil();
  if (aktuellesProfil && aktuellesProfil.id === schuelerId) {
    localStorage.removeItem("msamSchuelerProfil");
    localStorage.removeItem("klavierEntdeckerFortschritt");
  }
  pruefeMsamLehrpersonenPin();
};

window.pruefeMsamLehrpersonenPin = async () => {
  const lpId = document.getElementById("lp-login-id").value;
  const pin = document.getElementById("lp-login-pin").value.trim();
  const lp = MSAM_LEHRPERSONEN.find((l) => l.id === lpId);

  if (!lp || lp.pin !== pin) {
    document.getElementById("lp-login-fehler").textContent = "Falsche PIN! Bitte nochmals versuchen.";
    return;
  }

  let meineSchueler = Array.of();
  let statusMeldung = "⏳ Lade Daten...";

  try {
    const alle = await ladeAlleMsamSchuelerAusCloud();
    meineSchueler = alle.filter((s) => s.lehrpersonId === lp.id);
    meineSchueler.sort((a, b) => (b.sterne || 0) - (a.sterne || 0));
    statusMeldung = "✅ Online verbunden (" + meineSchueler.length + " Einträge gefunden).";
  } catch (e) {
    statusMeldung = "❌ Firebase-Fehler: " + e.message;
  }

  const listeHTML = meineSchueler.map((s) => {
    const datum = s.letztesSpiel ? new Date(s.letztesSpiel).toLocaleDateString("de-CH") : "–";
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border:2px solid #e2e8f0; border-radius:14px; margin-bottom:8px; background:#ffffff;">
        <div style="text-align:left;">
          <div style="font-weight:900; font-size:17px;">${s.vorname} ${s.nachname}</div>
          <div style="font-size:13px; color:#475569;">Fortschritt: <b>${s.erledigtAnzahl || 0} / 30 Spiele</b> • Aktiv: ${datum}</div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-weight:900; font-size:18px; color:#4f46e5;">${s.sterne || 0} ⭐</span>
          <button class="btn-ghost" style="padding:6px 10px; color:#dc2626;" onclick="loescheMsamSchueler('${s.id}', '${s.vorname} ${s.nachname}')" title="Eintrag löschen">🗑️</button>
        </div>
      </div>`;
  }).join("");

  document.getElementById("main-content").innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <div>
          <h2 style="margin:0;">📋 Klasse von ${lp.name}</h2>
          <p style="margin:6px 0 0; font-weight:700; color:#0f172a;">${statusMeldung}</p>
        </div>
        <button class="btn-ghost" onclick="zeigeStartseite()">← Zurück</button>
      </div>
      <div>${listeHTML || "<p>Es hat sich noch kein Schüler unter deinem Namen angemeldet.</p>"}</div>
    </div>`;
};
// === LEHRERCOCKPIT & SPIELSTAND-SCHUTZ (AM ENDE VON MEISTERSCHAFT.JS) ===

// 1. Lehrercockpit-Ansicht (nutzt deine bestehende ladeAlleMsamSchuelerAusCloud)
async function oeffneMsamLehrerCockpit() {
  const pass = prompt("Lehrercockpit-Passwort eingeben:");
  if (pass !== "msam2026") {
    alert("Falsches Passwort.");
    return;
  }

  const ziel = document.getElementById("app") || document.body;
  ziel.innerHTML = `<div class="card" style="max-width:720px;margin:20px auto;text-align:center;"><h3>Lade Schülerdaten aus Firebase...</h3></div>`;

  try {
    const liste = await ladeAlleMsamSchuelerAusCloud();
    liste.sort((a, b) => (b.sterne || 0) - (a.sterne || 0));

    const zeilen = liste.map((s) => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:10px;text-align:left;font-weight:700;">${s.vorname} ${s.nachname}</td>
        <td style="padding:10px;text-align:left;">${s.lehrpersonName || s.lehrpersonId || "-"}</td>
        <td style="padding:10px;text-align:center;font-weight:800;">⭐ ${s.sterne || 0}</td>
        <td style="padding:10px;text-align:center;">${s.erledigtAnzahl || 0}</td>
        <td style="padding:10px;text-align:left;font-size:13px;">${s.letztesSpiel || "-"}</td>
      </tr>
    `).join("");

    ziel.innerHTML = `
      <div class="card" style="max-width:820px;margin:20px auto;border-top:6px solid #0284c7;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <h2 style="margin:0;">🎓 Lehrercockpit (<span style="text-transform:lowercase;">msam quiz kids</span>)</h2>
          <button class="btn-ghost" onclick="location.reload()">Zurück zum Quiz</button>
        </div>
        <p style="color:#475569;">Alle registrierten Schülerinnen und Schüler (${liste.length}) sortiert nach Sternen:</p>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;margin-top:10px;">
            <thead>
              <tr style="background:#f1f5f9;border-bottom:2px solid #cbd5e1;">
                <th style="padding:10px;text-align:left;">Name</th>
                <th style="padding:10px;text-align:left;">Lehrperson</th>
                <th style="padding:10px;text-align:center;">Sterne</th>
                <th style="padding:10px;text-align:center;">Aufgaben</th>
                <th style="padding:10px;text-align:left;">Letztes Spiel</th>
              </tr>
            </thead>
            <tbody>${zeilen || '<tr><td colspan="5" style="padding:16px;text-align:center;">Noch keine Einträge gefunden.</td></tr>'}</tbody>
          </table>
        </div>
      </div>`;
  } catch (err) {
    ziel.innerHTML = `<div class="card" style="max-width:600px;margin:20px auto;color:#dc2626;"><h3>Fehler beim Laden:</h3><p>${err.message}</p><button class="btn-ghost" onclick="location.reload()">Zurück</button></div>`;
  }
}

// 2. Unauffälligen "Lehrercockpit"-Link automatisch unten auf der Seite einblenden
window.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("msam-cockpit-link")) {
    const link = document.createElement("div");
    link.id = "msam-cockpit-link";
    link.style.cssText = "text-align:center;margin:24px 0 12px 0;font-size:13px;opacity:0.65;";
    link.innerHTML = `<a href="#" onclick="event.preventDefault(); oeffneMsamLehrerCockpit();" style="color:#475569;text-decoration:underline;">🎓 Lehrercockpit</a>`;
    document.body.appendChild(link);
  }
});
