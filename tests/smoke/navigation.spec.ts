import { test, expect } from '../../fixtures/pages.fixture';

test.describe('@smoke Navigation Header', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForLoad();
  });

  test('@smoke Airy logo is visible in the header', async ({ nav }) => {
    await expect(nav.logo).toBeVisible();
  });

  test('@smoke Solutions dropdown button is visible', async ({ nav }) => {
    await expect(nav.solutionsMenu).toBeVisible();
  });

  test('@smoke Technology dropdown button is visible', async ({ nav }) => {
    await expect(nav.technologyMenu).toBeVisible();
  });

  test('@smoke Vision dropdown button is visible', async ({ nav }) => {
    await expect(nav.visionMenu).toBeVisible();
  });

  test('@smoke About dropdown button is visible', async ({ nav }) => {
    await expect(nav.aboutMenu).toBeVisible();
  });

  test('@smoke Support link is visible', async ({ nav }) => {
    await expect(nav.supportLink).toBeVisible();
  });

  test('@smoke Contact CTA button is visible', async ({ nav }) => {
    await expect(nav.contactCTAButton).toBeVisible();
  });
});
