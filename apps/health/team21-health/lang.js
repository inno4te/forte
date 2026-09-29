/* ============================================================
   Team21 Health Platform — Translation System (EN ↔ FR)
   ============================================================
   - Default language: English
   - Toggle button in nav: switches all visible text
   - Choice persists in window.storage as 't21:lang'
   - Two-layer approach:
     1. UI/static strings → FR_UI dictionary (key-based)
     2. Dynamic data (topics, remedies, etc.) → FR_DATA (id-keyed deep map)
   - Helper functions: T(key), Td(scope, id, field) used by render code
============================================================ */

const T21Lang = {
  current: (function(){
    try{
      const v = localStorage.getItem('t21:lang');
      if(v === 'fr' || v === 'en') return v;
    }catch(_){}
    return 'en';
  })(),
  ready: false,

  async init(){
    // current was already set synchronously from localStorage at script load
    // Also try persistent storage as a backup (for cross-device sync)
    if(T21 && T21.storage){
      try{
        const r = await T21.storage.get('t21:lang');
        if(r && r.value){
          const v = JSON.parse(r.value);
          if((v === 'fr' || v === 'en') && v !== this.current){
            this.current = v;
            try{ localStorage.setItem('t21:lang', v); }catch(_){}
          }
        }
      }catch(_){}
    }
    document.documentElement.lang = this.current;
    this.ready = true;
    this.injectToggle();
    if(this.current === 'fr') this.applyFR();
  },

  async setLang(lang){
    if(lang !== 'en' && lang !== 'fr') return;
    this.current = lang;
    document.documentElement.lang = lang;
    try{ localStorage.setItem('t21:lang', lang); }catch(_){}
    if(T21 && T21.storage){
      try{ await T21.storage.set('t21:lang', JSON.stringify(lang)); }catch(_){}
    }
    // Easiest reliable approach: reload page so all render code runs again with the new language
    location.reload();
  },

  injectToggle(){
    const nav = document.getElementById('navCta');
    if(!nav) { setTimeout(()=>this.injectToggle(), 100); return; }
    if(document.getElementById('langToggle')) return;
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'btn btn-sm lang-toggle';
    btn.title = this.current==='en' ? 'Passer en français' : 'Switch to English';
    btn.innerHTML = `<span class="lang-flag">🌐</span><span class="lang-label">${this.current==='en'?'FR':'EN'}</span>`;
    btn.addEventListener('click', ()=> this.setLang(this.current==='en' ? 'fr' : 'en'));
    nav.insertBefore(btn, nav.firstChild);
  },

  /* ===== T() — translate a UI key ===== */
  T(key, fallback){
    if(this.current === 'en') return fallback !== undefined ? fallback : key;
    if(FR_UI[key]) return FR_UI[key];
    return fallback !== undefined ? fallback : key;
  },

  /* ===== Td() — translate data field by scope+id+field ===== */
  Td(scope, id, field, fallback){
    if(this.current === 'en') return fallback;
    const s = FR_DATA[scope];
    if(!s) return fallback;
    const entry = s[id];
    if(!entry) return fallback;
    if(field === undefined) return entry;
    return entry[field] !== undefined ? entry[field] : fallback;
  },

  /* ===== DOM walker for static HTML content ===== */
  applyFR(){
    // Translate elements with data-i18n="key" — handled here so static HTML can be tagged
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n;
      if(FR_UI[key]) el.innerHTML = FR_UI[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.dataset.i18nPlaceholder;
      if(FR_UI[key]) el.placeholder = FR_UI[key];
    });
    // Walk free-text nodes against PHRASE map (longest-first)
    this.walkText(document.body);
  },

  walkText(root){
    const SKIP = new Set(['SCRIPT','STYLE','TEXTAREA','INPUT','CODE','PRE']);
    const phrases = Object.keys(FR_PHRASES).sort((a,b)=>b.length-a.length);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node)=>{
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if(SKIP.has(node.parentNode.nodeName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n; while(n = walker.nextNode()) nodes.push(n);
    nodes.forEach(node=>{
      let txt = node.nodeValue;
      const trimmed = txt.trim();
      if(FR_PHRASES[trimmed]){
        node.nodeValue = txt.replace(trimmed, FR_PHRASES[trimmed]);
        return;
      }
      // try substring replacement only for known phrases
      let replaced = txt;
      for(const p of phrases){
        if(replaced.includes(p)){
          replaced = replaced.split(p).join(FR_PHRASES[p]);
        }
      }
      if(replaced !== txt) node.nodeValue = replaced;
    });
  }
};

/* ============================================================
   FR_UI — short interface strings (button labels, headings, etc.)
============================================================ */
const FR_UI = {
  // Nav
  'nav.home':'Accueil',
  'nav.risks':'Risques',
  'nav.body':'Systèmes',
  'nav.act':'Agir',
  'nav.notes':'Mes notes',
  'nav.community':'Communauté',
  'nav.evidence':'Sources',
  'nav.carcinogens':'Bibliothèque des cancérogènes',
  'nav.additives':'Additifs alimentaires',
  'nav.lifestyle':'Mode de vie & environnement',
  'nav.african':'Alimentation africaine',
  'nav.heart':'Cœur & circulation',
  'nav.sleep':'Sommeil',
  'nav.brain':'Cerveau & esprit',
  'nav.gut':'Intestin & digestion',
  'nav.kidneys':'Reins & foie',
  'nav.skin':'Peau',
  'nav.eyes':'Yeux & vision',
  'nav.women':'Santé féminine',
  'nav.men':'Santé masculine',
  'nav.proposals':'Propositions',
  'nav.remedies':'Remèdes naturels',
  'nav.tracker':'Suivi quotidien',
  'nav.quizzes':'Quiz',
  'nav.medicines':'Médicaments & alternatives',
  'nav.encouragement':'Foi & encouragement',

  // Buttons
  'btn.bookmark':'☆ Favori',
  'btn.bookmarked':'★ En favori',
  'btn.note':'✎ Ajouter une note',
  'btn.ask':'? Poser une question',
  'btn.signin':'Se connecter',
  'btn.register':'Créer un compte',
  'btn.signout':'Se déconnecter',
  'btn.save':'Enregistrer',
  'btn.delete':'Supprimer',
  'btn.edit':'Modifier',
  'btn.cancel':'Annuler',
  'btn.tryagain':'Réessayer',
  'btn.openTracker':'Ouvrir le suivi →',
  'btn.takeQuiz':'Faire un quiz',
  'btn.takeHeartQuiz':'Faire le quiz du cœur',
  'btn.takeSleepQuiz':'Faire le quiz du sommeil',
  'btn.takeCookingQuiz':'Faire le quiz cuisine',
  'btn.backToList':'Retour à la liste',
  'btn.backToAll':'Retour à tous les quiz',
  'btn.postAnswer':'Publier une réponse',
  'btn.submitQuestion':'Soumettre la question',
  'btn.newNote':'+ Nouvelle note',
  'btn.printNotes':'Imprimer toutes les notes',
  'btn.askQuestion':'+ Poser une question',
  'btn.resetDay':'Réinitialiser la journée',
  'btn.printWeekly':'Imprimer le résumé hebdomadaire',
  'btn.saveProgress':'Enregistrer',
  'btn.saveNote':'Enregistrer la note',
  'btn.saveChanges':'Enregistrer les modifications',
  'btn.remove':'Retirer',
  'btn.browse':'Parcourir la bibliothèque →',
  'btn.startTracking':'Commencer le suivi',
  'btn.askQ':'Poser une question',
  'btn.viewProposals':'Voir les propositions →',

  // Auth modal
  'auth.welcomeBack':'Bon retour',
  'auth.signinSub':'Connectez-vous pour enregistrer votre activité.',
  'auth.create':'Créez votre compte',
  'auth.createSub':'Un compte gratuit sauvegarde votre suivi, vos notes et vos questions.',
  'auth.fullName':'Nom complet',
  'auth.email':'Adresse e-mail',
  'auth.password':'Mot de passe',
  'auth.signin':'Se connecter',
  'auth.createAcc':'Créer le compte',
  'auth.newHere':'Nouveau ici ? ',
  'auth.haveAcc':'Vous avez déjà un compte ? ',
  'auth.linkCreate':'Créer un compte',
  'auth.linkSignin':'Se connecter',
  'auth.privacy':'Vos données sont stockées de manière privée dans votre compte Team21. Nous ne partageons ni ne vendons jamais vos informations.',
  'auth.fillAll':'Veuillez remplir tous les champs.',
  'auth.validEmail':'Entrez une adresse e-mail valide.',
  'auth.passShort':'Le mot de passe doit comporter au moins 6 caractères.',
  'auth.exists':'Le compte existe. Veuillez vous connecter.',
  'auth.noAccount':'Aucun compte trouvé pour cet e-mail.',
  'auth.wrongPass':'Mot de passe incorrect.',
  'auth.created':'Compte créé.',
  'auth.signedIn':'Connecté.',
  'auth.signedOut':'Déconnecté',

  // Common page elements
  'common.search':'Rechercher',
  'common.evidence':'Sources',
  'common.bookmarked':'Mis en favori',
  'common.removed':'Favori retiré',
  'common.noteSaved':'Note enregistrée',
  'common.questionSubmitted':'Question soumise',
  'common.noteEmpty':'La note ne peut pas être vide',
  'common.writeAnswer':'Veuillez d\'abord écrire une réponse',
  'common.writeQuestion':'Veuillez écrire une question',
  'common.signInToSave':'Connectez-vous pour sauvegarder votre activité',
  'common.signInToPost':'Connectez-vous pour publier une question',
  'common.signInToAnswer':'Connectez-vous pour répondre',
  'common.saved':'Enregistré',
  'common.deleted':'Supprimé',
  'common.noteAddedToday':'Note enregistrée avec la journée',
  'common.confirmDelete':'Supprimer cette note ?',

  // Page metas / labels
  'meta.edition':'Édition',
  'meta.sources':'Sources',
  'meta.coverage':'Contenu',
  'meta.editor':'Éditeur',
  'meta.evidence':'BASÉ SUR DES PREUVES<br>SOURCÉ · CITÉ<br>MIS À JOUR EN 2026',
  'meta.daily':'16 HABITUDES · QUOTIDIEN<br>SAUVEGARDE AUTOMATIQUE<br>RÉSUMÉ IMPRIMABLE',
  'meta.private':'PRIVÉ · CHIFFRÉ AU REPOS<br>MODIFIER · IMPRIMER · EXPORTER',
  'meta.public':'PUBLIC · MODÉRÉ<br>CONNECTEZ-VOUS POUR PUBLIER<br>LECTURE OUVERTE À TOUS',
  'meta.proposals':'24 PROPOSITIONS<br>SOURCÉES<br>FAVORI + SUIVI',
  'meta.iarcEtc':'IARC · OMS · NIH<br>AICR · USPSTF<br>LANCET · BMJ · NEJM · JAMA',
  'meta.cookbook':'40+ ALIMENTS<br>MÉTHODES DE CUISSON CLASSÉES<br>BASÉ SUR DES PREUVES',
  'meta.remedies':'15+ REMÈDES<br>USAGES · DOSES · PRÉCAUTIONS<br>SOURCES CITÉES',
  'meta.quizzes':'8 QUIZ<br>~50 QUESTIONS<br>EXPLICATIONS &amp; SOURCES',
  'meta.cat':'5 CATÉGORIES<br>~35 ENTRÉES<br>MISE À JOUR MENSUELLE',
  'meta.add':'9 ADDITIFS<br>40+ ALIAS<br>SOURCES : IARC · EFSA · JECFA · FDA',
  'meta.life':'3 SOUS-SECTIONS<br>ENV · MODE DE VIE · PROF<br>SOURCES : IARC · OMS · NIH',

  // Sections
  'sec.knowNumbers':'Les chiffres qui <em>comptent</em>',
  'sec.practices':'Pratiques à <em>fort impact</em>',
  'sec.foodsHelp':'Les aliments qui <em>aident</em>',
  'sec.seekHelp':'Quand <em>consulter</em>',
  'sec.trackHabits':'Suivez ces habitudes au quotidien',
  'sec.trackHabitsBody':'Connectez-vous pour mettre en favori, ajouter des notes privées, ou poser une question. Le suivi quotidien renforce les habitudes qui comptent.',

  // Quiz UI
  'quiz.choose':'Choisissez un <em>quiz</em>',
  'quiz.questionOf':'Question {n} sur {total}',
  'quiz.answered':'{n} / {total} répondues',
  'quiz.questions':'questions',
  'quiz.lastScore':'Dernier score',
  'quiz.yourScore':'Votre score',
  'quiz.explanation':'Explication',
  'quiz.outstanding':'Excellent',
  'quiz.outstandingSub':'Vous maîtrisez ce sujet à un niveau clinique. Envisagez de répondre aux questions du forum Communauté Q&R.',
  'quiz.strong':'Bonne maîtrise',
  'quiz.strongSub':'Vous avez l\'essentiel. Relisez les explications de ce que vous avez manqué.',
  'quiz.good':'Bon début',
  'quiz.goodSub':'Cela vaut la peine de revisiter la section liée, puis de réessayer.',
  'quiz.review':'À revoir',
  'quiz.reviewSub':'Prenez quelques minutes avec la section liée, puis revenez à ce quiz.',

  // Tracker
  'tracker.greeting':'Votre suivi quotidien',
  'tracker.welcome':'Bienvenue, {name}',
  'tracker.todayScore':'Score du jour',
  'tracker.streak':'Série actuelle',
  'tracker.weekAvg':'Moyenne sur 7 jours',
  'tracker.account':'Compte',
  'tracker.guest':'Invité',
  'tracker.signInTitle':'Connectez-vous pour commencer le suivi',
  'tracker.signInBody':'Vos enregistrements quotidiens, séries et résumés imprimables sont sauvegardés dans votre compte gratuit Team21.',
  'tracker.todayNote':'Note du jour',
  'tracker.todayNoteHint':'(optionnel, sauvegardé avec la journée)',
  'tracker.notePlaceholder':'Comment vous sentez-vous ? Y a-t-il quelque chose à noter aujourd\'hui — symptômes, expositions, victoires, défis ?',

  // Notes page
  'notes.title':'Mes <em>notes</em> &amp; favoris',
  'notes.intro':'Tout ce que vous avez sauvegardé sur la plateforme — vos notes privées, les sujets mis en favori et les questions soumises. Visible uniquement par vous.',
  'notes.signInTitle':'Connectez-vous pour voir vos notes',
  'notes.signInBody':'Vos notes, favoris et questions soumises sont sauvegardés dans votre compte gratuit Team21.',
  'notes.yourNotes':'Vos <em>notes</em>',
  'notes.yourBookmarks':'Vos <em>favoris</em>',
  'notes.bookmarksSub':'Sujets et propositions mis en favori — cliquez pour revoir.',
  'notes.yourQuestions':'Vos <em>questions</em>',
  'notes.questionsSub':'Historique de toutes les questions soumises, publiques ou privées.',
  'notes.empty':'Pas encore de notes',
  'notes.emptyBody':'Cliquez sur « + Nouvelle note » ou ajoutez une note sur n\'importe quelle page de sujet pour commencer votre journal privé.',
  'notes.emptyBookmarks':'Pas encore de favoris',
  'notes.emptyBookmarksBody':'Mettez un sujet ou une proposition en favori pour le garder ici pour référence rapide.',
  'notes.emptyQuestions':'Pas encore de questions',
  'notes.emptyQuestionsBody':'Utilisez le bouton « Poser une question » sur n\'importe quel sujet, ou publiez dans le forum communautaire.',

  // Community
  'comm.title':'Demandez. Répondez. <em>Apprenez ensemble.</em>',
  'comm.intro':'Un forum public pour les questions sur les sujets de la plateforme — et pour partager ce que vous avez appris avec d\'autres. Tous les messages proviennent d\'utilisateurs inscrits ; soyez respectueux, factuel et citez vos sources.',
  'comm.empty':'Pas encore de questions publiques',
  'comm.emptyBody':'Soyez le premier à demander. Cliquez sur « Poser une question » ci-dessus pour commencer un fil.',
  'comm.noMatches':'Aucune correspondance',
  'comm.broaden':'Essayez un terme de recherche plus large.',
  'comm.noAnswers':'Pas encore de réponses — soyez le premier à répondre',
  'comm.askedBy':'Posée par',
  'comm.answers':'réponses',
  'comm.answer':'réponse',
  'comm.shareAnswer':'Partagez une réponse, une source ou une expérience…',
  'comm.searchPlaceholder':'Rechercher dans les questions — sujet, mot-clé, auteur…',
  'comm.wantToAsk':'Vous voulez demander ou répondre ?',
  'comm.wantToAskBody':'Vous pouvez lire le forum sans compte — mais pour publier une question ou une réponse, un compte Team21 gratuit est nécessaire.',

  // Misc / footer
  'foot.brand':'Une ressource complète de prévention basée sur des preuves — cartographiant les facteurs alimentaires, environnementaux, comportementaux et systémiques impliqués dans le cancer, les maladies cardiovasculaires, les troubles métaboliques et les maladies chroniques — tirée de IARC, OMS, NIH, AHA, AICR et des principales revues médicales.',
  'foot.risks':'Risques',
  'foot.body':'Systèmes',
  'foot.act':'Agir',
  'foot.allrights':'Tous droits réservés.',
  'foot.editedby':'Édité par Innocent Forteh · Usage éducatif uniquement · Ne constitue pas un avis médical.',
};

/* ============================================================
   FR_PHRASES — common longer free-text strings (page heros, intros, etc.)
   These run as substring replacements after data-i18n attributes apply.
============================================================ */
const FR_PHRASES = {

  // Hero / brand
  'Team21 Health Platform':'Plateforme Santé Team21',
  'Preventive Intelligence · Est. 2025':'Intelligence préventive · Depuis 2025',
  'Preventive Intelligence':'Intelligence préventive',
  'A Peer-Reviewed Preventive Health Resource':'Une ressource de santé préventive validée par des pairs',
  'The science of':'La science de',
  'not':'ne pas',
  'getting sick.':'tomber malade.',

  // Common section titles seen across pages
  'Browse the library':'Parcourir la bibliothèque',
  'Start tracking':'Commencer le suivi',
  'Ask a question':'Poser une question',
  'Open library':'Ouvrir la bibliothèque',
  'Decode labels':'Décoder les étiquettes',
  'Read the evidence':'Lire les preuves',
  'See proposals':'Voir les propositions',
  'Open the pantry':'Ouvrir le garde-manger',
  'Take a quiz':'Faire un quiz',
  'Take the heart quiz':'Faire le quiz du cœur',
  'Take the sleep quiz':'Faire le quiz du sommeil',
  'Take the cooking quiz':'Faire le quiz cuisine',
  'Join the conversation':'Rejoindre la conversation',
  'Open →':'Ouvrir →',
  'Open tracker →':'Ouvrir le suivi →',

  // Hero copy
  'A comprehensive, evidence-based platform mapping the dietary, environmental, and behavioural factors implicated in cancer and chronic disease — drawn from IARC monographs, WHO position papers, NIH reviews, and peer-reviewed cohort studies.':'Une plateforme complète, basée sur des preuves, qui cartographie les facteurs alimentaires, environnementaux et comportementaux impliqués dans le cancer et les maladies chroniques — tirée des monographies de l\'IARC, des prises de position de l\'OMS, des revues du NIH et d\'études de cohortes validées par des pairs.',
  'of cancers are preventable':'des cancers sont évitables',
  'of global deaths from NCDs':'des décès mondiaux dus aux MNT',
  'of new cancer cases linked to modifiable risk':'des nouveaux cas de cancer liés à des risques modifiables',
  '— WHO, Cancer Prevention (2023)':'— OMS, Prévention du cancer (2023)',
  '— WHO, Noncommunicable Diseases Factsheet':'— OMS, Fiche sur les maladies non transmissibles',
  '— American Cancer Society, 2024':'— American Cancer Society, 2024',
  'Care for every':'Prendre soin de chaque',
  'system in the body':'système du corps',
  'Nine dedicated sections, each with the targets, practices, foods and red-flag symptoms specific to that organ system — grounded in IARC, WHO, AHA, NIH and peer-reviewed evidence.':'Neuf sections dédiées, chacune avec les objectifs, pratiques, aliments et symptômes d\'alerte propres à ce système — fondées sur l\'IARC, l\'OMS, l\'AHA, le NIH et des preuves validées par des pairs.',
  'Heart & Circulation':'Cœur & circulation',
  'BP, cholesterol, exercise, salt, the cardio-friendly plate. Nine high-impact practices and when to seek emergency help.':'TA, cholestérol, exercice, sel, l\'assiette amie du cœur. Neuf pratiques à fort impact et quand demander l\'aide d\'urgence.',
  'Sleep & Recovery':'Sommeil & récupération',
  'The four stages of sleep explained, why deep and REM sleep matter, and a seven-day sleep reset protocol.':'Les quatre stades du sommeil expliqués, pourquoi le sommeil profond et paradoxal comptent, et un protocole de remise à zéro sur sept jours.',
  'Brain & Mind':'Cerveau & esprit',
  'Cognitive reserve, mid-life hearing loss, the MIND diet, mental health — what protects 40% of dementia risk.':'Réserve cognitive, perte auditive en milieu de vie, régime MIND, santé mentale — ce qui protège 40 % du risque de démence.',
  'Gut & Digestion':'Intestin & digestion',
  '30+ plants a week, fibre targets, fermented foods, gut-brain axis, and the red-flag symptoms not to ignore.':'30+ plantes par semaine, objectifs en fibres, aliments fermentés, axe intestin-cerveau et les symptômes à ne pas ignorer.',
  'Kidneys & Liver':'Reins & foie',
  'The silent organs. NSAID caution, salt, alcohol, and why most "detox" remedies are at best useless and at worst toxic.':'Les organes silencieux. Précautions avec les AINS, sel, alcool, et pourquoi la plupart des « détox » sont au mieux inutiles, au pire toxiques.',
  'Skin Health':'Santé de la peau',
  'SPF, the ABCDE rule for moles, gentle cleansing, acne and the lifestyle factors that age skin fastest.':'SPF, règle ABCDE pour les grains de beauté, nettoyage doux, acné, et les facteurs qui vieillissent la peau le plus vite.',
  'Eyes & Vision':'Yeux & vision',
  'The 20-20-20 rule, why outdoor time prevents myopia in children, lutein for macular health, urgent symptoms.':'La règle 20-20-20, pourquoi le temps en plein air prévient la myopie chez l\'enfant, la lutéine pour la macula, symptômes urgents.',
  'Women\'s Health':'Santé féminine',
  'HPV, cervical and breast screening, iron and folate, pelvic floor, bone health, modern menopause care.':'HPV, dépistage du col et du sein, fer et folate, plancher pelvien, santé osseuse, prise en charge moderne de la ménopause.',
  'Men\'s Health':'Santé masculine',
  'Colorectal, prostate and testicular screening, mental health, and why ED is often an early vascular warning.':'Dépistage colorectal, prostatique et testiculaire, santé mentale, et pourquoi la DE est souvent un signal vasculaire précoce.',
  'Know the':'Connaître les',
  'Use the':'Utiliser les',
  'risks':'risques',
  'tools':'outils',
  'From understanding hazards, to decoding food labels, to evidence-based natural remedies and daily habit tracking — eight more sections complete the platform.':'De la compréhension des dangers au décodage des étiquettes, des remèdes naturels fondés sur des preuves au suivi quotidien — huit sections supplémentaires complètent la plateforme.',
  'The Carcinogen Library':'La bibliothèque des cancérogènes',
  'Detailed entries for every major dietary, environmental, occupational and lifestyle carcinogen, with IARC classification, common sources, hidden label aliases and the evidence behind the risk.':'Fiches détaillées pour chaque cancérogène alimentaire, environnemental, professionnel et lié au mode de vie, avec classification IARC, sources courantes, alias d\'étiquettes cachés et preuves derrière le risque.',
  'Food Additives Decoded':'Additifs alimentaires décodés',
  'Carrageenan, aspartame, nitrites, BHA/BHT, titanium dioxide, dyes, MSG aliases, emulsifiers, potassium bromate — what they are, every name they hide behind, and where they appear.':'Carraghénane, aspartame, nitrites, BHA/BHT, dioxyde de titane, colorants, alias du MSG, émulsifiants, bromate de potassium — ce qu\'ils sont, tous leurs noms cachés et où ils apparaissent.',
  'African Diet & Cooking':'Alimentation & cuisine africaine',
  '40+ traditional foods rated, ten cooking methods ranked, and the chemistry of frying, roasting, grilling and smoking — what to keep, what to change.':'40+ aliments traditionnels évalués, dix méthodes de cuisson classées, et la chimie de la friture, du rôtissage, de la grillade et du fumage — que garder, que changer.',
  'Natural Remedies':'Remèdes naturels',
  'Ginger, lemongrass, cloves, turmeric, garlic, hibiscus, moringa, leafy greens — 15+ pantry staples with peer-reviewed evidence behind them. And what doesn\'t work.':'Gingembre, citronnelle, clous de girofle, curcuma, ail, hibiscus, moringa, légumes-feuilles — 15+ produits de garde-manger soutenus par des preuves. Et ce qui ne marche pas.',
  'Lifestyle & Environment':'Mode de vie & environnement',
  'Obesity, sedentary behaviour, sleep loss, chronic stress, infections, oral health, sun, air pollution and radon — the everyday exposures with the strongest evidence behind them.':'Obésité, sédentarité, manque de sommeil, stress chronique, infections, santé bucco-dentaire, soleil, pollution de l\'air et radon — les expositions quotidiennes les mieux documentées.',
  '24 Evidence-Based Proposals':'24 propositions fondées sur des preuves',
  'Practical, peer-reviewed practices — from Mediterranean diet patterns to radon testing — each mapped to its primary supporting study.':'Pratiques validées par des pairs — du régime méditerranéen au test du radon — chacune reliée à son étude principale.',
  'Daily Habit Tracker':'Suivi quotidien des habitudes',
  'Sign in to check off 16 daily habits, watch your weekly streak, and print a clinical-grade summary for your records or your physician.':'Connectez-vous pour cocher 16 habitudes quotidiennes, suivre votre série hebdomadaire, et imprimer un résumé de qualité clinique pour vos archives ou votre médecin.',
  'Knowledge Quizzes':'Quiz de connaissances',
  'Eight short quizzes — carcinogens, heart, sleep, cooking, natural remedies, sleep cycle, skin & eyes, kidneys — about 50 questions with explanations and sources.':'Huit courts quiz — cancérogènes, cœur, sommeil, cuisine, remèdes naturels, cycle du sommeil, peau & yeux, reins — environ 50 questions avec explications et sources.',
  'Community Q&A':'Questions & réponses communautaires',
  'Submit your own questions, leave notes on entries, and read what others are asking. Sign in to post; anyone can read.':'Soumettez vos questions, laissez des notes et lisez ce que les autres demandent. Connectez-vous pour publier ; tout le monde peut lire.',
  'Save anything, anywhere':'Sauvegardez tout, partout',
  'Bookmarks, notes and tracker data persist across devices once you sign in. No card. No upsell.':'Favoris, notes et données de suivi persistent sur tous vos appareils une fois connecté. Sans carte. Sans publicité.',
  'Notes on every entry':'Des notes sur chaque entrée',
  'Add private notes against any topic. Ask the community a question directly from the source entry.':'Ajoutez des notes privées sur n\'importe quel sujet. Posez une question à la communauté directement depuis la source.',
  'Take it to your doctor':'Apportez-le à votre médecin',
  'A one-click weekly summary prints a clinical-grade record of your habits for any clinical conversation.':'Un résumé hebdomadaire en un clic imprime un dossier de qualité clinique de vos habitudes pour toute conversation médicale.',
  'Every claim, sourced':'Chaque affirmation, sourcée',
  'Each entry is footed with its IARC monograph, WHO guideline or peer-reviewed citation — verifiable, not vibes.':'Chaque entrée est notée avec sa monographie IARC, ses recommandations OMS ou sa citation validée par des pairs — vérifiable, pas une intuition.',

  // Pull quote
  'Prevention is not the avoidance of life. It is the construction of an environment, a routine, and a mindset in which the cellular machinery of the body is given its best possible chance to keep working — quietly, reliably, for as long as we live.':'La prévention n\'est pas un évitement de la vie. C\'est la construction d\'un environnement, d\'une routine et d\'un état d\'esprit dans lesquels la machinerie cellulaire du corps reçoit la meilleure chance possible de continuer à fonctionner — discrètement, fidèlement, aussi longtemps que nous vivons.',
  '— Editorial, Team21 Health Platform':'— Éditorial, Plateforme Santé Team21',

  // System page common
  'Targets that':'Cibles qui',
  'matter':'comptent',
  'High-impact':'À fort impact',
  'practices':'pratiques',
  'Nine high-impact':'Neuf pratiques à fort impact',
  'Foods that':'Aliments qui',
  'help':'aident',
  'Eat regularly':'À consommer régulièrement',
  'Limit or avoid':'À limiter ou à éviter',
  'Track these habits daily':'Suivez ces habitudes au quotidien',
  'Sign in to bookmark practices, leave private notes, or ask the community a question. The Daily Tracker reinforces the habits that matter.':'Connectez-vous pour mettre en favori, ajouter des notes privées ou poser une question à la communauté. Le suivi quotidien renforce les habitudes qui comptent.',
  'EVIDENCE-BASED':'BASÉ SUR DES PREUVES',
  'SOURCED · CITED':'SOURCÉ · CITÉ',
  'UPDATED 2026':'MIS À JOUR EN 2026',
  'Body Systems · Cardiovascular':'Systèmes corporels · Cardiovasculaire',
  'Body Systems · Sleep':'Systèmes corporels · Sommeil',
  'Body Systems · Neurological':'Systèmes corporels · Neurologique',
  'Body Systems · Digestive':'Systèmes corporels · Digestif',
  'Body Systems · Filtration & Detox':'Systèmes corporels · Filtration & détox',
  'Body Systems · Integument':'Systèmes corporels · Téguments',
  'Body Systems · Vision':'Systèmes corporels · Vision',
  'Body Systems · Women\'s Health':'Systèmes corporels · Santé féminine',
  'Body Systems · Men\'s Health':'Systèmes corporels · Santé masculine',

  // Heart page
  'When to':'Quand',
  'seek help':'consulter',
  'Sudden, severe chest pain or pressure':'Douleur ou pression thoracique soudaine et sévère',
  'Especially if accompanied by shortness of breath, sweating, nausea, or pain radiating to arm, jaw, neck or back. Call emergency services. Chewing aspirin 300 mg may help if you have no contraindications.':'Surtout en cas d\'essoufflement, sueurs, nausées ou douleur irradiant vers le bras, la mâchoire, le cou ou le dos. Appelez les urgences. Mâcher 300 mg d\'aspirine peut aider en l\'absence de contre-indications.',
  'Sudden one-sided weakness, slurred speech, or facial droop':'Faiblesse soudaine d\'un côté, élocution troublée ou affaissement facial',
  'Possible stroke — time-critical. Call emergency services immediately. Note the time symptoms started: it determines treatment options.':'AVC possible — chaque minute compte. Appelez immédiatement les urgences. Notez l\'heure de début des symptômes : elle détermine les options de traitement.',
  'Palpitations with chest pain, dizziness or fainting':'Palpitations avec douleur thoracique, vertige ou évanouissement',
  'Could indicate a serious arrhythmia. Seek urgent evaluation.':'Peut indiquer une arythmie grave. Demandez une évaluation urgente.',
  'New, persistent breathlessness; ankle swelling; waking gasping at night':'Essoufflement nouveau et persistant ; chevilles enflées ; réveil avec sensation d\'étouffement la nuit',
  'May indicate heart failure. See a clinician within days, not weeks.':'Peut indiquer une insuffisance cardiaque. Consultez en quelques jours, pas en quelques semaines.',
  'Calf pain, redness, swelling — especially after travel or immobility':'Douleur, rougeur, gonflement du mollet — surtout après un voyage ou une immobilisation',
  'Possible deep vein thrombosis. Seek evaluation; do not massage the leg.':'Possible thrombose veineuse profonde. Faites évaluer ; ne massez pas la jambe.',
  'If you remember nothing else from this page, remember these numbers. Each is the threshold at which independent risk-reduction starts to flatten.':'Si vous ne deviez retenir qu\'une chose de cette page, retenez ces chiffres. Chacun est le seuil où la réduction indépendante du risque commence à s\'atténuer.',
  'The cardio-friendly':'L\'assiette',
  'plate':'amie du cœur',
  'The Team21 Daily Tracker includes salt awareness, alcohol-free days, 30+ minutes of movement, sleep hours, mindfulness, and produce intake — all of which feed directly into cardiovascular protection. Sign in and start checking off today.':'Le suivi quotidien Team21 inclut la sensibilisation au sel, les jours sans alcool, 30+ minutes de mouvement, les heures de sommeil, la pleine conscience et la consommation de fruits/légumes — autant de leviers de protection cardiovasculaire. Connectez-vous et commencez aujourd\'hui.',

  // Sleep page
  'Inside one':'À l\'intérieur d\'une',
  'night':'nuit',
  'of sleep':'de sommeil',
  'A typical adult cycles through four stages of sleep roughly every 90 minutes, completing 4–6 cycles per night. The composition shifts: deep slow-wave sleep dominates early in the night, REM dominates toward morning. Each stage has distinct biological functions — cutting any of them short has consequences.':'Un adulte typique enchaîne quatre stades de sommeil environ toutes les 90 minutes, complétant 4 à 6 cycles par nuit. La composition évolue : le sommeil lent profond domine en début de nuit, le sommeil paradoxal vers le matin. Chaque stade a des fonctions biologiques distinctes — en raccourcir un a des conséquences.',
  'The four stages of sleep':'Les quatre stades du sommeil',
  'N1 · LIGHT':'N1 · LÉGER',
  'N2 · LIGHT':'N2 · LÉGER',
  'N3 · DEEP':'N3 · PROFOND',
  'REM · DREAM':'PARADOXAL · RÊVE',
  'Falling asleep':'Endormissement',
  'Stable sleep':'Sommeil stable',
  'Slow-wave (deep) sleep':'Sommeil lent (profond)',
  'Rapid Eye Movement':'Mouvements oculaires rapides',
  '~5% of total':'~5 % du total',
  '~45% of total':'~45 % du total',
  '~25% of total · early night':'~25 % du total · début de nuit',
  '~20–25% · later night':'~20–25 % · fin de nuit',
  'The brief transition from waking to sleeping. Heart rate slows; muscles relax; you may experience hypnic jerks. Easily woken.':'La brève transition de l\'éveil au sommeil. Le rythme cardiaque ralentit ; les muscles se détendent ; possibles secousses hypniques. Facile à réveiller.',
  'The largest portion of sleep. Body temperature drops, heart rate slows further. Sleep spindles and K-complexes consolidate memory and protect from waking.':'La part la plus importante du sommeil. La température corporelle baisse, le rythme cardiaque ralentit encore. Les fuseaux et complexes K consolident la mémoire et protègent des éveils.',
  'The most physically restorative stage. Growth hormone is released, immune memory is forged, and the glymphatic system clears β-amyloid and other metabolic waste from the brain.':'Le stade le plus physiquement réparateur. L\'hormone de croissance est libérée, la mémoire immunitaire se forge, et le système glymphatique élimine le β-amyloïde et autres déchets métaboliques du cerveau.',
  'Brain activity rivals waking; eyes dart under closed lids; major muscles are paralysed (atonia). The substrate for vivid dreaming, emotional regulation, and creative problem-solving.':'L\'activité cérébrale rivalise avec l\'éveil ; les yeux bougent sous les paupières ; les muscles principaux sont paralysés (atonie). Substrat des rêves vifs, de la régulation émotionnelle et de la résolution créative.',
  'What chronic short sleep does':'Ce que fait un manque chronique de sommeil',
  'Sleeping <6 hours regularly is independently associated with increased risk of cardiovascular disease, hypertension, type 2 diabetes, obesity, depression, anxiety, and reduced immune function. Cognitive performance after several nights of 5-hour sleep is comparable to mild alcohol intoxication — and the people most affected are usually the least aware of it.':'Dormir moins de 6 heures de façon régulière est associé indépendamment à un risque accru de maladie cardiovasculaire, hypertension, diabète de type 2, obésité, dépression, anxiété et baisse de l\'immunité. Après plusieurs nuits à 5 heures, les performances cognitives sont comparables à une légère intoxication alcoolique — et les plus affectés sont souvent les moins conscients.',
  'How much you':'De combien vous',
  'need':'avez besoin',
  'Nine evidence-based':'Neuf pratiques',
  'Signs you may have a':'Signes possibles d\'un',
  'sleep disorder':'trouble du sommeil',
  'The seven-day':'La remise à zéro',
  'sleep reset':'sur sept jours',
  'If your sleep is poor, try this for one week before considering anything else:':'Si votre sommeil est mauvais, essayez ceci une semaine avant tout le reste :',
  'Track your sleep':'Suivez votre sommeil',
  'The Team21 Daily Tracker includes a "7–9 hours of sleep" habit. Across a week or month you will see whether sleep is consistently meeting your target.':'Le suivi quotidien Team21 inclut une habitude « 7–9 heures de sommeil ». Sur une semaine ou un mois, vous verrez si votre sommeil atteint régulièrement votre cible.',

  // African diet
  'Regional Focus · African Diet & Cooking':'Focus régional · Alimentation & cuisine africaine',
  'The African plate,':'L\'assiette africaine,',
  'examined':'examinée',
  'Traditional African cuisines contain some of the most nutritionally sophisticated food patterns in the world — abundant leafy greens, legumes, whole grains like fonio, millet and sorghum, fermented foods, and slow-cooked stews. They also include practices that, in their modern industrialised form, drive cardiovascular disease and cancer risk: heavy salt from bouillon cubes, repeatedly reused frying oil, ultra-processed "convenience" foods, and increasingly charred grilled meats. This page maps what to keep, what to change, and how to cook with the best evidence.':'Les cuisines africaines traditionnelles comptent parmi les modèles alimentaires les plus sophistiqués au monde — légumes-feuilles abondants, légumineuses, céréales complètes comme le fonio, le mil et le sorgho, aliments fermentés et plats mijotés. Elles incluent aussi des pratiques qui, sous leur forme industrielle moderne, augmentent les risques cardiovasculaires et de cancer : sel excessif des cubes bouillons, huile de friture réutilisée, aliments ultra-transformés, et viandes grillées trop carbonisées. Cette page indique ce qu\'il faut garder, modifier et comment cuisiner selon les meilleures preuves.',
  'The food':'La',
  'map':'carte des aliments',
  'Coloured bars indicate evidence-based health rating.':'Les barres colorées indiquent une note santé basée sur les preuves.',
  'Green':'Vert',
  '— eat freely.':'— consommer librement.',
  'Amber':'Ambre',
  '— moderate, with caveats.':'— modérer, avec précautions.',
  'Red':'Rouge',
  '— limit or rethink the preparation.':'— limiter ou repenser la préparation.',
  'Cooking methods,':'Méthodes de cuisson,',
  'ranked':'classées',
  'How you cook matters as much as what you cook. The chemistry of heat, fat, and time determines whether a meal nourishes or damages.':'Comment vous cuisinez compte autant que ce que vous cuisinez. La chimie de la chaleur, de la graisse et du temps détermine si un repas nourrit ou abîme.',
  'Frying, roasting & the':'Friture, rôtissage & la',
  'chemistry of heat':'chimie de la chaleur',
  'What deep frying produces':'Ce que produit la friture',
  'What charcoal-grilling produces':'Ce que produit la grillade au charbon',
  'What roasting and baking produce':'Ce que produit le rôtissage et la cuisson au four',
  'What smoking and salt-curing produce':'Ce que produit le fumage et le salaison',
  'Five':'Cinq',
  'swaps':'échanges',
  'that reduce risk without changing your cuisine':'qui réduisent le risque sans changer votre cuisine',
  'The traditional pattern worth':'Le modèle traditionnel à',
  'defending':'défendre',
  'Many traditional African food patterns — built around legumes, leafy greens, whole grains, fermented foods, fish, modest quantities of meat, and slow-cooked stews — closely resemble the Mediterranean and Okinawan diets that show the strongest evidence in long-lived populations. The damage to cardiometabolic health is largely a recent phenomenon driven by ultra-processed imports, palm-oil deep frying, sugary drinks, and the displacement of fonio/sorghum/millet/yam by white rice and instant noodles. The opportunity is enormous: small adjustments to preparation and a return to traditional staples can produce outsized benefits.':'De nombreux modèles alimentaires africains traditionnels — bâtis sur les légumineuses, les légumes-feuilles, les céréales complètes, les aliments fermentés, le poisson, des quantités modérées de viande et des plats mijotés — ressemblent étroitement aux régimes méditerranéen et okinawan, ceux qui montrent les preuves les plus solides dans les populations à grande longévité. Les dommages cardiométaboliques sont largement un phénomène récent, dû aux imports ultra-transformés, à la friture à l\'huile de palme, aux boissons sucrées, et au remplacement du fonio, du sorgho, du mil et de l\'igname par le riz blanc et les nouilles instantanées. L\'opportunité est énorme : de petits ajustements de préparation et un retour aux aliments traditionnels peuvent produire des bénéfices considérables.',
  'See related sections':'Sections connexes',

  // Natural remedies
  'Pantry & Garden · Evidence-Based':'Garde-manger & jardin · Basé sur des preuves',
  'Spices, herbs & foods that':'Épices, herbes & aliments qui',
  'actually work':'fonctionnent vraiment',
  'A pragmatic field guide to the household plants, spices and foods with credible peer-reviewed evidence behind them — ginger, lemongrass, cloves, turmeric, garlic, hibiscus, moringa, leafy greens, nuts and more. The aim is to separate established benefits from folklore, and to give practical preparation guidance. None of this replaces a doctor for serious illness.':'Un guide pratique des plantes, épices et aliments du quotidien soutenus par des preuves crédibles validées par des pairs — gingembre, citronnelle, clous de girofle, curcuma, ail, hibiscus, moringa, légumes-feuilles, fruits à coque, etc. L\'objectif : séparer les bénéfices établis du folklore et donner des conseils pratiques de préparation. Rien ne remplace un médecin en cas de maladie grave.',
  'An honest framing':'Un cadrage honnête',
  'Foods and herbs can support health — they cannot reliably cure serious disease. The remedies below have credible evidence for specific, often modest effects. They are not substitutes for vaccinations, prescribed medications, cancer treatment, or evaluation of serious symptoms. Some interact with medications (garlic, ginger, turmeric with anticoagulants; grapefruit with many drugs); discuss any regular medicinal use with your clinician.':'Les aliments et plantes peuvent soutenir la santé — ils ne guérissent pas de manière fiable les maladies graves. Les remèdes ci-dessous ont des preuves crédibles pour des effets spécifiques, souvent modestes. Ils ne remplacent ni les vaccinations, ni les médicaments prescrits, ni les traitements du cancer, ni l\'évaluation de symptômes graves. Certains interagissent avec des médicaments (ail, gingembre, curcuma avec les anticoagulants ; pamplemousse avec de nombreux médicaments) ; discutez de tout usage médicinal régulier avec votre médecin.',
  'The':'Le',
  'pantry':'garde-manger',
  'Putting it':'Mettre tout cela',
  'together':'ensemble',
  '— practical combinations':'— combinaisons pratiques',
  'For nausea':'Pour les nausées',
  'For mild blood pressure elevation':'Pour une légère élévation de la tension',
  'For common cold and sore throat':'Pour rhume et mal de gorge',
  'For mild joint stiffness':'Pour la raideur articulaire légère',
  'For IBS or bloating':'Pour le syndrome de l\'intestin irritable ou les ballonnements',
  'For everyday cardio-protection':'Pour la protection cardiovasculaire quotidienne',
  'What does':'Ce qui ne',
  'not':'ne',
  'work (despite popular claims)':'fonctionne pas (malgré les croyances populaires)',
  'Caution: avoid':'Attention : à éviter',
  'How to evaluate any health claim':'Comment évaluer toute affirmation de santé',
  'Look for: peer-reviewed sources (PubMed, Cochrane, major medical journals); randomised controlled trials with placebo arms; effect sizes (not just "significant" but "by how much"); systematic reviews and meta-analyses; consistency across studies; biological plausibility. Be sceptical of single small studies, anecdotes, "ancient wisdom" alone, and anything that promises a cure for a serious disease.':'Cherchez : sources validées par des pairs (PubMed, Cochrane, grandes revues médicales) ; essais contrôlés randomisés avec bras placebo ; taille de l\'effet (pas seulement « significatif » mais « de combien ») ; revues systématiques et méta-analyses ; cohérence entre études ; plausibilité biologique. Méfiez-vous des petites études isolées, des anecdotes, de la seule « sagesse ancienne » et de tout ce qui promet une guérison à une maladie grave.',
  'How to use':'Comment utiliser',

  // Quizzes page
  'Test Your Knowledge':'Testez vos connaissances',
  'Quizzes to check':'Quiz pour vérifier la',
  'understanding':'compréhension',
  'Eight short quizzes covering carcinogens, heart health, sleep, African foods and cooking methods, natural remedies, the sleep cycle, skin & eyes, and kidneys & liver. Each question is followed by a brief explanation citing the source. Your scores are saved to your account if you sign in.':'Huit quiz courts couvrant cancérogènes, santé du cœur, sommeil, aliments africains et méthodes de cuisson, remèdes naturels, cycle du sommeil, peau & yeux, et reins & foie. Chaque question est suivie d\'une brève explication avec source. Vos scores sont sauvegardés dans votre compte si vous êtes connecté.',

  // Carcinogens / additives / lifestyle
  'Part One · The Library':'Partie un · La bibliothèque',
  'Part Two · Food Additives':'Partie deux · Additifs alimentaires',
  'Part Three · Lifestyle & Environment':'Partie trois · Mode de vie & environnement',
  'Part Four · Proposals':'Partie quatre · Propositions',
  'Part Five · Daily Tracker':'Partie cinq · Suivi quotidien',
  'Part Six · Community':'Partie six · Communauté',
  'Your account · Private':'Votre compte · Privé',
  'Editorial · Evidence Base':'Éditorial · Base de preuves',
  'Known & probable':'Cancérogènes connus et',
  'carcinogens':'probables',
  'The International Agency for Research on Cancer (IARC) classifies agents into Group 1 (carcinogenic to humans), Group 2A (probably carcinogenic) and Group 2B (possibly carcinogenic). Each entry below identifies common sources, hidden synonyms used on ingredient labels, and the strength of evidence.':'Le Centre international de recherche sur le cancer (IARC) classe les agents en Groupe 1 (cancérogène pour l\'humain), Groupe 2A (probablement cancérogène) et Groupe 2B (peut-être cancérogène). Chaque entrée identifie les sources courantes, les synonymes cachés sur les étiquettes et la force des preuves.',
  'Sign in':'Connectez-vous',
  'to bookmark, add private notes, or ask questions on any entry.':'pour mettre en favori, ajouter des notes privées ou poser des questions sur n\'importe quelle entrée.',
  'The label,':'L\'étiquette,',
  'decoded':'décodée',
  'Industrial food relies on dozens of additives that rarely appear under a single name. Carrageenan, aspartame, sodium nitrites, BHA/BHT, titanium dioxide, synthetic dyes, MSG, emulsifiers and potassium bromate are mapped here — what they are, every alias they hide behind, where they appear, and what the evidence shows.':'L\'alimentation industrielle s\'appuie sur des dizaines d\'additifs qui apparaissent rarement sous un seul nom. Carraghénane, aspartame, nitrites de sodium, BHA/BHT, dioxyde de titane, colorants synthétiques, MSG, émulsifiants et bromate de potassium sont cartographiés ici — ce qu\'ils sont, leurs alias, où ils apparaissent, et ce que disent les preuves.',
  'Decoding strategies for the':'Stratégies de décodage pour le',
  'conscientious shopper':'consommateur attentif',
  'Read in this order':'Lisez dans cet ordre',
  'Common hidden synonyms':'Synonymes cachés courants',
  'The exposures that':'Les expositions qui',
  'surround you':'vous entourent',
  'Body composition, physical activity, sleep, stress, infections, oral health, sun, indoor air and occupational chemicals account for a major share of preventable disease. The evidence below is drawn from IARC monographs, WHO guidelines, NIH reviews and large cohort studies.':'Composition corporelle, activité physique, sommeil, stress, infections, santé bucco-dentaire, soleil, air intérieur et produits chimiques professionnels représentent une part majeure des maladies évitables. Les preuves ci-dessous proviennent des monographies IARC, des recommandations OMS, des revues du NIH et de grandes études de cohortes.',
  'Environmental &':'Expositions',
  'physical':'physiques &',
  'exposures':'environnementales',
  'The air you breathe, the radiation you receive, the materials you live among. Most of these you can measure, mitigate or avoid.':'L\'air que vous respirez, les rayonnements que vous recevez, les matériaux parmi lesquels vous vivez. La plupart peuvent être mesurés, atténués ou évités.',
  'Lifestyle':'Expositions',
  'Body weight, movement, sleep, stress, infections and oral health — the highest-leverage personal levers we know of.':'Poids, mouvement, sommeil, stress, infections et santé bucco-dentaire — les leviers personnels les plus puissants connus.',
  'Occupational &':'Expositions',
  'chemical':'professionnelles &',
  'Hazards encountered at work or through specific products and applications. Many are regulated; vigilance and protective equipment matter most.':'Dangers rencontrés au travail ou via des produits spécifiques. Beaucoup sont régulés ; la vigilance et l\'équipement de protection comptent le plus.',
  'Note on classification':'Note sur la classification',
  'IARC classifications describe the strength of evidence that something can cause cancer, not the size of the risk. A "Group 1" listing means the evidence is strong; it does not mean every exposure causes cancer. Real-world risk depends on dose, duration, individual susceptibility, and co-exposures. Always consult a healthcare provider for individual guidance.':'Les classifications IARC décrivent la force des preuves qu\'un agent peut causer un cancer, pas l\'ampleur du risque. « Groupe 1 » signifie que les preuves sont solides ; cela ne signifie pas que chaque exposition cause un cancer. Le risque réel dépend de la dose, de la durée, de la susceptibilité individuelle et des co-expositions. Consultez toujours un professionnel de santé pour des conseils individuels.',

  // Proposals
  '24 evidence-based':'24 pratiques',
  'These are the dietary, behavioural, and environmental practices supported by the strongest peer-reviewed evidence for reducing cancer and chronic-disease risk. Each is mapped to its primary evidence source. Bookmark the ones you want to commit to, then track them daily.':'Ce sont les pratiques alimentaires, comportementales et environnementales appuyées par les preuves les plus solides pour réduire le risque de cancer et de maladie chronique. Chacune est reliée à sa source principale. Mettez en favori celles que vous voulez adopter, puis suivez-les quotidiennement.',
  'Open your tracker →':'Ouvrir votre suivi →',

  // Tracker
  'Track the':'Suivre les',
  'habits':'habitudes',
  'that matter.':'qui comptent.',
  'Sixteen evidence-based daily habits across diet, lifestyle and environment. Sign in to save your check-ins, watch your streak, and print a clinical-grade weekly summary for your records or your physician.':'Seize habitudes quotidiennes basées sur des preuves couvrant alimentation, mode de vie et environnement. Connectez-vous pour sauvegarder vos enregistrements, suivre votre série, et imprimer un résumé hebdomadaire de qualité clinique.',

  // Notes
  'Everything you\'ve saved across the platform — your private notes, the topics you\'ve bookmarked, and the questions you\'ve submitted. Visible only to you.':'Tout ce que vous avez sauvegardé sur la plateforme — vos notes privées, les sujets en favori et les questions soumises. Visible uniquement par vous.',

  // Community
  'Ask. Answer.':'Demandez. Répondez.',
  'Learn together.':'Apprenez ensemble.',
  'A public board for questions about the topics covered in the platform — and for sharing what you\'ve learned with others on the same journey. All posts are by registered users; please be respectful, factual, and cite sources where you can.':'Un forum public pour les questions sur les sujets de la plateforme — et pour partager ce que vous avez appris avec d\'autres. Tous les messages proviennent d\'utilisateurs inscrits ; soyez respectueux, factuel et citez vos sources.',

  // Evidence page
  'Sources, methods &':'Sources, méthodes &',
  'disclaimer':'avertissement',
  'Every claim in this platform is footed with a citation to its primary source — an IARC monograph, a WHO position paper, a US Surgeon General report, or a peer-reviewed study in a recognised medical journal. The list below identifies the principal authorities the platform relies on, and the key studies most frequently cited.':'Chaque affirmation de cette plateforme est notée avec une citation de sa source principale — une monographie IARC, une prise de position de l\'OMS, un rapport du Surgeon General américain, ou une étude validée par des pairs dans une revue médicale reconnue. La liste ci-dessous identifie les principales autorités sur lesquelles la plateforme s\'appuie et les études les plus fréquemment citées.',
  'Primary classification &':'Principaux organismes de',
  'guideline':'classification &',
  'bodies':'recommandations',
  'Key peer-reviewed':'Études clés',
  'studies':'validées par des pairs',
  'cited':'citées',
  'Why':'Pourquoi les',
  'citations':'citations',
  'matter':'comptent',
  'Health information online is uneven. The Team21 platform anchors every claim to its primary scientific source so that a curious reader can verify, a sceptical reader can challenge, and a healthcare professional can cross-reference. Where authorities disagree (as with glyphosate — Group 2A per IARC, but not classified as carcinogenic by EPA or EFSA) this is stated openly.':'L\'information santé en ligne est inégale. La plateforme Team21 ancre chaque affirmation à sa source scientifique principale afin qu\'un lecteur curieux puisse vérifier, qu\'un sceptique puisse contester, et qu\'un professionnel puisse recouper. Lorsque les autorités sont en désaccord (comme pour le glyphosate — Groupe 2A selon l\'IARC, mais non classé cancérogène par l\'EPA ou l\'EFSA), c\'est dit ouvertement.',
  'Medical disclaimer':'Avertissement médical',
  'The Team21 Health Platform is published for educational and informational purposes only. The content, including text, graphics, tracker tools, and community discussions, does not constitute medical advice and is not a substitute for professional medical consultation, diagnosis, or treatment. Always seek the guidance of your physician or another qualified health provider with any questions you may have regarding a medical condition, before starting or stopping any treatment, and before making significant changes to your diet, exercise, or other lifestyle practices. Never disregard professional medical advice or delay seeking it because of something you have read on this platform. If you think you may have a medical emergency, contact your local emergency services immediately. The editor and contributors disclaim all liability arising from reliance on the information herein. Classifications referenced (e.g. IARC Group 1, 2A, 2B) describe the':'La Plateforme Santé Team21 est publiée à des fins éducatives et informatives uniquement. Le contenu — texte, graphiques, outils de suivi, discussions communautaires — ne constitue pas un avis médical et ne remplace pas une consultation, un diagnostic ou un traitement par un professionnel. Demandez toujours l\'avis de votre médecin ou d\'un autre professionnel de santé qualifié pour toute question concernant un problème médical, avant de commencer ou d\'arrêter un traitement, et avant tout changement important d\'alimentation, d\'exercice ou de mode de vie. Ne négligez jamais un avis médical professionnel et ne tardez pas à le rechercher à cause de ce que vous avez lu sur cette plateforme. En cas d\'urgence, contactez immédiatement les services d\'urgence locaux. L\'éditeur et les contributeurs déclinent toute responsabilité liée à la confiance accordée aux informations présentes. Les classifications mentionnées (par exemple IARC Groupe 1, 2A, 2B) décrivent la',
  'strength of evidence':'force des preuves',
  'that an agent can cause cancer, not the magnitude of an individual\'s risk, which depends on dose, duration, individual susceptibility, and co-exposures.':'qu\'un agent peut causer un cancer, pas l\'ampleur du risque individuel, lequel dépend de la dose, de la durée, de la susceptibilité individuelle et des co-expositions.',
  '© Innocent Forteh · Team21 Health Platform · All rights reserved.':'© Innocent Forteh · Plateforme Santé Team21 · Tous droits réservés.',
  'For educational use only · Not medical advice.':'Usage éducatif uniquement · Ne constitue pas un avis médical.',

  // Common buttons / status appearing inline
  'Sign In':'Se connecter',
  'Create Account':'Créer un compte',
  'Sign out':'Se déconnecter',

  // IARC labels (used in topic chips)
  'IARC Group 1':'IARC Groupe 1',
  'IARC Group 2A':'IARC Groupe 2A',
  'IARC Group 2B':'IARC Groupe 2B',
  'Strong dietary risk':'Risque alimentaire élevé',
  'Cardiovascular & metabolic risk':'Risque cardiovasculaire & métabolique',
  'Strong epidemiologic risk':'Risque épidémiologique élevé',
  'Generally Recognized As Safe (FDA)':'Généralement reconnu sûr (FDA)',
  'Emerging metabolic/inflammatory concern':'Préoccupation métabolique/inflammatoire émergente',
  'Endocrine disruptor':'Perturbateur endocrinien',
  'Strong evidence':'Preuves solides',
  'Moderate evidence':'Preuves modérées',
  'Emerging evidence':'Preuves émergentes',
  'Behavioural & possible carcinogenic concerns':'Préoccupations comportementales & cancérogènes possibles',
  'IARC: sufficient evidence':'IARC : preuves suffisantes',
  'Group 1': 'Groupe 1',
  'Group 2A':'Groupe 2A',
  'Group 2B':'Groupe 2B',

  // Action button labels
  '☆ Bookmark':'☆ Favori',
  '★ Bookmarked':'★ En favori',
  '✎ Add note':'✎ Ajouter une note',
  '? Ask question':'? Poser une question',
  'Sources:':'Sources :',

  // Disclaimer link text
  'Disclaimer':'Avertissement',
  'Sources':'Sources',
};

window.T21Lang = T21Lang;
window.FR_UI = FR_UI;
window.FR_PHRASES = FR_PHRASES;
