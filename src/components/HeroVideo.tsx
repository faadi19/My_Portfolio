/**
 * Optional full-bleed hero background video.
 * Set VITE_HERO_VIDEO_URL in .env to an MP4 URL (e.g. from Pexels, Coverr).
 * Muted, looped, plays automatically; no audio.
 */
import { useRef, useEffect } from 'react'
import { site } from '../config/site'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  if (!site.heroVideoUrl) return null

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        src={site.heroVideoUrl}
        muted
        loop
        playsInline
        className="h-full w-full object-cover opacity-30"
        aria-hidden
      />
      <div className="absolute inset-0 bg-surface-950/70" />
    </div>
  )
}
