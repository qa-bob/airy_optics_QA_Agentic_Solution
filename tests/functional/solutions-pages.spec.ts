import { test, expect } from '../../fixtures/pages.fixture';

test.describe('@functional Solutions Pages', () => {
  test.describe('Application Engineering page', () => {
    test.beforeEach(async ({ appEngPage }) => {
      await appEngPage.goto();
      await appEngPage.waitForLoad();
    });

    test('@functional Application Engineering page loads successfully', async ({ request }) => {
      const response = await request.get('/applicationengineering');
      expect(response.ok()).toBe(true);
    });

    test('@functional Application Engineering page displays a primary heading', async ({ appEngPage }) => {
      await expect(appEngPage.mainHeading).toBeVisible();
      const text = await appEngPage.mainHeading.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    });

    test('@functional Application Engineering page has page content', async ({ appEngPage }) => {
      await expect(appEngPage.pageContent).toBeVisible();
    });

    test('@functional Application Engineering page has a meta description', async ({ appEngPage }) => {
      const metaDesc = await appEngPage.getMetaDescription();
      expect(metaDesc).not.toBeNull();
    });
  });

  test.describe('Leadership page', () => {
    test.beforeEach(async ({ leadershipPage }) => {
      await leadershipPage.goto();
      await leadershipPage.waitForLoad();
    });

    test('@functional Leadership page loads successfully', async ({ request }) => {
      const response = await request.get('/leadership');
      expect(response.ok()).toBe(true);
    });

    test('@functional Leadership page displays a primary heading', async ({ leadershipPage }) => {
      await expect(leadershipPage.mainHeading).toBeVisible();
      const text = await leadershipPage.mainHeading.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    });

    test('@functional Leadership page has page content', async ({ leadershipPage }) => {
      await expect(leadershipPage.pageContent).toBeVisible();
    });
  });
});
