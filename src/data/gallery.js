import { images } from './images.js'

/** Item galeri; `area` dipetakan ke grid-template-areas di Gallery.css. */
export const GALLERY_ITEMS = [
  {
    id: 'pangalengan',
    area: 'tall',
    image: images.galleryPangalenganHills,
    caption: { en: 'Tea hills of Pangalengan, Bandung', id: 'Perbukitan teh Pangalengan, Bandung' },
  },
  {
    id: 'cukul',
    area: 'small-a',
    image: images.galleryCukulMist,
    caption: { en: 'Cukul tea plantation, Pangalengan', id: 'Kebun teh Cukul, Pangalengan' },
  },
  {
    id: 'labuan-bajo',
    area: 'small-b',
    image: images.galleryLabuanBajoHills,
    caption: { en: 'Hills of Labuan Bajo, Flores', id: 'Perbukitan Labuan Bajo, Flores' },
  },
  {
    id: 'rice-valley',
    area: 'wide',
    image: images.galleryRiceValley,
    caption: { en: 'A valley of rice fields and river, Indonesia', id: 'Lembah sawah dan sungai, Indonesia' },
  },
  {
    id: 'malang',
    area: 'portrait',
    image: images.galleryMalangTea,
    caption: { en: 'Tea garden in Malang, East Java', id: 'Kebun teh di Malang, Jawa Timur' },
  },
]
