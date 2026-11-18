import './SectionIndex.css'

/**
 * Zero-padded section number (01–99).
 * @param {number} props.number
 * @param {boolean} [props.inverse]  For dark backgrounds.
 */
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
