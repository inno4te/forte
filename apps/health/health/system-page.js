/* ===== System page renderer ===== */
/* Renders a full body-system page from window.SYSTEMS[key] */

function renderSystemPage(key){
  const data = SYSTEMS[key];
  if(!data){ console.warn('No system data for', key); return; }

  const fr = window.T21Lang && T21Lang.current==='fr';
  const trSys = fr ? T21Lang.Td('system', key) : null;

  // Translated copies
  const title = (trSys && trSys.title) || data.title;
  const eyebrow = (trSys && trSys.eyebrow) || data.eyebrow;
  const intro = (trSys && trSys.intro) || data.intro;

  document.title = title + ' — Team21 Health Platform';

  const head = document.getElementById('sysHead');
  if(head){
    head.innerHTML = `
      <div>
        <div class="eyebrow">${eyebrow}</div>
        <h1>${title.replace(/(\w+)$/, '<em>$1</em>')}</h1>
        <p class="intro">${intro}</p>
      </div>
      <div class="meta">${fr ? 'BASÉ SUR DES PREUVES<br>SOURCÉ · CITÉ<br>MIS À JOUR EN 2026' : 'EVIDENCE-BASED<br>SOURCED · CITED<br>UPDATED 2026'}</div>`;
  }

  // Key numbers
  const kv = document.getElementById('sysKV');
  if(kv && data.keyNumbers){
    kv.innerHTML = data.keyNumbers.map((n, i)=>{
      const k = (trSys && trSys.kvK && trSys.kvK[i]) || n.k;
      const s = (trSys && trSys.kvS && trSys.kvS[i]) || n.s || '';
      return `<div class="kv"><div class="k">${k}</div><div class="v">${n.v}</div><div class="s">${s}</div></div>`;
    }).join('');
  }

  // Tips
  const tips = document.getElementById('sysTips');
  const bL = fr ? '☆ Favori' : '☆ Bookmark';
  const nL = fr ? '✎ Ajouter une note' : '✎ Add note';
  if(tips && data.tips){
    tips.innerHTML = data.tips.map((t, i)=>{
      const h = (trSys && trSys.tipsH && trSys.tipsH[i]) || t.h;
      const p = (trSys && trSys.tipsP && trSys.tipsP[i]) || t.p;
      const hay = (h + ' ' + p + ' ' + t.ev).toLowerCase();
      return `<article class="tip" data-search="${hay.replace(/"/g,'&quot;')}">
        <div class="num">${t.n}</div>
        <h4>${h}</h4>
        <p>${p}</p>
        <div class="ev">${t.ev}</div>
        <div class="topic-actions" style="margin-top:8px;padding-top:8px">
          <button class="action-btn" data-act="bookmark" data-id="${key}-${t.n}" data-name="${h.replace(/"/g,'&quot;')}">${bL}</button>
          <button class="action-btn" data-act="note" data-id="${key}-${t.n}" data-name="${h.replace(/"/g,'&quot;')}">${nL}</button>
        </div>
      </article>`;
    }).join('');
    wireTopicActions(tips);
  }

  // Warnings
  const warns = document.getElementById('sysWarns');
  if(warns && data.warnings){
    warns.innerHTML = data.warnings.map((w, i)=>{
      const h = (trSys && trSys.warnsH && trSys.warnsH[i]) || w.h;
      const p = (trSys && trSys.warnsP && trSys.warnsP[i]) || w.p;
      return `<div class="warn"><strong>${h}</strong>${p}</div>`;
    }).join('');
  } else if(warns){
    warns.style.display='none';
  }

  // Foods to eat / avoid
  const foodWrap = document.getElementById('sysFoods');
  if(foodWrap && data.foods){
    const eatList = (trSys && trSys.foodsEat) || data.foods.eat;
    const avoidList = (trSys && trSys.foodsAvoid) || data.foods.avoid;
    const eatLbl = fr ? 'À consommer régulièrement' : 'Eat regularly';
    const avoidLbl = fr ? 'À limiter ou à éviter' : 'Limit or avoid';
    foodWrap.innerHTML = `
      <div class="info-grid">
        <div class="info-card">
          <h4 style="color:var(--good)">${eatLbl}</h4>
          <ul>${eatList.map(f=>`<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="info-card">
          <h4 style="color:var(--accent)">${avoidLbl}</h4>
          <ul>${avoidList.map(f=>`<li>${f}</li>`).join('')}</ul>
        </div>
      </div>`;
  } else if(foodWrap){
    foodWrap.style.display='none';
  }

  // Search box
  const search = document.getElementById('sysSearch');
  if(search && tips){
    search.addEventListener('input', e=>{
      const q = e.target.value.toLowerCase().trim();
      tips.querySelectorAll('.tip').forEach(t=>{
        t.style.display = (!q || (t.dataset.search||'').includes(q)) ? '' : 'none';
      });
    });
  }
}

window.renderSystemPage = renderSystemPage;
