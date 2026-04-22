(function () {
  const data = window.DashboardData;
  const state = {
    activeTab: "overview",
    selectedCountry: "India",
    selectedSample: "all"
  };

  const elements = {
    tabList: document.getElementById("tab-list"),
    tabContent: document.getElementById("tab-content"),
    countrySelect: document.getElementById("country-select"),
    sampleSelect: document.getElementById("sample-select")
  };

  function init() {
    populateSelectors();
    bindEvents();
    renderTabs();
    render();
  }

  function populateSelectors() {
    data.countryMetadata
      .slice()
      .sort((a, b) => a.country.localeCompare(b.country))
      .forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.country;
        option.textContent = entry.country;
        if (entry.country === state.selectedCountry) option.selected = true;
        elements.countrySelect.appendChild(option);
      });
    elements.sampleSelect.value = state.selectedSample;
  }

  function bindEvents() {
    elements.countrySelect.addEventListener("change", (event) => {
      state.selectedCountry = event.target.value;
      render();
    });
    elements.sampleSelect.addEventListener("change", (event) => {
      state.selectedSample = event.target.value;
      render();
    });
  }

  function renderTabs() {
    elements.tabList.innerHTML = "";
    data.tabs.forEach((tab) => {
      const button = document.createElement("button");
      button.className = `tab-button ${state.activeTab === tab.id ? "active" : ""}`;
      button.textContent = tab.label;
      button.addEventListener("click", () => {
        state.activeTab = tab.id;
        renderTabs();
        render();
      });
      elements.tabList.appendChild(button);
    });
  }

  function render() {
    const selectedCountryMeta = getSelectedCountryMeta();
    switch (state.activeTab) {
       case "overview":
         elements.tabContent.innerHTML = renderOverview();
        renderHeadlineStrip();
        break;
      case "country":
        elements.tabContent.innerHTML = renderCountryExplorer(selectedCountryMeta);
        break;
      case "comparative":
        elements.tabContent.innerHTML = renderComparativeEvidence();
        hydrateRangeCharts();
        break;
      case "regression":
        elements.tabContent.innerHTML = renderRegressionLab();
        hydrateCoefficientPlot();
        break;
      case "components":
        elements.tabContent.innerHTML = renderComponents();
        hydrateComponentPlot();
        break;
      case "crisis":
        elements.tabContent.innerHTML = renderCrisisShift();
        hydrateCrisisPlot();
        break;
      case "methods":
        elements.tabContent.innerHTML = renderMethods();
        break;
      default:
        elements.tabContent.innerHTML = "";
    }
  }

  function getSelectedCountryMeta() {
    return data.countryMetadata.find((item) => item.country === state.selectedCountry);
  }

  function getSampleStats(sampleKey) {
    const table = data.descriptiveStatistics[sampleKey] || data.descriptiveStatistics.all;
    return Object.fromEntries(table.map((row) => [row[0], { n: row[1], mean: row[2], sd: row[3], min: row[4], max: row[5] }]));
  }

  function renderOverview() {
    const summary = data.paperMeta;
    const all = getSampleStats("all");
    const oecd = getSampleStats("oecd");
    const non = getSampleStats("non_oecd");
    return `
      <section class="hero-grid">
        <div class="hero-card">
          <p class="eyebrow">Research Question</p>
          <h3>${summary.researchQuestion}</h3>
          <p>${summary.model}</p>
          <div class="chip-row">
            <span class="chip">${summary.countries} countries</span>
            <span class="chip">${summary.period}</span>
            <span class="chip">${summary.oecdCountries} OECD / ${summary.nonOecdCountries} non-OECD</span>
          </div>
        </div>
        <div class="hero-card accent">
          <p class="eyebrow">Headline Findings</p>
          <ul class="bullet-list">
            <li>Political stability is positively associated with cross-border bank flows.</li>
            <li>The association is stronger in OECD countries than in non-OECD countries.</li>
            <li>The OECD political-stability coefficient rises from 0.291 before the crisis to 0.718 after 2008.</li>
            <li>Key institutional channels are socioeconomic conditions, investment profile, corruption, religious tensions, ethnic tensions, and bureaucracy quality.</li>
          </ul>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Theory Diagram</p>
            <h3>Mechanism implied by the paper</h3>
          </div>
        </div>
        <div class="theory-chain">
          ${summary.theoryChain.map((item, index) => `
            <div class="theory-node">
              <span class="node-index">${index + 1}</span>
              <strong>${item}</strong>
            </div>
          `).join('<span class="theory-arrow">&rarr;</span>')}
        </div>
      </section>

      <section class="three-column">
        <div class="panel">
          <p class="eyebrow">Sample Profile</p>
          <div class="stat-card-grid">
            ${statCard("All-country political stability", formatNumber(all["Political stability"].mean))}
            ${statCard("OECD mean political stability", formatNumber(oecd["Political stability"].mean))}
            ${statCard("Non-OECD mean political stability", formatNumber(non["Political stability"].mean))}
            ${statCard("OECD mean bank flows", formatScientific(oecd["Cross-border bank flows"].mean))}
            ${statCard("Non-OECD mean bank flows", formatScientific(non["Cross-border bank flows"].mean))}
            ${statCard("All-country mean GDP growth", `${formatNumber(all["GDP volume (% change)"].mean)}%`)}
          </div>
        </div>
        <div class="panel span-two">
          <p class="eyebrow">Headline coefficient strip</p>
          <div id="headline-strip" class="coef-strip"></div>
          <p class="subtle">
            Coefficients from Table A5. Visual emphasis is on direction, magnitude, and crisis re-pricing rather than causal interpretation.
          </p>
        </div>
      </section>
    `;
  }

  function renderCountryExplorer(countryMeta) {
    const groupKey = countryMeta.group;
    const groupLabel = groupKey === "oecd" ? "OECD" : "Non-OECD";
    const groupStats = getSampleStats(groupKey);
    const allStats = getSampleStats("all");
    const politicalCoef = data.regressionResultsMain.find((entry) => entry.sample === groupKey).coefficients[0];
    const financialCoef = data.regressionResultsMain.find((entry) => entry.sample === groupKey).coefficients.find((item) => item.variable === "Financial risk");
    const rangeCards = [
      { label: "Peer-group political stability mean", value: formatNumber(groupStats["Political stability"].mean) },
      { label: "Peer-group GDP growth mean", value: `${formatNumber(groupStats["GDP volume (% change)"].mean)}%` },
      { label: "Peer-group economic risk mean", value: formatNumber(groupStats["Economic risk"].mean) },
      { label: "Peer-group financial risk mean", value: formatNumber(groupStats["Financial risk"].mean) }
    ];

    return `
      <section class="hero-grid">
        <div class="hero-card">
          <p class="eyebrow">Selected Country</p>
          <h3>${countryMeta.country}</h3>
          <p>
            Sample classification: <strong>${groupLabel}</strong>. This view stays honest to the paper: the appendix publishes country membership and aggregate tables, but not the full country-quarter panel.
          </p>
          <div class="chip-row">
            <span class="chip">${groupLabel} sample</span>
            <span class="chip">Country in original 71-country universe</span>
            <span class="chip">Interpretation uses paper-consistent language</span>
          </div>
        </div>
        <div class="hero-card accent">
          <p class="eyebrow">Interpretation Box</p>
          <p>
            Within the paper's framework, ${countryMeta.country} should be read through its <strong>${groupLabel.toLowerCase()}</strong> sample logic. In this group, the political-stability coefficient is <strong>${formatNumber(politicalCoef.estimate)}</strong>${politicalCoef.sig}, while the financial-risk coefficient is <strong>${formatNumber(financialCoef.estimate)}</strong>${financialCoef.sig}. This means institutional predictability is ${groupKey === "oecd" ? "a first-order association with cross-border bank flows" : "less precisely estimated than the financial-risk channel"}.
          </p>
        </div>
      </section>

      <section class="three-column">
        <div class="panel">
          <p class="eyebrow">Replication Context</p>
          <div class="stat-card-grid">
            ${rangeCards.map((card) => statCard(card.label, card.value)).join("")}
          </div>
        </div>
        <div class="panel span-two">
          <p class="eyebrow">Macro Reading For This Country</p>
          <div class="insight-stack">
            <div class="insight">
              <strong>Structural reading</strong>
              <p>${groupKey === "oecd"
                ? "For OECD countries, higher political stability is positively and significantly associated with stronger cross-border bank flows."
                : "For non-OECD countries, the paper finds that financial risk dominates the broad political-stability index in explaining cross-border bank flows."}</p>
            </div>
            <div class="insight">
              <strong>Crisis-era repricing</strong>
              <p>${groupKey === "oecd"
                ? "After 2008, banks appear markedly more sensitive to institutional fragility, making policy credibility and implementation quality especially salient."
                : "The post-crisis non-OECD signal is weaker and should be treated more cautiously than the OECD regime shift."}</p>
            </div>
            <div class="insight">
              <strong>Mechanism lens</strong>
              <p>Across the paper's OECD component tests, bureaucracy quality, corruption, investment profile, socioeconomic conditions, and social-tension measures stand out as the most informative channels.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="three-column">
        <div class="panel">
          <p class="eyebrow">Binding Margin</p>
          <div class="insight-stack">
            <div class="insight">
              <strong>Structural coefficient lens</strong>
              <p>${groupKey === "oecd"
                ? `In the OECD results, the political-stability coefficient (${formatNumber(politicalCoef.estimate)}${politicalCoef.sig}) makes policy credibility and institutional predictability the main binding margin.`
                : `In the non-OECD results, the financial-risk coefficient (${formatNumber(financialCoef.estimate)}${financialCoef.sig}) is more decisive than the political-stability estimate, so the binding margin is external-financing credibility.`}</p>
            </div>
            <div class="insight">
              <strong>Author-facing phrasing</strong>
              <p>${groupKey === "oecd"
                ? `"For ${countryMeta.country}, I would frame political stability not as a background condition but as part of the return-relevant information set that foreign banks appear to price more aggressively, especially in the post-2008 environment."`
                : `"For ${countryMeta.country}, I would emphasize that the paper points first to financial-risk discipline and repayment confidence, while political stability remains an important contextual condition rather than the dominant empirical margin."`}</p>
            </div>
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Sample-wide baseline</p>
          <div class="metric-list">
            <div><span>All-country political stability mean</span><strong>${formatNumber(allStats["Political stability"].mean)}</strong></div>
            <div><span>All-country GDP growth mean</span><strong>${formatNumber(allStats["GDP volume (% change)"].mean)}%</strong></div>
            <div><span>All-country financial risk mean</span><strong>${formatNumber(allStats["Financial risk"].mean)}</strong></div>
            <div><span>All-country bank-flow log mean</span><strong>${formatNumber(allStats["Logarithm cross-border bank flows"].mean)}</strong></div>
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Presentation Note</p>
          <div class="memo-card">
            <strong>Replication-centered interpretation</strong>
            <p>${groupKey === "oecd"
              ? `${countryMeta.country} belongs to the sample where political stability carries a larger and statistically significant coefficient, so institutional credibility is part of the main macro-financial story.`
              : `${countryMeta.country} belongs to the sample where the financial-risk channel is more empirically dominant, so repayment capacity and external resilience should sit near the center of the interpretation.`}</p>
          </div>
        </div>
      </section>
    `;
  }

  function renderComparativeEvidence() {
    const selectedKey = state.selectedSample === "all" || state.selectedSample === "pre_crisis" || state.selectedSample === "post_crisis"
      ? "all"
      : state.selectedSample;
    const selectedStats = getSampleStats(selectedKey);
    const compareVars = ["Political stability", "GDP volume (% change)", "Economic risk", "Financial risk", "Cross-border bank flows"];
    return `
      <section class="hero-grid">
        <div class="hero-card">
          <p class="eyebrow">Descriptive Evidence</p>
          <h3>Published summary tables, grouped exactly as in the paper</h3>
          <p>
            This page preserves descriptive evidence as descriptive evidence. It does not infer causality and does not mix raw summary tables with regression claims.
          </p>
        </div>
        <div class="hero-card accent">
          <p class="eyebrow">Current descriptive focus</p>
          <h3>${sampleLabel(selectedKey)}</h3>
          <p>
            Switch the global sample control to compare the all-country, OECD, and non-OECD published tables.
          </p>
        </div>
      </section>

      <section class="three-column">
        <div class="panel span-two">
          <p class="eyebrow">Interactive descriptive table</p>
          ${renderStatsTable(selectedStats)}
        </div>
        <div class="panel">
          <p class="eyebrow">Range charts</p>
          <div class="range-chart-stack">
            ${compareVars.map((variable) => `
              <div class="range-item">
                <div class="range-meta">
                  <strong>${variable}</strong>
                  <span>${formatNumber(selectedStats[variable].mean)}</span>
                </div>
                <svg class="range-chart" data-variable="${variable}" data-sample="${selectedKey}"></svg>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="three-column">
        <div class="panel">
          <p class="eyebrow">OECD vs non-OECD means</p>
          <div class="metric-list">
            <div><span>Political stability</span><strong>${formatNumber(getSampleStats("oecd")["Political stability"].mean)} vs ${formatNumber(getSampleStats("non_oecd")["Political stability"].mean)}</strong></div>
            <div><span>GDP growth</span><strong>${formatNumber(getSampleStats("oecd")["GDP volume (% change)"].mean)} vs ${formatNumber(getSampleStats("non_oecd")["GDP volume (% change)"].mean)}</strong></div>
            <div><span>Financial risk</span><strong>${formatNumber(getSampleStats("oecd")["Financial risk"].mean)} vs ${formatNumber(getSampleStats("non_oecd")["Financial risk"].mean)}</strong></div>
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Correlation with log bank flows</p>
          <div class="ranking-list">
            ${data.correlations.map((entry) => `
              <div class="ranking-row">
                <span>${entry[0]}</span>
                <strong>${formatNumber(entry[1])}</strong>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Replication note</p>
          <p class="subtle">
            The paper publishes group-level descriptive statistics, not the full country-quarter matrix. This dashboard therefore emphasizes tables, means, ranges, and correlations that are explicitly reported.
          </p>
        </div>
      </section>
    `;
  }

  function renderRegressionLab() {
    const entry = data.regressionResultsMain.find((item) => item.sample === state.selectedSample) || data.regressionResultsMain[0];
    return `
      <section class="hero-grid">
        <div class="hero-card">
          <p class="eyebrow">Regression Lab</p>
          <h3>${entry.label}</h3>
          <p>
            Table ${entry.table}, with country fixed effects, time fixed effects, lagged regressors, and clustered standard errors.
          </p>
          <div class="chip-row">
            <span class="chip">${entry.observations} observations</span>
            <span class="chip">${entry.countries} countries</span>
            <span class="chip">R-squared ${formatNumber(entry.r2)}</span>
          </div>
        </div>
        <div class="hero-card accent">
          <p class="eyebrow">Caution Note</p>
          <p>
            These are fixed-effects associations, not causal effects. The dependent variable is a transformed log of cross-border bank flows that preserves sign for negative adjusted changes.
          </p>
        </div>
      </section>

      <section class="three-column">
        <div class="panel span-two">
          <p class="eyebrow">Coefficient dot-and-whisker plot</p>
          <svg id="coefficient-plot" class="large-plot"></svg>
        </div>
        <div class="panel">
          <p class="eyebrow">Interpretation cards</p>
          <div class="insight-stack">
            ${entry.coefficients.map((coef) => `
              <div class="insight">
                <strong>${coef.variable}</strong>
                <p>${coef.interpretation}</p>
                <small>Estimate ${formatNumber(coef.estimate)}${coef.sig}, s.e. ${formatNumber(coef.stderr)}</small>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="panel">
        <p class="eyebrow">Regression table view</p>
        <table class="data-table">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Estimate</th>
              <th>Std. error</th>
              <th>Significance</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            ${entry.coefficients.map((coef) => `
              <tr>
                <td>${coef.variable}</td>
                <td>${formatNumber(coef.estimate)}</td>
                <td>${formatNumber(coef.stderr)}</td>
                <td>${coef.sig || "n.s."}</td>
                <td>${coef.interpretation}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  function renderComponents() {
    const significant = data.componentResultsOECD.filter((item) => item.sig);
    const nonsignificant = data.componentResultsOECD.filter((item) => !item.sig);
    return `
      <section class="hero-grid">
        <div class="hero-card">
          <p class="eyebrow">Most Original Contribution</p>
          <h3>Which political-stability channels matter in OECD countries?</h3>
          <p>
            The paper suggests that banks respond more to implementation capacity, investment safety, and social stability than to formal political structure alone.
          </p>
        </div>
        <div class="hero-card accent">
          <p class="eyebrow">High-signal reading</p>
          <p>
            Bureaucracy quality has the largest coefficient magnitude, while corruption, investment profile, socioeconomic conditions, and religious tensions also emerge as important channels.
          </p>
        </div>
      </section>

      <section class="three-column">
        <div class="panel span-two">
          <p class="eyebrow">Ranked OECD component coefficients</p>
          <svg id="component-plot" class="large-plot"></svg>
        </div>
        <div class="panel">
          <p class="eyebrow">Channel map</p>
          <div class="insight-stack">
            ${significant.map((item) => `
              <div class="insight">
                <strong>${item.variable}</strong>
                <p>Associated channel: ${item.channel}. Estimate ${formatNumber(item.estimate)}${item.sig}.</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="three-column">
        <div class="panel">
          <p class="eyebrow">Significant channels</p>
          <div class="ranking-list">
            ${significant.map((item) => `
              <div class="ranking-row">
                <span>${item.variable}</span>
                <strong>${formatNumber(item.estimate)}${item.sig}</strong>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Secondary channels</p>
          <div class="ranking-list">
            ${nonsignificant.map((item) => `
              <div class="ranking-row">
                <span>${item.variable}</span>
                <strong>${formatNumber(item.estimate)}</strong>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">Academic reading</p>
          <p class="subtle">
            The significance pattern is informative: banks appear especially sensitive to frictions that threaten contract execution, policy continuity, or social order, rather than to broad constitutional form alone.
          </p>
        </div>
      </section>
    `;
  }

  function renderCrisisShift() {
    return `
      <section class="hero-grid">
        <div class="hero-card">
          <p class="eyebrow">Regime Shift</p>
          <h3>The 2008 crisis changes the pricing of institutional risk</h3>
          <p>
            The paper’s OECD results suggest that after the crisis, foreign banks became substantially more sensitive to institutional fragility and policy credibility.
          </p>
        </div>
        <div class="hero-card accent">
          <p class="eyebrow">Core contrast</p>
          <h3>0.291 &rarr; 0.718</h3>
          <p>
            That is the movement in the OECD political-stability coefficient before versus after the crisis.
          </p>
        </div>
      </section>

      <section class="three-column">
        <div class="panel span-two">
          <p class="eyebrow">Before/after coefficient ladder</p>
          <svg id="crisis-plot" class="large-plot"></svg>
        </div>
        <div class="panel">
          <p class="eyebrow">Narrative annotation</p>
          <div class="insight-stack">
            <div class="insight">
              <strong>Before the crisis</strong>
              <p>Political stability already matters in OECD economies, but the post-crisis repricing is much stronger.</p>
            </div>
            <div class="insight">
              <strong>After the crisis</strong>
              <p>Corruption and religious-tension channels become much more economically visible, pointing to deeper concern with institutional resilience under stress.</p>
            </div>
            <div class="insight">
              <strong>How to phrase it</strong>
              <p>Say that the crisis appears to have amplified the association between institutional credibility and international bank lending.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderMethods() {
    return `
      <section class="hero-grid">
        <div class="hero-card">
          <p class="eyebrow">Methods</p>
          <h3>Variable definitions, source mapping, and interpretation guardrails</h3>
          <p>
            This section is intentionally prominent so the dashboard can be used in academic settings without blurring replicated evidence and extensions.
          </p>
        </div>
        <div class="hero-card accent">
          <p class="eyebrow">Usage rule</p>
          <p>
            Replication tables describe what the paper reports. The dashboard stays within the published sample, variables, and estimates reported in the paper.
          </p>
        </div>
      </section>

      <section class="three-column">
        <div class="panel span-two">
          <p class="eyebrow">Variable definitions</p>
          <table class="data-table">
            <thead>
              <tr><th>Variable</th><th>Definition</th></tr>
            </thead>
            <tbody>
              ${data.methods.variableDefinitions.map((row) => `
                <tr>
                  <td>${row[0]}</td>
                  <td>${row[1]}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="panel">
          <p class="eyebrow">Caveats</p>
          <ul class="bullet-list">
            ${data.methods.caveats.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </section>

      <section class="panel">
        <p class="eyebrow">Source links</p>
        <table class="data-table">
          <thead>
            <tr><th>Source</th><th>Link</th></tr>
          </thead>
          <tbody>
            ${data.methods.sources.map((row) => `
              <tr>
                <td>${row[0]}</td>
                <td><a href="${row[1]}" target="_blank" rel="noreferrer">${row[1]}</a></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  function renderStatsTable(tableObject) {
    const rows = Object.entries(tableObject).map(([variable, stats]) => `
      <tr>
        <td>${variable}</td>
        <td>${stats.n}</td>
        <td>${formatAdaptive(stats.mean)}</td>
        <td>${formatAdaptive(stats.sd)}</td>
        <td>${formatAdaptive(stats.min)}</td>
        <td>${formatAdaptive(stats.max)}</td>
      </tr>
    `).join("");
    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>N</th>
            <th>Mean</th>
            <th>Std. Dev.</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function statCard(label, value) {
    return `
      <div class="stat-card">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `;
  }

  function hydrateRangeCharts() {
    document.querySelectorAll(".range-chart").forEach((svg) => {
      const sampleKey = svg.dataset.sample;
      const variable = svg.dataset.variable;
      const stats = getSampleStats(sampleKey)[variable];
      drawRangeChart(svg, stats);
    });
  }

  function hydrateCoefficientPlot() {
    const svg = document.getElementById("coefficient-plot");
    const entry = data.regressionResultsMain.find((item) => item.sample === state.selectedSample) || data.regressionResultsMain[0];
    drawCoefficientPlot(svg, entry.coefficients);
  }

  function hydrateComponentPlot() {
    const svg = document.getElementById("component-plot");
    drawHorizontalBarPlot(svg, data.componentResultsOECD);
  }

  function hydrateCrisisPlot() {
    const svg = document.getElementById("crisis-plot");
    drawBeforeAfterPlot(svg, data.crisisComponentResults);
  }

  function drawRangeChart(svgEl, stats) {
    const width = 260;
    const height = 32;
    const padding = 12;
    svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const scale = (value) => {
      const span = stats.max - stats.min || 1;
      return padding + ((value - stats.min) / span) * (width - padding * 2);
    };
    svgEl.innerHTML = `
      <line x1="${scale(stats.min)}" y1="${height / 2}" x2="${scale(stats.max)}" y2="${height / 2}" stroke="#7d8ea3" stroke-width="6" stroke-linecap="round"></line>
      <circle cx="${scale(stats.mean)}" cy="${height / 2}" r="6" fill="#e0592a"></circle>
      <text x="${scale(stats.min)}" y="${height - 4}" fill="#59708d" font-size="10">${shortAdaptive(stats.min)}</text>
      <text x="${scale(stats.max)}" y="${height - 4}" text-anchor="end" fill="#59708d" font-size="10">${shortAdaptive(stats.max)}</text>
    `;
  }

  function drawCoefficientPlot(svgEl, coefficients) {
    const width = 680;
    const height = 280;
    const margin = { top: 24, right: 108, bottom: 40, left: 180 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const min = Math.min(...coefficients.map((c) => c.estimate - 1.96 * c.stderr), 0);
    const max = Math.max(...coefficients.map((c) => c.estimate + 1.96 * c.stderr), 0.8);
    const x = (value) => margin.left + ((value - min) / (max - min)) * innerWidth;
    const yStep = innerHeight / coefficients.length;
    svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const rows = coefficients.map((coef, index) => {
      const y = margin.top + yStep * index + yStep / 2;
      const lo = coef.estimate - 1.96 * coef.stderr;
      const hi = coef.estimate + 1.96 * coef.stderr;
      return `
        <text x="${margin.left - 12}" y="${y + 4}" text-anchor="end" fill="#12304a" font-size="12">${coef.variable}</text>
        <line x1="${x(lo)}" y1="${y}" x2="${x(hi)}" y2="${y}" stroke="#7290af" stroke-width="4" stroke-linecap="round"></line>
        <circle cx="${x(coef.estimate)}" cy="${y}" r="6" fill="#e0592a"></circle>
        <text x="${width - margin.right + 12}" y="${y + 4}" fill="#12304a" font-size="11">${formatNumber(coef.estimate)}${coef.sig}</text>
      `;
    }).join("");
    svgEl.innerHTML = `
      <rect x="0" y="0" width="${width}" height="${height}" fill="#f8fbff"></rect>
      <line x1="${x(0)}" y1="${margin.top - 8}" x2="${x(0)}" y2="${height - margin.bottom + 8}" stroke="#cfd7e3" stroke-width="2" stroke-dasharray="4 4"></line>
      ${rows}
      <text x="${margin.left}" y="${height - 8}" fill="#59708d" font-size="11">Coefficient estimates with approximate 95% intervals</text>
    `;
  }

  function drawHorizontalBarPlot(svgEl, rows) {
    const width = 680;
    const height = 420;
    const margin = { top: 20, right: 30, bottom: 30, left: 220 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const sorted = rows.slice().sort((a, b) => b.estimate - a.estimate);
    const max = Math.max(...sorted.map((item) => item.estimate), 2.6);
    const x = (value) => margin.left + (value / max) * innerWidth;
    const yStep = innerHeight / sorted.length;
    svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svgEl.innerHTML = `
      <rect x="0" y="0" width="${width}" height="${height}" fill="#f8fbff"></rect>
      ${sorted.map((row, index) => {
        const y = margin.top + index * yStep + 8;
        const fill = row.sig ? "#e0592a" : "#9db0c7";
        return `
          <text x="${margin.left - 12}" y="${y + 12}" text-anchor="end" fill="#12304a" font-size="12">${row.variable}</text>
          <rect x="${margin.left}" y="${y}" width="${x(row.estimate) - margin.left}" height="${yStep - 10}" rx="6" fill="${fill}"></rect>
          <text x="${x(row.estimate) + 8}" y="${y + 12}" fill="#12304a" font-size="11">${formatNumber(row.estimate)}${row.sig}</text>
        `;
      }).join("")}
    `;
  }

  function drawBeforeAfterPlot(svgEl, rows) {
    const width = 680;
    const height = 300;
    const margin = { top: 24, right: 30, bottom: 30, left: 220 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const max = Math.max(...rows.map((row) => Math.max(row.before, row.after)), 8.5);
    const x = (value) => margin.left + (value / max) * innerWidth;
    const yStep = innerHeight / rows.length;
    svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svgEl.innerHTML = `
      <rect x="0" y="0" width="${width}" height="${height}" fill="#f8fbff"></rect>
      ${rows.map((row, index) => {
        const y = margin.top + index * yStep + yStep / 2;
        return `
          <text x="${margin.left - 12}" y="${y + 4}" text-anchor="end" fill="#12304a" font-size="12">${row.variable}</text>
          <line x1="${x(row.before)}" y1="${y}" x2="${x(row.after)}" y2="${y}" stroke="#9db0c7" stroke-width="4"></line>
          <circle cx="${x(row.before)}" cy="${y}" r="5" fill="#12304a"></circle>
          <circle cx="${x(row.after)}" cy="${y}" r="6" fill="#e0592a"></circle>
          <text x="${x(row.before) - 8}" y="${y - 8}" fill="#12304a" font-size="10" text-anchor="end">B ${formatNumber(row.before)}${row.beforeSig}</text>
          <text x="${x(row.after) + 8}" y="${y - 8}" fill="#e0592a" font-size="10">A ${formatNumber(row.after)}${row.afterSig}</text>
        `;
      }).join("")}
      <text x="${margin.left}" y="${height - 8}" fill="#59708d" font-size="11">Dark point = before crisis, orange point = after crisis</text>
    `;
  }

  function renderHeadlineStrip() {
    const container = document.getElementById("headline-strip");
    if (!container) return;
    const bars = [
      { label: "All", value: 0.235 },
      { label: "OECD", value: 0.299 },
      { label: "Non-OECD", value: 0.167 },
      { label: "Pre-2008 OECD", value: 0.291 },
      { label: "Post-2008 OECD", value: 0.718 }
    ];
    const max = Math.max(...bars.map((item) => item.value));
    container.innerHTML = bars.map((item) => `
      <div class="coef-strip-row">
        <span>${item.label}</span>
        <div class="coef-bar"><div style="width:${(item.value / max) * 100}%"></div></div>
        <strong>${formatNumber(item.value)}</strong>
      </div>
    `).join("");
  }

  function sampleLabel(sampleKey) {
    const labels = {
      all: "All countries",
      oecd: "OECD countries",
      non_oecd: "Non-OECD countries",
      pre_crisis: "Pre-2008 OECD split",
      post_crisis: "Post-2008 OECD split"
    };
    return labels[sampleKey] || "All countries";
  }

  function latestValueLabel(series, suffix = "") {
    const latest = series[series.length - 1];
    return `${latest.year}: ${formatNumber(latest.value)}${suffix}`;
  }

  function formatNumber(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return "n/a";
    if (Math.abs(value) >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
    return value.toFixed(Math.abs(value) < 1 ? 3 : 2).replace(/\.00$/, "");
  }

  function formatAdaptive(value) {
    if (Math.abs(value) >= 1e6) return formatScientific(value);
    return formatNumber(value);
  }

  function shortAdaptive(value) {
    if (Math.abs(value) >= 1e6) return value.toExponential(1);
    return formatNumber(value);
  }

  function formatScientific(value) {
    return value.toExponential(2);
  }

  init();
  renderHeadlineStrip();
})();
