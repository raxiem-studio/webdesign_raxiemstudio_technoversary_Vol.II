import { ArticleCard, Button, Container } from '../components/index.js'
import { CalendarIcon, ClockIcon } from '../components/Icons/Icons.jsx'
import { ARTICLES } from '../data/articles.js'
import { useInView } from '../hooks/useInView.js'
import { useLanguage } from '../i18n/context.js'
import './ArticleDetail.css'

/** Wraps children in a scroll-triggered `.reveal` container. */
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`${className}${inView ? ' is-visible' : ''}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Story page for /journal/:slug. Falls back to a "coming soon" note when the article has no body. */
function ArticleDetail({ article }) {
  const { t, pick, formatDate } = useLanguage()
  const { date, readingMinutes, image, body } = article
  const others = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <div className="article-page">
      <Container size="content">
        <Reveal as="header" className="article-page__header">
          <p className="article-page__category reveal">
            {pick(article.category)}
          </p>
          <h1 className="article-page__title reveal" style={{ '--reveal-delay': '200ms' }}>
            {pick(article.title)}
          </h1>
          <p className="article-page__meta reveal" style={{ '--reveal-delay': '300ms' }}>
            <span className="article-page__meta-item">
              <CalendarIcon size={16} />
              <time dateTime={date}>{formatDate(date)}</time>
            </span>
            <span className="article-page__meta-item">
              <ClockIcon size={16} />
              <span>{t('card.readingTime', { n: readingMinutes })}</span>
            </span>
          </p>
        </Reveal>

        <Reveal>
          <figure className="article-page__hero reveal">
            <img
              src={image.src}
              alt={pick(image.alt)}
              width={image.width}
              height={image.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </Reveal>

        {/* Two-column body spanning the hero's width: headings left, copy right. */}
        <div className="article-page__body">
          <Reveal className="article-page__row">
            <p className="article-page__lead reveal">{pick(body?.lead ?? article.excerpt)}</p>
          </Reveal>

          {body ? (
            body.sections.map((section) => (
              <Reveal as="section" key={section.heading.en} className="article-page__row">
                <h2 className="article-page__heading reveal">{pick(section.heading)}</h2>
                <div className="article-page__text">
                  {pick(section.paragraphs).map((paragraph, i) => (
                    <p
                      key={paragraph}
                      className="article-page__paragraph reveal"
                      style={{ '--reveal-delay': `${160 + i * 160}ms` }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))
          ) : (
            <Reveal className="article-page__row">
              <p className="article-page__soon reveal">
                {t('article.soon')}
              </p>
            </Reveal>
          )}
        </div>

        <Reveal as="section" className="article-page__more" aria-labelledby="article-more">
          <div className="detail-more__header">
            <h2 id="article-more" className="detail-more__title reveal">
              {t('article.more')}
            </h2>
            <div className="reveal" style={{ '--reveal-delay': '120ms' }}>
              <Button href="/journal" variant="text" className="link-draw">
                {t('article.all')}
              </Button>
            </div>
          </div>
          <ul className="article-page__more-grid" role="list">
            {others.map((other, i) => (
              <li key={other.slug} className="reveal" style={{ '--reveal-delay': `${200 + i * 200}ms` }}>
                <ArticleCard article={other} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  )
}

export default ArticleDetail
