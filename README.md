# Airy Optics — QA Agentic Solution

> Automated QA framework for [Airy Optics](http://www.airyoptics.com/) built with Playwright + TypeScript, powered by GitHub Copilot.

---

## 🏢 Company Profile

| Field | Details |
|-------|---------|
| **Company** | Airy Optics |
| **Description** | Optical design and polarization analysis program |
| **Website** | [http://www.airyoptics.com/](http://www.airyoptics.com/) |
| **LinkedIn** | [View Profile](https://www.linkedin.com/company/airy-optics/) |
| **City** | Tucson |
| **Founded** | 2016 |
| **Leaders** | Jeremy Shockley (President), Morgan Harlan (VP Engineering) |

---

## 🎯 Purpose

This repository is an **AI-assisted QA agentic solution** for the Airy Optics web application. It combines:

- **Playwright** for reliable, cross-browser test automation
- **TypeScript** for type-safe, maintainable test code
- **GitHub Copilot** for AI-accelerated test generation and maintenance
- **GitHub Actions** for automated CI/CD test execution

The goal is to achieve comprehensive test coverage of http://www.airyoptics.com/ across smoke, functional, regression, and accessibility dimensions — with Copilot agents able to autonomously write, maintain, and extend tests.

---

## 🚀 Development Environment Setup

### Prerequisites

- **Node.js** v18 or later (`node --version`)
- **npm** v9 or later (`npm --version`)
- **GitHub Copilot** subscription (for AI-assisted development)
- A GitHub account with access to this repository

### 1. Clone the Repository

```bash
git clone https://github.com/qa-bob/airy_optics_QA_Agentic_Solution.git
cd airy_optics_QA_Agentic_Solution
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

### 4. Verify Setup

```bash
# Type-check
npx tsc --noEmit

# Run smoke tests to confirm environment is working
npx playwright test tests/smoke/ --reporter=list
```

### 5. (Optional) Install VS Code Extensions

For the best Copilot experience in VS Code:
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

---

## 🧪 Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run a specific suite
npx playwright test tests/smoke/
npx playwright test tests/functional/
npx playwright test tests/regression/

# Run by tag
npx playwright test --grep "@smoke"
npx playwright test --grep "@a11y"

# Interactive UI mode
npx playwright test --ui

# Headed (visible browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# View HTML report
npx playwright show-report
```

---

## 📁 Project Structure

```
airy_optics_QA_Agentic_Solution/
├── .github/
│   ├── copilot-instructions.md        # Repo-wide Copilot instructions
│   ├── instructions/                  # Path-specific Copilot instructions
│   │   ├── playwright-tests.instructions.md
│   │   └── typescript.instructions.md
│   └── workflows/                     # GitHub Actions CI pipelines
├── tests/
│   ├── smoke/                         # Quick sanity checks (@smoke)
│   ├── functional/                    # Feature-level tests (@functional)
│   └── regression/                    # Full regression suite (@regression)
├── pages/                             # Page Object Model classes
├── fixtures/                          # Test data and Playwright fixtures
├── utils/                             # Shared helpers and utilities
├── AGENTS.md                          # AI agent onboarding instructions
├── Skills.md                          # Reusable skills & pattern catalog
├── playwright.config.ts               # Playwright configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Node.js dependencies
└── README.md                          # This file
```

---

## 🤖 GitHub Copilot Setup

This repository is fully configured for GitHub Copilot. The following files guide Copilot's behavior:

| File | Purpose |
|------|---------|
| `.github/copilot-instructions.md` | **Repo-wide instructions** — project summary, build commands, conventions. Applied to all Copilot requests in this repo. |
| `.github/instructions/playwright-tests.instructions.md` | **Path-specific instructions** for `tests/**/*.ts` — Playwright best practices, assertion patterns, POM usage. |
| `.github/instructions/typescript.instructions.md` | **Path-specific instructions** for all `**/*.ts` files — TypeScript standards, naming conventions. |
| `AGENTS.md` | **Agent instructions** — used by Copilot cloud agent, Claude, and Gemini when working autonomously in this repo. |
| `Skills.md` | **Skills catalog** — documents reusable patterns and capabilities agents can leverage. |

### Using Copilot in This Repo

- **Copilot Chat** on GitHub.com will automatically use `.github/copilot-instructions.md`.
- **Copilot cloud agent** (at github.com/copilot/agents) will use all instruction files plus `AGENTS.md`.
- **VS Code Copilot** will use `.github/copilot-instructions.md` and path-specific instructions.
- **Copilot code review** applies `.github/copilot-instructions.md` and path-specific instructions when reviewing PRs.

---

## 📋 Contributor Rules

### Code Quality

1. **All PRs must pass CI** — the GitHub Actions pipeline runs the full test suite on every PR.
2. **Type-check before pushing:** `npx tsc --noEmit` must exit with code `0`.
3. **Lint before pushing:** `npx eslint . --ext .ts` must exit with code `0`.
4. **No `test.only()` in committed code** — use tags (`@smoke`, `@regression`) for selective runs.
5. **No hardcoded selectors in test files** — always use Page Objects from `pages/`.
6. **No hardcoded test data** — use fixtures from `fixtures/`.

### Branch & PR Workflow

1. Branch from `main` using descriptive names: `feat/add-nav-tests`, `fix/homepage-locator`.
2. Write a clear PR description explaining what was tested and why.
3. Request a Copilot code review on every PR (enabled by default in this repo).
4. Squash commits on merge to keep history clean.

### Test Writing Standards

- Follow the Page Object Model — see `Skills.md` for examples.
- Tag every test with `@smoke`, `@functional`, `@regression`, or `@a11y`.
- Include at least one accessibility check per new page added.
- Tests must be deterministic — no flaky timing assumptions.

### Updating Copilot Configuration

- If you add a new technology, framework, or significant pattern, update `.github/copilot-instructions.md`.
- If you add a new reusable skill or utility, document it in `Skills.md`.
- If agent workflows change, update `AGENTS.md`.

### Secrets & Security

- **Never commit credentials, API keys, or personal data.**
- Use `process.env` variables for any sensitive values.
- Add new env vars to the GitHub Actions workflow secrets and document them here.

---

## 🔧 Planned Test Coverage

- [ ] Smoke tests — homepage, navigation, core page loads
- [ ] Functional tests — key user journeys on airyoptics.com
- [ ] Regression suite — comprehensive coverage
- [ ] Accessibility checks — WCAG compliance via axe-core
- [ ] Performance baselines — Core Web Vitals snapshots

---

## 📚 References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Custom Instructions Guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
- [Copilot Cloud Agent](https://github.com/copilot/agents)
- [AGENTS.md](./AGENTS.md) — AI agent onboarding
- [Skills.md](./Skills.md) — Reusable patterns catalog

---

*Part of the Phoenix Startup QA Agentic Solutions project.*
