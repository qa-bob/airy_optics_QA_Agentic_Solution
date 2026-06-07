import { test, expect } from '../../fixtures/pages.fixture';

test.describe('@functional Technology Pages', () => {
  test.describe('Polaris page', () => {
    test.beforeEach(async ({ polarisPage }) => {
      await polarisPage.goto();
      await polarisPage.waitForLoad();
    });

    test('@functional Polaris page loads and returns success status', async ({ request }) => {
      const response = await request.get('/polaris');
      expect(response.ok()).toBe(true);
    });

    test('@functional Polaris page displays a primary heading', async ({ polarisPage }) => {
      await expect(polarisPage.mainHeading).toBeVisible();
      const text = await polarisPage.mainHeading.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    });

    test('@functional Polaris page has page content', async ({ polarisPage }) => {
      await expect(polarisPage.pageContent).toBeVisible();
    });

    test('@functional Polaris page has a meta description', async ({ polarisPage }) => {
      const metaDesc = await polarisPage.getMetaDescription();
      expect(metaDesc).not.toBeNull();
    });
  });

  test.describe('Airy Multilayer page', () => {
    test.beforeEach(async ({ multilayerPage }) => {
      await multilayerPage.goto();
      await multilayerPage.waitForLoad();
    });

    test('@functional Airy Multilayer page loads and returns success status', async ({ request }) => {
      const response = await request.get('/airymultilayer');
      expect(response.ok()).toBe(true);
    });

    test('@functional Airy Multilayer page displays a primary heading', async ({ multilayerPage }) => {
      await expect(multilayerPage.mainHeading).toBeVisible();
      const text = await multilayerPage.mainHeading.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    });

    test('@functional Airy Multilayer page has page content', async ({ multilayerPage }) => {
      await expect(multilayerPage.pageContent).toBeVisible();
    });
  });

  test.describe('Airy Optical Platform page', () => {
    test.beforeEach(async ({ opticalPlatformPage }) => {
      await opticalPlatformPage.goto();
      await opticalPlatformPage.waitForLoad();
    });

    test('@functional Airy Optical Platform page loads successfully', async ({ request }) => {
      const response = await request.get('/airy-optical-platform');
      expect(response.ok()).toBe(true);
    });

    test('@functional Airy Optical Platform page displays a primary heading', async ({ opticalPlatformPage }) => {
      await expect(opticalPlatformPage.mainHeading).toBeVisible();
    });

    test('@functional Airy Optical Platform page has page content', async ({ opticalPlatformPage }) => {
      await expect(opticalPlatformPage.pageContent).toBeVisible();
    });
  });
});
