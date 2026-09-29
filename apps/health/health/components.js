/* ===== Team21 Health Platform — Components ===== */

/* Render a topic card with interactive actions: Bookmark, Note, Ask */
function renderTopic(t){
  const tr = (window.T21Lang && T21Lang.current === 'fr') ? T21Lang.Td('topic', t.id, undefined, null) : null;
  const name = (tr && tr.name) || t.name;
  const sub  = (tr && tr.sub)  || t.sub;
  // IARC label translation
  let iarcLabel = t.iarcLabel;
  if(window.T21Lang && T21Lang.current === 'fr' && window.FR_UI && FR_UI[t.iarcLabel]){
    iarcLabel = FR_UI[t.iarcLabel];
  }

  const blocks = t.blocks.map(b=>{
    if(b.list){
      return `<div class="topic-block"><h5>${b.h}</h5><ul>${b.list.map(li=>`<li>${li}</li>`).join('')}</ul></div>`;
    }
    return `<div class="topic-block"><h5>${b.h}</h5><p>${b.p}</p></div>`;
  }).join('');

  const searchHay = [t.name, t.sub, ...t.blocks.flatMap(b => (b.p? [b.p]:[]).concat(b.list||[]))].join(' ').toLowerCase();

  // Translated action labels
  const bL = (window.T21Lang && T21Lang.current==='fr') ? '☆ Favori' : '☆ Bookmark';
  const nL = (window.T21Lang && T21Lang.current==='fr') ? '✎ Ajouter une note' : '✎ Add note';
  const aL = (window.T21Lang && T21Lang.current==='fr') ? '? Poser une question' : '? Ask question';
  const srcLbl = (window.T21Lang && T21Lang.current==='fr') ? 'Sources :' : 'Sources:';

  return `
    <article class="topic" data-id="${t.id}" data-search="${searchHay.replace(/"/g,'&quot;')}">
      <div class="topic-header">
        <h3 class="topic-name">${name}<small>${sub}</small></h3>
        <span class="iarc ${t.iarc}">${iarcLabel}</span>
      </div>
      <div class="topic-body">
        ${blocks}
        <p class="topic-cite"><strong>${srcLbl}</strong> ${t.cite}</p>
        <div class="topic-actions">
          <button class="action-btn" data-act="bookmark" data-id="${t.id}" data-name="${name.replace(/"/g,'&quot;')}">${bL}</button>
          <button class="action-btn" data-act="note" data-id="${t.id}" data-name="${name.replace(/"/g,'&quot;')}">${nL}</button>
          <button class="action-btn" data-act="ask" data-id="${t.id}" data-name="${name.replace(/"/g,'&quot;')}">${aL}</button>
        </div>
      </div>
    </article>`;
}

/* Attach interaction handlers to a container holding topics */
function wireTopicActions(container){
  container.addEventListener('click', async (e)=>{
    const btn = e.target.closest('.action-btn');
    if(!btn) return;
    const act = btn.dataset.act;
    const id  = btn.dataset.id;
    const name = btn.dataset.name;

    if(!T21.user){ T21.openAuth('login'); T21.toast('Sign in to save your activity'); return; }

    if(act === 'bookmark'){
      await toggleBookmark(id, name, btn);
    } else if(act === 'note'){
      openNoteEditor({topicId:id, topicName:name});
    } else if(act === 'ask'){
      openQuestionEditor({topicId:id, topicName:name});
    }
  });
  // Reflect existing bookmark state
  refreshBookmarkStates(container);
}

async function refreshBookmarkStates(container){
  if(!T21.user || !T21.storage) return;
  const fr = window.T21Lang && T21Lang.current==='fr';
  const onLabel = fr ? '★ En favori' : '★ Bookmarked';
  const offLabel = fr ? '☆ Favori' : '☆ Bookmark';
  try{
    const r = await T21.storage.get(`t21:${T21.user.email}:bookmarks`);
    const set = r && r.value ? JSON.parse(r.value) : [];
    container.querySelectorAll('.action-btn[data-act=bookmark]').forEach(b=>{
      if(set.includes(b.dataset.id)){
        b.classList.add('active');
        b.textContent = onLabel;
      } else {
        b.classList.remove('active');
        b.textContent = offLabel;
      }
    });
  }catch(_){}
}

async function toggleBookmark(id, name, btn){
  if(!T21.storage){ T21.toast('Storage unavailable','error'); return; }
  const fr = window.T21Lang && T21Lang.current==='fr';
  const key = `t21:${T21.user.email}:bookmarks`;
  let list = [];
  try{ const r = await T21.storage.get(key); if(r && r.value) list = JSON.parse(r.value); }catch(_){}
  if(list.includes(id)){
    list = list.filter(x=>x!==id);
    btn.classList.remove('active'); btn.textContent = fr ? '☆ Favori' : '☆ Bookmark';
    T21.toast(fr ? 'Favori retiré' : 'Bookmark removed');
  } else {
    list.push(id);
    btn.classList.add('active'); btn.textContent = fr ? '★ En favori' : '★ Bookmarked';
    T21.toast(fr ? 'Mis en favori' : 'Bookmarked','success');
  }
  try{ await T21.storage.set(key, JSON.stringify(list)); }catch(_){ T21.toast('Could not save','error'); }
}

/* ------- Note editor (small modal in-page) ------- */
function openNoteEditor({topicId, topicName, existing}){
  ensureMiniModal();
  const m = document.getElementById('miniModal');
  m.innerHTML = `
    <div class="modal">
      <button class="modal-close" id="miniClose" aria-label="Close">×</button>
      <h3>${existing? 'Edit note' : 'Add a note'}</h3>
      <p class="sub">${topicName ? `On <strong>${topicName}</strong>` : 'Personal note'}</p>
      <div class="field"><label for="noteTitle">Title</label><input id="noteTitle" type="text" value="${existing? (existing.title||'').replace(/"/g,'&quot;'):''}" placeholder="A short title for this note"/></div>
      <div class="field"><label for="noteBody">Note</label><textarea id="noteBody" rows="6" placeholder="Write your observations, questions, or reminders…">${existing? (existing.body||''):''}</textarea></div>
      <button class="btn btn-primary btn-block" id="noteSave" style="padding:12px">${existing? 'Save changes':'Save note'}</button>
    </div>`;
  m.classList.add('open');
  document.getElementById('miniClose').onclick = ()=> m.classList.remove('open');
  m.onclick = (e)=>{ if(e.target===m) m.classList.remove('open'); };
  document.getElementById('noteSave').onclick = async ()=>{
    const title = document.getElementById('noteTitle').value.trim();
    const body  = document.getElementById('noteBody').value.trim();
    if(!body){ T21.toast('Note cannot be empty','error'); return; }
    await saveNote({id: existing?.id, topicId, topicName, title, body});
    m.classList.remove('open');
    T21.toast('Note saved','success');
    if(typeof window.refreshNotes === 'function') window.refreshNotes();
  };
}

async function saveNote({id, topicId, topicName, title, body}){
  if(!T21.storage || !T21.user) return;
  const key = `t21:${T21.user.email}:notes`;
  let list = [];
  try{ const r = await T21.storage.get(key); if(r && r.value) list = JSON.parse(r.value); }catch(_){}
  const now = Date.now();
  if(id){
    list = list.map(n => n.id===id ? {...n, title, body, topicId, topicName, updated:now} : n);
  } else {
    list.unshift({id:T21.uid(), title, body, topicId, topicName, created:now, updated:now});
  }
  try{ await T21.storage.set(key, JSON.stringify(list)); }catch(_){}
}

async function loadNotes(){
  if(!T21.storage || !T21.user) return [];
  try{ const r = await T21.storage.get(`t21:${T21.user.email}:notes`); return r && r.value ? JSON.parse(r.value) : []; }catch(_){ return []; }
}

async function deleteNote(id){
  if(!T21.storage || !T21.user) return;
  const key = `t21:${T21.user.email}:notes`;
  let list = []; try{ const r = await T21.storage.get(key); if(r && r.value) list = JSON.parse(r.value); }catch(_){}
  list = list.filter(n=>n.id!==id);
  try{ await T21.storage.set(key, JSON.stringify(list)); }catch(_){}
}

/* ------- Question editor ------- */
function openQuestionEditor({topicId, topicName}){
  ensureMiniModal();
  const m = document.getElementById('miniModal');
  m.innerHTML = `
    <div class="modal">
      <button class="modal-close" id="miniClose" aria-label="Close">×</button>
      <h3>Ask the Team21 community</h3>
      <p class="sub">${topicName ? `Context: <strong>${topicName}</strong>` : 'Public question'}</p>
      <div class="field"><label for="qTitle">Your question</label><input id="qTitle" type="text" placeholder="One clear sentence — e.g. Is celery-powder bacon really safer?"/></div>
      <div class="field"><label for="qBody">Details (optional)</label><textarea id="qBody" rows="5" placeholder="Add context, references you have already read, or what you are trying to decide…"></textarea></div>
      <div class="field" style="flex-direction:row;align-items:center;gap:10px;margin-top:4px"><input type="checkbox" id="qPublic" checked style="width:auto"/> <label for="qPublic" style="text-transform:none;letter-spacing:.02em;font-size:13px;color:var(--ink-soft);font-weight:400">Post publicly to the Community Q&amp;A board</label></div>
      <button class="btn btn-primary btn-block" id="qSave" style="padding:12px">Submit question</button>
    </div>`;
  m.classList.add('open');
  document.getElementById('miniClose').onclick = ()=> m.classList.remove('open');
  m.onclick = (e)=>{ if(e.target===m) m.classList.remove('open'); };
  document.getElementById('qSave').onclick = async ()=>{
    const title = document.getElementById('qTitle').value.trim();
    const body  = document.getElementById('qBody').value.trim();
    const isPublic = document.getElementById('qPublic').checked;
    if(!title){ T21.toast('Please write a question','error'); return; }
    await saveQuestion({title, body, topicId, topicName, isPublic});
    m.classList.remove('open');
    T21.toast('Question submitted','success');
    if(typeof window.refreshQuestions === 'function') window.refreshQuestions();
  };
}

async function saveQuestion({title, body, topicId, topicName, isPublic}){
  if(!T21.storage || !T21.user) return;
  const item = {
    id: T21.uid(),
    title, body, topicId, topicName,
    author: T21.user.name || T21.user.email.split('@')[0],
    authorEmail: T21.user.email,
    created: Date.now(),
    answers: []
  };
  // Personal copy
  const myKey = `t21:${T21.user.email}:questions`;
  let mine = []; try{ const r = await T21.storage.get(myKey); if(r && r.value) mine = JSON.parse(r.value); }catch(_){}
  mine.unshift(item);
  try{ await T21.storage.set(myKey, JSON.stringify(mine)); }catch(_){}
  // Public copy
  if(isPublic && T21.storage){
    const pubKey = 't21:public:questions';
    let pub = []; try{ const r = await T21.storage.get(pubKey, true); if(r && r.value) pub = JSON.parse(r.value); }catch(_){}
    pub.unshift(item);
    if(pub.length > 200) pub = pub.slice(0,200); // cap
    try{ await T21.storage.set(pubKey, JSON.stringify(pub), true); }catch(_){}
  }
}

async function loadQuestions(scope){
  if(!T21.storage) return [];
  if(scope==='public'){
    try{ const r = await T21.storage.get('t21:public:questions', true); return r && r.value ? JSON.parse(r.value) : []; }catch(_){ return []; }
  }
  if(!T21.user) return [];
  try{ const r = await T21.storage.get(`t21:${T21.user.email}:questions`); return r && r.value ? JSON.parse(r.value) : []; }catch(_){ return []; }
}

async function postAnswer(questionId, body){
  if(!T21.storage || !T21.user) return;
  const pubKey = 't21:public:questions';
  let pub = []; try{ const r = await T21.storage.get(pubKey, true); if(r && r.value) pub = JSON.parse(r.value); }catch(_){}
  pub = pub.map(q => {
    if(q.id !== questionId) return q;
    q.answers = q.answers || [];
    q.answers.push({
      id: T21.uid(),
      author: T21.user.name || T21.user.email.split('@')[0],
      body, created: Date.now()
    });
    return q;
  });
  try{ await T21.storage.set(pubKey, JSON.stringify(pub), true); }catch(_){}
}

function ensureMiniModal(){
  if(document.getElementById('miniModal')) return;
  const m = document.createElement('div');
  m.id = 'miniModal'; m.className = 'modal-backdrop';
  document.body.appendChild(m);
}

window.renderTopic = renderTopic;
window.wireTopicActions = wireTopicActions;
window.refreshBookmarkStates = refreshBookmarkStates;
window.openNoteEditor = openNoteEditor;
window.openQuestionEditor = openQuestionEditor;
window.loadNotes = loadNotes;
window.deleteNote = deleteNote;
window.loadQuestions = loadQuestions;
window.postAnswer = postAnswer;
