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

Open [index.html](D:/CEEW/political-stability-dashboard/index.html) in a browser.

## Deploy with GitHub and Render

This project is ready to deploy as a Render Static Site.

Files added for deployment:

- [render.yaml](D:/CEEW/political-stability-dashboard/render.yaml)
- [.gitignore](D:/CEEW/political-stability-dashboard/.gitignore)

Recommended flow:

1. Create a new GitHub repository.
2. Upload the contents of `D:\CEEW\political-stability-dashboard`.
3. In Render, choose `New` -> `Static Site`.
4. Connect your GitHub account and select the repository.
5. Render should detect `render.yaml` automatically.
6. If you configure manually, use:
   - Build Command: `true`
   - Publish Directory: `.`

Important:

- This is a static site, so Render Static Site is the correct product.
- You do not need a Node/Express server for the current version.
- Every push to the connected GitHub branch can trigger an automatic redeploy on Render.

## Current blocker

GitHub CLI is installed in this environment, but it is not authenticated yet. That means the app is deployment-ready, but the final GitHub push and Render hookup still require your GitHub login.
