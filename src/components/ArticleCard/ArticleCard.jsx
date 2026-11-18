import { useLanguage } from '../../i18n/context.js'
import { CalendarIcon, ClockIcon } from '../Icons/Icons.jsx'
import './ArticleCard.css'

/**
 * Kartu artikel berbasis foto; seluruh kartu jadi satu link.
 * @param {object} props.article  { category, title, excerpt, date, readingMinutes, image, href } — teks dua bahasa `{ en, id }`
 * @param {1|2|3|4|5|6} [props.headingLevel=3]
 * `image.cardPosition` (opsional) mengatur object-position crop supaya
 * subjek foto tidak tertutup teks.
 */
function ArticleCard({ article, headingLevel = 3, className = '', ...rest }) {
  const { t, pick, formatDate } = useLanguage()
  const Heading = `h${headingLevel}`
  const { date, readingMinutes, image, href } = article
  const classes = ['article-card', 'on-dark', className].filter(Boolean).join(' ')

  return (
    <article className={classes} {...rest}>
      <a href={href} className="article-card__link">
        <img
          className="article-card__image"
          src={image.src}
          alt={pick(image.alt)}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          draggable="false"
          style={image.cardPosition ? { objectPosition: image.cardPosition } : undefined}
        />
        <span className="article-card__scrim" aria-hidden="true" />
        <div className="article-card__body">
          <p className="article-card__category">{pick(article.category)}</p>
          <Heading className="article-card__title">{pick(article.title)}</Heading>
          <p className="article-card__excerpt">{pick(article.excerpt)}</p>
          <p className="article-card__meta">
            <span className="article-card__meta-item">
              <CalendarIcon />
              <time dateTime={date}>{formatDate(date)}</time>
            </span>
            <span className="article-card__meta-item">
              <ClockIcon />
              <span>{t('card.readingTime', { n: readingMinutes })}</span>
            </span>
          </p>
        </div>
      </a>
    </article>
  )
}

export default ArticleCard
