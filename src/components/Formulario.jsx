import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Formulario.css'

const STEPS = [
  { label: 'Perfil' },
  { label: 'Predio' },
  { label: 'Contacto' },
]

const PERFILES = [
  { value: 'propietario', label: 'Tengo un lote y busco desarrollador' },
  { value: 'comprador',   label: 'Busco lote para comprar' },
  { value: 'constructora',label: 'Soy constructora — requiero servicio técnico' },
  { value: 'fondo',       label: 'Fondo de inversión' },
]

const AREAS = [
  { value: '<1ha',    label: 'Menos de 1 Hectárea' },
  { value: '1-5ha',   label: '1 – 5 Hectáreas' },
  { value: '5-20ha',  label: '5 – 20 Hectáreas' },
  { value: '20+ha',   label: '+20 Hectáreas (Macrolote)' },
]

const SERVICIOS_SELECT = [
  { value: 'diligencia',      label: 'Debida Diligencia Estratégica (72h)' },
  { value: 'documentacion',   label: 'Diseño y Documentación Técnica BIM (8 días)' },
  { value: 'ambos',           label: 'Ambos servicios' },
  { value: 'no-se',           label: 'No estoy seguro — quiero orientación' },
]

const INITIAL = {
  perfil: '', area: '', servicio: '',
  ciudad: '', proyecto: '',
  nombre: '', telefono: '', empresa: '', correo: '',
  politica: false,
}

export default function Formulario() {
  const [step, setStep]       = useState(0)
  const [data, setData]       = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [fileLabel, setFileLabel] = useState(null)
  const headerRef = useScrollReveal()

  const set = (field, val) => {
    setData(d => ({ ...d, [field]: val }))
    setErrors(e => ({ ...e, [field]: undefined }))
  }

  const validate = (s) => {
    const e = {}
    if (s === 0) {
      if (!data.perfil)   e.perfil   = 'Selecciona tu perfil'
      if (!data.area)     e.area     = 'Selecciona el área'
      if (!data.servicio) e.servicio = 'Selecciona un servicio'
    }
    if (s === 1) {
      if (!data.ciudad.trim()) e.ciudad = 'Indica la ciudad o municipio'
    }
    if (s === 2) {
      if (!data.nombre.trim())   e.nombre   = 'Nombre requerido'
      if (!data.telefono.trim()) e.telefono = 'Teléfono requerido'
      if (!data.empresa.trim())  e.empresa  = 'Empresa requerida'
      if (!/\S+@\S+\.\S+/.test(data.correo)) e.correo = 'Correo inválido'
      if (!data.politica) e.politica = 'Debes aceptar la política de datos'
    }
    return e
  }

  const next = () => {
    const e = validate(step)
    if (Object.keys(e).length) { setErrors(e); return }
    setStep(s => s + 1)
    window.scrollTo({ top: document.querySelector('#contacto')?.getBoundingClientRect().top + window.scrollY - 86, behavior: 'smooth' })
  }

  const prev = () => setStep(s => s - 1)

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(2)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  const progress = (step / (STEPS.length - 1)) * 100

  return (
    <section className="conversion" id="contacto">
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">

        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Diagnóstico Gratuito</span>
          <h2 className="section-title">
            Conozca el potencial<br /><span>real de su predio</span>
          </h2>
          <p className="section-sub">
            En 5 minutos configuramos su análisis con <strong style={{ color: 'var(--acc)' }}>POT Engine™</strong> y <strong style={{ color: 'var(--acc)' }}>NormCore™</strong>. Sin costo, sin compromiso.
          </p>
        </div>

        <div className="form-wrap glass-gold reveal" ref={useScrollReveal()}>

          {submitted ? (
            <SuccessScreen data={data} />
          ) : (
            <>
              {/* Progress */}
              <div className="form-prog" role="progressbar" aria-valuenow={step + 1} aria-valuemax={3}>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: `${progress}%` }} />
                </div>
                {STEPS.map((s, i) => (
                  <div key={s.label} className={`prog-step ${i <= step ? 'active' : ''}`}>
                    <div className="prog-dot">{i < step ? '✓' : i + 1}</div>
                    <span className="prog-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={submit} noValidate>

                {/* ── STEP 0: Perfil ── */}
                {step === 0 && (
                  <div className="form-step">
                    <h3 className="f-head">¿Cuál es su perfil?</h3>
                    <div className="f-grid f-grid-2">
                      <FormGroup label="Tipo de usuario" error={errors.perfil} required>
                        <select
                          className="form-select"
                          value={data.perfil}
                          onChange={e => set('perfil', e.target.value)}
                        >
                          <option value="">Seleccione...</option>
                          {PERFILES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                      </FormGroup>

                      <FormGroup label="Área aproximada del predio" error={errors.area} required>
                        <select
                          className="form-select"
                          value={data.area}
                          onChange={e => set('area', e.target.value)}
                        >
                          <option value="">Seleccione...</option>
                          {AREAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                        </select>
                      </FormGroup>

                      <FormGroup label="¿Qué servicio necesita?" error={errors.servicio} required style={{ gridColumn: '1/-1' }}>
                        <div className="service-options">
                          {SERVICIOS_SELECT.map(s => (
                            <label key={s.value} className={`service-option ${data.servicio === s.value ? 'selected' : ''}`}>
                              <input
                                type="radio" name="servicio"
                                value={s.value}
                                checked={data.servicio === s.value}
                                onChange={() => set('servicio', s.value)}
                              />
                              <span>{s.label}</span>
                            </label>
                          ))}
                        </div>
                      </FormGroup>
                    </div>
                    <div className="f-nav"><div /><button type="button" className="btn btn-primary" onClick={next}>Continuar →</button></div>
                  </div>
                )}

                {/* ── STEP 1: Predio ── */}
                {step === 1 && (
                  <div className="form-step">
                    <h3 className="f-head">Datos del predio</h3>
                    <div className="f-grid">
                      <FormGroup label="Ciudad / Municipio" error={errors.ciudad} required>
                        <input
                          type="text" className="form-input"
                          placeholder="Bogotá D.C."
                          value={data.ciudad}
                          onChange={e => set('ciudad', e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup label="Nombre del proyecto (opcional)">
                        <input
                          type="text" className="form-input"
                          placeholder="Ej. Proyecto Parque Norte"
                          value={data.proyecto}
                          onChange={e => set('proyecto', e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup label="Adjuntar polígono del predio (opcional)">
                        <label className="file-upload">
                          {fileLabel ? (
                            <>
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M9 11L12 14L22 4" stroke="#EABD0C" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                              <span className="file-name">{fileLabel}</span>
                              <span className="file-hint">Archivo cargado ✓</span>
                            </>
                          ) : (
                            <>
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="#EABD0C" strokeWidth="1.8" strokeLinecap="round" />
                              </svg>
                              <span className="file-name">Arrastra o haz clic para subir</span>
                              <span className="file-hint">KMZ, KML, SHP — máx. 10MB</span>
                            </>
                          )}
                          <input
                            type="file" accept=".kmz,.kml,.shp"
                            style={{ display: 'none' }}
                            onChange={e => e.target.files[0] && setFileLabel(e.target.files[0].name)}
                          />
                        </label>
                      </FormGroup>
                    </div>
                    <div className="f-nav">
                      <button type="button" className="btn btn-ghost" onClick={prev}>← Atrás</button>
                      <button type="button" className="btn btn-primary" onClick={next}>Continuar →</button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Contacto ── */}
                {step === 2 && (
                  <div className="form-step">
                    <h3 className="f-head">Datos de contacto</h3>
                    <div className="f-grid f-grid-2">
                      <FormGroup label="Nombre completo" error={errors.nombre} required>
                        <input type="text" className="form-input" value={data.nombre} onChange={e => set('nombre', e.target.value)} />
                      </FormGroup>
                      <FormGroup label="WhatsApp / Teléfono" error={errors.telefono} required>
                        <input type="tel" className="form-input" placeholder="+57 300 000 0000" value={data.telefono} onChange={e => set('telefono', e.target.value)} />
                      </FormGroup>
                      <FormGroup label="Empresa" error={errors.empresa} required>
                        <input type="text" className="form-input" value={data.empresa} onChange={e => set('empresa', e.target.value)} />
                      </FormGroup>
                      <FormGroup label="Correo corporativo" error={errors.correo} required>
                        <input type="email" className="form-input" value={data.correo} onChange={e => set('correo', e.target.value)} />
                      </FormGroup>
                    </div>

                    {/* Calendly note */}
                    <div className="cal-block">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#EABD0C" strokeWidth="1.8" />
                        <path d="M16 2V6M8 2V6M3 10H21" stroke="#EABD0C" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      <div>
                        <strong>Agendamiento automático</strong>
                        <p>Al enviar recibirá un enlace para agendar su sesión directamente con el equipo senior de Ferrum.</p>
                      </div>
                    </div>

                    <label className={`check-row ${errors.politica ? 'error' : ''}`}>
                      <input
                        type="checkbox"
                        checked={data.politica}
                        onChange={e => set('politica', e.target.checked)}
                      />
                      <span>
                        Acepto la <a href="#politica">política de tratamiento de datos personales</a> y autorizo el procesamiento de información para el diagnóstico técnico. <span className="req">*</span>
                      </span>
                    </label>
                    {errors.politica && <p className="field-error">{errors.politica}</p>}

                    <div className="f-nav">
                      <button type="button" className="btn btn-ghost" onClick={prev}>← Atrás</button>
                      <button type="submit" className="btn btn-primary">Agendar Diagnóstico Gratuito →</button>
                    </div>
                  </div>
                )}

              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function FormGroup({ label, error, required, children, style }) {
  return (
    <div className="f-group" style={style}>
      <label className="f-label">
        {label}{required && <span className="req"> *</span>}
      </label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

function SuccessScreen({ data }) {
  return (
    <div className="success-screen">
      <div className="success-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 11L12 14L22 4" stroke="#EABD0C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" stroke="#EABD0C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3>¡Solicitud recibida, {data.nombre.split(' ')[0]}!</h3>
      <p>
        El equipo de Ferrum revisará su predio en <strong>máximo 24 horas</strong> y le enviará
        el enlace de agendamiento a <strong>{data.correo}</strong>.
      </p>
      <div className="success-summary">
        <div className="ss-item"><span>Servicio</span><strong>{data.servicio}</strong></div>
        <div className="ss-item"><span>Predio</span><strong>{data.ciudad || '—'}</strong></div>
        <div className="ss-item"><span>Área</span><strong>{data.area}</strong></div>
      </div>
      <p className="success-note">
        ¿Urgente? Escríbenos directamente a{' '}
        <a href="mailto:ferrumglobalsolutions@gmail.com">ferrumglobalsolutions@gmail.com</a>
        {' '}o al{' '}
        <a href="https://wa.me/573227167158" target="_blank" rel="noopener noreferrer">+57 322 716 7158</a>
      </p>
    </div>
  )
}
