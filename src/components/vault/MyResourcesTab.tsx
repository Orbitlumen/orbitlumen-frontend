import { TYPE_STYLES, type VaultResource } from "./types"

interface StatCardProps {
  label: string
  value: string
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-card p-5">
      <div className="font-heading text-2xl font-bold text-gold">{value}</div>
      <div className="mt-1 text-sm text-gray-400">{label}</div>
    </div>
  )
}

interface MyResourcesTabProps {
  resources: VaultResource[]
  onRegisterClick: () => void
  onEdit: (resource: VaultResource) => void
  onTogglePause: (id: string) => void
}

export function MyResourcesTab({
  resources,
  onRegisterClick,
  onEdit,
  onTogglePause,
}: MyResourcesTabProps) {
  const totalResources = resources.length
  const totalEarnings = resources.reduce((sum, r) => sum + r.revenueXLM, 0)
  const totalAccesses = resources.reduce((sum, r) => sum + r.accesses, 0)
  const activeSubscriptions = resources.filter(
    (r) => r.accessType === "Subscription" && r.status === "Active",
  ).length

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Resources" value={String(totalResources)} />
        <StatCard
          label="Total Earnings (XLM)"
          value={totalEarnings.toLocaleString()}
        />
        <StatCard
          label="Total Accesses"
          value={totalAccesses.toLocaleString()}
        />
        <StatCard
          label="Active Subscriptions"
          value={String(activeSubscriptions)}
        />
      </div>

      {resources.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-border bg-navy-card px-6 py-24 text-center">
          <h3 className="font-heading text-lg font-semibold text-white">
            You haven't registered any resources yet.
          </h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Register your first resource to start earning.
          </p>
          <button
            type="button"
            onClick={onRegisterClick}
            className="mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft"
          >
            Register New Resource
          </button>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-navy-border bg-navy-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-navy-border text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Accesses</th>
                <th className="px-5 py-3 font-medium">Revenue</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-border">
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td className="px-5 py-4 font-heading font-medium text-white">
                    {resource.title}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-gold ${TYPE_STYLES[resource.type]}`}
                    >
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-gold">
                    {resource.priceXLM} XLM
                  </td>
                  <td className="px-5 py-4 text-gray-300">
                    {resource.accesses.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 font-mono text-gray-300">
                    {resource.revenueXLM.toLocaleString()} XLM
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                        resource.status === "Active"
                          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                          : "border-gray-500/25 bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => onEdit(resource)}
                        className="text-gray-400 transition-colors hover:text-gold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onTogglePause(resource.id)}
                        className="text-gray-400 transition-colors hover:text-gold"
                      >
                        {resource.status === "Active" ? "Pause" : "Resume"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
