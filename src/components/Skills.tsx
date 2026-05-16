import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'
import { getSectionNumber } from '../config/sections'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { SkillIcon } from './SkillIcon'
import { SkillsScene } from './SkillsScene'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
}

function SkillPill({ name }: { name: string }) {
  return (
    <motion.li
      variants={item}
      whileHover={{ scale: 1.05, y: -4, boxShadow: '0 8px 24px -10px rgba(var(--color-accent-rgb), 0.3)' }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2.5 rounded-xl border border-theme bg-theme-subtle px-4 py-3 transition-colors hover:border-theme hover:bg-theme-hover focus-ring"
    >
      <SkillIcon name={name} size={22} className="shrink-0" />
      <span className="text-sm font-medium text-theme-muted">{name}</span>
    </motion.li>
  )
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader title="Skills & Tools" number={getSectionNumber('skills')} subtitle="Automation, manual testing & quality assurance." />
      <motion.div
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SkillsScene className="w-full max-w-sm" />
      </motion.div>
      <motion.div
        className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div variants={item}>
          <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">Automation & backend</h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {skills.backend.map((name) => (
              <SkillPill key={name} name={name} />
            ))}
          </ul>
        </motion.div>
        <motion.div variants={item}>
          <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">Tools & process</h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {skills.frontend.map((name) => (
              <SkillPill key={name} name={name} />
            ))}
          </ul>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-6 flex flex-wrap items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-xs uppercase tracking-wider text-theme-muted">Languages</span>
        {skills.languages.map((lang) => (
          <span
            key={lang}
            className="inline-flex items-center rounded-lg border border-theme bg-theme-subtle px-3 py-1.5 text-sm text-theme-muted"
          >
            {lang}
          </span>
        ))}
      </motion.div>
    </Section>
  )
}
