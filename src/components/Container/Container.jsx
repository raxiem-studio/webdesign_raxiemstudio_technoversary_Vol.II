import './Container.css'

/**
 * Batas layout horizontal dengan gutter halaman.
 * @param {'full'|'content'|'prose'} [props.size='content']  Lebar maks 1440 / 1248 / 640px.
 * @param {string} [props.as='div']
 */
function Container({ as: Tag = 'div', size = 'content', className = '', children, ...rest }) {
  const classes = ['container', `container--${size}`, className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export default Container
