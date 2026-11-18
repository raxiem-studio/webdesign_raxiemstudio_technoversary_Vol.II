import { images } from './images.js'

/** Destinasi */
export const DESTINATIONS = [
  {
    slug: 'labuan-bajo',
    name: { en: 'Labuan Bajo', id: 'Labuan Bajo' },
    region: { en: 'East Nusa Tenggara', id: 'Nusa Tenggara Timur' },
    description: {
      en: 'Island hills and the slow tides of Flores.',
      id: 'Bukit-bukit pulau dan pasang surut Flores.',
    },
    image: images.destLabuanBajoGreen,
    href: '/destinations/labuan-bajo',
    detail: {
      lead: {
        en: 'This harbour town on the western tip of Flores is the gateway to Komodo National Park: a scatter of hilly islands, calm bays and a sea full of life.',
        id: 'Kota pelabuhan di ujung barat Flores ini adalah gerbang menuju Taman Nasional Komodo: gugusan pulau berbukit, teluk yang tenang, dan laut yang penuh kehidupan.',
      },
      overview: {
        en: [
          'From Labuan Bajo, boats set out among the islands of Komodo National Park, a UNESCO World Heritage Site. The hills turn green in the rainy season and gold in the dry season.',
          'Here, beauty and fragility sit side by side. Endemic wildlife, coral reefs and coastal communities all depend on how we choose to visit.',
        ],
        id: [
          'Dari Labuan Bajo, perahu berangkat menyusuri pulau-pulau di Taman Nasional Komodo, kawasan yang diakui UNESCO sebagai Situs Warisan Dunia. Bukit-bukitnya menghijau di musim hujan dan menguning keemasan di musim kemarau.',
          'Di sini, keindahan dan kerentanan berjalan berdampingan. Satwa endemik, terumbu karang, dan masyarakat pesisir bergantung pada cara kita berkunjung.',
        ],
      },
      highlights: [
        {
          title: { en: 'Hike Padar Island', id: 'Mendaki Pulau Padar' },
          text: {
            en: 'A short trail to the summit, with views over curving bays. Most beautiful in the early morning.',
            id: 'Jalur pendek menuju puncak dengan pemandangan teluk-teluk yang melengkung, paling indah saat pagi.',
          },
        },
        {
          title: { en: 'Komodo dragons in the wild', id: 'Komodo di habitat aslinya' },
          text: {
            en: 'Observe Komodo dragons on Komodo or Rinca Island, always accompanied by a national park ranger.',
            id: 'Mengamati komodo di Pulau Komodo atau Rinca, selalu didampingi ranger taman nasional.',
          },
        },
        {
          title: { en: 'A living sea', id: 'Laut yang hidup' },
          text: {
            en: 'Snorkel over coral reefs and, if you are lucky, watch manta rays glide past.',
            id: 'Snorkeling di atas terumbu karang dan, bila beruntung, melihat pari manta melintas.',
          },
        },
      ],
      tips: {
        en: [
          'Book licensed local guides and boat operators.',
          'Never touch or stand on coral.',
          'Follow the rangers’ instructions and keep your distance from Komodo dragons.',
          'Bring your own water bottle and take your rubbish home.',
        ],
        id: [
          'Gunakan pemandu dan operator kapal lokal yang berizin.',
          'Jangan menyentuh atau menginjak terumbu karang.',
          'Ikuti arahan ranger dan jaga jarak dari komodo.',
          'Bawa botol minum sendiri dan bawa pulang sampahmu.',
        ],
      },
      gallery: [images.destLabuanBajoCoast, images.galleryLabuanBajoHills],
    },
  },
  {
    slug: 'wakatobi',
    name: { en: 'Wakatobi', id: 'Wakatobi' },
    region: { en: 'Southeast Sulawesi', id: 'Sulawesi Tenggara' },
    description: {
      en: 'Coral gardens and the people of the sea.',
      id: 'Taman karang dan orang-orang laut.',
    },
    image: images.destWakatobiGreen,
    href: '/destinations/wakatobi',
  },
  {
    slug: 'raja-ampat',
    name: { en: 'Raja Ampat', id: 'Raja Ampat' },
    region: { en: 'Southwest Papua', id: 'Papua Barat Daya' },
    description: {
      en: 'Karst islands adrift in living water.',
      id: 'Pulau karst di tengah laut yang hidup.',
    },
    image: images.destRajaAmpatGreen,
    href: '/destinations/raja-ampat',
  },
  {
    slug: 'tana-toraja',
    name: { en: 'Tana Toraja', id: 'Tana Toraja' },
    region: { en: 'South Sulawesi', id: 'Sulawesi Selatan' },
    description: {
      en: 'Highland rituals beneath Tongkonan roofs.',
      id: 'Tradisi dataran tinggi di bawah atap Tongkonan.',
    },
    image: images.destTanaTorajaGreen,
    href: '/destinations/tana-toraja',
  },
  {
    slug: 'bromo',
    name: { en: 'Mount Bromo', id: 'Gunung Bromo' },
    region: { en: 'East Java', id: 'Jawa Timur' },
    description: {
      en: 'Dawn over the caldera, with the Tengger.',
      id: 'Fajar di kaldera, bersama warga Tengger.',
    },
    image: images.destBromoGreen,
    href: '/destinations/bromo',
  },
  {
    slug: 'jatiluwih',
    name: { en: 'Jatiluwih', id: 'Jatiluwih' },
    region: { en: 'Bali', id: 'Bali' },
    description: {
      en: 'Terraces kept alive by water shared fairly.',
      id: 'Sawah berundak yang dihidupi subak.',
    },
    image: images.destJatiluwih,
    href: '/destinations/jatiluwih',
    detail: {
      lead: {
        en: 'At the foot of Mount Batukaru in Tabanan, the rice terraces of Jatiluwih stretch wide and green, tended by farmers using an irrigation system handed down through generations.',
        id: 'Di kaki Gunung Batukaru, Tabanan, terasering sawah Jatiluwih membentang luas dan hijau, dirawat para petani dengan sistem irigasi yang diwariskan turun-temurun.',
      },
      overview: {
        en: [
          'Jatiluwih is part of the Cultural Landscape of Bali’s subak system, recognised by UNESCO as a World Heritage Site. Subak is how Balinese communities share water fairly, guided by the philosophy of Tri Hita Karana: harmony between people, nature and the divine.',
          'Coming here means walking through the farmers’ workplace. The slower you go, the more you will understand.',
        ],
        id: [
          'Jatiluwih adalah bagian dari lanskap budaya subak Bali yang diakui UNESCO sebagai Warisan Dunia. Subak adalah cara masyarakat Bali membagi air secara adil, berpegang pada filosofi Tri Hita Karana: keselarasan antara manusia, alam, dan Tuhan.',
          'Datang ke sini berarti berjalan di ruang kerja para petani. Semakin pelan kita melangkah, semakin banyak yang bisa kita pahami.',
        ],
      },
      highlights: [
        {
          title: { en: 'Walk among the terraces', id: 'Berjalan di antara terasering' },
          text: {
            en: 'Footpaths of varying length past rice-field bunds, water channels and farmers’ huts.',
            id: 'Jalur setapak dengan beberapa pilihan panjang, melintasi pematang, saluran air, dan pondok petani.',
          },
        },
        {
          title: { en: 'Learn about subak', id: 'Mengenal subak' },
          text: {
            en: 'See how water flows from one field to the next, and how tradition keeps the system alive.',
            id: 'Belajar bagaimana air dibagi dari sawah ke sawah, dan bagaimana tradisi menjaga sistem ini tetap hidup.',
          },
        },
        {
          title: { en: 'Morning beneath Batukaru', id: 'Pagi di kaki Batukaru' },
          text: {
            en: 'Cool air, thin mist and soft light over the fields before the day gets busy.',
            id: 'Udara sejuk, kabut tipis, dan cahaya lembut di atas sawah sebelum hari menjadi ramai.',
          },
        },
      ],
      tips: {
        en: [
          'Stay on the marked paths and never step on the rice plants.',
          'Come early in the morning, when it is cooler and quieter.',
          'Shop and eat at warung run by local families.',
          'Ask permission before photographing farmers at work.',
        ],
        id: [
          'Tetap berjalan di jalur yang tersedia dan jangan menginjak tanaman padi.',
          'Datang pagi hari agar lebih sejuk dan tidak terlalu ramai.',
          'Belanja dan makan di warung milik warga setempat.',
          'Minta izin sebelum memotret petani yang sedang bekerja.',
        ],
      },
      gallery: [images.destJatiluwihTerraces, images.articleJatiluwih],
    },
  },
]

export const findDestination = (slug) => DESTINATIONS.find((d) => d.slug === slug)
