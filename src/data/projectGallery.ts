/**
 * All images per project folder – used for the project gallery modal.
 * Add more images in src/assets/project-images/<folder>/ and they will show here after rebuild.
 */
function globUrls(globResult: Record<string, unknown>): string[] {
  return Object.entries(globResult)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, m]) => (typeof m === 'string' ? m : (m as { default?: string })?.default ?? ''))
    .filter(Boolean)
}

const ndisyncGlob = import.meta.glob(
  '../assets/project-images/ndisync/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' }
)
const shifaraGlob = import.meta.glob(
  '../assets/project-images/Shifara/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' }
)
const recciagaGlob = import.meta.glob(
  '../assets/project-images/RecCiaga/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' }
)

/** Project id (from portfolio) -> list of image URLs in that folder */
export const projectGalleryImages: Record<string, string[]> = {
  'ndisync-qa': globUrls(ndisyncGlob),
  'shifara-qa': globUrls(shifaraGlob),
  'recciaga-qa': globUrls(recciagaGlob),
}

export function getGalleryImages(projectId: string): string[] {
  return projectGalleryImages[projectId] ?? []
}
