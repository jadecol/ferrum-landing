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

export default function FerrumOS() {
  const headerRef  = useScrollReveal()
  const termRef    = useRef(null)
  const ranRef     = useRef(false)

  useEffect(() => {
    const terminal = termRef.current
    if (!terminal) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || ranRef.current) return
      ranRef.current = true
      terminal.innerHTML = ''
      let delay = 0

      TERM_SCRIPT.forEach((line) => {
        setTimeout(() => {
          const el = document.createElement('div')
          el.className = `term-line ${line.cls}`
          terminal.appendChild(el)
          const chars = line.txt.split('')
          let ci = 0
          const speed = line.cls === 'cmd' ? 18 : 8
          const iv = setInterval(() => {
            el.textContent += chars[ci++]
            if (ci >= chars.length) clearInterval(iv)
            terminal.scrollTop = terminal.scrollHeight
          }, speed)
        }, delay)
        delay += line.cls === 'cmd'
          ? line.txt.length * 18 + 300
          : line.txt.length * 8 + 100
      })
    }, { threshold: 0.3 })

    observer.observe(terminal)
    return () => observer.disconnect()
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
            No usamos software de terceros para lo que importa. Desarrollamos nuestras propias herramientas en
            Java, C#, Python y BIM — sistemas que conocen la normativa colombiana desde adentro.
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

        {/* Terminal */}
        <div className="tech-twin glass-gold reveal" ref={useScrollReveal()}>
          <div className="twin-header">
            <span className="twin-dot twin-dot-o" /><span className="twin-dot twin-dot-y" /><span className="twin-dot twin-dot-s" />
            <span className="twin-title">FERRUM OS · POT ENGINE™ v4.2 — LIVE</span>
          </div>
          <div className="twin-body" ref={termRef} />
          <div className="twin-meter">
            <div className="m-row">
              <span className="m-lbl">Score Viabilidad NormCore™</span>
              <span className="m-val">91 / 100</span>
            </div>
            <div className="m-bar"><div className="meter-fill" style={{ width: '91%', animationDelay: '3s', animationDuration: '1.5s' }} /></div>
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
