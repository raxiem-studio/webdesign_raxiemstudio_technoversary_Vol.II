import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { LANGUAGES, useLanguage } from '../../i18n/context.js'
import Button from '../Button/Button.jsx'
import Container from '../Container/Container.jsx'
import './Navigation.css'

/**
 * Toggle EN / ID. Tipografinya sama dengan link nav (ikut warnanya di atas
 * hero); bahasa aktif Medium, yang lain diredupkan.
 */
function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div className="nav__lang" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((option, i) => (
        <Fragment key={option.code}>
          {i > 0 && (
            <span className="nav__lang-divider" aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            className="nav__lang-option"
            lang={option.code}
            aria-pressed={lang === option.code}
            onClick={() => setLang(option.code)}
          >
            {option.label}
            <span className="visually-hidden"> {option.name}</span>
          </button>
        </Fragment>
      ))}
    </div>
  )
}

/**
 * Navigasi utama: link inline di desktop, menu layar penuh di bawahnya.
 * @param {Array<{label: string, href: string, current?: boolean}>} props.links
 *   `current` cuma nilai awal; setelah mount diambil alih scroll spy.
 * @param {{label: string, href: string, variant?: string}} [props.cta]
 * @param {boolean} [props.inverse]  Transparan di atas hero, solid setelah melewatinya.
 * @param {string}  [props.path]     Route aktif; scroll spy dijalankan ulang tiap pindah halaman.
 * @param {boolean} [props.noActive] Tidak ada link yang ditandai aktif (mis. di halaman 404).
 */
function Navigation({ brand = 'JEJAK', links = [], cta, inverse = false, path, noActive = false }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(!inverse)
  const [activeHref, setActiveHref] = useState(() => links.find((link) => link.current)?.href ?? null)
  const menuId = useId()
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  // Hitung status scrolled / lewat hero dan link aktif dari posisi scroll.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const navHeight = document.querySelector('.nav')?.offsetHeight ?? 0
      setScrolled(y > 0)

      if (inverse) {
        const hero = document.getElementById('top')
        const limit = hero ? hero.offsetTop + hero.offsetHeight : 0
        setPastHero(hero ? y + navHeight >= limit : true)
      } else {
        setPastHero(true)
      }

      // Hanya link ke route yang sedang aktif yang dihitung. Link halaman (tanpa hash)
      // aktif untuk route itu dan sub-route-nya; link section aktif setelah
      // section-nya lewat di bawah navbar.
      const here = window.location.pathname
      let current = null
      for (const link of links) {
        const url = new URL(link.href, window.location.href)
        if (url.origin !== window.location.origin) continue
        if (!url.hash) {
          if (url.pathname === here || here.startsWith(`${url.pathname}/`)) current = link.href
          continue
        }
        if (url.pathname !== here) continue
        const target = document.getElementById(url.hash.slice(1))
        if (!target) continue
        const top = target.getBoundingClientRect().top + y
        if (top - navHeight - 1 <= y) current = link.href
      }
      setActiveHref(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [inverse, links, path])

  // Saat terbuka: Esc menutup, scroll body dikunci, focus masuk ke menu lalu kembali.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const toggle = toggleRef.current
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      toggle?.focus()
    }
  }, [open])

  // Tutup otomatis kalau layar diperlebar melewati breakpoint desktop.
  useEffect(() => {
    if (!open) return undefined
    // Samakan dengan breakpoint desktop di Navigation.css.
    const mq = window.matchMedia('(min-width: 1280px)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [open])

  const ctaVariant = cta?.variant ?? 'primary'

  // Transparan di atas hero, buram setelah di-scroll, solid setelah lewat hero atau saat menu terbuka.
  const overHero = inverse && !open && !pastHero
  const classes = [
    'nav',
    overHero && 'nav--inverse on-dark',
    overHero && scrolled && 'nav--glass',
    scrolled && 'is-scrolled',
    open && 'is-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes}>
      <Container size="full" className="nav__inner">
        <a href="/#top" className="nav__brand" aria-label={t('nav.home')}>
          {brand}
        </a>

        <nav className="nav__desktop" aria-label={t('nav.main')}>
          <ul className="nav__list" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav__link"
                  aria-current={!noActive && link.href === activeHref ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <LanguageSwitch />
          {cta && (
            <Button href={cta.href} size="sm" variant={ctaVariant} className="nav__cta">
              {cta.label}
            </Button>
          )}
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="visually-hidden">{open ? t('nav.closeMenu') : t('nav.openMenu')}</span>
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      <nav id={menuId} className="nav__mobile" aria-label={t('nav.mainMobile')} hidden={!open}>
        <ul className="nav__mobile-list" role="list">
          {links.map((link, i) => (
            <li key={link.href} className="nav__mobile-item" style={{ '--i': i }}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                className="nav__mobile-link"
                aria-current={!noActive && link.href === activeHref ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {cta && (
          <div className="nav__mobile-cta">
            <Button href={cta.href} size="lg" variant={ctaVariant} className="nav__mobile-button" onClick={() => setOpen(false)}>
              {cta.label}
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navigation
