import './Eyebrow.css'

/** Eyebrow */
function Eyebrow({ as: Tag = 'p', tone = 'accent', className = '', children, ...rest }) {
  const classes = ['eyebrow', `eyebrow--${tone}`, className].filter(Boolean).join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export default Eyebrow
