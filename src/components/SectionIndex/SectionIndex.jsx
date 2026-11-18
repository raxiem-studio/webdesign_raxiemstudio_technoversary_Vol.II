import './SectionIndex.css'

/** Nomor section */
function SectionIndex({ number, inverse = false, className = '', ...rest }) {
  const padded = String(number).padStart(2, '0')
  const classes = ['section-index', inverse && 'section-index--inverse', className]
    .filter(Boolean)
    .join(' ')
  return (
    <span className={classes} {...rest}>
      {padded}
    </span>
  )
}

export default SectionIndex
