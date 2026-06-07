import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from './NavigationComponent';

/** Field data for filling out the contact form */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export class ContactPage extends BasePage {
  protected readonly path = '/contact';
  readonly nav: NavigationComponent;

  readonly mainHeading: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly messageField: Locator;
  readonly submitButton: Locator;
  readonly formElement: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavigationComponent(page);
    this.mainHeading = page.getByRole('heading').first();
    this.formElement = page.locator('form').first();
    this.nameField = page.locator('input[name*="name" i], input[placeholder*="name" i]').first();
    this.emailField = page.locator('input[type="email"], input[name*="email" i]').first();
    this.messageField = page.locator('textarea').first();
    this.submitButton = page.locator('form').first().getByRole('button').last();
  }

  /** Fill all contact form fields without submitting */
  async fillForm(data: ContactFormData): Promise<void> {
    await this.nameField.fill(data.name);
    await this.emailField.fill(data.email);
    await this.messageField.fill(data.message);
  }

  /** Clear all form fields */
  async clearForm(): Promise<void> {
    await this.nameField.clear();
    await this.emailField.clear();
    await this.messageField.clear();
  }

  /** Returns whether the form is visible on the page */
  async isFormVisible(): Promise<boolean> {
    return this.formElement.isVisible();
  }
}
