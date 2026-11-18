/**
 * Interface strings (labels, buttons, messages, accessible names).
 * Page content lives in src/data as bilingual `{ en, id }` values.
 * `{name}` placeholders are filled by t('key', { name }).
 */
export const STRINGS = {
  en: {
    'site.title': 'JEJAK — Closer to Nature, Closer to Indonesia',
    'site.skipLink': 'Skip to content',

    'nav.home': 'JEJAK — home',
    'nav.main': 'Main navigation',
    'nav.mainMobile': 'Main navigation (mobile)',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.language': 'Language',

    'footer.credit': 'Design by Raxiem Studio.',

    'hero.lightA': 'Closer to',
    'hero.boldA': 'Nature,',
    'hero.lightB': 'Closer to',
    'hero.boldB': 'Indonesia',
    'hero.lead':
      'Discover Indonesia through its wild landscapes, living cultures and the stories of the people who call it home.',
    'hero.cta': 'Explore Destinations',

    'destinations.list': 'Featured destinations',
    'destinations.prev': 'Previous destination',
    'destinations.next': 'Next destination',

    'story.title': 'Every Place Has a Story Worth Protecting',
    'story.hint': 'Double-tap a photo to like it',
    'story.like': 'Like the photo of {place}',

    'journal.title': 'Stories That Bring Us Closer',
    'journal.viewAll': 'View All Stories',
    'journal.list': 'Journal stories',
    'journal.prev': 'Previous story',
    'journal.next': 'Next story',

    'gallery.title': 'A Closer Look at Indonesia',

    'responsible.title': 'More Than a Journey',
    'responsible.lead':
      'Travel is not only about what we discover. It is also about what we choose to protect.',
    'impact.title': 'Indonesia in Numbers',
    'impact.pending': 'Figure not yet verified',
    'impact.sources': 'Sources',

    'destinationsPage.title': 'Destinations',
    'destinationsPage.lead':
      'Places that ask us to slow down, to know the land by heart, and to honour the hands that keep it alive.',
    'destinationsPage.list': 'All destinations',

    'journalPage.title': 'Journal',
    'journalPage.lead':
      'Stories gathered slowly, from shorelines, rice fields and mountain trails, for those who travel to listen.',
    'journalPage.list': 'All stories',

    'aboutPage.title': 'About',

    'notFound.title': 'Page not found',
    'notFound.lead': 'This path has no trace yet. The page you are looking for may have moved, or it has not been written.',
    'notFound.home': 'Back to Home',
    'notFound.destinations': 'Explore Destinations',

    'credits.title': 'Photo Credits',
    'credits.lead': 'The photographs that carry these stories, and the people who made them.',
    'credits.list': 'Credited photographs',
    'credits.by': 'Photo by {author}',
    'credits.other': 'All other photographs are used under the Unsplash License or are in the public domain (CC0).',

    'card.explore': 'Explore',
    'card.exploreName': 'Explore {name}',
    'card.readingTime': '{n} min read',

    'destination.overview': 'Overview',
    'destination.highlights': 'Highlights',
    'destination.tips': 'Travel Mindfully',
    'destination.soon':
      'Our full guide to {name} is on its way. In the meantime, explore other destinations below.',
    'destination.more': 'More Destinations',
    'destination.all': 'All Destinations',

    'article.soon':
      'The full story is still being written. In the meantime, read other stories below.',
    'article.more': 'More Stories',
    'article.all': 'All Stories',

    'contact.title': 'Contact Us',
    'contact.lead':
      'Planning a journey, curious about a place, or carrying a story of your own? Write to us. We read every message with care.',
    'contact.section': 'Contact details and form',
    'contact.detail.email': 'Email',
    'contact.detail.whatsapp': 'WhatsApp',
    'contact.detail.phone': 'Phone',
    'contact.detail.address': 'Address',
    'contact.optional': '(optional)',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your full name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'name@email.com',
    'contact.topic': 'Topic',
    'contact.topicPlaceholder': 'Choose a topic',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell us about your plans or your question',
    'contact.error.nameRequired': 'Please enter your name.',
    'contact.error.emailRequired': 'Please enter your email address.',
    'contact.error.emailInvalid': 'Please enter a valid email address, e.g. name@email.com.',
    'contact.error.topicRequired': 'Please choose a topic.',
    'contact.error.messageRequired': 'Please write your message.',
    'contact.submit': 'Send Message',
    'contact.sending': 'Sending…',
    'contact.sent':
      'Thank you, your message has been sent. We will reply to the email address you provided.',
    'contact.failed': 'Your message could not be sent. Please try again in a moment, or',
    'contact.failedLink': 'send it from your email app',
  },

  id: {
    'site.title': 'JEJAK — Lebih Dekat dengan Alam, Lebih Dekat dengan Indonesia',
    'site.skipLink': 'Langsung ke konten',

    'nav.home': 'JEJAK — beranda',
    'nav.main': 'Navigasi utama',
    'nav.mainMobile': 'Navigasi utama (seluler)',
    'nav.openMenu': 'Buka menu',
    'nav.closeMenu': 'Tutup menu',
    'nav.language': 'Bahasa',

    'footer.credit': 'Desain oleh Raxiem Studio.',

    'hero.lightA': 'Lebih Dekat dengan',
    'hero.boldA': 'Alam,',
    'hero.lightB': 'Lebih Dekat dengan',
    'hero.boldB': 'Indonesia',
    'hero.lead':
      'Kenali Indonesia lewat lanskap alamnya, budaya yang terus hidup, dan cerita orang-orang yang menyebutnya rumah.',
    'hero.cta': 'Jelajahi Destinasi',

    'destinations.list': 'Destinasi pilihan',
    'destinations.prev': 'Destinasi sebelumnya',
    'destinations.next': 'Destinasi berikutnya',

    'story.title': 'Setiap Tempat Punya Cerita yang Layak Dijaga',
    'story.hint': 'Ketuk dua kali foto untuk menyukainya',
    'story.like': 'Sukai foto {place}',

    'journal.title': 'Cerita yang Mendekatkan Kita',
    'journal.viewAll': 'Lihat Semua Cerita',
    'journal.list': 'Cerita jurnal',
    'journal.prev': 'Cerita sebelumnya',
    'journal.next': 'Cerita berikutnya',

    'gallery.title': 'Indonesia dari Dekat',

    'responsible.title': 'Lebih dari Sekadar Perjalanan',
    'responsible.lead':
      'Perjalanan bukan hanya tentang apa yang kita temukan, tetapi juga tentang apa yang kita pilih untuk dijaga.',
    'impact.title': 'Indonesia dalam Angka',
    'impact.pending': 'Data belum terverifikasi',
    'impact.sources': 'Sumber',

    'destinationsPage.title': 'Destinasi',
    'destinationsPage.lead':
      'Tempat yang mengajak kita melambat, mengenal alam dengan hati, dan menghormati para penjaganya.',
    'destinationsPage.list': 'Semua destinasi',

    'journalPage.title': 'Jurnal',
    'journalPage.lead':
      'Cerita yang dipungut perlahan dari pesisir, sawah, dan lereng gunung, untuk hati yang mau mendengar.',
    'journalPage.list': 'Semua cerita',

    'aboutPage.title': 'Tentang Kami',

    'notFound.title': 'Halaman tidak ditemukan',
    'notFound.lead': 'Jalan ini belum punya jejak. Halaman yang kamu cari mungkin sudah pindah, atau memang belum ditulis.',
    'notFound.home': 'Kembali ke Beranda',
    'notFound.destinations': 'Jelajahi Destinasi',

    'credits.title': 'Kredit Foto',
    'credits.lead': 'Foto-foto yang membawa cerita ini, dan orang-orang yang memotretnya.',
    'credits.list': 'Foto yang dikreditkan',
    'credits.by': 'Foto oleh {author}',
    'credits.other': 'Foto lainnya digunakan dengan Lisensi Unsplash atau berstatus domain publik (CC0).',

    'card.explore': 'Jelajahi',
    'card.exploreName': 'Jelajahi {name}',
    'card.readingTime': '{n} menit baca',

    'destination.overview': 'Sekilas',
    'destination.highlights': 'Pengalaman Utama',
    'destination.tips': 'Berkunjung dengan Bijak',
    'destination.soon':
      'Panduan lengkap {name} sedang kami siapkan. Sementara itu, jelajahi destinasi lain di bawah ini.',
    'destination.more': 'Destinasi Lainnya',
    'destination.all': 'Semua Destinasi',

    'article.soon':
      'Cerita lengkapnya sedang kami tulis. Sementara itu, baca cerita lain di bawah ini.',
    'article.more': 'Cerita Lainnya',
    'article.all': 'Semua Cerita',

    'contact.title': 'Hubungi Kami',
    'contact.lead':
      'Merencanakan perjalanan atau ingin berbagi cerita? Tuliskan saja. Setiap pesan kami baca dengan sepenuh hati.',
    'contact.section': 'Kontak dan formulir',
    'contact.detail.email': 'Email',
    'contact.detail.whatsapp': 'WhatsApp',
    'contact.detail.phone': 'Telepon',
    'contact.detail.address': 'Alamat',
    'contact.optional': '(opsional)',
    'contact.name': 'Nama',
    'contact.namePlaceholder': 'Nama lengkap',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'nama@email.com',
    'contact.topic': 'Topik',
    'contact.topicPlaceholder': 'Pilih topik',
    'contact.message': 'Pesan',
    'contact.messagePlaceholder': 'Ceritakan rencana atau pertanyaanmu',
    'contact.error.nameRequired': 'Tulis namamu.',
    'contact.error.emailRequired': 'Tulis alamat emailmu.',
    'contact.error.emailInvalid': 'Format email belum benar, contoh: nama@email.com.',
    'contact.error.topicRequired': 'Pilih topik pesanmu.',
    'contact.error.messageRequired': 'Tulis pesanmu.',
    'contact.submit': 'Kirim Pesan',
    'contact.sending': 'Mengirim…',
    'contact.sent':
      'Terima kasih, pesanmu sudah terkirim. Kami akan membalas ke email yang kamu tulis.',
    'contact.failed': 'Pesan belum terkirim karena ada gangguan. Coba lagi sebentar, atau',
    'contact.failedLink': 'kirim lewat aplikasi email',
  },
}
