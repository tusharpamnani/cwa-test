"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type UIState =
  | "sending"
  | "source-confirmed"
  | "in-transit"
  | "pending-claim"
  | "delivered"
  | "failed"

type VoteHistoryItem = {
  pollId: number
  option: number
  sourceTxHash: string
  wormholeScanUrl: string
  status: UIState
  timestamp: number
}

export default function HistoryPage() {
  const [history, setHistory] = useState<VoteHistoryItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem("wormhole-vote-history")
    if (raw) {
      try {
        setHistory(JSON.parse(raw))
      } catch {
        setHistory([])
      }
    }
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-wormhole-white">
          Cross-Chain Vote History
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Each entry represents a real cross-chain message sent via Wormhole.
          Delivery is asynchronous — pending claims are normal on testnet.
        </p>
      </header>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="border border-white/10 rounded-lg p-8 text-center text-gray-400">
          No votes yet.
          <br />
          <Link
            href="/poll"
            className="text-wormhole-blue underline text-sm"
          >
            Cast your first cross-chain vote →
          </Link>
        </div>
      )}

      {/* Table */}
      {history.length > 0 && (
        <div className="overflow-x-auto border border-white/10 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="text-left px-4 py-3">Time</th>
                <th className="text-left px-4 py-3">Poll</th>
                <th className="text-left px-4 py-3">Option</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Links</th>
              </tr>
            </thead>

            <tbody>
              {history
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((item, i) => (
                  <tr
                    key={i}
                    className="border-t border-white/5 hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </td>

                    <td className="px-4 py-3">
                      Poll #{item.pollId}
                    </td>

                    <td className="px-4 py-3">
                      Option {item.option}
                    </td>

                    <td className="px-4 py-3">
                      <StatusPill status={item.status} />
                    </td>

                    <td className="px-4 py-3 space-x-3">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${item.sourceTxHash}`}
                        target="_blank"
                        className="text-wormhole-blue underline"
                      >
                        Source
                      </a>

                      <a
                        href={item.wormholeScanUrl}
                        target="_blank"
                        className="text-wormhole-purple underline"
                      >
                        Wormhole
                      </a>
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

/* --------------------------------------------- */
/* Status Pill */
/* --------------------------------------------- */

function StatusPill({ status }: { status: UIState }) {
  const map: Record<
    UIState,
    { label: string; className: string }
  > = {
    sending: {
      label: "Sending",
      className: "bg-wormhole-blue/10 text-wormhole-blue",
    },
    "source-confirmed": {
      label: "Source Confirmed",
      className: "bg-wormhole-green/10 text-wormhole-green",
    },
    "in-transit": {
      label: "In Transit",
      className: "bg-wormhole-yellow/10 text-wormhole-yellow",
    },
    "pending-claim": {
      label: "Pending Claim",
      className: "bg-wormhole-yellow/10 text-wormhole-yellow",
    },
    delivered: {
      label: "Delivered",
      className: "bg-wormhole-green/10 text-wormhole-green",
    },
    failed: {
      label: "Failed",
      className: "bg-wormhole-coral/10 text-wormhole-coral",
    },
  }

  const current = map[status]

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${current.className}`}
    >
      {current.label}
    </span>
  )
}
