import { Button, Container } from '../../components/index.js'
import { images } from '../../data/images.js'
import { useLanguage } from '../../i18n/context.js'
import './Hero.css'

/** Hero */
function Hero() {
  const { t, pick } = useLanguage()
  const photo = images.heroPatiRicefield

  return (
    <section id="top" className="hero on-dark" aria-labelledby="hero-title">
      <figure className="hero__media">
        <img
          className="hero__image"
          src={photo.src}
          alt={pick(photo.alt)}
          width={photo.width}
          height={photo.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <span className="hero__scrim" aria-hidden="true" />
      </figure>

      <Container size="content" className="hero__inner">
        <h1 id="hero-title" className="hero__title display-xl">
          <span className="hero__line">
            <span className="hero__light">{t('hero.lightA')}</span> {t('hero.boldA')}
          </span>
          <span className="hero__line hero__line--nowrap">
            <span className="hero__light">{t('hero.lightB')}</span> {t('hero.boldB')}
          </span>
        </h1>

        <div className="hero__content">
          <p className="hero__lead">{t('hero.lead')}</p>
          <Button href="#destinations" size="lg" variant="glass" className="hero__cta">
            {t('hero.cta')}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default Hero
