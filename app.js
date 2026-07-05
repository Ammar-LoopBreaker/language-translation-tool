/* ================================================
   app.js — Language Translation Tool Logic
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Element refs ──────────────────────────────────────────────
  const inputText     = document.getElementById('inputText');
  const outputBox     = document.getElementById('outputBox');
  const translateBtn  = document.getElementById('translateBtn');
  const copyBtn       = document.getElementById('copyBtn');
  const speakBtn      = document.getElementById('speakBtn');
  const clearBtn      = document.getElementById('clearBtn');
  const swapBtn       = document.getElementById('swapBtn');
  const srcLang       = document.getElementById('srcLang');
  const tgtLang       = document.getElementById('tgtLang');
  const charCount     = document.getElementById('charCount');
  const statusBar     = document.getElementById('statusBar');
  const detectedBadge = document.getElementById('detectedBadge');
  const srcLabel      = document.getElementById('srcLabel');
  const tgtLabel      = document.getElementById('tgtLabel');

  // ── State ─────────────────────────────────────────────────────
  let translatedText = '';
  let isSpeaking     = false;

  // ── Language name lookup ──────────────────────────────────────
  function getLangName(code) {
    const opt = [...srcLang.options, ...tgtLang.options].find(o => o.value === code);
    return opt ? opt.text.replace(/^[^\s]+\s/, '') : code;
  }

  // ── Status helper ─────────────────────────────────────────────
  function setStatus(msg, type) {
    statusBar.textContent = msg;
    statusBar.className   = 'status-bar' + (type ? ' ' + type : '');
  }

  // ── Reset output panel ────────────────────────────────────────
  function resetOutput() {
    outputBox.innerHTML         = '<span class="output-placeholder">Translation will appear here\u2026</span>';
    translatedText              = '';
    copyBtn.disabled            = true;
    speakBtn.disabled           = true;
    detectedBadge.style.display = 'none';
    setStatus('');
  }

  // ── Input listener ────────────────────────────────────────────
  inputText.addEventListener('input', () => {
    const len = inputText.value.length;
    charCount.textContent  = len + ' / 2000';
    translateBtn.disabled  = len === 0;
    if (len === 0) resetOutput();
  });

  // ── Sync target label ─────────────────────────────────────────
  tgtLang.addEventListener('change', () => {
    tgtLabel.textContent = getLangName(tgtLang.value);
  });

  srcLang.addEventListener('change', () => {
    srcLabel.textContent = srcLang.value === 'auto'
      ? 'Source Text'
      : getLangName(srcLang.value);
  });

  // ── Swap languages ────────────────────────────────────────────
  swapBtn.addEventListener('click', () => {
    if (srcLang.value === 'auto') {
      setStatus('Cannot swap while "Detect Automatically" is selected.', 'error');
      return;
    }
    const src = srcLang.value;
    const tgt = tgtLang.value;

    srcLang.value = tgt;
    tgtLang.value = src;

    srcLabel.textContent = getLangName(srcLang.value);
    tgtLabel.textContent = getLangName(tgtLang.value);

    if (translatedText) {
      inputText.value       = translatedText;
      charCount.textContent = inputText.value.length + ' / 2000';
      translateBtn.disabled = false;
      resetOutput();
    }
    setStatus('');
  });

  // ── CORE TRANSLATE — MyMemory API (no CORS issues) ───────────
  async function translate() {
    const text = inputText.value.trim();
    if (!text) return;

    const src    = srcLang.value;
    const tgt    = tgtLang.value;
    const isAuto = src === 'auto';
    const langPair = (isAuto ? 'autodetect' : src) + '|' + tgt;

    translateBtn.disabled  = true;
    translateBtn.innerHTML = '<span class="spinner"></span> Translating\u2026';
    outputBox.innerHTML    = '<span class="output-placeholder">Translating\u2026</span>';
    copyBtn.disabled       = true;
    speakBtn.disabled      = true;
    detectedBadge.style.display = 'none';
    setStatus('Connecting to translation service\u2026', 'loading');

    try {
      const url = 'https://api.mymemory.translated.net/get?q='
        + encodeURIComponent(text)
        + '&langpair=' + encodeURIComponent(langPair);

      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error: ' + res.status);

      const data = await res.json();

      if (data.responseStatus !== 200) {
        throw new Error(data.responseDetails || 'Translation failed');
      }

      const result = data.responseData.translatedText;
      if (!result || result.trim() === '') {
        throw new Error('Empty translation received. Try shorter text.');
      }

      if (isAuto && data.responseData.detectedLanguage) {
        detectedBadge.textContent   = 'Detected: ' + data.responseData.detectedLanguage.toUpperCase();
        detectedBadge.style.display = 'inline-block';
      }

      translatedText        = result;
      outputBox.textContent = result;
      copyBtn.disabled      = false;
      speakBtn.disabled     = !window.speechSynthesis;
      setStatus('Translation complete!', 'success');

    } catch (err) {
      outputBox.innerHTML = '<span class="output-placeholder">Translation failed. Please try again.</span>';
      setStatus('Error: ' + err.message, 'error');
    } finally {
      translateBtn.disabled  = inputText.value.trim().length === 0;
      translateBtn.innerHTML = 'Translate';
    }
  }

  translateBtn.addEventListener('click', translate);

  inputText.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!translateBtn.disabled) translate();
    }
  });

  // ── Copy ──────────────────────────────────────────────────────
  copyBtn.addEventListener('click', async () => {
    if (!translatedText) return;
    try {
      await navigator.clipboard.writeText(translatedText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = translatedText;
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    copyBtn.textContent = 'Copied!';
    setStatus('Copied to clipboard!', 'success');
    setTimeout(() => { copyBtn.textContent = '📋'; setStatus(''); }, 2000);
  });

  // ── Text-to-Speech ────────────────────────────────────────────
  speakBtn.addEventListener('click', () => {
    if (!translatedText || !window.speechSynthesis) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      isSpeaking = false;
      speakBtn.textContent = '🔊';
      speakBtn.classList.remove('speaking');
      setStatus('');
      return;
    }

    const utter = new SpeechSynthesisUtterance(translatedText);
    utter.lang  = tgtLang.value;

    const voices = speechSynthesis.getVoices();
    const match  = voices.find(v => v.lang.startsWith(tgtLang.value.split('-')[0]));
    if (match) utter.voice = match;

    isSpeaking = true;
    speakBtn.textContent = 'Stop';
    speakBtn.classList.add('speaking');
    setStatus('Speaking\u2026');

    utter.onend = () => {
      isSpeaking = false;
      speakBtn.textContent = '🔊';
      speakBtn.classList.remove('speaking');
      setStatus('');
    };
    utter.onerror = () => {
      isSpeaking = false;
      speakBtn.textContent = '🔊';
      speakBtn.classList.remove('speaking');
      setStatus('Speech not available for this language.', 'error');
    };

    speechSynthesis.speak(utter);
  });

  // ── Clear ─────────────────────────────────────────────────────
  clearBtn.addEventListener('click', () => {
    inputText.value       = '';
    charCount.textContent = '0 / 2000';
    translateBtn.disabled = true;
    if (isSpeaking) { speechSynthesis.cancel(); isSpeaking = false; }
    resetOutput();
    inputText.focus();
  });

  // Preload TTS voices
  if (window.speechSynthesis) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

}); // end DOMContentLoaded