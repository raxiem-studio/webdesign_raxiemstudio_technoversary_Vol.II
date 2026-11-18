import { Container } from '../components/index.js'
import { useInView } from '../hooks/useInView.js'
import './ListingPage.css'

/** Listing */
function ListingPage({ id, title, lead, listLabel, items, renderItem }) {
  const [introRef, introIn] = useInView({ threshold: 0 })
  const [gridRef, gridIn] = useInView({ threshold: 0.05 })
  const titleId = `${id}-title`

  return (
    <div className="listing-page">
      <section className="listing-page__intro" aria-labelledby={titleId}>
        <Container size="content">
          <div ref={introRef} className={`listing-page__head${introIn ? ' is-visible' : ''}`}>
            <h1 id={titleId} className="listing-page__title reveal">
              {title}
            </h1>
            <p className="listing-page__lead reveal" style={{ '--reveal-delay': '240ms' }}>
              {lead}
            </p>
          </div>
        </Container>
      </section>

      <section className="listing-page__list" aria-label={listLabel}>
        <Container size="content">
          <ul
            ref={gridRef}
            className={`listing-page__grid${gridIn ? ' is-visible' : ''}`}
            role="list"
          >
            {items.map((item, i) => (
              <li
                key={item.slug}
                className="listing-page__item reveal"
                style={{ '--reveal-delay': `${(i % 3) * 200 + Math.floor(i / 3) * 120}ms` }}
              >
                {renderItem(item)}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  )
}

export default ListingPage
