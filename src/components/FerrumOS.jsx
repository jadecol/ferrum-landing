import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './FerrumOS.css'

const SYSTEMS = [
  {
    name: 'POT Engine™',
    badge: 'Gemelo Digital',
    desc: 'Réplica digital del POT de cada municipio donde operamos. Consulta normativa instantánea por coordenadas antes de invertir.',
    feats: [
      'Consulta por coordenadas o polígono en tiempo real',
      'Actualización automática ante cambios de decreto',
      'Validación cruzada con POMCA, PBOT y normas concurrentes',
    ],
  },
  {
    name: 'NormCore™',
    badge: 'Base Normativa Nacional',
    desc: '+200 variables normativas simultáneas. Detecta conflictos antes de que se conviertan en problemas de inversión.',
    feats: [
      'Cobertura: Ley 388, Decreto 1077 y normativa sectorial',
      'Riesgo ambiental, patrimonial, arqueológico y vial',
      'Reporte técnico-jurídico en 72h con score de viabilidad',
    ],
  },
  {
    name: 'UrbanTwin™',
    badge: 'Gemelo Digital Urbano',
    desc: 'Simula escenarios de cargas, beneficios, volúmenes y m² vendibles sobre la normativa real del predio.',
    feats: [
      'Modelación BIM integrada con datos normativos reales',
      'Simulación de m² vendibles bajo distintos escenarios',
      'Output: volumetría + cuadro de áreas + rentabilidad estimada',
    ],
  },
  {
    name: 'Ferrum OS',
    badge: 'Plataforma Integrada',
    desc: 'Orquesta todos los sistemas. Dashboard de proyectos con estado en tiempo real.',
    feats: [
      'Dashboard de expedientes y entregas en tiempo real',
      'Alertas automáticas de hitos y documentos',
      'Desarrollado en Java + C# con integraciones nativas',
    ],
  },
]

const TERM_SCRIPT = [
  { cls: 'cmt', txt: '# Ferrum OS · Due Diligence — Lote: Bogotá NR-2047' },
  { cls: 'cmd', txt: '$ potEngine.query(lote="NR-2047", municipio="Bogota")' },
  { cls: 'out', txt: '→ Sincronizando POT 2024 (Decreto 555)...' },
  { cls: 'val', txt: '  Zona: Residencial — Tratamiento renovación urbana' },
  { cls: 'val', txt: '  IO: 0.65 · IC: 3.2 · Altura máxima: 12 pisos' },
  { cls: 'cmd', txt: '$ normCore.check(lote, flags=["ambiental","vial","pat"])' },
  { cls: 'out', txt: '→ NormCore™ ejecutando — 247 variables...' },
  { cls: 'ok',  txt: '  ✓ Ambiental: sin restricción (POMCA verificado)' },
  { cls: 'ok',  txt: '  ✓ Patrimonio: fuera de área de influencia' },
  { cls: 'warn',txt: '  ⚠ Vial: afectación 8m — plan vial municipal' },
  { cls: 'cmd', txt: '$ urbanTwin.model(area_neta=11200, io=0.65, ic=3.2)' },
  { cls: 'ok',  txt: '  ✓ m² vendibles netos: 32.840 m²' },
  { cls: 'ok',  txt: '  ✓ Score de viabilidad: 91/100 — PROCEDER' },
]

function runTyping(container) {
  container.innerHTML = ''
  let delay = 0

  TERM_SCRIPT.forEach((line) => {
    setTimeout(() => {
      const el = document.createElement('div')
      el.className = `term-line ${line.cls}`
      container.appendChild(el)
      const chars = line.txt.split('')
      let ci = 0
      const speed = line.cls === 'cmd' ? 16 : 7
      const iv = setInterval(() => {
        el.textContent += chars[ci++]
        if (ci >= chars.length) clearInterval(iv)
        container.scrollTop = container.scrollHeight
      }, speed)
    }, delay)

    const charSpeed = line.cls === 'cmd' ? 16 : 7
    delay += line.txt.length * charSpeed + (line.cls === 'cmd' ? 280 : 90)
  })
}

export default function FerrumOS() {
  const headerRef = useScrollReveal()
  const termRef   = useRef(null)
  const ranRef    = useRef(false)
  const meterRef  = useRef(null)

  useEffect(() => {
    // Use a small delay to ensure DOM is painted, then observe
    const timer = setTimeout(() => {
      const terminal = termRef.current
      if (!terminal) return

      // If already visible on mount, run immediately
      const rect = terminal.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.85 && !ranRef.current) {
        ranRef.current = true
        runTyping(terminal)
        if (meterRef.current) meterRef.current.style.width = '91%'
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || ranRef.current) return
          ranRef.current = true
          observer.disconnect()
          runTyping(terminal)
          if (meterRef.current) meterRef.current.style.width = '91%'
        },
        { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
      )
      observer.observe(terminal)
      return () => observer.disconnect()
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="tech-section" id="tecnologia">
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">

        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Ferrum OS · Tecnología Propia</span>
          <h2 className="section-title">
            Sistemas que<br /><span>construimos nosotros.</span>
          </h2>
          <p className="section-sub">
            No usamos software de terceros para lo que importa. Desarrollamos nuestras propias
            herramientas en Java, C#, Python y BIM — sistemas que conocen la normativa colombiana
            desde adentro y se actualizan con cada cambio de POT o decreto nacional.
          </p>
        </div>

        {/* Stack badges */}
        <div className="stack-row reveal" ref={useScrollReveal()}>
          {['Java', 'C#', 'Python', 'BIM', 'GIS', 'Gemelos Digitales'].map(s => (
            <div className="stack-b" key={s}>
              <span className="stack-dot" />{s}
            </div>
          ))}
        </div>

        {/* Terminal — two column layout */}
        <div className="tech-layout reveal" ref={useScrollReveal()}>

          {/* Left: description */}
          <div className="tech-left">
            <h3 className="tech-left-title">Motor normativo en tiempo real</h3>
            <p className="tech-left-desc">
              Cada consulta procesa el POT actualizado del municipio, cruza normativa
              ambiental nacional y modela los m² vendibles reales del predio —
              todo antes de que el cliente invierta un peso.
            </p>
            <ul className="tech-left-list">
              <li><span className="tl-dot" />247 variables normativas analizadas por predio</li>
              <li><span className="tl-dot" />Actualización automática ante cambios de decreto</li>
              <li><span className="tl-dot" />Score de viabilidad 0–100 con trazabilidad completa</li>
              <li><span className="tl-dot" />Resultado disponible en máximo 72 horas</li>
            </ul>
            <button
              className="btn btn-primary tech-cta-btn"
              onClick={() => {
                const el = document.querySelector('#contacto')
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 86, behavior: 'smooth' })
              }}
            >
              Solicitar análisis de mi predio →
            </button>
          </div>

          {/* Right: terminal */}
          <div className="twin-visual glass-gold">
            <div className="twin-header">
              <span className="twin-dot twin-dot-o" />
              <span className="twin-dot twin-dot-y" />
              <span className="twin-dot twin-dot-s" />
              <span className="twin-title">FERRUM OS · POT ENGINE™ v4.2 — LIVE</span>
            </div>
            <div className="twin-body" ref={termRef} />
            <div className="twin-meter">
              <div className="m-row">
                <span className="m-lbl">Score Viabilidad NormCore™</span>
                <span className="m-val">91 / 100</span>
              </div>
              <div className="m-bar">
                <div
                  ref={meterRef}
                  className="meter-fill"
                  style={{ width: '0%', transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1) 3.2s' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System cards */}
        <div className="sys-grid">
          {SYSTEMS.map((s, i) => (
            <SysCard key={s.name} sys={s} delay={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

function SysCard({ sys, delay }) {
  const ref = useScrollReveal()
  return (
    <div className={`sys-card glass reveal delay-${delay + 1}`} ref={ref}>
      <div className="sys-name">
        <span className="sys-label">{sys.name}</span>
        <span className="sys-badge">{sys.badge}</span>
      </div>
      <p className="sys-desc">{sys.desc}</p>
      <ul className="sys-feats">
        {sys.feats.map(f => (
          <li key={f}><span className="sf-dot" />{f}</li>
        ))}
      </ul>
    </div>
  )
}
