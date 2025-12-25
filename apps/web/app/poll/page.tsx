"use client"

import { useState } from "react"
import { submitVote, WormholeStatus } from "@/lib/wormhole"
import VoteButton from "@/components/voteButton"
import StatusBadge from "@/components/StatusBadge"

type UIState = WormholeStatus

export default function PollPage() {
  const [status, setStatus] = useState<UIState>("idle")
  const [lastVote, setLastVote] = useState<number | null>(null)

  const [sourceTx, setSourceTx] = useState<string | null>(null)
  const [wormholeScanUrl, setWormholeScanUrl] = useState<string | null>(null)

  async function handleVote(option: number) {
    setLastVote(option)
    setStatus("sending")
    setSourceTx(null)
    setWormholeScanUrl(null)

    await submitVote(
      {
        pollId: 1,
        option,
        targetChain: 10004,
        targetAddress: "0xd67388A2DBaf54250A80b277e362cCc4b6022Bc3", // VOTE_RECEIVER_ADDRESS
      },
      (s, data) => {
        setStatus(s)

        if (s === "source-confirmed" && data?.sourceTxHash) {
          setSourceTx(data.sourceTxHash)
        }

        if (s === "pending-claim" && data?.wormholeScanUrl) {
          setWormholeScanUrl(data.wormholeScanUrl)
        }

        // Persist history when we have proof
        if (s === "pending-claim" && data?.sourceTxHash) {
          const existing = JSON.parse(
            localStorage.getItem("wormhole-vote-history") || "[]"
          )

          existing.push({
            pollId: 1,
            option,
            sourceTxHash: data.sourceTxHash,
            wormholeScanUrl: data.wormholeScanUrl,
            status: "pending-claim",
            timestamp: Date.now(),
          })

          localStorage.setItem(
            "wormhole-vote-history",
            JSON.stringify(existing)
          )
        }
      }
    )
  }

  async function handleRetry() {
    if (lastVote !== null) {
      await handleVote(lastVote)
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-wormhole-white">
          Cross-Chain Poll
        </h1>
        <p className="text-gray-400">
          Vote is sent on Ethereum Sepolia and executed on Base Sepolia via Wormhole.
        </p>
      </header>

      {/* Voting */}
      <section className="border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-400">
          Cast your vote
        </h2>

        <div className="space-y-3">
          <VoteButton label="Bangalore" onClick={() => handleVote(1)} />
          <VoteButton label="Berlin" onClick={() => handleVote(2)} />
        </div>
      </section>

      {/* Delivery */}
      <section
        className={`border rounded-lg p-6 space-y-4 ${
          status === "failed"
            ? "border-wormhole-coral"
            : status === "pending-claim"
            ? "border-wormhole-yellow"
            : status === "delivered"
            ? "border-wormhole-green"
            : "border-white/10"
        }`}
      >
        <h2 className="text-sm font-medium text-gray-400">
          Cross-chain execution
        </h2>

        <StatusBadge status={status} onRetry={handleRetry} />

        {status === "pending-claim" && (
          <div className="flex items-center gap-2 text-xs text-wormhole-yellow">
            <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Guardian-signed VAA detected — waiting for destination execution
          </div>
        )}

        {/* Proof */}
        <div className="space-y-2 text-xs">
          {sourceTx && (
            <a
              href={`https://sepolia.etherscan.io/tx/${sourceTx}`}
              target="_blank"
              className="text-wormhole-blue underline"
            >
              View source transaction →
            </a>
          )}

          {wormholeScanUrl && (
            <a
              href={wormholeScanUrl}
              target="_blank"
              className="text-wormhole-yellow underline"
            >
              View on Wormhole Scan →
            </a>
          )}
        </div>

        <p className="text-xs text-gray-500">
          Wormhole delivery is asynchronous. On testnet, messages may remain in
          <span className="text-gray-300"> Pending Claim </span>
          until manually executed or relayed.
        </p>
      </section>
    </div>
  )
}
