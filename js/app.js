/**
 * Platform Application Controller
 * Inglés Quirúrgico: Pared Abdominal y Técnica TAR (A1 - B1 - C1)
 */
(function () {
  let learnedIds = new Set(JSON.parse(localStorage.getItem('tar_learned_v1') || '[]'));
  let completedClasses = new Set(JSON.parse(localStorage.getItem('tar_classes_v1') || '[]'));
  let currentFilter = 'core'; // Default to the 25 core cards from the manual, with option for all 40
  let searchQuery = '';
  let currentIndex = 0;
  let isFlipped = false;
  let pitchTimerInterval = null;
  let pitchSecondsLeft = 60;

  window.switchTab = function (tabName, btn) {
    if (window.stopAllAudio) window.stopAllAudio();
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('nav.tabs button').forEach(b => b.classList.remove('active'));

    const targetPanel = document.getElementById('tab-' + tabName);
    if (targetPanel) targetPanel.classList.add('active');

    if (btn) {
      btn.classList.add('active');
    } else {
      const navBtn = document.querySelector(`nav.tabs button[data-tab="${tabName}"]`);
      if (navBtn) navBtn.classList.add('active');
    }
    updateDashboardStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function getFilteredCards() {
    let list = window.CARDS || [];
    if (currentFilter === 'core') {
      list = list.filter(c => c.group === 'core');
    } else if (currentFilter === 'learned') {
      list = list.filter(c => learnedIds.has(c.id));
    } else if (currentFilter === 'review') {
      list = list.filter(c => !learnedIds.has(c.id));
    } else if (currentFilter === 'A1' || currentFilter === 'B1' || currentFilter === 'C1') {
      list = list.filter(c => c.level === currentFilter);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c =>
        c.en.toLowerCase().includes(q) ||
        c.def.toLowerCase().includes(q) ||
        c.cat.toLowerCase().includes(q)
      );
    }
    return list;
  }

  window.speakCurrent = function (rate, btnId) {
    const list = getFilteredCards();
    if (!list.length) return;
    window.speakText(list[currentIndex].speak, rate, btnId);
  };

  window.renderCard = function () {
    const list = getFilteredCards();
    const totalAll = (window.CARDS || []).length;
    const learnedCount = learnedIds.size;

    const learnedCounterEl = document.getElementById('learnedCounter');
    if (learnedCounterEl) {
      learnedCounterEl.textContent = `Aprendidas: ${learnedCount} / ${totalAll}`;
    }
    const progressFillEl = document.getElementById('progressFill');
    if (progressFillEl) {
      progressFillEl.style.width = `${(learnedCount / totalAll) * 100}%`;
    }

    if (!list.length) {
      document.getElementById('cardCounter').textContent = '0 tarjetas en este filtro';
      document.getElementById('frontTerm').textContent = '¡No hay tarjetas en esta vista!';
      document.getElementById('frontPhonetic').textContent = 'Cambia el filtro o limpia el buscador';
      document.getElementById('frontCatTag').textContent = '';
      document.getElementById('backDef').textContent = 'Has completado o filtrado todas las tarjetas de esta categoría.';
      document.getElementById('backHint').textContent = 'Selecciona " Esenciales (25)" o "Todas (40)" para seguir repasando.';
      return;
    }

    if (currentIndex >= list.length) currentIndex = 0;
    const card = list[currentIndex];
    const isLearned = learnedIds.has(card.id);

    document.getElementById('cardCounter').textContent = `Tarjeta ${currentIndex + 1} de ${list.length}`;
    document.getElementById('frontTerm').textContent = card.en;
    document.getElementById('frontPhonetic').textContent = card.ph;
    document.getElementById('frontCatTag').innerHTML = `<span class="sec-badge ${card.level.toLowerCase()}">${card.level}</span> ${card.cat}`;
    document.getElementById('backTermSmall').textContent = `${card.level} • ${card.en}`;
    document.getElementById('backDef').textContent = card.def;
    document.getElementById('backHint').innerHTML = `<strong>Pista Clínica / Lingüística:</strong> ${card.hint}`;

    document.getElementById('frontBadge').innerHTML = isLearned
      ? '<span class="badge-learned">✓ Aprendida</span>'
      : `<span class="sec-badge ${card.level.toLowerCase()}">Nivel ${card.level}</span>`;

    const masterBtn = document.getElementById('masterBtn');
    if (masterBtn) {
      if (isLearned) {
        masterBtn.textContent = '↺ Repasar de nuevo';
        masterBtn.classList.add('unmark');
      } else {
        masterBtn.textContent = '✓ Marcar aprendida';
        masterBtn.classList.remove('unmark');
      }
    }

    isFlipped = false;
    const fcEl = document.getElementById('flashcard');
    if (fcEl) fcEl.classList.remove('is-flipped');
    updateDashboardStats();
  };

  window.flipCard = function () {
    isFlipped = !isFlipped;
    const fcEl = document.getElementById('flashcard');
    if (fcEl) fcEl.classList.toggle('is-flipped', isFlipped);
  };

  window.nextCard = function () {
    const list = getFilteredCards();
    if (!list.length) return;
    currentIndex = (currentIndex + 1) % list.length;
    window.renderCard();
  };

  window.prevCard = function () {
    const list = getFilteredCards();
    if (!list.length) return;
    currentIndex = (currentIndex - 1 + list.length) % list.length;
    window.renderCard();
  };

  window.shuffleCards = function () {
    const list = getFilteredCards();
    if (list.length <= 1) return;
    currentIndex = Math.floor(Math.random() * list.length);
    window.renderCard();
  };

  window.toggleLearned = function () {
    const list = getFilteredCards();
    if (!list.length) return;
    const card = list[currentIndex];
    if (learnedIds.has(card.id)) learnedIds.delete(card.id);
    else learnedIds.add(card.id);
    localStorage.setItem('tar_learned_v1', JSON.stringify([...learnedIds]));
    window.renderCard();
  };

  window.setFilter = function (filter) {
    currentFilter = filter;
    currentIndex = 0;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    window.renderCard();
  };

  window.onFlashcardSearch = function (val) {
    searchQuery = val || '';
    currentIndex = 0;
    window.renderCard();
  };

  // Glossary Live Filter
  window.filterGlossaryTables = function (query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('#tab-glosario tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = !q || text.includes(q) ? '' : 'none';
    });
  };

  // Render the 10 TAR Steps
  function renderTarSteps() {
    const container = document.getElementById('tarStepsContainer');
    if (!container || !window.TAR_STEPS) return;

    container.innerHTML = window.TAR_STEPS.map(step => `
      <li class="tar-step-item">
        <span class="tar-step-num">${step.num}</span>
        <div class="tar-step-content">
          <div>
            <span class="sec-badge ${step.level.toLowerCase()}">C1.${step.num}</span>
            <strong>${step.title}:</strong> ${step.es}
          </div>
          <div style="font-size:0.82rem; color:var(--muted); margin-top:4px;">💡 <em>${step.tip}</em></div>
        </div>
        <div style="display:flex; gap:6px; flex-shrink:0;">
          <button class="mini-play" onclick="speakText('${step.speak.replace(/'/g, "\\'")}', 0.96, this)">🔊 US</button>
          <button class="mini-play slow-btn" onclick="speakText('${step.speak.replace(/'/g, "\\'")}', 0.82, this)">🐢 0.8x</button>
        </div>
      </li>
    `).join('');
  }

  window.playAllTarSteps = function (btn) {
    if (!window.TAR_STEPS) return;
    const fullText = window.TAR_STEPS.map(s => s.speak).join(' ');
    window.speakText(fullText, 0.94, btn);
  };

  // Interactive Elevator Pitch Builder
  window.updateElevatorPitch = function () {
    const city = (document.getElementById('pitchCity')?.value || '').trim() || 'Buenos Aires';
    const hospital = (document.getElementById('pitchHospital')?.value || '').trim() || 'Hospital Italiano';
    const focus = (document.getElementById('pitchFocus')?.value || '').trim() || 'massive ventral defects and parastomal hernias';

    const previewEl = document.getElementById('pitchPreviewText');
    if (!previewEl) return;

    previewEl.innerHTML = `"Hi, I'm Dr. Dani Castillo, a general surgeon from <strong>${city}</strong>, Argentina. Back home, I work at <strong>${hospital}</strong> and focus heavily on abdominal wall reconstruction and complex incisional hernias. I'm here doing an observership with Dr. Novitsky because we routinely perform his TAR technique in our unit, and watching how your team manages <strong>${focus}</strong> in person is an incredible opportunity. I'm really grateful to be in the OR with you today—please let me know where I can stand so I stay completely out of your way."`;
  };

  window.speakCustomPitch = function (rate, btn) {
    const city = (document.getElementById('pitchCity')?.value || '').trim() || 'Buenos Aires';
    const hospital = (document.getElementById('pitchHospital')?.value || '').trim() || 'a tertiary hospital';
    const focus = (document.getElementById('pitchFocus')?.value || '').trim() || 'massive ventral defects and parastomal hernias';

    const text = `Hi, I am Doctor Dani Castillo, a general surgeon from ${city}, Argentina. Back home, I work at ${hospital} and focus heavily on abdominal wall reconstruction and complex incisional hernias. I am here doing an observership with Doctor Novitsky because we routinely perform his TAR technique in our unit, and watching how your team manages ${focus} in person is an incredible opportunity. I am really grateful to be in the O. R. with you today. Please let me know where I can stand so I stay completely out of your way.`;
    window.speakText(text, rate, btn);
  };

  // 60-Second Elevator Pitch Timer
  window.togglePitchTimer = function () {
    const displayEl = document.getElementById('pitchTimerDisplay');
    const btnEl = document.getElementById('pitchTimerBtn');
    if (pitchTimerInterval) {
      clearInterval(pitchTimerInterval);
      pitchTimerInterval = null;
      if (btnEl) btnEl.textContent = '▶ Reanudar Cronómetro (60s)';
      return;
    }

    if (pitchSecondsLeft <= 0) pitchSecondsLeft = 60;
    if (btnEl) btnEl.textContent = '⏸ Pausar';

    pitchTimerInterval = setInterval(() => {
      pitchSecondsLeft--;
      const secs = String(Math.max(0, pitchSecondsLeft)).padStart(2, '0');
      if (displayEl) displayEl.textContent = `00:${secs}`;
      if (pitchSecondsLeft <= 0) {
        clearInterval(pitchTimerInterval);
        pitchTimerInterval = null;
        if (btnEl) btnEl.textContent = '↺ Reiniciar 60s';
        window.speakText("Time is up! Great sixty-second pitch.", 0.96);
      }
    }, 1000);
  };

  window.resetPitchTimer = function () {
    if (pitchTimerInterval) {
      clearInterval(pitchTimerInterval);
      pitchTimerInterval = null;
    }
    pitchSecondsLeft = 60;
    const displayEl = document.getElementById('pitchTimerDisplay');
    if (displayEl) displayEl.textContent = '01:00';
    const btnEl = document.getElementById('pitchTimerBtn');
    if (btnEl) btnEl.textContent = '⏱️ Iniciar Práctica de 60s';
  };

  window.playFullLiveNarration = function (btn) {
    const text = "We start with a midline laparotomy incision and carefully perform adhesiolysis to free the bowel loops from the hernia sac. Here, the surgeon incises the posterior rectus sheath just lateral to the linea alba and develops the retrorectus plane toward the linea semilunaris. Notice how they identify and preserve the neurovascular bundles, incise the posterior lamella of the internal oblique, and divide the transversus abdominis muscle fibers. This allows blunt dissection laterally into the preperitoneal space, completely off-loading tension. Next, they approximate and close the posterior layer in the midline. Finally, a large synthetic mesh is placed in the retromuscular sublay plane, followed by a tension-free primary fascial closure of the anterior sheath.";
    window.speakText(text, 0.94, btn);
  };

  // Render Videos in Tab 4
  function renderVideos() {
    const container = document.getElementById('videoGalleryContainer');
    if (!container || !window.VIDEOS) return;

    container.innerHTML = window.VIDEOS.map(v => `
      <div class="video-card">
        <div class="video-iframe-wrap">
          <iframe
            src="https://www.youtube.com/embed/${v.id}?rel=0"
            title="${v.title.replace(/"/g, '&quot;')}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div class="video-card-body">
          <div>
            <span class="sec-badge ${v.level.toLowerCase()}">Video ${v.level}</span>
            <h4 style="display:inline;">${v.title}</h4>
          </div>
          <p>${v.desc}</p>
          <div style="font-size:0.8rem; background:#f0fdfa; border-left:3px solid var(--primary); padding:6px 8px; border-radius:4px;">
            🎯 <strong>Actividad:</strong> ${v.task}
          </div>
          <a class="video-link" href="${v.url}" target="_blank" rel="noopener noreferrer">
            ▶️ Abrir en YouTube (Enlace Verificado)
          </a>
        </div>
      </div>
    `).join('');
  }

  // Render Dialogues inside the 5 Classes
  function renderClassDialogues() {
    if (!window.DIALOGUES) return;
    Object.keys(window.DIALOGUES).forEach(key => {
      const container = document.getElementById(`dialogue-${key}`);
      if (!container) return;
      const lines = window.DIALOGUES[key];
      const rowsHtml = lines.map(line => `
        <div class="dialogue-line">
          <span class="speaker-tag speaker-${line.role}">${line.speaker}</span>
          <div style="flex:1; font-size:0.9rem;">${line.text}</div>
          <button class="mini-play" onclick="speakText('${line.text.replace(/'/g, "\\'")}', 0.95, this)">🔊</button>
        </div>
      `).join('');

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
          <strong style="font-size:0.88rem; color:var(--primary-dark);">🎧 Diálogo Clínico en Inglés Americano (2 Voces)</strong>
          <button class="btn-audio" style="padding:6px 12px; font-size:0.8rem;" onclick="playClassDialogue('${key}', this)">
            ▶ Escuchar Diálogo Completo
          </button>
        </div>
        ${rowsHtml}
      `;
    });
  }

  window.playClassDialogue = function (key, btn) {
    if (!window.DIALOGUES || !window.DIALOGUES[key]) return;
    window.playDialogueLines(window.DIALOGUES[key], btn);
  };

  window.toggleClassComplete = function (classNum, btn) {
    if (completedClasses.has(classNum)) {
      completedClasses.delete(classNum);
    } else {
      completedClasses.add(classNum);
    }
    localStorage.setItem('tar_classes_v1', JSON.stringify([...completedClasses]));
    updateClassButtons();
    updateDashboardStats();
  };

  function updateClassButtons() {
    document.querySelectorAll('.btn-complete-class').forEach(btn => {
      const num = parseInt(btn.dataset.classnum, 10);
      if (completedClasses.has(num)) {
        btn.textContent = '✓ Clase Completada';
        btn.style.background = 'var(--success)';
        btn.style.color = '#fff';
      } else {
        btn.textContent = '○ Marcar Clase Completada';
        btn.style.background = '#e2e8f0';
        btn.style.color = 'var(--text)';
      }
    });
  }

  // Render Interactive Exercises (Tab 5)
  function renderExercises() {
    if (!window.EXERCISES) return;

    // Part A: Error Correction
    const partAContainer = document.getElementById('exPartAContainer');
    if (partAContainer) {
      partAContainer.innerHTML = window.EXERCISES.partA.map((item, idx) => `
        <div class="exercise-item" id="wrap-${item.id}">
          <div>
            <span class="sec-badge a1">A1.${idx + 1}</span>
            <strong>Oración con 2 errores:</strong> <em>"${item.wrong}"</em>
          </div>
          <div style="font-size:0.8rem; color:var(--muted); margin-top:3px;">${item.hint}</div>
          <input type="text" class="ex-input" id="input-${item.id}" placeholder="Escribe la oración corregida aquí..." />
          <div class="ex-feedback" id="fb-${item.id}"></div>
        </div>
      `).join('');
    }

    // Part B: Match the Action
    const partBContainer = document.getElementById('exPartBContainer');
    if (partBContainer) {
      partBContainer.innerHTML = window.EXERCISES.partB.map((item, idx) => `
        <div class="exercise-item">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <div>
              <span class="sec-badge b1">B1.${idx + 1}</span>
              <strong>${item.term}</strong>
              <button class="mini-play" onclick="speakText('${item.speak}', 0.95, this)">🔊</button>
            </div>
            <select class="ex-select" id="select-${item.id}">
              ${item.options.map(o => `<option value="${o.val}">${o.label}</option>`).join('')}
            </select>
          </div>
          <div class="ex-feedback" id="fb-${item.id}"></div>
        </div>
      `).join('');
    }

    // Part C: Clinical & TAR Multiple Choice
    const partCContainer = document.getElementById('exPartCContainer');
    if (partCContainer) {
      partCContainer.innerHTML = window.EXERCISES.partC.map((item, idx) => `
        <div class="exercise-item">
          <div>
            <span class="sec-badge ${item.level.toLowerCase()}">${item.level}.${idx + 1}</span>
            <strong>${item.q}</strong>
            <button class="mini-play" onclick="speakText('${item.speak.replace(/'/g, "\\'")}', 0.95, this)">🔊</button>
          </div>
          <div class="mcq-options" id="mcq-${item.id}">
            ${item.options.map((opt, oIdx) => `
              <label class="mcq-label" id="lbl-${item.id}-${oIdx}">
                <input type="radio" name="radio-${item.id}" value="${oIdx}" />
                <span>${opt}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  }

  function normalizeAnswer(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[.!?]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  window.checkAllExercises = function () {
    let total = 0;
    let correct = 0;

    // Check Part A
    window.EXERCISES.partA.forEach(item => {
      total++;
      const inputEl = document.getElementById(`input-${item.id}`);
      const fbEl = document.getElementById(`fb-${item.id}`);
      const userVal = normalizeAnswer(inputEl.value);
      const isOk = item.accepted.some(acc => normalizeAnswer(acc) === userVal);

      inputEl.classList.toggle('correct', isOk);
      inputEl.classList.toggle('incorrect', !isOk);
      if (isOk) {
        correct++;
        fbEl.style.color = 'var(--success)';
        fbEl.innerHTML = `✓ ¡Correcto! <button class="mini-play" onclick="speakText('${item.canonical.replace(/'/g, "\\'")}', 0.95, this)">🔊 Escuchar</button>`;
      } else {
        fbEl.style.color = 'var(--danger)';
        fbEl.innerHTML = `✗ Revisa los 2 errores. Modelo: <em>"${item.canonical}"</em> <button class="mini-play" onclick="speakText('${item.canonical.replace(/'/g, "\\'")}', 0.95, this)">🔊</button>`;
      }
    });

    // Check Part B
    window.EXERCISES.partB.forEach(item => {
      total++;
      const selEl = document.getElementById(`select-${item.id}`);
      const fbEl = document.getElementById(`fb-${item.id}`);
      const isOk = selEl.value === item.correct;

      selEl.classList.toggle('correct', isOk);
      selEl.classList.toggle('incorrect', !isOk);
      if (isOk) {
        correct++;
        fbEl.style.color = 'var(--success)';
        fbEl.textContent = '✓ ¡Correcto!';
      } else {
        fbEl.style.color = 'var(--danger)';
        fbEl.textContent = `✗ Respuesta correcta: opción (${item.correct}).`;
      }
    });

    // Check Part C
    window.EXERCISES.partC.forEach(item => {
      total++;
      const checked = document.querySelector(`input[name="radio-${item.id}"]:checked`);
      const chosenIdx = checked ? parseInt(checked.value, 10) : -1;
      const isOk = chosenIdx === item.correctIndex;
      if (isOk) correct++;

      item.options.forEach((_, oIdx) => {
        const lbl = document.getElementById(`lbl-${item.id}-${oIdx}`);
        lbl.classList.remove('correct', 'incorrect');
        if (oIdx === item.correctIndex && chosenIdx !== -1) {
          lbl.classList.add('correct');
        } else if (oIdx === chosenIdx && !isOk) {
          lbl.classList.add('incorrect');
        }
      });
    });

    const pct = Math.round((correct / total) * 100);
    localStorage.setItem('tar_best_score', String(pct));
    const scoreEl = document.getElementById('exerciseScorePill');
    if (scoreEl) {
      scoreEl.textContent = `Puntaje: ${correct} / ${total} (${pct}%)`;
    }
    updateDashboardStats();
  };

  window.fillShowAnswers = function () {
    window.EXERCISES.partA.forEach(item => {
      const inputEl = document.getElementById(`input-${item.id}`);
      if (inputEl) inputEl.value = item.canonical;
    });
    window.EXERCISES.partB.forEach(item => {
      const selEl = document.getElementById(`select-${item.id}`);
      if (selEl) selEl.value = item.correct;
    });
    window.EXERCISES.partC.forEach(item => {
      const radios = document.querySelectorAll(`input[name="radio-${item.id}"]`);
      if (radios[item.correctIndex]) radios[item.correctIndex].checked = true;
    });
    window.checkAllExercises();
  };

  window.resetAllExercises = function () {
    document.querySelectorAll('.ex-input').forEach(el => {
      el.value = '';
      el.classList.remove('correct', 'incorrect');
    });
    document.querySelectorAll('.ex-select').forEach(el => {
      el.value = '';
      el.classList.remove('correct', 'incorrect');
    });
    document.querySelectorAll('.ex-feedback').forEach(el => {
      el.textContent = '';
    });
    document.querySelectorAll('.mcq-label').forEach(el => {
      el.classList.remove('correct', 'incorrect');
    });
    document.querySelectorAll('input[type="radio"]').forEach(el => {
      el.checked = false;
    });
    const scoreEl = document.getElementById('exerciseScorePill');
    if (scoreEl) scoreEl.textContent = 'Puntaje: — / 13';
  };

  function updateDashboardStats() {
    const statCardsEl = document.getElementById('statFlashcards');
    if (statCardsEl) statCardsEl.textContent = `${learnedIds.size} / ${(window.CARDS || []).length}`;

    const statClassesEl = document.getElementById('statClasses');
    if (statClassesEl) statClassesEl.textContent = `${completedClasses.size} / 5`;

    const bestScore = localStorage.getItem('tar_best_score');
    const statScoreEl = document.getElementById('statScore');
    if (statScoreEl) statScoreEl.textContent = bestScore ? `${bestScore}%` : 'Pendiente';
  }

  // Case presentation writing pad
  function initCasePad() {
    const pad = document.getElementById('casePresentationPad');
    const wc = document.getElementById('caseWordCount');
    if (!pad || !wc) return;
    pad.value = localStorage.getItem('tar_case_draft') || '';
    const updateCount = () => {
      const words = pad.value.trim() ? pad.value.trim().split(/\s+/).length : 0;
      wc.textContent = `${words} palabras`;
      localStorage.setItem('tar_case_draft', pad.value);
    };
    pad.addEventListener('input', updateCount);
    updateCount();
  }

  window.speakUserCaseDraft = function (btn) {
    const pad = document.getElementById('casePresentationPad');
    const text = (pad?.value || '').trim();
    if (!text) {
      window.speakText("Please write or load the model clinical case first so I can read it aloud in American English.", 0.95, btn);
      return;
    }
    window.speakText(text, 0.95, btn);
  };

  window.loadModelCaseDraft = function () {
    const pad = document.getElementById('casePresentationPad');
    if (!pad) return;
    pad.value = "Dr. Novitsky, I'd like to share a complex case from our unit in Argentina. The patient is a 62-year-old male with a recurrent midline incisional hernia following an emergency Hartmann's procedure. On axial CT scan, the transverse defect width was 16 centimeters with loss of domain. Four weeks preoperatively, we administered bilateral ultrasound-guided Botox injections into the external oblique, internal oblique, and transversus abdominis muscles. Intraoperatively, we performed a complete adhesiolysis, developed the retrorectus Rives-Stoppa plane, preserved the neurovascular bundles, and completed a bilateral TAR. We closed the posterior layer with 2-0 Vicryl, placed a 30 by 30 centimeter polypropylene sublay mesh, and achieved tension-free primary fascial closure of the linea alba.";
    pad.dispatchEvent(new Event('input'));
  };

  // Touch swipe & keyboard support
  function initInteractions() {
    let touchStartX = 0;
    const sceneEl = document.querySelector('.scene');
    if (sceneEl) {
      sceneEl.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      sceneEl.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) window.nextCard();
          else window.prevCard();
        }
      }, { passive: true });
    }

    document.addEventListener('keydown', e => {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;
      const fcTab = document.getElementById('tab-flashcards');
      if (!fcTab || !fcTab.classList.contains('active')) return;

      if (e.key === 'ArrowRight') window.nextCard();
      else if (e.key === 'ArrowLeft') window.prevCard();
      else if (e.key === ' ') {
        e.preventDefault();
        window.flipCard();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderTarSteps();
    renderVideos();
    renderClassDialogues();
    renderExercises();
    updateClassButtons();
    window.updateElevatorPitch();
    initCasePad();
    initInteractions();
    window.renderCard();
    updateDashboardStats();
  });
})();
