import type { CSSProperties } from 'react'
import type { MediaSlot } from '../data/media'

interface MediaProps {
  slot: MediaSlot
  className?: string
  style?: CSSProperties
}

function StrandIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M16 10c3.4-2.6 6.8-2.6 10.2 0s6.8 2.6 10.2 0" opacity="0.5" />
      <path d="M14 22c3.4-2.6 6.8-2.6 10.2 0s6.8 2.6 10.2 0" />
      <path d="M14 34c3.4-2.6 6.8-2.6 10.2 0s6.8 2.6 10.2 0" opacity="0.5" />
    </svg>
  )
}

function Media({ slot, className = '', style }: MediaProps) {
  return (
    <div
      className={`media ${className}`.trim()}
      style={{ aspectRatio: slot.ratio, ...style }}
    >
      {slot.src ? (
        <img src={slot.src} alt={slot.alt} loading="lazy" decoding="async" />
      ) : (
        <div className="media-ph" role="img" aria-label={`${slot.alt} (заглушка)`}>
          <div className="media-ph-inner">
            <StrandIcon />
            <span className="media-ph-label">{slot.label}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Media
