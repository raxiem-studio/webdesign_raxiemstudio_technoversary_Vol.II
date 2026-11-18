import { FOOTER_ADDRESS, FOOTER_CONTACTS } from './navigation.js'

/** Kontak */
const byType = (type) => FOOTER_CONTACTS.find((c) => c.type === type)
const pick = (contact) => ({ value: contact.label, href: contact.href })

export const CONTACT_DETAILS = [
  { type: 'email', ...pick(byType('email')) },
  { type: 'whatsapp', ...pick(byType('whatsapp')), external: true },
  { type: 'phone', ...pick(byType('phone')) },
  {
    type: 'address',
    /* Baris alamat */
    lines: FOOTER_ADDRESS.slice(1),
    href: null,
  },
]

/** Email publik */
export const CONTACT_EMAIL = byType('email').label

/** Penerima form */
export const CONTACT_FORM_RECIPIENT = 'raxiemstudio@gmail.com'

/** EmailJS */
export const EMAILJS = {
  endpoint: 'https://api.emailjs.com/api/v1.0/email/send',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
EMAILJS.ready = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)

/** FormSubmit (cadangan) */
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_FORM_RECIPIENT}`

/** Topik form */
export const CONTACT_TOPICS = [
  { id: 'trip', label: { en: 'Planning a trip', id: 'Merencanakan perjalanan' } },
  { id: 'destination', label: { en: 'Question about a destination', id: 'Pertanyaan tentang destinasi' } },
  { id: 'partnership', label: { en: 'Collaboration and partnerships', id: 'Kerja sama dan kemitraan' } },
  { id: 'other', label: { en: 'Something else', id: 'Lainnya' } },
]

export const findTopic = (id) => CONTACT_TOPICS.find((topic) => topic.id === id)
