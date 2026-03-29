import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAccentHex } from '../context/ThemeContext'

const RADIUS = 1.5
const SEGMENTS = 32

function createGlobeLines() {
  const segments: number[] = []

  function addCircle(getPoint: (t: number) => [number, number, number], steps: number) {
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps
      const t1 = (i + 1) / steps
      const [x0, y0, z0] = getPoint(t0)
      const [x1, y1, z1] = getPoint(t1)
      segments.push(x0, y0, z0, x1, y1, z1)
    }
  }

  // Parallels (latitude circles)
  for (let lat = -80; lat <= 80; lat += 20) {
    const phi = (lat * Math.PI) / 180
    const r = RADIUS * Math.cos(phi)
    const y = RADIUS * Math.sin(phi)
    addCircle((t) => {
      const theta = t * Math.PI * 2
      return [r * Math.cos(theta), y, r * Math.sin(theta)]
    }, SEGMENTS)
  }
  // Meridians (longitude)
  for (let lon = 0; lon < 360; lon += 15) {
    const theta = (lon * Math.PI) / 180
    addCircle((t) => {
      const phi = t * Math.PI
      return [
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.cos(phi),
        RADIUS * Math.sin(phi) * Math.sin(theta),
      ]
    }, SEGMENTS)
  }
  return new Float32Array(segments)
}

function GlobeLines({ accent }: { accent: string }) {
  const ref = useRef<THREE.LineSegments>(null)
  const positions = useMemo(createGlobeLines, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color={accent} transparent opacity={0.85} />
    </lineSegments>
  )
}

function GlobeSphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[RADIUS * 0.98, 32, 32]} />
      <meshBasicMaterial
        color="#020617"
        transparent
        opacity={0.4}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function Scene(hex: { accent: string; accentLight: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1} color={hex.accentLight} />
      <GlobeSphere />
      <GlobeLines accent={hex.accent} />
    </>
  )
}

type GlobeSceneProps = {
  className?: string
}

export function GlobeScene({ className = '' }: GlobeSceneProps) {
  const hex = useAccentHex()
  return (
    <div className={`overflow-hidden rounded-2xl border border-theme bg-surface-900/80 ${className}`} style={{ minHeight: 280 }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Scene accent={hex.accent} accentLight={hex.accentLight} />
      </Canvas>
    </div>
  )
}
