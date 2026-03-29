import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiDownload } from 'react-icons/hi'
import { profile } from '../data/portfolio'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b bg-surface-950/80 backdrop-blur-xl transition-all duration-300 safe-area-top"
      style={{
        borderColor: scrolled ? 'var(--color-border-strong)' : 'var(--color-border)',
        boxShadow: scrolled ? '0 4px 24px -4px rgba(0,0,0,0.12)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:gap-6 sm:px-8 sm:py-5 section-safe-x">
        <Link to="/" className="shrink-0 font-mono text-lg font-semibold text-theme-heading transition-colors">
          {profile.name.split(' ').map((n, i) => (i === 0 ? n : n[0])).join('')}
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-10">
          {navLinks.map((link) => {
            const isSectionLink = link.href.includes('#')
            const navClass = 'group relative text-sm text-theme-muted transition-colors duration-200 hover:text-theme-heading focus-ring focus-visible:text-theme-heading'
            return isSectionLink ? (
              <a key={link.href} href={link.href} className={navClass}>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-200 group-hover:w-full" />
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={navClass}>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-200 group-hover:w-full" />
              </Link>
            )
          })}
        </nav>
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <ThemeToggle />
          <motion.a
            href={profile.resumeUrl}
            download={profile.resumeDownloadName}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-xl border border-theme bg-theme-subtle px-4 py-2 text-sm font-medium text-theme-heading transition-colors hover:opacity-90 focus-ring"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HiDownload className="h-4 w-4" />
            Resume
          </motion.a>
          <a
            href="/#contact"
            className="flex min-h-[44px] items-center rounded-xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Hire me
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        </div>
        <button
          type="button"
          id="mobile-menu-button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-theme-muted transition-colors hover:bg-theme-subtle hover:text-theme-heading md:hidden focus-ring"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-theme section-safe-x py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
          >
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => {
                const isSectionLink = link.href.includes('#')
                const mobileClass = 'min-h-[44px] rounded-lg px-3 py-3 text-theme-muted transition-colors hover:bg-theme-subtle hover:text-theme-heading focus-ring'
                return isSectionLink ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={mobileClass}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      if (window.location.pathname !== '/') {
                        window.location.href = link.href
                      } else {
                        const id = link.href.split('#')[1]
                        if (id) {
                          window.history.pushState(null, '', link.href)
                          setTimeout(() => {
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }, 350)
                        }
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={mobileClass}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <a
                href={profile.resumeUrl}
                download={profile.resumeDownloadName}
                className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-3 text-theme-muted transition-colors hover:bg-theme-subtle hover:text-theme-heading focus-ring"
                onClick={() => setOpen(false)}
              >
                <HiDownload className="h-4 w-4" /> Download Resume
              </a>
              <a
                href="/#contact"
                className="flex min-h-[44px] items-center rounded-lg px-3 py-3 font-medium text-accent focus-ring"
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#contact'
                  } else {
                    window.history.pushState(null, '', '/#contact')
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 350)
                  }
                }}
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
