import { useEffect } from 'react'
import gsap from 'gsap'

export function useIntro() {
  useEffect(() => {
    // Build overlay DOM
    const overlay = document.createElement('div')
    overlay.id = 'intro-overlay'

    overlay.innerHTML = `
      <div id="intro-logo" style="display:flex;flex-direction:column;align-items:center;gap:0;opacity:0;transform:scale(0.85)">
        <div style="position:relative;display:inline-block">
          <span class="intro-logo-text">FERRUM</span>
          <span class="intro-bracket-v"></span>
          <span class="intro-bracket-h"></span>
        </div>
        <div class="intro-sub">Global Solutions</div>
      </div>
      <div class="intro-scan"></div>
      <div class="intro-bar"></div>
    `
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        overlay.remove()
      }
    })

    tl
      .to('.intro-scan',   { y: '100vh', duration: 0.9, ease: 'power2.inOut' })
      .to('#intro-logo',   { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.3')
      .to('.intro-bracket-v', { scaleY: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .to('.intro-bracket-h', { scaleX: 1, duration: 0.3, ease: 'power2.out' }, '-=0.05')
      .to('.intro-sub',    { opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to('.intro-bar',    { width: '100%', duration: 0.85, ease: 'power2.inOut' })
      .to('.intro-scan',   { y: '200vh', duration: 0.6, ease: 'power2.in' }, '-=0.3')
      .to(overlay,         { yPercent: -100, duration: 0.8, ease: 'power3.inOut' })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
      overlay.remove()
    }
  }, [])
}
