import { useEffect, useRef, useState } from 'react'
import { Container, SectionHeader } from '../../components/index.js'
import { images } from '../../data/images.js'
import { useInView } from '../../hooks/useInView.js'
import { useLanguage } from '../../i18n/context.js'
import StoryCard from './StoryCard.jsx'
import { useBarrel } from './useBarrel.js'
import './StoryCollage.css'

/* Foto cerita */
const STORIES = [
  { id: 'kelimutu', image: images.storyKelimutu, location: { en: 'Lake Kelimutu, Flores', id: 'Danau Kelimutu, Flores' }, likes: 2316 },
  { id: 'bromo', image: images.articleBromo, location: { en: 'Mount Bromo, East Java', id: 'Gunung Bromo, Jawa Timur' }, likes: 1873 },
  { id: 'raja-ampat', image: images.destRajaAmpatGreen, location: { en: 'Raja Ampat, Southwest Papua', id: 'Raja Ampat, Papua Barat Daya' }, likes: 1532 },
  { id: 'tegenungan', image: images.galleryTegenungan, location: { en: 'Tegenungan Waterfall, Bali', id: 'Air Terjun Tegenungan, Bali' }, likes: 967 },
  { id: 'labuan-bajo', image: images.galleryLabuanBajoHills, location: { en: 'Labuan Bajo, Flores', id: 'Labuan Bajo, Flores' }, likes: 1387 },
  { id: 'jatiluwih', image: images.articleJatiluwih, location: { en: 'Jatiluwih, Bali', id: 'Jatiluwih, Bali' }, likes: 842 },
  { id: 'tumpak-sewu', image: images.impactTumpakSewu, location: { en: 'Tumpak Sewu Waterfall, East Java', id: 'Air Terjun Tumpak Sewu, Jawa Timur' }, likes: 1104 },
  { id: 'tongkonan', image: images.storyTongkonan, location: { en: 'Tana Toraja, South Sulawesi', id: 'Tana Toraja, Sulawesi Selatan' }, likes: 1249 },
]

const STORAGE_KEY = 'jejak:story-likes'

function readLikes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeLikes(likes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes))
  } catch {
    /* Storage tidak tersedia */
  }
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

/** Cerita (barel 3D) */
function StoryCollage() {
  const { t, pick } = useLanguage()
  const [liked, setLiked] = useState(readLikes)
  const [openId, setOpenId] = useState(null)
  const dialogRef = useRef(null)
  const openedByKeyboard = useRef(false)
  const { stageRef, ringRef, setItemRef, focusItem, stageProps, wasDragged, nudge } = useBarrel({
    count: STORIES.length,
    paused: openId !== null,
  })
  const [revealRef, revealIn] = useInView()
  const hasLikedAny = Object.values(liked).some(Boolean)
  const openStory = STORIES.find((story) => story.id === openId)

  const setLike = (id, value) =>
    setLiked((prev) => {
      const next = { ...prev, [id]: value }
      writeLikes(next)
      return next
    })

  // Buka/tutup dialog
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openId && !dialog.open) dialog.showModal()
    if (!openId && dialog.open) {
      dialog.close()
      // Lepas focus setelah klik mouse
      if (!openedByKeyboard.current) document.activeElement?.blur()
    }
  }, [openId])

  const onItemKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    focusItem(nudge(event.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <section id="our-story" className="section story" aria-labelledby="story-title">
      <Container ref={revealRef} size="content" className={revealIn ? 'is-visible' : undefined}>
        <SectionHeader
          title={t('story.title')}
          titleId="story-title"
          align="center"
          rule={false}
          titleWeight="medium"
          className="reveal"
        />

        <div
          ref={stageRef}
          className="story-barrel reveal"
          style={{ '--n': STORIES.length, '--reveal-delay': '200ms' }}
          role="group"
          aria-roledescription="carousel"
          aria-label={t('story.carousel')}
          {...stageProps}
        >
          <ul ref={ringRef} className="story-barrel__ring" role="list">
            {STORIES.map((story, i) => (
              <li
                key={story.id}
                ref={setItemRef(i)}
                className="story-barrel__item"
                style={{ '--i': i }}
              >
                <button
                  type="button"
                  className="story-barrel__card"
                  aria-label={t('story.open', { place: pick(story.location) })}
                  onClick={(event) => {
                    if (wasDragged()) return
                    openedByKeyboard.current = event.detail === 0
                    setOpenId(story.id)
                  }}
                  onKeyDown={onItemKeyDown}
                >
                  <img
                    src={story.image.src}
                    alt=""
                    width={story.image.width}
                    height={story.image.height}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="story__hint reveal" style={{ '--reveal-delay': '600ms' }}>
          {t('story.hint')}
        </p>
      </Container>

      <dialog
        ref={dialogRef}
        className="story-dialog"
        aria-label={openStory ? pick(openStory.location) : undefined}
        onCancel={(event) => {
          event.preventDefault()
          setOpenId(null)
        }}
        onClick={(event) => {
          // Klik backdrop
          if (event.target === event.currentTarget) setOpenId(null)
        }}
      >
        {openStory && (
          <div className="story-dialog__inner">
            <button
              type="button"
              className="story-dialog__close"
              aria-label={t('story.close')}
              onClick={() => setOpenId(null)}
            >
              <CloseIcon />
            </button>
            <StoryCard
              className="story-card--modal"
              image={openStory.image}
              location={pick(openStory.location)}
              likes={openStory.likes}
              liked={Boolean(liked[openStory.id])}
              hint={!hasLikedAny}
              onToggle={() => setLike(openStory.id, !liked[openStory.id])}
              onLike={() => setLike(openStory.id, true)}
            />
            <p className="story-dialog__hint">{t('story.likeHint')}</p>
          </div>
        )}
      </dialog>
    </section>
  )
}

export default StoryCollage
