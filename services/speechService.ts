
let voices: SpeechSynthesisVoice[] = [];

// Initialize voices immediately and listen for updates
if (typeof window !== 'undefined' && window.speechSynthesis) {
    const loadVoices = () => {
        voices = window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
}

interface SpeakOptions {
    rate?: number;
    pitch?: number;
    volume?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (e: SpeechSynthesisErrorEvent) => void;
}

// Keep a reference to prevent garbage collection
let currentUtterance: SpeechSynthesisUtterance | null = null;

// NEW: Function to "warm up" the engine on user interaction
export const unlockAudio = () => {
    if (!window.speechSynthesis) return;
    // Play a silent, short sound to 'bless' the audio context on mobile
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    u.rate = 10;
    window.speechSynthesis.speak(u);
};

export const speak = (text: string, langCode: string, options: SpeakOptions = {}) => {
  if (!window.speechSynthesis) return;
  if (!text) return; // Guard against empty text

  // Fix: Chrome sometimes gets stuck in a paused state
  if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
  }
  if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
  }

  const runSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance = utterance; // Keep reference

      // Configuration
      utterance.lang = langCode; 
      utterance.rate = options.rate || 0.85; 
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      // Event Handlers
      if (options.onStart) utterance.onstart = options.onStart;
      
      utterance.onend = () => {
          if (options.onEnd) options.onEnd();
          currentUtterance = null; // Release
      };
      
      utterance.onerror = (e) => {
          // Fix: Ignore 'canceled' or 'interrupted' errors
          if (e.error === 'canceled' || e.error === 'interrupted') {
              return;
          }
          console.error("TTS Error:", e.error);
          if (options.onError) options.onError(e);
          currentUtterance = null; // Release
      };

      // Smart Voice Selection
      if (voices.length > 0) {
          let matchingVoice = voices.find(v => 
            v.lang === langCode && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Enhanced'))
          );

          if (!matchingVoice) {
             matchingVoice = voices.find(v => v.lang === langCode);
          }

          if (!matchingVoice) {
            const shortCode = langCode.split('-')[0];
            matchingVoice = voices.find(v => v.lang.startsWith(shortCode));
          }

          if (matchingVoice) {
            utterance.voice = matchingVoice;
          }
      }

      window.speechSynthesis.speak(utterance);
  };

  // Ensure voices are loaded before speaking
  if (voices.length === 0) {
      // Try to reload
      voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
          // If still empty, wait a bit or just run (browser might handle lang property anyway)
          setTimeout(() => {
              voices = window.speechSynthesis.getVoices();
              runSpeak();
          }, 500);
          return;
      }
  }
  
  runSpeak();
};

export const stopSpeaking = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};
