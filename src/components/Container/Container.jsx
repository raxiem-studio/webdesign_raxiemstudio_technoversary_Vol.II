import './Container.css'

/** Container */
function Container({ as: Tag = 'div', size = 'content', className = '', children, ...rest }) {
  const classes = ['container', `container--${size}`, className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export default Container
