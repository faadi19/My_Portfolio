import { motion } from 'framer-motion'
import { about, education } from '../data/portfolio'
import { getSectionNumber } from '../config/sections'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { AboutScene } from './AboutScene'

export function About() {
  return (
    <Section id="about">
      <SectionHeader title="About" number={getSectionNumber('about')} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr,200px] lg:items-start">
        <div>
          <p className="max-w-3xl leading-relaxed text-theme-muted">
            {about.bio}
          </p>
          <motion.div
            className="card-glow mt-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-theme-heading">Education</h3>
              {education.graduated && (
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                  Just graduated
                </span>
              )}
            </div>
            <p className="mt-1 font-medium text-theme-heading">{education.school}</p>
            <p className="text-theme-muted">{education.location}</p>
            <p className="mt-2 text-theme-muted">
              {education.degree} · {education.gpa} · {education.graduated ? 'Graduated' : 'Expected'} {education.graduation}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {education.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-theme bg-theme-subtle px-3 py-1 text-xs text-theme-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <AboutScene />
        </motion.div>
      </div>
    </Section>
  )
}
