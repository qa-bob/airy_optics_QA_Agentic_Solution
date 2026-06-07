import { Page } from '@playwright/test';

/**
 * Abstract base class for all Page Objects.
 * Provides common navigation and utility methods shared across every page.
 */
export abstract class BasePage {
  readonly page: Page;

  /** The relative path for this page (e.g. '/contact') */
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to this page's path */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** Get the current page <title> text */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Get the content of the meta[name="description"] tag */
  async getMetaDescription(): Promise<string | null> {
    return this.page.getAttribute('meta[name="description"]', 'content');
  }

  /** Get the text content of the first h1 on the page */
  async getH1Text(): Promise<string | null> {
    const h1 = this.page.locator('h1').first();
    return h1.textContent();
  }

  /** Wait for the page to reach a network idle state */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Check whether the page has any console errors */
  collectConsoleErrors(): string[] {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }
}
