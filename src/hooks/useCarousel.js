import { useCallback, useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Prev/next controls for a native scroll-snap track.
 * Steps by one item (measured from `itemSelector`) and reports whether either
 * end has been reached. Scrolls instantly under prefers-reduced-motion.
 */
export function useCarousel(itemSelector, itemCount) {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(itemCount > 1)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const update = () => {
      const max = track.scrollWidth - track.clientWidth
      setCanPrev(track.scrollLeft > 4)
      setCanNext(track.scrollLeft < max - 4)
    }

    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [itemCount])

  const scrollByItem = useCallback(
    (direction) => {
      const track = trackRef.current
      if (!track) return
      const item = track.querySelector(itemSelector)
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0
      const step = item ? item.getBoundingClientRect().width + gap : track.clientWidth * 0.8
      track.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    },
    [itemSelector],
  )

  return { trackRef, canPrev, canNext, scrollByItem }
}
