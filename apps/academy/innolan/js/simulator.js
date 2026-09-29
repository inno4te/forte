/* ============================================================
   inno4te Networking Academy — Network Simulator
   simulator.js  |  Virtual topology lab
   ============================================================ */
(function(){
"use strict";

/* ─── state ─── */
var nodes = [], links = [], selected = null, connecting = null;
var nextId = 1, simCanvas, svgEl;

var DEVICE_TYPES = {
  router:  { label:"Router",   icon:"📶", defaultName:"R",  color:"var(--orange)" },
  switch:  { label:"Switch",   icon:"🔀", defaultName:"SW", color:"var(--green)" },
  pc:      { label:"PC",       icon:"💻", defaultName:"PC", color:"var(--accent-2)" },
  server:  { label:"Server",   icon:"🖥️", defaultName:"SRV",color:"var(--cyan)" },
  firewall:{ label:"Firewall", icon:"🔥", defaultName:"FW", color:"var(--red)" },
  ap:      { label:"Wi-Fi AP", icon:"📡", defaultName:"AP", color:"var(--purple)" },
  cloud:   { label:"Internet", icon:"☁️", defaultName:"NET",color:"var(--text-3)" }
};

/* ─── init ─── */
function init(){
  simCanvas = document.getElementById("simCanvas");
  svgEl = document.getElementById("simWires");
  if (!simCanvas) return;

  // device palette buttons
  document.querySelectorAll("[data-device]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var type = btn.getAttribute("data-device");
      addNode(type, 200 + Math.random()*300, 150 + Math.random()*220);
    });
  });

  // toolbar actions
  var pingBtn = document.getElementById("btnPing");
  if (pingBtn) pingBtn.addEventListener("click", runPing);
  var clearBtn = document.getElementById("btnClear");
  if (clearBtn) clearBtn.addEventListener("click", clearAll);
  var disconnectBtn = document.getElementById("btnDisconnect");
  if (disconnectBtn) disconnectBtn.addEventListener("click", disconnectSelected);
  var deleteBtn = document.getElementById("btnDelete");
  if (deleteBtn) deleteBtn.addEventListener("click", deleteSelected);
  var challengeSelect = document.getElementById("challengeSelect");
  if (challengeSelect) challengeSelect.addEventListener("change", loadChallenge);

  updateConfig();
  log("Network simulator ready. Add devices from the left panel.", "info");
  log("Tip: tap a device, then tap another to connect them.", "dim");
}

/* ─── add node ─── */
function addNode(type, x, y){
  var def = DEVICE_TYPES[type];
  var count = nodes.filter(function(n){return n.type===type;}).length + 1;
  var n = {
    id: nextId++, type: type,
    hostname: def.defaultName + count,
    ip: "", mask: "255.255.255.0", gateway: "",
    x: x, y: y, el: null, interfaces: []
  };
  nodes.push(n);
  renderNode(n);
  selectNode(n);
  return n;
}

function renderNode(n){
  var el = document.createElement("div");
  el.className = "net-node"; el.id = "node-"+n.id;
  el.style.left = n.x + "px"; el.style.top = n.y + "px";
  var def = DEVICE_TYPES[n.type];
  el.innerHTML = '<div class="puck" style="border-color:'+def.color+';">'+def.icon+'</div>'
    +'<div class="n-lbl" id="lbl-'+n.id+'">'+n.hostname+'</div>'
    +'<div class="n-ip" id="ip-'+n.id+'">'+(n.ip||"no IP")+'</div>';
  simCanvas.appendChild(el);
  n.el = el;

  // pointer interactions
  var moved = false, sx=0, sy=0, ox=0, oy=0, active=false;
  el.addEventListener("pointerdown", function(e){
    sx=e.clientX; sy=e.clientY; ox=n.x; oy=n.y; moved=false; active=true;
    try{el.setPointerCapture(e.pointerId);}catch(er){}
  });
  el.addEventListener("pointermove", function(e){
    if(!active)return;
    var dx=e.clientX-sx, dy=e.clientY-sy;
    if(!moved && Math.sqrt(dx*dx+dy*dy)<6) return;
    moved=true;
    n.x = Math.max(30, Math.min(simCanvas.clientWidth-50, ox+dx));
    n.y = Math.max(30, Math.min(simCanvas.clientHeight-50, oy+dy));
    el.style.left = n.x+"px"; el.style.top = n.y+"px";
    drawWires();
  });
  el.addEventListener("pointerup", function(){
    active=false;
    if(!moved){
      if(connecting && connecting !== n){
        addLink(connecting, n);
        clearConnecting();
      } else {
        selectNode(n);
      }
    }
  });
  el.addEventListener("pointercancel", function(){ active=false; });
}

/* ─── select ─── */
function selectNode(n){
  if(selected) selected.el && selected.el.classList.remove("selected");
  selected = n;
  if(n) n.el && n.el.classList.add("selected");
  updateConfig();
}
function clearConnecting(){
  if(connecting && connecting.el) connecting.el.classList.remove("selected");
  connecting = null;
  document.getElementById("connectMode") && (document.getElementById("connectMode").style.display="none");
}

/* ─── links ─── */
function addLink(a, b){
  if(a.id === b.id) return;
  var exists = links.some(function(l){ return (l.a===a.id&&l.b===b.id)||(l.a===b.id&&l.b===a.id); });
  if(exists){ log("Those devices are already connected.", "warn"); return; }
  var cableType = getCableType(a.type, b.type);
  links.push({ a:a.id, b:b.id, cable:cableType });
  a.el && a.el.classList.add("connected");
  b.el && b.el.classList.add("connected");
  drawWires();
  log("Connected: "+a.hostname+" ↔ "+b.hostname+" ("+cableType+")", "good");
}
function getCableType(t1, t2){
  if(t1==="router"&&t2==="router") return "serial";
  if((t1==="pc"&&t2==="pc")||(t1==="switch"&&t2==="switch")) return "crossover";
  if(t1==="cloud"||t2==="cloud") return "fiber";
  return "straight";
}
function disconnectSelected(){
  if(!selected){ log("Select a device first.", "warn"); return; }
  links = links.filter(function(l){ return l.a!==selected.id && l.b!==selected.id; });
  drawWires(); log("Disconnected: "+selected.hostname, "info");
}
function deleteSelected(){
  if(!selected){ log("Select a device first.", "warn"); return; }
  links = links.filter(function(l){ return l.a!==selected.id && l.b!==selected.id; });
  selected.el && selected.el.remove();
  nodes = nodes.filter(function(n){ return n.id!==selected.id; });
  selected = null; drawWires(); updateConfig();
}

/* ─── draw ─── */
function center(n){ return { x: n.x, y: n.y }; }
function drawWires(){
  svgEl.innerHTML = "";
  links.forEach(function(l){
    var a = nodes.find(function(n){return n.id===l.a;}), b = nodes.find(function(n){return n.id===l.b;});
    if(!a||!b) return;
    var p = center(a), q = center(b);
    var line = document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute("x1",p.x); line.setAttribute("y1",p.y);
    line.setAttribute("x2",q.x); line.setAttribute("y2",q.y);
    line.setAttribute("class", "cable-"+l.cable);
    svgEl.appendChild(line);
  });
}

/* ─── config panel ─── */
function updateConfig(){
  var panel = document.getElementById("configPanel");
  if(!panel) return;
  if(!selected){
    panel.innerHTML = '<p style="color:var(--text-3);font-size:.88rem;text-align:center;margin-top:24px">Select a device to configure it.</p>';
    return;
  }
  var n = selected;
  var def = DEVICE_TYPES[n.type];
  panel.innerHTML =
    '<div class="panel-header"><h3 style="color:'+def.color+'">'+def.icon+' '+n.hostname+'</h3>'
    +'<span class="badge badge-blue">'+def.label+'</span></div>'
    +'<label class="lbl">Hostname</label>'
    +'<input class="inp" id="cf-host" value="'+n.hostname+'" placeholder="Hostname" style="margin-bottom:12px">'
    +'<label class="lbl">IP Address</label>'
    +'<input class="inp inp-mono" id="cf-ip" value="'+n.ip+'" placeholder="192.168.1.x" style="margin-bottom:8px">'
    +'<label class="lbl">Subnet Mask</label>'
    +'<input class="inp inp-mono" id="cf-mask" value="'+n.mask+'" placeholder="255.255.255.0" style="margin-bottom:8px">'
    +'<label class="lbl">Default Gateway</label>'
    +'<input class="inp inp-mono" id="cf-gw" value="'+n.gateway+'" placeholder="192.168.1.1" style="margin-bottom:14px">'
    +'<button class="btn btn-primary btn-sm" id="applyConfig" style="width:100%;justify-content:center">Apply configuration</button>'
    +'<hr style="border:none;border-top:1px solid var(--border);margin:14px 0">'
    +'<div class="tray-title" style="margin-bottom:8px">Connected to</div>'
    +'<div id="connList" style="font-size:.84rem;color:var(--text-2)">'+getConnList(n)+'</div>'
    +'<div class="tray-title" style="margin:12px 0 6px">Connect mode</div>'
    +'<button class="btn btn-ghost btn-sm" id="startConnect" style="width:100%;justify-content:center">🔗 Start connecting…</button>';

  document.getElementById("applyConfig").addEventListener("click", function(){
    n.hostname = document.getElementById("cf-host").value.trim() || n.hostname;
    n.ip = document.getElementById("cf-ip").value.trim();
    n.mask = document.getElementById("cf-mask").value.trim();
    n.gateway = document.getElementById("cf-gw").value.trim();
    var lblEl = document.getElementById("lbl-"+n.id);
    var ipEl = document.getElementById("ip-"+n.id);
    if(lblEl) lblEl.textContent = n.hostname;
    if(ipEl) ipEl.textContent = n.ip || "no IP";
    log("✓ Applied: "+n.hostname+" — "+n.ip+"/"+maskToCidr(n.mask), "good");
    updateConfig();
  });

  document.getElementById("startConnect").addEventListener("click", function(){
    connecting = n;
    log("Tap another device to connect to "+n.hostname+".", "info");
  });
}
function getConnList(n){
  var peers = links.filter(function(l){return l.a===n.id||l.b===n.id;}).map(function(l){
    var peerId = l.a===n.id ? l.b : l.a;
    var peer = nodes.find(function(x){return x.id===peerId;});
    return peer ? '<span style="color:var(--green)">●</span> '+peer.hostname : "";
  });
  return peers.length ? peers.join("<br>") : '<span style="color:var(--text-3)">None yet</span>';
}

/* ─── ping simulation ─── */
function runPing(){
  var src = document.getElementById("pingSrc").value.trim();
  var dst = document.getElementById("pingDst").value.trim();
  if(!src||!dst){ log("Enter source and destination IPs.", "warn"); return; }
  var srcNode = nodes.find(function(n){return n.ip===src;});
  var dstNode = nodes.find(function(n){return n.ip===dst;});
  if(!srcNode){ log("No device with IP "+src+" found.", "bad"); return; }
  if(!dstNode){ log("No device with IP "+dst+" found.", "bad"); return; }
  log("Sending ping: "+src+" → "+dst, "info");

  var path = findPath(srcNode.id, dstNode.id);
  if(!path){ log("Request timed out. No path found between "+srcNode.hostname+" and "+dstNode.hostname+".", "bad"); return; }

  // check subnet reachability
  var reachable = sameSubnet(src, dst, srcNode.mask) || hasRouterPath(path);
  if(!reachable){ log("Destination unreachable. Devices on different subnets need a router between them.", "bad"); return; }

  animatePacket(path, function(){
    log("Reply from "+dst+": bytes=32 time<1ms TTL=64  ✓", "good");
    if(window.Analytics) window.Analytics.track("action","sim:ping-success");
  });
}

function sameSubnet(ipA, ipB, mask){
  try {
    var a=ipToNum(ipA), b=ipToNum(ipB), m=ipToNum(mask);
    return (a&m)===(b&m);
  } catch(e){ return false; }
}
function ipToNum(ip){ var p=ip.split("."); if(p.length!==4)throw"bad"; return ((+p[0])<<24||(+p[1])<<16||(+p[2])<<8||(+p[3]))>>>0; }
function maskToCidr(mask){ try{ var n=ipToNum(mask),c=0; while(n>0){c+=(n&1);n=n>>>1;} return c; }catch(e){return "";} }

function hasRouterPath(path){
  return path.some(function(id){ var n=nodes.find(function(x){return x.id===id;}); return n&&n.type==="router"; });
}

function findPath(startId, endId){
  var queue = [[startId]], visited = {};
  visited[startId] = true;
  while(queue.length){
    var path = queue.shift();
    var cur = path[path.length-1];
    if(cur===endId) return path;
    links.forEach(function(l){
      var next = l.a===cur ? l.b : (l.b===cur ? l.a : null);
      if(next && !visited[next]){ visited[next]=true; queue.push(path.concat(next)); }
    });
  }
  return null;
}

function animatePacket(pathIds, done){
  var pts = pathIds.map(function(id){ return center(nodes.find(function(n){return n.id===id;})); });
  var dot = document.createElementNS("http://www.w3.org/2000/svg","circle");
  dot.setAttribute("r","7"); dot.setAttribute("class","packet");
  dot.setAttribute("stroke","#fff"); dot.setAttribute("stroke-width","1.5");
  svgEl.appendChild(dot);
  var seg=0, t=0;
  (function step(){
    if(seg>=pts.length-1){ dot.remove(); done(); return; }
    var p=pts[seg], q=pts[seg+1]; t+=0.05;
    dot.setAttribute("cx",p.x+(q.x-p.x)*t); dot.setAttribute("cy",p.y+(q.y-p.y)*t);
    if(t>=1){t=0;seg++;} requestAnimationFrame(step);
  })();
}

/* ─── log ─── */
function log(msg, cls){
  var logEl = document.getElementById("simLog");
  if(!logEl) return;
  var line = document.createElement("div");
  line.className = "out-"+(cls||"info");
  line.textContent = msg;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

/* ─── challenges ─── */
function loadChallenge(){
  var id = document.getElementById("challengeSelect").value;
  clearAll(true);
  if(id==="1"){ // connect two PCs via switch
    var sw = addNode("switch",320,200); sw.hostname="SW1"; sw.ip="";
    var pc1 = addNode("pc",130,300); pc1.hostname="PC1"; pc1.ip="192.168.1.10"; pc1.mask="255.255.255.0"; pc1.gateway="192.168.1.1";
    var pc2 = addNode("pc",510,300); pc2.hostname="PC2"; pc2.ip="192.168.1.20"; pc2.mask="255.255.255.0"; pc2.gateway="192.168.1.1";
    updateLabels([sw,pc1,pc2]);
    log("--- Challenge 1: LAN Setup ---","cyan");
    log("Goal: PC1 and PC2 must communicate via the switch.","info");
    log("Connect PC1 → SW1 and PC2 → SW1. Then set IPs in the config panel.","dim");
    log("Both PCs are on 192.168.1.0/24 — they just need a switch to communicate.","dim");
    document.getElementById("pingSrc").value="192.168.1.10";
    document.getElementById("pingDst").value="192.168.1.20";
  } else if(id==="2"){ // inter-vlan routing
    var r = addNode("router",320,80); r.hostname="R1"; r.ip="192.168.1.1"; r.mask="255.255.255.0";
    var sw2 = addNode("switch",200,200); sw2.hostname="SW1";
    var sw3 = addNode("switch",440,200); sw3.hostname="SW2";
    var pc3 = addNode("pc",100,330); pc3.hostname="PC-A"; pc3.ip="192.168.1.10"; pc3.mask="255.255.255.0"; pc3.gateway="192.168.1.1";
    var pc4 = addNode("pc",300,330); pc4.hostname="PC-B"; pc4.ip="192.168.1.20"; pc4.mask="255.255.255.0"; pc4.gateway="192.168.1.1";
    var srv = addNode("server",540,330); srv.hostname="SRV1"; srv.ip="192.168.2.100"; srv.mask="255.255.255.0"; srv.gateway="192.168.2.1";
    updateLabels([r,sw2,sw3,pc3,pc4,srv]);
    log("--- Challenge 2: Inter-VLAN Routing ---","cyan");
    log("Goal: PCs on 192.168.1.0/24 must reach the server on 192.168.2.0/24.","info");
    log("Connect devices. R1 needs IPs on both subnets (Gi0/0 for .1.0, Gi0/1 for .2.0).","dim");
    document.getElementById("pingSrc").value="192.168.1.10";
    document.getElementById("pingDst").value="192.168.2.100";
  } else if(id==="3"){ // DMZ
    var fw = addNode("firewall",320,80); fw.hostname="FW1"; fw.ip="203.0.113.1";
    var internet = addNode("cloud",320,-30); internet.hostname="Internet"; internet.el&&(internet.el.style.top="-30px");
    var dmzSw = addNode("switch",180,200); dmzSw.hostname="DMZ-SW";
    var intSw = addNode("switch",460,200); intSw.hostname="INT-SW";
    var web = addNode("server",100,330); web.hostname="Web-SRV"; web.ip="10.0.0.10"; web.mask="255.255.255.0"; web.gateway="10.0.0.1";
    var ws1 = addNode("pc",380,330); ws1.hostname="WS1"; ws1.ip="172.16.0.10"; ws1.mask="255.255.0.0"; ws1.gateway="172.16.0.1";
    var ws2 = addNode("pc",540,330); ws2.hostname="WS2"; ws2.ip="172.16.0.11"; ws2.mask="255.255.0.0"; ws2.gateway="172.16.0.1";
    updateLabels([fw,internet,dmzSw,intSw,web,ws1,ws2]);
    log("--- Challenge 3: DMZ Architecture ---","cyan");
    log("Goal: Build a DMZ for the web server, isolated from internal workstations.","info");
    log("FW1 connects Internet, DMZ segment (10.0.0.0/24) and Internal LAN (172.16.0.0/16).","dim");
  }
}
function updateLabels(ns){ ns.forEach(function(n){ var lbl=document.getElementById("lbl-"+n.id),ipEl=document.getElementById("ip-"+n.id); if(lbl)lbl.textContent=n.hostname; if(ipEl)ipEl.textContent=n.ip||"no IP"; }); drawWires(); }
function clearAll(silent){
  nodes.forEach(function(n){if(n.el)n.el.remove();});
  nodes=[]; links=[]; selected=null; nextId=1;
  if(svgEl)svgEl.innerHTML="";
  if(!silent){ log("Canvas cleared.","info"); updateConfig(); }
}

window.addEventListener("DOMContentLoaded", init);
window.SimAPI = { addNode, addLink, clearAll };
})();
