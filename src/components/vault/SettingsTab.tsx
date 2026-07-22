import { useState } from "react"

interface SettingsTabProps {
  publisherAddress: string
}

export function SettingsTab({ publisherAddress }: SettingsTabProps) {
  const [displayName, setDisplayName] = useState("")
  const [payoutAddress, setPayoutAddress] = useState(publisherAddress)
  const [saved, setSaved] = useState(false)

  function handleSave(event: React.FormEvent) {
    event.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-xl rounded-2xl border border-navy-border bg-navy-card p-6">
      <h3 className="font-heading text-lg font-semibold text-white">
        Publisher settings
      </h3>

      <form onSubmit={handleSave} className="mt-6 space-y-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Meridian Data Co."
            className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-gold/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Payout Address (XLM)
          </label>
          <input
            type="text"
            value={payoutAddress}
            onChange={(e) => setPayoutAddress(e.target.value)}
            className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 font-mono text-sm text-white focus:border-gold/50 focus:outline-none"
          />
          <p className="mt-1.5 text-xs text-gray-500">
            Defaults to your connected Freighter wallet.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft"
          >
            Save
          </button>
          {saved && <span className="text-sm text-emerald-300">Saved.</span>}
        </div>
      </form>
    </div>
  )
}
