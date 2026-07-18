type ResourceType = "API" | "DATASET" | "ML MODEL" | "RESEARCH"

interface Resource {
  type: ResourceType
  title: string
  description: string
  provider: string
  price: string
}

const TYPE_STYLES: Record<ResourceType, string> = {
  API: "bg-sky-400/10 text-sky-300 border-sky-400/25",
  DATASET: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  "ML MODEL": "bg-violet-400/10 text-violet-300 border-violet-400/25",
  RESEARCH: "bg-amber-400/10 text-amber-300 border-amber-400/25",
}

const RESOURCES: Resource[] = [
  {
    type: "API",
    title: "Realtime FX Rates API",
    description:
      "Sub-second foreign exchange rates across 150+ currency pairs, streamed via WebSocket.",
    provider: "Meridian Data Co.",
    price: "18 XLM / 10K calls",
  },
  {
    type: "DATASET",
    title: "Global Shipping Lanes 2020–2025",
    description:
      "Cleaned AIS vessel-tracking data covering five years of maritime freight routes.",
    provider: "Portside Analytics",
    price: "420 XLM",
  },
  {
    type: "ML MODEL",
    title: "Crop Yield Vision Model",
    description:
      "Satellite-imagery model for predicting crop yield anomalies at field-level resolution.",
    provider: "Agros Labs",
    price: "95 XLM / inference",
  },
  {
    type: "RESEARCH",
    title: "Soroban Gas Optimization Study",
    description:
      "Peer-reviewed benchmarking of contract execution costs across Soroban runtime versions.",
    provider: "Lumen Research Group",
    price: "60 XLM",
  },
]

export function CatalogPreview() {
  return (
    <section id="catalog" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            A live catalog, priced in XLM
          </h2>
          <p className="mt-4 text-gray-400">
            Every resource is metered, access-gated on-chain, and settled the
            moment it's consumed.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((resource) => (
            <article
              key={resource.title}
              className="flex flex-col rounded-2xl border border-navy-border bg-navy-card p-6 transition-colors hover:border-gold/40"
            >
              <span
                className={`w-fit rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${TYPE_STYLES[resource.type]}`}
              >
                {resource.type}
              </span>

              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {resource.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                {resource.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-navy-border pt-4">
                <span className="text-xs text-gray-500">
                  {resource.provider}
                </span>
                <span className="font-heading text-sm font-semibold text-gold">
                  {resource.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
