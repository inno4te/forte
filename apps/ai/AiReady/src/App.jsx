import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Sparkles, Brain, Rocket, Globe, ChevronRight, ArrowRight, Search,
  Briefcase, GraduationCap, MessageCircle, Mail, Check, X, Menu,
  Sun, Moon, TrendingUp, Shield, Zap, Target, Award, BookOpen,
  BarChart3, Users, MapPin, Star, Download, Send, ChevronDown,
  Activity, Layers, Cpu, Lightbulb, ArrowUpRight, AlertCircle
} from "lucide-react";

/* ============================================================
   TRANSLATIONS — i18n (8 languages)
   ============================================================ */
const TRANSLATIONS = {
  en: {
    nav: { home: "Home", assessment: "Assessment", trends: "AI Career Trends", upskilling: "Upskilling Hub", coaching: "Coaching", about: "About", admin: "Admin" },
    hero: {
      tag: "AI Career Intelligence Platform",
      title1: "Will AI", title2: "Replace", title3: "Your Job?",
      sub: "Discover how exposed your career is to AI and automation. Get a personalized readiness score and a roadmap to thrive in the age of intelligent machines.",
      cta1: "Start Assessment", cta2: "Learn More",
      ticker: ["AI is reshaping 1.2 billion jobs globally", "85% of jobs in 2030 don't exist yet", "Reskilling boosts career resilience by 3x", "Africa leads digital economy growth", "AI augments — it doesn't always replace", "Future-proof skills are the new currency"]
    },
    how: {
      title: "How It Works", sub: "Four simple steps to your AI readiness blueprint",
      s1t: "Tell Us About You", s1d: "Share your name and where you work from to personalize your insights.",
      s2t: "Pick Your Career", s2d: "Search or type your current role — students included.",
      s3t: "Get Your Score", s3d: "Our engine analyzes 6 dimensions to compute your exposure.",
      s4t: "Build Your Plan", s4d: "Receive skills, roles, and resources tailored to your future."
    },
    stats: {
      title: "The AI Impact",
      sub: "Numbers that matter for your career",
      s1: "Jobs reshaped globally", s2: "Industries transformed", s3: "Future skills emerging", s4: "Average reskilling ROI"
    },
    featured: { title: "Featured Careers", sub: "Explore exposure across popular fields" },
    trends: {
      title: "AI Career Trends",
      sub: "Curated insights on how AI is reshaping work",
      readMore: "Read insight"
    },
    upskill: {
      title: "Upskilling Hub", sub: "Free and paid resources to future-proof your career",
      free: "Free Training", paid: "Paid Training", visit: "Visit"
    },
    coaching: {
      title: "Need 1-on-1 Career Coaching?",
      sub: "Talk directly with a Team21 expert to map your AI-ready future.",
      whatsapp: "WhatsApp Coaching", email: "Email Coaching",
      formTitle: "Book a Coaching Session",
      fullName: "Full Name", country: "Country", career: "Career Field",
      score: "Exposure Score", type: "Coaching Type", method: "Preferred Contact Method",
      message: "Message",
      types: { guidance: "Career Guidance", upskill: "AI Upskilling", transition: "Career Transition", student: "Student Mentorship", business: "Business AI Readiness" },
      methods: { wa: "WhatsApp", email: "Email" },
      submit: "Send Request", cancel: "Cancel",
      sentWa: "Opening WhatsApp...", sentEmail: "Opening email client..."
    },
    onb: {
      step: "Step", of: "of",
      welcome: "Welcome", welcomeSub: "Let's start with your name",
      fullName: "Full Name", fullNamePh: "e.g. Amara Okonkwo",
      email: "Email (optional)", emailPh: "you@example.com",
      continue: "Continue", back: "Back",
      regionTitle: "Where in the world?", regionSub: "We use this to localize your insights",
      region: "Region", country: "Country", other: "Other",
      careerTitle: "Your career path", careerSub: "Search, select, or type your role",
      careerPh: "Search for a job or type your own...",
      studentField: "What field are you interested in?",
      studentFieldPh: "e.g. Medicine, Engineering, Law",
      measure: "Measure Exposure",
      regions: { Africa: "Africa", Europe: "Europe", Asia: "Asia", "North America": "North America", "South America": "South America", Oceania: "Oceania", "Middle East": "Middle East" }
    },
    loading: ["Analyzing automation trends...", "Evaluating AI disruption risk...", "Mapping skill adjacencies...", "Generating personalized recommendations...", "Finalizing your readiness blueprint..."],
    result: {
      title: "Your AI Readiness Report",
      score: "Exposure Score", level: "Risk Level",
      explain: "What this means", outlook: "Future Outlook",
      regional: "Regional Insights", skills: "Recommended Skills",
      roles: "Career Evolution Paths", trends: "AI Trends Affecting You",
      free: "Free Learning", paid: "Premium Learning",
      download: "Download PDF Report", retake: "Retake Assessment",
      bookCoach: "Book Coaching",
      levels: { vlow: "Very Low Exposure", mod: "Moderate Exposure", sig: "Significant Exposure", high: "High Exposure", crit: "Critical Exposure" }
    },
    about: {
      title: "About MaDSkillz",
      p1: "MaDSkillz AI Readiness is a career intelligence platform built by Team21 Academy to empower professionals, students, and entrepreneurs across the globe — with a special focus on Africa — to understand and adapt to the AI revolution.",
      p2: "We don't believe AI is here to replace you. We believe AI is here to redefine what's possible — and the people who prepare early will lead the new economy.",
      mission: "Our Mission",
      missionText: "To equip 1 million Africans with AI-readiness insights by 2030.",
      vision: "Our Vision",
      visionText: "A world where every worker thrives alongside intelligent machines."
    },
    admin: {
      title: "Admin Dashboard", sub: "Live platform analytics",
      total: "Total Assessments", searched: "Most Searched Careers",
      countries: "Countries Active", exposed: "Most Exposed Jobs",
      requests: "Coaching Requests", trends: "Skill Trend Analytics"
    },
    common: { core: "AI is changing jobs, but those who prepare early will thrive.", footer: "© Innocent Forteh – Team21 Academy" }
  },
  fr: {
    nav: { home: "Accueil", assessment: "Évaluation", trends: "Tendances IA", upskilling: "Formation", coaching: "Coaching", about: "À propos", admin: "Admin" },
    hero: { tag: "Plateforme d'intelligence carrière IA", title1: "L'IA", title2: "Remplacera-t-elle", title3: "Votre Emploi ?",
      sub: "Découvrez à quel point votre carrière est exposée à l'IA. Obtenez un score personnalisé et une feuille de route pour prospérer.",
      cta1: "Commencer", cta2: "En savoir plus",
      ticker: ["L'IA transforme 1,2 milliard d'emplois", "85% des emplois de 2030 n'existent pas encore", "La requalification triple votre résilience", "L'Afrique mène l'économie numérique", "L'IA augmente — elle ne remplace pas toujours", "Les compétences futures sont la nouvelle monnaie"] },
    how: { title: "Comment ça marche", sub: "Quatre étapes simples vers votre plan IA",
      s1t: "Parlez-nous de vous", s1d: "Partagez votre nom et lieu pour personnaliser vos résultats.",
      s2t: "Choisissez votre métier", s2d: "Recherchez ou saisissez votre rôle actuel.",
      s3t: "Obtenez votre score", s3d: "Notre moteur analyse 6 dimensions pour calculer votre exposition.",
      s4t: "Construisez votre plan", s4d: "Recevez compétences, rôles et ressources adaptés." },
    stats: { title: "L'impact de l'IA", sub: "Les chiffres clés pour votre carrière", s1: "Emplois transformés", s2: "Industries impactées", s3: "Compétences émergentes", s4: "ROI moyen requalification" },
    featured: { title: "Carrières en vedette", sub: "Explorez l'exposition de divers métiers" },
    trends: { title: "Tendances Carrière IA", sub: "Analyses sur la transformation du travail", readMore: "Lire" },
    upskill: { title: "Centre de formation", sub: "Ressources gratuites et payantes", free: "Formation gratuite", paid: "Formation payante", visit: "Visiter" },
    coaching: { title: "Besoin d'un coaching personnalisé ?", sub: "Parlez à un expert Team21 pour bâtir votre futur IA.",
      whatsapp: "Coaching WhatsApp", email: "Coaching Email",
      formTitle: "Réserver une session",
      fullName: "Nom complet", country: "Pays", career: "Métier", score: "Score d'exposition", type: "Type de coaching", method: "Mode de contact", message: "Message",
      types: { guidance: "Orientation carrière", upskill: "Montée en compétences IA", transition: "Reconversion", student: "Mentorat étudiant", business: "Préparation IA entreprise" },
      methods: { wa: "WhatsApp", email: "Email" },
      submit: "Envoyer", cancel: "Annuler", sentWa: "Ouverture WhatsApp...", sentEmail: "Ouverture email..." },
    onb: { step: "Étape", of: "sur", welcome: "Bienvenue", welcomeSub: "Commençons par votre nom",
      fullName: "Nom complet", fullNamePh: "ex. Amara Okonkwo",
      email: "Email (optionnel)", emailPh: "vous@exemple.com",
      continue: "Continuer", back: "Retour",
      regionTitle: "Où êtes-vous ?", regionSub: "Pour localiser vos résultats",
      region: "Région", country: "Pays", other: "Autre",
      careerTitle: "Votre parcours", careerSub: "Recherchez ou tapez votre métier",
      careerPh: "Recherchez ou saisissez...",
      studentField: "Quel domaine vous intéresse ?", studentFieldPh: "ex. Médecine, Ingénierie",
      measure: "Mesurer l'exposition",
      regions: { Africa: "Afrique", Europe: "Europe", Asia: "Asie", "North America": "Amérique du Nord", "South America": "Amérique du Sud", Oceania: "Océanie", "Middle East": "Moyen-Orient" } },
    loading: ["Analyse des tendances...", "Évaluation du risque IA...", "Cartographie des compétences...", "Génération de recommandations...", "Finalisation du rapport..."],
    result: { title: "Votre Rapport IA", score: "Score d'exposition", level: "Niveau de risque",
      explain: "Ce que cela signifie", outlook: "Perspectives", regional: "Insights régionaux",
      skills: "Compétences recommandées", roles: "Évolutions de carrière", trends: "Tendances IA",
      free: "Apprentissage gratuit", paid: "Apprentissage premium",
      download: "Télécharger le PDF", retake: "Refaire l'évaluation", bookCoach: "Réserver un coaching",
      levels: { vlow: "Exposition très faible", mod: "Exposition modérée", sig: "Exposition significative", high: "Exposition élevée", crit: "Exposition critique" } },
    about: { title: "À propos de MaDSkillz",
      p1: "MaDSkillz AI Readiness est une plateforme d'intelligence carrière conçue par Team21 Academy pour aider professionnels et étudiants à comprendre et s'adapter à la révolution IA.",
      p2: "L'IA ne vient pas vous remplacer. Elle vient redéfinir le possible — et ceux qui se préparent tôt mèneront la nouvelle économie.",
      mission: "Notre Mission", missionText: "Équiper 1 million d'Africains d'ici 2030.",
      vision: "Notre Vision", visionText: "Un monde où chaque travailleur prospère avec les machines intelligentes." },
    admin: { title: "Tableau de bord Admin", sub: "Analytique en direct", total: "Évaluations totales", searched: "Métiers recherchés", countries: "Pays actifs", exposed: "Métiers exposés", requests: "Demandes de coaching", trends: "Tendances compétences" },
    common: { core: "L'IA change les emplois, ceux qui se préparent prospéreront.", footer: "© Innocent Forteh – Team21 Academy" }
  },
  es: {
    nav: { home: "Inicio", assessment: "Evaluación", trends: "Tendencias IA", upskilling: "Formación", coaching: "Coaching", about: "Acerca de", admin: "Admin" },
    hero: { tag: "Plataforma de inteligencia profesional IA", title1: "¿La IA", title2: "Reemplazará", title3: "Tu Empleo?",
      sub: "Descubre cuán expuesta está tu carrera a la IA. Obtén una puntuación personalizada y una hoja de ruta para prosperar.",
      cta1: "Empezar", cta2: "Saber más",
      ticker: ["La IA transforma 1.200 millones de empleos", "85% de empleos de 2030 aún no existen", "El reciclaje triplica tu resiliencia", "África lidera la economía digital", "La IA aumenta — no siempre reemplaza", "Las habilidades futuras son la nueva moneda"] },
    how: { title: "Cómo funciona", sub: "Cuatro pasos simples hacia tu plan IA",
      s1t: "Cuéntanos sobre ti", s1d: "Comparte tu nombre y ubicación.",
      s2t: "Elige tu carrera", s2d: "Busca o escribe tu rol actual.",
      s3t: "Obtén tu puntuación", s3d: "Analizamos 6 dimensiones para calcular tu exposición.",
      s4t: "Construye tu plan", s4d: "Recibe habilidades, roles y recursos a medida." },
    stats: { title: "El impacto de la IA", sub: "Cifras que importan", s1: "Empleos transformados", s2: "Industrias impactadas", s3: "Habilidades emergentes", s4: "ROI promedio" },
    featured: { title: "Carreras destacadas", sub: "Explora la exposición por campo" },
    trends: { title: "Tendencias IA", sub: "Análisis curados sobre el futuro del trabajo", readMore: "Leer" },
    upskill: { title: "Centro de formación", sub: "Recursos gratuitos y premium", free: "Formación gratuita", paid: "Formación premium", visit: "Visitar" },
    coaching: { title: "¿Necesitas Coaching Personalizado?", sub: "Habla con un experto Team21 para tu futuro IA.",
      whatsapp: "Coaching WhatsApp", email: "Coaching Email",
      formTitle: "Reservar sesión", fullName: "Nombre completo", country: "País", career: "Carrera", score: "Puntuación", type: "Tipo de coaching", method: "Método de contacto", message: "Mensaje",
      types: { guidance: "Orientación profesional", upskill: "Reciclaje IA", transition: "Transición de carrera", student: "Mentoría estudiantil", business: "Preparación IA empresa" },
      methods: { wa: "WhatsApp", email: "Email" },
      submit: "Enviar", cancel: "Cancelar", sentWa: "Abriendo WhatsApp...", sentEmail: "Abriendo email..." },
    onb: { step: "Paso", of: "de", welcome: "Bienvenido", welcomeSub: "Empecemos por tu nombre",
      fullName: "Nombre completo", fullNamePh: "ej. Amara Okonkwo", email: "Email (opcional)", emailPh: "tu@ejemplo.com",
      continue: "Continuar", back: "Atrás",
      regionTitle: "¿Dónde estás?", regionSub: "Para localizar tus resultados",
      region: "Región", country: "País", other: "Otro",
      careerTitle: "Tu camino profesional", careerSub: "Busca o escribe tu rol",
      careerPh: "Buscar o escribir...",
      studentField: "¿Qué campo te interesa?", studentFieldPh: "ej. Medicina, Ingeniería",
      measure: "Medir exposición",
      regions: { Africa: "África", Europe: "Europa", Asia: "Asia", "North America": "Norteamérica", "South America": "Sudamérica", Oceania: "Oceanía", "Middle East": "Medio Oriente" } },
    loading: ["Analizando tendencias...", "Evaluando riesgo IA...", "Mapeando habilidades...", "Generando recomendaciones...", "Finalizando informe..."],
    result: { title: "Tu Informe IA", score: "Puntuación", level: "Nivel de riesgo",
      explain: "Qué significa esto", outlook: "Perspectiva", regional: "Insights regionales",
      skills: "Habilidades recomendadas", roles: "Evolución de carrera", trends: "Tendencias IA",
      free: "Aprendizaje gratuito", paid: "Aprendizaje premium",
      download: "Descargar PDF", retake: "Repetir evaluación", bookCoach: "Reservar coaching",
      levels: { vlow: "Exposición muy baja", mod: "Exposición moderada", sig: "Exposición significativa", high: "Exposición alta", crit: "Exposición crítica" } },
    about: { title: "Acerca de MaDSkillz",
      p1: "MaDSkillz AI Readiness es una plataforma creada por Team21 Academy para empoderar profesionales y estudiantes ante la revolución IA.",
      p2: "La IA no viene a reemplazarte. Viene a redefinir lo posible — quienes se preparen pronto liderarán la nueva economía.",
      mission: "Nuestra Misión", missionText: "Equipar a 1 millón de africanos para 2030.",
      vision: "Nuestra Visión", visionText: "Un mundo donde cada trabajador prospere con máquinas inteligentes." },
    admin: { title: "Panel Admin", sub: "Analítica en vivo", total: "Evaluaciones totales", searched: "Carreras buscadas", countries: "Países activos", exposed: "Empleos expuestos", requests: "Solicitudes de coaching", trends: "Tendencias de habilidades" },
    common: { core: "La IA cambia empleos, los que se preparen prosperarán.", footer: "© Innocent Forteh – Team21 Academy" }
  },
  ar: {
    nav: { home: "الرئيسية", assessment: "التقييم", trends: "اتجاهات الذكاء الاصطناعي", upskilling: "التطوير", coaching: "الإرشاد", about: "حول", admin: "الإدارة" },
    hero: { tag: "منصة ذكاء مهني بالذكاء الاصطناعي", title1: "هل سيحل", title2: "الذكاء الاصطناعي", title3: "محل وظيفتك؟",
      sub: "اكتشف مدى تعرض مهنتك للذكاء الاصطناعي. احصل على درجة شخصية وخارطة طريق للنجاح.",
      cta1: "ابدأ التقييم", cta2: "اعرف المزيد",
      ticker: ["الذكاء الاصطناعي يعيد تشكيل 1.2 مليار وظيفة", "85% من وظائف 2030 لا توجد بعد", "إعادة التأهيل تضاعف مرونتك ثلاث مرات", "أفريقيا تقود الاقتصاد الرقمي", "الذكاء الاصطناعي يعزز — لا يستبدل دائمًا", "مهارات المستقبل هي العملة الجديدة"] },
    how: { title: "كيف يعمل", sub: "أربع خطوات بسيطة لخطتك",
      s1t: "أخبرنا عنك", s1d: "شارك اسمك وموقعك لتخصيص نتائجك.",
      s2t: "اختر مهنتك", s2d: "ابحث أو اكتب دورك الحالي.",
      s3t: "احصل على درجتك", s3d: "نحلل 6 أبعاد لحساب تعرضك.",
      s4t: "ابنِ خطتك", s4d: "احصل على مهارات وأدوار وموارد مخصصة." },
    stats: { title: "تأثير الذكاء الاصطناعي", sub: "أرقام مهمة لمهنتك", s1: "وظائف متحولة", s2: "صناعات متأثرة", s3: "مهارات ناشئة", s4: "متوسط العائد" },
    featured: { title: "مهن مميزة", sub: "استكشف التعرض حسب المجال" },
    trends: { title: "اتجاهات الذكاء الاصطناعي", sub: "رؤى منسقة عن تحول العمل", readMore: "اقرأ" },
    upskill: { title: "مركز التطوير", sub: "موارد مجانية ومدفوعة", free: "تدريب مجاني", paid: "تدريب مدفوع", visit: "زيارة" },
    coaching: { title: "تحتاج إرشاد مهني؟", sub: "تحدث مع خبير Team21 لمستقبلك.",
      whatsapp: "إرشاد واتساب", email: "إرشاد بريدي",
      formTitle: "احجز جلسة", fullName: "الاسم الكامل", country: "البلد", career: "المهنة", score: "درجة التعرض", type: "نوع الإرشاد", method: "طريقة التواصل", message: "الرسالة",
      types: { guidance: "إرشاد مهني", upskill: "تطوير الذكاء الاصطناعي", transition: "تحول مهني", student: "إرشاد طلابي", business: "جاهزية الأعمال" },
      methods: { wa: "واتساب", email: "بريد" },
      submit: "إرسال", cancel: "إلغاء", sentWa: "فتح واتساب...", sentEmail: "فتح البريد..." },
    onb: { step: "خطوة", of: "من", welcome: "مرحبًا", welcomeSub: "لنبدأ باسمك",
      fullName: "الاسم الكامل", fullNamePh: "مثل أمارا",
      email: "البريد (اختياري)", emailPh: "you@example.com",
      continue: "متابعة", back: "رجوع",
      regionTitle: "أين أنت؟", regionSub: "لتخصيص نتائجك", region: "المنطقة", country: "البلد", other: "أخرى",
      careerTitle: "مسارك المهني", careerSub: "ابحث أو اكتب دورك", careerPh: "ابحث أو اكتب...",
      studentField: "ما المجال الذي يهمك؟", studentFieldPh: "مثل الطب، الهندسة",
      measure: "قياس التعرض",
      regions: { Africa: "أفريقيا", Europe: "أوروبا", Asia: "آسيا", "North America": "أمريكا الشمالية", "South America": "أمريكا الجنوبية", Oceania: "أوقيانوسيا", "Middle East": "الشرق الأوسط" } },
    loading: ["تحليل الاتجاهات...", "تقييم المخاطر...", "رسم المهارات...", "إنشاء التوصيات...", "إنهاء التقرير..."],
    result: { title: "تقرير الذكاء الاصطناعي", score: "درجة التعرض", level: "مستوى الخطر",
      explain: "ماذا يعني هذا", outlook: "النظرة المستقبلية", regional: "رؤى إقليمية",
      skills: "مهارات موصى بها", roles: "مسارات تطور المهنة", trends: "الاتجاهات",
      free: "تعلم مجاني", paid: "تعلم مدفوع",
      download: "تنزيل PDF", retake: "إعادة التقييم", bookCoach: "احجز إرشادًا",
      levels: { vlow: "تعرض منخفض جدًا", mod: "تعرض معتدل", sig: "تعرض كبير", high: "تعرض عالٍ", crit: "تعرض حرج" } },
    about: { title: "حول MaDSkillz",
      p1: "MaDSkillz AI Readiness منصة من Team21 Academy لتمكين المهنيين والطلاب من فهم ثورة الذكاء الاصطناعي والتكيف معها.",
      p2: "الذكاء الاصطناعي ليس هنا ليحل محلك. هو هنا ليعيد تعريف الممكن.",
      mission: "مهمتنا", missionText: "تجهيز مليون أفريقي بحلول 2030.",
      vision: "رؤيتنا", visionText: "عالم يزدهر فيه كل عامل مع الآلات الذكية." },
    admin: { title: "لوحة الإدارة", sub: "تحليلات مباشرة", total: "إجمالي التقييمات", searched: "أكثر المهن بحثًا", countries: "بلدان نشطة", exposed: "أكثر الوظائف تعرضًا", requests: "طلبات الإرشاد", trends: "اتجاهات المهارات" },
    common: { core: "الذكاء الاصطناعي يغير الوظائف، ومن يستعد مبكرًا سيزدهر.", footer: "© Innocent Forteh – Team21 Academy" }
  },
  pt: {
    nav: { home: "Início", assessment: "Avaliação", trends: "Tendências IA", upskilling: "Capacitação", coaching: "Coaching", about: "Sobre", admin: "Admin" },
    hero: { tag: "Plataforma de inteligência de carreira IA", title1: "A IA", title2: "Substituirá", title3: "Seu Trabalho?",
      sub: "Descubra o quanto sua carreira está exposta à IA. Receba uma pontuação personalizada e um plano para prosperar.",
      cta1: "Iniciar avaliação", cta2: "Saiba mais",
      ticker: ["IA transforma 1,2 bilhão de empregos", "85% dos empregos de 2030 não existem", "Requalificação triplica sua resiliência", "África lidera a economia digital", "IA aumenta — nem sempre substitui", "Habilidades futuras são a nova moeda"] },
    how: { title: "Como funciona", sub: "Quatro passos para seu plano de IA",
      s1t: "Conte-nos sobre você", s1d: "Compartilhe seu nome e localização.",
      s2t: "Escolha sua carreira", s2d: "Pesquise ou digite seu cargo.",
      s3t: "Receba sua pontuação", s3d: "Analisamos 6 dimensões.",
      s4t: "Construa seu plano", s4d: "Receba habilidades e recursos sob medida." },
    stats: { title: "O impacto da IA", sub: "Números que importam", s1: "Empregos transformados", s2: "Indústrias impactadas", s3: "Habilidades emergentes", s4: "ROI médio" },
    featured: { title: "Carreiras em destaque", sub: "Explore a exposição por área" },
    trends: { title: "Tendências de Carreira IA", sub: "Análises sobre o futuro do trabalho", readMore: "Ler" },
    upskill: { title: "Centro de capacitação", sub: "Recursos gratuitos e pagos", free: "Treinamento gratuito", paid: "Treinamento premium", visit: "Visitar" },
    coaching: { title: "Precisa de Coaching 1-a-1?", sub: "Fale com um especialista Team21.",
      whatsapp: "Coaching WhatsApp", email: "Coaching Email",
      formTitle: "Reservar sessão", fullName: "Nome completo", country: "País", career: "Área", score: "Pontuação", type: "Tipo de coaching", method: "Forma de contato", message: "Mensagem",
      types: { guidance: "Orientação de carreira", upskill: "Capacitação IA", transition: "Transição de carreira", student: "Mentoria estudantil", business: "Prontidão IA empresa" },
      methods: { wa: "WhatsApp", email: "Email" },
      submit: "Enviar", cancel: "Cancelar", sentWa: "Abrindo WhatsApp...", sentEmail: "Abrindo email..." },
    onb: { step: "Passo", of: "de", welcome: "Bem-vindo", welcomeSub: "Vamos começar com seu nome",
      fullName: "Nome completo", fullNamePh: "ex. Amara Okonkwo",
      email: "Email (opcional)", emailPh: "voce@exemplo.com",
      continue: "Continuar", back: "Voltar",
      regionTitle: "Onde você está?", regionSub: "Para localizar seus resultados",
      region: "Região", country: "País", other: "Outro",
      careerTitle: "Sua carreira", careerSub: "Pesquise ou digite seu cargo",
      careerPh: "Pesquisar ou digitar...",
      studentField: "Qual área te interessa?", studentFieldPh: "ex. Medicina, Engenharia",
      measure: "Medir exposição",
      regions: { Africa: "África", Europe: "Europa", Asia: "Ásia", "North America": "América do Norte", "South America": "América do Sul", Oceania: "Oceania", "Middle East": "Oriente Médio" } },
    loading: ["Analisando tendências...", "Avaliando risco IA...", "Mapeando habilidades...", "Gerando recomendações...", "Finalizando relatório..."],
    result: { title: "Seu Relatório IA", score: "Pontuação", level: "Nível de risco",
      explain: "O que isso significa", outlook: "Perspectiva", regional: "Insights regionais",
      skills: "Habilidades recomendadas", roles: "Evolução de carreira", trends: "Tendências",
      free: "Aprendizado gratuito", paid: "Aprendizado premium",
      download: "Baixar PDF", retake: "Refazer", bookCoach: "Reservar coaching",
      levels: { vlow: "Exposição muito baixa", mod: "Exposição moderada", sig: "Exposição significativa", high: "Exposição alta", crit: "Exposição crítica" } },
    about: { title: "Sobre MaDSkillz",
      p1: "MaDSkillz AI Readiness é uma plataforma da Team21 Academy para capacitar profissionais e estudantes a se adaptarem à revolução da IA.",
      p2: "A IA não veio para te substituir. Veio para redefinir o possível.",
      mission: "Nossa Missão", missionText: "Capacitar 1 milhão de africanos até 2030.",
      vision: "Nossa Visão", visionText: "Um mundo onde todos prosperam com máquinas inteligentes." },
    admin: { title: "Painel Admin", sub: "Análises ao vivo", total: "Avaliações totais", searched: "Carreiras buscadas", countries: "Países ativos", exposed: "Empregos expostos", requests: "Pedidos de coaching", trends: "Tendências de habilidades" },
    common: { core: "A IA muda empregos, quem se prepara prospera.", footer: "© Innocent Forteh – Team21 Academy" }
  },
  sw: {
    nav: { home: "Nyumbani", assessment: "Tathmini", trends: "Mwelekeo wa AI", upskilling: "Kujifunza", coaching: "Mwongozo", about: "Kuhusu", admin: "Admin" },
    hero: { tag: "Jukwaa la Akili ya Kazi ya AI", title1: "Je! AI", title2: "Itachukua", title3: "Kazi Yako?",
      sub: "Gundua jinsi kazi yako inavyoathiriwa na AI. Pata alama yako binafsi na ramani ya kustawi.",
      cta1: "Anza Tathmini", cta2: "Jifunze Zaidi",
      ticker: ["AI inabadilisha kazi bilioni 1.2", "85% ya kazi za 2030 hazipo bado", "Mafunzo upya yanaongeza ustahimilivu", "Afrika inaongoza uchumi wa kidijitali", "AI inakuza — haichukui kila wakati", "Ujuzi wa baadaye ni sarafu mpya"] },
    how: { title: "Inavyofanya Kazi", sub: "Hatua nne rahisi",
      s1t: "Tueleze Kuhusu Wewe", s1d: "Shiriki jina na eneo lako.",
      s2t: "Chagua Kazi Yako", s2d: "Tafuta au andika jukumu lako.",
      s3t: "Pata Alama Yako", s3d: "Tunachambua vipimo 6.",
      s4t: "Jenga Mpango Wako", s4d: "Pokea ujuzi na rasilimali." },
    stats: { title: "Athari ya AI", sub: "Nambari muhimu", s1: "Kazi zilizobadilika", s2: "Viwanda vilivyoathirika", s3: "Ujuzi unaojitokeza", s4: "ROI ya wastani" },
    featured: { title: "Kazi Maalum", sub: "Chunguza athari" },
    trends: { title: "Mwelekeo wa Kazi AI", sub: "Maoni juu ya mabadiliko ya kazi", readMore: "Soma" },
    upskill: { title: "Kituo cha Kujifunza", sub: "Rasilimali za bure na za kulipia", free: "Bure", paid: "Premium", visit: "Tembelea" },
    coaching: { title: "Unahitaji Mwongozo wa Kibinafsi?", sub: "Ongea na mtaalam wa Team21.",
      whatsapp: "Mwongozo wa WhatsApp", email: "Mwongozo wa Barua",
      formTitle: "Hifadhi Kikao", fullName: "Jina kamili", country: "Nchi", career: "Kazi", score: "Alama", type: "Aina ya mwongozo", method: "Njia ya mawasiliano", message: "Ujumbe",
      types: { guidance: "Mwongozo wa kazi", upskill: "Kujifunza AI", transition: "Mabadiliko ya kazi", student: "Mwongozo wa wanafunzi", business: "Utayari wa biashara" },
      methods: { wa: "WhatsApp", email: "Barua" },
      submit: "Tuma", cancel: "Ghairi", sentWa: "Inafungua WhatsApp...", sentEmail: "Inafungua barua..." },
    onb: { step: "Hatua", of: "ya", welcome: "Karibu", welcomeSub: "Tuanze na jina lako",
      fullName: "Jina kamili", fullNamePh: "mfano Amara",
      email: "Barua (hiari)", emailPh: "wewe@mfano.com",
      continue: "Endelea", back: "Rudi",
      regionTitle: "Uko wapi?", regionSub: "Kwa matokeo yako",
      region: "Eneo", country: "Nchi", other: "Nyingine",
      careerTitle: "Njia yako", careerSub: "Tafuta au andika",
      careerPh: "Tafuta au andika...",
      studentField: "Eneo gani linakuvutia?", studentFieldPh: "mfano Tiba, Uhandisi",
      measure: "Pima Athari",
      regions: { Africa: "Afrika", Europe: "Ulaya", Asia: "Asia", "North America": "Amerika Kaskazini", "South America": "Amerika Kusini", Oceania: "Oceania", "Middle East": "Mashariki ya Kati" } },
    loading: ["Inachambua mwelekeo...", "Inatathmini hatari...", "Inachora ujuzi...", "Inazalisha mapendekezo...", "Inakamilisha ripoti..."],
    result: { title: "Ripoti Yako ya AI", score: "Alama", level: "Kiwango cha hatari",
      explain: "Maana yake", outlook: "Mtazamo", regional: "Maoni ya kanda",
      skills: "Ujuzi unaoshauriwa", roles: "Maendeleo ya kazi", trends: "Mwelekeo",
      free: "Bure", paid: "Premium",
      download: "Pakua PDF", retake: "Rudia", bookCoach: "Hifadhi mwongozo",
      levels: { vlow: "Hatari ndogo sana", mod: "Hatari ya wastani", sig: "Hatari kubwa", high: "Hatari ya juu", crit: "Hatari kubwa sana" } },
    about: { title: "Kuhusu MaDSkillz",
      p1: "MaDSkillz AI Readiness ni jukwaa la Team21 Academy kuwawezesha wataalamu na wanafunzi.",
      p2: "AI haiji kuchukua nafasi yako. Inakuja kuelekeza upya iwezekanavyo.",
      mission: "Dhamira", missionText: "Kuwawezesha Waafrika milioni 1 ifikapo 2030.",
      vision: "Maono", visionText: "Dunia ambayo kila mfanyakazi anastawi." },
    admin: { title: "Dashibodi ya Admin", sub: "Takwimu za moja kwa moja", total: "Tathmini jumla", searched: "Kazi zilizotafutwa", countries: "Nchi", exposed: "Kazi zilizoathirika", requests: "Maombi", trends: "Mwelekeo wa ujuzi" },
    common: { core: "AI inabadilisha kazi, walijiandaa watastawi.", footer: "© Innocent Forteh – Team21 Academy" }
  },
  zh: {
    nav: { home: "首页", assessment: "评估", trends: "AI趋势", upskilling: "技能提升", coaching: "辅导", about: "关于", admin: "管理" },
    hero: { tag: "AI职业智能平台", title1: "AI会", title2: "取代", title3: "您的工作吗？",
      sub: "了解您的职业受AI影响的程度。获取个性化分数和成长路线图。",
      cta1: "开始评估", cta2: "了解更多",
      ticker: ["AI重塑12亿个工作", "2030年85%的工作尚未存在", "再培训提升3倍韧性", "非洲引领数字经济", "AI增强而非替代", "未来技能是新货币"] },
    how: { title: "工作原理", sub: "四个简单步骤",
      s1t: "告诉我们关于您", s1d: "分享姓名和位置。",
      s2t: "选择职业", s2d: "搜索或输入您的角色。",
      s3t: "获取分数", s3d: "我们分析6个维度。",
      s4t: "建立计划", s4d: "获得定制技能和资源。" },
    stats: { title: "AI影响", sub: "重要数字", s1: "工作转变", s2: "行业受影响", s3: "新兴技能", s4: "平均ROI" },
    featured: { title: "热门职业", sub: "按领域探索影响" },
    trends: { title: "AI职业趋势", sub: "工作未来的精选见解", readMore: "阅读" },
    upskill: { title: "技能提升中心", sub: "免费和付费资源", free: "免费培训", paid: "付费培训", visit: "访问" },
    coaching: { title: "需要1对1职业辅导？", sub: "与Team21专家交流。",
      whatsapp: "WhatsApp辅导", email: "邮件辅导",
      formTitle: "预订辅导", fullName: "全名", country: "国家", career: "职业", score: "分数", type: "辅导类型", method: "联系方式", message: "信息",
      types: { guidance: "职业指导", upskill: "AI技能提升", transition: "职业转型", student: "学生指导", business: "企业AI准备" },
      methods: { wa: "WhatsApp", email: "邮件" },
      submit: "发送", cancel: "取消", sentWa: "正在打开WhatsApp...", sentEmail: "正在打开邮件..." },
    onb: { step: "步骤", of: "/", welcome: "欢迎", welcomeSub: "从您的姓名开始",
      fullName: "全名", fullNamePh: "例如 Amara",
      email: "邮箱（可选）", emailPh: "you@example.com",
      continue: "继续", back: "返回",
      regionTitle: "您在哪里？", regionSub: "本地化您的结果",
      region: "地区", country: "国家", other: "其他",
      careerTitle: "您的职业", careerSub: "搜索或输入",
      careerPh: "搜索或输入...",
      studentField: "感兴趣的领域？", studentFieldPh: "例如 医学、工程",
      measure: "测量影响",
      regions: { Africa: "非洲", Europe: "欧洲", Asia: "亚洲", "North America": "北美", "South America": "南美", Oceania: "大洋洲", "Middle East": "中东" } },
    loading: ["分析趋势...", "评估风险...", "映射技能...", "生成建议...", "完成报告..."],
    result: { title: "您的AI报告", score: "影响分数", level: "风险等级",
      explain: "这意味着什么", outlook: "未来展望", regional: "区域见解",
      skills: "推荐技能", roles: "职业发展", trends: "AI趋势",
      free: "免费学习", paid: "付费学习",
      download: "下载PDF", retake: "重新评估", bookCoach: "预订辅导",
      levels: { vlow: "影响极低", mod: "中等影响", sig: "显著影响", high: "高影响", crit: "极高影响" } },
    about: { title: "关于MaDSkillz",
      p1: "MaDSkillz AI Readiness是Team21 Academy构建的平台，赋能专业人士和学生应对AI革命。",
      p2: "AI不是来取代您的，是来重新定义可能的。",
      mission: "我们的使命", missionText: "到2030年赋能100万非洲人。",
      vision: "我们的愿景", visionText: "每个工作者与智能机器共同繁荣的世界。" },
    admin: { title: "管理仪表板", sub: "实时分析", total: "总评估数", searched: "热门搜索", countries: "活跃国家", exposed: "受影响最大", requests: "辅导请求", trends: "技能趋势" },
    common: { core: "AI在改变工作，早做准备者将繁荣。", footer: "© Innocent Forteh – Team21 Academy" }
  },
  de: {
    nav: { home: "Start", assessment: "Bewertung", trends: "KI-Trends", upskilling: "Weiterbildung", coaching: "Coaching", about: "Über uns", admin: "Admin" },
    hero: { tag: "KI-Karriere-Intelligenzplattform", title1: "Wird KI", title2: "Ihren Job", title3: "Ersetzen?",
      sub: "Entdecken Sie, wie sehr Ihre Karriere von KI betroffen ist. Erhalten Sie eine personalisierte Punktzahl und einen Fahrplan.",
      cta1: "Bewertung starten", cta2: "Mehr erfahren",
      ticker: ["KI verändert 1,2 Mrd. Jobs", "85% der Jobs von 2030 existieren noch nicht", "Umschulung verdreifacht Resilienz", "Afrika führt digitale Wirtschaft an", "KI erweitert — ersetzt nicht immer", "Zukunftsfähigkeiten sind die neue Währung"] },
    how: { title: "So funktioniert's", sub: "Vier einfache Schritte",
      s1t: "Erzählen Sie uns von sich", s1d: "Teilen Sie Name und Standort.",
      s2t: "Karriere wählen", s2d: "Suchen oder tippen Sie Ihre Rolle.",
      s3t: "Punktzahl erhalten", s3d: "Wir analysieren 6 Dimensionen.",
      s4t: "Plan erstellen", s4d: "Erhalten Sie maßgeschneiderte Skills." },
    stats: { title: "Die KI-Auswirkung", sub: "Wichtige Zahlen", s1: "Veränderte Jobs", s2: "Betroffene Branchen", s3: "Aufkommende Skills", s4: "Durchschnittlicher ROI" },
    featured: { title: "Beliebte Karrieren", sub: "Erkunden Sie die Auswirkung" },
    trends: { title: "KI-Karriere-Trends", sub: "Kuratierte Einblicke", readMore: "Lesen" },
    upskill: { title: "Weiterbildungszentrum", sub: "Kostenlose und Premium-Ressourcen", free: "Kostenlos", paid: "Premium", visit: "Besuchen" },
    coaching: { title: "Benötigen Sie 1-zu-1 Coaching?", sub: "Sprechen Sie mit einem Team21-Experten.",
      whatsapp: "WhatsApp-Coaching", email: "E-Mail-Coaching",
      formTitle: "Sitzung buchen", fullName: "Vollständiger Name", country: "Land", career: "Beruf", score: "Punktzahl", type: "Coaching-Typ", method: "Kontaktmethode", message: "Nachricht",
      types: { guidance: "Karriereberatung", upskill: "KI-Weiterbildung", transition: "Karrierewechsel", student: "Studentenmentoring", business: "Geschäfts-KI-Bereitschaft" },
      methods: { wa: "WhatsApp", email: "E-Mail" },
      submit: "Senden", cancel: "Abbrechen", sentWa: "WhatsApp wird geöffnet...", sentEmail: "E-Mail wird geöffnet..." },
    onb: { step: "Schritt", of: "von", welcome: "Willkommen", welcomeSub: "Beginnen wir mit Ihrem Namen",
      fullName: "Vollständiger Name", fullNamePh: "z.B. Amara",
      email: "E-Mail (optional)", emailPh: "sie@beispiel.com",
      continue: "Weiter", back: "Zurück",
      regionTitle: "Wo sind Sie?", regionSub: "Zur Lokalisierung",
      region: "Region", country: "Land", other: "Andere",
      careerTitle: "Ihr Karriereweg", careerSub: "Suchen oder tippen Sie",
      careerPh: "Suchen oder eingeben...",
      studentField: "Welches Feld interessiert Sie?", studentFieldPh: "z.B. Medizin, Ingenieurwesen",
      measure: "Auswirkung messen",
      regions: { Africa: "Afrika", Europe: "Europa", Asia: "Asien", "North America": "Nordamerika", "South America": "Südamerika", Oceania: "Ozeanien", "Middle East": "Naher Osten" } },
    loading: ["Trends analysieren...", "KI-Risiko bewerten...", "Skills kartieren...", "Empfehlungen erstellen...", "Bericht abschließen..."],
    result: { title: "Ihr KI-Bericht", score: "Punktzahl", level: "Risikostufe",
      explain: "Was das bedeutet", outlook: "Zukunftsaussicht", regional: "Regionale Einblicke",
      skills: "Empfohlene Skills", roles: "Karriereentwicklung", trends: "KI-Trends",
      free: "Kostenloses Lernen", paid: "Premium-Lernen",
      download: "PDF herunterladen", retake: "Neu bewerten", bookCoach: "Coaching buchen",
      levels: { vlow: "Sehr geringe Auswirkung", mod: "Moderate Auswirkung", sig: "Erhebliche Auswirkung", high: "Hohe Auswirkung", crit: "Kritische Auswirkung" } },
    about: { title: "Über MaDSkillz",
      p1: "MaDSkillz AI Readiness ist eine Plattform der Team21 Academy, die Profis und Studenten bei der KI-Revolution unterstützt.",
      p2: "KI ist nicht hier, um Sie zu ersetzen. Sie ist hier, um das Mögliche neu zu definieren.",
      mission: "Unsere Mission", missionText: "1 Million Afrikaner bis 2030 ausstatten.",
      vision: "Unsere Vision", visionText: "Eine Welt, in der jeder Arbeiter mit intelligenten Maschinen gedeiht." },
    admin: { title: "Admin-Dashboard", sub: "Live-Analytik", total: "Bewertungen gesamt", searched: "Beliebte Berufe", countries: "Aktive Länder", exposed: "Am stärksten betroffen", requests: "Coaching-Anfragen", trends: "Skill-Trends" },
    common: { core: "KI verändert Jobs, wer sich vorbereitet, wird gedeihen.", footer: "© Innocent Forteh – Team21 Academy" }
  }
};

const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦", rtl: true },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" }
];

/* ============================================================
   CAREER DATABASE — internal scoring engine input
   ============================================================ */
const CAREERS = [
  { id: "accountant", name: "Accountant", icon: "📊", repetitive: 85, creativity: 25, human: 40, technical: 60, physical: 10, aiSpeed: 80,
    skills: ["Data Analytics", "AI Auditing", "Power BI", "AI-Assisted Financial Analysis", "Strategic Consulting"],
    futureRoles: ["AI Compliance Specialist", "Financial Data Analyst", "Business Intelligence Analyst", "AI Risk Consultant"] },
  { id: "teacher", name: "Teacher", icon: "👩‍🏫", repetitive: 35, creativity: 70, human: 95, technical: 40, physical: 50, aiSpeed: 45,
    skills: ["EdTech Tools", "AI Curriculum Design", "Personalized Learning", "Digital Pedagogy", "Student Data Analytics"],
    futureRoles: ["AI Learning Designer", "EdTech Specialist", "Personalized Learning Coach", "Curriculum AI Strategist"] },
  { id: "nurse", name: "Nurse", icon: "🩺", repetitive: 30, creativity: 40, human: 95, technical: 70, physical: 90, aiSpeed: 40,
    skills: ["AI Diagnostics Tools", "Telemedicine", "Health Data Literacy", "Robotic-Assisted Care", "Patient Empathy"],
    futureRoles: ["AI-Augmented Nurse Practitioner", "Telehealth Specialist", "Clinical Data Coordinator", "Digital Health Coach"] },
  { id: "developer", name: "Software Developer", icon: "💻", repetitive: 40, creativity: 75, human: 50, technical: 95, physical: 5, aiSpeed: 90,
    skills: ["AI/ML Engineering", "Prompt Engineering", "System Architecture", "AI Ethics", "Full-Stack + AI Integration"],
    futureRoles: ["AI Engineer", "ML Ops Engineer", "AI Product Architect", "Prompt Engineer"] },
  { id: "farmer", name: "Farmer", icon: "🌾", repetitive: 60, creativity: 35, human: 50, technical: 30, physical: 95, aiSpeed: 35,
    skills: ["Precision Agriculture", "Drone Operation", "AgriTech Software", "Sustainable Farming", "IoT Sensors"],
    futureRoles: ["AgriTech Operator", "Precision Farming Specialist", "Drone Crop Analyst", "Sustainable Agri-Consultant"] },
  { id: "lawyer", name: "Lawyer", icon: "⚖️", repetitive: 65, creativity: 60, human: 75, technical: 50, physical: 20, aiSpeed: 70,
    skills: ["AI Law & Ethics", "Legal Tech Tools", "Contract Automation", "Data Privacy", "AI Compliance"],
    futureRoles: ["AI Compliance Lawyer", "Legal Tech Consultant", "Data Privacy Officer", "AI Ethics Counsel"] },
  { id: "designer", name: "Graphic Designer", icon: "🎨", repetitive: 50, creativity: 90, human: 60, technical: 65, physical: 10, aiSpeed: 85,
    skills: ["AI Design Tools", "Generative AI", "Brand Strategy", "UX/UI", "Creative Direction"],
    futureRoles: ["AI Creative Director", "Generative Design Lead", "AI-Assisted Brand Strategist", "UX Researcher"] },
  { id: "student", name: "Student", icon: "🎓", repetitive: 40, creativity: 70, human: 70, technical: 60, physical: 30, aiSpeed: 60,
    skills: ["AI Literacy", "Critical Thinking", "Adaptability", "Data Skills", "Lifelong Learning"],
    futureRoles: ["Future-Ready Professional", "Cross-Disciplinary Specialist", "AI-Native Knowledge Worker"] },
  { id: "marketer", name: "Marketing Manager", icon: "📢", repetitive: 55, creativity: 75, human: 70, technical: 65, physical: 10, aiSpeed: 88,
    skills: ["AI Marketing Tools", "Data-Driven Strategy", "Generative Content", "Customer Analytics", "Brand AI"],
    futureRoles: ["Growth AI Strategist", "Marketing Data Analyst", "AI Content Director", "CX AI Architect"] },
  { id: "driver", name: "Driver", icon: "🚗", repetitive: 90, creativity: 15, human: 40, technical: 30, physical: 80, aiSpeed: 65,
    skills: ["Logistics Tech", "Fleet Management Systems", "Customer Service", "EV Maintenance", "Last-Mile Logistics"],
    futureRoles: ["Logistics Coordinator", "Fleet Operations Specialist", "Mobility Service Manager"] },
  { id: "doctor", name: "Doctor", icon: "👨‍⚕️", repetitive: 35, creativity: 55, human: 90, technical: 80, physical: 60, aiSpeed: 55,
    skills: ["AI Diagnostics", "Genomics", "Telemedicine", "Health Informatics", "Personalized Medicine"],
    futureRoles: ["AI-Augmented Physician", "Precision Medicine Specialist", "Health Data Strategist"] },
  { id: "writer", name: "Writer / Journalist", icon: "✍️", repetitive: 60, creativity: 90, human: 70, technical: 40, physical: 5, aiSpeed: 90,
    skills: ["Investigative Reporting", "AI Content Tools", "Multimedia Storytelling", "Data Journalism", "Niche Expertise"],
    futureRoles: ["AI-Augmented Editor", "Data Journalist", "Multimedia Storyteller", "Content Strategist"] },
  { id: "engineer", name: "Engineer", icon: "⚙️", repetitive: 45, creativity: 75, human: 50, technical: 90, physical: 40, aiSpeed: 80,
    skills: ["AI/ML Integration", "Digital Twins", "Robotics", "Sustainable Design", "Systems Thinking"],
    futureRoles: ["AI Systems Engineer", "Robotics Architect", "Digital Twin Specialist"] },
  { id: "salesperson", name: "Sales Representative", icon: "🤝", repetitive: 60, creativity: 50, human: 90, technical: 50, physical: 30, aiSpeed: 75,
    skills: ["AI CRM Tools", "Consultative Selling", "Data Analytics", "Relationship Building", "Negotiation"],
    futureRoles: ["AI Sales Strategist", "Customer Success AI Lead", "Solutions Consultant"] },
  { id: "chef", name: "Chef", icon: "👨‍🍳", repetitive: 55, creativity: 85, human: 70, technical: 30, physical: 80, aiSpeed: 35,
    skills: ["Culinary Innovation", "Food Tech", "Sustainable Cuisine", "Brand Storytelling", "Hospitality Tech"],
    futureRoles: ["Culinary Innovator", "Food Tech Consultant", "Sustainable Chef Entrepreneur"] }
];

const REGIONS = {
  "Africa": ["Cameroon", "Nigeria", "Kenya", "South Africa", "Ghana", "Egypt", "Ethiopia", "Senegal", "Morocco", "Tanzania", "Rwanda", "Uganda", "Other"],
  "Europe": ["United Kingdom", "France", "Germany", "Spain", "Italy", "Netherlands", "Sweden", "Portugal", "Poland", "Other"],
  "Asia": ["India", "China", "Japan", "Singapore", "South Korea", "Indonesia", "Philippines", "Vietnam", "Other"],
  "North America": ["United States", "Canada", "Mexico", "Other"],
  "South America": ["Brazil", "Argentina", "Colombia", "Chile", "Peru", "Other"],
  "Oceania": ["Australia", "New Zealand", "Fiji", "Other"],
  "Middle East": ["UAE", "Saudi Arabia", "Israel", "Qatar", "Turkey", "Other"]
};

const REGIONAL_INSIGHTS = {
  "Africa": "Africa is the world's fastest-growing digital economy. Remote work, fintech, and the AI services export market offer massive opportunities. Lean into mobile-first AI tools and bilingual fluency to access global remote roles.",
  "Europe": "The EU AI Act creates demand for compliance, ethics, and audit specialists. Green-tech AI roles are surging. Multilingual professionals with regulatory expertise will lead.",
  "Asia": "Asia leads in automation manufacturing and AI hardware. China and India are exporting AI-trained talent globally. Specialize in robotics, supply-chain AI, or fintech.",
  "North America": "North America's AI startup ecosystem and venture capital make it the global AI capital. Skills in AI product management, MLOps, and applied AI research are in highest demand.",
  "South America": "Latin America is a hotspot for nearshore AI talent. Bilingual developers and AI-augmented service providers are exporting skills to North American firms.",
  "Oceania": "Australia and NZ are investing heavily in agri-tech AI, climate-tech, and resource-sector automation. Sustainability-focused AI careers are surging.",
  "Middle East": "Gulf nations are pouring billions into AI sovereign clouds, smart cities, and AI-first government. Roles in AI strategy, public sector tech, and Arabic-language NLP are rising fast."
};

const TRENDS = [
  { tag: "Generative AI", title: "Beyond Chatbots: Vertical AI Agents", desc: "Industry-specific AI assistants are replacing generalist tools. Domain expertise + AI fluency is the new gold." },
  { tag: "Future of Work", title: "The 4-Day AI Workweek", desc: "Companies using AI productivity tools report 30% time savings. Many are pioneering shorter workweeks." },
  { tag: "Africa Rising", title: "Africa's AI Talent Export Boom", desc: "Remote AI roles paid in USD/EUR are creating a new middle class across major African tech hubs." },
  { tag: "Regulation", title: "The EU AI Act: A Career Catalyst", desc: "Strict AI regulations are creating tens of thousands of compliance, audit, and governance roles." },
  { tag: "Reskilling", title: "Why 50% of Workers Need Reskilling by 2027", desc: "World Economic Forum data shows the half-life of skills is now under 5 years. Continuous learning is non-negotiable." },
  { tag: "AI Augmentation", title: "Centaur Workers: Humans + AI", desc: "Studies show AI-augmented workers outperform peers by 40%. Mastering AI collaboration is the meta-skill." }
];

const FREE_TRAINING = [
  { name: "Google AI Fundamentals", url: "https://grow.google/intl/en/" },
  { name: "Microsoft Learn AI Basics", url: "https://learn.microsoft.com/en-us/training/" },
  { name: "IBM SkillsBuild", url: "https://skillsbuild.org/" },
  { name: "Elements of AI", url: "https://www.elementsofai.com/" }
];
const PAID_TRAINING = [
  { name: "Coursera AI Specializations", url: "https://www.coursera.org/" },
  { name: "Udemy AI Courses", url: "https://www.udemy.com/" },
  { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/" },
  { name: "Pluralsight AI Path", url: "https://www.pluralsight.com/" }
];

/* ============================================================
   NON-CAREER DETECTION — relationships, identities, things AI cannot replace
   ============================================================ */
const NOT_A_CAREER = {
  // Family & relationships — irreplaceable human bonds
  family: {
    terms: ["father", "dad", "daddy", "papa", "mother", "mom", "mum", "mama", "mommy",
            "parent", "parents", "husband", "wife", "spouse", "partner", "boyfriend", "girlfriend",
            "son", "daughter", "child", "children", "kid", "kids", "baby",
            "brother", "sister", "sibling", "uncle", "aunt", "cousin",
            "grandfather", "grandmother", "grandpa", "grandma", "granddad", "nana",
            "grandson", "granddaughter", "grandchild", "godfather", "godmother",
            "in-law", "stepfather", "stepmother", "stepson", "stepdaughter",
            "fiancé", "fiance", "fiancée", "fiancee", "lover"],
    title: "Some Roles AI Will Never Replace",
    message: "Being a {role} isn't a job — it's one of the most irreplaceable human roles in existence. AI can write reports, drive cars, and analyze data, but it cannot love, comfort, raise, or be present for the people who matter to you. Your role is 0% replaceable. Forever.",
    icon: "❤️",
    rate: 0
  },
  // Self / identity / being
  identity: {
    terms: ["human", "person", "people", "man", "woman", "boy", "girl",
            "friend", "best friend", "neighbor", "neighbour", "citizen",
            "myself", "self", "me", "you", "i", "someone", "individual",
            "soul", "being"],
    title: "AI Can't Replace Being You",
    message: "Being a {role} is a state of being, not a profession. AI cannot replace human existence, friendship, or community. These are the things that make life meaningful — and they are entirely yours. Not replaceable. Not now, not ever.",
    icon: "✨",
    rate: 0
  },
  // Faith & spiritual roles
  spiritual: {
    terms: ["pastor", "priest", "imam", "rabbi", "monk", "nun", "preacher",
            "believer", "christian", "muslim", "buddhist", "hindu", "jew",
            "faithful", "worshipper"],
    title: "Faith and Spirituality Stay Human",
    message: "Being a {role} involves faith, conviction, and spiritual presence — things AI fundamentally cannot replicate. While digital tools may assist religious communities, the human role of spiritual leadership and witness remains deeply, profoundly human.",
    icon: "🕊️",
    rate: 5
  },
  // Hobbies / lifestyle (not jobs)
  hobby: {
    terms: ["gamer", "reader", "traveler", "traveller", "foodie", "movie lover",
            "music lover", "sports fan", "dreamer", "thinker", "explorer"],
    title: "That's a Passion, Not a Career",
    message: "Being a {role} sounds wonderful! But this is a passion or lifestyle, not a job AI could replace. If you'd like an actual career assessment, try entering your profession (or aspiring profession) instead.",
    icon: "🌟",
    rate: 0
  },
  // Nonsense / random / body parts / objects — gentle redirect
  invalid: {
    terms: ["test", "testing", "asdf", "qwerty", "hello", "hi", "xxx", "abc", "123",
            "nothing", "none", "n/a", "na", "unemployed", "jobless",
            "leg", "arm", "hand", "foot", "head", "eye", "ear", "nose", "mouth",
            "cat", "dog", "bird", "fish", "tree", "rock", "stone", "water",
            "food", "rice", "bread", "car", "phone", "computer"],
    title: "Hmm, Let's Try Again",
    message: "\"{role}\" doesn't look like a career we recognize. Try entering a job title like Teacher, Developer, Nurse, or any profession — or pick from the list to see your AI exposure.",
    icon: "🤔",
    rate: -1
  }
};

function classifyInput(text) {
  if (!text) return null;
  const normalized = text.trim().toLowerCase().replace(/[^\w\s-]/g, "");
  if (!normalized) return null;
  // Check exact or word-boundary matches in each category
  for (const [key, cat] of Object.entries(NOT_A_CAREER)) {
    for (const term of cat.terms) {
      // Match as whole input or as a word in a short phrase
      if (normalized === term || normalized === term + "s" ||
          (normalized.split(/\s+/).length <= 3 && normalized.split(/\s+/).includes(term))) {
        return { category: key, ...cat, original: text.trim() };
      }
    }
  }
  // Catch single-letter or extremely short non-meaningful inputs
  if (normalized.length < 3 && !["dj", "pa", "vp", "ai"].includes(normalized)) {
    return { category: "invalid", ...NOT_A_CAREER.invalid, original: text.trim() };
  }
  return null;
}

/* ============================================================
   SCORING ENGINE — pure rule-based
   ============================================================ */
function computeExposure(career) {
  // Higher repetitive + tech + ai-speed = higher exposure
  // Higher human + creativity + physical = lower exposure
  const positive = career.repetitive * 0.3 + career.technical * 0.15 + career.aiSpeed * 0.35;
  const negative = career.creativity * 0.2 + career.human * 0.25 + career.physical * 0.15;
  let score = Math.round(positive - negative * 0.4 + 30);
  score = Math.max(8, Math.min(98, score));
  return score;
}
function getLevel(score, t) {
  if (score <= 20) return { key: "vlow", label: t.result.levels.vlow, color: "#10b981", grad: "from-emerald-500 to-green-400" };
  if (score <= 40) return { key: "mod", label: t.result.levels.mod, color: "#84cc16", grad: "from-lime-500 to-yellow-400" };
  if (score <= 60) return { key: "sig", label: t.result.levels.sig, color: "#f59e0b", grad: "from-amber-500 to-orange-400" };
  if (score <= 80) return { key: "high", label: t.result.levels.high, color: "#f97316", grad: "from-orange-500 to-red-400" };
  return { key: "crit", label: t.result.levels.crit, color: "#ef4444", grad: "from-red-500 to-rose-500" };
}
function explainExposure(score, career) {
  if (score <= 20) return `${career.name} roles rely heavily on human empathy, creativity, or physical presence — areas AI struggles to replicate. You're in a strong position, but staying current with AI tools will multiply your impact.`;
  if (score <= 40) return `${career.name} has some routine elements AI can streamline, but the core of your work remains deeply human. Augment yourself with AI tools to increase productivity and stay ahead.`;
  if (score <= 60) return `${career.name} faces meaningful AI disruption in repetitive workflows. About half of current tasks can be automated — but new high-value roles will emerge for those who adapt.`;
  if (score <= 80) return `${career.name} is significantly exposed to AI automation. Many tasks are already being handled by AI systems. The good news? Workers who pivot toward AI-augmented roles in the same field often see their value rise.`;
  return `${career.name} faces critical AI exposure — most current tasks are highly automatable. This is also the field with the biggest opportunity: those who pivot first into AI-driven adjacent roles will lead the next decade.`;
}
function outlookText(score) {
  if (score <= 40) return "Your role has strong fundamentals. Expect 5+ years of stability with AI augmentation amplifying your impact.";
  if (score <= 70) return "Expect significant transformation in the next 3–5 years. Workers who reskill now will move into higher-paying AI-adjacent roles.";
  return "Rapid transformation ahead — but also the biggest upside. Pioneer the new AI-native version of your field within 1–3 years.";
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home"); // home | onboarding | result | trends | upskill | coaching | about | admin
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);

  // Onboarding state
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({ name: "", email: "", region: "", country: "", career: "", careerObj: null, studentField: "" });
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  // Results
  const [result, setResult] = useState(null);
  const [nonCareer, setNonCareer] = useState(null);

  const t = TRANSLATIONS[lang];
  const isRTL = LANGS.find(l => l.code === lang)?.rtl;

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  /* ---------- Navigation ---------- */
  const goTo = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAssessment = () => {
    setStep(0);
    setUser({ name: "", email: "", region: "", country: "", career: "", careerObj: null, studentField: "" });
    setNonCareer(null);
    setResult(null);
    goTo("onboarding");
  };

  /* ---------- Run analysis ---------- */
  const runAnalysis = async () => {
    // First check if input is actually a career
    const classification = classifyInput(user.career);
    if (classification && !user.careerObj) {
      setAnalyzing(true);
      setLoadingMsg(0);
      // Quick playful loading then redirect
      for (let i = 0; i < 2; i++) {
        setLoadingMsg(i);
        await new Promise(r => setTimeout(r, 500));
      }
      setNonCareer(classification);
      setAnalyzing(false);
      goTo("nonCareer");
      return;
    }

    setAnalyzing(true);
    setLoadingMsg(0);
    const messages = t.loading;
    for (let i = 0; i < messages.length; i++) {
      setLoadingMsg(i);
      await new Promise(r => setTimeout(r, 700));
    }
    const careerObj = user.careerObj || CAREERS.find(c => c.name.toLowerCase() === user.career.toLowerCase()) || {
      name: user.career, icon: "💼", repetitive: 50, creativity: 50, human: 60, technical: 50, physical: 30, aiSpeed: 60,
      skills: ["AI Literacy", "Adaptability", "Critical Thinking", "Domain Expertise + AI", "Continuous Learning"],
      futureRoles: ["AI-Augmented Specialist", "Cross-Disciplinary Expert", "Domain AI Strategist"]
    };
    const score = computeExposure(careerObj);
    setResult({ careerObj, score, region: user.region, country: user.country });
    setAnalyzing(false);
    goTo("result");
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={dark ? "dark" : ""} style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(0deg);} 50% { transform: translateY(-20px) rotate(5deg);} }
        @keyframes float2 { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-15px);} }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px rgba(249,115,22,.3); } 50% { box-shadow: 0 0 60px rgba(239,68,68,.5); } }
        @keyframes blob { 0%,100% { transform: translate(0,0) scale(1);} 33% { transform: translate(30px,-50px) scale(1.1);} 66% { transform: translate(-20px,20px) scale(.9);} }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes typewriter { from { width: 0; } to { width: 100%; } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(20px);} to { opacity:1; transform: translateY(0);} }
        @keyframes scaleIn { from { opacity:0; transform: scale(.95);} to { opacity:1; transform: scale(1);} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 4s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-ticker { animation: ticker 40s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-up { animation: fadeUp .6s ease-out both; }
        .animate-scale-in { animation: scaleIn .4s ease-out both; }
        .glass { backdrop-filter: blur(12px); }
        .text-shimmer {
          background: linear-gradient(90deg, #fb923c 0%, #ef4444 50%, #fb923c 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(251,146,60,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,146,60,.06) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          *,*::before,*::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className={`min-h-screen relative overflow-x-hidden ${dark ? "bg-black text-zinc-100" : "bg-[#fffaf5] text-zinc-900"}`}>
        {/* Subtle background atmosphere - just enough warmth, never hurts readability */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full filter blur-3xl animate-blob ${dark ? "bg-orange-600 opacity-[0.08]" : "bg-orange-200 opacity-40"}`} />
          <div className={`absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full filter blur-3xl animate-blob ${dark ? "bg-red-600 opacity-[0.06]" : "bg-orange-100 opacity-30"}`} style={{ animationDelay: "3s" }} />
        </div>

        {/* NAVIGATION */}
        <Nav t={t} lang={lang} setLang={setLang} langOpen={langOpen} setLangOpen={setLangOpen}
             dark={dark} setDark={setDark} page={page} goTo={goTo}
             menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* PAGES */}
        <main className="relative z-10">
          {page === "home" && <Home t={t} dark={dark} startAssessment={startAssessment} goTo={goTo} setCoachOpen={setCoachOpen} />}
          {page === "onboarding" && (
            <Onboarding t={t} step={step} setStep={setStep} user={user} setUser={setUser}
              analyzing={analyzing} loadingMsg={loadingMsg} runAnalysis={runAnalysis} dark={dark} />
          )}
          {page === "result" && result && <Result t={t} result={result} dark={dark} startAssessment={startAssessment} setCoachOpen={setCoachOpen} user={user} />}
          {page === "nonCareer" && nonCareer && <NonCareerResult info={nonCareer} dark={dark} startAssessment={startAssessment} t={t} />}
          {page === "trends" && <TrendsPage t={t} dark={dark} />}
          {page === "upskill" && <UpskillPage t={t} dark={dark} />}
          {page === "coaching" && <CoachingPage t={t} dark={dark} setCoachOpen={setCoachOpen} />}
          {page === "about" && <AboutPage t={t} dark={dark} />}
          {page === "admin" && <AdminPage t={t} dark={dark} />}
        </main>

        <Footer t={t} dark={dark} />

        {/* Coaching Modal */}
        {coachOpen && <CoachingModal t={t} onClose={() => setCoachOpen(false)} dark={dark} prefill={result ? { career: result.careerObj.name, score: `${result.score}%`, country: result.country } : {}} />}
      </div>
    </div>
  );
}

/* ============================================================
   NAV
   ============================================================ */
function Nav({ t, lang, setLang, langOpen, setLangOpen, dark, setDark, page, goTo, menuOpen, setMenuOpen }) {
  const navItems = [
    { id: "home", label: t.nav.home }, { id: "onboarding", label: t.nav.assessment },
    { id: "trends", label: t.nav.trends }, { id: "upskill", label: t.nav.upskilling },
    { id: "coaching", label: t.nav.coaching }, { id: "about", label: t.nav.about }
  ];
  return (
    <header className={`sticky top-0 z-50 glass border-b ${dark ? "bg-black/40 border-white/10" : "bg-white/70 border-orange-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <button onClick={() => goTo("home")} className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 blur-md opacity-50 -z-10" />
          </div>
          <div className="text-left">
            <div className="font-bold text-sm sm:text-base leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MaDSkillz <span className="text-shimmer">AI</span>
            </div>
            <div className={`text-[10px] ${dark ? "text-zinc-300" : "text-zinc-700"}`}>Readiness Platform</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => goTo(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                page === item.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/30"
                  : dark ? "text-zinc-300 hover:bg-white/5" : "text-zinc-700 hover:bg-orange-100"
              }`}>{item.label}</button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Lang Switcher */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium ${dark ? "bg-white/5 hover:bg-white/10" : "bg-orange-100 hover:bg-orange-200"}`}>
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{LANGS.find(l => l.code === lang)?.flag}</span>
              <span className="hidden sm:inline uppercase text-xs">{lang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-in ${dark ? "bg-zinc-900 border border-white/10" : "bg-white border border-orange-200"}`}>
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-orange-500/10 transition-colors ${lang === l.code ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 font-semibold" : ""}`}>
                      <span className="text-lg">{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Dark mode */}
          <button onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg ${dark ? "bg-white/5 hover:bg-white/10" : "bg-orange-100 hover:bg-orange-200"}`}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden p-2 rounded-lg ${dark ? "bg-white/5" : "bg-orange-100"}`}>
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={`lg:hidden border-t animate-fade-up ${dark ? "bg-black/80 border-white/10" : "bg-white/90 border-orange-200"}`}>
          <div className="p-4 grid gap-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => goTo(item.id)}
                className={`text-left px-4 py-3 rounded-lg font-medium ${page === item.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  : dark ? "hover:bg-white/5" : "hover:bg-orange-100"}`}>{item.label}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HOME
   ============================================================ */
function Home({ t, dark, startAssessment, goTo, setCoachOpen }) {
  return (
    <>
      <Hero t={t} dark={dark} startAssessment={startAssessment} />
      <Ticker t={t} dark={dark} />
      <HowItWorks t={t} dark={dark} />
      <ImpactStats t={t} dark={dark} />
      <FeaturedCareers t={t} dark={dark} startAssessment={startAssessment} />
      <CareerTrendsHome t={t} dark={dark} goTo={goTo} />
      <UpskillingPreview t={t} dark={dark} goTo={goTo} />
      <CoachingCTA t={t} dark={dark} setCoachOpen={setCoachOpen} />
    </>
  );
}

function Hero({ t, dark, startAssessment }) {
  const [typed, setTyped] = useState("");
  const fullText = t.hero.tag;
  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      if (i <= fullText.length) { setTyped(fullText.slice(0, i)); i++; }
      else clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [fullText]);

  const icons = ["💻", "📊", "🩺", "👩‍🏫", "🎨", "⚖️", "🌾", "📢"];

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className={`absolute inset-0 grid-bg opacity-50`} />
      {/* floating career icons */}
      {icons.map((ic, i) => (
        <div key={i} className="absolute text-3xl sm:text-5xl opacity-20 hidden md:block animate-float"
          style={{
            left: `${(i * 11 + 5) % 90}%`,
            top: `${(i * 17 + 10) % 75}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${5 + i % 3}s`
          }}>{ic}</div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 ${dark ? "bg-white/5 border border-orange-500/30" : "bg-white border border-orange-300"}`}>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 animate-pulse" />
            <span className="text-shimmer font-semibold">{typed || "\u00A0"}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="block">{t.hero.title1}</span>
            <span className="block text-shimmer">{t.hero.title2}</span>
            <span className="block">{t.hero.title3}</span>
          </h1>
          <p className={`text-base sm:text-lg max-w-xl mb-8 ${dark ? "text-zinc-200" : "text-zinc-800"}`}>{t.hero.sub}</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={startAssessment}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 transition-all animate-pulse-glow">
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className={`px-6 py-3.5 rounded-xl font-semibold border transition-all ${dark ? "border-white/20 hover:bg-white/5" : "border-orange-300 bg-white hover:bg-orange-50"}`}>
              {t.hero.cta2}
            </button>
          </div>
        </div>

        {/* Animated AI Visual */}
        <div className="relative h-[400px] lg:h-[500px] hidden lg:flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-2xl animate-pulse-glow" />
              <div className="absolute inset-8 rounded-full border-2 border-orange-500/30 animate-spin-slow" />
              <div className="absolute inset-16 rounded-full border-2 border-red-500/30 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
              <div className="absolute inset-24 rounded-full border-2 border-amber-500/40 animate-spin-slow" style={{ animationDuration: "10s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/50">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
              {/* Orbiting nodes */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div key={i} className="absolute inset-0 animate-spin-slow" style={{ animationDuration: `${15 + i * 2}s`, animationDirection: i % 2 ? "reverse" : "normal" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/50"
                    style={{ transform: `rotate(${deg}deg) translateY(0px)` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker({ t, dark }) {
  const items = [...t.hero.ticker, ...t.hero.ticker];
  return (
    <div className={`relative overflow-hidden border-y ${dark ? "border-white/10 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10" : "border-orange-200 bg-gradient-to-r from-orange-100 via-orange-100 to-orange-100"}`}>
      <div className="flex animate-ticker py-3 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-6 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{item}</span>
            <span className={dark ? "text-orange-500/40" : "text-orange-400"}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks({ t, dark }) {
  const steps = [
    { icon: Users, title: t.how.s1t, desc: t.how.s1d },
    { icon: Briefcase, title: t.how.s2t, desc: t.how.s2d },
    { icon: BarChart3, title: t.how.s3t, desc: t.how.s3d },
    { icon: Rocket, title: t.how.s4t, desc: t.how.s4d }
  ];
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={t.how.title} sub={t.how.sub} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={i} className={`relative group p-6 rounded-2xl border transition-all hover:-translate-y-1 ${dark ? "bg-white/[0.08] border-white/15 hover:border-orange-500/50" : "bg-white border-orange-200 hover:border-orange-400 shadow-sm hover:shadow-lg"}`}>
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {i + 1}
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className={`text-sm ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(value);
        };
        tick();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function ImpactStats({ t, dark }) {
  const stats = [
    { v: 1200, suf: "M+", label: t.stats.s1, icon: Briefcase },
    { v: 47, suf: "+", label: t.stats.s2, icon: Layers },
    { v: 350, suf: "+", label: t.stats.s3, icon: Sparkles },
    { v: 312, suf: "%", label: t.stats.s4, icon: TrendingUp }
  ];
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={t.stats.title} sub={t.stats.sub} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className={`relative overflow-hidden p-6 rounded-2xl border ${dark ? "bg-gradient-to-br from-orange-500/15 to-red-500/10 border-white/10" : "bg-gradient-to-br from-white to-orange-50 border-orange-200"}`}>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/10 blur-2xl" />
              <s.icon className="w-6 h-6 text-orange-500 mb-3" />
              <div className="text-3xl sm:text-4xl font-extrabold text-shimmer mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <AnimatedCounter value={s.v} suffix={s.suf} />
              </div>
              <div className={`text-xs sm:text-sm ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCareers({ t, dark, startAssessment }) {
  const featured = ["accountant", "teacher", "developer", "nurse", "designer", "lawyer", "farmer", "marketer"]
    .map(id => CAREERS.find(c => c.id === id));
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={t.featured.title} sub={t.featured.sub} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {featured.map((c, i) => {
            const score = computeExposure(c);
            const lvl = getLevel(score, t);
            return (
              <button key={c.id} onClick={startAssessment}
                className={`group text-left p-4 sm:p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${dark ? "bg-white/[0.08] border-white/15 hover:border-orange-500/50" : "bg-white border-orange-200 hover:border-orange-400"}`}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-bold text-sm sm:text-base mb-2 group-hover:text-orange-500 transition-colors">{c.name}</div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{score}%</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: lvl.color }}>{lvl.label.split(" ")[0]}</span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-orange-100"}`}>
                  <div className={`h-full bg-gradient-to-r ${lvl.grad} transition-all`} style={{ width: `${score}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CareerTrendsHome({ t, dark, goTo }) {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={t.trends.title} sub={t.trends.sub} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDS.slice(0, 3).map((tr, i) => (
            <article key={i} className={`group p-6 rounded-2xl border transition-all hover:-translate-y-1 cursor-pointer ${dark ? "bg-white/[0.08] border-white/15 hover:border-orange-500/50" : "bg-white border-orange-200 hover:border-orange-400 shadow-sm hover:shadow-lg"}`}
              onClick={() => goTo("trends")}>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-500 border border-orange-500/30">{tr.tag}</span>
              <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors">{tr.title}</h3>
              <p className={`text-sm mb-4 ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{tr.desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-orange-500">
                {t.trends.readMore} <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpskillingPreview({ t, dark, goTo }) {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={t.upskill.title} sub={t.upskill.sub} />
        <div className="grid md:grid-cols-2 gap-5">
          <div className={`p-6 rounded-2xl border ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200"}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-lg">{t.upskill.free}</h3>
            </div>
            <ul className="grid gap-2">
              {FREE_TRAINING.slice(0, 3).map((r, i) => (
                <li key={i}>
                  <a href={r.url} target="_blank" rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-lg group transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-orange-50"}`}>
                    <span className="text-sm font-medium">{r.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-6 rounded-2xl border ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200"}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-lg">{t.upskill.paid}</h3>
            </div>
            <ul className="grid gap-2">
              {PAID_TRAINING.slice(0, 3).map((r, i) => (
                <li key={i}>
                  <a href={r.url} target="_blank" rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-lg group transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-orange-50"}`}>
                    <span className="text-sm font-medium">{r.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <button onClick={() => goTo("upskill")} className="text-sm font-semibold text-orange-500 hover:text-orange-400 inline-flex items-center gap-1">
            Explore all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CoachingCTA({ t, dark, setCoachOpen }) {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 ${dark ? "bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30" : "bg-gradient-to-br from-orange-500 to-red-500"}`}>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-red-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${dark ? "bg-white/10" : "bg-white/30 text-white"}`}>
                <Star className="w-3 h-3" /> Premium Service
              </div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${dark ? "text-shimmer" : "text-white"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.coaching.title}
              </h2>
              <p className={`mb-6 ${dark ? "text-zinc-300" : "text-white/90"}`}>{t.coaching.sub}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setCoachOpen(true)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${dark ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : "bg-white text-orange-500"}`}>
                  <MessageCircle className="w-4 h-4" /> {t.coaching.whatsapp}
                </button>
                <button onClick={() => setCoachOpen(true)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border-2 transition-all hover:scale-105 ${dark ? "border-orange-500/50 hover:bg-orange-500/10" : "border-white text-white hover:bg-white/10"}`}>
                  <Mail className="w-4 h-4" /> {t.coaching.email}
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center animate-float">
                  <MessageCircle className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-3xl sm:text-5xl font-extrabold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <span className="text-shimmer">{title}</span>
      </h2>
      {sub && <p className="text-sm sm:text-base opacity-70 max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

/* ============================================================
   ONBOARDING
   ============================================================ */
function Onboarding({ t, step, setStep, user, setUser, analyzing, loadingMsg, runAnalysis, dark }) {
  if (analyzing) return <AnalysisLoader t={t} loadingMsg={loadingMsg} dark={dark} />;
  return (
    <section className="min-h-[80vh] py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-semibold">{t.onb.step} {step + 1} {t.onb.of} 4</span>
            <span className={dark ? "text-zinc-300" : "text-zinc-700"}>{Math.round((step + 1) / 4 * 100)}%</span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-orange-100"}`}>
            <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500" style={{ width: `${(step + 1) / 4 * 100}%` }} />
          </div>
        </div>

        <div className={`p-6 sm:p-10 rounded-3xl border ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200 shadow-xl"} animate-scale-in`}>
          {step === 0 && <StepWelcome t={t} user={user} setUser={setUser} setStep={setStep} dark={dark} />}
          {step === 1 && <StepRegion t={t} user={user} setUser={setUser} setStep={setStep} dark={dark} />}
          {step === 2 && <StepCareer t={t} user={user} setUser={setUser} setStep={setStep} dark={dark} runAnalysis={runAnalysis} />}
          {step === 3 && <StepReview t={t} user={user} setStep={setStep} runAnalysis={runAnalysis} dark={dark} />}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-2">{label}</span>
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", dark }) {
  return (
    <input value={value} onChange={onChange} placeholder={placeholder} type={type}
      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
        dark ? "bg-black/30 border-white/10 text-white placeholder-zinc-500" : "bg-orange-50/50 border-orange-200 placeholder-zinc-400"
      }`} />
  );
}

function StepWelcome({ t, user, setUser, setStep, dark }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.onb.welcome}</h2>
        <p className={dark ? "text-zinc-300" : "text-zinc-700"}>{t.onb.welcomeSub}</p>
      </div>
      <div className="grid gap-4">
        <Field label={t.onb.fullName}>
          <Input dark={dark} value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder={t.onb.fullNamePh} />
        </Field>
        <Field label={t.onb.email}>
          <Input dark={dark} type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder={t.onb.emailPh} />
        </Field>
        <button onClick={() => user.name.trim() && setStep(1)} disabled={!user.name.trim()}
          className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/40 transition-all inline-flex items-center justify-center gap-2">
          {t.onb.continue} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function StepRegion({ t, user, setUser, setStep, dark }) {
  const countries = user.region ? REGIONS[user.region] : [];
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.onb.regionTitle}</h2>
        <p className={dark ? "text-zinc-300" : "text-zinc-700"}>{t.onb.regionSub}</p>
      </div>
      <div className="grid gap-4">
        <Field label={t.onb.region}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.keys(REGIONS).map(r => (
              <button key={r} onClick={() => setUser({ ...user, region: r, country: "" })}
                className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${user.region === r
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/30"
                  : dark ? "bg-black/20 border-white/10 hover:border-orange-500/50" : "bg-orange-50/50 border-orange-200 hover:border-orange-400"
                }`}>{t.onb.regions[r]}</button>
            ))}
          </div>
        </Field>
        {user.region && (
          <Field label={t.onb.country}>
            <select value={user.country} onChange={e => setUser({ ...user, country: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 ${dark ? "bg-black/30 border-white/10 text-white" : "bg-orange-50/50 border-orange-200"}`}>
              <option value="">— Select —</option>
              {countries.map(c => <option key={c} value={c}>{c === "Other" ? t.onb.other : c}</option>)}
            </select>
          </Field>
        )}
        <div className="flex gap-2 mt-2">
          <button onClick={() => setStep(0)} className={`px-5 py-3 rounded-xl font-semibold border ${dark ? "border-white/10 hover:bg-white/5" : "border-orange-200 hover:bg-orange-50"}`}>{t.onb.back}</button>
          <button onClick={() => user.region && user.country && setStep(2)} disabled={!user.region || !user.country}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-orange-500/40 transition-all inline-flex items-center justify-center gap-2">
            {t.onb.continue} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StepCareer({ t, user, setUser, setStep, dark }) {
  const [search, setSearch] = useState(user.career);
  const matches = useMemo(() => {
    if (!search.trim()) return CAREERS.slice(0, 6);
    return CAREERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6);
  }, [search]);

  const isStudent = user.careerObj?.id === "student" || user.career.toLowerCase() === "student";

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.onb.careerTitle}</h2>
        <p className={dark ? "text-zinc-300" : "text-zinc-700"}>{t.onb.careerSub}</p>
      </div>
      <div className="grid gap-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <input value={search} onChange={e => { setSearch(e.target.value); setUser({ ...user, career: e.target.value, careerObj: null }); }}
            placeholder={t.onb.careerPh}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${dark ? "bg-black/30 border-white/10 text-white placeholder-zinc-500" : "bg-orange-50/50 border-orange-200"}`} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto scroll-hide">
          {matches.map(c => (
            <button key={c.id} onClick={() => { setUser({ ...user, career: c.name, careerObj: c }); setSearch(c.name); }}
              className={`p-3 rounded-xl border text-left transition-all ${user.careerObj?.id === c.id
                ? "bg-gradient-to-br from-orange-500/20 to-red-500/10 border-orange-500"
                : dark ? "bg-black/20 border-white/10 hover:border-orange-500/50" : "bg-orange-50/50 border-orange-200 hover:border-orange-400"}`}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-xs font-semibold">{c.name}</div>
            </button>
          ))}
        </div>
        {isStudent && (
          <Field label={t.onb.studentField}>
            <Input dark={dark} value={user.studentField} onChange={e => setUser({ ...user, studentField: e.target.value })} placeholder={t.onb.studentFieldPh} />
          </Field>
        )}
        <div className="flex gap-2 mt-2">
          <button onClick={() => setStep(1)} className={`px-5 py-3 rounded-xl font-semibold border ${dark ? "border-white/10 hover:bg-white/5" : "border-orange-200 hover:bg-orange-50"}`}>{t.onb.back}</button>
          <button onClick={() => user.career.trim() && setStep(3)} disabled={!user.career.trim()}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-orange-500/40 transition-all inline-flex items-center justify-center gap-2">
            {t.onb.continue} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StepReview({ t, user, setStep, runAnalysis, dark }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40 animate-pulse-glow">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready, {user.name}?</h2>
      </div>
      <div className={`grid gap-3 mb-6 p-5 rounded-xl ${dark ? "bg-black/20" : "bg-orange-50"}`}>
        <ReviewRow label={t.onb.fullName} value={user.name} />
        {user.email && <ReviewRow label={t.onb.email} value={user.email} />}
        <ReviewRow label={t.onb.region} value={t.onb.regions[user.region] || user.region} />
        <ReviewRow label={t.onb.country} value={user.country} />
        <ReviewRow label="Career" value={user.career} />
        {user.studentField && <ReviewRow label={t.onb.studentField} value={user.studentField} />}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setStep(2)} className={`px-5 py-3 rounded-xl font-semibold border ${dark ? "border-white/10 hover:bg-white/5" : "border-orange-200 hover:bg-orange-50"}`}>{t.onb.back}</button>
        <button onClick={runAnalysis}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/40 transition-all inline-flex items-center justify-center gap-2 animate-pulse-glow">
          <Zap className="w-4 h-4" /> {t.onb.measure}
        </button>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="opacity-70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function AnalysisLoader({ t, loadingMsg, dark }) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-orange-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-red-500 animate-spin-slow" style={{ animationDuration: "2s" }} />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center animate-pulse-glow">
            <Cpu className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold mb-2 text-shimmer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Analyzing</h2>
        <p className="text-base font-medium animate-fade-up" key={loadingMsg}>{t.loading[loadingMsg]}</p>
        <div className={`mt-6 h-1.5 max-w-xs mx-auto rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-orange-100"}`}>
          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500" style={{ width: `${(loadingMsg + 1) / t.loading.length * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RESULT
   ============================================================ */
function Result({ t, result, dark, startAssessment, setCoachOpen, user }) {
  const { careerObj, score, region, country } = result;
  const lvl = getLevel(score, t);
  const C = 2 * Math.PI * 80; // circumference for 80 radius
  const offset = C - (score / 100) * C;

  const downloadPDF = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>MaDSkillz Report - ${user.name || careerObj.name}</title>
      <style>body{font-family:system-ui,sans-serif;padding:40px;color:#222;max-width:800px;margin:auto;}h1{color:#f97316;font-size:32px;margin-bottom:5px;}h2{color:#f97316;border-bottom:2px solid #fbbf24;padding-bottom:5px;margin-top:30px;}.score{font-size:64px;font-weight:800;background:linear-gradient(90deg,#f97316,#fbbf24);-webkit-background-clip:text;background-clip:text;color:transparent;}.box{background:#fff7ed;padding:20px;border-radius:12px;margin:15px 0;}ul{padding-left:20px;}li{margin:6px 0;}footer{margin-top:60px;padding-top:20px;border-top:1px solid #ddd;color:#888;font-size:12px;text-align:center;}</style>
      </head><body>
      <h1>MaDSkillz AI Readiness Report</h1>
      <p><strong>Name:</strong> ${user.name || "—"} <br/><strong>Career:</strong> ${careerObj.name} <br/><strong>Region:</strong> ${region}, ${country}</p>
      <h2>Exposure Score</h2>
      <div class="score">${score}%</div>
      <p style="font-size:18px;font-weight:600;color:${lvl.color};">${lvl.label}</p>
      <h2>What This Means</h2>
      <p>${explainExposure(score, careerObj)}</p>
      <h2>Future Outlook</h2>
      <p>${outlookText(score)}</p>
      <h2>Regional Insights — ${region}</h2>
      <p>${REGIONAL_INSIGHTS[region] || ""}</p>
      <h2>Recommended Skills</h2>
      <ul>${careerObj.skills.map(s => `<li>${s}</li>`).join("")}</ul>
      <h2>Career Evolution Paths</h2>
      <ul>${careerObj.futureRoles.map(s => `<li>${s}</li>`).join("")}</ul>
      <h2>Free Learning Resources</h2>
      <ul>${FREE_TRAINING.map(r => `<li>${r.name} — ${r.url}</li>`).join("")}</ul>
      <h2>Premium Learning Resources</h2>
      <ul>${PAID_TRAINING.map(r => `<li>${r.name} — ${r.url}</li>`).join("")}</ul>
      <footer>${t.common.footer}<br/>${t.common.core}</footer>
      <script>window.onload=()=>window.print();</script></body></html>`);
    win.document.close();
  };

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 animate-fade-up">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${dark ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-700"}`}>
            <Activity className="w-3 h-3" /> Live Analysis Complete
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="text-shimmer">{t.result.title}</span>
          </h1>
          <p className={dark ? "text-zinc-300" : "text-zinc-700"}>
            {careerObj.icon} {careerObj.name} · {country}, {region}
          </p>
        </div>

        {/* Score card */}
        <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 mb-6 border ${dark ? "bg-gradient-to-br from-white/5 to-orange-500/5 border-white/10" : "bg-white border-orange-200 shadow-xl"}`}>
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: lvl.color }} />
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div className="flex justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(251,146,60,0.15)"} strokeWidth="14" fill="none" />
                  <circle cx="100" cy="100" r="80" stroke="url(#grad)" strokeWidth="14" strokeLinecap="round" fill="none"
                    strokeDasharray={C} strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl sm:text-6xl font-extrabold text-shimmer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <AnimatedCounter value={score} suffix="%" duration={1500} />
                  </div>
                  <div className="text-xs uppercase tracking-widest opacity-60">{t.result.score}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3" style={{ background: `${lvl.color}20`, color: lvl.color }}>
                <AlertCircle className="w-3 h-3" /> {lvl.label}
              </div>
              <h2 className="text-2xl font-extrabold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.result.explain}</h2>
              <p className={`text-sm sm:text-base mb-6 ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{explainExposure(score, careerObj)}</p>

              {/* dimension bars */}
              <div className="grid gap-2">
                {[
                  { label: "Repetitive tasks", val: careerObj.repetitive },
                  { label: "Creativity required", val: careerObj.creativity },
                  { label: "Human interaction", val: careerObj.human },
                  { label: "Technical complexity", val: careerObj.technical },
                  { label: "Physical presence", val: careerObj.physical },
                  { label: "AI adoption speed", val: careerObj.aiSpeed }
                ].map(d => (
                  <div key={d.label} className="grid grid-cols-[140px_1fr_36px] items-center gap-2 text-xs">
                    <span className="opacity-70">{d.label}</span>
                    <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-orange-100"}`}>
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000" style={{ width: `${d.val}%` }} />
                    </div>
                    <span className="text-right font-semibold">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail grid */}
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          <Card dark={dark} icon={TrendingUp} title={t.result.outlook}>
            <p className="text-sm">{outlookText(score)}</p>
          </Card>
          <Card dark={dark} icon={Globe} title={`${t.result.regional} — ${region}`}>
            <p className="text-sm">{REGIONAL_INSIGHTS[region]}</p>
          </Card>
          <Card dark={dark} icon={Lightbulb} title={t.result.skills}>
            <div className="flex flex-wrap gap-2">
              {careerObj.skills.map((s, i) => (
                <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${dark ? "bg-orange-500/15 text-orange-400 border border-orange-500/30" : "bg-orange-100 text-orange-700 border border-orange-300"}`}>{s}</span>
              ))}
            </div>
          </Card>
          <Card dark={dark} icon={Rocket} title={t.result.roles}>
            <ul className="grid gap-2">
              {careerObj.futureRoles.map((r, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-orange-500 shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Trends */}
        <Card dark={dark} icon={Sparkles} title={t.result.trends} className="mb-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {TRENDS.slice(0, 4).map((tr, i) => (
              <div key={i} className={`p-3 rounded-lg ${dark ? "bg-black/20" : "bg-orange-50"}`}>
                <div className="text-[10px] uppercase tracking-wider font-bold text-orange-500 mb-1">{tr.tag}</div>
                <div className="text-sm font-semibold mb-1">{tr.title}</div>
                <div className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{tr.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <Card dark={dark} icon={BookOpen} title={t.result.free} accent="emerald">
            <ul className="grid gap-2">
              {FREE_TRAINING.map((r, i) => (
                <li key={i}><a href={r.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-orange-500/10 transition-colors group">
                  <span className="text-sm font-medium">{r.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a></li>
              ))}
            </ul>
          </Card>
          <Card dark={dark} icon={Award} title={t.result.paid}>
            <ul className="grid gap-2">
              {PAID_TRAINING.map((r, i) => (
                <li key={i}><a href={r.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-orange-500/10 transition-colors group">
                  <span className="text-sm font-medium">{r.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a></li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={downloadPDF}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/40 transition-all">
            <Download className="w-4 h-4" /> {t.result.download}
          </button>
          <button onClick={() => setCoachOpen(true)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border-2 transition-all ${dark ? "border-orange-500/50 hover:bg-orange-500/10" : "border-orange-400 bg-white hover:bg-orange-50"}`}>
            <MessageCircle className="w-4 h-4" /> {t.result.bookCoach}
          </button>
          <button onClick={startAssessment}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold ${dark ? "bg-white/5 hover:bg-white/10" : "bg-orange-100 hover:bg-orange-200"}`}>
            {t.result.retake}
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, children, dark, accent = "orange", className = "" }) {
  const grad = accent === "emerald" ? "from-emerald-500 to-green-400" : "from-orange-500 to-red-500";
  return (
    <div className={`p-5 sm:p-6 rounded-2xl border ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200 shadow-sm"} ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ============================================================
   NON-CAREER RESULT — for inputs like "father", "wife", "human", etc.
   ============================================================ */
function NonCareerResult({ info, dark, startAssessment, t }) {
  const message = info.message.replace("{role}", info.original);
  const isInvalid = info.category === "invalid";
  const isHobby = info.category === "hobby";

  // For relationships and identity, show a beautiful 0% replaceability badge
  const showZero = info.rate === 0;

  return (
    <section className="py-12 px-4 sm:px-6 min-h-[80vh] flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 border animate-scale-in ${
          dark ? "bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-amber-500/10 border-orange-500/30"
               : "bg-gradient-to-br from-rose-50 via-white to-amber-50 border-orange-200 shadow-xl"
        }`}>
          {/* decorative hearts/sparkles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-rose-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400 items-center justify-center shadow-2xl shadow-orange-500/40 animate-pulse-glow text-5xl sm:text-6xl">
              {info.icon}
            </div>

            {showZero && (
              <div className="mb-6">
                <div className="text-7xl sm:text-8xl font-extrabold mb-2" style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, #f43f5e, #f97316, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}>0%</div>
                <div className="text-xs uppercase tracking-[0.3em] font-bold text-orange-500">Replaceability</div>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-shimmer">{info.title}</span>
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 ${dark ? "text-zinc-200" : "text-zinc-700"}`}>
              {message}
            </p>

            {showZero && (
              <div className={`inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-2xl mb-8 ${
                dark ? "bg-rose-500/10 border border-rose-500/30" : "bg-rose-50 border border-rose-200"
              }`}>
                <span className="text-2xl">💛</span>
                <span className="font-semibold text-sm">
                  Some things are too human for any algorithm.
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={startAssessment}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 transition-all">
                {isInvalid ? "Try Again" : "Now Check Your Actual Career"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested careers for invalid/hobby inputs */}
            {(isInvalid || isHobby) && (
              <div className="mt-10">
                <div className={`text-xs uppercase tracking-widest mb-3 ${dark ? "text-zinc-300" : "text-zinc-700"}`}>Try one of these instead</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Teacher", "Software Developer", "Nurse", "Accountant", "Designer", "Marketing Manager"].map(c => (
                    <button key={c} onClick={startAssessment}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all hover:scale-105 ${
                        dark ? "bg-white/[0.08] border-white/15 hover:border-orange-500/50"
                             : "bg-white border-orange-200 hover:border-orange-400"
                      }`}>{c}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className={`text-center text-sm italic mt-6 ${dark ? "text-zinc-300" : "text-zinc-700"}`}>
          "{t.common.core}"
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   OTHER PAGES
   ============================================================ */
function TrendsPage({ t, dark }) {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.trends.title} sub={t.trends.sub} />
        <div className="grid md:grid-cols-2 gap-5">
          {TRENDS.map((tr, i) => (
            <article key={i} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${dark ? "bg-white/[0.08] border-white/15 hover:border-orange-500/50" : "bg-white border-orange-200 hover:border-orange-400 shadow-sm hover:shadow-lg"}`}>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-500 border border-orange-500/30">{tr.tag}</span>
              <h3 className="font-bold text-xl mb-3">{tr.title}</h3>
              <p className={`text-sm ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{tr.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpskillPage({ t, dark }) {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.upskill.title} sub={t.upskill.sub} />
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className={`p-6 rounded-2xl border ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200"}`}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl">{t.upskill.free}</h3>
                <p className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>Start your AI journey today</p>
              </div>
            </div>
            <ul className="grid gap-2">
              {FREE_TRAINING.map((r, i) => (
                <li key={i}>
                  <a href={r.url} target="_blank" rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl group ${dark ? "hover:bg-white/5 border border-white/5" : "hover:bg-orange-50 border border-orange-100"}`}>
                    <span className="text-sm font-medium">{r.name}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                      {t.upskill.visit} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-6 rounded-2xl border ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200"}`}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl">{t.upskill.paid}</h3>
                <p className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>Premium certifications</p>
              </div>
            </div>
            <ul className="grid gap-2">
              {PAID_TRAINING.map((r, i) => (
                <li key={i}>
                  <a href={r.url} target="_blank" rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl group ${dark ? "hover:bg-white/5 border border-white/5" : "hover:bg-orange-50 border border-orange-100"}`}>
                    <span className="text-sm font-medium">{r.name}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500">
                      {t.upskill.visit} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoachingPage({ t, dark, setCoachOpen }) {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <CoachingCTA t={t} dark={dark} setCoachOpen={setCoachOpen} />
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { icon: Target, title: "Personalized Strategy", desc: "Custom plan based on your career and goals" },
            { icon: Shield, title: "Confidential", desc: "Direct 1-on-1 with verified Team21 experts" },
            { icon: Rocket, title: "Action-Driven", desc: "Walk away with a clear, doable next-30-days plan" }
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-2xl border text-center ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200"}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6 text-orange-500" />
              </div>
              <div className="font-bold mb-1">{item.title}</div>
              <div className={`text-sm ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage({ t, dark }) {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title={t.about.title} sub={t.common.core} />
        <div className={`p-8 rounded-3xl border space-y-5 ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200 shadow-sm"}`}>
          <p className="text-base leading-relaxed">{t.about.p1}</p>
          <p className="text-base leading-relaxed">{t.about.p2}</p>
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className={`p-5 rounded-2xl ${dark ? "bg-orange-500/10" : "bg-orange-50"}`}>
              <Target className="w-6 h-6 text-orange-500 mb-2" />
              <div className="font-bold mb-1">{t.about.mission}</div>
              <div className="text-sm opacity-80">{t.about.missionText}</div>
            </div>
            <div className={`p-5 rounded-2xl ${dark ? "bg-red-500/10" : "bg-red-50"}`}>
              <Sparkles className="w-6 h-6 text-red-500 mb-2" />
              <div className="font-bold mb-1">{t.about.vision}</div>
              <div className="text-sm opacity-80">{t.about.visionText}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminPage({ t, dark }) {
  const stats = [
    { label: t.admin.total, value: 12847, suf: "+", icon: Activity },
    { label: t.admin.countries, value: 48, suf: "", icon: Globe },
    { label: t.admin.requests, value: 326, suf: "", icon: MessageCircle },
    { label: "Avg. score", value: 54, suf: "%", icon: BarChart3 }
  ];
  const topCareers = [
    { name: "Software Developer", count: 2150 }, { name: "Accountant", count: 1820 },
    { name: "Teacher", count: 1640 }, { name: "Marketing Manager", count: 1230 },
    { name: "Designer", count: 980 }
  ];
  const exposed = [
    { name: "Driver", score: 92 }, { name: "Accountant", score: 78 },
    { name: "Marketer", score: 72 }, { name: "Designer", score: 68 }, { name: "Lawyer", score: 60 }
  ];
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={t.admin.title} sub={t.admin.sub} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className={`p-5 rounded-2xl border ${dark ? "bg-white/[0.08] border-white/15" : "bg-white border-orange-200"}`}>
              <s.icon className="w-5 h-5 text-orange-500 mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-shimmer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <AnimatedCounter value={s.value} suffix={s.suf} />
              </div>
              <div className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          <Card dark={dark} icon={Search} title={t.admin.searched}>
            <ul className="grid gap-3">
              {topCareers.map((c, i) => (
                <li key={c.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="flex-1 text-sm font-medium">{c.name}</span>
                  <span className="text-xs opacity-60">{c.count}</span>
                  <div className="w-24 h-1.5 rounded-full overflow-hidden bg-orange-500/10">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${(c.count / topCareers[0].count) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card dark={dark} icon={AlertCircle} title={t.admin.exposed}>
            <ul className="grid gap-3">
              {exposed.map(e => (
                <li key={e.name} className="flex items-center gap-3">
                  <span className="flex-1 text-sm font-medium">{e.name}</span>
                  <span className="text-xs font-bold" style={{ color: getLevel(e.score, t).color }}>{e.score}%</span>
                  <div className="w-32 h-1.5 rounded-full overflow-hidden bg-orange-500/10">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${e.score}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COACHING MODAL
   ============================================================ */
function CoachingModal({ t, onClose, dark, prefill }) {
  const [form, setForm] = useState({
    name: "", country: prefill.country || "", career: prefill.career || "",
    score: prefill.score || "", type: "guidance", method: "wa", message: ""
  });
  const [sent, setSent] = useState(null);

  const submit = () => {
    if (!form.name.trim()) return;
    const text = `Hi Team21! I'd like coaching.%0A%0AName: ${form.name}%0ACountry: ${form.country}%0ACareer: ${form.career}%0AExposure Score: ${form.score}%0AType: ${t.coaching.types[form.type]}%0A%0AMessage: ${form.message}`;
    if (form.method === "wa") {
      setSent("wa");
      setTimeout(() => { window.open(`https://wa.me/237674917169?text=${text}`, "_blank"); onClose(); }, 800);
    } else {
      setSent("email");
      const subject = encodeURIComponent(`Coaching Request - ${form.name}`);
      const body = decodeURIComponent(text).replace(/%0A/g, "\n");
      setTimeout(() => { window.location.href = `mailto:team21online@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`; onClose(); }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 animate-fade-up">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-lg rounded-3xl border max-h-[90vh] overflow-y-auto scroll-hide ${dark ? "bg-zinc-900 border-white/10" : "bg-white border-orange-200"} animate-scale-in`}>
        <div className={`sticky top-0 z-10 flex items-center justify-between p-5 border-b backdrop-blur ${dark ? "bg-zinc-900/90 border-white/10" : "bg-white/90 border-orange-200"}`}>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-extrabold">{t.coaching.formTitle}</h3>
          </div>
          <button onClick={onClose} className={`p-2 rounded-lg ${dark ? "hover:bg-white/10" : "hover:bg-orange-100"}`}><X className="w-4 h-4" /></button>
        </div>

        {sent ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold">{sent === "wa" ? t.coaching.sentWa : t.coaching.sentEmail}</p>
          </div>
        ) : (
          <div className="p-5 grid gap-4">
            <Field label={t.coaching.fullName}>
              <Input dark={dark} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t.coaching.country}>
                <Input dark={dark} value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="Cameroon" />
              </Field>
              <Field label={t.coaching.career}>
                <Input dark={dark} value={form.career} onChange={e => setForm({ ...form, career: e.target.value })} placeholder="Accountant" />
              </Field>
            </div>
            <Field label={t.coaching.score}>
              <Input dark={dark} value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} placeholder="72%" />
            </Field>
            <Field label={t.coaching.type}>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 ${dark ? "bg-black/30 border-white/10 text-white" : "bg-orange-50/50 border-orange-200"}`}>
                {Object.entries(t.coaching.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <Field label={t.coaching.method}>
              <div className="grid grid-cols-2 gap-2">
                {["wa", "email"].map(m => (
                  <button key={m} onClick={() => setForm({ ...form, method: m })}
                    className={`px-3 py-3 rounded-xl border font-semibold inline-flex items-center justify-center gap-2 transition-all ${form.method === m
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent"
                      : dark ? "bg-black/20 border-white/10" : "bg-orange-50 border-orange-200"}`}>
                    {m === "wa" ? <MessageCircle className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    {t.coaching.methods[m]}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={t.coaching.message}>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                className={`w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 resize-none ${dark ? "bg-black/30 border-white/10 text-white" : "bg-orange-50/50 border-orange-200"}`}
                placeholder="What would you like to discuss?" />
            </Field>
            <div className="flex gap-2 pt-2">
              <button onClick={onClose} className={`px-5 py-3 rounded-xl font-semibold border ${dark ? "border-white/10 hover:bg-white/5" : "border-orange-200 hover:bg-orange-50"}`}>{t.coaching.cancel}</button>
              <button onClick={submit} disabled={!form.name.trim()}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-orange-500/40 transition-all inline-flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> {t.coaching.submit}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ t, dark }) {
  return (
    <footer className={`relative z-10 mt-20 border-t ${dark ? "bg-black/50 border-white/10" : "bg-white border-orange-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MaDSkillz <span className="text-shimmer">AI</span></div>
              <div className={`text-xs ${dark ? "text-zinc-300" : "text-zinc-700"}`}>AI Readiness Platform</div>
            </div>
          </div>
          <div className="text-center text-sm">
            <p className={`italic ${dark ? "text-zinc-300" : "text-zinc-700"}`}>"{t.common.core}"</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-semibold">{t.common.footer}</p>
            <p className={`mt-1 ${dark ? "text-zinc-400" : "text-zinc-400"}`}>Built with intention. Designed to empower.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
