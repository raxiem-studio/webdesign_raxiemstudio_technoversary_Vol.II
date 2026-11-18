import { useEffect, useState } from 'react'
import { Container, SectionHeader } from '../../components/index.js'
import { IMPACT_PANELS, IMPACT_STATS, TRAVEL_THEMES } from '../../data/impact.js'
import { useInView } from '../../hooks/useInView.js'
import { useLanguage } from '../../i18n/context.js'
import './ResponsibleTravel.css'

function QuoteIcon() {
  return (
    <svg className="impact-panel__quote" width="36" height="41" viewBox="0 0 44.625 51" fill="currentColor" aria-hidden="true">
      <path d="M44.625 29.4844C44.625 36.0885 39.276 41.4375 32.6719 41.4375H31.875C30.1119 41.4375 28.6875 40.0131 28.6875 38.25C28.6875 36.4869 30.1119 35.0625 31.875 35.0625H32.6719C35.7498 35.0625 38.25 32.5623 38.25 29.4844V28.6875H31.875C28.3588 28.6875 25.5 25.8287 25.5 22.3125V15.9375C25.5 12.4213 28.3588 9.5625 31.875 9.5625H38.25C41.7662 9.5625 44.625 12.4213 44.625 15.9375V29.4844ZM19.125 29.4844C19.125 36.0885 13.776 41.4375 7.17188 41.4375H6.375C4.61191 41.4375 3.1875 40.0131 3.1875 38.25C3.1875 36.4869 4.61191 35.0625 6.375 35.0625H7.17188C10.2498 35.0625 12.75 32.5623 12.75 29.4844V28.6875H6.375C2.85879 28.6875 0 25.8287 0 22.3125V15.9375C0 12.4213 2.85879 9.5625 6.375 9.5625H12.75C16.2662 9.5625 19.125 12.4213 19.125 15.9375V29.4844Z" />
    </svg>
  )
}

function PanelImage({ image }) {
  const { pick } = useLanguage()
  return (
    <img
      className="impact-panel__image"
      src={image.src}
      alt={pick(image.alt)}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
    />
  )
}

const COUNT_DURATION_MS = 1800
const easeOutCubic = (t) => 1 - (1 - t) ** 3

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Animates 0 → stat.value once `start` is true, formatted for the active
 * language (6,262 / 6.262; 29.9 / 29,9). Screen readers get the final value
 * immediately; the animated digits are aria-hidden.
 */
function CountUp({ stat, start, delay = 0 }) {
  const { pick, formatNumber } = useLanguage()
  const reduced = prefersReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start || reduced) return undefined
    let frame
    const timer = setTimeout(() => {
      const began = performance.now()
      const tick = (now) => {
        const t = Math.min((now - began) / COUNT_DURATION_MS, 1)
        setCurrent(stat.value * easeOutCubic(t))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [start, stat.value, delay, reduced])

  const suffix = pick(stat.suffix)
  const shown = reduced ? stat.value : current

  return (
    <>
      <span aria-hidden="true">
        {formatNumber(shown, stat.decimals)}
        {suffix}
      </span>
      <span className="visually-hidden">{`${formatNumber(stat.value, stat.decimals)}${suffix}`}</span>
    </>
  )
}

/** Renders a neutral placeholder when `value` is null, so unverified figures are never shown. */
function ImpactStat({ stat, index, start }) {
  const { t, pick } = useLanguage()
  const pending = stat.value == null
  return (
    <li
      className={`impact-stat reveal${pending ? ' impact-stat--pending' : ''}`}
      style={{ '--reveal-delay': `${index * 160}ms` }}
    >
      <p className="impact-stat__value display-xl">
        {pending ? (
          <>
            <span aria-hidden="true">—</span>
            <span className="visually-hidden">{t('impact.pending')}</span>
          </>
        ) : (
          <CountUp stat={stat} start={start} delay={index * 160} />
        )}
      </p>
      <p className="impact-stat__label">{pick(stat.label)}</p>
    </li>
  )
}

/** Home: responsible-travel panels and sourced impact statistics. */
function ResponsibleTravel() {
  const { lang, t, pick } = useLanguage()
  const { quote, photo, themes } = IMPACT_PANELS
  const quoteText = quote.text[lang]
  const titleLines = themes.titleLines[lang]
  const [headerRef, headerIn] = useInView()
  const [panelsRef, panelsIn] = useInView()
  const [statsRef, statsIn] = useInView({ threshold: 0.4 })
  const sources = IMPACT_STATS.filter((stat) => stat.source)
    .map((stat) => pick(stat.source))
    .join(' · ')

  return (
    <section
      id="responsible-travel"
      className="section responsible"
      aria-labelledby="responsible-title"
    >
      <Container size="content">
        <div ref={headerRef} className={`responsible__header${headerIn ? ' is-visible' : ''}`}>
          <SectionHeader
            rule={false}
            title={t('responsible.title')}
            titleId="responsible-title"
            titleWeight="medium"
            className="responsible__heading reveal"
          />
          <p className="responsible__lead reveal" style={{ '--reveal-delay': '160ms' }}>
            {t('responsible.lead')}
          </p>
        </div>

        <div ref={panelsRef} className={`responsible__panels${panelsIn ? ' is-visible' : ''}`}>
          <div className="impact-panel impact-panel--quote on-dark reveal">
            <PanelImage image={quote.image} />
            <span className="impact-panel__scrim" aria-hidden="true" />
            <blockquote className="impact-panel__content">
              <QuoteIcon />
              <p>
                {quoteText.lead}
                <strong>{quoteText.emphasisA}</strong>
                {quoteText.middle}
                <strong>{quoteText.emphasisB}</strong>
                {quoteText.tail}
              </p>
            </blockquote>
          </div>

          <div
            className="impact-panel impact-panel--photo reveal"
            style={{ '--reveal-delay': '180ms' }}
          >
            <PanelImage image={photo.image} />
          </div>

          <div
            className="impact-panel impact-panel--themes on-dark reveal"
            style={{ '--reveal-delay': '360ms' }}
          >
            <PanelImage image={themes.image} />
            <span className="impact-panel__scrim" aria-hidden="true" />
            <div className="impact-panel__content">
              <div className="impact-panel__intro">
                <h3 className="impact-panel__title">
                  {titleLines.map((line, i) => (
                    <span key={line} className="impact-panel__title-line">
                      {line}
                      {i < titleLines.length - 1 && ' '}
                    </span>
                  ))}
                </h3>
                <p className="impact-panel__description">{pick(themes.description)}</p>
              </div>
              <ol className="impact-panel__themes" role="list">
                {TRAVEL_THEMES.map((theme) => (
                  <li key={theme.number} className="impact-panel__theme">
                    <span>{pick(theme.label)}</span>
                    <span className="impact-panel__theme-number" aria-hidden="true">
                      {String(theme.number).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div id="impact" className="impact" aria-labelledby="impact-title">
          <h3 id="impact-title" className="visually-hidden">
            {t('impact.title')}
          </h3>
          <ul ref={statsRef} className={`impact__stats${statsIn ? ' is-visible' : ''}`} role="list">
            {IMPACT_STATS.map((stat, i) => (
              <ImpactStat key={stat.id} stat={stat} index={i} start={statsIn} />
            ))}
          </ul>
          {sources && (
            <p className="impact__sources">
              {t('impact.sources')}: {sources}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}

export default ResponsibleTravel
