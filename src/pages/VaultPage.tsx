import { useState } from "react"
import { useWallet } from "../hooks/useWallet"
import { VaultSidebar, type VaultTab } from "../components/vault/VaultSidebar"
import { MyResourcesTab } from "../components/vault/MyResourcesTab"
import { EarningsTab } from "../components/vault/EarningsTab"
import { SettingsTab } from "../components/vault/SettingsTab"
import { RegisterResourceModal } from "../components/vault/RegisterResourceModal"
import type { VaultResource } from "../components/vault/types"

function ConnectPrompt() {
  const { isInstalled, isLoading, connect } = useWallet()

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-navy-border bg-navy-card p-10 text-center">
        <h1 className="font-heading text-2xl font-bold text-white">
          Connect your Freighter wallet
        </h1>
        <p className="mt-3 text-sm text-gray-400">
          Connect your Freighter wallet to access your vault.
        </p>
        <button
          type="button"
          onClick={connect}
          disabled={isLoading || !isInstalled}
          className="mt-8 w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {!isInstalled
            ? "Freighter not installed"
            : isLoading
              ? "Connecting…"
              : "Connect Wallet"}
        </button>
        {!isInstalled && (
          <a
            href="https://freighter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm text-gold hover:text-gold-soft"
          >
            Get Freighter →
          </a>
        )}
      </div>
    </section>
  )
}

export function VaultPage() {
  const { isConnected, publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<VaultTab>("resources")
  const [resources, setResources] = useState<VaultResource[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<VaultResource | null>(
    null,
  )

  if (!isConnected || !publicKey) {
    return <ConnectPrompt />
  }

  function openRegisterModal() {
    setEditingResource(null)
    setModalOpen(true)
  }

  function openEditModal(resource: VaultResource) {
    setEditingResource(resource)
    setModalOpen(true)
  }

  function handleSubmitResource(resource: VaultResource) {
    setResources((prev) => {
      const exists = prev.some((r) => r.id === resource.id)
      return exists
        ? prev.map((r) => (r.id === resource.id ? resource : r))
        : [resource, ...prev]
    })
  }

  function handleTogglePause(id: string) {
    setResources((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Active" ? "Paused" : "Active" }
          : r,
      ),
    )
  }

  return (
    <section className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
          My Vault
        </h1>
        <p className="mt-4 max-w-2xl text-gray-400">
          Manage your published resources, track earnings, and update your
          payout settings.
        </p>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <VaultSidebar
            publisherAddress={publicKey}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onRegisterClick={openRegisterModal}
          />

          <div className="flex-1">
            {activeTab === "resources" && (
              <MyResourcesTab
                resources={resources}
                onRegisterClick={openRegisterModal}
                onEdit={openEditModal}
                onTogglePause={handleTogglePause}
              />
            )}
            {activeTab === "earnings" && <EarningsTab />}
            {activeTab === "settings" && (
              <SettingsTab publisherAddress={publicKey} />
            )}
          </div>
        </div>
      </div>

      <RegisterResourceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitResource}
        editingResource={editingResource}
      />
    </section>
  )
}
