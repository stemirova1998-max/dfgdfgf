import type { MouseEvent } from 'react'
import Logo from './Logo'
import { scrollToHash } from '../lib/scroll'
import { site } from '../data/site'

const currentYear = new Date().getFullYear()

function Footer() {
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToHash(href)
  }

  return (
    <footer className="footer" id="contacts">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo className="logo-invert" />
          <span className="footer-brand-name">{site.brandMark} {site.brandSub}</span>
          <p className="footer-tagline">Кератин · ботокс · восстановление волос в {site.city}</p>
        </div>

        <nav className="footer-nav" aria-label="Навигация в подвале">
          {site.nav.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-contacts">
          <p className="footer-contacts-title">Контакты</p>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
            @{site.instagramHandle}
          </a>
          <span>{site.city}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        © {currentYear} {site.brand}. Все права защищены.
      </div>
    </footer>
  )
}

export default Footer
