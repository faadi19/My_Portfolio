/** Shown in index.html until React mounts; hide when #root has content */
export function AppSkeleton() {
  return (
    <div
      id="app-skeleton"
      className="fixed inset-0 z-[100] flex flex-col bg-surface-950 transition-opacity duration-300"
      style={{ backgroundColor: 'var(--color-surface-950)' }}
      aria-hidden
    >
      <div className="h-16 border-b border-theme" />
      <div className="flex flex-1 items-center justify-center px-5">
        <div className="flex flex-col items-center gap-4">
          <div className="h-4 w-32 animate-pulse rounded bg-theme-subtle" />
          <div className="h-10 w-64 animate-pulse rounded bg-theme-subtle" />
          <div className="h-4 w-48 animate-pulse rounded bg-theme-subtle" />
          <div className="mt-6 flex gap-3">
            <div className="h-12 w-32 animate-pulse rounded-xl bg-theme-subtle" />
            <div className="h-12 w-24 animate-pulse rounded-xl bg-theme-subtle" />
          </div>
        </div>
      </div>
    </div>
  )
}
