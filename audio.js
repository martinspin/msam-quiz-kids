// msam quiz kids: Verzögerungsfreie Steinway-Audio-Engine + zentrale Lautstärke-Steuerung

const AUDIO_PEGEL = {
  klavier: 0.95,       // Spieltöne beim Antippen (klar & deutlich)
  songMp3: 0.32,       // Suno-Song-Tracks in Rhythmus-Spielen (angenehm im Hintergrund)
  sprachMp3: 0.42,     // Sprachausgabe-MP3s (nicht zu laut)
  hintergrund: 0.25,   // Menü-Hintergrundmusik
  fanfare: 0.50        // Abschluss-Fanfare
};

// Passt auch Browser-Vorlesestimme (speechSynthesis) automatisch auf angenehme Lautstärke an
if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speak) {
  const _origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
  window.speechSynthesis.speak = (utterance) => {
    if (utterance) utterance.volume = Math.min(utterance.volume ?? 1, AUDIO_PEGEL.sprachMp3);
    return _origSpeak(utterance);
  };
}

let _msamAudioCtx = null;
const _aktiveQuellen = new Set();

function holeAudioContext() {
  if (!_msamAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    _msamAudioCtx = new AudioCtx();
  }
  if (_msamAudioCtx.state === "suspended") {
    _msamAudioCtx.resume();
  }
  return _msamAudioCtx;
}

const STEINWAY_ANKER = Array.of(
  { midi: 48, dateiname: "Piano.mf.C3.m4a", buffer: null, startOffset: 0 },
  { midi: 54, dateiname: "Piano.mf.Gb3.m4a", buffer: null, startOffset: 0 },
  { midi: 66, dateiname: "Piano.mf.Gb4.m4a", buffer: null, startOffset: 0 },
  { midi: 72, dateiname: "Piano.mf.C5.m4a", buffer: null, startOffset: 0 }
);

function findeKlangStartSekunden(audioBuffer) {
  const daten = audioBuffer.getChannelData(0);
  const schwelle = 0.008;
  for (let i = 0; i < daten.length; i++) {
    if (Math.abs(daten[i]) > schwelle) {
      return Math.max(0, (i / audioBuffer.sampleRate) - 0.005);
    }
  }
  return 0;
}

let _steinwayGeladen = false;

async function ladeAlleSteinwaySamples() {
  if (_steinwayGeladen) return;
  _steinwayGeladen = true;

  const ctx = holeAudioContext();
  await Promise.all(
    STEINWAY_ANKER.map(async (anker) => {
      try {
        const antwort = await fetch(`sounds/${anker.dateiname}`);
        const arrayBuffer = await antwort.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        anker.buffer = audioBuffer;
        anker.startOffset = findeKlangStartSekunden(audioBuffer);
      } catch (e) {
        console.warn("Konnte Steinway-Sample nicht vorladen:", anker.dateiname, e);
      }
    })
  );
}

function findeBestenSteinwayAnker(zielMidi) {
  let bester = STEINWAY_ANKER.at(1);
  let kleinsterAbstand = Infinity;

  STEINWAY_ANKER.forEach((anker) => {
    const abstand = Math.abs(zielMidi - anker.midi);
    if (abstand < kleinsterAbstand) {
      kleinsterAbstand = abstand;
      bester = anker;
    }
  });
  return bester;
}

function spieleMidi(midi, dauerSek = 1.3, lautstaerke = AUDIO_PEGEL.klavier) {
  if (!midi) return;
  const ctx = holeAudioContext();

  if (!_steinwayGeladen) {
    ladeAlleSteinwaySamples();
  }

  const anker = findeBestenSteinwayAnker(midi);
  const halbtoeneDiff = midi - anker.midi;
  const rate = Math.pow(2, halbtoeneDiff / 12);

  if (anker.buffer) {
    const quelle = ctx.createBufferSource();
    quelle.buffer = anker.buffer;
    quelle.playbackRate.value = rate;

    const gain = ctx.createGain();
    const jetzt = ctx.currentTime;
    const gesamtDauer = Math.max(0.08, dauerSek);

    gain.gain.setValueAtTime(lautstaerke, jetzt);
    gain.gain.setValueAtTime(lautstaerke, jetzt + gesamtDauer * 0.65);
    gain.gain.exponentialRampToValueAtTime(0.001, jetzt + gesamtDauer);

    quelle.connect(gain);
    gain.connect(ctx.destination);

    const eintrag = { quelle, gain };
    _aktiveQuellen.add(eintrag);
    quelle.onended = () => _aktiveQuellen.delete(eintrag);

    quelle.start(jetzt, anker.startOffset);
    quelle.stop(jetzt + gesamtDauer + 0.05);
    return;
  }

  const klang = new Audio(`sounds/${anker.dateiname}`);
  klang.volume = Math.min(1, Math.max(0.2, lautstaerke));
  if ("preservesPitch" in klang) klang.preservesPitch = false;
  if ("mozPreservesPitch" in klang) klang.mozPreservesPitch = false;
  if ("webkitPreservesPitch" in klang) klang.webkitPreservesPitch = false;
  klang.playbackRate = rate;
  klang.play().catch(() => {});
}

function stopAlleToene() {
  const ctx = holeAudioContext();
  const jetzt = ctx.currentTime;
  _aktiveQuellen.forEach((eintrag) => {
    try {
      eintrag.gain.gain.cancelScheduledValues(jetzt);
      eintrag.gain.gain.setValueAtTime(Math.max(0.001, eintrag.gain.gain.value), jetzt);
      eintrag.gain.gain.exponentialRampToValueAtTime(0.0001, jetzt + 0.04);
      eintrag.quelle.stop(jetzt + 0.05);
    } catch (e) {}
  });
  _aktiveQuellen.clear();
}
function spieleTon(midi, dauerSek = 1.3, lautstaerke = AUDIO_PEGEL.klavier) {
  spieleMidi(midi, dauerSek, lautstaerke);
}

function spieleFrequenz(freq, dauerSek = 1.1, lautstaerke = AUDIO_PEGEL.klavier) {
  if (!freq) return;
  const midi = Math.round(69 + 12 * Math.log2(freq / 440));
  spieleMidi(midi, dauerSek, lautstaerke);
}

function spieleQuietsch() {
  try {
    const ctx = holeAudioContext();
    const jetzt = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, jetzt);
    osc.frequency.exponentialRampToValueAtTime(1180, jetzt + 0.09);
    osc.frequency.exponentialRampToValueAtTime(640, jetzt + 0.22);

    gain.gain.setValueAtTime(0.001, jetzt);
    gain.gain.exponentialRampToValueAtTime(0.28, jetzt + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0008, jetzt + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(jetzt);
    osc.stop(jetzt + 0.26);
  } catch (e) {}
}

function spieleErfolg() {
  spieleMidi(60, 0.85, 0.9);
  setTimeout(() => spieleMidi(64, 0.85, 0.9), 130);
  setTimeout(() => spieleMidi(67, 1.25, 0.95), 260);
}

function spieleFehler() {
  spieleMidi(55, 0.65, 0.85);
  setTimeout(() => spieleMidi(52, 0.85, 0.85), 170);
}

// Zentraler Player für Suno-Song-MP3s (automatisch ausbalancierte Lautstärke)
let _aktSongMp3 = null;

function ladeSongMp3(pfad, lautstaerke = AUDIO_PEGEL.songMp3) {
  stopSongMp3();
  _aktSongMp3 = new Audio(pfad);
  _aktSongMp3.volume = lautstaerke;
  _aktSongMp3.preload = "auto";
  return _aktSongMp3;
}

function stopSongMp3() {
  if (_aktSongMp3) {
    _aktSongMp3.pause();
    _aktSongMp3.currentTime = 0;
    _aktSongMp3 = null;
  }
}

// Zentraler Player für Sprachausgabe-MP3s (nicht zu laut)
let _aktSprachMp3 = null;

function spieleSprachMp3(pfad, lautstaerke = AUDIO_PEGEL.sprachMp3) {
  if (_aktSprachMp3) {
    _aktSprachMp3.pause();
    _aktSprachMp3.currentTime = 0;
  }
  _aktSprachMp3 = new Audio(pfad);
  _aktSprachMp3.volume = lautstaerke;
  _aktSprachMp3.play().catch(() => {});
  return _aktSprachMp3;
}

const klavierAudio = {
  spieleMidi,
  spieleTon,
  spieleFrequenz,
  spieleQuietsch,
  spieleErfolg,
  spieleFehler,
  stopAlle: stopAlleToene,
  ladeSongMp3,
  stopSongMp3,
  spieleSprachMp3
};

window._istBossChallenge = false;

function starteFanfareUndKonfetti(erzwingen = false) {
  if (!erzwingen && !window._istBossChallenge) return;

  setTimeout(() => {
    try {
      const fanfareAudio = new Audio("sounds/fanfare.mp3");
      fanfareAudio.volume = AUDIO_PEGEL.fanfare;
      const p = fanfareAudio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          const fallback = Array.of(
            { midi: 60, zeit: 0, dauer: 0.6 },
            { midi: 64, zeit: 150, dauer: 0.6 },
            { midi: 67, zeit: 300, dauer: 0.6 },
            { midi: 72, zeit: 460, dauer: 1.3 }
          );
          fallback.forEach((n) => setTimeout(() => spieleMidi(n.midi, n.dauer, 0.9), n.zeit));
        });
      }
    } catch (e) {}

    const farben = Array.of("#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#ec4899");
    for (let i = 0; i < 75; i++) {
      const teil = document.createElement("div");
      teil.style.position = "fixed";
      teil.style.left = Math.random() * 100 + "vw";
      teil.style.top = "-14px";
      teil.style.width = "11px";
      teil.style.height = "15px";
      teil.style.backgroundColor = farben.at(i % farben.length);
      teil.style.borderRadius = "3px";
      teil.style.zIndex = "99999";
      teil.style.pointerEvents = "none";
      teil.style.transform = "translateY(0px) rotate(0deg)";
      teil.style.opacity = "1";
      teil.style.transition = `transform ${1.8 + Math.random() * 1.4}s ease-in, opacity 2.8s ease-out`;
      document.body.appendChild(teil);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          teil.style.transform = `translateY(108vh) rotate(${Math.random() * 720}deg)`;
          teil.style.opacity = "0";
        });
      });
      setTimeout(() => teil.remove(), 3300);
    }
  }, 150);
}

const appMusik = (() => {
  let aktiv = false;
  let imSpiel = false;
  let pfadIndex = 0;
  const pfade = Array.of("sounds/hintergrund.mp3");

  const audio = new Audio();
  audio.loop = true;
  audio.volume = AUDIO_PEGEL.hintergrund;
  audio.preload = "auto";
  audio.src = pfade.at(0);

  audio.addEventListener("error", () => {
    pfadIndex++;
    if (pfadIndex < pfade.length) {
      audio.src = pfade.at(pfadIndex);
      if (aktiv && !imSpiel) audio.play().catch(() => {});
    }
  });

  function aktualisiereButton() {
    const btn = document.getElementById("music-toggle-btn") || document.getElementById("bg-music-btn");
    if (btn) btn.textContent = aktiv ? "🎵 Musik an" : "🔇 Musik aus";
  }

  function versucheStart() {
    if (!aktiv || imSpiel) return;
    const p = audio.play();
    if (p && typeof p.then === "function") {
      p.then(() => aktualisiereButton()).catch(() => {});
    }
  }

  return {
    start() {
      aktiv = true;
      imSpiel = false;
      versucheStart();
      aktualisiereButton();
    },
    pause() {
      imSpiel = true;
      audio.pause();
    },
    stop() {
      imSpiel = true;
      stopSongMp3();
      audio.pause();
      audio.currentTime = 0;
    },
    resumeWennAktiv() {
      imSpiel = false;
      aktualisiereButton();
      if (aktiv && audio.paused) {
        versucheStart();
      }
    },
    toggle() {
      aktiv = !aktiv;
      if (aktiv && !imSpiel) {
        versucheStart();
      } else {
        audio.pause();
      }
      aktualisiereButton();
    }
  };
})();

function toggleBgMusic() {
  appMusik.toggle();
}

window.addEventListener("DOMContentLoaded", () => {
  ladeAlleSteinwaySamples();
});

document.addEventListener("pointerdown", () => {
  holeAudioContext();
  ladeAlleSteinwaySamples();
  appMusik.resumeWennAktiv();
}, { once: true });
