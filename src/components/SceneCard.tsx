/** Shared wrapper for 3D scene canvases (About, Projects, Skills, Testimonials). */
export function SceneCard({
  children,
  className = '',
  height = 140,
}: {
  children: React.ReactNode
  className?: string
  height?: number
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-theme bg-surface-900/60 ${className}`.trim()}
      style={{ height }}
    >
      {children}
    </div>
  )
}
