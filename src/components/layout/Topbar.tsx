import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Bell,
  Search,
  MapPinned,
  Trophy,
  History,
  CreditCard,
  Settings,
  Palette,
  Sun,
  Moon,
  Wind,
  Trees,
  Sunset as SunsetIcon,
  Flower2,
} from 'lucide-react'

const THEMES = [
  { id: 'light', name: 'Sáng', icon: <Sun size={14} /> },
  { id: 'dark', name: 'Tối', icon: <Moon size={14} /> },
  { id: 'ocean', name: 'Đại dương', icon: <Wind size={14} /> },
  { id: 'forest', name: 'Rừng xanh', icon: <Trees size={14} /> },
  { id: 'sunset', name: 'Hoàng hôn', icon: <SunsetIcon size={14} /> },
  { id: 'rose', name: 'Hoa hồng', icon: <Flower2 size={14} /> },
]

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const location = useLocation()

  function changeTheme(theme: string) {
    const root = document.documentElement
    THEMES.forEach((t) => root.classList.remove(t.id))
    root.classList.add(theme)
    localStorage.setItem('smash-theme', theme)
    setThemeOpen(false)
  }

  const navLinks = [
    { path: '/feed', label: 'Tìm kèo', icon: <Search size={18} /> },
    { path: '/map', label: 'Sân cầu', icon: <MapPinned size={18} /> },
    { path: '/ranking', label: 'Xếp hạng', icon: <Trophy size={18} /> },
    { path: '/pricing', label: 'Dịch vụ', icon: <CreditCard size={18} /> },
  ]

  const rightLinks = [
    { path: '/interests', label: 'Quan tâm', icon: <History size={18} /> },
    { path: '/reminders', label: 'Nhắc lịch', icon: <Bell size={18} /> },
  ]

  return (
    <header className="topbar" style={{ padding: '1rem 0', background: 'transparent' }}>
      <div className="container topbar-inner glass" style={{ 
        borderRadius: 'var(--radius-full)', 
        padding: '0.6rem 1.75rem',
        borderWidth: '1.5px',
        boxShadow: 'var(--shadow-lg)',
        background: 'var(--glass-bg)',
      }}>
        <div className="brand-row">
          <Link to="/" className="brand">
            <span className="brand-mark" style={{ filter: 'drop-shadow(0 4px 10px hsla(var(--primary), 0.3))' }}>🏸</span>
            <span className="brand-text" style={{ fontSize: '1.4rem' }}>
              Smash<span>Mate</span>
            </span>
          </Link>

          <nav className="desktop-nav" style={{ marginLeft: '1rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ fontSize: '0.95rem', fontWeight: 600 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="topbar-actions">
          <nav className="desktop-nav" style={{ marginRight: '0.5rem' }}>
            {rightLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ fontSize: '0.95rem', fontWeight: 500 }}
              >
                {link.icon}
              </Link>
            ))}
          </nav>

          <div style={{ position: 'relative' }}>
            <button
              className="icon-button"
              onClick={() => setThemeOpen(!themeOpen)}
              aria-label="Chọn chủ đề"
              style={{ 
                background: 'hsla(var(--foreground), 0.05)', 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                border: 'none',
                cursor: 'pointer',
                color: 'hsl(var(--foreground))'
              }}
            >
              <Palette size={20} />
            </button>

            {themeOpen && (
              <div
                className="theme-menu glass show"
                role="menu"
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: '120%', 
                  width: '180px', 
                  borderRadius: '1.5rem',
                  padding: '0.75rem',
                  zIndex: 100 
                }}
              >
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    role="menuitem"
                    onClick={() => changeTheme(theme.id)}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'hsl(var(--foreground))',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'hsla(var(--foreground), 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ color: `hsl(var(--primary))` }}>{theme.icon}</span>
                    {theme.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="icon-button mobile-only"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            style={{ 
              background: 'hsla(var(--foreground), 0.05)', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu container glass" style={{ marginTop: '0.5rem', borderRadius: '1.5rem', padding: '1.5rem' }}>
          <nav className="mobile-nav">
            {[...navLinks, ...rightLinks].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  borderRadius: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
