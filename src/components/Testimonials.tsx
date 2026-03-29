import { motion } from 'framer-motion'
import { TbQuote } from 'react-icons/tb'
import { testimonials } from '../data/testimonials'
import { getSectionNumber } from '../config/sections'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { TiltCard } from './TiltCard'
import { TestimonialsScene } from './TestimonialsScene'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader title="What others say" number={getSectionNumber('testimonials')} subtitle="Feedback from peers and leads." />
      <motion.div
        className="mb-10 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <TestimonialsScene className="w-full max-w-xs" />
      </motion.div>
      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {testimonials.map((t) => (
          <motion.div key={t.id} variants={card}>
            <TiltCard>
              <blockquote className="card relative flex h-full flex-col rounded-2xl border border-theme bg-theme-subtle p-6 backdrop-blur-xl">
                <TbQuote className="absolute right-4 top-4 h-8 w-8 text-accent/20" />
                <p className="relative text-theme-muted">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 border-t border-theme pt-4">
                  <cite className="not-italic">
                    <span className="font-semibold text-theme-heading">{t.author}</span>
                    <span className="text-theme-muted"> · {t.role}</span>
                    {t.context && (
                      <span className="block text-xs text-theme-muted">{t.context}</span>
                    )}
                  </cite>
                </footer>
              </blockquote>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
