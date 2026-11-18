import { images } from './images.js'

/**
 * Foto yang lisensinya wajib mencantumkan atribusi (CC BY / CC BY-SA).
 * Foto lain di situs ini memakai Lisensi Unsplash atau CC0.
 * Sumber lengkap semua foto: src/assets/ASSETS.md.
 */
export const PHOTO_CREDITS = [
  {
    slug: 'tegalalang',
    image: images.heroTegalalang,
    title: { en: 'Tegalalang rice terraces, Bali (footer background)', id: 'Terasering Tegalalang, Bali (latar footer)' },
    author: 'Thomas Fuhrmann',
    source: 'https://commons.wikimedia.org/wiki/File:Rice_terraces_on_Bali_-_Tegalalang_Rice_Terrace_-_Indonesia_05.jpg',
    license: { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' },
  },
  {
    slug: 'bromo',
    image: images.articleBromo,
    title: { en: 'Mount Bromo at sunrise, East Java', id: 'Gunung Bromo saat fajar, Jawa Timur' },
    author: 'Thomas Fuhrmann',
    source: 'https://commons.wikimedia.org/wiki/File:Gunung_Bromo_sunrise_-_Indonesia.jpg',
    license: { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' },
  },
  {
    slug: 'kelimutu',
    image: images.storyKelimutu,
    title: { en: 'Kelimutu crater lake, Flores', id: 'Danau kawah Kelimutu, Flores' },
    author: 'LukeTriton',
    source: 'https://commons.wikimedia.org/wiki/File:Kelimutu_Crater_Lake.jpg',
    license: { name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' },
  },
  {
    slug: 'jatiluwih',
    image: images.articleJatiluwih,
    title: { en: 'Jatiluwih rice terraces, Bali', id: 'Terasering Jatiluwih, Bali' },
    author: 'Jorge Franganillo',
    source: 'https://commons.wikimedia.org/wiki/File:Bali-_Jatiluwih_rice_terraces_-_50281829296.jpg',
    license: { name: 'CC BY 2.0', url: 'https://creativecommons.org/licenses/by/2.0' },
  },
]
