window.DashboardData = {
  paperMeta: {
    title: "Political Stability and Bank Flows: New Evidence",
    author: "Mafalda Venancio de Vasconcelos",
    journal: "Journal of Risk and Financial Management",
    year: 2020,
    period: "1984 Q2 to 2013 Q4",
    countries: 71,
    oecdCountries: 34,
    nonOecdCountries: 37,
    researchQuestion:
      "How does political stability affect cross-border bank flows, which components of political stability matter most, and how did the 2008 crisis change that relationship?",
    model:
      "Fixed-effects panel regression with country fixed effects, time fixed effects, lagged regressors, and clustered standard errors.",
    theoryChain: [
      "Political stability",
      "Institutional predictability",
      "Lower lending uncertainty",
      "Stronger cross-border bank flows"
    ],
    notes: [
      "Higher political stability scores correspond to lower political risk.",
      "The paper transforms negative bank flows by logging absolute values and reapplying sign.",
      "Published appendix tables are embedded exactly where possible."
    ]
  },
  tabs: [
    { id: "overview", label: "Overview" },
    { id: "country", label: "Country Explorer" },
    { id: "comparative", label: "Comparative Evidence" },
    { id: "regression", label: "Regression Lab" },
    { id: "components", label: "Political Stability Components" },
    { id: "crisis", label: "Crisis Shift" },
    { id: "methods", label: "Methods & Caveats" }
  ],
  countryMetadata: [
    { country: "Argentina", iso2: "AR", group: "non_oecd" },
    { country: "Australia", iso2: "AU", group: "oecd" },
    { country: "Austria", iso2: "AT", group: "oecd" },
    { country: "Belarus", iso2: "BY", group: "non_oecd" },
    { country: "Belgium", iso2: "BE", group: "oecd" },
    { country: "Bolivia", iso2: "BO", group: "non_oecd" },
    { country: "Botswana", iso2: "BW", group: "non_oecd" },
    { country: "Brazil", iso2: "BR", group: "non_oecd" },
    { country: "Bulgaria", iso2: "BG", group: "non_oecd" },
    { country: "Canada", iso2: "CA", group: "oecd" },
    { country: "Chile", iso2: "CL", group: "oecd" },
    { country: "Colombia", iso2: "CO", group: "non_oecd" },
    { country: "Costa Rica", iso2: "CR", group: "non_oecd" },
    { country: "Cyprus", iso2: "CY", group: "non_oecd" },
    { country: "Czech Republic", iso2: "CZ", group: "oecd" },
    { country: "Denmark", iso2: "DK", group: "oecd" },
    { country: "Ecuador", iso2: "EC", group: "non_oecd" },
    { country: "Egypt", iso2: "EG", group: "non_oecd" },
    { country: "El Salvador", iso2: "SV", group: "non_oecd" },
    { country: "Estonia", iso2: "EE", group: "oecd" },
    { country: "Finland", iso2: "FI", group: "oecd" },
    { country: "France", iso2: "FR", group: "oecd" },
    { country: "Germany", iso2: "DE", group: "oecd" },
    { country: "Greece", iso2: "GR", group: "oecd" },
    { country: "Guatemala", iso2: "GT", group: "non_oecd" },
    { country: "Hungary", iso2: "HU", group: "oecd" },
    { country: "Iceland", iso2: "IS", group: "oecd" },
    { country: "India", iso2: "IN", group: "non_oecd" },
    { country: "Indonesia", iso2: "ID", group: "non_oecd" },
    { country: "Iran", iso2: "IR", group: "non_oecd" },
    { country: "Ireland", iso2: "IE", group: "oecd" },
    { country: "Israel", iso2: "IL", group: "oecd" },
    { country: "Italy", iso2: "IT", group: "oecd" },
    { country: "Jamaica", iso2: "JM", group: "non_oecd" },
    { country: "Japan", iso2: "JP", group: "oecd" },
    { country: "Jordan", iso2: "JO", group: "non_oecd" },
    { country: "Kenya", iso2: "KE", group: "non_oecd" },
    { country: "Latvia", iso2: "LV", group: "oecd" },
    { country: "Lithuania", iso2: "LT", group: "oecd" },
    { country: "Luxembourg", iso2: "LU", group: "oecd" },
    { country: "Malaysia", iso2: "MY", group: "non_oecd" },
    { country: "Malta", iso2: "MT", group: "non_oecd" },
    { country: "Mexico", iso2: "MX", group: "oecd" },
    { country: "Mongolia", iso2: "MN", group: "non_oecd" },
    { country: "Morocco", iso2: "MA", group: "non_oecd" },
    { country: "Netherlands", iso2: "NL", group: "oecd" },
    { country: "New Zealand", iso2: "NZ", group: "oecd" },
    { country: "Norway", iso2: "NO", group: "oecd" },
    { country: "Panama", iso2: "PA", group: "non_oecd" },
    { country: "Paraguay", iso2: "PY", group: "non_oecd" },
    { country: "Peru", iso2: "PE", group: "non_oecd" },
    { country: "Philippines", iso2: "PH", group: "non_oecd" },
    { country: "Poland", iso2: "PL", group: "oecd" },
    { country: "Portugal", iso2: "PT", group: "oecd" },
    { country: "Qatar", iso2: "QA", group: "non_oecd" },
    { country: "Romania", iso2: "RO", group: "non_oecd" },
    { country: "Russia", iso2: "RU", group: "non_oecd" },
    { country: "Saudi Arabia", iso2: "SA", group: "non_oecd" },
    { country: "Singapore", iso2: "SG", group: "non_oecd" },
    { country: "Slovenia", iso2: "SI", group: "oecd" },
    { country: "South Africa", iso2: "ZA", group: "non_oecd" },
    { country: "Spain", iso2: "ES", group: "oecd" },
    { country: "Sri Lanka", iso2: "LK", group: "non_oecd" },
    { country: "Sweden", iso2: "SE", group: "oecd" },
    { country: "Switzerland", iso2: "CH", group: "oecd" },
    { country: "Thailand", iso2: "TH", group: "non_oecd" },
    { country: "Turkey", iso2: "TR", group: "oecd" },
    { country: "Ukraine", iso2: "UA", group: "non_oecd" },
    { country: "United Kingdom", iso2: "GB", group: "oecd" },
    { country: "United States", iso2: "US", group: "oecd" },
    { country: "Uruguay", iso2: "UY", group: "non_oecd" }
  ],
  descriptiveStatistics: {
    all: [
      ["Bureaucracy quality", 5781, 2.972, 0.995, 0, 4],
      ["Corruption", 5781, 3.689, 1.406, 0, 6],
      ["Democratic accountability", 5781, 4.969, 1.235, 1, 6],
      ["Economic risk", 5781, 36.92, 5.006, 16.83, 50],
      ["Ethnic tensions", 5781, 4.347, 1.294, 0, 6],
      ["Financial risk", 5781, 38.8, 5.927, 11.33, 50],
      ["Government stability", 5781, 8.04, 1.794, 1, 12],
      ["Investment profile", 5781, 8.721, 2.317, 2, 12],
      ["Law and order", 5781, 4.452, 1.399, 1, 6],
      ["Political stability", 5781, 74.27, 11.92, 31.33, 97],
      ["Religious tensions", 5781, 5.037, 1.151, 0.333, 6],
      ["Socioeconomic conditions", 5781, 6.835, 2.06, 1.333, 11],
      ["GDP volume (% change)", 5781, 3.271, 4.154, -20.93, 24.31],
      ["Cross-border bank flows", 5781, 7.58e10, 8.554e12, -3.394e14, 4.409e14],
      ["Logarithm cross-border bank flows", 5781, 3.117, 13.6, -33.46, 33.72]
    ],
    oecd: [
      ["Bureaucracy quality", 3415, 3.513421, 0.667745, 1, 4],
      ["Corruption", 3415, 4.369204, 1.237542, 2, 6],
      ["Democratic accountability", 3415, 5.570473, 0.7348982, 2, 6],
      ["Economic risk", 3415, 38.21798, 4.509083, 17.5, 49.16667],
      ["Ethnic tensions", 3415, 4.538507, 1.231432, 1, 6],
      ["Financial risk", 3415, 39.6429, 5.841506, 18.16667, 50],
      ["Government stability", 3415, 8.000976, 1.704215, 2, 12],
      ["Investment profile", 3415, 9.243924, 2.30026, 2.666667, 12],
      ["Law and order", 3415, 5.18165, 0.973454, 1, 6],
      ["Political stability", 3415, 80.06452, 9.532913, 35.33333, 97],
      ["Religious tensions", 3415, 5.353245, 0.8983487, 1, 6],
      ["Socioeconomic conditions", 3415, 7.689214, 1.703555, 2, 11],
      ["GDP volume (% change)", 3415, 2.631638, 3.534948, -17.6413, 16.7499],
      ["Cross-border bank flows", 3415, 1.28e11, 1.11e13, -3.39e14, 4.41e14],
      ["Logarithm cross-border bank flows", 3415, 4.06762, 14.20838, -33.45832, 33.71973]
    ],
    non_oecd: [
      ["Bureaucracy quality", 2366, 2.191251, 0.8625091, 0, 4],
      ["Corruption", 2366, 2.706326, 0.99162, 0, 6],
      ["Democratic accountability", 2366, 4.100944, 1.292591, 1, 6],
      ["Economic risk", 2366, 35.0378, 5.091587, 16.83333, 50],
      ["Ethnic tensions", 2366, 4.070442, 1.332564, 0, 6],
      ["Financial risk", 2366, 37.58373, 5.837498, 11.33333, 50],
      ["Government stability", 2366, 8.097281, 1.915513, 1, 11.66667],
      ["Investment profile", 2366, 7.965272, 2.124414, 2, 12],
      ["Law and order", 2366, 3.397718, 1.238899, 1, 6],
      ["Political stability", 2366, 65.89598, 9.862459, 31.33333, 90],
      ["Religious tensions", 2366, 4.580023, 1.312078, 0.333333, 6],
      ["Socioeconomic conditions", 2366, 5.602494, 1.90012, 1.333333, 11],
      ["GDP volume (% change)", 2366, 4.193731, 4.762638, -20.9328, 24.3113],
      ["Cross-border bank flows", 2366, 467646.5, 4409704, -5.34e7, 4.18e7],
      ["Logarithm cross-border bank flows", 2366, 1.745478, 12.54209, -17.79407, 17.54779]
    ]
  },
  correlations: [
    ["Political stability", 0.166],
    ["GDP volume (% change)", 0.188],
    ["Economic risk", 0.183],
    ["Financial risk", 0.164],
    ["Socioeconomic conditions", 0.146],
    ["Investment profile", 0.136],
    ["Law and order", 0.121],
    ["Government stability", 0.117],
    ["Bureaucracy quality", 0.101],
    ["Corruption", 0.0837]
  ],
  regressionResultsMain: [
    {
      sample: "all",
      label: "All countries",
      table: "A5",
      observations: 5781,
      r2: 0.152,
      countries: 71,
      coefficients: [
        { variable: "Political stability", estimate: 0.235, stderr: 0.0771, sig: "***", interpretation: "A 10-point increase in political stability is associated with roughly a 25% rise in cross-border bank flows." },
        { variable: "GDP volume (% change)", estimate: 0.385, stderr: 0.0566, sig: "***", interpretation: "Faster growth is associated with stronger lending demand and stronger inflow capacity." },
        { variable: "Economic risk", estimate: 0.258, stderr: 0.0936, sig: "***", interpretation: "Better macro fundamentals are associated with more cross-border bank lending." },
        { variable: "Financial risk", estimate: 0.211, stderr: 0.0841, sig: "**", interpretation: "Lower financial risk is associated with stronger willingness to lend." }
      ]
    },
    {
      sample: "oecd",
      label: "OECD",
      table: "A5",
      observations: 3415,
      r2: 0.198,
      countries: 34,
      coefficients: [
        { variable: "Political stability", estimate: 0.299, stderr: 0.0903, sig: "***", interpretation: "Political stability is more strongly associated with bank flows in advanced economies." },
        { variable: "GDP volume (% change)", estimate: 0.293, stderr: 0.103, sig: "***", interpretation: "Growth still matters, but the institutional channel becomes more visible." },
        { variable: "Economic risk", estimate: 0.319, stderr: 0.103, sig: "***", interpretation: "Macro discipline remains a key pull factor inside OECD economies." },
        { variable: "Financial risk", estimate: 0.175, stderr: 0.0781, sig: "**", interpretation: "External financing credibility continues to matter in rich economies." }
      ]
    },
    {
      sample: "non_oecd",
      label: "Non-OECD",
      table: "A5",
      observations: 2366,
      r2: 0.182,
      countries: 37,
      coefficients: [
        { variable: "Political stability", estimate: 0.167, stderr: 0.134, sig: "", interpretation: "Political stability is positive but not statistically precise in the non-OECD sample." },
        { variable: "GDP volume (% change)", estimate: 0.366, stderr: 0.0661, sig: "***", interpretation: "Growth remains a strong correlate of stronger bank flows." },
        { variable: "Economic risk", estimate: -0.0551, stderr: 0.125, sig: "", interpretation: "Economic risk is not estimated precisely in the non-OECD split." },
        { variable: "Financial risk", estimate: 0.443, stderr: 0.148, sig: "***", interpretation: "Financial risk is the dominant pull factor in the non-OECD sample." }
      ]
    },
    {
      sample: "pre_crisis",
      label: "OECD before 2008",
      table: "A5",
      observations: 2599,
      r2: 0.113,
      countries: 34,
      coefficients: [
        { variable: "Political stability", estimate: 0.291, stderr: 0.0846, sig: "***", interpretation: "The political stability channel is already present before the crisis." },
        { variable: "GDP volume (% change)", estimate: 0.181, stderr: 0.111, sig: "", interpretation: "Growth is less precisely estimated in the pre-crisis OECD split." },
        { variable: "Economic risk", estimate: 0.123, stderr: 0.142, sig: "", interpretation: "Macroeconomic risk does not dominate this sub-period." },
        { variable: "Financial risk", estimate: 0.0152, stderr: 0.0995, sig: "", interpretation: "Financial risk is not a strong differentiator in this pre-crisis OECD split." }
      ]
    },
    {
      sample: "post_crisis",
      label: "OECD after 2008",
      table: "A5",
      observations: 816,
      r2: 0.157,
      countries: 34,
      coefficients: [
        { variable: "Political stability", estimate: 0.718, stderr: 0.269, sig: "**", interpretation: "After 2008, banks appear much more sensitive to institutional fragility and policy credibility." },
        { variable: "GDP volume (% change)", estimate: 0.448, stderr: 0.2, sig: "**", interpretation: "Growth returns as a more visible signal after the crisis." },
        { variable: "Economic risk", estimate: 0.0308, stderr: 0.202, sig: "", interpretation: "Economic risk is not the differentiator here." },
        { variable: "Financial risk", estimate: 0.481, stderr: 0.249, sig: "*", interpretation: "Lower financial risk remains helpful after the crisis." }
      ]
    }
  ],
  componentResultsOECD: [
    { variable: "Bureaucracy quality", estimate: 2.357, stderr: 1.132, sig: "**", channel: "policy continuity" },
    { variable: "Religious tensions", estimate: 1.536, stderr: 0.523, sig: "***", channel: "social stability" },
    { variable: "Corruption", estimate: 1.369, stderr: 0.648, sig: "**", channel: "execution risk" },
    { variable: "Investment profile", estimate: 1.011, stderr: 0.349, sig: "***", channel: "contract certainty" },
    { variable: "Ethnic tensions", estimate: 0.926, stderr: 0.477, sig: "*", channel: "social stability" },
    { variable: "Socioeconomic conditions", estimate: 0.823, stderr: 0.272, sig: "***", channel: "macro-social resilience" },
    { variable: "Law and order", estimate: 0.645, stderr: 0.519, sig: "", channel: "legal order" },
    { variable: "Government stability", estimate: 0.277, stderr: 0.251, sig: "", channel: "formal political continuity" },
    { variable: "Democratic accountability", estimate: -0.135, stderr: 0.589, sig: "", channel: "formal political structure" }
  ],
  crisisComponentResults: [
    { variable: "Political stability", before: 0.291, beforeSig: "***", after: 0.718, afterSig: "**" },
    { variable: "Socioeconomic conditions", before: 0.592, beforeSig: "*", after: 2.198, afterSig: "**" },
    { variable: "Investment profile", before: 0.738, beforeSig: "*", after: 1.701, afterSig: "**" },
    { variable: "Corruption", before: 0.998, beforeSig: "", after: 8.032, afterSig: "***" },
    { variable: "Religious tensions", before: 1.093, beforeSig: "", after: 4.677, afterSig: "***" },
    { variable: "Ethnic tensions", before: 0.919, beforeSig: "", after: 0.124, afterSig: "" }
  ],
  methods: {
    variableDefinitions: [
      ["Cross-border bank flows", "BIS Locational Banking Statistics adjusted changes in claims reported by all reporting countries to counterparty country i."],
      ["Political stability", "ICRG political risk rating; higher values mean lower political risk and higher stability."],
      ["Economic risk", "ICRG economic risk rating based on GDP per head, real GDP growth, inflation, budget balance, and current account."],
      ["Financial risk", "ICRG financial risk rating based on debt burden, debt service, liquidity cover, current account, and exchange-rate stability."],
      ["GDP volume (% change)", "Quarterly GDP growth from IMF International Financial Statistics."]
    ],
    caveats: [
      "The paper estimates associations within a fixed-effects framework; it does not establish a clean causal identification strategy.",
      "The original sample ends in 2013 Q4.",
      "The country-quarter replication dataset is not published in the appendix; this implementation therefore embeds the published tables exactly and avoids fabricating missing quarterly series.",
      "Country selection is restricted to the paper's 71-country sample."
    ],
    sources: [
      ["BIS", "https://data.bis.org/topics/LBS"],
      ["IMF International Financial Statistics", "https://data.imf.org/"],
      ["ICRG", "https://www.prsgroup.com/explore-our-products/international-country-risk-guide/"]
    ]
  }
};
