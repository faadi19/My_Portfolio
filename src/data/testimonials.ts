export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  context?: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Fahad delivered thorough test coverage for our NDIS platform and set up Playwright automation for critical flows. Reliable and quality-focused.',
    author: 'Team Lead',
    role: 'KDYS Lab',
    context: 'SQA',
  },
  {
    id: '2',
    quote: 'During his internship he validated Shifara and RecCiaga workflows, logged clear defects, and fit well into our Agile process.',
    author: 'Manager',
    role: 'KDYS Lab',
    context: 'Internship',
  },
  {
    id: '3',
    quote: 'Strong grasp of test case design and defect lifecycle. Good with both manual and automation—would recommend for QA roles.',
    author: 'Senior QA',
    role: 'KDYS Lab',
    context: 'Colleague',
  },
]
