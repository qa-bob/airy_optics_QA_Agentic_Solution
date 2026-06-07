import { test, expect } from '@playwright/test';
import { PAGE_PATHS } from '../../utils/testData';

test.describe('@smoke Site Availability', () => {
  const pages = Object.entries(PAGE_PATHS) as [string, string][];

  for (const [name, path] of pages) {
    test(`@smoke ${name} page returns a successful response`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.ok(), `Expected ${path} to return 200, got ${response.status()}`).toBe(true);
    });
  }

  test('@smoke homepage loads without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    expect(
      consoleErrors.filter((e) => !e.includes('favicon') && !e.includes('analytics')),
      'Expected no console errors on homepage'
    ).toHaveLength(0);
  });

  test('@smoke contact page loads without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');

    expect(
      consoleErrors.filter((e) => !e.includes('favicon') && !e.includes('analytics')),
      'Expected no console errors on contact page'
    ).toHaveLength(0);
  });
});
