import { WormholeStatus } from "@/lib/wormhole"

type Props = {
  status: WormholeStatus
  onRetry?: () => void
}

export default function StatusBadge({ status, onRetry }: Props) {
  const map: Record<
    WormholeStatus,
    {
      title: string
      description?: string
      className: string
    }
  > = {
    idle: {
      title: "Idle",
      className: "text-gray-400",
    },

    "connecting-wallet": {
      title: "Connecting wallet",
      description: "Awaiting wallet approval",
      className: "text-wormhole-blue",
    },

    "switching-network": {
      title: "Switching network",
      description: "Switching to Sepolia",
      className: "text-wormhole-blue",
    },

    sending: {
      title: "Sending transaction",
      description: "Submitting transaction on Sepolia",
      className: "text-wormhole-blue",
    },

    "source-confirmed": {
      title: "Source chain confirmed",
      description: "Transaction finalized on Sepolia",
      className: "text-wormhole-green",
    },

    "in-transit": {
      title: "Message in transit",
      description: "Observed by Wormhole guardians",
      className: "text-wormhole-yellow",
    },

    "pending-claim": {
      title: "Pending destination execution",
      description:
        "VAA issued. Destination execution may be delayed on testnet.",
      className: "text-wormhole-yellow",
    },

    delivered: {
      title: "Delivered on destination",
      description: "Message executed on Base Sepolia",
      className: "text-wormhole-green",
    },

    failed: {
      title: "Transaction failed",
      description: "The transaction was reverted or rejected",
      className: "text-wormhole-coral",
    },
  }

  const current = map[status] ?? map.idle

  return (
    <div className="space-y-2">
      <div className={`text-sm font-medium ${current.className}`}>
        {current.title}
      </div>

      {current.description && (
        <p className="text-xs text-gray-400 max-w-sm">
          {current.description}
        </p>
      )}

      {status === "failed" && onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-wormhole-coral underline"
        >
          Retry transaction
        </button>
      )}
    </div>
  )
}
