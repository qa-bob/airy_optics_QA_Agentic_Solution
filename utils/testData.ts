/** Base URL of the Airy Optics website */
export const BASE_URL = 'https://www.airyoptics.com';

/** Relative paths for all known pages */
export const PAGE_PATHS = {
  home: '/',
  applicationEngineering: '/applicationengineering',
  polaris: '/polaris',
  airyMultilayer: '/airymultilayer',
  airyOpticalPlatform: '/airy-optical-platform',
  leadership: '/leadership',
  contact: '/contact',
} as const;

/** Expected <title> values for each page */
export const EXPECTED_TITLES: Record<keyof typeof PAGE_PATHS, string> = {
  home: 'Airy | Transform Optical Design',
  applicationEngineering: 'Airy',
  polaris: 'Airy',
  airyMultilayer: 'Airy',
  airyOpticalPlatform: 'Airy',
  leadership: 'Airy',
  contact: 'Contact | Get in Touch Today — Airy',
};

/** Expected meta description substrings for each page */
export const EXPECTED_META_DESC_SUBSTRINGS: Record<keyof typeof PAGE_PATHS, string> = {
  home: 'optical design',
  applicationEngineering: 'Airy',
  polaris: 'Airy',
  airyMultilayer: 'Airy',
  airyOpticalPlatform: 'Airy',
  leadership: 'Airy',
  contact: 'contact',
};

/** External links found on the site */
export const EXTERNAL_LINKS = {
  support: 'https://support.airyoptics.com/',
  seminalTextbook: 'https://www.amazon.com/Polarized-Optical-Systems-Sciences-Applications/dp/149870056X',
} as const;

/** Navigation dropdown expected link hrefs */
export const NAV_DROPDOWN_HREFS = {
  solutions: ['/applicationengineering'],
  technology: ['/polaris', '/airymultilayer'],
  vision: ['/airy-optical-platform'],
  about: ['/leadership', '/contact'],
} as const;

/** Sample valid contact form data */
export const VALID_CONTACT_FORM_DATA = {
  name: 'QA Test User',
  email: 'qa-test@example.com',
  message: 'This is an automated test message. Please disregard.',
} as const;

/** Sample invalid contact form data for validation tests */
export const INVALID_CONTACT_FORM_DATA = {
  invalidEmail: 'not-an-email',
  emptyName: '',
  emptyEmail: '',
  emptyMessage: '',
} as const;
