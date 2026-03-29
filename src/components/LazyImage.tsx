import { useState, useRef, useEffect } from 'react'

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  /** Shown when the image fails to load (e.g. 404). Can be a letter or short label. */
  fallbackLabel?: string
}

export function LazyImage({ src, alt, className = '', fallbackLabel, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { rootMargin: '100px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-slate-800">
      {!loaded && !error && (
        <div
          className="absolute inset-0 animate-pulse bg-slate-700/50"
          aria-hidden
        />
      )}
      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900"
          aria-hidden
        >
          {fallbackLabel ? (
            <span className="text-4xl font-bold text-white/30 sm:text-5xl">{fallbackLabel}</span>
          ) : (
            <span className="text-sm text-white/40">No image</span>
          )}
        </div>
      )}
      {inView && !error && (
        <img
          {...props}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}
    </div>
  )
}
