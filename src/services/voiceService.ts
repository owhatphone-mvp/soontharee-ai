let bestThaiVoice: SpeechSynthesisVoice | null = null;
let pendingText: string | null = null;

// Find and cache the best available Thai voice
export const findThaiVoice = (): SpeechSynthesisVoice | null => {
  if (bestThaiVoice) return bestThaiVoice;
  if (!window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  const thaiVoices = voices.filter(
    (v) => v.lang === "th-TH" || v.lang.startsWith("th-") || v.lang === "th"
  );

  if (thaiVoices.length === 0) {
    return null;
  }

  // 1. Prioritize Microsoft Pattara Online (Natural)
  let voice = thaiVoices.find((v) => v.name.toLowerCase().includes("natural"));
  if (voice) {
    bestThaiVoice = voice;
    return voice;
  }

  // 2. Prioritize Microsoft Online / Google th-TH online voices
  voice = thaiVoices.find((v) => v.name.toLowerCase().includes("online"));
  if (voice) {
    bestThaiVoice = voice;
    return voice;
  }

  voice = thaiVoices.find((v) => v.name.toLowerCase().includes("google"));
  if (voice) {
    bestThaiVoice = voice;
    return voice;
  }

  // 3. Fallback to standard Thai voice
  bestThaiVoice = thaiVoices[0];
  return thaiVoices[0];
};

// Listen for browser asynchronous voice loads
if (window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      findThaiVoice();
      if (pendingText) {
        const textToSpeak = pendingText;
        pendingText = null;
        setTimeout(() => {
          speakText(textToSpeak);
        }, 300);
      }
    };
  }
}

export const speakText = (text: string) => {
  const voiceEnabled = localStorage.getItem("elderly_music_voice_guide") === "true";
  if (!voiceEnabled || !window.speechSynthesis) return;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    pendingText = text;
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "th-TH";
    utterance.rate = 0.8; // Clear natural rate
    utterance.pitch = 1.0; 

    const voice = findThaiVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Chrome Speech Queue Bug Fix:
    // If speaking, cancel it and wait 100ms before starting the next utterance.
    // This allows Chrome's audio thread to flush its buffers and avoids stuttering.
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
    } else {
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.error("Speech Synthesis error:", e);
  }
};
