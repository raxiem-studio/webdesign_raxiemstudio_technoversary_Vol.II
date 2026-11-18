/**
 * Nav, footer and legal links. Text is bilingual `{ en, id }`; components pick
 * the active language. Section anchors are prefixed with "/" so they resolve
 * from any route.
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
  // No social column: JEJAK has no official accounts yet, and links to
  // unverified handles would be non-working, fictitious contact data.
]

/**
 * Footer brand block. Only real, working channels are listed (competition
 * rule: no decorative or fictitious contact data). Add a street address,
 * phone or WhatsApp here once they really exist; the footer and the Contact
 * page both read from these lists.
 */
export const FOOTER_ADDRESS = []

export const FOOTER_CONTACTS = [
  { type: 'email', label: 'raxiemstudio@gmail.com', href: 'mailto:raxiemstudio@gmail.com' },
]

/* Bottom-row links. Privacy / Terms are omitted until real pages exist. */
export const LEGAL_LINKS = [{ label: { en: 'Photo Credits', id: 'Kredit Foto' }, href: '/credits' }]
