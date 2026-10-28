import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import HeroCarousel from './HeroCarousel'
import { scrollToHash } from '../lib/scroll'
import { site } from '../data/site'

function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
        el.style.transform = `translateY(${y * 0.08}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToHash(href)
  }

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow rise rise-1">
            {site.brandMark} {site.brandSub} · {site.city}
          </p>
          <h1 className="hero-title rise rise-2">
            Волосы, в которые хочется <em>влюбиться</em>
          </h1>
          <p className="hero-sub rise rise-3">
            Кератин, ботокс и восстановление волос в Сочи
          </p>
          <div className="hero-actions rise rise-4">
            <a className="btn btn-primary" href="#booking" onClick={(e) => go(e, '#booking')}>
              Записаться
            </a>
            <a className="btn btn-ghost" href="#portfolio" onClick={(e) => go(e, '#portfolio')}>
              Смотреть работы
            </a>
          </div>
        </div>

        <div className="hero-media" ref={parallaxRef}>
          <div className="hero-media-inner rise-media">
            <HeroCarousel />
            <span className="hero-media-tag">yarko keratin</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
