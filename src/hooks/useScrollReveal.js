import { useEffect, useRef } from 'react'

/**
 * useScrollReveal
 * Adds the 'up' class when the element enters the viewport.
 * CSS handles the actual transition (opacity + translateY).
 */
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('up')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

/**
 * useStaggerReveal
 * Reveals a container + triggers stagger on its children.
 */
export function useStaggerReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
