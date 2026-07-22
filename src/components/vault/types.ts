export type ResourceType = "API" | "DATASET" | "ML MODEL" | "RESEARCH"
export type AccessType = "Pay-per-call" | "One-time" | "Subscription"
export type ResourceStatus = "Active" | "Paused"

export interface VaultResource {
  id: string
  title: string
  description: string
  type: ResourceType
  endpoint: string
  priceXLM: number
  accessType: AccessType
  accesses: number
  revenueXLM: number
  status: ResourceStatus
}

export interface ResourceDraft {
  title: string
  description: string
  type: ResourceType
  endpointKind: "url" | "file"
  endpoint: string
  priceXLM: string
  accessType: AccessType
}

export const RESOURCE_TYPES: ResourceType[] = [
  "API",
  "DATASET",
  "ML MODEL",
  "RESEARCH",
]

export const ACCESS_TYPES: AccessType[] = [
  "Pay-per-call",
  "One-time",
  "Subscription",
]

export const TYPE_STYLES: Record<ResourceType, string> = {
  API: "bg-sky-400/10 text-sky-300 border-sky-400/25",
  DATASET: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  "ML MODEL": "bg-violet-400/10 text-violet-300 border-violet-400/25",
  RESEARCH: "bg-amber-400/10 text-amber-300 border-amber-400/25",
}

export const EMPTY_DRAFT: ResourceDraft = {
  title: "",
  description: "",
  type: "API",
  endpointKind: "url",
  endpoint: "",
  priceXLM: "",
  accessType: "Pay-per-call",
}
