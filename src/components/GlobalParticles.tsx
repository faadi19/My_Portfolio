/**
 * Full-page floating particles (same star/pixel style as hero).
 * Fixed layer so they appear across all sections as you scroll.
 */
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useAccentHex } from '../context/ThemeContext'

function TransparentScene() {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = null
  }, [scene])
  return null
}

const COUNT = 2500

function ParticleField({ accentLight }: { accentLight: string }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime * 0.3
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      pos[i3] += Math.sin(t + i * 0.01) * 0.004
      pos[i3 + 1] += Math.cos(t * 0.7 + i * 0.02) * 0.004
      if (pos[i3 + 1] > 22) pos[i3 + 1] = -22
      if (pos[i3 + 1] < -22) pos[i3 + 1] = 22
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={accentLight}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene(hex: { accentLight: string }) {
  return (
    <>
      <TransparentScene />
      <ParticleField accentLight={hex.accentLight} />
    </>
  )
}

export function GlobalParticles() {
  const hex = useAccentHex()
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{ alpha: true, antialias: false, preserveDrawingBuffer: false }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Scene accentLight={hex.accentLight} />
      </Canvas>
    </div>
  )
}
