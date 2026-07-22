import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useWallet } from "../hooks/useWallet"
import { truncateAddress } from "../lib/format"

const NAV_LINKS = [
  { label: "Catalog", href: "/catalog" },
  { label: "My Vault", href: "/vault" },
  { label: "Features", href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Docs", href: "#" },
]

const NETWORK_LABELS: Record<string, string> = {
  PUBLIC: "MAINNET",
  TESTNET: "TESTNET",
}

const NETWORK_STYLES: Record<string, string> = {
  PUBLIC: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  TESTNET: "bg-amber-400/10 text-amber-300 border-amber-400/25",
}

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

function NetworkBadge({ network }: { network: string }) {
  const label = NETWORK_LABELS[network] ?? network
  const style =
    NETWORK_STYLES[network] ?? "bg-gray-400/10 text-gray-300 border-gray-400/25"

  return (
    <span
      className={`rounded-full border px-2 py-1 font-mono text-[10px] font-semibold tracking-wide ${style}`}
    >
      {label}
    </span>
  )
}

function WalletControl() {
  const { isInstalled, isConnected, publicKey, network, isLoading, error, connect, disconnect } =
    useWallet()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!isInstalled) {
    return (
      <a
        href="https://freighter.app"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-navy-border px-5 py-2 font-heading text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold"
      >
        Install Freighter
      </a>
    )
  }

  if (!isConnected) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={connect}
          disabled={isLoading}
          className="rounded-full bg-gold px-5 py-2 font-heading text-sm font-semibold text-navy transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Connecting…" : "Connect Wallet"}
        </button>
        {error && (
          <p className="absolute right-0 top-full mt-2 w-56 text-right text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div ref={menuRef} className="relative flex items-center gap-3">
      {network && <NetworkBadge network={network} />}

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="rounded-full border border-navy-border bg-navy-card px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:border-gold/50"
      >
        {truncateAddress(publicKey ?? "")}
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-navy-border bg-navy-card shadow-xl">
          <button
            type="button"
            onClick={() => {
              disconnect()
              setMenuOpen(false)
            }}
            className="w-full px-4 py-2.5 text-left text-sm text-gray-300 transition-colors hover:bg-navy hover:text-white"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-border/80 bg-navy/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <OrbitMark />
          <span className="font-heading text-lg font-semibold tracking-tight text-white">
            Orbit<span className="text-gold">Lumen</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <WalletControl />
      </div>
    </header>
  )
}
