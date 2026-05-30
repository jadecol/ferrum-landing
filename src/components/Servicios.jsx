import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import '../styles/Servicios.css'

const SERVICES = [
  {
    id: 'debida-diligencia',
    num: '01',
    tag: 'Alta Demanda · Motor: NormCore™',
    title: 'Debida Diligencia Estratégica',
    subtitle: 'Legal, Normativa y Ambiental',
    pitch: '¿Quieres invertir en un terreno o desarrollar un proyecto? Primero asegúrate de que sea viable.',
    time: { value: '72h', label: 'Entrega máxima garantizada' },
    market: { value: '15–30 días', label: 'Tiempo mercado promedio' },
    bullets: [
      'Búsqueda y análisis de terrenos aptos para su proyecto',
      'Revisión completa del Plan de Ordenamiento Territorial (POT/PBOT/EOT)',
      'Análisis de normativa urbanística, constructiva y ambiental vigente',
      'Identificación de restricciones, requisitos y riesgos del predio',
      'Informe ejecutivo con resultados, riesgos y recomendación de acción',
    ],
    clients: ['Inversionistas', 'Fondos de inversión', 'Desarrolladores inmobiliarios', 'Empresas en expansión'],
    tech: ['NormCore™', 'POT Engine™', 'Análisis Ambiental'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#EABD0C" strokeWidth="1.8" />
        <path d="M12 7V12L15.5 15.5" stroke="#EABD0C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'documentacion-tecnica',
    num: '02',
    tag: 'Diferencial BIM · Motor: UrbanTwin™',
    title: 'Diseño y Documentación Técnica',
    subtitle: 'Arquitectura, Ingeniería y BIM',
    pitch: 'Pasamos tus ideas o necesidades a planos y documentos listos para construir. Con total calidad y precisión.',
    time: { value: '8 días', label: 'Entrega máxima garantizada' },
    market: { value: '15–20 días', label: 'Tiempo mercado promedio' },
    bullets: [
      'Diseños básicos y detallados adaptados a la normativa revisada',
      'Elaboración de planos técnicos y especificaciones constructivas',
      'Listas de materiales y cuantificaciones precisas',
      'Coordinación BIM: cero conflictos entre disciplinas antes de construir',
      'Entrega de documentación lista para presentar ante entidades o construir',
    ],
    clients: ['Constructoras', 'Estudios de arquitectura', 'Desarrolladores', 'Personas naturales y empresas'],
    tech: ['UrbanTwin™', 'BIM · C# · Python', 'GIS Integration'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#EABD0C" strokeWidth="1.8" />
        <path d="M7 8h10M7 12h6M7 16h8" stroke="#EABD0C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Servicios() {
  const [activeService, setActiveService] = useState(null)
  const headerRef = useScrollReveal()

  return (
    <section className="servicios" id="servicios">
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">

        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Servicios Actuales</span>
          <h2 className="section-title">
            Lo que mejor<br /><span>sabemos hacer.</span>
          </h2>
          <p className="section-sub">
            Dos servicios fundamentales, bien ejecutados desde el primer día.
            Cada uno respaldado por tecnología propia que el mercado no tiene.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              delay={i}
              isOpen={activeService === s.id}
              onToggle={() => setActiveService(activeService === s.id ? null : s.id)}
            />
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="coming-soon reveal">
          <div className="coming-soon-inner glass">
            <span className="coming-tag">Próximamente</span>
            <p>
              <strong>En desarrollo:</strong> Gestión de permisos y licencias · Servicios BIM avanzados ·
              Estudios técnicos especializados · Asesoría integral de proyectos.
              <em> Agregamos más cuando entregamos perfectamente lo que prometemos hoy.</em>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ service: s, delay, isOpen, onToggle }) {
  const ref = useScrollReveal()

  return (
    <div
      className={`service-card glass-gold reveal delay-${delay + 1} ${isOpen ? 'open' : ''}`}
      ref={ref}
    >
      {/* Header */}
      <div className="sc-header" onClick={onToggle} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onToggle()}
        aria-expanded={isOpen}
      >
        <div className="sc-left">
          <div className="sc-num">{s.num}</div>
          <div className="sc-icon">{s.icon}</div>
          <div className="sc-titles">
            <div className="sc-tag">{s.tag}</div>
            <h3 className="sc-title">{s.title}</h3>
            <p className="sc-subtitle">{s.subtitle}</p>
          </div>
        </div>

        {/* Time comparison */}
        <div className="sc-times">
          <div className="sc-time-ferrum">
            <span className="sc-time-value">{s.time.value}</span>
            <span className="sc-time-label">Ferrum</span>
          </div>
          <div className="sc-time-sep">vs</div>
          <div className="sc-time-market">
            <span className="sc-time-value muted">{s.market.value}</span>
            <span className="sc-time-label">Mercado</span>
          </div>
        </div>

        <div className="sc-toggle" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Expandable body */}
      <div className={`sc-body ${isOpen ? 'open' : ''}`}>
        <p className="sc-pitch">{s.pitch}</p>

        <div className="sc-details">
          <div>
            <div className="sc-details-title">Qué incluye</div>
            <ul className="sc-bullets">
              {s.bullets.map(b => (
                <li key={b}>
                  <span className="sc-bullet-dot" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="sc-details-title">A quién va dirigido</div>
            <div className="sc-clients">
              {s.clients.map(c => (
                <span className="sc-client-tag" key={c}>{c}</span>
              ))}
            </div>
            <div className="sc-details-title" style={{ marginTop: 20 }}>Tecnología que lo respalda</div>
            <div className="sc-tech-pills">
              {s.tech.map(t => (
                <span className="sc-tech-pill" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: 24 }}
          onClick={() => {
            const el = document.querySelector('#contacto')
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 86, behavior: 'smooth' })
          }}
        >
          Solicitar este servicio →
        </button>
      </div>
    </div>
  )
}
