import { FOOTER_ADDRESS, FOOTER_CONTACTS } from './navigation.js'

/**
 * Konten halaman Contact. Judul, lead, dan copy form ada di src/i18n/strings.js
 * (contact.*). Detail kontak diambil dari data footer supaya selalu sinkron;
 * label screen reader dari `contact.detail.<type>`.
 */
const byType = (type) => FOOTER_CONTACTS.find((c) => c.type === type)
const pick = (contact) => ({ value: contact.label, href: contact.href })

export const CONTACT_DETAILS = [
  { type: 'email', ...pick(byType('email')) },
  { type: 'whatsapp', ...pick(byType('whatsapp')), external: true },
  { type: 'phone', ...pick(byType('phone')) },
  {
    type: 'address',
    /* Satu entri per baris yang ditampilkan. */
    lines: FOOTER_ADDRESS.slice(1),
    href: null,
  },
]

/** Alamat kontak publik yang tampil di halaman. */
export const CONTACT_EMAIL = byType('email').label

/** Inbox penerima pesan form (terpisah dari alamat publik). */
export const CONTACT_FORM_RECIPIENT = 'raxiemstudio@gmail.com'

/**
 * Pengiriman utama: EmailJS dengan template di
 * email-templates/contact-notification.html. Key diambil dari .env.local
 * (lihat .env.example); public key EmailJS memang aman ada di browser.
 */
export const EMAILJS = {
  endpoint: 'https://api.emailjs.com/api/v1.0/email/send',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
EMAILJS.ready = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)

/** Cadangan selama EmailJS belum diset (tampilan FormSubmit tidak bisa diubah). */
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_FORM_RECIPIENT}`

/**
 * Topik form. Form menyimpan `id`; pengunjung melihat label sesuai bahasanya,
 * sedangkan email notifikasi selalu dapat label bahasa Indonesia supaya
 * inbox konsisten dengan template email (berbahasa Indonesia).
 */
export const CONTACT_TOPICS = [
  { id: 'trip', label: { en: 'Planning a trip', id: 'Merencanakan perjalanan' } },
  { id: 'destination', label: { en: 'Question about a destination', id: 'Pertanyaan tentang destinasi' } },
  { id: 'partnership', label: { en: 'Collaboration and partnerships', id: 'Kerja sama dan kemitraan' } },
  { id: 'other', label: { en: 'Something else', id: 'Lainnya' } },
]

export const findTopic = (id) => CONTACT_TOPICS.find((topic) => topic.id === id)
