import { useEffect, useState } from 'react'
import { heroPhotos } from '../data/media'

function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroPhotos.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  const go = (i: number) => {
    setIndex(((i % heroPhotos.length) + heroPhotos.length) % heroPhotos.length)
  }

  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  return (
    <div className="hero-carousel">
      <div
        className="hero-carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {heroPhotos.map((src) => (
          <div className="hero-carousel-slide" key={src}>
            <img
              src={`${import.meta.env.BASE_URL}${src}`}
              alt="Результат процедуры YARKO HAIR BEAUTY"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="hero-carousel-controls">
        <button type="button" onClick={prev} aria-label="Предыдущее фото">
          ‹
        </button>
        <button type="button" onClick={next} aria-label="Следующее фото">
          ›
        </button>
      </div>

      <div className="hero-carousel-dots">
        {heroPhotos.map((src, i) => (
          <button
            key={src}
            type="button"
            className={i === index ? 'active' : ''}
            onClick={() => go(i)}
            aria-label={`Фото ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
