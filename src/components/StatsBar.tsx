const STATS = [
  { value: "12K+", label: "Resources listed" },
  { value: "3.4M XLM", label: "Settled on-chain" },
  { value: "<2s", label: "Settlement time" },
]

export function StatsBar() {
  return (
    <section className="border-y border-navy-border bg-navy-soft/60">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-navy-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center">
            <div className="font-heading text-3xl font-bold text-gold sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
