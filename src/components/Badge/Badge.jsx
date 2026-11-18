import './Badge.css'

/** Badge */
function Badge({ as: Tag = 'span', className = '', children, ...rest }) {
  const classes = ['badge', className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export default Badge
