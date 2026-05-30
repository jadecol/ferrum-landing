import './Footer.css'

const LINKS = {
  Servicios: [
    { href: '#servicios', label: 'Debida Diligencia 72h' },
    { href: '#servicios', label: 'Documentación Técnica BIM' },
    { href: '#contacto',  label: 'Solicitar Diagnóstico' },
  ],
  Tecnología: [
    { href: '#tecnologia', label: 'Ferrum OS' },
    { href: '#tecnologia', label: 'POT Engine™' },
    { href: '#tecnologia', label: 'NormCore™' },
    { href: '#tecnologia', label: 'UrbanTwin™' },
  ],
  Legal: [
    { href: '#politica',  label: 'Política de Datos' },
    { href: '#terminos',  label: 'Términos de Uso' },
    { href: 'mailto:ferrumglobalsolutions@gmail.com', label: 'Contacto' },
  ],
}

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 86, behavior: 'smooth' })
    } else { window.location.href = href }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <div className="ferrum-logo">
              <div className="ferrum-wm">
                <span className="ferrum-n">FERRUM</span>
                <span className="ferrum-s">Global Solutions</span>
              </div>
              <div className="ferrum-b" aria-hidden="true" />
            </div>
            <p className="footer-desc">
              Empresa constituida con +15 años de conocimiento acumulado.
              Tecnología normativa propia al servicio de sus proyectos inmobiliarios y urbanos.
            </p>
            <address className="footer-contact">
              <a href="https://maps.google.com/?q=Ubaté,Cundinamarca" target="_blank" rel="noopener noreferrer">
                📍 Ubaté, Cundinamarca · Colombia
              </a>
              <a href="mailto:ferrumglobalsolutions@gmail.com">
                📧 ferrumglobalsolutions@gmail.com
              </a>
              <a href="https://wa.me/573227167158" target="_blank" rel="noopener noreferrer">
                📞 +57 322 716 7158
              </a>
              <a href="https://www.ferrumgs.com" target="_blank" rel="noopener noreferrer">
                🌐 www.ferrumgs.com
              </a>
            </address>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title} className="footer-col">
              <div className="footer-col-title">{title}</div>
              <ul className="footer-links">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <a href={href} onClick={(e) => scrollTo(e, href)}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ferrum Global Solutions. Todos los derechos reservados.</p>
          <p>🔒 SSL · Ley 1581/2012 · Ubaté, Colombia</p>
        </div>
      </div>
    </footer>
  )
}
