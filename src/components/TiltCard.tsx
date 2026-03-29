import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const MAX_TILT = 8

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  /** Disable tilt on small screens or when prefers-reduced-motion */
  disableTilt?: boolean
}

export function TiltCard({ children, className = '', disableTilt: disableProp }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const disableTilt = disableProp ?? prefersReducedMotion

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableTilt || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTransform({
        rotateY: x * MAX_TILT,
        rotateX: -y * MAX_TILT,
      })
    },
    [disableTilt]
  )

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`tilt-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="tilt-3d-inner h-full"
        style={{
          rotateX: disableTilt ? 0 : transform.rotateX,
          rotateY: disableTilt ? 0 : transform.rotateY,
          transformStyle: disableTilt ? undefined : 'preserve-3d',
        }}
        transition={{ type: 'tween', duration: 0.15 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
