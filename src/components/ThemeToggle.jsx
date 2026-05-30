import { useState, useEffect } from 'react'
import './ThemeToggle.css'

const THEMES = [
  {
    id: 'dark',
    label: 'Oscuro',
    icon: '◑',
    vars: {
      '--bg':       '#0E0E0F',
      '--surf':     '#141414',
      '--surf2':    '#1A1A1B',
      '--text':     '#E7E6E6',
      '--text-dim': '#999999',
      '--text-muted':'#5C5B5C',
      '--acc':      '#EABD0C',
      '--acc-hot':  '#E49800',
      '--border':   'rgba(234,189,12,0.14)',
      '--border-dim':'rgba(255,255,255,0.07)',
    },
  },
  {
    id: 'light',
    label: 'Claro',
    icon: '○',
    vars: {
      '--bg':       '#F5F4F0',
      '--surf':     '#FFFFFF',
      '--surf2':    '#F0EFE9',
      '--text':     '#0E0E0F',
      '--text-dim': '#5C5B5C',
      '--text-muted':'#999999',
      '--acc':      '#C08800',
      '--acc-hot':  '#E49800',
      '--border':   'rgba(192,136,0,0.2)',
      '--border-dim':'rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'corporate',
    label: 'Corporativo',
    icon: '▣',
    vars: {
      '--bg':       '#0A0F1E',
      '--surf':     '#0D1526',
      '--surf2':    '#111D35',
      '--text':     '#E8EDF8',
      '--text-dim': '#8A9BC4',
      '--text-muted':'#4A5A80',
      '--acc':      '#EABD0C',
      '--acc-hot':  '#E49800',
      '--border':   'rgba(234,189,12,0.16)',
      '--border-dim':'rgba(255,255,255,0.06)',
    },
  },
  {
    id: 'steel',
    label: 'Acero',
    icon: '◈',
    vars: {
      '--bg':       '#1A1A1A',
      '--surf':     '#242424',
      '--surf2':    '#2E2E2E',
      '--text':     '#F0F0F0',
      '--text-dim': '#A0A0A0',
      '--text-muted':'#606060',
      '--acc':      '#F9DA1B',
      '--acc-hot':  '#EABD0C',
      '--border':   'rgba(249,218,27,0.16)',
      '--border-dim':'rgba(255,255,255,0.08)',
    },
  },
]

const SAVED_KEY = 'ferrum-theme'

export default function ThemeToggle() {
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState(THEMES[0].id)

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_KEY)
    if (saved) applyTheme(saved, false)
  }, [])

  const applyTheme = (id, save = true) => {
    const theme = THEMES.find(t => t.id === id)
    if (!theme) return
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
    setActive(id)
    if (save) localStorage.setItem(SAVED_KEY, id)
    setOpen(false)
  }

  const current = THEMES.find(t => t.id === active)

  return (
    <div className={`theme-toggle ${open ? 'open' : ''}`}>
      {/* Trigger button */}
      <button
        className="theme-btn glass"
        onClick={() => setOpen(o => !o)}
        aria-label="Cambiar tema"
        title="Cambiar apariencia"
      >
        <span className="theme-btn-icon">{current.icon}</span>
        <span className="theme-btn-label">{current.label}</span>
        <svg
          className={`theme-chevron ${open ? 'flipped' : ''}`}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      <div className="theme-dropdown glass-gold" role="listbox" aria-label="Temas disponibles">
        <div className="theme-dropdown-title">Apariencia</div>
        {THEMES.map(t => (
          <button
            key={t.id}
            className={`theme-option ${t.id === active ? 'active' : ''}`}
            onClick={() => applyTheme(t.id)}
            role="option"
            aria-selected={t.id === active}
          >
            <span className="theme-option-preview" data-theme={t.id} aria-hidden="true">
              <span /><span /><span />
            </span>
            <span className="theme-option-icon">{t.icon}</span>
            <span className="theme-option-label">{t.label}</span>
            {t.id === active && <span className="theme-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
