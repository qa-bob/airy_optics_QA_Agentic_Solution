---
applyTo: "tests/**/*.ts"
---

# Playwright Test Instructions

These instructions apply to all Playwright test files under `tests/`.

## Test Structure

- Every test file must import from `@playwright/test`:
  ```typescript
  import { test, expect } from '@playwright/test';
  ```
- Group related tests with `test.describe()` blocks.
- Each `test()` must have a clear, human-readable name describing the behavior being verified.
- Tests must be **independent** — no shared mutable state between tests.

## Page Objects

- Import the relevant Page Object from `pages/` instead of using raw locators in tests.
- Example:
  ```typescript
  import { HomePage } from '../../pages/HomePage';

  test('homepage loads correctly', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.header).toBeVisible();
  });
  ```

## Assertions

- Always assert something meaningful — never write a test with no `expect()`.
- Prefer specific Playwright matchers: `toBeVisible()`, `toHaveText()`, `toHaveURL()`, `toBeEnabled()`.
- Use `expect.soft()` for non-blocking checks within a single test where failures are informational.

## Waits & Timing

- **Never use `page.waitForTimeout()`** unless there is a specific, documented reason.
- Use Playwright's auto-waiting locators and action methods instead.
- For dynamic content, use `expect(locator).toBeVisible()` or `locator.waitFor()`.

## Data & Fixtures

- Test data must come from `fixtures/` — not hardcoded inline.
- Use Playwright fixtures (`test.extend`) for shared setup/teardown (auth state, page init).

## Test Tags & Filtering

- Tag tests using annotations to support filtering:
  ```typescript
  test('@smoke homepage renders', async ({ page }) => { ... });
  test('@regression checkout flow', async ({ page }) => { ... });
  ```

## Accessibility

- Include at least one accessibility check per major page/component:
  ```typescript
  import AxeBuilder from '@axe-core/playwright';
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
  ```

## Do Not

- Do not commit `test.only()` or `test.skip()` without an explanatory comment.
- Do not leave `console.log` statements in committed test code.
- Do not assert on implementation details (CSS classes, internal IDs) — prefer user-visible attributes.
