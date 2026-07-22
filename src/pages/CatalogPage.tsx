import { useMemo, useState } from "react"

type ResourceType = "API" | "DATASET" | "ML MODEL" | "RESEARCH"
type SortOption = "latest" | "price-asc" | "price-desc" | "most-accessed"

interface Resource {
  id: string
  type: ResourceType
  title: string
  description: string
  publisher: string
  priceXLM: number
  accessCount: number
  publishedAt: string
}

const RESOURCE_TYPES: ResourceType[] = ["API", "DATASET", "ML MODEL", "RESEARCH"]

const XLM_USD_RATE = 0.11

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "most-accessed", label: "Most Accessed" },
]

const RESOURCES: Resource[] = [
  {
    id: "naira-fx-api",
    type: "API",
    title: "Naira Stablecoin Swap Rates API",
    description:
      "Live NGN-to-stablecoin conversion rates aggregated across Lagos-based P2P desks, refreshed every 5 seconds.",
    publisher: "GAK3P7XZQW2VD9MC4RJHY6BLN08ESTFU1OAIKXPZQ7VDMC94RJHYBLNS3",
    priceXLM: 12,
    accessCount: 3420,
    publishedAt: "2026-07-02",
  },
  {
    id: "global-fx-api",
    type: "API",
    title: "Realtime Global FX Rates API",
    description:
      "Sub-second foreign exchange rates across 150+ currency pairs, streamed via WebSocket.",
    publisher: "GBTX94RMLQZ2DKC7VEJHY6NPS08OWAIU1XKZFTQ7RMLDKC94VEJHYNPSA2",
    priceXLM: 18,
    accessCount: 8214,
    publishedAt: "2026-06-18",
  },
  {
    id: "momo-rails-api",
    type: "API",
    title: "Sub-Saharan Mobile Money Rails API",
    description:
      "Unified API for initiating and reconciling mobile money transfers across M-Pesa, MTN MoMo, and Airtel Money.",
    publisher: "GCV71OPXQZ3RJC5MK9HYB6NLS08EWAFT1XUZKPQ7OPXRJC59MKHYNLS41",
    priceXLM: 25,
    accessCount: 5107,
    publishedAt: "2026-05-30",
  },
  {
    id: "ea-farm-yields",
    type: "DATASET",
    title: "East African Smallholder Farm Yields Dataset",
    description:
      "Five seasons of plot-level maize and cassava yield records from Kenya, Uganda, and Tanzania cooperatives.",
    publisher: "GDZ82NQXRW4SKC6ML0HYC7OMT19FXBGU2YV0LRQ8NQXSKC60MLHYOMT52",
    priceXLM: 60,
    accessCount: 1189,
    publishedAt: "2026-04-11",
  },
  {
    id: "shipping-lanes",
    type: "DATASET",
    title: "Global Shipping Lanes AIS Dataset 2020-2025",
    description:
      "Cleaned AIS vessel-tracking data covering five years of maritime freight routes.",
    publisher: "GEA93ORYSX5TLD7NM1IZD8PNU20GYCHV3ZW1MSR9ORYTLD71NMIZPNU63",
    priceXLM: 140,
    accessCount: 642,
    publishedAt: "2026-03-22",
  },
  {
    id: "lagos-traffic",
    type: "DATASET",
    title: "Lagos Traffic & Mobility Sensor Dataset",
    description:
      "Anonymized road-sensor and ride-hailing GPS traces across greater Lagos, sampled at one-minute resolution.",
    publisher: "GFB04PSZTY6UME8ON2JAE9QOV31HZDIW4AX2NTS0PSZUME82ONJAQOV74",
    priceXLM: 45,
    accessCount: 2033,
    publishedAt: "2026-07-10",
  },
  {
    id: "crop-disease-vision",
    type: "ML MODEL",
    title: "Crop Disease Detection Vision Model",
    description:
      "Field-image classifier trained on West African cassava and maize leaf photos, tuned for low-bandwidth inference.",
    publisher: "GHC15QTAUZ7VNF9PO3KBF0RPW42IAEJX5BY3OUT1QTAVNF93POKBRPW85",
    priceXLM: 95,
    accessCount: 974,
    publishedAt: "2026-06-05",
  },
  {
    id: "african-nlp-embeddings",
    type: "ML MODEL",
    title: "Multilingual African NLP Embedding Model",
    description:
      "Sentence embeddings covering Swahili, Hausa, Yoruba, Amharic, and Zulu, benchmarked against retrieval tasks.",
    publisher: "GID26RUBVA8WOG0QP4LCG1SQX53JBFKY6CZ4PVU2RUBWOG04QPLCSQX96",
    priceXLM: 80,
    accessCount: 1542,
    publishedAt: "2026-07-15",
  },
  {
    id: "credit-risk-model",
    type: "ML MODEL",
    title: "Global Credit Risk Scoring Model",
    description:
      "Gradient-boosted risk model trained on cross-border microloan repayment data across 40 markets.",
    publisher: "GJE37SVCWB9XPH1RQ5MDH2TRY64KCGLZ7DA5QWV3SVCXPH15RQMDTRY07",
    priceXLM: 175,
    accessCount: 388,
    publishedAt: "2026-02-14",
  },
  {
    id: "soroban-gas-study",
    type: "RESEARCH",
    title: "Soroban Gas Optimization Benchmark Study",
    description:
      "Peer-reviewed benchmarking of contract execution costs across Soroban runtime versions.",
    publisher: "GKF48TWDXC0YQI2SR6NEI3USZ75LDHMA8EB6RXW4TWDYQI26SRNEUSZ18",
    priceXLM: 60,
    accessCount: 1327,
    publishedAt: "2026-05-08",
  },
  {
    id: "mobile-money-inclusion",
    type: "RESEARCH",
    title: "Financial Inclusion via Mobile Money: A Sub-Saharan Panel Study",
    description:
      "Longitudinal analysis of mobile money adoption and household savings behavior across six African economies.",
    publisher: "GLG59UXEYD1ZRJ3TS7OFJ4VTA86MEINB9FC7SYX5UXEZRJ37TSOFVTA29",
    priceXLM: 35,
    accessCount: 2761,
    publishedAt: "2026-07-19",
  },
  {
    id: "remittance-corridors",
    type: "RESEARCH",
    title: "Cross-Border Remittance Cost Analysis: Africa-to-Diaspora Corridors",
    description:
      "Comparative study of remittance fees and settlement times across traditional and blockchain-based rails.",
    publisher: "GMH60VYFZE2ASK4UT8PGK5WUB97NFJOC0GD8TZY6VYFASK48UTPGWUB30",
    priceXLM: 50,
    accessCount: 1856,
    publishedAt: "2026-06-27",
  },
]

const TYPE_STYLES: Record<ResourceType, string> = {
  API: "bg-sky-400/10 text-sky-300 border-sky-400/25",
  DATASET: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  "ML MODEL": "bg-violet-400/10 text-violet-300 border-violet-400/25",
  RESEARCH: "bg-amber-400/10 text-amber-300 border-amber-400/25",
}

function truncateAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

function formatUsd(priceXLM: number) {
  return (priceXLM * XLM_USD_RATE).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

interface FilterSidebarProps {
  query: string
  onQueryChange: (value: string) => void
  selectedTypes: ResourceType[]
  onToggleType: (type: ResourceType) => void
  onToggleAllTypes: () => void
  maxPrice: number
  onMaxPriceChange: (value: number) => void
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
}

function FilterSidebar({
  query,
  onQueryChange,
  selectedTypes,
  onToggleType,
  onToggleAllTypes,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  const allSelected = selectedTypes.length === RESOURCE_TYPES.length

  return (
    <aside className="w-full shrink-0 lg:w-[260px]">
      <div className="space-y-8 rounded-2xl border border-navy-border bg-navy-card p-6 lg:sticky lg:top-24">
        <div>
          <label
            htmlFor="catalog-search"
            className="text-xs font-semibold uppercase tracking-wide text-gray-500"
          >
            Search
          </label>
          <input
            id="catalog-search"
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search title or description…"
            className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-gold/50 focus:outline-none"
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Resource Type
          </span>
          <div className="mt-3 space-y-2.5">
            <label className="flex items-center gap-2.5 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAllTypes}
                className="h-4 w-4 rounded border-navy-border bg-navy accent-gold"
              />
              All
            </label>
            {RESOURCE_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2.5 text-sm text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => onToggleType(type)}
                  className="h-4 w-4 rounded border-navy-border bg-navy accent-gold"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price Range
            </span>
            <span className="font-mono text-xs text-gold">
              0 – {maxPrice} XLM
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            className="mt-3 w-full accent-gold"
          />
        </div>

        <div>
          <label
            htmlFor="catalog-sort"
            className="text-xs font-semibold uppercase tracking-wide text-gray-500"
          >
            Sort By
          </label>
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-white focus:border-gold/50 focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const [accessed, setAccessed] = useState(false)

  return (
    <article className="flex flex-col rounded-2xl border border-navy-border bg-navy-card p-6 transition-colors hover:border-gold/40">
      <span
        className={`w-fit rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-gold ${TYPE_STYLES[resource.type]}`}
      >
        {resource.type}
      </span>

      <h3 className="mt-4 font-heading text-lg font-semibold text-white">
        {resource.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
        {resource.description}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span className="font-mono">{truncateAddress(resource.publisher)}</span>
        <span>{resource.accessCount.toLocaleString()} accesses</span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-navy-border pt-4">
        <div>
          <div className="font-mono text-sm font-semibold text-gold">
            {resource.priceXLM} XLM
          </div>
          <div className="font-mono text-xs text-gray-500">
            ≈ ${formatUsd(resource.priceXLM)}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setAccessed(true)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            accessed
              ? "bg-gold text-navy"
              : "border border-navy-border text-white hover:border-gold/50 hover:text-gold"
          }`}
        >
          {accessed ? "Access granted" : "Access resource"}
        </button>
      </div>
    </article>
  )
}

export function CatalogPage() {
  const [query, setQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>(RESOURCE_TYPES)
  const [maxPrice, setMaxPrice] = useState(100)
  const [sortBy, setSortBy] = useState<SortOption>("latest")

  const toggleType = (type: ResourceType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    )
  }

  const toggleAllTypes = () => {
    setSelectedTypes((prev) =>
      prev.length === RESOURCE_TYPES.length ? [] : RESOURCE_TYPES,
    )
  }

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase()

    const filtered = RESOURCES.filter((resource) => {
      const matchesQuery =
        q === "" ||
        resource.title.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q)
      const matchesType = selectedTypes.includes(resource.type)
      const matchesPrice = resource.priceXLM <= maxPrice

      return matchesQuery && matchesType && matchesPrice
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.priceXLM - b.priceXLM
        case "price-desc":
          return b.priceXLM - a.priceXLM
        case "most-accessed":
          return b.accessCount - a.accessCount
        case "latest":
        default:
          return (
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          )
      }
    })
  }, [query, selectedTypes, maxPrice, sortBy])

  return (
    <section className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            The Vault
          </h1>
          <p className="mt-4 text-gray-400">
            Browse paywalled APIs, datasets, models, and research — priced in
            XLM and gated on-chain.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <FilterSidebar
            query={query}
            onQueryChange={setQuery}
            selectedTypes={selectedTypes}
            onToggleType={toggleType}
            onToggleAllTypes={toggleAllTypes}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="flex-1">
            <p className="mb-4 text-sm text-gray-500">
              {filteredResources.length} resource
              {filteredResources.length === 1 ? "" : "s"} found
            </p>

            {filteredResources.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-border bg-navy-card px-6 py-24 text-center">
                <h3 className="font-heading text-lg font-semibold text-white">
                  No resources match your filters
                </h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Try widening your price range, clearing the search, or
                  selecting more resource types.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
