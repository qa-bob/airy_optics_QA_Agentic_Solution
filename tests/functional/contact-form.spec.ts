import { test, expect } from '../../fixtures/pages.fixture';
import { VALID_CONTACT_FORM_DATA } from '../../utils/testData';

test.describe('@functional Contact Form', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto();
    await contactPage.waitForLoad();
  });

  test('@functional contact page has the correct title', async ({ contactPage }) => {
    await expect(contactPage.page).toHaveTitle(/Contact.*Airy/i);
  });

  test('@functional contact form is visible on the page', async ({ contactPage }) => {
    const isVisible = await contactPage.isFormVisible();
    expect(isVisible).toBe(true);
  });

  test('@functional contact form has a name field', async ({ contactPage }) => {
    await expect(contactPage.nameField).toBeVisible();
  });

  test('@functional contact form has an email field', async ({ contactPage }) => {
    await expect(contactPage.emailField).toBeVisible();
  });

  test('@functional contact form has a message/textarea field', async ({ contactPage }) => {
    await expect(contactPage.messageField).toBeVisible();
  });

  test('@functional contact form has a submit button', async ({ contactPage }) => {
    await expect(contactPage.submitButton).toBeVisible();
  });

  test('@functional contact form accepts valid input in all fields', async ({ contactPage }) => {
    await contactPage.fillForm(VALID_CONTACT_FORM_DATA);

    await expect(contactPage.nameField).toHaveValue(VALID_CONTACT_FORM_DATA.name);
    await expect(contactPage.emailField).toHaveValue(VALID_CONTACT_FORM_DATA.email);
    await expect(contactPage.messageField).toHaveValue(VALID_CONTACT_FORM_DATA.message);
  });

  test('@functional contact form fields can be cleared', async ({ contactPage }) => {
    await contactPage.fillForm(VALID_CONTACT_FORM_DATA);
    await contactPage.clearForm();

    await expect(contactPage.nameField).toHaveValue('');
    await expect(contactPage.emailField).toHaveValue('');
    await expect(contactPage.messageField).toHaveValue('');
  });

  test('@functional email field rejects invalid email format', async ({ contactPage }) => {
    await contactPage.emailField.fill('not-an-email');
    await contactPage.emailField.blur();

    /* HTML5 native validation — check for browser-level invalidity */
    const isValid = await contactPage.emailField.evaluate(
      (el) => (el as HTMLInputElement).validity.valid
    );
    expect(isValid).toBe(false);
  });
});
