import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGE_PATHS } from '../../utils/testData';

type PageKey = keyof typeof PAGE_PATHS;

test.describe('@regression @a11y Accessibility — All Pages', () => {
  const entries = Object.entries(PAGE_PATHS) as [PageKey, string][];

  for (const [name, path] of entries) {
    test(`@regression @a11y ${name} page has no critical accessibility violations`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(
        criticalViolations,
        `Found ${criticalViolations.length} critical/serious accessibility violation(s) on ${path}:\n` +
        criticalViolations.map((v) => `  - [${v.impact}] ${v.id}: ${v.description}`).join('\n')
      ).toHaveLength(0);
    });
  }
});
