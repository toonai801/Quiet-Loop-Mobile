const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, Number(value) || 0));

export class QuietAudio {
  constructor() {
    this.context = null;
    this.master = null;
    this.limiter = null;
    this.layers = new Map();
    this.playing = false;
    this.masterVolume = 0.76;
    this.noiseBuffers = new Map();
  }

  async ensure() {
    if (!this.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) throw new Error("Web Audio is not available in this browser.");
      this.context = new AudioContextClass({latencyHint:"playback"});
      this.master = this.context.createGain();
      this.master.gain.value = 0;
      this.limiter = this.context.createDynamicsCompressor();
      this.limiter.threshold.value = -8;
      this.limiter.knee.value = 6;
      this.limiter.ratio.value = 4;
      this.limiter.attack.value = 0.006;
      this.limiter.release.value = 0.24;
      this.master.connect(this.limiter);
      this.limiter.connect(this.context.destination);
    }
    if (this.context.state !== "running") await this.context.resume();
    return this.context;
  }

  async add(sound, volume = 0.35, pan = 0, frequencySettings = {}) {
    await this.ensure();
    if (this.layers.has(sound.id)) return this.layers.get(sound.id);
    const ctx = this.context;
    const inputGain = ctx.createGain();
    const fader = ctx.createGain();
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : ctx.createGain();
    inputGain.gain.value = 1;
    fader.gain.value = 0;
    if (panner.pan) panner.pan.value = sound.type === "binaural" ? 0 : clamp(pan, -1, 1);
    inputGain.connect(fader);
    if (sound.type === "binaural") fader.connect(this.master);
    else fader.connect(panner);
    panner.connect(this.master);
    const layer = {sound, volume:clamp(volume), pan:sound.type === "binaural" ? 0 : clamp(pan,-1,1), inputGain, fader, panner, element:null, source:null, filter:null, toneNodes:[], ...(sound.type === "binaural" ? {toneBase:clamp(frequencySettings.toneBase ?? 174,100,960),beatHz:clamp(frequencySettings.beatHz ?? 2,.5,40)} : {})};
    if (sound.audio) {
      const element = new Audio(sound.audio);
      element.preload = "auto";
      element.loop = true;
      element.playsInline = true;
      element.crossOrigin = "anonymous";
      layer.element = element;
      layer.source = ctx.createMediaElementSource(element);
      layer.source.connect(inputGain);
    } else if (sound.type === "tone" || sound.type === "drone" || sound.type === "binaural") {
      this.createTone(layer);
    } else {
      this.createNoise(layer);
    }
    this.layers.set(sound.id, layer);
    this.setVolume(sound.id, volume, 0.18);
    this.setPan(sound.id, pan);
    if (this.playing) await this.startLayer(layer);
    return layer;
  }

  createTone(layer) {
    const ctx = this.context;
    const merger = ctx.createChannelMerger(2);
    const left = ctx.createOscillator();
    const right = ctx.createOscillator();
    const leftGain = ctx.createGain();
    const rightGain = ctx.createGain();
    const base = layer.toneBase ?? 174;
    const beatHz = layer.beatHz ?? 2;
    left.type = "sine";
    right.type = "sine";
    left.frequency.value = base;
    right.frequency.value = base + beatHz;
    leftGain.gain.value = 0.24;
    rightGain.gain.value = 0.24;
    left.connect(leftGain).connect(merger, 0, 0);
    right.connect(rightGain).connect(merger, 0, 1);
    merger.connect(layer.inputGain);
    layer.toneNodes = [left,right];
    layer.toneMerger = merger;
    layer.toneBase = base;
    layer.beatHz = beatHz;
    if (layer.sound.type === "drone") {
      const low = ctx.createOscillator();
      const lowGain = ctx.createGain();
      low.type = "triangle";
      low.frequency.value = 110;
      lowGain.gain.value = 0.09;
      low.connect(lowGain).connect(layer.inputGain);
      layer.toneNodes.push(low);
    }
  }

  createNoise(layer) {
    const ctx = this.context;
    const type = layer.sound.type || "pink";
    let buffer = this.noiseBuffers.get(type);
    if (!buffer) {
      buffer = this.makeNoiseBuffer(type);
      this.noiseBuffers.set(type, buffer);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    let next = source;
    const profile = this.noiseProfile(type);
    if (profile.hum) {
      const osc = ctx.createOscillator();
      const humGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = profile.hum;
      humGain.gain.value = 0.035;
      osc.connect(humGain).connect(layer.inputGain);
      layer.toneNodes.push(osc);
      layer.humGain = humGain;
    }
    if (profile.filter) {
      const filter = ctx.createBiquadFilter();
      filter.type = profile.filter;
      filter.frequency.value = profile.frequency;
      filter.Q.value = profile.q || 0.7;
      source.connect(filter);
      next = filter;
      layer.filter = filter;
    }
    next.connect(layer.inputGain);
    layer.source = source;
    layer.noiseType = type;
  }

  makeNoiseBuffer(type) {
    const ctx = this.context;
    const sampleRate = Math.min(ctx.sampleRate, 24000);
    const length = sampleRate * 7;
    const buffer = ctx.createBuffer(2, length, sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const out = buffer.getChannelData(ch);
      let brown = 0, last = 0;
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for (let i=0;i<length;i++) {
        const white = Math.random()*2-1;
        let value = white;
        if (type === "brown" || ["rumble","airwash"].includes(type)) {
          brown = (brown + 0.02*white) / 1.02;
          value = brown * 3.5;
        } else if (type === "pink" || ["fan","boxfan","purifier","vent","hvac","airplane","train","car","highway","ship","motor","tape","vinyl","radio","shush"].includes(type)) {
          b0=0.99886*b0+white*0.0555179; b1=0.99332*b1+white*0.0750759;
          b2=0.969*b2+white*0.153852; b3=0.8665*b3+white*0.3104856;
          b4=0.55*b4+white*0.5329522; b5=-0.7616*b5-white*0.016898;
          value=(b0+b1+b2+b3+b4+b5+b6+white*0.5362)*0.11;
          b6=white*0.115926;
        } else if (type === "blue" || type === "violet") {
          value = white - last;
          last = white;
          value *= type === "blue" ? 0.55 : 0.35;
        } else if (type === "grey") {
          b0=0.98*b0+0.02*white;
          value=(white*0.6+b0*0.4)*0.82;
        }
        out[i] = clamp(value, -0.9, 0.9);
      }
    }
    return buffer;
  }

  noiseProfile(type) {
    const profiles = {
      brown:{filter:"lowpass",frequency:470}, pink:{filter:"lowpass",frequency:2800},
      white:{}, blue:{filter:"highpass",frequency:1100}, violet:{filter:"highpass",frequency:2800},
      grey:{filter:"bandpass",frequency:1200,q:0.45}, fan:{filter:"lowpass",frequency:750,hum:60},
      boxfan:{filter:"lowpass",frequency:1100,hum:60}, purifier:{filter:"lowpass",frequency:1600},
      vent:{filter:"lowpass",frequency:600,hum:50}, hvac:{filter:"lowpass",frequency:480,hum:60},
      airplane:{filter:"lowpass",frequency:420,hum:92}, train:{filter:"lowpass",frequency:720,hum:48},
      car:{filter:"lowpass",frequency:800,hum:72}, highway:{filter:"lowpass",frequency:390,hum:55},
      ship:{filter:"lowpass",frequency:310,hum:43}, motor:{filter:"lowpass",frequency:900,hum:57},
      tape:{filter:"highpass",frequency:2400}, vinyl:{filter:"highpass",frequency:3300},
      radio:{filter:"bandpass",frequency:1450,q:0.9}, rumble:{filter:"lowpass",frequency:170,hum:38},
      shush:{filter:"bandpass",frequency:1000,q:0.4}, airwash:{filter:"lowpass",frequency:220,hum:43}
    };
    return profiles[type] || {};
  }

  async startLayer(layer) {
    if (layer.element) {
      await layer.element.play();
    } else {
      for (const node of layer.toneNodes) {
        try { node.start(); } catch {}
      }
      if (layer.source && !layer.toneNodes.includes(layer.source)) {
        try { layer.source.start(); } catch {}
      }
    }
  }

  async play() {
    await this.ensure();
    if (this.playing) return;
    this.playing = true;
    try {
      await Promise.all(Array.from(this.layers.values(), (layer) => this.startLayer(layer)));
    } catch (error) {
      this.playing = false;
      for (const layer of this.layers.values()) layer.element?.pause();
      throw error;
    }
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setTargetAtTime(this.masterVolume, this.context.currentTime, 0.12);
  }

  async pause() {
    if (!this.context || !this.playing) return;
    this.playing = false;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0, now, 0.06);
    for (const layer of this.layers.values()) {
      if (layer.element) {
        layer.element.pause();
      } else {
        for (const node of layer.toneNodes) { try { node.stop(); } catch {} }
        if (layer.source && !layer.toneNodes.includes(layer.source)) { try { layer.source.stop(); } catch {} }
        layer.source = null;
        layer.toneNodes = [];
        layer.inputGain.disconnect();
        layer.inputGain = this.context.createGain();
        layer.inputGain.connect(layer.fader);
        if (layer.sound.type === "tone" || layer.sound.type === "drone" || layer.sound.type === "binaural") this.createTone(layer);
        else this.createNoise(layer);
      }
    }
  }

  async togglePlayback() {
    if (this.playing) await this.pause();
    else await this.play();
    return this.playing;
  }

  setVolume(id, value, ramp = 0.08) {
    const layer = this.layers.get(id);
    if (!layer) return;
    layer.volume = clamp(value);
    if (this.context) {
      const gain = layer.fader.gain, now = this.context.currentTime;
      gain.cancelScheduledValues(now);
      gain.setTargetAtTime(layer.volume, now, Math.max(0.01, ramp));
    }
  }

  setBinauralBeat(id, value) {
    const layer = this.layers.get(id);
    if (!layer || layer.sound.type !== "binaural") return 2;
    layer.beatHz = clamp(value, .5, 40);
    const right = layer.toneNodes[1];
    if (right && this.context) {
      right.frequency.setTargetAtTime(layer.toneBase + layer.beatHz, this.context.currentTime, 0.04);
    }
    return layer.beatHz;
  }

  setBinauralCarrier(id, value) {
    const layer = this.layers.get(id);
    if (!layer || layer.sound.type !== "binaural") return 174;
    layer.toneBase = clamp(value, 100, 960);
    const left = layer.toneNodes[0];
    const right = layer.toneNodes[1];
    if (this.context) {
      const now = this.context.currentTime;
      left?.frequency.setTargetAtTime(layer.toneBase, now, 0.04);
      right?.frequency.setTargetAtTime(layer.toneBase + layer.beatHz, now, 0.04);
    }
    return layer.toneBase;
  }

  setPan(id, value) {
    const layer = this.layers.get(id);
    if (!layer) return;
    if (layer.sound.type === "binaural") { layer.pan = 0; return; }
    layer.pan = clamp(value,-1,1);
    if (layer.panner.pan) layer.panner.pan.setTargetAtTime(layer.pan,this.context.currentTime,0.04);
  }

  setMaster(value) {
    this.masterVolume = clamp(value);
    if (this.context && this.playing) this.master.gain.setTargetAtTime(this.masterVolume,this.context.currentTime,0.05);
  }

  async remove(id, fade = 0.25) {
    const layer = this.layers.get(id);
    if (!layer) return;
    if (this.context) {
      const now=this.context.currentTime;
      layer.fader.gain.cancelScheduledValues(now);
      layer.fader.gain.setValueAtTime(layer.fader.gain.value,now);
      layer.fader.gain.linearRampToValueAtTime(0,now+Math.max(0.01,fade));
    }
    await new Promise((resolve) => setTimeout(resolve,fade*1000));
    if (layer.element) { layer.element.pause(); layer.element.removeAttribute("src"); layer.element.load(); }
    else {
      for (const node of layer.toneNodes) { try { node.stop(); } catch {} }
      try { layer.source?.stop(); } catch {}
    }
    layer.inputGain.disconnect(); layer.fader.disconnect(); layer.panner.disconnect();
    this.layers.delete(id);
  }

  async stopAll(fade = 1.25) {
    const ids = Array.from(this.layers.keys());
    await Promise.all(ids.map((id) => this.remove(id,fade)));
    this.playing = false;
    if (this.master && this.context) this.master.gain.setTargetAtTime(0,this.context.currentTime,0.04);
  }
}
