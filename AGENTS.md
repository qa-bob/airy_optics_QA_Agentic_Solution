# AGENTS.md — Airy Optics QA Agentic Solution

> This file provides instructions for AI agents (GitHub Copilot cloud agent, Claude, Gemini, and others) working in this repository. The nearest `AGENTS.md` in the directory tree takes precedence.

---

## Repository Purpose

Automated QA testing framework for [Airy Optics](http://www.airyoptics.com/) — an optical design and polarization analysis web application. Tests are written in **Playwright + TypeScript** and run via **GitHub Actions**.

- **Target application:** http://www.airyoptics.com/
- **Stack:** TypeScript, Playwright, Node.js, GitHub Actions
- **Testing approach:** Page Object Model (POM), fixture-driven data, AI-assisted test generation

---

## Before You Start

1. **Read `.github/copilot-instructions.md`** for the full project context, layout, and build commands.
2. **Read `Skills.md`** to understand what capabilities and patterns are available in this repo.
3. Check existing `pages/` before creating new Page Objects — avoid duplication.
4. Check existing `utils/` before writing new helpers.

---

## How to Bootstrap

```bash
npm install
npx playwright install --with-deps
```

---

## How to Validate Your Changes

Run these commands **before** marking any task complete:

```bash
# Type-check
npx tsc --noEmit

# Lint
npx eslint . --ext .ts

# Run all tests
npx playwright test

# View report (if tests fail, inspect the HTML report)
npx playwright show-report
```

All four commands must exit with code `0` for a change to be considered complete.

---

## Task Guidelines

### Writing New Tests

1. Identify the correct suite: `tests/smoke/`, `tests/functional/`, or `tests/regression/`.
2. Create or reuse a Page Object in `pages/`.
3. Use fixtures from `fixtures/` for test data.
4. Follow the naming pattern: `<feature>.spec.ts`.
5. Tag tests with `@smoke`, `@functional`, or `@regression`.

### Modifying Page Objects

- When changing a locator or method signature in `pages/`, also update every test that imports it.
- Run `npx tsc --noEmit` to catch broken imports.

### Adding Utilities

- New shared helpers go in `utils/`.
- Export them with JSDoc comments.
- Update `Skills.md` if the utility represents a reusable pattern.

### GitHub Actions Workflows

- Workflow files live in `.github/workflows/`.
- The CI pipeline must remain green. Do not remove or disable steps.
- If adding a new workflow, follow the existing pattern and include: install → browsers → test → upload-report.

---

## Constraints

- **Do not** hardcode selectors in test files — always use Page Objects.
- **Do not** use `page.waitForTimeout()` unless absolutely necessary (document the reason).
- **Do not** commit `test.only()` without a comment explaining why.
- **Do not** modify `.github/copilot-instructions.md` or `AGENTS.md` unless explicitly asked.
- **Do not** change `playwright.config.ts` without understanding the impact on all test suites.
- **Do not** expose credentials, API keys, or personal data in any file.

---

## Directory Reference

| Path | Purpose |
|------|---------|
| `tests/smoke/` | Quick sanity tests — must run in < 2 min total |
| `tests/functional/` | Feature-level tests |
| `tests/regression/` | Full regression coverage |
| `pages/` | Page Object Model classes |
| `fixtures/` | Test data files |
| `utils/` | Shared helpers |
| `.github/workflows/` | CI/CD pipelines |
| `.github/instructions/` | Path-specific Copilot instructions |
| `.github/copilot-instructions.md` | Repo-wide Copilot instructions |
