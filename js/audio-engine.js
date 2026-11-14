/**
 * Universal American English Audio Engine (Cross-Device: Mobile, Tablet, Desktop)
 * Optimized for natural, fluid, professional US English pronunciation.
 */
(function () {
  let audioUnlocked = false;
  let activeUtterance = null;
  let fallbackAudioEl = null;
  let chunkQueue = [];
  let isCancelled = false;
  let chromeKeepAliveTimer = null;
  let selectedVoiceName = localStorage.getItem('tar_preferred_voice') || '';
  let globalRate = parseFloat(localStorage.getItem('tar_preferred_rate') || '0.96');

  const TIER_1_NEURAL = [
    "Microsoft Ava Online (Natural) - English (United States)",
    "Microsoft Andrew Online (Natural) - English (United States)",
    "Microsoft Jenny Online (Natural) - English (United States)",
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Guy Online (Natural) - English (United States)",
    "Microsoft Christopher Online (Natural) - English (United States)",
    "Microsoft Eric Online (Natural) - English (United States)",
    "Microsoft Michelle Online (Natural) - English (United States)",
    "Microsoft Steffan Online (Natural) - English (United States)",
    "Microsoft Brian Online (Natural) - English (United States)",
    "Microsoft Emma Online (Natural) - English (United States)",
    "Google US English",
    "Google English (United States)",
    "Microsoft JennyNeural",
    "Microsoft AriaNeural",
    "Microsoft GuyNeural",
    "Microsoft ChristopherNeural"
  ];

  const TIER_2_APPLE_AND_DESKTOP = [
    "Samantha (Enhanced)",
    "Samantha (Premium)",
    "Ava (Premium)",
    "Ava (Enhanced)",
    "Allison (Enhanced)",
    "Allison (Premium)",
    "Tom (Enhanced)",
    "Tom (Premium)",
    "Nicky (Enhanced)",
    "Samantha",
    "Ava",
    "Allison",
    "Alex",
    "Nicky",
    "Tom",
    "Evan",
    "Microsoft Zira - English (United States)",
    "Microsoft David - English (United States)",
    "Microsoft Mark - English (United States)"
  ];

  const TIER_3_ANDROID = [
    "en-us-x-sfg-network",
    "en-us-x-tpf-network",
    "en-us-x-iom-network",
    "en-us-x-iol-network",
    "en-us-x-sfg-local",
    "en-us-x-tpf-local",
    "en-US-language"
  ];

  function isUsEnglishLang(lang) {
    if (!lang) return false;
    const norm = lang.toLowerCase().replace(/_/g, '-');
    return norm === 'en-us' || norm.startsWith('en-us');
  }

  function scoreVoice(v) {
    if (!v || !v.lang) return -1;
    const langNorm = v.lang.toLowerCase().replace(/_/g, '-');
    // Strictly prefer en-US; allow general en-* only with lower score, never Spanish
    if (!langNorm.startsWith('en')) return -100;

    let score = 0;
    if (isUsEnglishLang(v.lang)) score += 100;
    else if (langNorm.startsWith('en-ca') || langNorm.startsWith('en-')) score += 25;

    const name = v.name || '';
    const t1Idx = TIER_1_NEURAL.findIndex(n => name.toLowerCase().includes(n.toLowerCase()));
    if (t1Idx !== -1) score += 200 - t1Idx;

    const t2Idx = TIER_2_APPLE_AND_DESKTOP.findIndex(n => name.toLowerCase() === n.toLowerCase());
    if (t2Idx !== -1) score += 120 - t2Idx;

    const t3Idx = TIER_3_ANDROID.findIndex(n => name.toLowerCase().includes(n.toLowerCase()));
    if (t3Idx !== -1) score += 110 - t3Idx;

    if (/natural|neural|online|premium|enhanced/i.test(name)) score += 90;
    if (/google us english/i.test(name)) score += 85;
    if (v.localService === false) score += 15;

    return score;
  }

  function getRankedUsVoices() {
    if (!('speechSynthesis' in window)) return [];
    const all = window.speechSynthesis.getVoices() || [];
    return all
      .filter(v => scoreVoice(v) > 0)
      .sort((a, b) => scoreVoice(b) - scoreVoice(a));
  }

  function getBestAmericanVoice(preferAlternate = false) {
    const ranked = getRankedUsVoices();
    if (!ranked.length) return null;

    if (!preferAlternate && selectedVoiceName) {
      const saved = ranked.find(v => v.name === selectedVoiceName);
      if (saved) return saved;
    }

    const primary = ranked[0];
    if (!preferAlternate || ranked.length < 2) return primary;

    // Pick a distinct second US voice for 2-speaker dialogues
    const isFemale = name => /jenny|aria|ava|emma|michelle|samantha|allison|nicky|zira|female|google us english/i.test(name);
    const primaryFemale = isFemale(primary.name);
    const opposite = ranked.find(v => v.name !== primary.name && isFemale(v.name) !== primaryFemale && isUsEnglishLang(v.lang));
    return opposite || ranked[1] || primary;
  }

  function populateVoiceSelector() {
    const selectEl = document.getElementById('voiceSelect');
    if (!selectEl) return;

    const ranked = getRankedUsVoices();
    if (!ranked.length) {
      selectEl.innerHTML = '<option value="cloud">🇺🇸 US English (Cloud Neural Audio)</option>';
      return;
    }

    const best = getBestAmericanVoice(false);
    const optionsHtml = ranked.slice(0, 12).map(v => {
      const cleanName = v.name
        .replace(/Microsoft | - English \(United States\)/g, '')
        .replace(/Online \(Natural\)/g, '✨ Natural');
      const isSelected = best && v.name === best.name ? 'selected' : '';
      return `<option value="${v.name.replace(/"/g, '&quot;')}" ${isSelected}>🇺🇸 ${cleanName}</option>`;
    }).join('');

    selectEl.innerHTML = optionsHtml + '<option value="cloud">☁️ US English (Modo Web Universal)</option>';
  }

  // Normalize surgical & medical acronyms so TTS pronounces them naturally
  function normalizeMedicalSpeech(text) {
    return String(text || '')
      .replace(/\[Ciudad\]/g, 'Buenos Aires')
      .replace(/\[Hospital\/Clínica\]/g, 'a tertiary university hospital')
      .replace(/\[massive defects \/ parastomal hernias\]/g, 'massive abdominal wall defects and parastomal hernias')
      .replace(/\bvs\.\b/gi, 'versus')
      .replace(/\bthe OR\b/g, 'the O. R.')
      .replace(/\ban OR\b/g, 'an O. R.')
      .replace(/\bOR\b/g, 'O. R.')
      .replace(/\bJP\b/g, 'J. P.')
      .replace(/\bCT\b/g, 'C. T.')
      .replace(/\bHbA1c\b/gi, 'H. B. A. one C.')
      .replace(/\bSSO\b/g, 'S. S. O.')
      .replace(/\bSSI\b/g, 'S. S. I.')
      .replace(/\bLOS\b/g, 'length of stay')
      .replace(/\bPPP\b/g, 'P. P. P.')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Split long text into natural breath units for fluid, non-robotic cadence
  function splitIntoBreathChunks(text) {
    const normalized = normalizeMedicalSpeech(text);
    if (!normalized) return [];

    // Protect common abbreviations before splitting on periods
    const protectedText = normalized
      .replace(/\bDr\./g, 'Doctor')
      .replace(/\bMr\./g, 'Mister')
      .replace(/\bMrs\./g, 'Missus')
      .replace(/\bO\.\s*R\./g, 'O R')
      .replace(/\bJ\.\s*P\./g, 'J P')
      .replace(/\bC\.\s*T\./g, 'C T')
      .replace(/\bS\.\s*S\.\s*O\./g, 'S S O')
      .replace(/\bS\.\s*S\.\s*I\./g, 'S S I')
      .replace(/\bP\.\s*P\.\s*P\./g, 'P P P');

    const rawSentences = protectedText.match(/[^.!?;]+[.!?;]*\s*/g) || [protectedText];
    const chunks = [];

    rawSentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (!trimmed) return;
      if (trimmed.length > 145) {
        const subParts = trimmed.split(/,\s+|—\s*|--\s*/);
        subParts.forEach((part, idx) => {
          const p = part.trim();
          if (p) chunks.push(idx < subParts.length - 1 ? p + ',' : p);
        });
      } else {
        chunks.push(trimmed);
      }
    });

    return chunks;
  }

  function unlockAudioContext() {
    if (audioUnlocked) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.value = 0.0001;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(0);
        osc.stop(0.04);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      audioUnlocked = true;
      const dot = document.getElementById('audioDot');
      if (dot) dot.classList.add('ready');
    } catch (e) {}
  }

  function clearSpeakingUI() {
    document.querySelectorAll('.speaking').forEach(el => el.classList.remove('speaking'));
  }

  function setStatusText(html) {
    const statusEl = document.getElementById('audioStatus');
    if (statusEl) statusEl.innerHTML = html;
    const dot = document.getElementById('audioDot');
    if (dot) dot.classList.add('ready');
  }

  function startChromeKeepAlive() {
    stopChromeKeepAlive();
    chromeKeepAliveTimer = setInterval(() => {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setTimeout(() => {
          if ('speechSynthesis' in window) window.speechSynthesis.resume();
        }, 40);
      }
    }, 9500);
  }

  function stopChromeKeepAlive() {
    if (chromeKeepAliveTimer) {
      clearInterval(chromeKeepAliveTimer);
      chromeKeepAliveTimer = null;
    }
  }

  function stopAllAudio() {
    isCancelled = true;
    chunkQueue = [];
    stopChromeKeepAlive();
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    if (fallbackAudioEl) {
      try {
        fallbackAudioEl.pause();
        fallbackAudioEl.src = '';
      } catch (e) {}
      fallbackAudioEl = null;
    }
    clearSpeakingUI();
  }

  // Cloud HTML5 fallback (chunked so long paragraphs work on any mobile browser)
  function playCloudFallbackQueue(chunks, rate, onComplete) {
    if (isCancelled || !chunks.length) {
      clearSpeakingUI();
      if (onComplete) onComplete();
      return;
    }

    const currentChunk = chunks.shift();
    const encoded = encodeURIComponent(currentChunk);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-US&client=tw-ob&q=${encoded}`;

    try {
      fallbackAudioEl = new Audio(url);
      // Avoid extreme rate changes that sound robotic
      fallbackAudioEl.playbackRate = Math.max(0.8, Math.min(1.1, rate));
      fallbackAudioEl.onplay = () => {
        setStatusText('<strong>Audio US Activo (Modo Universal):</strong> Pronunciación americana clara.');
      };
      fallbackAudioEl.onended = () => {
        if (!isCancelled) {
          setTimeout(() => playCloudFallbackQueue(chunks, rate, onComplete), 240);
        }
      };
      fallbackAudioEl.onerror = () => {
        clearSpeakingUI();
        setStatusText('<strong>Audio listo:</strong> Usa Chrome, Edge o Safari para síntesis neuronal local.');
      };
      fallbackAudioEl.play().catch(() => {
        clearSpeakingUI();
      });
    } catch (e) {
      clearSpeakingUI();
    }
  }

  // Speak a sequence of items [{ text, rate, alternateVoice }]
  function playSpeechQueue(items, btnOrId) {
    unlockAudioContext();
    stopAllAudio();
    isCancelled = false;

    if (btnOrId) {
      const btn = typeof btnOrId === 'string' ? document.getElementById(btnOrId) : btnOrId;
      if (btn) btn.classList.add('speaking');
    }

    const expandedQueue = [];
    items.forEach(item => {
      const chunks = splitIntoBreathChunks(item.text);
      chunks.forEach(c => {
        expandedQueue.push({
          text: c,
          rate: item.rate || globalRate,
          alternateVoice: !!item.alternateVoice
        });
      });
    });

    if (!expandedQueue.length) {
      clearSpeakingUI();
      return;
    }

    // If user explicitly chose Cloud mode or browser has no US/English voices
    const bestVoice = getBestAmericanVoice(false);
    if (selectedVoiceName === 'cloud' || !('speechSynthesis' in window) || !bestVoice) {
      playCloudFallbackQueue(
        expandedQueue.map(x => x.text),
        expandedQueue[0].rate
      );
      return;
    }

    startChromeKeepAlive();

    function playNextItem() {
      if (isCancelled || !expandedQueue.length) {
        stopChromeKeepAlive();
        clearSpeakingUI();
        return;
      }

      const current = expandedQueue.shift();
      let started = false;

      const watchdog = setTimeout(() => {
        if (!started && !isCancelled) {
          stopChromeKeepAlive();
          playCloudFallbackQueue(
            [current.text, ...expandedQueue.map(x => x.text)],
            current.rate
          );
        }
      }, 850);

      try {
        const utter = new SpeechSynthesisUtterance(current.text);
        activeUtterance = utter;
        utter.lang = 'en-US';
        // Natural fluid rate: never drop below 0.78 to prevent robotic distortion
        utter.rate = Math.max(0.78, Math.min(1.08, current.rate));
        utter.pitch = 1.0;
        utter.volume = 1.0;

        const chosenVoice = getBestAmericanVoice(current.alternateVoice);
        if (chosenVoice) {
          utter.voice = chosenVoice;
        }

        utter.onstart = () => {
          started = true;
          clearTimeout(watchdog);
          const vLabel = chosenVoice
            ? chosenVoice.name.replace(/Microsoft | - English \(United States\)/g, '')
            : 'en-US';
          setStatusText(`<strong>Voz US Activa (${vLabel}):</strong> Reproduciendo inglés americano natural.`);
        };

        utter.onend = () => {
          clearTimeout(watchdog);
          if (!isCancelled) {
            setTimeout(playNextItem, 280);
          }
        };

        utter.onerror = (ev) => {
          clearTimeout(watchdog);
          if (ev.error === 'interrupted' || ev.error === 'canceled') return;
          if (!started && !isCancelled) {
            stopChromeKeepAlive();
            playCloudFallbackQueue(
              [current.text, ...expandedQueue.map(x => x.text)],
              current.rate
            );
          } else if (!isCancelled) {
            setTimeout(playNextItem, 200);
          }
        };

        window.speechSynthesis.speak(utter);
      } catch (e) {
        clearTimeout(watchdog);
        playCloudFallbackQueue(
          [current.text, ...expandedQueue.map(x => x.text)],
          current.rate
        );
      }
    }

    setTimeout(playNextItem, 40);
  }

  // Public global functions
  window.speakText = function (text, rate = null, btnOrId = null) {
    const effectiveRate = rate !== null ? rate : globalRate;
    playSpeechQueue([{ text, rate: effectiveRate, alternateVoice: false }], btnOrId);
  };

  window.playDialogueLines = function (lines, btnOrId = null) {
    const items = lines.map((line, index) => ({
      text: line.text,
      rate: globalRate,
      alternateVoice: index % 2 === 1
    }));
    playSpeechQueue(items, btnOrId);
  };

  window.stopAllAudio = stopAllAudio;

  window.testAndUnlockAudio = function () {
    unlockAudioContext();
    setStatusText('<strong>Probando pronunciación americana (en-US)...</strong>');
    window.speakText(
      "Audio ready. Welcome Doctor Castillo. Today we will review abdominal wall anatomy and the transversus abdominis release technique in the operating room.",
      globalRate,
      'unlockBtn'
    );
  };

  window.setPreferredVoice = function (voiceName) {
    selectedVoiceName = voiceName;
    localStorage.setItem('tar_preferred_voice', voiceName);
    window.speakText("American English voice selected. Transversus abdominis release.", globalRate);
  };

  window.setPreferredRate = function (rateVal) {
    globalRate = parseFloat(rateVal) || 0.96;
    localStorage.setItem('tar_preferred_rate', String(globalRate));
  };

  // Initialize voices on load & user gesture
  if ('speechSynthesis' in window) {
    populateVoiceSelector();
    window.speechSynthesis.onvoiceschanged = () => {
      populateVoiceSelector();
    };
    setTimeout(populateVoiceSelector, 350);
    setTimeout(populateVoiceSelector, 1200);
  }

  document.addEventListener('pointerdown', unlockAudioContext, { once: true, passive: true });
  document.addEventListener('touchstart', unlockAudioContext, { once: true, passive: true });
})();
