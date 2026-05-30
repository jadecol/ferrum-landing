import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'
import './Dupla.css'

export function Dupla() {
  const headerRef = useScrollReveal()

  return (
    <section className="dupla" id="equipo">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">La Dupla Estratégica</span>
          <h2 className="section-title">
            Urbanismo que entiende la tierra.<br />
            <span>Tecnología que resuelve la norma.</span>
          </h2>
          <p className="section-sub">
            Dos perfiles únicos en Colombia, unidos en un solo sistema de inteligencia urbana con tecnología propia.
          </p>
        </div>

        <div className="dupla-grid">
          <DuplaCard
            role="Arquitecto · Gestión Ambiental Urbana"
            name="[Nombre]"
            bio="15 años estructurando macroproyectos con análisis ambiental integrado. Desarrollador de los sistemas propios de Ferrum — combina BIM, modelación paramétrica y automatización en Java, C# y Python para resolver lo que otros no pueden calcular."
            stack={['Java', 'C#', 'Python', 'BIM', 'GIS']}
            tags={['Ferrum OS · Dev Lead', 'Gestión Ambiental']}
            img="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop"
            delay={1}
          />
          <DuplaCard
            role="Urbanista · Especialista Normativa"
            name="Carolina Vélez"
            bio="Urbanista con dominio profundo del ordenamiento territorial colombiano. Alimenta y valida los gemelos digitales POT y NormCore™ con su lectura estratégica de normativa — convirtiendo regulación compleja en decisiones de inversión claras."
            stack={['POT/PBOT/EOT', 'Planes Parciales', 'Normativa Nacional']}
            tags={['Gemelo Digital POT', 'NormCore™']}
            img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop"
            delay={2}
          />
        </div>

        <div className="mensaje-key glass reveal" ref={useScrollReveal()}>
          <p>
            "El mercado tiene arquitectos que diseñan sin entender el ambiente urbano, y urbanistas que conocen la norma pero no saben programar los sistemas que la procesan.{' '}
            <em>En Ferrum, los mismos expertos que consultan construyeron las herramientas.</em>{' '}
            Eso no existe en otro lugar de Colombia."
          </p>
        </div>
      </div>
    </section>
  )
}

function DuplaCard({ role, name, bio, stack, tags, img, delay }) {
  const ref = useScrollReveal()
  return (
    <div className={`dupla-card glass reveal delay-${delay}`} ref={ref}>
      <div className="dupla-img-wrap">
        <img src={img} alt={name} className="dupla-img" loading="lazy" />
        <div className="dupla-tint" aria-hidden="true" />
      </div>
      <div className="dupla-content">
        <span className="dupla-role">{role}</span>
        <h3 className="dupla-name">{name}</h3>
        <p className="dupla-bio">{bio}</p>
        <div className="dupla-stack">
          {stack.map(s => <span className="stack-pill" key={s}>{s}</span>)}
        </div>
        <div className="dupla-tags">
          {tags.map(t => <span className="dupla-tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}
