# Playwright TypeScript Test Framework

A small framework template using Playwright Test and TypeScript.

## Folder structure

```text
.
├── pages/                 # Page objects
|   └── basePage.ts        # Project common functions
|   └── dialogsPage.ts     # Dialogs example page
|   └── googleAccPage.ts   # Session handeling example page
|   └── loginPage.ts       # Login example page
|   └── newWindowPage.ts   # Window/tab example page
├── tests/                 # Playwright test specifications
│   └── api.spec.ts        # API test
|   └── dialogs.spec.ts    # Dialog handle tests
|   └── googleAcc.spec.ts  # Session handeling tests
|   └── login.spec.ts       # Login site test
|   └── newWindow.spec.ts   # Window/tab handle tes
├── utils/                  # Util libraries
│   └── baseUrl.ts          # Base URLs for projects
│   └── rest.ts             # API library
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
