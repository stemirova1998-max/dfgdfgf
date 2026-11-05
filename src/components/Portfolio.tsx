import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import Media from './Media'
import Reveal from './Reveal'
import { media } from '../data/media'

const items = media.gallery

/** Совпадает с scale в .g-item / .g-item.is-active (index.css). */
const SCALE_ACTIVE = 1.6
const SCALE_IDLE = 0.85

function Portfolio() {
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  /**
   * Сдвигаем ленту так, чтобы активный круг оказался по центру сцены.
   * Центр считается по layout-координатам (offsetLeft), поэтому
   * scale активного элемента не влияет на расчёт.
   *
   * Круги, которые не влезают в сцену целиком, помечаем is-off:
   * они плавно растворяются, вместо того чтобы обрезаться краем.
   */
  const center = useCallback(() => {
    const stage = stageRef.current
    const track = trackRef.current
    const activeEl = itemRefs.current[active]
    if (!stage || !track || !activeEl) return

    const offset = activeEl.offsetLeft + activeEl.offsetWidth / 2
    const shift = stage.clientWidth / 2 - offset
    track.style.transform = `translate3d(${shift}px, 0, 0)`

    const stageWidth = stage.clientWidth
    itemRefs.current.forEach((el, index) => {
      if (!el) return

      const scale = index === active ? SCALE_ACTIVE : SCALE_IDLE
      const visualWidth = el.offsetWidth * scale
      const centerX = el.offsetLeft + el.offsetWidth / 2 + shift
      const fits = centerX - visualWidth / 2 >= 0 && centerX + visualWidth / 2 <= stageWidth

      el.classList.toggle('is-off', !fits && index !== active)
    })
  }, [active])

  useLayoutEffect(() => {
    center()
  }, [center])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const onResize = () => center()
    window.addEventListener('resize', onResize)

    let observer: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(onResize)
      observer.observe(stage)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      observer?.disconnect()
    }
  }, [center])

  const go = (direction: 1 | -1) => {
    setActive((current) => Math.min(items.length - 1, Math.max(0, current + direction)))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <div className="g-head">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Работы</p>
              <h2 className="section-title">
                Результаты, которые <em>говорят сами</em>
              </h2>
            </div>
          </Reveal>

          <div className="g-nav">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={active === 0}
              aria-label="Предыдущая работа"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={active === items.length - 1}
              aria-label="Следующая работа"
            >
              ›
            </button>
          </div>
        </div>

        <Reveal>
          <div
            className="g-stage"
            ref={stageRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            role="group"
            aria-roledescription="карусель"
            aria-label="Галерея работ"
          >
            <div className="g-track" ref={trackRef}>
              {items.map((slot, index) => (
                <div
                  className={`g-item ${index === active ? 'is-active' : ''}`.trim()}
                  key={slot.label}
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  role="button"
                  tabIndex={-1}
                  aria-label={slot.alt}
                  aria-current={index === active}
                  onClick={() => setActive(index)}
                >
                  <div className="g-circle">
                    <Media slot={slot} />
                  </div>
                  <span className="g-caption">{slot.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Portfolio
