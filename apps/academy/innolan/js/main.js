/* ============================================================
   inno4te Networking Academy — main.js v2
   Nav · YouTube lazy-load · Enhanced exam engine ·
   Domain breakdown · Flag for review · Real pass scores
   ============================================================ */

/* ── nav + misc ── */
(function(){
  var toggle=document.querySelector(".nav-toggle"),links=document.querySelector(".nav-links");
  if(toggle&&links){toggle.addEventListener("click",function(){var o=links.classList.toggle("open");toggle.setAttribute("aria-expanded",o?"true":"false");});}
  document.querySelectorAll("[data-year]").forEach(function(el){el.textContent=new Date().getFullYear();});
  document.querySelectorAll(".yt[data-yt]").forEach(function(box){
    var id=box.getAttribute("data-yt"),img=box.querySelector("img");
    if(img&&!img.src){img.src="https://i.ytimg.com/vi/"+id+"/mqdefault.jpg";img.loading="lazy";img.alt=box.getAttribute("data-title")||"";}
    box.addEventListener("click",function(){
      var f=document.createElement("iframe");
      f.src="https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1&rel=0";
      f.allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture";
      f.allowFullscreen=true;box.innerHTML="";box.appendChild(f);
    });
  });
})();

/* ============================================================
   EXAM ENGINE v2
   ============================================================ */
(function(){
  if(!document.getElementById("examContainer"))return;

  var track=null, questions=[], qIndex=0, answers=[], flags=[], examTimer=null, perQTimer=null;
  var examMode=false, fullMode=false, totalTimeLeft=0, perQLeft=0;

  /* ── render track selector ── */
  function renderTracks(){
    var c=document.getElementById("trackSelector");if(!c)return;
    c.innerHTML="";
    window.TRACKS.forEach(function(t){
      var div=document.createElement("div");div.className="track-select-wrap";
      div.innerHTML='<div class="track-card" style="cursor:pointer">'
        +'<div class="track-icon" style="background:rgba(88,166,255,.12)">'+t.icon+'</div>'
        +'<h3>'+t.name+'</h3>'
        +'<p>'+t.qs.length+' questions  ·  Pass: '+t.passScore+'%  ·  Full exam: '+t.fullTime+' min</p>'
        +'<div class="track-meta" style="gap:8px;flex-wrap:wrap">'
        +'<span class="track-badge '+t.badge+'">'+t.qs.length+' Total Qs</span>'
        +'<button class="btn btn-primary btn-sm" data-tid="'+t.id+'" data-mode="practice">Practice (15 Q)</button>'
        +'<button class="btn btn-accent btn-sm" data-tid="'+t.id+'" data-mode="full">Full Exam ('+t.qs.length+' Q)</button>'
        +'<button class="btn btn-ghost btn-sm" data-tid="'+t.id+'" data-mode="timed">⏱ Timed Practice</button>'
        +'</div></div>';
      c.appendChild(div);
    });
    c.querySelectorAll("[data-mode]").forEach(function(btn){
      btn.addEventListener("click",function(e){
        e.stopPropagation();
        var tid=btn.getAttribute("data-tid"),mode=btn.getAttribute("data-mode");
        var t=window.TRACKS.find(function(x){return x.id===tid;});
        if(t) startExam(t,mode);
      });
    });
  }

  /* ── start exam ── */
  function startExam(t, mode){
    track=t; examMode=(mode==="timed"); fullMode=(mode==="full");
    var pool=shuffle(t.qs.slice());
    questions=fullMode?pool:pool.slice(0,Math.min(15,pool.length));
    answers=new Array(questions.length).fill(null);
    flags=new Array(questions.length).fill(false);
    qIndex=0;
    document.getElementById("examSetup").style.display="none";
    document.getElementById("examMain").style.display="";
    document.getElementById("examResults").style.display="none";
    document.getElementById("examTitle").textContent=t.name;
    // set up exam-level countdown if full mode
    if(fullMode){
      totalTimeLeft=t.fullTime*60;
      startExamCountdown();
    }
    renderQ(); renderNav();
  }

  /* ── countdown for full exam ── */
  function startExamCountdown(){
    var el=document.getElementById("examClock");
    if(!el)return;
    el.style.display="";
    clearInterval(examTimer);
    examTimer=setInterval(function(){
      totalTimeLeft--;
      if(totalTimeLeft<=0){clearInterval(examTimer);showResults();}
      updateClock();
    },1000);
    updateClock();
  }
  function updateClock(){
    var el=document.getElementById("examClock");if(!el)return;
    var m=Math.floor(totalTimeLeft/60),s=totalTimeLeft%60;
    el.textContent=(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
    el.style.color=totalTimeLeft<300?"var(--red)":"var(--cyan)";
  }

  /* ── render question ── */
  function renderQ(){
    if(qIndex>=questions.length){showResults();return;}
    clearInterval(perQTimer);
    var q=questions[qIndex];

    // per-question timer (timed mode only)
    var timerEl=document.getElementById("qTimer");
    if(timerEl){
      if(examMode&&!fullMode){
        timerEl.style.display="";
        perQLeft=track.time;
        updatePerQTimer();
        perQTimer=setInterval(function(){perQLeft--;updatePerQTimer();if(perQLeft<=0){clearInterval(perQTimer);autoAnswer();}},1000);
      } else {timerEl.style.display="none";}
    }

    var numEl=document.getElementById("qNum");
    if(numEl)numEl.textContent="Q "+(qIndex+1)+" / "+questions.length+"   ·   Domain: "+q.d;
    var textEl=document.getElementById("qText");if(textEl)textEl.textContent=q.q;

    // flag button
    var flagBtn=document.getElementById("flagBtn");
    if(flagBtn){flagBtn.textContent=flags[qIndex]?"🚩 Flagged":"⚑ Flag";flagBtn.style.color=flags[qIndex]?"var(--yellow)":"var(--text-3)";}

    var optsEl=document.getElementById("qOpts");if(!optsEl)return;
    optsEl.innerHTML="";
    q.opts.forEach(function(opt,i){
      var btn=document.createElement("button");
      btn.className="opt";
      btn.innerHTML='<span style="color:var(--text-3);font-weight:700;margin-right:8px">'+String.fromCharCode(65+i)+'.</span>'+escHtml(opt);
      btn.dataset.i=i;
      if(answers[qIndex]===i)btn.classList.add("selected");
      if(answers[qIndex]!==null){applyReveal(optsEl,q.a,answers[qIndex]);}
      btn.addEventListener("click",function(){if(answers[qIndex]!==null)return;selectAnswer(i);});
      optsEl.appendChild(btn);
    });
    var exp=document.getElementById("qExplanation");
    if(exp){
      if(answers[qIndex]!==null){exp.className="explanation show";exp.innerHTML="<strong>Explanation:</strong> "+escHtml(q.exp);}
      else{exp.className="explanation";}
    }
    renderNav();
  }

  function updatePerQTimer(){
    var el=document.getElementById("qTimer");if(!el)return;
    var m=Math.floor(perQLeft/60),s=perQLeft%60;
    el.textContent=(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
    el.className="q-timer"+(perQLeft<=10?" danger":"");
  }
  function autoAnswer(){selectAnswer(-1);}

  function selectAnswer(i){
    clearInterval(perQTimer);
    answers[qIndex]=i;
    var q=questions[qIndex];
    var optsEl=document.getElementById("qOpts");if(!optsEl)return;
    applyReveal(optsEl,q.a,i);
    var exp=document.getElementById("qExplanation");
    if(exp){exp.className="explanation show";exp.innerHTML="<strong>Explanation:</strong> "+escHtml(q.exp);}
    renderNav();updateProgress();
  }
  function applyReveal(container,correct,chosen){
    container.querySelectorAll(".opt").forEach(function(b){
      var bi=parseInt(b.dataset.i);
      b.className="opt";
      if(bi===correct)b.classList.add("correct");
      else if(bi===chosen&&chosen!==correct)b.classList.add("wrong");
      else b.style.opacity=".45";
    });
  }

  /* ── nav / progress ── */
  function renderNav(){
    var prev=document.getElementById("btnPrev"),next=document.getElementById("btnNext"),fin=document.getElementById("btnFinish"),flagBtn=document.getElementById("flagBtn");
    if(prev){prev.disabled=(qIndex===0);prev.onclick=function(){clearInterval(perQTimer);qIndex--;renderQ();};}
    if(next){next.style.display=qIndex<questions.length-1?"":"none";next.textContent=answers[qIndex]!==null?"Next →":"Skip →";next.onclick=function(){clearInterval(perQTimer);qIndex++;renderQ();};}
    if(fin){fin.style.display=qIndex===questions.length-1?"":"none";fin.onclick=showResults;}
    if(flagBtn){flagBtn.onclick=function(){flags[qIndex]=!flags[qIndex];renderQ();};}
    // pips
    var pips=document.getElementById("progressPips");if(!pips)return;
    pips.innerHTML="";
    questions.forEach(function(_,i){
      var d=document.createElement("div");
      d.className="pn"+(i===qIndex?" current":"")+(answers[i]!==null?(answers[i]===questions[i].a?" correct":" wrong"):"")+(flags[i]?" flagged":"");
      d.textContent=i+1;d.title="Q"+(i+1)+(flags[i]?" 🚩":"");
      d.style.cursor="pointer";
      if(flags[i])d.style.outline="2px solid var(--yellow)";
      d.addEventListener("click",function(){clearInterval(perQTimer);qIndex=i;renderQ();});
      pips.appendChild(d);
    });
  }
  function updateProgress(){
    var n=answers.filter(function(a){return a!==null;}).length;
    var el=document.getElementById("examProgress");if(el)el.querySelector("i").style.width=(n/questions.length*100)+"%";
  }

  /* ── results ── */
  function showResults(){
    clearInterval(examTimer);clearInterval(perQTimer);
    document.getElementById("examMain").style.display="none";
    document.getElementById("examResults").style.display="";
    var correct=answers.filter(function(a,i){return a===questions[i].a;}).length;
    var pct=Math.round(correct/questions.length*100);
    var pass=pct>=track.passScore;

    // ── save to student progress ──
    if (window.Auth && Auth.currentUser && !Auth.isAdmin()) {
      var domainMap2={};
      questions.forEach(function(q,i){
        var d2=q.d||"General";
        if(!domainMap2[d2])domainMap2[d2]={c:0,t:0};
        domainMap2[d2].t++;
        if(answers[i]===q.a)domainMap2[d2].c++;
      });
      Auth.trackExam({
        track:track.id, trackName:track.name, pct:pct,
        correct:correct, total:questions.length, passed:pass,
        mode:examMode?(fullMode?"full":"timed"):"practice",
        domains:domainMap2
      });
    }

    // score ring
    var r=47,circ=Math.round(2*Math.PI*r);var filled=Math.round(circ*(pct/100));
    var ringColor=pct>=track.passScore?"var(--green)":pct>=(track.passScore-15)?"var(--yellow)":"var(--red)";
    document.getElementById("scoreCircle").innerHTML=
      '<circle cx="52" cy="52" r="'+r+'" fill="none" stroke="var(--surface-3)" stroke-width="9"/>'
      +'<circle cx="52" cy="52" r="'+r+'" fill="none" stroke="'+ringColor+'" stroke-width="9" stroke-dasharray="'+filled+' '+circ+'" stroke-linecap="round"/>';
    document.getElementById("scorePct").textContent=pct+"%";
    document.getElementById("scoreLbl").textContent=pass?"PASS":"STUDY MORE";
    document.getElementById("scoreLbl").style.color=pass?"var(--green)":"var(--red)";

    document.getElementById("resultSummary").innerHTML=
      '<p>You answered <strong>'+correct+' / '+questions.length+'</strong> correctly on <strong>'+track.name+'</strong>.</p>'
      +'<p>Pass threshold: <strong>'+track.passScore+'%</strong> — you scored <strong style="color:'+ringColor+'">'+pct+'%</strong>.</p>'
      +(pass?'<p style="color:var(--green);margin-top:6px">✓ Above passing threshold. Keep drilling weak domains below!</p>'
            :'<p style="color:var(--yellow);margin-top:6px">Below passing threshold. Review the explanations and retry, focusing on the domains where you lost marks.</p>');

    // domain breakdown
    var domainMap={};
    questions.forEach(function(q,i){
      var d=q.d||"General";
      if(!domainMap[d])domainMap[d]={total:0,correct:0};
      domainMap[d].total++;
      if(answers[i]===q.a)domainMap[d].correct++;
    });
    var domainHtml='<h3 style="font-size:1rem;margin-bottom:12px">Domain breakdown</h3>';
    Object.keys(domainMap).forEach(function(d){
      var dm=domainMap[d];var dp=Math.round(dm.correct/dm.total*100);
      var dc=dp>=70?"var(--green)":dp>=50?"var(--yellow)":"var(--red)";
      domainHtml+='<div style="margin-bottom:10px">'
        +'<div style="display:flex;justify-content:space-between;font-size:.84rem;font-weight:700;margin-bottom:4px">'
        +'<span>'+escHtml(d)+'</span><span style="color:'+dc+'">'+dm.correct+'/'+dm.total+' ('+dp+'%)</span></div>'
        +'<div class="prog-bar"><i style="width:'+dp+'%;background:'+dc+'"></i></div></div>';
    });
    document.getElementById("domainBreakdown").innerHTML=domainHtml;

    // flagged questions
    var flagged=flags.reduce(function(acc,f,i){if(f)acc.push(i);return acc;},[]);
    var flagHtml=flagged.length?'<p style="color:var(--yellow);font-size:.9rem;margin-bottom:10px">🚩 You flagged '+flagged.length+' question(s) for review: '+flagged.map(function(i){return "Q"+(i+1);}).join(", ")+'. They are included in the review below.</p>':"";
    document.getElementById("flaggedNote").innerHTML=flagHtml;

    // full review
    var reviewEl=document.getElementById("resultReview");reviewEl.innerHTML="";
    questions.forEach(function(q,i){
      var cor=answers[i]===q.a;
      var div=document.createElement("div");
      div.style="border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:12px;background:var(--surface-2);";
      div.innerHTML='<div style="display:flex;gap:10px;align-items:flex-start;">'
        +'<span style="font-size:1.2rem;flex:none">'+(cor?"✅":"❌")+'</span>'
        +'<div style="flex:1"><div style="font-weight:700;margin-bottom:6px;font-size:.95rem">'+escHtml(q.q)+'</div>'
        +'<div style="font-size:.84rem;color:var(--text-3);margin-bottom:3px">Domain: '+escHtml(q.d)+'</div>'
        +(cor?'<div style="font-size:.87rem;color:var(--green)">✓ '+escHtml(q.opts[q.a])+'</div>'
             :'<div style="font-size:.87rem;color:var(--red)">Your answer: '+(answers[i]>=0?escHtml(q.opts[answers[i]]):"(skipped)")+'</div>'
              +'<div style="font-size:.87rem;color:var(--green)">Correct: '+escHtml(q.opts[q.a])+'</div>')
        +'<div style="font-size:.84rem;color:var(--text-3);margin-top:6px;border-left:3px solid var(--accent);padding-left:10px">'+escHtml(q.exp)+'</div>'
        +'</div></div>';
      reviewEl.appendChild(div);
    });

    document.getElementById("btnRetry").onclick=function(){startExam(track,examMode?(fullMode?"full":"timed"):"practice");};
    document.getElementById("btnBackTracks").onclick=function(){document.getElementById("examMain").style.display="none";document.getElementById("examResults").style.display="none";document.getElementById("examSetup").style.display="";};
  }

  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
  function escHtml(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  window.addEventListener("DOMContentLoaded",renderTracks);
})();

/* ============================================================
   SUBNETTING CALCULATOR & PRACTICE
   ============================================================ */
(function(){
  if(!document.getElementById("subnetCalc"))return;
  function calc(){
    var ipInput=document.getElementById("subIp").value.trim();
    var cidr=parseInt(document.getElementById("subCidr").value);
    var parts=ipInput.split(".");
    if(parts.length!==4||!parts.every(function(p){return p!==""&&+p>=0&&+p<=255;})){alert("Invalid IP address");return;}
    if(isNaN(cidr)||cidr<0||cidr>32){alert("CIDR 0-32");return;}
    var ip=ipN(ipInput);
    var mask=cidr===0?0:(-1<<(32-cidr))>>>0;
    var net=(ip&mask)>>>0;var bcast=(net|(~mask>>>0))>>>0;
    var first=(net+1)>>>0;var last=(bcast-1)>>>0;
    var hosts=cidr>=31?(cidr===31?2:1):Math.pow(2,32-cidr)-2;
    document.getElementById("resNetwork").textContent=numIp(net)+"/"+cidr;
    document.getElementById("resMask").textContent=numIp(mask);
    document.getElementById("resBroadcast").textContent=numIp(bcast);
    document.getElementById("resFirst").textContent=cidr<31?numIp(first):"N/A";
    document.getElementById("resLast").textContent=cidr<31?numIp(last):"N/A";
    document.getElementById("resHosts").textContent=hosts.toLocaleString();
    document.getElementById("resSubnets").textContent=Math.pow(2,cidr).toLocaleString();
    renderBinary(ip,cidr);
    document.getElementById("subnetResults").style.display="";
  }
  function renderBinary(ip,cidr){
    var row=document.getElementById("binaryRow");if(!row)return;row.innerHTML="";
    var b=ip.toString(2).padStart(32,"0");
    for(var i=0;i<32;i++){
      if(i>0&&i%8===0){var sep=document.createElement("span");sep.className="bit sep";sep.textContent=".";row.appendChild(sep);}
      var bit=document.createElement("span");bit.className="bit "+(i<cidr?"net":"host");bit.textContent=b[i];row.appendChild(bit);
    }
    document.getElementById("binaryLegend").innerHTML='<span class="bit net" style="padding:2px 6px">■</span> Network ('+cidr+' bits) &nbsp; <span class="bit host" style="padding:2px 6px">■</span> Host ('+(32-cidr)+' bits)';
  }
  function calcVlsm(){
    var base=document.getElementById("vlsmBase").value.trim();
    var reqs=document.getElementById("vlsmReqs").value.trim().split(/[\n,]+/).map(function(x){return parseInt(x.trim());}).filter(function(x){return!isNaN(x)&&x>0;}).sort(function(a,b){return b-a;});
    if(!reqs.length){alert("Enter host requirements");return;}
    var parts=base.split("/");if(parts.length!==2){alert("Format: x.x.x.x/xx");return;}
    var current=(ipN(parts[0])&((-1<<(32-parseInt(parts[1])))>>>0))>>>0;
    var rows="";
    reqs.forEach(function(hosts){
      var bits=Math.ceil(Math.log2(hosts+2));var cidr=32-bits;
      var nm=cidr===0?0:(-1<<(32-cidr))>>>0;
      var net=(current&(nm>>>0))>>>0;var bcast=(net|(~(nm>>>0))>>>0)>>>0;
      rows+='<tr><td>'+hosts+' hosts</td><td style="color:var(--cyan);font-family:var(--mono)">'+numIp(net)+'/'+cidr+'</td><td>'+numIp((net+1)>>>0)+'</td><td>'+numIp((bcast-1)>>>0)+'</td><td>'+numIp(bcast)+'</td></tr>';
      current=(bcast+1)>>>0;
    });
    document.getElementById("vlsmTable").innerHTML='<table class="tbl"><thead><tr><th>Need</th><th>Subnet</th><th>First Host</th><th>Last Host</th><th>Broadcast</th></tr></thead><tbody>'+rows+'</tbody></table>';
    document.getElementById("vlsmResults").style.display="";
  }
  var quizQ=null;
  function genQuiz(){
    var types=["network","broadcast","firsthost","lasthost","hosts","mask"];
    var type=types[Math.floor(Math.random()*types.length)];
    var cidr=Math.floor(Math.random()*24)+8;
    var ip=[Math.floor(Math.random()*223)+1,Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*254)+1].join(".");
    var mask=cidr===0?0:(-1<<(32-cidr))>>>0;
    var net=(ipN(ip)&mask)>>>0;var bcast=(net|(~mask>>>0))>>>0;
    quizQ={type,ip,cidr,net,bcast,first:(net+1)>>>0,last:(bcast-1)>>>0,hosts:Math.max(0,Math.pow(2,32-cidr)-2),mask};
    var labels={network:"Network address",broadcast:"Broadcast address",firsthost:"First usable host",lasthost:"Last usable host",hosts:"Number of usable hosts",mask:"Subnet mask"};
    document.getElementById("quizQuestion").textContent="Given the IP address "+ip+"/"+cidr+", what is the "+labels[type]+"?";
    var inp=document.getElementById("quizAnswer");inp.value="";inp.className="quiz-input";
    document.getElementById("quizFeedback").textContent="";
  }
  function checkQuiz(){
    if(!quizQ)return;
    var ans=document.getElementById("quizAnswer").value.trim();
    var correct;
    if(quizQ.type==="network")correct=numIp(quizQ.net);
    else if(quizQ.type==="broadcast")correct=numIp(quizQ.bcast);
    else if(quizQ.type==="firsthost")correct=numIp(quizQ.first);
    else if(quizQ.type==="lasthost")correct=numIp(quizQ.last);
    else if(quizQ.type==="hosts")correct=String(quizQ.hosts);
    else if(quizQ.type==="mask")correct=numIp(quizQ.mask);
    var ok=(ans===correct);
    document.getElementById("quizAnswer").className="quiz-input "+(ok?"correct":"wrong");
    var fb=document.getElementById("quizFeedback");
    fb.textContent=ok?"✓ Correct! Well done.":"✗ Correct answer: "+correct;
    fb.style.color=ok?"var(--green)":"var(--red)";
  }
  function ipN(ip){var p=ip.split(".");return((+p[0])<<24|(+p[1])<<16|(+p[2])<<8|(+p[3]))>>>0;}
  function numIp(n){return[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".");}
  window.addEventListener("DOMContentLoaded",function(){
    var b=document.getElementById("btnCalc");if(b)b.addEventListener("click",calc);
    var v=document.getElementById("btnVlsm");if(v)v.addEventListener("click",calcVlsm);
    var g=document.getElementById("btnGenQuiz");if(g){g.addEventListener("click",genQuiz);genQuiz();}
    var k=document.getElementById("btnCheckQuiz");if(k)k.addEventListener("click",checkQuiz);
    var a=document.getElementById("quizAnswer");if(a)a.addEventListener("keydown",function(e){if(e.key==="Enter")checkQuiz();});
    var s=document.getElementById("subCidr"),d=document.getElementById("cidrDisplay");
    if(s&&d){s.addEventListener("input",function(){d.textContent="/"+s.value;});}
  });
})();
