/* ============================================================
   Team21 Health Platform — Extended Data
   Body-system tips, natural remedies, African diet, quizzes
   ============================================================ */

/* ============ NATURAL REMEDIES (evidence-grade noted) ============ */
const REMEDIES = [
  {
    ic:'🌿', name:'Ginger', sub:'Zingiber officinale',
    uses:'<strong>Nausea</strong> (pregnancy, motion sickness, post-operative, chemotherapy-induced) — meta-analyses support 1–1.5 g/day in divided doses. <strong>Osteoarthritis</strong> pain — modest analgesic effect. May reduce menstrual pain (dysmenorrhoea). Mild reduction in HbA1c and fasting glucose in type 2 diabetes.',
    how:'Fresh root steeped as tea (slice 2–3 cm, simmer 10 min), powdered in food, or candied. Standardised capsules 250–500 mg up to 4×/day. Avoid >4 g/day with anticoagulants.',
    ev:'Cochrane review on ginger for nausea (2014); Bartels et al., Osteoarthritis Cartilage (2015); Daily et al., Pain Medicine (2015).'
  },
  {
    ic:'🌱', name:'Lemongrass', sub:'Cymbopogon citratus',
    uses:'Traditional African and South-East Asian remedy. Antibacterial and antifungal in vitro. Limited human trials suggest mild blood-pressure lowering and anxiolytic/sedative effects from inhalation. Some evidence for cholesterol modulation.',
    how:'Bruise 2–3 fresh stalks (lower white portion), simmer 10 min, strain. Drink 1–2 cups daily. Avoid medicinal doses during pregnancy.',
    ev:'Ekpenyong et al., J Med Food (2015); Costa et al., Phytotherapy Research (2011).'
  },
  {
    ic:'🟤', name:'Cloves', sub:'Syzygium aromaticum',
    uses:'<strong>Toothache and oral discomfort</strong> — topical clove oil (eugenol) is a long-recognised local anaesthetic; eugenol is used in dentistry. Antimicrobial. May aid blood-sugar regulation. Strong antioxidant content.',
    how:'For toothache: dab a drop of food-grade clove oil on a cotton swab against the affected tooth (do not swallow large amounts). In cooking: 2–3 whole cloves per pot. Excess eugenol can be hepatotoxic.',
    ev:'Cortés-Rojas et al., Asian Pac J Trop Biomed (2014); Alqareer et al., J Dent (2006).'
  },
  {
    ic:'🟡', name:'Turmeric / Curcumin', sub:'Curcuma longa',
    uses:'Anti-inflammatory and antioxidant. Curcumin has shown benefit in osteoarthritis (comparable to ibuprofen in some trials), ulcerative colitis (maintenance of remission), and mild depression as adjunctive treatment. Poorly absorbed alone — combine with piperine (black pepper) or fat.',
    how:'½–1 tsp per day in cooking. For therapeutic use, standardised curcumin 500 mg 2×/day with piperine 5 mg. Avoid in active gallstone disease and with anticoagulants.',
    ev:'Daily et al., J Med Food (2016); Kuptniratsaikul et al., Clin Interv Aging (2014); Lopresti et al., J Affect Disord (2014).'
  },
  {
    ic:'🧄', name:'Garlic', sub:'Allium sativum',
    uses:'Modest reduction in blood pressure (≈7–8 mmHg systolic in hypertensives), small LDL cholesterol reduction. Possible reduction in incidence of common cold. Allicin is the active sulfur compound.',
    how:'1–2 raw crushed cloves daily, or aged garlic extract 600–1,200 mg. Crush and let stand 10 min before cooking to preserve allicin. Avoid high doses before surgery (mild antiplatelet effect).',
    ev:'Ried et al., J Nutr (2016); Wang et al., Phytomedicine (2015).'
  },
  {
    ic:'🌶️', name:'Cayenne / Chilli', sub:'Capsicum annuum (capsaicin)',
    uses:'Topical capsaicin cream is established for neuropathic pain and post-herpetic neuralgia. Dietary intake associated in cohort studies with lower all-cause mortality. May modestly increase metabolic rate.',
    how:'In food to taste. Topical 0.025–0.075% cream applied to affected area (avoid mucous membranes; wash hands).',
    ev:'Derry et al., Cochrane Database (2017); Chopan & Littenberg, PLOS ONE (2017).'
  },
  {
    ic:'🍯', name:'Honey (raw)', sub:'Apis mellifera produce',
    uses:'Cough suppressant in children >1 year — at least as effective as dextromethorphan in some trials. Topical use on minor wounds (medical-grade Manuka). Mild antimicrobial. <strong>Not to be given to infants under 12 months</strong> due to botulism risk.',
    how:'For cough: 1–2 tsp before bed (children >1y). For wounds: medical-grade only, applied under dressing.',
    ev:'Oduwole et al., Cochrane Database (2018); Jull et al., Cochrane Database (2015).'
  },
  {
    ic:'🌿', name:'Hibiscus (Bissap, Sobolo, Zobo)', sub:'Hibiscus sabdariffa',
    uses:'A staple drink across West Africa. Meta-analyses show systolic blood pressure reduction ≈7 mmHg and modest LDL reduction. Diuretic effect. <strong>Avoid concentrated doses in pregnancy.</strong>',
    how:'Dried calyces steeped in hot water (1 tbsp per cup, 10 min). Best unsweetened or lightly sweetened. 2 cups daily for blood-pressure effect.',
    ev:'Serban et al., J Hypertens (2015); Hopkins et al., Fitoterapia (2013).'
  },
  {
    ic:'🌳', name:'Moringa', sub:'Moringa oleifera',
    uses:'Leaves are rich in protein, vitamin A, vitamin C, calcium, iron and potassium. Small trials suggest modest improvement in fasting glucose and lipid profile. Useful nutrient-density tool in food-insecure contexts.',
    how:'Fresh leaves cooked like spinach. Dried leaf powder 1–2 tsp/day stirred into food. Quality varies — buy from reputable sources.',
    ev:'Stohs & Hartman, Phytotherapy Research (2015); Anthanont et al., J Med Assoc Thai (2016).'
  },
  {
    ic:'🌿', name:'Bitter leaf', sub:'Vernonia amygdalina',
    uses:'Common in West African cooking. Animal and small human studies suggest modest reductions in fasting glucose and blood pressure. Traditional use for malaria; modern evidence is limited and it should not substitute for proven antimalarials.',
    how:'Used in soups after thorough washing to reduce bitterness. Medicinal doses not well standardised — consult a healthcare provider.',
    ev:'Ijeh & Ejike, J Med Plants Res (2011); Ong et al., J Ethnopharmacol (2011).'
  },
  {
    ic:'🍵', name:'Green tea', sub:'Camellia sinensis',
    uses:'Polyphenols (EGCG) associated with modest reductions in LDL cholesterol and small reductions in blood pressure. Inverse association with cardiovascular and total mortality in large cohorts. Modest thermogenic effect.',
    how:'2–3 cups/day. Avoid green tea extract supplements at high doses — case reports of hepatotoxicity.',
    ev:'Hartley et al., Cochrane Database (2013); Kuriyama et al., JAMA (2006).'
  },
  {
    ic:'🌿', name:'Peppermint', sub:'Mentha × piperita',
    uses:'Enteric-coated peppermint oil is effective for irritable bowel syndrome (IBS) symptom relief. Topical and inhaled use for tension headaches. May worsen reflux (relaxes lower oesophageal sphincter).',
    how:'For IBS: 0.2 mL enteric-coated capsule 3×/day before meals. As tea: 1 tsp dried leaves per cup, 10 min steep.',
    ev:'Khanna et al., J Clin Gastroenterol (2014); Alammar et al., BMC Complement Altern Med (2019).'
  },
  {
    ic:'🌿', name:'Aloe vera', sub:'Aloe barbadensis',
    uses:'Topical gel for minor burns and sunburn (modest evidence). Oral aloe latex (unprocessed) is a stimulant laxative — not recommended for chronic use; whole-leaf extract has been linked to colorectal tumours in animal studies.',
    how:'Topical fresh gel from inner leaf; commercial gels without aloin. <strong>Avoid oral whole-leaf or "yellow" aloe products.</strong>',
    ev:'Maenthaisong et al., Burns (2007); US NTP (2013) on whole-leaf aloe.'
  },
  {
    ic:'🥬', name:'Leafy greens (spinach, kale, ndolé, ugu, ewedu)', sub:'Brassicas & dark leaves',
    uses:'High in folate, lutein, zeaxanthin, vitamin K, magnesium, nitrates. Reduce risk of cardiovascular events; lutein and zeaxanthin reduce age-related macular degeneration progression. The nitrate content also supports modest blood-pressure reduction.',
    how:'1–2 cups/day cooked or raw. Vary types — combine cooked greens with vitamin C source to enhance iron absorption.',
    ev:'Pollock et al., JAHA (2018); AREDS2 trial, JAMA (2013).'
  },
  {
    ic:'🌰', name:'Nuts & seeds', sub:'almonds, walnuts, groundnuts, sesame, pumpkin',
    uses:'Each 28 g serving/day associated with ~20% lower cardiovascular mortality. Walnuts particularly rich in α-linolenic acid; almonds rich in vitamin E; pumpkin seeds for zinc and magnesium. Groundnuts (peanuts) need fresh storage — discard mouldy nuts (aflatoxin risk).',
    how:'30 g/day plain or lightly toasted. Avoid heavily salted or honey-roasted versions.',
    ev:'Aune et al., BMC Med (2016) — meta-analysis 819,000 participants.'
  },
  {
    ic:'🥑', name:'Avocado', sub:'Persea americana',
    uses:'Monounsaturated fat, fibre, potassium. Substituting avocado for saturated fat lowers LDL. Two recent prospective cohorts (Pacheco et al., JAHA 2022) reported lower cardiovascular event rates with regular intake.',
    how:'½ to 1 avocado daily replacing other fats. Watch overall calories.',
    ev:'Pacheco et al., JAHA (2022); Wang et al., J Am Heart Assoc (2015).'
  }
];

/* ============ BODY SYSTEM CONTENT ============ */
const SYSTEMS = {

  heart: {
    title:'Heart & Circulation',
    eyebrow:'Body Systems · Cardiovascular',
    intro:'Cardiovascular disease is the leading cause of death globally — but ~80% of premature heart attacks and strokes are preventable through diet, exercise, blood-pressure control, and not smoking. The targets below are evidence-based; they are also the same targets that reduce risk of dementia, kidney disease and many cancers.',
    keyNumbers:[
      {k:'Optimal blood pressure', v:'<120 / 80', s:'mmHg, untreated (AHA 2017)'},
      {k:'LDL cholesterol target', v:'<100 mg/dL', s:'<70 if high CV risk'},
      {k:'Fasting glucose', v:'<100 mg/dL', s:'HbA1c <5.7%'},
      {k:'Resting heart rate', v:'60–80 bpm', s:'lower = better generally'},
      {k:'Waist circumference', v:'<94 / 80 cm', s:'men / women'},
      {k:'Daily sodium', v:'<2,000 mg', s:'<5 g salt (WHO)'}
    ],
    tips:[
      {n:'01', h:'Adopt a DASH or Mediterranean pattern', p:'Both proven in RCTs to lower BP and cardiovascular events. Emphasise vegetables, fruits, whole grains, legumes, nuts, olive oil, fish; minimise red meat, processed meat, sweets, salt.', ev:'PREDIMED, NEJM 2018; DASH trial, NEJM 1997'},
      {n:'02', h:'Move 150–300 minutes per week', p:'Brisk walking counts. Add 2× weekly resistance training. A single bout of exercise lowers BP for ~24 h.', ev:'WHO Physical Activity Guidelines 2020'},
      {n:'03', h:'Salt: aim under 5 g (1 tsp) per day', p:'Most salt is hidden in bread, bouillon cubes, stock cubes, soy sauce, processed snacks. Use herbs, garlic, ginger, citrus, vinegars for flavour.', ev:'WHO Sodium Intake Guidelines 2012'},
      {n:'04', h:'Don\'t smoke; minimise alcohol', p:'Quitting halves CV risk within 1 year. WHO 2023: no safe alcohol level for CV risk either; light drinking is not protective once confounders are accounted for.', ev:'US Surgeon General 2020; WHO Europe 2023'},
      {n:'05', h:'Get 7–9 hours of sleep', p:'Both short (<6 h) and long (>9 h) sleep raise CV risk. Sleep apnoea is independently linked to hypertension — get evaluated if you snore loudly or feel unrefreshed.', ev:'Cappuccio et al., Sleep 2010'},
      {n:'06', h:'Know your numbers', p:'BP at home or pharmacy yearly from age 18. Lipid panel from age 20, then every 4–6 years (or more often if abnormal). HbA1c if overweight or family history of diabetes.', ev:'ACC/AHA Cardiovascular Risk Assessment'},
      {n:'07', h:'Cut ultra-processed foods', p:'+12% CV events per 10% increase in UPF intake (NutriNet-Santé). Hidden salt, sugar, refined oils, and emulsifiers do the damage.', ev:'Srour et al., BMJ 2019'},
      {n:'08', h:'Eat oily fish or take ALA-rich foods', p:'Two portions of oily fish (salmon, mackerel, sardines) per week, or daily walnuts and flax/chia seeds for plant-based α-linolenic acid.', ev:'WCRF/AICR 2018'},
      {n:'09', h:'Manage stress and connect socially', p:'Chronic stress raises cortisol, BP, and inflammation. Strong social ties reduce mortality more than many medications. Aim for daily real connection.', ev:'Holt-Lunstad et al., PLOS Med 2010'}
    ],
    warnings:[
      {h:'Symptoms not to ignore', p:'Chest pressure or pain (especially with exertion), shortness of breath, sudden severe headache, sudden weakness on one side, slurred speech, fainting, palpitations with chest pain. Call emergency services — do not drive yourself.'}
    ],
    foods:{
      eat:['Oily fish 2×/week (salmon, mackerel, sardines)', 'Olive oil as primary fat', 'Legumes (beans, lentils) ≥3×/week', '30 g nuts daily', 'Vegetables ≥3 portions daily', 'Whole grains over refined', 'Berries, citrus, leafy greens', 'Hibiscus (bissap/sobolo) — lowers BP'],
      avoid:['Processed meat (bacon, sausage, deli)', 'Sugar-sweetened beverages', 'Trans fats and reused frying oil', 'Excess salt — bouillon cubes, soy sauce, instant noodles', 'Heavy alcohol intake', 'Excess refined carbohydrates']
    }
  },

  sleep: {
    title:'Sleep & Recovery',
    eyebrow:'Body Systems · Sleep',
    intro:'Sleep is not lost time — it is when memory is consolidated, hormones are calibrated, the brain clears metabolic waste (including β-amyloid implicated in Alzheimer\'s), and immune surveillance is sharpened. Chronic short sleep (<6 h) is independently associated with cardiovascular disease, obesity, diabetes, depression and certain cancers.',
    keyNumbers:[
      {k:'Adults', v:'7–9 h', s:'per night (NSF/AASM)'},
      {k:'Teenagers (14–17)', v:'8–10 h', s:'per night'},
      {k:'Children (6–13)', v:'9–11 h', s:'per night'},
      {k:'Time to fall asleep', v:'10–20 min', s:'optimal range'},
      {k:'Cycle length', v:'~90 min', s:'~4–6 cycles/night'},
      {k:'REM sleep', v:'~20–25%', s:'of total sleep'}
    ],
    tips:[
      {n:'01', h:'Anchor a consistent schedule', p:'Same bedtime and wake time — including weekends. Variability disrupts the circadian rhythm even if total sleep is adequate.', ev:'Walker, Why We Sleep'},
      {n:'02', h:'Use morning daylight', p:'Get 10–30 min of bright outdoor light within an hour of waking. This is the strongest signal to set your circadian clock.', ev:'Wright et al., Curr Biol 2013'},
      {n:'03', h:'Dim and cool the bedroom', p:'~18°C (65°F) is ideal. Block all sources of light; the bedroom should be dark enough that you cannot see your hand in front of your face.', ev:'NIH Sleep Disorders Research'},
      {n:'04', h:'Limit caffeine after midday', p:'Caffeine has a half-life of 5–6 hours. A 3 p.m. coffee leaves a quarter of the dose in your system at midnight.', ev:'Drake et al., J Clin Sleep Med 2013'},
      {n:'05', h:'No alcohol within 3 hours of bed', p:'Alcohol sedates but suppresses REM sleep and causes second-half-of-night awakenings. You will feel unrefreshed.', ev:'Ebrahim et al., Alcohol Clin Exp Res 2013'},
      {n:'06', h:'Dim screens 1–2 h before bed', p:'Blue light suppresses melatonin. Use night-shift mode, dim lighting, or read paper. Avoid bed for anything but sleep and intimacy.', ev:'Chang et al., PNAS 2015'},
      {n:'07', h:'Get screened if you snore loudly', p:'Obstructive sleep apnoea is common, frequently undiagnosed, and a strong independent CV risk factor. CPAP transforms quality of life when needed.', ev:'AASM Clinical Practice Guidelines'},
      {n:'08', h:'Wind-down ritual', p:'Last 30–60 min: dim lights, gentle stretching, warm shower, reading, or breathing exercises. Avoid distressing news and emotionally charged conversations.', ev:'Behavioural sleep medicine, CBT-I'},
      {n:'09', h:'If you can\'t sleep — get up', p:'After 20 min of wakefulness, leave the bed; do something calm in dim light until you feel sleepy. Keeps the bed associated with sleep.', ev:'CBT-I core technique'}
    ]
  },

  brain: {
    title:'Brain & Mental Health',
    eyebrow:'Body Systems · Neurological',
    intro:'The brain is built and maintained by the same lifestyle factors that protect the heart, plus a few unique to cognition: learning, social engagement, and adequate sleep. Modifiable risk factors account for ~40% of dementia cases (Lancet Commission, 2020). Mental health and brain health are tightly linked — both respond strongly to exercise, sleep, social connection and a sense of purpose.',
    keyNumbers:[
      {k:'Modifiable dementia risk', v:'~40%', s:'Lancet Commission 2020'},
      {k:'Exercise effect on depression', v:'Comparable', s:'to SSRIs (mild-moderate)'},
      {k:'Adult learning impact', v:'+25–30%', s:'reduction in cognitive decline'},
      {k:'Hearing loss & dementia', v:'Largest single', s:'mid-life risk factor'},
      {k:'Sleep & β-amyloid', v:'Cleared in sleep', s:'glymphatic system'}
    ],
    tips:[
      {n:'01', h:'Move your body daily', p:'Aerobic exercise raises BDNF (brain-derived neurotrophic factor), improves mood, and reduces dementia risk by 28–35% in large cohort studies.', ev:'Erickson et al., PNAS 2011'},
      {n:'02', h:'Treat hearing loss early', p:'Mid-life hearing loss is the single largest modifiable risk factor for later dementia. Hearing aids substantially reduce 3-year cognitive decline in at-risk adults.', ev:'Lin et al., Lancet 2023 (ACHIEVE trial)'},
      {n:'03', h:'Stay socially engaged', p:'Loneliness raises mortality risk equivalent to ~15 cigarettes/day and accelerates cognitive decline. Prioritise close relationships and weak ties.', ev:'Holt-Lunstad et al., PLOS Med 2010'},
      {n:'04', h:'Keep learning', p:'Education at any age, novel skills, language learning, music — all build cognitive reserve. Crossword puzzles alone are not enough; novelty matters.', ev:'Lancet Commission on Dementia 2020'},
      {n:'05', h:'Protect your sleep (see Sleep)', p:'During deep sleep, the glymphatic system clears β-amyloid and other neurotoxic metabolites. Chronic short sleep accelerates Alzheimer\'s pathology.', ev:'Xie et al., Science 2013'},
      {n:'06', h:'Eat for the brain', p:'MIND diet (Mediterranean + DASH + leafy greens, berries, nuts, olive oil, fish) associated with up to 53% lower Alzheimer\'s risk in adherent followers.', ev:'Morris et al., Alzheimer\'s Dement 2015'},
      {n:'07', h:'Manage cardiovascular risk', p:'Hypertension, diabetes, obesity and smoking in mid-life are all dementia risk factors. What\'s good for the heart is good for the brain.', ev:'Lancet Commission on Dementia 2020'},
      {n:'08', h:'Seek help for low mood early', p:'Depression and anxiety are highly treatable. CBT, exercise, and (where indicated) medication are effective. Reach out to a primary-care clinician or mental-health professional.', ev:'NICE Guidelines on Depression in Adults'},
      {n:'09', h:'Limit alcohol and avoid head injury', p:'>21 units/week of alcohol is a dementia risk factor; wearing helmets and seatbelts reduces traumatic brain injury risk.', ev:'Lancet Commission on Dementia 2020'}
    ]
  },

  gut: {
    title:'Gut & Digestive Health',
    eyebrow:'Body Systems · Digestive',
    intro:'The gut is more than digestion: it houses 70% of the immune system, produces neurotransmitters (including ~90% of the body\'s serotonin), and harbours a microbial ecosystem that influences mood, metabolism and immunity. A diverse, fibre-fed microbiome is one of the most accessible health interventions.',
    keyNumbers:[
      {k:'Fibre target (adults)', v:'25–30 g', s:'per day; most adults eat 10–15'},
      {k:'Plant variety', v:'30+ plants', s:'per week (Spector et al.)'},
      {k:'Gut microbes', v:'≈100 trillion', s:'cells; 1000+ species'},
      {k:'Water', v:'≈2–3 L', s:'fluid total per day'},
      {k:'Sitting on toilet', v:'<10 min', s:'longer raises haemorrhoid risk'}
    ],
    tips:[
      {n:'01', h:'Eat 30+ different plant foods per week', p:'Microbial diversity tracks plant diversity. Count vegetables, fruits, whole grains, legumes, nuts, seeds, herbs and spices separately.', ev:'McDonald et al., mSystems 2018 (American Gut)'},
      {n:'02', h:'Hit 25–30 g of fibre daily', p:'Beans, lentils, whole grains, vegetables, fruits, seeds. Insoluble fibre (bran, vegetables) adds bulk; soluble fibre (oats, beans, fruit) feeds microbes.', ev:'Reynolds et al., Lancet 2019'},
      {n:'03', h:'Include fermented foods', p:'Yoghurt, kefir, sauerkraut, kimchi, miso, traditional sour porridges (ogi, ji), garri-based ferments. Increase microbiome diversity and reduce inflammation markers.', ev:'Wastyk et al., Cell 2021 (Stanford)'},
      {n:'04', h:'Drink enough water', p:'Constipation, kidney stones and dehydration headaches all respond to adequate fluid. Pale yellow urine is the simplest indicator.', ev:'EFSA Tolerable Intake for Water'},
      {n:'05', h:'Cut ultra-processed food', p:'Emulsifiers (polysorbate 80, CMC) and artificial sweeteners alter the gut microbiome and mucus layer in animal and recent human studies.', ev:'Chassaing et al., Nature 2015'},
      {n:'06', h:'Move regularly', p:'Even moderate aerobic activity improves intestinal motility and microbiome composition independently of diet.', ev:'Allen et al., Med Sci Sports Exerc 2018'},
      {n:'07', h:'Manage stress', p:'The gut-brain axis is bidirectional. Chronic stress alters motility, increases visceral sensitivity, and changes the microbiome.', ev:'Mayer, Nat Rev Neurosci 2011'},
      {n:'08', h:'Don\'t over-use antibiotics', p:'Take only when needed; finish the prescribed course. Each course measurably perturbs gut flora for weeks to months.', ev:'CDC Antibiotic Stewardship'},
      {n:'09', h:'Get screened for colorectal cancer', p:'From age 45 (USPSTF 2021) for average-risk adults — earlier with family history. FIT testing, colonoscopy, or stool DNA test, depending on local guidelines.', ev:'USPSTF 2021'}
    ],
    warnings:[
      {h:'Red-flag symptoms', p:'Blood in stool, unexplained weight loss, persistent change in bowel habit, abdominal pain that wakes you at night, difficulty swallowing, vomiting blood. See a healthcare provider promptly.'}
    ]
  },

  kidneys: {
    title:'Kidneys & Liver',
    eyebrow:'Body Systems · Filtration & Detox',
    intro:'The kidneys filter ~180 L of blood daily; the liver processes nearly every nutrient and drug you absorb. Both organs are silent — chronic kidney disease and fatty liver typically present no symptoms until significantly advanced. Protect them by managing blood pressure, glucose, body weight, alcohol and over-the-counter painkiller use.',
    keyNumbers:[
      {k:'Optimal eGFR', v:'≥90', s:'mL/min/1.73 m² (varies with age)'},
      {k:'Urine albumin (ACR)', v:'<30 mg/g', s:'creatinine ratio'},
      {k:'Daily water', v:'2–3 L', s:'unless restricted by physician'},
      {k:'Salt limit', v:'<5 g/day', s:'major kidney protector'},
      {k:'NAFLD prevalence', v:'~30%', s:'of adults globally'},
      {k:'Alcohol limit', v:'<14 units/wk', s:'lower for liver disease'}
    ],
    tips:[
      {n:'01', h:'Control blood pressure aggressively', p:'Hypertension is the leading cause of CKD globally after diabetes. Home BP monitoring catches white-coat and masked hypertension.', ev:'KDIGO 2021 BP Guidelines'},
      {n:'02', h:'Manage diabetes / pre-diabetes', p:'Tight glycaemic control prevents and slows diabetic kidney disease. Annual urine albumin screening if you have diabetes.', ev:'ADA Standards of Care'},
      {n:'03', h:'Hydrate consistently', p:'2–3 L of fluid daily (mostly water) reduces kidney stone risk by ~50%. Pale yellow urine is the target. (Restricted in established CKD.)', ev:'AUA Stone Guidelines 2014'},
      {n:'04', h:'Limit NSAIDs (ibuprofen, diclofenac, naproxen)', p:'Chronic NSAID use damages kidneys and increases CV risk. Use paracetamol/acetaminophen where appropriate, at recommended doses.', ev:'KDIGO; FDA labelling'},
      {n:'05', h:'Cut salt', p:'High sodium raises BP and intra-glomerular pressure. <5 g salt/day. Hidden in bouillon, soy sauce, stock cubes, processed bread.', ev:'WHO 2012'},
      {n:'06', h:'Minimise alcohol — protect the liver', p:'Even "moderate" drinking is implicated in fatty liver. <14 units/week is a cautious threshold; lower if liver enzymes are abnormal.', ev:'NICE Cirrhosis Guidelines'},
      {n:'07', h:'Avoid herbal "kidney cleanses" and unregulated supplements', p:'Many traditional remedies contain aristolochic acid (nephrotoxic, carcinogenic) or are contaminated with heavy metals. "Detox" is what the liver and kidneys already do.', ev:'Debelle et al., Kidney Int 2008'},
      {n:'08', h:'Don\'t mix paracetamol with heavy alcohol', p:'Acute liver failure from paracetamol overdose is the leading cause of acute liver failure in many countries. Stay within recommended doses (typically ≤3 g/day in adults).', ev:'FDA paracetamol guidance'},
      {n:'09', h:'Get vaccinated against hepatitis B; test for hepatitis C', p:'Both are leading causes of liver cancer. HBV vaccine is highly effective; HCV is now curable with direct-acting antivirals.', ev:'WHO Hepatitis Programme'}
    ]
  },

  skin: {
    title:'Skin Health',
    eyebrow:'Body Systems · Integument',
    intro:'The largest organ in the body, the skin is also your first line of defence and a window into systemic health. Skin cancer is the most common cancer worldwide and almost entirely preventable. Inflammatory skin conditions (acne, eczema, psoriasis) are increasingly recognised as having systemic and dietary contributors.',
    keyNumbers:[
      {k:'Sun protection', v:'SPF 30+', s:'broad-spectrum, reapply 2-hourly'},
      {k:'UV index threshold', v:'≥3', s:'time to seek shade & sunscreen'},
      {k:'Skin self-exam', v:'Monthly', s:'note new or changing moles'},
      {k:'Water', v:'≈2 L/day', s:'plays a modest role in skin hydration'},
      {k:'Sleep impact', v:'>30%', s:'increase in skin ageing biomarkers with poor sleep'}
    ],
    tips:[
      {n:'01', h:'Daily broad-spectrum SPF 30+', p:'Year-round, even in cloudy weather. Reapply every 2 hours outdoors and after swimming. The single most evidence-based anti-ageing intervention.', ev:'Hughes et al., Ann Intern Med 2013'},
      {n:'02', h:'Apply ABCDE rule to moles', p:'<strong>A</strong>symmetry, <strong>B</strong>order irregularity, <strong>C</strong>olour variation, <strong>D</strong>iameter >6 mm, <strong>E</strong>volution. Any "ugly duckling" mole that looks different from your others deserves dermatologist review.', ev:'Skin Cancer Foundation'},
      {n:'03', h:'Don\'t use tanning beds', p:'IARC Group 1 carcinogen. Each use raises melanoma risk — particularly for use before age 35.', ev:'IARC Vol. 100D'},
      {n:'04', h:'Gentle cleansing twice daily', p:'Lukewarm water, mild non-soap cleanser. Hot water and harsh soaps strip the skin barrier. Pat dry; moisturise within 3 minutes of washing.', ev:'AAD Clinical Guidelines'},
      {n:'05', h:'For acne — minimise dairy, sugar and ultra-processed food', p:'High-glycaemic loads and possibly skim-milk dairy worsen acne. Topical retinoids and benzoyl peroxide remain first-line treatments.', ev:'Smith et al., Am J Clin Nutr 2007'},
      {n:'06', h:'Quit smoking', p:'Accelerates skin ageing through ~150 mechanisms; slows wound healing; doubles risk of skin cancer recurrence.', ev:'Morita, Inflammopharmacology 2007'},
      {n:'07', h:'Manage stress and sleep', p:'Stress flares eczema, psoriasis, acne, and rosacea. Sleep deprivation increases TEWL (trans-epidermal water loss) and ages the skin.', ev:'Oyetakin-White et al., Clin Exp Dermatol 2015'},
      {n:'08', h:'Patch-test new skincare', p:'Apply a small amount to the inner forearm daily for 5 days before full-face use. Especially important with retinoids, AHAs, and essential oils.', ev:'AAD'},
      {n:'09', h:'See a dermatologist for changing moles, persistent rashes, or non-healing sores', p:'Don\'t wait — most skin cancers caught early are entirely curable.', ev:'AAD; Skin Cancer Foundation'}
    ]
  },

  eyes: {
    title:'Eye Health & Vision',
    eyebrow:'Body Systems · Vision',
    intro:'The two leading causes of preventable blindness — cataract and age-related macular degeneration — both have modifiable risk factors. Children\'s vision is being reshaped by indoor lifestyles: global myopia is rising fast and predicted to affect half the world\'s population by 2050.',
    keyNumbers:[
      {k:'Comprehensive exam', v:'1–2 yrs', s:'after age 40; more often with risk factors'},
      {k:'Outdoor time (children)', v:'≥2 h/day', s:'protects against myopia'},
      {k:'20-20-20 rule', v:'20s/20ft', s:'every 20 min of screen time'},
      {k:'UV protection', v:'UV400', s:'sunglasses year-round'},
      {k:'AMD prevention', v:'Lutein/zeaxanthin', s:'leafy greens, eggs, AREDS2'}
    ],
    tips:[
      {n:'01', h:'Get a comprehensive eye exam', p:'Includes intraocular pressure (glaucoma screening), dilated retinal exam, and visual acuity. Even with no symptoms, every 2 years from age 40.', ev:'American Academy of Ophthalmology'},
      {n:'02', h:'Wear UV-blocking sunglasses', p:'Look for UV400 / 100% UV protection. UV exposure is implicated in cataract, pterygium, and macular degeneration.', ev:'WHO Solar UV'},
      {n:'03', h:'Practise the 20-20-20 rule', p:'Every 20 minutes of near work, look at something 20 feet (6 m) away for 20 seconds. Blink fully. Reduces digital eye strain.', ev:'AAO Position Statement'},
      {n:'04', h:'For children — outdoor time matters', p:'≥2 hours of daylight outdoor play daily delays myopia onset. Once myopia develops, slowing progression is much harder than preventing onset.', ev:'Sherwin et al., Ophthalmology 2012'},
      {n:'05', h:'Eat leafy greens daily', p:'Lutein and zeaxanthin (kale, spinach, ndolé, ugu, ewedu, eggs, corn) protect the macula. The AREDS2 formula slows AMD progression in those with intermediate AMD.', ev:'AREDS2 trial, JAMA 2013'},
      {n:'06', h:'Manage diabetes and blood pressure', p:'Diabetic retinopathy is the leading cause of blindness in working-age adults. Tight glycaemic and BP control prevents and slows progression.', ev:'DCCT/EDIC; UKPDS'},
      {n:'07', h:'Don\'t smoke', p:'Smoking doubles the risk of AMD and accelerates cataract development.', ev:'AAO Smoking and Eye Disease'},
      {n:'08', h:'Use proper eye protection for work and sport', p:'Most eye injuries are preventable — wear safety glasses for grinding, drilling, and woodwork; sport-specific eyewear for racket sports.', ev:'AAO Eye Trauma Prevention'},
      {n:'09', h:'Don\'t ignore sudden symptoms', p:'Sudden vision loss, flashes of light, a curtain or shadow across vision, severe eye pain — go to the emergency department. Could be retinal detachment, acute glaucoma, or stroke.', ev:'AAO Urgent Symptoms Guidance'}
    ]
  },

  women: {
    title:'Women\'s Health',
    eyebrow:'Body Systems · Women\'s Health',
    intro:'A focused summary of preventive and reproductive health priorities through the lifespan. The single largest gains come from screening (cervical, breast), vaccination (HPV), and managing modifiable risks (smoking, alcohol, weight, sedentary behaviour).',
    keyNumbers:[
      {k:'HPV vaccine', v:'Ages 9–26', s:'catch-up to 45'},
      {k:'Cervical screening', v:'Every 3–5 yrs', s:'from age 21–25 (region-dependent)'},
      {k:'Mammography', v:'Every 1–2 yrs', s:'typically from 40–50'},
      {k:'Folic acid', v:'400 μg/day', s:'before & in early pregnancy'},
      {k:'Iron-rich foods', v:'Daily', s:'esp. menstruating women'}
    ],
    tips:[
      {n:'01', h:'HPV vaccination', p:'Prevents ~90% of cervical cancers and a substantial share of anal, oropharyngeal, vulvar and vaginal cancers. Recommended ages 9–26, catch-up to 45 in some guidelines.', ev:'CDC, ACIP recommendations'},
      {n:'02', h:'Cervical screening', p:'HPV testing or Pap smear from age 21–25 (region-dependent), every 3–5 years. The single most impactful cancer screening programme ever introduced.', ev:'USPSTF, WHO Cervical Cancer Elimination'},
      {n:'03', h:'Breast self-awareness and screening', p:'Know what your breasts normally feel like; report changes (lumps, skin changes, nipple discharge, retraction) promptly. Mammography schedule per local guidelines, generally from 40–50.', ev:'USPSTF; ACS'},
      {n:'04', h:'Manage iron and folate intake', p:'Heavy menstrual periods and pregnancy increase iron needs. Folate (leafy greens, legumes, fortified grains) prevents neural tube defects — start before conception.', ev:'WHO Maternal Nutrition Guidelines'},
      {n:'05', h:'Pelvic floor — at every life stage', p:'Daily Kegels (slow squeezes, 10–15 reps, 3 sets) reduce stress incontinence risk and support recovery after childbirth. Pelvic-floor physiotherapy is highly effective.', ev:'NICE Urinary Incontinence Guidelines'},
      {n:'06', h:'Bone health from mid-life', p:'Adequate calcium (1000–1200 mg/day), vitamin D (600–800 IU), weight-bearing exercise, and avoiding smoking and excess alcohol. DEXA scan around menopause if risk factors.', ev:'NOF/USPSTF Osteoporosis Guidelines'},
      {n:'07', h:'Menopause — get informed', p:'Hot flushes, sleep disturbance, mood changes and vaginal dryness are treatable. Modern menopausal hormone therapy (MHT/HRT) has a favourable risk-benefit profile for many women in early menopause. Discuss with a knowledgeable clinician.', ev:'NICE NG23 Menopause; NAMS 2022 Position'},
      {n:'08', h:'Don\'t smoke; minimise alcohol', p:'Smoking accelerates menopause and raises every cancer-relevant risk. Even 1 drink/day raises breast cancer risk ~7–10%.', ev:'WHO Europe 2023; IARC'},
      {n:'09', h:'Get help for heavy or painful periods', p:'They are common but not normal if they limit your life. Endometriosis, fibroids and adenomyosis are treatable. Don\'t wait years.', ev:'NICE Heavy Menstrual Bleeding Guidelines'}
    ]
  },

  men: {
    title:'Men\'s Health',
    eyebrow:'Body Systems · Men\'s Health',
    intro:'Men globally die ~5 years younger than women. Most of the gap is preventable: cardiovascular disease, cancer, suicide and accidents account for the majority of avoidable male deaths. The interventions below address the highest-leverage points.',
    keyNumbers:[
      {k:'BP screening', v:'Yearly', s:'from age 18'},
      {k:'Cholesterol', v:'Every 4–6 yrs', s:'from age 20'},
      {k:'Colorectal screening', v:'From age 45', s:'(USPSTF 2021)'},
      {k:'Prostate (PSA)', v:'Shared decision', s:'from age 50 (or 45 with risk factors)'},
      {k:'Waist circumference', v:'<94 cm', s:'<90 cm South Asian'},
      {k:'Testicular self-exam', v:'Monthly', s:'ages 15–35'}
    ],
    tips:[
      {n:'01', h:'Know your numbers', p:'BP yearly from 18. Cholesterol from 20. HbA1c if overweight, family history of diabetes, or over 45. Most men avoid the GP until something is wrong — schedule a baseline visit.', ev:'USPSTF preventive screening'},
      {n:'02', h:'Colorectal screening from 45', p:'FIT, colonoscopy, or stool DNA. Highly effective; men have higher colorectal cancer incidence than women. Earlier if family history.', ev:'USPSTF 2021'},
      {n:'03', h:'Prostate — informed shared decision', p:'PSA screening has both benefits and harms. Discuss with your clinician from age 50 (45 if Black or family history). African and African-descent men have higher prostate cancer risk and earlier onset.', ev:'AUA 2023; USPSTF 2018'},
      {n:'04', h:'Testicular self-exam', p:'Monthly from teens to ~35. Most testicular cancers are highly curable when caught early. Any new lump or change deserves evaluation.', ev:'AUA Testicular Cancer Guidelines'},
      {n:'05', h:'Don\'t ignore mental health', p:'Men are less likely to seek help and have higher suicide rates. Symptoms of depression in men often present as irritability, anger, risk-taking, or substance use rather than sadness.', ev:'WHO; Movember Foundation'},
      {n:'06', h:'Move and strength-train', p:'Resistance training 2×/week preserves muscle mass, testosterone, and bone density. Aerobic + resistance is the most cardio-protective combination.', ev:'WHO Physical Activity Guidelines 2020'},
      {n:'07', h:'Address erectile dysfunction as a vascular warning', p:'New-onset ED in middle-aged men often precedes a cardiovascular event by 3–5 years. Don\'t self-treat with online pills — get assessed.', ev:'Inman et al., Mayo Clin Proc 2009'},
      {n:'08', h:'Drink less alcohol', p:'Men are more likely to exceed risky drinking thresholds. <14 units/week, ideally lower. Several alcohol-free days per week.', ev:'NHS Alcohol Guidelines'},
      {n:'09', h:'Hearing protection', p:'Noise-induced hearing loss is irreversible. Use ear protection for power tools, motorcycles, concerts, range shooting. Mid-life hearing loss is the largest single dementia risk factor.', ev:'NIDCD; Lancet Commission Dementia 2020'}
    ]
  }
};

/* ============ AFRICAN DIET ============ */
const AFRICAN_FOODS = [
  // Good
  {nm:'Plantain (boiled, steamed)', cat:'good', desc:'Resistant starch, potassium, vitamin A. Best boiled, steamed or roasted in the skin. Avoid heavily fried "kelewele" or "dodo" daily.', why:'Glycaemic load lower than refined grains'},
  {nm:'Beans, cowpeas, black-eyed peas (red beans, niebe)', cat:'good', desc:'Excellent protein, fibre, folate, iron. Replace some red meat with beans 3–4 times/week.', why:'Plant protein, low fat, high fibre'},
  {nm:'Dark leafy greens (ndolé, ugu, ewedu, cassava leaves, sokoyokoto)', cat:'good', desc:'Folate, vitamin K, lutein, iron. Eat daily where available. Cook briefly to preserve nutrients.', why:'Cardiovascular, eye, neural protection'},
  {nm:'Whole grains: brown rice, fonio, sorghum, millet, teff', cat:'good', desc:'Better than refined white rice. Fonio in particular has a low glycaemic index and is rich in amino acids.', why:'Slower glucose rise, more fibre'},
  {nm:'Fish (especially fresh, not heavily smoked)', cat:'good', desc:'Tilapia, mackerel, sardines provide omega-3s. Two portions of oily fish weekly are cardio-protective.', why:'Omega-3s, lean protein'},
  {nm:'Avocado (Pear, Ube)', cat:'good', desc:'Healthy monounsaturated fats, potassium, fibre. Excellent replacement for spreads with saturated fat.', why:'Cardio-protective fat profile'},
  {nm:'Groundnuts (peanuts) — fresh, unsalted', cat:'good', desc:'Protein, vitamin E, magnesium. Crucial: discard mouldy or discoloured nuts (aflatoxin risk) and store cool and dry.', why:'Cardio-protective, but storage matters'},
  {nm:'Garlic, ginger, onion', cat:'good', desc:'Modest blood pressure and cholesterol benefits. Easily incorporated daily.', why:'Cardiovascular, anti-inflammatory'},
  {nm:'Hibiscus tea (bissap, sobolo, zobo)', cat:'good', desc:'Lowers BP (≈7 mmHg systolic in meta-analyses). Drink unsweetened or lightly sweetened.', why:'Polyphenols, anthocyanins'},

  // Caution
  {nm:'Palm oil (refined / heated repeatedly)', cat:'mid', desc:'Unrefined red palm oil contains carotenoids and vitamin E and is fine in moderate amounts. Repeatedly reused or heavily refined palm oil contains oxidised fats and possible carcinogens.', why:'Use moderately; avoid reused oil'},
  {nm:'Fufu, gari, eba, tô, posho (refined cassava/maize)', cat:'mid', desc:'High glycaemic load; low fibre and protein. Reduce portion size; pair with abundant vegetables and protein. Fermented versions (gari, ji) are healthier.', why:'Refined carbohydrate-heavy'},
  {nm:'Smoked / dried fish and meat', cat:'mid', desc:'High in salt, sometimes contains PAHs from smoking. Use sparingly as flavouring rather than as main protein.', why:'Salt, PAHs, possible additives'},
  {nm:'White rice (used as staple)', cat:'mid', desc:'Refined; spikes glucose. Replace some portions with brown rice, fonio, or pulses.', why:'High glycaemic index'},
  {nm:'Bouillon cubes (Maggi, Knorr, Royco)', cat:'mid', desc:'A single cube can contain 1.5–2 g sodium. Use sparingly, or substitute with garlic, ginger, herbs, lemon, vinegar.', why:'Major hidden source of salt and MSG'},
  {nm:'Sugary drinks and "malt" drinks', cat:'bad', desc:'Some "malt" beverages contain 30+ g sugar per bottle — comparable to soda. Limit strictly.', why:'Obesity, diabetes, fatty liver'},

  // Bad
  {nm:'Heavily fried street food (deep-fried in reused oil)', cat:'bad', desc:'Repeatedly heated oils accumulate oxidised lipids, aldehydes, and acrylamide. Limit deep-fried plantain chips, puff-puff, akara, suya done in old oil.', why:'Oxidised lipids, acrylamide, trans fats'},
  {nm:'Charred suya, kebabs, grilled goat-meat', cat:'bad', desc:'Heavy char and direct flame produces HCAs and PAHs. Don\'t eat blackened crusts; marinate first; cook over indirect heat.', why:'HCAs and PAHs (carcinogens)'},
  {nm:'Processed sausage, corned beef, luncheon meat', cat:'bad', desc:'IARC Group 1 carcinogen (processed meat). Treat as occasional, not staple.', why:'Nitrites, salt, carcinogens'},
  {nm:'Sweet biscuits, cake, chin-chin in excess', cat:'bad', desc:'Refined sugar, refined flour, often palm oil. Treat as treats, not daily foods.', why:'Glycaemic load, ultra-processed'},
  {nm:'Salted, dried "stockfish" / okporoko in excess', cat:'mid', desc:'Very high in salt. Use as flavour-base in small amounts; rinse before use.', why:'Major sodium source'}
];

const COOKING_METHODS = [
  {method:'Steaming', rating:'best', cls:'best', forms:'Minimal nutrient loss, no added fat, no carcinogen formation', use:'Vegetables, fish, dumplings (e.g. moin-moin, koki)', notes:'Best overall for preserving water-soluble vitamins.'},
  {method:'Boiling / poaching', rating:'best', cls:'best', forms:'Some water-soluble vitamin loss; no carcinogens', use:'Yam, plantain, beans, soups, stews', notes:'Use the cooking liquid where possible (in stews) to retain nutrients.'},
  {method:'Braising / stewing (slow-cooked)', rating:'best', cls:'best', forms:'Negligible HCAs/PAHs; tenderises tougher cuts', use:'Stews, soups, ofada-style sauces, classic groundnut and palm-nut soups', notes:'Excellent traditional method — preserves flavour and nutrients.'},
  {method:'Roasting / baking (moderate temp, <200°C)', rating:'good', cls:'good', forms:'Modest acrylamide in starches; minimal HCAs in meats', use:'Whole fish, sweet potatoes, plantain, breads', notes:'Cook to golden, not brown. Use parchment to avoid blackening.'},
  {method:'Grilling on direct flame / open coals', rating:'caution', cls:'caution', forms:'HCAs and PAHs formation in meat', use:'Suya, chicken, fish, kebabs', notes:'Marinate first (cuts HCAs ≈90%); avoid char; don\'t let fat drip onto coals; flip frequently; eat in moderation.'},
  {method:'Pan-frying (fresh oil, moderate heat)', rating:'good', cls:'good', forms:'Some oxidation if oil is overheated', use:'Eggs, fish, vegetables', notes:'Use enough oil to prevent sticking; don\'t exceed smoke point; don\'t reuse the oil more than once.'},
  {method:'Deep frying (fresh oil, controlled temp)', rating:'caution', cls:'caution', forms:'Acrylamide in starches, trans fats, oxidised lipids', use:'Akara, puff-puff, plantain chips, fried fish', notes:'Limit frequency; cook to golden not brown; never reuse oil more than 1–2 times; cool oil between uses; discard if it smells rancid or smokes at low temp.'},
  {method:'Deep frying in reused / overheated oil', rating:'bad', cls:'bad', forms:'Trans fats, polar compounds, 4-hydroxy-2-nonenal, acrylamide', use:'Avoided. Common in street food where margin pressure leads to oil reuse.', notes:'Strongly linked to inflammation, cardiovascular disease, cancer risk.'},
  {method:'Charcoal-grilled with heavy char', rating:'bad', cls:'bad', forms:'High HCAs, PAHs', use:'Limit charred suya, "well done" steak, blackened fish skin', notes:'Cut off blackened portions; marinate; cook over indirect heat.'},
  {method:'Smoking (heavy traditional smoking)', rating:'bad', cls:'bad', forms:'PAHs, formaldehyde, nitrosamines', use:'Smoked fish, smoked meat — common across West Africa', notes:'Use as flavouring sparingly, not as daily staple.'}
];

/* ============ QUIZZES ============ */
const QUIZZES = [
  {
    id:'q-carcinogens',
    title:'Carcinogens: how well do you know the IARC categories?',
    intro:'Six questions on how the world\'s leading cancer-research agency classifies risks.',
    questions:[
      {q:'What does IARC Group 1 mean?', opts:['Definitely will cause cancer if exposed','Carcinogenic to humans — strong evidence the agent can cause cancer','The most toxic substances known','Banned in all countries'], a:1, exp:'Group 1 describes the strength of evidence (sufficient to conclude the agent can cause cancer), not the magnitude of individual risk. Tobacco, processed meat, asbestos, alcohol and UV radiation are all Group 1, but the risk per exposure varies enormously.'},
      {q:'Processed meat (bacon, sausage, ham) is classified by IARC as:', opts:['Group 1 — carcinogenic to humans','Group 2A — probably carcinogenic','Group 2B — possibly carcinogenic','Not classified'], a:0, exp:'IARC Vol. 114 (2015) classified processed meat as Group 1. Each 50 g/day raises colorectal cancer risk by ~18%.'},
      {q:'Which is the most potent natural carcinogen below, contaminating poorly stored grains and nuts?', opts:['Capsaicin','Aflatoxin B1','Caffeic acid','Solanine'], a:1, exp:'Aflatoxin B1 (from Aspergillus moulds) is among the most potent hepatocarcinogens known. Buy fresh, store dry, discard mouldy nuts and grains.'},
      {q:'According to the 2023 WHO Europe position, the safe level of alcohol with respect to cancer is:', opts:['Up to 1 drink/day','Up to 2 drinks/day for men, 1 for women','Up to 5 drinks/week','No safe level'], a:3, exp:'WHO Europe (2023) concluded that no level of alcohol consumption is safe with respect to cancer risk. Even 1 drink/day raises breast cancer risk ~7–10%.'},
      {q:'Aspartame was classified by IARC in 2023 as:', opts:['Group 1','Group 2A','Group 2B — possibly carcinogenic','Group 3 — not classifiable'], a:2, exp:'In July 2023 IARC classified aspartame as Group 2B based on limited evidence for hepatocellular carcinoma. JECFA retained the acceptable daily intake (ADI) of 40 mg/kg body weight.'},
      {q:'Solar UV radiation causes which of the following skin cancers?', opts:['Only melanoma','Only basal cell carcinoma','Basal cell, squamous cell and melanoma','None — UV is not carcinogenic'], a:2, exp:'IARC Group 1. UV causes basal cell carcinoma, squamous cell carcinoma and melanoma. Tanning beds are independently Group 1.'}
    ]
  },
  {
    id:'q-heart',
    title:'Heart health — know your numbers',
    intro:'Seven questions on cardiovascular targets and lifestyle.',
    questions:[
      {q:'Optimal blood pressure (untreated adult) is:', opts:['<130/85','<120/80','<140/90','<150/90'], a:1, exp:'AHA/ACC 2017 defined optimal BP as <120/80 mmHg. Stage 1 hypertension begins at 130/80.'},
      {q:'How much moderate aerobic activity per week does the WHO recommend?', opts:['30 min','60 min','150–300 min','At least 500 min'], a:2, exp:'WHO 2020: 150–300 minutes of moderate, OR 75–150 minutes of vigorous activity per week, plus muscle-strengthening on ≥2 days.'},
      {q:'The maximum daily salt intake recommended by WHO is:', opts:['1 g','5 g','10 g','15 g'], a:1, exp:'WHO: <5 g salt per day (≈1 tsp, equivalent to <2,000 mg sodium). Most adults exceed this 2–3 fold, mainly from processed foods.'},
      {q:'Within 1 year of quitting smoking, cardiovascular risk:', opts:['Is unchanged','Halves','Increases briefly','Returns to baseline'], a:1, exp:'CV risk halves within ~1 year of cessation; lung-cancer risk halves over ~10 years. Quitting at any age extends life.'},
      {q:'Which dietary pattern is most strongly proven to reduce cardiovascular events in a randomised trial?', opts:['Ketogenic','Mediterranean (PREDIMED)','Low-fat vegan','Carnivore'], a:1, exp:'PREDIMED (NEJM 2018) — a Mediterranean pattern with olive oil or nuts reduced major CV events by ~30% in high-risk adults.'},
      {q:'Which symptom requires emergency services right away?', opts:['Mild headache after exercise','Brief leg cramp at night','Sudden chest pressure with shortness of breath','Itchy feet'], a:2, exp:'Chest pressure with shortness of breath, sweating, or pain radiating to arm/jaw needs immediate evaluation — call emergency services and don\'t drive yourself.'},
      {q:'Hibiscus tea (bissap/sobolo/zobo) has been shown in trials to:', opts:['Cure hypertension','Modestly lower systolic blood pressure','Have no effect on BP','Raise BP'], a:1, exp:'Meta-analyses (Serban et al., J Hypertens 2015) show ≈7 mmHg systolic reduction with regular hibiscus consumption. It is not a substitute for prescribed medication.'}
    ]
  },
  {
    id:'q-sleep',
    title:'Sleep — what really matters',
    intro:'Six questions on the science of sleep.',
    questions:[
      {q:'Recommended sleep duration for adults is:', opts:['4–6 h','5–7 h','7–9 h','10–12 h'], a:2, exp:'National Sleep Foundation / AASM: 7–9 hours for adults. Both short (<6 h) and long (>9 h) sleep are associated with adverse outcomes.'},
      {q:'During which sleep stage is most dreaming and memory consolidation thought to occur?', opts:['Stage 1','Stage 2','Deep slow-wave (N3)','REM'], a:3, exp:'REM (Rapid Eye Movement) sleep is when vivid dreaming and emotional memory consolidation predominantly occur, though slow-wave sleep also consolidates declarative memory.'},
      {q:'Caffeine\'s half-life in a typical adult is approximately:', opts:['30 minutes','1–2 hours','5–6 hours','12 hours'], a:2, exp:'~5–6 hours. A 3 p.m. coffee leaves ~25% of the caffeine in your system at midnight, fragmenting sleep architecture.'},
      {q:'Alcohol before bed:', opts:['Improves sleep quality','Sedates but suppresses REM and fragments the second half of sleep','Has no effect','Lengthens deep sleep'], a:1, exp:'Alcohol shortens sleep latency but suppresses REM and causes second-half awakenings. You feel sedated, not rested.'},
      {q:'Loud habitual snoring with daytime sleepiness suggests:', opts:['Normal sleep','Possible obstructive sleep apnoea — needs evaluation','Just being tired','Allergies'], a:1, exp:'OSA is common, underdiagnosed, and an independent CV risk factor. Sleep studies and CPAP transform quality of life when indicated.'},
      {q:'The brain\'s "glymphatic system" — which clears β-amyloid and other waste — operates:', opts:['Mainly during exercise','Mainly during deep sleep','Continuously and equally','Only during fasting'], a:1, exp:'Xie et al. (Science 2013) showed glymphatic clearance is dramatically enhanced during deep sleep — one mechanism linking chronic sleep loss to Alzheimer\'s risk.'}
    ]
  },
  {
    id:'q-cooking',
    title:'African foods & cooking methods',
    intro:'Eight questions on traditional foods, preparation, and what to keep or change.',
    questions:[
      {q:'Which cooking method produces the fewest harmful by-products?', opts:['Deep frying','Open-flame grilling','Steaming','Pan-searing over high heat'], a:2, exp:'Steaming, boiling and slow-cooking produce essentially no HCAs, PAHs or acrylamide. Open flame and deep frying produce the most.'},
      {q:'HCAs and PAHs are formed mostly when:', opts:['Beans are boiled','Meat is grilled over direct flame or charred','Vegetables are steamed','Rice is boiled'], a:1, exp:'High-temperature cooking of meat — especially open-flame grilling with charring — produces heterocyclic amines (HCAs) and polycyclic aromatic hydrocarbons (PAHs).'},
      {q:'Marinating meat before grilling:', opts:['Has no effect on carcinogen formation','Can reduce HCA formation by up to 90%','Increases HCA formation','Only changes flavour'], a:1, exp:'Marinades with herbs, citrus, vinegar, garlic, and antioxidants cut HCA formation dramatically — by up to 90% in some studies.'},
      {q:'Which is healthier as a daily staple?', opts:['Heavily refined gari and white rice','Whole grains like brown rice, fonio, sorghum, millet','Sugary malt drinks','Reused frying oil'], a:1, exp:'Whole grains have lower glycaemic load and more fibre, vitamins, and minerals than refined gari and white rice.'},
      {q:'Bouillon cubes (Maggi, Knorr) are problematic mainly because they:', opts:['Cause kidney stones directly','Contain a single dose of 1.5–2 g sodium each','Are a controlled substance','Contain alcohol'], a:1, exp:'A single cube can contain 1.5–2 g sodium — close to a full day\'s WHO limit. Substitute herbs, garlic, ginger, citrus.'},
      {q:'Reusing frying oil multiple times produces:', opts:['Healthier antioxidants','Trans fats, oxidised lipids, and acrylamide','Vitamins','No measurable changes'], a:1, exp:'Repeatedly heated oil accumulates trans fats, polar compounds, aldehydes and acrylamide. Don\'t reuse more than 1–2 times.'},
      {q:'Hibiscus (bissap, sobolo, zobo) is best consumed:', opts:['Heavily sweetened','Unsweetened or lightly sweetened','Mixed with alcohol','With added salt'], a:1, exp:'The BP-lowering benefit is from the calyces, not added sugar. Heavy sweetening converts a healthy drink into a sugar-sweetened beverage.'},
      {q:'Mouldy or discoloured groundnuts (peanuts) and maize should be:', opts:['Eaten — heat destroys all toxins','Discarded — aflatoxin is heat-stable and a potent hepatocarcinogen','Eaten only by adults','Soaked and consumed'], a:1, exp:'Aflatoxin is largely heat-stable and is among the most potent hepatocarcinogens known. Buy fresh, store dry, discard mouldy items.'}
    ]
  },
  {
    id:'q-natural',
    title:'Natural remedies — what the evidence shows',
    intro:'Six questions to separate evidence from folklore.',
    questions:[
      {q:'Ginger has the strongest evidence for:', opts:['Curing cancer','Reducing nausea (pregnancy, motion, post-op, chemotherapy)','Treating diabetes alone','Lowering high blood pressure dramatically'], a:1, exp:'Cochrane reviews support 1–1.5 g/day of ginger for various forms of nausea. Effects on glucose and pain are modest at best.'},
      {q:'Garlic\'s established cardiovascular effect is:', opts:['Modest BP reduction (~7–8 mmHg systolic in hypertensives)','Cure of atherosclerosis','Major LDL reduction','No effect'], a:0, exp:'Meta-analyses (Ried et al., J Nutr 2016) show modest BP reduction in hypertensives. Not a substitute for prescribed medication.'},
      {q:'Honey should NOT be given to:', opts:['Children with cough','Adults','Infants under 12 months — botulism risk','Pregnant women in normal amounts'], a:2, exp:'Honey may contain Clostridium botulinum spores that can germinate in an infant gut. Never give to babies under 1 year.'},
      {q:'Topical clove oil is recognised for:', opts:['Curing hypertension','Local analgesic / dental discomfort (eugenol)','Lowering cholesterol','Curing diabetes'], a:1, exp:'Eugenol is a recognised local anaesthetic used in dentistry. Use food-grade products topically; not for systemic use.'},
      {q:'Turmeric (curcumin) absorption is best improved by:', opts:['Drinking it with cold water','Combining with piperine (black pepper) and fat','Heating to 200°C','Taking on an empty stomach'], a:1, exp:'Piperine increases curcumin bioavailability ~20-fold; fat also helps. Hence the traditional "turmeric milk with pepper."'},
      {q:'Which claim about "kidney cleanses" is supported by evidence?', opts:['They protect the kidneys','They have no proven benefit and some traditional formulas contain nephrotoxic compounds','They cure kidney disease','They are FDA-approved'], a:1, exp:'The kidneys filter continuously. Many "cleanse" herbs contain aristolochic acid (nephrotoxic and Group 1 carcinogen) or heavy-metal contaminants.'}
    ]
  },
  {
    id:'q-sleep-cycle',
    title:'The sleep cycle in depth',
    intro:'Five questions on sleep architecture.',
    questions:[
      {q:'A complete sleep cycle lasts approximately:', opts:['30 minutes','45 minutes','90 minutes','3 hours'], a:2, exp:'~90 minutes (range 80–110). Most adults complete 4–6 cycles per night.'},
      {q:'Slow-wave (deep) sleep predominates in:', opts:['The first third of the night','The middle of the night','The last third of the night','Equally throughout'], a:0, exp:'Slow-wave (N3) sleep is concentrated in the first third of the night. REM dominates the last third.'},
      {q:'REM sleep is when:', opts:['The body is most physically active','Muscles are paralysed (atonia) while the brain is highly active','You don\'t dream','Your heart rate is at its lowest'], a:1, exp:'REM features muscle atonia plus near-waking brain activity. Most vivid dreaming occurs here.'},
      {q:'Growth hormone is released maximally during:', opts:['REM','Slow-wave (deep) sleep','Stage 2','Waking'], a:1, exp:'GH pulses peak during deep slow-wave sleep, especially early in the night. Chronic sleep loss reduces GH and impairs tissue repair.'},
      {q:'After several nights of 5 hours sleep, cognitive performance is comparable to:', opts:['No impairment','Light alcohol intoxication','Severe intoxication','Total abstinence from caffeine'], a:1, exp:'Multiple studies show chronically restricted sleep impairs performance equivalent to BAC ~0.05–0.08% — and subjective alertness underestimates the impairment.'}
    ]
  },
  {
    id:'q-skin-eyes',
    title:'Skin & eye health',
    intro:'Six questions on protecting these visible organs.',
    questions:[
      {q:'A "broad-spectrum" sunscreen protects against:', opts:['UVA only','UVB only','Both UVA and UVB','Visible light only'], a:2, exp:'Broad-spectrum means coverage of both UVA (ageing, melanoma) and UVB (sunburn, cancer). SPF mainly indexes UVB protection.'},
      {q:'The "ABCDE" rule for evaluating moles stands for:', opts:['Acid, base, dryness, elevation','Asymmetry, border, colour, diameter, evolution','Always be careful during exposure','Acne, bumps, callus, dryness, erosion'], a:1, exp:'Asymmetry, Border irregularity, Colour variation, Diameter >6 mm, Evolution — a widely used dermatology screen for melanoma.'},
      {q:'How much daily outdoor time is recommended for children to help reduce myopia onset?', opts:['<30 min','60 min','At least 2 hours','5 hours'], a:2, exp:'≥2 hours/day of outdoor daylight delays myopia onset. Once myopia develops, slowing progression is much harder.'},
      {q:'The 20-20-20 rule for screen work is:', opts:['Every 20 min, look 20 ft away for 20 sec','20 hours of screen per day','20 cm from screen for 20 min','20 minutes of screen, 20 of rest'], a:0, exp:'Reduces digital eye strain. Look at something at least 20 feet (6 m) away for 20 seconds every 20 minutes.'},
      {q:'Lutein and zeaxanthin (in leafy greens) help protect against:', opts:['Cataract','Age-related macular degeneration','Glaucoma','Refractive errors'], a:1, exp:'The macular pigments lutein and zeaxanthin reduce AMD progression (AREDS2). Dietary sources: kale, spinach, ndolé, ugu, ewedu, eggs, corn.'},
      {q:'Smoking and the eye:', opts:['No relationship','Doubles risk of AMD; accelerates cataract','Improves vision','Affects only the lungs'], a:1, exp:'Smoking is the single largest modifiable risk for AMD and accelerates cataract. Smokers should be screened earlier.'}
    ]
  },
  {
    id:'q-kidney-liver',
    title:'Kidneys & liver',
    intro:'Five questions on the silent organs.',
    questions:[
      {q:'The leading causes of chronic kidney disease worldwide are:', opts:['Excess water intake','Diabetes and hypertension','Coffee consumption','Vegetable intake'], a:1, exp:'Together, diabetes and hypertension account for the majority of CKD globally. Aggressive BP and glucose control prevents progression.'},
      {q:'NSAIDs (ibuprofen, diclofenac, naproxen) used chronically:', opts:['Protect the kidneys','Can damage the kidneys and raise CV risk','Have no effect','Cure arthritis'], a:1, exp:'Chronic NSAID use causes analgesic nephropathy and raises CV risk. Use the lowest effective dose for the shortest time; consider alternatives.'},
      {q:'Adequate daily water intake reduces the risk of:', opts:['Kidney stones (~50% in trials)','Cancer (proven)','Heart attack directly','Hair loss'], a:0, exp:'~2–3 L of fluid daily reduces kidney stone recurrence by ~50% (AUA Stone Guidelines). Pale yellow urine is the simple target.'},
      {q:'Non-alcoholic fatty liver disease (NAFLD) prevalence is approximately:', opts:['1% of adults','5%','15%','~30% globally'], a:3, exp:'NAFLD now affects ~30% of adults globally — driven by obesity, sedentary behaviour, sugary drinks and ultra-processed foods.'},
      {q:'Paracetamol (acetaminophen) is dangerous when:', opts:['Combined with heavy alcohol or used above recommended doses','Used as a single dose','Used in children','Taken with water'], a:0, exp:'Acute liver failure is most often from paracetamol overdose, often combined with alcohol. Keep within recommended doses (typically ≤3 g/day in adults).'}
    ]
  }
];

window.REMEDIES = REMEDIES;
window.SYSTEMS = SYSTEMS;
window.AFRICAN_FOODS = AFRICAN_FOODS;
window.COOKING_METHODS = COOKING_METHODS;
window.QUIZZES = QUIZZES;

/* ============================================================
   MEDICINES — common over-the-counter / prescribed medicines
   used across Africa, Europe and the US, with brand aliases,
   natural alternatives and notable side effects.
   Sources: WHO Essential Medicines List, BNF, FDA labels,
   African pharmacopoeia surveys, peer-reviewed pharmacology reviews.
============================================================ */
const MEDICINES = [
  // ===== PAIN & FEVER =====
  {
    id:'paracetamol',
    cat:'pain',
    name:'Paracetamol (Acetaminophen)',
    brands:'Efferalgan, Doliprane, Panadol, Tylenol, Tempra, Calpol',
    use:'Mild-to-moderate pain, fever reduction. First-line analgesic.',
    dose:'Adults: 500–1000 mg every 4–6 h; maximum 3 g/day (recently lowered from 4 g due to hepatotoxicity risk). Children: weight-based dosing.',
    sideEffects:[
      'Hepatotoxicity (liver damage) — leading cause of acute liver failure worldwide when taken above recommended doses',
      'Rash and rare severe skin reactions (Stevens-Johnson syndrome)',
      'Kidney impairment with chronic high use',
      'Particularly dangerous combined with alcohol — never exceed 2 g/day if drinking'
    ],
    alternatives:[
      'Willow bark (Salix alba) — contains salicin, the natural precursor to aspirin. Effective for headache and joint pain.',
      'Turmeric (Curcuma longa) with black pepper — anti-inflammatory; modest analgesic effect in osteoarthritis trials.',
      'Ginger tea — proven for menstrual pain and tension headache.',
      'Cold/warm compress + rest for tension headache.',
      'Adequate hydration — many "headaches" are dehydration.'
    ],
    note:'Paracetamol remains the safest first-line at correct doses. Natural alternatives are adjuncts, not replacements for high fever in children.'
  },
  {
    id:'ibuprofen',
    cat:'pain',
    name:'Ibuprofen',
    brands:'Brufen, Advil, Nurofen, Motrin, Algifor',
    use:'Pain, inflammation, fever. NSAID class.',
    dose:'Adults: 200–400 mg every 4–6 h; maximum 1.2 g/day OTC, 2.4 g/day prescribed. Always with food.',
    sideEffects:[
      'Gastric ulcers and bleeding — risk rises sharply over age 60',
      'Kidney damage, especially with dehydration or pre-existing CKD',
      'Increased cardiovascular risk (heart attack, stroke) with chronic high doses',
      'Raised blood pressure',
      'Asthma exacerbation in sensitive individuals'
    ],
    alternatives:[
      'Turmeric/curcumin (1–2 g/day with piperine) — anti-inflammatory comparable to ibuprofen in some osteoarthritis trials.',
      'Ginger (1–2 g/day) — reduces menstrual pain and muscle soreness in RCTs.',
      'Omega-3 fish oils (2–3 g/day EPA+DHA) — reduces joint inflammation.',
      'Topical capsaicin cream for neuropathic and joint pain.',
      'Movement and physiotherapy — most effective long-term for chronic musculoskeletal pain.'
    ],
    note:'Avoid in pregnancy (3rd trimester), peptic ulcer disease, severe heart failure, and stage 3+ kidney disease.'
  },
  {
    id:'aspirin',
    cat:'pain',
    name:'Aspirin (Acetylsalicylic Acid)',
    brands:'Aspégic, Disprin, Bayer, Ecotrin, Acetylin',
    use:'Pain, fever, anti-platelet (heart attack/stroke prevention in select patients).',
    dose:'Pain: 300–600 mg every 4–6 h. Cardio-protection: 75–100 mg daily (only under medical advice).',
    sideEffects:[
      'GI bleeding — risk rises with age and dose',
      'Reye syndrome in children with viral illness — NEVER give to under-16s with fever',
      'Tinnitus at high doses',
      'Allergic reactions, including bronchospasm in asthmatics',
      'Increased bleeding with other anticoagulants'
    ],
    alternatives:[
      'Willow bark — natural source of salicin (slower acting, gentler on stomach).',
      'Meadowsweet tea — traditional European salicylate-containing herb.',
      'For cardiovascular protection: there is no equivalent natural alternative — discuss with your doctor.',
      'For mild pain: heat, rest, ginger, turmeric.'
    ],
    note:'Routine daily aspirin for primary cardiovascular prevention is no longer recommended for most adults (USPSTF 2022). Only continue if your doctor prescribes.'
  },
  {
    id:'diclofenac',
    cat:'pain',
    name:'Diclofenac',
    brands:'Voltaren, Voltarol, Cataflam, Diclac, Olfen',
    use:'Inflammation, pain (joint, dental, post-surgical). NSAID class.',
    dose:'25–50 mg 2–3× per day. Topical gel preferred for joint/muscle pain — far safer than oral.',
    sideEffects:[
      'High cardiovascular risk — withdrawn or restricted in some countries',
      'GI bleeding, ulcers',
      'Kidney injury',
      'Liver enzyme elevation',
      'Photosensitivity (topical)'
    ],
    alternatives:[
      'Topical capsaicin or arnica gel for joint pain.',
      'Turmeric + boswellia (frankincense extract) — joint inflammation.',
      'Devil\'s claw (Harpagophytum) — back and joint pain.',
      'Physical therapy and movement — most evidence for chronic joint pain.'
    ],
    note:'Use lowest dose for shortest time. Topical forms have ~90% less systemic absorption.'
  },

  // ===== ANTIMALARIALS =====
  {
    id:'artemether-lumefantrine',
    cat:'antimalarial',
    name:'Artemether-Lumefantrine',
    brands:'Artefan, Coartem, Riamet, Lonart, Artequin',
    use:'First-line treatment for uncomplicated P. falciparum malaria (WHO recommended).',
    dose:'Adult: 4 tablets twice daily for 3 days, with fatty food. Weight-based for children.',
    sideEffects:[
      'Headache, dizziness',
      'Nausea, vomiting, loss of appetite',
      'QT interval prolongation — caution with heart rhythm conditions',
      'Sleep disturbance',
      'Rare allergic reactions'
    ],
    alternatives:[
      'There is NO reliable natural alternative for treating active malaria — failure to treat properly is often fatal.',
      'Artemisinin itself comes from Artemisia annua (sweet wormwood) but the herbal form alone is INADEQUATE and breeds resistance — always use the combination tablet.',
      'PREVENTION: long-sleeved clothing, treated bed nets, indoor residual spraying, neem leaf preparations as additional repellent (limited evidence).',
      'Quinine from cinchona bark is the historic source — still used for severe malaria under medical supervision.'
    ],
    note:'Always complete the full 3-day course even if you feel better. Incomplete treatment is the #1 driver of artemisinin resistance.'
  },
  {
    id:'chloroquine',
    cat:'antimalarial',
    name:'Chloroquine',
    brands:'Nivaquine, Aralen, Resochin',
    use:'Treatment of P. vivax, P. ovale, P. malariae. NOT effective against most P. falciparum due to widespread resistance.',
    dose:'Adult: 600 mg base then 300 mg at 6, 24, 48 h.',
    sideEffects:[
      'Visual changes, retinal damage with long-term use',
      'Itching (especially in people with darker skin)',
      'Nausea, abdominal pain',
      'Cardiac arrhythmia at high doses',
      'Worsening of psoriasis and porphyria'
    ],
    alternatives:[
      'For prevention: doxycycline, mefloquine, atovaquone-proguanil under medical supervision.',
      'No reliable herbal substitute for active treatment.'
    ],
    note:'Resistance is now widespread. Do not self-medicate based on old advice — confirm with current local guidelines.'
  },

  // ===== ANTIBIOTICS =====
  {
    id:'amoxicillin',
    cat:'antibiotic',
    name:'Amoxicillin',
    brands:'Amoxil, Clamoxyl, Trimox, Moxatag, Hiconcil',
    use:'Bacterial infections: respiratory tract, urinary, dental, otitis media, H. pylori (in combination).',
    dose:'Adult: 250–500 mg three times daily; 875 mg twice daily extended-release. Always complete the full course.',
    sideEffects:[
      'Diarrhoea, nausea, vomiting',
      'Yeast overgrowth (oral thrush, vaginal candidiasis)',
      'Skin rash — sometimes serious; never re-take if rash occurred previously',
      'Anaphylaxis in penicillin-allergic patients',
      'Antibiotic-associated colitis (rare)'
    ],
    alternatives:[
      'There is no natural substitute for antibiotics when bacterial infection is confirmed — viral infections (most colds, flu) do not need antibiotics at all.',
      'For PREVENTION & immune support: garlic (raw, crushed; allicin has mild antibacterial activity), honey (topical for wounds — manuka strongest evidence), oregano oil (caution — potent), echinacea (modest cold-shortening evidence).',
      'For mild sore throat: salt-water gargles, honey + lemon, throat coat tea.',
      'Probiotics during and 2 weeks after a course to restore gut flora.'
    ],
    note:'Never share antibiotics, never save leftover tablets, never take without confirmation of bacterial infection. Misuse drives antibiotic resistance — already killing 1.27 million people per year globally.'
  },
  {
    id:'metronidazole',
    cat:'antibiotic',
    name:'Metronidazole',
    brands:'Flagyl, Metrogyl, Rozex',
    use:'Anaerobic bacterial and parasitic infections — giardia, amoebic dysentery, bacterial vaginosis, dental abscess, C. difficile colitis.',
    dose:'250–500 mg every 8–12 h depending on indication.',
    sideEffects:[
      'Severe nausea and vomiting if combined with ALCOHOL — avoid alcohol for 48 h after the last dose',
      'Metallic taste',
      'Dark urine',
      'Peripheral neuropathy with long courses',
      'Headache, dizziness'
    ],
    alternatives:[
      'For giardia/amoebiasis: NO reliable herbal substitute — these are serious infections.',
      'For PREVENTION: clean water, handwashing, properly cooked food.',
      'For bacterial vaginosis recurrence: probiotics with Lactobacillus crispatus, boric acid suppositories (under guidance).',
      'Garlic (raw) has documented antiparasitic activity but is far weaker than the drug.'
    ],
    note:'Strictly no alcohol during treatment and for 2 days after.'
  },
  {
    id:'ciprofloxacin',
    cat:'antibiotic',
    name:'Ciprofloxacin',
    brands:'Ciproxin, Cipro, Cipromed',
    use:'UTI, gastroenteritis, typhoid, some respiratory infections. Fluoroquinolone class.',
    dose:'250–750 mg twice daily. Not first-line for routine infections due to resistance and serious side effects.',
    sideEffects:[
      'Tendon rupture (especially Achilles) — risk rises with age and steroid use',
      'C. difficile colitis',
      'QT prolongation',
      'Aortic aneurysm risk',
      'Photosensitivity',
      'Peripheral neuropathy (sometimes irreversible)',
      'Mental health effects (confusion, anxiety)'
    ],
    alternatives:[
      'For UTI: cranberry products (modest prevention evidence; not treatment), D-mannose (some evidence for prevention).',
      'For travelers diarrhoea: hydration, oral rehydration salts, zinc; activated charcoal for mild cases.',
      'There is NO substitute for treating typhoid — seek medical care.'
    ],
    note:'Avoid in pregnancy and children unless no alternative. Take 2 h apart from antacids, dairy, iron supplements.'
  },

  // ===== ALLERGY / RESPIRATORY =====
  {
    id:'cetirizine',
    cat:'allergy',
    name:'Cetirizine',
    brands:'Zyrtec, Reactine, Virlix, Cetzine, Alerid',
    use:'Allergic rhinitis, urticaria, itching. Second-generation antihistamine.',
    dose:'Adult: 10 mg once daily. Children: 5 mg.',
    sideEffects:[
      'Drowsiness (more than other second-gen antihistamines)',
      'Dry mouth',
      'Headache',
      'Urinary retention in older men',
      'Rebound itch on sudden withdrawal (long-term users)'
    ],
    alternatives:[
      'Local honey daily (limited evidence for desensitisation to local pollens).',
      'Nettle (Urtica dioica) freeze-dried preparations — some RCT support for hay fever.',
      'Quercetin (a flavonoid; in apples, onions, capers) stabilises mast cells.',
      'Nasal saline rinses (very effective for symptom relief).',
      'HEPA air filtration at home.',
      'Vitamin C 1g/day (modest evidence).'
    ],
    note:'Non-drowsy alternatives: loratadine, fexofenadine, desloratadine.'
  },
  {
    id:'salbutamol',
    cat:'respiratory',
    name:'Salbutamol (Albuterol)',
    brands:'Ventolin, ProAir, Asthalin, Salbulin',
    use:'Asthma rescue inhaler; relieves acute bronchospasm.',
    dose:'Inhaled: 2 puffs (100 mcg each) every 4–6 h as needed.',
    sideEffects:[
      'Tremor, palpitations, fast heart rate',
      'Headache',
      'Muscle cramps (with overuse)',
      'Low potassium with high doses',
      'Paradoxical bronchospasm (rare)'
    ],
    alternatives:[
      'There is NO safe substitute for acute asthma rescue — this is life-saving medication.',
      'For long-term asthma control: omega-3 fish oils (modest), magnesium (deficiency worsens asthma), vitamin D if deficient, weight loss if overweight.',
      'Breathing exercises (Buteyko, Papworth) reduce reliever use in clinical trials.',
      'Avoiding triggers: dust mites, mould, smoke, cold air.'
    ],
    note:'If using rescue inhaler more than 2× weekly, you need preventer treatment — see your doctor.'
  },

  // ===== GI / DIGESTION =====
  {
    id:'omeprazole',
    cat:'gi',
    name:'Omeprazole',
    brands:'Losec, Prilosec, Mopral, Omez, Gastrogard',
    use:'Acid reflux, peptic ulcers, H. pylori (with antibiotics). Proton pump inhibitor.',
    dose:'20–40 mg once daily before breakfast.',
    sideEffects:[
      'Long-term use: vitamin B12 and magnesium deficiency',
      'Increased risk of bone fractures, pneumonia, C. difficile',
      'Possible association with chronic kidney disease',
      'Rebound acid hypersecretion when stopping',
      'Headache, nausea, diarrhoea'
    ],
    alternatives:[
      'Lifestyle: weight loss, smaller meals, no eating 3 h before bed, elevate head of bed, reduce alcohol/coffee/spicy food/tomato.',
      'Slippery elm and DGL liquorice — coat the oesophagus.',
      'Chamomile and marshmallow root teas — soothing.',
      'Apple cider vinegar (1 tsp in water before meals) — paradoxically helps if low stomach acid is the cause (not high acid).',
      'Probiotics for H. pylori adjunct therapy.',
      'Sleep on your left side.'
    ],
    note:'Intended for 4–8 week courses. Long-term continuous use should be reviewed regularly with your doctor.'
  },
  {
    id:'loperamide',
    cat:'gi',
    name:'Loperamide',
    brands:'Imodium, Diaretyl, Lopex',
    use:'Acute non-infectious diarrhoea.',
    dose:'4 mg initially, then 2 mg after each loose stool; max 16 mg/day.',
    sideEffects:[
      'Constipation',
      'Abdominal cramps',
      'Dangerous cardiac arrhythmia at high doses (abuse)',
      'Prolongs infectious diarrhoea (do NOT use if blood in stool or fever)'
    ],
    alternatives:[
      'Oral rehydration salts (ORS) — most important treatment globally.',
      'Plain rice water, banana, applesauce, toast (BRAT diet).',
      'Carob powder, blackberry leaf tea, agrimony — traditional astringents.',
      'Probiotics (Saccharomyces boulardii, Lactobacillus) shorten duration.',
      'Activated charcoal for adsorption.',
      'Zinc supplementation (especially in children) reduces severity.'
    ],
    note:'NEVER use loperamide for diarrhoea with fever or blood — it can cause toxic megacolon.'
  },

  // ===== METABOLIC / CARDIO =====
  {
    id:'metformin',
    cat:'metabolic',
    name:'Metformin',
    brands:'Glucophage, Glumetza, Riomet, Diabex',
    use:'Type 2 diabetes (first-line); PCOS; possibly anti-ageing trials.',
    dose:'500 mg twice daily with food, titrated to 2 g/day max. Extended-release better tolerated.',
    sideEffects:[
      'Diarrhoea, nausea, metallic taste (most common; usually settles)',
      'Vitamin B12 deficiency (test annually after 4+ years)',
      'Lactic acidosis (rare, mainly in renal impairment)',
      'Modest weight loss (often desirable)'
    ],
    alternatives:[
      'Berberine 500 mg 3×/day — comparable HbA1c reduction in trials but more GI upset.',
      'Cinnamon 1–6 g/day (modest effect).',
      'Bitter melon (Momordica charantia) — traditional, modest evidence.',
      'Fenugreek seeds.',
      'BIGGEST IMPACT: low-glycaemic whole-food diet, regular exercise, weight loss of 5–10%, adequate sleep.',
      'The DiRECT trial showed 50% of T2 diabetes can be put into remission with intensive lifestyle change alone.'
    ],
    note:'Type 2 diabetes is often reversible early in its course. Discuss with your doctor — do not stop medication without supervision.'
  },
  {
    id:'amlodipine',
    cat:'cardio',
    name:'Amlodipine',
    brands:'Norvasc, Amlor, Istin, Amlocard',
    use:'Hypertension, angina. Calcium channel blocker.',
    dose:'5–10 mg once daily.',
    sideEffects:[
      'Ankle swelling (common, dose-related)',
      'Headache, flushing',
      'Gum overgrowth (gingival hyperplasia)',
      'Dizziness',
      'Reflex tachycardia (rare)'
    ],
    alternatives:[
      'Hibiscus tea (bissap/sobolo/zobo) — RCTs show ~7 mmHg systolic reduction.',
      'Beetroot juice — nitrate-rich, ~4–5 mmHg reduction.',
      'DASH or Mediterranean diet patterns.',
      'Daily walking (30+ min) — comparable to single antihypertensive.',
      'Salt reduction <5 g/day.',
      'Weight loss (~1 mmHg per kg lost).',
      'Magnesium, potassium adequate intake.',
      'Stress management — meditation, slow breathing.'
    ],
    note:'Untreated hypertension is a leading cause of stroke. Lifestyle changes can reduce or eliminate need for medication, but never stop tablets abruptly — taper under medical supervision.'
  },
  {
    id:'atorvastatin',
    cat:'cardio',
    name:'Atorvastatin',
    brands:'Lipitor, Sortis, Torvast, Atorlip',
    use:'High cholesterol; cardiovascular event prevention.',
    dose:'10–80 mg once daily in the evening.',
    sideEffects:[
      'Muscle aches (myalgia) — most common reason for discontinuation',
      'Rare rhabdomyolysis (severe muscle breakdown)',
      'Liver enzyme elevation',
      'Slightly increased diabetes risk',
      'Memory issues (controversial — some patients report)',
      'Headache'
    ],
    alternatives:[
      'Plant sterols/stanols 2 g/day (in fortified yogurts/margarines) — 10% LDL reduction.',
      'Soluble fibre: oats, barley, psyllium, beans — 5–10% reduction.',
      'Red yeast rice (contains natural lovastatin — same class, same side effect profile, but unstandardised).',
      'Bergamot extract.',
      'Fish oils for triglycerides.',
      'Mediterranean diet pattern.',
      '30+ min daily exercise.',
      'Smoking cessation.'
    ],
    note:'Statins are well-evidenced for high-risk patients (post-MI, diabetes, very high LDL). Discuss your individual cardiovascular risk with your doctor.'
  },

  // ===== MENTAL HEALTH =====
  {
    id:'diazepam',
    cat:'mental',
    name:'Diazepam',
    brands:'Valium, Stesolid, Diapam',
    use:'Severe anxiety, seizures, muscle spasm, alcohol withdrawal. Benzodiazepine.',
    dose:'2–10 mg up to 4× daily. Short-term only (2–4 weeks max).',
    sideEffects:[
      'Drowsiness, sedation, slowed reactions',
      'STRONG DEPENDENCE — addiction develops within weeks',
      'Severe withdrawal: seizures, hallucinations, prolonged anxiety',
      'Falls in elderly',
      'Memory impairment',
      'Respiratory depression with opioids or alcohol — fatal'
    ],
    alternatives:[
      'Cognitive Behavioural Therapy — equally effective for anxiety, no side effects.',
      'Lavender oil capsules (Silexan) — RCT evidence for generalised anxiety.',
      'Chamomile, passionflower, lemon balm teas.',
      'Magnesium (especially if deficient).',
      'Regular aerobic exercise.',
      'Mindfulness meditation, slow-breathing (5–6 breaths/min).',
      'Adequate sleep, reduced caffeine.',
      'Ashwagandha (modest RCT evidence).'
    ],
    note:'Never stop benzodiazepines abruptly after regular use. Taper under medical supervision over weeks to months.'
  },

  // ===== TRADITIONAL/REGIONAL =====
  {
    id:'ors',
    cat:'gi',
    name:'Oral Rehydration Salts (ORS)',
    brands:'Hydralyte, Pedialyte, Dioralyte, Rehidrat',
    use:'Dehydration from diarrhoea, vomiting, heat exhaustion. WHO Essential Medicine. Has saved more lives than any other intervention in modern medicine.',
    dose:'1 sachet in 1 litre of clean water; sip throughout the day until urine clear.',
    sideEffects:[
      'Essentially none at correct dilution',
      'Excess sodium if over-concentrated'
    ],
    alternatives:[
      'Home-made ORS: 1 L safe water + 6 level teaspoons sugar + 1/2 teaspoon salt (WHO formula).',
      'Coconut water — natural electrolytes, almost identical to ORS.',
      'Rice water with a pinch of salt.',
      'Banana for potassium.'
    ],
    note:'ORS treats dehydration but does not stop diarrhoea — that is the body clearing infection. Persistent diarrhoea >3 days, with blood, or in young children needs medical evaluation.'
  }
];

/* ============================================================
   SCRIPTURE & ENCOURAGEMENT
   Curated passages for resilience, hope, and trust — drawn
   from the Christian Bible (NIV, ESV translations used as the
   reference where wording matters). Grouped by life situation.
============================================================ */
const SCRIPTURES = [
  {
    theme:'When you feel anxious or afraid',
    icon:'🕊',
    intro:'Fear and anxiety touch every life. Scripture acknowledges this honestly — and then points beyond the fear to a peace that does not depend on the circumstances around us.',
    verses:[
      { ref:'Philippians 4:6–7', text:'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.' },
      { ref:'Isaiah 41:10', text:'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.' },
      { ref:'Psalm 23:4', text:'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.' },
      { ref:'2 Timothy 1:7', text:'For God has not given us a spirit of fear, but of power and of love and of a sound mind.' },
      { ref:'John 14:27', text:'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.' }
    ],
    reflection:'Anxiety often shrinks when we name what we fear and bring it deliberately into prayer. Try writing the worry down, reading it slowly, and then speaking it aloud as a request — not a demand. The simple act of doing so re-centres the mind.'
  },
  {
    theme:'When you are exhausted or burned out',
    icon:'🌿',
    intro:'Even the strongest person reaches the end of their strength. Scripture offers permission to rest, and reminders that rest itself is sacred — modelled by God on the seventh day.',
    verses:[
      { ref:'Matthew 11:28–30', text:'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.' },
      { ref:'Isaiah 40:29–31', text:'He gives strength to the weary and increases the power of the weak. Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.' },
      { ref:'Psalm 46:10', text:'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.' },
      { ref:'Mark 6:31', text:'Then, because so many people were coming and going that they did not even have a chance to eat, he said to them, "Come with me by yourselves to a quiet place and get some rest."' },
      { ref:'Exodus 33:14', text:'The Lord replied, "My Presence will go with you, and I will give you rest."' }
    ],
    reflection:'Rest is not laziness. Jesus himself withdrew to quiet places — repeatedly. Protect a Sabbath rhythm: one day a week without work, without striving. Sleep is a daily act of trust.'
  },
  {
    theme:'When you grieve or face loss',
    icon:'🤍',
    intro:'Grief is the price of love. Scripture does not minimise pain — it names it, sits with it, and points toward a hope larger than death itself.',
    verses:[
      { ref:'Psalm 34:18', text:'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' },
      { ref:'Matthew 5:4', text:'Blessed are those who mourn, for they will be comforted.' },
      { ref:'Revelation 21:4', text:'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.' },
      { ref:'John 11:35', text:'Jesus wept.' },
      { ref:'2 Corinthians 1:3–4', text:'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.' }
    ],
    reflection:'Grief moves at its own pace. There is no "should" in mourning. Speak about the person you lost; light a candle; write what you remember. The shortest verse in the Bible — "Jesus wept" — gives every griever permission to weep too.'
  },
  {
    theme:'When you feel hopeless or depressed',
    icon:'🌅',
    intro:'Even the prophet Elijah, after his greatest victory, sat under a tree and asked to die. Scripture takes despair seriously, and so should we. These verses do not erase the dark — but they refuse to let it be the final word.',
    verses:[
      { ref:'Psalm 42:11', text:'Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Saviour and my God.' },
      { ref:'Lamentations 3:22–23', text:'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.' },
      { ref:'Romans 8:38–39', text:'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.' },
      { ref:'Psalm 30:5', text:'Weeping may stay for the night, but rejoicing comes in the morning.' },
      { ref:'1 Kings 19:5–8', text:'Then he lay down under the bush and fell asleep. All at once an angel touched him and said, "Get up and eat." He looked around, and there by his head was some bread baked over hot coals, and a jar of water. He ate and drank and then lay down again.'}
    ],
    reflection:'When Elijah collapsed in despair, God\'s first response was not a lecture — it was sleep, food, water. Faith and physical care are partners. If you are struggling deeply, please also reach out to a doctor or trusted counsellor: prayer and professional help are not in competition.'
  },
  {
    theme:'For resilience and perseverance',
    icon:'🌳',
    intro:'A faith that lasts is one that has weathered storms. Scripture is unsentimental about hardship — and unflinching about the strength that grows through it.',
    verses:[
      { ref:'James 1:2–4', text:'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.' },
      { ref:'Romans 5:3–5', text:'We also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope. And hope does not put us to shame, because God\'s love has been poured out into our hearts through the Holy Spirit, who has been given to us.' },
      { ref:'2 Corinthians 4:16–18', text:'Therefore we do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day. For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all.' },
      { ref:'Hebrews 12:1–2', text:'Let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith.' },
      { ref:'Philippians 4:13', text:'I can do all this through him who gives me strength.' }
    ],
    reflection:'Resilience is rarely dramatic. It is the small choice — to get up, to pray once more, to do the next right thing — repeated over and over until it becomes a life. Character is built one ordinary day at a time.'
  },
  {
    theme:'Trusting God in uncertainty',
    icon:'🧭',
    intro:'When the road ahead is unclear, trust is not the absence of questions — it is the decision to keep walking anyway. Scripture is full of people who said yes before they understood.',
    verses:[
      { ref:'Proverbs 3:5–6', text:'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
      { ref:'Jeremiah 29:11', text:'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' },
      { ref:'Psalm 37:5', text:'Commit your way to the Lord; trust in him and he will do this.' },
      { ref:'Romans 8:28', text:'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
      { ref:'Isaiah 55:8–9', text:'"For my thoughts are not your thoughts, neither are your ways my ways," declares the Lord. "As the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts."' }
    ],
    reflection:'Trust grows by being exercised. Look back at moments of past provision before you ask what the future holds. Often the answer to "will you trust me now?" is built from the receipts of "I was trustworthy then".'
  },
  {
    theme:'On gratitude and worship',
    icon:'✨',
    intro:'Gratitude is the most evidence-based mental health intervention in modern psychology. Scripture has known this for millennia — every psalm is a posture of attention.',
    verses:[
      { ref:'1 Thessalonians 5:16–18', text:'Rejoice always, pray continually, give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.' },
      { ref:'Psalm 100:4', text:'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.' },
      { ref:'Psalm 103:1–5', text:'Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord, my soul, and forget not all his benefits — who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion, who satisfies your desires with good things so that your youth is renewed like the eagle\'s.' },
      { ref:'Colossians 3:15–17', text:'And be thankful. Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts.' },
      { ref:'Psalm 150:6', text:'Let everything that has breath praise the Lord. Praise the Lord.' }
    ],
    reflection:'Try this for one week: at the end of each day, name three specific things you are grateful for, however small. The cumulative effect on mood and sleep is measurable within days.'
  },
  {
    theme:'On healing and physical wellbeing',
    icon:'🌱',
    intro:'Scripture treats the body as sacred — not as something to escape but as something to steward. Healing is presented as God\'s desire, even when its timing and form remain mysterious.',
    verses:[
      { ref:'Psalm 139:13–14', text:'For you created my inmost being; you knit me together in my mother\'s womb. I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.' },
      { ref:'3 John 1:2', text:'Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.' },
      { ref:'Jeremiah 17:14', text:'Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.' },
      { ref:'James 5:14–15', text:'Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord. And the prayer offered in faith will make the sick person well; the Lord will raise them up.' },
      { ref:'1 Corinthians 6:19–20', text:'Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honour God with your bodies.' }
    ],
    reflection:'Care for your body is a spiritual act. Sleep, movement, nourishment and rest are not separate from faith — they are an offering of stewardship. Pray for healing; also see your doctor. Both are gifts.'
  }
];

window.MEDICINES = MEDICINES;
window.SCRIPTURES = SCRIPTURES;
