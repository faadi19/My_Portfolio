import ndisyncImg from '../assets/project-images/ndisync/ndisync_landing_page.png'
import shifaraImg from '../assets/project-images/Shifara/shifara.com_landing-page.png'
import recciagaImg from '../assets/project-images/RecCiaga/192.168.1.208_3006_complete_landing_page.png'

export const profile = {
  name: 'Muhammad Fahad',
  role: 'QA / Automation Engineer',
  tagline: 'Quality-focused QA Engineer. Playwright, Selenium, API testing & defect-free releases.',
  location: 'Karachi, Pakistan',
  email: 'faadii557@gmail.com',
  phone: '+92 340 8631904',
  linkedin: 'https://www.linkedin.com/in/shahfahad2002',
  github: 'https://github.com',
  resumeUrl: '/resume.pdf',
  resumeDownloadName: 'Muhammad_Fahad_Resume.pdf',
} as const

export const about = {
  bio: `QA / Automation Engineer with hands-on experience testing enterprise web and mobile applications, including NDIS and healthcare platforms. Strong expertise in Playwright (JavaScript), Selenium (C#), API testing, and defect tracking, with exposure to real-world production systems. I focus on functional, regression, and usability testing to ensure workflow stability and defect-free releases.`,
} as const

export const education = {
  school: 'Muhammad Ali Jinnah University (MAJU)',
  location: 'Karachi, Pakistan',
  degree: 'BS Computer Science',
  gpa: '3.35 CGPA',
  graduation: 'Ongoing',
  graduated: false,
  highlights: [
    'ACCP Prime (Software Engineering) — Aptech, 2020–2023, Grade: A',
    'Scrum Foundation Professional Certificate (SFPC™)',
    'Jira Fundamentals — Atlassian',
    'QA Fundamentals — 10Pearls',
  ],
} as const

export const experience = [
  {
    role: 'Junior SQA Engineer',
    company: 'KDYS Lab',
    period: 'Nov 2025 – Present',
    location: 'Karachi, Pakistan',
    points: [
      'Performed manual testing for NDIS web and mobile applications to ensure workflow stability and defect-free releases.',
      'Executed functional, regression, and usability testing across key NDIS modules to validate business-critical flows.',
      'Conducted mobile application testing on Android and iOS, covering key user journeys and edge cases.',
      'Implemented Playwright (JavaScript) automation for the NDIS Enterprise platform, covering critical workflows and regression scenarios.',
      'Ensured system reliability and consistent user experience across web and mobile platforms.',
    ],
  },
  {
    role: 'Software Quality Assurance Intern',
    company: 'KDYS Lab',
    period: 'Sep 2025 – Nov 2025',
    location: 'Karachi, Pakistan',
    points: [
      'Performed manual functional and UI testing for the Shifara healthcare web platform to validate core workflows.',
      'Conducted manual testing for the RecCiaga platform, ensuring feature accuracy and workflow correctness.',
      'Logged and tracked defects while collaborating with developers during Agile sprints.',
      'Assisted in regression testing to maintain quality across releases.',
    ],
  },
] as const

export const skills = {
  backend: ['Playwright', 'Selenium (C#)', 'NUnit', 'JavaScript', 'C#'],
  frontend: ['Postman', 'REST APIs', 'ClickUp', 'Agile/Scrum', 'Test Case Design', 'Defect Lifecycle'],
  languages: ['English (Professional)', 'Urdu (Native)'],
} as const

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tech: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  isDummy?: boolean
}

export const projects: Project[] = [
  {
    id: 'ndisync-qa',
    title: 'NDISync — QA & Automation',
    description: `End-to-end testing for NDISync (ndisync.ai), the AI-powered NDIS management platform. Manual functional, regression, and usability testing; Playwright (JavaScript) automation for critical workflows. Android & iOS testing.`,
    longDescription: `## Overview
QA and test automation for [NDISync](https://ndisync.ai/) — AI-powered NDIS management software (care, workforce, finance, coordination) at KDYS Lab.

## My Role
- Manual testing for NDISync web and mobile applications to ensure workflow stability and defect-free releases.
- Functional, regression, and usability testing across key modules.
- Mobile application testing on Android and iOS.
- Playwright (JavaScript) automation for critical workflows and regression scenarios.
- Defect tracking and collaboration with developers in Agile sprints.

## Tools
Playwright, ClickUp, Postman, Android & iOS testing.`,
    tech: ['Playwright', 'JavaScript', 'ClickUp', 'Postman', 'Agile'],
    image: ndisyncImg,
    liveUrl: 'https://ndisync.ai/',
    isDummy: false,
  },
  {
    id: 'shifara-qa',
    title: 'Shifara Healthcare — QA Testing',
    description: `Manual functional and UI testing for the Shifara healthcare web platform. Validated core workflows, logged defects, and supported regression testing during Agile sprints.`,
    longDescription: `## Overview
Quality assurance for the Shifara healthcare web platform at KDYS Lab (internship).

## My Role
- Manual functional and UI testing to validate core workflows.
- Defect logging and tracking; collaboration with developers during Agile sprints.
- Regression testing to maintain quality across releases.

## Tools
ClickUp, Postman, Android & iOS testing.`,
    tech: ['Manual Testing', 'ClickUp', 'Postman', 'Agile/Scrum'],
    image: shifaraImg,
    liveUrl: 'https://shifara.com/',
    isDummy: false,
  },
  {
    id: 'recciaga-qa',
    title: 'RecCiaga — QA Testing',
    description: `Manual testing for the RecCiaga platform. Ensured feature accuracy and workflow correctness; defect tracking and regression testing.`,
    longDescription: `## Overview
Quality assurance for the RecCiaga platform at KDYS Lab (internship).

## My Role
- Manual testing to ensure feature accuracy and workflow correctness.
- Defect logging and tracking; regression testing across releases.

## Tools
ClickUp, Postman, Android & iOS testing.`,
    tech: ['Manual Testing', 'ClickUp', 'Postman', 'Regression'],
    image: recciagaImg,
    liveUrl: 'https://recciaga.com/',
    isDummy: false,
  },
]
