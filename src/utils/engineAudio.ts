/**
 * Ford Mustang 5.0L Coyote Cross-Plane V8 Exhaust Sound Synthesizer
 * Engineered via Web Audio API to reproduce the iconic American muscle car acoustic profile:
 * - Heavy starter motor compression cranking
 * - Explosive active-valve ignition bark
 * - Deep, guttural cross-plane V8 throttle flare with throaty quad-tip resonance
 * - Deceleration overrun exhaust crackles and deep loping idle burble
 */

class MustangV8SoundSynthesizer {
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

  // Heavy tube saturation distortion curve for American muscle exhaust grit
  private makeMuscleExhaustCurve(amount = 32): Float32Array {
    const k = amount;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 22 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public playEngineStart(onComplete?: () => void): boolean {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      this.stop();
      this.isPlaying = true;

      // Master Output with headroom protection
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.55, now);
      masterGain.connect(ctx.destination);

      // Heavy quad-exhaust pipe distortion stage
      const distortion = ctx.createWaveShaper();
      distortion.curve = this.makeMuscleExhaustCurve(30) as Float32Array<ArrayBuffer>;
      distortion.oversample = '4x';
      distortion.connect(masterGain);

      // Primary Muffler Chamber Resonant Filter (throaty chambered tone)
      const mufflerFilter = ctx.createBiquadFilter();
      mufflerFilter.type = 'lowpass';
      mufflerFilter.Q.setValueAtTime(3.2, now);
      mufflerFilter.connect(distortion);

      // Resonant Exhaust Pipe Peak (gives that hollow 400Hz Coyote throat resonance)
      const pipeResonance = ctx.createBiquadFilter();
      pipeResonance.type = 'peaking';
      pipeResonance.frequency.setValueAtTime(380, now);
      pipeResonance.gain.setValueAtTime(7.0, now);
      pipeResonance.Q.setValueAtTime(2.0, now);
      pipeResonance.connect(mufflerFilter);

      // -------------------------------------------------------------------
      // 1. STARTER MOTOR & HEAVY V8 CYLINDER COMPRESSION (0.0s - 0.45s)
      // -------------------------------------------------------------------
      const starterOsc = ctx.createOscillator();
      const starterGain = ctx.createGain();
      starterOsc.type = 'sawtooth';
      starterOsc.frequency.setValueAtTime(65, now);
      // Muscular compression chugs (slower, heavier than high-rev euro engines)
      starterOsc.frequency.linearRampToValueAtTime(85, now + 0.12);
      starterOsc.frequency.setValueAtTime(58, now + 0.20);
      starterOsc.frequency.linearRampToValueAtTime(95, now + 0.35);

      starterGain.gain.setValueAtTime(0.25, now);
      starterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.44);

      starterOsc.connect(starterGain);
      starterGain.connect(masterGain);
      starterOsc.start(now);
      starterOsc.stop(now + 0.46);

      // High-torque starter motor armature whine
      const starterWhine = ctx.createOscillator();
      const starterWhineGain = ctx.createGain();
      starterWhine.type = 'triangle';
      starterWhine.frequency.setValueAtTime(240, now);
      starterWhine.frequency.linearRampToValueAtTime(380, now + 0.35);
      starterWhineGain.gain.setValueAtTime(0.12, now);
      starterWhineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      starterWhine.connect(starterWhineGain);
      starterWhineGain.connect(masterGain);
      starterWhine.start(now);
      starterWhine.stop(now + 0.45);

      // -------------------------------------------------------------------
      // 2. EXPLOSIVE COYOTE ACTIVE-VALVE IGNITION BARK (0.42s - 0.75s)
      // -------------------------------------------------------------------
      const barkNoise = ctx.createBufferSource();
      const barkLength = Math.floor(ctx.sampleRate * 0.4);
      const barkBuffer = ctx.createBuffer(1, barkLength, ctx.sampleRate);
      const barkData = barkBuffer.getChannelData(0);
      for (let i = 0; i < barkLength; i++) {
        // explosive initial snap followed by raspy throat decay
        barkData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.065));
      }
      barkNoise.buffer = barkBuffer;

      const barkFilter = ctx.createBiquadFilter();
      barkFilter.type = 'bandpass';
      barkFilter.frequency.setValueAtTime(280, now + 0.42);
      barkFilter.Q.setValueAtTime(1.8, now + 0.42);

      const barkGain = ctx.createGain();
      barkGain.gain.setValueAtTime(0.0, now);
      barkGain.gain.setValueAtTime(0.85, now + 0.42);
      barkGain.gain.exponentialRampToValueAtTime(0.01, now + 0.75);

      barkNoise.connect(barkFilter);
      barkFilter.connect(barkGain);
      barkGain.connect(distortion);
      barkNoise.start(now + 0.42);

      // -------------------------------------------------------------------
      // 3. CROSS-PLANE CRANK V8 THROTTLE FLARE & SUB-BASS GROWL (0.45s - 2.5s)
      // -------------------------------------------------------------------
      // Sub-Bass fundamental cylinder thump (42Hz up to 140Hz)
      const subRumble = ctx.createOscillator();
      subRumble.type = 'triangle';

      // Primary Bank Sawtooth (Cylinder Bank 1)
      const bank1Osc = ctx.createOscillator();
      bank1Osc.type = 'sawtooth';

      // Secondary Cross-Plane Bank (Slightly detuned for classic V8 loping lope)
      const bank2Osc = ctx.createOscillator();
      bank2Osc.type = 'sawtooth';

      // Cross-plane LFO pulse to create the authentic American V8 "burble-chop"
      const burbleLfo = ctx.createOscillator();
      const burbleLfoGain = ctx.createGain();
      burbleLfo.type = 'sine';
      burbleLfo.frequency.setValueAtTime(16, now + 0.42); // 16Hz syncopated pulse
      burbleLfo.frequency.linearRampToValueAtTime(28, now + 0.9);
      burbleLfo.frequency.linearRampToValueAtTime(14, now + 2.0);
      burbleLfoGain.gain.setValueAtTime(0.35, now + 0.42);

      // Pitch Envelope: 5.0L Coyote Cold Start Rev Flare
      // 0.42s: Catches with deep 72Hz bark
      // 0.88s: Throttles aggressively up to 240Hz (guttural muscle roar, not high euro buzz)
      // 1.50s: Rolls down with raspy throat through 115Hz
      // 2.20s: Settles into loping 48Hz cross-plane muscle idle
      subRumble.frequency.setValueAtTime(42, now + 0.42);
      subRumble.frequency.exponentialRampToValueAtTime(130, now + 0.88);
      subRumble.frequency.exponentialRampToValueAtTime(68, now + 1.5);
      subRumble.frequency.exponentialRampToValueAtTime(42, now + 2.2);

      bank1Osc.frequency.setValueAtTime(74, now + 0.42);
      bank1Osc.frequency.exponentialRampToValueAtTime(245, now + 0.88);
      bank1Osc.frequency.exponentialRampToValueAtTime(115, now + 1.5);
      bank1Osc.frequency.exponentialRampToValueAtTime(68, now + 2.2);

      bank2Osc.frequency.setValueAtTime(77, now + 0.42); // detuned by +3Hz for beat frequency
      bank2Osc.frequency.exponentialRampToValueAtTime(252, now + 0.88);
      bank2Osc.frequency.exponentialRampToValueAtTime(118, now + 1.5);
      bank2Osc.frequency.exponentialRampToValueAtTime(70, now + 2.2);

      // Lowpass Muffler tracking: expands open during throttle blast, closes to bassy burble
      mufflerFilter.frequency.setValueAtTime(320, now + 0.42);
      mufflerFilter.frequency.exponentialRampToValueAtTime(1800, now + 0.88);
      mufflerFilter.frequency.exponentialRampToValueAtTime(450, now + 1.5);
      mufflerFilter.frequency.exponentialRampToValueAtTime(210, now + 2.3);

      const mainV8Gain = ctx.createGain();
      mainV8Gain.gain.setValueAtTime(0.0, now + 0.4);
      mainV8Gain.gain.linearRampToValueAtTime(0.9, now + 0.55);
      mainV8Gain.gain.setValueAtTime(1.0, now + 0.88);
      mainV8Gain.gain.exponentialRampToValueAtTime(0.45, now + 1.5);
      mainV8Gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      subRumble.connect(pipeResonance);
      bank1Osc.connect(pipeResonance);
      bank2Osc.connect(pipeResonance);

      burbleLfo.connect(burbleLfoGain);
      burbleLfoGain.connect(mainV8Gain.gain);

      pipeResonance.connect(mainV8Gain);
      mainV8Gain.connect(distortion);

      subRumble.start(now + 0.42);
      bank1Osc.start(now + 0.42);
      bank2Osc.start(now + 0.42);
      burbleLfo.start(now + 0.42);

      subRumble.stop(now + 2.55);
      bank1Osc.stop(now + 2.55);
      bank2Osc.stop(now + 2.55);
      burbleLfo.stop(now + 2.55);

      // -------------------------------------------------------------------
      // 4. MUSTANG ACTIVE-EXHAUST OVERRUN CRACKLES (1.35s - 1.95s)
      // -------------------------------------------------------------------
      const popTimes = [1.38, 1.52, 1.68, 1.84];
      popTimes.forEach((popTime, index) => {
        const popOsc = ctx.createOscillator();
        const popGain = ctx.createGain();
        popOsc.type = index % 2 === 0 ? 'triangle' : 'sawtooth';
        popOsc.frequency.setValueAtTime(130 - index * 18, now + popTime);
        popOsc.frequency.exponentialRampToValueAtTime(35, now + popTime + 0.08);

        popGain.gain.setValueAtTime(0.0, now + popTime);
        popGain.gain.setValueAtTime(0.35 - index * 0.05, now + popTime + 0.01);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + popTime + 0.07);

        popOsc.connect(popGain);
        popGain.connect(distortion);
        popOsc.start(now + popTime);
        popOsc.stop(now + popTime + 0.08);
      });

      // Clean completion callback
      const durationMs = 2550;
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

export const engineAudio = new MustangV8SoundSynthesizer();
