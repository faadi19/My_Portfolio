import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SECTION_CLASS } from '../config/sections'

type SectionProps = {
  id?: string
  children: React.ReactNode
  /** Additional or override classes. Default section padding/border applied when not overridden. */
  className?: string
  as?: 'section' | 'div'
  delay?: number
}

export function Section({ id, children, className = '', as: Tag = 'section', delay = 0 }: SectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const resolvedClass = className.trim() ? `${SECTION_CLASS} ${className}` : SECTION_CLASS

  return (
    <Tag id={id} ref={ref} className={resolvedClass}>
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: delay * 0.1, ease: [0.22, 0.61, 0.36, 1] },
          },
        }}
        className="mx-auto max-w-5xl"
      >
        {children}
      </motion.div>
    </Tag>
  )
}
