export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  tag?: string
  /** Full markdown content for the post detail page */
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'playwright-e2e-qa',
    slug: 'playwright-e2e-qa',
    title: 'Playwright for E2E: stable selectors and flake-free runs',
    excerpt: 'How I use Playwright (JavaScript) for regression and critical-path automation: data-testid, waits, and parallel runs without flakiness.',
    date: '2025-02-01',
    tag: 'QA',
    content: `## Why Playwright for QA

Playwright gives cross-browser, auto-waiting, and solid debugging. For NDIS and similar enterprise apps, I use it for critical workflows and regression suites.

## Selectors that don't break

- Prefer \`data-testid\` for critical buttons and forms—devs can add them and they rarely change for styling.
- Use \`getByRole\` for accessibility-aligned selectors (button, textbox, link).
- Avoid raw CSS or XPath for layout-dependent elements; they break on UI tweaks.

## Reducing flakiness

- Rely on Playwright's built-in auto-wait (no arbitrary \`page.waitForTimeout\`).
- Use \`expect(locator).toBeVisible()\` or \`toHaveCount()\` before acting.
- For dynamic content, wait for a stable condition (e.g. network idle or specific element) instead of fixed delays.

## Parallel and CI

Run workers in parallel (e.g. 4) and split by project or file so suites finish faster. In CI, set \`retries: 1\` for transient failures and keep the suite focused on business-critical flows.`,
  },
  {
    id: 'test-case-design-qa',
    slug: 'test-case-design-qa',
    title: 'Test case design: coverage without explosion',
    excerpt: 'Practical approach to designing test cases for functional and regression testing—boundaries, equivalence, and risk-based prioritization.',
    date: '2025-01-20',
    tag: 'QA',
    content: `## Start from requirements and risk

Map test cases to user stories or acceptance criteria. Prioritize high-risk areas (payments, auth, data integrity) and critical user journeys first.

## Equivalence partitioning and boundaries

- Group inputs into equivalence classes (valid, invalid, edge) and pick representative values.
- Explicitly test boundaries: min/max, empty, one over limit. Bugs often sit at edges.

## Keep cases maintainable

- One clear expected result per case; avoid "and also check X" in a single step.
- Use consistent naming and structure so anyone can run or automate later.
- Reuse setup (e.g. fixtures or shared data) so adding new cases doesn't mean duplicating steps.

## Regression set

Maintain a core regression set that runs every release. Add new cases for fixed bugs and new features, and trim or archive low-value cases so the suite stays runnable in a reasonable time.`,
  },
  {
    id: 'api-testing-postman',
    slug: 'api-testing-postman',
    title: 'API testing with Postman: contracts and sanity checks',
    excerpt: 'Using Postman for REST API sanity checks, status codes, and response shape—quick feedback before or alongside UI testing.',
    date: '2025-01-05',
    tag: 'QA',
    content: `## When API tests help

- Verify endpoints return expected status and body shape before or without hitting the UI.
- Smoke-test after deployments: critical GET/POST flows in one collection.
- Document expected request/response for the team (Postman as living spec).

## What to check

- Status codes: 200, 201, 400, 401, 404 as per design.
- Response schema: required fields present, types (e.g. number vs string).
- Edge cases: invalid payloads, missing auth, bad IDs—expect 4xx and clear error messages.

## Organize and automate

- One collection per service or area; use env vars for base URL and tokens.
- Postman tests (e.g. \`pm.test("status is 200", ...)\`) give quick pass/fail. Run in CI with Newman for regression.
- For deeper contract testing, consider OpenAPI/contract tests; Postman is great for daily sanity and exploratory checks.`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getNextPrev(slug: string): { next: BlogPost | null; prev: BlogPost | null } {
  const i = blogPosts.findIndex((p) => p.slug === slug)
  if (i === -1) return { next: null, prev: null }
  return {
    prev: i > 0 ? blogPosts[i - 1] ?? null : null,
    next: i < blogPosts.length - 1 ? blogPosts[i + 1] ?? null : null,
  }
}

/** Approximate reading time in minutes (word count / 200) */
export function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
