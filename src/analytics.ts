/**
 * Analytics: Google Analytics 4 (GA4).
 * Set VITE_GA_ID in .env to your Measurement ID (e.g. G-XXXXXXXXXX) to enable.
 * Page views are sent on initial load; for SPA route changes you could call trackPageView().
 */

import { site } from './config/site'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function initAnalytics() {
  if (!site.gaId || typeof document === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', site.gaId, {
    send_page_view: true,
    page_path: window.location.pathname || '/',
  })
}

export function trackPageView(path: string, title?: string) {
  if (typeof window?.gtag !== 'function' || !site.gaId) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
  })
}
