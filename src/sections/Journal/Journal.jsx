import {
  ArticleCard,
  Button,
  CarouselControls,
  Container,
  SectionHeader,
} from '../../components/index.js'
import { ARTICLES } from '../../data/articles.js'
import { useLanguage } from '../../i18n/context.js'
import { useCarousel } from '../../hooks/useCarousel.js'
import { useInView } from '../../hooks/useInView.js'
import './Journal.css'

/** Jurnal */
function Journal({ articles = ARTICLES }) {
  const { t } = useLanguage()
  const { trackRef, canPrev, canNext, scrollByItem } = useCarousel(
    '.journal__item',
    articles.length,
  )
  const [revealRef, revealIn] = useInView()

  return (
    <section id="journal" className="section journal" aria-labelledby="journal-title">
      <Container size="content">
        <div ref={revealRef} className={revealIn ? 'is-visible' : undefined}>
          <div className="journal__header">
            <SectionHeader
              title={t('journal.title')}
              titleId="journal-title"
              rule={false}
              titleWeight="medium"
              className="journal__heading reveal"
            />
            <div className="journal__all reveal" style={{ '--reveal-delay': '120ms' }}>
              <Button href="/journal" variant="text" className="link-draw">
                {t('journal.viewAll')}
              </Button>
            </div>
          </div>
          <ul ref={trackRef} className="journal__track" role="list" aria-label={t('journal.list')}>
            {articles.map((article, i) => (
              <li
                key={article.slug}
                className="journal__item reveal"
                style={{ '--reveal-delay': `${200 + Math.min(i, 3) * 180}ms` }}
              >
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
          <CarouselControls
            className="journal__controls reveal"
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => scrollByItem(-1)}
            onNext={() => scrollByItem(1)}
            labels={{ prev: t('journal.prev'), next: t('journal.next') }}
          />
        </div>
      </Container>
    </section>
  )
}

export default Journal
