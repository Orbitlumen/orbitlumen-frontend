import { useEffect, useState } from "react"
import {
  ACCESS_TYPES,
  EMPTY_DRAFT,
  RESOURCE_TYPES,
  type AccessType,
  type ResourceDraft,
  type ResourceType,
  type VaultResource,
} from "./types"

interface RegisterResourceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (resource: VaultResource) => void
  editingResource?: VaultResource | null
}

type Errors = Partial<Record<keyof ResourceDraft, string>>
type Phase = "form" | "submitting" | "success"

function draftFromResource(resource: VaultResource): ResourceDraft {
  return {
    title: resource.title,
    description: resource.description,
    type: resource.type,
    endpointKind: "url",
    endpoint: resource.endpoint,
    priceXLM: String(resource.priceXLM),
    accessType: resource.accessType,
  }
}

function validate(draft: ResourceDraft): Errors {
  const errors: Errors = {}

  if (!draft.title.trim()) errors.title = "Title is required."
  if (!draft.description.trim() || draft.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters."
  }
  if (!draft.endpoint.trim()) {
    errors.endpoint =
      draft.endpointKind === "url"
        ? "An endpoint URL is required."
        : "Please choose a file."
  }

  const price = Number(draft.priceXLM)
  if (!draft.priceXLM.trim() || Number.isNaN(price) || price <= 0) {
    errors.priceXLM = "Enter a price greater than 0 XLM."
  }

  return errors
}

export function RegisterResourceModal({
  isOpen,
  onClose,
  onSubmit,
  editingResource,
}: RegisterResourceModalProps) {
  const [draft, setDraft] = useState<ResourceDraft>(EMPTY_DRAFT)
  const [errors, setErrors] = useState<Errors>({})
  const [phase, setPhase] = useState<Phase>("form")

  useEffect(() => {
    if (!isOpen) return
    setDraft(editingResource ? draftFromResource(editingResource) : EMPTY_DRAFT)
    setErrors({})
    setPhase("form")
  }, [isOpen, editingResource])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function updateField<K extends keyof ResourceDraft>(
    field: K,
    value: ResourceDraft[K],
  ) {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const validationErrors = validate(draft)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setPhase("submitting")
    setTimeout(() => {
      const resource: VaultResource = {
        id: editingResource?.id ?? `res-${Math.random().toString(36).slice(2, 10)}`,
        title: draft.title.trim(),
        description: draft.description.trim(),
        type: draft.type,
        endpoint: draft.endpoint.trim(),
        priceXLM: Number(draft.priceXLM),
        accessType: draft.accessType,
        accesses: editingResource?.accesses ?? 0,
        revenueXLM: editingResource?.revenueXLM ?? 0,
        status: editingResource?.status ?? "Active",
      }
      onSubmit(resource)
      setPhase("success")
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-10">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative w-full max-w-lg rounded-2xl border border-navy-border bg-navy-card p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-gray-500 transition-colors hover:text-white"
        >
          ✕
        </button>

        {phase === "success" ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-2xl text-gold">
              ✓
            </div>
            <h2 className="mt-5 font-heading text-xl font-semibold text-white">
              {editingResource ? "Resource updated" : "Resource registered"}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-gray-400">
              This is a mock confirmation — on-chain registration via Soroban
              lands in Week 3.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-heading text-xl font-semibold text-white">
              {editingResource ? "Edit resource" : "Register new resource"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              List an API, dataset, model, or paper on the vault.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Title
                </label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. Realtime FX Rates API"
                  className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-gold/50 focus:outline-none"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-400">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                </label>
                <textarea
                  value={draft.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  placeholder="What does this resource provide?"
                  className="mt-2 w-full resize-none rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-gold/50 focus:outline-none"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Resource Type
                  </label>
                  <select
                    value={draft.type}
                    onChange={(e) =>
                      updateField("type", e.target.value as ResourceType)
                    }
                    className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-white focus:border-gold/50 focus:outline-none"
                  >
                    {RESOURCE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Access Type
                  </label>
                  <select
                    value={draft.accessType}
                    onChange={(e) =>
                      updateField("accessType", e.target.value as AccessType)
                    }
                    className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 text-sm text-white focus:border-gold/50 focus:outline-none"
                  >
                    {ACCESS_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Endpoint
                  </label>
                  <div className="flex gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => updateField("endpointKind", "url")}
                      className={`rounded-full px-2.5 py-1 transition-colors ${
                        draft.endpointKind === "url"
                          ? "bg-gold/15 text-gold"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("endpointKind", "file")}
                      className={`rounded-full px-2.5 py-1 transition-colors ${
                        draft.endpointKind === "file"
                          ? "bg-gold/15 text-gold"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      File
                    </button>
                  </div>
                </div>
                {draft.endpointKind === "url" ? (
                  <input
                    type="text"
                    value={draft.endpoint}
                    onChange={(e) => updateField("endpoint", e.target.value)}
                    placeholder="https://api.example.com/v1"
                    className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 font-mono text-sm text-white placeholder:text-gray-600 focus:border-gold/50 focus:outline-none"
                  />
                ) : (
                  <input
                    type="file"
                    onChange={(e) =>
                      updateField("endpoint", e.target.files?.[0]?.name ?? "")
                    }
                    className="mt-2 w-full text-sm text-gray-400 file:mr-3 file:rounded-full file:border-0 file:bg-gold/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-gold"
                  />
                )}
                {errors.endpoint && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.endpoint}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price (XLM)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.priceXLM}
                  onChange={(e) => updateField("priceXLM", e.target.value)}
                  placeholder="25"
                  className="mt-2 w-full rounded-lg border border-navy-border bg-navy px-3 py-2 font-mono text-sm text-white placeholder:text-gray-600 focus:border-gold/50 focus:outline-none"
                />
                {errors.priceXLM && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.priceXLM}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={phase === "submitting"}
                className="mt-2 w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                {phase === "submitting"
                  ? "Registering…"
                  : editingResource
                    ? "Save changes"
                    : "Register resource"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
