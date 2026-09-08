// Web Audio API Synthesizer for Festive Sounds (Bell, Shankh, Dhol Tasha)

let audioCtx = null;
let bgMusicInterval = null;
let isBgMusicPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Temple Aarti Bell Sound (High pitch brass bell ring)
export function playAartiBell() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    // Bell fundamental & harmonics
    osc.frequency.setValueAtTime(2600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 1.2);

    filter.type = 'highpass';
    filter.frequency.value = 1000;

    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);

    // Second harmonic overlay
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(3900, ctx.currentTime);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start();
    osc2.stop(ctx.currentTime + 0.9);
  } catch (err) {
    console.error('Audio synth bell error:', err);
  }
}

// 2. Shankh (Conch Shell) Sound (Deep swelling brassy resonator)
export function playShankhSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';

    // Pitch swell characteristic of Shankh
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(350, now + 0.8);
    osc.frequency.linearRampToValueAtTime(320, now + 2.5);
    osc.frequency.linearRampToValueAtTime(180, now + 3.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(900, now + 0.8);
    filter.frequency.linearRampToValueAtTime(300, now + 3.2);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.7, now + 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.3);
  } catch (err) {
    console.error('Audio synth shankh error:', err);
  }
}

// 3. Dhol Tasha Rhythmic Loop Synthesizer
export function toggleFestiveBeat(onStateChange) {
  if (isBgMusicPlaying) {
    stopFestiveBeat();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startFestiveBeat();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startFestiveBeat() {
  try {
    const ctx = getAudioContext();
    isBgMusicPlaying = true;
    let step = 0;

    const playStep = () => {
      if (!isBgMusicPlaying) return;

      const now = ctx.currentTime;

      // Heavy Dhol Bass on steps 0, 4, 8, 12
      if (step % 4 === 0) {
        const dholOsc = ctx.createOscillator();
        const dholGain = ctx.createGain();
        dholOsc.type = 'sine';
        dholOsc.frequency.setValueAtTime(120, now);
        dholOsc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

        dholGain.gain.setValueAtTime(0.8, now);
        dholGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        dholOsc.connect(dholGain);
        dholGain.connect(ctx.destination);
        dholOsc.start(now);
        dholOsc.stop(now + 0.35);
      }

      // Tasha Sharp Snare on steps 2, 6, 7, 10, 14, 15
      if ([2, 6, 7, 10, 14, 15].includes(step)) {
        const bufferSize = ctx.sampleRate * 0.08;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1800;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.4, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(now);
      }

      // Aarti Ghanti bell tick on odd steps
      if (step % 2 === 1) {
        playAartiBell();
      }

      step = (step + 1) % 16;
    };

    bgMusicInterval = setInterval(playStep, 160); // ~188 BPM Dhol Tasha tempo
  } catch (err) {
    console.error('Audio synth beat error:', err);
  }
}

export function stopFestiveBeat() {
  isBgMusicPlaying = false;
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}

// 4. Pronunciation Speech Synthesizer
export function speakText(text, lang = 'mr-IN') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Try finding Marathi voice or fallback to Hindi/Indian English
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('mr') || v.lang.includes('hi'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}
