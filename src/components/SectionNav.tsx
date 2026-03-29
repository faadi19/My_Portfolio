import { useState, useEffect } from 'react'
import { SECTIONS } from '../config/sections'

export function SectionNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id)
            break
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      aria-label="Page sections"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-2 rounded-full focus-ring"
          aria-current={active === s.id ? 'true' : undefined}
        >
          <span
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              active === s.id
                ? 'h-2.5 w-2.5 bg-accent ring-2 ring-accent/30'
                : 'bg-theme-muted opacity-60 group-hover:opacity-100 group-hover:bg-accent/70'
            }`}
          />
          <span className="w-0 overflow-hidden text-xs font-mono text-theme-muted opacity-0 transition-all duration-200 group-hover:w-6 group-hover:opacity-100">
            {s.number}
          </span>
        </a>
      ))}
    </nav>
  )
}
