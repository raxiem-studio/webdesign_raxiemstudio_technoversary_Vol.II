import { Container, SectionHeader } from '../../components/index.js'
import { useInView } from '../../hooks/useInView.js'
import { GALLERY_ITEMS } from '../../data/gallery.js'
import { useLanguage } from '../../i18n/context.js'
import './Gallery.css'

/** Galeri */
function Gallery({ items = GALLERY_ITEMS }) {
  const { t, pick } = useLanguage()
  const [gridRef, visible] = useInView()
  const [headerRef, headerIn] = useInView()

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <Container size="content">
        <div ref={headerRef} className={headerIn ? 'is-visible' : undefined}>
          <SectionHeader
            title={t('gallery.title')}
            titleId="gallery-title"
            align="center"
            rule={false}
            titleWeight="medium"
            className="reveal"
          />
        </div>
        <ul ref={gridRef} className={`gallery__grid${visible ? ' is-visible' : ''}`} role="list">
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`gallery__item gallery__item--${item.area}`}
              style={{ '--i': i }}
            >
              <figure className="gallery__figure">
                <img
                  src={item.image.src}
                  alt={pick(item.image.alt)}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="visually-hidden">{pick(item.caption)}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default Gallery
