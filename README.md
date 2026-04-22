# Political Stability Dashboard

This is a standalone static dashboard implementing the research-companion concept for:

- `Political Stability and Bank Flows: New Evidence`
- Mafalda Venancio de Vasconcelos
- *Journal of Risk and Financial Management* (2020)

## What is implemented

- Replication-first single-page dashboard with 8 sections:
  - `Overview`
  - `Country Explorer`
  - `Comparative Evidence`
  - `Regression Lab`
  - `Political Stability Components`
  - `Crisis Shift`
  - `Methods & Caveats`
- Published descriptive statistics from Tables `A1`, `A2`, and `A3`
- Main regression results from Table `A5`
- OECD component results from Table `A6`
- Pre/post-crisis comparison layer using Tables `A7` and `A8`
- Country selector restricted to the paper's 71-country sample

## Important academic note

The paper's appendix provides published tables and country membership, but not the full underlying country-quarter replication matrix. This dashboard therefore:

- embeds the published tables exactly where possible
- avoids fabricating unpublished quarterly series
- keeps the interpretation within the published paper's sample, variables, and estimates

## Open locally

Open `index.html` in a browser.

## Deploy with GitHub Pages

This project is a static website and can be deployed directly with GitHub Pages.

### Option A (recommended): GitHub Actions workflow

This repository includes a Pages workflow at `.github/workflows/deploy-pages.yml`.

1. Push to your `main` branch.
2. In GitHub, go to `Settings` -> `Pages`.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow will publish the site automatically on each push to `main`.

### Option B: Branch deployment

If you prefer branch-based deployment:

1. Go to `Settings` -> `Pages`.
2. Set **Source** to **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Save and wait for the Pages URL to be published.

## Verify deployment

1. Open the published GitHub Pages URL.
2. Hard refresh once (`Ctrl+Shift+R` / `Cmd+Shift+R`).
3. Confirm all sections/charts render and browser console has no errors.

## Optional custom domain

1. Add your domain in `Settings` -> `Pages`.
2. Configure DNS records exactly as GitHub Pages instructs.
