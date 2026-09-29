# inno4te Networking Academy 🌐

A **completely free, browser-based networking lab** for first-year networking students and those preparing for **Cisco CCNA**, **CompTIA Network+** and **CompTIA Security+**.

No login. No downloads. No server. Upload to GitHub Pages and it just works — even on slow connections.

A project by **Innocent Forteh — Paid All Links Foundation**.

---

## 🚀 Features

### 🖧 Virtual Network Topology Simulator
- Drag-and-drop routers, switches, PCs, servers, firewalls, Wi-Fi APs and an Internet cloud onto a canvas
- Click one device then another to connect with a cable (auto-detects straight-through, crossover, fiber, serial)
- Configure hostname, IP address, subnet mask and default gateway per device
- Run an animated **ping test** that validates subnets and routing paths
- Three built-in challenges: Simple LAN, Inter-VLAN Routing, DMZ Architecture
- Free-build mode for open exploration

### ⌨️ Cisco IOS CLI Simulator
- Realistic `Router>` / `Router#` / `Router(config)#` prompt levels
- 50+ supported commands: `enable`, `configure terminal`, `interface`, `ip address`, `no shutdown`, `show ip interface brief`, `show ip route`, `show running-config`, `show version`, `show vlan brief`, `ping`, `router ospf`, `vlan`, `switchport`, `hostname`, `copy run start`, and more
- Arrow key command history, Tab autocomplete
- OSPF, RIP, EIGRP, BGP router config modes
- Static route configuration
- VLAN creation and switchport assignment

### 📝 Practice Exam Engine
- **4 certification tracks**: Networking Fundamentals (15q), Network+ (25q), CCNA (25q), Security+ (25q)
- Untimed and **timed** exam modes (45 seconds per question)
- Detailed explanations after every answer
- Score ring with pass/fail (70% threshold)
- Full review of every question after completion
- Question navigator to jump between questions

### 🧮 Subnetting Lab
- Visual subnet calculator with **binary breakdown** showing network vs host bits
- **VLSM planner**: enter host requirements, get optimal subnet assignments
- **Random practice quiz**: generates subnet problems, checks your answer
- Complete **cheat sheet**: all CIDR prefixes /8–/32, private ranges, special addresses
- Step-by-step subnetting method reminder

---

## 📁 File structure

```
inno4te-networking-academy/
├── index.html          ← Academy home with cert tracks
├── simulator.html      ← Network topology simulator
├── exams.html          ← Practice exam engine
├── cli.html            ← Cisco IOS CLI simulator
├── subnetting.html     ← Subnetting lab & calculator
├── css/
│   └── style.css       ← Dark tech design system
├── js/
│   ├── main.js         ← Nav, YouTube lazy-load, exam engine, subnetting logic
│   ├── questions.js    ← Full question bank (90+ questions)
│   ├── simulator.js    ← Network topology simulator
│   └── cli-engine.js   ← Cisco IOS CLI emulator
└── README.md
```

---

## 🌐 Deploy on GitHub Pages (free)

1. Create a GitHub repository (public or private).
2. Upload **all files keeping the folder structure** — `css/`, `js/` must be subfolders.
3. Go to **Settings → Pages → Deploy from branch** → select `main` / `/ (root)`.
4. Your academy is live at `https://<username>.github.io/<repo>/` in about 60 seconds.

Works on Netlify and Cloudflare Pages too — just drag the folder in.

---

## ➕ Adding exam questions

Open `js/questions.js`. Each question follows this format:

```javascript
{
  q: "What is the default AD of OSPF?",
  opts: ["90", "100", "110", "120"],
  a: 2,           // 0-indexed: option 2 = "110"
  exp: "OSPF's administrative distance is 110. EIGRP is 90, RIP is 120."
}
```

Add entries to the correct array (`fundamentals`, `networkplus`, `ccna`, or `securityplus`).
The exam engine picks 15 random questions per session — the more questions you add, the more variety students get.

---

## 🖧 Adding a network simulator challenge

In `js/simulator.js`, find the `loadChallenge()` function and add a new `else if(id==="4")` block.
Use `addNode(type, x, y)` to place devices and call `updateLabels()` to apply hostnames/IPs.
Then add your option to the `<select id="challengeSelect">` in `simulator.html`.

---

## ⌨️ Adding CLI commands

Open `js/cli-engine.js` and find the `runCmd()` function. Add a new `else if(cmd==="yourcommand")` block, or extend an existing section. The engine supports: user / exec / config / config-if / config-vlan / config-router modes.

---

## 📜 License & credit

© inno4te Networking Academy · **Innocent Forteh — Paid All Links Foundation.** All rights reserved.

Share freely for educational purposes. Please keep the footer attribution.
