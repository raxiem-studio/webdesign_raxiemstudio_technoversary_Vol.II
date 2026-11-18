import { useLanguage } from '../../i18n/context.js'
import './DestinationCard.css'

/**
 * Photo-led destination card. The whole card is one link; the "Explore"
 * pill is presentational so there's a single click/focus target.
 * @param {object} props.destination  { name, description, image, href } — text is bilingual `{ en, id }`
 */
function DestinationCard({ destination, className = '', ...rest }) {
  const { t, pick } = useLanguage()
  const { image, href } = destination
  const name = pick(destination.name)
  const classes = ['destination-card', 'on-dark', className].filter(Boolean).join(' ')

  return (
    <a href={href} className={classes} {...rest}>
      <img
        className="destination-card__image"
        src={image.src}
        alt={pick(image.alt)}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <span className="destination-card__scrim" aria-hidden="true" />
      <span className="destination-card__body">
        <span className="destination-card__name">{name}</span>
        <span className="destination-card__description">{pick(destination.description)}</span>
        <span className="destination-card__cta" aria-hidden="true">
          {t('card.explore')}
        </span>
        <span className="visually-hidden">{t('card.exploreName', { name })}</span>
      </span>
    </a>
  )
}

export default DestinationCard
