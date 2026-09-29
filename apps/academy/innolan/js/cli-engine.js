/* ============================================================
   inno4te Networking Academy — Cisco IOS CLI Emulator
   cli-engine.js  |  Realistic IOS command simulation
   ============================================================ */
(function(){
"use strict";

/* ─── device state ─── */
var state = {
  mode: "user",  // user | exec | config | config-if | config-vlan | config-router
  hostname: "Router",
  interfaces: {
    "GigabitEthernet0/0": { ip:"", mask:"", status:"administratively down", desc:"", type:"router" },
    "GigabitEthernet0/1": { ip:"", mask:"", status:"administratively down", desc:"", type:"router" },
    "GigabitEthernet0/2": { ip:"", mask:"", status:"administratively down", desc:"", type:"router" }
  },
  vlans: { 1:{ name:"default", ports:[] } },
  routes: [],
  activeIf: null,
  activeVlan: null,
  activeRouter: null,
  ospf: { pid:null, networks:[] },
  banner: "",
  enablePass: "",
  linePass: "",
  history: [],
  rip: false,
  deviceType: "router"
};

/* ─── prompt ─── */
function prompt(){ 
  var h = state.hostname;
  if(state.mode==="user") return h+">";
  if(state.mode==="exec") return h+"#";
  if(state.mode==="config") return h+"(config)#";
  if(state.mode==="config-if") return h+"(config-if)#";
  if(state.mode==="config-vlan") return h+"(config-vlan)#";
  if(state.mode==="config-router") return h+"(config-router)#";
  return h+">";
}

/* ─── output helpers ─── */
var outputEl;
function print(text, cls){ 
  if(!outputEl) return;
  var div = document.createElement("div");
  div.className = "out-" + (cls||"info");
  div.innerHTML = text;
  outputEl.appendChild(div);
  outputEl.scrollTop = outputEl.scrollHeight;
}
function printCmd(text){ 
  print('<span class="out-dim">'+escHtml(prompt())+'</span> <span class="out-cmd">'+escHtml(text)+'</span>');
}
function escHtml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function updatePrompt(){ 
  var el = document.getElementById("cliPrompt");
  if(el) el.textContent = prompt();
}

/* ─── command processor ─── */
function runCmd(rawInput){
  var input = rawInput.trim();
  if(!input) return;
  state.history.unshift(input);
  printCmd(input);
  var tokens = input.replace(/\s+/g," ").split(" ");
  var cmd = tokens[0].toLowerCase();
  var rest = tokens.slice(1).join(" ");

  // universal
  if(cmd==="exit"||cmd==="end"||cmd==="quit"){
    if(state.mode==="config-if"||state.mode==="config-vlan"||state.mode==="config-router"){ state.mode="config"; state.activeIf=null; state.activeVlan=null; }
    else if(state.mode==="config"){ state.mode="exec"; }
    else if(state.mode==="exec"){ state.mode="user"; }
    if(input==="end"&&state.mode!=="user") state.mode="exec";
  }
  else if(cmd==="enable"||cmd==="en"){ if(state.mode==="user") state.mode="exec"; }
  else if(cmd==="disable"){ if(state.mode==="exec") state.mode="user"; }
  else if(cmd==="?" || input==="?") showHelp();
  // config mode entry
  else if((cmd==="configure"||cmd==="conf")&&rest.match(/^term/i)){ if(state.mode==="exec"){ state.mode="config"; print("Enter configuration commands, one per line. End with CTRL/Z."); } else notPriv(); }
  // hostname
  else if(cmd==="hostname"){ if(state.mode==="config"){ state.hostname=tokens[1]||state.hostname; updatePrompt(); print("Hostname set to "+state.hostname+".", "good"); } else notConf(); }
  // interface
  else if(cmd==="interface"||cmd==="int"){ cmdInterface(rest); }
  // ip commands (in config-if or config)
  else if(cmd==="ip"){ cmdIp(tokens.slice(1)); }
  else if(cmd==="no"){ cmdNo(tokens.slice(1)); }
  // shutdown / no shutdown
  else if(cmd==="shutdown"){ cmdShutdown(); }
  // show commands
  else if(cmd==="show"||cmd==="sh"){ cmdShow(tokens.slice(1)); }
  // ping
  else if(cmd==="ping"){ cmdPing(tokens[1]); }
  // write / copy
  else if(cmd==="write"||cmd==="wr"){ print("Building configuration...", "info"); setTimeout(function(){print("OK","good");},400); }
  else if(cmd==="copy"){ cmdCopy(rest); }
  // description
  else if(cmd==="description"||cmd==="desc"){ if(state.mode==="config-if"&&state.activeIf){ state.interfaces[state.activeIf].desc=rest; print("Description set.","good"); } else notConf(); }
  // vlan
  else if(cmd==="vlan"){ cmdVlan(tokens[1]); }
  else if(cmd==="name"){ if(state.mode==="config-vlan"&&state.activeVlan){ state.vlans[state.activeVlan].name=rest; print("VLAN "+state.activeVlan+" name set to "+rest+".","good"); } }
  // switchport
  else if(cmd==="switchport"){ cmdSwitchport(tokens.slice(1)); }
  // router protocols
  else if(cmd==="router"){ cmdRouter(tokens.slice(1)); }
  else if(cmd==="network"){ cmdNetwork(rest); }
  else if(cmd==="passive-interface"){ print("Passive interface set for: "+rest,"info"); }
  // clear / reload
  else if(cmd==="reload"){ print("%Warning: Reload requested. (Simulated — state preserved in this session)","warn"); }
  else if(cmd==="clear"){ cmdClear(rest); }
  // banner
  else if(cmd==="banner"){ print("Banner configured (simulated).","info"); }
  else if(cmd==="service"){ print("Service parameter set (simulated).","info"); }
  else if(cmd==="line"){ print("Line configuration mode — use 'password' and 'login' to set line auth.","info"); state.mode="config"; }
  else if(cmd==="password"){ print("Password set.","info"); }
  else if(cmd==="login"){ print("Login authentication enabled.","info"); }
  else if(cmd==="cdp"){ print("CDP configured (simulated).","info"); }
  else if(cmd==="spanning-tree"){ print("STP configured (simulated).","info"); }
  else { print("% Unknown command: '"+escHtml(input)+"'. Type '?' for help.","bad"); }

  updatePrompt();
}

/* ─── interface command ─── */
function cmdInterface(rest){
  if(state.mode!=="config"&&state.mode!=="config-if"){ notConf(); return; }
  // normalize: gi0/0 → GigabitEthernet0/0
  var normalized = normalizeIf(rest);
  if(!state.interfaces[normalized]){
    // create it
    state.interfaces[normalized] = { ip:"", mask:"", status:"administratively down", desc:"", type:guessIfType(normalized) };
  }
  state.activeIf = normalized;
  state.mode = "config-if";
  print("Entering "+normalized+" configuration mode.","info");
}
function normalizeIf(s){
  s = s.trim().toLowerCase();
  if(/^gi\s*(\d+\/\d+)/.test(s)) return "GigabitEthernet" + s.match(/(\d+\/\d+)/)[1];
  if(/^g\s*(\d+\/\d+)/.test(s)) return "GigabitEthernet" + s.match(/(\d+\/\d+)/)[1];
  if(/^gigabitethernet(\d+\/\d+)/.test(s)) return "GigabitEthernet" + s.match(/(\d+\/\d+)/)[1];
  if(/^fa\s*(\d+\/\d+)/.test(s)) return "FastEthernet" + s.match(/(\d+\/\d+)/)[1];
  if(/^se\s*(\d+\/\d+)/.test(s)) return "Serial" + s.match(/(\d+\/\d+)/)[1];
  if(/^lo\s*(\d+)/.test(s)) return "Loopback" + s.match(/(\d+)/)[1];
  if(/^vlan\s*(\d+)/i.test(s)) return "Vlan" + s.match(/(\d+)/)[1];
  return s; // fallback
}
function guessIfType(s){ if(/vlan/i.test(s))return"vlan"; if(/serial/i.test(s))return"serial"; if(/loop/i.test(s))return"loopback"; return"router"; }

/* ─── ip command ─── */
function cmdIp(parts){
  var sub = parts[0]&&parts[0].toLowerCase();
  if(sub==="address"||sub==="add"){
    if(state.mode!=="config-if"){ print("% Must be in interface configuration mode.","bad"); return; }
    var ip=parts[1], mask=parts[2];
    if(!ip){ print("% Incomplete command. Usage: ip address [ip] [mask]","bad"); return; }
    if(!mask) mask="255.255.255.0";
    if(!validIp(ip)){ print("% Invalid IP address: "+escHtml(ip),"bad"); return; }
    state.interfaces[state.activeIf].ip = ip;
    state.interfaces[state.activeIf].mask = mask;
    if(state.interfaces[state.activeIf].status==="administratively down")
      state.interfaces[state.activeIf].status = "administratively down";
    print("IP address "+ip+" "+mask+" configured on "+state.activeIf+".","good");
  } else if(sub==="route"){
    if(state.mode!=="config"){ notConf(); return; }
    var net=parts[1],msk=parts[2],nh=parts[3];
    if(!net||!msk||!nh){ print("% Incomplete. Usage: ip route [network] [mask] [next-hop|exit-if]","bad"); return; }
    state.routes.push({net:net, mask:msk, nexthop:nh, ad:1, type:"S"});
    print("Static route added: "+net+" "+msk+" via "+nh,"good");
  } else if(sub==="helper-address"){
    print("DHCP helper address set: "+parts[1],"good");
  } else if(sub==="ospf"){ print("OSPF interface parameter configured.","info"); }
  else { print("% ip "+escHtml(parts.join(" "))+" — subcommand not recognized.","bad"); }
}

/* ─── no command ─── */
function cmdNo(parts){
  if(parts[0]&&parts[0].toLowerCase()==="shutdown"){
    if(state.mode!=="config-if"||!state.activeIf){ print("% Must be in interface configuration mode.","bad"); return; }
    state.interfaces[state.activeIf].status = "up";
    print(state.activeIf+" is now up, line protocol is up","good");
  } else if(parts[0]&&parts[0].toLowerCase()==="ip"&&parts[1]&&parts[1].toLowerCase()==="address"){
    if(state.activeIf){ state.interfaces[state.activeIf].ip=""; state.interfaces[state.activeIf].mask=""; print("IP address removed from "+state.activeIf+".","info"); }
  } else if(parts[0]&&parts[0].toLowerCase()==="shutdown"){
    // handled above
  } else { print("% 'no "+escHtml(parts.join(" "))+"' executed (simulated).","info"); }
}

/* ─── shutdown ─── */
function cmdShutdown(){
  if(state.mode!=="config-if"||!state.activeIf){ print("% Must be in interface configuration mode.","bad"); return; }
  state.interfaces[state.activeIf].status = "administratively down";
  print(state.activeIf+" is now administratively down.","warn");
}

/* ─── show commands ─── */
function cmdShow(parts){
  var sub = (parts[0]||"").toLowerCase();
  var sub2 = (parts[1]||"").toLowerCase();
  if(state.mode==="user"&&sub!=="version"){ print("% Exec mode required. Type 'enable' first.","bad"); return; }

  if(sub==="ip"&&sub2==="interface"){ showIpIntBrief(parts[2]); }
  else if(sub==="ip"&&sub2==="route"){ showRoutes(); }
  else if(sub==="ip"&&sub2==="ospf"){ showOspf(); }
  else if(sub==="ip"&&sub2==="protocols"){ showProtocols(); }
  else if(sub==="interfaces"||sub==="interface"){ showInterfaces(parts.slice(1).join(" ")); }
  else if(sub==="vlan"){ showVlan(); }
  else if(sub==="running-config"||sub==="run"){ showRunningConfig(); }
  else if(sub==="startup-config"||sub==="start"){ print("% Startup config not saved. Use 'copy run start' to save.","warn"); }
  else if(sub==="version"){ showVersion(); }
  else if(sub==="cdp"&&sub2==="neighbors"){ showCDP(); }
  else if(sub==="mac"&&sub2==="address-table"){ showMacTable(); }
  else if(sub==="arp"){ showArp(); }
  else if(sub==="clock"){ print(new Date().toString(),"info"); }
  else { print("% show "+escHtml(parts.join(" "))+" — not recognized. Try: ip interface brief, ip route, vlan, running-config, version","bad"); }
}

function showIpIntBrief(filter){
  print('<span style="color:var(--text-3)">Interface              IP-Address      OK?  Method  Status                Protocol</span>');
  Object.keys(state.interfaces).forEach(function(name){
    var iface = state.interfaces[name];
    if(filter && !name.toLowerCase().includes(filter.toLowerCase())) return;
    var ip = iface.ip || "unassigned    ";
    var ok = iface.ip ? "YES" : "NO ";
    var status = iface.status;
    var proto = iface.status==="up" ? "up" : "down";
    var ipPad = ip.padEnd(16,' ');
    var namePad = name.padEnd(23,' ');
    var statusColor = iface.status==="up" ? "var(--green)" : "var(--red)";
    print('<span class="out-dim">'+namePad+'</span>'
      +' <span class="out-cyan">'+ipPad+'</span>'
      +' '+ok+'  manual  '
      +'<span style="color:'+statusColor+'">'+status.padEnd(22,' ')+'</span>'
      +' <span style="color:'+(proto==="up"?"var(--green)":"var(--red)")+'">'+proto+'</span>');
  });
}

function showRoutes(){
  print('<span style="color:var(--text-3)">Codes: C - connected, S - static, R - RIP, O - OSPF, * - candidate default</span>');
  print('<span style="color:var(--text-3)">Gateway of last resort is not set</span>');
  print("");
  Object.keys(state.interfaces).forEach(function(name){
    var iface=state.interfaces[name];
    if(iface.ip && iface.mask){
      var net=networkAddr(iface.ip,iface.mask);
      var cidr=maskToCidr(iface.mask);
      print('C    '+net+'/'+cidr+' is directly connected, '+name,"good");
    }
  });
  state.routes.forEach(function(r){
    var c = r.type==="O"?"out-cyan":r.type==="R"?"out-warn":"";
    print(r.type+'    '+r.net+'/'+maskToCidr(r.mask)+' ['+r.ad+'/'+r.metric+'] via '+r.nexthop, c);
  });
}

function showRunningConfig(){
  print("Building configuration...","info");
  print(""); print('!');
  print('version 15.7');
  print('hostname '+state.hostname,'cmd');
  print('!');
  Object.keys(state.interfaces).forEach(function(name){
    var iface=state.interfaces[name];
    print('interface '+name,'cmd');
    if(iface.desc) print(' description '+iface.desc);
    if(iface.ip) print(' ip address '+iface.ip+' '+iface.mask,'cyan');
    else print(' no ip address');
    if(iface.status!=="up") print(' shutdown','warn');
    else print(' no shutdown','good');
    print('!');
  });
  state.routes.forEach(function(r){
    print('ip route '+r.net+' '+r.mask+' '+r.nexthop,'cyan');
  });
  print('!'); print('end');
}

function showVersion(){
  print("Cisco IOS Software, Version 15.7(3)M [inno4te simulation]");
  print("Compiled: inno4te Networking Academy CLI Simulator");
  print(""); print("Hostname: "+state.hostname);
  print("Uptime: "+Math.floor(Math.random()*72)+" hours, "+Math.floor(Math.random()*60)+" minutes");
  print("RAM: 512MB  Flash: 256MB");
  print(""); print("Type 'show ip interface brief' to see interfaces.");
}

function showVlan(){
  print('<span style="color:var(--text-3)">VLAN  Name                   Status    Ports</span>');
  print('<span style="color:var(--text-3)">----  ---------------------- --------- ---------------------------</span>');
  Object.keys(state.vlans).forEach(function(id){
    var v=state.vlans[id];
    var ports = v.ports.length ? v.ports.join(", ") : "";
    var idP = String(id).padEnd(6,' ');
    var nameP = v.name.padEnd(23,' ');
    print(idP+nameP+" active    "+ports);
  });
}

function showCDP(){
  print("Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge,");
  print("                  S - Switch, H - Host, I - IGMP, r - Repeater");
  print("");
  print("Device ID        Local Intrfce   Holdtme    Capability  Platform   Port ID");
  print("(No CDP neighbors discovered — add and connect devices in the simulator)","dim");
}
function showMacTable(){
  print("          Mac Address Table");
  print("-------------------------------------------");
  print("Vlan    Mac Address       Type        Ports");
  print("----    -----------       --------    -----");
  print("   1    aabb.cc00.1234    DYNAMIC     Gi0/0");
  print("   1    aabb.cc00.5678    DYNAMIC     Gi0/1");
}
function showArp(){
  print("Protocol  Address          Age(min)  Hardware Addr    Type   Interface");
  Object.keys(state.interfaces).forEach(function(n){
    var i=state.interfaces[n]; if(!i.ip) return;
    var mac="aabb."+Math.floor(Math.random()*9999).toString(16).padStart(4,'0')+"."+Math.floor(Math.random()*9999).toString(16).padStart(4,'0');
    print("Internet  "+i.ip.padEnd(17,' ')+"  -         "+mac+"  ARPA   "+n);
  });
}
function showOspf(){
  if(!state.ospf.pid){ print("% OSPF not configured. Use: router ospf [process-id]","warn"); return; }
  print("Routing Process "+state.ospf.pid+" with ID "+state.hostname+".local");
  print("Start time: 00:00:00, Time elapsed: 00:01:23");
  print("Supports only single TOS(TOS0) routes"); print("Supports opaque LSA");
  print("Number of areas in this router: 1 normal 0 stub 0 nssa");
  state.ospf.networks.forEach(function(n){print("  Network "+n+" area 0");});
}
function showProtocols(){
  print("*** IP Routing is NSF aware ***");
  print("Routing Protocol is \"connected\"");
  if(state.routes.length||state.ospf.pid){
    if(state.ospf.pid) print("Routing Protocol is \"ospf "+state.ospf.pid+"\"");
    if(state.routes.length) print("Routing Protocol is \"static\"");
  }
}
function showInterfaces(filter){
  Object.keys(state.interfaces).forEach(function(name){
    if(filter && !name.toLowerCase().includes(filter.replace(/\s+/g,'').toLowerCase())) return;
    var iface=state.interfaces[name];
    var up=iface.status==="up";
    print(name+" is "+(up?"up":"<span style='color:var(--red)'>administratively down</span>")+", line protocol is "+(up?"<span style='color:var(--green)'>up</span>":"<span style='color:var(--red)'>down</span>"));
    print("  Description: "+(iface.desc||"(not set)"));
    if(iface.ip) print("  Internet address is "+iface.ip+"/"+maskToCidr(iface.mask),"cyan");
    else print("  Internet address: not set");
    print("  MTU 1500 bytes, BW 1000000 Kbit, DLY 10 usec");
    print("  Last 5 min input rate 0 bits/sec — Last 5 min output rate 0 bits/sec","dim");
  });
}

/* ─── ping ─── */
function cmdPing(ip){
  if(!ip){ print("Usage: ping [ip-address]","bad"); return; }
  if(!validIp(ip)){ print("% Invalid IP: "+escHtml(ip),"bad"); return; }
  var myIps = Object.values(state.interfaces).filter(function(i){return i.ip&&i.status==="up";}).map(function(i){return{ip:i.ip,mask:i.mask};});
  print("Sending 5, 100-byte ICMP Echos to "+ip+", timeout is 2 seconds:","info");
  var reachable = myIps.some(function(m){ return sameSubnet(m.ip, ip, m.mask); });
  var routeReachable = state.routes.some(function(r){ return networkContains(r.net, r.mask, ip); });
  var success = reachable || routeReachable;
  setTimeout(function(){
    if(success){
      print("!!!!!", "good");
      print("Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms","good");
    } else {
      print(".....", "bad");
      print("Success rate is 0 percent (0/5)","bad");
      print("% Hint: Is the interface up? Is there a route? Try 'show ip route'","warn");
    }
  }, 600);
}

/* ─── vlan ─── */
function cmdVlan(id){
  if(state.mode!=="config"){ notConf(); return; }
  var vid = parseInt(id);
  if(isNaN(vid)||vid<1||vid>4094){ print("% VLAN ID must be 1–4094","bad"); return; }
  if(!state.vlans[vid]) state.vlans[vid]={name:"VLAN"+vid,ports:[]};
  state.activeVlan=vid; state.mode="config-vlan";
  print("VLAN "+vid+" created/selected.","good");
}

/* ─── switchport ─── */
function cmdSwitchport(parts){
  if(state.mode!=="config-if"){ print("% Must be in interface config mode.","bad"); return; }
  var sub=(parts[0]||"").toLowerCase();
  if(sub==="mode"){ print("Switchport mode set to "+(parts[1]||"")+" on "+state.activeIf+".","good"); }
  else if(sub==="access"&&(parts[1]||"").toLowerCase()==="vlan"){
    var vid=parseInt(parts[2]);
    if(!isNaN(vid)){
      if(!state.vlans[vid]) state.vlans[vid]={name:"VLAN"+vid,ports:[]};
      state.vlans[vid].ports.push(state.activeIf);
      print("Port "+state.activeIf+" assigned to VLAN "+vid+".","good");
    }
  }
  else if(sub==="trunk"&&(parts[1]||"").toLowerCase()==="encapsulation"){
    print("Trunk encapsulation set to "+parts[2]+" on "+state.activeIf+".","info");
  }
  else if(sub==="trunk"&&(parts[1]||"").toLowerCase()==="allowed"){
    print("Trunk allowed VLANs set on "+state.activeIf+".","info");
  }
  else { print("Switchport parameter applied (simulated).","info"); }
}

/* ─── router protocols ─── */
function cmdRouter(parts){
  if(state.mode!=="config"){ notConf(); return; }
  var proto=(parts[0]||"").toLowerCase();
  if(proto==="ospf"){ var pid=parseInt(parts[1])||1; state.ospf.pid=pid; state.mode="config-router"; print("Entering OSPF process "+pid+" config.","good"); }
  else if(proto==="rip"){ state.rip=true; state.mode="config-router"; print("Entering RIP config.","good"); }
  else if(proto==="eigrp"){ state.mode="config-router"; print("Entering EIGRP AS "+(parts[1]||"1")+" config.","good"); }
  else if(proto==="bgp"){ state.mode="config-router"; print("Entering BGP AS "+(parts[1]||"65001")+" config.","good"); }
  else { print("% Unknown routing protocol: "+escHtml(proto),"bad"); }
}
function cmdNetwork(rest){
  if(state.mode!=="config-router"){ print("% Must be in router config mode.","bad"); return; }
  state.ospf.networks.push(rest);
  print("Network statement added: "+rest+".","good");
}

/* ─── copy ─── */
function cmdCopy(rest){
  var r=rest.toLowerCase();
  if(r.includes("run")&&r.includes("start")){ print("Destination filename [startup-config]?"); print("[OK]","good"); }
  else if(r.includes("start")&&r.includes("run")){ print("Startup config loaded.","good"); }
  else if(r.includes("tftp")){ print("Address or name of remote host? (simulated)","info"); print("[OK] Configuration loaded from TFTP (simulated).","good"); }
  else { print("copy "+escHtml(rest)+" — operation simulated.","info"); }
}
function cmdClear(rest){
  if(rest.toLowerCase().includes("log")){ if(outputEl)outputEl.innerHTML=""; print("Log cleared.","info"); }
  else print("clear "+escHtml(rest)+" — simulated.","info");
}

/* ─── help ─── */
function showHelp(){
  var helps = {
    user: [
      ["enable","Enter privileged EXEC mode"],["show version","Display system info"],["?","Show available commands"]
    ],
    exec: [
      ["configure terminal","Enter global config mode"],["show ip interface brief","Interface summary"],
      ["show ip route","Display routing table"],["show running-config","Current configuration"],
      ["show vlan brief","VLAN table (switch)"],["show interfaces","Interface details"],
      ["ping [ip]","Test connectivity"],["write / copy run start","Save configuration"],
      ["reload","Restart device"],["disable","Return to user mode"]
    ],
    config: [
      ["hostname [name]","Set device name"],["interface [gi0/0]","Enter interface config"],
      ["ip route [net] [mask] [nh]","Add static route"],["router ospf [pid]","Configure OSPF"],
      ["router rip","Configure RIP"],["vlan [id]","Create a VLAN (switch)"],
      ["no shutdown","Enable an interface"],["end","Return to exec mode"]
    ],
    "config-if": [
      ["ip address [ip] [mask]","Assign IP address"],["no shutdown","Bring interface up"],
      ["shutdown","Disable interface"],["description [text]","Set description"],
      ["switchport mode access","Set access port (switch)"],["switchport access vlan [id]","Assign VLAN"],
      ["exit","Return to global config"]
    ]
  };
  var cmds = helps[state.mode] || helps.user;
  print('<span style="color:var(--text-3)">Available commands in '+state.mode+' mode:</span>');
  cmds.forEach(function(c){ print('  <span class="out-cmd">'+c[0]+'</span>  <span class="out-dim">'+c[1]+'</span>'); });
}

/* ─── util ─── */
function notPriv(){ print("% Privilege level insufficient. Type 'enable' first.","bad"); }
function notConf(){ print("% Must be in configuration mode. Type 'configure terminal'.","bad"); }
function validIp(ip){ return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)&&ip.split(".").every(function(o){return +o<=255;}); }
function maskToCidr(mask){ try{var n=ipN(mask),c=0;while(n>0){c+=(n&1);n=n>>>1;}return c;}catch(e){return 0;} }
function ipN(ip){ var p=ip.split(".");return ((+p[0])<<24|(+p[1])<<16|(+p[2])<<8|(+p[3]))>>>0; }
function networkAddr(ip,mask){ return numToIp(ipN(ip)&ipN(mask)); }
function numToIp(n){ return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join("."); }
function sameSubnet(a,b,m){ try{return (ipN(a)&ipN(m))===(ipN(b)&ipN(m));}catch(e){return false;} }
function networkContains(net,mask,ip){ try{return (ipN(net)&ipN(mask))===(ipN(ip)&ipN(mask));}catch(e){return false;} }

/* ─── history navigation ─── */
var histIdx = -1;
function handleKey(e, inputEl){
  if(e.key==="Enter"){ runCmd(inputEl.value); inputEl.value=""; histIdx=-1; }
  else if(e.key==="ArrowUp"){ histIdx=Math.min(histIdx+1,state.history.length-1); if(histIdx>=0) inputEl.value=state.history[histIdx]; }
  else if(e.key==="ArrowDown"){ histIdx=Math.max(histIdx-1,-1); inputEl.value=histIdx>=0?state.history[histIdx]:""; }
  else if(e.key==="Tab"){ e.preventDefault(); autoComplete(inputEl); }
}
function autoComplete(inputEl){
  var v=inputEl.value.toLowerCase().trim();
  var cmds=["show","configure","interface","ip","no","ping","enable","disable","exit","end","hostname","vlan","router","network","copy","write","clear","reload","switchport","shutdown","description"];
  var match=cmds.filter(function(c){return c.startsWith(v);});
  if(match.length===1){ inputEl.value=match[0]+" "; }
  else if(match.length>1){ print(match.join("  "),"dim"); }
}

/* ─── boot ─── */
window.addEventListener("DOMContentLoaded", function(){
  outputEl = document.getElementById("cliOutput");
  var inputEl = document.getElementById("cliInput");
  if(!outputEl||!inputEl) return;
  updatePrompt();

  print("    _                 _  _   _         ","dim");
  print("   (_) _ __  _ __   ___| || |_ ___     ","dim");
  print("   | || '_ \\| '_ \\ / _ \\ || __/ _ \\   ","dim");
  print("   | || | | | | | | (_) |__| ||  __/   ","dim");
  print("   |_||_| |_|_| |_|\\___/____/\\___|   ","dim");
  print("");
  print("inno4te Networking Academy — Cisco IOS Simulator","info");
  print("IOS Version 15.7(3)M  |  Hostname: "+state.hostname,"cyan");
  print("");
  print("Type '?' or 'help' for available commands.","dim");
  print("Type 'enable' to enter privileged EXEC mode.","dim");
  print("");
  updatePrompt();

  inputEl.addEventListener("keydown", function(e){ handleKey(e, inputEl); });
  // focus on load
  inputEl.focus();
  document.getElementById("cliScreen") && document.getElementById("cliScreen").addEventListener("click", function(){ inputEl.focus(); });
});
})();
