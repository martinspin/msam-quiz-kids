// Zeichnet Violin- und Bassschlüssel-Notensysteme inkl. Hilfslinien & Spickzettel
function renderNotenSystem(containerId, config) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const {
    schluessel = "violin", // "violin" oder "bass"
    noten = [],            // [{ stufe: 2, farbe: "#4f46e5", label: "g'" }]
    zeigeSpickzettel = false
  } = config;

  const breite = 640;
  const hoehe = 210;
  const mitteY = 108;
  const linienAbstand = 22;

  const yFuerStufe = (stufe) => {
    const abstandZurMitte = (4 - stufe) * (linienAbstand / 2);
    return mitteY + abstandZurMitte;
  };

  let svg = `<svg viewBox="0 0 ${breite} ${hoehe}" style="width:100%; height:auto; background:#fff; border-radius:16px; border:1.5px solid #e2e8f0; display:block;">`;

  // 5 Notenlinien zeichnen (Stufen 0, 2, 4, 6, 8)
  for (let i = 0; i < 5; i++) {
    const stufe = i * 2;
    const y = yFuerStufe(stufe);
    const hervorheben =
      zeigeSpickzettel &&
      ((schluessel === "violin" && stufe === 2) || (schluessel === "bass" && stufe === 6));
    svg += `<line x1="22" y1="${y}" x2="${breite - 22}" y2="${y}" stroke="${hervorheben ? "#f97316" : "#475569"}" stroke-width="${hervorheben ? 3 : 2}" />`;
  }

  // Spickzettel-Ankerpunkte als Geister-Noten einblenden
  if (zeigeSpickzettel) {
    const anker =
      schluessel === "violin"
        ? [
            { stufe: -2, name: "c'", farbe: "#2563eb", x: 112, hilfe: true },
            { stufe: 2, name: "g'", farbe: "#f97316", x: 145, hilfe: false },
            { stufe: 5, name: "c''", farbe: "#9333ea", x: 178, hilfe: false }
          ]
        : [
            { stufe: 3, name: "c", farbe: "#9333ea", x: 112, hilfe: false },
            { stufe: 6, name: "f", farbe: "#f97316", x: 145, hilfe: false },
            { stufe: 10, name: "c'", farbe: "#2563eb", x: 178, hilfe: true }
          ];

    anker.forEach((a) => {
      const ay = yFuerStufe(a.stufe);
      if (a.hilfe) {
        svg += `<line x1="${a.x - 16}" y1="${ay}" x2="${a.x + 16}" y2="${ay}" stroke="${a.farbe}" stroke-width="2.5" opacity="0.7" />`;
      }
      svg += `<ellipse cx="${a.x}" cy="${ay}" rx="11" ry="8.5" transform="rotate(-14 ${a.x} ${ay})" fill="${a.farbe}" fill-opacity="0.22" stroke="${a.farbe}" stroke-width="1.8" />`;
      svg += `<text x="${a.x}" y="${ay + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="${a.farbe}">${a.name}</text>`;
    });
  }

  // Dein eigenes SVG-Symbol links einbinden (mit Text-Fallback)
  if (schluessel === "violin") {
    svg += `<image href="violin.svg" x="28" y="34" width="54" height="142" />`;
  } else {
    svg += `<image href="bass.svg" x="30" y="56" width="52" height="92" />`;
  }

  // Spiel-Noten zeichnen
  const linksOffset = zeigeSpickzettel ? 220 : 120;
  const verfuegbar = breite - linksOffset - 60;

  noten.forEach((note, idx) => {
    const x =
      noten.length <= 1
        ? (breite + linksOffset) / 2
        : linksOffset + (verfuegbar / (noten.length - 1)) * idx;
    const y = yFuerStufe(note.stufe);

    // Hilfslinie für c' im Violinschlüssel (<= -2) oder c' im Bassschlüssel (>= 10)
    if ((schluessel === "violin" && note.stufe <= -2) || (schluessel === "bass" && note.stufe >= 10)) {
      svg += `<line x1="${x - 22}" y1="${y}" x2="${x + 22}" y2="${y}" stroke="#1e293b" stroke-width="2.5" />`;
    }

    svg += `<ellipse cx="${x}" cy="${y}" rx="14" ry="10.5" transform="rotate(-14 ${x} ${y})" fill="${note.farbe}" />`;

    if (note.label) {
      svg += `<text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">${note.label}</text>`;
    }
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}
