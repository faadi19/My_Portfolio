import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type SectionHeaderProps = {
  title: string
  subtitle?: React.ReactNode
  /** Optional section number for premium feel (e.g. "01") */
  number?: string
  /** Stick to top when scrolling through section */
  sticky?: boolean
}

export function SectionHeader({ title, subtitle, number, sticky }: SectionHeaderProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      className={`section-header-wrap relative pl-4 sm:pl-5 ${sticky ? 'sticky top-0 z-10 -mx-4 mb-2 bg-surface-950/85 section-safe-x py-3 backdrop-blur-md sm:-mx-8 sm:px-8' : ''}`}
    >
      {/* Animated 3D-style accent bar (left) */}
      <motion.div
        className="absolute left-0 top-0 h-full min-h-[2.5rem] w-0.5 rounded-full bg-gradient-to-b from-accent to-accent-light"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        className="flex flex-wrap items-baseline gap-3"
        initial={{ opacity: 0, y: 24, rotateX: 10 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{
          duration: 0.65,
          ease: [0.22, 0.61, 0.36, 1],
        }}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {number && (
          <motion.span
            className="font-mono text-sm font-medium text-accent/80 tabular-nums"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {number}
          </motion.span>
        )}
        <h2 className="section-heading section-heading-3d">{title}</h2>
      </motion.div>
      {/* Animated gradient underline */}
      <motion.div
        className="section-header-underline mt-1 h-0.5 w-24 rounded-full bg-gradient-to-r from-accent/80 to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      />
      {subtitle && (
        <motion.div
          className="mt-2 text-theme-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  )
}
