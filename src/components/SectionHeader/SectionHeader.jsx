import Eyebrow from '../Eyebrow/Eyebrow.jsx'
import SectionIndex from '../SectionIndex/SectionIndex.jsx'
import './SectionHeader.css'

/**
 * Section heading block: optional rule, index + eyebrow, title and lead.
 * @param {1|2|3} [props.headingLevel=2]  Keep a single h1 per page.
 * @param {boolean} [props.compact]  Tighter spacing, H1-size title, no lead.
 * @param {'left'|'center'} [props.align='left']
 * @param {boolean} [props.rule=true]  Hairline above the heading.
 * @param {string}  [props.titleId]    For aria-labelledby on the parent section.
 */
function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  headingLevel = 2,
  compact = false,
  align = 'left',
  rule = true,
  titleWeight = 'semibold',
  titleId,
  className = '',
  ...rest
}) {
  const Heading = `h${headingLevel}`
  const classes = [
    'section-header',
    compact && 'section-header--compact',
    align === 'center' && 'section-header--center',
    !rule && 'section-header--no-rule',
    titleWeight === 'medium' && 'section-header--title-medium',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes} {...rest}>
      {(index || eyebrow) && (
        <div className="section-header__meta">
          {index && <SectionIndex number={index} />}
          {eyebrow && <Eyebrow as="span">{eyebrow}</Eyebrow>}
        </div>
      )}
      <Heading id={titleId} className="section-header__title">
        {title}
      </Heading>
      {!compact && lead && <p className="section-header__lead">{lead}</p>}
    </header>
  )
}

export default SectionHeader
