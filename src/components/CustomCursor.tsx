import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only enable on desktop
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    if (!mq.matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 hidden z-[9999] h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.8)] lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '12px',
          translateY: '12px',
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 hidden z-[9998] h-8 w-8 rounded-full border border-accent/60 backdrop-blur-sm lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(var(--color-accent-rgb), 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(var(--color-accent-rgb), 0.8)' : 'rgba(var(--color-accent-rgb), 0.4)',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
