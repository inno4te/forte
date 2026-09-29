/* ============================================================
   FR_DATA — French translations for dynamic data content
   Structure: FR_DATA[scope][id] = { ...translated fields }
   Used by: T21Lang.Td(scope, id, field, fallback)
   ============================================================ */

const FR_DATA = {

  /* ===== TOPICS — translated by category & id ===== */
  topic: {
    'processed-meat':{ name:'Viande transformée', sub:'bacon, saucisse, jambon, salami, hot-dogs, charcuterie' },
    'red-meat':{ name:'Viande rouge', sub:'bœuf, porc, agneau, mouton, veau, chèvre' },
    'alcohol':{ name:'Boissons alcoolisées', sub:'éthanol — vin, bière, spiritueux' },
    'ssb':{ name:'Boissons sucrées', sub:'sodas, boissons énergétiques, jus sucrés, thés sucrés' },
    'aflatoxin':{ name:'Aflatoxines', sub:'toxine de moisissure contaminant céréales et fruits secs' },
    'acrylamide':{ name:'Acrylamide', sub:'formé dans les aliments féculents cuits au-dessus de ~120°C' },
    'trans-fat':{ name:'Acides gras trans industriels', sub:'huiles végétales partiellement hydrogénées' },
    'upf':{ name:'Aliments ultra-transformés', sub:'NOVA groupe 4 — formulations industrielles' },
    'hot-bev':{ name:'Boissons très chaudes (>65°C)', sub:'thé, café, maté — quand brûlants' },
    'salted-fish':{ name:'Poisson salé style chinois', sub:'et autres poissons fortement salés' },

    'carrageenan':{ name:'Carraghénane', sub:'épaississant et stabilisant dérivé d\'algues' },
    'aspartame':{ name:'Aspartame', sub:'édulcorant artificiel non nutritif' },
    'nitrites':{ name:'Nitrite & nitrate de sodium', sub:'conservateurs de viandes salées' },
    'bha-bht':{ name:'BHA & BHT', sub:'hydroxyanisole / hydroxytoluène butylé' },
    'tio2':{ name:'Dioxyde de titane (E171)', sub:'pigment alimentaire blanc' },
    'dyes':{ name:'Colorants alimentaires synthétiques', sub:'colorants azoïques et triphénylméthane' },
    'msg':{ name:'Glutamate monosodique (MSG)', sub:'et exhausteurs de goût apparentés' },
    'emulsifiers':{ name:'Émulsifiants synthétiques', sub:'polysorbates, carboxyméthylcellulose' },
    'bromate':{ name:'Bromate de potassium', sub:'« améliorant » pour farine / conditionneur de pâte' },

    'uv':{ name:'Rayonnement ultraviolet solaire', sub:'UVA + UVB du soleil et cabines de bronzage' },
    'ionising':{ name:'Rayonnements ionisants', sub:'rayons X, scanners, gamma, radon' },
    'tobacco':{ name:'Fumée de tabac', sub:'active et passive' },
    'pm25':{ name:'Pollution de l\'air extérieur & PM2,5', sub:'particules fines, gaz d\'échappement diesel' },
    'radon':{ name:'Gaz radon', sub:'gaz radioactif intérieur issu du sol' },
    'asbestos':{ name:'Amiante', sub:'les six types de fibres' },
    'pfas':{ name:'PFAS — « substances éternelles »', sub:'substances per- et polyfluoroalkylées' },
    'bpa':{ name:'Bisphénol A & analogues', sub:'BPA, BPS, BPF' },

    'obesity':{ name:'Excès de masse grasse (obésité)', sub:'≥13 cancers liés de façon causale' },
    'inactivity':{ name:'Inactivité physique & sédentarité', sub:'facteurs de risque indépendants' },
    'sleep':{ name:'Manque de sommeil & travail posté', sub:'perturbation circadienne' },
    'stress':{ name:'Stress psychologique chronique', sub:'dérèglement de l\'axe HHS' },
    'infections':{ name:'Infections chroniques', sub:'HPV, VHB, VHC, H. pylori, EBV' },
    'oral':{ name:'Mauvaise santé bucco-dentaire', sub:'maladie parodontale & microbiome buccal' },

    'benzene':{ name:'Benzène', sub:'solvant pétrochimique' },
    'formaldehyde':{ name:'Formaldéhyde', sub:'résines, embaumement, dégazage' },
    'diesel':{ name:'Gaz d\'échappement diesel', sub:'professionnels et ambiants' },
    'glyphosate':{ name:'Glyphosate', sub:'herbicide à large spectre (« Roundup »)' },
    'silica':{ name:'Poussière de silice cristalline', sub:'quartz, cristobalite' },
    'hairdressing':{ name:'Coiffure professionnelle', sub:'exposition chronique aux teintures et solvants' }
  },

  /* ===== PROPOSALS ===== */
  proposal: {
    0:{ h:'Adopter un régime de type méditerranéen', p:'Privilégier légumes, fruits, légumineuses, céréales complètes, fruits à coque, huile d\'olive et poisson ; limiter viande rouge, viande transformée et aliments ultra-transformés. L\'essai randomisé PREDIMED a montré une réduction de ~30 % des événements cardiovasculaires majeurs.' },
    1:{ h:'Manger ≥400 g de légumes & fruits par jour', p:'Cinq portions minimum. La diversité des couleurs apporte caroténoïdes, polyphénols, glucosinolates et fibres qui soutiennent la réparation de l\'ADN et un microbiome sain.' },
    2:{ h:'Limiter la viande rouge à <500 g cuite par semaine', p:'Et éliminer ou fortement réduire les viandes transformées (bacon, saucisse, charcuterie). Remplacer par légumineuses, volaille, poisson, tofu.' },
    3:{ h:'Éliminer ou minimiser l\'alcool', p:'OMS 2023 : aucun niveau sûr pour le risque de cancer. Si vous buvez, suivez les recommandations nationales à faible risque et observez plusieurs jours sans alcool par semaine.' },
    4:{ h:'Ne pas fumer ; éviter la fumée secondaire', p:'Arrêter à tout âge prolonge la vie. Utilisez des aides reconnues : substituts nicotiniques, varénicline, bupropion, conseil comportemental. Évitez la cigarette électronique si vous n\'avez jamais fumé.' },
    5:{ h:'Bouger 150–300 minutes par semaine', p:'Activité aérobique modérée plus renforcement musculaire ≥2 jours. Coupez la sédentarité toutes les 30–60 minutes par un peu de mouvement.' },
    6:{ h:'Maintenir une composition corporelle saine', p:'IMC 18,5–24,9 ; tour de taille <94 cm (hommes) / <80 cm (femmes). L\'excès de masse grasse est lié de façon causale à ≥13 cancers.' },
    7:{ h:'Protéger 7–9 heures de sommeil', p:'Horaires réguliers, chambre sombre et fraîche, limiter la lumière bleue 1–2 h avant le coucher. Le travail posté doit suivre un emploi du temps tenant compte du rythme circadien.' },
    8:{ h:'Pratiquer une réduction quotidienne du stress', p:'Pleine conscience, techniques fondées sur la TCC, journal, respiration lente (≤6 souffles/min pendant 5 min). Visez ≥10 min/jour.' },
    9:{ h:'Être prudent au soleil', p:'Cherchez l\'ombre 10h–16h, SPF 30+ large spectre, chapeau et lunettes. Évitez complètement les cabines de bronzage. Optez pour une supplémentation en vitamine D plutôt qu\'une exposition non protégée.' },
    10:{ h:'Utiliser les vaccinations fondées sur des preuves', p:'Le vaccin HPV (prévient ~90 % des cancers du col) et celui contre l\'hépatite B préviennent deux cancers d\'origine infectieuse. Les vaccins annuels antigrippal et COVID actualisé réduisent la charge inflammatoire systémique.' },
    11:{ h:'Tester et traiter H. pylori si indiqué', p:'En zones à risque ou en cas de dyspepsie chronique/antécédents familiaux de cancer gastrique, demandez à votre médecin une stratégie de test-and-treat.' },
    12:{ h:'Éliminer les boissons sucrées', p:'Remplacez par eau, thé non sucré, eau pétillante. Limitez le jus de fruit à ≤150 ml/jour. Traitez les sodas light comme occasionnels, pas comme un staple.' },
    13:{ h:'Réduire les aliments ultra-transformés (NOVA-4) à <20 % des calories', p:'Cuisinez chez vous à partir d\'ingrédients entiers ou peu transformés. Si vous voyez >5 ingrédients industriels inconnus, choisissez un autre produit.' },
    14:{ h:'Garder le sel sous 5 g (1 c. à café) par jour', p:'La majeure partie du sel vient des aliments transformés. Utilisez herbes, épices, agrumes et vinaigres pour le goût. Les versions à teneur réduite en sodium aident.' },
    15:{ h:'Cuisiner à plus basse température, plus souvent à l\'eau', p:'Cuisson vapeur, pochée, braisée, mijotée pour minimiser HCA, HAP et acrylamide. Évitez de carboniser la viande ; mariner d\'abord (acides et herbes réduisent la formation de HCA).' },
    16:{ h:'Réduire le contact plastique-aliment', p:'Choisissez verre ou inox. Ne réchauffez pas dans du plastique. Limitez les conserves. Évitez de manipuler trop longtemps les tickets de caisse thermiques.' },
    17:{ h:'Tester votre logement pour le radon', p:'Kits charbon bon marché, puis traceurs alpha si nécessaire. Atténuer si >100 Bq/m³ (OMS) ou >4 pCi/L (US EPA). Solution la plus efficace : dépressurisation sous dalle.' },
    18:{ h:'Réduire l\'exposition à la pollution de l\'air', p:'Surveillez l\'indice de qualité ; utilisez la filtration HEPA en intérieur ; masque en extérieur les jours de forte pollution ; courez et roulez dans les rues calmes et parcs plutôt qu\'à côté du trafic.' },
    19:{ h:'Maintenir une hygiène buccale rigoureuse', p:'Brossage fluoré deux fois par jour, nettoyage interdentaire quotidien, détartrage tous les 6–12 mois. Traitez la parodontite tôt.' },
    20:{ h:'Réaliser les dépistages recommandés', p:'Col de l\'utérus (HPV/Pap), sein (mammographie), colorectal (coloscopie/FIT), poumon (TDM faible dose chez fumeurs lourds), prostate (après décision partagée). Calendriers selon les programmes nationaux.' },
    21:{ h:'Refroidir les boissons chaudes sous 60°C', p:'Le thé, café et maté pris brûlants augmentent le risque de cancer de l\'œsophage. Les boissons elles-mêmes (le café notamment) ne sont pas classées cancérogènes.' },
    22:{ h:'Stocker fruits secs & céréales au frais et au sec', p:'Jeter tout ce qui présente décoloration ou odeur de moisi — les aflatoxines sont de puissants hépatocancérogènes. Achetez frais chez des fournisseurs à forte rotation.' },
    23:{ h:'Choisir des cosmétiques à faible teneur en additifs', p:'Évitez les défrisages contenant du formaldéhyde. Préférez les écrans solaires minéraux si souhaité. Lisez les étiquettes pour les PFAS dans cosmétiques et fils dentaires.' }
  },

  /* ===== HABITS ===== */
  habit: {
    'veggies':{ label:'5+ portions de légumes & fruits', tag:'Alimentation', sub:'≥400 g sur la journée' },
    'noredmeat':{ label:'Pas de viande rouge ou transformée', tag:'Alimentation', sub:'ou moins de 70 g' },
    'wholegrain':{ label:'Céréales complètes à chaque repas', tag:'Alimentation', sub:'au lieu de raffinées' },
    'water':{ label:'Hydraté avec ≥6 verres d\'eau', tag:'Alimentation', sub:'a remplacé toute envie de boisson sucrée' },
    'noupf':{ label:'Pas d\'aliment ultra-transformé', tag:'Alimentation', sub:'NOVA-4 évité' },
    'noalcohol':{ label:'Journée sans alcool', tag:'Mode de vie', sub:'ou dans les recommandations à faible risque' },
    'nosmoke':{ label:'Journée sans tabac', tag:'Mode de vie', sub:'y compris vapotage' },
    'exercise':{ label:'≥30 min d\'activité modérée', tag:'Mode de vie', sub:'marche rapide minimum' },
    'strength':{ label:'Renforcement musculaire', tag:'Mode de vie', sub:'2× par semaine est l\'objectif' },
    'sit':{ label:'Debout toutes les 30–60 min', tag:'Mode de vie', sub:'sédentarité coupée' },
    'sun':{ label:'Protection solaire pratiquée', tag:'Environnement', sub:'ombre/SPF/chapeau selon besoin' },
    'sleep':{ label:'7–9 heures de sommeil la nuit dernière', tag:'Mode de vie', sub:'horaires réguliers' },
    'mind':{ label:'≥10 min de pleine conscience / respiration', tag:'Mode de vie', sub:'régulation du stress' },
    'social':{ label:'Connexion sociale significative', tag:'Mode de vie', sub:'voix ou en personne' },
    'oral':{ label:'Brossage 2× ; soin interdentaire', tag:'Mode de vie', sub:'soin parodontal' },
    'temp':{ label:'Boissons chaudes sous 60°C', tag:'Alimentation', sub:'pas de thé/café brûlant' }
  },

  /* ===== REMEDIES ===== */
  remedy: {
    'Ginger':{ name:'Gingembre', sub:'Zingiber officinale' },
    'Lemongrass':{ name:'Citronnelle', sub:'Cymbopogon citratus' },
    'Cloves':{ name:'Clous de girofle', sub:'Syzygium aromaticum' },
    'Turmeric / Curcumin':{ name:'Curcuma / curcumine', sub:'Curcuma longa' },
    'Garlic':{ name:'Ail', sub:'Allium sativum' },
    'Cayenne / Chilli':{ name:'Piment / cayenne', sub:'Capsicum annuum (capsaïcine)' },
    'Honey (raw)':{ name:'Miel (brut)', sub:'produit d\'Apis mellifera' },
    'Hibiscus (Bissap, Sobolo, Zobo)':{ name:'Hibiscus (Bissap, Sobolo, Zobo)', sub:'Hibiscus sabdariffa' },
    'Moringa':{ name:'Moringa', sub:'Moringa oleifera' },
    'Bitter leaf':{ name:'Feuille amère', sub:'Vernonia amygdalina' },
    'Green tea':{ name:'Thé vert', sub:'Camellia sinensis' },
    'Peppermint':{ name:'Menthe poivrée', sub:'Mentha × piperita' },
    'Aloe vera':{ name:'Aloe vera', sub:'Aloe barbadensis' },
    'Leafy greens (spinach, kale, ndolé, ugu, ewedu)':{ name:'Légumes-feuilles (épinard, chou kale, ndolé, ugu, ewedu)', sub:'Brassicacées & feuilles vertes' },
    'Nuts & seeds':{ name:'Fruits à coque & graines', sub:'amandes, noix, arachides, sésame, courge' },
    'Avocado':{ name:'Avocat', sub:'Persea americana' }
  },

  /* ===== SYSTEM PAGES ===== */
  system: {
    heart: {
      title:'Cœur & circulation',
      eyebrow:'Systèmes corporels · Cardiovasculaire',
      intro:'Les maladies cardiovasculaires sont la première cause de décès dans le monde — mais ~80 % des crises cardiaques et AVC prématurés sont évitables par l\'alimentation, l\'exercice, le contrôle de la tension et l\'absence de tabac. Les cibles ci-dessous sont fondées sur les preuves ; elles réduisent aussi le risque de démence, de maladie rénale et de nombreux cancers.',
      kvK:['Tension artérielle optimale','LDL cholestérol cible','Glycémie à jeun','Fréquence cardiaque au repos','Tour de taille','Sodium quotidien'],
      kvS:['mmHg, sans traitement (AHA 2017)','<70 si risque CV élevé','HbA1c <5,7 %','plus bas = mieux généralement','hommes / femmes','<5 g de sel (OMS)'],
      tipsH:[
        'Adopter un schéma DASH ou méditerranéen','Bouger 150–300 minutes par semaine','Sel : viser moins de 5 g (1 c. à café) par jour','Ne pas fumer ; minimiser l\'alcool','Dormir 7–9 heures','Connaître ses chiffres','Réduire les aliments ultra-transformés','Manger du poisson gras ou des aliments riches en ALA','Gérer le stress et entretenir le lien social'
      ],
      tipsP:[
        'Tous deux prouvés dans des essais randomisés pour baisser la TA et les événements CV. Privilégier légumes, fruits, céréales complètes, légumineuses, fruits à coque, huile d\'olive, poisson ; minimiser viande rouge, charcuterie, sucreries, sel.',
        'La marche rapide compte. Ajoutez 2× par semaine de renforcement. Une seule séance d\'exercice baisse la TA pour ~24 h.',
        'La plupart du sel est caché dans le pain, les cubes bouillons, les cubes à dissoudre, la sauce soja, les snacks. Utilisez herbes, ail, gingembre, agrumes, vinaigres pour le goût.',
        'Arrêter divise par deux le risque CV en 1 an. OMS 2023 : aucun niveau d\'alcool n\'est sûr pour le risque CV ; la consommation légère n\'est pas protectrice une fois les facteurs de confusion ajustés.',
        'Le sommeil court (<6 h) comme long (>9 h) augmentent le risque CV. L\'apnée du sommeil est liée indépendamment à l\'hypertension — faites-vous évaluer si vous ronflez fort ou ne vous sentez pas reposé.',
        'TA à domicile ou en pharmacie chaque année dès 18 ans. Bilan lipidique dès 20 ans, puis tous les 4–6 ans (ou plus si anormal). HbA1c si surpoids ou antécédents familiaux.',
        '+12 % d\'événements CV par 10 % d\'augmentation des aliments ultra-transformés (NutriNet-Santé). Sel caché, sucre, huiles raffinées et émulsifiants font les dégâts.',
        'Deux portions de poisson gras (saumon, maquereau, sardine) par semaine, ou noix et graines de lin/chia quotidiennement pour l\'acide α-linolénique d\'origine végétale.',
        'Le stress chronique élève cortisol, TA et inflammation. Des liens sociaux solides réduisent la mortalité plus que de nombreux médicaments. Visez une connexion réelle quotidienne.'
      ],
      warnsH:['Symptômes à ne pas ignorer'],
      warnsP:['Pression ou douleur thoracique (surtout à l\'effort), essoufflement, céphalée intense soudaine, faiblesse soudaine d\'un côté, élocution troublée, évanouissement, palpitations avec douleur thoracique. Appelez les urgences — ne conduisez pas vous-même.'],
      foodsEat:['Poisson gras 2×/semaine (saumon, maquereau, sardine)','Huile d\'olive comme graisse principale','Légumineuses (haricots, lentilles) ≥3×/semaine','30 g de fruits à coque par jour','Légumes ≥3 portions par jour','Céréales complètes plutôt que raffinées','Baies, agrumes, légumes-feuilles','Hibiscus (bissap/sobolo) — baisse la TA'],
      foodsAvoid:['Viandes transformées (bacon, saucisse, charcuterie)','Boissons sucrées','Acides gras trans et huile de friture réutilisée','Sel excessif — cubes bouillons, sauce soja, nouilles instantanées','Forte consommation d\'alcool','Glucides raffinés en excès']
    },
    sleep: {
      title:'Sommeil & récupération',
      eyebrow:'Systèmes corporels · Sommeil',
      intro:'Le sommeil n\'est pas du temps perdu — c\'est quand la mémoire se consolide, les hormones se calibrent, le cerveau élimine les déchets métaboliques (dont le β-amyloïde lié à Alzheimer), et la surveillance immunitaire s\'aiguise. Le manque chronique (<6 h) est associé indépendamment à des maladies cardiovasculaires, à l\'obésité, au diabète, à la dépression et à certains cancers.',
      kvK:['Adultes','Adolescents (14–17)','Enfants (6–13)','Temps d\'endormissement','Durée d\'un cycle','Sommeil paradoxal'],
      kvS:['par nuit (NSF/AASM)','par nuit','par nuit','optimal','~4–6 cycles/nuit','du sommeil total'],
      tipsH:[
        'Fixer un horaire constant','Profiter de la lumière matinale','Atténuer et rafraîchir la chambre','Limiter la caféine après midi','Pas d\'alcool dans les 3 heures avant le coucher','Atténuer les écrans 1–2 h avant le coucher','Se faire évaluer si vous ronflez fort','Rituel d\'apaisement','Si vous ne dormez pas — levez-vous'
      ],
      tipsP:[
        'Même heure de coucher et de réveil — y compris les week-ends. La variabilité perturbe le rythme circadien même si le sommeil total est suffisant.',
        '10–30 min de lumière vive en plein air dans l\'heure suivant le réveil. C\'est le signal le plus puissant pour caler votre horloge.',
        '~18°C (65°F) est idéal. Bloquez toutes les sources de lumière ; la chambre doit être assez sombre pour ne pas voir votre main devant vous.',
        'La caféine a une demi-vie de 5–6 heures. Un café à 15 h laisse encore un quart de la dose dans votre système à minuit.',
        'L\'alcool endort mais supprime le sommeil paradoxal et provoque des réveils en deuxième partie de nuit. Vous vous sentirez non reposé.',
        'La lumière bleue supprime la mélatonine. Mode nuit, éclairage tamisé, lecture papier. Le lit pour le sommeil et l\'intimité uniquement.',
        'L\'apnée obstructive du sommeil est fréquente, souvent non diagnostiquée, et un facteur de risque CV indépendant. La PPC transforme la qualité de vie quand elle est indiquée.',
        '30 à 60 dernières minutes : lumière tamisée, étirements doux, douche chaude, lecture, exercices respiratoires. Évitez les actualités anxiogènes et les conversations chargées.',
        'Après 20 min d\'éveil, quittez le lit ; faites quelque chose de calme en lumière tamisée jusqu\'à somnoler. Le lit reste associé au sommeil.'
      ]
    },
    brain: {
      title:'Cerveau & santé mentale',
      eyebrow:'Systèmes corporels · Neurologique',
      intro:'Le cerveau est construit et entretenu par les mêmes facteurs qui protègent le cœur, plus quelques-uns propres à la cognition : apprentissage, lien social et sommeil suffisant. Les facteurs modifiables représentent ~40 % des cas de démence (Commission Lancet, 2020). Santé mentale et santé cérébrale sont liées — toutes deux répondent fortement à l\'exercice, au sommeil, au lien social et au sens.',
      kvK:['Risque modifiable de démence','Effet de l\'exercice sur la dépression','Apprentissage adulte','Perte auditive & démence','Sommeil & β-amyloïde'],
      kvS:['Commission Lancet 2020','aux ISRS (légère-modérée)','réduction du déclin cognitif','principal facteur de mi-vie','système glymphatique'],
      tipsH:['Bouger chaque jour','Traiter la perte auditive tôt','Rester engagé socialement','Continuer à apprendre','Protéger le sommeil (voir Sommeil)','Manger pour le cerveau','Gérer le risque cardiovasculaire','Demander de l\'aide tôt en cas de baisse de moral','Limiter l\'alcool et éviter les traumatismes crâniens'],
      tipsP:[
        'L\'exercice aérobique élève le BDNF, améliore l\'humeur, et réduit le risque de démence de 28–35 % dans de grandes cohortes.',
        'La perte auditive en milieu de vie est le plus grand facteur de risque modifiable de démence ultérieure. Les aides auditives réduisent fortement le déclin cognitif à 3 ans chez les adultes à risque.',
        'La solitude augmente la mortalité de manière équivalente à ~15 cigarettes/jour et accélère le déclin cognitif. Priorisez relations proches et liens faibles.',
        'L\'éducation à tout âge, les nouvelles compétences, les langues, la musique — tout cela construit la réserve cognitive. Les mots croisés seuls ne suffisent pas ; la nouveauté compte.',
        'Pendant le sommeil profond, le système glymphatique élimine le β-amyloïde et autres métabolites neurotoxiques. Le manque chronique accélère la pathologie d\'Alzheimer.',
        'Le régime MIND (méditerranéen + DASH + légumes-feuilles, baies, fruits à coque, huile d\'olive, poisson) associé à 53 % de risque Alzheimer en moins chez les plus observants.',
        'L\'hypertension, le diabète, l\'obésité et le tabagisme en milieu de vie sont tous des facteurs de risque. Ce qui est bon pour le cœur l\'est pour le cerveau.',
        'La dépression et l\'anxiété sont très traitables. TCC, exercice et (si indiqué) médication sont efficaces. Consultez un médecin généraliste ou un professionnel de santé mentale.',
        'Plus de 21 unités d\'alcool/semaine est un facteur de risque ; le port du casque et de la ceinture réduit les traumatismes.'
      ]
    },
    gut: {
      title:'Intestin & digestion',
      eyebrow:'Systèmes corporels · Digestif',
      intro:'L\'intestin est plus que la digestion : il héberge 70 % du système immunitaire, produit des neurotransmetteurs (dont ~90 % de la sérotonine), et abrite un écosystème microbien qui influence humeur, métabolisme et immunité. Un microbiome diversifié et nourri en fibres est l\'une des interventions de santé les plus accessibles.',
      kvK:['Objectif fibres (adultes)','Variété végétale','Microbes intestinaux','Eau','Temps aux toilettes'],
      kvS:['par jour ; la plupart en mangent 10–15','par semaine (Spector et al.)','cellules ; 1000+ espèces','liquide total par jour','plus long augmente le risque d\'hémorroïdes'],
      tipsH:['Manger 30+ aliments végétaux différents par semaine','Viser 25–30 g de fibres par jour','Inclure des aliments fermentés','Boire suffisamment d\'eau','Couper les aliments ultra-transformés','Bouger régulièrement','Gérer le stress','Ne pas surconsommer d\'antibiotiques','Se faire dépister pour le cancer colorectal'],
      tipsP:[
        'La diversité microbienne suit la diversité végétale. Comptez séparément légumes, fruits, céréales complètes, légumineuses, fruits à coque, graines, herbes et épices.',
        'Haricots, lentilles, céréales complètes, légumes, fruits, graines. Les fibres insolubles (son, légumes) ajoutent du volume ; les solubles (avoine, haricots, fruits) nourrissent les microbes.',
        'Yaourt, kéfir, choucroute, kimchi, miso, bouillies fermentées traditionnelles (ogi, ji), produits à base de garri. Augmentent la diversité du microbiome et baissent les marqueurs d\'inflammation.',
        'Constipation, calculs rénaux et céphalées de déshydratation répondent tous à un apport adéquat. Urine jaune pâle est l\'indicateur le plus simple.',
        'Les émulsifiants (polysorbate 80, CMC) et les édulcorants artificiels altèrent le microbiome et la couche de mucus dans les études animales et récentes humaines.',
        'Même une activité aérobique modérée améliore la motilité intestinale et la composition du microbiome indépendamment du régime.',
        'L\'axe intestin-cerveau est bidirectionnel. Le stress chronique altère la motilité, augmente la sensibilité viscérale et modifie le microbiome.',
        'Ne prenez que ce qui est nécessaire ; terminez la cure prescrite. Chaque cure perturbe la flore intestinale pour des semaines à des mois.',
        'À partir de 45 ans (USPSTF 2021) pour les adultes à risque moyen — plus tôt en cas d\'antécédents familiaux. FIT, coloscopie ou test ADN selon les recommandations.'
      ],
      warnsH:['Symptômes d\'alerte'],
      warnsP:['Sang dans les selles, perte de poids inexpliquée, changement persistant du transit, douleur abdominale qui vous réveille la nuit, difficulté à avaler, vomissement de sang. Consultez rapidement.']
    },
    kidneys: {
      title:'Reins & foie',
      eyebrow:'Systèmes corporels · Filtration & détox',
      intro:'Les reins filtrent ~180 L de sang par jour ; le foie traite presque chaque nutriment et médicament absorbé. Les deux sont silencieux — l\'insuffisance rénale chronique et la stéatose hépatique ne donnent généralement aucun symptôme avant un stade avancé. Protégez-les en gérant tension, glycémie, poids, alcool et antalgiques en vente libre.',
      kvK:['DFG optimal','Albuminurie (RAC)','Eau quotidienne','Limite de sel','Prévalence NAFLD','Limite d\'alcool'],
      kvS:['mL/min/1,73 m² (varie avec l\'âge)','ratio créatinine','sauf restriction médicale','grand protecteur rénal','des adultes globalement','plus basse en cas de maladie hépatique'],
      tipsH:['Contrôler la tension de façon agressive','Gérer diabète / prédiabète','S\'hydrater régulièrement','Limiter les AINS','Réduire le sel','Minimiser l\'alcool — protéger le foie','Éviter les « nettoyages » herbaux et compléments non régulés','Ne pas mêler paracétamol et alcool important','Se faire vacciner contre l\'hépatite B ; dépister l\'hépatite C'],
      tipsP:[
        'L\'hypertension est la première cause d\'IRC après le diabète. La mesure à domicile détecte l\'hypertension « blouse blanche » et masquée.',
        'Un contrôle glycémique strict prévient et ralentit la néphropathie diabétique. Albumine urinaire annuelle si vous êtes diabétique.',
        '2–3 L de liquide par jour (surtout de l\'eau) réduit le risque de calcul rénal d\'environ 50 %. Urine jaune pâle = cible. (Restreint dans l\'IRC avérée.)',
        'L\'usage chronique d\'AINS endommage les reins et augmente le risque CV. Préférez le paracétamol aux doses recommandées si approprié.',
        'Le sodium élevé augmente la TA et la pression intra-glomérulaire. <5 g de sel/jour. Caché dans bouillons, sauce soja, cubes, pain industriel.',
        'Même la consommation « modérée » est impliquée dans la stéatose. <14 unités/semaine est un seuil prudent ; plus bas si enzymes hépatiques anormaux.',
        'De nombreux remèdes traditionnels contiennent de l\'acide aristolochique (néphrotoxique, cancérogène) ou sont contaminés. La « détox », le foie et les reins le font déjà.',
        'L\'insuffisance hépatique aiguë par paracétamol est la principale cause d\'insuffisance hépatique aiguë. Restez dans les doses recommandées (≤3 g/jour adulte).',
        'Tous deux sont des causes majeures de cancer du foie. Le vaccin VHB est très efficace ; le VHC est désormais guérissable avec les antiviraux à action directe.'
      ]
    },
    skin: {
      title:'Santé de la peau',
      eyebrow:'Systèmes corporels · Téguments',
      intro:'Plus grand organe du corps, la peau est aussi votre première ligne de défense et une fenêtre sur la santé systémique. Le cancer de la peau est le cancer le plus fréquent au monde — et presque entièrement évitable. Les affections inflammatoires (acné, eczéma, psoriasis) sont de plus en plus reconnues comme ayant des contributeurs systémiques et alimentaires.',
      kvK:['Protection solaire','Seuil indice UV','Auto-examen cutané','Eau','Impact du sommeil'],
      kvS:['large spectre, réappliquer toutes les 2 h','temps d\'ombre & écran','noter nouveaux grains ou changements','joue un rôle modéré','augmentation des marqueurs de vieillissement avec un mauvais sommeil'],
      tipsH:['SPF 30+ large spectre quotidien','Appliquer la règle ABCDE aux grains','Ne pas utiliser de cabines de bronzage','Nettoyage doux deux fois par jour','Pour l\'acné — limiter laitages, sucre et ultra-transformés','Arrêter de fumer','Gérer stress et sommeil','Tester tout nouveau soin','Voir un dermatologue si grain qui change, éruption persistante ou plaie qui ne guérit pas'],
      tipsP:[
        'Toute l\'année, même par temps nuageux. Réappliquer toutes les 2 h en extérieur et après baignade. L\'intervention anti-âge la plus prouvée.',
        'Asymétrie, Bords irréguliers, Couleur variée, Diamètre >6 mm, Évolution. Tout grain « vilain canard » différent des autres mérite un avis dermatologique.',
        'Cancérogène Groupe 1 IARC. Chaque usage augmente le risque de mélanome — surtout avant 35 ans.',
        'Eau tiède, nettoyant doux non savonneux. L\'eau chaude et les savons agressifs détruisent la barrière. Tamponner sec ; hydrater dans les 3 min.',
        'Charges glycémiques élevées et peut-être le lait écrémé aggravent l\'acné. Rétinoïdes topiques et peroxyde de benzoyle restent en première ligne.',
        'Accélère le vieillissement cutané par ~150 mécanismes ; ralentit la cicatrisation ; double le risque de récidive de cancer cutané.',
        'Le stress aggrave eczéma, psoriasis, acné et rosacée. Le manque de sommeil augmente la perte d\'eau transépidermique et vieillit la peau.',
        'Appliquez sur l\'avant-bras quotidiennement 5 jours avant utilisation faciale complète. Surtout pour rétinoïdes, AHA et huiles essentielles.',
        'N\'attendez pas — la plupart des cancers cutanés détectés tôt sont entièrement guérissables.'
      ]
    },
    eyes: {
      title:'Santé oculaire & vision',
      eyebrow:'Systèmes corporels · Vision',
      intro:'Les deux principales causes de cécité évitable — cataracte et dégénérescence maculaire liée à l\'âge — ont des facteurs de risque modifiables. La vision des enfants est remodelée par les modes de vie d\'intérieur : la myopie mondiale augmente vite et devrait concerner la moitié de la population mondiale d\'ici 2050.',
      kvK:['Examen complet','Temps en plein air (enfants)','Règle 20-20-20','Protection UV','Prévention DMLA'],
      kvS:['après 40 ans ; plus souvent en cas de facteurs de risque','protège contre la myopie','toutes les 20 min d\'écran','lunettes toute l\'année','légumes-feuilles, œufs, AREDS2'],
      tipsH:['Faire un examen oculaire complet','Porter des lunettes anti-UV','Pratiquer la règle 20-20-20','Pour les enfants — le temps en plein air compte','Manger quotidiennement des légumes-feuilles','Gérer diabète et tension','Ne pas fumer','Utiliser une protection oculaire au travail et au sport','Ne pas ignorer les symptômes soudains'],
      tipsP:[
        'Inclut pression intraoculaire (dépistage glaucome), fond d\'œil dilaté et acuité visuelle. Même sans symptômes, tous les 2 ans dès 40 ans.',
        'Cherchez UV400 / 100 % protection UV. L\'exposition aux UV est impliquée dans cataracte, ptérygion et DMLA.',
        'Toutes les 20 minutes de vision de près, regardez quelque chose à 20 pieds (6 m) pendant 20 secondes. Clignez complètement.',
        '≥2 heures de lumière du jour en extérieur quotidiennement retardent l\'apparition de la myopie. Une fois installée, la ralentir est plus difficile que l\'empêcher.',
        'Lutéine et zéaxanthine (chou kale, épinard, ndolé, ugu, ewedu, œufs, maïs) protègent la macula. La formule AREDS2 ralentit la progression de la DMLA intermédiaire.',
        'La rétinopathie diabétique est la principale cause de cécité chez les adultes en âge de travailler. Un contrôle strict prévient et ralentit la progression.',
        'Le tabagisme double le risque de DMLA et accélère le développement de la cataracte.',
        'La plupart des traumatismes oculaires sont évitables — lunettes de sécurité pour meulage, perçage, menuiserie ; protection spécifique pour sports de raquette.',
        'Perte de vision soudaine, éclairs, rideau ou ombre, douleur intense — urgences. Décollement de rétine, glaucome aigu ou AVC possibles.'
      ]
    },
    women: {
      title:'Santé féminine',
      eyebrow:'Systèmes corporels · Santé féminine',
      intro:'Un résumé ciblé des priorités préventives et reproductives au fil de la vie. Les plus grands gains viennent du dépistage (col, sein), de la vaccination (HPV) et de la gestion des risques modifiables (tabac, alcool, poids, sédentarité).',
      kvK:['Vaccin HPV','Dépistage cervical','Mammographie','Acide folique','Aliments riches en fer'],
      kvS:['rattrapage jusqu\'à 45','dès 21–25 ans (selon région)','dès 40–50 ans en général','avant & début de grossesse','surtout femmes menstruées'],
      tipsH:['Vaccination HPV','Dépistage cervical','Connaissance et dépistage des seins','Gérer fer et folate','Plancher pelvien — à tout âge','Santé osseuse dès le milieu de vie','Ménopause — s\'informer','Ne pas fumer ; minimiser l\'alcool','Demander de l\'aide pour règles abondantes ou douloureuses'],
      tipsP:[
        'Prévient ~90 % des cancers du col et une part importante des cancers anaux, oropharyngés, vulvaires et vaginaux. Recommandé 9–26 ans, rattrapage jusqu\'à 45 selon recommandations.',
        'Test HPV ou frottis dès 21–25 ans (selon région), tous les 3–5 ans. Le programme de dépistage le plus impactant jamais introduit.',
        'Sachez ce que vos seins ressentent normalement ; signalez tout changement (boules, peau, écoulement, rétraction). Calendrier mammographique selon recommandations locales.',
        'Règles abondantes et grossesse augmentent les besoins en fer. Folate (légumes-feuilles, légumineuses, céréales enrichies) prévient les anomalies du tube neural — commencer avant conception.',
        'Kegels quotidiens (contractions lentes, 10–15 répétitions, 3 séries) réduisent l\'incontinence d\'effort et soutiennent la récupération post-partum. La kiné périnéale est très efficace.',
        'Calcium adéquat (1000–1200 mg/jour), vitamine D (600–800 UI), exercice porteur, éviter tabac et excès d\'alcool. DEXA à la ménopause si facteurs de risque.',
        'Bouffées de chaleur, troubles du sommeil, humeur et sécheresse vaginale sont traitables. Le THM moderne a un profil bénéfice-risque favorable pour beaucoup de femmes en début de ménopause. À discuter avec un clinicien informé.',
        'Le tabagisme accélère la ménopause et augmente tous les risques de cancer. Même 1 verre/jour augmente le risque de cancer du sein de ~7–10 %.',
        'Ils sont courants mais pas normaux s\'ils limitent votre vie. Endométriose, fibromes et adénomyose sont traitables. N\'attendez pas des années.'
      ]
    },
    men: {
      title:'Santé masculine',
      eyebrow:'Systèmes corporels · Santé masculine',
      intro:'Globalement, les hommes meurent ~5 ans plus jeunes que les femmes. La plus grande partie de cet écart est évitable : maladies cardiovasculaires, cancer, suicide et accidents constituent la majorité des décès masculins évitables. Les interventions ci-dessous portent sur les leviers à plus fort impact.',
      kvK:['Dépistage TA','Cholestérol','Dépistage colorectal','Prostate (PSA)','Tour de taille','Autopalpation testiculaire'],
      kvS:['dès 18 ans','tous les 4–6 ans dès 20 ans','dès 45 ans (USPSTF 2021)','décision partagée à partir de 50 (ou 45 avec facteurs de risque)','<90 cm en Asie du Sud','15–35 ans'],
      tipsH:['Connaître ses chiffres','Dépistage colorectal dès 45 ans','Prostate — décision partagée éclairée','Autopalpation testiculaire','Ne pas négliger la santé mentale','Bouger et faire de la musculation','Aborder la DE comme un signal vasculaire','Boire moins d\'alcool','Protection auditive'],
      tipsP:[
        'TA chaque année dès 18 ans. Cholestérol dès 20. HbA1c si surpoids, antécédents familiaux ou >45 ans. La plupart des hommes évitent le médecin jusqu\'à un problème — programmez une consultation de base.',
        'FIT, coloscopie ou test ADN. Très efficace ; les hommes ont une incidence plus élevée que les femmes. Plus tôt en cas d\'antécédents familiaux.',
        'Le dépistage PSA a des bénéfices et des inconvénients. Discutez avec votre médecin dès 50 ans (45 si origine africaine ou antécédents familiaux). Les hommes d\'origine africaine ont un risque plus élevé et plus précoce.',
        'Chaque mois de l\'adolescence à ~35 ans. La plupart des cancers testiculaires sont très guérissables s\'ils sont détectés tôt. Toute nouvelle masse mérite évaluation.',
        'Les hommes consultent moins et ont des taux de suicide plus élevés. Les symptômes dépressifs chez l\'homme se présentent souvent comme irritabilité, colère, prise de risque ou consommation de substances plutôt que tristesse.',
        'La musculation 2×/semaine préserve masse musculaire, testostérone et densité osseuse. Aérobic + résistance est la combinaison la plus cardioprotectrice.',
        'Une DE nouvelle chez l\'homme d\'âge moyen précède souvent un événement CV de 3–5 ans. Ne vous auto-traitez pas avec des pilules en ligne — faites-vous évaluer.',
        'Les hommes dépassent plus souvent les seuils à risque. <14 unités/semaine, idéalement moins. Plusieurs jours sans alcool par semaine.',
        'La perte auditive induite par le bruit est irréversible. Protections pour outils électriques, motos, concerts, tir. La perte auditive de mi-vie est le plus grand facteur de risque de démence.'
      ]
    }
  },

  /* ===== AFRICAN FOODS ===== */
  africanFood: {
    'Plantain (boiled, steamed)':{ nm:'Plantain (bouilli, vapeur)', desc:'Amidon résistant, potassium, vitamine A. Préférer bouilli, à la vapeur ou rôti avec la peau. Éviter le « kelewele » ou « dodo » très frit au quotidien.', why:'Charge glycémique plus basse que les céréales raffinées' },
    'Beans, cowpeas, black-eyed peas (red beans, niebe)':{ nm:'Haricots, niébé, dolique à œil noir (haricots rouges, niébé)', desc:'Excellente protéine, fibres, folate, fer. Remplacez une partie de la viande rouge par des haricots 3–4 fois/semaine.', why:'Protéine végétale, faible en gras, riche en fibres' },
    'Dark leafy greens (ndolé, ugu, ewedu, cassava leaves, sokoyokoto)':{ nm:'Légumes-feuilles foncés (ndolé, ugu, ewedu, feuilles de manioc, sokoyokoto)', desc:'Folate, vitamine K, lutéine, fer. Quotidien si disponible. Cuisez brièvement pour préserver les nutriments.', why:'Protection cardiovasculaire, oculaire, neurale' },
    'Whole grains: brown rice, fonio, sorghum, millet, teff':{ nm:'Céréales complètes : riz brun, fonio, sorgho, mil, teff', desc:'Mieux que le riz blanc raffiné. Le fonio en particulier a un faible index glycémique et est riche en acides aminés.', why:'Élévation glycémique plus lente, plus de fibres' },
    'Fish (especially fresh, not heavily smoked)':{ nm:'Poisson (surtout frais, pas fortement fumé)', desc:'Tilapia, maquereau, sardine apportent des oméga-3. Deux portions de poisson gras par semaine sont cardio-protectrices.', why:'Oméga-3, protéine maigre' },
    'Avocado (Pear, Ube)':{ nm:'Avocat (Pear, Ube)', desc:'Acides gras mono-insaturés sains, potassium, fibres. Excellent remplacement des tartinades saturées.', why:'Profil lipidique cardio-protecteur' },
    'Groundnuts (peanuts) — fresh, unsalted':{ nm:'Arachides — fraîches, non salées', desc:'Protéine, vitamine E, magnésium. Crucial : jeter les fruits moisis ou décolorés (risque d\'aflatoxine) et stocker au sec et frais.', why:'Cardio-protectrices, mais le stockage compte' },
    'Garlic, ginger, onion':{ nm:'Ail, gingembre, oignon', desc:'Bénéfices modestes sur tension et cholestérol. Facilement intégrés au quotidien.', why:'Cardiovasculaire, anti-inflammatoire' },
    'Hibiscus tea (bissap, sobolo, zobo)':{ nm:'Thé d\'hibiscus (bissap, sobolo, zobo)', desc:'Baisse la TA (≈7 mmHg systolique en méta-analyses). À boire non sucré ou peu sucré.', why:'Polyphénols, anthocyanes' },
    'Palm oil (refined / heated repeatedly)':{ nm:'Huile de palme (raffinée / chauffée répétitivement)', desc:'L\'huile de palme rouge non raffinée contient caroténoïdes et vitamine E, et reste correcte en quantité modérée. L\'huile raffinée ou très chauffée contient des graisses oxydées et des cancérogènes possibles.', why:'À utiliser modérément ; éviter l\'huile réutilisée' },
    'Fufu, gari, eba, tô, posho (refined cassava/maize)':{ nm:'Fufu, gari, eba, tô, posho (manioc/maïs raffinés)', desc:'Charge glycémique élevée ; pauvres en fibres et protéines. Réduisez les portions ; accompagnez d\'abondants légumes et protéines. Les versions fermentées (gari, ji) sont plus saines.', why:'Riches en glucides raffinés' },
    'Smoked / dried fish and meat':{ nm:'Poisson / viande fumés ou séchés', desc:'Riches en sel, contiennent parfois des HAP du fumage. À utiliser avec parcimonie comme assaisonnement, pas comme protéine principale.', why:'Sel, HAP, additifs possibles' },
    'White rice (used as staple)':{ nm:'Riz blanc (utilisé comme staple)', desc:'Raffiné ; élève vite la glycémie. Remplacez certaines portions par riz brun, fonio ou légumineuses.', why:'Index glycémique élevé' },
    'Bouillon cubes (Maggi, Knorr, Royco)':{ nm:'Cubes bouillons (Maggi, Knorr, Royco)', desc:'Un seul cube peut contenir 1,5–2 g de sodium. À utiliser avec modération, ou substituez par ail, gingembre, herbes, citron, vinaigre.', why:'Grande source cachée de sel et MSG' },
    'Sugary drinks and "malt" drinks':{ nm:'Boissons sucrées et boissons « malt »', desc:'Certaines boissons « malt » contiennent 30+ g de sucre par bouteille — comparable au soda. À limiter strictement.', why:'Obésité, diabète, stéatose hépatique' },
    'Heavily fried street food (deep-fried in reused oil)':{ nm:'Frituration de rue intense (huile réutilisée)', desc:'Les huiles chauffées plusieurs fois accumulent des lipides oxydés, aldéhydes et acrylamide. Limitez les chips de plantain frits, puff-puff, akara, suya cuits dans de l\'huile vieille.', why:'Lipides oxydés, acrylamide, gras trans' },
    'Charred suya, kebabs, grilled goat-meat':{ nm:'Suya, brochettes, viande de chèvre carbonisée', desc:'Carbonisation et flamme directe produisent HCA et HAP. Ne mangez pas les croûtes noires ; marinez d\'abord ; cuire en chaleur indirecte.', why:'HCA et HAP (cancérogènes)' },
    'Processed sausage, corned beef, luncheon meat':{ nm:'Saucisse transformée, corned-beef, viande de déjeuner', desc:'Cancérogène Groupe 1 IARC (viande transformée). À traiter comme occasionnel, pas comme staple.', why:'Nitrites, sel, cancérogènes' },
    'Sweet biscuits, cake, chin-chin in excess':{ nm:'Biscuits sucrés, gâteau, chin-chin en excès', desc:'Sucre raffiné, farine raffinée, souvent huile de palme. À traiter comme friandises, pas comme aliments quotidiens.', why:'Charge glycémique, ultra-transformé' },
    'Salted, dried "stockfish" / okporoko in excess':{ nm:'Stockfish salé séché / okporoko en excès', desc:'Très riche en sel. À utiliser comme base aromatique en petite quantité ; rincez avant utilisation.', why:'Grande source de sodium' }
  },

  /* ===== COOKING METHODS ===== */
  cooking: {
    'Steaming':{ method:'Vapeur', forms:'Perte minime de nutriments, sans graisse ajoutée, sans formation de cancérogène', use:'Légumes, poisson, boulettes (ex. moin-moin, koki)', notes:'Meilleur global pour préserver les vitamines hydrosolubles.' },
    'Boiling / poaching':{ method:'Ébullition / pochage', forms:'Perte modérée de vitamines hydrosolubles ; sans cancérogène', use:'Igname, plantain, haricots, soupes, ragoûts', notes:'Utilisez le liquide de cuisson dans les ragoûts pour conserver les nutriments.' },
    'Braising / stewing (slow-cooked)':{ method:'Braisage / ragoût (cuisson lente)', forms:'HCA/HAP négligeables ; attendrit les morceaux durs', use:'Ragoûts, soupes, sauces ofada, soupes d\'arachide et de noix de palme', notes:'Excellente méthode traditionnelle — préserve goût et nutriments.' },
    'Roasting / baking (moderate temp, <200°C)':{ method:'Rôtissage / cuisson au four (température modérée, <200°C)', forms:'Acrylamide modeste dans féculents ; HCA minimes dans viandes', use:'Poisson entier, patate douce, plantain, pains', notes:'Cuire jusqu\'au doré, pas au brun. Utilisez du papier sulfurisé.' },
    'Grilling on direct flame / open coals':{ method:'Grillade flamme directe / charbon ouvert', forms:'Formation de HCA et HAP dans la viande', use:'Suya, poulet, poisson, brochettes', notes:'Marinez d\'abord (réduit les HCA ~90 %) ; évitez la carbonisation ; ne laissez pas la graisse goutter sur les braises ; retournez souvent ; consommer modérément.' },
    'Pan-frying (fresh oil, moderate heat)':{ method:'Friture à la poêle (huile fraîche, chaleur modérée)', forms:'Oxydation modérée si surchauffée', use:'Œufs, poisson, légumes', notes:'Assez d\'huile pour ne pas coller ; ne dépassez pas le point de fumée ; ne réutilisez pas plus d\'une fois.' },
    'Deep frying (fresh oil, controlled temp)':{ method:'Friture profonde (huile fraîche, température contrôlée)', forms:'Acrylamide dans féculents, gras trans, lipides oxydés', use:'Akara, puff-puff, chips de plantain, poisson frit', notes:'Limitez la fréquence ; cuire au doré pas au brun ; ne réutilisez pas plus d\'1–2 fois ; refroidir entre usages ; jeter si rance ou fume bas.' },
    'Deep frying in reused / overheated oil':{ method:'Friture dans huile réutilisée / surchauffée', forms:'Gras trans, composés polaires, 4-hydroxy-2-nonénal, acrylamide', use:'À éviter. Courante dans la cuisine de rue où la pression économique conduit à réutiliser.', notes:'Fortement liée à inflammation, maladie CV et risque de cancer.' },
    'Charcoal-grilled with heavy char':{ method:'Grillade au charbon, très carbonisée', forms:'HCA et HAP élevés', use:'Limitez suya carbonisé, steak « bien cuit », peau de poisson noircie', notes:'Coupez les parties noires ; marinez ; cuisez en chaleur indirecte.' },
    'Smoking (heavy traditional smoking)':{ method:'Fumage (fumage traditionnel intense)', forms:'HAP, formaldéhyde, nitrosamines', use:'Poisson fumé, viande fumée — courant en Afrique de l\'Ouest', notes:'À utiliser comme arôme avec parcimonie, pas comme staple quotidien.' }
  },

  /* ===== QUIZZES (titles + intros) ===== */
  quiz: {
    'q-carcinogens':{ title:'Cancérogènes : connaissez-vous les catégories IARC ?', intro:'Six questions sur la classification des risques par la première agence mondiale de recherche sur le cancer.' },
    'q-heart':{ title:'Santé du cœur — connaissez vos chiffres', intro:'Sept questions sur les cibles cardiovasculaires et le mode de vie.' },
    'q-sleep':{ title:'Sommeil — ce qui compte vraiment', intro:'Six questions sur la science du sommeil.' },
    'q-cooking':{ title:'Aliments africains & méthodes de cuisson', intro:'Huit questions sur les aliments traditionnels, la préparation, et que garder ou modifier.' },
    'q-natural':{ title:'Remèdes naturels — que dit la science', intro:'Six questions pour distinguer les preuves du folklore.' },
    'q-sleep-cycle':{ title:'Le cycle du sommeil en profondeur', intro:'Cinq questions sur l\'architecture du sommeil.' },
    'q-skin-eyes':{ title:'Santé de la peau & des yeux', intro:'Six questions pour protéger ces organes visibles.' },
    'q-kidney-liver':{ title:'Reins & foie', intro:'Cinq questions sur les organes silencieux.' }
  }
};

window.FR_DATA = FR_DATA;
