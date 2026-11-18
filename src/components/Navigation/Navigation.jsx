import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { LANGUAGES, useLanguage } from '../../i18n/context.js'
import Button from '../Button/Button.jsx'
import Container from '../Container/Container.jsx'
import './Navigation.css'

/**
 * EN / ID toggle. Typeset like the nav links (inherits their colour over the
 * hero); the active language is Medium, the other is dimmed.
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
 * Primary navigation: inline links on desktop, full-screen menu below it.
 * @param {Array<{label: string, href: string, current?: boolean}>} props.links
 *   `current` only seeds the initial state; scroll spy takes over after mount.
 * @param {{label: string, href: string, variant?: string}} [props.cta]
 * @param {boolean} [props.inverse]  Transparent over the hero, solid once past it.
 * @param {string}  [props.path]     Current route; re-runs scroll spy on navigation.
 * @param {boolean} [props.noActive] Mark no link as current (e.g. on the 404 page).
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

  // Derives scrolled / past-hero state and the active link from scroll position.
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

      // Only links to the current route participate. Page links (no hash) are
      // active for the route and its sub-routes; section links once their
      // section has passed under the bar.
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

  // While open: Esc closes, body scroll is locked, focus moves into the menu and back.
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

  // Auto-close when resized past the desktop breakpoint.
  useEffect(() => {
    if (!open) return undefined
    // Keep in sync with the desktop breakpoint in Navigation.css.
    const mq = window.matchMedia('(min-width: 1280px)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [open])

  const ctaVariant = cta?.variant ?? 'primary'

  // Transparent at the top of the hero, frosted once scrolled, solid past it or while the menu is open.
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
