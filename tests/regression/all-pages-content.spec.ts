import { test, expect } from '../../fixtures/pages.fixture';
import { PAGE_PATHS, EXPECTED_TITLES } from '../../utils/testData';

type PageKey = keyof typeof PAGE_PATHS;

test.describe('@regression All Pages — Content Validation', () => {
  const entries = Object.entries(PAGE_PATHS) as [PageKey, string][];

  for (const [name, path] of entries) {
    test(`@regression ${name} page returns HTTP 200`, async ({ request }) => {
      const response = await request.get(path);
      expect(
        response.status(),
        `Expected ${path} to return 200, got ${response.status()}`
      ).toBe(200);
    });

    test(`@regression ${name} page has the correct title`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const title = await page.title();
      expect(
        title,
        `Expected title for ${path} to contain "${EXPECTED_TITLES[name]}"`
      ).toContain(EXPECTED_TITLES[name].split('|')[0].trim());
    });

    test(`@regression ${name} page has a visible h1 or primary heading`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });
  }
});
