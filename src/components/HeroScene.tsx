import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAccentHex } from '../context/ThemeContext'

type AccentColors = { accent: string; accentLight: string; accentMuted: string }

/* ----- Particles: denser, two-layer, with soft glow ----- */
function ParticleField({ accentLight }: AccentColors) {
  const count = 3200
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 55
      pos[i * 3 + 1] = (Math.random() - 0.5) * 55
      pos[i * 3 + 2] = (Math.random() - 0.5) * 55
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime * 0.35
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] += Math.sin(t + i * 0.01) * 0.005
      pos[i3 + 1] += Math.cos(t * 0.7 + i * 0.02) * 0.005
      if (pos[i3 + 1] > 28) pos[i3 + 1] = -28
      if (pos[i3 + 1] < -28) pos[i3 + 1] = 28
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color={accentLight}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ----- Glow sphere behind centerpiece ----- */
function GlowSphere({ accent }: AccentColors) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1)
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <sphereGeometry args={[2.4, 32, 32]} />
      <meshBasicMaterial color={accent} transparent opacity={0.08} depthWrite={false} />
    </mesh>
  )
}

/* ----- Standout: wireframe torus knot (center) ----- */
function WireframeTorusKnot({ accent }: AccentColors) {
  const ref = useRef<THREE.LineSegments>(null)
  const geometry = useMemo(() => {
    const torus = new THREE.TorusKnotGeometry(1.4, 0.35, 120, 16)
    return new THREE.WireframeGeometry(torus)
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.14
    ref.current.rotation.y = t * 0.2
    ref.current.rotation.z = t * 0.06
  })

  return (
    <lineSegments ref={ref} geometry={geometry} position={[0, 0, -6]}>
      <lineBasicMaterial color={accent} transparent opacity={0.95} />
    </lineSegments>
  )
}

/* ----- Wireframe Icosahedron (floating) ----- */
function WireframeIcosahedron({ accentLight }: AccentColors) {
  const ref = useRef<THREE.LineSegments>(null)
  const geometry = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.2, 0)
    return new THREE.EdgesGeometry(ico)
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.08
    ref.current.rotation.y = t * 0.12
    ref.current.position.x = -3.2
    ref.current.position.y = 0.8 + Math.sin(t * 0.4) * 0.25
    ref.current.position.z = -5.5
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color={accentLight} transparent opacity={0.55} />
    </lineSegments>
  )
}

/* ----- Secondary: wireframe box (floating to the side) ----- */
function WireframeBox({ accentMuted }: AccentColors) {
  const ref = useRef<THREE.LineSegments>(null)
  const geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(1.8, 1.8, 1.8)
    return new THREE.EdgesGeometry(box)
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.1
    ref.current.rotation.y = t * 0.16
    ref.current.position.y = Math.sin(t * 0.5) * 0.35
  })

  return (
    <lineSegments ref={ref} geometry={geometry} position={[3.5, 0.5, -5]}>
      <lineBasicMaterial color={accentMuted} transparent opacity={0.65} />
    </lineSegments>
  )
}

/* ----- Glowing rings ----- */
function GlowRing({
  radius,
  tube,
  color,
  position,
  speed,
}: {
  radius: number
  tube: number
  color: string
  position: [number, number, number]
  speed: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.rotation.x = t * speed[0]
      ref.current.rotation.y = t * speed[1]
      ref.current.rotation.z = t * speed[2]
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, tube, 32, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

/* ----- Camera: slow orbit for cinema feel ----- */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.08
    state.camera.position.x = Math.sin(t) * 0.8
    state.camera.position.y = Math.cos(t * 0.7) * 0.5
    state.camera.lookAt(0, 0, -6)
    state.camera.updateProjectionMatrix()
  })
  return null
}

/* ----- Point light for the center object ----- */
function SceneLights({ accent, accentLight, accentMuted }: AccentColors) {
  return (
    <>
      <ambientLight intensity={0.28} />
      <pointLight position={[0, 0, 2]} intensity={1.6} color={accentLight} distance={20} />
      <pointLight position={[4, 2, 0]} intensity={0.9} color={accentMuted} distance={15} />
      <pointLight position={[-3, 1, 0]} intensity={0.5} color={accent} distance={12} />
    </>
  )
}

function Scene(hex: AccentColors) {
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 14, 38]} />
      <SceneLights {...hex} />
      <CameraRig />
      <ParticleField {...hex} />
      <GlowSphere {...hex} />
      <WireframeTorusKnot {...hex} />
      <WireframeIcosahedron {...hex} />
      <WireframeBox {...hex} />
      <GlowRing radius={3.4} tube={0.045} color={hex.accent} position={[0, 0, -8]} speed={[0.15, 0.22, 0.08]} />
      <GlowRing radius={2.4} tube={0.028} color={hex.accentMuted} position={[2, -0.8, -7]} speed={[0.2, 0.12, 0.1]} />
      <GlowRing radius={1.8} tube={0.022} color={hex.accentLight} position={[-2.5, 0.5, -6]} speed={[-0.1, 0.18, 0.15]} />
      <GlowRing radius={4} tube={0.03} color={hex.accent} position={[0, 0, -10]} speed={[0.08, 0.15, 0.05]} />
    </>
  )
}

export function HeroScene() {
  const hex = useAccentHex()
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 52 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene {...hex} />
      </Canvas>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/80 via-surface-950/50 to-surface-950" />
      {/* Video-style animated overlay: moving gradient + scan line */}
      <div className="hero-video-overlay absolute inset-0 z-[1]" aria-hidden />
    </div>
  )
}
