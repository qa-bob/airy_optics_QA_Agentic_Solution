import { test, expect } from '../../fixtures/pages.fixture';
import { NAV_DROPDOWN_HREFS, EXTERNAL_LINKS } from '../../utils/testData';

test.describe('@regression Link Integrity', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForLoad();
  });

  test('@regression all Solutions dropdown links resolve without 404', async ({ nav, request }) => {
    for (const href of NAV_DROPDOWN_HREFS.solutions) {
      const response = await request.get(href);
      expect(response.status(), `Expected ${href} to resolve, got ${response.status()}`).not.toBe(404);
    }
  });

  test('@regression all Technology dropdown links resolve without 404', async ({ nav, request }) => {
    for (const href of NAV_DROPDOWN_HREFS.technology) {
      const response = await request.get(href);
      expect(response.status(), `Expected ${href} to resolve, got ${response.status()}`).not.toBe(404);
    }
  });

  test('@regression all Vision dropdown links resolve without 404', async ({ nav, request }) => {
    for (const href of NAV_DROPDOWN_HREFS.vision) {
      const response = await request.get(href);
      expect(response.status(), `Expected ${href} to resolve, got ${response.status()}`).not.toBe(404);
    }
  });

  test('@regression all About dropdown links resolve without 404', async ({ nav, request }) => {
    for (const href of NAV_DROPDOWN_HREFS.about) {
      const response = await request.get(href);
      expect(response.status(), `Expected ${href} to resolve, got ${response.status()}`).not.toBe(404);
    }
  });

  test('@regression Support external link points to the correct URL', async ({ nav }) => {
    const href = await nav.getSupportHref();
    expect(href).toBe(EXTERNAL_LINKS.support);
  });

  test('@regression Support link has target="_blank" for external navigation', async ({ nav }) => {
    const target = await nav.supportLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('@regression Contact CTA button href contains the contact anchor', async ({ nav }) => {
    const href = await nav.contactCTAButton.getAttribute('href');
    expect(href).toContain('contact');
  });

  test('@regression logo link navigates to the homepage root', async ({ nav }) => {
    const href = await nav.logo.getAttribute('href');
    expect(href).toBe('/');
  });
});
