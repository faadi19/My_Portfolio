import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

export function EasterEgg() {
  const [show, setShow] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === KONAMI[index]) {
        const next = index + 1
        if (next === KONAMI.length) {
          setShow(true)
          setIndex(0)
        } else {
          setIndex(next)
        }
      } else {
        setIndex(0)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index])

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-accent/30 bg-surface-900/95 px-4 py-3 text-sm text-theme-heading shadow-xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25 }}
        >
          🚀 You found the Konami code! Have a great day.
        </motion.div>
      )}
    </AnimatePresence>
  )
}
