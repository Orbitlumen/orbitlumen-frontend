import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-28 lg:px-8 lg:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(240,192,80,0.14) 0%, rgba(5,8,16,0) 70%)",
        }}
      />

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy-border bg-navy-card px-4 py-1.5 text-xs font-medium text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Built on Stellar &amp; Soroban
        </div>

        <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Knowledge in orbit.
          <br />
          <span className="text-gold">Value on-chain.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
          OrbitLumen is a decentralized marketplace for paywalled APIs,
          datasets, and research — settled instantly in XLM, gated by
          on-chain access control, and ready for autonomous agents to pay
          their own way.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/catalog"
            className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft sm:w-auto"
          >
            Browse the vault
          </Link>
          <a
            href="#"
            className="w-full rounded-full border border-navy-border px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold sm:w-auto"
          >
            Publish a Resource
          </a>
        </div>
      </div>
    </section>
  )
}
