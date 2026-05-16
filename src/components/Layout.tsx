import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Header } from './Header'
import { ScrollProgress } from './ScrollProgress'
import { BackToTop } from './BackToTop'
import { GlobalParticles } from './GlobalParticles'
import { ParticleBackground } from './ParticleBackground'
import { SectionNav } from './SectionNav'
import { EasterEgg } from './EasterEgg'
import { CustomCursor } from './CustomCursor'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      {isHome && <SectionNav />}
      {/* Star-like particles: full page, same style as hero */}
      <GlobalParticles />
      {/* Heavy interactive tsparticles (links, hover, click) */}
      <ParticleBackground />
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="orb orb-1 absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="orb orb-2 absolute -right-40 top-2/3 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute left-1/2 top-3/4 h-[300px] w-[300px] -translate-x-1/2">
          <div className="orb orb-3 h-full w-full rounded-full bg-accent/10 blur-[80px]" />
        </div>
      </div>
      <Header />
      <main id="main" className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <BackToTop />
      <EasterEgg />
    </div>
  )
}
