import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import '../styles/Header.css'

const NAV_LINKS = [
  { href: '#equipo',    label: 'Equipo' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#tecnologia',label: 'Ferrum OS' },
  { href: '#contacto',  label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => {
      if (!e.target.closest('.header-inner')) setMenuOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 86,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner glass">

          {/* Logo */}
          <a href="#" className="ferrum-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div className="ferrum-wm">
              <span className="ferrum-n">FERRUM</span>
              <span className="ferrum-s">Global Solutions</span>
            </div>
            <div className="ferrum-b" aria-hidden="true" />
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop" aria-label="Navegación principal">
            <ul className="nav-links">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="nav-link-wrap"
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                    <span className="nav-underline" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <ThemeToggle />
            <a href="#contacto" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#contacto')}>
              Diagnóstico Gratuito
            </a>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-menu glass-gold ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
          <nav>
            <ul className="mobile-nav-links">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} onClick={(e) => handleNavClick(e, href)}>{label}</a>
                </li>
              ))}
              <li>
                <a href="#contacto" className="btn btn-primary" style={{ marginTop: 8 }} onClick={(e) => handleNavClick(e, '#contacto')}>
                  Diagnóstico Gratuito
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
