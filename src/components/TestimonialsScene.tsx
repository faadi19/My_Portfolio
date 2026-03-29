import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SceneCard } from './SceneCard'
import { useAccentHex } from '../context/ThemeContext'

function QuoteRings({
  accent,
  accentLight,
  accentMuted,
}: {
  accent: string
  accentLight: string
  accentMuted: string
}) {
  const r1 = useRef<THREE.Mesh>(null)
  const r2 = useRef<THREE.Mesh>(null)
  const r3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (r1.current) {
      r1.current.rotation.x = t * 0.1
      r1.current.rotation.y = t * 0.15
    }
    if (r2.current) {
      r2.current.rotation.x = t * 0.12
      r2.current.rotation.z = t * 0.08
    }
    if (r3.current) {
      r3.current.rotation.y = t * 0.18
    }
  })

  return (
    <group scale={1.35}>
      <mesh ref={r1}>
        <torusGeometry args={[0.4, 0.03, 16, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.6} />
      </mesh>
      <mesh ref={r2} position={[0.15, -0.1, -0.1]}>
        <torusGeometry args={[0.28, 0.025, 16, 36]} />
        <meshBasicMaterial color={accentLight} transparent opacity={0.5} />
      </mesh>
      <mesh ref={r3} position={[-0.1, 0.1, -0.15]}>
        <torusGeometry args={[0.2, 0.02, 16, 32]} />
        <meshBasicMaterial color={accentMuted} transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

function Scene(hex: { accent: string; accentLight: string; accentMuted: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 1, 1]} intensity={0.6} />
      <QuoteRings {...hex} />
    </>
  )
}

export function TestimonialsScene({ className = '' }: { className?: string }) {
  const hex = useAccentHex()
  return (
    <SceneCard className={className} height={140}>
      <Canvas camera={{ position: [0, 0, 0.9], fov: 42 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
        <Scene accent={hex.accent} accentLight={hex.accentLight} accentMuted={hex.accentMuted} />
      </Canvas>
    </SceneCard>
  )
}
