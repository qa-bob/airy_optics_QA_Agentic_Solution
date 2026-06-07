import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ApplicationEngineeringPage } from '../pages/ApplicationEngineeringPage';
import { PolarisPage } from '../pages/PolarisPage';
import { AiryMultilayerPage } from '../pages/AiryMultilayerPage';
import { AiryOpticalPlatformPage } from '../pages/AiryOpticalPlatformPage';
import { LeadershipPage } from '../pages/LeadershipPage';
import { ContactPage } from '../pages/ContactPage';
import { NavigationComponent } from '../pages/NavigationComponent';

/** Typed page object fixtures available in every test */
export interface PageFixtures {
  homePage: HomePage;
  appEngPage: ApplicationEngineeringPage;
  polarisPage: PolarisPage;
  multilayerPage: AiryMultilayerPage;
  opticalPlatformPage: AiryOpticalPlatformPage;
  leadershipPage: LeadershipPage;
  contactPage: ContactPage;
  nav: NavigationComponent;
}

/**
 * Extended Playwright test with all page objects pre-instantiated.
 * Import `test` and `expect` from this file instead of @playwright/test.
 */
export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  appEngPage: async ({ page }, use) => {
    await use(new ApplicationEngineeringPage(page));
  },
  polarisPage: async ({ page }, use) => {
    await use(new PolarisPage(page));
  },
  multilayerPage: async ({ page }, use) => {
    await use(new AiryMultilayerPage(page));
  },
  opticalPlatformPage: async ({ page }, use) => {
    await use(new AiryOpticalPlatformPage(page));
  },
  leadershipPage: async ({ page }, use) => {
    await use(new LeadershipPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  nav: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },
});

export { expect } from '@playwright/test';
