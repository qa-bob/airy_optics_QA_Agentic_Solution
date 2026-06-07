import { test, expect } from '@playwright/test';
import { PAGE_PATHS, EXPECTED_TITLES } from '../../utils/testData';

type PageKey = keyof typeof PAGE_PATHS;

test.describe('@regression SEO & Meta Tags', () => {
  const entries = Object.entries(PAGE_PATHS) as [PageKey, string][];

  for (const [name, path] of entries) {
    test(`@regression ${name} page has a non-empty <title>`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const title = await page.title();
      expect(title.trim().length, `Expected non-empty title on ${path}`).toBeGreaterThan(0);
    });

    test(`@regression ${name} page title contains expected brand name "Airy"`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const title = await page.title();
      expect(title).toContain(EXPECTED_TITLES[name].split('|').pop()?.trim() ?? 'Airy');
    });

    test(`@regression ${name} page has a meta description`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const desc = await page.getAttribute('meta[name="description"]', 'content');
      expect(desc, `Expected meta description on ${path}`).not.toBeNull();
      expect(desc!.trim().length, `Expected non-empty meta description on ${path}`).toBeGreaterThan(10);
    });

    test(`@regression ${name} page has a canonical link`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
      expect(canonical, `Expected canonical link on ${path}`).not.toBeNull();
      expect(canonical).toContain('airyoptics.com');
    });
  }
});
