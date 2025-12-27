"use client"

import { useEffect, useState } from "react"

export default function ConnectWalletButton() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  async function connect() {
    if (!(window as any).ethereum) {
      alert("MetaMask not found")
      return
    }

    try {
      setIsConnecting(true)
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccount(accounts[0])
    } catch (err) {
      console.error(err)
    } finally {
      setIsConnecting(false)
    }
  }

  // Restore connection on refresh
  useEffect(() => {
    if (!(window as any).ethereum) return

    ;(window as any).ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      })
  }, [])

  if (account) {
    return (
      <div className="text-xs text-gray-400">
        {account.slice(0, 6)}…{account.slice(-4)}
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="text-xs px-3 py-1.5 rounded-md border border-white/20 hover:border-white/40 transition disabled:opacity-50"
    >
      {isConnecting ? "Connecting…" : "Connect Wallet"}
    </button>
  )
}
