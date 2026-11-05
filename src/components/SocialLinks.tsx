import type { ReactNode } from 'react'
import { site } from '../data/site'

type SocialVariant = 'topbar' | 'booking' | 'footer'

interface SocialEntry {
  key: string
  href: string
  label: string
  handle: string
  icon: ReactNode
}

const iconProps = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const

function TelegramIcon() {
  return (
    <svg {...iconProps} fill="currentColor">
      <path d="M21.7 3.6 2.9 10.8c-1 .4-1 1.8 0 2.1l4.4 1.5 1.7 5.2c.3.9 1.4 1.1 2 .4l2.4-2.5 4.5 3.3c.8.6 1.9.1 2.1-.9l3-14.2c.2-1-.8-1.9-1.7-1.5zM9 14.3 17.8 7l-7.2 6.5-.3 3.5L9 14.3z" />
    </svg>
  )
}

function VkIcon() {
  return (
    <svg {...iconProps} fill="currentColor">
      <path d="M12.8 17.6c-5.9 0-9.4-4.1-9.5-11h2.9c.1 5 2.3 7.1 4 7.5V6.6h2.8v4.2c1.7-.2 3.5-2.1 4.1-4.2h2.8c-.5 2.6-2.4 4.5-3.8 5.3 1.4.7 3.6 2.3 4.5 5.3h-3.1c-.7-2-2.3-3.6-4.5-3.8v3.8h-.2z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const entries: SocialEntry[] = [
  {
    key: 'telegram',
    href: site.telegramUrl,
    label: 'Telegram',
    handle: site.telegramHandle,
    icon: <TelegramIcon />,
  },
  {
    key: 'vk',
    href: site.vkUrl,
    label: 'ВКонтакте',
    handle: site.vkHandle,
    icon: <VkIcon />,
  },
  {
    key: 'instagram',
    href: site.instagramUrl,
    label: 'Instagram',
    handle: `@${site.instagramHandle}`,
    icon: <InstagramIcon />,
  },
]

interface SocialLinksProps {
  variant?: SocialVariant
  className?: string
}

function SocialLinks({ variant = 'booking', className = '' }: SocialLinksProps) {
  return (
    <div className={`socials socials--${variant} ${className}`.trim()}>
      {entries.map((entry) => (
        <a
          key={entry.key}
          className="social-link"
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${entry.label}: ${entry.handle}`}
          title={`${entry.label} — ${entry.handle}`}
        >
          <span className="social-icon">{entry.icon}</span>
          <span className="social-text">
            <span className="social-label">{entry.label}</span>
            {variant !== 'topbar' && <span className="social-handle">{entry.handle}</span>}
          </span>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
