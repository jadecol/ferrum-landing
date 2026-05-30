import { useEffect } from 'react'
import { useCursor } from './hooks/useCursor'
import { useIntro }  from './hooks/useIntro'
import Header    from './components/Header'
import Hero      from './components/Hero'
import { Dupla } from './components/Dupla'
import Servicios from './components/Servicios'
import FerrumOS  from './components/FerrumOS'
import Formulario from './components/Formulario'
import Footer    from './components/Footer'

export default function App() {
  useIntro()
  useCursor()

  // GSAP ScrollTrigger reveal for all .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('up')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    // Observe after a tick so components have mounted
    const id = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }, 100)
    return () => { clearTimeout(id); observer.disconnect() }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Dupla />
        <FerrumOS />
        <Formulario />
      </main>
      <Footer />
    </>
  )
}
