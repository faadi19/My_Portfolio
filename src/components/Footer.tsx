import { profile } from '../data/portfolio'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="safe-area-bottom relative border-t border-theme px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-theme-muted">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-muted flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-2 py-2 text-sm sm:min-w-0"
            >
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="link-muted flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-2 py-2 text-sm sm:min-w-0">
              Email
            </a>
            <a href="/#" aria-label="Back to top" className="link-muted flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-2 py-2 text-sm sm:min-w-0">
              Back to top
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-theme-muted opacity-80">
          Built with React, TypeScript & Tailwind
        </p>
      </div>
    </footer>
  )
}
