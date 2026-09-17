/**
 * Web Audio API based romantic background music player
 * Plays an elegant romantic wedding melody (Canon in D / Wedding Waltz variation)
 * with gentle acoustic piano-like tones and reverbs.
 */

class RomanticWeddingAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private noteIndex: number = 0;
  private gainNode: GainNode | null = null;

  // Romantic chord progression in D Major / G Major
  private readonly notes: { freq: number; duration: number }[] = [
    // Theme A - Romantic, slow, soft
    { freq: 587.33, duration: 1.2 }, // D5
    { freq: 440.00, duration: 0.6 }, // A4
    { freq: 493.88, duration: 0.6 }, // B4
    { freq: 369.99, duration: 1.2 }, // F#4
    { freq: 392.00, duration: 0.6 }, // G4
    { freq: 293.66, duration: 0.6 }, // D4
    { freq: 392.00, duration: 0.6 }, // G4
    { freq: 440.00, duration: 1.2 }, // A4

    { freq: 587.33, duration: 0.9 }, // D5
    { freq: 659.25, duration: 0.9 }, // E5
    { freq: 739.99, duration: 1.2 }, // F#5
    { freq: 587.33, duration: 0.6 }, // D5
    { freq: 493.88, duration: 0.9 }, // B4
    { freq: 587.33, duration: 0.9 }, // D5
    { freq: 523.25, duration: 0.6 }, // C5
    { freq: 440.00, duration: 1.4 }, // A4

    // Variation
    { freq: 392.00, duration: 0.8 }, // G4
    { freq: 493.88, duration: 0.8 }, // B4
    { freq: 587.33, duration: 1.0 }, // D5
    { freq: 659.25, duration: 0.8 }, // E5
    { freq: 587.33, duration: 1.4 }, // D5
    { freq: 440.00, duration: 1.2 }, // A4
    { freq: 369.99, duration: 1.6 }, // F#4
  ];

  private readonly bassNotes: number[] = [
    146.83, // D3
    110.00, // A2
    123.47, // B2
    92.50,  // F#2
    98.00,  // G2
    73.42,  // D2
    98.00,  // G2
    110.00  // A2
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, isBass = false) {
    if (!this.ctx || !this.gainNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Soft harmonic sound (sine + slight triangle wave warmth)
      osc.type = isBass ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const attack = isBass ? 0.12 : 0.05;
      const decay = duration * 0.9;

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.exponentialRampToValueAtTime(isBass ? 0.25 : 0.28, now + attack);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + decay);
    } catch {
      // Audio node cleanup safeguard
    }
  }

  private step = () => {
    if (!this.isPlaying) return;

    const note = this.notes[this.noteIndex % this.notes.length];
    const bassFreq = this.bassNotes[Math.floor(this.noteIndex / 2) % this.bassNotes.length];

    this.playTone(note.freq, note.duration, false);
    if (this.noteIndex % 2 === 0) {
      this.playTone(bassFreq, note.duration * 2, true);
    }

    this.noteIndex++;
    this.timer = window.setTimeout(this.step, note.duration * 680);
  };

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticWeddingAudio();
