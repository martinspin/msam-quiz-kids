// Gestochen scharfe interaktive Klaviatur (weisse & schwarze Tasten mit deutlichem Leucht-Effekt)

function baueKlaviatur(containerId, optionen = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const startMidi = optionen.startMidi || 48;
  const endMidi = optionen.endMidi || 72;
  const highlightMidis = optionen.highlightMidis || Array.of();
  const zeigeNotennamen = Boolean(optionen.zeigeNotennamen);
  const onKeyClick = optionen.onKeyClick || function () {};

  const schwarzeReste = Array.of(1, 3, 6, 8, 10);
  const notenNamen = Array.of("C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "Ais", "H");

  const weisseMidis = Array.of();
  for (let m = startMidi; m <= endMidi; m++) {
    if (!schwarzeReste.includes(m % 12)) {
      weisseMidis.push(m);
    }
  }

  const anzahlWeiss = weisseMidis.length;
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    position: relative;
    display: flex;
    width: 100%;
    height: 155px;
    background: #1e293b;
    padding: 5px;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.15);
    user-select: none;
    box-sizing: border-box;
  `;

  weisseMidis.forEach((midi, index) => {
    const leuchtet = highlightMidis.includes(midi);
    const taste = document.createElement("div");
    taste.style.cssText = `
      flex: 1;
      height: 100%;
      background: ${leuchtet ? "linear-gradient(180deg, #fde047 0%, #f59e0b 100%)" : "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)"};
      border: ${leuchtet ? "3px solid #ea580c" : "1px solid #94a3b8"};
      border-radius: 0 0 8px 8px;
      margin: 0 1px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 10px;
      box-shadow: ${leuchtet ? "0 0 16px rgba(245, 158, 11, 0.95)" : "none"};
      cursor: pointer;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    `;

    if (zeigeNotennamen) {
      taste.innerHTML = `<span style="font-size:12px; font-weight:800; color:#475569;">${notenNamen.at(midi % 12)}</span>`;
    }

    taste.onclick = () => onKeyClick(midi);
    wrapper.appendChild(taste);

    // Schwarze Taste oberhalb der weissen Tasten
    const naechsteMidi = midi + 1;
    if (naechsteMidi <= endMidi && schwarzeReste.includes(naechsteMidi % 12)) {
      const bLeuchtet = highlightMidis.includes(naechsteMidi);
      const bTaste = document.createElement("div");
      const breiteProzent = 100 / anzahlWeiss;
      const linksProzent = (index + 0.68) * breiteProzent;
      const bBreiteProzent = breiteProzent * 0.62;

      bTaste.style.cssText = `
        position: absolute;
        top: 5px;
        left: calc(${linksProzent}% + 2px);
        width: calc(${bBreiteProzent}% - 4px);
        height: 58%;
        background: ${bLeuchtet ? "linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)" : "linear-gradient(180deg, #334155 0%, #0f172a 100%)"};
        border: ${bLeuchtet ? "3px solid #fde047" : "1px solid #020617"};
        border-radius: 0 0 6px 6px;
        box-shadow: ${bLeuchtet ? "0 0 18px rgba(56, 189, 248, 1)" : "0 3px 6px rgba(0, 0, 0, 0.4)"};
        cursor: pointer;
        z-index: 2;
        box-sizing: border-box;
      `;

      bTaste.onclick = (e) => {
        e.stopPropagation();
        onKeyClick(naechsteMidi);
      };
      wrapper.appendChild(bTaste);
    }
  });

  container.innerHTML = "";
  container.appendChild(wrapper);
}
