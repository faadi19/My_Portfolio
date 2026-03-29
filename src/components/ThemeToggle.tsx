import { useTheme } from '../context/ThemeContext'

const colors: { value: 'amber' | 'blue' | 'green' | 'purple'; label: string }[] = [
  { value: 'amber', label: 'Amber' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
]

export function ThemeToggle() {
  const { color, setColor } = useTheme()

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Accent color">
      {colors.map((c) => (
        <button
          key={c.value}
          type="button"
          onClick={() => setColor(c.value)}
          title={c.label}
          className={`h-7 w-7 rounded-full transition ring-2 ring-offset-2 ring-offset-surface-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            color === c.value ? 'ring-accent scale-110' : 'ring-transparent hover:scale-105'
          }`}
            style={{
            backgroundColor:
              c.value === 'amber' ? '#f59e0b' : c.value === 'blue' ? '#0ea5e9' : c.value === 'green' ? '#22c55e' : '#a855f7',
          }}
        />
      ))}
    </div>
  )
}
