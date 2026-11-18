/**
 * Prev/next circle buttons for a carousel track (pair with useCarousel).
 * @param {{prev: string, next: string}} props.labels  Accessible names.
 */
function CarouselControls({ canPrev, canNext, onPrev, onNext, labels, className = '', ...rest }) {
  return (
    <div className={className} {...rest}>
      <button
        type="button"
        className="carousel-button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label={labels.prev}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        className="carousel-button"
        onClick={onNext}
        disabled={!canNext}
        aria-label={labels.next}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default CarouselControls
