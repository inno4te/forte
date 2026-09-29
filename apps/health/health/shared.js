/* ===== Team21 Health Platform — Shared JS ===== */

const T21 = {
  storage: (window.storage && typeof window.storage.set === 'function') ? window.storage : null,
  user: null,
  toast(msg, type){
    const t = document.getElementById('t21-toast') || (function(){
      const el = document.createElement('div');
      el.id='t21-toast'; el.className='toast'; document.body.appendChild(el); return el;
    })();
    t.textContent = msg;
    t.className = 'toast show ' + (type||'');
    clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'),2400);
  },
  todayKey(){ return new Date().toISOString().slice(0,10); },
  uid(){ return (Date.now().toString(36) + Math.random().toString(36).slice(2,8)); },
  async djb2(str){ let h=5381; for(let i=0;i<str.length;i++) h=((h<<5)+h)+str.charCodeAt(i); return (h>>>0).toString(16); },

  /* ---------- AUTH UI ---------- */
  injectAuthModal(){
    if(document.getElementById('authModal')) return;
    const fr = window.T21Lang && T21Lang.current==='fr';
    const tr = (k, en)=> fr && window.FR_UI && FR_UI[k] ? FR_UI[k] : en;
    const m = document.createElement('div');
    m.id = 'authModal';
    m.className = 'modal-backdrop';
    m.innerHTML = `
      <div class="modal">
        <button class="modal-close" id="authClose" aria-label="Close">×</button>
        <h3 id="authTitle">${tr('auth.welcomeBack','Welcome back')}</h3>
        <p class="sub" id="authSub">${tr('auth.signinSub','Sign in to save your work.')}</p>
        <div class="field" id="nameField" style="display:none">
          <label for="authName">${tr('auth.fullName','Full name')}</label>
          <input type="text" id="authName" autocomplete="name" />
        </div>
        <div class="field">
          <label for="authEmail">${tr('auth.email','Email')}</label>
          <input type="email" id="authEmail" autocomplete="email" />
        </div>
        <div class="field">
          <label for="authPass">${tr('auth.password','Password')}</label>
          <input type="password" id="authPass" autocomplete="current-password" />
        </div>
        <div class="auth-msg" id="authMsg"></div>
        <button class="btn btn-primary" id="authSubmit" style="width:100%;margin-top:8px;padding:12px">${tr('auth.signin','Sign in')}</button>
        <div class="auth-switch"><span id="authSwitchText">${tr('auth.newHere','New here? ')}</span><a id="authSwitchLink">${tr('auth.linkCreate','Create an account')}</a></div>
        <p style="margin-top:16px;font-size:11px;color:var(--mute);line-height:1.5;text-align:center">${tr('auth.privacy','Your data is stored privately in your Team21 account. We never share or sell your information.')}</p>
      </div>`;
    document.body.appendChild(m);

    document.getElementById('authClose').addEventListener('click', ()=> this.closeAuth());
    m.addEventListener('click', e=>{ if(e.target.id==='authModal') this.closeAuth(); });
    document.getElementById('authSwitchLink').addEventListener('click', e=>{
      this.setAuthMode(e.target.dataset.mode || 'register');
    });
    document.getElementById('authSubmit').addEventListener('click', ()=> this.submitAuth());
  },
  openAuth(mode){ this.injectAuthModal(); document.getElementById('authModal').classList.add('open'); this.setAuthMode(mode||'login'); },
  closeAuth(){ document.getElementById('authModal').classList.remove('open'); const m=document.getElementById('authMsg'); if(m) m.classList.remove('show'); },
  setAuthMode(mode){
    const fr = window.T21Lang && T21Lang.current==='fr';
    const tr = (k, en)=> fr && window.FR_UI && FR_UI[k] ? FR_UI[k] : en;
    const isReg = mode === 'register';
    document.getElementById('authTitle').textContent = isReg ? tr('auth.create','Create your account') : tr('auth.welcomeBack','Welcome back');
    document.getElementById('authSub').textContent   = isReg ? tr('auth.createSub','A free account saves your tracker, notes and questions.') : tr('auth.signinSub','Sign in to load your tracker, notes and saved items.');
    document.getElementById('nameField').style.display = isReg ? '' : 'none';
    document.getElementById('authSubmit').textContent  = isReg ? tr('auth.createAcc','Create account') : tr('auth.signin','Sign in');
    document.getElementById('authSwitchText').textContent = isReg ? tr('auth.haveAcc','Already have an account? ') : tr('auth.newHere','New here? ');
    const link = document.getElementById('authSwitchLink');
    link.textContent = isReg ? tr('auth.linkSignin','Sign in') : tr('auth.linkCreate','Create an account');
    link.dataset.mode = isReg ? 'login' : 'register';
  },
  flashAuth(msg, ok){
    const e = document.getElementById('authMsg');
    e.textContent = msg; e.classList.toggle('ok', !!ok); e.classList.add('show');
    setTimeout(()=>e.classList.remove('show'), 3000);
  },
  async submitAuth(){
    const fr = window.T21Lang && T21Lang.current==='fr';
    const tr = (k, en)=> fr && window.FR_UI && FR_UI[k] ? FR_UI[k] : en;
    const email = document.getElementById('authEmail').value.trim().toLowerCase();
    const pass  = document.getElementById('authPass').value;
    const name  = document.getElementById('authName').value.trim();
    const isReg = document.getElementById('nameField').style.display !== 'none';
    if(!email || !pass || (isReg && !name)){ this.flashAuth(tr('auth.fillAll','Please fill all fields.')); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ this.flashAuth(tr('auth.validEmail','Enter a valid email.')); return; }
    if(pass.length < 6){ this.flashAuth(tr('auth.passShort','Password must be at least 6 characters.')); return; }

    if(!this.storage){
      this.user = {email, name: name || email.split('@')[0]};
      this.flashAuth(tr('auth.signedIn','Signed in.'), true);
      this.afterAuth();
      return;
    }
    const userKey = `t21:user:${email}`;
    try{
      if(isReg){
        let existing=null; try{ existing = await this.storage.get(userKey); }catch(_){}
        if(existing && existing.value){ this.flashAuth(tr('auth.exists','Account exists. Please sign in.')); return; }
        const hash = await this.djb2(pass);
        await this.storage.set(userKey, JSON.stringify({email, name, hash, created: Date.now()}));
        this.user = {email, name};
        this.flashAuth(tr('auth.created','Account created.'), true);
      } else {
        let r=null; try{ r = await this.storage.get(userKey); }catch(_){}
        if(!r || !r.value){ this.flashAuth(tr('auth.noAccount','No account found for that email.')); return; }
        const data = JSON.parse(r.value);
        const hash = await this.djb2(pass);
        if(hash !== data.hash){ this.flashAuth(tr('auth.wrongPass','Incorrect password.')); return; }
        this.user = {email: data.email, name: data.name};
        this.flashAuth(tr('auth.signedIn','Signed in.'), true);
      }
      try{ await this.storage.set('t21:session', JSON.stringify(this.user)); }catch(_){}
      this.afterAuth();
    } catch(err){ this.flashAuth('Storage error — try again.'); }
  },
  afterAuth(){
    setTimeout(()=> this.closeAuth(), 500);
    this.renderUserBadge();
    if(typeof window.onUserAuthChange === 'function') window.onUserAuthChange(this.user);
  },
  async signOut(){
    const fr = window.T21Lang && T21Lang.current==='fr';
    this.user = null;
    if(this.storage){ try{ await this.storage.delete('t21:session'); }catch(_){} }
    this.renderUserBadge();
    if(typeof window.onUserAuthChange === 'function') window.onUserAuthChange(null);
    this.toast(fr ? 'Déconnecté' : 'Signed out');
  },
  renderUserBadge(){
    const nav = document.getElementById('navCta');
    if(!nav) return;
    const fr = window.T21Lang && T21Lang.current==='fr';
    // Preserve language toggle if present
    const langToggle = document.getElementById('langToggle');
    nav.innerHTML = '';
    if(langToggle) nav.appendChild(langToggle);
    if(!this.user){
      const wrap = document.createElement('span');
      wrap.innerHTML = `
        <button class="btn btn-sm" id="loginBtn">${fr?'Se connecter':'Sign In'}</button>
        <button class="btn btn-sm btn-primary" id="registerBtn">${fr?'Créer un compte':'Create Account'}</button>`;
      while(wrap.firstChild) nav.appendChild(wrap.firstChild);
      document.getElementById('loginBtn').addEventListener('click', ()=> this.openAuth('login'));
      document.getElementById('registerBtn').addEventListener('click', ()=> this.openAuth('register'));
      return;
    }
    const initials = (this.user.name || this.user.email).split(/[\s@]/).filter(Boolean).map(s=>s[0]).slice(0,2).join('').toUpperCase();
    const badge = document.createElement('div');
    badge.className = 'user-badge';
    badge.innerHTML = `<div class="user-avatar">${initials}</div>
                       <div><div class="name">${this.user.name || this.user.email.split('@')[0]}</div></div>
                       <button class="logout" id="logoutBtn">${fr?'Se déconnecter':'Sign out'}</button>`;
    nav.appendChild(badge);
    document.getElementById('logoutBtn').addEventListener('click', ()=> this.signOut());
  },

  /* ---------- NAV INJECTOR ---------- */
  injectNav(activePath){
    const fr = window.T21Lang && T21Lang.current==='fr';
    const tr = (k, en)=> (fr && window.FR_UI && FR_UI[k]) ? FR_UI[k] : en;
    // Grouped navigation: dropdowns for Risks and Body Systems
    const groups = [
      {type:'link', href:'index.html', text:tr('nav.home','Home')},
      {type:'menu', label:tr('nav.risks','Risks'), items:[
        ['carcinogens.html',tr('nav.carcinogens','Carcinogen Library')],
        ['additives.html',tr('nav.additives','Food Additives')],
        ['lifestyle.html',tr('nav.lifestyle','Lifestyle & Environment')],
        ['african-diet.html',tr('nav.african','African Diet & Cooking')]
      ]},
      {type:'menu', label:tr('nav.body','Body Systems'), items:[
        ['heart.html',tr('nav.heart','Heart & Circulation')],
        ['sleep.html',tr('nav.sleep','Sleep')],
        ['brain.html',tr('nav.brain','Brain & Mind')],
        ['gut.html',tr('nav.gut','Gut & Digestion')],
        ['kidneys.html',tr('nav.kidneys','Kidneys & Liver')],
        ['skin.html',tr('nav.skin','Skin')],
        ['eyes.html',tr('nav.eyes','Eyes & Vision')],
        ['women.html',tr('nav.women','Women\'s Health')],
        ['men.html',tr('nav.men','Men\'s Health')]
      ]},
      {type:'menu', label:tr('nav.act','Act'), items:[
        ['proposals.html',tr('nav.proposals','Proposals')],
        ['natural-remedies.html',tr('nav.remedies','Natural Remedies')],
        ['medicines.html',tr('nav.medicines','Medicines & Alternatives')],
        ['tracker.html',tr('nav.tracker','Daily Tracker')],
        ['quizzes.html',tr('nav.quizzes','Quizzes')],
        ['encouragement.html',tr('nav.encouragement','Faith & Encouragement')]
      ]},
      {type:'link', href:'notes.html', text:tr('nav.notes','My Notes')},
      {type:'link', href:'community.html', text:tr('nav.community','Community')},
      {type:'link', href:'evidence.html', text:tr('nav.evidence','Evidence')}
    ];

    const navWrap = document.querySelector('.nav-inner');
    if(!navWrap) return;
    let linksWrap = navWrap.querySelector('.nav-links');
    if(!linksWrap){
      linksWrap = document.createElement('div');
      linksWrap.className = 'nav-links';
      const cta = navWrap.querySelector('.nav-cta');
      navWrap.insertBefore(linksWrap, cta);
    }
    linksWrap.innerHTML = groups.map(g=>{
      if(g.type==='link'){
        const active = activePath===g.href ? 'class="active"' : '';
        return `<a href="${g.href}" ${active}>${g.text}</a>`;
      }
      const activeInGroup = g.items.some(([h])=> h===activePath);
      const items = g.items.map(([h,t])=> `<a href="${h}" ${activePath===h?'class="active"':''}>${t}</a>`).join('');
      return `<div class="nav-menu ${activeInGroup?'has-active':''}">
        <button class="nav-menu-btn ${activeInGroup?'active':''}">${g.label} <span class="caret">▾</span></button>
        <div class="nav-menu-pop">${items}</div>
      </div>`;
    }).join('');

    // Dropdown toggle (click to open on mobile, hover on desktop)
    linksWrap.querySelectorAll('.nav-menu-btn').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        const menu = btn.closest('.nav-menu');
        const wasOpen = menu.classList.contains('open');
        linksWrap.querySelectorAll('.nav-menu').forEach(m=>m.classList.remove('open'));
        if(!wasOpen) menu.classList.add('open');
      });
    });
    document.addEventListener('click', ()=>{
      linksWrap.querySelectorAll('.nav-menu').forEach(m=>m.classList.remove('open'));
    });

    // Mobile toggle
    let mt = navWrap.querySelector('.mobile-toggle');
    if(!mt){
      mt = document.createElement('button');
      mt.className = 'mobile-toggle';
      mt.innerHTML = '☰';
      mt.addEventListener('click', ()=> linksWrap.classList.toggle('open'));
      navWrap.appendChild(mt);
    }
  },

  /* ---------- FOOTER INJECTOR ---------- */
  injectFooter(){
    if(document.querySelector('footer.t21-footer')) return;
    const fr = window.T21Lang && T21Lang.current==='fr';
    const tr = (k, en)=> fr && window.FR_UI && FR_UI[k] ? FR_UI[k] : en;
    const f = document.createElement('footer');
    f.className = 't21-footer';
    f.innerHTML = `
      <div class="foot-inner">
        <div class="foot-brand">
          <div class="brand-name" style="font-family:'Fraunces',serif">${fr ? 'Plateforme Santé Team21' : 'Team21 Health Platform'}</div>
          <p>${tr('foot.brand','A comprehensive, evidence-based preventive-health resource — mapping the dietary, environmental, behavioural and systemic factors implicated in cancer, cardiovascular disease, metabolic disorders and chronic illness — drawn from IARC, WHO, NIH, AHA, AICR and the leading medical journals.')}</p>
        </div>
        <div class="foot-col">
          <h5>${tr('foot.risks','Risks')}</h5>
          <a href="carcinogens.html">${tr('nav.carcinogens','Carcinogens')}</a>
          <a href="additives.html">${tr('nav.additives','Food additives')}</a>
          <a href="lifestyle.html">${tr('nav.lifestyle','Lifestyle & environment')}</a>
          <a href="african-diet.html">${tr('nav.african','African diet & cooking')}</a>
        </div>
        <div class="foot-col">
          <h5>${tr('foot.body','Body Systems')}</h5>
          <a href="heart.html">${fr?'Cœur':'Heart'}</a>
          <a href="sleep.html">${fr?'Sommeil':'Sleep'}</a>
          <a href="brain.html">${fr?'Cerveau & esprit':'Brain & mind'}</a>
          <a href="gut.html">${fr?'Intestin':'Gut'}</a>
          <a href="kidneys.html">${fr?'Reins & foie':'Kidneys & liver'}</a>
          <a href="skin.html">${fr?'Peau':'Skin'}</a>
          <a href="eyes.html">${fr?'Yeux':'Eyes'}</a>
          <a href="women.html">${fr?'Santé féminine':'Women\'s health'}</a>
          <a href="men.html">${fr?'Santé masculine':'Men\'s health'}</a>
        </div>
        <div class="foot-col">
          <h5>${tr('foot.act','Act')}</h5>
          <a href="proposals.html">${tr('nav.proposals','Proposals')}</a>
          <a href="natural-remedies.html">${tr('nav.remedies','Natural remedies')}</a>
          <a href="medicines.html">${tr('nav.medicines','Medicines & alternatives')}</a>
          <a href="tracker.html">${tr('nav.tracker','Daily tracker')}</a>
          <a href="quizzes.html">${tr('nav.quizzes','Quizzes')}</a>
          <a href="encouragement.html">${tr('nav.encouragement','Faith & encouragement')}</a>
          <a href="notes.html">${tr('nav.notes','My notes')}</a>
          <a href="community.html">${tr('nav.community','Community Q&A')}</a>
          <a href="evidence.html">${fr?'Sources':'Sources'}</a>
          <a href="evidence.html#disclaimer">${fr?'Avertissement':'Disclaimer'}</a>
        </div>
      </div>
      <div class="foot-bottom">
        <div class="copy">© Innocent Forteh · ${fr?'Plateforme Santé Team21':'Team21 Health Platform'} · ${tr('foot.allrights','All rights reserved.')}</div>
        <div>${fr ? 'Édité par Innocent Forteh · Usage éducatif uniquement · Ne constitue pas un avis médical.' : 'Edited by Innocent Forteh · For educational use only · Not medical advice.'}</div>
      </div>`;
    document.body.appendChild(f);
  },

  /* ---------- BOOTSTRAP ---------- */
  async boot(activePath){
    // Init language FIRST (reads saved setting, doesn't render yet)
    if(window.T21Lang){
      await T21Lang.init();
    }
    this.injectNav(activePath);
    this.injectFooter();
    this.injectAuthModal();
    // Restore session
    if(this.storage){
      try{
        const r = await this.storage.get('t21:session');
        if(r && r.value) this.user = JSON.parse(r.value);
      }catch(_){}
    }
    this.renderUserBadge();
    if(typeof window.onUserAuthChange === 'function') window.onUserAuthChange(this.user);
    // Run text walker AFTER everything is rendered (nav, badge, modal, footer)
    if(window.T21Lang && T21Lang.current==='fr'){
      // Small delay so dynamically injected content (like topic grids) has a chance
      setTimeout(()=> T21Lang.applyFR(), 50);
      setTimeout(()=> T21Lang.applyFR(), 250);
      setTimeout(()=> T21Lang.applyFR(), 800);
    }
  }
};

/* Listen for cross-page hooks */
window.T21 = T21;
