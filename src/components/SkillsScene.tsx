import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SceneCard } from './SceneCard'
import { useAccentHex } from '../context/ThemeContext'

function FloatingShapes({
  accent,
  accentLight,
  accentMuted,
}: {
  accent: string
  accentLight: string
  accentMuted: string
}) {
  const boxRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const icoRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (boxRef.current) {
      boxRef.current.rotation.x = t * 0.1
      boxRef.current.rotation.y = t * 0.15
      boxRef.current.position.y = Math.sin(t * 0.5) * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.12
      ringRef.current.rotation.z = t * 0.08
    }
    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.2
      icoRef.current.position.x = 0.6 + Math.cos(t * 0.3) * 0.1
    }
  })

  return (
    <group scale={1.15}>
      <mesh ref={boxRef} position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringRef} position={[0.5, -0.1, 0]}>
        <torusGeometry args={[0.35, 0.05, 16, 32]} />
        <meshBasicMaterial color={accentLight} transparent opacity={0.75} />
      </mesh>
      <mesh ref={icoRef} position={[0.6, 0.25, -0.2]}>
        <icosahedronGeometry args={[0.25, 0]} />
        <meshBasicMaterial color={accentMuted} wireframe transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function Scene(hex: { accent: string; accentLight: string; accentMuted: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 1, 1]} intensity={0.8} />
      <FloatingShapes {...hex} />
    </>
  )
}

export function SkillsScene({ className = '' }: { className?: string }) {
  const hex = useAccentHex()
  return (
    <SceneCard className={className} height={140}>
      <Canvas camera={{ position: [0, 0.05, 0.85], fov: 32 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
        <Scene accent={hex.accent} accentLight={hex.accentLight} accentMuted={hex.accentMuted} />
      </Canvas>
    </SceneCard>
  )
}
