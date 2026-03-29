import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/portfolio'
import { HeroScene } from './HeroScene'
import { HeroVideo } from './HeroVideo'
import { OpenToWorkBadge } from './OpenToWorkBadge'

const TYPE_DELAY_MS = 120
const ERASE_DELAY_MS = 80
const PAUSE_AFTER_TYPE_MS = 1500
const PAUSE_AFTER_ERASE_MS = 800

/** Typewriter: types full name, pauses, erases, pauses, repeats. */
function TypewriterName() {
  const name = profile.name
  const [visibleLength, setVisibleLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0)

  useEffect(() => {
    if (!isDeleting && visibleLength === name.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE_MS)
      return () => clearTimeout(timeoutRef.current)
    }
    if (isDeleting && visibleLength === 0) {
      timeoutRef.current = setTimeout(() => setIsDeleting(false), PAUSE_AFTER_ERASE_MS)
      return () => clearTimeout(timeoutRef.current)
    }
    const delay = isDeleting ? ERASE_DELAY_MS : TYPE_DELAY_MS
    timeoutRef.current = setTimeout(
      () => setVisibleLength((n) => (isDeleting ? n - 1 : n + 1)),
      delay
    )
    return () => clearTimeout(timeoutRef.current)
  }, [visibleLength, isDeleting, name.length])

  return (
    <h1 className="hero-name mt-4 min-h-[1.2em] text-3xl font-bold tracking-tight text-theme-heading sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
      <span style={{ textShadow: '0 0 40px rgba(var(--color-accent-rgb), 0.15)' }}>
        {name.slice(0, visibleLength)}
      </span>
      <span
        className="hero-cursor-blink inline-block w-0.5 align-middle bg-accent sm:w-1"
        style={{ height: '0.9em', marginLeft: '2px' }}
        aria-hidden
      />
    </h1>
  )
}

export function Hero() {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })
  const [desktop, setDesktop] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, 80])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    setDesktop(mq.matches)
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setSpotlight({ x, y })
    }
    if (mq.matches) window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section className="relative min-h-[85vh] overflow-hidden border-b border-theme section-safe-x py-16 pt-[max(4rem,env(safe-area-inset-top))] sm:min-h-[90vh] sm:px-8 sm:py-28">
      <HeroVideo />
      <HeroScene />
      {desktop && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 30vmax at ${spotlight.x}% ${spotlight.y}%, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 50%)`,
          }}
        />
      )}
      <motion.div
        className="relative z-10 mx-auto grid max-w-6xl xl:max-w-7xl xl:grid-cols-[1fr,minmax(0,1fr)] xl:items-center"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Left: content, no box */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <motion.p
              className="font-mono text-xs font-semibold uppercase tracking-wider text-accent sm:text-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {profile.role}
            </motion.p>
            <OpenToWorkBadge />
          </div>
          <TypewriterName />
          <motion.p
            className="mt-3 text-base leading-relaxed text-theme-muted sm:mt-4 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {profile.tagline}
          </motion.p>
          <motion.p
            className="mt-2 text-sm text-theme-muted sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {profile.location}
          </motion.p>
          <motion.div
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <motion.a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95"
              style={{ boxShadow: '0 10px 40px -10px rgba(var(--color-accent-rgb), 0.4)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Hire me / Get in touch
            </motion.a>
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-theme bg-theme-subtle/80 px-6 py-3 text-sm font-medium text-theme-heading backdrop-blur transition-colors hover:opacity-90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>
        </div>
        {/* Right: empty so 3D/graphics show through */}
        <div className="hidden xl:block" aria-hidden />
      </motion.div>
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 rounded-lg py-3 text-theme-muted transition-colors hover:text-accent focus-ring focus-visible:text-accent sm:bottom-8"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  )
}
