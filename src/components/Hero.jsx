import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../styles/Hero.css'

const SYS_TAGS = [
  { icon: '◎', label: 'Ferrum OS' },
  { icon: '⊞', label: 'POT Engine™' },
  { icon: '≋', label: 'NormCore™' },
  { icon: '◧', label: 'UrbanTwin™' },
  { icon: '{ }', label: 'Java · C# · Python · BIM' },
]

const STATS = [
  { count: 3,   suffix: ' años',  label: 'Empresa constituida y activa' },
  { count: 15,  suffix: '+',      label: 'Años de conocimiento acumulado' },
  { count: 72,  suffix: 'h',      label: 'Debida diligencia completa' },
  { count: 8,   suffix: ' días',  label: 'Documentación técnica BIM' },
]

export default function Hero() {
  const canvasRef   = useRef(null)
  const particleRef = useRef(null)
  const contentRef  = useRef(null)

  // Three.js wireframe mesh
  useEffect(() => {
    let THREE, mesh, renderer, animId
    import('three').then(mod => {
      THREE = mod
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const geo = new THREE.PlaneGeometry(100, 100, 48, 48)
      const mat = new THREE.MeshBasicMaterial({ color: 0xEABD0C, wireframe: true, transparent: true, opacity: 0.12 })
      mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = -Math.PI / 3.1
      mesh.position.y = -14
      scene.add(mesh)
      camera.position.z = 26

      let t = 0
      const animate = () => {
        animId = requestAnimationFrame(animate)
        t += 0.001
        mesh.rotation.z += 0.0003
        const pos = mesh.geometry.attributes.position
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i), y = pos.getY(i)
          pos.setZ(i, Math.sin(x * 0.09 + t) * Math.cos(y * 0.09 + t) * 1.8)
        }
        pos.needsUpdate = true
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    })
    return () => { cancelAnimationFrame(animId); renderer?.dispose() }
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = particleRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId
    const COLORS = ['rgba(234,189,12,', 'rgba(228,152,0,', 'rgba(249,218,27,']
    const N = window.innerWidth < 768 ? 40 : 80
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - .5) * 0.25, vy: (Math.random() - .5) * 0.25,
      a: Math.random() * 0.5 + 0.1,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pSpeed: Math.random() * 0.015 + 0.005,
    }))
    let mx = W / 2, my = H / 2
    const onMove = (e) => {
      mx = e.clientX ?? e.touches?.[0]?.clientX ?? mx
      my = e.clientY ?? e.touches?.[0]?.clientY ?? my
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    const CONNECT_DIST = window.innerWidth < 768 ? 70 : 110
    const draw = () => {
      animId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)
      particles.forEach((p, i) => {
        p.vx += (mx - p.x) * 0.00002; p.vy += (my - p.y) * 0.00002
        p.vx *= 0.992; p.vy *= 0.992
        p.x += p.vx; p.y += p.vy
        p.pulse += p.pSpeed
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const alpha = p.a * (0.65 + 0.35 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c + alpha + ')'
        ctx.fill()
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(234,189,12,${(1 - dist / CONNECT_DIST) * 0.07})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      })
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // GSAP entrance (after intro)
  useEffect(() => {
    const delay = 3.2 // after intro completes
    if (!contentRef.current) return
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay }
    )
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 86, behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      {/* Three.js mesh */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      {/* Particles */}
      <canvas ref={particleRef} className="particle-canvas" aria-hidden="true" />
      {/* Vignette */}
      <div className="hero-vignette" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <div className="container">
        <div className="hero-content" ref={contentRef} style={{ opacity: 0 }}>

          <div className="badge float-anim" style={{ marginBottom: 20 }}>
            <span className="badge-dot" />
            Empresa constituida · +15 años de conocimiento
          </div>

          <h1 className="hero-h1">
            Tus proyectos,<br />
            más <span>rápidos</span><br />
            y seguros.
          </h1>

          <p className="hero-sub">
            Debida diligencia normativa en <strong>máximo 72 horas</strong> y documentación técnica BIM en <strong>máximo 8 días</strong>. Tecnología propia. Resultados que el mercado no puede igualar.
          </p>

          {/* System tags */}
          <div className="sys-tags">
            {SYS_TAGS.map(({ icon, label }) => (
              <div className="sys-tag" key={label}>
                <span className="sys-tag-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('#contacto')}>
              Solicitar Diagnóstico Gratuito
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 11L9 7L5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('#servicios')}>
              Ver Servicios
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats glass">
            {STATS.map(({ count, suffix, label }) => (
              <div className="stat-item" key={label}>
                <div className="stat-num pulse-glow">
                  <CountUp target={count} /><span className="stat-suf">{suffix}</span>
                </div>
                <div className="stat-lbl">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function CountUp({ target }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.unobserve(el)
      gsap.to({ val: 0 }, {
        val: target, duration: 2, ease: 'power2.out',
        delay: 3.5,
        onUpdate() { if (el) el.textContent = Math.round(this.targets()[0].val) }
      })
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>0</span>
}
