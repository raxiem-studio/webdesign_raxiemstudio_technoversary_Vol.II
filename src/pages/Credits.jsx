import { Container } from '../components/index.js'
import { PHOTO_CREDITS } from '../data/credits.js'
import { useLanguage } from '../i18n/context.js'
import ListingPage from './ListingPage.jsx'
import './Credits.css'

/** /credits: atribusi foto berlisensi CC (link dari footer). */
function Credits() {
  const { t, pick } = useLanguage()
  return (
    <>
      <ListingPage
        id="credits-page"
        title={t('credits.title')}
        lead={t('credits.lead')}
        listLabel={t('credits.list')}
        items={PHOTO_CREDITS}
        renderItem={(credit) => (
          <figure className="credit">
            <img
              className="credit__image"
              src={credit.image.src}
              alt={pick(credit.image.alt)}
              width={credit.image.width}
              height={credit.image.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="credit__caption">
              <span className="credit__title">{pick(credit.title)}</span>
              <span>
                {t('credits.by', { author: credit.author })} ·{' '}
                <a href={credit.source} target="_blank" rel="noopener noreferrer">
                  Wikimedia Commons
                </a>{' '}
                ·{' '}
                <a href={credit.license.url} target="_blank" rel="noopener noreferrer">
                  {credit.license.name}
                </a>
              </span>
            </figcaption>
          </figure>
        )}
      />
      <Container size="content">
        <p className="credits-note">{t('credits.other')}</p>
      </Container>
    </>
  )
}

export default Credits
