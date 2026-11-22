/**
 * Abhay & Mamta Wedding Invitation - Core Interactive Engine
 * Kerala (Nair) & Nepal (Khati) Cultural Fusion
 * Updated: 15 & 16 February 2027
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // CONFIGURATION CONSTANTS
  // ========================================================
  // Paste your Google Apps Script Web App Deployment URL here:
  const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzAByx27lKlYa3N7H-YM_UP0RadLT8bzRM2R_8vjcAIgeCJ_C9cl4cjUJEYwIgdxNds/exec"; 

  // Host WhatsApp Number (Kerala: +91 97782 54499)
  const HOST_WHATSAPP_NUMBER = "919778254499"; 

  // Target Wedding Date (Monday, 15 February 2027 at 11:00 AM IST)
  const WEDDING_DATE = new Date("2027-02-15T11:00:00+05:30").getTime();

  // Target Background Music Volume (35%: low, soft, warm and non-distorting)
  const TARGET_BG_VOLUME = 0.35;

  // ========================================================
  // 1. INTRO SPLIT-CURTAIN CONTROLLER
  // ========================================================
  const introCurtain = document.getElementById('intro-curtain');
  const unveilBtn = document.getElementById('unveil-btn');
  const replayBtn = document.getElementById('replay-btn');

  function openCurtain() {
    if (!introCurtain.classList.contains('opened')) {
      introCurtain.classList.add('opened');
      document.body.classList.remove('curtain-active');

      // Start traditional Kerala Nadaswaram & Thavil wedding sound!
      startMusic();

      // Trigger subtle flower petal celebration burst
      burstPetals(16);
    }
  }

  function closeCurtain() {
    introCurtain.classList.remove('opened');
    document.body.classList.add('curtain-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (unveilBtn) {
    unveilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCurtain();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', closeCurtain);
  }

  // ========================================================
  // 2. KERALA NADASWARAM & THAVIL WEDDING INSTRUMENTAL ENGINE
  // Classic Mangala Vadyam (Raga Gambheera Nattai / Mohanam)
  // Plays generated audio file + real-time Web Audio synthesis backup
  // ========================================================
  const musicToggle = document.getElementById('music-toggle');
  const musicStatusText = document.getElementById('music-status-text');
  const weddingAudio = document.getElementById('wedding-audio');

  let audioContext = null;
  let isSynthPlaying = false;
  let synthGainNode = null;
  let melodyInterval = null;
  let thavilInterval = null;
  let isMusicPlaying = false;

  // Real-time Web Audio Synthesizer for Nadaswaram & Thavil
  function initNadaswaramSynth() {
    if (audioContext) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
      synthGainNode = audioContext.createGain();
      synthGainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
      synthGainNode.connect(audioContext.destination);

      // Continuous Drone (Ottu / Shruti box on D3 = 146.83 Hz and A3 = 220 Hz)
      const dronePitches = [146.83, 220.00, 293.66];
      dronePitches.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscGain.gain.setValueAtTime(idx === 0 ? 0.03 : 0.05, audioContext.currentTime);

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(synthGainNode);
        osc.start();
      });

      // Auspicious Raga Mohanam / Gambheera Nattai scale (D, E, F#, A, B, D')
      const scale = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99];
      // Traditional Kerala Nadaswaram opening cadence
      const nadaswaramPhrases = [
        0, 3, 5, 4, 3, 2, 0, 3, 5, 6, 7, 6, 5, 4, 3, 2, 0, 2, 3, 5, 5, 4, 3, 0
      ];
      let noteStep = 0;

      melodyInterval = setInterval(() => {
        if (!isSynthPlaying || !audioContext) return;
        const targetFreq = scale[nadaswaramPhrases[noteStep % nadaswaramPhrases.length]];
        noteStep++;

        const now = audioContext.currentTime;

        // Double-reed Nadaswaram tone generator (sawtooth + resonant bandpass filter)
        const osc = audioContext.createOscillator();
        const filter = audioContext.createBiquadFilter();
        const noteGain = audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(targetFreq, now);

        // Vocal gamaka (microtonal slide/vibrato)
        osc.frequency.linearRampToValueAtTime(targetFreq * 1.015, now + 0.15);
        osc.frequency.linearRampToValueAtTime(targetFreq, now + 0.35);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(targetFreq * 2.2, now);
        filter.Q.setValueAtTime(4.5, now);

        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(synthGainNode);

        osc.start(now);
        osc.stop(now + 0.58);
      }, 460);

      // Thavil Drum Rhythm Pattern (Tha - Dhi - Thom - Nam)
      let beat = 0;
      thavilInterval = setInterval(() => {
        if (!isSynthPlaying || !audioContext) return;
        const now = audioContext.currentTime;
        const drumType = beat % 4; // 0=Tha, 1=Dhi, 2=Thom, 3=Nam
        beat++;

        const drumOsc = audioContext.createOscillator();
        const drumGain = audioContext.createGain();

        if (drumType === 0) {
          // Tha: Deep resonant bass strike
          drumOsc.type = 'sine';
          drumOsc.frequency.setValueAtTime(130, now);
          drumOsc.frequency.exponentialRampToValueAtTime(55, now + 0.12);
          drumGain.gain.setValueAtTime(0.16, now);
          drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        } else if (drumType === 1) {
          // Dhi: Sharp wooden stick slap
          drumOsc.type = 'triangle';
          drumOsc.frequency.setValueAtTime(420, now);
          drumGain.gain.setValueAtTime(0.10, now);
          drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        } else if (drumType === 2) {
          // Thom: Mid bass punch
          drumOsc.type = 'sine';
          drumOsc.frequency.setValueAtTime(145, now);
          drumOsc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
          drumGain.gain.setValueAtTime(0.14, now);
          drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        } else {
          // Nam: High treble rim ring
          drumOsc.type = 'square';
          drumOsc.frequency.setValueAtTime(540, now);
          drumGain.gain.setValueAtTime(0.06, now);
          drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        }

        drumOsc.connect(drumGain);
        drumGain.connect(synthGainNode);
        drumOsc.start(now);
        drumOsc.stop(now + 0.2);
      }, 460);

      isSynthPlaying = true;
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }

  let fadeInterval = null;

  function fadeMusic(toVolume, durationMs, callback) {
    if (fadeInterval) clearInterval(fadeInterval);
    if (!weddingAudio) {
      if (callback) callback();
      return;
    }
    const startVol = weddingAudio.volume;
    const diff = toVolume - startVol;
    const stepTime = 30;
    const steps = Math.max(1, Math.floor(durationMs / stepTime));
    let currentStep = 0;

    fadeInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      weddingAudio.volume = Math.max(0, Math.min(1, startVol + diff * progress));
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        fadeInterval = null;
        weddingAudio.volume = toVolume;
        if (callback) callback();
      }
    }, stepTime);
  }

  function startMusic() {
    if (weddingAudio) {
      weddingAudio.volume = TARGET_BG_VOLUME;
      const playPromise = weddingAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setMusicState(true);
        }).catch(() => {
          // Fall back to Web Audio synthesizer
          initNadaswaramSynth();
          setMusicState(true);
        });
        return;
      }
    }
    initNadaswaramSynth();
    setMusicState(true);
  }

  function pauseMusic() {
    if (weddingAudio) weddingAudio.pause();
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend();
    }
    setMusicState(false);
  }

  function setMusicState(playing) {
    isMusicPlaying = playing;
    if (playing) {
      musicToggle.classList.add('playing');
      musicStatusText.textContent = "Music: ON";
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } else {
      musicToggle.classList.remove('playing');
      musicStatusText.textContent = "Music: MUTED";
    }
  }

  musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) pauseMusic();
    else startMusic();
  });

  // ========================================================
  // 2B. INTRODUCTION VIDEO CONTROLLER (Auto Mute Bg Music & Smooth Fade-In)
  // ========================================================
  const weddingVideo = document.getElementById('wedding-video');
  let wasMusicPlayingBeforeVideo = false;

  function resumeBackgroundMusic() {
    if (weddingAudio) {
      weddingAudio.volume = 0;
      const playPromise = weddingAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setMusicState(true);
          fadeMusic(TARGET_BG_VOLUME, 1800);
        }).catch(err => console.warn("Audio autoplay blocked", err));
      } else {
        fadeMusic(TARGET_BG_VOLUME, 1800);
        setMusicState(true);
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
      if (synthGainNode) {
        synthGainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 1.8);
      }
      setMusicState(true);
    }
  }

  if (weddingVideo) {
    // Normal volume with original audio
    weddingVideo.volume = 1.0;
    weddingVideo.muted = false;

    // When the introduction video starts playing, turn off (mute) the background music completely
    weddingVideo.addEventListener('play', () => {
      wasMusicPlayingBeforeVideo = isMusicPlaying;
      if (isMusicPlaying) {
        fadeMusic(0, 300, () => {
          if (weddingAudio) weddingAudio.pause();
          if (audioContext && audioContext.state === 'running') {
            audioContext.suspend();
          }
        });
      }
    });

    // When the introduction video pauses or ends, fade the background music back in smoothly
    weddingVideo.addEventListener('pause', () => {
      if (wasMusicPlayingBeforeVideo && !weddingVideo.ended) {
        resumeBackgroundMusic();
      }
    });

    weddingVideo.addEventListener('ended', () => {
      if (wasMusicPlayingBeforeVideo) {
        resumeBackgroundMusic();
      }
    });
  }

  // ========================================================
  // 2C. PAGE VISIBILITY & BROWSER CLOSING AUDIO CONTROLLER
  // Mutes/stops music when closing, switching tabs, or minimizing
  // ========================================================
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause music when tab is hidden, minimized, or user leaves
      if (weddingAudio && !weddingAudio.paused) {
        weddingAudio.pause();
      }
      if (audioContext && audioContext.state === 'running') {
        audioContext.suspend();
      }
    } else {
      // Resume music only if it was playing and video isn't active
      const isVideoActive = weddingVideo && !weddingVideo.paused && !weddingVideo.ended;
      if (isMusicPlaying && !isVideoActive) {
        if (weddingAudio) {
          weddingAudio.play().catch(e => console.warn(e));
        }
        if (audioContext && audioContext.state === 'suspended') {
          audioContext.resume();
        }
      }
    }
  });

  // Guarantee audio stops immediately when browser window is closing or navigating away
  window.addEventListener('pagehide', () => {
    if (weddingAudio) weddingAudio.pause();
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close().catch(() => {});
    }
  });

  window.addEventListener('beforeunload', () => {
    if (weddingAudio) weddingAudio.pause();
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close().catch(() => {});
    }
  });

  // ========================================================
  // 3. FALLING JASMINE & MARIGOLD PETALS CANVAS ANIMATION
  // ========================================================
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const TOTAL_PETALS = 14; // Reduced by 56% from 32 for subtle, elegant ambiance

  class Petal {
    constructor(isBurst = false) {
      this.reset(isBurst);
    }

    reset(isBurst = false) {
      this.x = Math.random() * width;
      this.y = isBurst ? Math.random() * (height * 0.5) : -20 - Math.random() * 50;
      this.size = 6 + Math.random() * 6;
      this.speedY = 0.45 + Math.random() * 0.55; // Gentle, slow floating descent
      this.speedX = -0.25 + Math.random() * 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = -0.6 + Math.random() * 1.2;
      this.type = Math.random() > 0.45 ? 'marigold' : 'jasmine';
      this.opacity = 0.35 + Math.random() * 0.25; // Light, subtle, translucent
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.012 + Math.random() * 0.018;
    }

    update() {
      this.swayAngle += this.swaySpeed;
      this.y += this.speedY;
      this.x += Math.sin(this.swayAngle) * 0.5 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 25 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'marigold') {
        // Nepali Sayapatri Marigold Petal
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size);
        grad.addColorStop(0, '#FFE082');
        grad.addColorStop(0.5, '#FFA726');
        grad.addColorStop(1, '#E65100');
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
        ctx.fill();
      } else {
        // Kerala Mullappoo / Jasmine Bud
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(212, 175, 55, 0.35)';
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.5, this.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFD54F';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push(new Petal(true));
  }

  function burstPetals(count) {
    for (let i = 0; i < count; i++) {
      const p = new Petal(false);
      p.x = width * 0.5 + (Math.random() - 0.5) * 150;
      p.y = height * 0.4 + (Math.random() - 0.5) * 150;
      p.speedY = 1.0 + Math.random() * 1.5;
      p.speedX = (Math.random() - 0.5) * 2;
      petals.push(p);
    }
  }

  function renderPetals() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    if (petals.length > TOTAL_PETALS + 15) {
      petals.splice(TOTAL_PETALS, petals.length - TOTAL_PETALS);
    }
    requestAnimationFrame(renderPetals);
  }

  renderPetals();

  // ========================================================
  // 4. LIVE WEDDING COUNTDOWN TIMER (15 FEB 2027, 11:00 AM IST)
  // ========================================================
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    if (distance <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMinutes.textContent = "00";
      cdSeconds.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMinutes.textContent = String(minutes).padStart(2, '0');
    cdSeconds.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ========================================================
  // 5. LANGUAGE FILTER / PICKER
  // ========================================================
  const langButtons = document.querySelectorAll('.lang-btn');
  const langBlocks = document.querySelectorAll('[data-lang-block]');

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetLang = btn.getAttribute('data-lang');

      if (targetLang === 'all') {
        langBlocks.forEach(el => {
          el.style.display = '';
          el.style.opacity = '1';
        });
      } else {
        langBlocks.forEach(el => {
          const elLang = el.getAttribute('data-lang-block');
          if (elLang === targetLang || elLang === 'en') {
            el.style.display = '';
            el.style.opacity = '1';
          } else {
            el.style.display = 'none';
          }
        });
      }
    });
  });

  // ========================================================
  // 6. TRANSPORTATION SELECTION TOGGLE (Own vs Host Vehicle)
  // ========================================================
  const transOwnRadio = document.getElementById('trans-own');
  const transHostRadio = document.getElementById('trans-host');
  const hostPickupDetails = document.getElementById('host-pickup-details');

  function updateTransportVisibility() {
    if (transHostRadio && transHostRadio.checked) {
      hostPickupDetails.style.display = 'block';
    } else if (hostPickupDetails) {
      hostPickupDetails.style.display = 'none';
    }
  }

  if (transOwnRadio && transHostRadio) {
    transOwnRadio.addEventListener('change', updateTransportVisibility);
    transHostRadio.addEventListener('change', updateTransportVisibility);
    updateTransportVisibility();
  }

  // ========================================================
  // 7. RSVP FORM & GOOGLE SHEETS / WHATSAPP INTEGRATION
  // ========================================================
  const rsvpForm = document.getElementById('wedding-rsvp-form');
  const submitBtn = document.getElementById('submit-rsvp-btn');
  const btnSpinner = document.getElementById('btn-spinner');
  const statusMsg = document.getElementById('rsvp-status-message');
  const whatsappRsvpBtn = document.getElementById('whatsapp-rsvp-btn');

  function getSelectedEvents() {
    const checkedBoxes = document.querySelectorAll('input[name="events_attending"]:checked');
    const selected = [];
    checkedBoxes.forEach(cb => selected.push(cb.value));
    return selected.length > 0 ? selected.join(' & ') : 'Both Celebrations';
  }

  function generateWhatsAppText(data) {
    return encodeURIComponent(
      `💐 *Wedding RSVP for Abhay & Mamta*\n\n` +
      `👤 *Guest Name:* ${data.guest_name}\n` +
      `📞 *Phone:* ${data.guest_phone}\n` +
      `🗓️ *Attending Events:* ${data.events_attending}\n` +
      `👥 *Number of Guests:* ${data.guest_count}\n` +
      `✨ *Attendance:* ${data.attendance}\n` +
      `🚗 *Travel Mode:* ${data.transport_mode}` +
      (data.transport_mode === 'Host Provided Vehicle' ? ` (Pickup: ${data.pickup_location})` : ``) + `\n` +
      (data.dietary_notes ? `🍛 *Dietary Notes:* ${data.dietary_notes}\n` : ``) +
      (data.guest_message ? `💌 *Wishes:* "${data.guest_message}"\n` : ``) +
      `\nLooking forward to celebrating with you on 15 & 16 February 2027!`
    );
  }

  if (whatsappRsvpBtn) {
    whatsappRsvpBtn.addEventListener('click', () => {
      const formElements = rsvpForm.elements;
      const data = {
        guest_name: formElements['guest_name'].value || 'Beloved Guest',
        guest_phone: formElements['guest_phone'].value || 'Not specified',
        events_attending: getSelectedEvents(),
        guest_count: formElements['guest_count'].value || '1',
        attendance: formElements['attendance'].value || 'Joyfully Attending',
        transport_mode: formElements['transport_mode'].value || 'Own Vehicle',
        pickup_location: formElements['pickup_location'] ? formElements['pickup_location'].value : 'N/A',
        dietary_notes: formElements['dietary_notes'].value || '',
        guest_message: formElements['guest_message'].value || ''
      };

      const waUrl = `https://wa.me/${HOST_WHATSAPP_NUMBER}?text=${generateWhatsAppText(data)}`;
      window.open(waUrl, '_blank');
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = rsvpForm.elements['guest_name'].value.trim();
      const phone = rsvpForm.elements['guest_phone'].value.trim();

      if (!name || !phone) {
        showStatus("Please enter your name and contact phone number.", "error");
        return;
      }

      const formData = new FormData(rsvpForm);
      const dataObj = {};
      formData.forEach((val, key) => { dataObj[key] = val; });
      dataObj.events_attending = getSelectedEvents();
      dataObj.timestamp = new Date().toISOString();

      submitBtn.disabled = true;
      btnSpinner.style.display = 'inline-block';
      statusMsg.style.display = 'none';

      // Save locally to LocalStorage
      const savedRSVPs = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      savedRSVPs.push(dataObj);
      localStorage.setItem('wedding_rsvps', JSON.stringify(savedRSVPs));

      // Submit to Google Sheet Webhook if URL configured
      if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.startsWith('http')) {
        try {
          await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(dataObj)
          });
          showStatus(`✨ Thank you, ${name}! Your RSVP has been saved to the Google Sheet. See you on 15/16 Feb 2027!`, "success");
        } catch (err) {
          console.warn("Google Sheet sync error:", err);
          showStatus(`✨ Saved locally! Please also send a quick WhatsApp confirmation using the button below.`, "success");
        }
      } else {
        setTimeout(() => {
          showStatus(`✨ Thank you, ${name}! Your RSVP has been recorded! (Transport: ${dataObj.transport_mode}). You can also tap below to ping Abhay & Mamta on WhatsApp!`, "success");
        }, 600);
      }

      submitBtn.disabled = false;
      btnSpinner.style.display = 'none';
      burstPetals(12);
    });
  }

  function showStatus(text, type) {
    statusMsg.textContent = text;
    statusMsg.className = `status-msg ${type}`;
    statusMsg.style.display = 'block';
  }

  // ========================================================
  // 8. ADD TO CALENDAR (.ICS MULTI-EVENT GENERATOR)
  // Generates events for Wedding (15 Feb) & Reception (16 Feb)
  // ========================================================
  const downloadIcsBtn = document.getElementById('download-ics-btn');

  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Abhay and Mamta Wedding//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        
        // EVENT 1: WEDDING & THALIKETTU (15 FEB 2027)
        "BEGIN:VEVENT",
        "UID:abhay-mamta-wedding-20270215@wedding.org",
        "DTSTAMP:20261115T000000Z",
        "DTSTART:20270215T053000Z",
        "DTEND:20270215T083000Z",
        "SUMMARY:Abhay & Mamta Wedding Ceremony | ശുഭ വിവാഹം",
        "DESCRIPTION:The sacred Nair marriage ceremony of Abhay Sasidharan and Mamta Khati. Muhurtham: 11:00 AM - 12:00 PM IST (Kindly arrive before 11:00 AM)\\, followed by traditional royal Sadhya.",
        "LOCATION:The Renai Kappad Beach Resort\\, Kappad\\, Kozhikode\\, Kerala\\, India",
        "STATUS:CONFIRMED",
        "END:VEVENT",

        // EVENT 2: GRAND RECEPTION (16 FEB 2027)
        "BEGIN:VEVENT",
        "UID:abhay-mamta-reception-20270216@wedding.org",
        "DTSTAMP:20261115T000000Z",
        "DTSTART:20270216T093000Z",
        "DTEND:20270216T153000Z",
        "SUMMARY:Abhay & Mamta Wedding Reception | വിവാഹ സൽക്കാരം",
        "DESCRIPTION:Grand Wedding Reception of Abhay & Mamta starting from 3:00 PM onwards with dinner\\, felicitations\\, and music.",
        "LOCATION:Auditorium\\, Kuttiady\\, Kozhikode\\, Kerala\\, India",
        "STATUS:CONFIRMED",
        "END:VEVENT",

        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "Abhay_and_Mamta_Wedding_and_Reception.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ========================================================
  // 9. GALLERY FILTERING & LIGHTBOX
  // ========================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  let currentGalleryIndex = 0;
  let activeGalleryItems = Array.from(galleryItems);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      activeGalleryItems = [];

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          activeGalleryItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  function openLightbox(index) {
    if (activeGalleryItems.length === 0) return;
    currentGalleryIndex = (index + activeGalleryItems.length) % activeGalleryItems.length;
    const targetItem = activeGalleryItems[currentGalleryIndex];
    const imgEl = targetItem.querySelector('img');
    const capEl = targetItem.querySelector('.photo-caption');

    lightboxImg.src = imgEl.src;
    lightboxCaption.textContent = capEl ? capEl.textContent : targetItem.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = activeGalleryItems.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentGalleryIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentGalleryIndex + 1);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentGalleryIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentGalleryIndex + 1);
  });

  // ========================================================
  // 10. GOOGLE APPS SCRIPT SETUP MODAL
  // ========================================================
  const sheetModal = document.getElementById('sheet-guide-modal');
  const openSheetModalBtn = document.getElementById('open-sheet-modal');
  const closeSheetModalBtn = document.getElementById('close-sheet-modal');
  const sheetModalBackdrop = document.getElementById('sheet-modal-backdrop');

  if (openSheetModalBtn) {
    openSheetModalBtn.addEventListener('click', () => {
      sheetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeSheetModal() {
    sheetModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeSheetModalBtn) closeSheetModalBtn.addEventListener('click', closeSheetModal);
  if (sheetModalBackdrop) sheetModalBackdrop.addEventListener('click', closeSheetModal);

  // ========================================================
  // 11. SCROLL TO TOP HELPER
  // ========================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
