import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './FerrumOS.css'

const SYSTEMS = [
  {
    name: 'POT Engine™', badge: 'Gemelo Digital',
    desc: 'Réplica digital del POT de cada municipio donde operamos. Consulta normativa instantánea por coordenadas antes de invertir.',
    feats: ['Consulta por coordenadas o polígono en tiempo real','Actualización automática ante cambios de decreto','Validación cruzada con POMCA, PBOT y normas concurrentes'],
  },
  {
    name: 'NormCore™', badge: 'Base Normativa Nacional',
    desc: '+200 variables normativas simultáneas. Detecta conflictos antes de que se conviertan en problemas de inversión.',
    feats: ['Cobertura: Ley 388, Decreto 1077 y normativa sectorial','Riesgo ambiental, patrimonial, arqueológico y vial','Reporte técnico-jurídico en 72h con score de viabilidad'],
  },
  {
    name: 'UrbanTwin™', badge: 'Gemelo Digital Urbano',
    desc: 'Simula escenarios de cargas, beneficios, volúmenes y m² vendibles sobre la normativa real del predio.',
    feats: ['Modelación BIM integrada con datos normativos reales','Simulación de m² vendibles bajo distintos escenarios','Output: volumetría + cuadro de áreas + rentabilidad estimada'],
  },
  {
    name: 'Ferrum OS', badge: 'Plataforma Integrada',
    desc: 'Orquesta todos los sistemas. Dashboard de proyectos con estado en tiempo real.',
    feats: ['Dashboard de expedientes y entregas en tiempo real','Alertas automáticas de hitos y documentos','Desarrollado en Java + C# con integraciones nativas'],
  },
]

// Each sequence is one "analysis run" — loops forever
const SEQUENCES = [
  [
    { cls: 'cmt', txt: '# ─── Análisis Predio: Bogotá NR-2047 ───────────────' },
    { cls: 'cmd', txt: '$ potEngine.query("NR-2047", "Bogota")' },
    { cls: 'out', txt: '  → Cargando POT 2024 · Decreto 555...' },
    { cls: 'val', txt: '  IO: 0.65  IC: 3.2  Altura: 12 pisos' },
    { cls: 'val', txt: '  Zona: Residencial — Renovación urbana' },
    { cls: 'cmd', txt: '$ normCore.check("NR-2047", ["ambiental","vial","pat"])' },
    { cls: 'out', txt: '  → Ejecutando 247 variables normativas...' },
    { cls: 'ok',  txt: '  ✓ Ambiental   : sin restricción  [POMCA OK]' },
    { cls: 'ok',  txt: '  ✓ Patrimonio  : fuera de área de influencia' },
    { cls: 'warn',txt: '  ⚠ Vial        : afectación 8m · plan vial' },
    { cls: 'cmd', txt: '$ urbanTwin.model(11200, io=0.65, ic=3.2)' },
    { cls: 'out', txt: '  → Modelando gemelo digital 4D...' },
    { cls: 'ok',  txt: '  ✓ m² vendibles netos  : 32.840 m²' },
    { cls: 'ok',  txt: '  ✓ Score viabilidad    : 91 / 100' },
    { cls: 'ok',  txt: '  ✓ RECOMENDACIÓN       : PROCEDER ✦' },
    { cls: 'cmt', txt: '# ─────────────────────────────────────────────────' },
  ],
  [
    { cls: 'cmt', txt: '# ─── Análisis Predio: Medellín ZU-0318 ────────────' },
    { cls: 'cmd', txt: '$ potEngine.query("ZU-0318", "Medellin")' },
    { cls: 'out', txt: '  → Cargando POT 2023 · Acuerdo 48...' },
    { cls: 'val', txt: '  IO: 0.70  IC: 4.5  Altura: 20 pisos' },
    { cls: 'val', txt: '  Zona: Centralidad — Desarrollo' },
    { cls: 'cmd', txt: '$ normCore.check("ZU-0318", ["ambiental","arqueológico"])' },
    { cls: 'out', txt: '  → Ejecutando 247 variables normativas...' },
    { cls: 'ok',  txt: '  ✓ Ambiental      : sin restricción  [CORANTIOQUIA]' },
    { cls: 'warn',txt: '  ⚠ Arqueológico   : zona de interés — requiere ICANH' },
    { cls: 'ok',  txt: '  ✓ Riesgo sísmico : zona II · norma NSR-10' },
    { cls: 'cmd', txt: '$ urbanTwin.model(8400, io=0.70, ic=4.5)' },
    { cls: 'out', txt: '  → Modelando gemelo digital 4D...' },
    { cls: 'ok',  txt: '  ✓ m² vendibles netos  : 26.460 m²' },
    { cls: 'warn',txt: '  ⚠ Score viabilidad    : 76 / 100  [revisar ICANH]' },
    { cls: 'cmt', txt: '# ─────────────────────────────────────────────────' },
  ],
  [
    { cls: 'cmt', txt: '# ─── Due Diligence: Cali SC-7701 ──────────────────' },
    { cls: 'cmd', txt: '$ normCore.dueDiligence("SC-7701", "Cali")' },
    { cls: 'out', txt: '  → Sincronizando POT 2014 + ajuste 2021...' },
    { cls: 'val', txt: '  Tratamiento: Consolidación residencial' },
    { cls: 'val', txt: '  Densidad max: 250 viv/ha · Área mín: 120 m²' },
    { cls: 'cmd', txt: '$ normCore.check("SC-7701", ["ambiental","riesgo"])' },
    { cls: 'out', txt: '  → Cruzando POMCH río Cauca + zonificación...' },
    { cls: 'warn',txt: '  ⚠ Ronda hídrica : 30m afectación lateral' },
    { cls: 'ok',  txt: '  ✓ Riesgo sísmico : zona III · microzonificación' },
    { cls: 'ok',  txt: '  ✓ Servicios      : cobertura 100% disponible' },
    { cls: 'cmd', txt: '$ urbanTwin.model(6800, io=0.60, ic=2.8)' },
    { cls: 'out', txt: '  → Descontando afectaciones reales...' },
    { cls: 'ok',  txt: '  ✓ Área neta útil       : 4.760 m² (-30m ronda)' },
    { cls: 'ok',  txt: '  ✓ m² vendibles netos   : 13.328 m²' },
    { cls: 'ok',  txt: '  ✓ Score viabilidad     : 83 / 100  ✦' },
    { cls: 'cmt', txt: '# ─────────────────────────────────────────────────' },
  ],
]

export default function FerrumOS() {
  const termRef   = useRef(null)
  const meterRef  = useRef(null)
  const stateRef  = useRef({ seqIdx: 0, lineIdx: 0, charIdx: 0, timers: [] })
  const headerRef = useScrollReveal()

  useEffect(() => {
    const container = termRef.current
    const meter     = meterRef.current
    if (!container) return

    const state = stateRef.current

    // Animate meter to target score
    const scores = [91, 76, 83]
    const animateMeter = (score) => {
      if (!meter) return
      meter.style.transition = 'none'
      meter.style.width = '0%'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          meter.style.transition = 'width 1.6s cubic-bezier(0.4,0,0.2,1)'
          meter.style.width = `${score}%`
        })
      })
    }

    // Type one character at a time, then move to next line/sequence
    const typeNext = () => {
      const seq  = SEQUENCES[state.seqIdx]
      const line = seq[state.lineIdx]
      const txt  = line.txt

      // Create new line element if first char
      if (state.charIdx === 0) {
        const el = document.createElement('div')
        el.className = `term-line ${line.cls}`
        el.dataset.lineId = `${state.seqIdx}-${state.lineIdx}`
        container.appendChild(el)

        // Keep max 22 lines visible
        while (container.children.length > 22) {
          container.removeChild(container.firstChild)
        }
      }

      // Get current line element
      const lineEl = container.querySelector(
        `[data-line-id="${state.seqIdx}-${state.lineIdx}"]`
      )
      if (!lineEl) { advanceLine(); return }

      // Type next char
      lineEl.textContent = txt.slice(0, state.charIdx + 1)
      container.scrollTop = container.scrollHeight
      state.charIdx++

      if (state.charIdx < txt.length) {
        // Still typing this line
        const speed = line.cls === 'cmd' ? 28 : 12
        const t = setTimeout(typeNext, speed)
        state.timers.push(t)
      } else {
        // Line complete — pause then advance
        const pause = line.cls === 'cmd' ? 320 : 80
        const t = setTimeout(advanceLine, pause)
        state.timers.push(t)
      }
    }

    const advanceLine = () => {
      const seq = SEQUENCES[state.seqIdx]
      state.charIdx = 0
      state.lineIdx++

      if (state.lineIdx >= seq.length) {
        // Sequence complete — animate meter, pause, then next sequence
        const scoreEl = document.querySelector('.m-val')
        const scores = [91, 76, 83]
        const score = scores[state.seqIdx]
        if (scoreEl) scoreEl.textContent = `${score} / 100`
        animateMeter(score)

        state.lineIdx = 0
        state.seqIdx  = (state.seqIdx + 1) % SEQUENCES.length

        // Pause between sequences, then add separator and continue
        const t = setTimeout(() => {
          const sep = document.createElement('div')
          sep.className = 'term-line cmt'
          sep.textContent = ''
          container.appendChild(sep)
          const t2 = setTimeout(typeNext, 600)
          state.timers.push(t2)
        }, 2800)
        state.timers.push(t)
      } else {
        const t = setTimeout(typeNext, 40)
        state.timers.push(t)
      }
    }

    // Start immediately
    const t = setTimeout(typeNext, 400)
    state.timers.push(t)

    return () => {
      state.timers.forEach(clearTimeout)
      state.timers = []
    }
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contacto')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 86, behavior: 'smooth' })
  }

  return (
    <section className="tech-section" id="tecnologia">
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">

        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Ferrum OS · Tecnología Propia</span>
          <h2 className="section-title">Sistemas que<br /><span>construimos nosotros.</span></h2>
          <p className="section-sub">
            No usamos software de terceros para lo que importa. Desarrollamos nuestras propias
            herramientas en Java, C#, Python y BIM — sistemas que conocen la normativa colombiana
            desde adentro y se actualizan con cada cambio de POT o decreto nacional.
          </p>
        </div>

        <div className="stack-row reveal" ref={useScrollReveal()}>
          {['Java', 'C#', 'Python', 'BIM', 'GIS', 'Gemelos Digitales'].map(s => (
            <div className="stack-b" key={s}><span className="stack-dot" />{s}</div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="tech-layout reveal" ref={useScrollReveal()}>

          {/* Left */}
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
            <button className="btn btn-primary tech-cta-btn" onClick={scrollToContact}>
              Solicitar análisis de mi predio →
            </button>
          </div>

          {/* Right: terminal */}
          <div className="twin-visual glass-gold">
            <div className="twin-header">
              <span className="twin-dot twin-dot-o" />
              <span className="twin-dot twin-dot-y" />
              <span className="twin-dot twin-dot-s" />
              <span className="twin-title">FERRUM OS · POT ENGINE™ v4.2</span>
              <span className="twin-status">● EN VIVO</span>
            </div>
            <div className="twin-body" ref={termRef} />
            <div className="twin-meter">
              <div className="m-row">
                <span className="m-lbl">Score Viabilidad NormCore™</span>
                <span className="m-val">— / 100</span>
              </div>
              <div className="m-bar">
                <div ref={meterRef} className="meter-fill" style={{ width: '0%' }} />
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
        {sys.feats.map(f => <li key={f}><span className="sf-dot" />{f}</li>)}
      </ul>
    </div>
  )
}
