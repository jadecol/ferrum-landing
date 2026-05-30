import { useEffect } from 'react'
import gsap from 'gsap'

export function useCursor() {
  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Create cursor elements
    const cur = document.createElement('div')
    cur.id = 'ferrum-cursor'

    const ring = document.createElement('div')
    ring.id = 'ferrum-cursor-ring'

    const trail = document.createElement('canvas')
    trail.id = 'ferrum-trail'
    trail.width = window.innerWidth
    trail.height = window.innerHeight

    document.body.append(trail, cur, ring)

    const tc = trail.getContext('2d')
    const pts = []
    let mx = 0, my = 0

    const handleResize = () => {
      trail.width = window.innerWidth
      trail.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mx = e.clientX; my = e.clientY
      pts.push({ x: mx, y: my })
      if (pts.length > 28) pts.shift()
      gsap.to(cur,  { x: mx, y: my, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x: mx, y: my, duration: 0.22, ease: 'power2.out' })
    }

    const handleMouseLeave = () => {
      cur.style.opacity = '0'; ring.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      cur.style.opacity = '1'; ring.style.opacity = '1'
    }

    // Click ripple
    const handleClick = (e) => {
      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        width:6px;height:6px;border-radius:50%;
        background:rgba(234,189,12,.6);pointer-events:none;z-index:8889;
        transform:translate(-50%,-50%);
      `
      document.body.appendChild(ripple)
      gsap.to(ripple, {
        scale: 8, opacity: 0, duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      })
    }

    // Trail animation loop
    let rafId
    const drawTrail = () => {
      rafId = requestAnimationFrame(drawTrail)
      tc.clearRect(0, 0, trail.width, trail.height)
      if (pts.length < 2) return
      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length
        tc.beginPath()
        tc.moveTo(pts[i-1].x, pts[i-1].y)
        tc.lineTo(pts[i].x, pts[i].y)
        tc.strokeStyle = `rgba(234,189,12,${t * 0.16})`
        tc.lineWidth = t * 3
        tc.lineCap = 'round'
        tc.stroke()
      }
    }
    drawTrail()

    // Magnetic effect
    const addMagnet = (selector, intensity = 12) => {
      document.querySelectorAll(selector).forEach(el => {
        const expand = () => { cur.classList.add('expanded'); ring.classList.add('expanded') }
        const contract = () => { cur.classList.remove('expanded'); ring.classList.remove('expanded') }
        const move = (e) => {
          const r = el.getBoundingClientRect()
          const dx = (e.clientX - r.left - r.width / 2) * 0.16
          const dy = (e.clientY - r.top - r.height / 2) * 0.16
          gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
        }
        const leave = () => {
          contract()
          gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.4)' })
        }
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', leave)
      })
    }

    // Apply magnet after short delay to let DOM settle
    const magnetTimer = setTimeout(() => {
      addMagnet('.btn', 10)
      addMagnet('.bento-card', 8)
      addMagnet('.service-card', 8)
      addMagnet('.sys-card', 7)
      addMagnet('.partner-card', 7)
    }, 600)

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('click', handleClick)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(magnetTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('click', handleClick)
      cur.remove(); ring.remove(); trail.remove()
    }
  }, [])
}
