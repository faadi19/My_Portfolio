import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SceneCard } from './SceneCard'
import { useAccentHex } from '../context/ThemeContext'

function Dodecahedron({ accent }: { accent: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.12
      ref.current.rotation.y = state.clock.elapsedTime * 0.18
    }
  })
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial
        color={accent}
        wireframe
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function Scene(hex: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={1} />
      <Dodecahedron accent={hex.accent} />
    </>
  )
}

export function AboutScene({ className = '' }: { className?: string }) {
  const hex = useAccentHex()
  return (
    <SceneCard className={className} height={160}>
      <Canvas camera={{ position: [0, 0, 1.8], fov: 42 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
        <Scene accent={hex.accent} />
      </Canvas>
    </SceneCard>
  )
}
