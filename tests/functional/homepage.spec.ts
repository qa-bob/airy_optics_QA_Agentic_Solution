import { test, expect } from '../../fixtures/pages.fixture';
import { EXPECTED_TITLES, EXTERNAL_LINKS } from '../../utils/testData';

test.describe('@functional Homepage', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForLoad();
  });

  test('@functional homepage has the correct page title', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(EXPECTED_TITLES.home);
  });

  test('@functional homepage displays a primary heading', async ({ homePage }) => {
    await expect(homePage.heroHeading).toBeVisible();
    const headingText = await homePage.heroHeading.textContent();
    expect(headingText?.trim().length).toBeGreaterThan(0);
  });

  test('@functional homepage has the seminal textbook link', async ({ homePage }) => {
    await expect(homePage.seminalTextbookLink).toBeVisible();
    const href = await homePage.getSeminalTextbookHref();
    expect(href).toContain(EXTERNAL_LINKS.seminalTextbook);
  });

  test('@functional homepage seminal textbook link opens in a new tab', async ({ homePage }) => {
    const target = await homePage.seminalTextbookLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('@functional homepage has a meta description', async ({ homePage }) => {
    const metaDesc = await homePage.getMetaDescription();
    expect(metaDesc).not.toBeNull();
    expect(metaDesc?.length).toBeGreaterThan(10);
  });
});
