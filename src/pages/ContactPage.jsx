import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Button, Container } from '../components/index.js'
import {
  AlertIcon,
  CheckCircleIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '../components/Icons/Icons.jsx'
import {
  CONTACT_DETAILS,
  CONTACT_FORM_ENDPOINT,
  EMAILJS,
  CONTACT_FORM_RECIPIENT,
  CONTACT_TOPICS,
  findTopic,
} from '../data/contact.js'
import { useInView } from '../hooks/useInView.js'
import { useLanguage } from '../i18n/context.js'
import './ContactPage.css'

const ICONS = {
  email: MailIcon,
  whatsapp: WhatsAppIcon,
  phone: PhoneIcon,
  address: MapPinIcon,
}

const EMPTY = { name: '', email: '', topic: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MESSAGE_MAX_HEIGHT = 480 // px; the message box scrolls beyond this

/**
 * Returns error codes (keys of `contact.error.*` in strings.js), so a shown
 * error follows a language switch. Key order matches the visual order.
 */
function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'nameRequired'
  if (!values.email.trim()) errors.email = 'emailRequired'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'emailInvalid'
  if (!values.topic) errors.topic = 'topicRequired'
  if (!values.message.trim()) errors.message = 'messageRequired'
  return errors
}

/* The inbox always gets the Indonesian topic label (see CONTACT_TOPICS). */
const topicForInbox = (id) => findTopic(id)?.label.id ?? ''

const composeMail = (values) => ({
  subject: `[JEJAK] ${topicForInbox(values.topic)} — ${values.name.trim()}`,
  body: `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`,
})

const SENT_AT = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Asia/Jakarta',
})

/** EmailJS: fills the branded template (email-templates/contact-notification.html). */
async function sendViaEmailJS(values) {
  const response = await fetch(EMAILJS.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: EMAILJS.templateId,
      user_id: EMAILJS.publicKey,
      template_params: {
        name: values.name.trim(),
        email: values.email.trim(),
        topic: topicForInbox(values.topic),
        message: values.message.trim(),
        sent_at: `${SENT_AT.format(new Date())} WIB`,
        to_email: CONTACT_FORM_RECIPIENT,
      },
    }),
  })
  if (!response.ok) throw new Error(await response.text().catch(() => 'Send failed'))
}

/** FormSubmit fallback: fixed layout, so only the field labels can be tidied. */
async function sendViaFormSubmit(values, mail, honey) {
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      Nama: values.name.trim(),
      Email: values.email.trim(),
      Topik: topicForInbox(values.topic),
      Pesan: values.message.trim(),
      _replyto: values.email.trim(),
      _subject: mail.subject,
      _template: 'box',
      _honey: honey,
    }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || String(data.success) !== 'true') throw new Error(data.message || 'Send failed')
}

async function sendMessage(values, mail, honey) {
  // Bots fill the hidden field; pretend success without sending anything.
  if (honey) return
  if (EMAILJS.ready) await sendViaEmailJS(values)
  else await sendViaFormSubmit(values, mail, honey)
}

/**
 * Label, control and inline error, wired with aria-invalid / aria-describedby.
 * `custom` controls aren't labelable elements: the label focuses them on click
 * and they take their name from aria-labelledby instead.
 */
function Field({ id, label, error, optional, custom, children }) {
  const { t } = useLanguage()
  const errorId = `${id}-error`
  const labelId = `${id}-label`
  const labelProps = custom
    ? { onClick: () => document.getElementById(id)?.focus() }
    : { htmlFor: id }
  return (
    <div className="contact-form__field">
      <label id={labelId} {...labelProps}>
        {label}
        {optional ? (
          <span className="contact-form__optional"> {t('contact.optional')}</span>
        ) : (
          // Visual cue only; assistive tech gets aria-required on the control.
          <span className="contact-form__required" aria-hidden="true">*</span>
        )}
      </label>
      {children(
        {
          id,
          'aria-required': optional ? undefined : 'true',
          'aria-invalid': error ? 'true' : undefined,
          'aria-describedby': error ? errorId : undefined,
        },
        { labelId },
      )}
      {error && (
        <p id={errorId} className="field-error">
          <AlertIcon />
          {t(`contact.error.${error}`)}
        </p>
      )}
    </div>
  )
}

/**
 * Select-only combobox (WAI-ARIA APG pattern): focus stays on the trigger and
 * the highlighted option is exposed through aria-activedescendant.
 * `options` are `{ value, label }` with labels already in the active language;
 * `value` / onChange use the option's `value`.
 */
function TopicSelect({ id, labelId, value, options, placeholder, onChange, onBlur, ...aria }) {
  const listId = `${id}-listbox`
  const optionId = (index) => `${id}-option-${index}`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const search = useRef({ text: '', timer: 0 })
  const selected = options.findIndex((option) => option.value === value)
  const last = options.length - 1

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (open && active >= 0) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  useEffect(() => {
    const state = search.current
    return () => clearTimeout(state.timer)
  }, [])

  const show = (index) => {
    setActive(index)
    setOpen(true)
  }

  const choose = (index) => {
    onChange(options[index].value)
    setOpen(false)
  }

  /* Type-to-select: keystrokes within 500ms of each other build a prefix. */
  const matchTyped = (key) => {
    const state = search.current
    clearTimeout(state.timer)
    state.text += key.toLowerCase()
    state.timer = setTimeout(() => {
      state.text = ''
    }, 500)
    const from = open ? active : selected
    const start = state.text.length === 1 ? from + 1 : Math.max(from, 0)
    for (let step = 0; step < options.length; step += 1) {
      const index = (start + step) % options.length
      if (options[index].label.toLowerCase().startsWith(state.text)) return index
    }
    return -1
  }

  const onKeyDown = (event) => {
    const start = selected >= 0 ? selected : 0
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) show(start)
        else setActive((i) => Math.min(i + 1, last))
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!open) show(start)
        else if (event.altKey && active >= 0) choose(active)
        else setActive((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        event.preventDefault()
        show(0)
        break
      case 'End':
        event.preventDefault()
        show(last)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (open && active >= 0) choose(active)
        else show(start)
        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          setOpen(false)
        }
        break
      case 'Tab':
        if (open) {
          if (active >= 0) choose(active)
          else setOpen(false)
        }
        break
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          const index = matchTyped(event.key)
          if (index < 0) break
          if (open) setActive(index)
          else onChange(options[index].value)
        }
    }
  }

  return (
    <div ref={rootRef} className={`contact-select${open ? ' is-open' : ''}`}>
      <div
        {...aria}
        id={id}
        role="combobox"
        tabIndex={0}
        className="contact-select__trigger"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-expanded={open}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : show(selected >= 0 ? selected : 0))}
        onKeyDown={onKeyDown}
        onBlur={() => {
          setOpen(false)
          onBlur?.()
        }}
      >
        <span className={`contact-select__value${selected < 0 ? ' is-placeholder' : ''}`}>
          {selected >= 0 ? options[selected].label : placeholder}
        </span>
        <svg
          className="contact-select__chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        className="contact-select__list"
        // Keep focus on the trigger (and the list open) while using the pointer here.
        onMouseDown={(event) => event.preventDefault()}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            id={optionId(index)}
            role="option"
            aria-selected={index === selected}
            className={`contact-select__option${index === active ? ' is-active' : ''}`}
            onPointerMove={() => setActive(index)}
            onClick={() => choose(index)}
          >
            <span>{option.label}</span>
            <svg
              className="contact-select__check"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Contact page. Submissions go to CONTACT_FORM_RECIPIENT through EmailJS
 * (branded template), or FormSubmit until EmailJS keys are configured. If the
 * request fails, the visitor is offered a mailto link with the message prefilled.
 *
 * Submit button has two states: disabled (grey) until every field is valid,
 * then active (accent). Because a disabled button can't reveal what's missing,
 * each field shows its error when the visitor leaves it.
 */
function ContactPage() {
  const { t, pick } = useLanguage()
  const uid = useId()
  const topicOptions = CONTACT_TOPICS.map((topic) => ({ value: topic.id, label: pick(topic.label) }))
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [failedMail, setFailedMail] = useState(null)
  const statusRef = useRef(null)
  const messageRef = useRef(null)
  const [introRef, introIn] = useInView({ threshold: 0 })
  const [bodyRef, bodyIn] = useInView({ threshold: 0.05 })

  const ready = Object.keys(validate(values)).length === 0
  const sending = status === 'sending'

  // Message box grows with its content (min = rows={6}), then scrolls past the
  // cap. Re-measured on width changes too, since the text re-wraps.
  useLayoutEffect(() => {
    const fit = () => {
      const el = messageRef.current
      if (!el) return
      el.style.height = 'auto'
      const borders = el.offsetHeight - el.clientHeight
      const full = el.scrollHeight + borders
      el.style.height = `${Math.min(full, MESSAGE_MAX_HEIGHT)}px`
      el.style.overflowY = full > MESSAGE_MAX_HEIGHT ? 'auto' : 'hidden'
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [values.message])

  // Latest values, readable from a blur that fires in the same event as a change
  // (e.g. Tab picking a topic) before React has re-rendered.
  // setField also writes it synchronously; this keeps it in step after resets.
  const latest = useRef(values)
  useLayoutEffect(() => {
    latest.current = values
  }, [values])

  /** Shows or clears one field's error, leaving fields not yet visited alone. */
  const refreshError = (field, source) => {
    const message = validate(source)[field]
    setErrors((prev) => {
      if (prev[field] === message) return prev
      const next = { ...prev }
      if (message) next[field] = message
      else delete next[field]
      return next
    })
  }

  const touch = (field) => () => refreshError(field, latest.current)

  // After a successful send the form empties and the submit button disables
  // itself, so move focus to the confirmation instead of letting it fall to
  // <body>. (On error the button stays enabled and keeps focus; the alert speaks.)
  useEffect(() => {
    if (status === 'sent') statusRef.current?.focus()
  }, [status])

  const setField = (field, value) => {
    const next = { ...latest.current, [field]: value }
    latest.current = next
    setValues(next)
    if (errors[field]) refreshError(field, next)
    if (status === 'sent' || status === 'error') setStatus('idle')
  }

  const update = (field) => (event) => setField(field, event.target.value)

  const onSubmit = async (event) => {
    event.preventDefault()
    // The button is disabled until valid, which also blocks Enter-to-submit;
    // this guard only covers a double submit while a request is in flight.
    if (sending || !ready) return
    const form = event.currentTarget

    const mail = composeMail(values)
    setStatus('sending')
    try {
      await sendMessage(values, mail, form.elements.namedItem('_honey')?.value ?? '')
      setValues(EMPTY)
      setErrors({})
      setFailedMail(null)
      setStatus('sent')
    } catch {
      setFailedMail(mail)
      setStatus('error')
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-page__intro" aria-labelledby="contact-title">
        <Container size="content">
          <div ref={introRef} className={`contact-page__head${introIn ? ' is-visible' : ''}`}>
            <h1 id="contact-title" className="contact-page__title reveal">
              {t('contact.title')}
            </h1>
            <p className="contact-page__lead reveal" style={{ '--reveal-delay': '240ms' }}>
              {t('contact.lead')}
            </p>
          </div>
        </Container>
      </section>

      <section aria-label={t('contact.section')}>
        <Container size="content">
          <div ref={bodyRef} className={`contact-page__body${bodyIn ? ' is-visible' : ''}`}>
            <ul className="contact-details" role="list">
              {CONTACT_DETAILS.map((item, i) => {
                const Icon = ICONS[item.type]
                const value = item.href ? (
                  <a
                    href={item.href}
                    className="contact-details__value"
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="contact-details__value">
                    {item.lines
                      ? item.lines.map((line) => (
                          <span key={line} className="contact-details__line">
                            {line}
                          </span>
                        ))
                      : item.value}
                  </span>
                )
                return (
                  <li
                    key={item.type}
                    className="contact-details__item reveal"
                    style={{ '--reveal-delay': `${i * 120}ms` }}
                  >
                    <span className="contact-details__icon">
                      <Icon size={20} />
                    </span>
                    <span className="contact-details__text">
                      {/* Visible label is dropped; keep it for screen readers. */}
                      <span className="visually-hidden">{t(`contact.detail.${item.type}`)}: </span>
                      {value}
                    </span>
                  </li>
                )
              })}
            </ul>

            <form
              className="contact-form reveal"
              style={{ '--reveal-delay': '240ms' }}
              onSubmit={onSubmit}
              noValidate
              aria-busy={sending || undefined}
            >
              {/* Honeypot: invisible to people, filled by bots, dropped by FormSubmit. */}
              <input
                type="text"
                name="_honey"
                className="contact-form__honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="contact-form__row">
                <Field id={`${uid}-name`} label={t('contact.name')} error={errors.name}>
                  {(props) => (
                    <input {...props} type="text" autoComplete="name" placeholder={t('contact.namePlaceholder')} value={values.name} onChange={update('name')} onBlur={touch('name')} />
                  )}
                </Field>
                <Field id={`${uid}-email`} label={t('contact.email')} error={errors.email}>
                  {(props) => (
                    <input {...props} type="email" autoComplete="email" inputMode="email" placeholder={t('contact.emailPlaceholder')} value={values.email} onChange={update('email')} onBlur={touch('email')} />
                  )}
                </Field>
              </div>
              <Field id={`${uid}-topic`} label={t('contact.topic')} error={errors.topic} custom>
                {(props, { labelId }) => (
                  <TopicSelect
                    {...props}
                    labelId={labelId}
                    value={values.topic}
                    options={topicOptions}
                    placeholder={t('contact.topicPlaceholder')}
                    onChange={(topic) => setField('topic', topic)}
                    onBlur={touch('topic')}
                  />
                )}
              </Field>
              <Field id={`${uid}-message`} label={t('contact.message')} error={errors.message}>
                {(props) => (
                  <textarea {...props} ref={messageRef} rows={6} placeholder={t('contact.messagePlaceholder')} value={values.message} onChange={update('message')} onBlur={touch('message')} />
                )}
              </Field>

              <div className="contact-form__actions">
                <Button
                  type="submit"
                  size="lg"
                  variant="accent"
                  className="contact-form__submit"
                  // Native disabled until valid; while sending the button keeps
                  // focus and is blocked through aria-disabled + the onSubmit guard.
                  disabled={!ready}
                  aria-disabled={sending || undefined}
                >
                  {sending ? t('contact.sending') : t('contact.submit')}
                </Button>
              </div>

              {status === 'sent' && (
                // Announced by receiving focus, so no live-region role (avoids a double read).
                <p ref={statusRef} tabIndex={-1} className="contact-form__status">
                  <CheckCircleIcon />
                  {t('contact.sent')}
                </p>
              )}

              {status === 'error' && failedMail && (
                <p className="contact-form__status contact-form__status--error" role="alert">
                  <AlertIcon size={20} />
                  <span>
                    {t('contact.failed')}{' '}
                    <a
                      href={`mailto:${CONTACT_FORM_RECIPIENT}?subject=${encodeURIComponent(failedMail.subject)}&body=${encodeURIComponent(failedMail.body)}`}
                    >
                      {t('contact.failedLink')}
                    </a>
                    .
                  </span>
                </p>
              )}
            </form>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default ContactPage
