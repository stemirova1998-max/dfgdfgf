interface LogoProps {
  className?: string
}

function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`logo-mark ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="24" cy="24" r="18.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="22"
        fontWeight="600"
        fill="currentColor"
      >
        Y
      </text>
    </svg>
  )
}

export default Logo
