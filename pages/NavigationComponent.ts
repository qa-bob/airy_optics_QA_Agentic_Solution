import { Page, Locator } from '@playwright/test';

/**
 * Represents the shared navigation header present on all pages.
 * Composed into Page Objects rather than inherited.
 *
 * Navigation structure:
 *   Solutions   → /applicationengineering
 *   Technology  → /polaris, /airymultilayer
 *   Vision      → /airy-optical-platform
 *   About       → /leadership, /contact
 *   Support     → https://support.airyoptics.com/ (external, new tab)
 *   [CTA] Contact button → /home/#home-contact-footer
 */
export class NavigationComponent {
  readonly page: Page;

  readonly logo: Locator;
  readonly solutionsMenu: Locator;
  readonly technologyMenu: Locator;
  readonly visionMenu: Locator;
  readonly aboutMenu: Locator;
  readonly supportLink: Locator;
  readonly contactCTAButton: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('banner').getByRole('link', { name: 'Airy' });
    this.solutionsMenu = page.getByRole('button', { name: 'Solutions' });
    this.technologyMenu = page.getByRole('button', { name: 'Technology' });
    this.visionMenu = page.getByRole('button', { name: 'Vision' });
    this.aboutMenu = page.getByRole('button', { name: 'About' });
    this.supportLink = page.getByRole('link', { name: 'Support' });
    this.contactCTAButton = page.getByRole('link', { name: 'Contact' }).filter({ hasText: 'Contact' }).first();
    this.mobileMenuButton = page.locator('.header-burger-btn');
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openSolutionsDropdown(): Promise<void> {
    await this.solutionsMenu.click();
  }

  async openTechnologyDropdown(): Promise<void> {
    await this.technologyMenu.click();
  }

  async openVisionDropdown(): Promise<void> {
    await this.visionMenu.click();
  }

  async openAboutDropdown(): Promise<void> {
    await this.aboutMenu.click();
  }

  async clickContactCTA(): Promise<void> {
    await this.contactCTAButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  /** Returns the href attribute of the Support link */
  async getSupportHref(): Promise<string | null> {
    return this.supportLink.getAttribute('href');
  }

  /** Returns all child link hrefs visible inside a dropdown after opening it */
  async getSolutionsDropdownLinks(): Promise<string[]> {
    await this.openSolutionsDropdown();
    return this.page.locator('#solutions a').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')
    );
  }

  async getTechnologyDropdownLinks(): Promise<string[]> {
    await this.openTechnologyDropdown();
    return this.page.locator('#technology a').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')
    );
  }

  async getVisionDropdownLinks(): Promise<string[]> {
    await this.openVisionDropdown();
    return this.page.locator('#vision a').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')
    );
  }

  async getAboutDropdownLinks(): Promise<string[]> {
    await this.openAboutDropdown();
    return this.page.locator('#about a').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')
    );
  }
}
