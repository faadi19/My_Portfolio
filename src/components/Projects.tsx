import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects, type Project } from '../data/portfolio'
import { getSectionNumber } from '../config/sections'
import { ProjectGalleryModal } from './ProjectGalleryModal'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { SkillIcon } from './SkillIcon'
import { LazyImage } from './LazyImage'
import { TiltCard } from './TiltCard'
import { ProjectsScene } from './ProjectsScene'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Resolve project image URL – handle Vite import (string or { default }) and base path. */
function getProjectImageSrc(projImage: string | { default?: string }): string {
  const raw = typeof projImage === 'string' ? projImage : (projImage?.default ?? '')
  if (!raw) return ''
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) return raw
  return `${baseUrl}${raw.startsWith('/') ? raw : `/${raw}`}`
}

/** Themed placeholder when no real screenshot – gradient + initial so project section looks consistent. */
function ProjectImagePlaceholder({ title, featured }: { title: string; featured: boolean }) {
  const initial = title.charAt(0)
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-950/80 via-surface-900 to-amber-900/40"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <span
        className={`relative font-bold text-amber-500/40 ${featured ? 'text-7xl sm:text-8xl' : 'text-6xl'}`}
        style={{ fontFamily: 'var(--font-mono), monospace' }}
      >
        {initial}
      </span>
    </div>
  )
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <Section id="projects">
      <SectionHeader
        title="Projects"
        number={getSectionNumber('projects')}
        subtitle="QA & testing work on enterprise and healthcare platforms."
      />
      <motion.div
        className="mb-10 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <ProjectsScene className="w-full max-w-xs" />
      </motion.div>
      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {projects.map((proj, index) => {
          const isFeatured = index === 0
          const isBentoSecondRow = index === 1 || index === 2
          return (
          <motion.article
            key={proj.id}
            variants={card}
            className={`group relative ${isFeatured ? 'sm:col-span-2' : ''} ${isBentoSecondRow ? 'sm:col-span-1' : ''}`}
          >
            <TiltCard disableTilt>
              <motion.div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(proj)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(proj)}
                className={`block cursor-pointer overflow-hidden rounded-2xl border bg-theme-subtle backdrop-blur-xl transition-all duration-300 hover:bg-theme-hover ${
                  isFeatured
                    ? 'border-accent/20 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_32px_-8px_rgba(0,0,0,0.4)] hover:border-accent/35 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_16px_48px_-12px_rgba(0,0,0,0.5)] sm:flex sm:flex-row'
                    : 'border-theme hover:border-accent/25 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]'
                }`}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={`relative w-full overflow-hidden bg-surface-900 ${isFeatured ? 'aspect-video sm:aspect-auto sm:min-h-[280px] sm:w-2/5' : ''} rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none`}>
                  <div className={`${isFeatured ? 'aspect-video sm:h-full sm:min-h-[280px] sm:w-full' : 'aspect-video'} min-h-[180px]`}>
                    {proj.image.includes('placehold.co') ? (
                      <ProjectImagePlaceholder title={proj.title} featured={isFeatured} />
                    ) : (
                      <LazyImage
                        src={getProjectImageSrc(proj.image as string)}
                        alt={`${proj.title} preview`}
                        fallbackLabel={proj.title.charAt(0)}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="mb-4 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      Click to view gallery
                    </span>
                  </div>
                  {proj.isDummy && (
                    <span className="absolute right-3 top-3 rounded-lg bg-amber-500/90 px-2 py-1 text-xs font-medium text-black">
                      Demo
                    </span>
                  )}
                </div>
                <div className={`p-5 sm:p-6 ${isFeatured ? 'sm:flex sm:flex-1 sm:flex-col sm:justify-center' : ''}`}>
                  {isFeatured && (
                    <span className="mb-2 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                      Featured
                    </span>
                  )}
                  <h3 className={`font-semibold text-theme-heading transition group-hover:text-accent-light ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                    {proj.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed text-theme-muted ${isFeatured ? 'line-clamp-3 sm:line-clamp-none sm:leading-relaxed' : 'line-clamp-2'}`}>
                    {proj.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap items-center gap-2">
                    {proj.tech.map((t) => (
                      <li
                        key={t}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                          isFeatured
                            ? 'border-white/10 bg-white/5 text-theme-muted'
                            : 'rounded-lg border-theme bg-theme-subtle px-2.5 text-theme-muted'
                        }`}
                      >
                        <SkillIcon name={t} size={isFeatured ? 14 : 14} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="relative z-10 mt-4 flex flex-wrap items-center gap-3">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 text-sm font-medium text-accent link-underline focus-ring cursor-pointer touch-manipulation"
                        style={{ touchAction: 'manipulation' }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(proj.liveUrl!, '_blank', 'noopener,noreferrer')
                        }}
                      >
                        Live →
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 text-sm font-medium text-accent link-underline focus-ring cursor-pointer touch-manipulation"
                        style={{ touchAction: 'manipulation' }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(proj.repoUrl!, '_blank', 'noopener,noreferrer')
                        }}
                      >
                        Repo →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.article>
          )
        })}
      </motion.div>

      <ProjectGalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  )
}
