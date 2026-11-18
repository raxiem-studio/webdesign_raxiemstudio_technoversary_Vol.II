import { Button, Container, DestinationCard } from '../components/index.js'
import { DESTINATIONS } from '../data/destinations.js'
import { useInView } from '../hooks/useInView.js'
import { useLanguage } from '../i18n/context.js'
import './DestinationDetail.css'

function Photo({ image, className, eager = false, ...rest }) {
  const { pick } = useLanguage()
  return (
    <figure className={className} {...rest}>
      <img
        src={image.src}
        alt={pick(image.alt)}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
      />
    </figure>
  )
}

/** Bungkus children dalam container `.reveal` yang dipicu scroll. */
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`${className}${inView ? ' is-visible' : ''}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Halaman destinasi untuk /destinations/:slug. Kalau belum ada panduan, tampilkan catatan "segera hadir". */
function DestinationDetail({ destination }) {
  const { t, pick } = useLanguage()
  const { image, detail } = destination
  const name = pick(destination.name)
  const others = DESTINATIONS.filter((d) => d.slug !== destination.slug).slice(0, 3)

  return (
    <div className="destination-page">
      <Container size="content">
        <Reveal as="header" className="destination-page__header">
          <div className="destination-page__intro">
            <p className="destination-page__region reveal">
              {pick(destination.region)}
            </p>
            <h1 className="destination-page__title reveal" style={{ '--reveal-delay': '200ms' }}>
              {name}
            </h1>
            <p className="destination-page__lead reveal" style={{ '--reveal-delay': '320ms' }}>
              {pick(detail?.lead ?? destination.description)}
            </p>
          </div>
          <Photo
            image={image}
            className="destination-page__hero reveal"
            eager
          />
        </Reveal>

        {detail ? (
          <>
            <Reveal as="section" className="destination-page__section destination-page__split" aria-labelledby="dest-overview">
              <h2 id="dest-overview" className="destination-page__heading reveal">
                {t('destination.overview')}
              </h2>
              <div className="destination-page__prose">
                {pick(detail.overview).map((paragraph, i) => (
                  <p key={paragraph} className="reveal" style={{ '--reveal-delay': `${200 + i * 200}ms` }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal as="section" className="destination-page__section" aria-labelledby="dest-highlights">
              <h2 id="dest-highlights" className="destination-page__heading reveal">
                {t('destination.highlights')}
              </h2>
              <ol className="destination-page__highlights" role="list">
                {detail.highlights.map((item, i) => (
                  <li
                    key={item.title.en}
                    className="destination-page__highlight reveal"
                    style={{ '--reveal-delay': `${200 + i * 200}ms` }}
                  >
                    <span className="destination-page__number" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="destination-page__highlight-title">{pick(item.title)}</h3>
                    <p className="destination-page__highlight-text">{pick(item.text)}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal as="section" className="destination-page__section destination-page__split" aria-labelledby="dest-tips">
              <h2 id="dest-tips" className="destination-page__heading reveal">
                {t('destination.tips')}
              </h2>
              <ul className="destination-page__tips" role="list">
                {pick(detail.tips).map((tip, i) => (
                  <li key={tip} className="destination-page__tip reveal" style={{ '--reveal-delay': `${160 + i * 140}ms` }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="destination-page__section destination-page__gallery">
              {detail.gallery.map((photo, i) => (
                <Photo
                  key={photo.src}
                  image={photo}
                  className="destination-page__gallery-item reveal"
                  style={{ '--reveal-delay': `${i * 200}ms` }}
                />
              ))}
            </Reveal>
          </>
        ) : (
          <Reveal as="section" className="destination-page__section destination-page__soon">
            <p className="reveal">
              {t('destination.soon', { name })}
            </p>
          </Reveal>
        )}

        <Reveal as="section" className="destination-page__section" aria-labelledby="dest-more">
          <div className="detail-more__header">
            <h2 id="dest-more" className="detail-more__title reveal">
              {t('destination.more')}
            </h2>
            <div className="reveal" style={{ '--reveal-delay': '120ms' }}>
              <Button href="/destinations" variant="text" className="link-draw">
                {t('destination.all')}
              </Button>
            </div>
          </div>
          <ul className="destination-page__more" role="list">
            {others.map((other, i) => (
              <li key={other.slug} className="reveal" style={{ '--reveal-delay': `${200 + i * 200}ms` }}>
                <DestinationCard destination={other} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  )
}

export default DestinationDetail
