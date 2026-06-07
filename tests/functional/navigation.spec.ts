import { test, expect } from '../../fixtures/pages.fixture';
import { NAV_DROPDOWN_HREFS, EXTERNAL_LINKS } from '../../utils/testData';

test.describe('@functional Navigation Dropdowns', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForLoad();
  });

  test('@functional Solutions dropdown reveals Application Engineering link', async ({ nav, page }) => {
    await nav.openSolutionsDropdown();
    const appEngLink = page.locator('#solutions a[href="/applicationengineering"]');
    await expect(appEngLink).toBeVisible();
  });

  test('@functional Technology dropdown reveals Polaris link', async ({ nav, page }) => {
    await nav.openTechnologyDropdown();
    const polarisLink = page.locator('#technology a[href="/polaris"]');
    await expect(polarisLink).toBeVisible();
  });

  test('@functional Technology dropdown reveals Airy Multilayer link', async ({ nav, page }) => {
    await nav.openTechnologyDropdown();
    const multilayerLink = page.locator('#technology a[href="/airymultilayer"]');
    await expect(multilayerLink).toBeVisible();
  });

  test('@functional Vision dropdown reveals Airy Optical Platform link', async ({ nav, page }) => {
    await nav.openVisionDropdown();
    const platformLink = page.locator('#vision a[href="/airy-optical-platform"]');
    await expect(platformLink).toBeVisible();
  });

  test('@functional About dropdown reveals Mission and Leadership link', async ({ nav, page }) => {
    await nav.openAboutDropdown();
    const leadershipLink = page.locator('#about a[href="/leadership"]');
    await expect(leadershipLink).toBeVisible();
  });

  test('@functional About dropdown reveals Contact link', async ({ nav, page }) => {
    await nav.openAboutDropdown();
    const contactLink = page.locator('#about a[href="/contact"]');
    await expect(contactLink).toBeVisible();
  });

  test('@functional Solutions dropdown links match expected hrefs', async ({ nav }) => {
    const links = await nav.getSolutionsDropdownLinks();
    for (const expectedHref of NAV_DROPDOWN_HREFS.solutions) {
      expect(links).toContain(expectedHref);
    }
  });

  test('@functional Technology dropdown links match expected hrefs', async ({ nav }) => {
    const links = await nav.getTechnologyDropdownLinks();
    for (const expectedHref of NAV_DROPDOWN_HREFS.technology) {
      expect(links).toContain(expectedHref);
    }
  });

  test('@functional Support link points to external support site', async ({ nav }) => {
    const href = await nav.getSupportHref();
    expect(href).toBe(EXTERNAL_LINKS.support);
  });

  test('@functional Support link opens in a new tab', async ({ nav }) => {
    const target = await nav.supportLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('@functional clicking logo from any page navigates to homepage', async ({ nav, page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');
    await nav.clickLogo();
    await expect(page).toHaveURL(/airyoptics\.com\/?$/);
  });
});
