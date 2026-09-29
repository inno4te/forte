/* ============================================================
   Team21 Health Platform — Content Data
   All entries below derive from peer-reviewed sources;
   citations are appended to each entry.
   ============================================================ */

const TOPICS = {

  /* =========== DIET & BEVERAGES =========== */
  diet: [
    {
      id:'processed-meat',
      name:'Processed Meat',
      sub:'bacon, sausage, ham, salami, hot dogs, deli meats',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Meat preserved by smoking, curing, salting, or addition of chemical preservatives (notably sodium nitrite/nitrate). High-temperature processing forms N-nitroso compounds, heterocyclic amines (HCAs), and polycyclic aromatic hydrocarbons (PAHs).'},
        {h:'Where you\'ll find it', list:['Bacon, ham, prosciutto, pancetta','Hot dogs, frankfurters, bratwurst','Salami, pepperoni, chorizo, mortadella','Deli sliced turkey, chicken roll, corned beef','Canned meat (Spam), beef jerky, biltong']},
        {h:'Label aliases', p:'"Uncured" meats with celery powder or celery juice contain natural nitrates that convert to nitrites identically; "smoke flavoring," "sodium nitrite (E250)," "sodium nitrate (E251)," "potassium nitrate (E252)."'},
        {h:'Risk evidence', p:'Each 50 g/day increase in processed meat raises colorectal cancer risk by ~18%. Also linked to stomach cancer and ischaemic heart disease.'}
      ],
      cite:'IARC Monograph Vol. 114 (2018); Bouvard et al., Lancet Oncology (2015); WHO Q&A on red & processed meat (2015).'
    },
    {
      id:'red-meat',
      name:'Red Meat',
      sub:'beef, pork, lamb, mutton, veal, goat',
      iarc:'g2a', iarcLabel:'IARC Group 2A',
      blocks:[
        {h:'What it is', p:'Unprocessed mammalian muscle meat. Heme iron content, plus mutagens formed when meat is cooked at high temperatures (grilling, frying, barbecuing), are the primary suspected mechanisms.'},
        {h:'Where you\'ll find it', list:['Steaks, roasts, ground beef, hamburgers','Pork chops, pork tenderloin, ribs','Lamb, mutton, goat, veal']},
        {h:'Higher-risk preparations', p:'Charred, blackened, grilled-over-flame, deep-fried or pan-seared meats produce heterocyclic amines (HCAs) and polycyclic aromatic hydrocarbons (PAHs). Slow-cooked, braised, stewed or boiled meats have markedly lower mutagen formation.'},
        {h:'Risk evidence', p:'Each 100 g/day increase associated with ~17% higher colorectal cancer risk; weaker associations with pancreatic and prostate cancer.'}
      ],
      cite:'IARC Monograph Vol. 114; World Cancer Research Fund (WCRF/AICR) Continuous Update Project, 2018.'
    },
    {
      id:'alcohol',
      name:'Alcoholic Beverages',
      sub:'ethanol from wine, beer, spirits',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Ethanol is metabolised to acetaldehyde, itself a Group 1 carcinogen that damages DNA. There is no safe level of alcohol consumption with respect to cancer risk (WHO, 2023 Lancet statement).'},
        {h:'Cancers causally linked', list:['Mouth, pharynx, larynx, oesophagus','Liver (hepatocellular carcinoma)','Breast (even at low intake — 1 drink/day raises risk ~7–10%)','Colorectum']},
        {h:'Risk evidence', p:'About 4% of all new cancers globally (≈740,000 cases in 2020) attributable to alcohol; light drinking (≤2 drinks/day) responsible for 14% of alcohol-attributable cancers.'}
      ],
      cite:'IARC Monograph Vol. 100E; Rumgay et al., Lancet Oncology (2021); WHO Europe (2023): "No safe amount of alcohol."'
    },
    {
      id:'ssb',
      name:'Sugar-Sweetened Beverages',
      sub:'soda, energy drinks, sweetened juice, sweet tea',
      iarc:'lifestyle', iarcLabel:'Strong dietary risk',
      blocks:[
        {h:'What it is', p:'Beverages with added free sugars — sucrose, high-fructose corn syrup (HFCS), glucose-fructose syrup, fruit juice concentrates. Rapid glucose & fructose absorption drives insulin spikes, hepatic de novo lipogenesis, and weight gain.'},
        {h:'Hidden names on labels', list:['HFCS-55, HFCS-42, glucose-fructose syrup, isoglucose','Cane sugar, evaporated cane juice, beet sugar, dextrose','Agave nectar, fruit juice concentrate, rice syrup','Maltose, maltodextrin, sucrose, invert sugar']},
        {h:'Linked outcomes', p:'Type 2 diabetes, obesity, fatty liver disease, hypertension, cardiovascular disease, and, via obesity, ≥13 cancers (endometrial, oesophageal adenocarcinoma, kidney, liver, post-menopausal breast).'}
      ],
      cite:'Malik & Hu, Nature Reviews Endocrinology (2022); WHO Sugar Guideline (2015); Llaha et al., Nutrients (2021) — SSB & cancer meta-analysis.'
    },
    {
      id:'aflatoxin',
      name:'Aflatoxins',
      sub:'mould toxin contaminating grains & nuts',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Mycotoxins produced by Aspergillus flavus and A. parasiticus. Aflatoxin B1 is among the most potent natural hepatocarcinogens known.'},
        {h:'Foods at risk', list:['Peanuts and peanut butter (especially from humid storage)','Maize/corn, sorghum, millet','Tree nuts (pistachios, Brazil nuts, almonds)','Dried figs, copra, cottonseed','Milk from animals fed contaminated feed (aflatoxin M1)']},
        {h:'Reduce exposure', p:'Buy fresh, properly stored nuts/grains. Discard mouldy, discoloured or shriveled kernels. Store in cool, dry conditions. Regulated maximum levels exist in EU, US, China — but exposure remains high in many regions.'}
      ],
      cite:'IARC Monograph Vol. 100F; Liu & Wu, Environmental Health Perspectives (2010) — global hepatocellular carcinoma burden from aflatoxin.'
    },
    {
      id:'acrylamide',
      name:'Acrylamide',
      sub:'formed in starchy foods cooked above ~120°C',
      iarc:'g2a', iarcLabel:'IARC Group 2A',
      blocks:[
        {h:'What it is', p:'A chemical formed via the Maillard reaction between the amino acid asparagine and reducing sugars during high-temperature dry cooking (frying, roasting, baking, toasting).'},
        {h:'Main dietary sources', list:['French fries, potato chips/crisps','Roasted coffee (especially dark roasts)','Toast, crackers, breakfast cereals','Biscuits, pretzels, baked goods','Browned bread crusts']},
        {h:'Reduce exposure', p:'Cook potatoes to a golden-yellow (not brown) colour. Store potatoes outside the refrigerator (cold storage raises sugar levels). Toast bread lightly. Soak raw potato slices for 15–30 min before frying.'}
      ],
      cite:'EFSA Scientific Opinion on Acrylamide in Food (2015); IARC Monograph Vol. 60; FDA Acrylamide Action Plan.'
    },
    {
      id:'trans-fat',
      name:'Industrial Trans Fats',
      sub:'partially hydrogenated vegetable oils',
      iarc:'lifestyle', iarcLabel:'Cardiovascular & metabolic risk',
      blocks:[
        {h:'What it is', p:'Unsaturated fats with one or more trans double bonds, mostly produced industrially by partial hydrogenation of vegetable oils. Banned or phased out in many countries (US, EU, Denmark, Canada).'},
        {h:'Where they may still hide', list:['"Partially hydrogenated" oils (any kind)','Vegetable shortening, some margarines','Commercial baked goods: pies, doughnuts, biscuits','Microwave popcorn, non-dairy creamers','Deep-fried street foods using re-used oil']},
        {h:'Outcomes', p:'Each 2% energy intake from trans fat raises coronary heart disease risk by ~23%. WHO target: eliminate industrial trans fats globally by 2025.'}
      ],
      cite:'WHO REPLACE Action Package (2018); Mozaffarian et al., NEJM (2006); Brandt et al., JAMA (2017).'
    },
    {
      id:'upf',
      name:'Ultra-Processed Foods',
      sub:'NOVA group 4 — industrial formulations',
      iarc:'lifestyle', iarcLabel:'Strong epidemiologic risk',
      blocks:[
        {h:'What it is', p:'Industrial formulations made primarily from substances extracted from foods (oils, starches, sugars, protein isolates) and additives, with little to no whole food. Defined by the NOVA classification.'},
        {h:'Common examples', list:['Soft drinks, sweetened breakfast cereals','Packaged snacks, chocolate bars, ice cream','Instant noodles, dehydrated soups','Reconstituted meat products (nuggets, sausages)','Mass-produced breads with emulsifiers','Margarines, "fruit" drinks, flavoured yoghurts']},
        {h:'Outcomes (per 10% increase in UPF intake)', p:'+12% overall cancer, +11% breast cancer (Fiolet et al., BMJ 2018); higher all-cause mortality (Schnabel et al., JAMA IM 2019); +24% cardiovascular events (Srour et al., BMJ 2019).'}
      ],
      cite:'Monteiro et al., Public Health Nutrition (NOVA framework); Lane et al., BMJ umbrella review (2024).'
    },
    {
      id:'hot-bev',
      name:'Very Hot Beverages (>65°C)',
      sub:'tea, coffee, mate — when scalding hot',
      iarc:'g2a', iarcLabel:'IARC Group 2A',
      blocks:[
        {h:'What it is', p:'Repeated thermal injury to oesophageal epithelium from beverages drunk at very high temperatures. The risk is from temperature, not the beverage itself.'},
        {h:'Reduce risk', p:'Allow tea, coffee, and mate to cool to a comfortable drinking temperature (below ~60°C). The beverages themselves — coffee in particular — are not classified as carcinogenic; coffee was downgraded from Group 2B in 2016.'}
      ],
      cite:'IARC Monograph Vol. 116 (2018); Loomis et al., Lancet Oncology (2016).'
    },
    {
      id:'salted-fish',
      name:'Chinese-Style Salted Fish',
      sub:'and other heavily salt-preserved fish',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Fish preserved by salting and partial drying. Generates N-nitroso compounds and other genotoxic intermediates. Strongly associated with nasopharyngeal carcinoma, particularly when consumed in childhood.'},
        {h:'Broader picture', p:'High dietary salt intake more generally is associated with elevated risk of stomach cancer and hypertension. WHO recommends <5 g/day of salt (≈1 tsp).'}
      ],
      cite:'IARC Monograph Vol. 100E; WHO Sodium Intake for Adults and Children (2012).'
    }
  ],

  /* =========== FOOD ADDITIVES =========== */
  additives: [
    {
      id:'carrageenan',
      name:'Carrageenan',
      sub:'seaweed-derived thickener & stabiliser',
      iarc:'g2b', iarcLabel:'Degraded form: IARC 2B',
      blocks:[
        {h:'What it is', p:'A polysaccharide extracted from red seaweed (chondrus crispus, eucheuma). Used as a thickener, emulsifier, gelling agent. Degraded carrageenan (low molecular weight, also called poligeenan) is classified Group 2B by IARC; food-grade (undegraded) carrageenan remains approved by JECFA and FDA, though it has been shown in animal and in-vitro studies to promote intestinal inflammation.'},
        {h:'Where to find it', list:['Dairy: chocolate milk, ice cream, cottage cheese, cream cheese, whipped cream, infant formula (some brands)','Plant milks: almond, soy, coconut, oat (especially "barista" formulations)','Deli meats and reformed meat products','Yogurts and dairy desserts','Salad dressings, sauces, jellies','Toothpaste, some pharmaceuticals']},
        {h:'Label aliases', p:'"Carrageenan," "carrageen," "Irish moss extract," "E407" or "E407a" (processed eucheuma seaweed, PES), "vegetable gum," "PNG carrageenan." Note that some "carrageenan-free" plant milks substitute gellan gum or locust bean gum.'}
      ],
      cite:'IARC Monograph Vol. 31 (degraded carrageenan); Tobacman, Environmental Health Perspectives (2001); JECFA 79th meeting (2015); McKim, Critical Reviews in Toxicology (2014).'
    },
    {
      id:'aspartame',
      name:'Aspartame',
      sub:'artificial non-nutritive sweetener',
      iarc:'g2b', iarcLabel:'IARC Group 2B (2023)',
      blocks:[
        {h:'What it is', p:'Aspartyl-phenylalanine methyl ester. Approximately 200× sweeter than sucrose. In July 2023 IARC classified aspartame as "possibly carcinogenic to humans" (Group 2B), citing limited evidence for hepatocellular carcinoma. JECFA retained the acceptable daily intake (ADI) of 40 mg/kg body weight.'},
        {h:'Where to find it', list:['Diet sodas (Diet Coke, Coke Zero (varies by country), Diet Pepsi)','Sugar-free chewing gum','"Light"/"Zero" yogurts and desserts','Sugar-free flavoured water, drink mixes','Tabletop sweeteners (Equal, NutraSweet, Canderel)','Some children\'s vitamins and medicines']},
        {h:'Label aliases', p:'"Aspartame," "E951," "NutraSweet," "Equal," "Canderel," "AminoSweet," "Pal Sweet." Often co-formulated with acesulfame K (Ace-K, E950).'}
      ],
      cite:'IARC/WHO joint press release & monograph (July 2023); JECFA report (2023); Riboli et al., Lancet Oncology editorial (2023).'
    },
    {
      id:'nitrites',
      name:'Sodium Nitrite & Nitrate',
      sub:'cured meat preservatives',
      iarc:'g2a', iarcLabel:'"Ingested under conditions causing endogenous nitrosation" — IARC 2A',
      blocks:[
        {h:'What it is', p:'Preservatives that prevent Clostridium botulinum growth and give cured meats their pink colour. In the acidic stomach environment they form N-nitroso compounds, including nitrosamines, which are genotoxic.'},
        {h:'Where to find them', list:['Bacon, ham, hot dogs, salami, pepperoni','"Uncured" meats made with celery juice/powder (chemically identical exposure)','Some smoked fish']},
        {h:'Label aliases', p:'"Sodium nitrite (E250)," "sodium nitrate (E251)," "potassium nitrite (E249)," "potassium nitrate / saltpetre (E252)," "celery powder," "celery juice concentrate," "natural curing agents."'}
      ],
      cite:'IARC Monograph Vol. 94; EFSA opinion on nitrates and nitrites (2017).'
    },
    {
      id:'bha-bht',
      name:'BHA & BHT',
      sub:'butylated hydroxyanisole / hydroxytoluene',
      iarc:'g2b', iarcLabel:'BHA: IARC Group 2B',
      blocks:[
        {h:'What it is', p:'Synthetic antioxidants added to fat-containing foods to prevent rancidity. BHA (butylated hydroxyanisole) is classified Group 2B; BHT (butylated hydroxytoluene) has shown contradictory animal data and is considered less concerning by most regulators.'},
        {h:'Where to find them', list:['Cereals, granola bars, instant mashed potatoes','Chewing gum (especially older formulations)','Snack chips, crackers, vegetable oils','Lard, shortening, butter substitutes','Some pet foods and rubber/petroleum products']},
        {h:'Label aliases', p:'"BHA," "Butylated hydroxyanisole," "E320." "BHT," "Butylated hydroxytoluene," "E321." Sometimes listed simply as "to preserve freshness" — check ingredients.'}
      ],
      cite:'IARC Monograph Vol. 40; US NTP Report on Carcinogens (BHA); EFSA re-evaluation (2012).'
    },
    {
      id:'tio2',
      name:'Titanium Dioxide (E171)',
      sub:'white food pigment',
      iarc:'g2b', iarcLabel:'IARC Group 2B (inhaled)',
      blocks:[
        {h:'What it is', p:'Inorganic white pigment containing nano-sized particles. In May 2021, EFSA concluded E171 "can no longer be considered safe as a food additive" due to genotoxicity concerns; the EU banned it in food from August 2022. Still permitted in the US and many other markets.'},
        {h:'Where to find it', list:['Chewing gum, white-coated candies (Skittles, mints)','White icing, frostings, some marshmallows','Coffee creamers, white sauces','Toothpaste, sunscreens, cosmetics (different exposure route)','Pharmaceutical tablet coatings']},
        {h:'Label aliases', p:'"Titanium dioxide," "E171," "CI 77891," "TiO2."'}
      ],
      cite:'EFSA Scientific Opinion on E171 (2021); IARC Monograph Vol. 93.'
    },
    {
      id:'dyes',
      name:'Synthetic Food Dyes',
      sub:'azo and triphenylmethane colours',
      iarc:'lifestyle', iarcLabel:'Behavioural & possible carcinogenic concerns',
      blocks:[
        {h:'What they are', p:'Petrochemical-derived colour additives. California\'s 2021 OEHHA assessment linked several to behavioural effects in children. Red 3 (Erythrosine) is banned in cosmetics in the US since 1990 and was banned by the FDA in food in 2025 due to thyroid tumour findings in rats.'},
        {h:'Where to find them', list:['Candy, popsicles, sports drinks, sodas','Cereal, fruit snacks, gelatin desserts','Cake mixes, frostings, sprinkles','Pickles, smoked fish, salmon-coloured products','Some medications and toothpastes']},
        {h:'Label aliases (most common)', list:['Red 40 — Allura Red AC, E129','Red 3 — Erythrosine, E127','Yellow 5 — Tartrazine, E102','Yellow 6 — Sunset Yellow FCF, E110','Blue 1 — Brilliant Blue FCF, E133','Blue 2 — Indigo Carmine, E132','Green 3 — Fast Green FCF, E143']}
      ],
      cite:'California OEHHA, Health Effects Assessment: Synthetic Food Dyes in Children (2021); FDA Red 3 revocation (January 2025); JECFA evaluations.'
    },
    {
      id:'msg',
      name:'Monosodium Glutamate (MSG)',
      sub:'and related flavour enhancers',
      iarc:'lifestyle', iarcLabel:'Generally Recognized As Safe (FDA)',
      blocks:[
        {h:'What it is', p:'Sodium salt of glutamic acid. Despite persistent public concern, controlled trials have not confirmed the "Chinese restaurant syndrome." FDA classifies as GRAS. Concern is mainly that MSG appears in ultra-processed foods and may promote overeating.'},
        {h:'Label aliases (often used to avoid the term "MSG")', list:['"Hydrolysed vegetable protein," "yeast extract," "autolysed yeast"','"Sodium caseinate," "calcium caseinate"','"Glutamate," "glutamic acid," "E621"','"Natural flavour" (may contain glutamate)','"Soy protein isolate," "soy sauce powder"']}
      ],
      cite:'FDA: Questions and Answers on MSG (2012); JECFA "ADI not specified" (1987); Henry-Unaeze, Pathophysiology (2017).'
    },
    {
      id:'emulsifiers',
      name:'Synthetic Emulsifiers',
      sub:'polysorbates, carboxymethylcellulose',
      iarc:'lifestyle', iarcLabel:'Emerging metabolic/inflammatory concern',
      blocks:[
        {h:'What they are', p:'Industrial emulsifiers used to keep oil and water mixed. Animal and recent human studies suggest some disrupt the gut microbiota and mucus layer, promoting low-grade inflammation. The NutriNet-Santé cohort (Sellem et al., BMJ 2023) linked polysorbate 80 and CMC intake to cardiovascular and cancer outcomes.'},
        {h:'Where to find them', list:['Ice cream, frozen desserts, whipped toppings','Salad dressings, sauces, mayonnaises','Industrial breads, cakes, baked goods','Plant-based milks, coffee creamers']},
        {h:'Label aliases', p:'"Polysorbate 80" (E433), "Polysorbate 60" (E435), "Carboxymethylcellulose / CMC" (E466), "mono- and diglycerides of fatty acids" (E471), "DATEM" (E472e), "lecithin" (E322 — generally well tolerated).'}
      ],
      cite:'Chassaing et al., Nature (2015); Sellem et al., BMJ (2023); Naimi et al., Microbiome (2021).'
    },
    {
      id:'bromate',
      name:'Potassium Bromate',
      sub:'flour "improver" / dough conditioner',
      iarc:'g2b', iarcLabel:'IARC Group 2B',
      blocks:[
        {h:'What it is', p:'Oxidising agent added to flour to strengthen dough and produce higher-volume loaves. Banned for food use in the EU, UK, Canada, Brazil, China, Argentina, Nigeria and many others; still permitted in the US (though widely phased out by major brands) and a few Asian countries.'},
        {h:'Where to find it', list:['Some commercial breads, buns, rolls (especially in regions where still permitted)','Some pizza doughs and bagels']},
        {h:'Label aliases', p:'"Potassium bromate," "bromated flour," "E924" (delisted in EU).'}
      ],
      cite:'IARC Monograph Vol. 73; CSPI petition history; EFSA opinion.'
    }
  ],

  /* =========== ENVIRONMENT =========== */
  environment: [
    {
      id:'uv',
      name:'Solar Ultraviolet Radiation',
      sub:'UVA + UVB from sun and tanning beds',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'UVB (290–320 nm) causes direct DNA damage (pyrimidine dimers); UVA (320–400 nm) penetrates deeper and generates reactive oxygen species. Both contribute to basal cell carcinoma, squamous cell carcinoma, and melanoma. Tanning beds are an independent Group 1 carcinogen.'},
        {h:'Practical guidance', list:['Seek shade 10 a.m.–4 p.m. when UV index ≥3','Broad-spectrum sunscreen SPF 30+; reapply every 2 hours and after swimming','Wide-brim hat, UV-protective clothing, UV-blocking sunglasses','Avoid sunburn, especially in childhood — each blistering sunburn doubles melanoma risk','Do not use commercial tanning beds','Maintain healthy vitamin D via diet/supplementation rather than unprotected sun exposure']}
      ],
      cite:'IARC Monograph Vol. 100D; WHO Global Solar UV Index; Wehner et al., JAMA Dermatology (2014) — tanning bed meta-analysis.'
    },
    {
      id:'ionising',
      name:'Ionising Radiation',
      sub:'X-rays, CT scans, gamma, radon',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'High-energy radiation that breaks DNA strands. Doses are measured in millisieverts (mSv). Background exposure ≈3 mSv/year. A chest X-ray ≈0.1 mSv; abdominal CT ≈10 mSv; cardiac PET-CT ≈25 mSv.'},
        {h:'Practical guidance', list:['Decline non-medically-indicated imaging; ask "will this change management?"','For children, request dose-reduced paediatric CT protocols','Track lifetime CT exposure; one CT abdomen ≈ 100 chest X-rays','Test home for radon (second leading cause of lung cancer worldwide after smoking) — mitigate if >4 pCi/L (US) or >100 Bq/m³ (WHO)','Dental imaging: bitewings are low-dose; CBCT scans much higher — request only when indicated']}
      ],
      cite:'IARC Monograph Vol. 100D; BEIR VII Report (NAS); Smith-Bindman et al., JAMA Internal Medicine (2009, 2019); WHO Radon Handbook.'
    },
    {
      id:'tobacco',
      name:'Tobacco Smoke',
      sub:'active and second-hand',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Contains >70 known carcinogens (benzene, formaldehyde, polycyclic aromatic hydrocarbons, tobacco-specific nitrosamines NNN and NNK, polonium-210). Causes ≥16 cancers including lung, larynx, mouth, oesophagus, bladder, kidney, pancreas, cervix, stomach, liver, colorectum, and acute myeloid leukaemia.'},
        {h:'Practical guidance', p:'Quitting at any age extends life. Within 1 year of cessation, cardiovascular risk halves; within 10 years, lung cancer risk halves. Evidence-based aids: nicotine replacement therapy, varenicline, bupropion, behavioural counselling. E-cigarettes are less harmful than combustible tobacco but are not risk-free and should not be initiated by non-smokers.'}
      ],
      cite:'US Surgeon General Reports (2014, 2020); IARC Monograph Vol. 100E; WHO Framework Convention on Tobacco Control.'
    },
    {
      id:'pm25',
      name:'Outdoor Air Pollution & PM2.5',
      sub:'fine particulate matter, diesel exhaust',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Particulate matter ≤2.5 μm penetrates deep into alveoli and crosses into systemic circulation. Carries combustion-derived PAHs, transition metals, and ultrafine carbon. Lung cancer, cardiovascular disease, stroke, and (per Hill et al., Nature 2023) drives EGFR-mutant lung cancer in non-smokers.'},
        {h:'Practical guidance', list:['Check daily Air Quality Index (AQI); on high-pollution days limit outdoor exertion','HEPA air filtration indoors; close windows during smog events','Wear well-fitting FFP2/N95 masks during wildfire smoke or high-AQI days','Avoid running/cycling next to heavy traffic; choose side streets and parks','Cooking with biomass/wood stoves indoors carries similar particulate hazards — improve ventilation, switch to cleaner fuels']}
      ],
      cite:'IARC Monograph Vol. 109; WHO Global Air Quality Guidelines (2021); Hill et al., Nature (2023); Pope et al., NEJM (2009).'
    },
    {
      id:'radon',
      name:'Radon Gas',
      sub:'indoor radioactive gas from soil',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'A naturally occurring radioactive gas from uranium decay in soil and rock. Accumulates in basements and poorly ventilated lower floors. Second leading cause of lung cancer globally; first cause among non-smokers in many countries.'},
        {h:'Practical guidance', p:'Buy a charcoal short-term test kit (or alpha-track long-term, 3–12 months). WHO reference level: 100 Bq/m³. US EPA action level: 4 pCi/L (148 Bq/m³). Mitigation by sub-slab depressurisation is highly effective and typically costs $800–$2,500.'}
      ],
      cite:'WHO Handbook on Indoor Radon (2009); US EPA Citizen\'s Guide to Radon; IARC Monograph Vol. 100D.'
    },
    {
      id:'asbestos',
      name:'Asbestos',
      sub:'all six fibre types',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Naturally occurring silicate fibres. Causes mesothelioma, lung, larynx, and ovarian cancer. Banned in >60 countries; chrysotile asbestos still imported into the US until EPA\'s 2024 ban (with phase-out periods).'},
        {h:'Where it may be encountered', list:['Old building insulation, vermiculite attic insulation','Vinyl floor tiles, popcorn ceilings, roof shingles (pre-1980s buildings)','Brake linings, gaskets (industrial)','Talc-containing products historically contaminated with asbestos']}
      ],
      cite:'IARC Monograph Vol. 100C; US EPA chrysotile asbestos rule (2024); WHO factsheet on asbestos.'
    },
    {
      id:'pfas',
      name:'PFAS — "Forever Chemicals"',
      sub:'per- and polyfluoroalkyl substances',
      iarc:'g1', iarcLabel:'PFOA: IARC Group 1 (2023); PFOS: 2B',
      blocks:[
        {h:'What they are', p:'Synthetic chemicals with carbon-fluorine bonds that persist for decades in environment and body. In 2023 IARC upgraded PFOA to Group 1 ("carcinogenic to humans") based on sufficient mechanistic evidence and limited human data for kidney cancer and testicular cancer.'},
        {h:'Where exposure happens', list:['Non-stick cookware (older Teflon; new versions are PTFE-coated)','Stain-resistant carpets, fabrics ("Scotchgard"-type)','Waterproof clothing, outdoor gear','Grease-resistant fast-food wrappers, pizza boxes, microwave popcorn bags','Some cosmetics, dental floss','Firefighting foam (AFFF), contaminated drinking water near military bases/airports']},
        {h:'Label aliases / clues', p:'"PTFE," "PFOA," "PFOS," "GenX," "C8," "fluoro-" prefix in ingredients, "perfluoro-" or "polyfluoro-" prefixes. EPA set enforceable drinking water limits for 6 PFAS in April 2024.'}
      ],
      cite:'IARC Monograph Vol. 135 (2023); US EPA PFAS National Primary Drinking Water Regulation (April 2024); Steenland & Winquist, Environmental Research (2021).'
    },
    {
      id:'bpa',
      name:'Bisphenol A & Analogues',
      sub:'BPA, BPS, BPF',
      iarc:'lifestyle', iarcLabel:'Endocrine disruptor',
      blocks:[
        {h:'What it is', p:'Used in polycarbonate plastics and epoxy can linings. Acts as a weak oestrogen mimic; EFSA\'s 2023 re-assessment dramatically lowered the tolerable daily intake (TDI) ~20,000-fold based on immune-system findings.'},
        {h:'Where exposure happens', list:['Linings of metal food cans, beverage cans','Thermal paper receipts (cashier handling)','Polycarbonate water bottles, reusable cups (marked recycling #7)','Dental sealants and some composites','"BPA-free" replacements (BPS, BPF) may have similar endocrine activity']},
        {h:'Reduce exposure', p:'Choose glass, stainless steel, or BPA-free containers. Avoid microwaving food in plastic. Wash hands after handling receipts. Eat fresh/frozen rather than canned where practical.'}
      ],
      cite:'EFSA Scientific Opinion on BPA (April 2023); FDA BPA assessment.'
    }
  ],

  /* =========== LIFESTYLE EXPOSURES =========== */
  lifestyle: [
    {
      id:'obesity',
      name:'Excess Adiposity (Obesity)',
      sub:'≥13 cancers causally linked',
      iarc:'g1', iarcLabel:'IARC: sufficient evidence',
      blocks:[
        {h:'Mechanism', p:'Chronic low-grade inflammation, insulin resistance with elevated insulin/IGF-1, altered sex-hormone levels (especially post-menopausal oestrogens from adipose aromatase), adipokine dysregulation.'},
        {h:'Cancers causally linked (IARC, 2016)', list:['Oesophageal adenocarcinoma','Gastric cardia, colon, rectum, liver, gallbladder, pancreas','Post-menopausal breast, endometrium, ovary','Kidney (renal cell)','Meningioma, thyroid, multiple myeloma']},
        {h:'Healthy targets', p:'BMI 18.5–24.9; waist circumference <94 cm (men) / <80 cm (women) — ethnic-specific cut-offs lower for South Asian populations.'}
      ],
      cite:'Lauby-Secretan et al., NEJM (2016); IARC Working Group on Body Fatness; WCRF/AICR Third Expert Report (2018).'
    },
    {
      id:'inactivity',
      name:'Physical Inactivity & Sedentary Behaviour',
      sub:'independent risk factors',
      iarc:'lifestyle', iarcLabel:'Strong evidence',
      blocks:[
        {h:'Mechanism', p:'Inactivity drives weight gain but also independently raises insulin resistance, inflammation, and cancer risk via altered immune surveillance. Prolonged sitting raises risk even in people who meet exercise guidelines.'},
        {h:'Cancers reduced by physical activity', list:['Colon, breast (post-menopausal), endometrium — strong evidence','Bladder, oesophagus, kidney, stomach, lung — moderate']},
        {h:'Targets (WHO 2020)', p:'150–300 min/week moderate or 75–150 min/week vigorous aerobic activity, plus muscle-strengthening on ≥2 days. Break up sitting every 30–60 min with light movement.'}
      ],
      cite:'WHO Guidelines on Physical Activity and Sedentary Behaviour (2020); Moore et al., JAMA Internal Medicine (2016) — 1.4 million person cohort.'
    },
    {
      id:'sleep',
      name:'Sleep Deprivation & Shift Work',
      sub:'circadian disruption',
      iarc:'g2a', iarcLabel:'Night shift work: IARC Group 2A',
      blocks:[
        {h:'Mechanism', p:'Circadian misalignment suppresses nocturnal melatonin (which has anti-oxidant and anti-mitogenic effects), disrupts cortisol rhythm, impairs DNA repair, and promotes insulin resistance.'},
        {h:'Linked outcomes', p:'Breast and prostate cancer (shift workers); type 2 diabetes; cardiovascular disease; obesity; dementia (β-amyloid clearance occurs preferentially during sleep).'},
        {h:'Targets', p:'7–9 h sleep for adults. Consistent bedtime/wake schedule. Dark, cool (~18°C) bedroom. Limit blue-light exposure 1–2 h before bed. Avoid caffeine within 8 h of sleep, alcohol within 3 h.'}
      ],
      cite:'IARC Monograph Vol. 124 (2020) — Night Shift Work; Walker, Why We Sleep; NIH Sleep Disorders Research.'
    },
    {
      id:'stress',
      name:'Chronic Psychological Stress',
      sub:'HPA-axis dysregulation',
      iarc:'lifestyle', iarcLabel:'Moderate evidence',
      blocks:[
        {h:'Mechanism', p:'Chronic stress sustains cortisol and catecholamines, suppressing cell-mediated immunity (NK and T-cell function), promoting inflammation, and shifting behavioural choices toward smoking, alcohol, sedentary habits, and emotional eating.'},
        {h:'Outcomes', p:'Direct causal evidence for cancer initiation is limited, but strong evidence for cardiovascular disease, hypertension, depression, anxiety, metabolic syndrome, and acceleration of disease progression in existing cancer.'},
        {h:'Evidence-based stress mitigation', list:['Mindfulness-based stress reduction (MBSR): 8-week programme, ~20 min/day','Cognitive-behavioural therapy','Aerobic exercise (as effective as SSRIs for mild-moderate depression)','Social connection — loneliness raises mortality equivalent to ~15 cigarettes/day','Nature exposure: 120 min/week associated with improved wellbeing']}
      ],
      cite:'Cohen et al., JAMA (2007); McEwen, Physiological Reviews (2007); White et al., Scientific Reports (2019).'
    },
    {
      id:'infections',
      name:'Chronic Infections',
      sub:'HPV, HBV, HCV, H. pylori, EBV',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'What it is', p:'Infections account for ~13% of global cancers. Key drivers: human papillomavirus (HPV) → cervical, anal, oropharyngeal cancers; hepatitis B and C → liver cancer; Helicobacter pylori → gastric cancer & MALT lymphoma; Epstein-Barr virus → nasopharyngeal & some lymphomas; HIV → Kaposi sarcoma & lymphomas.'},
        {h:'Prevention', list:['HPV vaccine (recommended ages 9–26, catch-up to 45) — prevents ~90% of cervical cancers','Hepatitis B vaccine (universal infant + at-risk adults)','HCV: now curable with direct-acting antivirals; test once between 18–79 years','H. pylori: test-and-treat in high-risk populations or with relevant symptoms','Safe sexual practices; do not share injection equipment']}
      ],
      cite:'IARC Monograph Vol. 100B; de Martel et al., Lancet Global Health (2020).'
    },
    {
      id:'oral',
      name:'Poor Oral Health',
      sub:'periodontal disease & oral microbiome',
      iarc:'lifestyle', iarcLabel:'Emerging evidence',
      blocks:[
        {h:'Mechanism', p:'Chronic gingival inflammation, Porphyromonas gingivalis and Fusobacterium nucleatum, systemic inflammatory burden. F. nucleatum has been detected in colorectal tumours.'},
        {h:'Linked outcomes', p:'Cardiovascular disease, pancreatic cancer, oesophageal cancer, colorectal cancer, adverse pregnancy outcomes.'},
        {h:'Practical', p:'Brush twice daily with fluoride toothpaste, daily interdental cleaning, dental check-ups every 6–12 months, treat periodontitis early.'}
      ],
      cite:'Michaud et al., JNCI (2018); Bullman et al., Science (2017).'
    }
  ],

  /* =========== OCCUPATIONAL =========== */
  occupational: [
    {
      id:'benzene',
      name:'Benzene',
      sub:'petrochemical solvent',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'Where exposure happens', list:['Petrol/gasoline (refuelling vapours)','Vehicle exhaust, cigarette smoke (a major source for smokers)','Some paints, glues, varnishes, paint strippers','Plastics, rubber, dye industries','Recent recalls: some sunscreens, dry shampoos (manufacturing contamination)']},
        {h:'Outcomes', p:'Acute myeloid leukaemia; myelodysplastic syndromes; possibly non-Hodgkin lymphoma.'}
      ],
      cite:'IARC Monograph Vol. 120; OSHA permissible exposure limit 1 ppm.'
    },
    {
      id:'formaldehyde',
      name:'Formaldehyde',
      sub:'resins, embalming, off-gassing',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'Where exposure happens', list:['Pressed-wood products: particleboard, MDF, plywood — especially urea-formaldehyde resins in new furniture and cabinetry','Some hair-straightening ("Brazilian blowout") treatments','Some nail polishes and cosmetics','Wrinkle-resistant fabrics','Embalming, pathology labs, anatomy education']},
        {h:'Outcomes', p:'Nasopharyngeal cancer; leukaemia (especially myeloid); possibly sinonasal cancer.'},
        {h:'Reduce exposure', p:'Ventilate new furniture for weeks before heavy use; choose CARB Phase 2 / TSCA Title VI compliant or formaldehyde-free certified wood products; avoid formaldehyde-containing keratin treatments.'}
      ],
      cite:'IARC Monograph Vol. 100F; US NTP Report on Carcinogens.'
    },
    {
      id:'diesel',
      name:'Diesel Engine Exhaust',
      sub:'occupational and ambient',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'Who is exposed', p:'Truck and bus drivers, mechanics, miners (especially underground), heavy-equipment operators, dock workers, traffic police, urban dwellers near major roads.'},
        {h:'Outcomes', p:'Lung cancer; suggested association with bladder cancer.'}
      ],
      cite:'IARC Monograph Vol. 105 (2014); Silverman et al., JNCI (2012) — Diesel Exhaust in Miners Study.'
    },
    {
      id:'glyphosate',
      name:'Glyphosate',
      sub:'broad-spectrum herbicide ("Roundup")',
      iarc:'g2a', iarcLabel:'IARC Group 2A (contested)',
      blocks:[
        {h:'What it is', p:'The most-used herbicide globally. IARC classified it Group 2A ("probably carcinogenic to humans") in 2015 based on limited human evidence for non-Hodgkin lymphoma and sufficient animal evidence. EPA and EFSA have reached different conclusions; the dispute remains contested.'},
        {h:'Where exposure happens', list:['Agricultural application (occupational)','Residential lawn/garden use','Residues in oats, wheat, legumes used as "desiccation" pre-harvest','Drinking water near treated fields']},
        {h:'Reduce exposure', p:'If using, wear gloves, long sleeves, eye protection; avoid spraying in windy conditions; choose organic or "no glyphosate desiccation" oats and legumes; wash and peel produce.'}
      ],
      cite:'IARC Monograph Vol. 112 (2015); Zhang et al., Mutation Research (2019) — meta-analysis of NHL risk.'
    },
    {
      id:'silica',
      name:'Crystalline Silica Dust',
      sub:'quartz, cristobalite',
      iarc:'g1', iarcLabel:'IARC Group 1',
      blocks:[
        {h:'Who is exposed', p:'Construction (cutting concrete, stone, brick), mining, quarrying, foundry workers, sandblasters, dental laboratory technicians, engineered-stone countertop fabrication (a recent epidemic of accelerated silicosis).'},
        {h:'Outcomes', p:'Lung cancer; silicosis; chronic obstructive pulmonary disease; autoimmune diseases.'}
      ],
      cite:'IARC Monograph Vol. 100C; OSHA Silica Standard (2016).'
    },
    {
      id:'hairdressing',
      name:'Occupational Hairdressing',
      sub:'chronic exposure to dyes & solvents',
      iarc:'g2a', iarcLabel:'IARC Group 2A (as hairdresser/barber)',
      blocks:[
        {h:'What it is', p:'Occupational exposure to permanent dye precursors (aromatic amines), persulfate bleach, formaldehyde-releasing straighteners. Personal use of hair dyes is Group 3 — IARC found inadequate evidence of cancer risk from consumer use.'},
        {h:'Outcomes (occupational)', p:'Bladder cancer; possibly breast and ovarian (recent NIH Sister Study, 2019).'}
      ],
      cite:'IARC Monograph Vol. 99; Eberle et al., International Journal of Cancer (2020).'
    }
  ]
};

/* ============ PROPOSALS ============ */
const PROPOSALS = [
  {ic:'🍅',h:'Adopt a Mediterranean-style dietary pattern',p:'Emphasise vegetables, fruits, legumes, whole grains, nuts, olive oil and fish; minimise red meat, processed meat and ultra-processed foods. The PREDIMED randomised trial showed a ~30% reduction in major cardiovascular events.',ev:'Estruch et al., NEJM (2018); WCRF/AICR Third Expert Report'},
  {ic:'🥦',h:'Eat ≥400 g of vegetables & fruit daily',p:'Five servings minimum. Diverse colours provide carotenoids, polyphenols, glucosinolates and fibre that support DNA repair and a healthy gut microbiome.',ev:'WHO Healthy Diet factsheet; Aune et al., IJE (2017)'},
  {ic:'🥩',h:'Limit red meat to <500 g cooked weekly',p:'And eliminate or strongly reduce processed meats (bacon, sausage, deli meats). Replace with legumes, poultry, fish, tofu.',ev:'WCRF/AICR (2018); IARC Vol. 114'},
  {ic:'🍷',h:'Eliminate or minimise alcohol',p:'WHO 2023: no safe level for cancer risk. If you drink, follow national low-risk guidelines and have several alcohol-free days each week.',ev:'WHO Europe (2023); IARC Vol. 100E'},
  {ic:'🚭',h:'Do not smoke; avoid second-hand smoke',p:'Quitting at any age extends life. Use evidence-based aids: NRT, varenicline, bupropion, behavioural counselling. Avoid e-cigarette initiation if you have never smoked.',ev:'US Surgeon General (2020); WHO FCTC'},
  {ic:'🏃',h:'Move 150–300 minutes weekly',p:'Moderate aerobic activity plus muscle-strengthening on ≥2 days. Break up sedentary time every 30–60 minutes with brief movement.',ev:'WHO Physical Activity Guidelines (2020)'},
  {ic:'⚖️',h:'Maintain healthy body composition',p:'BMI 18.5–24.9; waist <94 cm (men) / <80 cm (women). Excess adiposity is causally linked to ≥13 cancers.',ev:'Lauby-Secretan et al., NEJM (2016)'},
  {ic:'😴',h:'Protect 7–9 hours of sleep nightly',p:'Consistent schedule, dark cool bedroom, limit blue light 1–2 h before bed. Shift workers should follow circadian-aware scheduling where possible.',ev:'IARC Vol. 124 (2020); NIH Sleep Research'},
  {ic:'🧘',h:'Practise daily stress reduction',p:'Mindfulness, CBT-based techniques, journaling, slow breathing (≤6 breaths/min for 5 min). Aim for ≥10 min daily.',ev:'McEwen, Physiol Rev (2007); Goyal et al., JAMA IM (2014)'},
  {ic:'☀️',h:'Be sun-smart',p:'Seek shade 10 a.m.–4 p.m., SPF 30+ broad-spectrum, hat & sunglasses. Avoid tanning beds entirely. Supplement vitamin D rather than seek unprotected sun.',ev:'IARC Vol. 100D; WHO Solar UV Index'},
  {ic:'💉',h:'Use evidence-based vaccinations',p:'HPV vaccine (prevents ≈90% of cervical cancers) and hepatitis B vaccine prevent two infection-driven cancers. Annual flu and updated COVID vaccines reduce systemic inflammatory burden.',ev:'IARC Vol. 100B; de Martel et al., Lancet GH (2020)'},
  {ic:'🦠',h:'Test & treat H. pylori where indicated',p:'In high-risk regions or with chronic dyspepsia/family history of gastric cancer, ask your physician about test-and-treat strategies.',ev:'IARC Vol. 100B; Maastricht VI Consensus'},
  {ic:'🥤',h:'Eliminate sugar-sweetened beverages',p:'Replace with water, unsweetened tea, sparkling water. Limit fruit juice to ≤150 ml/day. Treat diet drinks as occasional, not staples.',ev:'WHO Sugar Guideline (2015); Malik & Hu, Nat Rev Endocrinol (2022)'},
  {ic:'🍞',h:'Cut ultra-processed foods (NOVA-4) to <20% of calories',p:'Cook at home using whole or minimally-processed ingredients. Read labels — if you see >5 unfamiliar industrial ingredients, choose another product.',ev:'Fiolet et al., BMJ (2018); Lane et al., BMJ umbrella review (2024)'},
  {ic:'🧂',h:'Keep salt below 5 g (1 tsp) daily',p:'Most salt comes from processed foods. Use herbs, spices, citrus and vinegars for flavour. Lower-sodium versions of staples (soy sauce, bread, cheese) help.',ev:'WHO Sodium Intake Guidelines (2012)'},
  {ic:'🔥',h:'Cook at lower temperatures, more often by water',p:'Steam, poach, braise, slow-cook to minimise HCAs, PAHs and acrylamide. Avoid charring meat; marinate first (acids and herbs reduce HCA formation).',ev:'EFSA Acrylamide Opinion (2015); WCRF/AICR'},
  {ic:'🧴',h:'Reduce plastic food contact',p:'Choose glass or stainless steel. Don\'t microwave food in plastic. Limit canned-food intake. Avoid handling thermal-paper receipts more than necessary.',ev:'EFSA BPA Opinion (2023)'},
  {ic:'🏠',h:'Test your home for radon',p:'Cheap charcoal kits, then alpha-track if uncertain. Mitigate if >100 Bq/m³ (WHO) or >4 pCi/L (US EPA). Most effective fix: sub-slab depressurisation.',ev:'WHO Handbook on Indoor Radon (2009)'},
  {ic:'🌳',h:'Reduce air pollution exposure',p:'Monitor AQI; use HEPA filtration indoors; mask outdoors during high-PM days; exercise on quieter streets and in parks rather than next to traffic.',ev:'WHO Air Quality Guidelines (2021); Hill et al., Nature (2023)'},
  {ic:'🪥',h:'Maintain rigorous oral health',p:'Twice-daily fluoride brushing, daily interdental cleaning, dental cleaning every 6–12 months. Treat periodontitis early.',ev:'Michaud et al., JNCI (2018)'},
  {ic:'🩺',h:'Attend recommended screenings',p:'Cervical (HPV/Pap), breast (mammography), colorectal (colonoscopy/FIT), lung (low-dose CT in current/former heavy smokers), prostate (after shared decision-making). Schedules per national guidelines.',ev:'USPSTF; ESMO; national screening programmes'},
  {ic:'☕',h:'Cool hot beverages below 60°C',p:'Tea, coffee and mate consumed scalding-hot raise oesophageal cancer risk. The drinks themselves (especially coffee) are not classified as carcinogenic.',ev:'IARC Vol. 116 (2018)'},
  {ic:'🥜',h:'Store nuts & grains cool and dry',p:'Discard any with discoloration or musty smell — aflatoxins are potent hepatocarcinogens. Buy fresh from high-turnover suppliers.',ev:'IARC Vol. 100F; Liu & Wu, EHP (2010)'},
  {ic:'🧴',h:'Choose lower-additive personal care',p:'Avoid hair-straightening treatments containing formaldehyde. Use mineral sunscreens if preferred. Read labels for PFAS in cosmetics and dental floss.',ev:'IARC Vol. 135 (2023) PFOA upgrade'}
];

/* ============ TRACKER HABITS ============ */
const HABITS = [
  {id:'veggies',  label:'5+ servings of vegetables & fruit', tag:'Diet',    sub:'≥400 g across the day'},
  {id:'noredmeat',label:'No red or processed meat today',    tag:'Diet',    sub:'or kept under 70 g'},
  {id:'wholegrain',label:'Whole grain at every meal',         tag:'Diet',    sub:'instead of refined'},
  {id:'water',    label:'Hydrated with ≥6 glasses of water',  tag:'Diet',    sub:'replaced any SSB urge'},
  {id:'noupf',    label:'No ultra-processed food today',      tag:'Diet',    sub:'NOVA-4 avoided'},
  {id:'noalcohol',label:'No alcohol today',                   tag:'Lifestyle',sub:'or within low-risk guidelines'},
  {id:'nosmoke',  label:'Tobacco-free day',                   tag:'Lifestyle',sub:'including vapes'},
  {id:'exercise', label:'≥30 min moderate activity',          tag:'Lifestyle',sub:'brisk walk minimum'},
  {id:'strength', label:'Some muscle-strengthening movement', tag:'Lifestyle',sub:'2× per week is target'},
  {id:'sit',      label:'Stood up every 30–60 min',           tag:'Lifestyle',sub:'broke sedentary blocks'},
  {id:'sun',      label:'Practised sun safety',               tag:'Environment',sub:'shade/SPF/hat as needed'},
  {id:'sleep',    label:'7–9 hours of sleep last night',      tag:'Lifestyle',sub:'consistent schedule'},
  {id:'mind',     label:'≥10 min mindfulness / breathing',    tag:'Lifestyle',sub:'stress regulation'},
  {id:'social',   label:'Meaningful social connection',       tag:'Lifestyle',sub:'voice or in-person'},
  {id:'oral',     label:'Brushed twice; interdental cleaning',tag:'Lifestyle',sub:'periodontal care'},
  {id:'temp',     label:'Hot drinks below 60°C',              tag:'Diet',    sub:'avoided scalding tea/coffee'}
];

window.TOPICS = TOPICS;
window.PROPOSALS = PROPOSALS;
window.HABITS = HABITS;
