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

  // Vereinigte Daten unter allen verwendeten Speicherschlüsseln dieses Profils sichern
  try {
    const schluesselListe = new Set([
      "klavierEntdeckerFortschritt",
      `msam_quizkids_stand_${profil.id}`
    ]);
    if (typeof speicherSchluessel === "function") {
      schluesselListe.add(speicherSchluessel());
    }

    schluesselListe.forEach((key) => {
      let lokal = { sterne: 0, erledigt: [] };
      try {
        const roh = localStorage.getItem(key);
        if (roh) lokal = JSON.parse(roh);
      } catch (e) {}
      lokal.sterne = finalSterne;
      lokal.erledigt = finalErledigt;
      localStorage.setItem(key, JSON.stringify(lokal));
    });

    const starEl = document.getElementById("star-count");
    if (starEl) starEl.textContent = String(finalSterne);
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

async function synchronisiereFortschrittMitCloud() {
  const profil = ladeMsamProfil();
  if (!profil) return;

  let lokaleSterne = 0;
  let lokaleErledigt = [];
  const leseSchluessel = [
    `msam_quizkids_stand_${profil.id}`,
    "klavierEntdeckerFortschritt"
  ];
  if (typeof speicherSchluessel === "function") {
    leseSchluessel.unshift(speicherSchluessel());
  }

  leseSchluessel.forEach((key) => {
    try {
      const roh = localStorage.getItem(key);
      if (roh) {
        const parsed = JSON.parse(roh);
        if (typeof parsed.sterne === "number" && parsed.sterne > lokaleSterne) {
          lokaleSterne = parsed.sterne;
        }
        if (Array.isArray(parsed.erledigt)) {
          lokaleErledigt = Array.from(new Set([...lokaleErledigt, ...parsed.erledigt]));
        }
      }
    } catch (e) {}
  });

  // 1. Zuerst den aktuellen Stand aus Firebase abrufen (Zwei-Wege-Sync)
  let cloudSterne = 0;
  let cloudErledigt = [];
  try {
    const getRes = await fetch(`${MSAM_FIRESTORE_URL}/${profil.id}`);
    if (getRes.ok) {
      const doc = await getRes.json();
      const f = doc.fields || {};
      if (f.sterne && f.sterne.integerValue) {
        cloudSterne = Number(f.sterne.integerValue) || 0;
      }
      if (f.erledigt && f.erledigt.arrayValue && Array.isArray(f.erledigt.arrayValue.values)) {
        cloudErledigt = f.erledigt.arrayValue.values
          .map((v) => v.stringValue)
          .filter(Boolean);
      }
    }
  } catch (e) {
    console.warn("Cloud-Abruf fehlgeschlagen, nutze lokalen Stand:", e);
  }

  // 2. Immer den höheren Sternestand & alle erledigten Spiele zusammenführen
  const besteSterne = Math.max(lokaleSterne, cloudSterne);
  const alleErledigt = Array.from(new Set([...lokaleErledigt, ...cloudErledigt]));

  // 3. Zusammengeführten Stand lokal auf diesem Gerät speichern & Anzeige aktualisieren
  const neuerStand = { sterne: besteSterne, erledigt: alleErledigt };
  leseSchluessel.forEach((key) => {
    try {
      const altRoh = localStorage.getItem(key);
      const altObj = altRoh ? JSON.parse(altRoh) : {};
      localStorage.setItem(key, JSON.stringify({ ...altObj, ...neuerStand }));
    } catch (e) {}
  });

  const starEl = document.getElementById("star-count");
  if (starEl) starEl.textContent = String(besteSterne);

  // 4. Zusammengeführten Stand sicher in Firebase speichern
  const body = {
    fields: {
      vorname: { stringValue: profil.vorname },
      nachname: { stringValue: profil.nachname },
      lehrpersonId: { stringValue: profil.lehrpersonId },
      lehrpersonName: { stringValue: profil.lehrpersonName },
      sterne: { integerValue: String(besteSterne) },
      erledigtAnzahl: { integerValue: String(alleErledigt.length) },
      erledigt: { arrayValue: { values: alleErledigt.map((id) => ({ stringValue: String(id) })) } },
      letztesSpiel: { stringValue: new Date().toISOString() }
    }
  };
  await msamSafeFirestorePatch(profil, body);
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

function zeigeMsamLehrpersonenLogin() {
  const lpOptionen = MSAM_LEHRPERSONEN.map((lp) => `<option value="${lp.id}">${lp.name}</option>`).join("");

  document.getElementById("main-content").innerHTML = `
    <div class="card" style="max-width:440px; margin:20px auto; text-align:center;">
      <div style="font-size:44px;">👩‍🏫👨‍🏫</div>
      <h2>Lehrpersonen-Cockpit (<span style="text-transform:lowercase;">msam</span>)</h2>
      <p class="quiz-hint">Wähle deinen Namen und gib den PIN ein.</p>
      <select id="lp-login-id" style="width:100%; padding:12px; border-radius:12px; border:2px solid #cbd5e1; font-size:16px; margin-top:12px;">
        ${lpOptionen}
      </select>
      <input id="lp-login-pin" type="password" placeholder="PIN"
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
    localStorage.removeItem(`msam_quizkids_stand_${schuelerId}`);
  }
  pruefeMsamLehrpersonenPin();
};

window.pruefeMsamLehrpersonenPin = async () => {
  const lpId = document.getElementById("lp-login-id").value;
  const pin = document.getElementById("lp-login-pin").value.trim();
  const lp = MSAM_LEHRPERSONEN.find((l) => l.id === lpId);

  if (!lp || pin !== "msam2026") {
    document.getElementById("lp-login-fehler").textContent = "Falscher PIN! Bitte nochmals versuchen.";
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

async function zeigeMsamRangliste() {
  const ziel = document.getElementById("main-content");
  ziel.innerHTML = `<div class="card" style="max-width:600px; margin:20px auto; text-align:center;"><h3>⏳ Lade Rangliste...</h3></div>`;

  try {
    const alle = await ladeAlleMsamSchuelerAusCloud();
    alle.sort((a, b) => (b.sterne || 0) - (a.sterne || 0));

    const zeilen = alle.map((s, index) => {
      const rang = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border:2px solid #e2e8f0; border-radius:14px; margin-bottom:8px; background:#ffffff;">
          <div style="display:flex; align-items:center; gap:12px; text-align:left;">
            <span style="font-weight:900; font-size:18px; min-width:28px;">${rang}</span>
            <div>
              <div style="font-weight:900; font-size:16px;">${s.vorname} ${s.nachname}</div>
              <div style="font-size:12px; color:#64748b;">${s.lehrpersonName || ""}</div>
            </div>
          </div>
          <span style="font-weight:900; font-size:18px; color:#4f46e5;">${s.sterne || 0} ⭐</span>
        </div>`;
    }).join("");

    ziel.innerHTML = `
      <div class="card" style="max-width:600px; margin:20px auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h2 style="margin:0;">🏆 Rangliste (<span style="text-transform:lowercase;">msam</span>)</h2>
          <button class="btn-ghost" onclick="zeigeStartseite()">← Zurück</button>
        </div>
        <div>${zeilen || "<p>Noch keine Einträge in der Rangliste.</p>"}</div>
      </div>`;
  } catch (e) {
    ziel.innerHTML = `
      <div class="card" style="max-width:600px; margin:20px auto; text-align:center; color:#dc2626;">
        <h3>Fehler beim Laden der Rangliste</h3>
        <p>${e.message}</p>
        <button class="btn-ghost" onclick="zeigeStartseite()">← Zurück</button>
      </div>`;
  }
}

// === STERNE & CLOUD-STAND AUTOMATISCH SYNCHRONISIEREN ===
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const profil = ladeMsamProfil();
    const key = profil ? `msam_quizkids_stand_${profil.id}` : "klavierEntdeckerFortschritt";
    const roh = localStorage.getItem(key) || localStorage.getItem("klavierEntdeckerFortschritt");
    if (roh) {
      const daten = JSON.parse(roh);
      const starEl = document.getElementById("star-count");
      if (starEl && typeof daten.sterne === "number") {
        starEl.textContent = String(daten.sterne);
      }
    }
    if (profil) {
      await synchronisiereFortschrittMitCloud();
    }
  } catch (e) {}
});

window.addEventListener("load", () => {
  if (typeof ladeMsamProfil === "function" && ladeMsamProfil()) {
    synchronisiereFortschrittMitCloud();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && typeof ladeMsamProfil === "function" && ladeMsamProfil()) {
    synchronisiereFortschrittMitCloud();
  }
});


