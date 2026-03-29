import { motion } from 'framer-motion'
import { experience } from '../data/portfolio'
import { getSectionNumber } from '../config/sections'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { TiltCard } from './TiltCard'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader title="Experience" number={getSectionNumber('experience')} subtitle="Where I've built and shipped." sticky />
      <motion.div
        className="relative mt-12 pl-6 sm:pl-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Vertical timeline line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-theme to-theme"
          aria-hidden
        />
        {experience.map((job) => (
          <motion.div
            key={`${job.company}-${job.role}`}
            variants={item}
            className="relative pb-12 last:pb-0"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-0 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-surface-950"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
            <div className="pl-4 sm:pl-6">
              <TiltCard>
                <div
                  className="card-glow group h-full"
                  style={{ minHeight: '1px' }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-theme-heading">{job.role}</h3>
                      <p className="text-accent">{job.company}</p>
                    </div>
                    <div className="text-right text-sm text-theme-muted">
                      <p>{job.period}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2 text-theme-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
