/**
 * Link nav, footer, dan legal. Teks dua bahasa `{ en, id }`; komponen memilih
 * bahasa aktif. Anchor section diawali "/" supaya bisa diakses dari route mana pun.
 */
export const NAV_LINKS = [
  { label: { en: 'Destinations', id: 'Destinasi' }, href: '/destinations' },
  { label: { en: 'Journal', id: 'Jurnal' }, href: '/journal' },
  { label: { en: 'About', id: 'Tentang Kami' }, href: '/about' },
]

export const NAV_CTA = {
  label: { en: 'Contact Us', id: 'Hubungi Kami' },
  href: '/contact',
  variant: 'secondary',
}

export const FOOTER_TAGLINE = {
  en: ['Travel mindfully,', 'leave a good trace.'],
  id: ['Menjelajah dengan sadar,', 'meninggalkan jejak yang baik.'],
}

export const FOOTER_COLUMNS = [
  {
    title: { en: 'Explore', id: 'Jelajah' },
    links: [
      { label: { en: 'Destinations', id: 'Destinasi' }, href: '/destinations' },
      { label: { en: 'Journal', id: 'Jurnal' }, href: '/journal' },
      { label: { en: 'Gallery', id: 'Galeri' }, href: '/#gallery' },
    ],
  },
  {
    title: { en: 'JEJAK', id: 'JEJAK' },
    links: [
      { label: { en: 'About', id: 'Tentang Kami' }, href: '/about' },
      { label: { en: 'Responsible Travel', id: 'Wisata Bertanggung Jawab' }, href: '/#responsible-travel' },
      { label: { en: 'Indonesia in Numbers', id: 'Indonesia dalam Angka' }, href: '/#impact' },
      { label: { en: 'Contact Us', id: 'Hubungi Kami' }, href: '/contact' },
    ],
  },
  {
    title: { en: 'Follow', id: 'Ikuti' },
    // TODO: pastikan akun media sosial resmi sebelum rilis.
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/jejak.id', external: true },
      { label: 'Facebook', href: 'https://www.facebook.com/jejak.id', external: true },
      { label: 'Threads', href: 'https://www.threads.net/@jejak.id', external: true },
    ],
  },
]

/** Blok brand footer. TODO: pastikan alamat dan kontak sebelum rilis. */
export const FOOTER_ADDRESS = ['JEJAK Indonesia', 'Jl. Kemang Raya No. 8', 'Jakarta Selatan 12730, Indonesia']

export const FOOTER_CONTACTS = [
  { type: 'email', label: 'halo@jejak.id', href: 'mailto:halo@jejak.id' },
  { type: 'phone', label: '+62 21 7179 0800', href: 'tel:+622171790800' },
  { type: 'whatsapp', label: '+62 812 8000 0800', href: 'https://wa.me/6281280000800' },
]

/**
 * Link baris bawah. Privacy dan Terms belum punya halaman, jadi membuka
 * halaman 404 (seperti route tak dikenal lainnya); Photo Credits halaman asli.
 */
export const LEGAL_LINKS = [
  { label: { en: 'Privacy Policy', id: 'Kebijakan Privasi' }, href: '/privacy-policy' },
  { label: { en: 'Terms of Service', id: 'Syarat Layanan' }, href: '/terms-of-service' },
  { label: { en: 'Photo Credits', id: 'Kredit Foto' }, href: '/credits' },
]
