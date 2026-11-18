import { useEffect, useRef } from 'react'

/**
 * Zoom yang ikut scroll. Menulis --scroll-zoom (1 → max) di elemen ref
 * selama melewati viewport; pemakainya menerapkan lewat `transform: scale()`.
 * Update DOM langsung di rAF supaya tidak re-render. Tidak aktif saat
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
      // 0 saat bagian atas masuk dari bawah viewport, 1 saat bagian bawah keluar dari atas.
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
