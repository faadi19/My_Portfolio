import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="scroll-progress fixed left-0 right-0 top-0 z-[100] h-0.5 bg-theme-subtle"
      style={{ backgroundColor: 'var(--color-bg-subtle)' }}
      aria-hidden
    >
      <motion.div
        className="h-full bg-gradient-to-r from-accent to-accent-light"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </div>
  )
}
