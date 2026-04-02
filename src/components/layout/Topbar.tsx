import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Bell,
  Coffee,
  Heart,
  MapPinned,
  Menu,
  Palette,
  Search,
  X,
  ChevronDown,
} from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useScrollTop } from '../../hooks/useUtils'
import type { ThemeName } from '../../types'

interface NavItem {
  label: string
  to: string
  active: boolean
}

interface TopbarProps {
  favoriteCount: number
}

export function Topbar({ favoriteCount }: TopbarProps) {
  const location = useLocation()
  const { theme, nextTheme, setTheme, themeLabel, themes, themeLabels } = useTheme()
  const scrolled = useScrollTop()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [themeOpen, setThemeOpen] = React.useState(false)
  const themeRef = React.useRef<HTMLDivElement>(null)

  // Close theme picker on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navItems: NavItem[] = [
    { label: 'Tìm kèo', to: '/feed', active: location.pathname === '/feed' },
    { label: 'Sân', to: '/map', active: location.pathname === '/map' },
    { label: 'Xếp hạng', to: '/ranking', active: location.pathname === '/ranking' },
    { label: 'Gói dùng', to: '/pricing', active: location.pathname === '/pricing' },
  ]

  return (
    <>
      <header
        className={`topbar glass${scrolled ? ' topbar--scrolled' : ''}`}
        data-theme={theme}
      >
        <div className="container topbar-inner">
          {/* Brand */}
          <div className="brand-row">
            <Link className="brand" to="/" aria-label="SmashMate trang chủ">
              <span className="brand-mark">🏸</span>
              <span className="brand-text">
                Smash<span>Mate</span>
              </span>
            </Link>

            {/* Mobile quick nav */}
            <nav className="mobile-pill-nav" aria-label="Quick navigation">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.to}
                  className={`pill-link${item.active ? ' active' : ''}`}
                  to={item.to}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label === 'Tìm kèo' ? <Search size={12} /> : <MapPinned size={12} />}
                  {item.label === 'Tìm kèo' ? 'Kèo' : 'Sân'}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.to}
                className={`nav-link${item.active ? ' active' : ''}`}
                to={item.to}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="topbar-actions">
            {/* Theme picker */}
            <div className="theme-picker-wrap" ref={themeRef}>
              <button
                className="theme-button"
                type="button"
                onClick={() => setThemeOpen((o) => !o)}
                aria-label={`Đổi giao diện, hiện tại: ${themeLabel}`}
                aria-expanded={themeOpen}
              >
                <Palette size={14} />
                <span className="theme-swatch" style={{ background: getThemeSwatch(theme) }} />
                <ChevronDown size={12} className={`theme-chevron${themeOpen ? ' open' : ''}`} />
              </button>
              {themeOpen && (
                <div className="theme-dropdown glass" role="listbox" aria-label="Chọn giao diện">
                  {themes.map((t) => (
                    <button
                      key={t}
                      className={`theme-option${theme === t ? ' active' : ''}`}
                      role="option"
                      aria-selected={theme === t}
                      onClick={() => {
                        setTheme(t as ThemeName)
                        setThemeOpen(false)
                      }}
                    >
                      <span className="theme-dot" style={{ background: getThemeSwatch(t) }} />
                      {themeLabels[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              className="support-button"
              to="/pricing"
              aria-label="Ủng hộ và góp ý"
            >
              <Coffee size={14} />
              <span>Ủng hộ</span>
            </Link>

            <Link
              className={`icon-button${favoriteCount > 0 ? ' has-badge' : ''}`}
              to="/interests"
              aria-label={`Danh sách quan tâm, ${favoriteCount} mục`}
            >
              <Heart size={16} />
              {favoriteCount > 0 && (
                <span className="icon-badge" aria-hidden="true">{favoriteCount}</span>
              )}
            </Link>

            <Link
              className="icon-button bell"
              to="/reminders"
              aria-label="Nhắc lịch của tôi"
            >
              <Bell size={16} />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu"
              type="button"
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            <div className="avatar-skeleton" aria-hidden="true" />
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav
            className="mobile-menu-panel glass"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                className={`mobile-menu-link${item.active ? ' active' : ''}`}
                to={item.to}
                aria-current={item.active ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className={`mobile-menu-link${location.pathname === '/interests' ? ' active' : ''}`}
              to="/interests"
              onClick={() => setMobileOpen(false)}
            >
              <Heart size={14} />
              Danh sách quan tâm
              {favoriteCount > 0 && <span className="mobile-badge">{favoriteCount}</span>}
            </Link>
            <Link
              className={`mobile-menu-link${location.pathname === '/reminders' ? ' active' : ''}`}
              to="/reminders"
              onClick={() => setMobileOpen(false)}
            >
              <Bell size={14} />
              Nhắc lịch của tôi
            </Link>
            {/* Mobile theme switcher */}
            <div className="mobile-theme-row">
              <span className="mobile-theme-label">Giao diện</span>
              <div className="mobile-theme-swatches">
                {themes.map((t) => (
                  <button
                    key={t}
                    className={`mobile-swatch-btn${theme === t ? ' active' : ''}`}
                    style={{ background: getThemeSwatch(t) }}
                    onClick={() => setTheme(t as ThemeName)}
                    aria-label={themeLabels[t]}
                    title={themeLabels[t]}
                  />
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}

function getThemeSwatch(theme: string): string {
  const map: Record<string, string> = {
    light: '#f0f9ff',
    dark: '#1e293b',
    ocean: '#0ea5e9',
    forest: '#16a34a',
    sunset: '#f97316',
    rose: '#f43f5e',
  }
  return map[theme] ?? '#f0f9ff'
}
