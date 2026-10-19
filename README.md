# Playwright TypeScript Test Framework

A small end-to-end test starter using Playwright Test and TypeScript.

## Folder structure

```text
.
├── pages/                 # Page objects (add as the suite grows)
├── tests/                 # Playwright test specifications
│   └── example.spec.ts
├── playwright.config.ts   # Test runner and browser configuration
├── package.json
└── tsconfig.json
```

## Getting started

```sh
npm install
npx playwright install chromium
npm test
```

The sample test opens the Playwright documentation site. Use `npm run test:headed`
to see the browser, `npm run test:ui` for Playwright's UI mode, and
`npm run report` to open the most recent HTML report.
