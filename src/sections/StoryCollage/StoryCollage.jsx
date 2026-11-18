import { useState } from 'react'
import { Container, SectionHeader } from '../../components/index.js'
import { images } from '../../data/images.js'
import { useInView } from '../../hooks/useInView.js'
import { useLanguage } from '../../i18n/context.js'
import StoryCard from './StoryCard.jsx'
import './StoryCollage.css'

/*
 * `fan`: slot in the desktop fan, -2…2 (0 = centre, top).
 * `likes`: DEMO seed counts for the prototype. There is no backend yet, so a
 * visitor's own like is added on top and kept only in their browser
 * (localStorage). Real shared counts need an API + database.
 */
const STORIES = [
  { id: 'jatiluwih', fan: -2, image: images.articleJatiluwih, location: { en: 'Jatiluwih, Bali', id: 'Jatiluwih, Bali' }, likes: 842 },
  { id: 'tongkonan', fan: -1, image: images.storyTongkonan, location: { en: 'Tana Toraja, South Sulawesi', id: 'Tana Toraja, Sulawesi Selatan' }, likes: 1249 },
  { id: 'kelimutu', fan: 0, image: images.storyKelimutu, location: { en: 'Lake Kelimutu, Flores', id: 'Danau Kelimutu, Flores' }, likes: 2316 },
  { id: 'bromo', fan: 1, image: images.articleBromo, location: { en: 'Mount Bromo, East Java', id: 'Gunung Bromo, Jawa Timur' }, likes: 1873 },
  { id: 'tegenungan', fan: 2, image: images.galleryTegenungan, location: { en: 'Tegenungan Waterfall, Bali', id: 'Air Terjun Tegenungan, Bali' }, likes: 967 },
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
    /* Storage unavailable (private mode, etc.): keep likes in memory only. */
  }
}

/** Home: fan of likeable photo cards; demo counts plus the visitor's own like (kept in this browser via localStorage). */
function StoryCollage() {
  const { t, pick } = useLanguage()
  const [liked, setLiked] = useState(readLikes)
  const hasLikedAny = Object.values(liked).some(Boolean)

  const setLike = (id, value) =>
    setLiked((prev) => {
      const next = { ...prev, [id]: value }
      writeLikes(next)
      return next
    })

  const [revealRef, revealIn] = useInView()

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
        <div className="story__collage">
          {STORIES.map(({ id, fan, image, location, likes }, i) => (
            <StoryCard
              key={id}
              style={{ '--fan': fan, '--fan-abs': Math.abs(fan), '--i': i }}
              image={image}
              location={pick(location)}
              likes={likes}
              liked={Boolean(liked[id])}
              hint={!hasLikedAny}
              onToggle={() => setLike(id, !liked[id])}
              onLike={() => setLike(id, true)}
            />
          ))}
        </div>
        <p className="story__hint reveal" style={{ '--reveal-delay': '1200ms' }}>
          {t('story.hint')}
        </p>
      </Container>
    </section>
  )
}

export default StoryCollage
