/* ===================================================================
   FORTE EA — Population data
   Source: World Bank Open Data (indicators SP.POP.TOTL, SP.POP.GROW),
   most recent value per country. Western Sahara has no World Bank
   series; its figure is a UN DESA World Population Prospects estimate.
   Retrieved 2026-09-28.

   pop    = total population in the reference year
   growth = annual population growth, percent
   Baseline is taken at 1 July of the reference year (the convention
   for mid-year population estimates); the live counter projects
   forward from there with continuous exponential growth.
   =================================================================== */
window.FORTE_POP = {
  "algeria": { pop: 47435312, growth: 1.318, year: 2025, src: "WB" },
  "angola": { pop: 39040039, growth: 3.001, year: 2025, src: "WB" },
  "benin": { pop: 14814460, growth: 2.403, year: 2025, src: "WB" },
  "botswana": { pop: 2562122, growth: 1.613, year: 2025, src: "WB" },
  "burkina-faso": { pop: 24074580, growth: 2.208, year: 2025, src: "WB" },
  "burundi": { pop: 14390003, growth: 2.407, year: 2025, src: "WB" },
  "cabo-verde": { pop: 527326, growth: 0.466, year: 2025, src: "WB" },
  "cameroon": { pop: 29879337, growth: 2.561, year: 2025, src: "WB" },
  "car": { pop: 5513282, growth: 3.368, year: 2025, src: "WB" },
  "chad": { pop: 21003705, growth: 3.412, year: 2025, src: "WB" },
  "comoros": { pop: 882847, growth: 1.854, year: 2025, src: "WB" },
  "congo-brazzaville": { pop: 6484437, growth: 2.364, year: 2025, src: "WB" },
  "cote-divoire": { pop: 32711547, growth: 2.405, year: 2025, src: "WB" },
  "djibouti": { pop: 1184076, growth: 1.305, year: 2025, src: "WB" },
  "drc": { pop: 112832473, growth: 3.202, year: 2025, src: "WB" },
  "egypt": { pop: 118365995, growth: 1.556, year: 2025, src: "WB" },
  "equatorial-guinea": { pop: 1938431, growth: 2.397, year: 2025, src: "WB" },
  "eritrea": { pop: 3607003, growth: 1.999, year: 2025, src: "WB" },
  "eswatini": { pop: 1256174, growth: 1.069, year: 2025, src: "WB" },
  "ethiopia": { pop: 135472051, growth: 2.551, year: 2025, src: "WB" },
  "gabon": { pop: 2593130, growth: 2.111, year: 2025, src: "WB" },
  "gambia": { pop: 2822093, growth: 2.225, year: 2025, src: "WB" },
  "ghana": { pop: 35064272, growth: 1.833, year: 2025, src: "WB" },
  "guinea": { pop: 15099727, growth: 2.311, year: 2025, src: "WB" },
  "guinea-bissau": { pop: 2249515, growth: 2.164, year: 2025, src: "WB" },
  "kenya": { pop: 57532493, growth: 1.93, year: 2025, src: "WB" },
  "lesotho": { pop: 2363325, growth: 1.102, year: 2025, src: "WB" },
  "liberia": { pop: 5731206, growth: 2.087, year: 2025, src: "WB" },
  "libya": { pop: 7458555, growth: 1.045, year: 2025, src: "WB" },
  "madagascar": { pop: 32740678, growth: 2.398, year: 2025, src: "WB" },
  "malawi": { pop: 22216120, growth: 2.557, year: 2025, src: "WB" },
  "mali": { pop: 25198821, growth: 2.9, year: 2025, src: "WB" },
  "mauritania": { pop: 5315065, growth: 2.779, year: 2025, src: "WB" },
  "mauritius": { pop: 1243741, growth: -0.164, year: 2025, src: "WB" },
  "morocco": { pop: 38430770, growth: 0.914, year: 2025, src: "WB" },
  "mozambique": { pop: 35631653, growth: 2.846, year: 2025, src: "WB" },
  "namibia": { pop: 3092816, growth: 2.048, year: 2025, src: "WB" },
  "niger": { pop: 27917831, growth: 3.223, year: 2025, src: "WB" },
  "nigeria": { pop: 237527782, growth: 2.062, year: 2025, src: "WB" },
  "rwanda": { pop: 14569341, growth: 2.17, year: 2025, src: "WB" },
  "sao-tome": { pop: 240254, growth: 1.983, year: 2025, src: "WB" },
  "senegal": { pop: 18931966, growth: 2.297, year: 2025, src: "WB" },
  "seychelles": { pop: 122730, growth: 1.127, year: 2025, src: "WB" },
  "sierra-leone": { pop: 8819794, growth: 2.036, year: 2025, src: "WB" },
  "somalia": { pop: 19654739, growth: 3.34, year: 2025, src: "WB" },
  "south-africa": { pop: 64747319, growth: 1.15, year: 2025, src: "WB" },
  "south-sudan": { pop: 12188788, growth: 2.034, year: 2025, src: "WB" },
  "sudan": { pop: 51662147, growth: 2.376, year: 2025, src: "WB" },
  "tanzania": { pop: 70545865, growth: 2.855, year: 2025, src: "WB" },
  "togo": { pop: 8591626, growth: 2.178, year: 2025, src: "WB" },
  "tunisia": { pop: 12348573, growth: 0.58, year: 2025, src: "WB" },
  "uganda": { pop: 51384894, growth: 2.702, year: 2025, src: "WB" },
  "western-sahara": { pop: 600000, growth: 1.6, year: 2025, src: "UN" },
  "zambia": { pop: 21913874, growth: 2.771, year: 2025, src: "WB" },
  "zimbabwe": { pop: 16950795, growth: 1.884, year: 2025, src: "WB" }
};

window.FORTE_POP_META = {
  source: "World Bank Open Data \u00b7 SP.POP.TOTL, SP.POP.GROW",
  sourceUrl: "https://data.worldbank.org/indicator/SP.POP.TOTL",
  retrieved: "2026-09-28"
};

/* Continuous-growth projection from the mid-year baseline. */
window.FORTE_POP_AT = function (id, date) {
  var r = window.FORTE_POP[id];
  if (!r) return null;
  var base = Date.UTC(r.year, 6, 1);
  var years = ((date ? date.getTime() : Date.now()) - base) / (365.2425 * 86400000);
  return r.pop * Math.exp((r.growth / 100) * years);
};

/* People added per hour at the current projected size. */
window.FORTE_POP_PER_HOUR = function (id) {
  var r = window.FORTE_POP[id];
  if (!r) return null;
  var now = window.FORTE_POP_AT(id);
  return now * (r.growth / 100) / (365.2425 * 24);
};
