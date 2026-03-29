import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'portfolio-theme'

export type ThemeColor = 'amber' | 'blue' | 'green' | 'purple'

/** Hex values for Three.js / canvas – must match theme.css */
export const ACCENT_HEX: Record<
  ThemeColor,
  { accent: string; accentLight: string; accentMuted: string; accentRgb: [number, number, number] }
> = {
  amber: { accent: '#f59e0b', accentLight: '#fbbf24', accentMuted: '#d97706', accentRgb: [245, 158, 11] },
  blue: { accent: '#0ea5e9', accentLight: '#38bdf8', accentMuted: '#0284c7', accentRgb: [14, 165, 233] },
  green: { accent: '#22c55e', accentLight: '#4ade80', accentMuted: '#16a34a', accentRgb: [34, 197, 94] },
  purple: { accent: '#a855f7', accentLight: '#c084fc', accentMuted: '#9333ea', accentRgb: [168, 85, 247] },
}

type ThemeState = {
  color: ThemeColor
}

const defaultState: ThemeState = {
  color: 'amber',
}

function loadSaved(): ThemeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ThemeState>
      const c = parsed.color
      return {
        color: c === 'green' ? 'green' : c === 'purple' ? 'purple' : c === 'blue' ? 'blue' : 'amber',
      }
    }
  } catch {
    // ignore
  }
  return defaultState
}

function save(state: ThemeState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

type ThemeContextValue = ThemeState & {
  setColor: (color: ThemeColor) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeState>(loadSaved)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    document.documentElement.setAttribute('data-color', state.color)
  }, [state.color])

  useEffect(() => {
    save(state)
  }, [state])

  const setColor = useCallback((color: ThemeColor) => {
    setState((s) => ({ ...s, color }))
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        setColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function useAccentHex() {
  const { color } = useTheme()
  return ACCENT_HEX[color]
}
