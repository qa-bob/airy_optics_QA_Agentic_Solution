# Skills.md — Copilot Agent Skills & Capabilities

This file documents the skills, reusable patterns, and agent capabilities available in the **Airy Optics QA Agentic Solution** repository. Use this as a reference when extending the framework.

---

## Available Skills

### 1. Page Object Model (POM) — `pages/`

**What it does:** Encapsulates all selectors and interactions for a given page into a reusable TypeScript class.

**How to use:**
- Create a new file in `pages/` named `<PageName>Page.ts`.
- Define locators as `readonly Locator` class properties.
- Define navigation and interaction methods.
- Import and instantiate in test files.

**Example pattern:**
```typescript
import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { level: 1 });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  async goto(productId: string): Promise<void> {
    await this.page.goto(`http://www.airyoptics.com/products/${productId}`);
  }
}
```

---

### 2. Test Fixtures — `fixtures/`

**What it does:** Provides structured, reusable test data separate from test logic.

**How to use:**
- Store JSON or TypeScript files in `fixtures/`.
- Import fixture data in tests.
- Use Playwright's `test.extend` for setup/teardown fixtures (e.g., authenticated sessions).

**Example pattern:**
```typescript
// fixtures/testData.ts
export const testUsers = {
  admin: { email: 'admin@example.com', password: process.env.ADMIN_PASS! },
  guest: { email: 'guest@example.com', password: process.env.GUEST_PASS! },
};
```

---

### 3. Shared Utilities — `utils/`

**What it does:** Houses helper functions for waits, data formatting, API calls, and other cross-cutting concerns.

**How to use:**
- Add new helpers to an appropriately named file in `utils/`.
- Export with JSDoc comments.
- Import in tests or Page Objects as needed.

**Planned utilities:**
- `utils/wait.ts` — custom retry/wait helpers
- `utils/apiHelper.ts` — API request utilities for test setup
- `utils/dateHelper.ts` — date formatting for dynamic test data

---

### 4. Accessibility Auditing

**What it does:** Runs automated WCAG accessibility scans using `@axe-core/playwright`.

**How to use:**
```typescript
import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('http://www.airyoptics.com/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

**Install:** `npm install --save-dev @axe-core/playwright`

---

### 5. GitHub Actions CI — `.github/workflows/`

**What it does:** Automatically runs the full test suite on every push and pull request.

**Standard workflow steps:**
1. Checkout code
2. Setup Node.js
3. `npm install`
4. `npx playwright install --with-deps`
5. `npx playwright test`
6. Upload HTML test report as artifact

**Filtering by tag:**
```yaml
- name: Run smoke tests only
  run: npx playwright test --grep @smoke
```

---

### 6. Test Tagging & Filtering

**What it does:** Allows selective test execution by suite type.

**Tags in use:**

| Tag | Description |
|-----|-------------|
| `@smoke` | Quick sanity checks — must pass before any deployment |
| `@functional` | Feature-level tests |
| `@regression` | Full regression suite |
| `@a11y` | Accessibility-specific tests |

**Usage in CLI:**
```bash
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
```

---

### 7. Copilot Custom Instructions

**What it does:** Provides Copilot with repository context to generate better, more consistent code.

| File | Scope | Purpose |
|------|-------|---------|
| `.github/copilot-instructions.md` | All requests in this repo | Project summary, build commands, conventions |
| `.github/instructions/playwright-tests.instructions.md` | `tests/**/*.ts` | Playwright-specific test writing rules |
| `.github/instructions/typescript.instructions.md` | `**/*.ts` | TypeScript coding standards |
| `AGENTS.md` | AI agents (Copilot, Claude, Gemini) | Agent-specific onboarding and task guidelines |

---

## Adding New Skills

When you add a new reusable pattern, utility, or capability to this repo:
1. Implement it in the appropriate directory (`pages/`, `utils/`, `fixtures/`).
2. Document it in this file under a new numbered section.
3. Update `AGENTS.md` if agents need to know about it.
4. Update `.github/copilot-instructions.md` if it affects build/test steps.
