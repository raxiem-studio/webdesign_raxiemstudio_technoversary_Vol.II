import { useCallback, useEffect, useRef } from 'react'

const DRAG_DEG_PER_PX = 0.22
const MAX_SPEED = 240 // derajat per detik, batas lemparan saat drag dilepas
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Normalisasi sudut ke rentang -180…180. */
const normalize = (deg) => ((((deg + 180) % 360) + 360) % 360) - 180

/**
 * Logika carousel barel 3D: putar otomatis pelan, bisa di-drag (dengan inersia),
 * dan digeser per item lewat keyboard. Semua update ditulis langsung ke DOM di
 * rAF supaya tidak re-render tiap frame.
 *
 * - `frontCount` item terdekat ke depan bisa diklik; sisanya diredupkan.
 * - Berhenti berputar saat di-hover, di-focus, di luar layar, atau `paused`.
 * - prefers-reduced-motion: tanpa putar otomatis, drag tetap jalan.
 */
export function useBarrel({ count, frontCount = 3, autoSpeed = -7, paused = false }) {
  const stageRef = useRef(null)
  const ringRef = useRef(null)
  const itemRefs = useRef([])
  const pausedRef = useRef(paused)
  const state = useRef({
    angle: 0,
    vel: 0,
    dragging: false,
    lastX: 0,
    lastT: 0,
    moved: 0,
    hover: false,
    focus: false,
    visible: false,
    tween: null,
  })
  const step = 360 / count

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  /* Tulis sudut ring, lalu atur opacity dan status "depan" tiap item. */
  const apply = useCallback(() => {
    const st = state.current
    ringRef.current?.style.setProperty('--angle', `${st.angle.toFixed(3)}deg`)
    const dists = itemRefs.current.map((_, i) => Math.abs(normalize(i * step + st.angle)))
    const front = new Set(
      dists
        .map((d, i) => [d, i])
        .sort((a, b) => a[0] - b[0])
        .slice(0, frontCount)
        .map(([, i]) => i),
    )
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const d = dists[i]
      // Tiga foto depan penuh; makin ke belakang memudar sampai 40%, tidak hilang.
      const opacity = d <= 60 ? 1 : 0.4 + 0.6 * Math.min(Math.max((110 - d) / 50, 0), 1)
      el.style.opacity = opacity.toFixed(3)
      const isFront = front.has(i)
      if (el.dataset.front !== String(isFront)) {
        el.dataset.front = String(isFront)
        const button = el.firstElementChild
        if (button) {
          button.tabIndex = isFront ? 0 : -1
          button.setAttribute('aria-hidden', isFront ? 'false' : 'true')
        }
      }
    })
  }, [frontCount, step])

  /* Loop animasi: tween keyboard > drag > putar otomatis dengan easing kecepatan. */
  useEffect(() => {
    const reduced = prefersReducedMotion()
    let frame
    let last = performance.now()
    const tick = (now) => {
      const st = state.current
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (st.tween) {
        const p = Math.min((now - st.tween.start) / st.tween.duration, 1)
        const eased = 1 - (1 - p) ** 3
        st.angle = st.tween.from + (st.tween.to - st.tween.from) * eased
        st.vel = 0
        if (p === 1) st.tween = null
      } else if (!st.dragging) {
        const idle = reduced || pausedRef.current || st.hover || st.focus || !st.visible
        const target = idle ? 0 : autoSpeed
        st.vel += (target - st.vel) * (1 - Math.exp(-dt * 1.5))
        st.angle += st.vel * dt
      }
      if (st.visible) apply()
      frame = requestAnimationFrame(tick)
    }
    apply()
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [apply, autoSpeed])

  /* Berhenti kerja saat section di luar layar. */
  useEffect(() => {
    const node = stageRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      state.current.visible = true
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      state.current.visible = entry.isIntersecting
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /* Drag: listener di window supaya klik pada tombol tetap sampai ke tombolnya. */
  useEffect(() => {
    const onMove = (event) => {
      const st = state.current
      if (!st.dragging) return
      const now = performance.now()
      const dx = event.clientX - st.lastX
      const delta = dx * DRAG_DEG_PER_PX
      st.angle += delta
      const instant = delta / (Math.max(now - st.lastT, 8) / 1000)
      st.vel = st.vel * 0.4 + instant * 0.6
      st.moved += Math.abs(dx)
      st.lastX = event.clientX
      st.lastT = now
    }
    const onUp = () => {
      const st = state.current
      if (!st.dragging) return
      st.dragging = false
      stageRef.current?.classList.remove('is-dragging')
      if (performance.now() - st.lastT > 120) st.vel = 0
      st.vel = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, st.vel))
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  const stageProps = {
    onPointerDown: (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      const st = state.current
      st.dragging = true
      st.tween = null
      st.vel = 0
      st.moved = 0
      st.lastX = event.clientX
      st.lastT = performance.now()
      event.currentTarget.classList.add('is-dragging')
    },
    onPointerEnter: (event) => {
      if (event.pointerType === 'mouse') state.current.hover = true
    },
    onPointerLeave: (event) => {
      if (event.pointerType === 'mouse') state.current.hover = false
    },
    onFocus: () => {
      state.current.focus = true
    },
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) state.current.focus = false
    },
  }

  /** True kalau gerakan terakhir adalah drag, jadi klik tidak membuka foto. */
  const wasDragged = () => state.current.moved > 6

  /** Geser satu item ke kiri (-1) atau kanan (1); mengembalikan index yang jadi pusat. */
  const nudge = (dir) => {
    const st = state.current
    const base = Math.round(st.angle / step) * step
    st.tween = { from: st.angle, to: base - dir * step, start: performance.now(), duration: 700 }
    const center = Math.round(-(base - dir * step) / step)
    return ((center % count) + count) % count
  }

  /** Callback ref untuk item ke-i. */
  const setItemRef = (i) => (el) => {
    itemRefs.current[i] = el
  }

  /** Focus tombol di item ke-i (dipakai setelah geser pakai keyboard). */
  const focusItem = (i) => itemRefs.current[i]?.firstElementChild?.focus()

  return { stageRef, ringRef, setItemRef, focusItem, stageProps, wasDragged, nudge }
}
