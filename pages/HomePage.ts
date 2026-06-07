import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

export class HomePage extends BasePage {
  protected readonly path = '/';
  readonly nav: NavigationComponent;

  readonly heroHeading: Locator;
  readonly contactSection: Locator;
  readonly seminalTextbookLink: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavigationComponent(page);
    this.heroHeading = page.getByRole('heading').first();
    this.contactSection = page.locator('#home-contact-footer');
    this.seminalTextbookLink = page.getByRole('link', { name: /seminal textbook/i });
  }

  async getSeminalTextbookHref(): Promise<string | null> {
    return this.seminalTextbookLink.getAttribute('href');
  }

  async scrollToContactSection(): Promise<void> {
    await this.contactSection.scrollIntoViewIfNeeded();
  }
}
