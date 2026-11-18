import { Fragment } from 'react'
import { CarouselControls, Container, DestinationCard, SectionHeader } from '../../components/index.js'
import { DESTINATIONS } from '../../data/destinations.js'
import { useLanguage } from '../../i18n/context.js'
import { useCarousel } from '../../hooks/useCarousel.js'
import { useInView } from '../../hooks/useInView.js'
import './FeaturedDestinations.css'

/* Desktop line breaks of the section title, per language. */
const TITLE_LINES = {
  en: ['Nature speaks through', 'the hands of its', 'guardians'],
  id: ['Alam bercerita', 'lewat tangan', 'para penjaganya'],
}

/** Home: featured destinations carousel (native scroll-snap + prev/next controls). */
function FeaturedDestinations({ destinations = DESTINATIONS }) {
  const { lang, t } = useLanguage()
  const { trackRef, canPrev, canNext, scrollByItem } = useCarousel(
    '.destinations__item',
    destinations.length,
  )
  const [revealRef, revealIn] = useInView()

  return (
    <section id="destinations" className="section destinations" aria-labelledby="destinations-title">
      <Container
        ref={revealRef}
        size="content"
        className={`destinations__inner${revealIn ? ' is-visible' : ''}`}
      >
        <div className="destinations__aside">
          <SectionHeader
            rule={false}
            title={TITLE_LINES[lang].map((line, i) => (
              // Explicit spaces: the <br>s are display:none below tablet.
              <Fragment key={line}>
                {i > 0 && (
                  <>
                    {' '}
                    <br className="destinations__br" />
                  </>
                )}
                {line}
              </Fragment>
            ))}
            titleId="destinations-title"
            className="destinations__header reveal"
          />
          <CarouselControls
            className="destinations__controls reveal"
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => scrollByItem(-1)}
            onNext={() => scrollByItem(1)}
            labels={{ prev: t('destinations.prev'), next: t('destinations.next') }}
            style={{ '--reveal-delay': '160ms' }}
          />
        </div>

        <ul ref={trackRef} className="destinations__track" role="list" aria-label={t('destinations.list')}>
          {destinations.map((destination, i) => (
            <li
              key={destination.slug}
              className="destinations__item reveal"
              style={{ '--reveal-delay': `${300 + Math.min(i, 3) * 200}ms` }}
            >
              <DestinationCard destination={destination} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default FeaturedDestinations
