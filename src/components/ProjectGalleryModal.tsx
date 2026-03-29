import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiExternalLink } from 'react-icons/hi'
import type { Project } from '../data/portfolio'
import { getGalleryImages } from '../data/projectGallery'

type Props = {
  project: Project | null
  onClose: () => void
}

function getMainImageSrc(proj: Project): string {
  const raw = typeof proj.image === 'string' ? proj.image : (proj.image as { default?: string })?.default ?? ''
  if (!raw || raw.startsWith('http') || raw.startsWith('data:')) return raw
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${raw.startsWith('/') ? raw : `/${raw}`}`
}

export function ProjectGalleryModal({ project, onClose }: Props) {
  const images = project ? getGalleryImages(project.id) : []
  const mainSrc = project ? getMainImageSrc(project) : ''
  const allUrls = mainSrc && !images.includes(mainSrc) ? [mainSrc, ...images] : images.length ? images : mainSrc ? [mainSrc] : []

  useEffect(() => {
    if (!project) return
    const onEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
        <motion.div
          className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-theme bg-surface-950 shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-theme px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-theme-heading sm:text-xl">
                {project.title}
              </h2>
              <p className="mt-0.5 truncate text-sm text-theme-muted">
                {project.description.slice(0, 80)}…
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-theme bg-theme-subtle px-3 py-2 text-sm font-medium text-accent transition-colors hover:border-accent/30 hover:bg-theme-hover"
                >
                  <HiExternalLink className="h-4 w-4" />
                  Live site
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-theme bg-theme-subtle text-theme-muted transition-colors hover:border-theme hover:bg-theme-hover hover:text-theme-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close gallery"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {allUrls.length === 0 ? (
              <p className="py-12 text-center text-theme-muted">
                No images in this project folder yet. Add PNG/JPG/SVG to{' '}
                <code className="rounded bg-theme-subtle px-1.5 py-0.5 text-xs">
                  src/assets/project-images/
                </code>
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {allUrls.map((src, i) => (
                  <motion.div
                    key={src}
                    className="group relative overflow-hidden rounded-xl border border-theme bg-surface-900"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="aspect-video w-full bg-surface-800">
                      <img
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
