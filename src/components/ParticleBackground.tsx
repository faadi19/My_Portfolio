import { useState, useEffect, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'
import { useAccentHex } from '../context/ThemeContext'

/**
 * Heavy, interactive particle.js-style background using tsparticles.
 * Dense particles, links on hover, mouse interactivity, accent-colored.
 */
function getOptions(hex: ReturnType<typeof useAccentHex>): ISourceOptions {
  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: {
        value: 180,
        density: { enable: true, width: 1920, height: 1080 },
      },
      color: { value: [hex.accent, hex.accentLight, hex.accentMuted] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.15, max: 0.5 },
        animation: { enable: true, speed: 0.8, sync: false },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: true,
        distance: 120,
        color: { value: `rgba(${hex.accentRgb.join(',')}, 0.35)` },
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: { min: 0.3, max: 0.8 },
        direction: 'none',
        random: true,
        outModes: { default: 'bounce' },
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: true, mode: ['grab', 'bubble'] },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.6 } },
        bubble: {
          distance: 200,
          size: 4,
          duration: 0.4,
          opacity: 0.5,
          speed: 2,
        },
        push: { quantity: 4 },
      },
    },
  }
}

export function ParticleBackground() {
  const [init, setInit] = useState(false)
  const hex = useAccentHex()
  const memoOptions = useMemo(() => getOptions(hex), [hex.accent, hex.accentLight, hex.accentMuted, hex.accentRgb])

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[0]"
      aria-hidden
    >
      <Particles
        id="tsparticles-heavy"
        options={memoOptions}
        className="h-full w-full"
      />
    </div>
  )
}
