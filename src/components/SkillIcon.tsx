import {
  SiNestjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiReact,
  SiAngular,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiFirebase,
  SiSwagger,
  SiRedis,
  SiStripe,
  SiChartdotjs,
  SiNextdotjs,
  SiRedux,
} from 'react-icons/si'
import { IconType } from 'react-icons'

const skillToIcon: Record<string, IconType> = {
  NestJS: SiNestjs,
  TypeScript: SiTypescript,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Express: SiExpress,
  MongoDB: SiMongodb,
  SQL: SiPostgresql,
  PostgreSQL: SiPostgresql,
  'REST APIs': SiSwagger,
  WebSocket: SiNodedotjs,
  'C++': SiCplusplus,
  React: SiReact,
  Angular: SiAngular,
  'Tailwind CSS': SiTailwindcss,
  Tailwind: SiTailwindcss,
  HTML5: SiHtml5,
  CSS: SiCss3,
  JWT: SiSwagger,
  Firebase: SiFirebase,
  Swagger: SiSwagger,
  Redis: SiRedis,
  Stripe: SiStripe,
  'Chart.js': SiChartdotjs,
  'MEAN Stack': SiAngular,
  'Web Sockets': SiNodedotjs,
  WebSockets: SiNodedotjs,
  'Next.js': SiNextdotjs,
  'React.js': SiReact,
  'Redux Toolkit': SiRedux,
}

const defaultColor: Record<string, string> = {
  NestJS: '#e0234e',
  TypeScript: '#3178c6',
  'Node.js': '#339933',
  'Express.js': '#000000',
  Express: '#000000',
  MongoDB: '#47a248',
  PostgreSQL: '#4169e1',
  React: '#61dafb',
  Angular: '#dd0031',
  'Tailwind CSS': '#06b6d4',
  Tailwind: '#06b6d4',
  HTML5: '#e34f26',
  CSS: '#1572b6',
  'C++': '#00599c',
  Firebase: '#ffca28',
  Swagger: '#85ea2d',
  Redis: '#dc382d',
  Stripe: '#635bff',
  'Chart.js': '#ff6384',
  'Next.js': '#000000',
  'React.js': '#61dafb',
  'Redux Toolkit': '#764abc',
}

export function SkillIcon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  const Icon = skillToIcon[name] ?? SiNodedotjs
  const color = defaultColor[name] ?? '#94a3b8'
  return (
    <Icon
      className={className}
      size={size}
      style={{ color }}
      title={name}
    />
  )
}
