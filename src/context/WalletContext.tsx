import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  getAddress,
  getNetwork,
  isAllowed,
  isConnected as checkIsConnected,
  requestAccess,
} from "@stellar/freighter-api"

const STORAGE_KEY = "orbitlumen:wallet-connected"

export interface WalletContextValue {
  isInstalled: boolean
  isConnected: boolean
  publicKey: string | null
  network: string | null
  isLoading: boolean
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

export const WalletContext = createContext<WalletContextValue | null>(null)

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("timed out")), ms),
    ),
  ])
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [network, setNetwork] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSession = useCallback(async (address: string) => {
    setPublicKey(address)
    setIsConnected(true)

    const networkResult = await withTimeout(getNetwork(), 3000).catch(
      () => null,
    )
    if (networkResult && !networkResult.error) {
      setNetwork(networkResult.network)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function detect() {
      try {
        const connectionStatus = await withTimeout(checkIsConnected(), 1200)
        if (cancelled) return

        if (connectionStatus.error) {
          setIsInstalled(false)
          return
        }

        setIsInstalled(true)

        const wasConnected = localStorage.getItem(STORAGE_KEY) === "1"
        if (!wasConnected) return

        const allowed = await isAllowed()
        if (cancelled || allowed.error || !allowed.isAllowed) return

        const addressResult = await getAddress()
        if (cancelled || addressResult.error || !addressResult.address) return

        await loadSession(addressResult.address)
      } catch {
        if (!cancelled) setIsInstalled(false)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    detect()
    return () => {
      cancelled = true
    }
  }, [loadSession])

  const connect = useCallback(async () => {
    setError(null)

    if (!isInstalled) {
      setError("Freighter extension not detected.")
      return
    }

    setIsLoading(true)
    try {
      const access = await requestAccess()

      if (access.error || !access.address) {
        setError(access.error?.message ?? "Connection request was rejected.")
        return
      }

      await loadSession(access.address)
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      setError("Could not reach the Freighter extension.")
    } finally {
      setIsLoading(false)
    }
  }, [isInstalled, loadSession])

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setPublicKey(null)
    setNetwork(null)
    setError(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({
      isInstalled,
      isConnected,
      publicKey,
      network,
      isLoading,
      error,
      connect,
      disconnect,
    }),
    [isInstalled, isConnected, publicKey, network, isLoading, error, connect, disconnect],
  )

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}
