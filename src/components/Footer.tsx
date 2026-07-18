const COLUMNS = [
  {
    heading: "Marketplace",
    links: ["Catalog", "My Vault", "Analytics", "Leaderboard"],
  },
  {
    heading: "Developers",
    links: ["Documentation", "x402 Protocol", "Soroban Contracts", "API Reference"],
  },
  {
    heading: "Company",
    links: ["About", "SCF Submission", "GitHub", "Contact"],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-navy-border px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-heading text-lg font-semibold tracking-tight text-white">
              Orbit<span className="text-gold">Lumen</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              A decentralized marketplace for paywalled knowledge, settled on
              Stellar.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4 className="font-heading text-sm font-semibold text-white">
                {column.heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 transition-colors hover:text-gold"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-navy-border pt-8 text-xs text-gray-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} OrbitLumen. All rights reserved.</p>
          <p>Powered by Stellar &amp; Soroban.</p>
        </div>
      </div>
    </footer>
  )
}
