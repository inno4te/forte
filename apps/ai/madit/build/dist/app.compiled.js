const {
  useState,
  useEffect,
  useMemo,
  useRef,
  createContext,
  useContext
} = React;

/* ===========================================================
   MAD BACKEND (Google Apps Script) — optional shared storage
   Paste your deployed Web App URL below. Leave empty for
   local-only demo mode.
   =========================================================== */
const MAD_BACKEND_URL = "https://script.google.com/macros/s/AKfycbysj4zwuY6qUeBuxnDHe83U8l8Y7ff3PupnV8xQ9NCn2KRjRhR4LIZlBuYvOXhyAu-GxQ/exec";
const madApi = {
  get: async action => {
    if (!MAD_BACKEND_URL) return null;
    try {
      const r = await fetch(`${MAD_BACKEND_URL}?action=${action}`, {
        method: 'GET'
      });
      return await r.json();
    } catch (e) {
      console.warn('[MaD API] GET failed:', e.message);
      return null;
    }
  },
  post: async (type, payload) => {
    if (!MAD_BACKEND_URL) return null;
    try {
      // GAS Web Apps accept text/plain to avoid CORS preflight
      const r = await fetch(MAD_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          type,
          payload
        })
      });
      return await r.json();
    } catch (e) {
      console.warn('[MaD API] POST failed:', e.message);
      return null;
    }
  }
};

/* ===== CONSTANTS ===== */
const UserRole = {
  ANON: 'ANON',
  INDIVIDUAL: 'INDIVIDUAL',
  ORGANIZATION: 'ORGANIZATION',
  ADMIN: 'ADMIN',
  MAD_ANGEL: 'MAD_ANGEL'
};
const StorySource = {
  USER_SUBMITTED: 'User Submitted',
  QR_SCAN: 'QR Scan (Print)',
  ONLINE_LINK: 'Online Link',
  ADMIN_POST: 'MaD Editorial',
  EVENT: 'Event',
  PHOTO: 'Photo Witness',
  NEWS_FEED: 'News Feed'
};
const TaskStatus = {
  STARTED: 'Started',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed'
};
const SubmissionStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};
const IdeaStatus = {
  VOTING: 'VOTING',
  PROMOTED: 'PROMOTED',
  ARCHIVED: 'ARCHIVED'
};
const STORY_CATEGORIES = ['Burning Issues', 'Recent Actions', 'Ideas Market', 'Education', 'Health', 'Environment', 'Justice', 'Community', 'Technology', 'Economy'];
const REGIONS = ['Africa', 'Europe', 'North America', 'South America', 'Asia', 'Oceania', 'Global'];
const COUNTRIES = [{
  code: 'GLOBAL',
  name: 'All Countries',
  flag: '🌍'
}, {
  code: 'CM',
  name: 'Cameroon',
  flag: '🇨🇲'
}, {
  code: 'NG',
  name: 'Nigeria',
  flag: '🇳🇬'
}, {
  code: 'KE',
  name: 'Kenya',
  flag: '🇰🇪'
}, {
  code: 'ZA',
  name: 'South Africa',
  flag: '🇿🇦'
}, {
  code: 'GH',
  name: 'Ghana',
  flag: '🇬🇭'
}, {
  code: 'EG',
  name: 'Egypt',
  flag: '🇪🇬'
}, {
  code: 'ET',
  name: 'Ethiopia',
  flag: '🇪🇹'
}, {
  code: 'SN',
  name: 'Senegal',
  flag: '🇸🇳'
}, {
  code: 'RW',
  name: 'Rwanda',
  flag: '🇷🇼'
}, {
  code: 'CI',
  name: 'Ivory Coast',
  flag: '🇨🇮'
}, {
  code: 'TZ',
  name: 'Tanzania',
  flag: '🇹🇿'
}, {
  code: 'UG',
  name: 'Uganda',
  flag: '🇺🇬'
}, {
  code: 'US',
  name: 'United States',
  flag: '🇺🇸'
}, {
  code: 'CA',
  name: 'Canada',
  flag: '🇨🇦'
}, {
  code: 'GB',
  name: 'United Kingdom',
  flag: '🇬🇧'
}, {
  code: 'FR',
  name: 'France',
  flag: '🇫🇷'
}, {
  code: 'DE',
  name: 'Germany',
  flag: '🇩🇪'
}, {
  code: 'ES',
  name: 'Spain',
  flag: '🇪🇸'
}, {
  code: 'IT',
  name: 'Italy',
  flag: '🇮🇹'
}, {
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}, {
  code: 'BE',
  name: 'Belgium',
  flag: '🇧🇪'
}, {
  code: 'PT',
  name: 'Portugal',
  flag: '🇵🇹'
}, {
  code: 'IN',
  name: 'India',
  flag: '🇮🇳'
}, {
  code: 'CN',
  name: 'China',
  flag: '🇨🇳'
}, {
  code: 'JP',
  name: 'Japan',
  flag: '🇯🇵'
}, {
  code: 'KR',
  name: 'South Korea',
  flag: '🇰🇷'
}, {
  code: 'PH',
  name: 'Philippines',
  flag: '🇵🇭'
}, {
  code: 'ID',
  name: 'Indonesia',
  flag: '🇮🇩'
}, {
  code: 'BR',
  name: 'Brazil',
  flag: '🇧🇷'
}, {
  code: 'MX',
  name: 'Mexico',
  flag: '🇲🇽'
}, {
  code: 'AR',
  name: 'Argentina',
  flag: '🇦🇷'
}, {
  code: 'AU',
  name: 'Australia',
  flag: '🇦🇺'
}, {
  code: 'NZ',
  name: 'New Zealand',
  flag: '🇳🇿'
}];

// News sources - all free, public RSS feeds
const NEWS_SOURCES = [{
  id: 'bbc',
  name: 'BBC World',
  rss: 'https://feeds.bbci.co.uk/news/world/rss.xml',
  color: '#BB1919'
}, {
  id: 'reuters',
  name: 'Reuters',
  rss: 'https://feeds.reuters.com/Reuters/worldNews',
  color: '#FF8000'
}, {
  id: 'guardian',
  name: 'The Guardian',
  rss: 'https://www.theguardian.com/world/rss',
  color: '#052962'
}, {
  id: 'ap',
  name: 'Associated Press',
  rss: 'https://feeds.apnews.com/rss/apf-topnews',
  color: '#E03A3E'
}, {
  id: 'npr',
  name: 'NPR',
  rss: 'https://feeds.npr.org/1004/rss.xml',
  color: '#0083CA'
}, {
  id: 'aljazeera',
  name: 'Al Jazeera',
  rss: 'https://www.aljazeera.com/xml/rss/all.xml',
  color: '#FA9000'
}];

// Free CORS proxies - chained fallback (no API keys, all genuinely free)
const CORS_PROXIES = [url => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`, url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, url => `https://cors.x2u.in/${url}`];
const TOUCHING_KEYWORDS = ['rescue', 'rescued', 'saves', 'saved', 'survived', 'survivor', 'donate', 'donated', 'charity', 'volunteer', 'volunteers', 'community', 'neighbour', 'neighbor', 'family', 'children', 'kids', 'hero', 'heroic', 'kindness', 'kind', 'inspiring', 'inspired', 'helps', 'helped', 'helping', 'free', 'gives', 'gave', 'orphan', 'refugee', 'homeless', 'shelter', 'food bank', 'school', 'student', 'teacher', 'hospital', 'patient', 'cancer', 'disability', 'recovery', 'recovering', 'fundraiser', 'raises', 'raised', 'stranger', 'climate', 'environment', 'pollution', 'plastic', 'reunited', 'reunion', 'gift', 'returns', 'returned', 'flood', 'fire', 'earthquake', 'disaster', 'crisis'];
const isTouching = item => {
  const t = `${item.title} ${item.description}`.toLowerCase();
  return TOUCHING_KEYWORDS.some(k => t.includes(k));
};

// Action types offered in the MaD Action Modal
const ACTION_TYPES = [{
  id: 'money',
  icon: 'dollar-sign',
  label: 'Donate Money',
  desc: 'Contribute funds to the cause',
  color: 'bg-green-100 border-green-600 text-green-900'
}, {
  id: 'time',
  icon: 'clock',
  label: 'Donate Time',
  desc: 'Volunteer your hours',
  color: 'bg-blue-100 border-blue-600 text-blue-900'
}, {
  id: 'skills',
  icon: 'wrench',
  label: 'Share Skills',
  desc: 'Offer your expertise',
  color: 'bg-purple-100 border-purple-600 text-purple-900'
}, {
  id: 'share',
  icon: 'share-2',
  label: 'Spread the Word',
  desc: 'Share on your network',
  color: 'bg-mad-yellow border-mad-black text-mad-black'
}, {
  id: 'connect',
  icon: 'link',
  label: 'Connect Resources',
  desc: 'Link people to help',
  color: 'bg-orange-100 border-orange-600 text-orange-900'
}, {
  id: 'sign',
  icon: 'edit-3',
  label: 'Add My Voice',
  desc: 'Sign in solidarity',
  color: 'bg-red-100 border-red-600 text-red-900'
}, {
  id: 'group',
  icon: 'users',
  label: 'Start / Join Group',
  desc: 'Form a squad around this',
  color: 'bg-indigo-100 border-indigo-600 text-indigo-900'
}];
const SKILL_CATEGORIES = ['Design', 'Coding', 'Teaching', 'Writing', 'Medical', 'Legal', 'Marketing', 'Translation', 'Photography', 'Construction', 'Farming', 'Cooking', 'Music', 'Sports', 'Other'];

// Translations for chrome text (5 languages) - content stays in original language
const TRANSLATIONS = {
  en: {
    nav_home: 'Home',
    nav_stories: 'Stories',
    nav_news: 'News',
    nav_ideas: 'Ideas Market',
    nav_getinvolved: 'MaD it +',
    nav_about: 'About',
    nav_team: 'MaD Team',
    nav_admin: 'Admin',
    nav_login: 'Login',
    nav_help: 'Help',
    hero_badge: 'The 911 for the Web',
    hero_title_1: 'Giving',
    hero_title_2: 'Life',
    hero_title_3: 'to',
    hero_title_4: 'Likes',
    hero_subtitle: "What if we went beyond comments and became part of the solution? Take Action Quickly — turn stories into communities, communities into projects, and projects into change.",
    hero_cta_explore: 'Explore Stories',
    hero_cta_mad: 'MaD it Yourself',
    hero_country_label: 'Pick a Country to MaD',
    stat_stories: 'Stories MaD',
    stat_groups: 'Active Groups',
    stat_committed: 'Committed to Action',
    mad_button: 'MaD it',
    mad_plus: 'MaD+',
    join_action: 'Join Action',
    read: 'Read',
    modal_title: 'Take Action Now',
    modal_step1_title: 'How can you help?',
    modal_step1_desc: 'Pick one or more — we\'ll ask for details next.',
    modal_step2_title: 'Tell us more',
    modal_step3_title: 'Your details',
    modal_success_title: 'Action Committed!',
    modal_success_desc: "The MaD team will connect you with the group leader within 48 hours.",
    submit: 'Submit',
    cancel: 'Cancel',
    next: 'Next',
    back: 'Back',
    close: 'Close',
    done: 'Done',
    anon_check: 'Submit anonymously',
    name_ph: 'Your name',
    email_ph: 'Your email',
    country_ph: 'Your country',
    help_title: 'Need Help?',
    help_start: 'How MaD works in 30 seconds',
    help_faq: 'FAQ',
    help_contact: 'Contact Us',
    welcome_title: 'Welcome to MaD!',
    welcome_desc: 'Click any story\'s MaD button to take action in under a minute.',
    lang_label: 'Language',
    all_countries: 'All Countries'
  },
  fr: {
    nav_home: 'Accueil',
    nav_stories: 'Histoires',
    nav_news: 'Actualités',
    nav_ideas: 'Marché d\'Idées',
    nav_getinvolved: 'MaD +',
    nav_about: 'À Propos',
    nav_team: 'Équipe',
    nav_admin: 'Admin',
    nav_login: 'Connexion',
    nav_help: 'Aide',
    hero_badge: 'Le 911 du Web',
    hero_title_1: 'Donnez',
    hero_title_2: 'Vie',
    hero_title_3: 'aux',
    hero_title_4: 'Likes',
    hero_subtitle: "Et si nous allions au-delà des commentaires pour faire partie de la solution ? Agissez rapidement — transformez les histoires en communautés, les communautés en projets, et les projets en changement.",
    hero_cta_explore: 'Voir les Histoires',
    hero_cta_mad: 'Créez un MaD',
    hero_country_label: 'Choisissez un Pays à MaD',
    stat_stories: 'Histoires MaD',
    stat_groups: 'Groupes Actifs',
    stat_committed: 'Engagés à Agir',
    mad_button: 'MaD!',
    mad_plus: 'MaD+',
    join_action: 'Rejoindre',
    read: 'Lire',
    modal_title: 'Agir Maintenant',
    modal_step1_title: 'Comment pouvez-vous aider ?',
    modal_step1_desc: 'Choisissez une ou plusieurs options.',
    modal_step2_title: 'Dites-nous en plus',
    modal_step3_title: 'Vos coordonnées',
    modal_success_title: 'Action Engagée !',
    modal_success_desc: "L'équipe MaD vous mettra en contact avec le responsable dans les 48 heures.",
    submit: 'Envoyer',
    cancel: 'Annuler',
    next: 'Suivant',
    back: 'Retour',
    close: 'Fermer',
    done: 'Terminé',
    anon_check: 'Soumettre anonymement',
    name_ph: 'Votre nom',
    email_ph: 'Votre email',
    country_ph: 'Votre pays',
    help_title: 'Besoin d\'aide ?',
    help_start: 'MaD en 30 secondes',
    help_faq: 'FAQ',
    help_contact: 'Contactez-nous',
    welcome_title: 'Bienvenue sur MaD !',
    welcome_desc: 'Cliquez sur le bouton MaD de toute histoire pour agir en moins d\'une minute.',
    lang_label: 'Langue',
    all_countries: 'Tous les Pays'
  },
  es: {
    nav_home: 'Inicio',
    nav_stories: 'Historias',
    nav_news: 'Noticias',
    nav_ideas: 'Mercado de Ideas',
    nav_getinvolved: 'MaD +',
    nav_about: 'Nosotros',
    nav_team: 'Equipo',
    nav_admin: 'Admin',
    nav_login: 'Iniciar',
    nav_help: 'Ayuda',
    hero_badge: 'El 911 de la Web',
    hero_title_1: 'Dando',
    hero_title_2: 'Vida',
    hero_title_3: 'a los',
    hero_title_4: 'Likes',
    hero_subtitle: "¿Y si fuéramos más allá de los comentarios y formáramos parte de la solución? Actúa rápido — convierte historias en comunidades, comunidades en proyectos, y proyectos en cambio.",
    hero_cta_explore: 'Ver Historias',
    hero_cta_mad: 'Crea un MaD',
    hero_country_label: 'Elige un País para MaD',
    stat_stories: 'Historias MaD',
    stat_groups: 'Grupos Activos',
    stat_committed: 'Comprometidos',
    mad_button: '¡MaD!',
    mad_plus: 'MaD+',
    join_action: 'Unirse',
    read: 'Leer',
    modal_title: 'Actuar Ahora',
    modal_step1_title: '¿Cómo puedes ayudar?',
    modal_step1_desc: 'Elige una o más opciones.',
    modal_step2_title: 'Cuéntanos más',
    modal_step3_title: 'Tus datos',
    modal_success_title: '¡Acción Comprometida!',
    modal_success_desc: "El equipo MaD te conectará con el líder del grupo en 48 horas.",
    submit: 'Enviar',
    cancel: 'Cancelar',
    next: 'Siguiente',
    back: 'Atrás',
    close: 'Cerrar',
    done: 'Listo',
    anon_check: 'Enviar anónimamente',
    name_ph: 'Tu nombre',
    email_ph: 'Tu email',
    country_ph: 'Tu país',
    help_title: '¿Necesitas Ayuda?',
    help_start: 'MaD en 30 segundos',
    help_faq: 'FAQ',
    help_contact: 'Contáctanos',
    welcome_title: '¡Bienvenido a MaD!',
    welcome_desc: 'Haz clic en el botón MaD de cualquier historia para actuar en menos de un minuto.',
    lang_label: 'Idioma',
    all_countries: 'Todos los Países'
  },
  pt: {
    nav_home: 'Início',
    nav_stories: 'Histórias',
    nav_news: 'Notícias',
    nav_ideas: 'Mercado de Ideias',
    nav_getinvolved: 'MaD +',
    nav_about: 'Sobre',
    nav_team: 'Equipe',
    nav_admin: 'Admin',
    nav_login: 'Entrar',
    nav_help: 'Ajuda',
    hero_badge: 'O 911 da Web',
    hero_title_1: 'Dando',
    hero_title_2: 'Vida',
    hero_title_3: 'aos',
    hero_title_4: 'Likes',
    hero_subtitle: "E se fôssemos além dos comentários e nos tornássemos parte da solução? Aja rapidamente — transforme histórias em comunidades, comunidades em projetos, e projetos em mudança.",
    hero_cta_explore: 'Ver Histórias',
    hero_cta_mad: 'Crie um MaD',
    hero_country_label: 'Escolha um País para MaD',
    stat_stories: 'Histórias MaD',
    stat_groups: 'Grupos Ativos',
    stat_committed: 'Comprometidos',
    mad_button: 'MaD!',
    mad_plus: 'MaD+',
    join_action: 'Participar',
    read: 'Ler',
    modal_title: 'Agir Agora',
    modal_step1_title: 'Como pode ajudar?',
    modal_step1_desc: 'Escolha uma ou mais opções.',
    modal_step2_title: 'Conte-nos mais',
    modal_step3_title: 'Seus dados',
    modal_success_title: 'Ação Registrada!',
    modal_success_desc: "A equipe MaD conectará você ao líder do grupo em 48 horas.",
    submit: 'Enviar',
    cancel: 'Cancelar',
    next: 'Próximo',
    back: 'Voltar',
    close: 'Fechar',
    done: 'Pronto',
    anon_check: 'Enviar anonimamente',
    name_ph: 'Seu nome',
    email_ph: 'Seu email',
    country_ph: 'Seu país',
    help_title: 'Precisa de Ajuda?',
    help_start: 'MaD em 30 segundos',
    help_faq: 'FAQ',
    help_contact: 'Contate-nos',
    welcome_title: 'Bem-vindo ao MaD!',
    welcome_desc: 'Clique no botão MaD de qualquer história para agir em menos de um minuto.',
    lang_label: 'Idioma',
    all_countries: 'Todos os Países'
  },
  sw: {
    nav_home: 'Nyumbani',
    nav_stories: 'Hadithi',
    nav_news: 'Habari',
    nav_ideas: 'Soko la Mawazo',
    nav_getinvolved: 'MaD +',
    nav_about: 'Kuhusu',
    nav_team: 'Timu',
    nav_admin: 'Admin',
    nav_login: 'Ingia',
    nav_help: 'Msaada',
    hero_badge: '911 ya Wavuti',
    hero_title_1: 'Kuipa',
    hero_title_2: 'Uhai',
    hero_title_3: 'kwa',
    hero_title_4: 'Likes',
    hero_subtitle: "Vipi kama tungeenda mbali zaidi ya maoni na kuwa sehemu ya suluhisho? Chukua Hatua Haraka — geuza hadithi kuwa jamii, jamii kuwa miradi, na miradi kuwa mabadiliko.",
    hero_cta_explore: 'Angalia Hadithi',
    hero_cta_mad: 'Tengeneza MaD',
    hero_country_label: 'Chagua Nchi ya MaD',
    stat_stories: 'Hadithi za MaD',
    stat_groups: 'Vikundi Hai',
    stat_committed: 'Wamejitolea',
    mad_button: 'MaD!',
    mad_plus: 'MaD+',
    join_action: 'Jiunge',
    read: 'Soma',
    modal_title: 'Chukua Hatua Sasa',
    modal_step1_title: 'Unaweza kusaidiaje?',
    modal_step1_desc: 'Chagua moja au zaidi.',
    modal_step2_title: 'Tuambie zaidi',
    modal_step3_title: 'Maelezo yako',
    modal_success_title: 'Hatua Imesajiliwa!',
    modal_success_desc: "Timu ya MaD itakuunganisha na kiongozi wa kikundi ndani ya masaa 48.",
    submit: 'Tuma',
    cancel: 'Ghairi',
    next: 'Ijayo',
    back: 'Rudi',
    close: 'Funga',
    done: 'Tayari',
    anon_check: 'Tuma bila jina',
    name_ph: 'Jina lako',
    email_ph: 'Barua pepe yako',
    country_ph: 'Nchi yako',
    help_title: 'Unahitaji Msaada?',
    help_start: 'MaD kwa sekunde 30',
    help_faq: 'Maswali',
    help_contact: 'Wasiliana Nasi',
    welcome_title: 'Karibu MaD!',
    welcome_desc: 'Bofya kitufe cha MaD kwenye hadithi yoyote kuchukua hatua kwa chini ya dakika moja.',
    lang_label: 'Lugha',
    all_countries: 'Nchi Zote'
  }
};
const LANGUAGES = [{
  code: 'en',
  name: 'English',
  flag: '🇬🇧'
}, {
  code: 'fr',
  name: 'Français',
  flag: '🇫🇷'
}, {
  code: 'es',
  name: 'Español',
  flag: '🇪🇸'
}, {
  code: 'pt',
  name: 'Português',
  flag: '🇵🇹'
}, {
  code: 'sw',
  name: 'Kiswahili',
  flag: '🇹🇿'
}];
const FAQ_ITEMS = [{
  q: 'What is MaD?',
  a: 'MaD stands for Make a Difference. It\'s a platform that turns stories into structured community action. See a story that moves you? Click MaD to commit help in under a minute — money, time, skills, or just spreading the word.'
}, {
  q: 'How is this different from a like or a share?',
  a: 'A like disappears into a feed. A MaD is a real commitment logged in a real project. The MaD team follows up within 48 hours to connect you with a group leader working on the issue.'
}, {
  q: 'Do I need to donate money?',
  a: 'No. Money is one of seven ways to help. You can donate time, share skills (design, teaching, medical, legal, etc.), spread the word, connect resources, sign in support, or start a group.'
}, {
  q: 'Can I submit anonymously?',
  a: 'Yes. Every form has an anonymous option. Just note that anonymous submissions can\'t receive follow-up from the MaD team.'
}, {
  q: 'Who verifies the stories?',
  a: 'Every user-submitted story or news link goes through a verification queue where our admins check the facts before publishing.'
}, {
  q: 'Can I add my own story or news link?',
  a: 'Absolutely. Head to the MaD it + page and choose from five submission types: write a story, share an online link, submit an event, upload a photo, or start a donation cycle.'
}, {
  q: 'What happens when an idea in the Ideas Market gets promoted?',
  a: 'When an idea reaches 100+ votes, admins can promote it to a full MaD project — automatically creating a story on the feed where groups form, funds get raised, and experts sign up.'
}];
const SOCIAL_LINKS = [{
  name: 'Facebook',
  url: '#',
  icon: 'facebook'
}, {
  name: 'X (Twitter)',
  url: '#',
  icon: 'twitter'
}, {
  name: 'Instagram',
  url: '#',
  icon: 'instagram'
}, {
  name: 'LinkedIn',
  url: '#',
  icon: 'linkedin'
}, {
  name: 'YouTube',
  url: '#',
  icon: 'youtube'
}, {
  name: 'TikTok',
  url: '#',
  icon: 'music-2'
}, {
  name: 'WhatsApp',
  url: '#',
  icon: 'message-circle'
}, {
  name: 'Telegram',
  url: '#',
  icon: 'send'
}];

/* ===== SEED DATA ===== */
const SEED_STORIES = [{
  id: 's1',
  title: 'Bamenda Youth Build Free Coding Lab from Scrap Computers',
  content: 'A group of 12 young people in Bamenda salvaged old computer parts from a closed cyber cafe and rebuilt them into a working coding lab. They now teach 60 kids weekly. The lab needs internet stipends and at least 5 more keyboards to keep going.',
  excerpt: 'Twelve young people salvaged a defunct cyber cafe into a youth coding lab. 60 kids learn weekly.',
  author: 'Nadia M.',
  source: StorySource.ADMIN_POST,
  category: 'Education',
  region: 'Africa',
  country: 'Cameroon',
  countryCode: 'CM',
  imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&auto=format&fit=crop&q=70',
  likes: 1240,
  mads: 187,
  hasGroup: true,
  groupId: 'g1',
  createdAt: new Date('2026-04-12'),
  status: SubmissionStatus.APPROVED,
  trending: true
}, {
  id: 's2',
  title: 'Mangrove Forest Cleared for Resort Despite Court Order',
  content: 'A protected mangrove zone in the Niger Delta has been illegally cleared overnight. Locals filmed the bulldozers. A court order from March was ignored.',
  excerpt: 'A protected mangrove zone bulldozed overnight despite a March court order. Locals captured everything on video.',
  author: 'EarthWatch Africa',
  source: StorySource.ONLINE_LINK,
  category: 'Environment',
  region: 'Africa',
  country: 'Nigeria',
  countryCode: 'NG',
  imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&auto=format&fit=crop&q=70',
  likes: 5430,
  mads: 890,
  hasGroup: true,
  groupId: 'g2',
  createdAt: new Date('2026-04-22'),
  status: SubmissionStatus.APPROVED,
  trending: true
}, {
  id: 's3',
  title: 'Maternity Ward in Douala Operates Without Reliable Power',
  content: 'Nurses at a public maternity ward regularly deliver babies by phone flashlight. A solar microgrid would cost about $8,000 and serve 400 births a year.',
  excerpt: 'Nurses delivering babies by phone flashlight. $8,000 solar microgrid would change everything.',
  author: 'Dr. K. Mbah',
  source: StorySource.QR_SCAN,
  category: 'Health',
  region: 'Africa',
  country: 'Cameroon',
  countryCode: 'CM',
  imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=70',
  likes: 3210,
  mads: 412,
  hasGroup: false,
  createdAt: new Date('2026-04-20'),
  status: SubmissionStatus.APPROVED,
  trending: false
}, {
  id: 's4',
  title: 'Free Legal Clinic for Migrant Workers Faces Eviction',
  content: 'A small legal clinic that has helped 1,200 migrant workers recover stolen wages over 3 years is being evicted. They need a new home and $300/month in rent support.',
  excerpt: '1,200 migrant workers recovered stolen wages thanks to this clinic. Now they are losing their office.',
  author: 'Justice Now Coalition',
  source: StorySource.USER_SUBMITTED,
  category: 'Justice',
  region: 'North America',
  country: 'United States',
  countryCode: 'US',
  imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=70',
  likes: 890,
  mads: 142,
  hasGroup: false,
  createdAt: new Date('2026-04-18'),
  status: SubmissionStatus.APPROVED,
  trending: false
}, {
  id: 's5',
  title: 'Village Library Built Entirely from Plastic Bottle Bricks',
  content: 'A community in Yaoundé collected 12,000 plastic bottles, packed them with sand, and built a 4-room library. They are looking to do the same for a clinic next door.',
  excerpt: '12,000 plastic bottles became a 4-room library. The same crew wants to build a clinic next door.',
  author: 'Eco Builders CM',
  source: StorySource.PHOTO,
  category: 'Community',
  region: 'Africa',
  country: 'Cameroon',
  countryCode: 'CM',
  imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=70',
  likes: 6720,
  mads: 1031,
  hasGroup: true,
  groupId: 'g3',
  createdAt: new Date('2026-04-25'),
  status: SubmissionStatus.APPROVED,
  trending: true
}, {
  id: 's6',
  title: 'Teacher Walks 14km Daily to Reach Remote School',
  content: 'For seven years, Mr. Tabi has walked 14km each way to teach in a single-room school. A used motorbike would cut his commute to 25 minutes.',
  excerpt: 'Seven years of 14km walks to teach kids. A used motorbike fixes everything.',
  author: 'Local Reporter',
  source: StorySource.QR_SCAN,
  category: 'Education',
  region: 'Africa',
  country: 'Cameroon',
  countryCode: 'CM',
  imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=70',
  likes: 4100,
  mads: 678,
  hasGroup: false,
  createdAt: new Date('2026-04-15'),
  status: SubmissionStatus.APPROVED,
  trending: false
}];
const SEED_GROUPS = {
  g1: {
    id: 'g1',
    storyId: 's1',
    name: 'Bamenda Code Crew',
    description: 'Keep the salvage coding lab alive. 60 students. 12 mentors. One mission.',
    memberCount: 84,
    isPublic: true,
    createdAt: new Date('2026-04-13'),
    projects: [{
      id: 'p1',
      title: 'Phase 1 — Internet Stipend (3 Months)',
      description: 'Cover the $40/month internet bill for the next 3 months.',
      tasks: [{
        id: 't1',
        title: 'Confirm ISP package & negotiate NGO rate',
        status: TaskStatus.COMPLETED,
        assignee: 'Nadia M.'
      }, {
        id: 't2',
        title: 'Raise $120 via group fundraiser',
        status: TaskStatus.IN_PROGRESS,
        assignee: 'Treasurer'
      }, {
        id: 't3',
        title: 'Set up monthly auto-renewal',
        status: TaskStatus.STARTED,
        assignee: 'Unassigned'
      }]
    }, {
      id: 'p2',
      title: 'Phase 2 — Hardware Drive',
      description: 'Source 5 keyboards and 3 mice from donations.',
      tasks: [{
        id: 't4',
        title: 'Post hardware request in 3 local groups',
        status: TaskStatus.IN_PROGRESS,
        assignee: 'Volunteer Lead'
      }, {
        id: 't5',
        title: 'Inspect & test donated items',
        status: TaskStatus.STARTED,
        assignee: 'Tech Crew'
      }]
    }],
    fundraiser: {
      goal: 500,
      raised: 287,
      currency: 'USD',
      label: 'Internet + Hardware'
    }
  },
  g2: {
    id: 'g2',
    storyId: 's2',
    name: 'Save the Mangroves',
    description: 'Hold the resort developer accountable. Push for replanting and prosecution.',
    memberCount: 312,
    isPublic: true,
    createdAt: new Date('2026-04-23'),
    projects: [{
      id: 'p3',
      title: 'Legal Pressure',
      description: 'Mobilise legal teams to file an enforcement motion.',
      tasks: [{
        id: 't6',
        title: 'Brief environmental lawyers (3 firms)',
        status: TaskStatus.IN_PROGRESS,
        assignee: 'Coordinator'
      }, {
        id: 't7',
        title: 'Compile drone & witness footage',
        status: TaskStatus.COMPLETED,
        assignee: 'Field Team'
      }]
    }],
    fundraiser: {
      goal: 5000,
      raised: 1840,
      currency: 'USD',
      label: 'Legal Defence Fund'
    }
  },
  g3: {
    id: 'g3',
    storyId: 's5',
    name: 'Bottle Brick Builders',
    description: 'After the library — a clinic. Same method, bigger ambition.',
    memberCount: 156,
    isPublic: true,
    createdAt: new Date('2026-04-26'),
    projects: [{
      id: 'p4',
      title: 'Bottle Collection Drive',
      description: 'Gather 18,000 plastic bottles from local schools and markets.',
      tasks: [{
        id: 't8',
        title: 'Set up 12 collection points',
        status: TaskStatus.IN_PROGRESS,
        assignee: 'Logistics'
      }, {
        id: 't9',
        title: 'School outreach (10 schools)',
        status: TaskStatus.STARTED,
        assignee: 'Outreach'
      }]
    }],
    fundraiser: {
      goal: 1200,
      raised: 540,
      currency: 'USD',
      label: 'Cement + Roofing Materials'
    }
  }
};
const SEED_IDEAS = [{
  id: 'i1',
  title: 'Mobile Phone Repair Co-op for Rural Villages',
  description: 'Train 5 youths per village in basic phone repair. They earn a living, the community keeps phones working, and e-waste drops. Estimated startup: $400 per village.',
  proposer: 'Marcus T.',
  country: 'Cameroon',
  countryCode: 'CM',
  category: 'Economy',
  votes: 234,
  comments: 18,
  status: IdeaStatus.VOTING,
  createdAt: new Date('2026-04-08'),
  tags: ['skills', 'rural', 'employment']
}, {
  id: 'i2',
  title: 'Solar Lantern Library — Borrow a Light, Return a Light',
  description: 'A neighbourhood library system but for solar lanterns. Households borrow a charged lantern overnight, return it next morning. One central solar station serves 200 homes.',
  proposer: 'Aisha K.',
  country: 'Nigeria',
  countryCode: 'NG',
  category: 'Environment',
  votes: 412,
  comments: 34,
  status: IdeaStatus.VOTING,
  createdAt: new Date('2026-04-10'),
  tags: ['solar', 'lighting', 'community']
}, {
  id: 'i3',
  title: 'Story-Time Radio for Pre-Schoolers',
  description: 'A 30-minute daily community radio show in local language: stories, counting, songs. Reaches kids who can\'t access pre-school. Costs about $80/month for airtime.',
  proposer: 'Maya R.',
  country: 'Kenya',
  countryCode: 'KE',
  category: 'Education',
  votes: 89,
  comments: 7,
  status: IdeaStatus.VOTING,
  createdAt: new Date('2026-04-20'),
  tags: ['radio', 'early-learning', 'language']
}, {
  id: 'i4',
  title: 'Free Legal Aid SMS Hotline',
  description: 'Text a question, get a callback within 48h from a vetted lawyer. Aimed at women facing housing or wage disputes. Volunteer lawyer pool + small sustainability fee.',
  proposer: 'Chioma O.',
  country: 'Ghana',
  countryCode: 'GH',
  category: 'Justice',
  votes: 567,
  comments: 41,
  status: IdeaStatus.PROMOTED,
  promotedAt: new Date('2026-04-24'),
  createdAt: new Date('2026-03-30'),
  tags: ['legal', 'sms', 'women']
}];
const FALLBACK_NEWS = [{
  id: 'fb1',
  source: 'BBC World',
  sourceColor: '#BB1919',
  title: 'Stranger pays off school lunch debts for entire town',
  description: 'An anonymous donor in a small US town wiped out $19,000 in school lunch debts so no child would be denied a meal.',
  link: 'https://www.bbc.com/news',
  pubDate: new Date(),
  imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=70'
}, {
  id: 'fb2',
  source: 'Reuters',
  sourceColor: '#FF8000',
  title: 'Volunteer divers clear 3 tonnes of plastic from coral reef',
  description: 'A weekend dive group in the Philippines has cleared three tonnes of plastic from a single coral reef over six months.',
  link: 'https://www.reuters.com',
  pubDate: new Date(),
  imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&auto=format&fit=crop&q=70'
}, {
  id: 'fb3',
  source: 'The Guardian',
  sourceColor: '#052962',
  title: 'Refugee chef opens free food kitchen for the homeless',
  description: 'After surviving displacement himself, a Syrian chef in Manchester now serves 200 free hot meals every weekend.',
  link: 'https://www.theguardian.com',
  pubDate: new Date(),
  imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=70'
}, {
  id: 'fb4',
  source: 'Associated Press',
  sourceColor: '#E03A3E',
  title: 'Teen builds prosthetic hands from 3D printed parts',
  description: 'A 16-year-old in São Paulo has 3D-printed prosthetic hands for 14 children, using donated filament and his school\'s lab.',
  link: 'https://apnews.com',
  pubDate: new Date(),
  imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&auto=format&fit=crop&q=70'
}, {
  id: 'fb5',
  source: 'NPR',
  sourceColor: '#0083CA',
  title: 'Community garden feeds neighbourhood, kids run it',
  description: 'A vacant lot in Detroit became a community garden run by a youth co-op. It now feeds 60 families a week.',
  link: 'https://www.npr.org',
  pubDate: new Date(),
  imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=70'
}, {
  id: 'fb6',
  source: 'Al Jazeera',
  sourceColor: '#FA9000',
  title: 'Floods displace thousands; locals open homes to strangers',
  description: 'After flash floods displaced families, neighbours across the region opened their spare rooms — the response has overwhelmed official shelters.',
  link: 'https://www.aljazeera.com',
  pubDate: new Date(),
  imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=70'
}];

/* ===== LANGUAGE CONTEXT ===== */
const LangContext = createContext({
  lang: 'en',
  t: k => k,
  setLang: () => {}
});
const useT = () => useContext(LangContext);

/* ===== HELPERS ===== */
const Icon = ({
  name,
  className = '',
  size = 18
}) => /*#__PURE__*/React.createElement("i", {
  "data-lucide": name,
  className: className,
  style: {
    width: size,
    height: size
  }
});
const Tooltip = ({
  text,
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: "relative group inline-flex"
}, children, /*#__PURE__*/React.createElement("span", {
  className: "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-mad-black text-mad-yellow text-xs font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50"
}, text));
const HelpHint = ({
  text
}) => /*#__PURE__*/React.createElement(Tooltip, {
  text: text
}, /*#__PURE__*/React.createElement("span", {
  className: "inline-flex items-center justify-center w-5 h-5 rounded-full bg-mad-yellow border border-mad-black text-mad-black text-xs font-bold cursor-help ml-1"
}, "?"));

// Fetch through chained CORS proxies until one works
const fetchWithProxyFallback = async targetUrl => {
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    try {
      const proxyUrl = CORS_PROXIES[i](targetUrl);
      const res = await fetch(proxyUrl, {
        signal: AbortSignal.timeout(8000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (text && text.length > 100) return text;
      throw new Error('Empty response');
    } catch (e) {
      console.warn(`[MaD] Proxy ${i} failed for ${targetUrl}:`, e.message);
      if (i === CORS_PROXIES.length - 1) throw e;
    }
  }
  throw new Error('All proxies failed');
};

// Parse RSS XML using browser's native DOMParser (no third-party lib)
const parseRSSFeed = (xmlText, source) => {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) throw new Error('Invalid XML');
  const items = doc.querySelectorAll('item, entry');
  return Array.from(items).slice(0, 12).map((item, i) => {
    const getText = sel => item.querySelector(sel)?.textContent?.trim() || '';
    const stripHtml = s => {
      const div = document.createElement('div');
      div.innerHTML = s;
      return (div.textContent || div.innerText || '').trim();
    };
    const title = getText('title');
    let description = getText('description') || getText('summary') || getText('content');
    description = stripHtml(description).slice(0, 280);
    const link = getText('link') || item.querySelector('link')?.getAttribute('href') || '';
    const pubDateStr = getText('pubDate') || getText('published') || getText('updated');
    const enclosure = item.querySelector('enclosure');
    let mediaThumb = null;
    // Namespaced elements need getElementsByTagNameNS-like handling in XML docs
    try {
      const mediaEls = item.getElementsByTagName('*');
      for (let m = 0; m < mediaEls.length; m++) {
        const localName = mediaEls[m].localName || mediaEls[m].tagName;
        if (localName === 'thumbnail' || localName === 'content') {
          const url = mediaEls[m].getAttribute('url');
          if (url) {
            mediaThumb = url;
            break;
          }
        }
      }
    } catch (e) {}
    let imageUrl = enclosure?.getAttribute('url') || mediaThumb || (description.match(/https?:\/\/\S+\.(jpg|jpeg|png|gif|webp)/i) || [])[0] || null;
    return {
      id: `${source.id}_${i}_${Date.now()}`,
      source: source.name,
      sourceColor: source.color,
      title,
      description,
      link,
      pubDate: pubDateStr ? new Date(pubDateStr) : new Date(),
      imageUrl
    };
  });
};

/* ===========================================================
   MAD ACTION MODAL — the 911 button
   =========================================================== */
const MaDActionModal = ({
  isOpen,
  target,
  onClose,
  onSubmit
}) => {
  const {
    t
  } = useT();
  const [step, setStep] = useState(1);
  const [selectedActions, setSelectedActions] = useState([]);
  const [details, setDetails] = useState({
    money: 25,
    moneyMsg: '',
    time: '',
    timeSlot: 'weekends',
    timeMode: 'remote',
    skills: [],
    skillsBio: '',
    connectMsg: '',
    signMsg: '',
    groupIdea: ''
  });
  const [contact, setContact] = useState({
    name: '',
    email: '',
    country: '',
    anon: false,
    agreeContact: true
  });
  const [refId, setRefId] = useState('');

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedActions([]);
      setContact({
        name: '',
        email: '',
        country: '',
        anon: false,
        agreeContact: true
      });
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const toggleAction = id => {
    setSelectedActions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleSkill = skill => {
    setDetails(d => ({
      ...d,
      skills: d.skills.includes(skill) ? d.skills.filter(s => s !== skill) : [...d.skills, skill]
    }));
  };
  const canProceed = () => {
    if (step === 1) return selectedActions.length > 0;
    if (step === 2) return true; // always allow, empty is OK
    if (step === 3) return contact.anon || contact.name && contact.email;
    return true;
  };
  const handleSubmit = () => {
    const ref = `MAD-${Date.now().toString(36).toUpperCase()}`;
    setRefId(ref);
    onSubmit({
      ref,
      target: {
        id: target?.id,
        title: target?.title,
        source: target?.source || target?.sourceName
      },
      actions: selectedActions,
      details: selectedActions.reduce((acc, a) => {
        if (a === 'money') acc.money = {
          amount: details.money,
          message: details.moneyMsg
        };
        if (a === 'time') acc.time = {
          hours: details.time,
          slot: details.timeSlot,
          mode: details.timeMode
        };
        if (a === 'skills') acc.skills = {
          list: details.skills,
          bio: details.skillsBio
        };
        if (a === 'connect') acc.connect = {
          message: details.connectMsg
        };
        if (a === 'sign') acc.sign = {
          message: details.signMsg
        };
        if (a === 'group') acc.group = {
          idea: details.groupIdea
        };
        return acc;
      }, {}),
      contact,
      submittedAt: new Date()
    });
    setStep(4);
  };
  const handleShare = channel => {
    const url = target?.link || window.location.href;
    const txt = encodeURIComponent(`I'm taking action on: "${target?.title}" via MaD — join me!`);
    const shareUrl = {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      tw: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${txt}`,
      li: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      wa: `https://wa.me/?text=${txt}%20${encodeURIComponent(url)}`,
      copy: null
    }[channel];
    if (channel === 'copy') {
      navigator.clipboard?.writeText(url);
      alert('Link copied!');
    } else if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] bg-mad-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-cream border-2 border-mad-black shadow-brutal-yellow max-w-2xl w-full my-8 max-h-[92vh] overflow-y-auto",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-b-2 border-mad-black p-5 sticky top-0 z-10 flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-black text-mad-yellow"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 10
  }), " MaD Action"), step < 4 && /*#__PURE__*/React.createElement("span", {
    className: "pill bg-white border border-mad-black"
  }, "Step ", step, " / 3")), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-xl uppercase leading-tight truncate"
  }, step === 4 ? t('modal_success_title') : t('modal_title')), target?.title && step < 4 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1 opacity-80 line-clamp-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono uppercase tracking-wider mr-1"
  }, "on:"), target.title)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-2 hover:bg-mad-black hover:text-mad-yellow flex-shrink-0",
    title: t('close')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  }))), step < 4 && /*#__PURE__*/React.createElement("div", {
    className: "h-1 bg-mad-black/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-mad-blue transition-all duration-500",
    style: {
      width: `${step / 3 * 100}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-6 sm:p-8"
  }, step === 1 && /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl uppercase mb-2"
  }, t('modal_step1_title')), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-80 mb-6"
  }, t('modal_step1_desc'), " ", /*#__PURE__*/React.createElement(HelpHint, {
    text: "You can pick multiple — no minimum commitment"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-3"
  }, ACTION_TYPES.map(a => {
    const active = selectedActions.includes(a.id);
    return /*#__PURE__*/React.createElement("button", {
      key: a.id,
      onClick: () => toggleAction(a.id),
      className: `text-left p-4 border-2 transition-all ${active ? 'bg-mad-black text-mad-yellow border-mad-black shadow-brutal-yellow' : 'bg-white border-mad-black hover:bg-mad-yellow'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-10 h-10 flex items-center justify-center border-2 flex-shrink-0 ${active ? 'bg-mad-yellow border-mad-yellow text-mad-black' : 'border-mad-black'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.icon,
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-display text-sm uppercase leading-tight"
    }, a.label), /*#__PURE__*/React.createElement("p", {
      className: `text-xs mt-1 ${active ? 'opacity-80' : 'opacity-70'}`
    }, a.desc)), active && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16,
      className: "text-mad-yellow"
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-3 bg-mad-yellow/40 border-2 border-dashed border-mad-black text-xs font-medium"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 12,
    className: "inline mr-1"
  }), " ", selectedActions.length, " action", selectedActions.length !== 1 ? 's' : '', " selected. You can change your mind before submitting.")), step === 2 && /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in space-y-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl uppercase mb-2"
  }, t('modal_step2_title')), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-80"
  }, "Fill only what applies — everything is optional at this step."), selectedActions.includes('money') && /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "dollar-sign",
    size: 16
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase"
  }, "Donate Money")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3"
  }, [5, 10, 25, 50, 100, 250].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setDetails({
      ...details,
      money: v
    }),
    className: `py-2 border-2 border-mad-black font-display text-sm ${details.money === v ? 'bg-mad-black text-mad-yellow' : 'bg-white hover:bg-mad-yellow'}`
  }, "$", v))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    value: details.money,
    onChange: e => setDetails({
      ...details,
      money: +e.target.value || 0
    }),
    className: "field mb-2",
    placeholder: "Custom amount (USD)"
  }), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    value: details.moneyMsg,
    onChange: e => setDetails({
      ...details,
      moneyMsg: e.target.value
    }),
    className: "field text-sm",
    placeholder: "Optional message with your donation..."
  })), selectedActions.includes('time') && /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 16
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase"
  }, "Donate Time")), /*#__PURE__*/React.createElement("input", {
    value: details.time,
    onChange: e => setDetails({
      ...details,
      time: e.target.value
    }),
    className: "field mb-2",
    placeholder: "How many hours per week? (e.g., 2-4h)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: details.timeSlot,
    onChange: e => setDetails({
      ...details,
      timeSlot: e.target.value
    }),
    className: "field !py-2 text-sm"
  }, /*#__PURE__*/React.createElement("option", {
    value: "weekends"
  }, "Weekends"), /*#__PURE__*/React.createElement("option", {
    value: "weekdays"
  }, "Weekdays"), /*#__PURE__*/React.createElement("option", {
    value: "evenings"
  }, "Evenings"), /*#__PURE__*/React.createElement("option", {
    value: "flexible"
  }, "Flexible")), /*#__PURE__*/React.createElement("select", {
    value: details.timeMode,
    onChange: e => setDetails({
      ...details,
      timeMode: e.target.value
    }),
    className: "field !py-2 text-sm"
  }, /*#__PURE__*/React.createElement("option", {
    value: "remote"
  }, "Remote"), /*#__PURE__*/React.createElement("option", {
    value: "local"
  }, "Local / In-person"), /*#__PURE__*/React.createElement("option", {
    value: "both"
  }, "Both")))), selectedActions.includes('skills') && /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wrench",
    size: 16
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase"
  }, "Share Skills")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs opacity-70 mb-2"
  }, "Pick what you can offer:"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, SKILL_CATEGORIES.map(s => {
    const active = details.skills.includes(s);
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => toggleSkill(s),
      className: `px-3 py-1.5 border-2 border-mad-black text-xs font-bold uppercase tracking-wider ${active ? 'bg-mad-black text-mad-yellow' : 'bg-white hover:bg-mad-yellow'}`
    }, active && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 10,
      className: "inline mr-1"
    }), s);
  })), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    value: details.skillsBio,
    onChange: e => setDetails({
      ...details,
      skillsBio: e.target.value
    }),
    className: "field text-sm",
    placeholder: "Brief bio — what makes you good at this?"
  })), selectedActions.includes('share') && /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share-2",
    size: 16
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase"
  }, "Spread the Word")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs opacity-70 mb-3"
  }, "Share on your network right now:"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-2"
  }, [{
    id: 'fb',
    icon: 'facebook',
    label: 'Facebook'
  }, {
    id: 'tw',
    icon: 'twitter',
    label: 'Twitter'
  }, {
    id: 'li',
    icon: 'linkedin',
    label: 'LinkedIn'
  }, {
    id: 'wa',
    icon: 'message-circle',
    label: 'WhatsApp'
  }, {
    id: 'copy',
    icon: 'copy',
    label: 'Copy'
  }].map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    onClick: () => handleShare(s.id),
    className: "p-3 border-2 border-mad-black bg-white hover:bg-mad-yellow flex flex-col items-center gap-1",
    title: s.label
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] uppercase font-mono"
  }, s.label))))), selectedActions.includes('connect') && /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link",
    size: 16
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase"
  }, "Connect Resources")), /*#__PURE__*/React.createElement("textarea", {
    rows: "3",
    value: details.connectMsg,
    onChange: e => setDetails({
      ...details,
      connectMsg: e.target.value
    }),
    className: "field text-sm",
    placeholder: "Who or what can you connect this cause to? (organization, media contact, funder, government office, expert...)"
  })), selectedActions.includes('sign') && /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit-3",
    size: 16
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase"
  }, "Add My Voice")), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    value: details.signMsg,
    onChange: e => setDetails({
      ...details,
      signMsg: e.target.value
    }),
    className: "field text-sm",
    placeholder: "Optional public message of support..."
  })), selectedActions.includes('group') && /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 16
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase"
  }, "Start / Join Group")), /*#__PURE__*/React.createElement("textarea", {
    rows: "3",
    value: details.groupIdea,
    onChange: e => setDetails({
      ...details,
      groupIdea: e.target.value
    }),
    className: "field text-sm",
    placeholder: "What group would you start around this? What's your first project?"
  }))), step === 3 && /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in space-y-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl uppercase mb-2"
  }, t('modal_step3_title')), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-80"
  }, "So we can follow up. ", /*#__PURE__*/React.createElement(HelpHint, {
    text: "Only shared with the MaD team and the group leader — never sold or made public."
  })), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-3 p-4 bg-mad-yellow/30 border-2 border-dashed border-mad-black cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: contact.anon,
    onChange: e => setContact({
      ...contact,
      anon: e.target.checked
    }),
    className: "w-5 h-5 accent-mad-blue"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-sm"
  }, t('anon_check')), /*#__PURE__*/React.createElement("p", {
    className: "text-xs opacity-70"
  }, "We won't be able to follow up with you — but your action still counts."))), !contact.anon && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-display text-xs uppercase tracking-widest mb-1"
  }, t('name_ph')), /*#__PURE__*/React.createElement("input", {
    value: contact.name,
    onChange: e => setContact({
      ...contact,
      name: e.target.value
    }),
    className: "field",
    placeholder: "Full name"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-display text-xs uppercase tracking-widest mb-1"
  }, t('email_ph')), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: contact.email,
    onChange: e => setContact({
      ...contact,
      email: e.target.value
    }),
    className: "field",
    placeholder: "you@example.com"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-display text-xs uppercase tracking-widest mb-1"
  }, t('country_ph'), " (", t('cancel') === 'Cancel' ? 'optional' : 'optionnel', ")"), /*#__PURE__*/React.createElement("select", {
    value: contact.country,
    onChange: e => setContact({
      ...contact,
      country: e.target.value
    }),
    className: "field"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "— Select —"), COUNTRIES.filter(c => c.code !== 'GLOBAL').map(c => /*#__PURE__*/React.createElement("option", {
    key: c.code,
    value: c.code
  }, c.flag, " ", c.name)))), /*#__PURE__*/React.createElement("label", {
    className: "flex items-start gap-3 text-sm cursor-pointer pt-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: contact.agreeContact,
    onChange: e => setContact({
      ...contact,
      agreeContact: e.target.checked
    }),
    className: "w-4 h-4 accent-mad-blue mt-0.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs opacity-80"
  }, "I agree the MaD team can email me within 48 hours to connect me with the group leader."))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-mad-black text-mad-yellow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest mb-2"
  }, "/ Your Commitment Summary"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-1 text-sm"
  }, selectedActions.map(id => {
    const a = ACTION_TYPES.find(x => x.id === id);
    let extra = '';
    if (id === 'money') extra = ` — $${details.money}`;
    if (id === 'time') extra = details.time ? ` — ${details.time}` : '';
    if (id === 'skills' && details.skills.length) extra = ` — ${details.skills.join(', ')}`;
    return /*#__PURE__*/React.createElement("li", {
      key: id,
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.icon,
      size: 12
    }), " ", a.label, extra);
  })))), step === 4 && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-24 h-24 mx-auto bg-mad-yellow border-4 border-mad-black rounded-full flex items-center justify-center mb-6 animate-bounce-in"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 44,
    className: "text-mad-black"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl uppercase mb-3"
  }, t('modal_success_title')), /*#__PURE__*/React.createElement("p", {
    className: "opacity-80 mb-6 max-w-md mx-auto"
  }, t('modal_success_desc')), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-4 py-2 bg-mad-black text-mad-yellow font-mono text-xs uppercase tracking-widest mb-8"
  }, "Reference: ", refId), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3 justify-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "btn-primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }), " ", t('done'))))), step < 4 && /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-t-2 border-mad-black p-4 flex items-center justify-between gap-3 sticky bottom-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: step === 1 ? onClose : () => setStep(step - 1),
    className: "btn-outline !py-2.5"
  }, step === 1 ? t('cancel') : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), " ", t('back'))), step < 3 ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(step + 1),
    disabled: !canProceed(),
    className: "btn-primary !py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
  }, t('next'), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14
  })) : /*#__PURE__*/React.createElement("button", {
    onClick: handleSubmit,
    disabled: !canProceed(),
    className: "btn-primary !py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 14
  }), " ", t('submit')))));
};

/* ===========================================================
   HELP PANEL + FLOATING BUTTON + WELCOME TOAST
   =========================================================== */
const FloatingHelpButton = ({
  onClick
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  title: "Help & Support",
  className: "fixed bottom-6 right-6 z-40 w-14 h-14 bg-mad-yellow border-4 border-mad-black shadow-brutal flex items-center justify-center hover:bg-mad-black hover:text-mad-yellow transition-colors rounded-full group"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "life-buoy",
  size: 24
}), /*#__PURE__*/React.createElement("span", {
  className: "absolute -top-2 -right-2 w-6 h-6 bg-mad-blue text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-mad-black animate-pulse-dot"
}, "?"));
const HelpPanel = ({
  isOpen,
  onClose
}) => {
  const {
    t
  } = useT();
  const [openFAQ, setOpenFAQ] = useState(null);
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[90] bg-mad-black/60 animate-fade-in",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-mad-cream border-l-4 border-mad-black overflow-y-auto mobile-menu-enter",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-b-4 border-mad-black p-5 sticky top-0 z-10 flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest"
  }, "/ Help Center"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl uppercase"
  }, t('help_title'))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-2 hover:bg-mad-black hover:text-mad-yellow"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-blue text-white border-2 border-mad-black p-5 shadow-brutal"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-70 mb-2"
  }, "/ Quick Start"), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg uppercase mb-4"
  }, t('help_start')), /*#__PURE__*/React.createElement("ol", {
    className: "space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display text-mad-yellow"
  }, "1."), " ", /*#__PURE__*/React.createElement("span", null, "Browse Stories, News, or Ideas.")), /*#__PURE__*/React.createElement("li", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display text-mad-yellow"
  }, "2."), " ", /*#__PURE__*/React.createElement("span", null, "Spot something that moves you? Click ", /*#__PURE__*/React.createElement("strong", {
    className: "text-mad-yellow"
  }, "MaD"), ".")), /*#__PURE__*/React.createElement("li", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display text-mad-yellow"
  }, "3."), " ", /*#__PURE__*/React.createElement("span", null, "Pick how you can help: money, time, skills, or share.")), /*#__PURE__*/React.createElement("li", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display text-mad-yellow"
  }, "4."), " ", /*#__PURE__*/React.createElement("span", null, "Get connected within 48 hours.")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest text-mad-blue mb-3"
  }, "/ ", t('help_faq')), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, FAQ_ITEMS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bg-white border-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenFAQ(openFAQ === i ? null : i),
    className: "w-full text-left p-3 flex items-center justify-between gap-3 hover:bg-mad-yellow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm"
  }, f.q), /*#__PURE__*/React.createElement(Icon, {
    name: openFAQ === i ? 'chevron-up' : 'chevron-down',
    size: 16
  })), openFAQ === i && /*#__PURE__*/React.createElement("div", {
    className: "px-3 pb-3 text-sm opacity-90 border-t border-mad-black/20 pt-3 animate-fade-in"
  }, f.a))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-2 border-mad-black p-5 shadow-brutal"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest mb-2"
  }, "/ ", t('help_contact')), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg uppercase mb-3"
  }, "Still stuck?"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-4"
  }, "Reach out and a human on our team will get back to you."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:help@makeadifference.org",
    className: "btn-primary w-full justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 14
  }), " Email Support")))));
};
const WelcomeToast = ({
  onDismiss,
  onOpenHelp
}) => {
  const {
    t
  } = useT();
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-24 right-6 z-30 max-w-sm bg-mad-black text-mad-yellow border-2 border-mad-black shadow-brutal-yellow p-5 animate-fade-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-mad-yellow text-mad-black flex items-center justify-center flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-display text-sm uppercase mb-1"
  }, t('welcome_title')), /*#__PURE__*/React.createElement("p", {
    className: "text-xs opacity-90 leading-relaxed"
  }, t('welcome_desc')), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onOpenHelp,
    className: "text-xs font-bold uppercase underline hover:text-white"
  }, "Show me how"), /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    className: "text-xs font-bold uppercase opacity-60 hover:opacity-100"
  }, "Dismiss"))), /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    className: "opacity-60 hover:opacity-100"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 14
  }))));
};

/* ===========================================================
   LANGUAGE DROPDOWN
   =========================================================== */
const LanguageDropdown = () => {
  const {
    lang,
    setLang
  } = useT();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const ref = useRef(null);
  useEffect(() => {
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    className: "flex items-center gap-2 px-3 py-2 border-2 border-mad-black bg-white hover:bg-mad-yellow text-xs font-bold uppercase tracking-wider",
    title: "Change language"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base"
  }, current.flag), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, current.code.toUpperCase()), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 12
  })), open && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 top-full mt-1 min-w-[180px] bg-white border-2 border-mad-black shadow-brutal z-50 animate-fade-in"
  }, LANGUAGES.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.code,
    onClick: () => {
      setLang(l.code);
      setOpen(false);
    },
    className: `w-full px-4 py-2.5 text-left flex items-center gap-3 text-sm ${lang === l.code ? 'bg-mad-yellow font-bold' : 'hover:bg-mad-yellow/40'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base"
  }, l.flag), /*#__PURE__*/React.createElement("span", null, l.name), lang === l.code && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12,
    className: "ml-auto"
  })))));
};

/* ===========================================================
   LOGO + NAVBAR
   =========================================================== */
const MaDLogo = ({
  size = 40,
  showWordmark = true
}) => /*#__PURE__*/React.createElement("div", {
  className: "flex items-center gap-3 cursor-pointer select-none"
}, /*#__PURE__*/React.createElement("div", {
  className: "relative",
  style: {
    width: size,
    height: size
  }
}, /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 40 40",
  width: size,
  height: size
}, /*#__PURE__*/React.createElement("circle", {
  cx: "20",
  cy: "20",
  r: "18",
  fill: "#FACC15",
  stroke: "#0A0A0A",
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("ellipse", {
  cx: "20",
  cy: "20",
  rx: "18",
  ry: "8",
  fill: "none",
  stroke: "#1E40AF",
  strokeWidth: "1.5",
  opacity: "0.7"
}), /*#__PURE__*/React.createElement("ellipse", {
  cx: "20",
  cy: "20",
  rx: "8",
  ry: "18",
  fill: "none",
  stroke: "#1E40AF",
  strokeWidth: "1.5",
  opacity: "0.7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "2",
  y1: "20",
  x2: "38",
  y2: "20",
  stroke: "#1E40AF",
  strokeWidth: "1.5",
  opacity: "0.7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "20",
  y1: "2",
  x2: "20",
  y2: "38",
  stroke: "#1E40AF",
  strokeWidth: "1.5",
  opacity: "0.7"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "20",
  cy: "2",
  r: "2",
  fill: "#1E40AF"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "38",
  cy: "20",
  r: "2",
  fill: "#1E40AF"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "20",
  cy: "38",
  r: "2",
  fill: "#1E40AF"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "2",
  cy: "20",
  r: "2",
  fill: "#1E40AF"
}))), showWordmark && /*#__PURE__*/React.createElement("div", {
  className: "flex flex-col -space-y-1 leading-none"
}, /*#__PURE__*/React.createElement("span", {
  className: "font-display text-2xl text-mad-blue tracking-tighter"
}, "MaD"), /*#__PURE__*/React.createElement("span", {
  className: "font-mono text-[9px] text-mad-black uppercase tracking-widest opacity-70 whitespace-nowrap"
}, "Make a Difference")));
const Navbar = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout,
  onOpenHelp
}) => {
  const {
    t
  } = useT();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navItems = [{
    id: 'home',
    label: t('nav_home')
  }, {
    id: 'stories',
    label: t('nav_stories')
  }, {
    id: 'news',
    label: t('nav_news')
  }, {
    id: 'ideas',
    label: t('nav_ideas')
  }, {
    id: 'get-involved',
    label: t('nav_getinvolved')
  }, {
    id: 'about',
    label: t('nav_about')
  }, {
    id: 'team',
    label: t('nav_team')
  }];
  if (currentUser?.role === UserRole.ADMIN) navItems.push({
    id: 'admin-dashboard',
    label: t('nav_admin')
  });
  const go = id => {
    onNavigate(id);
    setIsMenuOpen(false);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: `bg-mad-yellow border-b-4 border-mad-black sticky top-0 z-40 transition-shadow ${scrolled ? 'shadow-lg' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-20"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => go('home')
  }, /*#__PURE__*/React.createElement(MaDLogo, {
    size: 42
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden xl:flex items-center gap-1"
  }, navItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => go(item.id),
    className: `nav-link px-3 py-2 text-xs font-bold uppercase tracking-wider ${currentPage === item.id ? 'active text-mad-blue' : 'text-mad-black hover:text-mad-blue'}`
  }, item.label))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(LanguageDropdown, null), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenHelp,
    className: "hidden sm:flex p-2 border-2 border-mad-black bg-white hover:bg-mad-yellow",
    title: t('nav_help')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help-circle",
    size: 16
  })), currentUser ? /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-1.5 bg-mad-black text-mad-yellow rounded-full"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase truncate max-w-[80px]"
  }, currentUser.name)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "p-2 hover:bg-mad-black hover:text-mad-yellow",
    title: "Log out"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 16
  }))) : /*#__PURE__*/React.createElement("button", {
    onClick: () => go('login'),
    className: "hidden lg:inline-flex btn-primary !py-2.5 !px-4 !text-xs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-in",
    size: 14
  }), " ", t('nav_login')), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsMenuOpen(true),
    className: "xl:hidden p-2 -mr-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 26
  }))))), isMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-mad-black/60 xl:hidden",
    onClick: () => setIsMenuOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 top-0 bottom-0 w-80 bg-mad-yellow border-l-4 border-mad-black mobile-menu-enter overflow-y-auto",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center p-5 border-b-2 border-mad-black"
  }, /*#__PURE__*/React.createElement(MaDLogo, {
    size: 36
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsMenuOpen(false)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col p-4 gap-1"
  }, navItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => go(item.id),
    className: `text-left px-4 py-3 font-bold uppercase tracking-wider ${currentPage === item.id ? 'bg-mad-black text-mad-yellow' : 'hover:bg-mad-black/10'}`
  }, item.label)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onOpenHelp();
      setIsMenuOpen(false);
    },
    className: "text-left px-4 py-3 font-bold uppercase tracking-wider hover:bg-mad-black/10 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help-circle",
    size: 16
  }), " ", t('nav_help')), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t-2 border-mad-black"
  }, currentUser ? /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onLogout();
      setIsMenuOpen(false);
    },
    className: "btn-primary w-full justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 14
  }), " Log Out") : /*#__PURE__*/React.createElement("button", {
    onClick: () => go('login'),
    className: "btn-primary w-full justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-in",
    size: 14
  }), " ", t('nav_login')))))));
};

/* ===========================================================
   COUNTRY DROPDOWN
   =========================================================== */
const CountryDropdown = ({
  value,
  onChange,
  label
}) => {
  const {
    t
  } = useT();
  const current = COUNTRIES.find(c => c.code === value) || COUNTRIES[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black p-4 sm:p-5 shadow-brutal"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest mb-2 text-mad-blue"
  }, "/ ", label || t('hero_country_label')), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, current.flag), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange(e.target.value),
    className: "flex-1 font-display text-lg sm:text-xl uppercase bg-transparent outline-none cursor-pointer border-b-2 border-mad-black/20 focus:border-mad-blue py-1"
  }, COUNTRIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.code,
    value: c.code
  }, c.code === 'GLOBAL' ? t('all_countries') : c.name)))));
};

/* ===========================================================
   HERO + HOME
   =========================================================== */
const Hero = ({
  onNavigate,
  country,
  onCountryChange,
  onOpenHelp
}) => {
  const {
    t
  } = useT();
  return /*#__PURE__*/React.createElement("section", {
    className: "relative bg-mad-yellow border-b-4 border-mad-black overflow-hidden grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stripe-bg absolute inset-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-20 -right-20 w-72 h-72 bg-mad-blue rounded-full opacity-20 animate-float"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-10 left-10 w-32 h-32 bg-mad-black rounded-full opacity-10 animate-float",
    style: {
      animationDelay: '1s'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-12 gap-8 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 bg-mad-black text-mad-yellow px-4 py-1.5 rounded-full mb-6 font-mono text-xs uppercase tracking-widest animate-fade-in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 bg-mad-yellow rounded-full animate-pulse-dot"
  }), t('hero_badge')), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] mb-6"
  }, t('hero_title_1'), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-mad-blue"
  }, t('hero_title_2')), " ", t('hero_title_3'), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "relative inline-block"
  }, t('hero_title_4'), /*#__PURE__*/React.createElement("svg", {
    className: "absolute -bottom-2 left-0 w-full",
    viewBox: "0 0 200 12",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,8 Q50,0 100,6 T200,4",
    stroke: "#0A0A0A",
    strokeWidth: "4",
    fill: "none"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "text-lg sm:text-xl max-w-2xl font-medium mb-8"
  }, t('hero_subtitle')), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('stories'),
    className: "btn-primary"
  }, t('hero_cta_explore'), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('get-involved'),
    className: "btn-outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  }), " ", t('hero_cta_mad')), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenHelp,
    className: "btn-outline sm:hidden"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help-circle",
    size: 16
  }), " How it works"))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5 space-y-4"
  }, /*#__PURE__*/React.createElement(CountryDropdown, {
    value: country,
    onChange: onCountryChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black p-5 shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num text-mad-blue"
  }, "2.4k"), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-widest mt-1"
  }, t('stat_stories'))), /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-black text-mad-yellow border-2 border-mad-black p-5 shadow-brutal-blue"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "186"), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-widest mt-1"
  }, t('stat_groups'))), /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-blue text-white border-2 border-mad-black p-5 shadow-brutal col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "$48,212"), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-widest mt-1"
  }, t('stat_committed'))))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-black text-mad-yellow py-4 border-y-2 border-mad-black overflow-hidden whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex animate-marquee"
  }, [...Array(2)].map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "inline-flex items-center gap-12 mx-6 font-display text-2xl uppercase"
  }, /*#__PURE__*/React.createElement("span", null, "★ Vision"), /*#__PURE__*/React.createElement("span", null, "★ Integrity"), /*#__PURE__*/React.createElement("span", null, "★ Leadership"), /*#__PURE__*/React.createElement("span", null, "★ Transforming the world, one action at a time"), /*#__PURE__*/React.createElement("span", null, "★ From Likes to Lives"))))));
};
const HowItWorks = ({
  onOpenHelp
}) => {
  const steps = [{
    num: '01',
    title: 'A Story Lands',
    body: 'From a QR-coded newspaper, a tweet, a photo — or you typing it in. Anyone can MaD it.',
    icon: 'newspaper'
  }, {
    num: '02',
    title: 'Click the MaD Button',
    body: 'One click opens a 60-second action form. Pick how you can help: money, time, skills, share.',
    icon: 'zap'
  }, {
    num: '03',
    title: 'A Group Forms',
    body: 'MaD Angels form a squad around the story. Tasks get owners. Funds get raised.',
    icon: 'users'
  }, {
    num: '04',
    title: 'Action. Then Archive.',
    body: 'When the goal is met, the group archives. We are a workshop, not a social network.',
    icon: 'flag'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "py-20 sm:py-28 bg-mad-cream border-b-4 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end justify-between gap-6 mb-14"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-3"
  }, "/ How MaD Works"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl sm:text-6xl uppercase leading-tight"
  }, "From Comment ", /*#__PURE__*/React.createElement("br", {
    className: "hidden sm:block"
  }), " to ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-blue"
  }, "Commitment"))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenHelp,
    className: "btn-outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help-circle",
    size: 14
  }), " Full Guide")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "relative bg-white border-2 border-mad-black p-6 shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-xs text-mad-blue mb-4"
  }, s.num), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-mad-yellow border-2 border-mad-black flex items-center justify-center mb-4"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl uppercase mb-3"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium opacity-80"
  }, s.body))))));
};

/* ===========================================================
   STORY CARD — MaD button opens the modal
   =========================================================== */
const StoryCard = ({
  story,
  onView,
  onMaD
}) => {
  const {
    t
  } = useT();
  return /*#__PURE__*/React.createElement("div", {
    className: "group relative bg-white border-2 border-mad-black overflow-hidden flex flex-col h-full shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-52 overflow-hidden bg-mad-yellow"
  }, story.imageUrl ? /*#__PURE__*/React.createElement("img", {
    src: story.imageUrl,
    alt: story.title,
    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
    onError: e => {
      e.target.style.display = 'none';
      e.target.parentNode.classList.add('story-fallback');
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "story-fallback w-full h-full"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 left-3 flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-black text-mad-yellow"
  }, story.category), story.trending && /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-blue text-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 10
  }), " Burning")), /*#__PURE__*/React.createElement("span", {
    className: "absolute bottom-3 left-3 pill bg-white border border-mad-black"
  }, story.source)), /*#__PURE__*/React.createElement("div", {
    className: "p-5 flex-1 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mad-blue mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[120px]"
  }, story.author), /*#__PURE__*/React.createElement("span", null, "•"), /*#__PURE__*/React.createElement("span", null, story.country)), /*#__PURE__*/React.createElement("h3", {
    className: "font-display uppercase text-lg leading-tight mb-3 line-clamp-2"
  }, story.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium opacity-80 mb-5 line-clamp-3 flex-1"
  }, story.excerpt || story.content), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 pt-4 border-t-2 border-dashed border-mad-black/20"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onView(story),
    className: "btn-outline !py-2 !px-3 !text-xs flex-1 justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 12
  }), " ", t('read')), /*#__PURE__*/React.createElement("button", {
    onClick: () => onMaD(story),
    className: "btn-primary !py-2 !px-3 !text-xs flex-1 justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 12
  }), " ", t('mad_button'))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-3 text-xs opacity-70"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 12
  }), " ", story.likes), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1 text-mad-blue font-bold"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 12
  }), " ", story.mads, " MaDs"))));
};
const HomePage = ({
  stories,
  onNavigate,
  onViewStory,
  onMaD,
  country,
  onCountryChange,
  onOpenHelp
}) => {
  const {
    t
  } = useT();
  const filteredStories = useMemo(() => {
    if (country === 'GLOBAL') return stories;
    return stories.filter(s => s.countryCode === country);
  }, [stories, country]);
  const trending = filteredStories.filter(s => s.trending).slice(0, 3);
  const recent = filteredStories.slice(0, 6);
  const countryName = COUNTRIES.find(c => c.code === country)?.name || 'the world';
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement(Hero, {
    onNavigate: onNavigate,
    country: country,
    onCountryChange: onCountryChange,
    onOpenHelp: onOpenHelp
  }), /*#__PURE__*/React.createElement(HowItWorks, {
    onOpenHelp: onOpenHelp
  }), /*#__PURE__*/React.createElement("section", {
    className: "py-20 sm:py-28 bg-white border-b-4 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end justify-between gap-6 mb-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-3"
  }, "/ Burning Issues — ", country === 'GLOBAL' ? t('all_countries') : countryName), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl sm:text-6xl uppercase leading-tight"
  }, "Right ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-blue"
  }, "Now"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('stories'),
    className: "btn-outline"
  }, "All Stories ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14
  }))), trending.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-3 gap-6"
  }, trending.map(s => /*#__PURE__*/React.createElement(StoryCard, {
    key: s.id,
    story: s,
    onView: onViewStory,
    onMaD: onMaD
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-16 border-2 border-dashed border-mad-black/30 bg-mad-cream"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 40,
    className: "mx-auto mb-3 opacity-60"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xl uppercase"
  }, "No burning issues yet for ", countryName), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mt-2 mb-5"
  }, "Be the first — submit a story."), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('get-involved'),
    className: "btn-primary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " MaD a Story")))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 bg-mad-blue text-white border-b-4 border-mad-black relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 stripe-bg opacity-30"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 48,
    className: "opacity-50 mx-auto mb-6"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-3xl sm:text-5xl uppercase leading-tight mb-6"
  }, "\"Transforming the world, ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-yellow"
  }, "one action"), " at a time.\""), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest opacity-70"
  }, "— MaD Mission Statement"))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 bg-mad-cream border-b-4 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end justify-between gap-6 mb-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-3"
  }, "/ Recent Actions"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl sm:text-6xl uppercase"
  }, "Fresh on the ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-blue"
  }, "Feed"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('news'),
    className: "btn-outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rss",
    size: 14
  }), " Live News")), recent.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, recent.map(s => /*#__PURE__*/React.createElement(StoryCard, {
    key: s.id,
    story: s,
    onView: onViewStory,
    onMaD: onMaD
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-16"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xl uppercase opacity-60"
  }, "No stories yet.")))));
};

/* ===========================================================
   STORIES PAGE
   =========================================================== */
const StoriesPage = ({
  stories,
  onViewStory,
  onMaD
}) => {
  const [category, setCategory] = useState('All');
  const [region, setRegion] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => stories.filter(s => {
    if (s.status !== SubmissionStatus.APPROVED) return false;
    if (category !== 'All' && s.category !== category) return false;
    if (region !== 'All' && s.region !== region) return false;
    if (search && !`${s.title} ${s.content} ${s.country}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [stories, category, region, search]);
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-mad-yellow border-b-4 border-mad-black py-16 grain relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stripe-bg absolute inset-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest mb-3"
  }, "/ Mission Feed"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-5xl sm:text-7xl uppercase leading-none"
  }, "Stories", /*#__PURE__*/React.createElement("br", null), "That Need ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-blue"
  }, "You")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mt-4 max-w-2xl"
  }, "Every story here is one MaD click away from becoming action. ", /*#__PURE__*/React.createElement(HelpHint, {
    text: "Filter by category or region, then click MaD on any story to open the action form."
  })))), /*#__PURE__*/React.createElement("section", {
    className: "py-8 bg-white border-b-4 border-mad-black sticky top-20 z-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    className: "absolute left-4 top-1/2 -translate-y-1/2 text-mad-black/50"
  }), /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Search stories, places...",
    className: "field !pl-12"
  })), /*#__PURE__*/React.createElement("select", {
    value: category,
    onChange: e => setCategory(e.target.value),
    className: "field md:w-56 cursor-pointer"
  }, /*#__PURE__*/React.createElement("option", null, "All"), STORY_CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c))), /*#__PURE__*/React.createElement("select", {
    value: region,
    onChange: e => setRegion(e.target.value),
    className: "field md:w-56 cursor-pointer"
  }, /*#__PURE__*/React.createElement("option", null, "All"), REGIONS.map(r => /*#__PURE__*/React.createElement("option", {
    key: r
  }, r)))))), /*#__PURE__*/React.createElement("section", {
    className: "py-12 bg-mad-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-6"
  }, filtered.length, " stor", filtered.length === 1 ? 'y' : 'ies', " matched"), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 border-2 border-dashed border-mad-black/30 bg-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "inbox",
    size: 48,
    className: "mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xl uppercase"
  }, "No stories found"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mt-2"
  }, "Try a different filter — or MaD a story yourself.")) : /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, filtered.map(s => /*#__PURE__*/React.createElement(StoryCard, {
    key: s.id,
    story: s,
    onView: onViewStory,
    onMaD: onMaD
  }))))));
};

/* ===========================================================
   NEWS PAGE — live RSS via free CORS proxies + DOMParser
   =========================================================== */
const NewsCard = ({
  item,
  onMaD
}) => {
  const {
    t
  } = useT();
  const touching = isTouching(item);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black flex flex-col overflow-hidden shadow-brutal"
  }, item.imageUrl && /*#__PURE__*/React.createElement("div", {
    className: "h-44 overflow-hidden bg-mad-yellow"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.imageUrl,
    alt: "",
    className: "w-full h-full object-cover",
    onError: e => {
      e.target.style.display = 'none';
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-5 flex-1 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill text-white",
    style: {
      background: item.sourceColor || '#1E40AF'
    }
  }, item.source), touching && /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-yellow border border-mad-black"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 10
  }), " Touching")), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-base uppercase leading-snug mb-3 line-clamp-3"
  }, item.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium opacity-80 line-clamp-3 mb-4 flex-1"
  }, item.description), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-60 mb-4"
  }, item.pubDate.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 pt-4 border-t-2 border-dashed border-mad-black/20"
  }, /*#__PURE__*/React.createElement("a", {
    href: item.link,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn-outline !py-2 !px-3 !text-xs flex-1 justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 12
  }), " ", t('read')), /*#__PURE__*/React.createElement("button", {
    onClick: () => onMaD(item),
    className: "btn-primary !py-2 !px-3 !text-xs flex-1 justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 12
  }), " ", t('mad_plus')))));
};
const NewsPage = ({
  onMaD
}) => {
  const {
    t
  } = useT();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSource, setActiveSource] = useState('all');
  const [touchingOnly, setTouchingOnly] = useState(false);
  const fetchAllNews = async () => {
    setLoading(true);
    setError(null);
    const promises = NEWS_SOURCES.map(async src => {
      try {
        const xml = await fetchWithProxyFallback(src.rss);
        return parseRSSFeed(xml, src);
      } catch (e) {
        console.warn(`[MaD] ${src.name} failed:`, e.message);
        return [];
      }
    });
    const results = (await Promise.all(promises)).flat();
    if (results.length === 0) {
      setItems(FALLBACK_NEWS);
      setError('Could not reach live news sources right now. Showing curated picks instead.');
    } else {
      results.sort((a, b) => b.pubDate - a.pubDate);
      setItems(results);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAllNews();
  }, []);
  const filtered = useMemo(() => {
    let out = items;
    if (activeSource !== 'all') {
      const src = NEWS_SOURCES.find(s => s.id === activeSource);
      if (src) out = out.filter(it => it.source === src.name);
    }
    if (touchingOnly) out = out.filter(isTouching);
    return out;
  }, [items, activeSource, touchingOnly]);
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-mad-blue text-white border-b-4 border-mad-black py-16 relative overflow-hidden grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stripe-bg absolute inset-0 opacity-30"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-yellow mb-3"
  }, "/ Live News Feed"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-5xl sm:text-7xl uppercase leading-none mb-6"
  }, "Great ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-yellow"
  }, "News"), /*#__PURE__*/React.createElement("br", null), "From the World"), /*#__PURE__*/React.createElement("p", {
    className: "text-base sm:text-lg max-w-3xl font-medium opacity-90"
  }, "Auto-updating from transparent global sources — BBC, Reuters, The Guardian, AP, NPR, Al Jazeera. Spot a story that moves you? Hit ", /*#__PURE__*/React.createElement("strong", {
    className: "text-mad-yellow"
  }, "MaD+"), " to turn it into action."))), /*#__PURE__*/React.createElement("section", {
    className: "py-6 bg-white border-b-4 border-mad-black sticky top-20 z-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveSource('all'),
    className: `tab ${activeSource === 'all' ? 'active' : ''}`
  }, "All Sources"), NEWS_SOURCES.map(src => /*#__PURE__*/React.createElement("button", {
    key: src.id,
    onClick: () => setActiveSource(src.id),
    className: `tab ${activeSource === src.id ? 'active' : ''}`
  }, src.name)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTouchingOnly(t => !t),
    className: `tab flex items-center gap-2 ${touchingOnly ? 'active' : ''}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 12
  }), " Touching only"), /*#__PURE__*/React.createElement("button", {
    onClick: fetchAllNews,
    title: "Refresh",
    className: "tab flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "refresh-cw",
    size: 12
  }), " Refresh"))), /*#__PURE__*/React.createElement("section", {
    className: "py-10 bg-mad-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, error && /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-2 border-mad-black p-4 mb-6 flex items-start gap-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-triangle",
    size: 20
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium"
  }, error)), loading ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block animate-spin"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    size: 40
  })), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest opacity-70 mt-4"
  }, "Fetching news from around the world..."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs opacity-50 mt-2"
  }, "First load can take up to 20 seconds while proxies warm up.")) : filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 border-2 border-dashed border-mad-black/30 bg-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "inbox",
    size: 48,
    className: "mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xl uppercase"
  }, "No news matched"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mt-2"
  }, "Try a different source or turn off \"Touching only\".")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-6"
  }, filtered.length, " stories — Updated ", new Date().toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, filtered.map(item => /*#__PURE__*/React.createElement(NewsCard, {
    key: item.id,
    item: item,
    onMaD: onMaD
  })))))));
};

/* ===========================================================
   STORY DETAIL
   =========================================================== */
const StoryDetail = ({
  story,
  group,
  onBack,
  onNavigate,
  onJoinGroup,
  onMaD
}) => {
  const {
    t
  } = useT();
  const [tab, setTab] = useState(group ? 'action' : 'story');
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in bg-mad-cream"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-white border-b-4 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6 py-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-6 flex items-center gap-2 hover:underline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), " ", t('back')), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-black text-mad-yellow"
  }, story.category), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-yellow border border-mad-black"
  }, story.source), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-white border border-mad-black"
  }, story.country, " • ", story.region)), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl sm:text-6xl uppercase leading-[0.95] mb-6"
  }, story.title), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-4 text-sm font-mono uppercase tracking-wider opacity-80"
  }, /*#__PURE__*/React.createElement("span", null, "By ", story.author), /*#__PURE__*/React.createElement("span", null, "•"), /*#__PURE__*/React.createElement("span", null, story.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })))), story.imageUrl && /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 pb-10"
  }, /*#__PURE__*/React.createElement("img", {
    src: story.imageUrl,
    className: "w-full h-[300px] sm:h-[480px] object-cover border-2 border-mad-black",
    onError: e => {
      e.target.style.display = 'none';
    }
  }))), /*#__PURE__*/React.createElement("section", {
    className: "py-6 bg-white border-b-4 border-mad-black sticky top-20 z-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('story'),
    className: `tab ${tab === 'story' ? 'active' : ''}`
  }, "The Story"), group && /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('action'),
    className: `tab ${tab === 'action' ? 'active' : ''}`
  }, "Action Plan"), group?.fundraiser && /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('fund'),
    className: `tab ${tab === 'fund' ? 'active' : ''}`
  }, "Fundraiser"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('discuss'),
    className: `tab ${tab === 'discuss' ? 'active' : ''}`
  }, "Discussion"))), /*#__PURE__*/React.createElement("section", {
    className: "py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6"
  }, tab === 'story' && /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-medium leading-relaxed mb-6"
  }, story.content), story.sourceLink && /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-6"
  }, "Source: ", /*#__PURE__*/React.createElement("a", {
    href: story.sourceLink,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-mad-blue underline break-all"
  }, story.sourceLink)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 mt-8 pt-8 border-t-2 border-dashed border-mad-black/20"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onMaD(story),
    className: "btn-primary !py-3 !px-6"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 16
  }), " ", t('mad_button')), /*#__PURE__*/React.createElement("button", {
    className: "btn-outline"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 14
  }), " Like (", story.likes, ")"))), /*#__PURE__*/React.createElement("aside", {
    className: "lg:col-span-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-2 border-mad-black p-6 shadow-brutal lg:sticky lg:top-44"
  }, group ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest mb-2"
  }, "/ Group active"), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl uppercase mb-3"
  }, group.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-4"
  }, group.description), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-xs uppercase tracking-widest mb-4"
  }, group.memberCount, " committed"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onJoinGroup(group);
      setTab('action');
    },
    className: "btn-primary w-full justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user-plus",
    size: 14
  }), " Join Group")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest mb-2"
  }, "/ Be the spark"), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl uppercase mb-3"
  }, "No group yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-4"
  }, "A MaD Angel will form a group if this story gathers enough commitment."), /*#__PURE__*/React.createElement("button", {
    onClick: () => onMaD(story),
    className: "btn-primary w-full justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 14
  }), " ", t('mad_button')))))), tab === 'action' && group && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end justify-between gap-4 mb-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-2"
  }, "/ Action Plan"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-3xl uppercase"
  }, group.name)), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-black text-mad-yellow"
  }, group.memberCount, " members")), /*#__PURE__*/React.createElement("p", {
    className: "text-base font-medium opacity-80 mb-4"
  }, group.description), group.projects.map(project => /*#__PURE__*/React.createElement("div", {
    key: project.id,
    className: "bg-white border-2 border-mad-black shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-black text-mad-yellow px-5 py-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-60"
  }, "Project"), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg uppercase"
  }, project.title)), /*#__PURE__*/React.createElement(Icon, {
    name: "folder-open",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium opacity-80 mb-4"
  }, project.description), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, project.tasks.map(task => {
    const color = task.status === TaskStatus.COMPLETED ? 'bg-green-500' : task.status === TaskStatus.IN_PROGRESS ? 'bg-mad-yellow' : 'bg-gray-300';
    return /*#__PURE__*/React.createElement("div", {
      key: task.id,
      className: "flex items-center justify-between gap-3 p-3 bg-mad-cream border border-mad-black/20"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-3 h-3 rounded-full ${color} flex-shrink-0`
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-bold text-sm truncate"
    }, task.title), /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[10px] uppercase tracking-widest opacity-60"
    }, task.assignee))), /*#__PURE__*/React.createElement("span", {
      className: "pill border border-mad-black/30 bg-white"
    }, task.status));
  })))))), tab === 'fund' && group?.fundraiser && /*#__PURE__*/React.createElement(FundraiserPanel, {
    fundraiser: group.fundraiser,
    groupName: group.name
  }), tab === 'discuss' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black p-8 shadow-brutal text-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-square",
    size: 40,
    className: "mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl uppercase mb-2"
  }, "Discussion"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mb-6"
  }, "Group members can post updates and proof of action here."), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('login'),
    className: "btn-primary mx-auto"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 14
  }), " Login to Join")))));
};
const FundraiserPanel = ({
  fundraiser,
  groupName
}) => {
  const [amount, setAmount] = useState(25);
  const [committing, setCommitting] = useState(false);
  const pct = Math.min(100, fundraiser.raised / fundraiser.goal * 100);
  const handleCommit = () => {
    setCommitting(true);
    setTimeout(() => {
      alert(`Thank you! $${amount} committed to "${groupName}". (Demo — hook up a payment provider to go live.)`);
      setCommitting(false);
    }, 800);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 bg-white border-2 border-mad-black p-6 shadow-brutal"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-2"
  }, "/ Donation Cycle"), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl uppercase mb-2"
  }, fundraiser.label), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mb-6"
  }, "A GoFundMe-style cycle for ", groupName, "."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end gap-3 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display text-4xl sm:text-5xl text-mad-blue"
  }, "$", fundraiser.raised.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-xs uppercase tracking-widest opacity-60 mb-2"
  }, "of $", fundraiser.goal.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "progress-bar mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      width: `${pct}%`
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest opacity-60"
  }, pct.toFixed(0), "% funded")), /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-2 border-mad-black p-6 shadow-brutal-blue"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-lg uppercase mb-4"
  }, "Commit Now"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-4"
  }, [10, 25, 50, 100, 250, 500].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setAmount(v),
    className: `py-2 border-2 border-mad-black font-display text-sm ${amount === v ? 'bg-mad-black text-mad-yellow' : 'bg-white hover:bg-mad-black hover:text-mad-yellow'}`
  }, "$", v))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: amount,
    onChange: e => setAmount(+e.target.value || 0),
    className: "field mb-4",
    placeholder: "Custom"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleCommit,
    disabled: committing,
    className: "btn-primary w-full justify-center"
  }, committing ? 'Processing...' : /*#__PURE__*/React.createElement(React.Fragment, null, "Commit $", amount))));
};

/* ===========================================================
   IDEAS MARKET
   =========================================================== */
const IdeaCard = ({
  idea,
  onVote
}) => {
  const isPromoted = idea.status === IdeaStatus.PROMOTED;
  const flag = COUNTRIES.find(c => c.code === idea.countryCode)?.flag || '🌍';
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black p-6 shadow-brutal flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center flex-shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onVote,
    disabled: isPromoted,
    className: `flex flex-col items-center gap-1 p-3 border-2 border-mad-black w-16 ${isPromoted ? 'bg-mad-cream cursor-not-allowed opacity-60' : 'bg-mad-yellow hover:bg-mad-black hover:text-mad-yellow'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-up",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display text-lg leading-none"
  }, idea.votes)), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[9px] uppercase tracking-widest mt-1 opacity-60"
  }, "votes")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, flag), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-black text-mad-yellow"
  }, idea.category), isPromoted ? /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-blue text-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rocket",
    size: 10
  }), " Promoted") : /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-yellow border border-mad-black"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "megaphone",
    size: 10
  }), " Voting")), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl uppercase leading-tight mb-2"
  }, idea.title), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-60"
  }, "By ", idea.proposer, " • ", idea.country, " • ", idea.createdAt.toLocaleDateString()))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium opacity-80 mb-4"
  }, idea.description), idea.tags?.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, idea.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "text-[10px] font-mono uppercase px-2 py-0.5 border border-mad-black/30"
  }, "#", t))));
};
const IdeasMarket = ({
  ideas,
  onVote,
  onSubmitIdea,
  currentUser
}) => {
  const {
    t
  } = useT();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [country, setCountry] = useState('GLOBAL');
  const [form, setForm] = useState({
    title: '',
    description: '',
    country: 'CM',
    category: STORY_CATEGORIES[0],
    tags: ''
  });
  const filtered = useMemo(() => {
    let out = ideas;
    if (filter === 'voting') out = out.filter(i => i.status === IdeaStatus.VOTING);
    if (filter === 'promoted') out = out.filter(i => i.status === IdeaStatus.PROMOTED);
    if (country !== 'GLOBAL') out = out.filter(i => i.countryCode === country);
    return [...out].sort((a, b) => b.votes - a.votes);
  }, [ideas, filter, country]);
  const submit = e => {
    e.preventDefault();
    onSubmitIdea({
      ...form,
      countryCode: form.country,
      country: COUNTRIES.find(c => c.code === form.country)?.name || form.country,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      proposer: currentUser?.name || 'Anonymous'
    });
    setForm({
      title: '',
      description: '',
      country: 'CM',
      category: STORY_CATEGORIES[0],
      tags: ''
    });
    setShowForm(false);
    alert('Your idea is in the market! Others can now vote.');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-mad-yellow border-b-4 border-mad-black py-16 grain relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stripe-bg absolute inset-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest mb-3"
  }, "/ Ideas Market"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-5xl sm:text-7xl uppercase leading-none mb-6"
  }, "Ideas ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-blue"
  }, "→"), " Action"), /*#__PURE__*/React.createElement("p", {
    className: "text-base sm:text-lg max-w-3xl font-medium"
  }, "Submit ideas that could lift up your community. Vote on others. When an idea catches fire, admins promote it to a full MaD project."))), /*#__PURE__*/React.createElement("section", {
    className: "py-6 bg-white border-b-4 border-mad-black sticky top-20 z-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter('all'),
    className: `tab ${filter === 'all' ? 'active' : ''}`
  }, "All Ideas"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter('voting'),
    className: `tab ${filter === 'voting' ? 'active' : ''}`
  }, "Open"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter('promoted'),
    className: `tab ${filter === 'promoted' ? 'active' : ''}`
  }, "Promoted"), /*#__PURE__*/React.createElement("select", {
    value: country,
    onChange: e => setCountry(e.target.value),
    className: "field !py-2 !px-3 !text-xs cursor-pointer w-auto"
  }, COUNTRIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.code,
    value: c.code
  }, c.flag, " ", c.code === 'GLOBAL' ? t('all_countries') : c.name))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowForm(s => !s),
    className: "btn-primary !py-2 !px-4 !text-xs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Submit Idea"))), showForm && /*#__PURE__*/React.createElement("section", {
    className: "py-10 bg-mad-blue/5 border-b-4 border-mad-black animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-black text-mad-yellow p-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-xl uppercase"
  }, "Drop Your Idea")), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: "p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("input", {
    required: true,
    value: form.title,
    onChange: e => setForm({
      ...form,
      title: e.target.value
    }),
    className: "field",
    placeholder: "Idea title — one sentence"
  }), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: "5",
    value: form.description,
    onChange: e => setForm({
      ...form,
      description: e.target.value
    }),
    className: "field",
    placeholder: "Who benefits, how it works, rough cost..."
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("select", {
    value: form.country,
    onChange: e => setForm({
      ...form,
      country: e.target.value
    }),
    className: "field"
  }, COUNTRIES.filter(c => c.code !== 'GLOBAL').map(c => /*#__PURE__*/React.createElement("option", {
    key: c.code,
    value: c.code
  }, c.flag, " ", c.name))), /*#__PURE__*/React.createElement("select", {
    value: form.category,
    onChange: e => setForm({
      ...form,
      category: e.target.value
    }),
    className: "field"
  }, STORY_CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c))), /*#__PURE__*/React.createElement("input", {
    value: form.tags,
    onChange: e => setForm({
      ...form,
      tags: e.target.value
    }),
    className: "field",
    placeholder: "Tags: solar, women..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-primary flex-1 justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 14
  }), " ", t('submit')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowForm(false),
    className: "btn-outline"
  }, t('cancel'))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-16 bg-mad-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-6"
  }, filtered.length, " ideas, sorted by votes"), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 border-2 border-dashed border-mad-black/30 bg-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 48,
    className: "mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xl uppercase"
  }, "No ideas yet")) : /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-6"
  }, filtered.map(idea => /*#__PURE__*/React.createElement(IdeaCard, {
    key: idea.id,
    idea: idea,
    onVote: () => onVote(idea.id)
  }))))));
};

/* ===========================================================
   GET INVOLVED
   =========================================================== */
const GetInvolvedPage = ({
  onSubmit,
  prefill,
  onClearPrefill
}) => {
  const {
    t
  } = useT();
  const init = () => prefill || {
    title: '',
    content: '',
    link: '',
    category: STORY_CATEGORIES[0],
    region: REGIONS[0],
    country: '',
    name: '',
    email: '',
    anon: false
  };
  const [type, setType] = useState(prefill?.type || 'story');
  const [form, setForm] = useState(init());
  const [submitted, setSubmitted] = useState(false);
  const [photoName, setPhotoName] = useState('');
  useEffect(() => {
    if (prefill) {
      setForm({
        ...init(),
        ...prefill
      });
      setType(prefill.type || 'link');
    }
  }, [prefill]);
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...form,
      type,
      photoName
    });
    setSubmitted(true);
    onClearPrefill?.();
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        title: '',
        content: '',
        link: '',
        category: STORY_CATEGORIES[0],
        region: REGIONS[0],
        country: '',
        name: '',
        email: '',
        anon: false
      });
      setPhotoName('');
    }, 4000);
  };
  const types = [{
    id: 'story',
    label: 'Tell a Story',
    icon: 'edit-3',
    desc: 'Type a story. Admins review and publish.'
  }, {
    id: 'link',
    label: 'MaD a Link',
    icon: 'link',
    desc: 'Share a URL to an existing article.'
  }, {
    id: 'event',
    label: 'Submit an Event',
    icon: 'calendar',
    desc: 'Something happening near you?'
  }, {
    id: 'photo',
    label: 'Photo Witness',
    icon: 'camera',
    desc: 'A picture is the story.'
  }, {
    id: 'donation',
    label: 'Donation Cycle',
    icon: 'heart-handshake',
    desc: 'GoFundMe-style commitment cycle.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-mad-blue text-white border-b-4 border-mad-black py-16 relative overflow-hidden grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stripe-bg absolute inset-0 opacity-30"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-yellow mb-3"
  }, "/ MaD it +"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-5xl sm:text-7xl uppercase leading-none mb-4"
  }, "Get ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-yellow"
  }, "Involved")), /*#__PURE__*/React.createElement("p", {
    className: "text-lg max-w-2xl opacity-90 font-medium"
  }, "Add a story, share a link, post a photo, or flag an event. Admins verify everything before it goes live."))), /*#__PURE__*/React.createElement("section", {
    className: "py-12 bg-mad-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6"
  }, prefill && /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-2 border-mad-black p-4 mb-6 flex items-start gap-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 20
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium"
  }, "Pre-filled from a news story you tagged with MaD+. Edit anything before submitting.")), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-4"
  }, "/ Pick a way"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10"
  }, types.map(tp => /*#__PURE__*/React.createElement("button", {
    key: tp.id,
    onClick: () => setType(tp.id),
    className: `p-4 border-2 border-mad-black text-left ${type === tp.id ? 'bg-mad-yellow shadow-brutal' : 'bg-white hover:bg-mad-yellow/30'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: tp.icon,
    size: 20
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xs uppercase mt-2 leading-tight"
  }, tp.label)))), submitted ? /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow border-2 border-mad-black p-12 shadow-brutal text-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2",
    size: 56,
    className: "mx-auto mb-4 text-mad-blue"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-3xl uppercase mb-3"
  }, "Submitted!"), /*#__PURE__*/React.createElement("p", {
    className: "font-medium opacity-80"
  }, "Admins will review your submission.")) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-black text-mad-yellow p-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-xl uppercase"
  }, types.find(x => x.id === type).label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-mono uppercase tracking-widest opacity-70 mt-1"
  }, types.find(x => x.id === type).desc)), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "p-6 sm:p-8 space-y-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-display text-xs uppercase tracking-widest mb-2"
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    required: true,
    value: form.title,
    onChange: e => setForm({
      ...form,
      title: e.target.value
    }),
    className: "field",
    placeholder: "Headline"
  })), type === 'link' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-display text-xs uppercase tracking-widest mb-2"
  }, "Link"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "url",
    value: form.link,
    onChange: e => setForm({
      ...form,
      link: e.target.value
    }),
    className: "field",
    placeholder: "https://..."
  })), type === 'photo' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-display text-xs uppercase tracking-widest mb-2"
  }, "Photo"), /*#__PURE__*/React.createElement("label", {
    className: "field cursor-pointer flex items-center gap-3 hover:bg-mad-yellow/20"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, photoName || 'Click to choose a file'), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    className: "hidden",
    onChange: e => setPhotoName(e.target.files[0]?.name || '')
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-display text-xs uppercase tracking-widest mb-2"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: "6",
    value: form.content,
    onChange: e => setForm({
      ...form,
      content: e.target.value
    }),
    className: "field",
    placeholder: "What happened, what is needed, why it matters."
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("select", {
    value: form.category,
    onChange: e => setForm({
      ...form,
      category: e.target.value
    }),
    className: "field"
  }, STORY_CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c))), /*#__PURE__*/React.createElement("select", {
    value: form.region,
    onChange: e => setForm({
      ...form,
      region: e.target.value
    }),
    className: "field"
  }, REGIONS.map(r => /*#__PURE__*/React.createElement("option", {
    key: r
  }, r))), /*#__PURE__*/React.createElement("input", {
    value: form.country,
    onChange: e => setForm({
      ...form,
      country: e.target.value
    }),
    className: "field",
    placeholder: "Country"
  })), /*#__PURE__*/React.createElement("div", {
    className: "border-t-2 border-dashed border-mad-black/20 pt-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-3 cursor-pointer mb-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: form.anon,
    onChange: e => setForm({
      ...form,
      anon: e.target.checked
    }),
    className: "w-5 h-5 accent-mad-blue"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium"
  }, t('anon_check'))), !form.anon && /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("input", {
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    }),
    className: "field",
    placeholder: t('name_ph')
  }), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: form.email,
    onChange: e => setForm({
      ...form,
      email: e.target.value
    }),
    className: "field",
    placeholder: t('email_ph')
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-primary w-full justify-center !py-4 !text-base"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 16
  }), " ", t('submit')))))));
};

/* ===========================================================
   ABOUT PAGE
   =========================================================== */
const AboutPage = () => /*#__PURE__*/React.createElement("div", {
  className: "animate-fade-in"
}, /*#__PURE__*/React.createElement("section", {
  className: "bg-mad-yellow border-b-4 border-mad-black py-16 grain relative overflow-hidden"
}, /*#__PURE__*/React.createElement("div", {
  className: "stripe-bg absolute inset-0"
}), /*#__PURE__*/React.createElement("div", {
  className: "max-w-5xl mx-auto px-4 sm:px-6 relative z-10"
}, /*#__PURE__*/React.createElement("p", {
  className: "font-mono text-xs uppercase tracking-widest mb-3"
}, "/ About MaD"), /*#__PURE__*/React.createElement("h1", {
  className: "font-display text-5xl sm:text-7xl uppercase leading-none"
}, "From ", /*#__PURE__*/React.createElement("span", {
  className: "text-mad-blue"
}, "Likes"), /*#__PURE__*/React.createElement("br", null), "to Lives"))), /*#__PURE__*/React.createElement("section", {
  className: "py-16 bg-white border-b-4 border-mad-black"
}, /*#__PURE__*/React.createElement("div", {
  className: "max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10"
}, /*#__PURE__*/React.createElement("div", {
  className: "lg:col-span-2 space-y-6"
}, /*#__PURE__*/React.createElement("p", {
  className: "text-2xl font-display uppercase leading-tight text-mad-blue"
}, "What if we gave life to likes and gave policy makers the tools needed for addressing true needs in communities?"), /*#__PURE__*/React.createElement("p", {
  className: "text-base font-medium leading-relaxed"
}, "MaD — Make a Difference — exists to take the energy that gets trapped in comment threads, and route it into action. We are not a social network. We are a platform that turns stories into structured, accountable, time-bound community projects."), /*#__PURE__*/React.createElement("p", {
  className: "text-base font-medium leading-relaxed"
}, "The approach is multi-platform: from the simplest QR code on a printed newspaper, to articles linked from any website, to events, photos, and direct submissions — every channel feeds the same workflow. Stories get verified. Groups form around them. Projects break work into tasks. Tasks get owners. Resources — money, time, skills — get committed. And when the work is done, the group archives. Clean.")), /*#__PURE__*/React.createElement("aside", {
  className: "space-y-4"
}, /*#__PURE__*/React.createElement("div", {
  className: "bg-mad-yellow border-2 border-mad-black p-5 shadow-brutal"
}, /*#__PURE__*/React.createElement("p", {
  className: "font-mono text-[10px] uppercase tracking-widest mb-2"
}, "/ Mission"), /*#__PURE__*/React.createElement("p", {
  className: "font-display text-lg uppercase leading-tight"
}, "Transforming the world, one action at a time.")), /*#__PURE__*/React.createElement("div", {
  className: "bg-mad-blue text-white border-2 border-mad-black p-5 shadow-brutal"
}, /*#__PURE__*/React.createElement("p", {
  className: "font-mono text-[10px] uppercase tracking-widest mb-2 opacity-70"
}, "/ Values"), /*#__PURE__*/React.createElement("ul", {
  className: "space-y-1 font-display text-lg uppercase"
}, /*#__PURE__*/React.createElement("li", null, "★ Vision"), /*#__PURE__*/React.createElement("li", null, "★ Integrity"), /*#__PURE__*/React.createElement("li", null, "★ Leadership"))), /*#__PURE__*/React.createElement("div", {
  className: "bg-mad-black text-mad-yellow border-2 border-mad-black p-5 shadow-brutal"
}, /*#__PURE__*/React.createElement("p", {
  className: "font-mono text-[10px] uppercase tracking-widest mb-2 opacity-70"
}, "/ One Liner"), /*#__PURE__*/React.createElement("p", {
  className: "font-display text-lg uppercase leading-tight"
}, "Giving Life to Likes."))))), /*#__PURE__*/React.createElement("section", {
  className: "py-20 bg-mad-cream border-b-4 border-mad-black"
}, /*#__PURE__*/React.createElement("div", {
  className: "max-w-6xl mx-auto px-4 sm:px-6"
}, /*#__PURE__*/React.createElement("p", {
  className: "font-mono text-xs uppercase tracking-widest text-mad-blue mb-3"
}, "/ Founder"), /*#__PURE__*/React.createElement("h2", {
  className: "font-display text-4xl sm:text-6xl uppercase mb-12"
}, "Innocent ", /*#__PURE__*/React.createElement("span", {
  className: "text-mad-blue"
}, "Forteh")), /*#__PURE__*/React.createElement("div", {
  className: "grid lg:grid-cols-3 gap-8"
}, /*#__PURE__*/React.createElement("div", {
  className: "lg:col-span-1"
}, /*#__PURE__*/React.createElement("div", {
  className: "aspect-[4/5] bg-gradient-to-br from-mad-yellow to-mad-blue border-2 border-mad-black shadow-brutal flex items-center justify-center relative overflow-hidden"
}, /*#__PURE__*/React.createElement("div", {
  className: "absolute inset-0 stripe-bg opacity-30"
}), /*#__PURE__*/React.createElement("div", {
  className: "relative z-10 text-center"
}, /*#__PURE__*/React.createElement("div", {
  className: "w-32 h-32 rounded-full bg-mad-black mx-auto flex items-center justify-center border-4 border-white"
}, /*#__PURE__*/React.createElement("span", {
  className: "font-display text-5xl text-mad-yellow"
}, "IF")), /*#__PURE__*/React.createElement("p", {
  className: "font-display text-xl uppercase mt-4 text-mad-black"
}, "Innocent Forteh"), /*#__PURE__*/React.createElement("p", {
  className: "font-mono text-[10px] uppercase tracking-widest text-mad-black/80"
}, "Founder & Visionary"))), /*#__PURE__*/React.createElement("div", {
  className: "flex gap-2 mt-4"
}, ['linkedin', 'twitter', 'mail'].map(s => /*#__PURE__*/React.createElement("a", {
  key: s,
  href: "#",
  className: "flex-1 p-3 bg-white border-2 border-mad-black flex items-center justify-center hover:bg-mad-yellow shadow-brutal"
}, /*#__PURE__*/React.createElement(Icon, {
  name: s,
  size: 18
}))))), /*#__PURE__*/React.createElement("div", {
  className: "lg:col-span-2 space-y-5"
}, /*#__PURE__*/React.createElement("p", {
  className: "text-lg font-medium leading-relaxed"
}, "Innocent Forteh is the founder and driving force behind MaD. He built MaD on a deceptively simple observation: every day, millions of people see something on their feed that genuinely moves them — and the most they do about it is tap a heart. The energy is real. The infrastructure to channel it isn't."), /*#__PURE__*/React.createElement("p", {
  className: "text-base font-medium leading-relaxed opacity-90"
}, "Across years of working at the intersection of community organising, technology, and public policy, Innocent watched the same pattern repeat: communities are full of people willing to act, but they lack a workflow that connects a story they care about to a concrete task they can pick up. MaD is his answer to that gap — a 911 for the web, where any story, from a printed newspaper QR code in a rural village to a viral thread on the timeline, can become a structured group, a verified project, and a tangible outcome."), /*#__PURE__*/React.createElement("p", {
  className: "text-base font-medium leading-relaxed opacity-90"
}, "He is a believer in the power of small communities committed to single, specific projects — groups that exist to do one thing, do it well, and dissolve. Innocent's work is grounded in the conviction that ordinary people, given the right tools and the right framing, are the most underused engine of change in the world."), /*#__PURE__*/React.createElement("blockquote", {
  className: "border-l-4 border-mad-yellow pl-5 mt-6 italic"
}, "\"We don't need more comments. We need more workshops. MaD is a workshop.\" — Innocent Forteh"))))));
const TeamPage = () => {
  const team = [{
    name: 'Innocent Forteh',
    role: 'Founder & Visionary',
    initials: 'IF'
  }, {
    name: 'MaD Angels',
    role: 'Group Stewards',
    initials: 'MA'
  }, {
    name: 'Editorial Desk',
    role: 'Story Verification',
    initials: 'ED'
  }, {
    name: 'Tech Crew',
    role: 'Platform Engineers',
    initials: 'TC'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-mad-black text-mad-yellow border-b-4 border-mad-black py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest opacity-70 mb-3"
  }, "/ MaD Team"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-5xl sm:text-7xl uppercase leading-none"
  }, "The People ", /*#__PURE__*/React.createElement("br", null), "Behind ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-yellow"
  }, "MaD")))), /*#__PURE__*/React.createElement("section", {
    className: "py-16 bg-mad-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
  }, team.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bg-white border-2 border-mad-black shadow-brutal overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-square bg-gradient-to-br from-mad-yellow to-mad-blue flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display text-6xl text-mad-black"
  }, m.initials)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-display text-lg uppercase"
  }, m.name), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest text-mad-blue"
  }, m.role))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-16 bg-mad-yellow border-2 border-mad-black p-8 shadow-brutal text-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user-plus",
    size: 36,
    className: "mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-3xl uppercase mb-2"
  }, "Become a MaD Angel"), /*#__PURE__*/React.createElement("p", {
    className: "font-medium opacity-80 max-w-2xl mx-auto mb-6"
  }, "MaD Angels are limited-admin volunteers who steward groups, validate goals, and keep projects moving."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:innocentforteh@gmail.com?subject=I%20want%20to%20be%20a%20MaD%20Angel",
    className: "btn-primary inline-flex"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 14
  }), " Apply to be a MaD Angel")))));
};

/* ===========================================================
   LOGIN PAGE
   =========================================================== */
const LoginPage = ({
  onLogin,
  adminPassword
}) => {
  const {
    t
  } = useT();
  const [mode, setMode] = useState('member');
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [err, setErr] = useState('');
  const oauthProviders = [{
    id: 'google',
    label: 'Google',
    icon: 'chrome',
    color: 'bg-white text-mad-black'
  }, {
    id: 'facebook',
    label: 'Facebook',
    icon: 'facebook',
    color: 'bg-blue-600 text-white'
  }, {
    id: 'apple',
    label: 'Apple',
    icon: 'command',
    color: 'bg-mad-black text-white'
  }, {
    id: 'microsoft',
    label: 'Microsoft',
    icon: 'square',
    color: 'bg-blue-500 text-white'
  }, {
    id: 'github',
    label: 'GitHub',
    icon: 'github',
    color: 'bg-mad-black text-white'
  }];
  const handleAdminLogin = e => {
    e.preventDefault();
    setErr('');
    if (form.username === 'forteh' && form.password === adminPassword) {
      onLogin({
        name: 'Innocent Forteh',
        username: 'forteh',
        role: UserRole.ADMIN
      });
    } else {
      setErr('Invalid credentials.');
    }
  };
  const handleOAuth = provider => {
    // Placeholder — real OAuth needs backend
    onLogin({
      name: `${provider.label} User`,
      role: UserRole.INDIVIDUAL,
      provider: provider.id
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 bg-mad-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-8"
  }, /*#__PURE__*/React.createElement(MaDLogo, {
    size: 56
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black shadow-brutal-yellow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex border-b-2 border-mad-black"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMode('member'),
    className: `flex-1 py-3 font-display uppercase tracking-wider text-sm ${mode === 'member' ? 'bg-mad-yellow' : 'bg-white hover:bg-mad-yellow/40'}`
  }, "Member"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMode('admin'),
    className: `flex-1 py-3 font-display uppercase tracking-wider text-sm border-l-2 border-mad-black ${mode === 'admin' ? 'bg-mad-yellow' : 'bg-white hover:bg-mad-yellow/40'}`
  }, "Admin")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 sm:p-8"
  }, mode === 'member' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl uppercase mb-2"
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mb-6"
  }, "Sign in with your favourite provider — no passwords to remember."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, oauthProviders.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => handleOAuth(p),
    className: `w-full py-3 px-4 border-2 border-mad-black flex items-center justify-center gap-3 font-bold text-sm hover:shadow-brutal ${p.color}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 16
  }), " Continue with ", p.label))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs opacity-60 text-center mt-6"
  }, "By continuing you agree to our terms. Anon actions don't require login.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl uppercase mb-2"
  }, "Admin Access"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mb-6"
  }, "Restricted to platform administrators."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAdminLogin,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("input", {
    required: true,
    value: form.username,
    onChange: e => setForm({
      ...form,
      username: e.target.value
    }),
    className: "field",
    placeholder: "Username"
  }), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "password",
    value: form.password,
    onChange: e => setForm({
      ...form,
      password: e.target.value
    }),
    className: "field",
    placeholder: "Password"
  }), err && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-50 border border-red-500 text-red-800 p-3 text-sm"
  }, err), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-primary w-full justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-in",
    size: 14
  }), " Sign In")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs opacity-60 mt-4 font-mono"
  }, "Access: ", /*#__PURE__*/React.createElement("strong", null, "forteh"), " / ", /*#__PURE__*/React.createElement("strong", null, "f0rteh")))))));
};

/* ===========================================================
   ADMIN DASHBOARD
   =========================================================== */
const AdminDashboard = ({
  submissions,
  stories,
  ideas,
  adminPassword,
  onApprove,
  onReject,
  onPromoteIdea,
  onChangePassword
}) => {
  const [tab, setTab] = useState('queue');
  const [pwd, setPwd] = useState({
    current: '',
    next: '',
    confirm: ''
  });
  const [pwdMsg, setPwdMsg] = useState('');
  const pending = submissions.filter(s => s.status === SubmissionStatus.PENDING);
  const promotable = ideas.filter(i => i.status === IdeaStatus.VOTING && i.votes >= 100);
  const changePwd = e => {
    e.preventDefault();
    setPwdMsg('');
    if (pwd.current !== adminPassword) {
      setPwdMsg('Current password is wrong.');
      return;
    }
    if (pwd.next.length < 4) {
      setPwdMsg('New password must be 4+ characters.');
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setPwdMsg('Confirmation does not match.');
      return;
    }
    onChangePassword(pwd.next);
    setPwd({
      current: '',
      next: '',
      confirm: ''
    });
    setPwdMsg('Password changed!');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-mad-black text-mad-yellow border-b-4 border-mad-black py-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between flex-wrap gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-xs uppercase tracking-widest opacity-70 mb-2"
  }, "/ Admin Dashboard"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-3xl sm:text-5xl uppercase"
  }, "Control ", /*#__PURE__*/React.createElement("span", {
    className: "text-mad-yellow"
  }, "Center"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-yellow text-mad-black px-4 py-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-70"
  }, "Pending"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-2xl"
  }, pending.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white text-mad-black px-4 py-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-70"
  }, "Published"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-2xl"
  }, stories.filter(s => s.status === SubmissionStatus.APPROVED).length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-blue text-white px-4 py-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-70"
  }, "Ideas Ready"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-2xl"
  }, promotable.length))))), /*#__PURE__*/React.createElement("section", {
    className: "py-4 bg-white border-b-4 border-mad-black sticky top-20 z-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('queue'),
    className: `tab ${tab === 'queue' ? 'active' : ''}`
  }, "Verification Queue (", pending.length, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('published'),
    className: `tab ${tab === 'published' ? 'active' : ''}`
  }, "Published Stories"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('promote'),
    className: `tab ${tab === 'promote' ? 'active' : ''}`
  }, "Ideas Ready (", promotable.length, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab('settings'),
    className: `tab ${tab === 'settings' ? 'active' : ''}`
  }, "Settings"))), /*#__PURE__*/React.createElement("section", {
    className: "py-10 bg-mad-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6"
  }, tab === 'queue' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, pending.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 bg-white border-2 border-dashed border-mad-black/30"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2",
    size: 48,
    className: "mx-auto mb-4 text-mad-blue"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xl uppercase"
  }, "Queue empty")) : pending.map(sub => /*#__PURE__*/React.createElement("div", {
    key: sub.id,
    className: "bg-white border-2 border-mad-black p-5 shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-between items-start gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill bg-mad-yellow border border-mad-black"
  }, sub.type || 'story'), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-white border border-mad-black"
  }, sub.category), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-white border border-mad-black"
  }, sub.country)), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg uppercase leading-tight"
  }, sub.title)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onApprove(sub.id),
    className: "btn-primary !py-2 !px-3 !text-xs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " Approve"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onReject(sub.id),
    className: "btn-outline !py-2 !px-3 !text-xs !border-red-600 !text-red-700"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 12
  }), " Reject"))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-80 mb-3"
  }, sub.content), sub.link && /*#__PURE__*/React.createElement("p", {
    className: "text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opacity-60"
  }, "Link:"), " ", /*#__PURE__*/React.createElement("a", {
    href: sub.link,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-mad-blue underline break-all"
  }, sub.link)), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-60 mt-3"
  }, "By ", sub.anon ? 'Anonymous' : sub.name || 'Unknown', " — ", sub.createdAt.toLocaleString())))), tab === 'published' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black shadow-brutal overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-mad-black text-mad-yellow"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "text-left p-3 font-mono text-xs uppercase tracking-widest"
  }, "Title"), /*#__PURE__*/React.createElement("th", {
    className: "text-left p-3 font-mono text-xs uppercase tracking-widest"
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    className: "text-left p-3 font-mono text-xs uppercase tracking-widest"
  }, "Country"), /*#__PURE__*/React.createElement("th", {
    className: "text-right p-3 font-mono text-xs uppercase tracking-widest"
  }, "MaDs"), /*#__PURE__*/React.createElement("th", {
    className: "text-right p-3 font-mono text-xs uppercase tracking-widest"
  }, "Group"))), /*#__PURE__*/React.createElement("tbody", null, stories.filter(s => s.status === SubmissionStatus.APPROVED).map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.id,
    className: "border-t border-mad-black/10"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-bold"
  }, s.title), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, s.category), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, s.country), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-right text-mad-blue font-bold"
  }, s.mads), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-right"
  }, s.hasGroup ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }) : '—')))))), tab === 'promote' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, promotable.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 bg-white border-2 border-dashed border-mad-black/30"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rocket",
    size: 48,
    className: "mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-xl uppercase"
  }, "No ideas ready"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-70 mt-2"
  }, "Ideas need 100+ votes to be promoted.")) : promotable.map(idea => /*#__PURE__*/React.createElement("div", {
    key: idea.id,
    className: "bg-white border-2 border-mad-black p-5 shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg uppercase mb-2"
  }, idea.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-80 mb-3"
  }, idea.description), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-60"
  }, idea.votes, " votes • ", idea.country)), /*#__PURE__*/React.createElement("button", {
    onClick: () => onPromoteIdea(idea.id),
    className: "btn-primary !py-2 !px-4 !text-xs flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rocket",
    size: 12
  }), " Promote"))))), tab === 'settings' && /*#__PURE__*/React.createElement("div", {
    className: "max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-mad-black shadow-brutal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-mad-black text-mad-yellow p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg uppercase"
  }, "Change Admin Password")), /*#__PURE__*/React.createElement("form", {
    onSubmit: changePwd,
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pwd.current,
    onChange: e => setPwd({
      ...pwd,
      current: e.target.value
    }),
    className: "field",
    placeholder: "Current password",
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pwd.next,
    onChange: e => setPwd({
      ...pwd,
      next: e.target.value
    }),
    className: "field",
    placeholder: "New password",
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pwd.confirm,
    onChange: e => setPwd({
      ...pwd,
      confirm: e.target.value
    }),
    className: "field",
    placeholder: "Confirm new password",
    required: true
  }), pwdMsg && /*#__PURE__*/React.createElement("p", {
    className: `text-sm ${pwdMsg.includes('!') ? 'text-mad-blue' : 'text-red-700'}`
  }, pwdMsg), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-primary w-full justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key",
    size: 14
  }), " Update Password")))))));
};

/* ===========================================================
   FOOTER
   =========================================================== */
const Footer = ({
  onNavigate
}) => {
  const [email, setEmail] = useState('');
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-mad-black text-mad-yellow border-t-4 border-mad-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-4 gap-10 mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement(MaDLogo, {
    size: 48
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-display uppercase text-mad-yellow leading-tight max-w-md"
  }, "Giving Life to Likes."), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-80 mt-3 max-w-md"
  }, "A workshop, not a social network. Where a story becomes a group, a group becomes a project, and a project becomes change."), /*#__PURE__*/React.createElement("div", {
    className: "mt-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest mb-3 opacity-70"
  }, "/ Get the Weekly Digest"), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      alert(`Subscribed ${email}!`);
      setEmail('');
    },
    className: "flex gap-2 max-w-sm"
  }, /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    type: "email",
    required: true,
    className: "flex-1 bg-mad-yellow text-mad-black px-3 py-2 border-2 border-mad-yellow font-medium text-sm outline-none",
    placeholder: "your@email.com"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-mad-yellow text-mad-black px-4 py-2 border-2 border-mad-yellow font-display uppercase text-xs hover:bg-mad-cream"
  }, "Join")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest mb-4 opacity-70"
  }, "/ Platform"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-sm"
  }, [['home', 'Home'], ['stories', 'Stories'], ['news', 'News'], ['ideas', 'Ideas Market'], ['get-involved', 'MaD it +']].map(([p, l]) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => onNavigate(p),
    className: "block hover:text-white text-left"
  }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest mb-4 opacity-70"
  }, "/ MaD"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-sm"
  }, [['about', 'About'], ['team', 'Team'], ['login', 'Login']].map(([p, l]) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => onNavigate(p),
    className: "block hover:text-white text-left"
  }, l)), /*#__PURE__*/React.createElement("a", {
    href: "mailto:help@makeadifference.org",
    className: "block hover:text-white"
  }, "Contact")))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-mad-yellow/30 pt-6 flex flex-wrap items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, SOCIAL_LINKS.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.name,
    href: s.url,
    title: s.name,
    className: "w-9 h-9 border-2 border-mad-yellow flex items-center justify-center hover:bg-mad-yellow hover:text-mad-black"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 14
  })))), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-[10px] uppercase tracking-widest opacity-60"
  }, "© 2026 MaD — Make a Difference. All actions matter."))));
};

/* ===========================================================
   APP
   =========================================================== */
const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem('mad_lang') || 'en');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [stories, setStories] = useState(SEED_STORIES);
  const [groups, setGroups] = useState(SEED_GROUPS);
  const [ideas, setIdeas] = useState(SEED_IDEAS);
  const [submissions, setSubmissions] = useState([]);
  const [actions, setActions] = useState([]); // MaD action log
  const [adminPassword, setAdminPassword] = useState('f0rteh');
  const [country, setCountry] = useState('GLOBAL');
  const [getInvolvedPrefill, setGetInvolvedPrefill] = useState(null);
  const [madModalTarget, setMadModalTarget] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Translation function
  const t = key => TRANSLATIONS[lang] && TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
  useEffect(() => {
    localStorage.setItem('mad_lang', lang);
  }, [lang]);

  // Welcome toast on first visit
  useEffect(() => {
    if (!localStorage.getItem('mad_welcomed')) {
      const t = setTimeout(() => setShowWelcome(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);
  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('mad_welcomed', 'yes');
  };

  // Re-render Lucide icons after every state change
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  const navigate = page => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const viewStory = story => {
    setSelectedStory(story);
    navigate('story-detail');
  };
  const login = user => {
    setCurrentUser(user);
    navigate(user.role === UserRole.ADMIN ? 'admin-dashboard' : 'home');
  };
  const logout = () => {
    setCurrentUser(null);
    navigate('home');
  };

  // MaD action handlers
  const openMaD = target => setMadModalTarget(target);
  const closeMaD = () => setMadModalTarget(null);
  const handleMaDSubmit = action => {
    setActions(prev => [{
      ...action,
      id: `a${Date.now()}`
    }, ...prev]);
    if (action.target?.id && stories.find(s => s.id === action.target.id)) {
      setStories(prev => prev.map(s => s.id === action.target.id ? {
        ...s,
        mads: s.mads + 1
      } : s));
    }
    madApi.post('action', action);
  };

  // Hydrate from backend on mount (if configured)
  useEffect(() => {
    (async () => {
      const data = await madApi.get('all');
      if (!data || !data.ok) return;
      if (data.stories?.length) {
        setStories(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          const fresh = data.stories.filter(s => !existingIds.has(s.id)).map(s => ({
            ...s,
            createdAt: new Date(s.createdAt || Date.now())
          }));
          return [...fresh, ...prev];
        });
      }
      if (data.ideas?.length) {
        setIdeas(prev => {
          const existingIds = new Set(prev.map(i => i.id));
          const fresh = data.ideas.filter(i => !existingIds.has(i.id)).map(i => ({
            ...i,
            createdAt: new Date(i.createdAt || Date.now())
          }));
          return [...fresh, ...prev];
        });
      }
      if (data.actions?.length) setActions(data.actions);
      if (data.submissions?.length) {
        setSubmissions(data.submissions.filter(s => s.status === 'PENDING').map(s => ({
          ...s,
          createdAt: new Date(s.createdAt || Date.now())
        })));
      }
    })();
  }, []);

  // MaD+ from news → pre-fill get involved
  const handleMaDFromNews = item => {
    openMaD({
      id: item.id,
      title: item.title,
      source: item.source,
      link: item.link
    });
  };

  // Submissions
  const handleSubmission = data => {
    const sub = {
      ...data,
      id: `sub${Date.now()}`,
      status: SubmissionStatus.PENDING,
      createdAt: new Date()
    };
    setSubmissions(prev => [sub, ...prev]);
    madApi.post('submission', data);
  };
  const approveSubmission = id => {
    const sub = submissions.find(s => s.id === id);
    if (!sub) return;
    setSubmissions(prev => prev.filter(s => s.id !== id));
    setStories(prev => [{
      id: `s${Date.now()}`,
      ...sub,
      status: SubmissionStatus.APPROVED,
      likes: 0,
      mads: 0,
      hasGroup: false,
      author: sub.anon ? 'Anonymous' : sub.name || 'Community',
      excerpt: (sub.content || '').slice(0, 140),
      source: StorySource.USER_SUBMITTED,
      countryCode: 'GLOBAL',
      trending: false
    }, ...prev]);
    madApi.post('approve', {
      submissionId: id,
      admin: currentUser?.username || 'forteh'
    });
  };
  const rejectSubmission = id => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    madApi.post('reject', {
      submissionId: id,
      admin: currentUser?.username || 'forteh'
    });
  };

  // Ideas
  const voteOnIdea = id => {
    setIdeas(prev => prev.map(i => i.id === id ? {
      ...i,
      votes: i.votes + 1
    } : i));
    madApi.post('vote', {
      ideaId: id
    });
  };
  const submitIdea = idea => {
    setIdeas(prev => [{
      ...idea,
      id: `i${Date.now()}`,
      votes: 1,
      comments: 0,
      status: IdeaStatus.VOTING,
      createdAt: new Date()
    }, ...prev]);
    madApi.post('idea', idea);
  };
  const promoteIdea = id => {
    const idea = ideas.find(i => i.id === id);
    if (!idea) return;
    setIdeas(prev => prev.map(i => i.id === id ? {
      ...i,
      status: IdeaStatus.PROMOTED,
      promotedAt: new Date()
    } : i));
    // Auto-create a story
    setStories(prev => [{
      id: `s${Date.now()}`,
      title: `[IDEA → PROJECT] ${idea.title}`,
      content: idea.description,
      excerpt: idea.description.slice(0, 140),
      author: idea.proposer,
      source: StorySource.ADMIN_POST,
      category: idea.category,
      region: 'Africa',
      country: idea.country,
      countryCode: idea.countryCode,
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=70',
      likes: 0,
      mads: 0,
      hasGroup: false,
      createdAt: new Date(),
      status: SubmissionStatus.APPROVED,
      trending: true
    }, ...prev]);
    madApi.post('promote', {
      ideaId: id,
      admin: currentUser?.username || 'forteh'
    });
    alert(`Idea promoted! A story has been auto-created on the feed.`);
  };
  const joinGroup = group => {
    setGroups(prev => ({
      ...prev,
      [group.id]: {
        ...prev[group.id],
        memberCount: (prev[group.id].memberCount || 0) + 1
      }
    }));
  };
  const changePassword = newPwd => setAdminPassword(newPwd);

  // Page render
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return /*#__PURE__*/React.createElement(HomePage, {
          stories: stories,
          onNavigate: navigate,
          onViewStory: viewStory,
          onMaD: openMaD,
          country: country,
          onCountryChange: setCountry,
          onOpenHelp: () => setIsHelpOpen(true)
        });
      case 'stories':
        return /*#__PURE__*/React.createElement(StoriesPage, {
          stories: stories,
          onViewStory: viewStory,
          onMaD: openMaD
        });
      case 'news':
        return /*#__PURE__*/React.createElement(NewsPage, {
          onMaD: handleMaDFromNews
        });
      case 'ideas':
        return /*#__PURE__*/React.createElement(IdeasMarket, {
          ideas: ideas,
          onVote: voteOnIdea,
          onSubmitIdea: submitIdea,
          currentUser: currentUser
        });
      case 'get-involved':
        return /*#__PURE__*/React.createElement(GetInvolvedPage, {
          onSubmit: handleSubmission,
          prefill: getInvolvedPrefill,
          onClearPrefill: () => setGetInvolvedPrefill(null)
        });
      case 'about':
        return /*#__PURE__*/React.createElement(AboutPage, null);
      case 'team':
        return /*#__PURE__*/React.createElement(TeamPage, null);
      case 'login':
        return /*#__PURE__*/React.createElement(LoginPage, {
          onLogin: login,
          adminPassword: adminPassword
        });
      case 'admin-dashboard':
        if (currentUser?.role !== UserRole.ADMIN) return /*#__PURE__*/React.createElement(LoginPage, {
          onLogin: login,
          adminPassword: adminPassword
        });
        return /*#__PURE__*/React.createElement(AdminDashboard, {
          submissions: submissions,
          stories: stories,
          ideas: ideas,
          adminPassword: adminPassword,
          onApprove: approveSubmission,
          onReject: rejectSubmission,
          onPromoteIdea: promoteIdea,
          onChangePassword: changePassword
        });
      case 'story-detail':
        return selectedStory ? /*#__PURE__*/React.createElement(StoryDetail, {
          story: selectedStory,
          group: selectedStory.groupId ? groups[selectedStory.groupId] : null,
          onBack: () => navigate('stories'),
          onNavigate: navigate,
          onJoinGroup: joinGroup,
          onMaD: openMaD
        }) : /*#__PURE__*/React.createElement(HomePage, {
          stories: stories,
          onNavigate: navigate,
          onViewStory: viewStory,
          onMaD: openMaD,
          country: country,
          onCountryChange: setCountry,
          onOpenHelp: () => setIsHelpOpen(true)
        });
      default:
        return /*#__PURE__*/React.createElement(HomePage, {
          stories: stories,
          onNavigate: navigate,
          onViewStory: viewStory,
          onMaD: openMaD,
          country: country,
          onCountryChange: setCountry,
          onOpenHelp: () => setIsHelpOpen(true)
        });
    }
  };
  return /*#__PURE__*/React.createElement(LangContext.Provider, {
    value: {
      lang,
      t,
      setLang
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: currentPage,
    onNavigate: navigate,
    currentUser: currentUser,
    onLogout: logout,
    onOpenHelp: () => setIsHelpOpen(true)
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, renderPage()), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement(MaDActionModal, {
    isOpen: !!madModalTarget,
    target: madModalTarget,
    onClose: closeMaD,
    onSubmit: handleMaDSubmit
  }), /*#__PURE__*/React.createElement(HelpPanel, {
    isOpen: isHelpOpen,
    onClose: () => setIsHelpOpen(false)
  }), /*#__PURE__*/React.createElement(FloatingHelpButton, {
    onClick: () => setIsHelpOpen(true)
  }), showWelcome && /*#__PURE__*/React.createElement(WelcomeToast, {
    onDismiss: dismissWelcome,
    onOpenHelp: () => {
      setIsHelpOpen(true);
      dismissWelcome();
    }
  })));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
