/**
 * Site config for SEO, analytics, and sharing.
 * Set VITE_SITE_URL in .env for your deployed URL (e.g. https://yoursite.com).
 */

const baseUrl = import.meta.env.VITE_SITE_URL ?? 'https://muhammadfahad.netlify.app'

export const site = {
  name: 'Muhammad Fahad',
  title: 'Muhammad Fahad | Portfolio | QA / Automation Engineer',
  description:
    "Muhammad Fahad's portfolio. QA / Automation Engineer — Playwright, Selenium, API testing. Experience with NDIS and healthcare platforms. MAJU, Karachi. Open to QA and SQA roles.",
  /** Full URL of your deployed site. From VITE_SITE_URL or fallback. */
  siteUrl: baseUrl.replace(/\/$/, ''),
  /** Absolute URL to og image. */
  ogImage: `${baseUrl.replace(/\/$/, '')}/og.png`,
  /** Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX). Leave empty to disable. */
  gaId: import.meta.env.VITE_GA_ID ?? '',
  /** Formspree form endpoint (e.g. https://formspree.io/f/yourformid). Leave empty to hide form. */
  formspreeUrl: import.meta.env.VITE_FORMSPREE_URL ?? '',
  /** Optional hero background video URL (MP4). Leave empty to use only 3D + overlay. */
  heroVideoUrl: import.meta.env.VITE_HERO_VIDEO_URL ?? '',
} as const
