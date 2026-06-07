import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

export class LeadershipPage extends BasePage {
  protected readonly path = '/leadership';
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
