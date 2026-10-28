import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import Logo from './Logo'
import { scrollToHash } from '../lib/scroll'
import { site } from '../data/site'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToHash(href)
  }

  return (
    <header className={`header ${scrolled || menuOpen ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={(e) => go(e, '#top')}>
          <Logo />
          <span className="brand-text">
            <span className="brand-name">{site.brandMark}</span>
            <span className="brand-sub">{site.brandSub}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Основная навигация">
          {site.nav.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-cta">
          <a className="btn btn-primary btn-sm" href="#booking" onClick={(e) => go(e, '#booking')}>
            Записаться
          </a>
        </div>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
        <div className="container">
          {site.nav.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}>
              {link.label}
            </a>
          ))}
          <a className="btn btn-primary btn-block" href="#booking" onClick={(e) => go(e, '#booking')}>
            Записаться на процедуру
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
