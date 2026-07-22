import { truncateAddress } from "../../lib/format"

export type VaultTab = "resources" | "earnings" | "settings"

const NAV_ITEMS: { key: VaultTab; label: string }[] = [
  { key: "resources", label: "My Resources" },
  { key: "earnings", label: "Earnings" },
  { key: "settings", label: "Settings" },
]

interface VaultSidebarProps {
  publisherAddress: string
  activeTab: VaultTab
  onChangeTab: (tab: VaultTab) => void
  onRegisterClick: () => void
}

export function VaultSidebar({
  publisherAddress,
  activeTab,
  onChangeTab,
  onRegisterClick,
}: VaultSidebarProps) {
  return (
    <aside className="w-full shrink-0 lg:w-[240px]">
      <div className="space-y-6 rounded-2xl border border-navy-border bg-navy-card p-6 lg:sticky lg:top-24">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Publisher
          </span>
          <p className="mt-1 font-mono text-sm font-medium text-gold">
            {truncateAddress(publisherAddress)}
          </p>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeTab(item.key)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                activeTab === item.key
                  ? "bg-gold/10 text-gold"
                  : "text-gray-400 hover:bg-navy hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={onRegisterClick}
          className="w-full rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft"
        >
          Register New Resource
        </button>
      </div>
    </aside>
  )
}
