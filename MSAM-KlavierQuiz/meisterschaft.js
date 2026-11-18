// msam quiz kids: Schüler-Login, Cloud-Datenbank & Lehrpersonen-Cockpit

const MSAM_PROTO = "https" + "://";
const MSAM_HOST = "firestore" + ".googleapis.com";
const MSAM_PROJECT_ID = "msam-quiz-kids";
const MSAM_FIRESTORE_URL = `${MSAM_PROTO}${MSAM_HOST}/v1/projects/${MSAM_PROJECT_ID}/databases/(default)/documents/msam_schueler`;
async function msamSafeFirestorePatch(profil, body) {
  const docUrl = `${MSAM_FIRESTORE_URL}/${encodeURIComponent(profil.id)}`;

  try {
    // 1. Vor dem Überschreiben immer zuerst den aktuellen Stand aus Firebase abrufen
    const getRes = await fetch(docUrl);
    if (getRes.ok && body && body.fields) {
      const cloudJson = await getRes.json();
      const cf = cloudJson.fields || {};

      // Höhere Sterne aus Cloud oder lokal behalten (niemals zurück auf 0 setzen!)
      const cloudSterne = Number(cf.sterne?.integerValue || cf.sterne?.doubleValue || 0);
      const lokalSterne = Number(body.fields.sterne?.integerValue || body.fields.sterne?.doubleValue || 0);
      const maxSterne = Math.max(cloudSterne, lokalSterne);

      if (body.fields.sterne) {
        body.fields.sterne = { integerValue: String(maxSterne) };
      }
      if (typeof profil.sterne === "number") {
        profil.sterne = maxSterne;
      }

      // Gelöste Aufgaben (erledigt / abgeschlossen) aus Cloud + lokal vereinigen
      const listeFeld = body.fields.erledigt ? "erledigt" : (body.fields.abgeschlossen ? "abgeschlossen" : null);
      if (listeFeld && cf[listeFeld]?.arrayValue?.values) {
        const cloudListe = cf[listeFeld].arrayValue.values.map((v) => v.stringValue).filter(Boolean);
        const lokalListe = (body.fields[listeFeld]?.arrayValue?.values || []).map((v) => v.stringValue).filter(Boolean);
        const vereint = Array.from(new Set([...cloudListe, ...lokalListe]));

        body.fields[listeFeld] = {
          arrayValue: {
            values: vereint.map((id) => ({ stringValue: id }))
          }
        };
        if (Array.isArray(profil[listeFeld])) {
          profil[listeFeld] = vereint;
        }
      }
    }
  } catch (e) {
    console.warn("Firebase Vorab-Check übersprungen:", e);
  }

  // 2. Erst jetzt sicher mit den zusammengeführten Werten speichern
  return fetch(docUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}


const MSAM_LEHRPERSONEN = Array.of(
  { id: "lp_andriescu", name: "Emanuel Andriescu", pin: "2101" },
  { id: "lp_boelingen", name: "Stéphane Bölingen", pin: "2102" },
  { id: "lp_buechel", name: "Eliane Büchel", pin: "2103" },
  { id: "lp_casareale", name: "Mathieu Casareale", pin: "2104" },
  { id: "lp_cerpelloni", name: "Enrico Cerpelloni", pin: "2105" },
  { id: "lp_engel", name: "Manuela Engel", pin: "2106" },
  { id: "lp_fleten", name: "Sarah Fleten", pin: "2107" },
  { id: "lp_fronczak", name: "Anna Fronczak", pin: "2108" },
  { id: "lp_graf", name: "Albert Graf", pin: "2109" },
  { id: "lp_haag", name: "Hiroko Haag", pin: "2110" },
  { id: "lp_heim", name: "Alessia Heim", pin: "2111" },
  { id: "lp_horvath", name: "Kinga Horvath", pin: "2112" },
  { id: "lp_kessler", name: "Patrick Kessler", pin: "2113" },
  { id: "lp_knight", name: "Knight Eun-Joo", pin: "2114" },
  { id: "lp_knobel", name: "Jasmin Knobel", pin: "2115" },
  { id: "lp_krueger", name: "Olaf Krüger", pin: "2116" },
  { id: "lp_kueng", name: "Clarigna Küng", pin: "2117" },
  { id: "lp_loewe", name: "Livia Loewe", pin: "2118" },
  { id: "lp_magsam", name: "Dieter Magsam", pin: "2119" },
  { id: "lp_mantovani", name: "Claudia Mantovani", pin: "2120" },
  { id: "lp_pabst", name: "Thorsten Pabst", pin: "2121" },
  { id: "lp_popp", name: "Adrian Popp", pin: "2122" },
  { id: "lp_raymann", name: "Franziska Raymann", pin: "2123" },
  { id: "lp_riegg", name: "Sissi Riegg", pin: "2124" },
  { id: "lp_sailer", name: "Frida Sailer", pin: "2125" },
  { id: "lp_salvatti", name: "Milena Salvatti", pin: "2126" },
  { id: "lp_samoriezov", name: "Oleksii Samoriezov", pin: "2127" },
  { id: "lp_schwedes", name: "Rüdiger Schwedes", pin: "2128" },
  { id: "lp_senn", name: "Martin Senn", pin: "1111" },
  { id: "lp_spaltenstein", name: "Aline Spaltenstein", pin: "2130" },
  { id: "lp_stefanov", name: "Krasimir Stefanov", pin: "2131" },
  { id: "lp_stefanova", name: "Mihaela Stefanova", pin: "2132" },
  { id: "lp_ternova", name: "Alla Ternova", pin: "2133" },
  { id: "lp_tschopp_d", name: "Dionys Tschopp", pin: "2134" },
  { id: "lp_tschopp_l", name: "Linus Tschopp", pin: "2135" },
  { id: "lp_wahl", name: "Wolfgang Wahl", pin: "2136" },
  { id: "lp_weber", name: "Sari Weber", pin: "2137" },
  { id: "lp_weiss", name: "Regula Weiss", pin: "2138" },
  { id: "lp_weniger", name: "Daniel Weniger", pin: "2139" },
  { id: "lp_weyrich", name: "Ute Weyrich", pin: "2140" }
);

function ladeMsamProfil() {
  try {
    const roh = localStorage.getItem("msamSchuelerProfil");
    if (roh) return JSON.parse(roh);
  } catch (e) {}
  return null;
}

function speichereMsamProfil(profil) {
  try {
    localStorage.setItem("msamSchuelerProfil", JSON.stringify(profil));
  } catch (e) {}
}

async function synchronisiereFortschrittMitCloud() {
  const profil = ladeMsamProfil();
  if (!profil) return;
  const daten = ladeFortschritt();
  const body = {
    fields: {
      vorname: { stringValue: profil.vorname },
      nachname: { stringValue: profil.nachname },
      lehrpersonId: { stringValue: profil.lehrpersonId },
      lehrpersonName: { stringValue: profil.lehrpersonName },
      sterne: { integerValue: String(daten.sterne || 0) },
      erledigtAnzahl: { integerValue: String(daten.erledigt.length || 0) },
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
