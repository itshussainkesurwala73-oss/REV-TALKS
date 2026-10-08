/**
 * High-precision Web Audio API Engine Start & Throttle Rev Synthesizer
 * Generates an authentic mechanical starter crank, combustion ignition crack,
 * and high-octane multi-cylinder exhaust rev crescendo.
 */

class EngineSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentStopCallbacks: (() => void)[] = [];

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Distortion curve for throat exhaust grit
  private makeDistortionCurve(amount = 25): Float32Array {
    const k = amount;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public playEngineStart(onComplete?: () => void): boolean {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      this.stop(); // Stop any previous playback
      this.isPlaying = true;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.45, now);
      masterGain.connect(ctx.destination);

      // Waveshaper for exhaust overdrive
      const distortion = ctx.createWaveShaper();
      distortion.curve = this.makeDistortionCurve(18) as Float32Array<ArrayBuffer>;
      distortion.oversample = '4x';
      distortion.connect(masterGain);

      // Dynamic Lowpass Filter (exhaust tone)
      const exhaustFilter = ctx.createBiquadFilter();
      exhaustFilter.type = 'lowpass';
      exhaustFilter.Q.setValueAtTime(2.2, now);
      exhaustFilter.connect(distortion);

      // -------------------------------------------------------------
      // 1. STARTER MOTOR CRANK (0.0s - 0.4s)
      // -------------------------------------------------------------
      const starterOsc = ctx.createOscillator();
      const starterGain = ctx.createGain();
      starterOsc.type = 'sawtooth';
      starterOsc.frequency.setValueAtTime(80, now);
      starterOsc.frequency.linearRampToValueAtTime(110, now + 0.15);
      starterOsc.frequency.setValueAtTime(75, now + 0.22);
      starterOsc.frequency.linearRampToValueAtTime(120, now + 0.38);

      starterGain.gain.setValueAtTime(0.2, now);
      starterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      starterOsc.connect(starterGain);
      starterGain.connect(masterGain);
      starterOsc.start(now);
      starterOsc.stop(now + 0.45);

      // Starter clicks (rapid solenoid chatter)
      const bufferSize = ctx.sampleRate * 0.4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.sin(i * 0.08);
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(450, now);
      noiseFilter.Q.setValueAtTime(3.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start(now);

      // -------------------------------------------------------------
      // 2. IGNITION CATCH & COMBUSTION BURST (0.4s - 0.7s)
      // -------------------------------------------------------------
      const catchNoise = ctx.createBufferSource();
      const catchBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.3), ctx.sampleRate);
      const catchData = catchBuffer.getChannelData(0);
      for (let i = 0; i < catchData.length; i++) {
        catchData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
      }
      catchNoise.buffer = catchBuffer;
      const catchFilter = ctx.createBiquadFilter();
      catchFilter.type = 'lowpass';
      catchFilter.frequency.setValueAtTime(320, now + 0.4);

      const catchGain = ctx.createGain();
      catchGain.gain.setValueAtTime(0.0, now);
      catchGain.gain.setValueAtTime(0.6, now + 0.4);
      catchGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

      catchNoise.connect(catchFilter);
      catchFilter.connect(catchGain);
      catchGain.connect(masterGain);
      catchNoise.start(now + 0.4);

      // -------------------------------------------------------------
      // 3. THROTTLE REV BLIP & EXHAUST CRESENDO (0.45s - 2.2s)
      // -------------------------------------------------------------
      // Primary Cylinder Osc (Sawtooth fundamental)
      const revOsc1 = ctx.createOscillator();
      revOsc1.type = 'sawtooth';
      
      // Secondary Harmonic Osc (Cylinder pair)
      const revOsc2 = ctx.createOscillator();
      revOsc2.type = 'sawtooth';

      // Sub-bass exhaust thump
      const subOsc = ctx.createOscillator();
      subOsc.type = 'triangle';

      // Frequency Ramp Envelope: Idle -> Rev Peak -> Settle
      const revGain = ctx.createGain();

      // Pitch curves
      // 0.45s: Catch at 110Hz
      // 0.85s: Rev blip up to 340Hz (simulating 7,500 RPM burst)
      // 1.40s: Drop back down to 140Hz
      // 2.00s: Settle to idle rumble at 65Hz
      revOsc1.frequency.setValueAtTime(90, now + 0.4);
      revOsc1.frequency.exponentialRampToValueAtTime(360, now + 0.85);
      revOsc1.frequency.exponentialRampToValueAtTime(140, now + 1.45);
      revOsc1.frequency.exponentialRampToValueAtTime(70, now + 2.0);

      revOsc2.frequency.setValueAtTime(180, now + 0.4);
      revOsc2.frequency.exponentialRampToValueAtTime(720, now + 0.85);
      revOsc2.frequency.exponentialRampToValueAtTime(280, now + 1.45);
      revOsc2.frequency.exponentialRampToValueAtTime(140, now + 2.0);

      subOsc.frequency.setValueAtTime(45, now + 0.4);
      subOsc.frequency.exponentialRampToValueAtTime(180, now + 0.85);
      subOsc.frequency.exponentialRampToValueAtTime(70, now + 1.45);
      subOsc.frequency.exponentialRampToValueAtTime(35, now + 2.0);

      // Filter cutoff follows revs
      exhaustFilter.frequency.setValueAtTime(280, now + 0.4);
      exhaustFilter.frequency.exponentialRampToValueAtTime(2600, now + 0.85);
      exhaustFilter.frequency.exponentialRampToValueAtTime(650, now + 1.45);
      exhaustFilter.frequency.exponentialRampToValueAtTime(250, now + 2.0);

      // Volume envelope
      revGain.gain.setValueAtTime(0.0, now + 0.38);
      revGain.gain.linearRampToValueAtTime(0.7, now + 0.55);
      revGain.gain.setValueAtTime(0.85, now + 0.85);
      revGain.gain.exponentialRampToValueAtTime(0.4, now + 1.45);
      revGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      revOsc1.connect(exhaustFilter);
      revOsc2.connect(exhaustFilter);
      subOsc.connect(exhaustFilter);
      exhaustFilter.connect(revGain);
      revGain.connect(masterGain);

      revOsc1.start(now + 0.4);
      revOsc2.start(now + 0.4);
      subOsc.start(now + 0.4);

      revOsc1.stop(now + 2.45);
      revOsc2.stop(now + 2.45);
      subOsc.stop(now + 2.45);

      // -------------------------------------------------------------
      // 4. OVERRUN EXHAUST POP (1.3s - 1.8s)
      // -------------------------------------------------------------
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(110, now + 1.35);
      popOsc.frequency.exponentialRampToValueAtTime(40, now + 1.5);

      popGain.gain.setValueAtTime(0.0, now + 1.3);
      popGain.gain.setValueAtTime(0.25, now + 1.35);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 1.55);

      popOsc.connect(popGain);
      popGain.connect(masterGain);
      popOsc.start(now + 1.35);
      popOsc.stop(now + 1.6);

      // Clean completion callback
      const durationMs = 2450;
      const timeoutId = window.setTimeout(() => {
        this.isPlaying = false;
        if (onComplete) onComplete();
      }, durationMs);

      this.currentStopCallbacks.push(() => {
        window.clearTimeout(timeoutId);
        try {
          masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        } catch {
          // ignore
        }
      });

      return true;
    } catch (e) {
      console.warn('Audio playback not supported or blocked:', e);
      this.isPlaying = false;
      if (onComplete) onComplete();
      return false;
    }
  }

  public stop(): void {
    this.currentStopCallbacks.forEach((cb) => cb());
    this.currentStopCallbacks = [];
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const engineAudio = new EngineSoundSynthesizer();
