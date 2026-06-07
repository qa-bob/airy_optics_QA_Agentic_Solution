import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

export class AiryMultilayerPage extends BasePage {
  protected readonly path = '/airymultilayer';
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
