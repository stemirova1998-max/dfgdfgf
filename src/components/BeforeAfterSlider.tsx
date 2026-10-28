import { useState } from 'react'
import Media from './Media'
import { media } from '../data/media'

function BeforeAfterSlider() {
  const [position, setPosition] = useState(50)

  return (
    <div className="ba">
      <div className="ba-track">
        <div className="ba-layer ba-layer-base">
          <Media slot={media.before} />
          <span className="ba-label ba-label-left">До</span>
        </div>
        <div
          className="ba-layer ba-layer-top"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Media slot={media.after} />
          <span className="ba-label ba-label-right">После</span>
        </div>
        <div className="ba-handle" style={{ left: `${position}%` }} aria-hidden="true">
          <span className="ba-handle-line" />
          <span className="ba-handle-grip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 8l-4 4 4 4" />
              <path d="M16 8l4 4-4 4" />
            </svg>
          </span>
        </div>
        <input
          className="ba-input"
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label="Сравнение волос до и после процедуры"
          onChange={(e) => setPosition(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default BeforeAfterSlider
