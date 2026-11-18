import { useLanguage } from '../../i18n/context.js'
import Container from '../Container/Container.jsx'
import { MailIcon, PhoneIcon, WhatsAppIcon } from '../Icons/Icons.jsx'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

function ContactIcon({ type }) {
  if (type === 'email') return <MailIcon />
  if (type === 'phone') return <PhoneIcon />
  return <WhatsAppIcon />
}

/**
 * Site footer: brand block, link columns, optional oversized wordmark, legal row.
 * @param {object}   [props.background]  Image rendered blurred behind the footer.
 * @param {string|string[]} [props.tagline]  Pass an array to force line breaks.
 * @param {string[]} [props.address]
 * @param {Array<{type: 'email'|'phone'|'whatsapp', label: string, href: string}>} [props.contacts]
 * @param {Array<{title: string, links: Array<{label: string, href: string, external?: boolean}>}>} [props.columns]
 * @param {Array<{label: string, href: string}>} [props.legalLinks]
 * @param {'default'|'oversized'} [props.wordmark='default']
 */
function Footer({
  brand = 'JEJAK',
  background,
  tagline,
  address = [],
  contacts = [],
  columns = [],
  legalLinks = [],
  note,
  year = CURRENT_YEAR,
  wordmark = 'default',
}) {
  const { t } = useLanguage()
  const oversized = wordmark === 'oversized'
  const classes = ['footer', 'on-dark', oversized && 'footer--oversized'].filter(Boolean).join(' ')

  return (
    <footer className={classes}>
      {background && (
        <div className="footer__backdrop" aria-hidden="true">
          <img
            className="footer__backdrop-image"
            src={background.src}
            alt=""
            width={background.width}
            height={background.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <Container size="content" className="footer__inner">
        {/* Column count drives the grid, so dropping a column leaves no empty track. */}
        <div className="footer__grid" style={{ '--footer-columns': columns.length || 1 }}>
          <div className="footer__brand">
            <p className="footer__wordmark">{brand}</p>
            {tagline && (
              <p className="footer__tagline">
                {Array.isArray(tagline)
                  ? tagline.map((line) => (
                      <span key={line} className="footer__tagline-line">
                        {line}
                      </span>
                    ))
                  : tagline}
              </p>
            )}
            {address.length > 0 && (
              <address className="footer__address">
                {address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            )}
            {contacts.length > 0 && (
              <ul className="footer__contacts" role="list">
                {contacts.map((contact) => (
                  <li key={contact.href}>
                    <a
                      href={contact.href}
                      className="footer__contact"
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span className="footer__contact-icon">
                        <ContactIcon type={contact.type} />
                      </span>
                      {contact.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {columns.map((column) => (
            <nav key={column.title} className="footer__column" aria-label={column.title}>
              <p className="footer__heading">{column.title}</p>
              <ul className="footer__list" role="list">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="footer__link"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      {oversized && (
        <p className="footer__giant" aria-hidden="true">
          {brand}
        </p>
      )}

      <Container size="content">
        <div className="footer__bottom">
          <p className="footer__copyright">
          © {year} {brand}. {t('footer.credit')}
            {note && ` · ${note}`}
          </p>
          {legalLinks.length > 0 && (
            <ul className="footer__legal" role="list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer__legal-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
