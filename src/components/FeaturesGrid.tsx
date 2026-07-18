import type { ReactNode } from "react"

interface Feature {
  title: string
  description: string
  icon: ReactNode
}

function IconLock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  )
}

function IconBolt() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 3 5 13.5h5.5L11 21l8-11h-5.5L13 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2.5 20h19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconAgent() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="7" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9.5" cy="12.5" r="1.1" fill="currentColor" />
      <circle cx="14.5" cy="12.5" r="1.1" fill="currentColor" />
      <path d="M12 7V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  )
}

const FEATURES: Feature[] = [
  {
    title: "On-chain access control",
    description:
      "Every purchase mints a verifiable entitlement on Soroban — no centralized gatekeeper, no shared API keys.",
    icon: <IconLock />,
  },
  {
    title: "x402 micropayments",
    description:
      "Pay-per-call pricing over the x402 protocol lets consumers settle in fractions of a cent, per request.",
    icon: <IconBolt />,
  },
  {
    title: "Real-time analytics",
    description:
      "Publishers get live dashboards on consumption, revenue, and buyer geography — updated as it happens.",
    icon: <IconChart />,
  },
  {
    title: "Agent-ready",
    description:
      "A machine-readable pricing schema lets autonomous agents discover, pay for, and consume resources unattended.",
    icon: <IconAgent />,
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="border-y border-navy-border bg-navy-soft/60 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Built for a machine economy
          </h2>
          <p className="mt-4 text-gray-400">
            Infrastructure-grade primitives for buying and selling knowledge,
            without the middleman.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-navy-border bg-navy-card p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                {feature.icon}
              </div>
              <h3 className="mt-5 font-heading text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
