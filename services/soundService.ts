
// Simple synthesized sound effects using Web Audio API
// This avoids external file dependencies and loading issues

const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
let ctx: AudioContext | null = null;

const getCtx = () => {
    if (!ctx) {
        ctx = new AudioContextClass();
    }
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    return ctx;
}

export const playClick = () => {
    try {
        const c = getCtx();
        const osc = c.createOscillator();
        const gain = c.createGain();
        
        osc.connect(gain);
        gain.connect(c.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, c.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.1, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
        
        osc.start();
        osc.stop(c.currentTime + 0.1);
    } catch (e) {
        // Ignore audio errors
    }
};

export const playShutter = () => {
    try {
        const c = getCtx();
        const osc = c.createOscillator();
        const gain = c.createGain();
        
        osc.connect(gain);
        gain.connect(c.destination);
        
        // White noise-ish burst for shutter
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, c.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.1, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
        
        osc.start();
        osc.stop(c.currentTime + 0.15);
    } catch (e) {}
};

export const playSuccess = () => {
    try {
        const c = getCtx();
        const osc = c.createOscillator();
        const gain = c.createGain();
        
        osc.connect(gain);
        gain.connect(c.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, c.currentTime);
        osc.frequency.setValueAtTime(554, c.currentTime + 0.1); // C#
        
        gain.gain.setValueAtTime(0.05, c.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, c.currentTime + 0.2);
        gain.gain.linearRampToValueAtTime(0, c.currentTime + 0.4);
        
        osc.start();
        osc.stop(c.currentTime + 0.4);
    } catch (e) {}
};

export const playAnimalSound = (type: string) => {
    try {
        const c = getCtx();
        const now = c.currentTime;

        // Helper to create simple tone
        const playTone = (freq: number, type: OscillatorType, duration: number, vol: number = 0.2) => {
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.connect(gain);
            gain.connect(c.destination);
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(vol, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            osc.start(now);
            osc.stop(now + duration);
        };

        // Customize sound based on animal type
        switch (type) {
            case 'Dog':
                // Sharp Bark
                const dOsc = c.createOscillator();
                const dGain = c.createGain();
                dOsc.connect(dGain);
                dGain.connect(c.destination);
                
                dOsc.type = 'sawtooth';
                dOsc.frequency.setValueAtTime(400, now);
                dOsc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
                
                dGain.gain.setValueAtTime(0.2, now);
                dGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                
                dOsc.start(now);
                dOsc.stop(now + 0.15);
                break;

            case 'Cow':
            case 'Ox':
            case 'Buffalo':
                // Low Moo
                const mOsc = c.createOscillator();
                const mGain = c.createGain();
                mOsc.connect(mGain);
                mGain.connect(c.destination);
                
                mOsc.type = 'triangle';
                mOsc.frequency.setValueAtTime(140, now);
                mOsc.frequency.linearRampToValueAtTime(110, now + 0.8);
                
                mGain.gain.setValueAtTime(0, now);
                mGain.gain.linearRampToValueAtTime(0.2, now + 0.2);
                mGain.gain.linearRampToValueAtTime(0.2, now + 0.5);
                mGain.gain.linearRampToValueAtTime(0, now + 0.8);
                
                mOsc.start(now);
                mOsc.stop(now + 0.8);
                break;

            case 'Goat':
            case 'Sheep':
                // Bleat (Vibrato)
                const gOsc = c.createOscillator();
                const gGain = c.createGain();
                gOsc.connect(gGain);
                gGain.connect(c.destination);
                
                // Carrier
                gOsc.type = 'sawtooth';
                gOsc.frequency.setValueAtTime(350, now);

                // Simple Amplitude Modulation (Tremolo) via gain automation manually for simplicity
                // Or just a rough texture
                gGain.gain.setValueAtTime(0.15, now);
                gGain.gain.setValueAtTime(0.05, now + 0.05);
                gGain.gain.setValueAtTime(0.15, now + 0.1);
                gGain.gain.setValueAtTime(0.05, now + 0.15);
                gGain.gain.setValueAtTime(0.15, now + 0.2);
                gGain.gain.linearRampToValueAtTime(0, now + 0.4);
                
                gOsc.start(now);
                gOsc.stop(now + 0.4);
                break;
                
            default:
                playClick();
                break;
        }

    } catch (e) {
        // Fallback
        playClick();
    }
};
