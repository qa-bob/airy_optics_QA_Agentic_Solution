# Copilot Repository Instructions

## Project Summary

This repository is a **Playwright + TypeScript QA automation framework** for [Airy Optics](http://www.airyoptics.com/) — an optical design and polarization analysis web application. The project uses an AI-assisted, agentic testing approach powered by GitHub Copilot.

- **Target URL:** http://www.airyoptics.com/
- **Languages:** TypeScript
- **Frameworks:** Playwright (browser automation), Node.js
- **CI/CD:** GitHub Actions
- **Test types:** Smoke, Functional, Regression, Accessibility, Performance

---

## Repository Layout

```
airy_optics_QA_Agentic_Solution/
├── .github/
│   ├── copilot-instructions.md       # This file — repo-wide Copilot instructions
│   ├── instructions/                 # Path-specific Copilot instructions
│   │   ├── playwright-tests.instructions.md
│   │   └── typescript.instructions.md
│   └── workflows/                    # GitHub Actions CI pipelines
├── tests/
│   ├── smoke/                        # Quick sanity checks
│   ├── functional/                   # Feature-level tests
│   └── regression/                   # Full regression suite
├── pages/                            # Page Object Models (POM)
├── fixtures/                         # Test data and fixtures
├── utils/                            # Shared helpers and utilities
├── AGENTS.md                         # Agent-specific instructions (root)
├── Skills.md                         # Skills & capabilities catalog
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Node dependencies
└── README.md                         # Project overview and contributor guide
```

---

## Build & Validation Commands

Always run `npm install` before building or testing.

```bash
# Bootstrap
npm install
npx playwright install --with-deps

# Run all tests (headless)
npx playwright test

# Run a specific test suite
npx playwright test tests/smoke/
npx playwright test tests/functional/
npx playwright test tests/regression/

# Run with interactive UI
npx playwright test --ui

# Run with headed browser (visible)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# View test report
npx playwright show-report

# Type-check only (no emit)
npx tsc --noEmit

# Lint
npx eslint . --ext .ts
```

---

## Coding Standards

- **Page Object Model (POM):** All selectors and page interactions live in `pages/`. Tests import from `pages/` and never define raw selectors inline.
- **TypeScript strict mode** is enabled. All code must pass `npx tsc --noEmit` without errors.
- **Test file naming:** `<feature>.spec.ts` — e.g. `homepage.spec.ts`, `navigation.spec.ts`.
- **Fixtures** for test data live in `fixtures/`. Do not hardcode test data in test files.
- **Utilities** (waits, helpers) live in `utils/`.
- **No `test.only` or `test.skip`** in committed code unless explicitly justified in a comment.
- **Assertions:** Always use `expect` from `@playwright/test`. Use `toBeVisible`, `toHaveText`, `toHaveURL`, etc.
- **Accessibility:** Use `@axe-core/playwright` for a11y checks where applicable.

---

## GitHub Actions CI

Workflows are in `.github/workflows/`. The primary pipeline:
1. Installs Node + dependencies
2. Installs Playwright browsers
3. Runs `npx playwright test`
4. Uploads HTML report as a workflow artifact

PRs are blocked from merging if CI fails.

---

## Key Conventions for Copilot Agents

- The target site is **http://www.airyoptics.com/** — always scope tests to this URL.
- Use **Playwright's built-in auto-waiting** — avoid `page.waitForTimeout()` unless absolutely necessary.
- When generating new tests, follow the existing structure in `tests/smoke/` as a reference.
- When editing a Page Object, also update any test that imports from it.
- Check for existing utilities in `utils/` before writing new helper functions.
- Run `npx tsc --noEmit` and `npx eslint . --ext .ts` before marking a task complete.
- Run `npx playwright test` to verify tests pass after any change.
