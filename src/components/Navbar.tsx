const NAV_LINKS = [
  { label: "Catalog", href: "#catalog" },
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Docs", href: "#" },
]

function OrbitMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="3.2" fill="#f0c050" />
      <ellipse
        cx="14"
        cy="14"
        rx="12.5"
        ry="6"
        stroke="#f0c050"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="12.5"
        ry="6"
        transform="rotate(60 14 14)"
        stroke="#f0c050"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="12.5"
        ry="6"
        transform="rotate(120 14 14)"
        stroke="#f0c050"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />
    </svg>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-border/80 bg-navy/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <OrbitMark />
          <span className="font-heading text-lg font-semibold tracking-tight text-white">
            Orbit<span className="text-gold">Lumen</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft"
        >
          Launch App
        </a>
      </div>
    </header>
  )
}
