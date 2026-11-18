import { images } from './images.js'
import { TRAVEL_THEMES } from './impact.js'

/** About page copy. Keep to mission and values until company facts are confirmed. */
export const ABOUT_INTRO = {
  /*
   * Two lines, the first at most three words around the photo pill:
   *   titleBefore [pill] titleMiddle
   *   titleAfter
   * `title` is the accessible name.
   */
  title: { en: 'Every Journey Leaves a Trace', id: 'Setiap Perjalanan Meninggalkan Jejak' },
  titleBefore: { en: 'Every', id: 'Setiap' },
  titleMiddle: { en: 'Journey', id: 'Perjalanan' },
  titleAfter: { en: 'Leaves a Trace', id: 'Meninggalkan Jejak' },
  accent: images.aboutAccent,
  lead: {
    en: 'Every step leaves a story. May ours be a gentle one: for the land, for those who tend it, and for ourselves.',
    id: 'Setiap langkah meninggalkan cerita. Semoga cerita kita lembut bagi alam dan para penjaganya.',
  },
}

export const ABOUT_IMAGE = images.aboutPenebel

export const ABOUT_STORY = {
  title: { en: 'Our Story', id: 'Cerita Kami' },
  paragraphs: {
    en: [
      'JEJAK began with a simple love for Indonesia: quiet rice fields at dawn, forests that still grow thick, and villages that welcome guests like family. The further we travelled, the more we realised how fragile that beauty is.',
      'So we built JEJAK as a place to get to know Indonesia more closely. Here we gather destinations, stories and travel perspectives that help you understand the country better, while caring for the places you visit.',
    ],
    id: [
      'JEJAK lahir dari kecintaan sederhana pada Indonesia: sawah yang tenang di pagi hari, hutan yang masih rapat, dan desa yang menyambut tamu seperti keluarga. Semakin jauh kami berjalan, semakin kami sadar betapa rapuhnya keindahan itu.',
      'Karena itu kami membangun JEJAK sebagai ruang untuk mengenal Indonesia lebih dekat. Di sini kami mengumpulkan destinasi, cerita, dan sudut pandang perjalanan yang membantumu memahami Indonesia lebih dalam, sambil tetap menjaga tempat yang kamu kunjungi.',
    ],
  },
}

const VALUE_TEXT = {
  1: {
    en: 'Getting to know the land before we step onto it: its seasons, its trails and its fragile places, so that wonder grows into care.',
    id: 'Mengenal alam sebelum menapakinya: musimnya, jalurnya, dan tempat-tempatnya yang rapuh, agar rasa kagum tumbuh menjadi rasa peduli.',
  },
  2: {
    en: 'Listening to the people who keep each place alive, and travelling with local guides and family-run homes, so their stories and livelihoods endure.',
    id: 'Mendengarkan orang-orang yang menjaga setiap tempat, serta bepergian bersama pemandu dan penginapan milik warga, agar cerita dan penghidupan mereka tetap lestari.',
  },
  3: {
    en: 'Travelling slowly and respectfully: carrying our rubbish home, honouring local customs and taking the time to truly get to know a place.',
    id: 'Bepergian dengan pelan dan penuh hormat: membawa pulang sampah, menghargai adat setempat, dan meluangkan waktu untuk benar-benar mengenal sebuah tempat.',
  },
}

/** Reuses the Homepage travel-theme labels. */
export const ABOUT_VALUES = {
  title: { en: 'What We Believe', id: 'Yang Kami Yakini' },
  items: TRAVEL_THEMES.map((theme) => ({ ...theme, text: VALUE_TEXT[theme.number] })),
}
