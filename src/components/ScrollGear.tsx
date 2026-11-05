import { useEffect, useMemo, useRef, useState } from 'react'

const RING_R = 26
const CIRCUMFERENCE = 2 * Math.PI * RING_R

/** Путь шестерни: зубья строятся по кругу, поэтому форма всегда ровная. */
function gearPath(teeth: number, outerR: number, innerR: number, hubR: number) {
  const step = (Math.PI * 2) / teeth
  const tooth = step * 0.42
  const pts: string[] = []

  for (let i = 0; i < teeth; i += 1) {
    const a = i * step
    const corners = [
      [a - tooth / 2, innerR],
      [a - tooth / 3, outerR],
      [a + tooth / 3, outerR],
      [a + tooth / 2, innerR],
      [a + step / 2, innerR],
    ] as const
    for (const [angle, r] of corners) {
      const x = 32 + r * Math.cos(angle - Math.PI / 2)
      const y = 32 + r * Math.sin(angle - Math.PI / 2)
      pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
    }
  }

  return `M${pts.join('L')}Z M32 32m-${hubR} 0a${hubR} ${hubR} 0 1 0 ${hubR * 2} 0a${hubR} ${hubR} 0 1 0 ${-hubR * 2} 0`
}

/**
 * Шестерёнка прокрутки: крутится вместе со страницей, по кольцу виден прогресс,
 * клик пролистывает вниз, а в конце страницы — возвращает наверх.
 */
function ScrollGear() {
  const bodyRef = useRef<SVGGElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const [progress, setProgress] = useState(0)
  const path = useMemo(() => gearPath(11, 21.5, 17.5, 8), [])

  useEffect(() => {
    let raf = 0
    let lastY = window.scrollY
    let angle = 0

    const apply = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const y = window.scrollY
      const ratio = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0

      // Шестерня вращается только вместе с прокруткой, поэтому не мешает
      // пользователям, которым важно отсутствие самостоятельной анимации.
      if (bodyRef.current) {
        angle += (y - lastY) * 0.5
        bodyRef.current.style.transform = `rotate(${angle}deg)`
      }
      lastY = y

      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - ratio))
      }
      setProgress(ratio)
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const atBottom = progress > 0.985

  return (
    <button
      type="button"
      className="scroll-gear"
      onClick={() =>
        atBottom
          ? window.scrollTo({ top: 0, behavior: 'smooth' })
          : window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
      }
      aria-label={atBottom ? 'Вернуться к началу' : 'Пролистать вниз'}
      title={atBottom ? 'Наверх' : 'Вниз'}
    >
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="gearBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe3ee" />
            <stop offset="45%" stopColor="#f3a8c4" />
            <stop offset="100%" stopColor="#b8557c" />
          </linearGradient>
          <linearGradient id="gearRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff4f8" />
            <stop offset="55%" stopColor="#f3a8c4" />
            <stop offset="100%" stopColor="#e983ab" />
          </linearGradient>
        </defs>

        <circle className="scroll-gear-track" cx="32" cy="32" r={RING_R} />
        <circle
          ref={ringRef}
          className="scroll-gear-progress"
          cx="32"
          cy="32"
          r={RING_R}
          stroke="url(#gearRing)"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />

        <g ref={bodyRef} className="scroll-gear-body">
          <path d={path} fill="url(#gearBody)" fillRule="evenodd" />
        </g>

        <circle className="scroll-gear-hole" cx="32" cy="32" r="8.4" />
        <text className="scroll-gear-value" x="32" y="35.4" textAnchor="middle">
          {Math.round(progress * 100)}
        </text>
      </svg>
    </button>
  )
}

export default ScrollGear
