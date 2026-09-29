window.Forte = {
  fmtBytes(n){ return n>1048576 ? (n/1048576).toFixed(1)+" MB" : Math.max(1,Math.round(n/1024))+" KB"; },
  esc(s){ return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); },
  async sha256(t){ const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join(""); },
  card(p,base,admin){
    const E=this.esc, href=p.entry?base+p.entry:null;
    const links=[href&&`<a href="${E(href)}">Open →</a>`,
      ...(admin?p.adminPages.map(a=>`<a href="${E(base+a)}">Admin page</a>`):[]),
      admin&&p.source&&`<a href="https://github.com/${E(p.source)}" rel="noopener">Source repo</a>`].filter(Boolean).join("");
    return `<article class="card"><div class="meta"><span class="tag ${p.access}">${p.access}</span>${p.tech.map(t=>`<span class="tag">${E(t)}</span>`).join("")}</div>
<h3>${E(p.title)}</h3><p>${E(p.description||p.name)}</p><div class="links">${links||'<span class="tag">No web entry</span>'}</div></article>`;
  }
};
