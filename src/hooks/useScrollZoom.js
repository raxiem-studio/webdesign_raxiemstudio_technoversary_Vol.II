import { useEffect, useRef } from 'react'

/**
 * Scroll-linked zoom. Writes --scroll-zoom (1 → max) on the ref'd element as
 * it crosses the viewport; consumers apply it with `transform: scale()`.
 * Updates the DOM directly in rAF to avoid re-renders. No-op under
 * prefers-reduced-motion.
 */
export function useScrollZoom(max = 1.15) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the top enters the viewport bottom, 1 when the bottom leaves the top.
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
      node.style.setProperty('--scroll-zoom', (1 + (max - 1) * progress).toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [max])

  return ref
}
