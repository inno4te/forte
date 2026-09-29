/* =================================================================
   TEAM21 ACADEMY — APP MODULE (v2: Persistence + Stars + Deep UX)
   ================================================================= */

const STORAGE_KEY = 'team21_academy_progress_v1';

const APP = {
  state: {
    page: 'landing',
    user: { name: 'Student', initials: 'ST', age: null, group: null, xp: 0, streak: 1, lastVisit: null },
    currentGroup: null,
    currentCourse: null,
    currentLesson: null,
    currentStep: 0,
    testKey: null,
    testAnswers: {},
    testTimer: null,
    completedCourses: [],      // course ids fully certified
    quizAnswered: {},          // { "courseId_stepIndex": selectedOptionIndex }
    lessonProgress: {},        // { courseId: highestStepIndexReached }
    labStars: {},              // { courseId: starsEarned (0-3) }
    lastPosition: null,        // { courseId, stepIndex } for "continue" banner
  },

  /* ─── PERSISTENCE ────────────────────────── */
  save() {
    try {
      const snapshot = {
        user: this.state.user,
        completedCourses: this.state.completedCourses,
        quizAnswered: this.state.quizAnswered,
        lessonProgress: this.state.lessonProgress,
        labStars: this.state.labStars,
        lastPosition: this.state.lastPosition,
        currentGroupId: this.state.currentGroup?.id || null,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch (e) { /* localStorage unavailable — fail silently, app still works in-session */ }
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      Object.assign(this.state.user, data.user || {});
      this.state.completedCourses = data.completedCourses || [];
      this.state.quizAnswered = data.quizAnswered || {};
      this.state.lessonProgress = data.lessonProgress || {};
      this.state.labStars = data.labStars || {};
      this.state.lastPosition = data.lastPosition || null;
      if (data.currentGroupId) {
        this.state.currentGroup = T21.ageGroups.find(g => g.id === data.currentGroupId) || null;
      }
      // Streak logic: compare lastVisit date to today
      const today = new Date().toDateString();
      if (this.state.user.lastVisit && this.state.user.lastVisit !== today) {
        const last = new Date(this.state.user.lastVisit);
        const diffDays = Math.round((new Date(today) - last) / 86400000);
        if (diffDays === 1) this.state.user.streak = (this.state.user.streak || 1) + 1;
        else if (diffDays > 1) this.state.user.streak = 1;
      }
      this.state.user.lastVisit = today;
      this.save();
      return true;
    } catch (e) { return false; }
  },

  /* ─── NAVIGATION ─────────────────────────── */
  go(page, params = {}) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById('page-' + page);
    if (el) el.classList.add('active');
    this.state.page = page;
    window.scrollTo(0, 0);
    Object.assign(this.state, params);
    this.render(page, params);
    this.syncSidebar(page);
  },

  syncSidebar(page) {
    document.querySelectorAll('.sidebar-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });
  },

  render(page, params) {
    const fn = this['render_' + page.replace(/-/g, '_')];
    if (fn) fn.call(this, params);
  },

  buildStars() {
    const c = document.getElementById('hero-stars');
    if (!c || c.children.length) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      const sz = Math.random() * 2.5 + .8;
      s.style.cssText = `position:absolute;background:#fff;border-radius:50%;width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${Math.random()*.6+.1};animation:twinkle ${2+Math.random()*3}s ${Math.random()*3}s infinite alternate`;
      c.appendChild(s);
    }
  },

  /* ─── LANDING ────────────────────────────── */
  render_landing() {
    this.buildStars();
    const grid = document.getElementById('age-tiles-grid');
    if (!grid) return;
    grid.innerHTML = T21.ageGroups.map(g => `
      <div class="age-tile ${g.css}" onclick="APP.selectGroup('${g.id}')">
        <span class="at-icon float">${g.icon}</span>
        <span class="at-badge ${g.badgeCss}">Ages ${g.ages}</span>
        <h3>${g.label}</h3>
        <p>${g.desc}</p>
        <div class="at-langs">
          ${g.langs.map((l,i)=>`<span class="at-pill ${g.pillCss[i]}">${l}</span>`).join('')}
        </div>
      </div>`).join('');
  },

  selectGroup(groupId) {
    const group = T21.ageGroups.find(g => g.id === groupId);
    this.state.currentGroup = group;
    this.state.user.group = group;
    this.save();
    this.go('globe', { group });
  },

  /* ─── GLOBE ──────────────────────────────── */
  render_globe({ group } = {}) {
    const g = group || this.state.currentGroup;
    if (!g) return;
    const el = document.getElementById('globe-group-name');
    if (el) el.textContent = `Welcome, ${g.label}! (Ages ${g.ages})`;
    const sub = document.getElementById('globe-sub');
    if (sub) sub.textContent = `You're about to join millions of young coders building the future. Here's why coding matters for you:`;
  },

  /* ─── COURSES ─────────────────────────────── */
  render_courses() {
    const g = this.state.currentGroup;
    const title = document.getElementById('courses-page-title');
    const sub = document.getElementById('courses-page-sub');
    const grid = document.getElementById('courses-main-grid');
    if (!grid) return;

    let courses;
    if (g) {
      if (title) title.textContent = `${g.label} — Choose Your Course`;
      if (sub) sub.textContent = `${g.ages} year olds · ${(T21.courses[g.id]||[]).length} courses available`;
      courses = T21.courses[g.id] || [];
    } else {
      if (title) title.textContent = `All Courses`;
      if (sub) sub.textContent = `Browse every course across all age groups · ${T21.allCourses().length} total`;
      courses = T21.allCourses();
    }

    grid.innerHTML = courses.map(c => {
      const highestStep = this.state.lessonProgress[c.id] || 0;
      const isCert = this.state.completedCourses.includes(c.id);
      const prog = isCert ? 100 : Math.round((highestStep / c.lessons) * 100);
      const stars = this.state.labStars[c.id] || 0;
      const featuredBadge = c.featured ? `<span class="badge badge-gold">✨ Flagship</span>` : '';
      return `
      <div class="course-card card-lift" onclick="APP.openCourse('${c.id}')">
        <div class="cc-banner ${c.banner}">
          <span>${c.icon}</span>
          <span class="cc-badge">${c.level}</span>
        </div>
        <div class="cc-body">
          <h3>${c.title} ${isCert ? '🏆' : ''}</h3>
          <p>${c.desc}</p>
          <div class="cc-meta">
            <span class="badge ${T21.levelBadge[c.level]||'badge-blue'}">${c.level}</span>
            <span class="badge badge-teal">Ages ${c.age}</span>
            <span class="badge badge-purple">${c.lang}</span>
            ${featuredBadge}
          </div>
          <div style="font-size:.7rem;color:var(--text3);margin-top:.5rem">📖 ${c.lessons} lessons · ⏱️ ${c.est}${stars ? ' · ' + '⭐'.repeat(stars) : ''}</div>
          <div class="cc-progress">
            <div class="cc-progress-label"><span>Progress</span><span>${prog}%</span></div>
            <div class="progress-track"><div class="progress-fill ${isCert?'gold':''}" style="width:${prog}%"></div></div>
          </div>
        </div>
      </div>`;
    }).join('');
  },

  openCourse(courseId) {
    const course = T21.findCourse(courseId);
    this.state.currentCourse = course;
    // Resume from saved progress, or start at 0
    const saved = this.state.lessonProgress[courseId];
    this.state.currentStep = (typeof saved === 'number') ? saved : 0;
    this.go('lesson', { courseId });
  },

  /* ─── LESSON ──────────────────────────────── */
  render_lesson({ courseId } = {}) {
    const id = courseId || this.state.currentCourse?.id;
    const data = T21.lessons[id] || T21.lessons['scratch'];
    this.state.currentLesson = data;
    if (!this.state.currentCourse || this.state.currentCourse.id !== id) {
      this.state.currentCourse = T21.findCourse(id);
    }
    this._renderLessonStep();
  },

  _renderLessonStep() {
    const data = this.state.currentLesson;
    const steps = data.steps;
    const step  = steps[this.state.currentStep];
    const course = this.state.currentCourse;

    const titleEl = document.getElementById('lesson-page-title');
    if (titleEl) titleEl.textContent = data.title;
    const subEl = document.getElementById('lesson-page-sub');
    if (subEl) subEl.textContent = `${data.subtitle || ''} · Step ${this.state.currentStep+1} of ${steps.length}`;

    const main = document.getElementById('lesson-main-content');
    if (!main) return;

    const codeSection = step.code
      ? `<div class="code-block"><span class="cb-lang">${course?.lang||'code'}</span>${step.code}</div>`
      : (step.visual
        ? `<div style="background:#030810;border:1px solid rgba(79,142,247,.2);border-radius:.9rem;padding:1.1rem 1.3rem;margin:.8rem 0;font-family:'JetBrains Mono',monospace;font-size:.82rem;color:#93c5fd;white-space:pre;overflow-x:auto;line-height:1.75">${step.visual}</div>`
        : '');

    const historyNote = step.history && T21.history[step.history]
      ? this._renderHistoryCard(T21.history[step.history])
      : '';

    const qid = `${course?.id}_${this.state.currentStep}`;
    const alreadyAnswered = this.state.quizAnswered[qid];

    main.innerHTML = `
      <div class="lesson-card">
        <h3>${step.h}</h3>
        <p>${step.p}</p>
        ${codeSection}
        <div class="fun-fact"><strong>Did you know?</strong> ${step.fact}</div>
        ${step.challenge ? `<div class="challenge-box"><h4>🚀 ${step.challenge.t}</h4><p>${step.challenge.d}</p></div>` : ''}
      </div>

      ${historyNote}

      <div class="lesson-card" id="quiz-card-${qid}">
        <h3>🎯 Quick Check</h3>
        <p style="font-size:.95rem;font-weight:600;color:var(--text);margin-bottom:1rem">${step.quiz.q}</p>
        ${step.quiz.opts.map((o,i)=>`
          <div class="quiz-option ${alreadyAnswered !== undefined ? (i===step.quiz.ans?'correct':i===alreadyAnswered?'wrong':'disabled') : ''}"
               id="qopt_${qid}_${i}"
               onclick="APP.answerQuiz('${qid}', ${i}, ${step.quiz.ans})">
            <div class="quiz-letter">${String.fromCharCode(65+i)}</div>${o}
          </div>`).join('')}
        <div class="q-feedback" id="qfb_${qid}" style="margin-top:.7rem;font-size:.88rem;font-weight:600;min-height:22px">
          ${alreadyAnswered !== undefined
            ? (alreadyAnswered === step.quiz.ans
              ? '<span style="color:var(--green)">✅ Correct! Brilliant work! 🚀</span>'
              : '<span style="color:var(--red)">❌ Not quite — check the highlighted answer and keep going!</span>')
            : ''}
        </div>
      </div>

      <div class="lesson-step-nav">
        ${this.state.currentStep > 0
          ? `<button class="btn btn-ghost btn-sm" onclick="APP.stepLesson(-1)">← Previous</button>`
          : '<span></span>'}
        <div class="lesson-step-progress">
          ${data.steps.map((_,i)=>`<div class="step-dot ${i<this.state.currentStep?'done':i===this.state.currentStep?'active':''}"></div>`).join('')}
        </div>
        ${this.state.currentStep < steps.length - 1
          ? `<button class="btn btn-primary btn-sm" onclick="APP.stepLesson(1)">Next →</button>`
          : (course?.labEnabled
              ? `<button class="btn btn-green btn-sm" onclick="APP.go('lab',{courseId:'${course.id}'})">🧪 Go to Lab</button>`
              : `<button class="btn btn-gold btn-sm" onclick="APP.go('cert-input')">🏆 Certify Me!</button>`)}
      </div>`;

    // Track progress for "continue where you left off" + course completion bar
    const cid = course?.id;
    if (cid) {
      const prevMax = this.state.lessonProgress[cid] || 0;
      this.state.lessonProgress[cid] = Math.max(prevMax, this.state.currentStep);
      this.state.lastPosition = { courseId: cid, stepIndex: this.state.currentStep, courseTitle: course.title };
      this.save();
    }

    this._renderLessonSidebar(data, steps);
  },

  _renderHistoryCard(h) {
    return `
      <div class="history-card">
        <div class="history-ribbon">⏳ TIME CAPSULE</div>
        <div class="history-content">
          <div class="history-year">${h.year}</div>
          <div class="history-icon">${h.icon}</div>
          <div class="history-text">
            <h4>${h.title}</h4>
            <p>${h.text}</p>
          </div>
        </div>
      </div>`;
  },

  _renderLessonSidebar(data, steps) {
    const sb = document.getElementById('lesson-sidebar-content');
    if (!sb) return;
    const course = this.state.currentCourse;
    sb.innerHTML = `
      <div class="lab-panel-card">
        <div class="lab-panel-header">📋 Course Outline</div>
        <div class="lab-panel-body" style="padding:.5rem">
          ${steps.map((s,i)=>`
            <div onclick="APP.jumpToStep(${i})"
                 style="display:flex;align-items:center;gap:.6rem;padding:.5rem .6rem;border-radius:.5rem;cursor:pointer;transition:.2s;margin-bottom:.15rem;
                 background:${i===this.state.currentStep?'rgba(79,142,247,.12)':'transparent'};
                 color:${i===this.state.currentStep?'var(--brand)':i<this.state.currentStep?'var(--green)':'var(--text2)'}">
              <span style="font-size:.7rem;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                background:${i<this.state.currentStep?'rgba(52,211,153,.2)':i===this.state.currentStep?'rgba(79,142,247,.2)':'rgba(255,255,255,.05)'};
                flex-shrink:0;font-weight:800">
                ${i<this.state.currentStep?'✓':i+1}
              </span>
              <span style="font-size:.8rem;font-weight:${i===this.state.currentStep?'700':'500'}">${s.h.replace(/^[^\s]+\s/,'')}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="lab-panel-card">
        <div class="lab-panel-header">⚡ Quick Actions</div>
        <div class="lab-panel-body" style="display:flex;flex-direction:column;gap:.5rem">
          ${course?.labEnabled
            ? `<button class="btn btn-ghost btn-sm" onclick="APP.go('lab',{courseId:'${course?.id}'})" style="width:100%;justify-content:flex-start;gap:.5rem">🧪 Open Code Lab ${this.state.labStars[course?.id] ? '⭐'.repeat(this.state.labStars[course.id]) : ''}</button>`
            : ''}
          <button class="btn btn-ghost btn-sm" onclick="APP.go('courses')" style="width:100%;justify-content:flex-start;gap:.5rem">📚 All Courses</button>
          <button class="btn btn-gold btn-sm" onclick="APP.go('cert-input')" style="width:100%;justify-content:flex-start;gap:.5rem">🏆 Get Certified</button>
        </div>
      </div>
      <div class="lab-panel-card">
        <div class="lab-panel-header">🌐 External Resources</div>
        <div class="lab-panel-body" style="display:flex;flex-direction:column;gap:.4rem">
          <a href="https://scratch.mit.edu" target="_blank" style="font-size:.8rem;color:var(--brand);display:flex;align-items:center;gap:.4rem">🐱 scratch.mit.edu</a>
          <a href="https://repl.it" target="_blank" style="font-size:.8rem;color:var(--brand);display:flex;align-items:center;gap:.4rem">💻 repl.it — Online IDE</a>
          <a href="https://code.org" target="_blank" style="font-size:.8rem;color:var(--brand);display:flex;align-items:center;gap:.4rem">🎯 code.org — Puzzles</a>
          <a href="https://w3schools.com" target="_blank" style="font-size:.8rem;color:var(--brand);display:flex;align-items:center;gap:.4rem">📖 W3Schools — Web Ref</a>
        </div>
      </div>`;
  },

  jumpToStep(i) {
    this.state.currentStep = i;
    this._renderLessonStep();
  },

  stepLesson(dir) {
    const max = this.state.currentLesson?.steps.length - 1;
    this.state.currentStep = Math.max(0, Math.min(max, this.state.currentStep + dir));
    this._renderLessonStep();
  },

  answerQuiz(qid, selected, correct) {
    if (this.state.quizAnswered[qid] !== undefined) return;
    this.state.quizAnswered[qid] = selected;
    this.save();
    document.querySelectorAll(`[id^="qopt_${qid}_"]`).forEach((el, i) => {
      if (i === correct) el.classList.add('correct');
      else if (i === selected) el.classList.add('wrong');
      else el.classList.add('disabled');
    });
    const fb = document.getElementById(`qfb_${qid}`);
    if (fb) fb.innerHTML = selected === correct
      ? '<span style="color:var(--green)">✅ Correct! Brilliant work! 🚀</span>'
      : '<span style="color:var(--red)">❌ Not quite — check the highlighted answer and keep going!</span>';
    if (selected === correct) this.addXP(20);
  },

  addXP(amount) {
    this.state.user.xp += amount;
    this.save();
    this.toast(`+${amount} XP earned! 🌟`);
  },

  /* ─── LAB ────────────────────────────────── */
  render_lab({ courseId } = {}) {
    const id = courseId || this.state.currentCourse?.id;
    const course = T21.findCourse(id) || this.state.currentCourse;
    this.state.currentCourse = course;

    const title = document.getElementById('lab-page-title');
    if (title) title.textContent = `${course?.title || 'Code'} Lab`;
    const sub = document.getElementById('lab-page-sub');
    if (sub) sub.textContent = `Interactive coding environment · ${course?.lang || 'Code'}`;

    const editor = document.getElementById('lab-editor');
    if (editor) {
      const starter = T21.labStarters[id] || '# Write your code here!\nprint("Hello, World!")';
      editor.textContent = starter;
    }
    const fileTab = document.getElementById('lab-file-tab');
    if (fileTab) {
      const ext = {python1:'main.py',python2:'main.py',python3:'main.py',web:'index.html',clang:'main.c',java:'Main.java',cpp:'main.cpp',robotics:'robot.py',ai:'tokenizer.py'};
      fileTab.textContent = ext[id] || 'main.py';
    }
    document.getElementById('lab-output').innerHTML = '<div class="lab-output-label">OUTPUT</div><span style="color:var(--text3)">Click "Run Code" to see your output here!</span>';

    this._renderLabChallenges(id);
    this._renderLabStars(id);
  },

  _renderLabChallenges(id) {
    const panel = document.getElementById('lab-challenge-panel');
    if (!panel) return;
    const challenges = T21.labChallenges[id] || [];
    panel.innerHTML = challenges.map((c,i)=>`
      <div class="lab-challenge-step" id="lchal_${i}">
        <div class="lab-step-num" id="cstep_${i}">${i+1}</div>
        <span>${c.label}</span>
      </div>`).join('') + `<p style="font-size:.72rem;color:var(--text3);margin-top:.6rem">Complete challenges, then click "Run Code" to check your stars! ⭐</p>`;
  },

  _renderLabStars(id) {
    const starsEl = document.getElementById('lab-stars-display');
    if (!starsEl) return;
    const earned = this.state.labStars[id] || 0;
    starsEl.innerHTML = [1,2,3].map(n => `<span style="font-size:1.4rem;opacity:${n<=earned?'1':'.25'}">⭐</span>`).join('');
  },

  runLab() {
    const editor = document.getElementById('lab-editor');
    const output = document.getElementById('lab-output');
    if (!editor || !output) return;
    const code = editor.textContent || editor.innerText;
    output.innerHTML = '<div class="lab-output-label">OUTPUT</div>';

    const lines = [];
    try {
      const allPrints = [...code.matchAll(/print\s*\((.+?)\)/g)];

      if (allPrints.length === 0) {
        lines.push('<span style="color:var(--text3)">// No print() statements found. Add some output!</span>');
      } else {
        const vars = {};
        const varMatches = [...code.matchAll(/(\w+)\s*=\s*["']([^"']+)["']/g)];
        const numMatches  = [...code.matchAll(/(\w+)\s*=\s*(\d+(?:\.\d+)?)/g)];
        varMatches.forEach(m => { vars[m[1]] = m[2]; });
        numMatches.forEach(m => { if (!vars[m[1]]) vars[m[1]] = m[2]; });

        allPrints.slice(0, 14).forEach(m => {
          let out = m[1].trim();
          out = out.replace(/^f?["']|["']$/g, '');
          out = out.replace(/\{(\w+)(?:[^}]*)?\}/g, (_, v) => vars[v] || v);
          out = out.replace(/\\n/g, '\n');
          lines.push(out);
        });
        if (allPrints.length > 14) lines.push(`... and ${allPrints.length - 14} more lines`);
      }
    } catch(e) {
      lines.push('⚠️ Simulation error. Try an online IDE for full execution!');
    }

    output.innerHTML += lines.map(l => `<div style="margin-bottom:.2rem">${l}</div>`).join('');

    // Evaluate star challenges
    this._evaluateLabStars(code);
    this.toast('Code simulated! Use repl.it for full execution 🚀');
  },

  _evaluateLabStars(code) {
    const id = this.state.currentCourse?.id;
    const challenges = T21.labChallenges[id];
    if (!challenges) return;

    let passedCount = 0;
    challenges.forEach((c, i) => {
      const passed = c.test(code);
      const stepEl = document.getElementById(`cstep_${i}`);
      if (stepEl) stepEl.classList.toggle('done', passed);
      if (passed) passedCount++;
    });

    const prevStars = this.state.labStars[id] || 0;
    if (passedCount > prevStars) {
      this.state.labStars[id] = passedCount;
      this.save();
      this._renderLabStars(id);
      if (passedCount > prevStars) {
        this.showStarReward(passedCount);
        this.addXP(passedCount * 30);
      }
    }
  },

  showStarReward(stars) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(7,16,31,.85);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeOutToast .3s ease 2.4s forwards';
    overlay.innerHTML = `
      <div style="text-align:center;animation:starPop .5s ease">
        <div style="font-size:3.5rem;margin-bottom:.5rem">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div>
        <div style="font-family:var(--font-display);font-size:1.6rem;font-weight:900;color:#fff;margin-bottom:.3rem">
          ${stars === 3 ? 'Perfect Score!' : stars === 2 ? 'Great Job!' : 'Nice Work!'}
        </div>
        <div style="color:var(--text2);font-size:.95rem">You earned ${stars} star${stars>1?'s':''} on this lab! +${stars*30} XP</div>
      </div>`;
    document.body.appendChild(overlay);
    this.launchConfetti();
    setTimeout(() => overlay.remove(), 3000);
  },

  /* ─── DASHBOARD ──────────────────────────── */
  render_dashboard() {
    const user = this.state.user;
    const wbName = document.getElementById('wb-user-name');
    if (wbName) wbName.textContent = user.name !== 'Student' ? user.name : 'there';

    const xpEl = document.getElementById('dash-xp');
    if (xpEl) xpEl.textContent = user.xp;
    const streakEl = document.getElementById('dash-streak');
    if (streakEl) streakEl.textContent = user.streak || 1;
    const certsEl = document.getElementById('dash-certs');
    if (certsEl) certsEl.textContent = this.state.completedCourses.length;

    // Continue banner
    const continueBanner = document.getElementById('continue-banner');
    if (continueBanner) {
      const lp = this.state.lastPosition;
      if (lp) {
        continueBanner.style.display = 'flex';
        document.getElementById('continue-course-title').textContent = lp.courseTitle;
        document.getElementById('continue-step-label').textContent = `Step ${lp.stepIndex + 1}`;
        continueBanner.onclick = () => this.openCourse(lp.courseId);
      } else {
        continueBanner.style.display = 'none';
      }
    }

    const grid = document.getElementById('dash-courses-grid');
    if (!grid) return;
    const allCourses = T21.allCourses().slice(0, 6);
    grid.innerHTML = allCourses.map(c => {
      const highestStep = this.state.lessonProgress[c.id] || 0;
      const isCert = this.state.completedCourses.includes(c.id);
      const prog = isCert ? 100 : Math.round((highestStep / c.lessons) * 100);
      return `
      <div class="course-card card-lift" onclick="APP.openCourse('${c.id}')">
        <div class="cc-banner ${c.banner}"><span>${c.icon}</span><span class="cc-badge">${c.level}</span></div>
        <div class="cc-body">
          <h3>${c.title} ${isCert ? '🏆' : ''}</h3>
          <p>${c.desc}</p>
          <div class="cc-meta">
            <span class="badge ${T21.levelBadge[c.level]||'badge-blue'}">${c.level}</span>
            <span class="badge badge-purple">${c.lang}</span>
          </div>
          <div class="cc-progress">
            <div class="cc-progress-label"><span>Progress</span><span>${prog}%</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:${prog}%"></div></div>
          </div>
        </div>
      </div>`;
    }).join('');
  },

  /* ─── CERTIFICATION INPUT ────────────────── */
  render_cert_input() {
    const sel = document.getElementById('cert-course-select');
    if (!sel) return;
    sel.innerHTML = '';
    T21.allCourses().forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.title} (${c.lang})`;
      sel.appendChild(opt);
    });
    if (this.state.currentCourse) sel.value = this.state.currentCourse.id;
    const nameInput = document.getElementById('cert-name-input');
    if (nameInput && this.state.user.name !== 'Student') nameInput.value = this.state.user.name;
    const ageInput = document.getElementById('cert-age-input');
    if (ageInput && this.state.user.age) ageInput.value = this.state.user.age;
  },

  startTest() {
    const nameEl  = document.getElementById('cert-name-input');
    const ageEl   = document.getElementById('cert-age-input');
    const sel     = document.getElementById('cert-course-select');

    const name    = nameEl?.value.trim();
    const age     = parseInt(ageEl?.value);
    const courseId = sel?.value;

    if (!name) { this.toast('⚠️ Please enter your full name!'); nameEl?.focus(); return; }
    if (!age || age < 6 || age > 18) { this.toast('⚠️ Please enter a valid age (6–18)!'); ageEl?.focus(); return; }

    this.state.user.name = name;
    this.state.user.initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    this.state.user.age = age;
    this.state.testKey = courseId;
    this.save();

    this.state.testCourseName = T21.findCourse(courseId)?.title || courseId;
    this.go('test');
  },

  /* ─── TEST ───────────────────────────────── */
  render_test() {
    const key = this.state.testKey;
    const questions = T21.tests[key] || T21.tests['scratch'];
    this.state.testAnswers = {};

    const heading = document.getElementById('test-page-title');
    if (heading) heading.textContent = `Certification Test — ${this.state.testCourseName}`;
    const sub = document.getElementById('test-page-sub');
    if (sub) sub.textContent = `${questions.length} questions · ${Math.ceil(questions.length*24/60)} min · Good luck, ${this.state.user.name}! 💪`;

    const qDiv = document.getElementById('test-questions-wrap');
    if (!qDiv) return;
    qDiv.innerHTML = questions.map((q, qi) => `
      <div class="test-card">
        <div class="tc-num">Question ${qi+1} of ${questions.length}</div>
        <div class="tc-q">${q.q}</div>
        ${q.opts.map((o, oi) => `
          <div class="test-opt" id="topt_${qi}_${oi}" onclick="APP.selectTestOpt(${qi}, ${oi}, ${q.opts.length})">
            <input type="radio" name="q${qi}" id="tr_${qi}_${oi}" />
            <label for="tr_${qi}_${oi}">${o}</label>
          </div>`).join('')}
      </div>`).join('');

    const totalSecs = questions.length * 24;
    let secs = totalSecs;
    const fill  = document.getElementById('test-timer-fill');
    const label = document.getElementById('test-timer-label');
    if (this.state.testTimer) clearInterval(this.state.testTimer);
    this.state.testTimer = setInterval(() => {
      secs--;
      if (fill)  fill.style.width = (secs/totalSecs*100) + '%';
      if (label) label.textContent = `⏱️ ${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')} remaining`;
      if (secs <= 0) { clearInterval(this.state.testTimer); this.submitTest(); }
    }, 1000);
  },

  selectTestOpt(qi, oi, numOpts) {
    for (let i = 0; i < numOpts; i++) {
      const el = document.getElementById(`topt_${qi}_${i}`);
      if (el) { el.classList.remove('selected'); const inp = el.querySelector('input'); if(inp) inp.checked = false; }
    }
    const el = document.getElementById(`topt_${qi}_${oi}`);
    if (el) { el.classList.add('selected'); const inp = el.querySelector('input'); if(inp) inp.checked = true; }
    this.state.testAnswers[qi] = oi;
  },

  submitTest() {
    clearInterval(this.state.testTimer);
    const questions = T21.tests[this.state.testKey] || T21.tests['scratch'];
    let correct = 0;
    questions.forEach((q, i) => { if (this.state.testAnswers[i] === q.ans) correct++; });
    const score = Math.round(correct / questions.length * 100);
    const passed = score >= 60;
    this.state.testResult = { score, correct, total: questions.length, passed };
    if (passed && !this.state.completedCourses.includes(this.state.testKey)) {
      this.state.completedCourses.push(this.state.testKey);
      this.state.user.xp += 500;
      this.save();
    }
    this.go('certificate');
  },

  /* ─── CERTIFICATE ────────────────────────── */
  render_certificate() {
    const { score, correct, total, passed } = this.state.testResult;
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const now = new Date();
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const certId = 'T21-' + Math.floor(Math.random()*9e5+1e5);

    document.getElementById('cert-student-name').textContent = this.state.user.name;
    document.getElementById('cert-course-name').textContent = this.state.testCourseName;

    const scoreBadge = document.getElementById('cert-score-badge');
    if (scoreBadge) {
      scoreBadge.textContent = `Score: ${correct}/${total} — ${score}%`;
      scoreBadge.style.background = passed ? 'linear-gradient(135deg,#059669,#34d399)' : 'linear-gradient(135deg,#d97706,#fbbf24)';
      scoreBadge.style.color = '#fff';
      scoreBadge.style.borderRadius = '2rem';
      scoreBadge.style.padding = '.35rem 1.5rem';
      scoreBadge.style.fontWeight = '800';
      scoreBadge.style.display = 'inline-block';
    }

    const body = document.getElementById('cert-body-text');
    if (body) body.innerHTML = passed
      ? `has successfully completed all modules, passed the certification assessment, and demonstrated outstanding proficiency in <strong>programming and computational thinking</strong> as required by Team21 Academy 4 Kids.`
      : `participated in the Team21 Academy 4 Kids certification programme and scored ${score}%. We encourage continued study and a retake to achieve full certification.`;

    const dateEl = document.getElementById('cert-date-id');
    if (dateEl) dateEl.textContent = `Issued: ${dateStr}  ·  Certificate ID: ${certId}  ·  Age: ${this.state.user.age}`;

    if (passed) this.launchConfetti();
  },

  /* ─── PROGRESS PAGE ──────────────────────── */
  render_progress() {
    const total = T21.allCourses().length;
    const done  = this.state.completedCourses.length;
    const pct   = Math.round(done / total * 100);
    const bar   = document.getElementById('prog-overall-bar');
    if (bar) bar.style.width = pct + '%';
    const label = document.getElementById('prog-overall-label');
    if (label) label.textContent = `${done} of ${total} courses completed (${pct}%)`;
    const xpEl  = document.getElementById('prog-xp-total');
    if (xpEl) xpEl.textContent = this.state.user.xp + ' XP';
    const certsCount = document.getElementById('prog-certs-count');
    if (certsCount) certsCount.textContent = done;

    // Total stars across all labs
    const totalStars = Object.values(this.state.labStars).reduce((a,b)=>a+b, 0);
    const starsEl = document.getElementById('prog-stars-total');
    if (starsEl) starsEl.textContent = totalStars + ' ⭐';

    // Per-course breakdown
    const breakdown = document.getElementById('prog-course-breakdown');
    if (breakdown) {
      breakdown.innerHTML = T21.allCourses().map(c => {
        const highestStep = this.state.lessonProgress[c.id] || 0;
        const isCert = this.state.completedCourses.includes(c.id);
        const prog = isCert ? 100 : Math.round((highestStep / c.lessons) * 100);
        const stars = this.state.labStars[c.id] || 0;
        return `
        <div style="display:flex;align-items:center;gap:.8rem;padding:.6rem 0;border-bottom:1px solid var(--border)">
          <span style="font-size:1.3rem">${c.icon}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:.85rem;font-weight:700;color:var(--text)">${c.title} ${isCert?'🏆':''}</div>
            <div class="progress-track" style="margin-top:.3rem"><div class="progress-fill ${isCert?'gold':''}" style="width:${prog}%"></div></div>
          </div>
          <div style="font-size:.78rem;color:var(--text2);white-space:nowrap">${prog}%${stars?' · '+'⭐'.repeat(stars):''}</div>
        </div>`;
      }).join('');
    }
  },

  /* ─── UTILITIES ──────────────────────────── */
  toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  },

  launchConfetti() {
    const colours = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff9f43','#c084fc','#fb7185','#34d399','#f472b6','#60a5fa'];
    for (let i = 0; i < 90; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const sz = 6 + Math.random() * 10;
      el.style.cssText = `left:${Math.random()*100}vw;top:-30px;width:${sz}px;height:${sz}px;background:${colours[Math.floor(Math.random()*colours.length)]};border-radius:${Math.random()>.5?'50%':'3px'};animation-delay:${Math.random()*2.5}s;animation-duration:${2.5+Math.random()*2}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }
  },
};

function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}
