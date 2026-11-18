/**
 * Contact page content. Title, lead and form copy live in src/i18n/strings.js
 * (contact.*). Each screen-reader label comes from `contact.detail.<type>`.
 *
 * The Contact page lists only channels that really work (competition brief
 * 11.4), so it does not read the footer's contact data.
 */

/** Inbox that receives contact-form submissions (also shown on the page). */
export const CONTACT_FORM_RECIPIENT = 'raxiemstudio@gmail.com'

/** Public contact address shown on the page. */
export const CONTACT_EMAIL = CONTACT_FORM_RECIPIENT

export const CONTACT_DETAILS = [
  { type: 'email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
]

/**
 * Primary delivery: EmailJS with the branded template in
 * email-templates/contact-notification.html. Keys come from .env.local
 * (see .env.example); EmailJS public keys are meant to live in the browser.
 */
export const EMAILJS = {
  endpoint: 'https://api.emailjs.com/api/v1.0/email/send',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
EMAILJS.ready = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)

/** Fallback delivery while EmailJS isn't configured (FormSubmit's fixed layout). */
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_FORM_RECIPIENT}`

/**
 * Form topics. The form stores `id`; the visitor sees the label in their
 * language, and the notification email always gets the Indonesian label so
 * the inbox stays consistent with the (Indonesian) email template.
 */
export const CONTACT_TOPICS = [
  { id: 'trip', label: { en: 'Planning a trip', id: 'Merencanakan perjalanan' } },
  { id: 'destination', label: { en: 'Question about a destination', id: 'Pertanyaan tentang destinasi' } },
  { id: 'partnership', label: { en: 'Collaboration and partnerships', id: 'Kerja sama dan kemitraan' } },
  { id: 'other', label: { en: 'Something else', id: 'Lainnya' } },
]

export const findTopic = (id) => CONTACT_TOPICS.find((topic) => topic.id === id)
