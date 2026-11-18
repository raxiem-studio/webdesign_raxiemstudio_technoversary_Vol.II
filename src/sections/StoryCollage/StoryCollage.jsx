import { useState } from 'react'
import { Container, SectionHeader } from '../../components/index.js'
import { images } from '../../data/images.js'
import { useInView } from '../../hooks/useInView.js'
import { useLanguage } from '../../i18n/context.js'
import StoryCard from './StoryCard.jsx'
import './StoryCollage.css'

/*
 * `fan`: posisi di kipas desktop, -2…2 (0 = tengah, paling atas).
 * `likes`: angka DEMO untuk prototipe. Belum ada backend, jadi like pengunjung
 * ditambahkan di atasnya dan hanya disimpan di browser-nya (localStorage).
 * Jumlah like yang sama untuk semua orang butuh API + database.
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
    /* Storage tidak tersedia (mode private, dll.): like hanya disimpan di memori. */
  }
}

/** Home: kipas kartu foto yang bisa di-like; angka demo plus like pengunjung (disimpan di browser lewat localStorage). */
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
