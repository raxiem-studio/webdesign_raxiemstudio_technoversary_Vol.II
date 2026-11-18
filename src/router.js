import { useEffect, useRef, useState } from 'react'

/**
 * Dependency-free pathname router.
 * Same-origin link clicks that change the path are intercepted and pushed to
 * history; hash-only links fall through to native anchor scrolling.
 * Production hosting must rewrite every route to index.html.
 */
/** pageTitle('About', home) → 'About — JEJAK'; no name → the (translated) home title. */
export const pageTitle = (name, homeTitle) => (name ? `${name} — JEJAK` : homeTitle)

const normalise = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

export function usePath() {
  const [path, setPath] = useState(() => normalise(window.location.pathname))

  useEffect(() => {
    const sync = () => setPath(normalise(window.location.pathname))

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest?.('a[href]')
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (normalise(url.pathname) === normalise(window.location.pathname)) return
      event.preventDefault()
      window.history.pushState({}, '', url.pathname + url.search + url.hash)
      sync()
    }

    window.addEventListener('popstate', sync)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', sync)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return path
}

/** Syncs document.title, scroll position and focus after client-side navigation. */
export function usePageChange(path, title, mainRef) {
  const firstRender = useRef(true)

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    // Initial load: the browser already handles hash scrolling and focus.
    if (firstRender.current) {
      firstRender.current = false
      return undefined
    }
    const frame = requestAnimationFrame(() => {
      const target = window.location.hash && document.getElementById(window.location.hash.slice(1))
      // Override global smooth scrolling so a new page doesn't animate from the old offset.
      if (target) {
        target.scrollIntoView({ behavior: 'instant' })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
        mainRef.current?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [path, mainRef])
}
