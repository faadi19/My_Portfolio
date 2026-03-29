/**
 * Format a date string for display.
 * @param dateStr - ISO date string (e.g. "2025-01-10")
 * @param longMonth - If true, use long month name (January); otherwise short (Jan)
 */
export function formatDate(dateStr: string, longMonth = false): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: longMonth ? 'long' : 'short',
    day: 'numeric',
  })
}
