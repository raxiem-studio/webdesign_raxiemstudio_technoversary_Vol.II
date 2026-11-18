import './Button.css'

/**
 * @param {'primary'|'accent'|'secondary'|'text'|'glass'} [props.variant='primary']
 *   `glass` khusus dipakai di atas foto.
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.arrow]  Tambah ikon panah di belakang.
 * @param {string}  [props.href]   Render <a>, bukan <button>.
 */
function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  href,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && (
        <svg
          className="btn__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}

export default Button
