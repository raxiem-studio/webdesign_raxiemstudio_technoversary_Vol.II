import { useRef, useState } from 'react'
import { useLanguage } from '../../i18n/context.js'

const DOUBLE_TAP_MS = 300

function HeartIcon({ filled }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-7.5-10.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 7.5 2.8c0 5.8-7.5 10.4-7.5 10.4Z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  )
}

/** Kartu cerita */
function StoryCard({ image, location, likes, liked, onToggle, onLike, hint, className = '', style }) {
  const { t, pick, formatNumber } = useLanguage()
  const [burst, setBurst] = useState(0)
  const [pop, setPop] = useState(0)
  const lastTap = useRef(0)

  const handlePhotoClick = () => {
    const now = Date.now()
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0
      setBurst((b) => b + 1)
      setPop((p) => p + 1)
      if (!liked) onLike()
    } else {
      lastTap.current = now
    }
  }

  const handleHeartClick = () => {
    if (!liked) setPop((p) => p + 1)
    onToggle()
  }

  const count = formatNumber(likes + (liked ? 1 : 0))

  return (
    <figure className={`story-card ${className}`} style={style}>
      <div className="story-card__photo" onClick={handlePhotoClick}>
        <img
          src={image.src}
          alt={pick(image.alt)}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        {burst > 0 && (
          <span key={burst} className="story-card__burst" aria-hidden="true">
            <HeartIcon filled />
          </span>
        )}
      </div>
      <figcaption className="story-card__meta">
        <button
          type="button"
          className={`story-card__like${liked ? ' is-liked' : ''}${hint && !liked ? ' is-hinting' : ''}`}
          aria-pressed={liked}
          // Tombol like
          aria-label={`${t('story.like', { place: location })}, ${count} ${t('story.likes')}`}
          onClick={handleHeartClick}
        >
          <span key={pop} className={`story-card__heart${pop > 0 && liked ? ' is-popping' : ''}`}>
            <HeartIcon filled={liked} />
          </span>
          <span className="story-card__count" aria-hidden="true">
            <strong>{count}</strong> {t('story.likes')}
          </span>
        </button>
        <span className="story-card__location">
          <PinIcon />
          {location}
        </span>
      </figcaption>
    </figure>
  )
}

export default StoryCard
