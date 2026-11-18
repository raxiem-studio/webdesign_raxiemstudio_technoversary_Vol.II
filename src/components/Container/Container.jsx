import './Container.css'

/**
 * Horizontal layout boundary with page gutters.
 * @param {'full'|'content'|'prose'} [props.size='content']  1440 / 1248 / 640px max width.
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
