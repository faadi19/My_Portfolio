import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'

const SHOW_AFTER = 400

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function update() {
      setVisible(window.scrollY > SHOW_AFTER)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/#"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-xl border bg-surface-900/95 text-theme-muted shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-accent/40 hover:bg-accent/15 hover:text-accent-light focus-ring focus-visible:text-accent-light sm:bottom-6 sm:right-6"
          style={{
            borderColor: 'var(--color-border)',
            boxShadow: '0 10px 30px -8px rgba(0,0,0,0.35)',
            marginBottom: 'env(safe-area-inset-bottom, 0)',
            marginRight: 'env(safe-area-inset-right, 0)',
            transformStyle: 'preserve-3d',
          }}
          whileHover={{
            scale: 1.08,
            y: -2,
            boxShadow: '0 16px 40px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(var(--color-accent-rgb), 0.2)',
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95, y: 0 }}
        >
          <HiArrowUp className="h-5 w-5" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
