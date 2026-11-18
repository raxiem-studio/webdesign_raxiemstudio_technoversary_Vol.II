import { images } from './images.js'

/** Nilai JEJAK */
export const TRAVEL_THEMES = [
  { number: 1, label: { en: 'Discover Nature', id: 'Kenali Alam' } },
  { number: 2, label: { en: 'Preserve Stories', id: 'Lestarikan Cerita' } },
  { number: 3, label: { en: 'Travel Responsibly', id: 'Bepergian secara Bertanggung Jawab' } },
]

export const IMPACT_PANELS = {
  quote: {
    image: images.impactBintanForest,
    /* Kutipan */
    text: {
      en: {
        lead: 'Meaningful travel is not only about the places we visit, but also about ',
        emphasisA: 'the trace we leave behind',
        middle: '. Together with local communities, ',
        emphasisB: "let's protect nature",
        tail: ' and respect life in every place we visit.',
      },
      id: {
        lead: 'Perjalanan yang bermakna bukan hanya tentang tempat yang dikunjungi, tetapi juga tentang ',
        emphasisA: 'jejak yang kita tinggalkan',
        middle: '. Bersama masyarakat lokal, ',
        emphasisB: 'mari menjaga alam',
        tail: ' dan menghargai kehidupan di setiap destinasi.',
      },
    },
  },
  photo: {
    image: images.impactTumpakSewu,
  },
  themes: {
    /* Latar (dekoratif) */
    image: images.impactSegaraAnak,
    /* Baris judul */
    titleLines: { en: ['A Journey That', 'Gives Back'], id: ['Perjalanan yang', 'Memberi Manfaat'] },
    description: {
      en: 'Every travel choice matters to the places we visit.',
      id: 'Setiap pilihan perjalanan berarti bagi tempat yang kita kunjungi.',
    },
  },
}

/** Statistik dampak */
export const IMPACT_STATS = [
  {
    id: 'marine',
    value: 29.9,
    decimals: 1,
    suffix: { en: 'M', id: ' jt' },
    label: {
      en: 'hectares of protected marine areas',
      id: 'hektare kawasan konservasi laut',
    },
    // Sumber: KKP 2024
    source: { en: 'Ministry of Marine Affairs and Fisheries, 2024', id: 'Kementerian Kelautan dan Perikanan, 2024' },
  },
  {
    id: 'villages',
    value: 6262,
    decimals: 0,
    suffix: '',
    label: {
      en: 'registered tourism villages nationwide',
      id: 'desa wisata terdaftar secara nasional',
    },
    // Sumber: Kemenpar 2026
    source: { en: 'Ministry of Tourism, 2026', id: 'Kementerian Pariwisata, 2026' },
  },
  {
    id: 'reefs',
    value: 6.42,
    decimals: 2,
    suffix: '%',
    label: {
      en: 'of surveyed reefs in excellent condition',
      id: 'karang yang disurvei berkondisi sangat baik',
    },
    // Sumber: LIPI/BRIN 2019
    source: { en: 'LIPI/BRIN, 2019 data', id: 'LIPI/BRIN, data 2019' },
  },
]
