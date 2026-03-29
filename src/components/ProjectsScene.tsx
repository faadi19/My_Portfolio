import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SceneCard } from './SceneCard'
import { useAccentHex } from '../context/ThemeContext'

/** Floating layered cards suggesting multiple projects. */
function ProjectLayers({
  accent,
  accentLight,
  accentMuted,
}: {
  accent: string
  accentLight: string
  accentMuted: string
}) {
  const g = useRef<THREE.Group>(null)
  const card1 = useRef<THREE.Mesh>(null)
  const card2 = useRef<THREE.Mesh>(null)
  const card3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (g.current) g.current.rotation.y = t * 0.08
    if (card1.current) card1.current.position.y = Math.sin(t * 0.4) * 0.04
    if (card2.current) card2.current.position.y = Math.sin(t * 0.4 + 0.7) * 0.04
    if (card3.current) card3.current.position.y = Math.sin(t * 0.4 + 1.4) * 0.04
  })

  return (
    <group ref={g} scale={1.1}>
      {/* Back card */}
      <mesh ref={card1} position={[0, 0.12, -0.08]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[0.7, 0.45, 0.03]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Middle card */}
      <mesh ref={card2} position={[0, 0, 0]} rotation={[-0.02, 0, 0]}>
        <boxGeometry args={[0.78, 0.5, 0.03]} />
        <meshBasicMaterial color={accentLight} wireframe transparent opacity={0.75} />
      </mesh>
      {/* Front card */}
      <mesh ref={card3} position={[0, -0.1, 0.06]} rotation={[-0.06, 0, 0]}>
        <boxGeometry args={[0.72, 0.44, 0.03]} />
        <meshBasicMaterial color={accentMuted} wireframe transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

function Scene(hex: { accent: string; accentLight: string; accentMuted: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={0.8} />
      <ProjectLayers {...hex} />
    </>
  )
}

export function ProjectsScene({ className = '' }: { className?: string }) {
  const hex = useAccentHex()
  return (
    <SceneCard className={className} height={140}>
      <Canvas camera={{ position: [0, 0.15, 1.2], fov: 38 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
        <Scene accent={hex.accent} accentLight={hex.accentLight} accentMuted={hex.accentMuted} />
      </Canvas>
    </SceneCard>
  )
}
