/**
 * Single source of truth for main page section order, ids, and labels.
 * SectionNav and each section use this to stay in sync.
 */

export const SECTIONS = [
  { id: 'about', number: '01' },
  { id: 'experience', number: '02' },
  { id: 'skills', number: '03' },
  { id: 'projects', number: '04' },
  { id: 'blog', number: '05' },
  { id: 'testimonials', number: '06' },
  { id: 'contact', number: '07' },
] as const

export const SECTION_IDS = SECTIONS.map((s) => s.id)

export function getSectionNumber(id: string): string | undefined {
  return SECTIONS.find((s) => s.id === id)?.number
}

/** Default section wrapper className (border + padding). section-safe-x for notched mobile. */
export const SECTION_CLASS = 'border-b border-theme section-safe-x py-16 sm:px-8 sm:py-24'
