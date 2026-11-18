import { images } from './images.js'

const CATEGORY = {
  people: { en: 'People & Culture', id: 'Manusia & Budaya' },
  guide: { en: 'Travel Guide', id: 'Panduan Perjalanan' },
  responsible: { en: 'Responsible Travel', id: 'Wisata Bertanggung Jawab' },
}

/**
 * Journal articles (Home carousel, /journal, /journal/:slug).
 * Text is bilingual `{ en, id }`; the date is formatted per language and
 * `readingMinutes` becomes "6 min read" / "6 menit baca". `body` is optional;
 * articles without one render a "coming soon" story page.
 * Keep copy general: no statistics, prices or scientific claims.
 */
export const ARTICLES = [
  {
    slug: 'hidup-berdampingan-dengan-laut',
    category: CATEGORY.people,
    title: { en: 'Living Alongside the Sea', id: 'Hidup Berdampingan dengan Laut' },
    excerpt: {
      en: 'Coastal lives that rise and rest with the tide.',
      id: 'Hidup pesisir yang mengikuti irama pasang.',
    },
    date: '2026-10-12',
    readingMinutes: 6,
    image: images.articleLovinaBoat,
    href: '/journal/hidup-berdampingan-dengan-laut',
    body: {
      lead: {
        en: 'In many coastal villages across Indonesia, the day begins before sunrise. Small boats leave the beach, and the sea becomes a front yard everyone knows by heart.',
        id: 'Di banyak kampung pesisir Indonesia, hari dimulai sebelum matahari terbit. Perahu-perahu kecil meninggalkan pantai, dan laut menjadi halaman rumah yang dikenal setiap orang.',
      },
      sections: [
        {
          heading: { en: 'The sea as a front yard', id: 'Laut sebagai halaman rumah' },
          paragraphs: {
            en: [
              'For coastal communities, the sea is more than a view. It is a place to work, play and gather. Children learn to swim before they learn to read, and daily conversation often turns to the wind and the waves.',
              'Life here follows the rhythm of the water: when the boats go out, when they come home, and when it is better not to sail at all.',
            ],
            id: [
              'Bagi masyarakat pesisir, laut bukan sekadar pemandangan. Laut adalah tempat bekerja, bermain, dan berkumpul. Anak-anak belajar berenang sebelum belajar membaca, dan obrolan sehari-hari sering berputar pada arah angin dan keadaan ombak.',
              'Kehidupan di sini mengikuti ritme air: kapan perahu berangkat, kapan pulang, dan kapan sebaiknya tidak melaut sama sekali.',
            ],
          },
        },
        {
          heading: { en: 'Knowledge passed down', id: 'Pengetahuan yang diwariskan' },
          paragraphs: {
            en: [
              'Many fishers read signs in nature that they learned from their parents: the colour of the sky, the direction of the wind, the rise and fall of the tide. This knowledge travels through stories and habits, not books.',
              'In some regions, customary rules also set when and where people may fish, giving the sea time to recover.',
            ],
            id: [
              'Banyak nelayan membaca tanda-tanda alam yang mereka pelajari dari orang tua: warna langit, arah angin, pasang dan surut. Pengetahuan ini diwariskan lewat cerita dan kebiasaan, bukan buku.',
              'Di beberapa daerah, aturan adat juga mengatur kapan dan di mana orang boleh menangkap ikan, agar laut punya waktu untuk pulih.',
            ],
          },
        },
        {
          heading: { en: 'How we visit', id: 'Cara kita berkunjung' },
          paragraphs: {
            en: [
              'As guests, we can help keep that balance with simple choices: buying seafood and meals from local families, asking before taking photos, and leaving no plastic on the beach.',
              'Sitting for a while and listening to their stories often gives more than a beautiful photograph.',
            ],
            id: [
              'Sebagai tamu, kita bisa ikut menjaga keseimbangan itu dengan hal-hal sederhana: membeli hasil laut dan makanan dari warga, meminta izin sebelum memotret, dan tidak meninggalkan sampah plastik di pantai.',
              'Duduk sebentar dan mendengarkan cerita mereka sering memberi lebih banyak daripada sekadar foto yang indah.',
            ],
          },
        },
      ],
    },
  },
  {
    slug: 'membaca-alam-sebelum-menjelajah',
    category: CATEGORY.guide,
    title: { en: 'Reading Nature Before You Explore', id: 'Membaca Alam Sebelum Menjelajah' },
    excerpt: {
      en: 'Learn the season before you take the trail.',
      id: 'Kenali musim sebelum menapaki jalur.',
    },
    date: '2026-10-05',
    readingMinutes: 5,
    image: images.articleBogorHiker,
    href: '/journal/membaca-alam-sebelum-menjelajah',
    body: {
      lead: {
        en: 'A good journey starts long before the first step. Knowing the season, the terrain and local customs keeps us safer, and keeps the places we visit intact.',
        id: 'Perjalanan yang baik dimulai jauh sebelum langkah pertama. Mengenal musim, medan, dan kebiasaan setempat membuat kita lebih aman, dan membuat alam yang kita datangi tetap terjaga.',
      },
      sections: [
        {
          heading: { en: 'Know the season', id: 'Kenali musimnya' },
          paragraphs: {
            en: [
              'Most of Indonesia has a rainy season and a dry season, but their timing varies from region to region. A trail that is easy in the dry season can turn slippery and dangerous in the rain.',
              'Before you go, check the latest information from the park authority or local residents, not just photos on social media.',
            ],
            id: [
              'Sebagian besar wilayah Indonesia mengenal musim hujan dan musim kemarau, tetapi waktunya bisa berbeda dari satu daerah ke daerah lain. Jalur yang ramah di musim kemarau bisa menjadi licin dan berbahaya saat hujan.',
              'Sebelum berangkat, cari informasi terbaru dari pengelola kawasan atau warga setempat, bukan hanya dari foto di media sosial.',
            ],
          },
        },
        {
          heading: { en: 'Listen to locals and guides', id: 'Dengarkan warga dan pemandu lokal' },
          paragraphs: {
            en: [
              'Residents and local guides know a place better than anyone: which trails are closed, when the mist usually rolls in, and which places are considered sacred.',
              'Hiring them also means the benefits of your trip reach the people who look after that place.',
            ],
            id: [
              'Warga dan pemandu lokal memahami tempatnya lebih baik daripada siapa pun: jalur mana yang sedang ditutup, kapan kabut biasanya turun, dan tempat mana yang dianggap sakral.',
              'Menggunakan jasa mereka juga berarti manfaat perjalanan ikut dirasakan oleh orang-orang yang menjaga tempat itu.',
            ],
          },
        },
        {
          heading: { en: 'Prepare yourself, not just your gear', id: 'Siapkan diri, bukan hanya perlengkapan' },
          paragraphs: {
            en: [
              'Bring enough drinking water, layered clothing and rain protection. Just as important is knowing your own limits, and being willing to turn back when the weather or conditions are not right.',
            ],
            id: [
              'Bawa air minum yang cukup, pakaian berlapis, dan pelindung hujan. Yang tak kalah penting adalah mengenali batas tubuh sendiri dan berani berbalik bila cuaca atau kondisi tidak mendukung.',
            ],
          },
        },
        {
          heading: { en: 'Leave no trace', id: 'Pulang tanpa meninggalkan jejak' },
          paragraphs: {
            en: [
              'Carry out all your rubbish, stay on the marked trails, and never pick or take anything from nature. Leave each place just as you found it.',
            ],
            id: [
              'Bawa kembali semua sampah, tetap di jalur yang tersedia, dan jangan memetik atau membawa pulang apa pun dari alam. Biarkan tempat itu tetap seperti saat kita datang.',
            ],
          },
        },
      ],
    },
  },
  {
    slug: 'ketika-perjalanan-memberi-arti',
    category: CATEGORY.responsible,
    title: { en: 'When Travel Becomes Meaningful', id: 'Ketika Perjalanan Memberi Arti' },
    excerpt: {
      en: 'How a journey can leave something good behind.',
      id: 'Saat perjalanan meninggalkan kebaikan.',
    },
    date: '2026-09-28',
    readingMinutes: 7,
    image: images.articleLombokSelong,
    href: '/journal/ketika-perjalanan-memberi-arti',
  },
  {
    slug: 'menjelajah-mangrove-dengan-bijak',
    category: CATEGORY.guide,
    title: { en: 'Exploring Mangroves Mindfully', id: 'Menjelajah Mangrove dengan Bijak' },
    excerpt: {
      en: 'Move quietly among roots, water and wings.',
      id: 'Hening di antara akar, air, dan sayap.',
    },
    date: '2026-09-20',
    readingMinutes: 5,
    image: images.articleMakassarMangrove,
    href: '/journal/menjelajah-mangrove-dengan-bijak',
  },
  {
    slug: 'menjaga-sawah-tetap-hijau',
    category: CATEGORY.people,
    title: { en: 'Keeping the Rice Fields Green', id: 'Menjaga Sawah Tetap Hijau' },
    excerpt: {
      en: 'Farmers who keep land and water alive.',
      id: 'Petani yang menjaga tanah dan air tetap hidup.',
    },
    date: '2026-09-14',
    readingMinutes: 6,
    image: images.articleTetebatuTerraces,
    href: '/journal/menjaga-sawah-tetap-hijau',
  },
  {
    slug: 'snorkeling-tanpa-merusak-karang',
    category: CATEGORY.guide,
    title: { en: 'Snorkelling Without Harming the Reef', id: 'Snorkeling Tanpa Merusak Karang' },
    excerpt: {
      en: 'Small habits that keep the reef in colour.',
      id: 'Kebiasaan kecil agar karang tetap berwarna.',
    },
    date: '2026-09-07',
    readingMinutes: 4,
    image: images.articlePecatuReef,
    href: '/journal/snorkeling-tanpa-merusak-karang',
  },
]

export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug)
