/**
 * SnowyCare - Web Audio API Synthesis Engine
 * Provides crystal chimes, medicine alarms, water bubble effects,
 * and soothing ambient soundscapes for cramp relief without needing any external audio files!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.currentAmbientNode = null;
    this.currentAmbientType = null;
    this.alarmLoopTimer = null;
    this.volume = 0.8;
  }

  // Ensure AudioContext is initialized on user gesture
  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  // Play custom medicine alarm chimes
  playAlarmChime(melody = 'crystal-harp') {
    this.initContext();
    if (!this.ctx) return;

    if (melody === 'crystal-harp') {
      // Angelic ascending arpeggio (C5, E5, G5, B5, D6, C6)
      const notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 0.9, 'sine', 0.25 * this.volume), idx * 160);
      });
    } else if (melody === 'sweet-bell') {
      // Sweet two-tone bell (E5 -> A5)
      this.playTone(659.25, 1.4, 'triangle', 0.3 * this.volume);
      setTimeout(() => {
        this.playTone(880.00, 1.6, 'sine', 0.35 * this.volume);
      }, 220);
    } else if (melody === 'soft-marimba') {
      // Cozy wooden marimba chords
      const chord = [440, 554.37, 659.25];
      chord.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 0.5, 'triangle', 0.3 * this.volume), idx * 120);
      });
    } else {
      // Fairy dust sparkle
      const sparkle = [783.99, 987.77, 1174.66, 1318.51, 1567.98];
      sparkle.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 0.6, 'sine', 0.2 * this.volume), idx * 90);
      });
    }
  }

  // Play a single synthesized tone with gentle envelope
  playTone(frequency, duration = 0.8, type = 'sine', peakGain = 0.3) {
    this.initContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peakGain, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Quick pleasant ping for marking items as taken or completed
  playDing() {
    this.initContext();
    this.playTone(880, 0.3, 'sine', 0.25 * this.volume);
    setTimeout(() => {
      this.playTone(1318.51, 0.6, 'sine', 0.3 * this.volume);
    }, 100);
  }

  // Water bubble drop sound
  playWaterBubble() {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.12);

    gain.gain.setValueAtTime(0.3 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Start continuous loop for medicine alarm modal
  startAlarmLoop(melody = 'crystal-harp') {
    this.stopAlarmLoop();
    this.playAlarmChime(melody);
    this.alarmLoopTimer = setInterval(() => {
      this.playAlarmChime(melody);
    }, 4000);
  }

  stopAlarmLoop() {
    if (this.alarmLoopTimer) {
      clearInterval(this.alarmLoopTimer);
      this.alarmLoopTimer = null;
    }
  }

  // Ambient Relaxing Audio Synthesizers (Snowfall, Warm Cramp Relief, Angelic Bedtime)
  toggleAmbient(type) {
    this.initContext();

    if (this.currentAmbientType === type) {
      this.stopAmbient();
      return false; // Stopped
    }

    this.stopAmbient();
    this.currentAmbientType = type;

    if (type === 'snowfall') {
      this.startPinkNoiseSnowfall();
    } else if (type === 'cramp') {
      this.startWarmSubHarmonics();
    } else if (type === 'harp') {
      this.startDreamyHarpLoop();
    }

    return true; // Playing
  }

  stopAmbient() {
    if (this.currentAmbientNode) {
      if (this.currentAmbientNode.stop) {
        try { this.currentAmbientNode.stop(); } catch(e) {}
      }
      if (this.currentAmbientNode.cleanup) {
        this.currentAmbientNode.cleanup();
      }
      this.currentAmbientNode = null;
    }
    this.currentAmbientType = null;
  }

  // Generative Gentle Pink Noise (Frosty Snowfall)
  startPinkNoiseSnowfall() {
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to make it sound like soft snow falling
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18 * this.volume, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(0);
    this.currentAmbientNode = {
      stop: () => whiteNoise.stop(),
      cleanup: () => {}
    };
  }

  // Warm Sub-Harmonics for Cramp Relief & Calming (528Hz & 432Hz blend)
  startWarmSubHarmonics() {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(136.1, this.ctx.currentTime); // Relaxing Ohm frequency

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(272.2, this.ctx.currentTime);

    gain1.gain.setValueAtTime(0.12 * this.volume, this.ctx.currentTime);
    gain2.gain.setValueAtTime(0.06 * this.volume, this.ctx.currentTime);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.ctx.destination);
    gain2.connect(this.ctx.destination);

    osc1.start();
    osc2.start();

    this.currentAmbientNode = {
      stop: () => {
        osc1.stop();
        osc2.stop();
      },
      cleanup: () => {}
    };
  }

  // Dreamy Angelic Bedtime Harp Pulses
  startDreamyHarpLoop() {
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
    let isRunning = true;

    const playRandomChord = () => {
      if (!isRunning) return;
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.playTone(note, 2.5, 'sine', 0.15 * this.volume);
      setTimeout(playRandomChord, 1800 + Math.random() * 1200);
    };

    playRandomChord();

    this.currentAmbientNode = {
      stop: () => { isRunning = false; },
      cleanup: () => { isRunning = false; }
    };
  }
}

// Global instance
const soundEngine = new SoundEngine();
