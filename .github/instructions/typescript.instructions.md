---
applyTo: "**/*.ts"
---

# TypeScript Coding Instructions

These instructions apply to all TypeScript files in the repository.

## TypeScript Config

- **Strict mode** is enabled in `tsconfig.json`. All code must compile with `npx tsc --noEmit`.
- Do not use `any` unless there is a documented reason. Prefer `unknown` and narrow the type.
- Use explicit return types for all functions and class methods.

## Naming Conventions

| Element        | Convention          | Example                    |
|----------------|---------------------|----------------------------|
| Classes        | PascalCase          | `HomePage`, `NavBar`       |
| Interfaces     | PascalCase + `I` prefix | `ITestConfig`          |
| Functions      | camelCase           | `getPageTitle()`           |
| Variables      | camelCase           | `pageTitle`                |
| Constants      | UPPER_SNAKE_CASE    | `BASE_URL`                 |
| Test files     | `<name>.spec.ts`    | `homepage.spec.ts`         |
| Page Objects   | `<Name>Page.ts`     | `HomePage.ts`              |

## Imports

- Use absolute imports from the project root where possible (configured via `tsconfig.json` `paths`).
- Group imports: external packages first, then internal modules, then types.

## Classes & Page Objects

- Page Object classes must extend or accept a `Page` instance from Playwright.
- Locators must be defined as class properties, not inline in methods.
- Example:
  ```typescript
  import { Page, Locator } from '@playwright/test';

  export class HomePage {
    readonly page: Page;
    readonly header: Locator;
    readonly navMenu: Locator;

    constructor(page: Page) {
      this.page = page;
      this.header = page.getByRole('banner');
      this.navMenu = page.getByRole('navigation');
    }

    async goto(): Promise<void> {
      await this.page.goto('http://www.airyoptics.com/');
    }
  }
  ```

## Error Handling

- Use typed errors where possible. Avoid swallowing errors silently.
- In async functions, always `await` Promises — do not fire-and-forget.

## Linting

- Code must pass `npx eslint . --ext .ts` with zero errors before committing.
- Warnings should be addressed unless explicitly suppressed with a comment explaining why.

## Comments

- Only comment code that needs clarification — do not comment obvious logic.
- Use JSDoc (`/** */`) for exported classes and functions.
