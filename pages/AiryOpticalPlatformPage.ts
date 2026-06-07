import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

export class AiryOpticalPlatformPage extends BasePage {
  protected readonly path = '/airy-optical-platform';
  readonly nav: NavigationComponent;

  readonly mainHeading: Locator;
  readonly pageContent: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavigationComponent(page);
    this.mainHeading = page.getByRole('heading').first();
    this.pageContent = page.locator('main, #page, .sqs-layout').first();
  }
}
