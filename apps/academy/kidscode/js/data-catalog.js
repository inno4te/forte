/* =================================================================
   TEAM21 ACADEMY — DATA MODULE (Part 1: Catalog & Config)
   ================================================================= */

const T21 = {};

/* --- AGE GROUPS --- */
T21.ageGroups = [
  {
    id:'explorers', label:'Little Explorers', ages:'6–8', icon:'🐣',
    css:'a1', badgeCss:'badge-orange',
    desc:'Drag, drop & discover! Visual coding with Scratch and Blockly.',
    langs:['Scratch','Blockly'],
    pillCss:['at-pill-scratch','at-pill-block'],
  },
  {
    id:'builders', label:'Junior Builders', ages:'9–11', icon:'🚀',
    css:'a2', badgeCss:'badge-green',
    desc:'Animations, mini-games and your first real Python programs!',
    langs:['Scratch','Python'],
    pillCss:['at-pill-scratch','at-pill-python'],
  },
  {
    id:'creators', label:'Code Creators', ages:'12–14', icon:'⚡',
    css:'a3', badgeCss:'badge-blue',
    desc:'Build real apps, websites and C programs like a pro.',
    langs:['Python','HTML/CSS','C'],
    pillCss:['at-pill-python','at-pill-web','at-pill-c'],
  },
  {
    id:'innovators', label:'Teen Innovators', ages:'15–18', icon:'🧠',
    css:'a4', badgeCss:'badge-purple',
    desc:'Master AI, robotics, Java and C++ — launch your tech career.',
    langs:['Python','C/C++','Java','AI'],
    pillCss:['at-pill-python','at-pill-c','at-pill-java','at-pill-ai'],
  },
];

/* --- COURSES --- */
T21.courses = {
  explorers: [
    { id:'scratch',  icon:'🐱', title:'Scratch Adventures',  banner:'scratch',  level:'Beginner',     age:'6–8',  desc:'Build your first animations and mini-games with colourful drag-and-drop blocks. No typing needed — just creativity!', lang:'Scratch',     lessons:6, labEnabled:false, est:'4–5 hrs' },
    { id:'blockly',  icon:'🧩', title:'Blockly Puzzles',     banner:'blockly',  level:'Beginner',     age:'6–8',  desc:'Solve coding puzzles and make characters move. Learn logic, loops and sequences through play!',                    lang:'Blockly',     lessons:5, labEnabled:false, est:'3–4 hrs' },
  ],
  builders: [
    { id:'scratch2', icon:'🎮', title:'Scratch Game Design', banner:'scratch',  level:'Beginner+',    age:'9–11', desc:'Design full interactive games with score, lives, levels and sound effects in Scratch!',                           lang:'Scratch',     lessons:6, labEnabled:false, est:'5–6 hrs' },
    { id:'python1',  icon:'🐍', title:'Python for Kids',     banner:'python',   level:'Beginner',     age:'9–11', desc:'Your first real programming language! Make the computer follow your exact instructions.',                         lang:'Python',      lessons:7, labEnabled:true,  est:'6–7 hrs' },
  ],
  creators: [
    { id:'python2',  icon:'⚡', title:'Python Projects',     banner:'python',   level:'Intermediate', age:'12–14',desc:'Build games, quiz apps, and file programs with real Python code.',                                               lang:'Python',      lessons:6, labEnabled:true,  est:'7–8 hrs' },
    { id:'web',      icon:'🌐', title:'Web Development',     banner:'web',      level:'Intermediate', age:'12–14',desc:'Design and publish your own websites with HTML, CSS, and JavaScript.',                                          lang:'HTML/CSS/JS', lessons:7, labEnabled:true,  est:'7–8 hrs' },
    { id:'clang',    icon:'⚙️', title:'C Programming',       banner:'clang',    level:'Advanced',     age:'12–14',desc:'Learn the language that powers OS, games and embedded devices. Fast, precise, powerful.',                       lang:'C',           lessons:6, labEnabled:true,  est:'6–7 hrs' },
  ],
  innovators: [
    { id:'python3',  icon:'🧬', title:'Python & Machine Learning', banner:'python', level:'Advanced',  age:'15–18',desc:'Machine learning, data science and AI fundamentals using Python — the world\'s #1 AI language.',                lang:'Python / AI', lessons:6, labEnabled:true,  est:'8–9 hrs' },
    { id:'java',     icon:'☕', title:'Java Development',    banner:'java',     level:'Advanced',     age:'15–18',desc:'Master OOP — the language behind Android apps, enterprise software and much more.',                              lang:'Java',        lessons:6, labEnabled:true,  est:'7–8 hrs' },
    { id:'cpp',      icon:'🔧', title:'C++ Engineering',     banner:'cpp',      level:'Expert',       age:'15–18',desc:'High-performance programming for game engines, robotics and systems software.',                                 lang:'C++',         lessons:6, labEnabled:true,  est:'7–8 hrs' },
    { id:'robotics', icon:'🤖', title:'Robotics & IoT',      banner:'robotics', level:'Expert',       age:'15–18',desc:'Programme physical robots and smart IoT devices using C and Python.',                                          lang:'C / Python',  lessons:6, labEnabled:true,  est:'6–7 hrs' },
    { id:'ai',       icon:'✨', title:'AI & How Claude Thinks', banner:'ai',    level:'Expert',       age:'15–18',desc:'Go inside modern AI: how it\'s built, how neural networks learn, how LLMs like Claude actually work, and how to talk to them like a pro.', lang:'AI / NLP', lessons:8, labEnabled:true, est:'8–10 hrs', featured:true },
  ],
};

/* --- LEVEL BADGE MAPPING --- */
T21.levelBadge = {
  'Beginner':'badge-green','Beginner+':'badge-green',
  'Intermediate':'badge-blue','Advanced':'badge-orange','Expert':'badge-pink',
};

/* --- HELPER: flatten all courses --- */
T21.allCourses = function() { return Object.values(T21.courses).flat(); };
T21.findCourse = function(id) { return T21.allCourses().find(c => c.id === id); };
T21.findGroupForCourse = function(id) {
  for (const [gid, list] of Object.entries(T21.courses)) {
    if (list.find(c => c.id === id)) return gid;
  }
  return null;
};
